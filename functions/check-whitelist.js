import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // parse JSON body

// POST /check-whitelist route
app.post("/check-whitelist", (req, res) => {
  const { id: discordId } = req.body; // frontend sends {id: discordId}

  const whitelistPath = path.join(process.cwd(), "functions", "whitelist-check.json");
  const whitelistData = JSON.parse(fs.readFileSync(whitelistPath, "utf8"));

  const user = whitelistData.allowedIds.find(u => u.id === discordId);

  res.json({ allowed: !!user, username: user ? user.username : null });
});

// POST /announce route (your existing announce.js logic)
app.post("/announce", (req, res) => {
  const { message, discordId } = req.body;
  console.log(`Announcement from ${discordId}: ${message}`);
  // Here you can add your Discord webhook sending logic
  res.json({ success: true, message: "Announcement sent!" });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
