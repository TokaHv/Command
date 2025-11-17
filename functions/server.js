// functions/server.js
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { sendAnnouncement } from "./announce.js"; // import announce.js

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend files from public/
const publicPath = path.join(process.cwd(), "public");
app.use(express.static(publicPath));

// Root route -> index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// Check whitelist route
app.post("/check-whitelist", (req, res) => {
  const { id: discordId } = req.body;

  const whitelistPath = path.join(process.cwd(), "whitelist.json");
  let whitelistData;

  try {
    whitelistData = JSON.parse(fs.readFileSync(whitelistPath, "utf8"));
  } catch (err) {
    console.error("Error reading whitelist.json:", err);
    return res.status(500).json({ allowed: false, username: null, error: "Whitelist file error" });
  }

  const user = whitelistData.allowedIds.find(u => u.id === discordId);
  res.json({ allowed: !!user, username: user ? user.username : null });
});

// Announce route
app.post("/announce", async (req, res) => {
  const { message, discordId } = req.body;
  if (!message) return res.status(400).json({ error: "Message required" });

  try {
    const result = await sendAnnouncement(message, discordId);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send webhook" });
  }
});

// Serve command-center.html correctly
app.get("/command-center.html", (req, res) => {
  res.sendFile(path.join(publicPath, "command-center.html"));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
