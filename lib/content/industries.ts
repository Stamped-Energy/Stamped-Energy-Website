import type {
  CtaLink,
  IndustrySegment,
  IndustryVertical,
} from "./types";
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
    title: "Process-aware prescriptions for every vertical",
    description:
      "The same motor fails differently in a cement kiln than in a die-casting cell. Generic EMS sees kWh. Stamped reads process context and assigns real-time actions with ₹ impact—verified with evidence.",
    heroImageSrc: INDUSTRY_IMAGES.cement,
    heroImageAlt: "Cement plant with silos and kiln illuminated at twilight",
    primaryCta: { label: "Compare verticals", href: "#comparison" } satisfies CtaLink,
    secondaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
    thesis: {
      eyebrow: "Process context",
      title: "Why energy leaks look different by industry",
      body: "A plant-wide average hides shift-start overlap, holding without batches, and tariff misalignment. Each vertical needs baselines and prescriptions tuned to its process—not one generic model for all.",
    },
    byIndustry: {
      eyebrow: "By industry",
      title: "Five verticals. Same evidence trail.",
      disclaimer:
        "Indicative process figures from industry ranges we already publish. Your pilot replaces them with verified numbers.",
      rows: [
        {
          id: "automotive",
          slug: "automotive",
          name: "Automotive",
          href: "/industries/automotive",
          imageSrc: INDUSTRY_IMAGES.dieCasting,
          imageAlt: "Molten metal pour in an automotive die casting plant",
          metricPrimary: {
            value: "12-18%",
            label: "Of operating cost linked to energy",
          },
          metricSecondary: {
            value: "20-30%",
            label: "Lost to operational variability",
          },
          equipment: ["Die casting", "Heat treatment", "Compressed air & more"],
          body: "Shift-start overlap, holding loads, and SEC by cell with assigned owners. Not another shop-floor kWh trend.",
          footerNote: "Auto components · press, forge, and utilities",
        },
        {
          id: "cement",
          slug: "cement",
          name: "Cement",
          href: "/industries/cement",
          imageSrc: INDUSTRY_IMAGES.cement,
          imageAlt: "Cement manufacturing plant with silos, towers, and conveyors at dusk",
          metricPrimary: {
            value: "40-50%",
            label: "Manufacturing cost linked to energy",
          },
          metricSecondary: {
            value: "₹3-8L",
            label: "Est. MD savings on crusher & mill startups",
          },
          equipment: ["Raw & finish mills", "Kiln auxiliaries", "WHR & grid & more"],
          body: "Kiln, mill, and WHR/grid dispatch context: MD, specific energy, and supervisor-ready sequencing.",
          footerNote: "Continuous process · clinker and grinding lines",
        },
        {
          id: "steel",
          slug: "steel",
          name: "Steel",
          href: "/industries/steel",
          imageSrc: INDUSTRY_IMAGES.steel,
          imageAlt: "Steel rolling mill with glowing hot metal billets on the production line",
          metricPrimary: {
            value: "30-40%",
            label: "Share of energy in manufacturing cost",
          },
          metricSecondary: {
            value: "₹4-10L",
            label: "Est. MD savings on rolling mill startup",
          },
          equipment: ["EAF / induction", "Reheating furnace", "Rolling mills & more"],
          body: "Induction, rolling, and holding windows tied to production. PAT-style SEC discipline with owners.",
          footerNote: "Furnace and mill loads · bill-first path available",
        },
        {
          id: "pharma",
          slug: "pharma",
          name: "Pharmaceutical",
          href: "/industries/pharma",
          imageSrc: INDUSTRY_IMAGES.pharma,
          imageAlt: "Automated pharmaceutical vial filling line in a sterile manufacturing plant",
          metricPrimary: {
            value: "55-65%",
            label: "Plant energy consumed by utilities",
          },
          metricSecondary: {
            value: "40-50%",
            label: "Energy driven by HVAC and clean-room systems",
          },
          equipment: ["Chillers & AHUs", "Compressed air", "Clean room HVAC & more"],
          body: "Chiller and AHU staging against batch and cleanroom constraints. GMP-safe levers only.",
          footerNote: "Utilities layer · no GMP system replacement",
        },
        {
          id: "chemical",
          slug: "chemical",
          name: "Chemical",
          href: "/industries/chemical",
          imageSrc: INDUSTRY_IMAGES.chemical,
          imageAlt: "Chemical refinery with storage tanks and distillation towers at twilight",
          metricPrimary: {
            value: "10-20%",
            label: "Share of energy in manufacturing cost",
          },
          metricSecondary: {
            value: "₹3-10L",
            label: "Est. MD savings on simultaneous batch heating",
          },
          equipment: ["Batch reactors", "Steam & thermal", "Paint ovens & more"],
          body: "Reactor stagger, idle hold, and batch SEC with owners before the next campaign.",
          footerNote: "Batch and continuous · heat, mix, and utilities",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions plant leaders ask about industries",
      items: [
        {
          id: "which",
          question: "Which industries does Stamped support?",
          answer:
            "Automotive and auto components, cement, steel, pharmaceutical, and chemical plants in India with roughly ₹20 lakh+ monthly electricity bills.",
        },
        {
          id: "why-vertical",
          question: "Why does each industry need different prescriptions?",
          answer:
            "Failure and waste modes are process-specific. The same compressor behaves differently next to a kiln than next to a press line. Stamped baselines and ranks actions with that context.",
        },
        {
          id: "generic",
          question: "How is this different from a generic EMS?",
          answer:
            "EMS shows trends. Stamped assigns what to change, who owns it, and monthly rupee impact, then verifies with evidence. Real-time decision making on top of systems you already run.",
        },
        {
          id: "start",
          question: "How do we start?",
          answer:
            "Book a discovery call. We map meters, main loads, and bill pattern, and say honestly if a pilot makes sense.",
        },
      ],
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
