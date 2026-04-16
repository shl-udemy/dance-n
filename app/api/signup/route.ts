import { NextRequest, NextResponse } from "next/server";
import { sendToTelegram } from "@/lib/telegram";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, phone, email, selectedEvents, remarks } = body;

  if (!name?.trim() || !phone?.trim()) {
    return NextResponse.json({ error: "שם וטלפון הם שדות חובה" }, { status: 400 });
  }

  const chatId = process.env.TELEGRAM_CHAT_ID_SIGNUPS;
  if (!chatId) {
    console.error("TELEGRAM_CHAT_ID_SIGNUPS is not set");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const eventsLine =
    Array.isArray(selectedEvents) && selectedEvents.length > 0
      ? `\n🗓 אירועים: ${selectedEvents.join(", ")}`
      : "";

  const remarksLine = remarks?.trim() ? `\n💬 הערות: ${remarks.trim()}` : "";
  const emailLine = email?.trim() ? `\n📧 אימייל: ${email.trim()}` : "";

  const message =
    `🎉 הרשמה חדשה!\n` +
    `👤 שם: ${name.trim()}\n` +
    `📱 טלפון: ${phone.trim()}` +
    emailLine +
    eventsLine +
    remarksLine;

  try {
    await sendToTelegram(chatId, message);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Telegram signup send failed:", err);
    return NextResponse.json({ error: "Failed to send signup" }, { status: 500 });
  }
}
