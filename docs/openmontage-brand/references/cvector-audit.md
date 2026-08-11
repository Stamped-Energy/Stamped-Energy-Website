# CVector motion audit (inspiration only)

**Source:** Live audit of https://www.cvector.com/ (homepage + product), Aug 2026.  
**Purpose:** Borrow **motion grammar** and industrial UI storytelling patterns for Stamped video / site motion.  
**Hard rule:** Do **not** clone CVector brand marks, copy, metrics, or exact visual kits. Stamped identity stays coral / Space Grotesk / plant-office (see `../DESIGN_VIDEO.md`).

---

## Stack observed

| Layer | Technology |
|-------|------------|
| Site | Webflow |
| Scroll / orchestration | GSAP 3.13 |
| Product UI motion | **Rive** canvases (class names `*Rive`) |
| Ambient WebGL | Unicorn Studio (footer scene) |
| Type (theirs) | ABC Monument Grotesk + Inter + Monument Grotesk Mono |

Stamped does **not** license Monument Grotesk. Map their type roles → Space Grotesk / Inter / IBM Plex Mono.

---

## Color schemes extracted (CSS primitives)

| Token | Hex | Role on their site |
|-------|-----|--------------------|
| Flame Pea | `#e35f3f` | Accent CTA; full-bleed coral sections (scheme 5) |
| Beige lightest | `#fcfcfb` | Default light canvas |
| Beige light | `#eeeae3` / `#e8e2d8` | Soft bands (What / Testimonials) |
| Beige darkest | `#454340` | Body text |
| Claret | `#761438` | Dark contrast scheme |
| Mindaro | `#eef981` | Impact band (chartreuse) |
| Mindaro darkest | `#474a26` | Text on mindaro |

**Stamped mapping (do not ship Flame Pea / Claret as brand primaries):**

| CVector cue | Stamped equivalent |
|-------------|--------------------|
| Flame Pea accent | Forge Coral `#F75440` |
| Beige canvas | Demo-deck `#f7faf5` / surface-low `#f1f4f0` |
| Claret dark | Obsidian Green `#000a07` |
| Mindaro impact | Optional **scene mode** only: soft lime/chartreuse band for “impact” beats; never a third brand primary in chrome |

---

## Homepage section modes (structural inspiration)

| Section | Color mode | Motion notes |
|---------|------------|--------------|
| Hero | Light | Rive hero canvas (`heroDRive` / `heroMRive`); left copy + CTA |
| Problem | Full Flame Pea | Three problem items with small Rive strips (`problemM1–3`) |
| What is | Beige band | Large Rive visual (`wicvectorRive`) |
| How it works | Light | Pin/scrub-style stage swap; four Rive stages (`hiwR1–4` / mobile `hiwMR*`) |
| Impact | Mindaro full | Metric grid (structure only; **never copy their % numbers**) |
| Solutions | Light | Product UI chrome cards (LIVE, scored $, telemetry) |
| Industries / Security / Blog | Light | Quieter |
| Footer CTA | Full Flame Pea | Unicorn Studio ambient |

Stamped site already follows a similar **narrative order** (ADR-016). Videos may reuse section beats with Stamped copy and ₹.

---

## Motion grammar to borrow

1. **Product UI as hero visual** — animated recommendation cards, LIVE badges, telemetry chips, not stock “AI brain” clips.  
2. **Scroll-orchestrated stages** — Data → Analysis → Recommendations → Decisions (Stamped: Prescriptions; land on Verify/Improve).  
3. **Staggered section reveals** — label → headline → body → CTA; ease-out, no bounce.  
4. **Bold color bands as scene modes** — light office / dark problem / coral drench / optional impact lime.  
5. **Mono uppercase chrome** — short labels, badges; grotesk headlines.  
6. **Directional CTAs** — forward motion (chevron shift), not elastic pop.  
7. **Sparse first viewport** — brand, one headline, one support line, one CTA group, one dominant motion plane.

---

## Anti-clone list (never)

- CVector wordmark, bar-chart logo mark, or “CVector” in assets  
- Their exact metric tiles (e.g. 3–7% margin uplift, 12–15% throughput)  
- Claret + Mindaro as Stamped’s default brand pair  
- ABC Monument Grotesk as if licensed  
- Dollar-scored copy where Stamped is ₹-scored  
- Claiming their customers, security badges, or funding as ours  

---

## Pages surveyed

- `/` homepage (primary motion density)  
- `/product` (lighter hero; same chrome language)  
- Solution / industry / about URLs exist for IA parity; motion language is consistent with home kits  

---

## Implication for OpenMontage

Prefer **Remotion / HyperFrames motion graphics** that simulate Stamped prescription UI and HIW stages over photoreal B-roll as the default. Real plant photography is allowed as atmosphere, not as a substitute for decision-layer chrome.
