import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import path from "path";
import Database from "better-sqlite3";
import fs from "fs";

const PORT = 3000;
const db = new Database("easypodcast.db");

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT,
    video_url TEXT,
    subtitles JSON,
    password TEXT
  );
`);

// Migration: Add password column if it doesn't exist
try {
  db.prepare("SELECT password FROM projects LIMIT 1").get();
} catch (e: any) {
  if (e.message.includes("no such column: password")) {
    console.log("Migrating database: Adding password column to projects table");
    db.exec("ALTER TABLE projects ADD COLUMN password TEXT");
  }
}

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  app.use(express.json());

  // API Routes
  app.get("/api/projects", (req, res) => {
    const projects = db.prepare("SELECT * FROM projects ORDER BY created_at DESC").all();
    const parsedProjects = projects.map((p: any) => ({
      ...p,
      subtitles: p.subtitles ? JSON.parse(p.subtitles) : []
    }));
    res.json(parsedProjects);
  });

  app.post("/api/projects", (req, res) => {
    const { id, name, password } = req.body;
    db.prepare("INSERT INTO projects (id, name, status, password) VALUES (?, ?, ?, ?)").run(id, name, 'draft', password || null);
    res.json({ success: true });
  });

  app.patch("/api/projects/:id", (req, res) => {
    const { id } = req.params;
    const { name, status, subtitles, password } = req.body;
    const updates: string[] = [];
    const params: any[] = [];

    if (name) { updates.push("name = ?"); params.push(name); }
    if (status) { updates.push("status = ?"); params.push(status); }
    if (subtitles) { updates.push("subtitles = ?"); params.push(JSON.stringify(subtitles)); }
    if (password) { updates.push("password = ?"); params.push(password); }

    if (updates.length > 0) {
      params.push(id);
      db.prepare(`UPDATE projects SET ${updates.join(", ")} WHERE id = ?`).run(...params);
    }
    res.json({ success: true });
  });

  app.delete("/api/projects/:id", (req, res) => {
    const { id } = req.params;
    console.log("Server: Deleting project with ID:", id);
    const result = db.prepare("DELETE FROM projects WHERE id = ?").run(id);
    console.log("Server: Delete result:", result);
    res.json({ success: true });
  });

  // WebRTC Signaling
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      socket.to(roomId).emit("user-joined", socket.id);
    });

    socket.on("offer", ({ roomId, offer }) => {
      socket.to(roomId).emit("offer", { offer, from: socket.id });
    });

    socket.on("answer", ({ roomId, answer }) => {
      socket.to(roomId).emit("answer", { answer, from: socket.id });
    });

    socket.on("ice-candidate", ({ roomId, candidate }) => {
      socket.to(roomId).emit("ice-candidate", { candidate, from: socket.id });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
      configFile: path.resolve(process.cwd(), "vite.config.ts"),
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
