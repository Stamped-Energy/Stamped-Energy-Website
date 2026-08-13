# Phase completion — Homepage hero plant-flow

## Completed work

- Ported `handoff/hero-plant-flow/hero-plant-flow.html` into a Next.js client component
- Swapped the homepage hero MotionSlot for `HeroPlantFlow` inside the existing GSAP visual wrapper
- Kept handoff folder as visual SoT

## Files modified

- `components/sections/hero/HeroPlantFlow.tsx` (added)
- `components/sections/hero/HeroPlantFlow.css` (added)
- `components/sections/hero/heroPlantFlowEngine.ts` (added)
- `components/sections/Hero.tsx`
- `app/layout.tsx` (IBM Plex Mono 600/700)
- `DECISIONS.md`, `PROGRESS.md`, `IMPLEMENTATION_PLAN.md`

## Architectural changes

Hero visual is no longer a placeholder. Motion still starts only after `MotionProvider.isReady` so the GSAP intro can hide/reveal the wrapper first. Chip/wire motion stays in the handoff rAF engine (not GSAP).

## Validation performed

- Typecheck / lint on touched files
- Claims: prescription copy taken from the handoff (indicative plant actions)

## Known issues

- Narrow viewports horizontally scroll the 860px-min stage so the prescriptions panel is not clipped
- Remaining homepage MotionSlots (WhatIs, HIW, Solutions, Problem) are unchanged

## Next

- Visual QA vs the HTML reference: chip stacking, no (0,0) flash, panel unclipped, GSAP intro
