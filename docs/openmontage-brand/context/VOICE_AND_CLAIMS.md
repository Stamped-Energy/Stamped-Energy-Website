# Voice and claims firewall

Agents **must** follow this before writing narration, on-screen text, or image prompts that imply product outcomes.

---

## Voice

- Direct, industrial, rupee-first.
- Short sentences. Prefer periods and commas. **No em dashes** and no `--`.
- Prefer: prescription, assigned action, rupee-scored, rupee-ranked, ₹ impact (amounts), verified with evidence, read-only, Improve loop. Origin/pitch may also use: intelligence layer for the industrial world; live data in real time; plant-decision moves (run harder or hold back, adjust a process, delay maintenance, switch production priorities).
- **Rupee compounds (current rule):** write the word. `rupee-scored`, `rupee-ranked`, `rupee-scores`, `rupee-ranks`. Never `₹-scored` or `₹-ranked`. Keep `₹` on amounts (`₹2-5L`, `₹20 lakh`) and on “₹ impact”.
- Avoid: “AI magic,” “platform of platforms,” “transform your plant,” MES/CMMS replacement language, glassmorphism SaaS tropes in copy.

---

## Honesty tags (from Master)

| Tag | Meaning | Video rule |
|-----|---------|------------|
| `[~]` | Approximate / benchmark-derived | Say “indicative” / “typical class” or omit the number; never present as Stamped fleet proof |
| `[!]` | Actively evolving | Do not hard-code as permanent product fact |

---

## Allowed claims

- Read-only overlay on meters, SCADA/PLC/EMS, bills, optional order context. Quelta / Orrery: join records the plant already keeps; Orrery changes nothing at launch.
- **Products (v4, ADR-050):** Quelta (Process and Quality, with maintenance flags); Orrery (Ask). Scheduling coming soon. Sold separately.
- Trust lines (both): “Stamped works inside limits set beforehand.” · “Stamped recommends and your team decides.”
- Loop: Connect → Watch → Explain → Test and approve → Prove (public How it works). Improve / self-improving language stays on `/platform`.
- Outcomes **verified with evidence** from the plant’s own matched batches.
- **Approved fleet-framed figures (ADR-053):** “upwards of 30% fewer rejections” and “upwards of 10% lower energy costs”, always with the caption **“Seen across plants using Stamped.”** Do not drop the caption. Do not invent other % figures.
- Mission: “Making industrial plants smarter.”
- Trust strip: “Backed by” NVIDIA Inception and AWS for Startups (founder-accepted wording).
- DISCOM bill confirmation is **optional** (energy heritage; not a Quelta hero claim).
- Operators remain in control; agentic layer recommends.
- Indicative savings ranges **only** with clear “benchmark / pilot replaces with plant figures” framing, except the two approved “upwards of” lines above.
- ICP Band A: plants with **≥ ₹30 lakh/month** electricity (Master/ICP authoritative for GTM video).

---

## Forbidden claims

- Invented fleet metrics beyond the two approved “upwards of” lines, fake customer logos, or named savings as if proven without the caption.
- The **17%** figure, prices, client names.
- “Prescriptive intelligence” (brochure ban). Prefer “maintenance flags with a suggested fix.” “Prescriptive maintenance” only in metadata, keywords, or one FAQ answer.
- Hosting or model vendor names on the Orrery / Ask page.
- Machining as a named product on the marketing site.
- “Bill-verified” as the hero when only ops/calculated ledger exists.
- EMS / SCADA / PLC **replacement**.
- MES / CMMS / plant OS / OEE product.
- Hardware retrofit as the product.
- CVector (or any competitor) metrics, dollar figures, or brand as Stamped. **Exception:** the origin-story sentences in `STAMPED_CONTEXT.md` / `lib/content/about.ts` (conviction, plant-decision moves, “what was missing…”, “for years such a system was impossible”, intelligence layer for the industrial world) are approved Stamped copy. Do not paste other CVector pages, metrics, or “economic intelligence layer” as a category name.
- “AI is learning about you” for the Improve step.
- National conglomerate “already deployed at Tata/Mahindra group” style overclaim.
- Guaranteed % without “upwards of” + caption, or without `[~]` / indicative framing for other numbers.

---

## Threshold conflict (site vs Master)

| Source | Floor language |
|--------|----------------|
| Master + ICP v3 | Band A **≥ ₹30L/month**; Band B ₹15–30L nurture |
| `llms.txt` / some site SEO | ₹20L+ |

**Rule for OpenMontage:** Use **≥ ₹30L** for GTM / launch / explainer ICP statements. Use ₹20L+ only when explicitly mirroring public llms.txt AEO wording, and note the conflict in the script brief.

---

## On-screen UI vocabulary (safe chrome)

Use these labels in motion graphics (Stamped product fiction, not competitor clones):

- LIVE / Recommendation / Scored impact **₹…**
- Plant telemetry / External signals / Application data (as generic inputs)
- Prescription cards: what / who / ₹ impact / evidence
- Steps: Data → Analysis → Prescriptions → Decisions (or Connect→…→Improve)

Do not show competitor brand marks or their exact metric tiles (e.g. “3–7% operating margin uplift” from third parties).

---

## Narration checklist

1. Does every number carry indicative/disclaimer or plant-specific fiction labeled as example?
2. Is the product “layer on what you have,” not rip-and-replace?
3. Is Improve framed as decisions + verification, not creepy learning?
4. Are pillar names exact public names?
5. No em dashes?
6. Rupee compounds spelled out (`rupee-scored`), not `₹-`?
