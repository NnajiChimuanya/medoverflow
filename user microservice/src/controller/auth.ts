import { Response, Request } from "express";
import user from "../model/userModel";
import { transporter } from "../nodemailer";

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
      res.json(newUser);
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
