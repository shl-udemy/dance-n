# Project Tasks

Tracking doc for tasks, ideas, and progress. Every task gets a stable ID (`T001`, `T002`, ...) so it can be referenced from commits, PRs, or conversations.

**Next ID: T010**

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
