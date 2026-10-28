import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";

import cors from "cors";

import { router } from "./routers/router";
import { authRouter } from "./routers/authRouter";
import { messagesRouter } from "./routers/messagesRouter";
import { initSocket } from "./socket";

// Initialisiere Express
const app = express();
const PORT = process.env.PORT || 3000;

// 1. Erstelle den HTTP-Server auf Basis von Express
const server = http.createServer(app);

// 2. Initialisiere Socket.io und verbinde es mit dem HTTP-Server
// Wichtig: CORS für den Client (Vite läuft standardmäßig auf Port 5173) erlauben
initSocket(server);

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api", router);
app.use("/api/auth", authRouter);
app.use("/api/messages", messagesRouter);

// Beispiel-Route zum Testen, ob das Backend lebt
app.get("/api/health", (req, res) => {
  res
    .status(200)
    .json({ status: "Server läuft und ist bereit für den Discord-Klon!" });
});

// WICHTIG: Wir starten nicht `app.listen`, sondern `server.listen`!
server.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
});
