# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

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
