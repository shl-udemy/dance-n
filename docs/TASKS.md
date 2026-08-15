# Project Tasks

Tracking doc for tasks, ideas, and progress. Every task gets a stable ID (`T001`, `T002`, ...) so it can be referenced from commits, PRs, or conversations.

**Next ID: T017**

## How to use
- Statuses: `Backlog` · `In Progress` · `Done` · `Idea`
- Add new tasks to the relevant table using the next sequential ID, then bump "Next ID" above
- Reference task IDs in commit messages when relevant, e.g. `T001: open request page to all users`
- Move a task to **Done** with a completion date once shipped, rather than deleting it

## Active

| ID | Task | Status | Added | Notes |
|----|------|--------|-------|-------|

## Ideas / Someday

| ID | Task | Status | Added | Notes |
|----|------|--------|-------|-------|
| T002 | Build `/summary` page reading from the Google Sheet | Idea | 2026-08-14 | Called out as future work in `prd.md`: filter by place/date/type, top dances, busiest hours. |
| T003 | Clean up stale git branches | Idea | 2026-08-14 | `bsh-fix`, `event-landing-page`, `mobile`, `mobile-header-fix`, `ramat-gan-fix`, `ranna-fix`, `website`, `zoraa-fix` — check which are already merged/dead and prune. |
| T004 | Decide fate of disabled `/workshop` and `/join` pages | Idea | 2026-08-14 | Both currently redirect to homepage as of v0.6.0 — either remove the dead code or re-enable properly. |

## Done

| ID | Task | Status | Completed | Notes |
|----|------|--------|-----------|-------|
| T001 | Make `/request` page open to every user | Done | 2026-08-14 | Verified via `curl` with no cookies/session: page returns plain 200 with the full form, no Vercel Deployment Protection or app-level auth. Already open to anyone with the URL. |
| T005 | Block all pages except `/request` | Done | 2026-08-14 | Added `redirect("/request")` to home, BeerSheva, Raanana, RamatGan, Tzora; repointed `/workshop`/`/join` redirect target from `/` to `/request`; removed Navbar entirely (`app/(main)/layout.tsx` now just returns children); page content/code left in place below the redirect for easy revert. Confirmed via live manual browser test on the dev server: form filled and submitted successfully, redirected straight to `/request` as expected. |
| T009 | Install Chrome extension for Claude | Done | 2026-08-14 | Extension connected successfully after a Chrome restart; used for live browser verification of T005 (form fill, submit, screenshot all worked). |
| T006 | Restrict request form to Beer Sheva only | Done | 2026-08-14 | Removed the Place dropdown from `DanceRequestForm.tsx`; API route (`app/api/request/route.ts`) now hardcodes the target place to `Dance-B` server-side regardless of request body, so submissions always go to the Beer Sheva Telegram group. |
| T007 | Only `danceName` is mandatory on the request form | Done | 2026-08-14 | Name, performer, and dance type are now optional both client-side (`DanceRequestForm.tsx`, no `required` attributes) and server-side (`app/api/request/route.ts` only validates `danceName`; `RequestData.name`/`danceType` now optional in `lib/telegram.ts`). `buildMessage()` and `logToSheet()` omit/blank out missing optional fields. Confirmed via live browser test: submitted with only Dance Name filled, request succeeded. |
| T008 | Update README.md + CHANGELOG.md for T005–T007 | Done | 2026-08-14 | CHANGELOG bumped to 0.8.0; README features/routes updated to reflect Beer-Sheva-only submission and optional fields. |
| T010 | Support multiple dance-name slots per submission (default 3) | Done | 2026-08-14 | New `lib/config.ts` exports `DANCE_SLOTS = 3` (shared client+server constant). Form renders `DANCE_SLOTS` "Dance Name" inputs (only #1 required); `danceName: string` replaced with `danceNames: string[]` through `DanceRequestForm.tsx` → `app/api/request/route.ts` (validates "at least one non-blank slot", caps to `DANCE_SLOTS`) → `RequestData` in `lib/telegram.ts`. `buildMessage()` sends one combined Telegram message (single line if 1 dance, numbered list if 2+); `logToSheet()` appends one Sheet row per non-blank dance name in a single API call. Confirmed via live browser test: sparse submission (slots 1+3 filled, 2 blank) succeeded and logged exactly 2 Sheet rows; empty slot 1 correctly blocked by native `required` validation. |
| T011 | Per-dance type selector + dynamic add/remove rows | Done | 2026-08-14 | Replaced the shared "Dance Type" radio group + fixed 3-slot list with per-dance type: `danceNames: string[]` + shared `danceType` became `dances: { name: string; type?: "couples"\|"circle" }[]` in `RequestData` (`lib/telegram.ts`). Form (`DanceRequestForm.tsx`) now starts with 1 row (name input + inline זוגות/מעגל toggle pills), grows via a "+ הוסף ריקוד" button up to `DANCE_SLOTS`, and rows 2+ get an × remove control; type pill click-to-deselect keeps type optional. `app/api/request/route.ts` validates/normalizes the `dances` array defensively (caps to `DANCE_SLOTS`, trims names, whitelists `type` to the two literal values). `buildMessage()` folds each dance's type into its own line (e.g. `דבקה (מעגל)`); `logToSheet()` derives each row's Type column from that dance's own type. Confirmed via live browser test: add/remove rows, max-disable at 3, submission with row1 typed + row2 untyped logged exactly 2 Sheet rows, form resets to 1 row after success. |
| T012 | Remove the Performer field from the request form | Done | 2026-08-14 | Removed `performer` state/input from `DanceRequestForm.tsx`, `performer` from the API payload/`RequestData` (`app/api/request/route.ts`, `lib/telegram.ts`), and the `🎭 מבצע:` line from `buildMessage()`. `logToSheet()` keeps the existing 6-column layout (Timestamp\|Place\|Name\|Dance\|Performer\|Type) for compatibility with the live sheet, but the Performer column is now always written as an empty string (README's sheet-columns table annotated accordingly). Confirmed via live browser test: form has no Performer field, submission still succeeds end-to-end. |
| T013 | "Add Dance" button UX: hide at max, require previous name filled | Done | 2026-08-14 | `DanceRequestForm.tsx`: the "+ הוסף ריקוד" button is no longer rendered at all once `dances.length >= DANCE_SLOTS` (was previously shown but disabled); while below the max, it stays `disabled` until the last row's dance-name is non-blank (`!dances[dances.length - 1].name.trim()`), preventing users from stacking empty rows. Confirmed via live browser test: button greyed out on empty row 1, enables after typing, greys out again on each new empty row, and disappears entirely once 3 rows exist. |
| T014 | Fix mobile layout: dance row wraps unevenly at narrow widths | Done | 2026-08-15 | On real narrow phones (~320-350px, tested by constraining the page container width via injected CSS since the browser tool's window resize wasn't taking effect in this environment), each dance row's זוגות/מעגל pills (and × on rows 2+) could wrap independently — one pill dropping to its own line while the other stayed up top, looking broken. Fixed by wrapping the pills + × in their own nested `flex items-center gap-2 shrink-0` container inside the row's `flex flex-wrap` div, so on narrow screens the whole controls group wraps together as one unit onto a second line below the name input, instead of splitting apart; bumped the name input's `min-w` from 120px to 140px. Confirmed via live test at simulated 320px width, empty and filled rows, with and without the remove button. |
| T015 | Update `/request` subtitle text | Done | 2026-08-15 | `app/(main)/request/page.tsx`: replaced the subtitle "שלחו בקשה ונשתדל לרקוד בשבילכם!" with "בקשות לריקודים מתקבלות באהבה 💃🕺". Confirmed via live browser test. |
| T016 | Mention event name on `/request` header | Done | 2026-08-15 | `app/(main)/request/page.tsx`: added "מרתון באר שבע עם נילי אלגזר" as a small line between the "בקשת ריקוד" title and the friendly subtitle, so visitors know which event the requests are for. Confirmed via live browser test. |
