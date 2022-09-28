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
exports.confirmEmail = exports.signup = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const nodemailer_1 = require("../nodemailer");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userVerification_1 = __importDefault(require("../model/userVerification"));
//verifying accessibility
// transporter.verify((err, success) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(success);
//   }
// });
//Error handler
const handleError = (err) => {
    let error = { error: "An error occurred" };
    if (err.message) {
        error = {
            error: err.message.split(":")[2],
        };
    }
    if (err.code === 11000) {
        error = {
            error: "Email already exists",
        };
    }
    return error;
};
//
//
//
// sendng verification mail function
const sendVerificationMail = (user, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { _id, email } = user;
    let url = process.env.email_url;
    let uniqueString = (0, uuid_1.v4)() + _id;
    //creating email
    const mailOptions = {
        from: process.env.email,
        to: email,
        subject: "Verify email",
        html: `<p> Verify your email address to complete signup and login </p>
            Expires in <b> 6 hours </b?  
            <p> Click <a href="${url}/user/verify/${_id}/${uniqueString}"> here </a> to verify</p>`,
    };
    const salt = yield bcrypt_1.default.genSalt();
    bcrypt_1.default
        .hash(uniqueString, salt)
        .then((hashedUniqueString) => {
        let newVerification = new userVerification_1.default({
            userId: _id,
            uniqueString: hashedUniqueString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 216000,
        });
        newVerification
            .save()
            .then(() => {
            nodemailer_1.transporter
                .sendMail(mailOptions)
                .then(() => {
                res.json({
                    status: "PENDING",
                    message: "email sent",
                });
            })
                .catch((err) => console.log(err));
        })
            .catch((err) => handleError(err));
    })
        .catch((err) => res.json({
        status: "failed",
        message: "An error occurred while hashing unique password",
    }));
});
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
                verified: false,
            });
            if (newUser) {
                sendVerificationMail(newUser, res);
            }
            else {
                res.json({
                    error: "Error occurred with saving user",
                });
            }
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
const confirmEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        message: "Email verified",
    });
});
exports.confirmEmail = confirmEmail;
