import type { CtaLink, StatItem, VerticalPageContent } from "../types";

const CTA = { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink;
const HOW = { label: "Platform", href: "/platform" } satisfies CtaLink;

export const pharmaPage: VerticalPageContent = {
  slug: "pharma",
  hero: {
    eyebrow: "Pharmaceutical",
    title: "AI-driven energy management for pharma",
    description:
      "AI enables pharmaceutical plants to manage energy-intensive operations and utilities at scale, directly impacting operating cost, compliance, uptime, and consistent product quality across regulated manufacturing environments - with evidence-verified savings.",
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
  prescriptionExamples: {
    eyebrow: "Example prescriptions",
    title: "GMP-safe operational levers - utilities, not room reclassification",
    description:
      "Illustrative actions from BEE pharma cluster benchmarks. Change-control-friendly utility tweaks first.",
    footnote:
      "Impact ranges are benchmark estimates. Stamped frames prescriptions as utilities operations, not GMP room classification changes. Validate with your quality team before execution.",
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
    title: "Targeted waste elimination and stable thermal performance",
    disclaimer: "Indicative BEE benchmark band. Your pilot replaces these with evidence-verified figures.",
    items: [
      {
        id: "hvac-rupees",
        title: "Targeted energy waste elimination",
        description:
          "Prescriptive AI identifies hidden wastage across utilities and support systems, converting deviations into operator actions without compromising quality or compliance.",
      },
      {
        id: "md-chiller",
        title: "Optimized HVAC and AHU efficiency",
        description:
          "Prescriptive intelligence continuously maintains HVAC KPIs such as kW/TR and kW/CFM, tuning AHU performance in real time to balance temperature, humidity, air quality, and energy consumption.",
      },
      {
        id: "schedule",
        title: "Stable thermal system performance",
        description:
          "AI monitors boilers, steam, and hot-water systems and prescribes actions to prevent efficiency drift, sustaining reliable thermal output.",
      },
      {
        id: "ledger",
        title: "Seasonal energy demand control",
        description:
          "AI adapts utility setpoints and load strategies across seasonal shifts to maintain compliance, stability, and energy efficiency.",
      },
    ],
  },
  faq: [
    {
      id: "hvac-share",
      question: "Why is HVAC 85% of pharma plant electricity?",
      answer:
        "GMP requires 24/7 environmental control - chillers, AHUs, clean air, and WFI systems run continuously. BEE MSME pharma cluster study identifies HVAC as the dominant electrical load in formulation and API plants.",
    },
    {
      id: "gmp-safe",
      question: "Are Stamped prescriptions safe for GMP facilities?",
      answer:
        "Stamped targets utility operations - chiller staging, AHU schedules, CA pressure bands - not clean room reclassification. Your quality team validates any schedule change before execution. We never promise GMP changes without your validation.",
    },
    {
      id: "api-vs-formulation",
      question: "Does Stamped work for API and formulation plants?",
      answer:
        "Yes - MSME and mid-market formulation, API, and nutraceutical plants in Baddi, Hyderabad, Ahmedabad, and Goa clusters. Bill band ₹5L-₹50L+/month with meaningful HVAC savings potential.",
    },
  ],
  finalCta: {
    eyebrow: "Next step",
    title: "Map your chiller and AHU data",
    description:
      "Discovery call: utility meters, BMS availability, production calendar - outline a pilot if HVAC savings justify it.",
    primaryCta: CTA,
  },
};
