# Homepage animation backlog (Stamped)

**Status:** Inventory only — no implementation in this doc.  
**Date:** Aug 2026  
**Canonical (OpenMontage):** keep in sync with Montage-Stamped `brand/stamped/references/homepage-animation-backlog.md`.  
**Agent discovery:** Linked from this pack’s [`README.md`](../README.md), repo-root [`AGENTS.md`](../../../AGENTS.md), and `PROGRESS.md`. If an agent is asked what homepage motion still needs building, **open this file first**.  
**Authority for site slots:** Main_Website CVector-parity homepage (`app/page.tsx`), not the older live [stamped.work](https://stamped.work/) hero.  
**Inspiration:** [https://www.cvector.com/](https://www.cvector.com/) — motion grammar only. See [`cvector-audit.md`](cvector-audit.md).  
**Brief template:** [`../prompts/website-motion-brief.md`](../prompts/website-motion-brief.md)

---

## Hard rules

- Stamped tokens: Forge Coral `#F75440`, demo-deck / surface `#f7faf5` / `#f1f4f0`, Space Grotesk / Inter / IBM Plex Mono.
- Ease-out only (quart / quint / expo). No bounce, elastic, or overshoot.
- `prefers-reduced-motion` → static still (or hard cut + hold).
- Do **not** clone CVector `.riv` assets, logos, copy, $ metrics, or Flame Pea / Claret / Mindaro as brand primaries.
- rupee-scored **prescriptions**, not dollar-scored recommendations. Claims must pass `../context/VOICE_AND_CLAIMS.md`.
- Prefer handoff path like hero: self-contained HTML sample under `brand/stamped/samples/` → port into Main_Website (not a silent Rive clone of CVector).

---

## Status snapshot

| ID | Slot | Status |
|----|------|--------|
| A00 | Homepage hero visual | **DONE** — `HeroPlantFlow` |
| A01–A03 | Problem strips (×3) | **DONE** — `ProblemStripVisuals` |
| A04 | What is Stamped | **DONE** — `WhatIsProductVisual` |
| — | HIW pin / scrub / step nav | **DONE** — GSAP ScrollTrigger |
| A05–A08 | HIW stage visuals (×4) | **DONE** — `HiwStageVisuals` |
| A09–A10 | Solutions pillar chromes (×2) | **DONE** — `SolutionsVisuals` |
| B01–B04 | Impact / CTA / photos / CVector-only | **P1** — no MotionSlot today |

**Count:** 0 remaining P0 MotionSlot compositions. B01–B04 optional.  

```text
A00 Hero DONE
  → A01–A03 Problem DONE
  → A04 What is DONE
  → HIW pin DONE → A05–A08 HIW visuals DONE
  → A09–A10 Solutions DONE
  → B01–B04 P1 optional
```

### Not missing (do not treat as backlog)

- Navbar, `SectionBadge`, `Reveal` fades, hero copy GSAP intro, CTA hover, industry photo zoom
- HIW pin, snap, step-button scroll jump
- Inner-page `SolutionMediaSlot` placeholders on solutions pillar pages — **out of homepage scope** (follow-up only)

---

## A00 — Done (do not remake)

| Field | Value |
|-------|-------|
| **ID** | A00 |
| **Section** | Hero |
| **Component** | `Main_Website/components/sections/hero/HeroPlantFlow.tsx` (wired from `Hero.tsx`) |
| **CVector analog** | `heroDRive` / `heroMRive` — external signals + plant telemetry schematic, product-UI chrome |
| **Stamped beat** | Plant → Stamped hub → ₹ prescription chips |
| **Status** | Shipped (ADR-022). Chip/wire rAF engine + GSAP wrapper intro. |
| **Sample SoT** | `brand/stamped/samples/hero-plant-flow.html` + `Main_Website/handoff/hero-plant-flow/` |

---

## P0 — Replace these MotionSlots

### Package 1 — Problem (3 short strips)

**Section component:** `Main_Website/components/sections/HomeProblem.tsx`  
**Layout:** Dark / secondary band; three columns; `MotionSlot` `aspect-[4/3] max-h-40`, `dark`  
**CVector:** `problemM1`–`problemM3` (~98px tall Rive strips on Flame Pea). Looping line-art UI metaphors.

#### A01 — Priorities

| Field | Value |
|-------|-------|
| **ID** | A01 |
| **Slot label** | Problem visual 1 |
| **Copy beat** | Data is abundant. Clear priorities are not. |
| **CVector analog** | Toggles / sliders / pie / hourglass — many controls, no ranked next step |
| **Motion intent** | Unordered meters / signals → one clear rupee-ranked next action (priority metaphor) |
| **Suggested runtime** | Compact looping SVG/GSAP strip (or HTML sample handoff); keep short height |
| **Reduced motion** | Static icon strip still |
| **Anti-clone** | Do not reuse CVector toggle/slider artwork or Flame Pea as default band (Stamped secondary band already set) |
| **Status** | **DONE** — `Stamped-Energy-Website/components/motion-slots/ProblemStripVisuals.tsx` (`ProblemPrioritiesVisual`) |
| **Sample SoT** | `brand/stamped/samples/problem-strips.html` |

#### A02 — Speed / windows

| Field | Value |
|-------|-------|
| **ID** | A02 |
| **Slot label** | Problem visual 2 |
| **Copy beat** | Windows to act close before teams can respond. |
| **CVector analog** | Same strip language; time/urgency (hourglass / closing window) |
| **Motion intent** | Tariff / MD peak window closing before a review cycle finishes |
| **Suggested runtime** | Same family as A01 (shared strip system, different metaphor) |
| **Reduced motion** | Static still of “window closed” or mid-close state |
| **Anti-clone** | No copied CVector hourglass Rive; Stamped = ToD / demand window language |
| **Status** | **DONE** — `ProblemWindowsVisual` |
| **Sample SoT** | `brand/stamped/samples/problem-strips.html` |

#### A03 — Invisible link

| Field | Value |
|-------|-------|
| **ID** | A03 |
| **Slot label** | Problem visual 3 |
| **Copy beat** | Floor decisions and energy outcomes stay disconnected. |
| **CVector analog** | Invisible link floor → margin / P&L |
| **Motion intent** | Floor action vs DISCOM bill stay disconnected until Stamped closes the loop |
| **Suggested runtime** | Same family as A01–A02 |
| **Reduced motion** | Static split diagram (floor \| bill) with gap |
| **Anti-clone** | No $ margin language; use energy cost / bill outcomes |
| **Status** | **DONE** — `ProblemDecisionsVisual` |
| **Sample SoT** | `brand/stamped/samples/problem-strips.html` |

---

### Package 2 — What is Stamped (1 large visual)

**Section component:** `Main_Website/components/sections/HomeWhatIs.tsx`  
**Layout:** Surface band; square visual `aspect-square max-h-[420px]`; label “Product visual”  
**CVector:** `wicvectorRive` — beige band; efficiency / feedstock / production icons docking into an isometric processor

#### A04 — Product visual

| Field | Value |
|-------|-------|
| **ID** | A04 |
| **Slot label** | Product visual |
| **Copy beat** | AI-powered energy intelligence — continuous analysis → rupee-scored prescriptions + audit trail |
| **CVector analog** | Icons docking into central processor / isometric block |
| **Motion intent** | Meters / SCADA / bills → Stamped hub → ₹ prescription (system diagram, not AI-brain particles) |
| **Suggested runtime** | HTML sample handoff (preferred). Reuse candidate: `brand/stamped/samples/plant-data-flow.html` — **retheme** from dark Obsidian to surface-low; do not ship as-is |
| **Reduced motion** | Static docked diagram |
| **Anti-clone** | No CVector feedstock/production icon set; Stamped energy graph + prescription chrome |
| **Status** | **DONE** — `Stamped-Energy-Website/components/motion-slots/WhatIsProductVisual.tsx` |
| **Sample SoT** | `brand/stamped/samples/what-is-product.html` |
| **Logo** | `public/images/product/logo-mark-3d.png` (still mark, no rotation, no black disc) |

---

### Package 3 — How it works (4 stage visuals)

**Section component:** `Main_Website/components/sections/HomeHowItWorks.tsx`  
**Already live:** Desktop pin + scrub + snap through Data → Analysis → Prescriptions → Decisions; mobile stacked; step nav click-to-progress.  
**Stage art:** `components/motion-slots/HiwStageVisuals.tsx` — `MotionSlot` `aspect-[16/10]`, desktop + mobile.  
**Sample SoT:** OpenMontage `brand/stamped/samples/hiw-chromes.html`  
**CVector:** `hiwR1`–`hiwR4` (desktop) / `hiwMR1`–`hiwMR4` (mobile)

#### A05 — Data

| Field | Value |
|-------|-------|
| **ID** | A05 |
| **Stage** | Data |
| **Copy beat** | Plant and market signals are stored and modeled in real time. |
| **Motion intent** | Signals docking into an energy graph (incomer, SCADA, bills, tariff / weather) |
| **Suggested runtime** | Stage art in shared HIW visual language; swap with pin progress (or play once on step enter) |
| **Reduced motion** | Static “signals stored” frame for this step |
| **Anti-clone** | Stamped signal labels; no CVector commodity board verbatim |
| **Status** | **DONE** — `DataStageVisual` |
| **Sample SoT** | OpenMontage `brand/stamped/samples/hiw-chromes.html` |

#### A06 — Analysis

| Field | Value |
|-------|-------|
| **ID** | A06 |
| **Stage** | Analysis |
| **Copy beat** | Operational scenarios and economic impact analyzed 24/7. |
| **Motion intent** | Baseline vs waste categories lighting; ₹ impact of scenarios — not a generic “AI brain” |
| **Suggested runtime** | Same HIW kit as A05 |
| **Reduced motion** | Static baseline / waste highlight |
| **Anti-clone** | No invented fleet %; indicative UI only |
| **Status** | **DONE** — `AnalysisStageVisual` |
| **Sample SoT** | OpenMontage `brand/stamped/samples/hiw-chromes.html` |

#### A07 — Prescriptions

| Field | Value |
|-------|-------|
| **ID** | A07 |
| **Stage** | Prescriptions |
| **Copy beat** | rupee-scored prescriptions generated in real time. |
| **Motion intent** | Ranked prescription cards assemble: LIVE / mono label → title → owner → ₹ → evidence |
| **Suggested runtime** | Align with `MOTION_LANGUAGE.md` prescription UI storytelling; may echo hero chip language lightly |
| **Reduced motion** | One completed card still |
| **Anti-clone** | ₹ not $; Stamped prescription fields |
| **Status** | **DONE** — `PrescriptionsStageVisual` |
| **Sample SoT** | OpenMontage `brand/stamped/samples/hiw-chromes.html` |

#### A08 — Decisions

| Field | Value |
|-------|-------|
| **ID** | A08 |
| **Stage** | Decisions |
| **Copy beat** | Operators review prescriptions and remain in control. |
| **Motion intent** | Accept / adjust / reject; Verify tick; Improve hint (expertise compounds) |
| **Suggested runtime** | Same HIW kit; land on human-in-control, not auto-write to PLC |
| **Reduced motion** | Static accept + Verify ledger tick |
| **Anti-clone** | No “control system replacement” implication |
| **Status** | **DONE** — `DecisionsStageVisual` |
| **Sample SoT** | OpenMontage `brand/stamped/samples/hiw-chromes.html` |

---

### Package 4 — Solutions (2 pillar chromes)

**Section component:** `Main_Website/components/sections/HomeSolutionsRows.tsx`  
**Layout:** Alternating rows; `MotionSlot` `aspect-[16/10]`  
**CVector:** Four solution cards are **HTML product-UI chrome** (not Rive). Stamped homepage only ships **two** public pillars — do **not** add Plant Margin Optimization or Custom Model Integration.

**Reuse candidates (evaluate; do not drop in unchanged):**

- `Main_Website/components/solutions/AgenticEnergyVisual.tsx` → possible A09 seed  
- `Main_Website/components/solutions/EarlyDetectionVisual.tsx` → possible A10 seed  

#### A09 — Industry Energy Management

| Field | Value |
|-------|-------|
| **ID** | A09 |
| **Pillar** | Industry Energy Management (`/solutions/load-energy`) |
| **CVector analog** | Energy card chrome (“15 MW / PRICE SPIKE / RAMP DOWN”) |
| **Motion intent** | MD / tariff / idle-load prescription chrome: ₹, owner, ToD window, LIVE telemetry chips |
| **Suggested runtime** | In-page GSAP product chrome or HTML sample; product-UI storytelling |
| **Reduced motion** | Static prescription / energy card |
| **Anti-clone** | No CVector MW spike copy; Stamped MD / DISCOM / ToD language |
| **Status** | **DONE** — `Stamped-Energy-Website/components/motion-slots/SolutionsVisuals.tsx` (`EnergyManagementVisual`) |
| **Sample SoT** | `brand/stamped/samples/solutions-chromes.html` |

#### A10 — Asset Health Intelligence

| Field | Value |
|-------|-------|
| **ID** | A10 |
| **Pillar** | Asset Health Intelligence (`/solutions/equipment-intelligence`) |
| **CVector analog** | Vibration / fouling dollar-ranked alert cards |
| **Motion intent** | Energy-linked anomaly → assigned maintenance prescription (₹ risk). Not EMS / MES / CMMS replacement |
| **Suggested runtime** | Same chrome family as A09; early-warning timeline optional |
| **Reduced motion** | Static ranked alert + prescription card |
| **Anti-clone** | No CVector $184K / fouling literals; Stamped claims firewall |
| **Status** | **DONE** — `AssetHealthVisual` |
| **Sample SoT** | `brand/stamped/samples/solutions-chromes.html` |

---

## P1 — No MotionSlot today (optional)

| ID | Section | CVector | Stamped now | Recommendation |
|----|---------|---------|-------------|----------------|
| B01 | Impact | Full Mindaro band; 6 % tiles | Dark secondary band + 6 indicative % + disclaimer | Optional number fade-in only. **No** slot-machine counters. No new Rive. |
| B02 | Closing CTA | Coral drench + Unicorn Studio WebGL | Coral / secondary band + CTAs | Skip Unicorn-style ambient. Optional CTA chevron nudge (2–4px, ease-out). |
| B03 | Industries / Resources | Photos / blog cards | Same | Keep photos / cards. Not animation slots. |
| B04 | Testimonials / Security | Present on CVector | **Not on Stamped home** | Out of scope. |

---

## Suggested build order

1. **B01–B02** only if polish pass after P0.

---

## Runtime & handoff convention

| Approach | When |
|----------|------|
| HTML sample in `brand/stamped/samples/` + Main_Website port | Preferred for complex loops (matches A00 hero-plant-flow) |
| In-page GSAP after `MotionProvider.isReady` | Fine for strips, chrome assemble, pin-synced stage art |
| Remotion / HyperFrames export → embed | Only if a video/export is the deliverable; not default for site slots |
| Clone CVector `.riv` | **Forbidden** |

Each slot brief when implementing should still produce: storyboard + asset list + runtime choice + reduced-motion still — then wait for approval before coding the site (`../prompts/website-motion-brief.md`).

---

## Follow-ups (outside this backlog)

- Solutions pillar **Industry Energy Management** (`/solutions/load-energy`) How it works chromes are shipped (sample SoT `brand/stamped/samples/load-energy-hiw.html` → `LoadEnergyHiwVisuals.tsx`)
- Solutions pillar **Asset Health Intelligence** (`/solutions/equipment-intelligence`) How it works chromes are shipped (`brand/stamped/samples/asset-health-hiw.html` → `AssetHealthHiwVisuals.tsx`)
- Platform / How-it-works long page enrichments
- OpenMontage video productions using the same motion grammar (`stamped-industrial` playbook)

---

## Related docs

| Doc | Role |
|-----|------|
| [`cvector-audit.md`](cvector-audit.md) | CVector stack + section modes (inspiration) |
| [`../MOTION_LANGUAGE.md`](../MOTION_LANGUAGE.md) | Physics + signature patterns |
| [`../DESIGN_VIDEO.md`](../DESIGN_VIDEO.md) | Video / motion tokens |
| [`../prompts/website-motion-brief.md`](../prompts/website-motion-brief.md) | Per-slot implementation brief |
| Main_Website `DESIGN.md` § MotionSlot | Site placeholder + section rhythm |
| Main_Website `PROGRESS.md` | Remaining “animation pass” checkbox |
