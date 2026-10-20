import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super-geheimes-geheimnis";

export function generateToken(userId: string, username: string) {
  return jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: "7d" });
}
