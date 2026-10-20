import { Response } from "express";
import { AuthenticatedRequest } from "../types/authTypes.js";
import { getUserByIdQuery } from "../queries/userQueries.js";

const getMyProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Die userId haben wir sicher aus dem Token dank der Middleware!
    const userId = req.user?.userId;

    const user = await getUserByIdQuery(userId!);

    if (!user) {
      res.status(404).json({ error: "User nicht gefunden." });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Profil-Fehler: ", error);
    res.status(500).json({ error: "Interner Serverfehler." });
  }
};

const loadMessages = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    const user = await getUserByIdQuery(userId!);
  } catch (error) {
    res.status(500).json({ error: "Interner Serverfehler." });
  }
};

export { getMyProfile };
