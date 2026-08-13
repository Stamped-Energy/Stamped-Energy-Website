# Implementation Plan — Homepage hero plant-flow (ADR-022)

_Status: Implementation complete. Visual QA against `handoff/hero-plant-flow/hero-plant-flow.html` remaining._

## Goal

Replace the homepage hero MotionSlot with the handed-off Stamped plant-flow motion graphic, ported faithfully into Next.js.

## Scope

- `components/sections/hero/HeroPlantFlow.tsx` (client)
- `components/sections/hero/HeroPlantFlow.css`
- `components/sections/hero/heroPlantFlowEngine.ts`
- `components/sections/Hero.tsx` visual slot
- IBM Plex Mono 600/700 for chip/live tags
- Docs: ADR-022, PROGRESS

## Non-goals

- Deleting `handoff/hero-plant-flow/`
- Replacing other MotionSlots (HIW, WhatIs, Solutions, Problem)
- New visual language or invented fleet metrics
- EMS / MES / PLC-replacement claims
- Dev preview route

## Dependencies

- Public assets `/hero-plant-flow/plant.png` and `/hero-plant-flow/logo.png`
- Existing hero GSAP intro on `[data-hero-animate="visual"]`
- Site fonts: Space Grotesk, Inter, IBM Plex Mono

## Risks

- Chip (0,0) flash if visibility is forced before SVG layout
- Prescriptions panel clipped if stage is shorter than Frame 10 aspect
- GSAP `autoAlpha` racing the plant-flow open sequence
- Mobile viewport vs stage width (graphic uses min-width 860px + horizontal scroll)

## Deliverables

- Animated plant → Stamped → prescriptions flow on `/`
- Reduced-motion static placement
- Handoff folder left in place
