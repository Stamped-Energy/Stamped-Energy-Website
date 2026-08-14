# Brand bridge: website ↔ video

Maps root marketing design to this OpenMontage pack so agents do not fork two brands.

---

## Sources of truth

| Concern | Authority |
|---------|-----------|
| Website colors / CSS | `styles/theme.css` + root `DESIGN.md` |
| Video / OpenMontage look | `DESIGN_VIDEO.md` + `playbooks/stamped-industrial.yaml` |
| Product claims | `context/STAMPED_CONTEXT.md` + `context/VOICE_AND_CLAIMS.md` |
| Motion grammar inspiration | `references/cvector-audit.md` (borrow only) |
| Homepage MotionSlots still to build | `references/homepage-animation-backlog.md` (A01–A10) |

---

## Token map

| Website | Video pack |
|---------|------------|
| Forge Coral `#F75440` | Primary accent / CTA / ₹ |
| Obsidian Green `#000a07` | Problem / title dark bands |
| Surface `#f7faf5` | Default scene bg |
| Space Grotesk | Display / titles |
| Inter | Body / lower-thirds |
| IBM Plex Mono | Labels only |
| SectionBadge ticks | Chapter labels in video |
| HIW Data→…→Decisions | Stage-swap pattern |
| MotionSlot | Site motion inventory: `references/homepage-animation-backlog.md`; brief via `prompts/website-motion-brief.md` |

---

## Font continuity override

Impeccable brand.md lists Space Grotesk, Inter, and IBM Plex Mono on a **greenfield** reflex-reject list. Stamped has **already committed** these fonts on stamped.work (legal free stack; Monument Grotesk not licensed).

**Rule:** Video and OpenMontage **inherit** the website type stack. Do not invent a new display family for “freshness.” Variants may adjust weight/size only.

---

## CVector vs Stamped (boundary)

| Allowed | Forbidden |
|---------|-----------|
| Scroll stage storytelling | Their logo, name, metrics |
| Prescription UI as hero | Dollar-scored as default (use ₹) |
| Bold color bands as chapters | Shipping Claret/Mindaro as brand primaries |
| Rive-like UI motion quality | Frame-cloning their canvases |
| Structure inspiration (ADR-016) | Claiming their customers/security |

Website `DESIGN.md` still rejects cloning CVector **site UI**. This pack allows **motion inspiration** for video and future MotionSlots, always under Stamped tokens.

---

## Impact lime (optional)

CVector uses Mindaro `#eef981` for impact. Stamped video may use `#e8f07a` / on-text `#2f3218` as an **optional scene mode**. Do not add impact lime to website theme.css unless a separate site ADR approves it.

---

## OpenMontage install hint

This pack is installed at `brand/stamped/`. Playbook lives at `styles/stamped-industrial.yaml`.  
`config.yaml` sets `brand.active: stamped` and `brand.default_playbook: stamped-industrial`.  
Pipelines list `stamped-industrial` first under `compatible_playbooks.recommended`.  
See repo-root `AGENT_GUIDE.md` → **Active Brand**.