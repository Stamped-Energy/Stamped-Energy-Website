import type { CtaLink } from "./types";

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
  problem: {
    title: string;
    body: string;
  };
  whoActs: {
    title: string;
    roles: string[];
  };
  evidence: {
    title: string;
    body: string;
  };
  rxExample: SolutionRxExample;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
};

export const solutionsContent = {
  hub: {
    eyebrow: "Solutions",
    title: "Stamped Intelligence for two plant outcomes",
    description:
      "One product for energy-intensive plants in India. Cut electricity cost with assigned prescriptions. Catch equipment issues early on the same stack. Verified with evidence — not another dashboard.",
    valueProps: [
      {
        id: "energy",
        title: "Energy savings",
        body: "Load management and efficiency Rx: MD, TOD, idle, HVAC, tariff.",
      },
      {
        id: "plant",
        title: "Plant / industrial efficiency",
        body: "Prescriptive equipment intelligence from the same energy graph.",
      },
    ],
    primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
    secondaryCta: { label: "See the Platform", href: "/platform" } satisfies CtaLink,
    pillars: [
      {
        slug: "load-energy",
        href: "/solutions/load-energy",
        title: "Load management and energy efficiency",
        shortTitle: "Energy savings",
        description:
          "Maximum demand, shift-start overlap, idle loads, HVAC, and tariff windows — ranked prescriptions with owners and monthly rupee impact.",
        outcome: "Lower bill line items. No hardware retrofit.",
      },
      {
        slug: "equipment-intelligence",
        href: "/solutions/equipment-intelligence",
        title: "Prescriptive equipment intelligence",
        shortTitle: "Plant efficiency",
        description:
          "Early warnings tied to energy and process context — maintenance and utilities act before trips and waste compound.",
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
        "Incomer, sub-meters, SCADA, and bills become ranked actions: what to change, who owns it, monthly rupee impact — verified with evidence.",
      problem: {
        title: "You already have the meters",
        body: "Demand spikes and high SEC show up after the fact. The missing piece is an assigned next action before the billing window closes — not another trend chart.",
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
      rxExample: {
        id: "md-stagger",
        title: "Example prescription",
        what: "Stagger compressor and furnace restarts after lunch by at least 12 minutes.",
        who: "Shift supervisor · utilities",
        impact:
          "Indicative range only: lower MD charge exposure in the peak window. Plant-specific; not a guaranteed outcome.",
        evidence: "Baseline demand curve vs post-action window; ledger entry when cleared.",
      },
      primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
      secondaryCta: { label: "See the Platform loop", href: "/platform" } satisfies CtaLink,
    },
    "equipment-intelligence": {
      slug: "equipment-intelligence",
      path: "/solutions/equipment-intelligence",
      eyebrow: "Plant efficiency",
      title: "Prescriptive equipment intelligence",
      description:
        "The stack that finds energy waste also flags equipment issues early — with owners and evidence, not a vibration dashboard to ignore.",
      problem: {
        title: "Energy drift often arrives first",
        body: "Odd load shapes, rising specific energy, and idle patterns appear before a trip. Without a shared prescription, maintenance and utilities talk past each other.",
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
      rxExample: {
        id: "chiller-drift",
        title: "Example prescription",
        what: "Inspect chiller approach temperature drift on Bank B before the next peak shift; hold setpoint changes until cleared.",
        who: "Utilities · maintenance",
        impact:
          "Indicative only: avoid compounding HVAC kWh and process risk. Plant-specific; not a guaranteed outcome.",
        evidence: "Tag trend vs baseline; closed when inspection is logged.",
      },
      primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
      secondaryCta: { label: "See the Platform loop", href: "/platform" } satisfies CtaLink,
    },
  } satisfies Record<SolutionPillarSlug, SolutionPillarPage>,
};

export function getSolutionPillar(slug: SolutionPillarSlug): SolutionPillarPage {
  return solutionsContent.pillars[slug];
}
