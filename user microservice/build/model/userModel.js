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
const user = mongoose_1.default.model("user", userSchema);
exports.default = user;
