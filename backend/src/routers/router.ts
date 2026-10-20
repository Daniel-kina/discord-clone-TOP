import express from "express";
import { getMyProfile } from "../controllers/userController";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users/me", verifyToken, getMyProfile);

export { router };
