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

/** Steel. Copy canon: Stamped copy v3 (3 Oct 2026), revision 2. Qualitative only; no claims of past steel work. */

export const steelPage: VerticalPageContent = {
  slug: "steel",
  hero: {
    eyebrow: "Steel",
    title: "More good tonnes from every heat.",
    description:
      "In a steel plant the margin sits in melt-shop yield and power per tonne, in getting each heat's chemistry right the first time, and in rolling through a shift without cobbles or quality rejects.",
    primaryCta: SURVEY_CTA,
    secondaryCta: HOW_CTA,
    note: EARLY_INDUSTRY_NOTE,
  },
  improvementAreas: {
    eyebrow: AREAS_EYEBROW,
    title: "Four places a steel plant loses efficiency.",
    description: STANDARD_DESCRIPTION,
    items: [
      {
        area: "process",
        title: "Run every heat better than your best.",
        description:
          "Tap-to-tap time and power per tonne swing with the charge mix, how full the furnace runs, delays between heats and how much superheat each crew carries. Stamped models how each grade and charge mix behaves in your furnaces and recommends charging, power or temperature practice that improves on your best heats, for the melt-shop in-charge to accept, adjust or turn down.",
        energy: "Superheat, delays and part-full heats show up directly in power per tonne.",
      },
      {
        area: "quality",
        title: "Know which heat or bar is at risk before it ships.",
        description:
          "Chemistry misses, surface defects and dimensional rejects usually trace back to the scrap mix, the time a billet spent in the reheating furnace or a stand set slightly off. Stamped links melt, casting and rolling data to each heat and bundle and alerts the in-charge while there is still time to act, for example when a billet has overstayed in the reheating furnace. Heats that look like past rejects are flagged while they can still be checked, and each heat's record is ready when a customer asks.",
        energy: "A rejected bar has already been melted, cast, reheated and rolled.",
      },
      {
        area: "planning",
        title: "Keep the melt shop and the mill in step.",
        description:
          "When the furnace runs late or the mill stops, billets wait, cool down and need more fuel to reheat, and the rolling programme slips. Stamped keeps track of the whole plant, from furnace and caster status to billet temperatures and the rolling programme, and proposes the sequence that works best across melt shop, caster and mill, showing what each option does to output, reheating fuel and delivery.",
        energy: "Keeping hot charging going through a delay saves reheating fuel and scale.",
      },
      {
        area: "maintenance",
        title: "Prescribe the fix that saves the most tonnes.",
        description:
          "Cobbles, guide and roll problems, lining wear and crane delays each cost tonnes in different ways. Stamped ranks stops by the output and yield they cost, watches specific energy consumption and other slow drift, such as power per tonne creeping up on the same charge or a stand drawing more load for the same section, and prescribes the fix and a window that fits the rolling programme.",
        energy: "Rising power for the same charge is often the first sign of lining or electrical wear.",
      },
    ],
  },
  plantBand: {
    eyebrow: "In this plant",
    title: "Melt shop, casting and reheating, rolling and utilities.",
    description:
      "Most of the data that explains a poor heat or a cobble is already recorded somewhere between the furnace logs, the lab, the mill and the electrical system.",
    items: [
      {
        id: "melt-shop",
        title: "Induction and arc furnaces",
        description:
          "In the melt shop the questions are about power per tonne, tap-to-tap time, metallic yield and chemistry hit rate, and Stamped compares each heat with the best ones on the same grade and charge mix, shows which practice made the difference and where it can be improved further.",
        imageSrc: "/industries/plant/steel/melt.jpg",
        imageAlt: "Molten metal and furnace stations in a steel melt shop",
      },
      {
        id: "reheating",
        title: "Casting and reheating",
        description:
          "Billets that sit too long in the reheating furnace lose metal to scale and burn extra fuel, so Stamped follows residence time and zone temperatures against what the mill actually needs, especially during delays.",
        imageSrc: "/industries/plant/steel/interior.jpg",
        imageAlt: "Steel plant interior with casting and reheating equipment",
      },
      {
        id: "rolling",
        title: "Rolling mill",
        description:
          "Crop, cobbles and dimensional rejects decide mill yield, and Stamped links each of them to the stand setup, guide changes and billet temperature that came before them, so the mill team knows which problem to fix first.",
        imageSrc: "/industries/steel.png",
        imageAlt: "Hot steel billets on a rolling mill line",
      },
      {
        id: "steel-utilities",
        title: "Cooling water, fume extraction and compressed air",
        description:
          "Pumps, fans and compressors often run at the same duty whatever the furnace and mill are doing, and Stamped points out where they can follow production and where their power draw is drifting.",
        imageSrc: "/industries/plant/steel/cooling.jpg",
        imageAlt: "Steel plant cooling tower and outdoor process equipment",
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
        id: "tap-temp",
        area: "Process",
        title: "Melt shop, for the melt-shop in-charge",
        description:
          "Heats on Furnace [1] this week tapped about [N]°C hotter than the grade needs, compared with the best crew's practice, so a lower tap-temperature aim is ready for your review.",
        impactRange: "Example",
      },
      {
        id: "chemistry",
        area: "Quality",
        title: "Melt shop, for the quality in-charge",
        description:
          "Heat [N] was charged with a scrap mix similar to the heats behind last month's residual copper misses, so a chemistry check before casting is worth doing.",
        impactRange: "Example",
      },
      {
        id: "mill-delay",
        area: "Planning",
        title: "Rolling, for the mill planner",
        description:
          "The mill is expected to stop for about [N] minutes, so holding the next [N] billets at the caster and rolling the [section] order first keeps hot charging going for most of the shift.",
        impactRange: "Example",
      },
      {
        id: "reheat-delay",
        area: "Energy",
        title: "Reheating, for the furnace operator",
        description:
          "Billets sat in the furnace about [N] minutes longer than the mill needed during last week's delays, so lowering zone setpoints during delays longer than [N] minutes is ready for review.",
        impactRange: "Example",
      },
      {
        id: "cobbles",
        area: "Maintenance",
        title: "Rolling, for the mill maintenance lead",
        description:
          "Stand [N] has had [N] cobbles this month on the same section, mostly within [N] minutes of a guide change, so the guide setup is the first thing to check.",
        impactRange: "Example",
      },
      {
        id: "power-drift",
        area: "Maintenance",
        title: "Melt shop, for the electrical lead",
        description:
          "Power per tonne on Furnace [2] has crept up on the same charge mix over [N] weeks, so the lining and the power connections are worth checking at the next relining window.",
        impactRange: "Example",
      },
    ],
  },
  outcomes: sharedOutcomes(),
  faq: [
    {
      id: "steel-experience",
      question: "Has Stamped worked with steel plants?",
      answer:
        "Our first deployments are with auto-component makers, including forging and heat treatment, which share a lot with a melt shop and a rolling mill. In steel we start the same way, with a site survey on your floor and a written read-out of where we would begin.",
    },
    {
      id: "steel-route",
      question: "Does it work for induction furnace plants as well as arc furnaces?",
      answer:
        "The approach is the same for both, because it learns from your own heats. The site survey tells us which furnace, lab and mill records you already have and where the first finding is most likely to come from.",
    },
    homeFaq("hardware"),
    homeFaq("start"),
  ],
};
