# Prompt: Website MotionSlot brief

## Purpose

Brief for replacing Main_Website `MotionSlot` placeholders (or net-new GSAP/Rive/Remotion embeds) with Stamped-owned motion. Not an OpenMontage render by default; use same design tokens.

## Tokens

Follow root `DESIGN.md` + `../DESIGN_VIDEO.md` + `../MOTION_LANGUAGE.md`.

## Priority slots (suggested)

| Slot | Intent |
|------|--------|
| Hero | Decision-layer visual (UI or isometric); one composition; no metric strip |
| Problem (dark) | Three pain beats; coral ticks; ease-out |
| What is | Single system visual (energy graph or loop) |
| HIW | Prefer live pin/scrub; enrich stage art if needed |
| Solutions | Per-pillar prescription chrome |
| Impact | Indicative only + disclaimer; optional impact-lime scene if brand ADR allows on site |

## Constraints

- Ease-out only; `prefers-reduced-motion` → static  
- No CVector asset reuse  
- No thick side-stripes, glassmorphism, purple gradients  
- Client-only GSAP after MotionProvider `isReady` if implementing on site  

## Deliverable from agent

Storyboard + asset list + whether Remotion export, Rive, or in-page GSAP is recommended. Wait for approval before coding the site.
