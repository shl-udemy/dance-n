import { NextRequest, NextResponse } from "next/server";
import { sendToTelegram } from "@/lib/telegram";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, phone, email, locations, times } = body;

  if (!name?.trim() || !phone?.trim()) {
    return NextResponse.json({ error: "שם וטלפון הם שדות חובה" }, { status: 400 });
  }

  const chatId = process.env.TELEGRAM_CHAT_ID_DANCE_B;
  if (!chatId) {
    console.error("TELEGRAM_CHAT_ID_DANCE_B is not set");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const emailLine = email?.trim() ? `\n📧 אימייל: ${email.trim()}` : "";
  const locationsLine = Array.isArray(locations) && locations.length > 0 ? `\n📍 מיקום: ${locations.join(", ")}` : "";
  const timesLine = Array.isArray(times) && times.length > 0 ? `\n🗓 יום: ${times.join(", ")}` : "";

  const message =
    `🎓 הרשמה לסדנא!\n` +
    `👤 שם: ${name.trim()}\n` +
    `📱 טלפון: ${phone.trim()}` +
    emailLine +
    locationsLine +
    timesLine;

  try {
    await sendToTelegram(chatId, message);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Telegram workshop signup failed:", err);
    return NextResponse.json({ error: "Failed to send signup" }, { status: 500 });
  }
}
