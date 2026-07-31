import type {
  CtaLink,
  HiwCapability,
  HiwDeploymentPhase,
  HiwJourneyStep,
  HiwMediaSlot,
  HiwSldNode,
  HiwStackLayer,
  PrescriptionEmbedConfig,
} from "./types";
import { getBeforeAfterScenario } from "./scenarios";

const pharmaBeforeAfter = getBeforeAfterScenario();

export const platformContent = {
  hero: {
    eyebrow: "Platform",
    title: "Stamped Intelligence on your plant stack",
    description:
      "Most plants already have meters and SCADA. The gap is analysis, root cause, and assigned fixes. Stamped monitors plant signals, detects waste and equipment issues, and guides operations on what to resolve — verified with evidence, then improved from followed vs ignored prescriptions.",
    primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
    secondaryCta: { label: "Back to home", href: "/" } satisfies CtaLink,
  },

  plantSld: {
    title: "Your plant energy graph",
    hint: "Hover or tap a node",
    nodes: [
      {
        id: "incomer",
        label: "Incomer meter",
        tooltip: "MD kVA, demand windows, tariff periods.",
        x: 50,
        y: 10,
        kind: "source",
      },
      {
        id: "scada",
        label: "SCADA / DCS",
        tooltip: "Historian tags and process states.",
        x: 14,
        y: 26,
        kind: "source",
      },
      {
        id: "plc",
        label: "PLCs & CNCs",
        tooltip: "Run states and cycle times.",
        x: 14,
        y: 46,
        kind: "source",
      },
      {
        id: "meters",
        label: "Sub-meters",
        tooltip: "Section kWh and demand.",
        x: 14,
        y: 66,
        kind: "source",
      },
      {
        id: "bill",
        label: "Utility bill",
        tooltip: "Tariff, MD charges, TOU windows.",
        x: 14,
        y: 84,
        kind: "source",
      },
      {
        id: "stamped",
        label: "Stamped graph",
        tooltip: "Time-aligned consumption, production, and cost.",
        x: 50,
        y: 50,
        kind: "hub",
      },
      {
        id: "compressor",
        label: "Compressors",
        tooltip: "Shift-start spikes and idle hours.",
        x: 86,
        y: 26,
        kind: "load",
      },
      {
        id: "press",
        label: "Press lines",
        tooltip: "Startup patterns vs. production.",
        x: 86,
        y: 46,
        kind: "load",
      },
      {
        id: "furnace",
        label: "Furnaces / ovens",
        tooltip: "Setback gaps and holding losses.",
        x: 86,
        y: 66,
        kind: "load",
      },
    ] satisfies HiwSldNode[],
  },

  capabilities: {
    eyebrow: "Core capabilities",
    title: "Signals → verified outcomes",
    description:
      "Four platform layers - from universal ingestion through closed-loop governance - sized for SME manufacturers.",
    items: [
      {
        id: "ingestion",
        title: "Universal ingestion",
        description:
          "Captures signals from meters, SCADA, PLCs, and utility bills into a continuous, real-time pipeline - without hardware retrofits or changes to your control systems.",
        mediaSrc: null,
        mediaAlt: "Data streams from plant systems flowing into Stamped",
      },
      {
        id: "repository",
        title: "Unified energy graph",
        description:
          "Organises disparate streams into a time-aligned graph that connects consumption, production, and cost for accurate analytics across your plant.",
        mediaSrc: null,
        mediaAlt: "Unified energy graph connecting sources and loads",
      },
      {
        id: "intelligence",
        title: "Contextual intelligence",
        description:
          "Domain-specific models detect anomalies, quantify impact in rupees, and generate prescriptions your plant team can act on - not another passive dashboard.",
        mediaSrc: null,
        mediaAlt: "Anomaly detection and prescription generation",
      },
      {
        id: "governance",
        title: "Closed-loop governance",
        description:
          "Assigns actions, tracks execution via WhatsApp and dashboard, and verifies potential vs. realized savings so every opportunity converts into measurable value.",
        mediaSrc: null,
        mediaAlt: "Closed-loop action tracking and savings verification",
      },
    ] satisfies HiwCapability[],
  },

  journey: {
    eyebrow: "The operating loop",
    title: "Six steps. Same loop every month.",
    steps: [
      {
        id: "connect",
        step: 1,
        title: "Connect",
        tagline: "Start with meter + bill",
        description: "",
        bullets: ["Incomer first", "Modbus · OPC-UA · MQTT"],
        diagram: "connect",
      },
      {
        id: "observe",
        step: 2,
        title: "Observe",
        tagline: "Baselines that know your shifts",
        description: "",
        bullets: ["SEC by batch & shift", "Tariff-aware MD detection"],
        diagram: "observe",
      },
      {
        id: "decide",
        step: 3,
        title: "Decide",
        tagline: "Prescriptions in rupees",
        description: "",
        bullets: ["What · why · who · ₹", "Ranked by monthly impact"],
        diagram: "decide",
      },
      {
        id: "execute",
        step: 4,
        title: "Execute",
        tagline: "WhatsApp to the floor",
        description: "",
        bullets: ["Supervisor notification", "Open → done tracking"],
        diagram: "execute",
      },
      {
        id: "verify",
        step: 5,
        title: "Verify",
        tagline: "Evidence before the next cycle",
        description: "",
        bullets: ["Potential vs realised ₹", "Ops-cleared ledger"],
        diagram: "verify",
      },
      {
        id: "improve",
        step: 6,
        title: "Improve",
        tagline: "Calibrate from followed vs ignored",
        description: "",
        bullets: ["Rank and threshold refresh", "Plant preferences, human-gated"],
        diagram: "improve",
      },
    ] satisfies HiwJourneyStep[],
  },

  intelligenceStack: {
    eyebrow: "End to end",
    title: "From plant data to verified savings",
    layers: [
      {
        id: "connect",
        title: "Connect your plant",
        subtitle: "1 · Monitor",
        items: ["Existing meters, SCADA & bills", "Compressors, furnaces, presses"],
      },
      {
        id: "analyze",
        title: "Watch for deviations",
        subtitle: "2 · Analyze",
        items: ["Shift and batch-aware baselines", "MD spikes tied to assets"],
      },
      {
        id: "prescribe",
        title: "Prescribe in rupees",
        subtitle: "3 · Prescribe",
        items: ["Root cause, owner & monthly ₹", "Ranked for your team"],
      },
      {
        id: "verify",
        title: "Execute and verify",
        subtitle: "4 · Track",
        items: ["WhatsApp + floor workflow", "Verified savings ledger"],
      },
    ] satisfies HiwStackLayer[],
  },

  prescriptionDemo: {
    eyebrow: "Example output",
    title: "What a prescription looks like on your plant",
    embed: {
      iframeSrc: null,
      videoSrc: null,
      iframeTitle: "Stamped Energy prescription example",
      placeholderTitle: "",
      placeholderDescription: "",
    } satisfies PrescriptionEmbedConfig,
  },

  beforeAfter: {
    eyebrow: "The shift",
    title: "Before Stamped vs after the first billing cycle",
    before: {
      title: "Before",
      items: [
        "Bill shock, no asset-level explanation",
        "SCADA here, bill there, PLC somewhere else",
        "“Shift-start is bad”, no ₹ figure",
        "Fixes discussed, never verified",
      ],
    },
    after: {
      title: "After Stamped",
      items: [
        pharmaBeforeAfter.afterHighlight,
        "One timeline: production, kW, tariff cost",
        pharmaBeforeAfter.afterPrescription,
        "Verified saving on next DISCOM bill",
      ],
    },
  },

  deployment: {
    eyebrow: "Deployment path",
    title: "First prescriptions in two weeks, not two quarters",
    phases: [
      {
        id: "week-1-2",
        week: "Week 1-2",
        title: "Meter + bill live",
        description: "Baselines and first MD / tariff prescriptions.",
      },
      {
        id: "week-3-4",
        week: "Week 3-4",
        title: "First assigned actions",
        description: "Supervisor tasks on WhatsApp. Execution tracked.",
      },
      {
        id: "month-2",
        week: "Month 2",
        title: "Deepen integration",
        description: "SCADA / PLC where available. SEC by process.",
      },
      {
        id: "month-3",
        week: "Month 3+",
        title: "Verified ₹ ledger",
        description: "M&V complete. Numbers for plant head and CFO.",
      },
    ] satisfies HiwDeploymentPhase[],
  },

  gifSlots: [] as HiwMediaSlot[],

  finalCta: {
    eyebrow: "Next step",
    title: "Walk through your meter setup and last three bills",
    description: "We estimate addressable waste and outline a pilot, only if the numbers justify it.",
    primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
  },
} as const;

/** @deprecated Prefer platformContent */
export const howItWorksContent = platformContent;
