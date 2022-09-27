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
exports.signup = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
//Error handler
const handleError = (err) => {
    let error = { error: "An error occurred" };
    if (err.message.includes("enter valid email")) {
        error = {
            error: "Enter valid email",
        };
    }
    return error;
};
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, confirmPassword, firstName, lastName, department, intrests, } = req.body;
    if (password === confirmPassword) {
        try {
            let newUser = yield userModel_1.default.create({
                email,
                password,
                firstName,
                lastName,
                department,
                intrests,
            });
            res.json(newUser);
        }
        catch (err) {
            let error = handleError(err);
            res.json(error);
        }
    }
    else {
        res.json({
            error: "passwords dont match",
        });
    }
});
exports.signup = signup;
