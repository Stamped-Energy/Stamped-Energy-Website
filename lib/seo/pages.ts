/** Canonical title tags, meta descriptions, and per-page keywords. Copy canon: Stamped copy v3 (3 Oct 2026). */

export type PageSeoConfig = {
  absoluteTitle: string;
  description: string;
  path: string;
  keywords?: readonly string[];
};

const HOW_IT_WORKS_SEO = {
  absoluteTitle: "How it works | Stamped",
  description:
    "How Stamped uses machine learning and AI on your existing plant data to send ranked actions to the people who own them, and check the result against your own baseline.",
  path: "/platform",
  keywords: [
    "AI for plant operations",
    "manufacturing operational efficiency India",
    "plant data to operator actions",
    "machine learning and AI for manufacturing",
  ],
} as const satisfies PageSeoConfig;

export const PAGE_SEO = {
  home: {
    absoluteTitle: "Stamped | AI for plant operations",
    description:
      "Stamped uses machine learning and AI on the data your plant already records to find where efficiency is lost across process, quality, planning and maintenance, and improves it.",
    path: "/",
    keywords: [
      "AI for plant operations",
      "manufacturing operational efficiency India",
      "reduce rejection manufacturing",
      "predictive quality manufacturing India",
      "process optimisation manufacturing",
      "auto component manufacturing software",
    ],
  },
  platform: HOW_IT_WORKS_SEO,
  /** @deprecated Use PAGE_SEO.platform. Kept for transitional imports. */
  howItWorks: HOW_IT_WORKS_SEO,
  solutions: {
    absoluteTitle: "What Stamped improves | Process, quality, planning, maintenance",
    description:
      "Stamped improves process and control, quality and lot checks, planning and maintenance in manufacturing plants, with energy counted in all four.",
    path: "/solutions",
    keywords: [
      "process optimisation manufacturing",
      "predictive quality manufacturing India",
      "production re-planning software",
      "maintenance stop ranking",
    ],
  },
  solutionsProcess: {
    absoluteTitle: "Process and control optimisation | Stamped",
    description:
      "Run better than your best shift. Stamped tests improved control policies on a digital twin of your line, using mathematical models, reinforcement learning and machine learning, and recommends them to your process engineers.",
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
    absoluteTitle: "Quality and lot checks before rejection | Stamped",
    description:
      "Catch the problem while the lot can still be saved. Stamped links process data to each lot and alerts your team in real time, for example when a basket overstays in ageing or quench water drifts out of band.",
    path: "/solutions/quality",
    keywords: [
      "predictive quality manufacturing",
      "real-time quality alarms",
      "rejection reduction auto component",
      "reduce rejection in forging",
      "CQI-9 heat treatment records",
      "8D root cause data",
    ],
  },
  solutionsPlanning: {
    absoluteTitle: "Planning and scheduling | Stamped",
    description:
      "Re-plan with the whole plant in view. Stamped tracks what every machine, furnace and dispatch is doing and proposes the sequence that works best for the plant, with its effect on output, energy and delivery.",
    path: "/solutions/planning",
    keywords: [
      "production re-planning manufacturing",
      "dynamic production planning",
      "furnace loading sequence",
      "shop floor scheduling India",
    ],
  },
  solutionsMaintenance: {
    absoluteTitle: "Maintenance | Stamped",
    description:
      "Prescriptive maintenance, planned around production. Stamped ranks stops by what they cost, watches specific energy consumption for drift and prescribes the fix and the best window to make it.",
    path: "/solutions/maintenance",
    keywords: [
      "prescriptive maintenance manufacturing",
      "reduce downtime CNC machining",
      "maintenance stop ranking",
      "specific energy consumption monitoring",
    ],
  },
  about: {
    absoluteTitle: "About Stamped | IIT Roorkee engineers building AI for plant operations",
    description:
      "Stamped is built by IIT Roorkee engineers Vinayak Raizada and Utso Sarkar. We build software that turns plant data into actions, across process, quality, planning and maintenance.",
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
      "A few days on your floor and a written read-out of where your plant loses efficiency and what we'd do first.",
    path: "/contact",
    keywords: ["book a site survey", "manufacturing efficiency survey India", "AI for plant operations"],
  },
  industries: {
    absoluteTitle: "Industries | Stamped",
    description:
      "Built for auto-component makers first, with the same four areas applied in die casting, rubber moulding, steel, cement, pharma and chemical plants.",
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
      "For forging, heat treatment, machining, die casting and rubber moulding plants supplying OEMs: fewer rejections, more output and fewer breakdowns, from the data your plant already records.",
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
      "For induction and arc furnace melt shops and rolling mills: power per tonne, heat chemistry, yield and cobbles, improved from the data your plant already records.",
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
      "For batch and specialty chemical plants: reactor yield, batch cycle time, off-spec batches and steam and cooling, improved from the data your plant already records.",
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
