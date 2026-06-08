# Dance Request Tool

A Hebrew-language web app for Israeli folk dance events. Attendees submit live dance requests that are delivered instantly to the DJ via Telegram. Also handles event signups and a standalone workshop landing page.

## Features

- **Dance requests** — form at `/request`, sends to venue-specific Telegram group + logs to Google Sheets
- **Event signup** — landing page at `/join`, sends to a dedicated Telegram group
- **Workshop landing page** — standalone page at `/workshop` with signup form, sends to Dance-B Telegram group
- **Venue pages** — Beer Sheva, Raanana, Ramat Gan, Tzora with event schedules
- Hebrew RTL layout throughout; all Telegram messages in Hebrew
- No database — Google Sheets is the only persistent store

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Notifications | Telegram Bot API (HTTP fetch) |
| Logging | Google Sheets API v4 (`googleapis`) |
| Hosting | Vercel (free tier) |

## Routes

| Path | Description |
|---|---|
| `/` | Homepage with venue list |
| `/request` | Dance request form |
| `/join` | Event signup landing page |
| `/workshop` | Standalone workshop landing page (no navbar) |
| `/BeerSheva` `/Raanana` `/RamatGan` `/Tzora` | Venue detail pages |

## API Endpoints

| Endpoint | Description |
|---|---|
| `POST /api/request` | Submit a dance request → Telegram + Sheets |
| `POST /api/signup` | Event signup → `TELEGRAM_CHAT_ID_SIGNUPS` |
| `POST /api/workshop-signup` | Workshop signup → `TELEGRAM_CHAT_ID_DANCE_B` |

## Local Development

```bash
npm install
cp .env.example .env.local   # fill in your secrets
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in all values.

| Variable | Required | Description |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Yes | From [@BotFather](https://t.me/BotFather) |
| `TELEGRAM_CHAT_ID_DANCE_R` | Yes | Telegram group ID for Dance-R venue |
| `TELEGRAM_CHAT_ID_DANCE_B` | Yes | Telegram group ID for Dance-B venue (also receives workshop signups) |
| `TELEGRAM_CHAT_ID_DANCE_Z` | Yes | Telegram group ID for Dance-Z venue |
| `TELEGRAM_CHAT_ID_SIGNUPS` | Yes | Telegram group ID for `/join` event signups |
| `GOOGLE_SHEET_ID` | No | Sheet ID from the URL (`/d/<ID>/edit`) |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | No | Full service account JSON, minified to one line |

> Sheet logging is non-blocking — if Sheets fails the request still succeeds. If `GOOGLE_SHEET_ID` or `GOOGLE_SERVICE_ACCOUNT_JSON` are missing, logging is silently skipped.

### Google Sheets setup

The service account must have **Editor** access to the target sheet. Sheet columns (row 1 is data, no header row enforced):

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Timestamp | Place | Name | Dance | Performer | Type |

## Client-side Behavior

- Name is persisted in `localStorage` (`dance_request_name`) so repeat visitors don't retype it
- Rate limit: 1 submission per minute, enforced via `localStorage` timestamp (`dance_request_last_submit`)

## Deployment

Push to `main` → Vercel auto-deploys. Set all env vars in the Vercel project dashboard under **Settings → Environment Variables**.
