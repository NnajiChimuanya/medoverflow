import mongoose, { model, Document } from "mongoose";
import { Interface } from "readline";
const Schema = mongoose.Schema;
import pkg from "validator";
const { isEmail } = pkg;

interface IUser extends Document {
  email: string;
  password: string;
  verified: boolean;
  firstName: string;
  lastName: string;
  intrests: string[];
}

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "email required"],
    unique: [true, "email already exists"],
    validate: [isEmail, "enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [6, "minimum password length is 6"],
  },
  verified: {
    type: Boolean,
  },
  firstName: {
    type: String,
    required: [true, "firstname required"],
  },
  lastName: {
    type: String,
    required: [true, "lastname required"],
  },
  department: {
    type: String,
  },
  intrests: {
    type: [String],
  },
});

const user = mongoose.model<IUser>("user", userSchema);

export default user;
