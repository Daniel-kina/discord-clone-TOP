import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/socket.io": {
        target: "http://localhost:3000",
        ws: true, // Wichtig für WebSockets!
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts", // optional für jest-dom matcher
  },
});
