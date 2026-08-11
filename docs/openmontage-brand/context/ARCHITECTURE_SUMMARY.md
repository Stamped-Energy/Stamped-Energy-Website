# Architecture summary (video-safe)

Condensed from `sources/Stamped_Tech_Archi_Core.md`. Full engineering SSOT is **outside** this pack (`Research+DOcs` technical architecture v1 / platform `STAMPED_ARCHITECTURE.md`). Do not invent layers beyond this.

---

## Thesis

**15–20% class savings `[~]`** come from **Σ (closed prescriptions) × closure rate** across **six waste categories**, not from one ML model.  
**Sustainability / intensity evidence** comes from the **same verified ledger** (grid kWh ↓ → Scope 2 ↓; production-tagged SEC).

---

## Layers (read-only plant → decisions)

| Layer | Role |
|-------|------|
| **L0 Plant systems** | Incomer/feeder meters, DISCOM bill, SCADA/historian, PLC/CNC, ERP/MES (SEC), solar/WHR/DG, EMS export |
| **L1 Connect & normalise** | Adapters, schema normaliser, tag mapper, bill ingest, quality flags, event bus |
| **L2 Universal repository** | Time-series, energy graph, commercial context, feature store, baselines, M&V/intensity ledger |
| **L3 Intelligence** | Engines → structured findings (JSON), never prose-only |
| **L4 Knowledge & reasoning** | Context for prescriptions / agent skills |
| **L5 Experience** | Operator UI, WhatsApp/assignment, audit trail |
| **L6 Closure & verification** | Done ≠ Saved; ledger updates; Improve from decisions |

---

## Six waste categories (visual taxonomy)

MD / demand · Furnaces / process heat · Idle / auxiliary · Compressed air · HVAC / chillers · Source mix / VFD  

Cumulative class `[~]`: Path A ~12–20%; Path B (leaner data) ~8–12%. Always label indicative.

---

## Visual metaphors that fit Stamped (not competitor clones)

- Energy graph: plant → system → equipment → meter  
- Prescription card: what / who / ₹ / evidence  
- Ledger tick: verified outcome append  
- Loop: Connect → … → Improve  

Avoid: MES plant-OS screens, control-write animations, fake multi-plant fleet dashboards as “already live proof.”

---

## Status flags

Edge gateway and some P1 engines are `[!]`. Prefer “connects to what you already have” over detailing unshipped edge SKUs in launch videos unless the brief asks.
