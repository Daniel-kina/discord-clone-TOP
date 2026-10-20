import express from "express";
import { registerUser, loginUser } from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);

export { authRouter };
