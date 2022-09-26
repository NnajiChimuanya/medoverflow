import { Response, Request } from "express";
import user from "../model/userModel";

export const signup = async (req: Request, res: Response) => {
  const { email, password, confirmPassword, firstName, lastName } = req?.body;

  res.json({ email, password, firstName, lastName });
};
