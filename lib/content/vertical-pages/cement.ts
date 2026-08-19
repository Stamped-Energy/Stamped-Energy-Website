import type { CtaLink, StatItem, VerticalPageContent } from "../types";

const CTA = { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink;
const HOW = { label: "Platform", href: "/platform" } satisfies CtaLink;

export const cementPage: VerticalPageContent = {
  slug: "cement",
  hero: {
    eyebrow: "Cement",
    title: "Rupee-scored prescriptions for cement plants",
    description:
      "Mills, kiln auxiliaries, crushers, and WHR already have meters and EMS. Stamped is the intelligence layer on that stack: live data, assigned next actions, evidence on the bill. Read-only. No hardware retrofit.",
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
  plantBand: {
    eyebrow: "In this plant",
    title: "Where the cement bill actually moves",
    description:
      "Raw and finish mills, kiln auxiliaries, crushers, and WHR. Same processes you run.",
    items: [
      {
        id: "mills",
        title: "Raw and finish mills",
        description:
          "kWh per ton drifts when separators and bearings degrade. Stamped ranks mill SEC against throughput, then assigns the inspection before the month is lost to a silent creep.",
        imageSrc: "/industries/plant/cement/batch-plant.jpg",
        imageAlt: "Cement mill silos and conveyor towers on a plant site",
      },
      {
        id: "kiln-aux",
        title: "Kiln auxiliaries",
        description:
          "Fans, coolers, and idle kiln-side loads sit on the incomer whether clinker is moving or not. Idle cuts are ranked against line rate, not a flat kW alarm.",
        imageSrc: "/industries/plant/cement/plant-exterior.jpg",
        imageAlt: "Cement kiln-side towers, silos, and process auxiliaries",
      },
      {
        id: "crushers-md",
        title: "Crushers and mill startups",
        description:
          "Simultaneous restart after an outage is how contracted MD gets breached. Sequencing is assigned before the billing window closes.",
        imageSrc: "/industries/plant/cement/crushers.jpg",
        imageAlt: "Cement quarry and crusher plant on a hillside",
      },
      {
        id: "whr-re",
        title: "WHR and grid windows",
        description:
          "Cheap WHR or solar sitting idle in a peak grid window is a dispatch miss. Source mix is prescribed for the tariff window, not a dashboard heuristic.",
        imageSrc: "/industries/plant/cement/whr-pipes.jpg",
        imageAlt: "Cement plant silos and material-handling towers for WHR and dispatch",
      },
    ],
  },
  prescriptionExamples: {
    eyebrow: "Example prescriptions",
    title: "What supervisors receive",
    description:
      "Illustrative actions from comparable cement plants. Your pilot writes these from your meters, EMS feeds, and bill.",
    footnote:
      "Impact ranges are benchmark estimates from comparable plants, not customer guarantees. Verified figures come from your plant with evidence.",
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
    title: "The floor knows what to do. Leadership sees the evidence.",
    disclaimer: "Indicative language from comparable plants. Your pilot replaces it with plant figures.",
    items: [
      {
        id: "kwh-ton",
        title: "Assigned energy moves",
        description:
          "Ranked prescriptions on mill restart stagger, idle kiln-side fans, and WHR-vs-grid windows, without rewriting the process recipe.",
      },
      {
        id: "dispatch",
        title: "Stable SEC in the operating band",
        description:
          "kWh per ton vs this plant's line and shift baseline, not a generic dashboard threshold.",
      },
      {
        id: "md",
        title: "Earlier equipment intervention",
        description:
          "Power-draw and mill SEC drift tied to rupee and throughput risk. Not a vibration PdM claim.",
      },
    ],
  },
  faq: [
    {
      id: "kwh-ton-benchmark",
      question: "How can cement plants reduce kWh per ton?",
      answer:
        "Comparable cement plants using assigned, rupee-scored actions typically move electrical SEC by catching mill drift and restart overlap before the month closes. Published 70-80 kWh/ton bands are context, not your target. Your pilot replaces those bands with plant figures.",
    },
    {
      id: "whr-dispatch",
      question: "What is WHR and grid dispatch optimization for cement plants?",
      answer:
        "WHR and solar are cheaper in some windows than grid. Stamped ranks source-mix moves against tariff and available WHR output so dispatch is assigned, not guessed at the desk.",
    },
    {
      id: "ems-vs-stamped",
      question: "How does Stamped work with existing cement plant EMS?",
      answer:
        "EMS shows trends. Stamped is the intelligence layer on that stack: read-only feeds, rupee-scored next actions, owner, and verification on the bill. No rip-and-replace.",
    },
  ],
};
