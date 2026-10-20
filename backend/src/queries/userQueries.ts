import { prisma } from "../../lib/prisma";
import { User } from "../types/user";

async function createUserQuery(data: User) {
  const createdUser = prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      passwordHash: data.passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      tag: data.tag,
    },
  });
  return createdUser;
}

async function findUserWithEmailQuery(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
}

async function findUserWithTag(tag: string) {
  const user = await prisma.user.findUnique({
    where: {
      tag: tag,
    },
  });

  return user;
}

async function getUserByIdQuery(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      firstName: true,
      lastName: true,
      tag: true,
      // passwordHash lassen wir natürlich weg (Sicherheit!)
      sentDmChannels: true,
      receivedDmChannels: true,
    },
  });

  return user;
}

export {
  createUserQuery,
  findUserWithEmailQuery,
  getUserByIdQuery,
  findUserWithTag,
};
