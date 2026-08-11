# OpenMontage brand pack — Stamped Energy

Portable pack for [OpenMontage](https://github.com/calesthio/OpenMontage) (and any agent producing Stamped video / motion). **Self-contained:** product canon, claims firewall, video DESIGN, C-Vector motion inspiration, playbook, prompts.

Website UI tokens stay in repo-root `DESIGN.md` / `styles/theme.css`. This pack does not replace them.

---

## Agent read-order (mandatory)

1. [`context/STAMPED_CONTEXT.md`](context/STAMPED_CONTEXT.md)  
2. [`context/VOICE_AND_CLAIMS.md`](context/VOICE_AND_CLAIMS.md)  
3. [`DESIGN_VIDEO.md`](DESIGN_VIDEO.md) + [`MOTION_LANGUAGE.md`](MOTION_LANGUAGE.md)  
4. [`playbooks/stamped-industrial.yaml`](playbooks/stamped-industrial.yaml) or [`visual-styles/stamped-industrial.md`](visual-styles/stamped-industrial.md)  
5. Relevant file under [`prompts/`](prompts/)  
6. [`context/sources/`](context/sources/) only when you need depth  

Also skim [`BRAND_BRIDGE.md`](BRAND_BRIDGE.md) and [`references/cvector-audit.md`](references/cvector-audit.md).

---

## Install into OpenMontage

1. Copy this entire folder into your OpenMontage checkout, e.g. `OpenMontage/brand/stamped/` or keep path `docs/openmontage-brand/`.  
2. Copy playbook into styles:

```text
playbooks/stamped-industrial.yaml  →  styles/stamped-industrial.yaml
```

3. Add `stamped-industrial` to the pipeline manifest `compatible_playbooks` (explainer / animation / cinematic as needed).  
4. Prompt example:

```text
Read brand/stamped (or docs/openmontage-brand) using README read-order.
Use playbook stamped-industrial.
Make a 60-second ₹-scored prescriptions explainer for a North India auto-component plant (Band A ICP).
```

---

## Sync note

| Artifact | Upstream | Version pin |
|----------|----------|-------------|
| Master doc | `Research+DOcs/core-product/Stamped_Energy_Master_Document_v1.6.md` | v1.6 Aug 2026 |
| ICP | `Research+DOcs/customer-profile/ICP-North-India-Large-Manufacturer-v3.md` | v3 |
| Website PRODUCT / DESIGN | Main_Website root | live |

Refresh `context/sources/` when Master or ICP major-bumps. Distillations may need a short edit pass after.

---

## Folder map

```text
context/           Stamped product + claims + sources
references/        CVector audit (inspiration only)
DESIGN_VIDEO.md    Impeccable brand-register video DESIGN
MOTION_LANGUAGE.md Motion physics + signature patterns
BRAND_BRIDGE.md    Website ↔ video token map
playbooks/         OpenMontage YAML playbook
visual-styles/     visual-style.md + style_prompt_full
prompts/           Production starters
```
