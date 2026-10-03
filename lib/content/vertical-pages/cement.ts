import type { VerticalPageContent } from "../types";
import {
  AREAS_EYEBROW,
  EARLY_INDUSTRY_NOTE,
  EXAMPLE_FOOTNOTE,
  HOW_CTA,
  STANDARD_DESCRIPTION,
  SURVEY_CTA,
  homeFaq,
  sharedOutcomes,
} from "./shared";

/** Cement. Copy canon: Stamped copy v3 (3 Oct 2026), revision 2. Qualitative only; no claims of past cement work. */

export const cementPage: VerticalPageContent = {
  slug: "cement",
  hero: {
    eyebrow: "Cement",
    title: "More good clinker from the kiln you already run.",
    description:
      "In a cement plant, efficiency is decided by how steadily the kiln burns, how much heat and power go into every tonne, and how many hours the kiln and the mills actually run between stops.",
    primaryCta: SURVEY_CTA,
    secondaryCta: HOW_CTA,
    note: EARLY_INDUSTRY_NOTE,
  },
  improvementAreas: {
    eyebrow: AREAS_EYEBROW,
    title: "Four places a cement plant loses efficiency.",
    description: STANDARD_DESCRIPTION,
    items: [
      {
        area: "process",
        title: "Run the kiln better than its best days.",
        description:
          "Most kiln losses come from instability rather than a broken machine: raw-meal chemistry swinging between shifts, false air creeping in at a seal, a coal feeder pulsing, or a burning zone that one crew runs hotter than another. Stamped models how each kiln line behaves and recommends feed, fuel, draught or cooler settings that improve on your steadiest days, for your process engineer to accept, adjust or turn down.",
        energy: "Heat per kilo of clinker and power per tonne of cement are counted on every recommendation.",
      },
      {
        area: "quality",
        title: "Catch a free-lime excursion before it fills a silo.",
        description:
          "Free lime and fineness come back from the lab hours after the conditions that caused them. Stamped links lab results to the kiln and mill conditions that came before them, so when the kiln starts behaving the way it did before the last high free-lime results the shift in-charge hears about it in time to correct it, and each grade's record is ready when a customer asks.",
        energy: "Overburning to stay safe on free lime costs fuel, so a controlled band saves both.",
      },
      {
        area: "planning",
        title: "Plan mills, grades and dispatch together.",
        description:
          "Mill run plans, grade changes, power availability and silo levels are usually juggled in spreadsheets, and an unplanned kiln stop throws all of them out at once. Stamped keeps track of the whole plant, from kiln and mill status to silo levels, power availability and dispatch, and when something changes it proposes the mill and dispatch sequence that works best across all of it, showing what each option does to output, power cost and silo position.",
        energy: "Running mills in cheaper power windows is treated as one input to the plan, alongside output and dispatch.",
      },
      {
        area: "maintenance",
        title: "Prescribe the fix that saves the most clinker.",
        description:
          "Kiln stops from refractory hot spots, fan vibration, cooler problems or mill trips each cost hours of output and a heat-up. Stamped ranks stops by the clinker and cement they cost, watches specific energy consumption and other slow drift, such as shell temperature creeping up in one zone or a fan drawing more power for the same flow, and prescribes the fix and a window that fits the kiln and mill plan, so maintenance knows where to look first and when.",
        energy: "Every unplanned stop is another heat-up, so fewer stops also means less fuel.",
      },
    ],
  },
  plantBand: {
    eyebrow: "In this plant",
    title: "Raw mill, kiln and cooler, cement mills and utilities.",
    description:
      "A cement plant records a great deal already, from the control room and the lab to the electrical system and the dispatch yard, but those records rarely get looked at together.",
    items: [
      {
        id: "raw-mill",
        title: "Crushing and raw mill",
        description:
          "Kiln stability starts with the raw meal, so Stamped follows how quarry and stockpile changes show up in raw-mix chemistry and in raw-mill throughput, and flags the shifts where the kiln is likely to be fed something harder to burn.",
        imageSrc: "/industries/plant/cement/crushers.jpg",
        imageAlt: "Cement quarry and crusher plant on a hillside",
      },
      {
        id: "kiln",
        title: "Kiln and cooler",
        description:
          "In the pyro section the questions are about heat per kilo of clinker, free lime, back-end oxygen and kiln availability, and Stamped compares each shift with the line's steadiest days so the process engineer can see which setting moved and what it cost.",
        imageSrc: "/industries/plant/cement/plant-exterior.jpg",
        imageAlt: "Cement preheater tower, kiln and silos",
      },
      {
        id: "cement-mill",
        title: "Cement mills",
        description:
          "Grinding is the largest electrical load in most plants, and mill output and power per tonne move with fresh feed, separator speed and fineness targets, so Stamped ranks each mill against its own best weeks on the same grade.",
        imageSrc: "/industries/plant/cement/batch-plant.jpg",
        imageAlt: "Cement mill silos and conveyor towers on a plant site",
      },
      {
        id: "utilities",
        title: "Fans, compressed air and waste heat recovery",
        description:
          "Fans, compressors and the waste heat recovery system sit on the power bill whether clinker is moving or not, and Stamped points out the ones running harder than the line needs and the drift that usually comes before a trip.",
        imageSrc: "/industries/plant/cement/whr-pipes.jpg",
        imageAlt: "Cement plant ducting and material-handling towers",
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
        id: "false-air",
        area: "Process",
        title: "Kiln, for the process engineer",
        description:
          "Back-end oxygen has run above its usual band for [N] hours, which on this line usually means false air at the inlet seal, so a seal check and a small draught correction are ready for review.",
        impactRange: "Example",
      },
      {
        id: "free-lime",
        area: "Quality",
        title: "Kiln, for the shift in-charge",
        description:
          "Kiln conditions over the last [N] hours look like the run before last week's high free-lime results, so an extra clinker sample this shift would show early whether the burning zone needs attention.",
        impactRange: "Example",
      },
      {
        id: "mill-power",
        area: "Energy",
        title: "Cement mill, for the mill in-charge",
        description:
          "Mill [2] is using more power per tonne than in its best week on the same grade and fineness, and separator speed is the main difference, so a new setting is ready for your review.",
        impactRange: "Example",
      },
      {
        id: "kiln-stop-plan",
        area: "Planning",
        title: "Planning, for the planner",
        description:
          "Kiln [1] is expected to be down for about [N] hours, and the proposed mill and dispatch plan keeps [N] of today's [N] trucks on time using clinker already in the silo.",
        impactRange: "Example",
      },
      {
        id: "shell-temp",
        area: "Maintenance",
        title: "Kiln, for the maintenance lead",
        description:
          "Shell temperature in zone [N] has crept up by about [N]°C over [N] days, which is worth checking against the last refractory survey before it becomes a hot spot.",
        impactRange: "Example",
      },
      {
        id: "fan-drift",
        area: "Maintenance",
        title: "Fans, for the electrical lead",
        description:
          "Fan [N] is drawing more power for the same flow than it did [N] weeks ago, so the impeller and dampers are worth inspecting at the next stop.",
        impactRange: "Example",
      },
    ],
  },
  outcomes: sharedOutcomes(),
  faq: [
    {
      id: "cement-experience",
      question: "Has Stamped worked with cement plants?",
      answer:
        "Our first deployments are with auto-component makers. In cement we start the same way, with a site survey on your floor and a written read-out of where we would begin, and we publish results only with a plant's written permission.",
    },
    {
      id: "cement-control",
      question: "Does Stamped replace our kiln control or expert system?",
      answer:
        "No. Stamped works alongside the control systems you already run and sends its recommendations to your team. Stamped recommends and your team decides.",
    },
    homeFaq("hardware"),
    homeFaq("start"),
  ],
};
