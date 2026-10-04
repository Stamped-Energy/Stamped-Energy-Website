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
    title: "Process and control",
    heading: "Run better than your best shift.",
    homeSummary:
      "Improve your control policies instead of only repeating your best runs, with better settings, control rules and restart routines recommended to your engineers.",
    intro:
      "Most process losses come from a setting that has slowly drifted, a restart night shift handles differently, or a line running faster than the next station can absorb. Stamped finds better settings, control rules and restart routines for each line and recommends them to your process engineer.",
    method: {
      heading: "How Stamped improves control",
      paragraph:
        "Stamped learns how each line behaves from its own history and builds a working model of it, a digital twin, so a new control rule is tried on the model before it is tried on parts. Learning-based control then searches for rules that hold the aim better than today's, and each result your team confirms makes the next recommendation better.",
      steps: [
        { title: "Learn the line", text: "Settings, restarts and outcomes, from the line's own history." },
        {
          title: "Try it on the model first",
          text: "Candidate settings and control rules are tested before anything changes on the floor.",
        },
        {
          title: "Recommend, then check",
          text: "Your engineer accepts, adjusts or turns it down, and the result is checked against your baseline.",
        },
      ],
    },
    examples: [
      {
        id: "restart",
        role: "Restart, for the shift lead",
        copy: "Keep the heater warm through stops shorter than [N] minutes from A shift today, because last month's cold restarts sent [N] parts out of window.",
      },
      {
        id: "control",
        role: "Control, for the process engineer",
        copy: "The heater aim has drifted by about [N]°C over [N] weeks, so a corrected aim is ready for your review before the next step test.",
      },
      {
        id: "control-policy",
        role: "Control rule, for the process engineer",
        copy: "A revised heater rule, tested on the line's model, holds the aim within [N]°C through stops where today's rule overshoots, so it is ready for a step test on Line [2].",
      },
      {
        id: "warm-up",
        role: "Die change, for the cell lead",
        copy: "Run [N] warm-up shots on cell [4] before releasing parts after the next die change, because the first shots after a change failed leak test more often last month.",
      },
    ],
    energyNote:
      "Restarts, reheats and settings that have drifted all use energy that never ends up in a good part, so every process recommendation shows what it does to energy per good part as well as to output and quality.",
    faq: [
      {
        id: "how",
        question: "How does Stamped improve process control?",
        answer:
          "Stamped builds a digital twin of each line from its own history and uses mathematical models of the process, reinforcement learning and machine learning to test better control policies before anything changes on the floor. It then recommends the improved setting, control rule or restart routine to your process engineer.",
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
          "No. Stamped recommends and your team decides. Your process engineer can accept a recommendation, adjust it or turn it down, and new control policies are tested on the digital twin first.",
      },
      {
        id: "energy",
        question: "How is energy counted in process recommendations?",
        answer:
          "Restarts, reheats and settings that have drifted all use energy that never ends up in a good part, so every process recommendation shows what it does to energy per good part as well as to output and quality.",
      },
    ],
    heroImageSrc: "/industries/forging.jpg",
    heroImageAlt: "Forging press line on a plant floor",
    heroObjectPosition: "center 40%",
  },
  {
    slug: "quality",
    href: "/solutions/quality",
    title: "Quality and lot checks",
    heading: "Catch the problem while the lot can still be saved.",
    homeSummary:
      "Link process data to every lot, get an alert while a lot can still be saved, and have each lot's record ready when the auditor or the customer asks.",
    intro:
      "By the time a part fails inspection, the cause is usually hours or days old: a part that went in cold, a transfer that took too long, or a quench that started late. Stamped links process data to every lot and alerts the right person while the lot can still be saved.",
    method: {
      heading: "How Stamped catches it early",
      paragraph:
        "Every lot carries its own process record, gathered from the machines, furnaces and registers it passed through. Models trained on your past rejections score each lot as it moves, and where there is a written limit, the check is a plain yes or no.",
      steps: [
        { title: "Link", text: "Process data is joined to each lot and batch as it moves through the plant." },
        {
          title: "Watch",
          text: "Live where data is connected, such as ageing time, quench temperature and die temperature.",
        },
        {
          title: "Act",
          text: "An alert goes to the person who can save the lot, risky batches are flagged for the inspector, and the record is ready for the audit.",
        },
      ],
    },
    note: "Where a check is against a written limit, the card gives a clear yes or no, and where it is a prediction, the card shows how confident the model is.",
    examples: [
      {
        id: "ageing-alert",
        role: "Live alert, for the heat-treatment lead",
        copy: "Basket [B-07] is [N] minutes past its written ageing limit, so pull it now to keep the lot within spec.",
      },
      {
        id: "quench-alert",
        role: "Live alert, for the shift lead",
        copy: "Quench water on Line [2] is [N]°C above its band, so hold the next charge until it is back in range.",
      },
      {
        id: "inspector",
        role: "For the inspector",
        copy: "Check bin [14] before it moves on: it was made after a [9]-minute stop with the die below temperature, and bins made that way were rejected more often last quarter.",
      },
      {
        id: "quality-head",
        role: "For the quality head",
        copy: "Every process record for lot [N] is gathered in one place for this morning's customer complaint, ready for the 8D and the audit file.",
      },
    ],
    energyNote:
      "A part rejected after heat treatment or machining has already used all the energy of a good one, so every rejection avoided is energy that goes into a part you can ship.",
    faq: [
      {
        id: "how",
        question: "How does Stamped help reduce rejections?",
        answer:
          "Stamped links process data to each lot and batch and learns which conditions came before past rejections. Where live data is connected, it watches each lot as it moves and alerts the right person while there is still time to act, so the lot is saved instead of sorted afterwards.",
      },
      {
        id: "alerts",
        question: "What kind of alerts does the team get?",
        answer:
          "For example, an alert when a basket has stayed in ageing too long or the quench water has drifted out of its temperature band. Where a check is against a written limit, the card gives a clear yes or no, and where it is a prediction, the card shows how confident the model is.",
      },
      {
        id: "made",
        question: "What happens to batches already made under risky conditions?",
        answer:
          "Batches already made under risky conditions are flagged while they are still in the plant, so the inspector can decide what to do with them.",
      },
      {
        id: "audit",
        question: "Does Stamped help with audits and customer complaints?",
        answer:
          "Yes. Process data is linked to every lot, so each lot's record is ready when the auditor or the customer asks, for example for an 8D on a customer complaint.",
      },
    ],
    heroImageSrc: "/industries/heat-treatment.webp",
    heroImageAlt: "Heat treatment furnace in operation",
  },
  {
    slug: "planning",
    href: "/solutions/planning",
    title: "Planning and scheduling",
    heading: "Re-plan with the whole plant in view.",
    homeSummary:
      "When the plan breaks, get a re-plan that accounts for the whole plant, along with what each option would do to output and delivery.",
    intro:
      "Plans break in almost every shift, because a die change ran long, a furnace tripped or material arrived late. Stamped proposes the re-plan that works best for the whole plant and shows what each option does to output, energy and delivery.",
    method: {
      heading: "How Stamped re-plans",
      paragraph:
        "Stamped keeps a live picture of the plant: which machines are running, down or waiting, what each furnace is holding, what material is on hand, which dispatches are due and when maintenance is booked. When something changes, it compares possible sequences against those constraints and ranks them. Stamped recommends and your team decides.",
      steps: [
        { title: "Track", text: "The live state of machines, furnaces, material and dispatch." },
        { title: "Compare", text: "Possible sequences are scored for output, energy and delivery." },
        { title: "Choose", text: "The planner picks, with the trade-offs of each option in front of them." },
      ],
    },
    examples: [
      {
        id: "planner",
        role: "For the planner",
        copy: "Press [3] will be down for about [N] hours. Confirm the proposed re-plan by [time] and [N] of today's [N] dispatches stay on time.",
      },
      {
        id: "ht-lead",
        role: "For the heat-treatment lead",
        copy: "Run these [N] lots back to back by temperature this shift, so the furnace does not heat up and cool down between them.",
      },
      {
        id: "consolidate",
        role: "Loading, for the heat-treatment lead",
        copy: "Hold the next basket on Furnace [2] until [time]: it is well below a normal load, and a lot on the same recipe can join it without mixing grades.",
      },
      {
        id: "handoff",
        role: "Handoff, for the production lead",
        copy: "Forged parts for lot [N] waited about [N] minutes for the furnace on most days last week, so a furnace start matched to the forge schedule is ready for your review.",
      },
    ],
    energyNote:
      "Grouping lots by temperature, filling furnace loads and timing heat-up to the moment the next charge is ready keep furnaces from sitting hot and empty, and tariff windows are weighed as one input to the plan.",
    faq: [
      {
        id: "breaks",
        question: "What does Stamped do when the production plan breaks?",
        answer:
          "When something changes, such as a die change running long, a furnace tripping or material arriving late, Stamped proposes the sequence that works best for the plant as a whole and shows what each option would do to output, energy and delivery.",
      },
      {
        id: "tracks",
        question: "What does Stamped keep track of to re-plan?",
        answer:
          "Which machines are running, down or waiting, what each furnace is holding, what material is on hand, which dispatches are due and when maintenance is booked.",
      },
      {
        id: "decides",
        question: "Who makes the final scheduling decision?",
        answer:
          "The planner. Stamped recommends and your team decides, so the planner chooses with the trade-offs of each option in front of them.",
      },
      {
        id: "energy",
        question: "How does planning affect energy use?",
        answer:
          "Grouping lots by temperature, filling furnace loads and timing heat-up to the moment the next charge is ready keep furnaces from sitting hot and empty, and tariff windows are weighed as one input to the plan.",
      },
    ],
    heroImageSrc: "/industries/die-casting.jpeg",
    heroImageAlt: "Molten metal pour on a casting line",
    heroObjectPosition: "center 35%",
  },
  {
    slug: "maintenance",
    href: "/solutions/maintenance",
    title: "Maintenance",
    heading: "Prescriptive maintenance, planned around production.",
    homeSummary:
      "Prescriptive maintenance that says what to fix and when, ranked by what each stop costs and planned around your production.",
    intro:
      "The stop log shows where the hours go, but rarely which stops matter most or when to fix them. Stamped ranks stops by what they cost and prescribes the fix and the best window to make it, planned around production.",
    method: {
      heading: "How Stamped plans the fix",
      paragraph:
        "Stamped watches specific energy consumption and machine signals for the slow drift that usually comes before a failure, such as a furnace burning more gas per kilo on the same recipe. It says what it is seeing and how sure it is, and is equally open about what it cannot see, such as bearing wear on a machine with no vibration sensor.",
      steps: [
        { title: "Rank", text: "Stops are ranked by the output and time they cost." },
        { title: "Watch the drift", text: "Energy per unit and machine signals, against each machine's own normal." },
        { title: "Plan the window", text: "The fix is slotted where it moves no charge or dispatch." },
      ],
    },
    examples: [
      {
        id: "biggest-loss",
        role: "For the maintenance lead",
        copy: "Press [2] lost [N] hours last month to [stop reason], the biggest single loss on the line, so it is first on this week's list.",
      },
      {
        id: "gas-drift",
        role: "For the maintenance lead",
        copy: "Check the burners and door seals on Furnace [1]: gas per kilo has crept up on the same recipe over [N] weeks.",
      },
      {
        id: "window",
        role: "Planned window, for the maintenance lead",
        copy: "Do the burner check on Furnace [1] in the [N]-hour gap before [day]'s grade change, so no charge has to move.",
      },
      {
        id: "tool-life",
        role: "For the tool room",
        copy: "Check the insert and coolant on [machine] before the next batch: tool [T12] is lasting about [N] parts fewer than its last [N] tools on the same part.",
      },
    ],
    energyNote:
      "Specific energy consumption, such as gas per kilo or power per tonne, creeping up on the same recipe is often the first sign of a fault, so energy drift is one of the signals maintenance hears about.",
    faq: [
      {
        id: "what",
        question: "What does prescriptive maintenance mean in Stamped?",
        answer:
          "Stamped ranks stops by the output and time they cost and watches for the slow drift that usually comes before a failure. Because it knows the production plan, dispatch commitments and other constraints, it prescribes the fix and the best window to make it instead of only raising an alarm.",
      },
      {
        id: "signs",
        question: "What early warning signs does Stamped watch?",
        answer:
          "Specific energy consumption and other slow drift, such as a furnace burning more gas per kilo on the same recipe or a compressor running a little longer every week.",
      },
      {
        id: "rank",
        question: "How does Stamped decide which stops matter most?",
        answer:
          "The stop log already shows where the hours go, but it rarely says which stops matter most or when to fix them. Stamped ranks stops by the output and time they cost.",
      },
      {
        id: "blind",
        question: "What if a machine has no sensor for a fault?",
        answer:
          "Stamped tells maintenance what it is seeing and how sure it is, and is equally open about what it cannot see, for example bearing wear on a machine that has no vibration sensor.",
      },
    ],
    heroImageSrc: "/industries/rubber-moulding.jpg",
    heroImageAlt: "Moulding presses on a plant floor",
  },
];

export const solutionsContent = {
  hub: {
    eyebrow: "What we improve",
    title: "Across the plant, not one machine.",
    description:
      "Stamped learns how your plant runs from the data it already records, then improves control, catches quality problems while the lot can still be saved, re-plans with the whole plant in view and plans maintenance around production, with actions your team can take.",
    heroImageSrc: "/industries/forging.jpg",
    heroImageAlt: "Forging press line on a plant floor",
    primaryCta: PRIMARY_CTA,
    secondaryCta: HOW_CTA,
    areaCtaLabel: "Learn more",
  },

  areas,

  energy: {
    eyebrow: "Energy",
    heading: "Energy follows every operating decision.",
    intro:
      "A reheat or an hour of a furnace sitting hot and empty uses energy that never ends up in a good part. Because most of the saving comes from running the plant better, Stamped counts energy inside every action described above and measures it against your own baseline, with tariff windows and demand peaks treated as one input among many.",
    examples: [
      {
        id: "idle-furnace",
        role: "For the shift lead",
        copy: "Furnace [2] has been idle and hot for [N] hours with the next load due at [time], so it can be set back now.",
      },
      {
        id: "stagger",
        role: "For the electrical lead",
        copy: "Three furnaces and the compressors are due to start together at [time], so starting Furnace [3] [N] minutes later keeps the demand peak down without moving any charge.",
      },
      {
        id: "air-leak",
        role: "For maintenance",
        copy: "The air leak on Line B is worth inspecting now, and the card closes once the feeder draw drops.",
      },
    ] satisfies SolutionExampleCard[],
  },

  examplesLabel: "Example actions",
  examplesNote: "Numbers in [brackets] are placeholders. Your pilot writes these from your own plant data.",
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
