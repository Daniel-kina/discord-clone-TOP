import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import {
  createUserQuery,
  findUserWithEmailQuery,
} from "../queries/userQueries";
import { generateToken } from "../utils/jwt";

const registerUser: RequestHandler = async (req, res) => {
  try {
    const { username, email, password, tag, firstName, lastName } = req.body;

    if (!username || !email || !password || !tag || !firstName || !lastName) {
      res.status(400).json({ error: "Bitte alle Pflichtfelder ausfüllen!" });
      return;
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

    const token = generateToken(newUser.id, newUser.username);

    res.status(201).json({
      message: "registrierung erfolgreich",
      token: token,
      user: {
        userId: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registrierung fehlgeschlagen!");
    res.status(500).json({ error: "E-Mail ist bereits vergeben." });
  }
};

const loginUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Bitte email und Passwort angeben." });
      return;
    }

    const user = await findUserWithEmailQuery(email);

    if (!user) {
      res.status(401).json({ error: "Ungültiger Benutzername oder Passwort." });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Ungültiger Benutzername oder Passwort." });
      return;
    }

    const token = generateToken(user.id, user.username);

    res.status(200).json({
      message: "Erfolgreich eingeloggt!",
      token: token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login-Fehler:", error);
    res.status(500).json({ error: "Interner Serverfehler beim Login." });
  }
};

export { registerUser, loginUser };
