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

//Error handler
const handleError = (err: any) => {
  let error = { error: "An error occurred" };

  if (err.message.includes("enter valid email")) {
    error = {
      error: "Enter valid email",
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
