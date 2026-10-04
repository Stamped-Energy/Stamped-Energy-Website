import { ENGAGEMENT_STEPS } from "./engagement";
import type {
  CtaLink,
  HiwCapability,
  HiwDeploymentPhase,
  IndustryFaqItem,
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
      "Stamped helps manufacturing plants run more efficiently: fewer rejections, more output from the lines and shifts you already have, and less energy and material going into every good part. We measure all of it against your own plant's baseline, in the units your team already tracks, so nobody has to take our word for it.",
      "Most plants already record far more than they use. The machines, control systems, meters, ERP and quality registers each hold a piece of the picture, but they sit in separate places and rarely get looked at together. Stamped brings that data into one view and models it to understand how your plant actually runs and where efficiency is quietly being lost.",
      "Stamped then turns that understanding into specific actions and sends each one to the person who can act on it, whether it is a setting that has drifted over a few weeks, a batch that looks like last month's rejections, or a plan that needs to change because a machine went down mid-shift. Stamped recommends and your team decides. Once a change is made, we check whether it worked, and if a gain starts slipping later, it goes back to the person who owns it.",
    ],
  },

  /** How it works (copy v3 section 4) with the Plant data → Models → Actions → Results diagram. */
  flow: {
    eyebrow: "The loop",
    title: "From plant data to a checked result, and back again.",
    description:
      "Every recommendation follows the same four steps, and each result makes the next recommendation better.",
    steps: [
      {
        id: "plant-data",
        label: "Plant data",
        description:
          "Stamped connects to the machines, control systems, meters, ERP and quality registers your plant already runs. There is nothing new to install.",
      },
      {
        id: "models",
        label: "Models",
        description:
          "Trained on your plant's own history, they learn what normal looks like and which conditions tend to come before a rejection, a stoppage or wasted energy.",
      },
      {
        id: "actions",
        label: "Actions",
        description:
          "Each goes to the person best placed to act, ranked by what it is costing you and explained well enough to judge for themselves.",
      },
      {
        id: "results",
        label: "Results",
        description: "Once your team makes a change, Stamped checks the result against your own baseline.",
      },
    ],
    feedback: "What each result shows goes back into the models, so the next recommendation is better.",
    controlLine: "Stamped recommends and your team decides.",
  },

  surfaces: {
    eyebrow: "Your working view",
    title: "One picture of the plant, a ranked list of next actions, and a place to ask.",
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
      {
        id: "ask",
        title: "Ask your plant",
        description:
          "Ask what is drifting, where good parts are being lost or who owns an action, and Stamped answers from your plant's own data, checking every number against the records before it replies.",
      },
    ],
  } satisfies PlatformProseSection,

  improve: {
    badge: "Self-improving",
    heading: "A system that gets better every week.",
    paragraph:
      "Stamped is a self-improving agentic system. It learns from every decision it sends and every one it holds back, retrains its models on your plant's data as it runs, and tests each improvement before your team approves it.",
    steps: [
      {
        title: "Learns from every decision",
        text: "What your team accepted, what worked, what held, and the actions it chose to hold back.",
      },
      {
        title: "Retrained on your data",
        text: "Line models are refitted as the plant runs, new parts learn before they recommend, and a die, coil or recipe change triggers a fresh check.",
      },
      {
        title: "Tested before it changes",
        text: "Each improvement is replayed on past shifts and run alongside the live version, then your team approves it, and it can be rolled back in one step.",
      },
      {
        title: "A record you can read",
        text: "Every lesson it keeps shows how often it helped and how often it hurt.",
      },
    ],
  },

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
      "Four steps sit between the systems your plant already runs and an action your team can take, and there is nothing new to install to start.",
    items: [
      {
        id: "ingestion",
        title: "Connect and clean up",
        description:
          "Stamped reads from your machines, control systems, meters, ERP, quality registers and what operators enter, then lines up the clocks, units and names, because each system records them its own way.",
        mediaSrc: null,
        mediaAlt: "Records from plant systems lined up to one clock and one set of names",
      },
      {
        id: "repository",
        title: "One timeline for the whole plant",
        description:
          "Machines, furnaces, lots, shifts and plans go onto one timeline. When a lot is rejected you can see what that press, that furnace and that shift were doing when it was made, and every re-plan starts from where the whole plant actually is.",
        mediaSrc: null,
        mediaAlt: "A rejected lot traced across press, furnace and shift on one timeline",
      },
      {
        id: "intelligence",
        title: "Model the plant and rank the losses",
        description:
          "Stamped builds models of each line from its own history, including digital twins where the process allows, to learn what normal looks like and spot where efficiency is lost. It also sweeps the whole plant once a shift, so it finds losses even when nothing has broken. Each possible fix is checked against the day's plan and production constraints, and what is left is ranked by what it is costing you.",
        mediaSrc: null,
        mediaAlt: "Losses checked against the plan and ranked by cost",
      },
      {
        id: "governance",
        title: "Send, follow up and check",
        description:
          "Each action goes to its owner on WhatsApp or on screen, with what to do, by when and why, and your team decides. It stays open until it is closed, the result is checked against your own baseline, and every decision and result is kept on record.",
        mediaSrc: null,
        mediaAlt: "An action moving from sent to accepted, checked and closed",
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

  /** Answer-first questions for the page FAQ and FAQPage JSON-LD. Built from approved copy only. */
  faq: [
    {
      id: "data",
      question: "What data does Stamped use?",
      answer:
        "Stamped reads from your machines, control systems, meters, ERP, quality registers and what operators enter, then lines up the clocks, units and names, because each system records them its own way.",
    },
    {
      id: "install",
      question: "Do we need to install new hardware or another system?",
      answer:
        "No hardware retrofit is needed to get started. Stamped is software that works with the systems your plant already runs, and it is not another MES or CMMS: your MES, ERP and SCADA are where the data comes from.",
    },
    {
      id: "ranked",
      question: "How does Stamped decide which actions come first?",
      answer:
        "Stamped builds models of each line from its own history to learn what normal looks like and spot where efficiency is lost. Each possible fix is checked against the day's plan and production constraints, and what is left is ranked by what it is costing you.",
    },
    {
      id: "reach",
      question: "How do actions reach the team?",
      answer:
        "Each action goes to its owner on WhatsApp or on screen, with what to do, by when and why, and your team decides. It stays open until it is closed, and every decision and result is kept on record.",
    },
    {
      id: "checked",
      question: "How do we know a change worked?",
      answer:
        "Once your team makes a change, Stamped checks the result against your own baseline. What each result shows goes back into the models, so the next recommendation is better.",
    },
  ] satisfies IndustryFaqItem[],
} as const;

/** @deprecated Prefer platformContent */
export const howItWorksContent = platformContent;
