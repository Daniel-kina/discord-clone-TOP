import express from "express";
import { createUser } from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/login");
authRouter.post("/register", createUser);

export { authRouter };
