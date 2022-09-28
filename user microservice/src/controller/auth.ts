import { Response, Request } from "express";
import user from "../model/userModel";
import IUser from "../interface/userInterface";
import { transporter } from "../nodemailer";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import userVerification from "../model/userVerification";

//creating interface for the request body
interface personModel extends Request {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  department: string;
  intrests: string[];
}

//verifying accessibility
// transporter.verify((err, success) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(success);
//   }
// });

//Error handler
const handleError = (err: any) => {
  let error = { error: "An error occurred" };

  if (err.message) {
    error = {
      error: err.message.split(":")[2],
    };
  }

  if (err.code === 11000) {
    error = {
      error: "Email already exists",
    };
  }

  return error;
};

//
//
//
// sendng verification mail function
const sendVerificationMail = async (user: IUser, res: Response) => {
  let { _id, email } = user;
  let url = process.env.email_url;
  let uniqueString = uuidv4() + _id;

  //creating email
  const mailOptions = {
    from: process.env.email,
    to: email,
    subject: "Verify email",
    html: `<p> Verify your email address to complete signup and login </p>
            Expires in <b> 6 hours </b?  
            <p> Click <a href="${url}/user/verify/${_id}/${uniqueString}"> here </a> to verify</p>`,
  };

  const salt = await bcrypt.genSalt();
  bcrypt
    .hash(uniqueString, salt)
    .then((hashedUniqueString) => {
      let newVerification = new userVerification({
        userId: _id,
        uniqueString: hashedUniqueString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 216000,
      });

      newVerification
        .save()
        .then(() => {
          transporter
            .sendMail(mailOptions)
            .then(() => {
              res.json({
                status: "PENDING",
                message: "email sent",
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => handleError(err));
    })
    .catch((err) =>
      res.json({
        status: "failed",
        message: "An error occurred while hashing unique password",
      })
    );
};

export const signup = async (req: Request<personModel>, res: Response) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    department,
    intrests,
  } = req.body;

  if (password === confirmPassword) {
    try {
      let newUser = await user.create({
        email,
        password,
        firstName,
        lastName,
        department,
        intrests,
        verified: false,
      });
      if (newUser) {
        sendVerificationMail(newUser, res);
      } else {
        res.json({
          error: "Error occurred with saving user",
        });
      }
    } catch (err: any) {
      let error = handleError(err);
      res.json(error);
    }
  } else {
    res.json({
      error: "passwords dont match",
    });
  }
};
