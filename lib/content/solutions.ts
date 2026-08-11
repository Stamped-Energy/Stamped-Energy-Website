import type { CtaLink, StatItem } from "./types";

export type SolutionPillarSlug = "load-energy" | "equipment-intelligence";

export type SolutionPillarSummary = {
  slug: SolutionPillarSlug;
  href: string;
  title: string;
  shortTitle: string;
  description: string;
  /** Longer hub-page brief used on /solutions */
  hubBrief: string;
  outcome: string;
  ctaLabel: string;
  highlights: string[];
};

export type SolutionRxExample = {
  id: string;
  title: string;
  what: string;
  who: string;
  impact: string;
  evidence: string;
};

export type SolutionPillarPage = {
  slug: SolutionPillarSlug;
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  heroImageSrc: string;
  heroImageAlt: string;
  /** object-position for hero crop differentiation */
  heroObjectPosition?: string;
  valueProps: {
    eyebrow: string;
    title: string;
    disclaimer: string;
    items: StatItem[];
  };
  problem: {
    title: string;
    body: string;
  };
  method: {
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
  };
  whatWeDo: {
    eyebrow: string;
    title: string;
    intro: string;
    levers: { id: string; title: string; body: string }[];
  };
  whoActs: {
    title: string;
    roles: string[];
  };
  evidence: {
    title: string;
    body: string;
  };
  platformLink: {
    title: string;
    body: string;
    cta: CtaLink;
  };
  rxExamples: SolutionRxExample[];
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
};

export const solutionsContent = {
  hub: {
    eyebrow: "Solutions",
    title: "Stamped Intelligence for two plant outcomes",
    description:
      "One product for energy-intensive plants in India. Choose the outcome page that matches how you buy. Same stack, real-time intelligence, verified with evidence.",
    heroImageSrc: "/industries/cement.png",
    heroImageAlt: "Cement plant with silos and kiln illuminated at twilight",
    primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
    secondaryCta: { label: "See the Platform", href: "/platform" } satisfies CtaLink,
    sectionEyebrow: "The intelligence",
    sectionTitle: "Two pillars. One evidence trail.",
    sectionIntro:
      "Start on the hub for the overview, then open the pillar that matches how your plant buys. Each page goes deeper on problem, levers, who acts, and sample prescriptions.",
    finalCta: {
      eyebrow: "Start with your plant",
      title: "See which pillar fits how you buy",
      description:
        "Discovery call: we map your meters, main loads, and bill pattern, and say honestly if a pilot makes sense.",
      primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
      secondaryCta: { label: "See the Platform", href: "/platform" } satisfies CtaLink,
    },
    pillars: [
      {
        slug: "load-energy",
        href: "/solutions/load-energy",
        title: "Industry Energy Management",
        shortTitle: "Energy management",
        description:
          "Stamped analyzes energy use at the equipment level in the context of demand, price, and tariff windows. Predict and optimize consumption and rupee impact from demand charges, idle loads, and ramp profiles.",
        hubBrief:
          "Turn incomer, sub-meters, SCADA, and bills into ranked actions: what to change, who owns it, and monthly rupee impact. Built for MD peaks, idle loads, HVAC waste, and tariff windows without a hardware retrofit.",
        outcome: "Lower bill line items. No hardware retrofit.",
        ctaLabel: "Learn more",
        highlights: [
          "MD and demand charges",
          "Shift-start stagger",
          "Idle and HVAC loads",
          "Tariff-aware timing",
        ],
      },
      {
        slug: "equipment-intelligence",
        href: "/solutions/equipment-intelligence",
        title: "Asset Health Intelligence",
        shortTitle: "Asset health",
        description:
          "Stamped ₹-ranks anomalies and predictions tied to each asset and tracks operator decisions so plant expertise is captured and compounds with each shift.",
        hubBrief:
          "Catch mechanical and process-linked waste early using energy and operating context. Maintenance and utilities get assigned prescriptions before trips, scrap, and energy waste compound across the shift.",
        outcome: "Fewer surprise failures. Same evidence trail.",
        ctaLabel: "Learn more",
        highlights: [
          "Process-aware early warnings",
          "Assigned maintenance actions",
          "Energy-linked waste",
          "Verified with evidence",
        ],
      },
    ] satisfies SolutionPillarSummary[],
    sharedNote:
      "Orders and department context inform schedule-type actions. Stamped is not your MES, CMMS, or plant OS.",
  },

  pillars: {
    "load-energy": {
      slug: "load-energy",
      path: "/solutions/load-energy",
      eyebrow: "Industry Energy Management",
      title: "Industry Energy Management",
      description:
        "Incomer, sub-meters, SCADA, and bills become ranked actions: what to change, who owns it, monthly rupee impact. Real-time decision making on the loads that move your bill.",
      heroImageSrc: "/industries/die-casting.jpeg",
      heroImageAlt: "Molten metal pour in an energy-intensive manufacturing plant",
      heroObjectPosition: "center 35%",
      valueProps: {
        eyebrow: "Indicative outcomes",
        title: "What this pillar is built to move",
        disclaimer:
          "Benchmark ranges from comparable plants. Your pilot replaces these with verified figures.",
        items: [
          {
            id: "bill",
            value: "15-20%",
            label: "Typical electricity cost recovery",
            detail: "Process-intensive mid-market plants",
          },
          {
            id: "md",
            value: "15-25%",
            label: "MD / demand charge reduction",
            detail: "Often from incomer meter and bill data alone",
          },
          {
            id: "idle",
            value: "10-20%",
            label: "Non-production energy flagged",
            detail: "Idle loads, holding, HVAC staging, batch gaps",
          },
        ] satisfies StatItem[],
      },
      problem: {
        title: "You already have the meters",
        body: "Demand spikes and high SEC show up after the fact. The missing piece is an assigned next action before the billing window closes, not another trend chart.",
      },
      method: {
        eyebrow: "Agentic intelligence",
        title: "From plant signals to the next best action",
        body: "An agentic system watches what is happening across the plant: meters, SCADA, bills, and process context. ML models surface data anomalies and load-shape drift. Stamped then ranks what to do next against industry practice for MD, tariff windows, idle waste, and utilities staging, and assigns an owner with monthly rupee impact.",
        points: [
          "Reads energy and process signals across the plant, not a single meter in isolation",
          "ML models flag anomalies, co-starts, idle draw, and tariff misalignment",
          "Decisions ranked against industry standards and your plant constraints",
          "Output is a prescription: what, who, effort, and ₹ impact",
        ],
      },
      whatWeDo: {
        eyebrow: "What we do",
        title: "Where we actually help on load and energy",
        intro:
          "Real-time intelligence on your energy graph. Prescriptions your electrical and ops teams can execute without a hardware retrofit.",
        levers: [
          {
            id: "md",
            title: "Maximum demand and co-starts",
            body: "Catch overlapping startups and soft-land before the MD window locks in.",
          },
          {
            id: "tod",
            title: "Tariff and TOD windows",
            body: "Shift flexible loads and holding into cheaper slabs when production allows.",
          },
          {
            id: "idle",
            title: "Idle and holding waste",
            body: "Flag compressors, furnaces, and auxiliaries running without production.",
          },
          {
            id: "hvac",
            title: "HVAC and utilities staging",
            body: "Stage chillers, AHUs, and shared utilities against process demand.",
          },
        ],
      },
      whoActs: {
        title: "Who acts",
        roles: [
          "Electrical head / utilities",
          "Shift supervisors",
          "Plant director / VP Ops",
          "Finance review of the savings ledger",
        ],
      },
      evidence: {
        title: "Verified with evidence",
        body: "Potential vs realised impact in an ops-cleared ledger. DISCOM bill confirmation can follow when the period closes. It is optional proof, not the only story.",
      },
      platformLink: {
        title: "Same Connect to Improve loop",
        body: "This pillar runs on the Platform operating loop: Connect, Observe, Decide, Execute, Verify, Improve. Improve based on decisions taken. No separate product to deploy.",
        cta: { label: "See the Platform", href: "/platform" } satisfies CtaLink,
      },
      rxExamples: [
        {
          id: "md-stagger",
          title: "MD co-start stagger",
          what: "Stagger compressor and furnace restarts after lunch by at least 12 minutes.",
          who: "Shift supervisor · utilities",
          impact:
            "Indicative: lower MD charge exposure in the peak window. Plant-specific; not a guaranteed outcome.",
          evidence: "Baseline demand curve vs post-action window; ledger entry when cleared.",
        },
        {
          id: "idle-compressor",
          title: "Idle compressor unload",
          what: "Cut unload hours on Bank A between press strokes; hold pressure setpoint until production resumes.",
          who: "Utilities / maintenance",
          impact: "Indicative: reduce non-production kWh on compressed air. Plant-specific.",
          evidence: "Unload hours vs production tags; closed when action logged.",
        },
        {
          id: "tod-holding",
          title: "TOD holding shift",
          what: "Move furnace holding into the off-peak slab when Saturday batches are empty.",
          who: "Heat treatment supervisor",
          impact: "Indicative: lower tariff-weighted holding cost. Plant-specific.",
          evidence: "Tariff window vs holding kWh; ledger when cleared.",
        },
      ],
      primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
      secondaryCta: { label: "See the Platform loop", href: "/platform" } satisfies CtaLink,
    },
    "equipment-intelligence": {
      slug: "equipment-intelligence",
      path: "/solutions/equipment-intelligence",
      eyebrow: "Asset Health Intelligence",
      title: "Asset Health Intelligence",
      description:
        "The stack that finds energy waste also flags equipment issues early, with owners and evidence. Real-time decision making before trips and waste compound.",
      heroImageSrc: "/industries/steel.png",
      heroImageAlt: "Steel rolling mill with glowing hot metal billets on the production line",
      heroObjectPosition: "center 45%",
      valueProps: {
        eyebrow: "Indicative outcomes",
        title: "What this pillar is built to move",
        disclaimer:
          "Indicative ranges when teams act on early energy-linked drift. Aligned with industrial reliability bands (for example 15-25% emergency / PM spend reduction in published prescriptive programs). Your pilot replaces these with verified figures. Not a CMMS or full vibration PdM claim.",
        items: [
          {
            id: "downtime",
            value: "10-20%",
            label: "Unplanned downtime prevented",
            detail: "When early drift prescriptions are closed before a trip",
          },
          {
            id: "emergency",
            value: "15-25%",
            label: "Emergency maintenance cost reduction",
            detail: "Fewer rush repairs when issues surface on the energy graph first",
          },
          {
            id: "shared",
            value: "Shared",
            label: "Context for utilities and maintenance",
            detail: "One prescription trail with evidence, not two dashboards",
          },
        ] satisfies StatItem[],
      },
      problem: {
        title: "Energy drift often arrives first",
        body: "Odd load shapes, rising specific energy, and idle patterns appear before a trip. Without a shared prescription, maintenance and utilities talk past each other.",
      },
      method: {
        eyebrow: "Plant-tuned models",
        title: "Pre-trained models, fine-tuned on your plant",
        body: "We start from domain pre-trained models, then train and fine-tune on your plant's actual equipment data. Every plant and every asset has a different baseline. Models keep learning from your operating history so early signs of equipment drift or breakage show up before a trip, with an assigned next action and evidence trail.",
        points: [
          "Domain pre-trained models as the starting point, not a blank slate",
          "Fine-tuned on your plant and equipment baselines",
          "Continuous training on your actual operating data",
          "Earlier drift signals than generic alerts, tied to owners and evidence",
        ],
      },
      whatWeDo: {
        eyebrow: "What we do",
        title: "Where we actually help on equipment intelligence",
        intro:
          "Real-time intelligence from the same energy graph. Early warnings with owners, not another vibration screen to ignore.",
        levers: [
          {
            id: "sec-drift",
            title: "SEC and load-shape drift",
            body: "Detect rising specific energy and abnormal profiles before a hard failure.",
          },
          {
            id: "utility-health",
            title: "Utility asset early flags",
            body: "Chillers, compressors, furnaces: approach, unload, and holding signals with context.",
          },
          {
            id: "cross-dept",
            title: "Cross-department Rx",
            body: "Route actions when schedule tradeoffs involve production, utilities, and maintenance.",
          },
          {
            id: "evidence",
            title: "Evidence, not alert noise",
            body: "Every finding stays tied to tags, baselines, and cleared outcomes.",
          },
        ],
      },
      whoActs: {
        title: "Who acts",
        roles: [
          "Maintenance / reliability",
          "Utilities and electrical",
          "Production when schedule tradeoffs apply",
          "Plant leadership for cross-department Rx",
        ],
      },
      evidence: {
        title: "Verified with evidence",
        body: "Findings stay tied to the energy graph and cleared outcomes. Not a claim to replace full CMMS or vibration PdM programs.",
      },
      platformLink: {
        title: "Same Connect to Improve loop",
        body: "Equipment findings ride the same Platform loop as energy prescriptions. Improve based on decisions taken and verified outcomes.",
        cta: { label: "See the Platform", href: "/platform" } satisfies CtaLink,
      },
      rxExamples: [
        {
          id: "chiller-drift",
          title: "Chiller approach drift",
          what: "Inspect chiller approach temperature drift on Bank B before the next peak shift; hold setpoint changes until cleared.",
          who: "Utilities · maintenance",
          impact:
            "Indicative: avoid compounding HVAC kWh and process risk. Plant-specific; not a guaranteed outcome.",
          evidence: "Tag trend vs baseline; closed when inspection is logged.",
        },
        {
          id: "compressor-anomaly",
          title: "Compressor anomaly with energy context",
          what: "Investigate Bank A specific power rise during unload; check filters and intake before weekend holding.",
          who: "Maintenance · utilities",
          impact: "Indicative: catch inefficiency before a trip or MD surprise. Plant-specific.",
          evidence: "kW per CFM trend vs baseline; closed when work order logged.",
        },
        {
          id: "furnace-hold",
          title: "Furnace hold without batches",
          what: "Review soak hold on furnaces 3 and 4 with zero Saturday batches; confirm setback or shutdown with production.",
          who: "Heat treatment · production",
          impact: "Indicative: cut idle holding risk and energy waste. Plant-specific.",
          evidence: "Holding kWh vs schedule; closed when decision logged.",
        },
      ],
      primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
      secondaryCta: { label: "See the Platform loop", href: "/platform" } satisfies CtaLink,
    },
  } satisfies Record<SolutionPillarSlug, SolutionPillarPage>,
};

export function getSolutionPillar(slug: SolutionPillarSlug): SolutionPillarPage {
  return solutionsContent.pillars[slug];
}
