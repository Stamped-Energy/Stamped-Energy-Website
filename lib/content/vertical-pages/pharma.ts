import type { CtaLink, StatItem, VerticalPageContent } from "../types";

const CTA = { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink;
const HOW = { label: "Platform", href: "/platform" } satisfies CtaLink;

export const pharmaPage: VerticalPageContent = {
  slug: "pharma",
  hero: {
    eyebrow: "Pharmaceutical",
    title: "Rupee-scored prescriptions for pharmaceutical plants",
    description:
      "HVAC, chillers, and compressed air already have meters and BMS. Stamped is the intelligence layer on that stack: live data, assigned next actions, evidence on the bill. Read-only. No hardware retrofit.",
    primaryCta: CTA,
    secondaryCta: HOW,
    seoHeadings: [
      "How much electricity do pharmaceutical plants use for HVAC?",
      "How can pharma plants reduce chiller energy consumption?",
      "Is Stamped safe for GMP-regulated pharmaceutical facilities?",
    ],
  },
  economics: {
    eyebrow: "Energy challenges",
    title: "Energy challenges in pharmaceutical manufacturing",
    description:
      "Pharma facilities rely heavily on utility-driven support systems to maintain strict indoor air quality conditions, where continuous control requirements drive sustained energy consumption and operational rigidity.",
    stats: [
      {
        id: "hvac-share",
        value: "55-65%",
        label: "Plant energy consumed by utilities",
        detail: "HVAC, steam, chilled water, and CA dominate",
      },
      {
        id: "ee-potential",
        value: "40-50%",
        label: "Energy driven by HVAC and clean-room systems",
        detail: "BEE MSME pharma cluster mapping",
      },
      {
        id: "focus-loads",
        value: "20-30%",
        label: "Seasonal energy demand shifts for IAQ",
        detail: "Climate and production mix drive variability",
      },
    ] satisfies StatItem[],
  },
  wasteTable: {
    eyebrow: "Actionable energy intelligence",
    title: "Where energy value sits across processes and utilities",
    description:
      "The platform identifies and prescribes actions on where energy value typically sits across processes and utilities. Low-risk operational levers first - setpoints, schedules, stagin",
    areas: [
      {
        id: "chillers-ahu",
        step: "01",
        title: "Chillers & AHUs",
        description:
          "Over-cooling and fixed setpoints vs occupancy - schedule and setpoint band prescriptions.",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹2-8L",
      },
      {
        id: "chiller-staging",
        step: "02",
        title: "Chiller staging & MD",
        description: "All chiller units start together at shift change → MD spike. Stagger and load-balance.",
        potentialLabel: "Est. MD savings",
        potentialValue: "₹3-10L",
      },
      {
        id: "compressed-air",
        step: "03",
        title: "Compressed air",
        description: 'Overpressure for "safety margin" - pressure band and leak-tag prescriptions.',
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹1-3L",
      },
      {
        id: "pumps-cw",
        step: "04",
        title: "Pumps & chilled water loops",
        description: "Constant flow when batch load varies - duty cycle and VFD opportunities.",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹1.5-4L",
      },
      {
        id: "clean-room-idle",
        step: "05",
        title: "Clean room idle HVAC",
        description:
          "Full HVAC during non-production windows - qualified setback prescriptions with GMP documentation note.",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹2-6L",
      },
      {
        id: "captive-re",
        step: "06",
        title: "Captive RE / open access",
        description:
          "Banking leakage and peak grid draw - RE utilization prescriptions for plants with solar.",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹2-5L",
      },
    ],
  },
  plantBand: {
    eyebrow: "In this plant",
    title: "Where the pharma bill actually moves",
    description:
      "HVAC and cleanroom, plant utilities, compressed air, and chilled-water loops. Same systems you run.",
    items: [
      {
        id: "hvac-cleanroom",
        title: "HVAC and cleanroom",
        description:
          "Classified air does not pause between batches. Stamped ranks AHU run-hours against the production calendar. Schedule moves stay in the utilities layer, not room reclassification.",
        imageSrc: "/industries/plant/pharma/hvac.png",
        imageAlt: "Pharmaceutical HVAC and cleanroom utilities energy management",
      },
      {
        id: "chillers-ahu",
        title: "Chillers and plant utilities",
        description:
          "Chiller banks that start together at shift change set MD. Staging is assigned against actual cooling load, not a safety-margin habit.",
        imageSrc: "/industries/plant/pharma/chillers.jpg",
        imageAlt: "Chiller plant and cooling-tower utilities on a manufacturing site",
      },
      {
        id: "compressed-air",
        title: "Compressed air",
        description:
          "Header pressure held above process need is a quiet kWh leak. Pressure-band and leak-tag moves get a rupee-scored owner.",
        imageSrc: "/industries/plant/pharma/utilities.jpg",
        imageAlt: "Plant utilities, silos, and compressed-air side of a process site",
      },
      {
        id: "pumps-cw",
        title: "Pumps and chilled-water loops",
        description:
          "Constant flow when batch load drops is a quiet kWh leak. Duty-cycle and VFD moves get a rupee-scored owner on the utilities layer.",
        imageSrc: "/industries/plant/pharma/qc.jpg",
        imageAlt: "Quality-lab sampling as the evidence trail for utility changes",
      },
    ],
  },
  prescriptionExamples: {
    eyebrow: "Example prescriptions",
    title: "What supervisors receive",
    description:
      "Illustrative actions from comparable formulation plants. Change-control-friendly utility tweaks first. Your pilot writes these from your meters and bill.",
    footnote:
      "Impact ranges are benchmark estimates from comparable plants, not customer guarantees. Verified figures come from your plant with evidence. Quality validates schedule changes before execution.",
    attribution: {
      text: "Large pharma renewable-energy governance cases report significant annual leakage prevented at enterprise scale. Stamped targets MSME and mid-market formulation plants.",
      source: "Published industry case literature",
    },
    items: [
      {
        id: "chiller-staging",
        title: "Stagger chiller bank startup at morning production ramp",
        description:
          "Three chillers started simultaneously at 06:00 - incomer MD hit 980 kVA with only 60% AHU load required.",
        impactRange: "₹3-10L/month",
        assignee: "Utilities / engineering head",
      },
      {
        id: "ahu-schedule",
        title: "Align AHU run-hours with batch production calendar",
        description:
          "AHUs at full flow 4 hours before first batch start. Schedule adjustment - no setpoint change in classified zones.",
        impactRange: "₹2-6L/month",
        assignee: "Production planner / utilities",
      },
      {
        id: "ca-pressure",
        title: "Reduce compressed air header pressure band",
        description:
          "Header at 8.2 bar for a 7.5 bar process requirement. About 9% energy reduction on the compressed-air system.",
        impactRange: "₹1-3L/month",
        assignee: "Maintenance / utilities",
      },
    ],
  },
  integration: {
    eyebrow: "Integration",
    title: "Utilities layer - no GMP system replacement",
    items: [
      {
        id: "path-a",
        title: "Path A: Bill + sub-metering on utilities",
        description:
          "Chiller, AHU, and CA kWh from existing meters - MD and schedule prescriptions within two weeks.",
      },
      {
        id: "path-b",
        title: "Path B: BMS / SCADA historian",
        description:
          "Chiller run-hours, AHU states, and production batch logs aligned - staging prescriptions with context.",
      },
      {
        id: "gmp-safe",
        title: "GMP-safe operational framing",
        description:
          "Prescriptions target utility schedules and staging - not clean room reclassification. Quality team validates before execution.",
      },
      {
        id: "re-solar",
        title: "Solar and open-access plants",
        description:
          "RE banking and peak grid draw prescriptions for plants with captive solar or open access.",
      },
    ],
  },
  outcomes: {
    eyebrow: "What you gain",
    title: "The floor knows what to do. Leadership sees the evidence.",
    disclaimer: "Indicative language from comparable plants. Your pilot replaces it with plant figures.",
    items: [
      {
        id: "hvac-rupees",
        title: "Assigned energy moves",
        description:
          "Ranked prescriptions on chiller staging, AHU run-hours, and CA pressure bands, without touching classified setpoints.",
      },
      {
        id: "md-chiller",
        title: "Stable SEC in the operating band",
        description:
          "Utility kWh vs this plant's batch calendar and shift baseline, not a generic dashboard threshold.",
      },
      {
        id: "schedule",
        title: "Earlier equipment intervention",
        description:
          "Chiller and AHU power-draw drift tied to rupee and uptime risk. Not a vibration PdM claim.",
      },
    ],
  },
  faq: [
    {
      id: "hvac-share",
      question: "How much electricity do pharmaceutical plants use for HVAC?",
      answer:
        "In formulation plants, HVAC and related utilities typically dominate the electrical bill because classified air runs continuously. BEE cluster studies are context. Your pilot replaces indicative shares with plant figures.",
    },
    {
      id: "gmp-safe",
      question: "How can pharma plants reduce chiller energy consumption?",
      answer:
        "Staging at production ramp and matching capacity to actual cooling load are the usual rupee-scored moves. Stamped assigns those on the utilities layer. Quality validates any schedule change before execution.",
    },
    {
      id: "api-vs-formulation",
      question: "Is Stamped safe for GMP-regulated pharmaceutical facilities?",
      answer:
        "Stamped is read-only on meters and BMS. Prescriptions target chiller staging, AHU schedules, and compressed-air bands, not cleanroom reclassification. Your quality team remains the gate.",
    },
  ],
};
