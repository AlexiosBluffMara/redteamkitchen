# Designing with Claude — a working manual for `D:\rtk-web`

How to use Claude (Code, plus the design-adjacent MCPs you already have connected) to design and build pages for redteamkitchen.com and gemma.redteamkitchen.com without learning Figma's full surface area or hand-writing every pixel of CSS.

This is a *workflow* document, not a *theory* document. The theory lives in [`DESIGN.md`](DESIGN.md) and [`../rtk-research/ui_ux_research_report.md`](../rtk-research/ui_ux_research_report.md). What follows is "how to actually do it on Tuesday morning."

---

## 1. The four MCPs that make this work

You don't need all four for every task. You usually need one or two. Know which one applies.

| MCP | What it gives you | When to use |
|---|---|---|
| **Figma MCP** (`mcp__Figma__*`) | Read-write access to your Figma files: `get_design_context`, `get_screenshot`, `get_variable_defs`, `get_metadata`, `add_code_connect_map`, `create_design_system_rules`, `get_code_connect_map` | When you have a Figma design and want it implemented; or when you want a Figma file built FROM your codebase |
| **Claude in Chrome** (`mcp__Claude_in_Chrome__*`) | Drives a real Chrome instance: navigate, click, scroll, screenshot, evaluate JS, read DOM | When you want Claude to *see* the live page, click around it on different viewports, and report what's broken |
| **Claude Preview** (`mcp__Claude_Preview__*`) | Headless preview of the local dev build with a programmatic API: start, screenshot, eval, click, fill, console logs, network logs | When iterating on a component without leaving the chat. Faster than Chrome MCP for the loop |
| **Filesystem (built-in)** | Read, Edit, Write any local file | Always |

You already have all four wired into this session. Don't ask Claude to "open Figma" — invoke the MCP.

---

## 2. The three workflows

### 2.1 Workflow A: Figma → Astro implementation

You have a Figma file. You want it as a working Astro page on `D:\rtk-web`.

```
1. In Figma, select the frame you want implemented.
2. In Claude:
     "Use mcp__Figma__get_design_context on the current selection.
      Then implement it as a new Astro page at src/pages/<name>.astro
      using only tokens from src/styles/tokens.css. No new colors,
      no new font families. If a design value can't be expressed in
      tokens, propose a token addition first and pause."
3. Claude pulls the Figma context, writes the Astro page, opens it in
   Claude Preview, screenshots at three viewports (390/768/1280),
   and posts the diff against the Figma reference.
4. You eyeball the diff. Iterate with "the hero h1 is 4px too tight"
   or "the secondary button border is too dark — use border-strong instead."
```

Anti-patterns:
- *Don't* let Claude invent new tokens silently. Force the pause.
- *Don't* paste Figma's auto-generated CSS. Always go through the design context call so we get the semantic intent (component name, role, variant), not just the px values.
- *Don't* ask for "pixel-perfect." Ask for "token-perfect at the ±2px level." Pixel-perfect is design-by-fiat; token-perfect is design-by-system.

### 2.2 Workflow B: Idea → mockup → Three.js scene

You have an idea (e.g. "the home page hero should be a slowly rotating 3D rendering of the Ascended Base topology"). You want a working r3f scene on the home page.

```
1. In Claude:
     "I want a hero scene for src/pages/index.astro. Three nodes
      (Seratonin, Big Apple, Baby Pi) arranged in a triangle, soft
      pulses on each when Mercury is thinking. Cardinal-tinted lighting,
      dark background. Mobile budget: <300KB scene assets, <33ms frame
      on Pixel Fold. Sketch a low-fi rendering first as a static SVG so
      I can sign off on the composition before we wire r3f."
2. Claude produces an SVG mockup at the right aspect ratio.
3. You approve or redirect.
4. Claude builds the r3f scene as a React island, lazy-loaded, with
   a CSS-only fallback frame.
5. Claude runs Claude Preview, scrolls the page, screenshots first
   contentful paint and the scene-loaded state. Reports frame timing.
6. Iterate.
```

Why the SVG sketch first: WebGL changes cost ~5× more time than CSS changes. Catching a composition mistake at the SVG stage saves hours.

### 2.3 Workflow C: Live site review and patch

The site is deployed. You're on the Pixel Fold in a coffee shop. Something looks wrong.

```
1. In Claude:
     "Open https://gemma.redteamkitchen.com on Claude in Chrome.
      Set viewport to Pixel Fold outer (412×892). Screenshot the
      hero. Then scroll through every section and screenshot each.
      Tell me which section breaks first and why."
2. Claude drives Chrome via mcp__Claude_in_Chrome__navigate +
   set viewport via the Chrome DevTools Protocol exposed in the MCP.
   Returns annotated screenshots.
3. You point at the broken thing.
4. Claude reads the relevant Astro page, makes the edit, runs Claude
   Preview locally, confirms the fix, and writes a one-line PR description.
5. You wrangler-deploy to staging:
     npm run deploy:staging
   And re-run the Chrome MCP review against the staging URL.
```

Anti-pattern: skipping the local Claude Preview step. Don't deploy a fix you haven't seen rendered.

---

## 3. Concrete prompt patterns that work

These are battle-tested. Copy and adapt.

### "Implement this Figma frame"

> "Use Figma MCP `get_design_context` for the currently selected frame. Implement at `src/pages/<name>.astro` using BaseLayout, tokens from `src/styles/tokens.css`, components from `src/components/`. If a Figma value isn't expressible in tokens, list the candidate token additions and pause. Then take three Claude Preview screenshots (390 / 768 / 1280) and post a side-by-side with the Figma export."

### "Audit one page on mobile"

> "Open `https://redteamkitchen.com/<page>` in Claude in Chrome. Set viewport to 390×844 (iPhone), then 412×892 (Pixel Fold outer), then 768×1024 (iPad). For each, screenshot, list any layout issues, contrast issues, or interactive-element-too-small issues. Reference DESIGN.md §7 for the floor."

### "Polish this card"

> "The card on `src/pages/cortex.astro` line 89-104 looks dead next to the Apple AirPods Pro page. Read DESIGN.md §3.2 for the spec. Propose 2–3 alternatives via Claude Preview screenshots before editing the file. Do not invent new tokens."

### "Build a 3D thing"

> "I want a hero r3f scene for `src/pages/index.astro` showing X. Mobile budget: <300KB scene assets, <33ms frame on Pixel Fold inner. Sketch as SVG first. After approval, ship as a lazy-loaded React island with a CSS-only fallback frame and a noscript image."

### "Find the design drift"

> "Diff every page in `src/pages/**` against the patterns in DESIGN.md. List violations: raw hex codes, missing focus rings, tap targets <44px, h1 sizes outside the type scale. Fix them in a single PR-shaped batch."

---

## 4. Speed loops

Three loops, each with its own latency profile.

### 4.1 Inner loop — Claude Preview (fastest)

```
Edit  →  Claude Preview screenshot  →  see result  →  edit
```

~10–15 seconds per turn. Use for: token tweaks, copy edits, single-component layout work, anything you can verify with one screenshot.

### 4.2 Middle loop — local dev server + Chrome MCP

```
Edit  →  npm run dev  →  Chrome MCP visit  →  scroll/click/screenshot  →  edit
```

~30 seconds per turn. Use for: multi-page flows, navigation issues, scroll-driven animation, anything where you need to interact across pages.

### 4.3 Outer loop — staging deploy + production-shape verification

```
Commit  →  npm run deploy:staging  →  Chrome MCP visit staging URL  →  approve or revert
```

~2 minutes per turn. Use only when you're done iterating in the inner/middle loops and want to verify on real Cloudflare Pages infrastructure.

**Never deploy directly to `redteamkitchen` (the live Pages project).** Always staging first. The `redteamkitchen-v2` project is the staging surface.

---

## 5. The Figma round-trip

If you'd rather start in code and project the result back to Figma for designers (yourself or others) to react to, the flow is:

```
1. Build the page in Astro/React, locally.
2. In Claude:
     "Use Figma MCP `get_metadata` to confirm we're targeting the
      'RTK Web v1' file. Then use the Figma codebase scanner to
      mirror the page from src/pages/<name>.astro into Figma as a
      proper frame, with components mapped to existing Figma
      components where they exist (use get_code_connect_map to check).
      If components don't exist in Figma, create them at sensible names."
3. Open Figma. Review the projected frame. Comment if the design
   needs to evolve. Run Workflow A in reverse to bring changes back.
```

This works because Claude treats Figma as an addressable peer surface, not a magic black box. Frames are read and written via MCP calls.

---

## 6. The two things to never automate

Even though Claude can do them, don't:

1. **Color picks.** Cardinal `#CC0000` is the brand color. Don't ask Claude "what's a good red for this page" and then accept whatever it returns — you'll drift the brand. Pick from tokens or extend the palette as a deliberate human decision.

2. **Voice.** Claude can write microcopy, but the *register* (the voice from `cortex.html`/`mercury.html`) has to come from you. Read it, internalize it, edit Claude's drafts toward it. Don't accept the first generation.

Everything else: automate aggressively.

---

## 7. When Claude is wrong

Claude will sometimes:
- Use a non-token value because "it looks better." Reject and force tokens.
- Add a new dependency to fix a problem solvable in CSS. Reject and ask for a CSS-only solution.
- Skip the SVG-mockup step on r3f work because it's "obvious." Reject; the cost of WebGL iteration is too high to skip.
- Generate verbose comments. Strip them; per the design system, code is mostly self-documenting.
- Generate emoji unprompted. Strip them; we don't ship emoji unless explicitly asked.

The pattern: write the rule, point at the rule when Claude breaks it. Claude course-corrects fast when the rule is on disk and you cite it.

---

## 8. Glossary

- **Token-perfect** — visually matches the design within ±2px on layout and uses an exact token (no inline values) for every color, type, and motion.
- **Trip-day blocker** — something that will visibly break the demo for the user on a phone in a hotel room. Highest priority class of bug.
- **Strangler-fig swap** — replace one piece of an existing system with a new implementation, behind a stable interface, measured before and after, only one in flight at a time.
- **Three doors** — the three Mercury surfaces (terminal, Discord, web). The metaphor is invariant; if you see "two doors" or "four doors" anywhere, fix it.

---

*Last updated: 2026-05-07. Owner: Soumit Lahiri / Alexios Bluff Mara LLC.*
