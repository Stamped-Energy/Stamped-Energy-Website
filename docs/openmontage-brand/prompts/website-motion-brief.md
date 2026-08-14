# Prompt: Website MotionSlot brief

## Purpose

Brief for replacing Main_Website `MotionSlot` placeholders (or net-new GSAP/Rive/Remotion embeds) with Stamped-owned motion. Not an OpenMontage render by default; use same design tokens.

## Authority — what still needs building

**Read first:** [`../references/homepage-animation-backlog.md`](../references/homepage-animation-backlog.md)

That inventory is the work list (A00 done; A01–A10 P0; B01–B04 P1). Pick a slot ID from there; do not invent parallel priorities.

## Tokens

Follow root `DESIGN.md` + `../DESIGN_VIDEO.md` + `../MOTION_LANGUAGE.md`.

## Priority slots (from backlog)

| Slot | Backlog IDs | Intent |
|------|-------------|--------|
| Hero | A00 **done** | Decision-layer visual — do not remake |
| Problem (dark) | A01–A03 | Three pain beats; coral ticks; ease-out |
| What is | A04 | Single system visual (energy graph or loop) |
| HIW | A05–A08 | Prefer live pin/scrub; enrich stage art |
| Solutions | A09–A10 | Per-pillar prescription chrome |
| Impact | B01 (P1) | Indicative only + disclaimer; optional fade-in |

## Constraints

- Ease-out only; `prefers-reduced-motion` → static  
- No CVector asset reuse  
- No thick side-stripes, glassmorphism, purple gradients  
- Client-only GSAP after MotionProvider `isReady` if implementing on site  

## Deliverable from agent

Storyboard + asset list + whether Remotion export, Rive, or in-page GSAP is recommended. Wait for approval before coding the site.
