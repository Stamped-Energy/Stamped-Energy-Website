import type { CtaLink, StatItem, VerticalPageContent } from "../types";

const CTA = { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink;
const HOW = { label: "Platform", href: "/platform" } satisfies CtaLink;

export const steelPage: VerticalPageContent = {
  slug: "steel",
  hero: {
    eyebrow: "Steel & metals",
    title: "Rupee-scored prescriptions for steel and metals plants",
    description:
      "EAF and induction, rolling, and foundry already have meters and SCADA. Stamped is the intelligence layer on that stack: live data, assigned next actions, evidence on the bill. Read-only. No hardware retrofit.",
    primaryCta: CTA,
    secondaryCta: HOW,
    seoHeadings: [
      "How can steel plants reduce induction furnace electricity consumption?",
      "What is PAT scheme SEC for steel plants?",
      "How does Stamped help rolling mills with maximum demand?",
    ],
  },
  economics: {
    eyebrow: "Energy challenges",
    title: "Energy challenges in steel manufacturing",
    description:
      "Steel production is inherently energy-intensive, with energy cost tightly coupled to profits. Even small deviations during operation quickly translate into higher energy losses and margin pressure.",
    stats: [
      {
        id: "cost-share",
        value: "30-40%",
        label: "Share of energy in manufacturing cost",
        detail: "TERI steel sector review",
      },
      {
        id: "sec-win",
        value: "3-5%",
        label: "Minor instability causes measurable energy loss",
        detail: "Small deviations compound into sustained losses",
      },
      {
        id: "pat",
        value: "60-70%",
        label: "Captive power energy drives production margins",
        detail: "Fuel-power balance determines competitiveness",
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
        id: "eaf-induction",
        step: "01",
        title: "EAF / induction furnace",
        description:
          "Holding power between heats and power factor penalties - schedule and PF sequencing prescriptions.",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹3-8L",
      },
      {
        id: "reheating",
        step: "02",
        title: "Reheating furnace",
        description:
          "Weekend hold and idle soak - same playbook as heat treatment in auto-adjacent forging plants.",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹2-6L",
      },
      {
        id: "rolling-md",
        step: "03",
        title: "Rolling mill startup",
        description: "Simultaneous stand startup → MD spike. Stagger prescriptions assigned to electrical.",
        potentialLabel: "Est. MD savings",
        potentialValue: "₹4-10L",
      },
      {
        id: "pumps-vfd",
        step: "04",
        title: "Cooling water & fume extraction",
        description: "Constant-speed pumps running at full flow - VFD opportunity ranked by ROI.",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹1.5-4L",
      },
      {
        id: "compressed-air",
        step: "05",
        title: "Compressed air",
        description: "Leak and overpressure - Category 1 waste across steel utilities.",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹1-3L",
      },
      {
        id: "gas-electric",
        step: "06",
        title: "Gas-electric mix",
        description:
          "Suboptimal scheduling when grid time-of-day is high - shift production to tariff windows [Path B].",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹2-5L",
      },
    ],
  },
  plantBand: {
    eyebrow: "In this plant",
    title: "Where the steel bill actually moves",
    description:
      "EAF and induction, rolling, forging-foundry, and cooling auxiliaries. Same processes you run.",
    items: [
      {
        id: "eaf-induction",
        title: "EAF and induction",
        description:
          "Holding between heats is a power bill with no pour. Setback and power-factor sequencing are assigned before the next heat, not after the MD window closes.",
        imageSrc: "/industries/plant/steel/melt.jpg",
        imageAlt: "Molten metal and furnace stations in a steel plant",
      },
      {
        id: "rolling",
        title: "Rolling",
        description:
          "Stand startups stacked after a break set MD. Sequencing is ranked against mill output, not a flat kW alarm.",
        imageSrc: "/industries/steel.png",
        imageAlt: "Hot steel billets on a rolling mill line",
      },
      {
        id: "forging-foundry",
        title: "Forging and foundry",
        description:
          "Hammer, press, and melt peaks overlap with auxiliaries. Idle-auxiliary cuts get a rupee-scored owner on the same playbook as auto-adjacent forging.",
        imageSrc: "/industries/forging.jpg",
        imageAlt: "Foundry pour and press work in a metals plant",
      },
      {
        id: "cooling-water",
        title: "Cooling water and fume extraction",
        description:
          "Pumps and fans that sit at full flow when rolling output is down. Duty-cycle cuts are ranked against mill rate, not a flat kW alarm.",
        imageSrc: "/industries/plant/steel/cooling.jpg",
        imageAlt: "Steel mill cooling tower and outdoor process auxiliaries",
      },
    ],
  },
  prescriptionExamples: {
    eyebrow: "Example prescriptions",
    title: "What supervisors receive",
    description:
      "Illustrative actions from comparable secondary steel and rolling plants. Your pilot writes these from your meters and bill.",
    footnote:
      "Impact ranges are benchmark estimates from comparable plants, not customer guarantees. Verified figures come from your plant with evidence.",
    items: [
      {
        id: "induction-hold",
        title: "Reduce induction furnace holding power between heats",
        description:
          "Furnace held at full power 45 minutes between heats with no pour scheduled. Setback schedule aligned to production calendar.",
        impactRange: "₹3-8L/month",
        assignee: "Furnace operator / electrical",
      },
      {
        id: "rolling-startup",
        title: "Sequence rolling mill stand startup after morning break",
        description:
          "Four stands restarted simultaneously at 06:30 - incomer MD breached by 220 kVA. Stagger over 15 minutes.",
        impactRange: "₹4-10L/month",
        assignee: "Rolling mill supervisor",
      },
      {
        id: "pump-vfd",
        title: "Duty-cycle cooling water pumps during low-production window",
        description:
          "CW pumps at 100% flow with 40% rolling output. VFD setpoint adjustment - capital action ranked by payback.",
        impactRange: "₹1.5-4L/month",
        assignee: "Utilities / maintenance",
      },
    ],
  },
  integration: {
    eyebrow: "Integration",
    title: "Path A bill-first, Path B when SCADA exists",
    items: [
      {
        id: "path-a",
        title: "Path A: Incomer meter + DISCOM bills",
        description:
          "MD windows and furnace holding patterns from bill data alone - first prescriptions within two weeks.",
      },
      {
        id: "path-b",
        title: "Path B: Furnace SCADA and production data",
        description:
          "Heat schedules, rolling output, and kWh aligned - SEC baselines per route with PAT evidence support.",
      },
      {
        id: "forging-overlap",
        title: "Forging & foundry overlap",
        description:
          "Same playbook as automotive heat treatment and forging - one platform for multi-process metal plants.",
      },
      {
        id: "pat-ccts",
        title: "PAT / CCTS alignment",
        description:
          "SEC improvement tracked and verified - informational support for PAT discipline, not compliance consulting.",
      },
    ],
  },
  outcomes: {
    eyebrow: "What you gain",
    title: "The floor knows what to do. Leadership sees the evidence.",
    disclaimer: "Indicative language from comparable plants. Your pilot replaces it with plant figures.",
    items: [
      {
        id: "furnace-md",
        title: "Assigned energy moves",
        description:
          "Ranked prescriptions on furnace holding, rolling-stand stagger, and idle auxiliaries, without changing the heat recipe.",
      },
      {
        id: "rolling-sec",
        title: "Stable SEC in the operating band",
        description:
          "kWh per heat or per ton vs this plant's route and shift baseline, not a generic dashboard threshold.",
      },
      {
        id: "pat-sec",
        title: "Earlier equipment intervention",
        description:
          "Power-draw and duty-cycle drift tied to rupee and throughput risk. Not a vibration PdM claim.",
      },
    ],
  },
  segments: {
    eyebrow: "Process routes",
    title: "EAF, rolling, forging - where the bill hurts most",
    description:
      "Secondary steel, rolling mills, and forging-adjacent plants - expand each route for typical leaks and prescriptions.",
  },
  faq: [
    {
      id: "induction-consumption",
      question: "How can steel plants reduce induction furnace electricity consumption?",
      answer:
        "Holding between heats is power with no pour. Comparable plants using assigned setback and sequencing typically recover a large share of furnace electricity on that idle window. Your pilot replaces indicative bands with plant figures.",
    },
    {
      id: "pat-sec",
      question: "What is PAT scheme SEC for steel plants?",
      answer:
        "PAT tracks specific energy consumption against a notified baseline. Stamped keeps a rupee-scored SEC ledger from meters and the bill. That is evidence support, not PAT consulting or an audit.",
    },
    {
      id: "integrated-steel",
      question: "How does Stamped help rolling mills with maximum demand?",
      answer:
        "Stacked stand startups after a break are a common MD spike. Stamped assigns stagger before the billing window closes and ties the rupee impact to the mill supervisor.",
    },
  ],
};
