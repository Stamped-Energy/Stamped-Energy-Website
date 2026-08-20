/** Canonical title tags, meta descriptions, and per-page keywords. */

export type PageSeoConfig = {
  absoluteTitle: string;
  description: string;
  path: string;
  keywords?: readonly string[];
};

export const PAGE_SEO = {
  home: {
    absoluteTitle:
      "Stamped Energy | AI-Powered Energy Intelligence for Industrial Plants",
    description:
      "Stamped analyzes plant and market data to create rupee-scored prescriptions so operators can act before opportunities are missed. Industry Energy Management and Asset Health Intelligence for industrial manufacturers.",
    path: "/",
    keywords: [
      "stamped energy",
      "AI-powered energy intelligence India",
      "prescriptive energy intelligence India",
      "energy intelligence for industrial plants",
      "rupee-scored prescriptions",
    ],
  },
  platform: {
    absoluteTitle: "Platform | Stamped Energy - Intelligence Layer and Connect to Improve",
    description:
      "Stamped is the intelligence layer on the stack you already run. Plant graph, rupee-scored prescriptions, and the Connect to Improve loop. First prescriptions in weeks. No hardware retrofit.",
    path: "/platform",
    keywords: [
      "prescriptive energy intelligence",
      "Connect to Improve loop",
      "plant graph energy",
      "intelligence layer SCADA meters",
      "stamped energy platform",
    ],
  },
  /** @deprecated Use PAGE_SEO.platform. Kept for transitional imports. */
  howItWorks: {
    absoluteTitle: "Platform | Stamped Energy - Intelligence Layer and Connect to Improve",
    description:
      "Stamped is the intelligence layer on the stack you already run. Plant graph, rupee-scored prescriptions, and the Connect to Improve loop. First prescriptions in weeks. No hardware retrofit.",
    path: "/platform",
    keywords: [
      "prescriptive energy intelligence",
      "Connect to Improve loop",
      "plant graph energy",
      "stamped energy platform",
    ],
  },
  solutions: {
    absoluteTitle: "Solutions | Stamped Energy - Industry Energy Management and Asset Health",
    description:
      "Stamped Energy delivers Industry Energy Management and Asset Health Intelligence in one product for energy-intensive plants in India.",
    path: "/solutions",
    keywords: [
      "Industry Energy Management",
      "Asset Health Intelligence",
      "Stamped Intelligence",
      "energy management software for plants India",
    ],
  },
  solutionsLoadEnergy: {
    absoluteTitle: "Industry Energy Management | Stamped Energy",
    description:
      "rupee-scored prescriptions for maximum demand, shift-start overlap, idle loads, HVAC, and tariff - assigned owners and verified with evidence.",
    path: "/solutions/load-energy",
    keywords: [
      "Industry Energy Management",
      "maximum demand reduction India",
      "shift-start energy waste",
      "rupee-scored prescriptions",
      "industrial load management India",
    ],
  },
  solutionsEquipment: {
    absoluteTitle: "Asset Health Intelligence | Stamped Energy",
    description:
      "rupee-ranked anomalies and early equipment warnings tied to energy and process context - assigned prescriptions before trips and waste compound.",
    path: "/solutions/equipment-intelligence",
    keywords: [
      "Asset Health Intelligence",
      "rupee-ranked anomalies",
      "equipment energy early warning",
      "plant asset health India",
    ],
  },
  about: {
    absoluteTitle: "About Stamped Energy | IIT Roorkee Engineers, Verified Savings",
    description:
      "Stamped Energy is AI-powered prescriptive energy intelligence built by IIT Roorkee electrical engineers for plant heads who need outcomes verified with evidence, not another monitoring dashboard.",
    path: "/about",
    keywords: [
      "Stamped Energy founders",
      "IIT Roorkee energy software",
      "prescriptive energy intelligence India",
    ],
  },
  blog: {
    absoluteTitle: "Case Studies & Blogs | Stamped Energy",
    description:
      "Case studies and blogs on maximum demand, shift-start overlap, furnace holding, and HVAC waste - written for plant directors and electrical HODs at energy-intensive plants in India.",
    path: "/case-studies",
    keywords: [
      "industrial energy case studies India",
      "maximum demand plant blog",
      "DISCOM bill savings India",
    ],
  },
  caseStudies: {
    absoluteTitle: "Case Studies & Blogs | Stamped Energy",
    description:
      "Case studies and blogs on maximum demand, shift-start overlap, furnace holding, and HVAC waste - written for plant directors and electrical HODs at energy-intensive plants in India.",
    path: "/case-studies",
    keywords: [
      "industrial energy case studies India",
      "maximum demand plant blog",
      "DISCOM bill savings India",
    ],
  },
  contact: {
    absoluteTitle: "Book a Discovery Call | Stamped Energy",
    description:
      "Book a discovery call with Stamped Energy. We review your last three DISCOM bills, plant meter setup, and outline a pilot - only if the numbers justify it.",
    path: "/contact",
    keywords: [
      "book discovery call Stamped Energy",
      "industrial energy pilot India",
      "DISCOM bill review plant",
    ],
  },
  industries: {
    absoluteTitle: "Industries | Stamped Energy - Cement, Steel, Pharma, Chemical, Auto",
    description:
      "AI-powered energy intelligence for cement, steel, pharmaceutical, chemical, and automotive plants in India. Purpose-built for plants with ₹20 lakh+ monthly electricity bills - verified with evidence.",
    path: "/industries",
    keywords: [
      "industrial plant energy intelligence India",
      "cement steel pharma chemical automotive energy",
      "plants with high electricity bills India",
    ],
  },
  industriesAutomotive: {
    absoluteTitle: "Automotive Plant Energy Intelligence | Stamped Energy",
    description:
      "Rupee-scored prescriptions for automotive and auto component plants. Die casting, forging, heat treatment, rubber moulding. Intelligence layer on your meters. Verified with evidence.",
    path: "/industries/automotive",
    keywords: [
      "automotive plant energy cost reduction India",
      "die casting energy cost",
      "shift-start MD auto component",
      "forging plant electricity bill",
    ],
  },
  industriesCement: {
    absoluteTitle: "Cement Plant Energy Management India | Stamped Energy",
    description:
      "Rupee-scored prescriptions for cement plants. Mills, kiln auxiliaries, crushers, WHR and grid windows. Intelligence layer on your EMS. Verified with evidence.",
    path: "/industries/cement",
    keywords: [
      "cement plant energy management India",
      "kWh per ton cement",
      "WHR dispatch optimization",
      "cement mill MD reduction",
    ],
  },
  industriesSteel: {
    absoluteTitle: "Steel Plant Energy Efficiency India | Stamped Energy",
    description:
      "Rupee-scored prescriptions for steel and metals plants. Induction furnaces, rolling mills, forging and foundry. Intelligence layer on your meters. Verified with evidence.",
    path: "/industries/steel",
    keywords: [
      "steel plant energy efficiency India",
      "induction furnace MD",
      "PAT SEC steel",
      "rolling mill energy cost",
    ],
  },
  industriesPharma: {
    absoluteTitle: "Pharmaceutical Plant HVAC Energy Savings | Stamped Energy",
    description:
      "Rupee-scored prescriptions for pharmaceutical plants. Chiller staging, AHU schedules, compressed air. GMP-safe utility levers. Verified with evidence.",
    path: "/industries/pharma",
    keywords: [
      "pharmaceutical plant HVAC energy savings",
      "chiller staging pharma",
      "cleanroom energy cost India",
      "pharma utility energy optimization",
    ],
  },
  industriesChemical: {
    absoluteTitle: "Chemical Plant Batch Energy Optimization | Stamped Energy",
    description:
      "Rupee-scored prescriptions for chemical and paint plants. Batch SEC, reactor stagger, idle hold. Intelligence layer on meters and batch logs. Verified with evidence.",
    path: "/industries/chemical",
    keywords: [
      "chemical plant batch energy optimization",
      "reactor stagger MD",
      "paint plant SEC",
      "batch idle energy waste",
    ],
  },
  resources: {
    absoluteTitle: "Resources | Stamped Energy - Guides for Plant Energy Cost",
    description:
      "Guides on maximum demand, DISCOM bills, and how Stamped differs from EMS or SCADA. Written for plant directors and electrical heads in India.",
    path: "/resources",
    keywords: [
      "industrial energy guides India",
      "maximum demand reduction India",
      "DISCOM bill savings India",
      "prescriptive energy vs EMS",
    ],
  },
  resourcesStampedVsEms: {
    absoluteTitle: "Stamped vs EMS and SCADA | Stamped Energy",
    description:
      "How Stamped Energy differs from a passive EMS dashboard or SCADA replacement. Prescription layer with owners, rupee impact, and outcomes verified with evidence.",
    path: "/resources/stamped-vs-ems",
    keywords: [
      "energy management software vs EMS",
      "SCADA vs prescriptions",
      "prescriptive energy intelligence vs dashboard",
      "Stamped Energy vs EMS",
    ],
  },
  resourcesMaximumDemand: {
    absoluteTitle: "Maximum Demand Reduction India | Stamped Energy",
    description:
      "How HT plants in India cut maximum demand charges: shift-start stagger, overlapping loads, and rupee-scored prescriptions. Indicative 15-25% MD reduction bands.",
    path: "/resources/maximum-demand-india",
    keywords: [
      "maximum demand reduction India",
      "MD charge industrial plant",
      "shift-start demand spike",
      "HT bill maximum demand",
    ],
  },
  resourcesDiscomBill: {
    absoluteTitle: "How to Read a DISCOM HT Bill | Stamped Energy",
    description:
      "MD, ToD, power factor, and energy line items on Indian DISCOM HT bills. How plant teams turn bill signals into assigned actions verified with evidence.",
    path: "/resources/discom-bill-guide",
    keywords: [
      "DISCOM bill savings India",
      "HT electricity bill India",
      "how to read DISCOM bill",
      "ToD tariff industrial plant",
    ],
  },
} as const satisfies Record<string, PageSeoConfig>;

const VERTICAL_SEO_MAP: Record<string, PageSeoConfig> = {
  automotive: PAGE_SEO.industriesAutomotive,
  cement: PAGE_SEO.industriesCement,
  steel: PAGE_SEO.industriesSteel,
  pharma: PAGE_SEO.industriesPharma,
  chemical: PAGE_SEO.industriesChemical,
};

export function getVerticalPageSeo(slug: string): PageSeoConfig | undefined {
  return VERTICAL_SEO_MAP[slug];
}
