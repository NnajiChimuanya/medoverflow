import mongoose, { ObjectId } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  verified: boolean;
  firstName: string;
  lastName: string;
  intrests: string[];
  _id?: ObjectId;
  _v?: number;
}

export default IUser;
