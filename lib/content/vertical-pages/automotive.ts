import type { CtaLink, StatItem, VerticalPageContent } from "../types";
import { resourcesContent } from "../resources";

const CTA = { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink;
const HOW = { label: "Platform", href: "/platform" } satisfies CtaLink;

export const automotivePage: VerticalPageContent = {
  slug: "automotive",
  hero: {
    eyebrow: "Automotive",
    title: "AI-powered energy intelligence for automotive manufacturing",
    description:
      "AI enables automotive manufacturers to control energy-intensive operations and utilities at scale, directly influencing cost stability, uptime, and long-term operational competitiveness - with prescriptions assigned to your plant floor and outcomes verified with evidence.",
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
  prescriptionExamples: {
    eyebrow: "Example prescriptions",
    title: "What your supervisors receive - not another dashboard",
    description:
      "Illustrative actions from comparable auto component plants. Your pilot generates prescriptions from your meters and bill.",
    footnote:
      "Impact ranges are benchmark estimates from comparable plants - not customer guarantees. Verified figures come from your pilot M&V.",
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
    title: "Controlled energy intensity and sustained efficiency outcomes",
    disclaimer:
      "Target bands from comparable plant Your pilot replaces these with evidence-verified figures.",
    items: [
      {
        id: "real-time",
        title: "Real-time energy command",
        description:
          "AI converts live operational data into prescribed energy actions across production and auxiliary systems, eliminating 5-10% utility energy waste without impacting throughput or process stability.",
      },
      {
        id: "sec",
        title: "Stable SECs and KPIs",
        description:
          "Continuous supervision prescribes corrective actions to maintain SECs and efficiency KPIs within defined operating bands, reducing performance drift by 8-12%.",
      },
      {
        id: "reliability",
        title: "Higher asset reliability",
        description:
          "Performance intelligence prescribes early interventions on degradation patterns, cutting unplanned utility downtime by 15-20% and improving asset availability.",
      },
      {
        id: "sustained",
        title: "Sustained efficiency outcomes",
        description:
          "Continuous feedback loops prescribe, validate, and refine actions over time, locking in 10-15% verified energy cost reduction with evidence-verified M&V.",
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
        "Auto component suppliers using prescriptive energy intelligence typically see 12-20% monthly bill reductio Die casting and forging plants often recover 15-25% on maximum demand charges alone from shift-start sequencing and furnace coordination.",
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
        "Stamped connects to your incomer meter and SCADA, builds production-normalized SEC baselines per cell and shift, then sends ranked prescriptions - stagger furnace pre-heat, stage compressors, reduce holding loads - with rupee impact assigned to shift supervisors via WhatsApp.",
    },
  ],
};

export const automotiveResources = resourcesContent;
