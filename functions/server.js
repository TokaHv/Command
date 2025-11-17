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

// Check whitelist route
app.post("/check-whitelist", (req, res) => {
  const { id: discordId } = req.body;

  const whitelistPath = path.join(process.cwd(), "functions", "whitelist-check.json");
  const whitelistData = JSON.parse(fs.readFileSync(whitelistPath, "utf8"));

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

app.listen(port, () => console.log(`Server running on port ${port}`));
