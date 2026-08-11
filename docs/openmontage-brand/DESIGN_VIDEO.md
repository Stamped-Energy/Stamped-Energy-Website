---
name: Stamped Energy Video
description: OpenMontage / motion-graphics design system. Plant-office decision layer. ₹-scored prescriptions. Verified with evidence.
register: brand
colors:
  primary: "#F75440"
  on-primary: "#ffffff"
  primary-fixed: "#ffdad4"
  inverse-primary: "#ffb4a8"
  secondary: "#000a07"
  on-secondary: "#ffffff"
  secondary-container: "#bdd9c8"
  tertiary: "#00666b"
  surface: "#f7faf5"
  surface-low: "#f1f4f0"
  on-surface: "#191c1a"
  on-surface-variant: "#5a403c"
  outline-variant: "#e3beb8"
  impact-lime: "#e8f07a"
  impact-lime-on: "#2f3218"
typography:
  display:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 700
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 400
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontWeight: 500
    letterSpacing: "0.12em"
---

# Design System: Stamped Energy Video

Impeccable **brand** register. Scene sentence: *Plant director at mid-morning in a bright control office, scanning ₹-scored next actions; not a neon SaaS dashboard at 2am.*

Creative north star matches the website: **Plant-office decision layer.** Videos sell assigned actions and verified ₹, not dashboard theater.

Website tokens remain SoT in root `DESIGN.md` / `styles/theme.css`. This file governs **OpenMontage, Remotion, HyperFrames, and product launch motion**.

---

## 1. Overview

**Color strategy: Committed.** Forge Coral carries identity and action (roughly 30–40% of accent moments). Default canvas is demo-deck light. Dark Obsidian Green bands are deliberate narrative beats. Optional impact-lime is a **scene mode** for outcome reveals, never a third brand primary in nav/chrome.

**Imagery strategy:** Product UI chrome is the hero (prescription cards, LIVE badges, energy graph, ledger ticks). Real plant photography is atmosphere. Avoid generic “AI neural net” stock.

**Motion strategy:** Ease-out exponentials only. Progressive reveal and stage swaps. No bounce, elastic, or layout-thrashing animations.

**Rejects:** Purple SaaS gradients, glassmorphism as default, hero-metric template strips, identical icon-card grids, thick side-stripes (>1px), gradient text, CVector clone kits, MES/plant-OS claims, invented fleet metrics.

---

## 2. Colors

| Role | Token | Hex | Video use |
|------|-------|-----|-----------|
| Primary | Forge Coral | `#F75440` | CTAs, LIVE dots, ₹ highlights, active steps |
| On-primary | White | `#ffffff` | Text on coral |
| Secondary | Obsidian Green | `#000a07` | Problem / gravity bands, title cards |
| Surface | Demo-deck | `#f7faf5` | Default scene background |
| Surface low | | `#f1f4f0` | Soft panels |
| Text | On-surface | `#191c1a` | Headlines/body on light |
| Mute | On-surface-variant | `#5a403c` | Secondary copy |
| Border | Outline-variant | `#e3beb8` | Hairline UI chrome |
| Impact mode | Impact lime | `#e8f07a` | Optional full-bleed outcome beat |
| On impact | | `#2f3218` | Text on impact lime |

**One Coral Rule.** Prefer coral on text, borders, pills, metrics. Large dark fills use secondary. Full coral drench only for short CTA/end cards (C-Vector-inspired band, Stamped hex).

**Light Office Rule.** Most scenes stay light. Dark and lime are intentional scene modes.

---

## 3. Typography

**Font continuity override:** Inherit website stack (Space Grotesk / Inter / IBM Plex Mono) so OpenMontage matches stamped.work. Impeccable greenfield reflex-reject does not apply; identity preservation wins (see `BRAND_BRIDGE.md`).

| Role | Family | Notes |
|------|--------|-------|
| Display / titles | Space Grotesk 700 | Tight tracking; sentence case preferred for long titles |
| Body / narration lower-thirds | Inter 400–500 | ≤75ch equivalent on screen |
| Labels / LIVE / step chips | IBM Plex Mono | Uppercase, wide tracking; sparse |

No gradient text. No all-caps body. Mono is chrome, not costume for every line.

---

## 4. Elevation and chrome

Flat / tonal. Depth from surface steps and 1px borders. Soft shadow only on primary CTA moments. No stacked glass cards.

**Prescription card (canonical UI unit):**

- Hairline border, surface fill, rounded-md (~6–8px)
- Mono label (LIVE / PRESCRIPTION)
- Title (what), owner (who), **₹ impact**, evidence line
- Coral accent on ₹ or status, not a thick left stripe

---

## 5. Scene modes

| Mode | Background | Use |
|------|------------|-----|
| Office light | `#f7faf5` | Default explainers, HIW |
| Soft band | `#f1f4f0` | Secondary panels |
| Problem dark | `#000a07` | Pain / fragmentation beats |
| Coral drench | `#F75440` | Short CTA / closing |
| Impact lime | `#e8f07a` | Optional outcome montage (indicative only) |

One job per scene. One headline. One support line. One dominant visual.

---

## 6. Do / Don't

### Do

- Lead with ₹-scored prescriptions and verified-with-evidence language
- Use Stamped pillar names exactly
- Prefer UI motion over decorative particles
- Hold establishing beats ≥2.5s; text cards ≥3s
- Follow `context/VOICE_AND_CLAIMS.md`

### Don't

- Bounce / elastic / spring-overshoot
- Clone CVector metrics or marks
- Purple neon dark-mode startup look
- Hero-metric strip as the whole video grammar
- Side accent bars thicker than 1px
- Em dashes in any on-screen copy
