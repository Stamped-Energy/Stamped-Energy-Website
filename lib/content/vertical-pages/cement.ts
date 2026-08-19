import type { CtaLink, StatItem, VerticalPageContent } from "../types";

const CTA = { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink;
const HOW = { label: "Platform", href: "/platform" } satisfies CtaLink;

export const cementPage: VerticalPageContent = {
  slug: "cement",
  hero: {
    eyebrow: "Cement",
    title: "AI-driven energy intelligence for cement",
    description:
      "AI enables cement plants to prescribe optimal energy actions across continuous processes and utilities in real time, directly influencing cost stability, uptime, and long-term operational competitiveness - with outcomes verified with evidence.",
    primaryCta: CTA,
    secondaryCta: HOW,
    seoHeadings: [
      "How can cement plants reduce kWh per ton?",
      "What is WHR and grid dispatch optimization for cement plants?",
      "How does Stamped work with existing cement plant EMS?",
    ],
  },
  economics: {
    eyebrow: "Energy challenges",
    title: "Energy challenges in cement manufacturing",
    description:
      "Cement plants operate continuous, energy-intensive processes with limited real-time coordination across stages and utilities, leading to cost leakage, SEC variability, and inconsistent plant performance.",
    stats: [
      {
        id: "cost-share",
        value: "40-50%",
        label: "Total manufacturing cost linked to energy and utilities",
        detail: "Structural margin driver for cement",
      },
      {
        id: "sec",
        value: "50-60%",
        label: "Electrical energy consumed by core process equipment",
        detail: "Mills, kiln auxiliaries, and process fans",
      },
      {
        id: "tariff",
        value: "85%",
        label: "Thermal energy share complicates energy control",
        detail: "Multi-source dispatch requires governed decisions",
      },
    ] satisfies StatItem[],
  },
  wasteTable: {
    eyebrow: "Actionable energy intelligence",
    title: "Where energy value sits across processes and utilities",
    description:
      "The platform identifies and prescribes actions on where energy value typically sits across processes and utilities. Reference ranges from industry benchmarks - your pilot replaces them with verified numbers.",
    areas: [
      {
        id: "mills",
        step: "01",
        title: "Raw & finish mills",
        description:
          "SEC drift 5-12% when bearings or separators degrade. Anomaly triggers a maintenance work order and schedule adjustment.",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹2-6L",
      },
      {
        id: "kiln-aux",
        step: "02",
        title: "Kiln auxiliaries",
        description: "Idling fans, cooler inefficiency - idle load plus kWh/clinker SEC tracked per line.",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹1.5-4L",
      },
      {
        id: "crushers-md",
        step: "03",
        title: "Crushers & mill startups",
        description: "Simultaneous restart after outage → MD breach. Stagger startup prescriptions assigned to electrical.",
        potentialLabel: "Est. MD savings",
        potentialValue: "₹3-8L",
      },
      {
        id: "whr-re",
        step: "04",
        title: "WHR + grid + RE dispatch",
        description:
          "Under-use of cheap power in peak grid windows. Daily source-mix prescription - increase WHR/solar draw when grid tariff peaks.",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹4-12L",
      },
      {
        id: "compressed-air",
        step: "05",
        title: "Compressed air",
        description: "Instrument and plant air leaks - recurring Category 1 waste across cement utilities.",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹1-2.5L",
      },
      {
        id: "dispatch",
        step: "06",
        title: "Dispatch heuristics",
        description:
          '"Safe" thermal when RE is available - governed dispatch habits replace operator guesswork.',
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹5-15L",
      },
    ],
  },
  prescriptionExamples: {
    eyebrow: "Example prescriptions",
    title: "Governed dispatch decisions your team executes this week",
    description:
      "Illustrative actions from cement plant benchmarks. Your pilot generates prescriptions from your meters, EMS feeds, and bill.",
    footnote:
      "Impact ranges are benchmark estimates, not customer guarantees. Published enterprise cement dispatch cases cite large annual potential; Stamped targets mid-market plants with plant-specific verification.",
    attribution: {
      text: "Enterprise cement plants have reported large annual potential through dispatch governance. Stamped brings governed decisions to mid-market scale.",
      source: "Published industry case literature",
    },
    items: [
      {
        id: "peak-whr",
        title: "Increase WHR and solar draw 18:00-22:00 peak grid window",
        description:
          "Grid tariff peaks while WHR output available. Shift load to cheaper sources before MD window closes.",
        impactRange: "₹4-12L/month",
        assignee: "Plant electrical / dispatch coordinator",
      },
      {
        id: "mill-restart",
        title: "Stagger finish mill restart after power outage",
        description:
          "Three mills restarted simultaneously - incomer breached contracted MD by 180 kVA. Sequence restart over 20 minutes.",
        impactRange: "₹3-8L/month",
        assignee: "Head electrical",
      },
      {
        id: "sec-drift",
        title: "Finish mill SEC drift vs baseline - maintenance trigger",
        description:
          "kWh/ton up 8% over 14 days with stable output. Separator and bearing inspection before SEC degrades further.",
        impactRange: "₹2-5L/month",
        assignee: "Maintenance planner",
      },
    ],
  },
  integration: {
    eyebrow: "Integration",
    title: "Works with your existing EMS - no rip-and-replace",
    items: [
      {
        id: "path-a",
        title: "Path A: Bill + HT metering first",
        description:
          "Last three DISCOM bills and incomer MD data - prescriptions on demand windows and source mix within two weeks.",
      },
      {
        id: "path-b",
        title: "Path B: EMS / PMS / SCADA feeds",
        description:
          "Unify mill SEC, WHR output, and grid draw into one time-aligned graph - prescriptions on kWh/ton and dispatch.",
      },
      {
        id: "coexist",
        title: "Coexists with OEM EMS",
        description:
          "Stamped is the decision layer on top of trends your EMS already shows - assigned actions with ₹ impact and M&V.",
      },
      {
        id: "pat",
        title: "PAT evidence support",
        description:
          "SEC improvement ledger for management reviews and PAT discipline - verified on monthly bills.",
      },
    ],
  },
  outcomes: {
    eyebrow: "What you gain",
    title: "Prescriptive cost optimization and sustained efficiency outcomes",
    disclaimer: "Indicative benchmark band. Your pilot replaces these with evidence-verified figures.",
    items: [
      {
        id: "kwh-ton",
        title: "Prescriptive energy cost optimization",
        description:
          "Prescriptive AI optimizes the mix of captive power, WHRS, renewables, and grid in real time, locking in 5-10% energy cost reduction without operational disruption.",
      },
      {
        id: "dispatch",
        title: "Stage-wise SEC control",
        description:
          "AI monitors SEC at each manufacturing stage and prescribes corrective actions across raw grinding, kiln, and cement grinding, reducing stage-wise SEC by 8-12%.",
      },
      {
        id: "md",
        title: "Utility-level efficiency and reliability",
        description:
          "AI tracks large utilities like fans, blowers, and mills, prescribing early interventions to prevent degradation and cut unplanned downtime by 15-20%.",
      },
      {
        id: "ledger",
        title: "Sustained efficiency outcomes",
        description:
          "Prescriptive feedback loops continuously enforce efficiency gains, reducing dependence on manual supervision and preventing regression after one-time improvements.",
      },
    ],
  },
  faq: [
    {
      id: "kwh-ton-benchmark",
      question: "What is a good kWh/ton benchmark for cement plants?",
      answer:
        "Electrical SEC for cement typically runs 70-80 kWh/ton, with best-performing plants under 67 kWh/ton. Stamped tracks your plant's baseline by line and shift. Benchmarks are starting points, not targets.",
    },
    {
      id: "ems-vs-stamped",
      question: "We already have an EMS. Why Stamped?",
      answer:
        "EMS shows trends; Stamped assigns governed actions with rupee impact, owner, and verification on the next bill. No rip-and-replace - Stamped is the decision layer your EMS lacks.",
    },
    {
      id: "whr-dispatch",
      question: "Can Stamped optimize WHR and grid dispatch?",
      answer:
        "Yes - daily source-mix prescriptions based on tariff windows, WHR output, and solar availability. Mid-market plants get shift-level governance, not 15-minute enterprise agent stacks on day one.",
    },
  ],
};
