/** Canonical title tags, meta descriptions, and per-page keywords. Copy canon: website v4 (Quelta / Orrery). */

import { SOLUTION_AREA_PRODUCT_LINE_TITLE } from "@/lib/seo/brand";

export type PageSeoConfig = {
  absoluteTitle: string;
  description: string;
  path: string;
  keywords?: readonly string[];
  /** When set, applied by `buildPageMetadataFromConfig` (e.g. coming-soon Scheduling). */
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
};

const HOW_IT_WORKS_SEO = {
  absoluteTitle: "How it works on ERP, SCADA and quality data | Stamped",
  description:
    "Stamped connects to the ERP, SCADA/MES and quality records your plant already runs. No hardware retrofit. Stamped recommends and your team decides.",
  path: "/platform",
  keywords: [
    "AI for plant operations",
    "plant data and industrial intelligence",
    "AI agents for manufacturing",
    "plant-floor decision-making",
    "MES ERP SCADA convergence",
    "automation and factory systems",
    "machine learning for manufacturing",
    "digital twin manufacturing",
  ],
} as const satisfies PageSeoConfig;

export const PAGE_SEO = {
  home: {
    absoluteTitle: "Stamped | Industrial AI from monitoring to improving",
    description:
      "Quelta improves process and quality from data you already log. Orrery answers Ask questions from the same record. Energy is counted in every action.",
    path: "/",
    keywords: [
      "AI for plant operations",
      "manufacturing operational efficiency India",
      "process optimisation",
      "quality rejection reduction",
      "AI agents for manufacturing",
      "Ask",
      "prescriptive maintenance",
      "reduce rejection manufacturing",
      "auto component manufacturing software",
    ],
  },
  platform: HOW_IT_WORKS_SEO,
  /** @deprecated Use PAGE_SEO.platform. Kept for transitional imports. */
  howItWorks: HOW_IT_WORKS_SEO,
  products: {
    absoluteTitle: "Products | Quelta and Orrery | Stamped",
    description:
      "Quelta improves how every line runs. Orrery answers questions about it. Each is sold on its own, with energy counted in every recommended action.",
    path: "/products",
    keywords: [
      "Quelta",
      "Orrery",
      "process optimisation",
      "quality rejection reduction",
      "AI agents for manufacturing",
      "Ask",
      "industrial AI products",
    ],
  },
  productsProcessQuality: {
    absoluteTitle: "Quelta | Process and Quality | Stamped",
    description:
      "Quelta joins every machine record to the result of each part, flags drift while a lot can still be saved, and proves each gain in your own numbers.",
    path: "/products/process-quality",
    keywords: [
      "Quelta",
      "process optimisation",
      "quality rejection reduction",
      "predictive quality manufacturing",
      "AI agents for manufacturing",
      "maintenance flags manufacturing",
    ],
  },
  productsAsk: {
    absoluteTitle: "Orrery | Ask | Stamped",
    description:
      "Orrery is Ask for manufacturing: chat with an AI agent grounded in your plant's own records. It reads only and names the evidence behind every answer.",
    path: "/products/ask",
    keywords: [
      "Orrery",
      "Ask",
      "AI agents for manufacturing",
      "plant data chat",
      "manufacturing AI assistant",
    ],
  },
  productsScheduling: {
    absoluteTitle: "Scheduling | Coming soon | Stamped",
    description:
      "Scheduling is coming soon. It will re-sequence the shift after a stop or late delivery, with a named planner accepting each re-plan. Energy peaks stay in view.",
    path: "/products/scheduling",
    keywords: [
      "production scheduling manufacturing",
      "shop floor re-planning",
      "throughput bottleneck reduction",
    ],
    robots: { index: false, follow: true },
  },
  /**
   * @deprecated Prefer PAGE_SEO.products. Legacy /solutions hub; URL 308s to /products.
   */
  solutions: {
    absoluteTitle: "What we improve | Industrial AI | Stamped",
    description:
      "Stamped improves process, quality and planning from the data you already log, inside limits set beforehand, with energy counted in each.",
    path: "/solutions",
    keywords: [
      "process optimisation manufacturing",
      "predictive quality manufacturing India",
      "production re-planning software",
      "maintenance stop ranking",
      "energy and load optimisation",
      "utilities energy manufacturing",
      "decarbonisation manufacturing",
    ],
  },
  /** @deprecated Prefer PAGE_SEO.productsProcessQuality (Quelta). */
  solutionsProcess: {
    absoluteTitle: `${SOLUTION_AREA_PRODUCT_LINE_TITLE.process} | Process optimisation for plants`,
    description:
      "Stamped flags drift against your plant's best runs, tries the next setting on a model of the line first, and works only inside limits set beforehand.",
    path: "/solutions/process",
    keywords: [
      "process optimisation manufacturing",
      "control optimisation manufacturing",
      "digital twin process control",
      "induction billet heater temperature control",
      "set point drift manufacturing",
    ],
  },
  /** @deprecated Prefer PAGE_SEO.productsProcessQuality (Quelta). */
  solutionsQuality: {
    absoluteTitle: `${SOLUTION_AREA_PRODUCT_LINE_TITLE.quality} | Catch drift before a batch is rejected`,
    description:
      "Cut rejections by catching process drift early: Stamped warns while the lot or batch can still be saved when conditions match past rejection patterns.",
    path: "/solutions/quality",
    keywords: [
      "predictive quality manufacturing",
      "quality and rejection reduction",
      "real-time quality alarms",
      "rejection reduction auto component",
      "reduce rejection in forging",
      "CQI-9 heat treatment records",
      "8D root cause data",
    ],
  },
  /** @deprecated Prefer PAGE_SEO.productsScheduling (coming soon, noindex). */
  solutionsPlanning: {
    absoluteTitle: `${SOLUTION_AREA_PRODUCT_LINE_TITLE.planning} | Production planning AI for plants`,
    description:
      "Plan around how your plant really runs. Stamped warns when the plan is about to slip and suggests a better order of work for your planner.",
    path: "/solutions/planning",
    keywords: [
      "production planning and scheduling",
      "machine utilisation idle time",
      "throughput bottleneck reduction",
      "production re-planning manufacturing",
      "dynamic production planning",
      "furnace loading sequence",
      "shop floor scheduling India",
    ],
  },
  /** @deprecated Prefer PAGE_SEO.productsProcessQuality (maintenance flags on Quelta). */
  solutionsMaintenance: {
    absoluteTitle: `${SOLUTION_AREA_PRODUCT_LINE_TITLE.maintenance} | Predictive maintenance, coming soon`,
    description:
      "Coming soon. Stamped will spot which machine is starting to wear and suggest the best window to fix it, planned around production.",
    path: "/solutions/maintenance",
    keywords: [
      "predictive maintenance manufacturing",
      "prescriptive maintenance manufacturing",
      "operational continuity",
      "power quality monitoring",
      "reduce downtime CNC machining",
      "maintenance stop ranking",
      "specific energy consumption monitoring",
    ],
  },
  about: {
    absoluteTitle: "About Stamped | Built by IIT Roorkee engineers",
    description:
      "Stamped is built by IIT Roorkee engineers Vinayak Raizada and Utso Sarkar. We turn plant data into actions across process, quality, planning and maintenance.",
    path: "/about",
    keywords: ["Stamped founders", "IIT Roorkee manufacturing software", "AI for plant operations"],
  },
  blog: {
    absoluteTitle: "Notes from the plant floor | Stamped",
    description:
      "Notes from the plant floor on rejections, restarts, heat treatment, machining and maintenance, written for plant heads and the engineers who run the lines.",
    path: "/case-studies",
    keywords: ["manufacturing operational efficiency India", "reduce rejection manufacturing", "plant floor notes"],
  },
  caseStudies: {
    absoluteTitle: "Notes from the plant floor | Stamped",
    description:
      "Notes from the plant floor on rejections, restarts, heat treatment, machining and maintenance, written for plant heads and the engineers who run the lines.",
    path: "/case-studies",
    keywords: ["manufacturing operational efficiency India", "reduce rejection manufacturing", "plant floor notes"],
  },
  contact: {
    absoluteTitle: "Book a site survey | Stamped",
    description:
      "We spend a few days on your floor with your plant head and quality and maintenance teams, then send a written read-out of where efficiency is lost and what we would change first.",
    path: "/contact",
    keywords: ["book a site survey", "manufacturing efficiency survey India", "AI for plant operations"],
  },
  industries: {
    absoluteTitle: "Industries | Stamped",
    description:
      "Stamped improves process, quality, planning and maintenance in auto-component, steel, cement, pharma and chemical plants.",
    path: "/industries",
    keywords: [
      "auto component manufacturing software",
      "forging plant software India",
      "heat treatment software India",
      "steel cement pharma chemical plant software",
    ],
  },
  industriesAutomotive: {
    absoluteTitle: "Forging & auto-component plants: fewer OEM rejects | Stamped",
    description:
      "For auto-component plants in forging, heat treatment and machining that supply OEMs: fewer rejections reach your customer, from data you already record.",
    path: "/industries/automotive",
    keywords: [
      "auto component manufacturing software",
      "rejection reduction auto component",
      "reduce rejection in forging",
      "heat treatment quench delay",
      "reduce downtime CNC machining",
      "die casting porosity scrap",
      "rubber moulding cure time",
    ],
  },
  industriesSteel: {
    absoluteTitle: "Steel plant operations | Stamped",
    description:
      "For induction and arc furnace melt shops and rolling mills: power per tonne, heat chemistry, yield and cobbles, improved from the data your plant records.",
    path: "/industries/steel",
    keywords: [
      "steel plant software India",
      "induction furnace power per tonne",
      "rolling mill yield cobbles",
      "AI for steel melt shops",
    ],
  },
  industriesCement: {
    absoluteTitle: "Cement plant operations | Stamped",
    description:
      "For cement plants: kiln stability, free lime, heat and power per tonne, mill throughput and kiln stops, improved from the data your plant already records.",
    path: "/industries/cement",
    keywords: [
      "cement plant software India",
      "kiln stability free lime",
      "cement mill power per tonne",
      "AI for cement plants",
    ],
  },
  industriesPharma: {
    absoluteTitle: "Pharmaceutical manufacturing operations | Stamped",
    description:
      "For pharma plants: batches right the first time, deviations and batch records, campaign planning and HVAC and utilities, with QA keeping every release decision.",
    path: "/industries/pharma",
    keywords: [
      "pharma manufacturing software India",
      "right first time batch",
      "deviation investigation batch record",
      "pharma HVAC utilities",
    ],
  },
  industriesChemical: {
    absoluteTitle: "Chemical plant operations | Stamped",
    description:
      "For batch and specialty chemical plants: reactor yield, cycle time, off-spec batches, steam and cooling, improved from the data your plant already records.",
    path: "/industries/chemical",
    keywords: [
      "chemical plant software India",
      "batch reactor cycle time",
      "off-spec batch reduction",
      "golden batch chemical",
    ],
  },
} as const satisfies Record<string, PageSeoConfig>;

const VERTICAL_SEO_MAP: Record<string, PageSeoConfig> = {
  automotive: PAGE_SEO.industriesAutomotive,
  steel: PAGE_SEO.industriesSteel,
  cement: PAGE_SEO.industriesCement,
  pharma: PAGE_SEO.industriesPharma,
  chemical: PAGE_SEO.industriesChemical,
};

export function getVerticalPageSeo(slug: string): PageSeoConfig | undefined {
  return VERTICAL_SEO_MAP[slug];
}

/** @deprecated Prefer getProductPageSeo. Kept for transitional /solutions imports. */
const SOLUTION_AREA_SEO_MAP: Record<string, PageSeoConfig> = {
  process: PAGE_SEO.solutionsProcess,
  quality: PAGE_SEO.solutionsQuality,
  planning: PAGE_SEO.solutionsPlanning,
  maintenance: PAGE_SEO.solutionsMaintenance,
};

/** @deprecated Prefer getProductPageSeo. */
export function getSolutionAreaSeo(slug: string): PageSeoConfig | undefined {
  return SOLUTION_AREA_SEO_MAP[slug];
}

const PRODUCT_SEO_MAP: Record<string, PageSeoConfig> = {
  "process-quality": PAGE_SEO.productsProcessQuality,
  ask: PAGE_SEO.productsAsk,
  scheduling: PAGE_SEO.productsScheduling,
};

/** Preferred helper for /products/* routes (v4 two-product IA). */
export function getProductPageSeo(slug: string): PageSeoConfig | undefined {
  return PRODUCT_SEO_MAP[slug];
}
