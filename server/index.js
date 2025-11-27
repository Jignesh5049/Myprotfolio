import express from "express";
import cors from "cors";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(MESSAGES_FILE);
  } catch {
    await fs.writeFile(MESSAGES_FILE, "[]", "utf-8");
  }
}

async function appendMessage(entry) {
  const raw = await fs.readFile(MESSAGES_FILE, "utf-8");
  const messages = JSON.parse(raw);
  messages.push(entry);
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
}

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: "Please provide a valid email." });
  }

  const entry = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };

  try {
    await appendMessage(entry);
    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Failed to store contact message", error);
    res.status(500).json({ success: false, error: "Unable to save message right now." });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

ensureDataFile()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Contact API running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to start server", error);
    process.exit(1);
  });

