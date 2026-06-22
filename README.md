# rtk-web

Astro web shell for **redteamkitchen.com**.

This project is the strangler-fig replacement for `D:/cortex/website` (plain static HTML). It is now the preferred codebase for the Red Team Kitchen public site: Cortex as the durable showcase, Mercury as the Gemma 4 Good archive, and Cloudflare Pages/R2 as the resilient serving layer.

## Surfaces

| Surface | URL | Purpose |
|---|---|---|
| Public site | `redteamkitchen.com` | Project archive, Cortex gallery artifacts, Mercury wrap-up |
| Cortex live lab | `cortex.redteamkitchen.com` | Optional Cloudflare Tunnel to the local PC when Seratonin is online |
| Durable media | Cloudflare R2 (planned) | Gallery videos, thumbnails, scan JSON, demo recordings |
| Source | GitHub (planned for this folder) | Code review, change history, Cloudflare Pages deploys |

## Stack

- **Astro 5** (MIT) — multi-framework islands, BYO renderer, no Vercel
- **React 18** islands for any heavy interactivity
- **react-three-fiber + drei + @react-three/xr** for future 3D/WebXR work
- **Tokens-only CSS** in `src/styles/tokens.css` — no Tailwind in v0 (kept simple, can add later)
- **Cloudflare Pages** deploy via `wrangler` CLI

All dependencies are MIT, BSD, or ISC licensed. See `LICENSES.md` (forthcoming).

## Local dev

```bash
cd D:/rtk-web
npm install        # or: pnpm install (pnpm preferred for monorepo speed)
npm run dev        # http://localhost:4321
npm run build      # ./dist
npm run preview    # serve ./dist locally
```

## Deploy

Intended Cloudflare Pages projects:

| Project name | Domain | Purpose |
|---|---|---|
| `redteamkitchen-v2` | (preview only) | Staging for the new build |
| `redteamkitchen-gemma` | `gemma.redteamkitchen.com` | Optional archive/demo subdomain if we keep it |
| `redteamkitchen` | `redteamkitchen.com` | Live site — only deploy here on hard cutover |

```bash
npm run build
npm run deploy:staging   # safe — no public domain attached
npm run deploy:gemma     # publishes the hackathon demo subdomain
npm run deploy:prod      # ⚠ replaces the live site, only after sign-off
```

Current Cloudflare production is still an ad-hoc Pages upload. The healthy target is GitHub-backed source control plus explicit GitHub Actions deploys. Production remains manual-only.

## Migration plan

Short version:

1. ✅ Build the Astro shell and project pages.
2. ✅ Remove stale Tailscale/Funnel links from public copy.
3. ✅ Add local Cortex brain-surface gallery preview artifact.
4. ✅ Initialize Git locally for this folder.
5. ⏳ Attach a GitHub remote and push `main`.
6. ⏳ Create or confirm Cloudflare Pages staging projects.
7. ⏳ Move durable Cortex media to Cloudflare R2 and replace local preview paths with manifest-driven R2 URLs.
8. ⏳ Promote to `redteamkitchen.com` only after staging review.

## License

Project © 2026 Alexios Bluff Mara LLC. The Astro framework, React, and three.js are MIT-licensed and used as published.
