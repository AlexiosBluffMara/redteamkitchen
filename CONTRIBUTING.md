# Contributing to rtk-web

Quick orientation. The full design system is in [`DESIGN.md`](DESIGN.md). Workflow for using Claude (Code) for design is in [`CLAUDE_DESIGN.md`](CLAUDE_DESIGN.md).

## Prerequisites

- Node.js 20+ (we use the active LTS)
- A Cloudflare API token with Pages Edit + Workers Edit (we keep it at `~/.cloudflare/credentials`; never check it in)
- An Astro-aware editor — VS Code with the Astro extension is the path of least resistance

## Local development

```bash
git clone <repo>
cd rtk-web
npm install
npm run dev      # http://localhost:4321
```

## Conventions (see DESIGN.md for the long version)

- **No raw hex codes outside `src/styles/tokens.css`.** If you need a new color, propose it as a token in the same PR.
- **Touch targets ≥ 44×44 px.** Use vertical padding to hit it; never shrink visual size.
- **`100dvh`, not `100vh`** for any iOS-Safari-bound height calc.
- **Inputs `font-size: 16px+`** to prevent iOS auto-zoom.
- **Three.js gated.** R3F islands are lazy-loaded. Hero scenes ship with a CSS-only fallback. Sketch as SVG before writing WebGL.
- **`prefers-reduced-motion` honored** via the duration tokens. Use the tokens, not raw `Xms`.

## Pull requests

- Title format: `area: short description` (e.g. `cortex: tighten ASCII diagram on small screens`).
- One concern per PR. Bigger refactors get a tracking issue first.
- Screenshots in the PR description for any visual change. Three viewports (390 / 768 / 1280) is the minimum bar.
- CI must be green. The `validate-headers` job will fail if you remove a security header from `public/_headers`.

## Deploy targets

| Project (CF Pages) | Domain | Trigger |
|---|---|---|
| `redteamkitchen-v2` | `https://redteamkitchen-v2.pages.dev` (staging) | auto on `main` merge |
| `redteamkitchen-gemma` | `https://gemma.redteamkitchen.com` (production demo subdomain) | auto on `main` merge |
| `redteamkitchen` | `https://redteamkitchen.com` (production apex) | manual `workflow_dispatch` with `PROMOTE` confirmation |

## How to use Claude effectively in this repo

See [`CLAUDE_DESIGN.md`](CLAUDE_DESIGN.md). TL;DR:

- Use **Figma MCP** when you have a design and want it implemented.
- Use **Claude Preview MCP** for the inner-loop visual iteration.
- Use **Claude in Chrome MCP** for the live-site review and patch loop.
- Don't let Claude invent new tokens. Don't let Claude write WebGL without sketching as SVG first.

## Code review

`@AlexiosBluffMara/maintainers` is on every PR via `.github/CODEOWNERS`. Token changes and `.github/` changes get extra scrutiny.

## Licensing

MIT. Contributions are accepted under the same license. By opening a PR you affirm you have the right to do so.
