import express, { Express, Router } from "express";
import { signup } from "../controller/auth";

const authRouter: Router = express.Router();

authRouter.post("/signup", signup);

export default authRouter;
