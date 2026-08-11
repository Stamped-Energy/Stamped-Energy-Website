---
name: "Stamped Industrial"
version: "1.0"
tags:
  - industrial
  - energy
  - motion-graphics
  - plant-office
author: "Stamped Energy"
source_url: "https://stamped.work"
created: "2026-08-11"

style_prompt_short: >
  Plant-office decision layer motion graphics for Stamped Energy.
  Forge coral #F75440 on demo-deck #f7faf5. ₹-scored prescription UI as hero.
  Space Grotesk, Inter, Plex Mono. Ease-out only.

style_prompt_full: >
  Stamped Energy industrial motion graphics. Creative north star: bright mid-morning
  plant control office where a director scans assigned next actions with rupee impact,
  not a neon SaaS dashboard. Background default #f7faf5 (warm green-grey). Primary accent
  Forge Coral #F75440 for CTAs, LIVE badges, and ₹ highlights. Problem or gravity scenes
  may use full Obsidian Green #000a07. Optional short impact scenes may use chartreuse
  #e8f07a with dark olive text, never as a third brand primary in chrome. Typography:
  Space Grotesk bold for titles, Inter for body, IBM Plex Mono uppercase for sparse labels
  only. Hero visual is Stamped prescription UI chrome assembling in order: mono label,
  title, owner, ₹ impact, evidence line. Supporting visuals: energy graph
  (plant → system → equipment → meter), Connect→Observe→Decide→Execute→Verify→Improve loop,
  two pillars named Industry Energy Management and Asset Health Intelligence. Motion:
  ease-out exponential only; fade-up or UI assemble; no bounce, elastic, overshoot, or
  purple neon glow. No glassmorphism, gradient text, thick side stripes, hero-metric
  template strips, or identical icon-card grids. Never show CVector branding or their
  metrics. Claims must say verified with evidence; DISCOM bill confirmation optional;
  no invented fleet metrics; no EMS/MES/CMMS/PLC replacement. Copy uses short industrial
  sentences with no em dashes.

colors:
  primary:
    - name: "Forge Coral"
      hex: "#F75440"
      role: "CTA, LIVE, ₹ highlights, identity accent"
    - name: "Demo-deck Surface"
      hex: "#f7faf5"
      role: "default scene background"
  accent:
    - name: "Obsidian Green"
      hex: "#000a07"
      role: "problem/gravity full bands, secondary chrome"
    - name: "Impact Lime"
      hex: "#e8f07a"
      role: "optional outcome scene mode only"
  neutral:
    - name: "On-surface"
      hex: "#191c1a"
      role: "primary text on light"
    - name: "On-surface Variant"
      hex: "#5a403c"
      role: "secondary text"
    - name: "Outline Variant"
      hex: "#e3beb8"
      role: "hairline borders on UI chrome"

typography:
  display:
    family: "Space Grotesk"
    weight: "bold"
    style: "tight tracking, industrial grotesk"
  body:
    family: "Inter"
    weight: "regular"
    style: "readable plant-office scan"
  caption:
    family: "IBM Plex Mono"
    weight: "medium"
    style: "uppercase, wide tracking, labels only"
  rules:
    - "Inherit website fonts; do not invent a new stack"
    - "Mono for badges and LIVE labels only"
    - "No gradient text"
    - "No all-caps body copy"

layout:
  grid: "Asymmetric plant-office; one dominant UI plane"
  alignment: "Flush left preferred; avoid centered template stacks"
  aspect_ratio: "16:9 default; 9:16 for shorts"
  notes:
    - "One job per scene"
    - "Prescription card is the canonical interactive-looking unit"
    - "Hairline borders; rounded ~6–8px"

motion:
  transitions:
    - "fade"
    - "dissolve"
    - "slide-left"
    - "wipe-left"
  animation_style: >
    Ease-out expo/quart. Prescription UI assembles label → title → rupee → evidence.
    Stage swaps for Data → Analysis → Prescriptions → Decisions. No bounce.
  pacing: "Measured, confident; hold ≥2.5s"
  audio_cues:
    - "soft ticks on card assemble"
    - "soft whoosh on color-band change"

mood:
  keywords:
    - "industrial"
    - "rupee-clear"
    - "sparse"
    - "trustworthy"
    - "plant-office"
  era: "contemporary industrial software"
  cultural_reference: "Indian manufacturing plant office; verified ₹ decisions"
  avoid:
    - "purple SaaS neon"
    - "glassmorphism"
    - "CVector clone"
    - "MES plant OS cosplay"
    - "bounce/elastic motion"
    - "invented fleet metrics"
    - "em dashes"

assets:
  reference_images: []
  gsep_elements: []
  html_snippets: []
  color_palette_image:
    url: ""

x_openmontage:
  playbook: "styles/stamped-industrial.yaml"
  context_pack: "docs/openmontage-brand/"
---

## Design Principles

Committed coral on a light plant-office canvas. The prescription card is the product.
Motion explains the decision loop; it does not decorate. Borrow C-Vector stage storytelling,
never their brand.

## Connectors

### OpenMontage
Use playbook `stamped-industrial`. Agents must read `context/STAMPED_CONTEXT.md` and
`context/VOICE_AND_CLAIMS.md` before proposal/script stages. Feed `style_prompt_full` into
image/video providers when a freeform style block is required.

### HyperFrames / Remotion
Map colors to CSS variables matching `DESIGN_VIDEO.md`. Prefer HTML/GSAP or React scenes
that assemble prescription UI rather than Ken Burns over stock only.

### Website MotionSlots
Same tokens and motion physics; see `MOTION_LANGUAGE.md` and `prompts/website-motion-brief.md`.
