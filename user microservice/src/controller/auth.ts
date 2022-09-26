import { Response, Request } from "express";
import mongoose, { Document } from "mongoose";
import IUser from "../interface/userInterface";

interface personModel extends Request {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  intrests: string[];
}

export const signup = async (
  req: Request<{}, {}, personModel>,
  res: Response
) => {
  const { email, password, firstName, lastName, intrests } = req.body;

  res.json({ email, password, firstName, lastName, intrests });
};
