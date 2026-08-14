# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [0.10.2] — 2026-08-14

### Changed
- The "+ Add Dance" button is now hidden entirely once the 3-dance max is reached (was previously shown but disabled), and stays disabled until the previous dance row's name is filled in

---

## [0.10.1] — 2026-08-14

### Removed
- Performer field removed from the request form; the Google Sheets "Performer" column is kept for layout compatibility but is now always blank

---

## [0.10.0] — 2026-08-14

### Changed
- Dance type (couples/circle) is now selected per-dance, inline next to each dance-name field, instead of one shared selector for the whole submission
- The form starts with a single dance row and grows via an "+ הוסף ריקוד / Add Dance" button up to the 3-dance max; rows beyond the first can be removed again

---

## [0.9.0] — 2026-08-14

### Added
- Request form now supports up to 3 dance-name slots per submission (only the first is required) instead of a single dance name

### Changed
- A submission with multiple dance names sends one combined Telegram message and logs one Google Sheets row per dance

---

## [0.8.0] — 2026-08-14

### Changed
- Dance requests are now restricted to Beer Sheva (`Dance-B`) — the Place dropdown is removed and `/api/request` hardcodes the target Telegram group server-side
- Only "Dance Name" is required on the request form; name, performer, and dance type are now optional (client + server), and the Telegram message and Sheets row omit/blank any missing optional fields

---

## [0.7.0] — 2026-08-14

### Changed
- All pages except `/request` (homepage, BeerSheva, Raanana, RamatGan, Tzora, `/workshop`, `/join`) now redirect to `/request`

### Removed
- `Navbar` component (no longer needed — all pages redirect to the single request form)

---

## [0.6.0] — 2026-06-08

### Added
- SEO: enriched metadata with Open Graph, Twitter card, keywords, and canonical URL
- SEO: `sitemap.xml` covering all active pages
- SEO: `robots.txt` pointing to sitemap
- SEO: JSON-LD `Person` structured data on homepage
- SEO: per-page title and description on all four venue pages
- Google Search Console ownership verification
- Version number displayed in homepage footer (reads from `package.json`)
- `docs/` folder with reference cheatsheets: Vercel, Google Sheets API, Telegram Bot API

### Changed
- `/workshop` disabled — redirects to homepage
- `/join` disabled — redirects to homepage, removed from navbar

---

## [0.5.0] — 2026-06-08

### Added
- Accessibility improvements across pages
- Location and time preference fields in `/join` signup form
- Instructor section on workshop personal guidance

### Changed
- Workshop personal guidance content refined
- Pricing section updated
- Workshop content polish (bold headings, icon updates)

---

## [0.4.0] — 2025-12

### Added
- `/workshop` standalone landing page (no navbar) with warm terracotta theme
- Workshop signup form — sends to Dance-B Telegram group
- Workshop sections: pricing, personal guidance, instructor profile, payment

### Changed
- Workshop theme iterated from blue → terracotta/warm palette
- Workshop content: payment details, header text, order markers

---

## [0.3.0] — 2025-11

### Added
- `/join` event landing page with signup form — sends to `TELEGRAM_CHAT_ID_SIGNUPS`
- Navbar link: רישום לסדנא → `/join`
- Navbar: hamburger menu for mobile

### Fixed
- Telegram: read chat IDs at runtime (not module load) to respect env vars
- Telegram: auto-retry on supergroup migration (`migrate_to_chat_id`)
- Telegram: send internal place IDs (`Dance-R/B/Z`) instead of Hebrew labels
- Sheets: use `A1` range for append to always target next free row
- Sheets: surface JSON parse errors explicitly for easier debugging
- Venue pages: preserve subtitle line breaks from Google Sheet

---

## [0.2.0] — 2025-10

### Added
- Homepage with venue list
- Venue detail pages: Beer Sheva, Raanana, Ramat Gan, Tzora — real event data
- Navbar with place links
- Mobile-responsive layout across all pages
- Interactive single-card carousels (replaced horizontal scroll)
- Hamburger menu on mobile navbar

---

## [0.1.0] — 2025-09

### Added
- Initial dance request tool
- Request form at `/request` (name, dance, performer, type, venue)
- Telegram Bot integration — sends request to venue-specific group chat
- Google Sheets logging — non-blocking, JWT service account auth
- Client-side name persistence via `localStorage`
- Client-side rate limit: 1 request/minute via `localStorage` timestamp
