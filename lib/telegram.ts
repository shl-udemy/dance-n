export interface Dance {
  name: string;
  type?: "couples" | "circle";
}

export interface RequestData {
  name?: string;
  dances: Dance[];
  place: "Dance-R" | "Dance-B" | "Dance-Z";
}

const DANCE_TYPE_LABEL: Record<NonNullable<Dance["type"]>, string> = {
  couples: "זוגות",
  circle: "מעגל",
};

function formatDance(d: Dance): string {
  return d.type ? `${d.name} (${DANCE_TYPE_LABEL[d.type]})` : d.name;
}

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
  ];

  if (data.name) {
    lines.push(`👤 שם: ${data.name}`);
  }

  if (data.dances.length === 1) {
    lines.push(`🎵 ריקוד: ${formatDance(data.dances[0])}`);
  } else {
    lines.push(`🎵 ריקודים (${data.dances.length}):`);
    lines.push(...data.dances.map((d, i) => `${i + 1}. ${formatDance(d)}`));
  }

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
