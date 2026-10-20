import { prisma } from "../../lib/prisma";
import { findUserWithTag } from "./userQueries";
import { Message } from "../types/messageTypes";

async function getDirectMessageQuery(id: string) {
  const directMessageChannel = await prisma.directMessageChannel.findUnique({
    where: {
      id: id,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  return directMessageChannel;
}

async function createFriendRequestQuery(senderId: string, tag: string) {
  const friend = await findUserWithTag(tag);

  if (!friend) {
    throw new Error("Benutzer mit diesem Tag wurde nicht gefunden.");
  }

  if (friend.id === senderId) {
    throw new Error("Du kannst dir selbst keine Freundschaftsanfrage senden.");
  }

  const existingRelationship = await prisma.friends.findFirst({
    where: {
      OR: [
        { userId: senderId, friendId: friend.id },
        { userId: friend.id, friendId: senderId },
      ],
    },
  });

  if (existingRelationship) {
    throw new Error(
      "Ihr seid bereits befreundet oder es gibt eine offene Anfrage.",
    );
  }

  const friendRequest = await prisma.friends.create({
    data: {
      userId: senderId,
      friendId: friend.id,
      status: "PENDING",
    },
  });

  return friendRequest;
}

async function sendMessage(message: Message) {}

export { getDirectMessageQuery, createFriendRequestQuery };
