"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const validator_1 = __importDefault(require("validator"));
const { isEmail } = validator_1.default;
const bcrypt_1 = __importDefault(require("bcrypt"));
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
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt();
        this.password = yield bcrypt_1.default.hash(this.password, salt);
        next();
    });
});
const user = mongoose_1.default.model("user", userSchema);
exports.default = user;
