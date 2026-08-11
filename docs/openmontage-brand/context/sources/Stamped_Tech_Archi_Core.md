---
type: Product Architecture
title: Stamped Energy — Core Technical Architecture
description: "15–20% savings come from closing six waste categories through assigned prescriptions, not from one ML model. Sustainability comes from the same verified ledger — grid kWh ↓ → Scope 2 ↓,…"
tags: [stamped-energy, product]
timestamp: "2026-06-24T09:24:34Z"
---
# Stamped Energy — Core Technical Architecture

*Condensed architecture reference · August 2026*  
*Full spec:* `Stamped_Technical_Architecture_v1.md` · **Platform SSOT:** [`external/technical/STAMPED_ARCHITECTURE.md`](/external/technical/STAMPED_ARCHITECTURE.md)

---

## Architecture thesis

**15–20% savings** come from **Σ (closed prescriptions) × closure rate** across six waste categories — not from one ML model.  
**Sustainability** comes from the **same verified ledger** — grid kWh ↓ → Scope 2 ↓, production-tagged SEC → intensity evidence for PAT/BRSR/OEM audits.

---

## L0 — Plant systems (read-only)

| Source | Signals | Priority |
|--------|---------|----------|
| Incomer + feeder meters | kW, kVA, kWh, PF, MD | P0 |
| DISCOM bill (PDF) | Energy, MD, PF, charges | P0 |
| SCADA / historian | Equipment states, tags | P1 |
| PLC / CNC | Cycle, idle, spindle | P1 |
| ERP / MES | Tonnage, parts, batch, shift | P1 (SEC) |
| Solar / WHR / DG meters | Import/export, availability | P1 |
| EMS export | Existing aggregates | P0 wedge |

---

## L1 — Connect & normalise

| Component | Role |
|-----------|------|
| **Edge gateway** `[!]` | Optional buffer when VPN/cloud ingest isn't allowed |
| **Protocol adapters** | OPC-UA, Modbus, MQTT, BACnet, REST, CSV historian drops |
| **Schema normaliser** | Everything → canonical `Measurement`, `Event`, `ProductionRecord`, `BillLine` |
| **Tag mapper + discovery** | Vendor tags → semantic asset IDs; LLM-assisted mapping from vertical templates |
| **Bill ingest** | OCR + LLM → structured bill; tariff parser for DISCOM orders |
| **Quality & gap filler** | Stale tags, outliers flagged (not silently fixed) |
| **Event bus** | Streaming fan-out to L2 writers and L3 processors |

---

## L2 — Universal Repository (six stores)

| Store | Holds | Powers |
|-------|-------|--------|
| **Time-series** | Raw → rolled-up telemetry, anomaly scores | MD curves, baselines, trends |
| **Energy graph** | Plant → system → equipment → meter + edges (`feeds`, `drives`, `shares_bus`) | MD attribution, owner routing |
| **Commercial context** | Tariff, CMD, TOD, shifts, production, emission factors | ₹ impact, SEC, tCO₂e |
| **Feature store** | SEC, specific power, load factor, startup events, non-prod ratio | L3 engines |
| **Baseline store** | Expected bands per asset/shift/product | M&V reference |
| **M&V & intensity ledger** | Append-only verified outcomes — **₹ + kWh + tCO₂e + SEC delta** | CFO + sustainability from one ledger |

**Sustainability bridge:** every ledger entry records `avoided_grid_kwh × emission_factor` alongside realised ₹.

---

## L3 — Intelligence core (10 engines → six waste categories)

Each engine outputs **structured findings** (JSON), never prose.

| Engine | Technique | Waste categories served |
|--------|-----------|-------------------------|
| **Baseline & SEC** | Time-series decomposition + production regression + fleet priors | Furnaces, idle loads, SEC drift |
| **Anomaly & deviation** | EWMA, multivariate ML, bill anomaly | All six |
| **Attribution** | Graph traversal + temporal correlation | MD overlap, co-start events |
| **Rules & physics** | Deterministic, versioned rule packs | Compressor SP, PF, holding, COP |
| **Demand & MD** | Spike detection, histogram, stagger simulator | **MD (3–8% of bill)** |
| **Tariff & PF** | Bill component mapping, marginal ₹ | MD, PF penalties |
| **Source-mix dispatch** `[P1]` | MILP / greedy rules | Grid vs solar/WHR (Scope 2) |
| **Waste classifier** | Maps findings → 6 categories | Reporting rollups |
| **Per-plant calibration** | Parameter tuning (not full retrain) | False-positive control |

### Savings model — how 15–20% stacks

| Category | Typical bill share `[~]` | Path B | Path A |
|----------|--------------------------|--------|--------|
| MD / demand | 3–8% | ✓ Week 1 | ✓ Rich attribution |
| Furnaces / process heat | 2–5% | Partial | ✓ |
| Idle / auxiliary | 2–4% | Shift patterns | ✓ Machine-level |
| Compressed air | 1–3% | Proxy | ✓ Feeder-level |
| HVAC / chillers | 1–3% | Limited | ✓ BMS |
| Source mix / VFD | 1–4% | — | ✓ |
| **Cumulative** | **12–20%** | **8–12%** | **12–20%** |

**Closure rate** is architectural: WhatsApp delivery, effort-weighted ranking, owner routing via graph, M&V loop (Done ≠ Saved).

---

## L4 — Knowledge & reasoning

| Component | Role |
|-----------|------|
| **Industrial RAG** | Playbooks (6 waste categories), SEC benchmarks, DISCOM tariffs, IPMVP, plant SOPs |
| **Prescription agent** | Tool-using LLM: query TS, traverse graph, lookup playbook, compute ₹/kWh/tCO₂e, assign owner |
| **Impact calculator** | ₹ (tariff line-item correct) + kWh + tCO₂e (grid factor, versioned) |
| **Rx ranker** | `(₹ × confidence) / effort × urgency`; dedup overlapping root causes |
| **Sustainability narrative engine** | Audit-ready export text from ledger — not creative prose |

**Prescription schema** includes `waste_category`, `sustainability_tags` (`scope2_grid_reduction`, `sec_improvement`, `pat_intensity`), and `evidence_refs` for OEM audits.

**Guardrails:** rules engine veto · no SCADA writes · evidence mandatory · human approval for capex/high-risk.

---

## L5 — Closure & verification (dual M&V)

| Component | Role |
|-----------|------|
| **Workflow** | Open → In Progress → Done → **Verified** / Deferred / Rejected |
| **Notifications** | WhatsApp (supervisors), dashboard (plant head), email/webhook (sustainability) |
| **M&V engine** | IPMVP Option B (bill+incomer) or C (asset+production) |
| **Bill reconciliation** | Modelled vs actual DISCOM line — **bill is final authority** |
| **Intensity verify** | SEC delta when production stable |
| **Savings ledger** | Running potential vs realised — **₹, kWh, tCO₂e, SEC trend** |

---

## L6 — Experience & sustainability exports

| Surface | User |
|---------|------|
| Savings ledger + 30-day trend | Plant head, CFO |
| Prescription queue + WhatsApp | Supervisors |
| Equipment health + anomaly feed | Operations |
| Intensity chart + CO₂ card | Sustainability lead |
| **Monthly sustainability pack** | Corporate ESG / BRSR / PAT evidence |

**Export pack:** verified kWh/₹/tCO₂e, SEC by line, prescription audit trail, methodology note, BRSR/PAT adjunct CSV `[!]`.

**Out of scope:** full ESG platform, Scope 3, product carbon footprint.

---

## Sustainability principle (one ledger, two audiences)

```
Prescription executed
    → M&V verifies kWh ↓ on meter + bill
        → Ledger: realised ₹ + realised kWh + tCO₂e
            → CFO: cost savings
            → Sustainability: Scope 2 + SEC trend for PAT/BRSR/OEM
```

Grid electricity you no longer draw **is** operational Scope 2 reduction — measured, not modelled.

---

## Build phases → outcomes

| Phase | What ships | Savings `[~]` | Sustainability |
|-------|------------|---------------|----------------|
| **P0** (weeks 1–8) | Incomer+bill, MD/tariff/rules, Rx agent, WhatsApp, M&V | 5–10% | Basic kWh + tCO₂e ledger |
| **P1** (months 3–6) | Full graph, SCADA/PLC, SEC, 6 waste categories | +5–8% | SEC trends, intensity export |
| **P2** (months 6–12) | Source dispatch, fleet benchmark, sustainability pack | +2–5% | Multi-plant, PAT/BRSR adjunct |
| **P3** | Conversational analyst, PdM fusion | Marginal | Broader coverage |
