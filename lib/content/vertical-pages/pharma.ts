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

/** Pharma. Copy canon: Stamped copy v3 (3 Oct 2026), revision 2. Qualitative only; QA decides; no claims of past pharma work. */

export const pharmaPage: VerticalPageContent = {
  slug: "pharma",
  hero: {
    eyebrow: "Pharma",
    title: "More batches right the first time.",
    description:
      "In a pharmaceutical plant the costly losses are a batch that fails release, a deviation that ties up QA for days, and utilities that run as hard on an idle day as on a full one.",
    primaryCta: SURVEY_CTA,
    secondaryCta: HOW_CTA,
    note: EARLY_INDUSTRY_NOTE,
  },
  improvementAreas: {
    eyebrow: AREAS_EYEBROW,
    title: "Four places a pharma plant loses efficiency.",
    description: STANDARD_DESCRIPTION,
    items: [
      {
        area: "process",
        title: "Run every batch better than your best.",
        description:
          "Granulation end points, drying times, compression force and coating conditions vary between batches, shifts and equipment trains, even inside the validated ranges, and the operators who run the steadiest batches rarely write down why. Stamped models how each batch actually runs within those ranges, points out where a running batch is moving away from its best path and recommends improvements for your production and process teams to take through change control.",
        energy: "Over-drying and long granulation cycles use energy and time without adding anything to the batch.",
      },
      {
        area: "quality",
        title: "See a deviation coming before it becomes an investigation.",
        description:
          "When an OOS result or a deviation comes in, most of the time goes into pulling together the batch record, equipment data, environmental readings and related lots. Stamped links that data to each batch as it is made and alerts the floor while a running batch can still be brought back, for example when a hold time is nearing its limit or a dryer is drifting off its profile. It also flags batches made under conditions that came before past deviations and puts the full record in one place for the investigation and for QA's release decision.",
        energy: "A batch that is reworked or rejected has already used all the utilities of a good one.",
      },
      {
        area: "planning",
        title: "Keep the campaign on plan when a step slips.",
        description:
          "A cleaning that runs long, a granulator down for maintenance or material held at QC ripples through the week's campaign. Stamped keeps track of the whole site, from room and equipment status to cleaning, QC holds and dispatch dates, and proposes the sequence that works best across all of it, showing what each option does to batch output, changeovers and dispatch.",
        energy: "Grouping products to cut changeovers also cuts the cleaning and HVAC hours that come with them.",
      },
      {
        area: "maintenance",
        title: "Prescribe the fix before it triggers a deviation.",
        description:
          "Stamped ranks equipment stops by the batch time they cost and watches specific energy consumption and other slow drift in utilities, such as an air handler drawing more power for the same airflow, a chiller losing efficiency, or a room pressure differential that keeps getting close to its limit. It prescribes the fix and a slot between campaigns, so engineering can act before it turns into an excursion.",
        energy: "Air handlers and chillers are usually the largest energy users on a pharma site.",
      },
    ],
  },
  plantBand: {
    eyebrow: "In this plant",
    title: "Production suites, cleanrooms and HVAC, QC and release, and utilities.",
    description:
      "A pharma plant already keeps careful records for GMP, but the batch record, the building management system, the equipment logs and the lab results usually sit in separate places.",
    items: [
      {
        id: "production",
        title: "Granulation, drying, compression and coating",
        description:
          "In oral solid dose and API production the questions are about end points, cycle times and in-process results, and Stamped compares each batch with the best batches of the same product so the production manager can see which step drifted.",
        imageSrc: "/industries/plant/pharma/factory-machinery.jpg",
        imageAlt: "Pharmaceutical production equipment on a plant floor",
      },
      {
        id: "cleanrooms",
        title: "Cleanrooms and HVAC",
        description:
          "Room pressures, temperature, humidity and air changes have to stay inside their limits, and Stamped watches how close each room runs to them and how hard the air handlers work to keep it there, on production days and idle days alike.",
        imageSrc: "/industries/plant/pharma/cleanroom.jpg",
        imageAlt: "Operators in a pharmaceutical cleanroom",
      },
      {
        id: "qc",
        title: "QC and batch release",
        description:
          "Every release depends on the record being complete and every deviation being closed, so Stamped gathers the process, equipment and environmental data for each batch in one place before QA needs it.",
        imageSrc: "/industries/plant/pharma/qc.jpg",
        imageAlt: "Quality control laboratory in a pharmaceutical plant",
      },
      {
        id: "pharma-utilities",
        title: "Chillers, purified water and compressed air",
        description:
          "Utilities keep running whether or not a batch is in the room, and Stamped points out where chillers, pumps and compressors can follow the production calendar and where their performance is drifting.",
        imageSrc: "/industries/plant/pharma/chillers.jpg",
        imageAlt: "Chiller plant serving a pharmaceutical site",
      },
    ],
  },
  prescriptionExamples: {
    eyebrow: "Example actions",
    title: "What the people who own the problem receive",
    description:
      "Each action goes to the person best placed to act, with what to do, by when, and the reasoning behind it. Anything that touches a validated parameter goes through your change control.",
    footnote: EXAMPLE_FOOTNOTE,
    items: [
      {
        id: "fbd-drying",
        area: "Process",
        title: "Drying, for the production manager",
        description:
          "Drying on FBD [2] has run about [N] minutes longer than the best batches of this product, with inlet air humidity the main difference, so the moisture end point is worth checking before the next batch.",
        impactRange: "Example",
      },
      {
        id: "compression",
        area: "Quality",
        title: "Compression, for QA",
        description:
          "Batch [N] was compressed while hardness drifted toward the upper limit for [N] minutes, similar to the batches behind last quarter's dissolution deviations, so it is worth an extra review before release.",
        impactRange: "Example",
      },
      {
        id: "investigation",
        area: "Quality",
        title: "Investigation, for the QA lead",
        description:
          "Here is every equipment, environmental and process record for batch [N], gathered in one place for the deviation opened this morning.",
        impactRange: "Example",
      },
      {
        id: "campaign",
        area: "Planning",
        title: "Planning, for the planner",
        description:
          "Granulator [1] will be down for about [N] hours, and the proposed sequence moves [product] forward so [N] of this week's [N] batches still finish on time.",
        impactRange: "Example",
      },
      {
        id: "pressure-diff",
        area: "Maintenance",
        title: "HVAC, for engineering",
        description:
          "Room [N]'s pressure differential has come close to its alarm limit on [N] days this month, each time after the air handler filter passed [N] hours, so a filter change before the next campaign is worth scheduling.",
        impactRange: "Example",
      },
      {
        id: "ahu-idle",
        area: "Energy",
        title: "Utilities, for the utilities head",
        description:
          "Air handlers serving rooms [N] to [N] ran at full flow through [N] idle hours last week, so an idle mode within what your validation allows is worth raising with QA.",
        impactRange: "Example",
      },
    ],
  },
  outcomes: sharedOutcomes(),
  faq: [
    {
      id: "pharma-experience",
      question: "Has Stamped worked with pharma plants?",
      answer:
        "Our first deployments are with auto-component makers. In pharma we start the same way, with a site survey on your floor and a written read-out of where we would begin, and we work within your quality system and change control.",
    },
    {
      id: "pharma-gmp",
      question: "Does Stamped make release or GMP decisions?",
      answer:
        "No. Release and disposition stay with your QA team, and Stamped gathers the records and flags what looks unusual so they can decide faster. Stamped recommends and your team decides.",
    },
    homeFaq("hardware"),
    homeFaq("start"),
  ],
};
