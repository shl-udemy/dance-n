# Vercel Cheatsheet

## What is Vercel
A hosting platform built for frontend frameworks (Next.js, etc.). It auto-builds on every push and gives each deployment a unique URL. No server to manage.

---

## Deploy

| How | Command / Action |
|---|---|
| Auto-deploy on push | Push to `main` → Vercel builds and deploys automatically |
| Manual deploy via CLI | `npx vercel` (preview) or `npx vercel --prod` (production) |
| Rollback | Dashboard → Deployments → pick any old one → **Promote to Production** |

---

## Environment Variables

| Task | Where |
|---|---|
| Add/edit vars | Dashboard → Project → **Settings → Environment Variables** |
| Scopes | **Production**, **Preview**, **Development** (can differ per env) |
| Apply changes | Re-deploy after adding/changing vars — they don't hot-reload |
| Local dev | `vercel env pull .env.local` — pulls prod vars to your local `.env.local` |

---

## Domains

| Task | How |
|---|---|
| Add custom domain | Settings → Domains → add domain → update DNS at your registrar |
| DNS for apex domain | Add `A` record → `76.76.21.21` |
| DNS for subdomain | Add `CNAME` → `cname.vercel-dns.com` |
| Preview URLs | Every push gets `project-git-branch-team.vercel.app` automatically |

---

## CLI

```bash
npm i -g vercel       # install once

vercel login          # authenticate
vercel                # deploy as preview
vercel --prod         # deploy to production
vercel env pull       # pull env vars to .env.local
vercel logs           # tail production logs
vercel ls             # list deployments
```

---

## Build & Runtime

| Setting | Default | Where to change |
|---|---|---|
| Build command | `npm run build` | Settings → General → Build Command |
| Output directory | `.next` | auto-detected for Next.js |
| Node version | 20.x | Settings → General → Node.js Version |
| Region | `iad1` (US East) | Settings → General → Function Region |

---

## Functions (API Routes)

- Each file under `app/api/` becomes a serverless function
- **Max duration**: 10s (free), 60s (Pro)
- **Max payload**: 4.5 MB request/response
- Cold starts happen after inactivity — first request may be slower
- Logs: Dashboard → Deployments → pick deploy → **Functions** tab, or `vercel logs`

---

## Free Tier Limits (Hobby)

| Resource | Limit |
|---|---|
| Bandwidth | 100 GB/month |
| Serverless function executions | 100,000/month |
| Build minutes | 6,000/month |
| Deployments | Unlimited |
| Custom domains | Unlimited |
| Team members | 1 (solo only) |

---

## Useful URLs

| Page | Path |
|---|---|
| Dashboard | `vercel.com/dashboard` |
| Your project | `vercel.com/<team>/<project>` |
| Deployment logs | Deployments → select deploy → Functions / Build |
| Usage stats | `vercel.com/<team>/settings/billing` |

---

## Common Gotchas

- **Env vars not working?** → Check the scope (Production vs Preview vs Development) and re-deploy
- **Build passes locally but fails on Vercel?** → Check Node version mismatch or missing env var
- **API route timeout?** → Free tier caps at 10s; optimize or upgrade to Pro
- **`next build` error on Vercel?** → Run `npm run build` locally first to catch it early
