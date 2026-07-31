import type { CtaLink, StatItem, VerticalPageContent } from "../types";

const CTA = { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink;
const HOW = { label: "Platform", href: "/platform" } satisfies CtaLink;

export const chemicalPage: VerticalPageContent = {
  slug: "chemical",
  hero: {
    eyebrow: "Chemical & paint",
    title: "AI-powered energy intelligence for chemical and paint manufacturing",
    description:
      "AI brings continuous energy discipline to chemical and paint manufacturing, improving cost control, operational predictability, and long-term competitiveness - with prescriptions assigned to your batch team and savings verified on your DISCOM bill.",
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
        description: "Cure cycle alignment - avoid partial oven heat between short batch gaps.",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹1.2-3L",
      },
    ],
  },
  prescriptionExamples: {
    eyebrow: "Example prescriptions",
    title: "What to change before month-end - assigned to your batch team",
    description:
      "Illustrative actions from batch chemical benchmark Path A: batch log CSV + bill. Path B: DCS integration.",
    footnote:
      "Impact ranges are benchmark estimates - not customer guarantees. Verified figures come from your pilot M&V.",
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
    title: "Controlled energy intensity and predictable operations",
    disclaimer: "Benchmark band Your pilot replaces these with bill-verified figures.",
    items: [
      {
        id: "batch-sec",
        title: "Controlled energy intensity",
        description:
          "Energy stays within defined operating bands across batch and continuous operations, with AI prescribing adjustments to prevent drift, reducing SEC by 8-12",
      },
      {
        id: "idle-hold",
        title: "Reduced over-design margins",
        description:
          "AI identifies energy inefficiencies caused by conservative process over-design in heating, cooling, and purging, locking in 5-10% energy savings without impacting safety or throughput.",
      },
      {
        id: "md-stagger",
        title: "Early loss visibility",
        description:
          "Small deviations are surfaced early, with AI recommending corrective actions before they compound into sustained losses.",
      },
      {
        id: "ledger",
        title: "Predictable operations",
        description:
          "Stable energy behavior improves run consistency and planning confidence, enabling 10-15% more predictable energy costs across shifts and units.",
      },
    ],
  },
  faq: [
    {
      id: "batch-sec",
      question: "How does Stamped measure energy per batch?",
      answer:
        "Stamped aligns incomer and sub-meter kWh with batch windows from logs or DCS - kWh/batch baselines by reactor line and product. Drift triggers prescriptions with rupee impact.",
    },
    {
      id: "path-a-batch",
      question: "Can we start without DCS integration?",
      answer:
        "Yes - Path A uses batch log CSV (start/end times, reactor ID) plus DISCOM bills. First prescriptions on idle hold and MD stagger typically within two weeks.",
    },
    {
      id: "chlor-alkali",
      question: "Is Stamped for large chlor-alkali plants?",
      answer:
        "Phase 1-2 focus is specialty chemicals, resins, agrochemical formulation, and paint - ₹8L-₹80L+/month electricit Mega chlor-alkali DCs require enterprise motion - we qualify on discovery calls.",
    },
  ],
  finalCta: {
    eyebrow: "Next step",
    title: "Connect your batch calendar to your bill",
    description:
      "Discovery call: batch logs, main loads, tariff windows - outline a pilot if batch SEC waste justifies it.",
    primaryCta: CTA,
  },
};
