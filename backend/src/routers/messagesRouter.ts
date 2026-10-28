import { verifyToken } from "../middleware/authMiddleware.js";
import express from "express";
import {
  getDirectMessages,
  addFriend,
  sendDirectMessage,
} from "../controllers/directMessagesController.js";

const messagesRouter = express.Router();

messagesRouter.get(
  "/directChannelMessages/:directMessageChannelId",
  verifyToken,
  getDirectMessages,
);

messagesRouter.post("/send", verifyToken, sendDirectMessage);

messagesRouter.post("/addFriend/:friendTag", verifyToken, addFriend);

export { messagesRouter };
