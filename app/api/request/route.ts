import { NextRequest, NextResponse } from "next/server";
import { buildMessage, getChatId, sendToTelegram } from "@/lib/telegram";
import type { RequestData } from "@/lib/telegram";
import { logToSheet } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, danceName, performer, danceType, place } = body;

  if (!name?.trim() || !danceName?.trim() || !danceType || !place) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const chatId = getChatId(place);
  if (!chatId) {
    return NextResponse.json({ error: "Unknown place" }, { status: 400 });
  }

  const data: RequestData = {
    name: name.trim(),
    danceName: danceName.trim(),
    performer: performer?.trim() || undefined,
    danceType,
    place,
  };

  const message = buildMessage(data);

  const [telegramResult, sheetsResult] = await Promise.allSettled([
    sendToTelegram(chatId, message),
    logToSheet(data),
  ]);

  if (telegramResult.status === "rejected") {
    console.error("Telegram send failed:", telegramResult.reason);
    return NextResponse.json({ error: "Failed to send request" }, { status: 500 });
  }

  if (sheetsResult.status === "rejected") {
    console.warn("Sheets log failed (non-blocking):", sheetsResult.reason);
  }

  return NextResponse.json({ success: true });
}
