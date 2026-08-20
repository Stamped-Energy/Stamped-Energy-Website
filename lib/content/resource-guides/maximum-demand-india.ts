import type { ResourceGuideContent } from "./types";

export const maximumDemandIndiaGuide: ResourceGuideContent = {
  slug: "maximum-demand-india",
  eyebrow: "Guide",
  title: "Maximum demand reduction for plants in India",
  description:
    "MD charges are often the fastest line item plant teams can move without capex. Here is how shift-start overlap, holding loads, and rupee-scored prescriptions cut billed kVA on HT bills.",
  primaryCta: { label: "Book a Discovery Call", href: "/contact" },
  secondaryCta: { label: "Industry Energy Management", href: "/solutions/load-energy" },
  sections: [
    {
      id: "what-is-md",
      title: "What maximum demand is on an HT bill",
      body: [
        "Maximum demand (MD) is the highest average kVA your plant draws in a DISCOM billing window. Indian HT tariffs charge a fixed rate per kVA of recorded MD each month, separate from energy (kWh) charges.",
        "A short overlap of furnace pre-heat, compressors, and line startups at shift start can set the MD for the entire billing period even when production is fine afterward.",
      ],
    },
    {
      id: "where-waste",
      title: "Where MD waste hides",
      body: [
        "Shift-start: furnaces, chillers, and compressors ramp together before output starts.",
        "Holding: empty soak or idle utility banks stay hot while waiting for the next batch.",
        "Sequence: mill, crusher, reactor, or press startups stack on the same feeder without stagger.",
        "These patterns show up on the incomer meter long before a monthly review catches them.",
      ],
    },
    {
      id: "how-stamped",
      title: "How Stamped attacks MD",
      body: [
        "Stamped connects read-only to meters and, when available, SCADA context. It ranks stagger, setback, and staging prescriptions by rupee impact and effort.",
        "Actions reach the supervisors who can execute. Outcomes are verified with evidence. Indicative industry bands for MD charge reduction are 15-25% when sequencing closes the loop. Your pilot replaces those bands with plant figures.",
      ],
    },
  ],
  faq: [
    {
      id: "how-much",
      question: "How much can plants reduce maximum demand charges?",
      answer:
        "Comparable plants often see an indicative 15-25% reduction in MD charges from incomer and bill data alone when shift-start and holding overlap are assigned and tracked. Ranges are indicative until pilot M&V replaces them.",
    },
    {
      id: "capex",
      question: "Do we need new equipment to cut MD?",
      answer:
        "Often no. Many MD wins come from sequencing and setbacks on assets you already run, not from a hardware retrofit.",
    },
    {
      id: "verticals",
      question: "Which industries see MD pain first?",
      answer:
        "Automotive and auto components (die casting, forging, heat treatment), cement mills and crushers, steel furnaces and rolling, pharma chillers, and chemical batch startups are common MD drivers.",
    },
  ],
};
