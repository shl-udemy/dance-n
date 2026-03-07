# PRD: Dance Request Tool

## Overview
A bilingual (Hebrew + English) web application where attendees at a dance event can submit a dance request. The request is forwarded to the Telegram group corresponding to the selected venue, and logged to a shared Google Sheet for summaries and history.

## Users
- **Attendees** — submit dance requests via the web form
- **Organizers** — receive requests in real time via Telegram; review history in Google Sheets

## Form Fields
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Your Name / שמך | Text | Yes | Persisted in localStorage |
| Dance Name / שם הריקוד | Text | Yes | Free text |
| Performer / מבצע | Text | No | Optional free text |
| Dance Type / סוג ריקוד | Radio | Yes | זוגות (Couples) / מעגל (Circle) |
| Place / מקום | Select | Yes | Dance-R / Dance-B / Dance-Z |

## Telegram Message (always Hebrew)
```
🪩 בקשת ריקוד

📅 03/03/2026 | 21:34
👤 שם: [user name]
🎵 ריקוד: [dance name]
🎭 מבצע: [performer]        ← omitted if blank
👥 סוג: זוגות / מעגל
```
Each place routes to its own Telegram group.

## Google Sheets Log
Every submission appends a row:
`Timestamp | Place | Name | Dance | Performer | Type`

One shared sheet for all venues. Use for filtering, pivot tables, and future summary UI.

## Behavior
- **Language**: Hebrew primary (RTL layout), English secondary labels
- **Post-submit**: Inline success message → form resets (name field keeps its value)
- **Rate limit**: 1 request per minute per browser (localStorage timestamp)
- **No login required**: Form is open to anyone with the URL
- **Sheet failure is non-blocking**: Telegram send succeeds even if Sheets logging fails

## Non-Goals (v1)
- User accounts or authentication
- Admin dashboard
- Notifications back to the requester
- Summary UI page (future `/summary` route — data is collected from day one)

## Tech Stack
- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Hosting**: Vercel (free tier)
- **Integrations**: Telegram Bot API, Google Sheets API v4 (via `googleapis`)

## Future: Summary Page
Once sufficient data is collected, a `/summary` page can be added:
- Filter by place, date range, dance type
- Show top dances, busiest hours, requests per venue
- No architecture changes needed — reads from the same Google Sheet
