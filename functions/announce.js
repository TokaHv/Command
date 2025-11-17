// functions/announce.js
import fetch from "node-fetch";

const WEBHOOK_URL = "https://discord.com/api/webhooks/...";
const roleId = "1434522137498095757";

export async function sendAnnouncement(message, discordId) {
  const payload = {
    content: `<@&${roleId}>`,
    embeds: [
      {
        title: "🌸🌷  ｍｉｎｅｃｒａｆｔ  ｕｐｄａｔｅ • 🌷🌸",
        color: 0xf8bbd0,
        description: "╭──────────────────────────────╮\n" +
                     " 🌸 *Cherry petals are dancing in the wind...* 🌸\n" +
                     " 💖 *A new update has bloomed beautifully!* 💖\n" +
                     "╰──────────────────────────────╯",
        fields: [
          {
            name: "🌸 Patch Notes",
            value: "```md\n[ 🌷 MINECRAFT UPDATE 🌷 ]\n──────────────────────────────────────────────\n" +
                   `${message}\n````
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

  if (!response.ok) throw new Error("Failed to send webhook");

  return { success: true, message: "Announcement sent!" };
}
