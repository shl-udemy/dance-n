export interface RequestData {
  name: string;
  danceName: string;
  performer?: string;
  danceType: "couples" | "circle";
  place: "Dance-R" | "Dance-B" | "Dance-Z";
}

const DANCE_TYPE_LABEL: Record<RequestData["danceType"], string> = {
  couples: "זוגות",
  circle: "מעגל",
};

export function getChatId(place: string): string | undefined {
  const map: Record<RequestData["place"], string | undefined> = {
    "Dance-R": process.env.TELEGRAM_CHAT_ID_DANCE_R,
    "Dance-B": process.env.TELEGRAM_CHAT_ID_DANCE_B,
    "Dance-Z": process.env.TELEGRAM_CHAT_ID_DANCE_Z,
  };
  return map[place as RequestData["place"]];
}

export function buildMessage(data: RequestData): string {
  const now = new Date();
  const date = now.toLocaleDateString("he-IL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const time = now.toLocaleTimeString("he-IL", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const lines = [
    "🪩 בקשת ריקוד",
    "",
    `📅 ${date} | ${time}`,
    `👤 שם: ${data.name}`,
    `🎵 ריקוד: ${data.danceName}`,
  ];

  if (data.performer) {
    lines.push(`🎭 מבצע: ${data.performer}`);
  }

  lines.push(`👥 סוג: ${DANCE_TYPE_LABEL[data.danceType]}`);

  return lines.join("\n");
}

export async function sendToTelegram(
  chatId: string,
  message: string
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error("TELEGRAM_BOT_TOKEN is not set");

  const send = async (id: string) =>
    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: id, text: message }),
    });

  let res = await send(chatId);

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    // Group was upgraded to a supergroup — retry with the new chat ID
    if (json?.parameters?.migrate_to_chat_id) {
      const newId = String(json.parameters.migrate_to_chat_id);
      console.warn(`Chat ${chatId} migrated to supergroup ${newId} — retrying`);
      res = await send(newId);
    }

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Telegram API error ${res.status}: ${body}`);
    }
  }
}
