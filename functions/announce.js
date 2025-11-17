import express from "express";
import fetch from "node-fetch"; // install with npm i node-fetch
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const WEBHOOK_URL = "https://discord.com/api/webhooks/1434522950404407307/xMeCEonmw4Chm357er5EAH9hjS6VwSgy79xmAQwDyEm6_wkE_rkoBjzIer36CaPb0IG8";
const roleId = "1434522137498095757"; // @Minecrafter role

// POST /announce route
app.post("/announce", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message required" });
  }

  try {
    const payload = {
      content: `<@&${roleId}>`,
      embeds: [
        {
          title: "🌸🌷  ｍｉｎｅｃｒａｆｔ  ｕｐｄａｔｅ • 🌷🌸",
          color: 0xf8bbd0,
          description:
            "╭──────────────────────────────╮\n" +
            " 🌸 *Cherry petals are dancing in the wind...* 🌸\n" +
            " 💖 *A new update has bloomed beautifully!* 💖\n" +
            "╰──────────────────────────────╯",
          fields: [
            {
              name: "🌸 Patch Notes",
              value:
                "```md\n" +
                "[ 🌷 MINECRAFT UPDATE 🌷 ]\n" +
                "──────────────────────────────────────────────\n" +
                `${message}\n` +
                "```"
            }
          ],
          footer: { text: "Made with 💕 by *Toka* • Minecraft Bot 🌸" },
          timestamp: new Date()
        }
      ]
    };

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error("Discord webhook error:", await response.text());
      return res.status(500).json({ error: "Failed to send webhook" });
    }

    console.log("Announcement sent with Patch Notes:", message);
    res.json({ success: true, message: "Announcement sent!" });
  } catch (err) {
    console.error("Webhook exception:", err);
    res.status(500).json({ error: "Failed to send webhook" });
  }
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
