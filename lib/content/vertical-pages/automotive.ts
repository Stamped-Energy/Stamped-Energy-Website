import type { CtaLink, StatItem, VerticalPageContent } from "../types";
import { resourcesContent } from "../resources";

const CTA = { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink;
const HOW = { label: "Platform", href: "/platform" } satisfies CtaLink;

export const automotivePage: VerticalPageContent = {
  slug: "automotive",
  hero: {
    eyebrow: "Automotive",
    title: "Rupee-scored prescriptions for auto component plants",
    description:
      "Die casting, forging, heat treatment, and rubber moulding already have meters and SCADA. Stamped is the intelligence layer on that stack: live data, assigned next actions, evidence on the bill. Read-only. No hardware retrofit.",
    primaryCta: CTA,
    secondaryCta: HOW,
    seoHeadings: [
      "How much can auto component manufacturers reduce their electricity bill?",
      "What is maximum demand and how does it affect my electricity bill?",
      "How does Stamped Energy work for die casting plants?",
    ],
  },
  economics: {
    eyebrow: "Energy challenges",
    title: "Energy challenges in automotive manufacturing",
    description:
      "Automotive plants run energy-intensive utilities across paint shops, compressed air, HVAC, and material handling systems, where fragmented visibility and manual control lead to persistent inefficiencies, cost leakage, and inconsistent performance across shifts, assets, and plants.",
    stats: [
      {
        id: "cost-share",
        value: "12-18%",
        label: "Of operating cost linked to energy",
        detail: "Typical for process-intensive auto component suppliers",
      },
      {
        id: "uncontrolled",
        value: "50-60%",
        label: "Energy outside direct production control",
        detail: "Auxiliaries, holding loads, and startup overlap",
      },
      {
        id: "variability",
        value: "20-30%",
        label: "Lost to operational variability",
        detail: "Shift starts, idle windows, and uncoordinated startups",
      },
    ] satisfies StatItem[],
  },
  wasteTable: {
    eyebrow: "Actionable energy intelligence",
    title: "Where energy value sits across processes and utilities",
    description:
      "The platform identifies and prescribes actions on where energy value typically sits across processes and utilities. Figures are reference ranges from comparable plants - your pilot replaces them with verified numbers.",
    areas: [
      {
        id: "press-body",
        step: "01",
        title: "Press shop & body components",
        description:
          "Stagger press and auxiliary startup to avoid simultaneous MD spikes. Zero-investment sequencing prescriptions plus ROI-ranked capital actions.",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹1.5-3L",
      },
      {
        id: "die-cast",
        step: "02",
        title: "Die casting cells",
        description:
          "Furnace holding, core cooling compressors, and shot-cycle SEC, normalized by alloy mix and production rate.",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹2-5L",
      },
      {
        id: "heat-treat",
        step: "03",
        title: "Heat treatment & carburizing",
        description:
          "Setback gaps, weekend holding, and batch timing against tariff windows, prescribed per furnace with M&V.",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹1.5-4L",
      },
      {
        id: "compressed-air",
        step: "04",
        title: "Compressed air & utilities",
        description:
          "Leak detection, over-pressure, and overlapping compressors - a recurring theme across auto component plants.",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹1.2-2.5L",
      },
      {
        id: "rubber-cure",
        step: "05",
        title: "Rubber moulding & curing",
        description:
          "Curing cycle optimization, idle press heat, and batch changeover windows with supervisor-ready actions.",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹1.2-3L",
      },
      {
        id: "demand-md",
        step: "06",
        title: "Electrical demand & MD management",
        description:
          "Demand windows, power factor, and shift-overlap spikes, tied to rupee impact on your utility bill.",
        potentialLabel: "Est. monthly savings",
        potentialValue: "₹2-6L",
      },
    ],
  },
  plantBand: {
    eyebrow: "In this plant",
    title: "Where the auto-component bill actually moves",
    description:
      "Die casting, forging, heat treatment, and rubber moulding. Same processes you run.",
    items: [
      {
        id: "die-casting",
        title: "Die casting",
        description:
          "Melting, holding, and core-cooling compressors hit the incomer together at shift start. Stamped ranks stagger and holding cuts against shot rate, not a flat kW alarm.",
        imageSrc: "/industries/die-casting.jpeg",
        imageAlt: "Die casting plant energy management - shift-start MD spike reduction",
      },
      {
        id: "forging",
        title: "Forging",
        description:
          "Hammer and press peaks set MD. Sequencing and idle-auxiliary cuts are assigned before the billing window closes.",
        imageSrc: "/industries/forging.jpg",
        imageAlt: "Forging press line energy cost reduction - maximum demand control",
      },
      {
        id: "heat-treatment",
        title: "Heat treatment",
        description:
          "Weekend soak with no batches is a holding bill. Setback and tariff-window timing are prescribed per furnace.",
        imageSrc: "/industries/heat-treatment.webp",
        imageAlt: "Heat treatment furnaces for automotive energy setback prescriptions",
      },
      {
        id: "rubber-moulding",
        title: "Rubber moulding",
        description:
          "Curing heat and idle presses between batches. Cycle and changeover windows get a rupee-scored owner.",
        imageSrc: "/industries/rubber-moulding.jpg",
        imageAlt: "Rubber moulding and curing line energy prescriptions",
      },
    ],
  },
  prescriptionExamples: {
    eyebrow: "Example prescriptions",
    title: "What supervisors receive",
    description:
      "Illustrative actions from comparable auto component plants. Your pilot writes these from your meters and bill.",
    footnote:
      "Impact ranges are benchmark estimates from comparable plants, not customer guarantees. Verified figures come from your plant with evidence.",
    items: [
      {
        id: "shift-start",
        title: "Stagger furnace pre-heat and compressor startup at shift change",
        description:
          "Incomer MD hit 1,240 kVA at 07:15 - three furnaces and two compressors ramped together before first pour.",
        impactRange: "₹2-5L/month",
        assignee: "Electrical maintenance / shift supervisor",
      },
      {
        id: "weekend-hold",
        title: "Setback heat treatment furnaces over empty weekends",
        description:
          "Furnaces 3 and 4 held at soak with zero batches scheduled Saturday-Sunday. Holding load visible per furnace.",
        impactRange: "₹1.5-4L/month",
        assignee: "Heat treatment supervisor",
      },
      {
        id: "compressor-air",
        title: "Reduce compressor unload hours between press strokes",
        description:
          "Screw compressors sized for peak stroke demand running 60%+ of shift in unload with no production benefit.",
        impactRange: "₹1.2-2.5L/month",
        assignee: "Utilities / maintenance",
      },
    ],
  },
  integration: {
    eyebrow: "What Stamped delivers",
    title: "From plant signals to verified savings",
    items: [
      {
        id: "connect",
        title: "Connect without retrofit",
        description:
          "Meters, SCADA, PLCs, and utility bills into one time-aligned graph - Modbus, OPC-UA, MQTT.",
      },
      {
        id: "prescribe",
        title: "Prescriptions, not dashboards",
        description: "What to change, why, who owns it, and ₹ impact - prioritized for your supervisors.",
      },
      {
        id: "execute",
        title: "WhatsApp-native execution",
        description: "Actions reach shift leads with open → done tracking, not another portal login.",
      },
      {
        id: "verify",
        title: "Verified ₹ ledger",
        description: "Potential vs. realised savings with M&V against production-adjusted baselines.",
      },
    ],
  },
  outcomes: {
    eyebrow: "What you gain",
    title: "The floor knows what to do. Leadership sees the evidence.",
    disclaimer: "Indicative language from comparable plants. Your pilot replaces it with plant figures.",
    items: [
      {
        id: "real-time",
        title: "Assigned energy moves",
        description:
          "Ranked prescriptions on startup overlap, holding, and idle auxiliaries, without changing the process recipe.",
      },
      {
        id: "sec",
        title: "Stable SEC in the operating band",
        description:
          "Drift vs this plant's baseline, not a generic dashboard threshold.",
      },
      {
        id: "reliability",
        title: "Earlier equipment intervention",
        description:
          "Power-draw and duty-cycle drift tied to rupee and process risk. Not a vibration PdM claim.",
      },
    ],
  },
  segments: {
    eyebrow: "Automotive processes",
    title: "Four processes where the bill hurts most",
    description:
      "Die casting, forging, heat treatment, rubber moulding - expand each for typical leaks and how Stamped addresses them.",
  },
  faq: [
    {
      id: "bill-reduction",
      question: "How much can auto component manufacturers reduce their electricity bill?",
      answer:
        "Comparable auto component plants using assigned, rupee-scored actions typically see an indicative 12-20% monthly bill movement, with die casting and forging often recovering a large share on MD from shift-start sequencing. Your pilot replaces those bands with plant figures.",
    },
    {
      id: "maximum-demand",
      question: "What is maximum demand and how does it affect my electricity bill?",
      answer:
        "Maximum demand (MD) is the highest average kVA your plant draws in a billing window. Indian DISCOMs charge a fixed rate per kVA of recorded MD each month. Overlapping furnace pre-heat, compressor startup, and press cycles at shift start are the most common MD drivers in auto component plants.",
    },
    {
      id: "die-casting",
      question: "How does Stamped Energy work for die casting plants?",
      answer:
        "Stamped connects read-only to your incomer meter and SCADA, builds production-aware baselines per cell and shift, then sends rupee-scored prescriptions: stagger furnace pre-heat, stage compressors, cut holding load. Owners get the action on WhatsApp.",
    },
  ],
};

export const automotiveResources = resourcesContent;
