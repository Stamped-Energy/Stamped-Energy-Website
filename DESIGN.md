---
name: Stamped Energy
description: AI-powered energy intelligence for industrial plants. ₹-scored prescriptions. Verified with evidence.
colors:
  primary: "#F75440"
  on-primary: "#ffffff"
  primary-fixed: "#ffdad4"
  inverse-primary: "#ffb4a8"
  secondary: "#000a07"
  on-secondary: "#ffffff"
  secondary-container: "#bdd9c8"
  tertiary: "#00666b"
  on-tertiary: "#ffffff"
  surface: "#f7faf5"
  surface-low: "#f1f4f0"
  surface-container: "#ecefea"
  surface-high: "#e6e9e4"
  surface-highest: "#e0e3df"
  surface-dim: "#d8dbd6"
  on-surface: "#191c1a"
  on-surface-variant: "#5a403c"
  outline: "#8f706b"
  outline-variant: "#e3beb8"
  inverse-surface: "#252926"
  inverse-on-surface: "#e9ece7"
  error: "#ba1a1a"
  background: "#f7faf5"
typography:
  display:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 700
    letterSpacing: "-0.025em"
    lineHeight: 1.15
  headline:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 700
    letterSpacing: "-0.025em"
    lineHeight: 1.2
  title:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    letterSpacing: "-0.02em"
    lineHeight: 1.3
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.68rem"
    fontWeight: 500
    letterSpacing: "0.12em"
    lineHeight: 1.4
  nav:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
    letterSpacing: "0.04em"
    lineHeight: 1.2
rounded:
  sm: "2px"
  md: "6px"
  lg: "8px"
spacing:
  section-y-sm: "4rem"
  section-y-md: "5.5rem"
  section-y-lg: "7.5rem"
  container-inline-sm: "1.25rem"
  container-inline-lg: "2.5rem"
  stack-tight: "0.75rem"
  stack-md: "1.5rem"
  stack-lg: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: "0 1.25rem"
    height: "2.75rem"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "0 1.25rem"
    height: "2.75rem"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    rounded: "{rounded.md}"
    padding: "0 1.25rem"
    height: "2.75rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "0 1.25rem"
    height: "2.75rem"
  section-badge:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "0.25rem 0.625rem"
    typography: "{typography.label}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    typography: "{typography.nav}"
  nav-dropdown-trigger-open:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    typography: "{typography.nav}"
  industry-tile:
    backgroundColor: "{colors.surface-low}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
---

# Design System: Stamped Energy

## 1. Overview

**Creative North Star: "Plant-office decision layer"**

Stamped Energy’s marketing surface should feel like a bright plant office at mid-morning: a director scanning cost and next actions, not a SaaS landing page performing “innovation.” The system is industrial, rupee-clear, and sparse. Color commits (coral on near-black green against demo-deck beige). Type is grotesk display + clean body + mono labels. Structure favors one job per section, real plant photography where imagery matters, and progressive motion (GSAP pin/scrub, Reveal) rather than decorative noise.

Runtime color source of truth remains `styles/theme.css`. This document describes how agents and humans apply those tokens. Homepage narrative (ADR-016 stack) is the reference composition: Hero → Problem (dark) → What is → How it works (pin) → Impact → Solutions → Industries photo strip → Resources → Closing CTA.

**Rejects:** purple SaaS gradients, glassmorphism as default, hero-metric template strips, identical icon-card grids, thick colored side-stripes, cloning Infinite Uptime / Greenovative / CVector visuals (structure inspiration only), MES/plant-OS claims.

**Key Characteristics:**
- Committed coral accent; near-black green for contrast bands
- Space Grotesk headlines; Inter body; Plex Mono for badges only
- Flat tonal elevation; shadows reserved for primary CTA
- Uppercase Space Grotesk nav; coral pill on open dropdown triggers
- Generous `.section-y` air; body copy ≤75ch where possible

## 2. Colors

Committed coral on near-black green secondary, warm green-grey surfaces. Accent is frequent enough to carry identity, rare enough that it still means “action.”

### Primary
- **Forge Coral** (#F75440): CTAs, active nav pill, impact metrics, focus rings, accent rules (1px only). On-primary text is white (#ffffff). Soft companions: inverse-primary (#ffb4a8) sparingly on dark bands; primary-fixed (#ffdad4) for tints.

### Secondary
- **Obsidian Green** (#000a07): Full-bleed contrast sections (homepage Problem), footer gravity, secondary buttons. On-secondary is white. Secondary-container (#bdd9c8) is a soft companion, not a page fill.

### Tertiary
- **Process Teal** (#00666b): Optional supporting accent. Prefer primary for interactive chrome; do not invent a third competing brand color in nav or heroes.

### Neutral
- **Demo-deck Surface** (#f7faf5): Default page background (`surface` / `background`).
- **Surface Low** (#f1f4f0): Soft bands (e.g. Industries, HIW stage).
- **Surface ladder** (#ecefea → #e6e9e4 → #e0e3df → #d8dbd6): Subtle tonal steps, borders via outline-variant (#e3beb8).
- **On-surface** (#191c1a): Primary text. **On-surface-variant** (#5a403c): Secondary text / mute.
- **Outline** (#8f706b) / **outline-variant** (#e3beb8): Hairline rules and card/slot borders.
- **Inverse surface** (#252926): Rare dark UI chrome when secondary is too absolute.

### Named Rules
**The One Coral Rule.** Primary carries identity and action. Do not spray coral across large fills; prefer text, borders, pills, and metrics. Large dark fills use secondary, not primary.

**The Light Office Rule.** Default marketing canvas stays light (`#f7faf5`). Dark is a deliberate band (Problem, some footers), not a site-wide theme.

## 3. Typography

**Display Font:** Space Grotesk (with ui-sans-serif / system fallback)  
**Body Font:** Inter (with ui-sans-serif / system fallback)  
**Label/Mono Font:** IBM Plex Mono (badges, MotionSlot labels only)

**Character:** Grotesk headlines feel industrial and direct; Inter keeps long copy readable in a plant-office scan; mono marks metadata without turning the whole chrome into a terminal costume.

### Hierarchy
- **Display / H1** (700, ~text-4xl–6xl, tracking -0.025em): Hero brand-forward headlines.
- **Headline / H2** (700, clamp ~1.875–3rem, tracking -0.025em): Section titles.
- **Title / H3** (600–700, ~1.25–1.875rem): Step titles, solution names, industry names.
- **Body** (400, 1rem, line-height 1.65, max ~65–75ch): Supporting paragraphs.
- **Label** (Plex Mono, ~0.68rem, uppercase, tracking ~0.12em): SectionBadge, MotionSlot captions.
- **Nav** (Space Grotesk, ~0.8rem, semibold, uppercase, tracking ~0.04em): Navbar links and dropdown items. CTA button label stays Inter/sans, often uppercase via utility.

Loaded via `next/font/google` in `app/layout.tsx`; wired as `--font-display`, `--font-sans`, `--font-mono`.

## 4. Elevation

**Philosophy: flat / tonal.** Depth comes from surface ladder steps, full-bleed secondary bands, and 1px borders (`outline-variant`), not stacked shadows or glass blur.

- Default sections: `bg-surface` or `bg-surface-low` with hairline dividers.
- Contrast band: `bg-secondary text-on-secondary` (homepage Problem).
- Media / slots: `rounded-md` + light border; no multi-layer drop shadows.
- **Exception:** Primary button may use a soft coral-tinted shadow and slight lift on hover. Do not generalize that shadow language to cards or nav panels.
- Dropdown panel: white/surface fill, thin border, minimal shadow-sm; 1px primary left rule only (structural, never a thick stripe).

## 5. Components

**Feel:** confident, sparse, uppercase chrome; mono reserved for badges.

### Button
- Height ~h-11 / sm:h-12; `rounded-md`; `text-sm font-semibold`.
- **Primary:** coral fill, white text, soft shadow, slight `-translate-y` on hover.
- **Outline:** transparent + 2px primary border; hover `bg-primary/8`.
- **Secondary:** secondary fill / on-secondary text.
- **Ghost:** transparent; hover `bg-surface-low`.
- Focus: `ring-2 ring-primary ring-offset-2 ring-offset-surface`.

### Section badge
- Triple short vertical ticks + mono uppercase label in a thin bordered pill (`rounded-sm`).
- Default: primary ticks, on-surface label. On dark bands: `alternate` uses on-secondary muted border/text.

### Navbar
- Fixed; transparent over light/dark heroes until scroll → solid surface blur.
- Wordmark: `font-display` bold.
- Links: uppercase Space Grotesk; hover to primary.
- Solutions / Industries: button triggers (not hub links); coral filled pill when open/hover; panel stays open ~300ms after pointer leave; only item rows navigate.
- Mobile: accordion for Solutions/Industries; same item links only.

### Nav dropdown panel
- Compact list, uppercase display titles, no descriptions, no “view all” footer in the panel.
- Hub routes (`/solutions`, `/industries`) remain for footer/SEO; not trigger destinations.

### Industry photo strip (home)
- Compact 2-col mobile / 5-col desktop linked tiles.
- `aspect-[4/3]` image, name in display semibold, one short focus line under (not long blurbs).
- Prefer crisp ≥1200px-wide assets; `object-cover` with quality-conscious `sizes`.

### How it works (home)
- Desktop: pin + scrub through Data → Analysis → Prescriptions → Decisions (client GSAP after MotionProvider `isReady`).
- Mobile / reduced motion: stacked steps, no pin.
- Sidebar step buttons jump to step progress on desktop.

### MotionSlot
- Placeholder for deferred animation: bordered rounded box, mono “Animation soon” + label. Dark variant for secondary bands.

### Section rhythm
- `.section-y`: padding-block 4rem / 5.5rem (md) / 7.5rem (lg).
- Container: safe-area aware horizontal padding; max-width from Container component.
- One composition per first viewport; brand-forward hero; no card grids in hero.

### Footer
- Columned: Solutions (explicit pillars), Industries (all live verticals named), Resources, Company.
- Display wordmark; secondary/surface treatment per current Footer.

## 6. Do's and Don'ts

### Do
- Change colors only in `styles/theme.css`; map utilities through `app/globals.css`.
- Keep homepage section order unless IA is explicitly revised.
- Use real plant imagery for industries; MotionSlot only where animation is deferred.
- Lead with Verified with evidence / ₹-scored language where product truth allows.
- Prefer hairline borders and tonal bands over cards.
- Keep side accents at **1px** if used at all.

### Don't
- Do not use gradient fills or gradient text.
- Do not use thick left/right accent stripes on cards or callouts.
- Do not ship purple-on-cream / glassmorphism / hero-metric SaaS strips.
- Do not put mono on the whole navbar (badges/slots only).
- Do not make Solutions/Industries triggers navigate to hub routes.
- Do not invent fleet metrics or bill-verified claims without evidence language.
- Do not nest cards or default every section to identical icon + title + text grids.
- Do not add bounce/elastic motion; ease-out exponentials only.
