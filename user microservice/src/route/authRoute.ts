import express, { Express, Router, Request, Response } from "express";
import { signup, confirmEmail } from "../controller/auth";

const authRouter: Router = express.Router();

authRouter.post("/signup", signup);

authRouter.post("/confirmEmail", confirmEmail);

export default authRouter;
