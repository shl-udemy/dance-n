# Project Tasks

Tracking doc for tasks, ideas, and progress. Every task gets a stable ID (`T001`, `T002`, ...) so it can be referenced from commits, PRs, or conversations.

**Next ID: T005**

## How to use
- Statuses: `Backlog` · `In Progress` · `Done` · `Idea`
- Add new tasks to the relevant table using the next sequential ID, then bump "Next ID" above
- Reference task IDs in commit messages when relevant, e.g. `T001: open request page to all users`
- Move a task to **Done** with a completion date once shipped, rather than deleting it

## Active

| ID | Task | Status | Added | Notes |
|----|------|--------|-------|-------|
| T001 | Make `/request` page open to every user | Backlog | 2026-08-14 | App code already has no auth wall on `/request` — likely blocked by Vercel Deployment Protection in the project dashboard. Needs verification. |

## Ideas / Someday

| ID | Task | Status | Added | Notes |
|----|------|--------|-------|-------|
| T002 | Build `/summary` page reading from the Google Sheet | Idea | 2026-08-14 | Called out as future work in `prd.md`: filter by place/date/type, top dances, busiest hours. |
| T003 | Clean up stale git branches | Idea | 2026-08-14 | `bsh-fix`, `event-landing-page`, `mobile`, `mobile-header-fix`, `ramat-gan-fix`, `ranna-fix`, `website`, `zoraa-fix` — check which are already merged/dead and prune. |
| T004 | Decide fate of disabled `/workshop` and `/join` pages | Idea | 2026-08-14 | Both currently redirect to homepage as of v0.6.0 — either remove the dead code or re-enable properly. |

## Done

| ID | Task | Status | Completed | Notes |
|----|------|--------|-----------|-------|
