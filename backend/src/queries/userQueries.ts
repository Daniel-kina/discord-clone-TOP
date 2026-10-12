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

export { createUserQuery };
