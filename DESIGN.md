# Stamped Energy: Marketing design context

## Scene

Plant director mid-morning in a bright Indian plant office, scanning electricity cost and next actions → **light** surfaces.

## Color strategy

**Committed:** coral primary on near-black green secondary, demo-deck beige surface.

| Role | Token | Hex |
|------|-------|-----|
| Surface / background | `--brand-surface` | `#f7faf5` |
| Secondary (near-black green) | `--brand-secondary` | `#000a07` |
| Primary (coral) | `--brand-primary` | `#F75440` |
| On-surface | `--brand-on-surface` | `#191c1a` |

Source of truth: `styles/theme.css`. Align with stamped-external demo-decks surface.

## Typography

CVector-adjacent legal stack (ADR-017). Not ABC Monument Grotesk (requires Dinamo license).

| Role | Family | Token / utility |
|------|--------|-----------------|
| Display / headlines | **Space Grotesk** | `--font-family-display` / `font-display` |
| Body / UI | **Inter** | `--font-family-sans` / `font-sans` |
| Labels / badges / mono | **IBM Plex Mono** | `--font-family-mono` / `font-mono` |

- Loaded via `next/font/google` in `app/layout.tsx` (self-hosted, `display: swap`).
- Wired in `app/globals.css` `@theme` as `--font-sans`, `--font-display`, `--font-mono`.
- Headlines: weight 600+, tracking about `-0.025em`; body line-height ~1.65; body ≤75ch; generous `.section-y` air.
- Section badges and MotionSlot labels use `font-mono`.

## Layout craft

- One composition per first viewport; brand-forward
- Full-bleed imagery where used; solid overlays (`bg-secondary/70`) not gradients
- No cards unless interaction needs them; no nested cards
- One job per section; homepage follows ADR-016 CVector narrative (longer than prior ≤7-section cap)

## Motion

GSAP + ScrollTrigger + Lenis. 2-3 intentional reveals per major page. Ease-out exponentials. No bounce. Homepage MotionSlot placeholders pending real animation pass.

## Absolute bans

Gradients, gradient text, side-stripe accent borders, hero-metric SaaS strips, purple-on-cream AI slop, identical icon+title+text card grids.
