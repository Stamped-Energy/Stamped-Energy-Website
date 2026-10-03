import type {
  CtaLink,
  HiwCapability,
  HiwDeploymentPhase,
  PlatformProseSection,
} from "./types";

/** /platform ("How it works") copy. Canon: Stamped copy v3 (3 Oct 2026), sections 3 and 4. */

export const platformContent = {
  hero: {
    eyebrow: "How it works",
    title: "From plant data to operator actions.",
    description:
      "Stamped uses machine learning and AI on the data your plant already records to find where efficiency is lost across process, quality, planning and maintenance, and improves it with actions your team can take.",
    primaryCta: { label: "Book a site survey", href: "/contact" } satisfies CtaLink,
    secondaryCta: { label: "What we improve", href: "/solutions" } satisfies CtaLink,
  },

  /** Approved long outcomes-and-how text (Vinayak, 3 Oct 2026). Word for word. */
  whatWeDo: {
    eyebrow: "What we do",
    title: "What Stamped achieves, and how.",
    paragraphs: [
      "Stamped helps manufacturing plants run more efficiently, which in practice means fewer rejections, more output from the lines and shifts you already have, and less energy and material going into every good part. We measure all of it against your own plant's baseline, in the units your team already tracks, so nobody has to take our word for it.",
      "Most plants already record far more than they use. The machines, the control systems, the meters, the ERP and the quality registers each hold a piece of the picture, but they sit in separate places and rarely get looked at together. Stamped brings that data into one view and uses machine learning and AI to understand how your plant actually runs, where efficiency is quietly being lost, and what tends to change in the hours before a loss shows up.",
      "That understanding is only useful if someone acts on it, so Stamped turns it into specific actions and sends each one to the person who can do something about it. It might be a setting that has drifted over a few weeks, a batch that looks a lot like the ones that were rejected last month, or a plan that needs to change because a machine went down mid-shift. Each comes with what to do, by when, and the reasoning behind it.",
      "Stamped recommends and your team decides. Once a change is made, we check whether it actually worked and feed that back into the next recommendation, and if a gain starts slipping a month later, it shows up in the numbers and goes back to the person who owns it.",
    ],
  },

  /** How it works (copy v3 section 4) with the Plant data → Models → Actions → Results diagram. */
  flow: {
    eyebrow: "The loop",
    paragraphs: [
      "Stamped connects to the systems your plant already runs, so there is nothing new to install before we start. Its machine learning and AI models learn what normal operation looks like in your plant and which conditions tend to come before a rejection, a stoppage or wasted energy.",
      "When something is worth acting on, Stamped sends it to the person best placed to act, ranked by what it is costing you and explained well enough that they can judge it for themselves. Once your team has made a change, Stamped checks the result against your own baseline and uses what it learns to make the next recommendation better.",
    ],
    controlLine: "Stamped recommends and your team decides.",
  },

  surfaces: {
    eyebrow: "Your working view",
    title: "You get one picture of the plant and a ranked list of next actions, and your team decides what to act on.",
    description:
      "What changed, what matters and who should act sit side by side, so the right action reaches the floor.",
    items: [
      {
        id: "plant-graph",
        title: "One picture of the plant",
        description:
          "Machines, lots, shifts, plans and meters sit on one view, so you can follow a rejection or a stoppage back to the conditions and the shift that came before it.",
      },
      {
        id: "alarms-prescriptions",
        title: "Alarms and actions",
        description:
          "Alarms show what changed. Actions add what to do, who owns it, and why, and they reach the floor on WhatsApp or on screen.",
      },
      {
        id: "agents",
        title: "Your team's answer",
        description:
          "Your team can accept a recommendation, adjust it or turn it down, and Stamped learns from each answer.",
      },
    ],
  } satisfies PlatformProseSection,

  models: {
    eyebrow: "Models",
    title: "Models built around the way your plant runs",
    description:
      "Stamped's machine learning and AI models are trained on your own plant's history, so normal means normal for your machines, products and shifts, and energy is counted inside each of them.",
    items: [
      {
        id: "process",
        title: "Process and control",
        description:
          "Learns what your best runs looked like, which settings have drifted and how restarts differ between shifts, and recommends a specific change to the process engineer.",
      },
      {
        id: "quality",
        title: "Quality and lot checks",
        description:
          "Links process data to each lot and batch, learns which conditions came before past rejections, and flags batches made under similar conditions while they are still in the plant.",
      },
      {
        id: "planning",
        title: "Planning and scheduling",
        description:
          "When a die change runs long or a furnace trips, proposes the next sequence and shows what each option would do to output, energy and delivery.",
      },
      {
        id: "maintenance",
        title: "Maintenance",
        description:
          "Ranks stops by the output and time they cost and picks up the slow drift that usually comes before a failure, while being open about what it cannot see.",
      },
    ],
  } satisfies PlatformProseSection,

  capabilities: {
    eyebrow: "Under the hood",
    title: "The technical work behind each action",
    description:
      "Stamped connects to the systems already in your plant, and there is nothing new to install to start.",
    items: [
      {
        id: "ingestion",
        title: "Connect and normalise",
        description:
          "Bring in machine and control-system tags, meter streams, ERP plans, quality registers and operator inputs, then standardise timestamps, units, tag names, intervals and data quality before any analysis begins.",
        mediaSrc: null,
        mediaAlt: "Data from plant systems flowing into Stamped",
      },
      {
        id: "repository",
        title: "Context and time alignment",
        description:
          "Link machines, lots, shifts, batches and operating states on a common timeline, so the relationships between what changed, where it changed and what else was running at that moment are kept.",
        mediaSrc: null,
        mediaAlt: "Time-aligned plant context connecting sources",
      },
      {
        id: "intelligence",
        title: "Models and ranking",
        description:
          "Build plant-specific baselines, detect deviations, test operating options against the constraints of the plan, and rank what is left by what it is costing you.",
        mediaSrc: null,
        mediaAlt: "Plant-tuned models ranking feasible actions",
      },
      {
        id: "governance",
        title: "Send, check and learn",
        description:
          "Send an accepted action to its owner, track it through to closure, compare the result with your own baseline, and keep every acceptance, adjustment and result on record.",
        mediaSrc: null,
        mediaAlt: "Action tracking and result checks",
      },
    ] satisfies HiwCapability[],
  },

  beforeAfter: {
    eyebrow: "What changes",
    title: "Keep what runs the plant, and add what turns its data into action.",
    description:
      "Stamped works alongside the data, systems and operating knowledge already in your plant.",
    before: {
      title: "What you already have",
      items: [
        "Machines and control systems that record how each run went",
        "Meters that show where energy goes",
        "ERP plans, shifts, batches and dispatch commitments",
        "Quality registers, lot records and inspection results",
        "SOPs and people who know the plant",
      ],
    },
    after: {
      title: "What Stamped adds",
      items: [
        "One view that brings that data together on a common timeline",
        "Baselines built from your own plant's history",
        "Actions ranked by what each loss is costing you",
        "A named owner and the reasoning behind every action",
        "A check against your own baseline once a change is made",
      ],
    },
  },

  deployment: {
    eyebrow: "How we start",
    title: "From a site survey to a pilot on one line",
    description:
      "We start with a site survey, which is a few days on your floor followed by a written read-out of where you're losing efficiency and what we would do first.",
    phases: [
      {
        id: "survey",
        week: "Site survey",
        title: "A few days on your floor",
        description:
          "We spend a few days on your floor with your plant head and your quality and maintenance teams, and then send you a written read-out of where efficiency is being lost and what we would change first.",
      },
      {
        id: "pilot",
        week: "8 to 12 weeks",
        title: "Paid pilot on one line",
        description:
          "If it makes sense, that leads to a paid pilot on one line for 8 to 12 weeks, with the success criteria and the annual price agreed in writing before we start. The first finding usually comes within about two weeks.",
      },
    ] satisfies HiwDeploymentPhase[],
  },
} as const;

/** @deprecated Prefer platformContent */
export const howItWorksContent = platformContent;
