import { Server } from "socket.io";
import http from "http";

let io: Server;

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // 1. Hole die userId, die das Frontend beim Verbinden mitschickt
    const userId = socket.handshake.auth.userId;

    if (userId) {
      // Packe den User in seinen ganz persönlichen Raum!
      socket.join(`user:${userId}`);
      console.log(`[Socket.io] User ${userId} ist in seinem globalen Raum.`);
    }

    // 2. Raum beitreten, wenn man einen spezifischen Chat öffnet
    socket.on("join_channel", (channelId: string) => {
      socket.join(channelId);
      console.log(
        `[Socket.io] User ist dem Channel-Raum beigetreten: ${channelId}`,
      );
    });

    socket.on("disconnect", () => {
      console.log(`[Socket.io] User getrennt: ${socket.id}`);
    });
  });

  return io;
};

// Hilfsfunktion, falls du die `io`-Instanz später in deinen Controllern brauchst
export const getIo = () => {
  if (!io) {
    throw new Error("Socket.io wurde noch nicht initialisiert!");
  }
  return io;
};
