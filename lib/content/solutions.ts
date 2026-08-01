import type { CtaLink, StatItem } from "./types";

export type SolutionPillarSlug = "load-energy" | "equipment-intelligence";

export type SolutionPillarSummary = {
  slug: SolutionPillarSlug;
  href: string;
  title: string;
  shortTitle: string;
  description: string;
  outcome: string;
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
  whatWeDo: {
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
    primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
    secondaryCta: { label: "See the Platform", href: "/platform" } satisfies CtaLink,
    pillars: [
      {
        slug: "load-energy",
        href: "/solutions/load-energy",
        title: "Load management and energy efficiency",
        shortTitle: "Energy savings",
        description:
          "Maximum demand, shift-start overlap, idle loads, HVAC, and tariff windows. Ranked prescriptions with owners and monthly rupee impact.",
        outcome: "Lower bill line items. No hardware retrofit.",
      },
      {
        slug: "equipment-intelligence",
        href: "/solutions/equipment-intelligence",
        title: "Prescriptive equipment intelligence",
        shortTitle: "Plant efficiency",
        description:
          "Early warnings tied to energy and process context. Maintenance and utilities act before trips and waste compound.",
        outcome: "Fewer surprise failures. Same evidence trail.",
      },
    ] satisfies SolutionPillarSummary[],
    sharedNote:
      "Orders and department context inform schedule-type actions. Stamped is not your MES, CMMS, or plant OS.",
  },

  pillars: {
    "load-energy": {
      slug: "load-energy",
      path: "/solutions/load-energy",
      eyebrow: "Energy savings",
      title: "Load management and energy-efficiency prescriptions",
      description:
        "Incomer, sub-meters, SCADA, and bills become ranked actions: what to change, who owns it, monthly rupee impact. Real-time decision making on the loads that move your bill.",
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
      whatWeDo: {
        title: "What Stamped does for load and energy",
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
        body: "This pillar runs on the Platform operating loop: Connect, Observe, Decide, Execute, Verify, Improve. No separate product to deploy.",
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
      eyebrow: "Plant efficiency",
      title: "Prescriptive equipment intelligence",
      description:
        "The stack that finds energy waste also flags equipment issues early, with owners and evidence. Real-time decision making before trips and waste compound.",
      valueProps: {
        eyebrow: "Indicative outcomes",
        title: "What this pillar is built to move",
        disclaimer:
          "Qualitative and indicative only. Your pilot replaces these with plant-specific evidence. Not a CMMS or vibration PdM replacement claim.",
        items: [
          {
            id: "early",
            value: "Earlier",
            label: "Warnings tied to energy drift",
            detail: "Odd load shapes and SEC rise often precede a trip",
          },
          {
            id: "shared",
            value: "Shared",
            label: "Context for utilities and maintenance",
            detail: "One prescription trail, not two dashboards",
          },
          {
            id: "same",
            value: "Same",
            label: "Evidence trail as energy Rx",
            detail: "Ops-cleared outcomes on the energy graph",
          },
        ] satisfies StatItem[],
      },
      problem: {
        title: "Energy drift often arrives first",
        body: "Odd load shapes, rising specific energy, and idle patterns appear before a trip. Without a shared prescription, maintenance and utilities talk past each other.",
      },
      whatWeDo: {
        title: "What Stamped does for equipment intelligence",
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
        body: "Equipment findings ride the same Platform loop as energy prescriptions. Improve calibrates from followed vs ignored Rx.",
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
