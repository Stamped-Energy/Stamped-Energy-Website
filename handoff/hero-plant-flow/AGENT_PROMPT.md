# Agent prompt — integrate hero plant-flow into homepage hero

Copy everything below the line into your Main_Website agent chat.

---

## Task

Replace the homepage hero **visual** with the Stamped plant-flow motion graphic handed off from OpenMontage. Do **not** invent a new visual language. Port the existing reference faithfully into the Next.js app, then wire it into the hero section.

## Handoff locations (already in this repo)

**Reference HTML + copies of assets**

- `handoff/hero-plant-flow/hero-plant-flow.html` — complete self-contained behavior (CSS + JS + markup)
- `handoff/hero-plant-flow/plant.png`
- `handoff/hero-plant-flow/logo.png`
- `handoff/hero-plant-flow/README.md`

**Public assets (use these URLs in production UI)**

- `public/hero-plant-flow/plant.png` → `/hero-plant-flow/plant.png`
- `public/hero-plant-flow/logo.png` → `/hero-plant-flow/logo.png`

## Current hero to modify

- Homepage section: `components/sections/Hero.tsx`
- Today the visual slot is roughly:

```tsx
<div data-hero-animate="visual" className="mt-12 border-t ...">
  <MotionSlot ... />
</div>
```

- Related (may or may not be used): `components/sections/hero/HeroIsometricVisual.tsx` (static isometric PNG). Prefer **replacing the MotionSlot visual** with the new interactive plant-flow component rather than leaving both competing.

## What the graphic does (requirements)

Port from `handoff/hero-plant-flow/hero-plant-flow.html`:

1. Isometric plant image on the left
2. Three source docks/labels: **Market data**, **Plant telemetry**, **Application systems**
3. Animated wires into the **Stamped** mark + **Stamped / Energy** wordmark (Space Grotesk)
4. Traveling coral data chips with centered pills (Energy price, Power draw, Demand forecast, ToD tariff, Shift plan)
5. Sequential coral relay from Stamped → **Prescriptions** panel
6. Prescriptions carousel: title + subtitle “Ranked plant actions with rupee impact”, ink money pills, readable action copy
7. Respect `prefers-reduced-motion`
8. Keep Stamped brand tokens: demo-deck `#f7faf5`, coral `#F75440`, ink `#191c1a`, fonts Space Grotesk / Inter / IBM Plex Mono

## Implementation guidance

1. **Read** `handoff/hero-plant-flow/hero-plant-flow.html` fully before coding.
2. Create a client component, e.g. `components/sections/hero/HeroPlantFlow.tsx` (or split CSS/JS if cleaner), that reproduces the scene.
3. Use `/hero-plant-flow/plant.png` and `/hero-plant-flow/logo.png` (Next `Image` OK for static plant/logo; keep SVG wires + chip motion as DOM/SVG).
4. Swap the hero visual in `Hero.tsx` to render `<HeroPlantFlow />` inside the existing `data-hero-animate="visual"` wrapper so GSAP intro still works.
5. Layout: visual should read as a **full-bleed / dominant hero graphic** under or beside the copy per current Hero structure — do not shrink it into a tiny card. Match site surface background (`bg-surface` / `#f7faf5`).
6. Responsive: usable on mobile (may simplify motion or scale stage); do not break homepage layout.
7. Claims firewall: keep prescription copy as indicative plant actions; do not add EMS/MES/PLC-replacement claims or invented fleet metrics.
8. Do **not** delete the handoff folder; leave it as the visual SoT until the React port is verified.
9. After port: visually QA chip stacking (labels above dots), no top-left (0,0) chip flash, prescriptions not clipped, logo not covered by pills.

## Done when

- Homepage hero shows the animated plant → Stamped → prescriptions flow
- Assets load from `/hero-plant-flow/*`
- Reduced-motion path is sane
- No layout regression on `app/page.tsx` hero

## Optional

If useful, add a temporary preview route like `app/dev/hero-plant-flow/page.tsx` that iframes or mounts the component full-bleed for isolated QA, then remove before merge if not wanted.
