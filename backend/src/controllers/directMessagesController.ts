import { Response } from "express";
import { AuthenticatedRequest } from "../types/authTypes.js";
import {
  getDirectMessageQuery,
  createFriendRequestQuery,
  sendDirectMessageQuery,
} from "../queries/directMessagesQueries.js";
import { getIo } from "../socket.js";

const getDirectMessages = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const directMessageChannelId = req.params.directMessageChannelId as string;

    if (!directMessageChannelId) {
      res.status(400).json({ error: "Channel-ID fehlt." });
      return;
    }

    const directMessageChannel = await getDirectMessageQuery(
      directMessageChannelId,
    );

    if (!directMessageChannel) {
      res.status(404).json({ error: "Konversation nicht gefunden." });
      return;
    }

    if (
      directMessageChannel.user1Id !== userId &&
      directMessageChannel.user2Id !== userId
    ) {
      res.status(403).json({ error: "Kein Zugriff auf diesen Chat." });
      return;
    }

    res.status(200).json(directMessageChannel?.messages);
  } catch (error) {
    console.error("Direct Message Error:", error);
    res.status(500).json({ error: "Interner Serverfehler." });
  }
};

const addFriend = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const friendTag = req.body.friendTag;
    const user = req.user;

    if (!friendTag) {
      res.status(400).json({ error: "Bitte gib einen Friend-Tag an." });
      return;
    }

    if (!user?.userId) {
      res.status(401).json({ error: "Nicht autorisiert." });
      return;
    }

    const friendRequest = await createFriendRequestQuery(
      user.userId,
      friendTag,
    );

    res.status(201).json({
      message: "Freundschaftsanfrage erfolgreich gesendet!",
      friendRequest,
    });
  } catch (error: any) {
    console.error("Add Friend Error:", error);

    // 3. Fehler: Status 400 (Bad Request) und die Fehlermeldung aus der Query übergeben
    res.status(400).json({
      error: error.message || "Fehler beim Senden der Freundschaftsanfrage.",
    });
  }
};

const sendDirectMessage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Wir destrukturieren content und privateChannelId direkt aus req.body
    const { content, privateChannelId, recipientId } = req.body;
    const sender = req.user;

    if (!sender) {
      res.status(400).json({ error: "Kein sender angegeben." });
      return;
    }

    if (!content || !privateChannelId || !recipientId) {
      res.status(400).json({
        error: "Fehlende Daten (content, channelId oder recipientId).",
      });
      return;
    }

    const createdMessage = await sendDirectMessageQuery(
      content,
      privateChannelId,
      sender.userId,
    );

    const io = getIo();

    // 2. 🔥 AN DEN AKTIVEN CHAT SENDEN (falls offen)
    io.to(privateChannelId).emit("new_message", createdMessage);

    // 3. 🔥 AN DEN EMPFÄNGER GLOBAL SENDEN (für Sidebar / Benachrichtigung)
    io.to(`user:${recipientId}`).emit("global_dm_notification", {
      privateChannelId,
      message: createdMessage,
    });

    res.status(201).json({
      message: "Erfolgreich verschickt.",
      data: createdMessage,
    });
  } catch (error: any) {
    console.error("Send DirectMessage Error:", error);
    res.status(400).json({
      error: error.message || "Fehler beim Senden der Direktnachricht.",
    });
  }
};

export { getDirectMessages, addFriend, sendDirectMessage };
