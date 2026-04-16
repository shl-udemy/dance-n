import { google } from "googleapis";

export type PageContent = Record<string, string>;

export async function getPageContent(): Promise<PageContent> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const rawJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

  if (!sheetId || !rawJson) {
    console.warn("sheets-content: missing env vars — returning empty content");
    return {};
  }

  try {
    const credentials = JSON.parse(rawJson);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Content!A:B",
    });

    const rows = res.data.values ?? [];
    const content: PageContent = {};
    for (const [key, value] of rows) {
      if (key && key !== "Key") {
        content[key.trim()] = value?.trim() ?? "";
      }
    }
    return content;
  } catch (err) {
    console.warn("sheets-content: failed to fetch content:", (err as Error).message ?? err);
    return {};
  }
}
