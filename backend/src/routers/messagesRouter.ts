import { verifyToken } from "../middleware/authMiddleware.js";
import express from "express";
import {
  getDirectMessages,
  addFriend,
} from "../controllers/directMessagesController.js";

const messagesRouter = express.Router();

messagesRouter.get(
  "/directChannelMessages/:directMessageChannelId",
  verifyToken,
  getDirectMessages,
);

messagesRouter.post("/addFriend/:friendTag", addFriend);

export { messagesRouter };
