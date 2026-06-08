# Google Sheets API Cheatsheet

Using the `googleapis` Node.js package (v4 API) with service account authentication — as used in this project.

---

## Setup

```bash
npm install googleapis
```

---

## Authentication — Service Account

Service accounts are the right choice for server-side apps (no user login needed).

### Create a service account
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Enable **Google Sheets API** for your project
3. IAM & Admin → Service Accounts → **Create Service Account**
4. Keys tab → **Add Key → JSON** → download the file

### Give access to your sheet
Open the Google Sheet → Share → paste the service account email (e.g. `my-sa@project.iam.gserviceaccount.com`) → **Editor**

### Use in code

```ts
import { google } from "googleapis";

const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });
```

> Store the full JSON file content as a single-line string in `GOOGLE_SERVICE_ACCOUNT_JSON`.

---

## Common Operations

### Append a row

```ts
await sheets.spreadsheets.values.append({
  spreadsheetId: SHEET_ID,
  range: "A1",                    // Sheets finds the next free row automatically
  valueInputOption: "USER_ENTERED",
  requestBody: {
    values: [["col1", "col2", "col3"]],
  },
});
```

> Always use `"A1"` as the range for append — not `"Sheet1!A:Z"`. Using a column range can skip rows.

### Read a range

```ts
const res = await sheets.spreadsheets.values.get({
  spreadsheetId: SHEET_ID,
  range: "Sheet1!A1:F100",
});
const rows = res.data.values ?? [];
```

### Update a specific cell

```ts
await sheets.spreadsheets.values.update({
  spreadsheetId: SHEET_ID,
  range: "Sheet1!B2",
  valueInputOption: "USER_ENTERED",
  requestBody: {
    values: [["new value"]],
  },
});
```

### Clear a range

```ts
await sheets.spreadsheets.values.clear({
  spreadsheetId: SHEET_ID,
  range: "Sheet1!A2:Z1000",
});
```

---

## Range Notation (A1 Notation)

| Notation | Meaning |
|---|---|
| `A1` | Single cell |
| `A1:C3` | Block from A1 to C3 |
| `Sheet1!A1:C3` | Explicit sheet name |
| `A:A` | Entire column A |
| `1:1` | Entire row 1 |
| `A1:A` | Column A from row 1 downward (open-ended) |

If you only have one sheet, the sheet name prefix is optional.

---

## valueInputOption

| Value | Behavior |
|---|---|
| `USER_ENTERED` | Parses as if typed by a user (dates, formulas, numbers formatted) |
| `RAW` | Stored as-is, no parsing |

Use `USER_ENTERED` unless you need exact string storage.

---

## Get the Sheet ID

From the URL: `https://docs.google.com/spreadsheets/d/**<SHEET_ID>**/edit`

---

## Error Reference

| Error | Cause | Fix |
|---|---|---|
| `403 PERMISSION_DENIED` | Sheet not shared with service account | Share sheet with the SA email as Editor |
| `400 Unable to parse range` | Bad range string | Check A1 notation syntax |
| `404 Requested entity was not found` | Wrong `spreadsheetId` | Double-check the ID from the URL |
| `Invalid JSON` | `GOOGLE_SERVICE_ACCOUNT_JSON` not minified | Minify the JSON to one line before setting env var |

---

## How This Project Uses It

- **File**: `lib/sheets.ts`
- **Trigger**: Every successful dance request via `POST /api/request`
- **Behavior**: Non-blocking — Sheet failure logs a warning but doesn't fail the request
- **Columns**: Timestamp | Place | Name | Dance | Performer | Type
- **Auth**: Full service account JSON stored in `GOOGLE_SERVICE_ACCOUNT_JSON` env var
