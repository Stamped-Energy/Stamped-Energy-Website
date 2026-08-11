# Stamped Energy — Agent Canon (distilled)

**Read this first.** Deep sources live in `sources/`. Prefer this file for scripting unless you need a quote, ICP table, or architecture detail.

**Synced from:** Master Document v1.6 (Aug 2026), Client Narrative v1, Two-Pillar v1, PRODUCT.md, ICP v3.  
**Honesty:** `[~]` = approximate / benchmark · `[!]` = evolving — verify before customer use.

---

## Identity

| Field | Value |
|-------|--------|
| Company | **Stamped Energy** |
| Product | **Stamped Intelligence** (one product, not three SKUs) |
| Site | https://stamped.work |
| Contact | stamped.energy@gmail.com |
| Founders | Vinayak Raizada, Utso Sarkar (IIT Roorkee) |

**One-line position:** A **read-only operational decision layer** for energy-intensive Indian manufacturers — managing **load and equipment in real time** via ML baselines and an **agentic prescription layer**, turning plant data into **assigned actions with ₹ impact**, **verified with evidence** (DISCOM bill confirmation optional). Does not replace EMS, MES, CMMS, or PLC control.

**Customer-facing tagline:** *From plant data to verified savings.*

**GTM category:** Verified-with-evidence operational decision layer. Enemy: **insight without closure** (dashboards and audits that never become assigned actions with evidence-backed ₹).

---

## What we are / are not

**Are:** Software-first overlay on existing meters, SCADA/PLC/EMS, bills, optional order context. Prescriptions with owners and rupee impact. Evidence from Stamped’s tracking stack.

**Are not:** Passive EMS dashboard. ESG-only platform. Hardware company. PLC write/control. MES / CMMS / plant OS. A third “OEE product.” Sustainability-as-rebrand (operational intensity evidence is a co-benefit of the same ledger).

---

## Two pillars (public naming)

| Pillar (public) | Route slug | Job |
|-----------------|------------|-----|
| **Industry Energy Management** | `/solutions/load-energy` | Load, MD, TOD, idle, HVAC/utilities, tariff — ₹-scored energy prescriptions |
| **Asset Health Intelligence** | `/solutions/equipment-intelligence` | Same stack flags equipment issues early with economic ranking |

Shared plant context (orders/departments) enables management Rx without becoming MES.

---

## Operating loop

**Connect → Observe → Decide → Execute → Verify → Improve**

Improve = continuous calibration from decisions taken and verified outcomes. Never say “AI is learning about you.”

---

## Four-step client story (canonical narrative)

1. Load and energy management in real time  
2. Equipment ML on plant baselines  
3. Prescriptions with verify loop  
4. Agentic layer alongside (operators stay in control)

Full templates: `sources/Stamped_Client_Positioning_and_Narrative_v1.md`.

---

## ICP (authoritative for GTM video)

| Gate | Rule |
|------|------|
| Primary commercial floor (Band A) | **≥ ₹30 lakh/month** electricity per plant |
| Revenue band `[~]` | ₹300–5,000 crore |
| Geography | North India first (NCR, Haryana, UP, Rajasthan, Punjab, HP, Uttarakhand) |
| Verticals | Automotive/components, cement, steel/metals, pharma, chemical (+ overlays in ICP) |
| Out of scope (current GTM) | National conglomerate group procurement-only (Tata/Mahindra OEM group motions) |
| Band B nurture | ₹15–30L/month — qualify; pilot if champion strong |
| Band C | < ₹15L/month — no active outbound unless strategic |

**Site / llms.txt** may say ₹20L+. **For OpenMontage GTM scripts, Master + ICP v3 win** (≥ ₹30L Band A). Flag ₹20L only if mirroring live site AEO copy.

Full ICP: `sources/ICP-North-India-Large-Manufacturer.md`.

---

## Proof language

- Lead with **Verified with evidence** (ops-cleared / calculated ledger).  
- DISCOM bill confirmation is **optional**, not the hero claim.  
- Indicative ranges only with disclaimer; **no invented fleet metrics**.  
- Benchmark framing `[~]`: e.g. 12–20% monthly bill class savings via closed prescriptions across six waste categories (see Architecture summary). Pilot replaces with plant figures.

---

## Brand voice (scripts)

Direct, industrial, rupee-first. Short sentences. No em dashes. Plant-floor credibility over software hype. Prefer “prescriptions,” “assigned actions,” “₹ impact,” “verified with evidence.”

Forbidden tone: purple SaaS hype, “AI magic,” MES replacement, bill-verified badges from ops-only data.

---

## Startup journey (one line)

Founder-led arc through pivots to current verified-with-evidence decision layer; use only for founder-story videos. Do not invent biography. Details: Research+DOcs `Stamped-Startup-Journey.md` (summary only in this pack unless added later).

---

## Source index

| File | Use when |
|------|----------|
| `sources/Stamped_Energy_Master_Document_v1.6.md` | Full company/product SoT |
| `sources/Stamped_Client_Positioning_and_Narrative_v1.md` | Deck/WhatsApp narrative |
| `sources/Stamped_Two_Pillar_Technical_Framing_v1.md` | Pillar technique taxonomies |
| `sources/Stamped_Product_Definition_and_Architecture.md` | HL architecture for explainers |
| `sources/Stamped_Tech_Archi_Core.md` | Six waste categories, layers |
| `sources/ICP-North-India-Large-Manufacturer.md` | Personas, bands, hooks |
| `sources/PRODUCT.md` | Marketing product register |
| `sources/llms.txt` | Public AEO entity text |
| `../SITE_IA_AND_NAMING.md` | Exact nav/CTA strings |
| `../VOICE_AND_CLAIMS.md` | Claims firewall |
| `../ARCHITECTURE_SUMMARY.md` | 1-page tech for visuals |
