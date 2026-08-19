import type {
  CtaLink,
  HiwCapability,
  HiwDeploymentPhase,
  HiwJourneyStep,
  PlatformProseSection,
} from "./types";

export const platformContent = {
  hero: {
    eyebrow: "Platform",
    title: "The intelligence layer on the stack you already run",
    description:
      "Turns live plant, bill, and operator context into rupee-scored prescriptions for the floor, with evidence on the action. Read-only. No hardware retrofit.",
    supportLine: "First prescriptions in weeks, from meters and bills already on site.",
    primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
    secondaryCta: { label: "View solutions", href: "/solutions" } satisfies CtaLink,
  },

  surfaces: {
    eyebrow: "Your working view",
    title: "One plant picture. Ranked next actions. Operators in control.",
    description:
      "See what is happening, decide what matters, and move the right action to the floor.",
    items: [
      {
        id: "plant-graph",
        title: "Plant graph",
        description:
          "Consumption, assets, production context, tariffs, and operator inputs on one live view. Follow a demand peak back to the loads and shifts that caused it.",
      },
      {
        id: "alarms-prescriptions",
        title: "Alarms and prescriptions",
        description:
          "Alarms show what changed. Prescriptions add what to do, who owns it, and rupee impact. Ranked, assigned on WhatsApp, with evidence on the dashboard.",
      },
      {
        id: "agents",
        title: "Agents",
        description:
          "When load, tariff, maintenance, and production conflict, agents assemble a feasible prescription. Operators accept, reject, or adjust. Chat is evidence-bound. No PLC writes.",
      },
    ],
  } satisfies PlatformProseSection,

  models: {
    eyebrow: "Plant and economic models",
    title: "Models built around the way your plant runs",
    description:
      "These models use your plant baselines and DISCOM structure to rupee-score each move. Weather, humidity, and product specifications are operating constraints inside the move, not separate products.",
    items: [
      {
        id: "energy-markets",
        title: "Energy markets",
        description:
          "Analyzes live HT tariffs, ToD windows, billing-demand floors, coincidence peaks, and kWh or kVAh billing where they apply. It identifies load flexibility before the tariff window closes or a higher MD is set.",
      },
      {
        id: "efficiency",
        title: "Efficiency",
        description:
          "Continuously identifies idle load, specific energy drift, utility waste, and equipment running outside the plant’s normal operating envelope. It separates avoidable energy from the load required to meet production.",
      },
      {
        id: "equipment",
        title: "Equipment",
        description:
          "Detects changes in power draw, duty cycle, starts, trips, and operating patterns. It relates each deviation to energy cost, equipment condition, and process risk before ranking the next check or intervention.",
      },
      {
        id: "production-context",
        title: "Production context",
        description:
          "Analyzes shift, batch, holding, utility timing, and dispatch commitments before recommending an energy move. Product specifications, storage limits, and production deadlines can block one option and force a feasible alternative.",
      },
    ],
  } satisfies PlatformProseSection,

  capabilities: {
    eyebrow: "Core capabilities",
    title: "A technical stack built for live plant decisions",
    description:
      "Stamped connects read-only to the systems and data you already have. It runs without a hardware retrofit and leaves plant control with your team.",
    items: [
      {
        id: "ingestion",
        title: "Connect and normalise",
        description:
          "Ingest meter streams, SCADA tags, bills, tariff schedules, ERP context, and operator inputs. Standardise timestamps, units, tag names, intervals, and data quality before analysis begins.",
        mediaSrc: null,
        mediaAlt: "Data streams from plant systems flowing into Stamped",
      },
      {
        id: "repository",
        title: "Context and time alignment",
        description:
          "Link assets, feeders, utilities, shifts, batches, tariffs, and operating states on a common timeline. Preserve the relationships between what changed, where it changed, and what else was running at that moment.",
        mediaSrc: null,
        mediaAlt: "Time-aligned plant context connecting sources and loads",
      },
      {
        id: "intelligence",
        title: "Decision intelligence",
        description:
          "Build plant-specific baselines, detect deviations, test operating scenarios, and apply tariff and process constraints. Estimate economic impact, reject infeasible moves, and rupee-score the options that remain.",
        mediaSrc: null,
        mediaAlt: "Plant-tuned models scoring feasible operating moves",
      },
      {
        id: "governance",
        title: "Assign, verify, improve",
        description:
          "Route an accepted action to its owner and track its status through closure. Compare expected and observed outcomes, attach supporting evidence, and retain every acceptance, rejection, adjustment, and result in the audit trail.",
        mediaSrc: null,
        mediaAlt: "Closed-loop action tracking and outcome verification",
      },
    ] satisfies HiwCapability[],
  },

  journey: {
    eyebrow: "The operating loop",
    title: "Connect to Improve",
    description: "The same operating loop runs each time plant conditions change.",
    steps: [
      {
        id: "connect",
        step: 1,
        title: "Connect",
        tagline: "",
        description:
          "Bring live plant signals, bills, tariffs, and operating context into one read-only layer.",
        bullets: [],
        diagram: "connect",
      },
      {
        id: "observe",
        step: 2,
        title: "Observe",
        tagline: "",
        description:
          "Track demand, energy use, equipment behaviour, and production state against the plant baseline.",
        bullets: [],
        diagram: "observe",
      },
      {
        id: "decide",
        step: 3,
        title: "Decide",
        tagline: "",
        description:
          "Rupee-rank feasible moves by economic impact, effort, and operating risk.",
        bullets: [],
        diagram: "decide",
      },
      {
        id: "execute",
        step: 4,
        title: "Execute",
        tagline: "",
        description: "Assign the accepted action to the person who can carry it out.",
        bullets: [],
        diagram: "execute",
      },
      {
        id: "verify",
        step: 5,
        title: "Verify",
        description:
          "Compare expected vs observed outcomes in an ops-cleared ledger.",
        tagline: "",
        bullets: [],
        diagram: "verify",
      },
      {
        id: "improve",
        step: 6,
        title: "Improve",
        tagline: "",
        description:
          "Calibrate baselines and ranking from decisions taken and outcomes verified. Human-gated.",
        bullets: [],
        diagram: "improve",
      },
    ] satisfies HiwJourneyStep[],
  },

  beforeAfter: {
    eyebrow: "The shift",
    title: "Keep what runs the plant. Add what closes the action.",
    description:
      "Stamped works with the data, systems, and operating knowledge already present at the site.",
    before: {
      title: "What you already have",
      items: [
        "Incomer meters and sub-meter data",
        "SCADA tags and historian records",
        "ERP plans, shifts, batches, and dispatch context",
        "DISCOM bills, tariffs, and demand rules",
        "SOPs and people who understand the plant",
      ],
    },
    after: {
      title: "What Stamped adds",
      items: [
        "One time-aligned view of plant and economic context",
        "Plant-specific baselines for load, efficiency, and equipment",
        "Feasible actions ranked by expected rupee impact",
        "Clear owners, effort, timing, and supporting evidence",
        "A tracked record from prescription to verified outcome",
      ],
    },
  },

  deployment: {
    eyebrow: "Time to first action",
    title: "First prescriptions in weeks",
    description: "Start with one site, using the meters and bills already available.",
    phases: [
      {
        id: "week-1-2",
        week: "Week 1-2",
        title: "Meter and bill live",
        description:
          "Connect the incomer, available sub-meters, and current DISCOM bills. Reconcile timestamps, units, tariffs, and billing demand. Establish the first live plant baseline.",
      },
      {
        id: "week-3-4",
        week: "Week 3-4",
        title: "First assigned actions",
        description:
          "Run the models against live operating conditions. Issue the first rupee-scored prescriptions with an owner, effort, timing, expected ₹ impact, and evidence. Plant teams accept, reject, or adjust each action before execution.",
      },
    ] satisfies HiwDeploymentPhase[],
  },
} as const;

/** @deprecated Prefer platformContent */
export const howItWorksContent = platformContent;
