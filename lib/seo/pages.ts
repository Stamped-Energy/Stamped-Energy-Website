/** Canonical title tags, meta descriptions, and per-page keywords. Copy canon: Stamped copy v3 (3 Oct 2026). */

import { SOLUTION_AREA_PRODUCT_LINE_TITLE } from "@/lib/seo/brand";

export type PageSeoConfig = {
  absoluteTitle: string;
  description: string;
  path: string;
  keywords?: readonly string[];
};

const HOW_IT_WORKS_SEO = {
  absoluteTitle: "How it works | Stamped",
  description:
    "Stamped turns plant data into industrial intelligence: AI agents model your plant, send ranked actions to the floor and check each result against your baseline.",
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
    absoluteTitle: "Stamped | AI for plant operations",
    description:
      "Stamped is AI for industrial plants. It models your plant from the data it already records and improves process, quality, planning and maintenance.",
    path: "/",
    keywords: [
      "AI for plant operations",
      "manufacturing operational efficiency India",
      "reduce rejection manufacturing",
      "predictive quality manufacturing India",
      "process optimisation manufacturing",
      "throughput and bottleneck reduction",
      "AI agents for manufacturing",
      "plant-floor decision-making",
      "auto component manufacturing software",
    ],
  },
  platform: HOW_IT_WORKS_SEO,
  /** @deprecated Use PAGE_SEO.platform. Kept for transitional imports. */
  howItWorks: HOW_IT_WORKS_SEO,
  solutions: {
    absoluteTitle: "What we improve | Industrial AI | Stamped",
    description:
      "Agents for every part of the plant. Stamped improves process, quality and planning inside limits set beforehand, with energy counted in each. Maintenance is coming next.",
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
  solutionsProcess: {
    absoluteTitle: `${SOLUTION_AREA_PRODUCT_LINE_TITLE.process} | Process optimisation for plants`,
    description:
      "Run every process closer to its best. Stamped tries the next setting on a model of your line, and once a change has proved itself it applies it inside limits set beforehand.",
    path: "/solutions/process",
    keywords: [
      "process optimisation manufacturing",
      "control optimisation manufacturing",
      "digital twin process control",
      "induction billet heater temperature control",
      "set point drift manufacturing",
    ],
  },
  solutionsQuality: {
    absoluteTitle: `${SOLUTION_AREA_PRODUCT_LINE_TITLE.quality} | Predictive quality AI for plants`,
    description:
      "Catch the bad batch while it can still be saved. Stamped watches every run against your good parts, warns your team in time and traces each reject to its cause.",
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
  solutionsPlanning: {
    absoluteTitle: `${SOLUTION_AREA_PRODUCT_LINE_TITLE.planning} | Production planning AI for plants`,
    description:
      "Plan around how your plant really runs. Stamped warns when the plan is about to slip and suggests a better order of work, with its effect on output and delivery.",
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
    absoluteTitle: "Auto component manufacturing | Stamped",
    description:
      "For forging, heat treatment, machining, die casting and rubber moulding plants: fewer rejections, more output and fewer breakdowns, from data you already have.",
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

const SOLUTION_AREA_SEO_MAP: Record<string, PageSeoConfig> = {
  process: PAGE_SEO.solutionsProcess,
  quality: PAGE_SEO.solutionsQuality,
  planning: PAGE_SEO.solutionsPlanning,
  maintenance: PAGE_SEO.solutionsMaintenance,
};

export function getSolutionAreaSeo(slug: string): PageSeoConfig | undefined {
  return SOLUTION_AREA_SEO_MAP[slug];
}
