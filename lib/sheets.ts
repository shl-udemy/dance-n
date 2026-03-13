import { google } from "googleapis";
import type { RequestData } from "./telegram";

export async function logToSheet(data: RequestData): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const rawJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

  if (!sheetId || !rawJson) {
    const missing = [!sheetId && "GOOGLE_SHEET_ID", !rawJson && "GOOGLE_SERVICE_ACCOUNT_JSON"].filter(Boolean);
    console.warn("Google Sheets: missing env vars:", missing.join(", "), "— skipping log");
    return;
  }

  let credentials: ReturnType<typeof JSON.parse>;
  try {
    credentials = JSON.parse(rawJson);
  } catch (parseErr) {
    console.error("Google Sheets: failed to parse GOOGLE_SERVICE_ACCOUNT_JSON:", (parseErr as Error).message);
    return;
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const timestamp = new Date().toLocaleString("he-IL", {
      timeZone: "Asia/Jerusalem",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            timestamp,
            data.place,
            data.name,
            data.danceName,
            data.performer ?? "",
            data.danceType === "couples" ? "זוגות" : "מעגל",
          ],
        ],
      },
    });
    console.log("Google Sheets: row logged successfully");
  } catch (err) {
    console.warn("Failed to log to Google Sheets:", (err as Error).message ?? err);
  }
}
