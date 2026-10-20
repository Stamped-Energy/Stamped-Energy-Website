import { PRICING_ANSWER } from "./engagement";
import type { CtaLink, HomeFaqItem, HomeProblemPoint, IndustryItem } from "./types";

/**
 * Homepage copy. Source: Stamped copy v3 (3 Oct 2026), section 9 "Full homepage, top to bottom".
 * Rules: STAMPED_COPY_GUIDE.md (approved lines word for word, method wording by placement per
 * copy v3 section 1, no hard-stop lists, no unbacked % or rupee figures).
 */

export type HomeImpactItem = {
  id: string;
  /** Bold lead-in, ends with a comma so it reads into the detail. */
  title: string;
  detail: string;
};

export type HomeActionCard = {
  id: string;
  area: string;
  role: string;
  copy: string;
};

export const landingContent = {
  hero: {
    badge: "Industrial AI",
    headline: "From monitoring your plant to improving it.",
    supportingLine:
      "Stamped models your processes and equipment from the data you already log, then its AI agents learn from that model to watch every run, find where output, quality and energy are being lost, and recommend the change that fixes it, inside limits set beforehand.",
    primaryCta: { label: "Book a site survey", href: "/contact" } satisfies CtaLink,
    secondaryCta: { label: "See how it works", href: "#hiw" } satisfies CtaLink,
    actionPanel: {
      title: "Example actions",
      subtitle: "Every action says who should act, by when, and why.",
    },
    /** Ticker cards, labelled "Example actions". Bracketed values are placeholders by design (copy v3). */
    actionCards: [
      {
        id: "inspector",
        area: "Quality",
        role: "For the inspector",
        copy: "Bin 14 was made after a long stop with the die running cold, so check it before heat treatment.",
      },
      {
        id: "shift-lead",
        area: "Process",
        role: "For the shift lead",
        copy: "Keep the heater warm during stops shorter than 10 minutes, starting from A shift.",
      },
      {
        id: "planner",
        area: "Planning",
        role: "For the planner",
        copy: "Press 3 is down for about 3 hours, and a re-plan is ready for your review.",
      },
      {
        id: "maintenance-lead",
        area: "Maintenance",
        role: "For the maintenance lead",
        copy: "Gas per kilo on Furnace 1 is creeping up on the same recipe, so check the burners and door seals.",
      },
      {
        id: "ht-heatup",
        area: "Energy",
        role: "For the heat-treatment lead",
        copy: "Furnace 2 is hot, but the next charge is not ready for another 2 hours, so heat-up can start later.",
      },
      {
        id: "ht-load",
        area: "Planning",
        role: "For the heat-treatment lead",
        copy: "The next basket is well below a normal load, and a lot on the same recipe is ready to join it.",
      },
      {
        id: "process-engineer",
        area: "Process",
        role: "For the process engineer",
        copy: "The heater aim has drifted, and a new aim is ready for your review.",
      },
      {
        id: "setter",
        area: "Maintenance",
        role: "For the setter",
        copy: "The repeating micro-stop looks like a clamping issue, so close the card once the machine runs cleanly.",
      },
    ] satisfies HomeActionCard[],
    /** Short, true reassurance points shown under the hero CTAs. */
    features: [
      { id: "systems", title: "Nothing new to install to start" },
      { id: "actions", title: "Actions reach your team on WhatsApp or on screen" },
    ],
  },

  homeProblem: {
    badge: "Problem",
    title: "Every plant has data. Very few turn it into action.",
    items: [
      {
        id: "priorities",
        title: "Data is abundant. Clear priorities are not.",
        description:
          "The signals are already sitting in your machines, control systems, meters and registers, but turning them into a clear next action takes more time than anyone on the floor has.",
      },
      {
        id: "dashboards",
        title: "Dashboards tell you what happened.",
        description:
          "When rejections go up, the dashboard shows the number, but it rarely tells you whether the cause was the night-shift restarts, a die running cold or a batch that waited too long for heat treatment, and working that out is the hard part.",
      },
      {
        id: "after-the-decision",
        title: "The loss shows up after the decision.",
        description:
          "Choices like running harder, delaying maintenance or changing the sequence all affect output, quality and cost, yet the rejection, the breakdown or the extra energy tends to surface days later, when it is too late to rethink the call.",
      },
    ] satisfies HomeProblemPoint[],
  },

  whatIs: {
    badge: "What Stamped does",
    title: "Fewer rejections, more output, less energy in every good part.",
    /** Homepage cut of the approved outcomes-and-how text (ADR-036). Full version: platform.ts. The last item renders as the kicker. */
    paragraphs: [
      "Stamped helps plants cut rejections, get more output from the lines they already have, and use less energy in every good part. It brings data from separate systems into one view, builds a model of how your plant actually runs and turns hidden losses into specific actions for the person who can fix them. It is a self-improving agentic system, so it gets better with every result.",
      "Stamped works inside limits set beforehand, and every change is checked against your own baseline.",
    ],
    motionSlotLabel: "Product visual",
  },

  /** Three-step capability ladder (plan PR #16, section 15.3, item 4). Rendered by HomeLadder after HomeWhatIs. */
  ladder: {
    badge: "Three steps",
    title: "From watching your plant to running it better.",
    authorityLine: "Stamped works inside limits set beforehand.",
    steps: [
      {
        id: "monitoring",
        step: 1,
        label: "Monitoring",
        title: "See every process as it runs.",
        description: "A live model of your plant spots drift while there is still time to act.",
      },
      {
        id: "decision",
        step: 2,
        label: "Decision making",
        title: "The next best move, with its evidence.",
        description:
          "Every recommendation is tested on the model first, and the result is measured in your own numbers.",
      },
      {
        id: "execution",
        step: 3,
        label: "Autonomous execution",
        title: "Proven changes, run on their own.",
        description:
          "Once a kind of change has already worked on your line, Stamped can run it on its own, always inside limits set beforehand.",
      },
    ],
    /** Labels inside the pipeline visual. No numbers by design. */
    visual: {
      sources: ["Machine logs", "Quality records", "Production plan"],
      modelLabel: "Plant model",
      driftLabel: "Drift spotted",
      card: {
        title: "Recommendation",
        rows: [
          { label: "What changed", text: "This run is drifting away from your best runs." },
          { label: "Suggested move", text: "Bring the setting back to where the best runs held it." },
          { label: "Evidence", text: "Matched past runs from this line." },
        ],
        check: "Tested on the model",
      },
      bandLabel: "Limits set beforehand",
      appliedLabel: "Change applied",
      logLine: "Inside limits · logged",
    },
  },

  /**
   * Optional agents strip (plan PR #16, section 15.5, Layout B). Set `enabled: false` to drop it from the homepage.
   * Status is "First pilot scope" only: nothing is live or in pilot yet.
   */
  agents: {
    enabled: true,
    badge: "Agents",
    title: "Agents that keep working when your team goes home.",
    statusLabel: "First pilot scope",
    cards: [
      {
        id: "records",
        name: "Reads your scattered records",
        text: "Brings controller data, historian tags, ERP lots and handwritten cards into one record for every batch.",
      },
      {
        id: "worst-lot",
        name: "Replays your worst lot",
        text: "Links a recent bad lot end to end from your own records, so your team sees what the signals showed before it went wrong.",
      },
      {
        id: "warnings",
        name: "Warns while there is time",
        text: "Watches one line and warns your team when a batch drifts toward a known problem.",
      },
      {
        id: "sensors",
        name: "Checks your sensors first",
        text: "Flags a sensor that has gone dead or stuck before its readings mislead anyone.",
      },
      {
        id: "reject-cost",
        name: "Counts what a reject really cost",
        text: "Shows the energy and material lost in parts that never ship, next to your rejections.",
      },
    ],
    moreLine:
      "And more on the way: answers with sources, shift handovers, overnight work, quality before the lab, better standards and proof in your own numbers.",
  },

  homeHowItWorks: {
    badge: "How it works",
    title: "From plant data to operator actions.",
    /** Scroll-pinned steps; order matches hiwStageVisuals. */
    steps: [
      {
        id: "data",
        step: 1,
        label: "Data",
        title: "Connects to what you already run.",
        description:
          "Stamped works with the systems your plant already runs.",
        bullets: ["Machines, control systems and meters", "ERP plans and quality records"],
      },
      {
        id: "models",
        step: 2,
        label: "Models",
        title: "Learns what normal looks like.",
        description:
          "Models trained on your plant's own history learn how it runs, where its control can improve and which conditions come before a rejection, a stoppage or wasted energy.",
        bullets: ["Compared with your own plant, not an industry average", "Patterns across shifts, lines and lots"],
      },
      {
        id: "actions",
        step: 3,
        label: "Actions",
        title: "Sends the action to the right person.",
        description:
          "On WhatsApp or on screen, ranked by what it is costing you and explained well enough to judge.",
        bullets: ["Who should act, by when, and why", "Rupee-ranked, so the biggest loss comes first"],
      },
      {
        id: "results",
        step: 4,
        label: "Results",
        title: "Checks what actually worked.",
        description:
          "Every change is measured against your own baseline, and the models retrain on what it shows, so Stamped keeps getting better.",
        bullets: ["Every change visible to your team", "Catch it early if a gain starts to slip"],
      },
    ],
  },

  impact: {
    badge: "Impact",
    title: "What changes in the plant.",
    items: [
      {
        id: "rejections",
        title: "Fewer rejections reach the customer,",
        detail: "because lots at risk are caught in real time, while they can still be saved.",
      },
      {
        id: "output",
        title: "More output from the same lines,",
        detail: "with bottlenecks, idle time and restarts found and fixed, and control improved beyond your best runs.",
      },
      {
        id: "breakdowns",
        title: "Fewer surprise breakdowns,",
        detail: "since slow drift shows up in data you already collect.",
      },
      {
        id: "energy",
        title: "Less energy for every good part,",
        detail: "once idle heat, reheats and scrap are counted and brought down.",
      },
    ] satisfies HomeImpactItem[],
    footnote:
      "Results are measured against your own baseline and published only with your permission.",
  },

  solutionsSection: {
    badge: "What we improve",
    title: "Across the plant, not one machine.",
    footnote: "Energy is counted in all four.",
    ctaLabel: "Learn more",
    comingSoonLabel: "Coming soon",
  },

  resourcesSection: {
    badge: "Resources",
    title: "Notes from the plant floor.",
    viewAllLabel: "View all",
    viewAllHref: "/case-studies",
  },

  industries: {
    badge: "Industries",
    eyebrow: "Industries",
    title: "Different plants, the same four places to improve.",
    description:
      "A forge, a melt shop and a kiln look nothing alike, but each one loses efficiency in process, quality, planning and maintenance. Stamped learns the signals that matter in each plant from its own history.",
    cta: { label: "See all industries", href: "/industries" } satisfies CtaLink,
    moreLabel: "The same four areas apply in",
    more: [
      { label: "Pharma", href: "/industries/pharma" },
      { label: "Chemicals", href: "/industries/chemical" },
    ] satisfies CtaLink[],
    items: [
      {
        id: "automotive",
        name: "Auto components",
        focus: "Forging, heat treatment and machining: rejections, audits and on-time delivery.",
        description: "Forging, heat treatment and machining: rejections, audits and on-time delivery.",
        href: "/industries/automotive",
        imageSrc: "/industries/forging.jpg",
        imageAlt: "Forging press line on an auto-component plant floor",
      },
      {
        id: "steel",
        name: "Steel",
        focus: "Power per tonne, heat chemistry, yield and cobbles.",
        description: "Power per tonne, heat chemistry, yield and cobbles.",
        href: "/industries/steel",
        imageSrc: "/industries/steel.png",
        imageAlt: "Hot steel billets on a rolling mill line",
      },
      {
        id: "cement",
        name: "Cement",
        focus: "Kiln stability, free lime, and heat and power per tonne.",
        description: "Kiln stability, free lime, and heat and power per tonne.",
        href: "/industries/cement",
        imageSrc: "/industries/cement.png",
        imageAlt: "Cement plant with silos and kiln at twilight",
      },
    ] satisfies IndustryItem[],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Questions plant leaders ask",
    items: [
      {
        id: "what-is-stamped",
        question: "What does Stamped do?",
        answer:
          "Stamped connects to the systems already in your plant and learns how it actually runs. It finds where efficiency is lost across process, quality, planning and maintenance, improves control, alerts your team in real time while a lot can still be saved, and sends ranked actions to the people who can act on them, then checks the results against your own baseline.",
      },
      {
        id: "hardware",
        question: "Do we need new hardware, or another system next to MES, ERP and SCADA?",
        answer:
          "No hardware retrofit is needed to get started, because Stamped is software that works with the systems you already run. It is not another MES or CMMS: your MES, ERP and SCADA are where the data comes from, and Stamped works alongside them. Stamped brings their data onto one timeline, so they finally work as one picture of the plant.",
      },
      {
        id: "ai-agent",
        question: "Is Stamped an AI agent for manufacturing?",
        answer:
          "In plain terms, yes. Stamped's AI agents for manufacturing read your plant's data on every shift, spot what is costing you output or quality, and send the right person a specific next step. That is industrial intelligence put to work in decision-making at the plant-floor level.",
      },
      {
        id: "supervisors",
        question: "Who decides what changes, and what does Stamped add if my supervisors already know the plant?",
        answer:
          "Stamped works inside limits set beforehand. Your senior supervisors usually know the plant well, and Stamped is built to back them up: it looks at every line on every shift, including the shifts they are not on, and writes down what it finds with the reasoning, so the night shift gets the same advice the day shift gets from your best hands.",
      },
      {
        id: "gets-better",
        question: "Does Stamped get better over time?",
        answer:
          "Yes. Stamped is a self-improving agentic system. It learns from every action your team accepts, adjusts or turns down, and from the ones it chose to hold back, and its models are retrained on your plant's data as it runs. Each improvement is tested on past shifts before your team approves it, so the advice gets sharper every week.",
      },
      {
        id: "data",
        question: "Where does our data go?",
        answer:
          "We sign an NDA before the site survey, and during the survey and the pilot we work only with the data your team agrees to share.",
      },
      {
        id: "reach-the-floor",
        question: "How do actions reach the floor, and how much of my team's time does this take?",
        answer:
          "Each action goes on WhatsApp or on screen to the supervisor, engineer or maintenance lead who already owns that work, so nobody has to learn a new system before they can act on one, and nothing sits on a screen that only the plant head opens once a month. During the site survey we need some hours with your plant head and your quality and maintenance leads, planned around production.",
      },
      {
        id: "start",
        question: "How do we start?",
        answer:
          "We start with a site survey, which means a few days on your floor and a written read-out of where efficiency is being lost and what we would change first. If it makes sense, that is followed by a paid pilot on one line for eight to twelve weeks.",
      },
      {
        id: "cost",
        question: "What does it cost?",
        answer: PRICING_ANSWER,
      },
      {
        id: "paper-records",
        question: "Some of our records are still on paper or in Excel. Can we start?",
        answer:
          "Yes. Most plants keep some registers on paper or in Excel, and the site survey tells you plainly whether what you already record is enough to start on one line, and what would be worth recording if it is not.",
      },
    ] satisfies HomeFaqItem[],
  },

  closingCta: {
    title: "Every batch should make the next one better.",
    description:
      "Spend a few days with us on your floor, and we'll give you a written read-out of where efficiency is being lost and what we would do first.",
    primaryCta: { label: "Book a site survey", href: "/contact" } satisfies CtaLink,
    whatsappLabel: "WhatsApp us",
    /** Shown when no WhatsApp link is configured. */
    secondaryCta: { label: "See how it works", href: "/platform" } satisfies CtaLink,
  },
} as const;
