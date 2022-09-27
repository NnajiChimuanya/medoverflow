import { Response, Request } from "express";
import user from "../model/userModel";

interface personModel extends Request {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  department: string;
  intrests: string[];
}

// const handleError = (err : any) => {
//   let error : { }

//   return error;
// }

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
      let newUser = user.create({
        email,
        password,
        firstName,
        lastName,
        department,
        intrests,
      });
      res.json(newUser);
    } catch (err: any) {
      console.log(err);
      // let error = handleError(err);
    }
  } else {
    res.json({
      error: "passwords dont match",
    });
  }
};
