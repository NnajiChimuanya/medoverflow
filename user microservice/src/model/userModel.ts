import mongoose from "mongoose";
import { Interface } from "readline";
import IUser from "../interface/userInterface";
const Schema = mongoose.Schema;
import pkg from "validator";
const { isEmail } = pkg;
import bcrypt from "bcrypt";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email required"],
    unique: [true, "Email already exists"],
    validate: [isEmail, "Enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [6, "Minimum password length is 6"],
  },
  verified: {
    type: Boolean,
  },
  firstName: {
    type: String,
    required: [true, "Firstname required"],
  },
  lastName: {
    type: String,
    required: [true, "Lastname required"],
  },
  department: {
    type: String,
  },
  intrests: {
    type: [String],
  },
});

userSchema.pre<IUser>("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const user = mongoose.model<IUser>("user", userSchema);

export default user;
