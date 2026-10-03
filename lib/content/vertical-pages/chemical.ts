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

/** Chemicals. Copy canon: Stamped copy v3 (3 Oct 2026), revision 2. Qualitative only; no claims of past chemical work. */

export const chemicalPage: VerticalPageContent = {
  slug: "chemical",
  hero: {
    eyebrow: "Chemicals",
    title: "More on-spec batches from the reactors you already have.",
    description:
      "In a chemical plant the margin sits in reactor yield, in batch cycle time, and in how many batches come out off-spec and need rework, blending or a downgrade.",
    primaryCta: SURVEY_CTA,
    secondaryCta: HOW_CTA,
    note: EARLY_INDUSTRY_NOTE,
  },
  improvementAreas: {
    eyebrow: AREAS_EYEBROW,
    title: "Four places a chemical plant loses efficiency.",
    description: STANDARD_DESCRIPTION,
    items: [
      {
        area: "process",
        title: "Run every batch better than your best.",
        description:
          "Two batches of the same product rarely run the same way, because dosing rates, heat-up and cooling times, hold times and end points vary by reactor, raw-material lot and shift. Stamped models how each reactor behaves phase by phase and recommends changes to dosing, heat-up or hold practice that improve on your best batches, for your process engineer to accept, adjust or turn down.",
        energy: "Long heat-ups and holds at temperature use steam and power without adding yield.",
      },
      {
        area: "quality",
        title: "Know which batch is heading off-spec while it can still be corrected.",
        description:
          "Lab results usually arrive after the batch is finished, when the only options left are rework, blending or a downgrade. Stamped compares each running batch with past batches phase by phase, alerts the shift chemist while a batch following the path of earlier off-spec batches can still be corrected, for example when a dosing rate or reactor temperature drifts off its profile, and keeps each batch's record ready for the certificate of analysis or a customer complaint.",
        energy: "Rework repeats the heating, cooling and separation the batch has already had.",
      },
      {
        area: "planning",
        title: "Keep reactors, utilities and dispatch in step.",
        description:
          "Reactors wait for raw material, QC release, cleaning or cooling water, and those idle hours rarely show up on a report. Stamped keeps track of the whole plant, from reactor status and raw-material lots to QC holds, utilities and dispatch dates, and proposes the sequence that works best across all of it, showing what each option does to output, utility load and dispatch dates.",
        energy: "Staggering heating starts keeps the boiler and cooling towers in their efficient range.",
      },
      {
        area: "maintenance",
        title: "Prescribe the fix that saves the most batch time.",
        description:
          "Stamped ranks stops and slow phases by the batch time they cost and watches specific energy consumption and other slow drift, such as a reactor taking longer to cool than it used to, which often points to jacket fouling or a cooling tower falling behind, or an agitator drawing more power for the same batch. It then prescribes the fix and a window that fits the production plan.",
        energy: "Fouling shows up as longer heat-ups and cool-downs well before it shows up in a breakdown.",
      },
    ],
  },
  plantBand: {
    eyebrow: "In this plant",
    title: "Reactors, separation and drying, utilities and effluent.",
    description:
      "The control system, the batch sheets, the lab and the utility meters each hold part of the story of a batch, and Stamped brings them into one view.",
    items: [
      {
        id: "reactors",
        title: "Batch reactors",
        description:
          "In the reactor bay the questions are about yield, phase times and end points, and Stamped lines up every batch of a product phase by phase so the process engineer can see where the slow or off-spec ones parted company with the best.",
        imageSrc: "/industries/plant/chemical/pipes.jpg",
        imageAlt: "Process piping and reactor vessels in a chemical plant",
      },
      {
        id: "separation",
        title: "Separation, drying and solvent recovery",
        description:
          "Distillation, filtration, drying and solvent recovery often set the real cycle time, and Stamped tracks how long each step takes and how much steam and power it uses for each batch, and finds where each step can run better than its best so far.",
        imageSrc: "/industries/plant/chemical/refinery.jpg",
        imageAlt: "Distillation columns and piping in a chemical plant",
      },
      {
        id: "chemical-utilities",
        title: "Steam, cooling water and compressed air",
        description:
          "Boilers, chillers and cooling towers feel every batch that starts heating or cooling at the same time, and Stamped points out the peaks that can be staggered and the equipment whose performance is drifting.",
        imageSrc: "/industries/plant/chemical/complex.jpg",
        imageAlt: "Chemical plant utilities, silos and conveyors",
      },
      {
        id: "effluent",
        title: "Effluent treatment",
        description:
          "Effluent load follows what happened in the reactors and the cleaning schedule, and Stamped links the two so the ETP team sees a heavy load coming before it arrives.",
        imageSrc: "/industries/plant/chemical/waterfront.jpg",
        imageAlt: "Chemical plant tanks and towers on a waterfront",
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
        id: "heat-up",
        area: "Process",
        title: "Reactor, for the process engineer",
        description:
          "Heat-up on Reactor [R-3] has taken [N] minutes longer than the best batches of this product for the last [N] batches, so a jacket temperature ramp closer to those batches is ready for review.",
        impactRange: "Example",
      },
      {
        id: "off-spec",
        area: "Quality",
        title: "Reactor, for the shift chemist",
        description:
          "Batch [N] is following the temperature and dosing path of the last [N] off-spec batches during the addition phase, so an in-process sample now would show whether the dosing rate needs correcting.",
        impactRange: "Example",
      },
      {
        id: "qc-wait",
        area: "Planning",
        title: "Planning, for the planner",
        description:
          "Reactor [R-2] is waiting on QC release for about [N] hours, and moving the next [product] batch to Reactor [R-4] keeps [N] of this week's [N] dispatches on time.",
        impactRange: "Example",
      },
      {
        id: "steam-peak",
        area: "Energy",
        title: "Utilities, for the utilities in-charge",
        description:
          "Steam demand is due to peak at [time] when [N] reactors start heating together, so staggering the starts by [N] minutes would keep the boiler in its efficient range without delaying any batch.",
        impactRange: "Example",
      },
      {
        id: "fouling",
        area: "Maintenance",
        title: "Reactor, for the maintenance lead",
        description:
          "Cooling on Reactor [R-1] has crept up by about [N] minutes per batch over [N] weeks on the same recipe, which often points to jacket fouling, so it is worth inspecting at the next cleaning.",
        impactRange: "Example",
      },
      {
        id: "coa",
        area: "Quality",
        title: "Quality, for the quality head",
        description:
          "Here is every process and lab record for batch [N], gathered in one place for the customer complaint that came in this morning.",
        impactRange: "Example",
      },
    ],
  },
  outcomes: sharedOutcomes(),
  faq: [
    {
      id: "chemical-experience",
      question: "Has Stamped worked with chemical plants?",
      answer:
        "Our first deployments are with auto-component makers. In chemicals we start the same way, with a site survey on your floor and a written read-out of where we would begin, and we publish results only with a plant's written permission.",
    },
    {
      id: "chemical-control",
      question: "Does Stamped change our recipes or control system?",
      answer:
        "No. Stamped works alongside the control system you already run and sends its recommendations to your team. Stamped recommends and your team decides.",
    },
    homeFaq("hardware"),
    homeFaq("start"),
  ],
};
