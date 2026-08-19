import type { CtaLink, StatItem, VerticalPageContent } from "../types";

const CTA = { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink;
const HOW = { label: "Platform", href: "/platform" } satisfies CtaLink;

export const chemicalPage: VerticalPageContent = {
  slug: "chemical",
  hero: {
    eyebrow: "Chemical & paint",
    title: "Rupee-scored prescriptions for chemical and paint plants",
    description:
      "Batch reactors, steam, and plant air already have meters and logs. Stamped is the intelligence layer on that stack: live data, assigned next actions, evidence on the bill. Read-only. No hardware retrofit.",
    primaryCta: CTA,
    secondaryCta: HOW,
    seoHeadings: [
      "How can chemical plants reduce batch process energy consumption?",
      "What causes maximum demand spikes in batch chemical plants?",
      "Does Stamped work without DCS integration?",
    ],
  },
  economics: {
    eyebrow: "Energy challenges",
    title: "Energy challenges in chemical and paint manufacturing",
    description:
      "Chemical and paint plants operate energy-critical batch and continuous processes where heat, mixing, and separation dominate consumption, requiring tight control to avoid excess energy use while maintaining safety and product stability.",
    stats: [
      {
        id: "batch-idle",
        value: "10-20%",
        label: "Share of energy in manufacturing cost",
        detail: "Batch and continuous process mix",
      },
      {
        id: "md-overlap",
        value: "20-40%",
        label: "Plant energy consumed by utilities",
        detail: "Steam, chillers, compressed air, and ETP",
      },
      {
        id: "pat",
        value: "50-60%",
        label: "Thermal energy share complicates energy control",
        detail: "Reactors, distillation, and drying loads",
      },
    ] satisfies StatItem[],
  },
  wasteTable: {
    eyebrow: "Actionable energy intelligence",
    title: "Where energy value sits across processes and utilities",
    description:
      "The platform identifies and prescribes actions on where energy value typically sits across processes and utilities. Reference ranges - your pilot replaces them with verified numbers.",
    areas: [
      {
        id: "reactor-idle",
        step: "01",
        title: "Batch reactor idle hold",
        description:
          "Soak temperature maintained with no batch scheduled - setback schedule vs production calendar.",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹2-6L",
      },
      {
        id: "batch-md",
        step: "02",
        title: "Simultaneous batch heating",
        description: "Three reactors ramp together at shift start → MD breach. Stagger prescriptions.",
        potentialLabel: "Est. MD savings",
        potentialValue: "₹3-10L",
      },
      {
        id: "steam-thermal",
        step: "03",
        title: "Steam & thermal systems",
        description: "Trap maintenance signals from condensate temperature drift [Path B].",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹1.5-5L",
      },
      {
        id: "cooling-between",
        step: "04",
        title: "Cooling between batches",
        description: "Chiller setpoint vs next batch start - avoid full cool when short gap scheduled.",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹1-3L",
      },
      {
        id: "solvent-recovery",
        step: "05",
        title: "Solvent recovery units",
        description: "Run window vs tariff - shift recovery to off-peak when batch schedule allows.",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹1.5-4L",
      },
      {
        id: "paint-oven",
        step: "06",
        title: "Paint oven & coating lines",
        description:           "Cure cycle alignment - avoid partial oven heat between short batch gaps.",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹1.2-3L",
      },
    ],
  },
  plantBand: {
    eyebrow: "In this plant",
    title: "Where the chemical bill actually moves",
    description:
      "Batch reactors, plant utilities, compressed air, and effluent. Same processes you run.",
    items: [
      {
        id: "reactor-idle",
        title: "Batch reactors",
        description:
          "Soak held with no batch on the calendar is a holding bill. Setback is assigned against the next start, not a flat temperature alarm.",
        imageSrc: "/industries/plant/chemical/waterfront.jpg",
        imageAlt: "Chemical and petrochemical plant tanks and towers on a waterfront",
      },
      {
        id: "steam-thermal",
        title: "Steam and plant utilities",
        description:
          "Steam, chill, and ETP loads sit on the incomer between batches. Duty-cycle cuts are ranked against the production calendar.",
        imageSrc: "/industries/plant/chemical/refinery.jpg",
        imageAlt: "Chemical plant towers, piping, and steam on the incomer",
      },
      {
        id: "batch-md",
        title: "Compressed air and stagger",
        description:
          "Reactors that ramp together at shift start set MD. Sequencing and idle-air cuts get a rupee-scored owner before the billing window closes.",
        imageSrc: "/industries/plant/chemical/existing.png",
        imageAlt: "Batch chemical plant maximum demand stagger and compressed air",
      },
      {
        id: "etp",
        title: "Effluent and ETP",
        description:
          "Blowers and pumps that run between batches as if the next charge were already in. Duty-cycle cuts are assigned against the production calendar.",
        imageSrc: "/industries/plant/chemical/complex.jpg",
        imageAlt: "Process plant on the waterline with silos, conveyors, and utility loads",
      },
    ],
  },
  prescriptionExamples: {
    eyebrow: "Example prescriptions",
    title: "What supervisors receive",
    description:
      "Illustrative actions from comparable batch chemical plants. Your pilot writes these from your meters, batch log, and bill.",
    footnote:
      "Impact ranges are benchmark estimates from comparable plants, not customer guarantees. Verified figures come from your plant with evidence.",
    items: [
      {
        id: "reactor-stagger",
        title: "Stagger reactor heating start across three batch lines",
        description:
          "Reactors R1, R2, R3 heated simultaneously at 07:00 - incomer MD breached by 195 kVA. Sequence over 25 minutes.",
        impactRange: "₹3-10L/month",
        assignee: "Batch supervisor / electrical",
      },
      {
        id: "soak-setback",
        title: "Setback reactor soak during 4-hour batch gap",
        description:
          "Reactor held at 180°C with no batch until 14:00. Setback to 140°C during gap - production calendar confirmed.",
        impactRange: "₹2-6L/month",
        assignee: "Process operator",
      },
      {
        id: "off-peak-utility",
        title: "Shift solvent recovery run to off-peak tariff window",
        description:
          "Recovery unit running peak hours when batch schedule allows night-window operation.",
        impactRange: "₹1.5-4L/month",
        assignee: "Utilities / production planner",
      },
    ],
  },
  integration: {
    eyebrow: "Integration",
    title: "Batch log + bill first, DCS when available",
    items: [
      {
        id: "path-a",
        title: "Path A: Batch log CSV + DISCOM bills",
        description:
          "Batch windows and incomer MD aligned manually - first prescriptions on idle hold and stagger within two weeks.",
      },
      {
        id: "path-b",
        title: "Path B: DCS / batch MES historian",
        description:
          "Reactor states, steam flow, and production aligned - kWh/batch baselines with anomaly prescriptions.",
      },
      {
        id: "pat-sec",
        title: "PAT SEC note",
        description:
          "Gate-to-gate SEC tracking for PAT-covered chemical subsectors - verified ledger, not audit services.",
      },
      {
        id: "clusters",
        title: "Built for batch clusters",
        description:
          "Specialty chemicals, resins, agrochemical formulation, paint - Vapi, Ankleshwar, Dahej, Cuddalore, Alwar.",
      },
    ],
  },
  outcomes: {
    eyebrow: "What you gain",
    title: "The floor knows what to do. Leadership sees the evidence.",
    disclaimer: "Indicative language from comparable plants. Your pilot replaces it with plant figures.",
    items: [
      {
        id: "batch-sec",
        title: "Assigned energy moves",
        description:
          "Ranked prescriptions on reactor stagger, soak setback, and off-peak utility windows, without changing the batch recipe.",
      },
      {
        id: "idle-hold",
        title: "Stable SEC in the operating band",
        description:
          "kWh per batch vs this plant's reactor line and product baseline, not a generic dashboard threshold.",
      },
      {
        id: "md-stagger",
        title: "Earlier equipment intervention",
        description:
          "Power-draw and duty-cycle drift tied to rupee and batch risk. Not a vibration PdM claim.",
      },
    ],
  },
  faq: [
    {
      id: "batch-sec",
      question: "How can chemical plants reduce batch process energy consumption?",
      answer:
        "Idle soak and overlapping reactor ramps are the usual leaks. Comparable plants using assigned, rupee-scored actions recover those windows before month-end. Your pilot replaces indicative bands with plant figures.",
    },
    {
      id: "path-a-batch",
      question: "What causes maximum demand spikes in batch chemical plants?",
      answer:
        "Three reactors heating together at shift start is a common incomer spike. Stamped assigns stagger against the batch calendar so MD is managed before the billing window closes.",
    },
    {
      id: "chlor-alkali",
      question: "Does Stamped work without DCS integration?",
      answer:
        "Yes. Path A uses batch log start and end times plus DISCOM bills. First prescriptions on idle hold and stagger typically land within two weeks. DCS is Path B, not a gate.",
    },
  ],
};
