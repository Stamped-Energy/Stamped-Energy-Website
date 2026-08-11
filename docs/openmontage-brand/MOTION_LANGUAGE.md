# Motion language (Stamped)

C-Vector-inspired **grammar**, Stamped-owned **identity**. Pair with `DESIGN_VIDEO.md` and `references/cvector-audit.md`.

---

## Physics

| Property | Rule |
|----------|------|
| Easing | Ease-out quart / quint / expo only |
| Bounce / elastic / overshoot | Forbidden |
| Layout properties | Do not animate width/height/top/left; use transform + opacity |
| Entrance | Fade-up with slight scale 0.96→1.0, or draw-in for diagrams |
| Exit | Fade / short slide; no slam |
| Stagger | 40–80ms between sibling elements |
| Transition duration | ~0.35–0.5s between scenes |
| Hold | min scene 2.5s; text 3–4s; stat 3s |

Reduced-motion / accessibility: prefer hard cuts + static holds when targeting web embeds with `prefers-reduced-motion`.

---

## Signature patterns

### 1. Prescription UI storytelling

Hero visual is a **prescription card** assembling:

1. Mono LIVE / Recommendation label ticks in  
2. Title fades up  
3. Owner + ₹ impact count or snap in (ease-out; no slot-machine bounce)  
4. Evidence line last  

Optional: soft telemetry chips (MD kVA, feeder, shift) orbiting without glow spam.

### 2. How-it-works stage swap

Four beats (align with site HIW):

1. **Data** — meters / SCADA / bill signals docking into a graph  
2. **Analysis** — baselines and waste categories lighting (sparingly)  
3. **Prescriptions** — ranked ₹ cards  
4. **Decisions** — operator accepts; ledger ticks **Verify**; hint **Improve**

Pin/scrub metaphor for longform; for timed video, hard cuts or wipe-left between stages.

### 3. Color-band scene changes

Hard or soft wipe into Problem dark / Coral drench / Impact lime. Treat band change as a narrative chapter, not decoration.

### 4. Section badge reveal

Three short coral ticks + mono uppercase label (matches site SectionBadge). Use once per major chapter, not on every subtitle.

### 5. Closing CTA

Coral drench or light office with primary button: **Book a Discovery Call**. Optional chevron nudge on loop (2–4px translate, ease-out).

---

## Pacing profiles

| Profile | Pace | Best for |
|---------|------|----------|
| Explainer | Moderate | 45–90s product / HIW |
| Launch | Moderate-fast | 15–30s teaser; still no bounce |
| Documentary | Deliberate | Founder / plant story with B-roll |

New visual idea every 2–4s in launch; every 3–5s in explainer.

---

## Audio (defaults for OpenMontage)

- Voice: professional, clear, warm-authoritative, moderate pace; Indian English acceptable when casting fits ICP  
- Music: ambient industrial-clean; low volume (~0.08); not EDM hype  
- SFX: soft ticks on card assemble; soft whoosh on band change; no glitch spam  

---

## Anti-patterns

- Particle networks as “AI”  
- Bounce-in logos  
- Metric counters racing like a game HUD  
- Identical three-icon card grids as the only visual plan  
- Thick colored side rails on cards  
- Cloning CVector Rive scenes frame-for-frame  

---

## Website MotionSlot briefs

When replacing site placeholders, prefer:

- Hero: isometric or UI-led decision layer (not GIF spam)  
- Problem: three pain beats on dark band  
- HIW: pin/scrub four stages (already partially live)  
- Solutions: prescription chrome per pillar  

See `prompts/website-motion-brief.md`.
