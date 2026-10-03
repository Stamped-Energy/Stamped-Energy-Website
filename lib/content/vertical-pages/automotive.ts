import type { VerticalPageContent } from "../types";
import { resourcesContent } from "../resources";
import {
  AREAS_EYEBROW,
  EXAMPLE_FOOTNOTE,
  HOW_CTA,
  STANDARD_DESCRIPTION,
  SURVEY_CTA,
  homeFaq,
  sharedOutcomes,
} from "./shared";

/** Auto components (URL kept at /industries/automotive). Copy canon: Stamped copy v3 (3 Oct 2026), revision 2. */

export const automotivePage: VerticalPageContent = {
  slug: "automotive",
  hero: {
    eyebrow: "Auto components",
    title: "Fewer rejections reach your OEM.",
    description:
      "We are starting with forging, heat-treatment and machining plants that supply OEMs, where a single rejection can cost far more than the part itself, and the same approach covers the die-casting and rubber-moulding lines in that supply chain.",
    primaryCta: SURVEY_CTA,
    secondaryCta: HOW_CTA,
  },
  improvementAreas: {
    eyebrow: AREAS_EYEBROW,
    title: "Four places an auto-component plant loses efficiency.",
    description: STANDARD_DESCRIPTION,
    items: [
      {
        area: "process",
        title: "Run better than your best shift.",
        description:
          "Most process losses in an auto-component plant trace back to a billet that went in cold, a die running below temperature after a stop, a shot profile that has drifted on one cell, or a cure time set for an average compound rather than the batch in the hopper. Stamped models how each line actually behaves and finds settings, control rules and restart routines that improve on your best runs, for your process engineer to accept, adjust or turn down.",
        energy: "Reheats, restarts and cold dies use energy that never ends up in a good part.",
      },
      {
        area: "quality",
        title: "Know which lot is at risk before it reaches the OEM.",
        description:
          "Stamped links forging, casting, heat-treatment and machining data to each lot and, where live data is connected, alerts the heat-treatment lead while a lot can still be saved, such as a basket overstaying in ageing or quench water drifting out of its band. A bin made after a long stop or a casting made while the die was cold is flagged while it is still in the plant, and the full record is ready for the PPAP file, the heat-treatment audit or the 8D when a complaint arrives.",
        energy: "A part rejected after heat treatment and machining has already used all the energy of a good one.",
      },
      {
        area: "planning",
        title: "When a press goes down, have the re-plan ready.",
        description:
          "Die changes run long, furnaces trip and material arrives late, and each one ripples through the forge, the heat-treatment queue and the machining cells. Stamped keeps track of what the whole plant is doing, from press status and furnace loads to material and dispatch dates, and proposes the sequence that works best across all of it, showing what it does to dispatches, furnace loading and changeovers, so the planner can choose with the trade-offs in front of them.",
        energy: "Full furnace loads and heat-ups timed to the next charge keep furnaces from sitting hot and empty.",
      },
      {
        area: "maintenance",
        title: "Prescribe the fix, and the right time to make it.",
        description:
          "The stop log already shows where the hours go on presses, casting cells and CNC machines, but rarely which stops matter most. Stamped ranks them by the output they cost, watches specific energy consumption and other slow drift, such as a furnace using more gas per kilo on the same recipe, a tool wearing out faster than its last few on the same part, or a hydraulic pack running longer every week, and prescribes the fix and a window that fits the production plan.",
        energy: "More gas or power for the same output is often the first sign that burners, seals or pumps need attention.",
      },
    ],
  },
  plantBand: {
    eyebrow: "In this plant",
    title: "Forging, heat treatment, precision machining, die casting and rubber moulding.",
    description:
      "Each process loses efficiency in its own way, so Stamped's models learn the signals that matter on each line from that line's own history before recommending anything.",
    items: [
      {
        id: "forging",
        title: "Forging",
        description:
          "In a forge shop the losses usually sit in billet temperature, restarts, die temperature and press pacing, so Stamped links each of them to the lots made under those conditions, flags the bins that look like past rejections while they are still in the plant, and tracks die life against the conditions each die has run under.",
        imageSrc: "/industries/forging.jpg",
        imageAlt: "Forging press line",
      },
      {
        id: "heat-treatment",
        title: "Heat treatment",
        description:
          "In heat treatment it comes down to quench and ageing, furnace loading and idle hours, which is why Stamped checks each basket against its written limits, keeps the full record ready for the audit file, points out baskets running well below a normal load when a compatible lot is close behind, and times heat-up to the moment the next charge is actually ready.",
        imageSrc: "/industries/heat-treatment.webp",
        imageAlt: "Heat treatment furnace in operation",
      },
      {
        id: "precision-machining",
        title: "Precision machining",
        description:
          "On a machining floor the questions are about tool life, first-off rejection and setups, and Stamped ranks the stops by the output and time they cost, compares each tool's life with its own history on the same part, and shows the setter and the maintenance lead which problem to fix first.",
        imageSrc: "/blog/cnc-energy-decomposition.jpg",
        imageAlt: "CNC machining centre",
      },
      {
        id: "die-casting",
        title: "Die casting",
        description:
          "In a die-casting cell most scrap comes from porosity, cold shuts and soldering, which depend on die temperature, melt temperature, die spray and the shot profile working together. Stamped ties each shot's conditions to the castings that later fail X-ray or leak test, so the cell lead can see which combinations to avoid, and it points out holding furnaces kept hot with nothing scheduled.",
        imageSrc: "/industries/die-casting.jpeg",
        imageAlt: "Molten metal pour on a die-casting line",
      },
      {
        id: "rubber-moulding",
        title: "Rubber moulding",
        description:
          "In rubber moulding the cure time and mould temperature are usually set for an average compound, while each incoming batch cures a little differently. Stamped links compound batch, press and cure settings to the parts that came out with flash, voids or undercure, and points out presses held at temperature through changeovers and gaps between batches.",
        imageSrc: "/industries/rubber-moulding.jpg",
        imageAlt: "Rubber moulding presses",
      },
    ],
  },
  prescriptionExamples: {
    eyebrow: "Example actions",
    title: "What the people who own the problem receive",
    description:
      "Each action goes to the person best placed to act, with what to do, by when, and the reasoning behind it.",
    footnote: EXAMPLE_FOOTNOTE,
    items: [
      {
        id: "forging-inspector",
        area: "Quality",
        title: "Forging, for the inspector",
        description:
          "Bin [14] was made after a [9]-minute stop with the die below temperature, and bins made that way were rejected more often last quarter, so it is worth checking before it moves on.",
        impactRange: "Example",
      },
      {
        id: "forging-shift-lead",
        area: "Process",
        title: "Forging, for the shift lead",
        description:
          "Keep the heater warm during stops shorter than [N] minutes, starting from A shift, because last month's restarts sent [N] parts out of window.",
        impactRange: "Example",
      },
      {
        id: "ht-basket",
        area: "Quality",
        title: "Heat treatment, for the heat-treatment lead",
        description:
          "Basket [B-07] reached ageing [N] minutes after quench against a written limit of [N], and its full record is attached for the audit file.",
        impactRange: "Example",
      },
      {
        id: "ht-load",
        area: "Planning",
        title: "Heat treatment, for the heat-treatment lead",
        description:
          "The next basket on Furnace [2] is well below a normal load, and a lot on the same recipe is ready by [time], so the two can run together without mixing grades.",
        impactRange: "Example",
      },
      {
        id: "ht-heatup",
        area: "Energy",
        title: "Heat treatment, for the shift lead",
        description:
          "Furnace [3] reached temperature about [N] minutes before the next charge was ready on most days last week, so heat-up can start later without moving the load time.",
        impactRange: "Example",
      },
      {
        id: "machining-tool",
        area: "Maintenance",
        title: "Machining, for the tool room",
        description:
          "Tool [T12] on [machine] is lasting about [N] parts fewer than its last [N] tools on the same part, so the insert and the coolant are worth checking before it shows up as first-off rejections.",
        impactRange: "Example",
      },
      {
        id: "die-casting-warmup",
        area: "Process",
        title: "Die casting, for the cell lead",
        description:
          "Castings from the first [N] shots after a die change on cell [4] failed leak test more often last month, so a longer warm-up before releasing parts is ready for your review.",
        impactRange: "Example",
      },
      {
        id: "rubber-cure",
        area: "Process",
        title: "Rubber moulding, for the process engineer",
        description:
          "Compound batch [N] is curing faster than the last [N] on the rheometer, so a shorter cure on presses [2] and [5] is ready for review before the next shift.",
        impactRange: "Example",
      },
      {
        id: "planner",
        area: "Planning",
        title: "Planning, for the planner",
        description:
          "Press [3] will be down for about [N] hours, and the proposed re-plan keeps [N] of today's [N] dispatches on time if it is confirmed by [time].",
        impactRange: "Example",
      },
    ],
  },
  outcomes: sharedOutcomes(),
  faq: [
    {
      id: "which-processes",
      question: "Which plants is Stamped working with?",
      answer:
        "We are starting with forging, heat-treatment and machining plants that supply OEMs, where a single rejection can cost far more than the part itself.",
    },
    {
      id: "die-casting-rubber",
      question: "Does Stamped work for die casting and rubber moulding?",
      answer:
        "The same four areas apply there, and the site survey tells us which signals matter on your cells, whether that is die temperature and shot profile in die casting or compound batch and cure settings in rubber moulding.",
    },
    homeFaq("hardware"),
    homeFaq("supervisors"),
    homeFaq("start"),
  ],
};

export const automotiveResources = resourcesContent;
