import type { CtaLink, ImprovementAreaKey, IndustryVertical } from "./types";
import { landingContent } from "./landing";
import { getVerticalPage, VERTICAL_SLUGS, type VerticalSlug } from "./vertical-pages";

/**
 * Industries copy. Canon: Stamped copy v3 (3 Oct 2026), revision 2.
 * Auto components lead. Steel, cement, pharma and chemicals are covered with the same four areas,
 * written qualitatively and with an honest note that first deployments are in auto components.
 */

const INDUSTRY_IMAGES = {
  dieCasting: "/industries/die-casting.jpeg",
  forging: "/industries/forging.jpg",
  heatTreatment: "/industries/heat-treatment.webp",
  machining: "/blog/cnc-energy-decomposition.jpg",
  rubberMoulding: "/industries/rubber-moulding.jpg",
  cement: "/industries/cement.png",
  steel: "/industries/steel.png",
  pharma: "/industries/plant/pharma/cleanroom.jpg",
  chemical: "/industries/chemical.png",
} as const;

export type IndustryHubRow = {
  id: string;
  slug: string;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  /** Short pain-point labels shown as a dotted list. */
  equipment: string[];
  body: string;
  footerNote: string;
};

export type IndustryProcessTile = {
  id: string;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  focus: string;
};

export type IndustryMatrixRow = {
  id: string;
  name: string;
  href: string;
  cells: Record<ImprovementAreaKey, string>;
};

export const IMPROVEMENT_AREA_LABELS: Record<ImprovementAreaKey, { label: string; href: string }> = {
  process: { label: "Process and control", href: "/solutions/process" },
  quality: { label: "Quality and lot checks", href: "/solutions/quality" },
  planning: { label: "Planning and scheduling", href: "/solutions/planning" },
  maintenance: { label: "Maintenance", href: "/solutions/maintenance" },
};

export const industriesContent = {
  hub: {
    eyebrow: "Industries",
    title: "Built for plants across industries.",
    description:
      "Stamped is built for auto-component, steel and cement plants, and the same four areas apply in pharma and chemical plants. Each page below explains what Stamped looks at there.",
    heroImageSrc: INDUSTRY_IMAGES.forging,
    heroImageAlt: "Forging press line on an auto-component plant floor",
    primaryCta: { label: "Explore auto components", href: "/industries/automotive" } satisfies CtaLink,
    secondaryCta: { label: "Book a site survey", href: "/contact" } satisfies CtaLink,
    thesis: {
      eyebrow: "Across industries",
      title: "Every plant loses efficiency in the same four places.",
      body: "A forge, a kiln, a melt shop and a granulation suite look nothing alike, but the losses sit in the same places: a process setting that has drifted, a batch that goes wrong without anyone noticing in time, a plan that breaks mid-shift, and a stop or slow drift that maintenance hears about too late, with energy running through all four. What changes from one industry to the next is which signals matter, so Stamped's models learn your plant's own processes from its own history before recommending anything.",
    },
    matrix: {
      eyebrow: "By industry and area",
      title: "What the four areas mean in each industry.",
      description: "Energy is counted in all four.",
      rows: [
        {
          id: "automotive",
          name: "Auto components",
          href: "/industries/automotive",
          cells: {
            process: "Restarts, die and heater temperature, shot and cure settings",
            quality: "Lots at risk of rejection, audit and 8D records",
            planning: "Re-plans after a press stops, furnace loading",
            maintenance: "Stops ranked by cost, tool life, gas per kilo",
          },
        },
        {
          id: "steel",
          name: "Steel",
          href: "/industries/steel",
          cells: {
            process: "Charge mix, power practice and tap temperature",
            quality: "Chemistry misses and rolling rejects",
            planning: "Melt shop and mill in step, hot charging",
            maintenance: "Cobbles, lining wear, power drift",
          },
        },
        {
          id: "cement",
          name: "Cement",
          href: "/industries/cement",
          cells: {
            process: "Kiln stability, false air, mill settings",
            quality: "Free lime and fineness",
            planning: "Mill runs, grade changes, silos and dispatch",
            maintenance: "Refractory hot spots, fans, mill trips",
          },
        },
        {
          id: "pharma",
          name: "Pharma",
          href: "/industries/pharma",
          cells: {
            process: "Granulation, drying and compression",
            quality: "Deviations, OOS and batch records",
            planning: "Campaigns, cleaning and QC holds",
            maintenance: "Equipment stops, air handlers, room pressures",
          },
        },
        {
          id: "chemical",
          name: "Chemicals",
          href: "/industries/chemical",
          cells: {
            process: "Batch phases against your best batches",
            quality: "Off-spec batches and certificates",
            planning: "Reactor sequence and QC release waits",
            maintenance: "Jacket fouling, agitators, cooling",
          },
        },
      ] satisfies IndustryMatrixRow[],
    },
    byIndustry: {
      eyebrow: "By industry",
      title: "Where Stamped looks in each industry.",
      disclaimer:
        "Stamped looks across process, quality, planning and maintenance in each of them, with energy counted in all four. Our first deployments are in auto components.",
      rows: [
        {
          id: "automotive",
          slug: "automotive",
          name: "Auto components",
          href: "/industries/automotive",
          imageSrc: INDUSTRY_IMAGES.dieCasting,
          imageAlt: "Auto-component plant floor",
          equipment: ["Rejections", "Customer complaints", "Audits", "On-time delivery"],
          body: "Fewer rejections reach your OEM when batches at risk are flagged while they are still in the plant and each lot's record is ready when the auditor or the customer asks, across forging, heat treatment, machining, die casting and rubber moulding.",
          footerNote: "Lead industry",
        },
        {
          id: "steel",
          slug: "steel",
          name: "Steel",
          href: "/industries/steel",
          imageSrc: INDUSTRY_IMAGES.steel,
          imageAlt: "Hot steel billets on a rolling mill line",
          equipment: ["Power per tonne", "Heat chemistry", "Yield", "Cobbles"],
          body: "More good tonnes from every heat, with each heat run closer to your best practice for its grade and charge mix, and the melt shop and the mill kept in step when one of them is delayed.",
          footerNote: "Melt shop and rolling",
        },
        {
          id: "cement",
          slug: "cement",
          name: "Cement",
          href: "/industries/cement",
          imageSrc: INDUSTRY_IMAGES.cement,
          imageAlt: "Cement plant with silos and kiln at twilight",
          equipment: ["Kiln stability", "Free lime", "Heat and power per tonne", "Kiln stops"],
          body: "More good clinker from the kiln you already run, with the kiln kept in its steadiest band, free-lime excursions caught before they fill a silo, and stops ranked by the clinker they cost.",
          footerNote: "Kiln, mills and utilities",
        },
        {
          id: "pharma",
          slug: "pharma",
          name: "Pharma",
          href: "/industries/pharma",
          imageSrc: INDUSTRY_IMAGES.pharma,
          imageAlt: "Operators in a pharmaceutical cleanroom",
          equipment: ["Right first time", "Deviations", "Batch records", "HVAC and utilities"],
          body: "More batches right the first time, with batches that look like past deviations flagged early, the full record gathered for QA, and utilities that follow the production calendar within what your validation allows.",
          footerNote: "OSD, API and utilities",
        },
        {
          id: "chemical",
          slug: "chemical",
          name: "Chemicals",
          href: "/industries/chemical",
          imageSrc: INDUSTRY_IMAGES.chemical,
          imageAlt: "Chemical plant towers and piping",
          equipment: ["Reactor yield", "Cycle time", "Off-spec batches", "Steam and cooling"],
          body: "More on-spec batches from the reactors you already have, with each batch improved phase by phase beyond your best ones and the off-spec path caught while it can still be corrected.",
          footerNote: "Batch and specialty",
        },
      ] satisfies IndustryHubRow[],
    },
    processes: {
      eyebrow: "Auto components, process by process",
      title: "Every process in the auto-component supply chain.",
      description:
        "Each process loses efficiency in its own way, and the auto components page explains what Stamped looks at in each one.",
      tiles: [
        {
          id: "forging",
          name: "Forging",
          href: "/industries/automotive#forging",
          imageSrc: INDUSTRY_IMAGES.forging,
          imageAlt: "Forging press line",
          focus: "Billet temperature, restarts, die temperature and press pacing.",
        },
        {
          id: "heat-treatment",
          name: "Heat treatment",
          href: "/industries/automotive#heat-treatment",
          imageSrc: INDUSTRY_IMAGES.heatTreatment,
          imageAlt: "Heat treatment furnace in operation",
          focus: "Quench and ageing, furnace loading and idle hours.",
        },
        {
          id: "precision-machining",
          name: "Precision machining",
          href: "/industries/automotive#precision-machining",
          imageSrc: INDUSTRY_IMAGES.machining,
          imageAlt: "CNC machining centre",
          focus: "Tool life, first-off rejection and setups.",
        },
        {
          id: "die-casting",
          name: "Die casting",
          href: "/industries/automotive#die-casting",
          imageSrc: INDUSTRY_IMAGES.dieCasting,
          imageAlt: "Molten metal pour on a die-casting line",
          focus: "Porosity, die temperature, shot profile and holding furnaces.",
        },
        {
          id: "rubber-moulding",
          name: "Rubber moulding",
          href: "/industries/automotive#rubber-moulding",
          imageSrc: INDUSTRY_IMAGES.rubberMoulding,
          imageAlt: "Rubber moulding presses",
          focus: "Cure settings per compound batch, flash, voids and idle presses.",
        },
      ] satisfies IndustryProcessTile[],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions plant leaders ask about industries",
      items: [
        {
          id: "which",
          question: "Which industries does Stamped work with?",
          answer:
            "We are starting with forging, heat-treatment and machining plants that supply OEMs, where a single rejection can cost far more than the part itself. In steel, cement, pharma and chemicals we start the same way, with a site survey on your floor and a written read-out of where we would begin.",
        },
        {
          id: "same-approach",
          question: "Is it the same product in every industry?",
          answer:
            "The approach is the same, because every plant loses efficiency in process, quality, planning and maintenance, but the models learn from your own plant's data, so what Stamped looks at in a kiln is different from what it looks at in a forge.",
        },
        ...landingContent.faq.items.filter((item) => item.id === "hardware" || item.id === "start"),
      ],
    },
    cta: { label: "Book a site survey", href: "/contact" } satisfies CtaLink,
  },

  verticals: [
    {
      id: "automotive",
      slug: "automotive",
      name: "Auto components",
      tagline: "Fewer rejections reach your OEM.",
      description:
        "We are starting with forging, heat-treatment and machining plants that supply OEMs, where a single rejection can cost far more than the part itself.",
      href: "/industries/automotive",
      heroImageSrc: INDUSTRY_IMAGES.forging,
      heroImageAlt: "Forging press line on an auto-component plant floor",
      segments: [],
      priority: 1,
      status: "live",
    },
    {
      id: "steel",
      slug: "steel",
      name: "Steel",
      tagline: "More good tonnes from every heat.",
      description:
        "Melt-shop yield and power per tonne, heat chemistry right the first time, and rolling without cobbles or quality rejects.",
      href: "/industries/steel",
      heroImageSrc: INDUSTRY_IMAGES.steel,
      heroImageAlt: "Hot steel billets on a rolling mill line",
      segments: [],
      priority: 2,
      status: "live",
    },
    {
      id: "cement",
      slug: "cement",
      name: "Cement",
      tagline: "More good clinker from the kiln you already run.",
      description:
        "Kiln stability, heat and power per tonne, free lime and fineness, and fewer kiln and mill stops.",
      href: "/industries/cement",
      heroImageSrc: INDUSTRY_IMAGES.cement,
      heroImageAlt: "Cement plant with silos and kiln at twilight",
      segments: [],
      priority: 3,
      status: "live",
    },
    {
      id: "pharma",
      slug: "pharma",
      name: "Pharma",
      tagline: "More batches right the first time.",
      description: "Batch consistency, deviations and batch records, campaign planning, and HVAC and utilities.",
      href: "/industries/pharma",
      heroImageSrc: INDUSTRY_IMAGES.pharma,
      heroImageAlt: "Operators in a pharmaceutical cleanroom",
      segments: [],
      priority: 4,
      status: "live",
    },
    {
      id: "chemical",
      slug: "chemical",
      name: "Chemicals",
      tagline: "More on-spec batches from the reactors you already have.",
      description: "Reactor yield, batch cycle time, off-spec batches, and steam and cooling.",
      href: "/industries/chemical",
      heroImageSrc: INDUSTRY_IMAGES.chemical,
      heroImageAlt: "Chemical plant towers and piping",
      segments: [],
      priority: 5,
      status: "live",
    },
  ] satisfies IndustryVertical[],
} as const;

export function getIndustryVertical(slug: string) {
  return industriesContent.verticals.find((vertical) => vertical.slug === slug);
}

export function getLiveVerticals() {
  return [...industriesContent.verticals]
    .filter((vertical) => vertical.status === "live")
    .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
}

/** Nav and footer entries: every industry page, auto components first, then the hub. */
export function getIndustryNavItems() {
  return [
    ...industriesContent.hub.byIndustry.rows.map((row) => ({ label: row.name, href: row.href })),
    { label: "All industries", href: "/industries" },
  ];
}

export { getVerticalPage, VERTICAL_SLUGS, type VerticalSlug };
