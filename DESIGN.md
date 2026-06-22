# RTK Design System

The single source of truth for every visual decision on **redteamkitchen.com** and **gemma.redteamkitchen.com**, synthesized from the UI/UX research at [`D:\rtk-research\ui_ux_research_report.md`](../rtk-research/ui_ux_research_report.md) §32.

If something visual is happening on screen and it isn't in this document, the design system has drifted. Update this file or revert the screen.

---

## 1. Principles

We borrow three from Apple, three from Google, one from ISU.

1. **Clarity > deference > depth** — Apple HIG. If a glyph and a word disagree, pick the word; if motion and clarity disagree, pick clarity.
2. **Reductive, not additive** — Apple. Remove until removing more breaks meaning. Whitespace is a feature.
3. **Sensible defaults, expressive escapes** — Apple HIG / Material 3. The default screen looks calm; one accent draws the eye.
4. **Tokens cascade** — Material 3. Every color, type, and motion is a token. No raw hex in components. No raw `rgb()` outside tokens.css.
5. **Material 3 Expressive motion** — springs over linear. Emphasized easing for routes, standard easing for hover.
6. **Universal access** — every page works on the Pixel Fold's outer 6.3", inner 8", and a 4K monitor. Test all three before shipping.
7. **Cardinal & Code** — ISU. Cardinal `#CC0000` is the one true accent. Don't dilute it with a second brand red.

---

## 2. Tokens

The full source-of-truth lives in [`src/styles/tokens.css`](src/styles/tokens.css). This is the human-readable summary.

### 2.1 Color

| Role | Token | Value | When |
|---|---|---|---|
| Brand accent | `--rtk-cardinal` | `#CC0000` | Buttons, links, decorative accents. Once per major section, not everywhere. |
| Brand accent (hover) | `--rtk-cardinal-bright` | `#ee2d3f` | Hover/focus state for links and primary buttons |
| Brand accent (depth) | `--rtk-cardinal-deep` | `#9c0d1d` | Dark overlays where cardinal pairs with another color |
| Highlight | `--rtk-isu-gold` | `#F6A917` | Pull quotes, eyebrow text, status indicators |
| Secondary | `--rtk-isu-blue` | `#56758f` | Sparingly, only when cardinal would overload a section |
| Background | `--rtk-bg` | `#0a0b0e` | Page bg only. Never use for surfaces |
| Surface 1 | `--rtk-surface-1` | `#14151c` | Cards, panels |
| Surface 2 | `--rtk-surface-2` | `#1c1e28` | Nested panels, hovered states |
| Surface 3 | `--rtk-surface-3` | `#242635` | Code blocks, modal scrims |
| Border | `--rtk-border` | `#262834` | Default borders |
| Border strong | `--rtk-border-strong` | `#383a47` | Emphasized borders, button outlines |
| Text | `--rtk-text` | `#f0f2f6` | Body text |
| Text strong | `--rtk-text-strong` | `#ffffff` | Headings only |
| Muted | `--rtk-text-muted` | `#8b8d96` | Secondary text |
| Faint | `--rtk-text-faint` | `#5c5e69` | Footers, legal disclaimers |

**Contrast** — every text-on-surface combination passes WCAG AA (4.5:1 for body, 3:1 for large text). Verified: `--rtk-text` on `--rtk-surface-1` = 11.7:1; `--rtk-text-muted` on `--rtk-surface-1` = 4.8:1.

### 2.2 Type

| Stack | Token | Public license? | Use |
|---|---|---|---|
| Body | `--rtk-font-sans` | ✅ Roboto Flex (SIL OFL) | All non-display text. Variable font, 8..144 optical size, 300..800 weight |
| Display | `--rtk-font-display` | ✅ Roboto Serif (SIL OFL) | H1–H3, pull quotes, editorial moments |
| Mono | `--rtk-font-mono` | ✅ Google Sans Code (SIL OFL since 2025) | Code, eyebrows, labels, the "Cardinal & Code" tag everywhere |

The first item in each stack is the publicly-licensed *Roboto* family. Google Sans / Google Sans Display proper are not licensed for third-party redistribution and are kept in the stack only as a fallback for environments where Google partners can serve them.

**Type scale** (1.25 ratio): `--rtk-fs-xs` (12) → `--rtk-fs-sm` (14) → `--rtk-fs-base` (16) → `--rtk-fs-md` (18) → `--rtk-fs-lg` (20) → `--rtk-fs-xl` (24) → `--rtk-fs-2xl` (32) → `--rtk-fs-3xl` (40) → `--rtk-fs-4xl` (52) → `--rtk-fs-5xl` (68).

H1 = `--rtk-fs-4xl` clamped responsively. Body = `--rtk-fs-base`. Captions = `--rtk-fs-sm`. Avoid `--rtk-fs-xs` for body; reserve for compact data tables.

### 2.3 Space

4px base, 10 stops: `--rtk-sp-1` (4) … `--rtk-sp-10` (128). Use `sp-3` (12) and `sp-4` (16) for inline gaps; `sp-6` (32) and `sp-8` (64) for section rhythms.

Maximum content width: `--rtk-max` 1080px. Narrow content (essays, single-column reads): `--rtk-max-narrow` 720px. Wide layouts (data tables, multi-column dashboards): `--rtk-max-wide` 1280px.

### 2.4 Radius

`--rtk-radius-sm` 6px (chips, inline labels), `--rtk-radius` 14px (cards, panels), `--rtk-radius-lg` 20px (large feature cards), `--rtk-radius-pill` 9999px (buttons, tags).

### 2.5 Motion

Material 3 Expressive springs; no Bezier guesswork.

| Token | Value | Use |
|---|---|---|
| `--rtk-ease-emphasized` | `cubic-bezier(0.2, 0, 0, 1)` | Page transitions, hero reveals, primary CTA hover |
| `--rtk-ease-emphasized-decel` | `cubic-bezier(0.05, 0.7, 0.1, 1)` | Element entering from offscreen |
| `--rtk-ease-emphasized-accel` | `cubic-bezier(0.3, 0, 0.8, 0.15)` | Element leaving to offscreen |
| `--rtk-ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Hover, focus, micro-interactions |
| `--rtk-dur-short-1` | `100ms` | Color/border hovers |
| `--rtk-dur-short-2` | `150ms` | Scale/translate hovers |
| `--rtk-dur-medium-1` | `250ms` | Card flip, drawer slide |
| `--rtk-dur-medium-2` | `350ms` | Route transitions |
| `--rtk-dur-long-1` | `500ms` | Hero reveal |
| `--rtk-dur-long-2` | `700ms` | Three.js scene fade-in |

**Reduced motion**: `@media (prefers-reduced-motion: reduce)` zeroes every duration token. Tokens.css already does this. Components must use the tokens, not raw values, or accessibility breaks.

---

## 3. Components

We build primitives once, in `src/components/`, and compose them everywhere. No drive-by Tailwind cocktails for things we'll need twice.

### 3.1 Button

Three variants:

- **Primary** — `--rtk-cardinal` background, white text, 1.4rem horizontal padding, pill radius. One per visual section maximum.
- **Ghost** — transparent background, border `--rtk-border-strong`, text `--rtk-text`. Default for secondary actions.
- **Subtle** — no border, hover background `--rtk-surface-2`. Inline actions inside cards.

States: rest, hover, focus-visible (2px gold ring), disabled (opacity 0.4, cursor not-allowed).

Tap target: 44 × 44 minimum (Apple HIG). Use vertical padding to hit it; never shrink the visual to fit.

### 3.2 Card

Base: `--rtk-surface-1`, 1px `--rtk-border`, `--rtk-radius` corners, `--rtk-sp-5` padding. Hover (interactive cards only): border-color `--rtk-cardinal`, translateY(-2px), shadow `--rtk-shadow-2`, 250ms emphasized ease.

### 3.3 Input

Base font-size **must be ≥ 16px** to prevent iOS auto-zoom on focus. Background `--rtk-surface-2`, border `--rtk-border`, focus border `--rtk-cardinal`, focus shadow 2px gold. Placeholder `--rtk-text-faint`.

### 3.4 Pull quote

Italic, `--rtk-font-display`, left border 3px `--rtk-cardinal`, surface 1 background, 18–20px size. Used once per article maximum.

### 3.5 Eyebrow

`--rtk-font-mono`, 12px, letter-spacing 0.18em, uppercase, color `--rtk-isu-gold`. Sits above an h1 or h2 to mark category.

---

## 4. Page archetypes

Five archetypes; everything is one of these or it doesn't ship.

| Archetype | Layout | Example |
|---|---|---|
| **Hero + scroll** | Centered hero, scroll-driven sections | `/`, `/cortex`, `/mercury` |
| **Feature page** | Eyebrow + h1 + lede + 2–3 sections + CTA panel | `/scaling`, `/specs` |
| **Replay theater** | Top hero + grid of replay cards + per-replay drawer | `/gemma`, `/gemma/replay/[id]` |
| **Dashboard** | Top header + side nav + main content (mobile: bottom nav) | Mercury web app `/sessions`, `/skills` |
| **Long read** | Narrow column (`--rtk-max-narrow`), one h2 per scroll-screen | `/research`, `/explain`, `/about` |

---

## 5. Three.js + WebXR budget

We earn 3D scenes; we don't sprinkle them.

| Usage | Where | Budget |
|---|---|---|
| Hero scene | Home, Cortex (one each) | <150 KB initial, <300 KB total scene assets, <16ms frame on M4 Max + <33ms on Pixel Fold inner |
| Decorative | Anywhere else | none. Use SVG/CSS |
| WebXR | Replay theater experimental | Gated behind a feature flag, never blocks 2D rendering |

Implementation: react-three-fiber + drei. Code-split every page that imports r3f via `React.lazy`. Lazy-load textures with `Suspense` and a CSS-only fallback. Monitor with `r3f-perf` in dev only.

---

## 6. Voice and tone

Microcopy is part of the design system.

- **Subject of every sentence is the reader.** "You see four critics" beats "Four critics are visible to the user."
- **Concrete > abstract.** "$14/month" beats "low cost." "RTX 5090" beats "high-performance GPU."
- **Honest > impressive.** If hardware costs $10,500 upfront, say it. Don't hide behind "free tier" framing.
- **Plain > clever.** "Walk through any door, you're talking to the same person" beats anything with a colon.
- **Voices we don't use**: corporate buzz ("synergize," "leverage"), AI hype ("revolutionary," "game-changing"), false modesty ("just a small project").

Reference voice: the `index.html`, `cortex.html`, `mercury.html` from the v0 site at `D:\cortex\website\`. That voice is in canon. The Astro shell preserves it.

---

## 7. Accessibility floor

- All interactive elements: 44×44px tap target minimum, 2px gold focus ring offset 3px.
- Color contrast WCAG AA across every text/surface combo.
- `prefers-reduced-motion` respected via tokens.
- Form controls: `font-size: 16px+` so iOS doesn't zoom on focus.
- Safe-area insets: `env(safe-area-inset-bottom)` honored on every fixed-position bottom nav and FAB.
- Three.js scenes: provide a meaningful `<noscript>` fallback or a 2D static image.
- Alt text: every meaningful image has it. Decorative images have `alt=""`.

---

## 8. What's out of scope

- Light mode. We're dark-only for v1. Reconsider Q3.
- Custom illustrations. Use photography of the actual Ascended Base hardware where possible; Material Symbols icons for everything else.
- Tailwind. The tokens + co-located `<style>` blocks are sufficient and faster to load. Reconsider only if we find ourselves writing utility classes by hand more than once a week.
- Multiple themes. One theme, well-tuned, beats five themes that all look the same.

---

## 9. How to extend this document

When a new pattern is invented:

1. Build it once on the page that needs it.
2. If the same pattern appears a second time anywhere, extract to `src/components/`.
3. The third time, add a section here and a token if appropriate.
4. The fourth time, the abstraction is real — refactor old uses to the new component.

Don't extract early. Don't tolerate duplication past three.

---

*Maintainers: any contributor. Disagree? Open a PR with a screenshot, a rationale, and at least one before/after on a page that already exists.*
