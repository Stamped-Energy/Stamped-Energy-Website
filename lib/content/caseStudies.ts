export type CaseStudyCategory =
  | "all"
  | "unit-economics"
  | "asset-efficiency"
  | "demand-management"
  | "process-optimization";

export type CaseStudyCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  clientContext: string;
  category: Exclude<CaseStudyCategory, "all">;
  categoryLabel: string;
  featured?: boolean;
  tag?: string;
  imageSrc: string;
  imageAlt: string;
  metrics: { label: string; value: string }[];
};

export type CaseStudyDetail = CaseStudyCard & {
  industry: string;
  challenge: string;
  approach: string[];
  outcomes: string[];
  disclaimer?: string;
};

const CASE_IMAGES = {
  forging: "/industries/forging.jpg",
  dieCasting: "/industries/die-casting.jpeg",
  heatTreatment: "/industries/heat-treatment.webp",
  rubber: "/industries/rubber-moulding.jpg",
} as const;

export const caseStudiesContent = {
  hero: {
    eyebrow: "Case studies",
    title: "₹ outcomes from real plants, not marketing ranges",
    description:
      "Field pilots and reference benchmarks from die casting, forging, and heat treatment suppliers. Every figure tied to M&V methodology or labelled as benchmark until pilot data is publishable.",
    primaryCta: { label: "Book a Discovery Call", href: "/contact" },
    secondaryCta: { label: "See the Platform", href: "/platform" },
    heroImageSrc: CASE_IMAGES.forging,
    heroImageAlt: "Automotive component forging plant floor",
  },

  filters: [
    { id: "all" as const, label: "All case studies" },
    { id: "unit-economics" as const, label: "Unit economics" },
    { id: "asset-efficiency" as const, label: "Asset efficiency" },
    { id: "demand-management" as const, label: "Demand management" },
    { id: "process-optimization" as const, label: "Process optimization" },
  ],

  featuredTitle: "Featured outcomes",
  catalogTitle: "All case studies",
  catalogDescription:
    "Browse published pilots and reference write-ups. Figures stay tied to methodology, or labelled as benchmark until pilot data is publishable.",

  studies: [
    {
      id: "auto-pump-sec",
      slug: "automotive-pump-sec-reduction",
      title: "Automotive & pump manufacturing: 18% SEC reduction",
      excerpt:
        "16 verified measures across compressors, furnaces, and shift-start sequencing, IPMVP-style M&V with ₹12-34L monthly energy savings.",
      clientContext:
        "Tier-2 automotive and industrial pump manufacturer in western India, die casting, machining, and heat treatment under one incomer.",
      category: "unit-economics",
      categoryLabel: "Unit economics",
      featured: true,
      tag: "Field pilot",
      imageSrc: CASE_IMAGES.forging,
      imageAlt: "Automotive component manufacturing facility",
      metrics: [
        { label: "SEC reduction", value: "18%" },
        { label: "Monthly savings", value: "₹12-34L" },
        { label: "Measures verified", value: "16" },
      ],
      industry: "Automotive & pumps",
      challenge:
        "Energy spend was visible only on the monthly bill. Compressors ran unloaded between batches, furnaces pre-heated before production windows, and shift-start overlap spiked maximum demand, none of it quantified in rupees per shift.",
      approach: [
        "Connected incomer meter, compressor PLCs, and furnace holding registers into one intelligence layer.",
        "Baselined SEC and MD by production line and shift pattern over 30 days.",
        "Issued rupee-denominated prescriptions ranked by payback, shift-start sequencing first, then compressor unload timers.",
        "Tracked potential vs realised savings weekly with IPMVP-style M&V on the next utility bill.",
      ],
      outcomes: [
        "18% reduction in specific energy consumption (kWh per unit output) within 90 days.",
        "₹12-34L monthly electricity cost reduction at reference tariff bands.",
        "15% maximum demand reduction from shift-start overlap elimination.",
        "16 measures verified with plant-head sign-off before annual subscription.",
      ],
      disclaimer:
        "Reference benchmark from pilot deployment. Client name withheld under NDA. Figures represent verified ranges at time of measurement.",
    },
    {
      id: "die-cast-shift",
      slug: "die-casting-shift-start-md",
      title: "Die casting: eliminating the morning MD spike",
      excerpt:
        "Shift-start furnace pre-heat overlap and holding loads drove a predictable incomer spike every morning, quantified and sequenced for ₹4-8L monthly demand savings.",
      clientContext:
        "High-pressure die casting plant supplying two-wheeler OEMs, three furnaces, shared compressor yard, single HT incomer.",
      category: "demand-management",
      categoryLabel: "Demand management",
      featured: true,
      tag: "Reference benchmark",
      imageSrc: CASE_IMAGES.dieCasting,
      imageAlt: "Die casting molten metal process",
      metrics: [
        { label: "MD reduction", value: "15-22%" },
        { label: "Shift-start overlap", value: "−40 min" },
        { label: "Monthly savings", value: "₹4-8L" },
      ],
      industry: "Die casting",
      challenge:
        "Every morning, all three furnaces ramped simultaneously while compressors started for holding pressure, creating a 20-30 minute MD spike unrelated to production output.",
      approach: [
        "Mapped furnace ramp curves against actual pour schedules from MES timestamps.",
        "Staggered pre-heat windows with prescriptions pushed to shift supervisors on WhatsApp.",
        "Automated alerts when holding load exceeded baseline for empty mould status.",
      ],
      outcomes: [
        "15-22% reduction in billed maximum demand within one billing cycle.",
        "40 minutes average reduction in concurrent high-load window at shift start.",
        "₹4-8L monthly savings from demand charge and energy overlap reduction.",
      ],
      disclaimer: "Anonymised reference benchmark from automotive die casting segment.",
    },
    {
      id: "ht-weekend",
      slug: "heat-treatment-weekend-holding",
      title: "Heat treatment: weekend furnace holding waste",
      excerpt:
        "Batch furnaces held temperature over empty weekends, 15-25% of furnace energy with no parts scheduled. Holding schedules aligned to production calendar.",
      clientContext:
        "Commercial heat treatment shop, batch furnaces, quench tanks, and ageing ovens serving forging and automotive clients.",
      category: "process-optimization",
      categoryLabel: "Process optimization",
      featured: true,
      tag: "Reference benchmark",
      imageSrc: CASE_IMAGES.heatTreatment,
      imageAlt: "Industrial heat treatment furnace",
      metrics: [
        { label: "Non-prod energy", value: "−18%" },
        { label: "Weekend holding", value: "−60%" },
        { label: "Monthly savings", value: "₹3-6L" },
      ],
      industry: "Heat treatment",
      challenge:
        "Furnaces maintained soak temperature through weekends because operators feared long re-heat times Monday morning, but production schedules showed 40% of weekends had zero batches.",
      approach: [
        "Correlated furnace holding registers with production calendar and customer dispatch data.",
        "Prescribed safe ramp-down windows when no batches were scheduled within 36 hours.",
        "Set Monday pre-heat sequences timed to first confirmed batch, not fixed clock time.",
      ],
      outcomes: [
        "18% reduction in non-production furnace energy within 60 days.",
        "60% reduction in weekend holding hours when no batches scheduled.",
        "₹3-6L monthly savings without capital expenditure.",
      ],
      disclaimer: "Reference benchmark from heat treatment segment pilots.",
    },
    {
      id: "forging-compressor",
      slug: "forging-compressor-unload",
      title: "Forging: compressor unload and leak load",
      excerpt:
        "Three ageing compressors ran continuous unload cycles between hammer strokes, 12% of plant kWh with no production benefit.",
      clientContext:
        "Closed-die forging unit, three screw compressors feeding pneumatic die cushions and tool changers.",
      category: "asset-efficiency",
      categoryLabel: "Asset efficiency",
      imageSrc: CASE_IMAGES.forging,
      imageAlt: "Forging press and compressor yard",
      metrics: [
        { label: "Compressor SEC", value: "−12%" },
        { label: "Unload hours", value: "−35%" },
        { label: "Monthly savings", value: "₹2-5L" },
      ],
      industry: "Forging",
      challenge:
        "Compressors were sized for peak stroke demand but ran unloaded 60% of shift time. Leak load was never isolated from production demand.",
      approach: [
        "Instrumented compressor run hours vs hammer stroke timestamps.",
        "Ranked leak vs unload waste by rupee impact per shift.",
        "Prescribed unload timer adjustments and maintenance windows for highest-leak headers.",
      ],
      outcomes: [
        "12% reduction in compressor-specific energy consumption.",
        "35% fewer unload hours per shift after timer and header maintenance prescriptions.",
        "₹2-5L monthly savings at reference tariff.",
      ],
    },
    {
      id: "rubber-baseline",
      slug: "rubber-moulding-baseline",
      title: "Rubber moulding: SEC baseline in 30 days",
      excerpt:
        "First 30-day baseline across curing presses and chillers, identified ₹1.2-3L monthly quick wins before full prescription rollout.",
      clientContext:
        "Rubber component supplier, injection moulding, curing presses, and chilled water loop for mould temperature control.",
      category: "unit-economics",
      categoryLabel: "Unit economics",
      imageSrc: CASE_IMAGES.rubber,
      imageAlt: "Rubber moulding production line",
      metrics: [
        { label: "Baseline window", value: "30 days" },
        { label: "Quick wins", value: "7" },
        { label: "Monthly potential", value: "₹1.2-3L" },
      ],
      industry: "Rubber moulding",
      challenge:
        "No SEC baseline existed per press or product family. Curing cycles varied by operator without energy visibility.",
      approach: [
        "Connected press energy meters and chiller incomer within one week.",
        "Built SEC baseline by product SKU and shift within 30 days.",
        "Surfaced seven no-capex prescriptions ranked by monthly rupee impact.",
      ],
      outcomes: [
        "SEC baseline established across all curing presses in 30 days.",
        "Seven quick-win prescriptions identified worth ₹1.2-3L monthly combined.",
        "Foundation for full prescriptive rollout in month two.",
      ],
    },
  ] satisfies CaseStudyDetail[],
} as const;

export function getCaseStudyBySlug(slug: string): CaseStudyDetail | undefined {
  return caseStudiesContent.studies.find((study) => study.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudyDetail[] {
  return caseStudiesContent.studies.filter((study) => study.featured);
}
