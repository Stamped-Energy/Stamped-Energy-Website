import type { CtaLink, StatItem, VerticalPageContent } from "../types";

const CTA = { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink;
const HOW = { label: "Platform", href: "/platform" } satisfies CtaLink;

export const steelPage: VerticalPageContent = {
  slug: "steel",
  hero: {
    eyebrow: "Steel & metals",
    title: "AI-driven energy management for steel",
    description:
      "AI enables steel manufacturers to manage fuel- and power-intensive operations at scale, where energy balance and operating discipline directly determine cost competitiveness, throughput stability, and operational consistency - with evidence-verified savings.",
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
  prescriptionExamples: {
    eyebrow: "Example prescriptions",
    title: "Furnace and MD actions assigned this week",
    description:
      "Illustrative actions from secondary steel and rolling benchmarks. Your pilot generates prescriptions from your meters and bill.",
    footnote:
      "Impact ranges are benchmark estimates, not customer guarantees. Enterprise-scale integrated plant cases are cited only as context. Stamped targets mid-market induction and rolling plants with plant-specific verification.",
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
    title: "Tighter process efficiency and per-unit cost stability",
    disclaimer: "Indicative benchmark band. External SEC references are cited for context only.",
    items: [
      {
        id: "furnace-md",
        title: "Tighter process efficiency",
        description:
          "Prescriptive AI keeps furnaces and rolling processes within efficient operating windows, reducing avoidable energy loss during real production by 5-10%.",
      },
      {
        id: "rolling-sec",
        title: "Per-unit energy cost stability",
        description:
          "AI detects captive power generation inefficiencies early and prescribes corrections before small deviations escalate into sustained cost losses, reducing per-unit energy cost by almost 5%.",
      },
      {
        id: "pat-sec",
        title: "Operator-ready guidance",
        description:
          "Actionable insights guide operators on what to adjust and when, reducing reliance on manual judgment and delayed interventions.",
      },
      {
        id: "ledger",
        title: "Utility efficiency discipline",
        description:
          "Continuous monitoring keeps SEC of large utilities such as pumps, compressors, and cooling systems within efficient limits, cutting unplanned utility downtime by 10-15%.",
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
      question: "How much does induction furnace holding power cost?",
      answer:
        "Holding power between heats can run 30-50% of furnace electricity with no production output. Stamped quantifies this per furnace and assigns setback schedules with monthly rupee impact.",
    },
    {
      id: "pat-sec",
      question: "How does Stamped support PAT SEC targets?",
      answer:
        "Stamped tracks SEC improvement with evidence-verified M&V - a ledger for management and PAT evidence. Stamped is prescriptive intelligence, not PAT consulting or audit services.",
    },
    {
      id: "integrated-steel",
      question: "Is Stamped suitable for integrated BF-BOF plants?",
      answer:
        "Phase 1-2 focus is secondary steel, rolling, and forging (₹10L-₹1Cr+/mo electricity ). Integrated BF route plants with enterprise-scale bills require a different sales motion - we qualify honestly on discovery calls.",
    },
  ],
};
