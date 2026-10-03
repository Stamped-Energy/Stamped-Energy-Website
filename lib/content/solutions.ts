import type { CtaLink } from "./types";

/**
 * "What we improve" copy. Source: Stamped copy v3 (3 Oct 2026), section 5.
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
  /** Intro paragraph (copy v3 section 5). */
  intro: string;
  /** Optional note under the example cards. */
  note?: string;
  /** How energy is counted inside this area (energy is never a separate pillar). */
  energyNote: string;
  examples: SolutionExampleCard[];
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
    heading: "Run every shift like your best one.",
    homeSummary:
      "Run every shift like your best one, with settings, control rules, restart routines and pacing recommended to your engineers.",
    intro:
      "Most process losses come from a setting that has slowly drifted, a restart that night shift handles differently from day shift, or a line running faster than the next station can absorb, far more often than from a broken machine. Stamped learns what your best runs looked like and what tends to go wrong before a poor one, then recommends a specific change to your process engineer, who can accept it, adjust it or turn it down.",
    examples: [
      {
        id: "restart",
        role: "Restart, for the shift lead",
        copy: "Keep the heater warm during stops shorter than [N] minutes, starting from A shift, because last month's restarts sent [N] parts out of window.",
      },
      {
        id: "control",
        role: "Control, for the process engineer",
        copy: "The heater aim has drifted by about [N]°C over [N] weeks, so a new aim with a small drift correction is ready for review before a step test.",
      },
      {
        id: "best-run",
        role: "Best run, for the plant head",
        copy: "Line [2] had its best week in [month], and today's settings differ from that week on [N] parameters, which are listed in the comparison.",
      },
      {
        id: "warm-up",
        role: "Die casting, for the cell lead",
        copy: "Castings from the first [N] shots after a die change on cell [4] failed leak test more often last month, so a longer warm-up before releasing parts is ready for your review.",
      },
    ],
    energyNote:
      "Restarts, reheats and settings that have drifted all use energy that never ends up in a good part, so every process recommendation shows what it does to energy per good part as well as to output and quality.",
    heroImageSrc: "/industries/forging.jpg",
    heroImageAlt: "Forging press line on a plant floor",
    heroObjectPosition: "center 40%",
  },
  {
    slug: "quality",
    href: "/solutions/quality",
    title: "Quality and lot checks",
    heading: "Know which batch is at risk before it becomes a rejection.",
    homeSummary:
      "Know which batch is at risk before it becomes a rejection, and have each lot's record ready when the auditor or the customer asks.",
    intro:
      "By the time a part fails inspection, the cause is usually hours or days old: a part that went in cold, a transfer that took too long, or a quench that started late. Stamped links process data to each lot and batch, learns which conditions came before past rejections, and flags any batch made under similar conditions while it is still in the plant, so the inspector can decide what to do with it.",
    note: "Where a check is against a written limit, the card gives a clear yes or no, and where it is a prediction, the card shows how confident the model is.",
    examples: [
      {
        id: "inspector",
        role: "For the inspector",
        copy: "Bin [14] was made after a [9]-minute stop with the die below temperature, and bins made that way were rejected more often last quarter, so it is worth checking before it moves on.",
      },
      {
        id: "ht-lead",
        role: "For the heat-treatment lead",
        copy: "Basket [B-07] reached ageing [N] minutes after quench against a written limit of [N], and its full record is attached for the audit file.",
      },
      {
        id: "quality-head",
        role: "For the quality head",
        copy: "Here is every process record for lot [N], gathered in one place for the 8D on the customer complaint that came in this morning.",
      },
    ],
    energyNote:
      "A part rejected after heat treatment or machining has already used all the energy of a good one, so every rejection avoided is energy that goes into a part you can ship.",
    heroImageSrc: "/industries/heat-treatment.webp",
    heroImageAlt: "Heat treatment furnace in operation",
  },
  {
    slug: "planning",
    href: "/solutions/planning",
    title: "Planning and scheduling",
    heading: "When the plan breaks, have the next one ready.",
    homeSummary:
      "When the plan breaks, have the next one ready, along with what each option would do to output and delivery.",
    intro:
      "Plans break in almost every shift, whether because a die change ran long, a furnace tripped or material arrived late. Stamped proposes the next sequence and shows what each option would do to output, energy and delivery, so the planner can choose with the trade-offs in front of them.",
    examples: [
      {
        id: "planner",
        role: "For the planner",
        copy: "Press [3] will be down for about [N] hours, and the proposed re-plan keeps [N] of today's [N] dispatches on time if it is confirmed by [time].",
      },
      {
        id: "ht-lead",
        role: "For the heat-treatment lead",
        copy: "Running these [N] lots back to back by temperature would save the furnace from heating up and cooling down between them.",
      },
      {
        id: "consolidate",
        role: "Loading, for the heat-treatment lead",
        copy: "The next basket on Furnace [2] is well below a normal load, and a lot on the same recipe is ready by [time], so the two can run together without mixing grades.",
      },
      {
        id: "handoff",
        role: "Handoff, for the production lead",
        copy: "Forged parts for lot [N] waited about [N] minutes for the furnace on most days last week, so moving the furnace start to match the forge schedule is ready for your review.",
      },
    ],
    energyNote:
      "Grouping lots by temperature, filling furnace loads and timing heat-up to the moment the next charge is ready keep furnaces from sitting hot and empty, and tariff windows are weighed as one input to the plan.",
    heroImageSrc: "/industries/die-casting.jpeg",
    heroImageAlt: "Molten metal pour on a casting line",
    heroObjectPosition: "center 35%",
  },
  {
    slug: "maintenance",
    href: "/solutions/maintenance",
    title: "Maintenance",
    heading: "Fix what costs you the most, before it stops the line.",
    homeSummary:
      "Find out which stops cost you the most and fix them before they halt the line.",
    intro:
      "The stop log already shows where the hours go, but it rarely says which stops matter most. Stamped ranks them by the output and time they cost, and it picks up the slow drift that usually comes before a failure, such as a furnace burning more gas for the same load or a compressor running a little longer every week. It tells maintenance what it is seeing and how sure it is, and is equally open about what it cannot see, for example bearing wear on a machine that has no vibration sensor.",
    examples: [
      {
        id: "biggest-loss",
        role: "For the maintenance lead",
        copy: "Press [2] lost [N] hours last month to [stop reason], which makes it the biggest single loss on the line.",
      },
      {
        id: "gas-drift",
        role: "For the maintenance lead",
        copy: "Gas per kilo on Furnace [1] has crept up by [N]% on the same recipe over [N] weeks, so the burners and door seals are worth checking.",
      },
      {
        id: "micro-stop",
        role: "For the setter",
        copy: "The repeating micro-stop on [machine] looks like a clamping issue, and the card can be closed once the machine runs cleanly.",
      },
      {
        id: "tool-life",
        role: "For the tool room",
        copy: "Tool [T12] on [machine] is lasting about [N] parts fewer than its last [N] tools on the same part, so the insert and the coolant are worth checking before it shows up as first-off rejections.",
      },
    ],
    energyNote:
      "A furnace burning more gas for the same load or a compressor running a little longer every week is often the first sign of a fault, so energy drift is one of the signals maintenance hears about.",
    heroImageSrc: "/industries/rubber-moulding.jpg",
    heroImageAlt: "Moulding presses on a plant floor",
  },
];

export const solutionsContent = {
  hub: {
    eyebrow: "What we improve",
    title: "Across the plant, not one machine.",
    description:
      "Stamped uses machine learning and AI on the data your plant already records to find where efficiency is lost across process, quality, planning and maintenance, and improves it with actions your team can take.",
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
