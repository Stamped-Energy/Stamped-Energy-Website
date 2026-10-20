import type { CtaLink, IndustryFaqItem } from "./types";

/**
 * "What we improve" copy. Source: Stamped copy v3 (3 Oct 2026), section 5.
 * Area framing revised in ADR-038 (control improvement, live quality alerts, plant context, prescriptive maintenance).
 * Four areas, always presented together, with energy counted inside all four.
 * Example cards use [placeholders] by design; they are labelled "Example" on the site.
 */

export type SolutionAreaSlug = "process" | "quality" | "planning" | "maintenance";

export type SolutionExampleCard = {
  id: string;
  /** Role (and optional topic) the card is addressed to, e.g. "Restart, for the shift lead". */
  role: string;
  copy: string;
};

export type SolutionArea = {
  slug: SolutionAreaSlug;
  /** "coming-soon" shows a badge and hides the homepage CTA. Defaults to live. */
  status?: "live" | "coming-soon";
  href: string;
  /** Area name, e.g. "Process and control". */
  title: string;
  /** Statement heading, used as the page H1. */
  heading: string;
  /** One-sentence summary for the homepage rows (copy v3 section 9). */
  homeSummary: string;
  /** Two-sentence hero intro: the problem, then what Stamped does. */
  intro: string;
  /** "How we do it" section: general heading, technology named lightly in the body. */
  method: {
    heading: string;
    paragraph: string;
    steps: { title: string; text: string }[];
  };
  /** Optional note under the example cards. */
  note?: string;
  /** How energy is counted inside this area (energy is never a separate pillar). */
  energyNote: string;
  examples: SolutionExampleCard[];
  /** Answer-first questions for the page FAQ and FAQPage JSON-LD. Built from approved copy only. */
  faq: IndustryFaqItem[];
  heroImageSrc: string;
  heroImageAlt: string;
  heroObjectPosition?: string;
};

const PRIMARY_CTA = { label: "Book a site survey", href: "/contact" } satisfies CtaLink;
const HOW_CTA = { label: "See how it works", href: "/platform" } satisfies CtaLink;

const areas: SolutionArea[] = [
  {
    slug: "process",
    href: "/solutions/process",
    title: "Process",
    heading: "Run every process closer to its best.",
    homeSummary:
      "Better settings, control rules and restart routines for each line, tried on a model first and applied inside limits set beforehand.",
    intro:
      "Stamped learns how each machine in your process behaves from the data you already log and tries the next setting on a model before the line sees it. Once a change has proved itself, Stamped applies it on its own, inside limits set beforehand.",
    method: {
      heading: "How a change reaches your line",
      paragraph:
        "Stamped learns how each line behaves from its own history and builds a model of that line, combining the physics of the process with what past runs show. A new setting is tried on the model before it is tried on parts.",
      steps: [
        { title: "Find loss", text: "A loss already happening, named in your plant's own words." },
        {
          title: "Simulate",
          text: "The change is tried on a model of that line, and the limit that would make it a bad change is checked.",
        },
        {
          title: "Approve",
          text: "Your engineer sees the change and the record behind it, and approves it before the line is touched.",
        },
        {
          title: "Keep on",
          text: "Once it has proved itself, Stamped applies it from then on, and it becomes part of how that line runs.",
        },
      ],
    },
    examples: [
      {
        id: "best-path",
        role: "For the process engineer",
        copy: "This batch is heating up slower than your best runs of the same grade. Raising the setpoint within the agreed band brings it back on profile.",
      },
      {
        id: "trial",
        role: "Trial, for the process engineer",
        copy: "Next shift, alternate the current and proposed temperature on matched batches. If you stop the trial, the previous setting comes back.",
      },
      {
        id: "restart",
        role: "Restart, for the shift lead",
        copy: "The line has stopped, but the heater is still at full heat. A lower heat for the stop is ready, and the material will still be hot enough when the line restarts.",
      },
      {
        id: "product",
        role: "Changeover, for the shift lead",
        copy: "The next product is up. The settings from its last good run are loaded, inside the limits set for this line.",
      },
    ],
    energyNote:
      "Restarts, reheats and settings that have drifted all use energy that never ends up in a good part, so every process change shows what it does to energy per good part as well as to output and quality.",
    faq: [
      {
        id: "how",
        question: "How does Stamped improve a process?",
        answer:
          "Stamped builds a model of each line from its own history, combining the physics of the process with what past runs show. A better setting, control rule or restart routine is tried on that model first, then shown to your process engineer with the record behind it.",
      },
      {
        id: "losses",
        question: "Where do most process losses come from?",
        answer:
          "Most process losses come from a setting that has slowly drifted, a restart that night shift handles differently from day shift, or a line running faster than the next station can absorb, far more often than from a broken machine.",
      },
      {
        id: "decides",
        question: "Does Stamped change settings on the line by itself?",
        answer:
          "Yes, once your engineer has approved that kind of change, and only inside limits set beforehand. Your plant head sets the limits, every change is logged, and loads that must stay on stay with you.",
      },
      {
        id: "energy",
        question: "How is energy counted in process changes?",
        answer:
          "Restarts, reheats and settings that have drifted all use energy that never ends up in a good part, so every process change shows what it does to energy per good part as well as to output and quality.",
      },
    ],
    heroImageSrc: "/images/stock/hot-metal-worker.jpg",
    heroImageAlt: "Glowing bar held in a hot forging die",
    heroObjectPosition: "center 55%",
  },
  {
    slug: "quality",
    href: "/solutions/quality",
    title: "Quality",
    heading: "Catch the bad batch while it can still be saved.",
    homeSummary:
      "Link process data to every lot, get a warning while a batch can still be saved, and have each lot's record ready when the auditor or the customer asks.",
    intro:
      "Stamped watches every run against what good parts looked like and warns your team while the batch can still be fixed. When a reject does happen, it traces it back to its cause with the record behind it.",
    method: {
      heading: "How Stamped catches it early",
      paragraph:
        "Every lot carries its own process record, gathered from the machines and registers it passed through. Models trained on your past rejections score each batch as it moves, and where there is a written limit, the check is a plain yes or no.",
      steps: [
        { title: "Link", text: "Process data is joined to each lot and batch as it moves through the plant." },
        { title: "Watch", text: "Each batch is compared with the runs that passed, where the data is connected." },
        {
          title: "Act",
          text: "The person who can save the batch gets the warning and the evidence, and a drifting setting can be corrected inside limits set beforehand.",
        },
      ],
    },
    note: "Where a check is against a written limit, the card gives a clear yes or no, and where it is a prediction, the card shows how confident the model is.",
    examples: [
      {
        id: "drift",
        role: "Alert, for the shift lead",
        copy: "This batch is drifting towards the conditions seen before past out-of-spec lots. Check the trend before the next stage.",
      },
      {
        id: "lab",
        role: "For the lab",
        copy: "The estimated band for this lot is moving towards the upper limit. Estimated, not measured, so take a sample early.",
      },
      {
        id: "inspector",
        role: "For the inspector",
        copy: "Check the parts from this morning's first hour: they were made after a long stop, and parts made that way were rejected more often last quarter.",
      },
      {
        id: "quality-head",
        role: "For the quality head",
        copy: "Every process record for the lot in this morning's customer complaint is gathered in one place, ready for the 8D and the audit file.",
      },
    ],
    energyNote:
      "A rejected part has already used all the energy of a good one, so every rejection avoided is energy that goes into a part you can ship.",
    faq: [
      {
        id: "how",
        question: "How does Stamped help reduce rejections?",
        answer:
          "Stamped links process data to each lot and batch and learns which conditions came before past rejections. Where live data is connected, it watches each batch as it moves and warns the right person while there is still time to act, so the batch is saved instead of sorted afterwards.",
      },
      {
        id: "alerts",
        question: "What kind of warnings does the team get?",
        answer:
          "For example, a batch drifting toward the conditions seen before past rejections, or a sensor that has stopped moving. Where a check is against a written limit, the card gives a clear yes or no, and where it is a prediction, the card shows how confident the model is.",
      },
      {
        id: "correct",
        question: "Can Stamped correct a batch on its own?",
        answer:
          "Where a process setting is the cause, yes, inside limits set beforehand. Holding and releasing lots stays with your quality team.",
      },
      {
        id: "audit",
        question: "Does Stamped help with audits and customer complaints?",
        answer:
          "Yes. Process data is linked to every lot, so each lot's record is ready when the auditor or the customer asks, for example for an 8D on a customer complaint.",
      },
    ],
    heroImageSrc: "/images/stock/caliper-inspection.jpg",
    heroImageAlt: "Inspector checking a machined part with a caliper",
  },
  {
    slug: "planning",
    href: "/solutions/planning",
    title: "Planning",
    heading: "Plan around how your plant really runs.",
    homeSummary:
      "When the plan breaks, get a re-plan that accounts for the whole plant, along with what each option would do to output and delivery.",
    intro:
      "Plans break in almost every shift, because a changeover ran long or material arrived late. Stamped reads what each line is actually doing and warns your planner when the plan is about to slip, with a better order of work ready to accept.",
    method: {
      heading: "How Stamped re-plans",
      paragraph:
        "Stamped keeps a picture of the plant from the records it already writes: which machines are running, down or waiting, what material is on hand, which dispatches are due and when maintenance is booked. When something changes, it compares workable orders of work against those constraints and ranks them. Changes to dispatch order and promise dates stay with your planner.",
      steps: [
        { title: "Track", text: "The state of machines, material and dispatch, read from your own records." },
        { title: "Compare", text: "Workable orders of work are scored for output and delivery, with energy counted in both." },
        { title: "Choose", text: "The planner picks, with the trade-offs of each option in front of them." },
      ],
    },
    examples: [
      {
        id: "stop",
        role: "For the planner",
        copy: "Line 2 is down. A workable sequence for the rest of the shift is ready for you to accept.",
      },
      {
        id: "clean-down",
        role: "For the planner",
        copy: "Running these two allergen-free batches back to back saves one full wash-down this shift.",
      },
      {
        id: "night",
        role: "For the planner",
        copy: "Tomorrow's forecast load leaves room to run the long job on the night shift.",
      },
      {
        id: "group",
        role: "For the production lead",
        copy: "Run these lots back to back by temperature this shift, so the furnace does not heat up and cool down between them.",
      },
    ],
    energyNote:
      "Grouping similar work, filling loads and timing heat-up to the moment the next job is ready keep machines from running hot and empty, and tariff windows are weighed as one input to the plan.",
    faq: [
      {
        id: "breaks",
        question: "What does Stamped do when the production plan breaks?",
        answer:
          "When something changes, such as a changeover running long, a machine tripping or material arriving late, Stamped proposes the order of work that suits the plant as a whole and shows what each option would do to output and delivery.",
      },
      {
        id: "tracks",
        question: "What does Stamped keep track of to re-plan?",
        answer:
          "Which machines are running, down or waiting, what material is on hand, which dispatches are due and when maintenance is booked.",
      },
      {
        id: "decides",
        question: "Who makes the final scheduling decision?",
        answer:
          "The planner. Stamped ranks the options with the trade-offs of each in front of them, and promise dates, customer priority and dispatch order stay with the planner.",
      },
      {
        id: "energy",
        question: "How does planning affect energy use?",
        answer:
          "Grouping similar work, filling loads and timing heat-up to the moment the next job is ready keep machines from running hot and empty, and tariff windows are weighed as one input to the plan.",
      },
    ],
    heroImageSrc: "/images/stock/factory-floor-crates.jpg",
    heroImageAlt: "Machining shop aisle with parts waiting in crates",
    heroObjectPosition: "center 45%",
  },
  {
    slug: "maintenance",
    status: "coming-soon",
    href: "/solutions/maintenance",
    title: "Maintenance",
    heading: "Know which machine is starting to wear before it stops.",
    homeSummary:
      "We are building this next: maintenance that says what to fix and when, ranked by what each stop costs and planned around your production.",
    intro:
      "We are building this next. Stamped will watch how each machine behaves from run to run and tell your team when one starts to drift, while there is still time to plan the fix around production.",
    method: {
      heading: "How it will work",
      paragraph:
        "Stamped will watch energy per good unit and machine signals for the slow drift that usually comes before a failure, and say what it sees and how sure it is.",
      steps: [],
    },
    examples: [],
    energyNote:
      "Energy per good unit creeping up on the same job is often the first sign of a fault, so energy drift will be one of the signals maintenance hears about.",
    faq: [
      {
        id: "when",
        question: "Is maintenance available yet?",
        answer:
          "Not yet. We are building it next. It will rank stops by what they cost, flag machines starting to drift and suggest the best window for the fix, planned around production.",
      },
    ],
    heroImageSrc: "/images/stock/control-panel-gauges.jpg",
    heroImageAlt: "Electrical panel locked out for maintenance",
    heroObjectPosition: "center 40%",
  },
];

export const solutionsContent = {
  hub: {
    eyebrow: "What we improve",
    title: "Agents for every part of the plant.",
    description:
      "Stamped models your processes and equipment from the data you already log, then its agents find the change that cuts the loss in process, quality and planning, inside limits set beforehand. Maintenance is coming next.",
    heroImageSrc: "/images/stock/factory-hall.jpg",
    heroImageAlt: "Wide factory hall with work cells and utilities",
    primaryCta: PRIMARY_CTA,
    secondaryCta: HOW_CTA,
    areaCtaLabel: "Learn more",
  },

  areas,

  energy: {
    eyebrow: "Energy and load",
    heading: "Energy follows every operating decision.",
    intro:
      "A reheat or an hour of a furnace sitting hot and empty uses energy that never ends up in a good part. Because most of the saving comes from running the plant better, Stamped counts energy inside every action described above and measures it against your own baseline, with tariff windows and demand peaks treated as one input among many. On the utilities side it looks at compressors, air, steam and cooling, and moves load away from demand peaks where the plan allows. Less energy in every good part is also the most practical step toward decarbonisation, and for plants electrifying process heat, Stamped counts electricity per good part the same way.",
    examples: [
      {
        id: "idle-furnace",
        role: "For the shift lead",
        copy: "Furnace 2 has been idle and hot for [N] hours with no load due before the shift change, so it can be set back now.",
      },
      {
        id: "stagger",
        role: "For the electrical lead",
        copy: "Three furnaces and the compressors are due to start together, so starting Furnace 3 a little later keeps the demand peak down without moving any charge.",
      },
      {
        id: "air-leak",
        role: "For maintenance",
        copy: "The air leak on Line B is worth inspecting now, and the card closes once the feeder draw drops.",
      },
    ] satisfies SolutionExampleCard[],
  },

  examplesLabel: "Example actions",
  comingSoonLabel: "Coming soon",
  examplesNote: "Illustrative. Written from the kind of records a plant already keeps, with no real figures.",
  primaryCta: PRIMARY_CTA,
  secondaryCta: HOW_CTA,
};

export function getSolutionArea(slug: SolutionAreaSlug): SolutionArea {
  const area = solutionsContent.areas.find((item) => item.slug === slug);
  if (!area) {
    throw new Error(`Unknown solution area: ${slug}`);
  }
  return area;
}
