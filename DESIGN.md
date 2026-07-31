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

- Display: Plus Jakarta Sans (identity: preserve; do not swap for reflex-reject fonts)
- Body: Inter
- Strong scale contrast; body ≤75ch

## Layout craft

- One composition per first viewport; brand-forward
- Full-bleed imagery where used; solid overlays (`bg-secondary/70`) not gradients
- No cards unless interaction needs them; no nested cards
- One job per section; homepage ≤7 sections

## Motion

GSAP + ScrollTrigger + Lenis. 2-3 intentional reveals per major page. Ease-out exponentials. No bounce.

## Absolute bans

Gradients, gradient text, side-stripe accent borders, hero-metric SaaS strips, purple-on-cream AI slop, identical icon+title+text card grids.
