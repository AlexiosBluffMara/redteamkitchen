# rtk-web Security Policy

This is the public web layer for **redteamkitchen.com** and **gemma.redteamkitchen.com**, maintained by Alexios Bluff Mara LLC (dba Red Team Kitchen).

## Reporting a vulnerability

**For issues in this repository specifically** (the Astro shell + design system + Cloudflare Pages deploys):

- Preferred: [GitHub Security Advisories](https://github.com/AlexiosBluffMara/rtk-web/security/advisories/new) (private)
- Email: **security@redteamkitchen.com** (alternate: soumitlahiri@philanthropytraders.com)

**For issues in Mercury** (the agent that the WebUI talks to over Tailscale): see Mercury's `SECURITY.md`. Don't conflate the two.

Do not open public GitHub issues for security vulnerabilities.

## What I'd like in a report

- Affected URL or file path with line numbers
- Reproduction steps against `main` or the staging URL `https://redteamkitchen-v2.pages.dev`
- Impact: what trust boundary was crossed
- Browser + OS, if relevant
- A 90-day coordinated-disclosure window is fine

## Trust model

- **Public surface**: marketing pages + the Gemma replay theater. Static. No login. Cloudflare Pages-hosted; no server-side state.
- **Authenticated surface (future)**: `app.redteamkitchen.com` is gated behind Cloudflare Access (SSO/Tailscale identity). Not yet deployed.
- **CSP**: `default-src 'self'`; fonts from `fonts.gstatic.com`; media is allowed from self/HTTPS for Cortex artifacts; XHR is limited to the site and current Red Team Kitchen Cortex endpoints. See `public/_headers`.
- **No third-party analytics** beyond Cloudflare Web Analytics (cookieless).
- **No auto-deploy from a Git provider** — every production cutover is `workflow_dispatch` with a typed-confirmation guard.

## Out of scope

- Self-XSS via paste-in-console.
- Social engineering of maintainers.
- Reports requiring physical access to a maintainer's device.
- Issues in upstream framework dependencies that haven't been published as advisories — file with the upstream first, then us.

## Disclosure

90-day coordinated window or until a fix is released. Reporters credited in release notes unless anonymity is requested.
