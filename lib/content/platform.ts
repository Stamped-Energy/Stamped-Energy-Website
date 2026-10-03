import { ENGAGEMENT_STEPS } from "./engagement";
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
      "Stamped builds models of your plant from the data it already records, finds where efficiency is lost across process, quality, planning and maintenance, and improves it with actions your team can take.",
    primaryCta: { label: "Book a site survey", href: "/contact" } satisfies CtaLink,
    secondaryCta: { label: "What we improve", href: "/solutions" } satisfies CtaLink,
  },

  /** Approved long outcomes-and-how text (Vinayak, 3 Oct 2026). Word for word. */
  whatWeDo: {
    eyebrow: "What we do",
    title: "What Stamped achieves, and how.",
    paragraphs: [
      "Stamped helps manufacturing plants run more efficiently, which in practice means fewer rejections, more output from the lines and shifts you already have, and less energy and material going into every good part. We measure all of it against your own plant's baseline, in the units your team already tracks, so nobody has to take our word for it.",
      "Most plants already record far more than they use. The machines, the control systems, the meters, the ERP and the quality registers each hold a piece of the picture, but they sit in separate places and rarely get looked at together. Stamped brings that data into one view and models it to understand how your plant actually runs, where efficiency is quietly being lost, and what tends to change in the hours before a loss shows up.",
      "That understanding is only useful if someone acts on it, so Stamped turns it into specific actions and sends each one to the person who can do something about it. It might be a setting that has drifted over a few weeks, a batch that looks a lot like the ones that were rejected last month, or a plan that needs to change because a machine went down mid-shift. Each comes with what to do, by when, and the reasoning behind it.",
      "Stamped recommends and your team decides. Once a change is made, we check whether it actually worked and feed that back into the next recommendation, and if a gain starts slipping a month later, it shows up in the numbers and goes back to the person who owns it.",
    ],
  },

  /** How it works (copy v3 section 4) with the Plant data → Models → Actions → Results diagram. */
  flow: {
    eyebrow: "The loop",
    paragraphs: [
      "Stamped connects to the systems your plant already runs, so there is nothing new to install before we start. Its models are trained on your plant's own history, so they learn what normal operation looks like in your plant and which conditions tend to come before a rejection, a stoppage or wasted energy.",
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
      "Stamped's models are trained on your own plant's history, from machine learning on its sensor and lab data to digital twins and mathematical models of its process, so normal means normal for your machines, products and shifts, and energy is counted inside each of them.",
    items: [
      {
        id: "process",
        title: "Process and control",
        description:
          "Builds a digital twin of each line and uses mathematical models of the process, reinforcement learning and machine learning to test better control policies, then recommends the improved setting, control rule or restart routine to the process engineer.",
      },
      {
        id: "quality",
        title: "Quality and lot checks",
        description:
          "Links process data to each lot and batch, learns which conditions came before past rejections, and raises a real-time alarm while a lot can still be saved, such as a basket overstaying in ageing or quench water out of its band.",
      },
      {
        id: "planning",
        title: "Planning and scheduling",
        description:
          "Keeps track of what every machine, furnace and dispatch is doing, so when a die change runs long or a furnace trips it proposes the sequence that works best for the whole plant and shows what each option would do to output, energy and delivery.",
      },
      {
        id: "maintenance",
        title: "Maintenance",
        description:
          "Prescriptive maintenance: ranks stops by what they cost, watches specific energy consumption and other drift that comes before a failure, and prescribes the fix and the best window for it given production constraints, saying plainly when a machine has no sensor that would show the problem.",
      },
    ],
  } satisfies PlatformProseSection,

  capabilities: {
    eyebrow: "Under the hood",
    title: "What happens to your data before an action reaches the floor",
    description:
      "Stamped connects to the systems already in your plant, and there is nothing new to install to start.",
    items: [
      {
        id: "ingestion",
        title: "Connect and clean up",
        description:
          "Stamped reads from your machines and control systems, meters, ERP plans, quality registers and what operators enter, then lines up the clocks, units and names, because each system usually records them differently.",
        mediaSrc: null,
        mediaAlt: "Data from plant systems flowing into Stamped",
      },
      {
        id: "repository",
        title: "One timeline for the plant",
        description:
          "Machines, lots, shifts and batches go onto one timeline, so when a lot is rejected you can see what that press, that furnace and that shift were doing at the moment it was made.",
        mediaSrc: null,
        mediaAlt: "Time-aligned plant context connecting sources",
      },
      {
        id: "intelligence",
        title: "Find the losses and rank them",
        description:
          "Stamped learns what normal looks like for your plant, notices when a line moves away from it, checks each possible fix against the day's plan, and puts the remaining options in order of what they are costing you.",
        mediaSrc: null,
        mediaAlt: "Plant-tuned models ranking feasible actions",
      },
      {
        id: "governance",
        title: "Send, follow up and check",
        description:
          "Each action goes to its owner and stays open until it is closed, and the result is compared with your own baseline, with every acceptance, change and result kept on record.",
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
    title: "Start with one line, and decide on the annual price after the pilot.",
    description:
      "We start with a site survey, which is a few days on your floor followed by a written read-out of where you're losing efficiency and what we would do first. You only commit to the next step once you have seen it.",
    phases: ENGAGEMENT_STEPS.map((step) => ({
      id: step.id,
      week: step.label,
      title: step.title,
      description: step.description,
    })) satisfies HiwDeploymentPhase[],
  },
} as const;

/** @deprecated Prefer platformContent */
export const howItWorksContent = platformContent;
