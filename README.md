# Dance Request Tool

A Hebrew-language web app for Israeli folk dance events. Attendees submit live dance requests that are delivered instantly to the DJ via Telegram.

## Features

- **Dance requests** — form at `/request` with up to 3 dance rows per submission (only the first is required), each with its own optional couples/circle type; sends one combined Telegram message + logs one Google Sheets row per dance to the Beer Sheva (`Dance-B`) group
- All other pages (homepage, venue pages, `/join`, `/workshop`) redirect straight to `/request`; their code is kept in place but unreachable, for easy revert
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
| `/request` | Dance request form — the only page open to users |
| `/` `/join` `/workshop` `/BeerSheva` `/Raanana` `/RamatGan` `/Tzora` | All redirect to `/request` (page code left in place, unreachable, for easy revert) |

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
| `TELEGRAM_CHAT_ID_DANCE_R` | No | Telegram group ID for Dance-R venue (currently unused — `/api/request` only submits to Dance-B) |
| `TELEGRAM_CHAT_ID_DANCE_B` | Yes | Telegram group ID for Dance-B venue — the only place `/request` currently submits to; also receives workshop signups |
| `TELEGRAM_CHAT_ID_DANCE_Z` | No | Telegram group ID for Dance-Z venue (currently unused — `/api/request` only submits to Dance-B) |
| `TELEGRAM_CHAT_ID_SIGNUPS` | Yes | Telegram group ID for `/join` event signups |
| `GOOGLE_SHEET_ID` | No | Sheet ID from the URL (`/d/<ID>/edit`) |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | No | Full service account JSON, minified to one line |

> Sheet logging is non-blocking — if Sheets fails the request still succeeds. If `GOOGLE_SHEET_ID` or `GOOGLE_SERVICE_ACCOUNT_JSON` are missing, logging is silently skipped.

### Google Sheets setup

The service account must have **Editor** access to the target sheet. Sheet columns (row 1 is data, no header row enforced):

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Timestamp | Place | Name | Dance | Performer (unused, always blank) | Type |

## Client-side Behavior

- Name is persisted in `localStorage` (`dance_request_name`) so repeat visitors don't retype it
- Rate limit: 1 submission per minute, enforced via `localStorage` timestamp (`dance_request_last_submit`)

## Deployment

Push to `main` → Vercel auto-deploys. Set all env vars in the Vercel project dashboard under **Settings → Environment Variables**.
