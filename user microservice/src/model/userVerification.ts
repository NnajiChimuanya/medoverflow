import mongoose from "mongoose";
import IUserVerfication from "../interface/userVerificationInterface";
const Schema = mongoose.Schema;

const userVerificationSchema = new Schema({
  userId: String,
  uniqueString: String,
  createdAt: Date,
  expiresAt: Date,
});

const userVerification = mongoose.model<IUserVerfication>(
  "userVerification",
  userVerificationSchema
);

export default userVerification;
