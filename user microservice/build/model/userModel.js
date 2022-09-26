"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const validator_1 = __importDefault(require("validator"));
const { isEmail } = validator_1.default;
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
