import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import { router } from "./routers/router";
import { authRouter } from "./routers/authRouter";

// Initialisiere Express
const app = express();
const PORT = process.env.PORT || 3000;

// 1. Erstelle den HTTP-Server auf Basis von Express
const server = http.createServer(app);

// 2. Initialisiere Socket.io und verbinde es mit dem HTTP-Server
// Wichtig: CORS für den Client (Vite läuft standardmäßig auf Port 5173) erlauben
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

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

// Beispiel-Route zum Testen, ob das Backend lebt
app.get("/api/health", (req, res) => {
  res
    .status(200)
    .json({ status: "Server läuft und ist bereit für den Discord-Klon!" });
});

// 3. Socket.io Verbindungseile (Hier passiert die Echtzeit-Magie)
io.on("connection", (socket) => {
  console.log(`[Socket.io] Ein User hat sich verbunden: ${socket.id}`);

  // Test-Event: Wenn ein Client eine Nachricht sendet
  socket.on("send_message", (data) => {
    console.log("Nachricht empfangen:", data);

    // Sende die Nachricht an alle verbundenen Clients (Broadcast)
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`[Socket.io] User getrennt: ${socket.id}`);
  });
});

// WICHTIG: Wir starten nicht `app.listen`, sondern `server.listen`!
server.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
});
