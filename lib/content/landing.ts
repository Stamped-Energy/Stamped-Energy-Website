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
    badge: "AI for plant operations",
    headline: "From monitoring your plant to improving it.",
    headlineLine1: "From monitoring your plant",
    headlineLine2: "to improving it.",
    supportingLine:
      "Stamped builds models of your plant from the data it already records, finds where efficiency is lost across process, quality, planning and maintenance, and improves it with actions your team can take.",
    primaryCta: { label: "Book a site survey", href: "/contact" } satisfies CtaLink,
    secondaryCta: { label: "See how it works", href: "#hiw" } satisfies CtaLink,
    actionPanel: {
      title: "Example actions",
      subtitle: "Every action says who should act, by when, and why.",
      badge: "Example",
    },
    /** Ticker cards, labelled "Example actions". Bracketed values are placeholders by design (copy v3). */
    actionCards: [
      {
        id: "inspector",
        area: "Quality",
        role: "For the inspector",
        copy: "Bin [14] was made after a [9]-minute stop with the die running cold, so check it before heat treatment.",
      },
      {
        id: "shift-lead",
        area: "Process",
        role: "For the shift lead",
        copy: "Keep the heater warm during stops shorter than [N] minutes, starting from A shift.",
      },
      {
        id: "planner",
        area: "Planning",
        role: "For the planner",
        copy: "Press [3] is down for about [N] hours, and a re-plan is ready for review by [time].",
      },
      {
        id: "maintenance-lead",
        area: "Maintenance",
        role: "For the maintenance lead",
        copy: "Gas per kilo on Furnace [1] is creeping up on the same recipe, so check the burners and door seals.",
      },
      {
        id: "ht-heatup",
        area: "Energy",
        role: "For the heat-treatment lead",
        copy: "Furnace [2] is hot with no charge ready until [time], so heat-up can start later.",
      },
      {
        id: "ht-load",
        area: "Planning",
        role: "For the heat-treatment lead",
        copy: "The next basket is well below a normal load, and a lot on the same recipe is ready by [time].",
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
      { id: "first-finding", title: "First finding usually within about two weeks" },
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
    title: "Turn plant data into action.",
    /** Homepage cut of the approved outcomes-and-how text (ADR-036). Full version: platform.ts. The last item renders as the kicker. */
    paragraphs: [
      "Stamped helps plants cut rejections, get more output from the lines they already have, and use less energy in every good part. It brings data from separate systems into one view, builds a model of how your plant actually runs and turns hidden losses into specific actions for the person who can fix them.",
      "Stamped recommends and your team decides, and every change is checked against your own baseline.",
    ],
    motionSlotLabel: "Product visual",
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
          "Stamped works with the systems your plant already runs, so there is nothing new to install before we start.",
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
          "Your team decides. Every change is measured against your own baseline, and each result improves the next recommendation.",
        bullets: ["Accept, adjust or decline every action", "Catch it early if a gain starts to slip"],
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
        detail: "with control, restarts and pacing improved beyond your best runs.",
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
      "The first finding usually comes within about two weeks. Results are measured against your own baseline and published only with your permission.",
  },

  solutionsSection: {
    badge: "What we improve",
    title: "Across the plant, not one machine.",
    footnote: "Energy is counted in all four.",
    ctaLabel: "Learn more",
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
    title: "Built for auto-component makers first.",
    description:
      "We are starting with forging, heat-treatment and machining plants that supply OEMs, where a single rejection can cost far more than the part itself.",
    cta: { label: "Explore auto components", href: "/industries/automotive" } satisfies CtaLink,
    allCta: { label: "See all industries", href: "/industries" } satisfies CtaLink,
    moreLabel: "The same four areas apply in",
    more: [
      { label: "Die casting", href: "/industries/automotive#die-casting" },
      { label: "Rubber moulding", href: "/industries/automotive#rubber-moulding" },
      { label: "Steel", href: "/industries/steel" },
      { label: "Cement", href: "/industries/cement" },
      { label: "Pharma", href: "/industries/pharma" },
      { label: "Chemicals", href: "/industries/chemical" },
    ] satisfies CtaLink[],
    items: [
      {
        id: "automotive",
        name: "Auto components",
        focus: "Rejections, customer complaints, audits and on-time delivery.",
        description: "Rejections, customer complaints, audits and on-time delivery.",
        href: "/industries/automotive",
        imageSrc: "/industries/die-casting.jpeg",
        imageAlt: "Auto component plant floor",
      },
      {
        id: "forging",
        name: "Forging",
        focus: "Billet temperature, restarts, die temperature and press pacing.",
        description: "Billet temperature, restarts, die temperature and press pacing.",
        href: "/industries/automotive#forging",
        imageSrc: "/industries/forging.jpg",
        imageAlt: "Forging press line",
      },
      {
        id: "heat-treatment",
        name: "Heat treatment",
        focus: "Quench and ageing, furnace loading and idle hours.",
        description: "Quench and ageing, furnace loading and idle hours.",
        href: "/industries/automotive#heat-treatment",
        imageSrc: "/industries/heat-treatment.webp",
        imageAlt: "Heat treatment furnace in operation",
      },
      {
        id: "precision-machining",
        name: "Precision machining",
        focus: "Tool life, first-off rejection and setups.",
        description: "Tool life, first-off rejection and setups.",
        href: "/industries/automotive#precision-machining",
        imageSrc: "/blog/cnc-energy-decomposition.jpg",
        imageAlt: "CNC machining cell",
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
          "No hardware retrofit is needed to get started, because Stamped is software that works with the systems you already run. It is not another MES or CMMS: your MES, ERP and SCADA are where the data comes from, and Stamped works alongside them.",
      },
      {
        id: "supervisors",
        question: "Who decides what changes, and what does Stamped add if my supervisors already know the plant?",
        answer:
          "Stamped recommends and your team decides. Your senior supervisors usually know the plant well, and Stamped is built to back them up: it looks at every line on every shift, including the shifts they are not on, and writes down what it finds with the reasoning, so the night shift gets the same advice the day shift gets from your best hands.",
      },
      {
        id: "data",
        question: "Where does our data go?",
        answer:
          "We sign an NDA before the site survey, and during the survey and the pilot we work only with the data your team agrees to share. You can ask us anything about where it is kept and who can see it before anything is connected.",
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
          "We start with a site survey, which means a few days on your floor and a written read-out of where efficiency is being lost and what we would change first. If it makes sense, that is followed by a paid pilot on one line for eight to twelve weeks, and the first finding usually comes within about two weeks.",
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
    title: "Turn plant data into action.",
    description:
      "Spend a few days with us on your floor, and we'll give you a written read-out of where efficiency is being lost and what we would do first.",
    smallLine: "There is nothing new to install to start, and Stamped recommends and your team decides.",
    primaryCta: { label: "Book a site survey", href: "/contact" } satisfies CtaLink,
    whatsappLabel: "WhatsApp us",
    /** Shown when no WhatsApp link is configured. */
    secondaryCta: { label: "See how it works", href: "/platform" } satisfies CtaLink,
  },
} as const;
