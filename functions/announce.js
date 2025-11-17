// functions/announce.js
import fetch from "node-fetch"; // only needed if Node <18

const WEBHOOK_URL = "https://discord.com/api/webhooks/1434522950404407307/xMeCEonmw4Chm357er5EAH9hjS6VwSgy79xmAQwDyEm6_wkE_rkoBjzIer36CaPb0IG8";
const roleId = "1434522137498095757"; // @Minecrafter role

export async function sendAnnouncement(message, discordId) {
  if (!message) {
    throw new Error("Message required");
  }

  try {
    const payload = {
      content: `<@&${roleId}>`, // role ping
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

    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Discord webhook error:", text);
      throw new Error("Failed to send webhook");
    }

    console.log("Announcement sent with Patch Notes:", message);
    return { success: true, message: "Announcement sent!" };
  } catch (err) {
    console.error("Webhook exception:", err);
    throw err;
  }
}
