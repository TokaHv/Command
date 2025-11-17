import fs from "fs";
import path from "path";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { discordId } = JSON.parse(event.body || "{}");

  const whitelistPath = path.join(process.cwd(), "whitelist.json");
  const whitelistData = JSON.parse(fs.readFileSync(whitelistPath, "utf8"));

  const user = whitelistData.allowedIds.find(u => u.id === discordId);

  return {
    statusCode: 200,
    body: JSON.stringify({ allowed: !!user, username: user ? user.username : null }),
  };
}
