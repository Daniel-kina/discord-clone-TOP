import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import { createUserQuery } from "../queries/userQueries";

const createUser: RequestHandler = async (req, res) => {
  try {
    const { username, email, password, tag, firstName, lastName } = req.body;

    if (!username || !email || !password || !tag || !firstName || lastName) {
      res.status(400).json({ error: "Bitte alle Pflichtfelder ausfüllen!" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await createUserQuery({
      username,
      email,
      passwordHash,
      firstName,
      lastName,
      tag,
    });

    res.status(201).json({
      message: "registrierung erfolgreich",
      userId: newUser.id,
      username: newUser.username,
    });
  } catch (error) {
    console.error("Registrierung erfolgreich!");
    res
      .status(500)
      .json({ error: "Benutzername oder E-Mail ist bereits vergeben." });
  }
};

export { createUser };
