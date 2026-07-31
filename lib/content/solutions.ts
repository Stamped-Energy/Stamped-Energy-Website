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
    title: "One product. Two outcomes your plant can run.",
    description:
      "Stamped Intelligence is a single stack for energy-intensive plants in India: load and energy-efficiency prescriptions, plus early equipment warnings — assigned owners, rupee impact, verified with evidence.",
    primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
    secondaryCta: { label: "See the Platform", href: "/platform" } satisfies CtaLink,
    pillars: [
      {
        slug: "load-energy",
        href: "/solutions/load-energy",
        title: "Load management and energy efficiency",
        shortTitle: "Energy savings",
        description:
          "Maximum demand, shift-start overlap, idle loads, HVAC, and tariff windows — prescriptions your electrical and ops teams can execute.",
        outcome: "Lower bill line items without a hardware retrofit.",
      },
      {
        slug: "equipment-intelligence",
        href: "/solutions/equipment-intelligence",
        title: "Prescriptive equipment intelligence",
        shortTitle: "Plant efficiency",
        description:
          "Early warnings tied to energy and process context — so maintenance acts before trips and waste compound.",
        outcome: "Fewer surprise failures; same evidence trail as energy Rx.",
      },
    ] satisfies SolutionPillarSummary[],
    sharedNote:
      "Shared plant context (orders, departments) informs schedule-type actions. Stamped is not your MES.",
  },

  pillars: {
    "load-energy": {
      slug: "load-energy",
      path: "/solutions/load-energy",
      eyebrow: "Pillar 1 · Energy savings",
      title: "Load management and energy-efficiency prescriptions",
      description:
        "Turn incomer, sub-meter, SCADA, and bill signals into ranked actions: what to change, who owns it, and monthly rupee impact — verified with evidence.",
      problem: {
        title: "The gap is not more meters",
        body: "Most plants already see demand spikes and high SEC after the fact. What is missing is an assigned next action before the next billing window closes.",
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
        body: "Potential vs realised impact tracked in an ops-cleared ledger. DISCOM bill confirmation can follow when the period closes — it is not the only proof story.",
      },
      rxExample: {
        id: "md-stagger",
        title: "Example prescription",
        what: "Stagger compressor and furnace restarts after the lunch break by at least 12 minutes.",
        who: "Shift supervisor · utilities",
        impact: "Indicative: lower MD charge exposure in the peak window (plant-specific; not a guaranteed outcome).",
        evidence: "Baseline demand curve vs post-action window; ledger entry when cleared.",
      },
      primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
      secondaryCta: { label: "See the Platform loop", href: "/platform" } satisfies CtaLink,
    },
    "equipment-intelligence": {
      slug: "equipment-intelligence",
      path: "/solutions/equipment-intelligence",
      eyebrow: "Pillar 2 · Plant efficiency",
      title: "Prescriptive equipment intelligence",
      description:
        "The same stack that finds energy waste flags equipment issues early — with owners and evidence, not another vibration dashboard to ignore.",
      problem: {
        title: "Energy and health share the same signals",
        body: "Rising specific energy, odd load shapes, and idle patterns often appear before a trip. Without a prescription, maintenance and utilities talk past each other.",
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
        body: "Findings stay tied to the energy graph and cleared outcomes. Not a claim of full CMMS or vibration PdM replacement.",
      },
      rxExample: {
        id: "chiller-drift",
        title: "Example prescription",
        what: "Inspect chiller approach temperature drift on Bank B before the next peak shift; hold setpoint change until cleared.",
        who: "Utilities · maintenance",
        impact: "Indicative: avoid compounding HVAC kWh and risk of comfort/process trip (plant-specific).",
        evidence: "Tag trend vs baseline; closed when inspection logged.",
      },
      primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
      secondaryCta: { label: "See the Platform loop", href: "/platform" } satisfies CtaLink,
    },
  } satisfies Record<SolutionPillarSlug, SolutionPillarPage>,
};

export function getSolutionPillar(slug: SolutionPillarSlug): SolutionPillarPage {
  return solutionsContent.pillars[slug];
}
