import type {
  CtaLink,
  IndustrySegment,
  IndustryVertical,
  StatItem,
} from "./types";
import { icp } from "./icp";
import { getVerticalPage, VERTICAL_SLUGS, type VerticalSlug } from "./vertical-pages";

const INDUSTRY_IMAGES = {
  dieCasting: "/industries/die-casting.jpeg",
  forging: "/industries/forging.jpg",
  heatTreatment: "/industries/heat-treatment.webp",
  rubberMoulding: "/industries/rubber-moulding.jpg",
  cement: "/industries/cement.png",
  steel: "/industries/steel.png",
  pharma: "/industries/pharma.png",
  chemical: "/industries/chemical.png",
} as const;

const automotiveSegments: IndustrySegment[] = [
  {
    id: "die-casting",
    slug: "die-casting",
    name: "Die Casting",
    focus: "Furnace-compressor coordination & shift-start spikes",
    description:
      "High-pressure die casting cells where melting, holding, and auxiliary loads create simultaneous demand at shift start and leak rupees through idle holding.",
    href: "/industries/automotive#die-casting",
    imageSrc: INDUSTRY_IMAGES.dieCasting,
    imageAlt: "Die casting plant energy management - shift-start MD spike reduction",
    relatedArticle: {
      href: "/blog/why-shift-start-kills-die-casting-margins",
      label: "How shift-start overlap drives maximum demand charges in die casting plants",
    },
    challenges: [
      "Melting and holding furnaces ramp together at shift start",
      "Compressors run for core cooling while cells idle between shots",
      "SEC varies with shot rate but baselines ignore production mix",
    ],
    stampProvides: [
      "Production-normalized SEC baselines per cell and shift",
      "Prescriptions to stagger furnace pre-heat and compressor staging",
      "WhatsApp alerts when holding load exceeds adjusted baseline",
    ],
    metrics: [
      { id: "dc-sec", value: "8-15%", label: "Typical SEC improvement range" },
      { id: "dc-md", value: "₹2-5L", label: "Monthly MD / demand charge savings" },
    ],
  },
  {
    id: "forging",
    slug: "forging",
    name: "Forging",
    focus: "Heavy loads, MD exposure & hammer cycle variability",
    description:
      "Forging hammers and press lines with extreme demand spikes, power-factor penalties, and production-linked SEC that passive monitoring never explains.",
    href: "/industries/automotive#forging",
    imageSrc: INDUSTRY_IMAGES.forging,
    imageAlt: "Forging press line energy cost reduction - maximum demand control",
    challenges: [
      "Hammer and press startups overlap with utility baseload",
      "Maximum demand charges from short, high-kVA cycles",
      "Shift handovers leave auxiliaries running without output",
    ],
    stampProvides: [
      "Cycle-aware anomaly detection on hammer and furnace loads",
      "Prescriptions for startup sequencing and idle auxiliary shutdown",
      "Verified savings ledger tied to adjusted production baselines",
    ],
    metrics: [
      { id: "fg-md", value: "12-22%", label: "MD / demand charge reduction potential" },
      { id: "fg-sec", value: "₹3-8L", label: "Monthly energy cost reduction" },
    ],
  },
  {
    id: "heat-treatment",
    slug: "heat-treatment",
    name: "Heat Treatment",
    focus: "Furnace setbacks, weekend holding & carburizing loads",
    description:
      "Carburizing, induction, and batch furnaces where setback gaps, weekend holding, and tariff windows determine whether heat energy converts to shipped parts.",
    href: "/industries/automotive#heat-treatment",
    imageSrc: INDUSTRY_IMAGES.heatTreatment,
    imageAlt: "Heat treatment furnace energy optimization - weekend holding waste reduction",
    relatedArticle: {
      href: "/blog/weekend-furnace-holding-silent-cost",
      label: "Weekend furnace holding - the silent cost in heat treatment plants",
    },
    challenges: [
      "Furnaces held at temperature through breaks and low-load windows",
      "Weekend holding losses with no production scheduled",
      "Batch timing misaligned with off-peak tariff periods",
    ],
    stampProvides: [
      "Furnace-level baselines with batch and shift context",
      "Setback and hold-time prescriptions with ₹ impact per furnace",
      "Track open → done on furnace tuning actions via WhatsApp",
    ],
    metrics: [
      { id: "ht-hold", value: "15-25%", label: "Holding loss recoverable" },
      { id: "ht-tariff", value: "₹1.5-4L", label: "Monthly tariff-window savings" },
    ],
  },
  {
    id: "rubber-moulding",
    slug: "rubber-moulding",
    name: "Rubber Moulding",
    focus: "Curing cycles, compressor leaks & idle presses",
    description:
      "Injection and compression moulding lines where curing cycles, steam or hot-oil systems, and compressed air leaks inflate SEC between batches.",
    href: "/industries/automotive#rubber-moulding",
    imageSrc: INDUSTRY_IMAGES.rubberMoulding,
    imageAlt: "Rubber moulding plant energy intelligence - curing cycle SEC baseline",
    challenges: [
      "Curing timers and press heat run through planned downtime",
      "Compressed air leaks masked by overall plant load",
      "Batch changeovers leave mould heaters fully on",
    ],
    stampProvides: [
      "Per-line curing SEC normalized by parts produced",
      "Leak and idle-load prescriptions with supervisor routing",
      "Closed-loop verification on realised ₹ per line",
    ],
    metrics: [
      { id: "rm-air", value: "5-12%", label: "Compressed air system savings" },
      { id: "rm-cure", value: "₹1.2-3L", label: "Monthly curing & idle-load savings" },
    ],
  },
];

const steelSegments: IndustrySegment[] = [
  {
    id: "eaf-induction",
    slug: "eaf-induction",
    name: "EAF / Induction",
    focus: "Holding power between heats & power factor",
    description:
      "Induction and EAF routes where holding load between heats and PF penalties inflate the bill without production output.",
    href: "/industries/steel#eaf-induction",
    imageSrc: INDUSTRY_IMAGES.steel,
    imageAlt: "Hot metal billets on a steel rolling mill line - induction and EAF energy management",
    challenges: [
      "Furnace held at full power between heats with no pour scheduled",
      "Power factor penalties from reactive load during holding",
      "Heat schedule misaligned with tariff windows",
    ],
    stampProvides: [
      "Furnace holding baselines tied to production calendar",
      "Setback schedule prescriptions with ₹ impact per furnace",
      "PF sequencing recommendations assigned to electrical",
    ],
    metrics: [
      { id: "eaf-hold", value: "₹3-8L", label: "Monthly holding waste recoverable " },
      { id: "eaf-pf", value: "5-12%", label: "PF penalty reduction potential " },
    ],
  },
  {
    id: "rolling",
    slug: "rolling",
    name: "Rolling mill",
    focus: "Stand startup MD & SEC by product mix",
    description:
      "Rolling mills where simultaneous stand startup creates MD spikes and SEC varies by product mix without baseline tracking.",
    href: "/industries/steel#rolling",
    imageSrc: INDUSTRY_IMAGES.steel,
    imageAlt: "Glowing steel billets on rolling mill conveyor - maximum demand control",
    challenges: [
      "Multiple stands restart simultaneously after breaks",
      "SEC drift by product mix invisible until billing",
      "Cooling water pumps at constant flow regardless of output",
    ],
    stampProvides: [
      "Startup sequence prescriptions to avoid MD breach",
      "SEC baselines by product mix and shift",
      "Pump duty-cycle recommendations ranked by ROI",
    ],
    metrics: [
      { id: "roll-md", value: "₹4-10L", label: "Monthly MD savings potential " },
      { id: "roll-sec", value: "8-17%", label: "SEC improvement benchmark " },
    ],
  },
  {
    id: "forging-foundry",
    slug: "forging-foundry",
    name: "Foundry",
    focus: "Auto-adjacent playbook - furnaces & compressors",
    description:
      "Forging and foundry operations overlapping automotive heat treatment and forging playbooks - same prescription patterns, steel cluster context.",
    href: "/industries/steel#forging-foundry",
    imageSrc: INDUSTRY_IMAGES.forging,
    imageAlt: "Forging and foundry energy cost reduction",
    challenges: [
      "Reheating furnace weekend hold with no production",
      "Hammer startup overlap with utility baseload",
      "Compressed air leaks across multiple bay lines",
    ],
    stampProvides: [
      "Weekend holding setback prescriptions per furnace",
      "Hammer and press startup sequencing for MD control",
      "Leak detection prescriptions with supervisor routing",
    ],
    metrics: [
      { id: "ff-hold", value: "₹2-6L", label: "Monthly holding savings " },
      { id: "ff-md", value: "12-22%", label: "MD reduction potential " },
    ],
  },
];

export const industriesContent = {
  hub: {
    eyebrow: "Industries",
    title: "Industries we serve",
    description:
      "Purpose-built AI-powered energy intelligence for energy-intensive sectors - prescriptions with rupee impact, verified with evidence.",
    heroImageSrc: INDUSTRY_IMAGES.cement,
    heroImageAlt: "Cement plant with silos and kiln illuminated at twilight",
    primaryCta: { label: "Explore industries", href: "#verticals" } satisfies CtaLink,
    secondaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
    stats: [
      {
        id: "hub-sec",
        value: "12-20%",
        label: "Typical electricity cost reduction",
        detail: "Process-intensive mid-market plants",
      },
      {
        id: "hub-md",
        value: "15-25%",
        label: "MD / demand charge reduction",
        detail: "From incomer meter + bill data",
      },
      {
        id: "hub-verticals",
        value: "5",
        label: "Industry verticals live",
        detail: "Automotive, cement, steel, pharma, chemical",
      },
    ] satisfies StatItem[],
    approach: {
      eyebrow: "How we fit your plant",
      title: "Process context, not generic kWh dashboards",
      items: [
        {
          id: "process-baselines",
          title: "Baselines by shift, batch, and line",
          description:
            "SEC and MD tracked against production context - pour times, batch windows, kWh/ton - not plant-wide averages that hide the leak.",
        },
        {
          id: "segment-prescriptions",
          title: "Prescriptions your supervisors recognise",
          description:
            "Shift-start staggering, holding schedule changes, dispatch governance - assigned roles and monthly ₹ impact.",
        },
        {
          id: "verified-outcomes",
          title: "Verified on the DISCOM bill",
          description:
            "Closed-loop M&V so plant director and CFO see realised ₹, defensible for PAT and internal cost reviews.",
        },
      ],
    },
    explorer: {
      eyebrow: "Browse verticals",
      title: "Select a vertical to explore",
      description:
        "Five industry verticals with plant-floor playbooks. Hover to preview process segments where available.",
    },
    featured: {
      eyebrow: "Industry verticals",
      title: "AI-powered energy intelligence by sector",
      description: `Each vertical gets process-aware baselines, actionable prescriptions, and evidence-verified outcomes. ${icp.heroBillLine}`,
      cta: { label: "Open automotive page", href: "/industries/automotive" } satisfies CtaLink,
      showMoreLabel: "Show process segments",
      showLessLabel: "Show fewer segments",
    },
    finalCta: {
      eyebrow: "Start with your plant",
      title: "Not sure which vertical fits?",
      description:
        "Discovery call: we map your meters, main loads, and bill pattern - and say honestly if a pilot makes sense.",
      primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
    },
    cta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
  },

  verticals: [
    {
      id: "automotive",
      slug: "automotive",
      name: "Automotive",
      tagline: "AI-led energy control for automotive manufacturing",
      description:
        "AI enables automotive manufacturers to control energy-intensive operations and utilities at scale, directly influencing cost stability, uptime, and long-term operational competitiveness.",
      href: "/industries/automotive",
      heroImageSrc: INDUSTRY_IMAGES.dieCasting,
      heroImageAlt: "Molten metal pour in an automotive die casting plant",
      segments: automotiveSegments,
      priority: 1,
      status: "live",
    },
    {
      id: "cement",
      slug: "cement",
      name: "Cement",
      tagline: "AI-driven energy intelligence for cement",
      description:
        "AI enables cement plants to prescribe optimal energy actions across continuous processes and utilities in real time, directly influencing cost stability, uptime, and operational competitiveness.",
      href: "/industries/cement",
      heroImageSrc: INDUSTRY_IMAGES.cement,
      heroImageAlt: "Cement manufacturing plant with silos, towers, and conveyors at dusk",
      segments: [],
      priority: 2,
      status: "live",
    },
    {
      id: "steel",
      slug: "steel",
      name: "Steel & metals",
      tagline: "AI-driven energy management for steel",
      description:
        "AI enables steel manufacturers to manage fuel- and power-intensive operations at scale, where energy balance and operating discipline directly determine cost competitiveness and throughput stability.",
      href: "/industries/steel",
      heroImageSrc: INDUSTRY_IMAGES.steel,
      heroImageAlt: "Steel rolling mill with glowing hot metal billets on the production line",
      segments: steelSegments,
      priority: 3,
      status: "live",
    },
    {
      id: "pharma",
      slug: "pharma",
      name: "Pharmaceutical",
      tagline: "AI-driven energy management for pharma",
      description:
        "AI enables pharmaceutical plants to manage energy-intensive operations and utilities at scale, directly impacting operating cost, compliance, uptime, and consistent product quality.",
      href: "/industries/pharma",
      heroImageSrc: INDUSTRY_IMAGES.pharma,
      heroImageAlt: "Automated pharmaceutical vial filling line in a sterile manufacturing plant",
      segments: [],
      priority: 4,
      status: "live",
    },
    {
      id: "chemical",
      slug: "chemical",
      name: "Chemical & paint",
      tagline: "AI-powered energy intelligence for chemical & paint",
      description:
        "AI brings continuous energy discipline to chemical and paint manufacturing, improving cost control, operational predictability, and long-term competitiveness.",
      href: "/industries/chemical",
      heroImageSrc: INDUSTRY_IMAGES.chemical,
      heroImageAlt: "Chemical refinery with storage tanks and distillation towers at twilight",
      segments: [],
      priority: 5,
      status: "live",
    },
  ] satisfies IndustryVertical[],
} as const;

export function getIndustryVertical(slug: string) {
  return industriesContent.verticals.find((vertical) => vertical.slug === slug);
}

export function getVerticalSegments(slug: string) {
  return getIndustryVertical(slug)?.segments ?? [];
}

export function getLiveVerticals() {
  return [...industriesContent.verticals]
    .filter((vertical) => vertical.status === "live")
    .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
}

export function getFeaturedVerticals() {
  return getLiveVerticals();
}

/** @deprecated Use getVerticalSegments("automotive") */
export function getAutomotiveSegments() {
  return getVerticalSegments("automotive");
}

export { getVerticalPage, VERTICAL_SLUGS, type VerticalSlug };
