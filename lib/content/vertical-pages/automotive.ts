import type { CtaLink, VerticalPageContent } from "../types";
import { landingContent } from "../landing";
import { resourcesContent } from "../resources";

/** Auto components (URL kept at /industries/automotive). Copy canon: Stamped copy v3 (3 Oct 2026). */

const CTA = { label: "Book a site survey", href: "/contact" } satisfies CtaLink;
const HOW = { label: "See how it works", href: "/platform" } satisfies CtaLink;

const homeFaq = (id: string) => {
  const item = landingContent.faq.items.find((faq) => faq.id === id);
  if (!item) {
    throw new Error(`Missing homepage FAQ item: ${id}`);
  }
  return { id: item.id, question: item.question, answer: item.answer };
};

export const automotivePage: VerticalPageContent = {
  slug: "automotive",
  hero: {
    eyebrow: "Auto components",
    title: "Fewer rejections reach your OEM.",
    description:
      "We are starting with forging, heat-treatment and machining plants that supply OEMs, where a single rejection can cost far more than the part itself.",
    primaryCta: CTA,
    secondaryCta: HOW,
  },
  plantBand: {
    eyebrow: "In this plant",
    title: "Forging, heat treatment and precision machining.",
    description:
      "Stamped uses machine learning and AI on the data your plant already records to find where efficiency is lost across process, quality, planning and maintenance, and improves it with actions your team can take.",
    items: [
      {
        id: "forging",
        title: "Forging",
        description:
          "In a forge shop the losses usually sit in billet temperature, restarts, die temperature and press pacing, so Stamped links each of them to the lots made under those conditions and flags the bins that look like past rejections while they are still in the plant.",
        imageSrc: "/industries/forging.jpg",
        imageAlt: "Forging press line",
      },
      {
        id: "heat-treatment",
        title: "Heat treatment",
        description:
          "In heat treatment it comes down to quench and ageing, furnace loading and idle hours, which is why Stamped checks each basket against its written limits, keeps the full record ready for the audit file and proposes loading sequences that keep the furnace from heating up and cooling down between lots.",
        imageSrc: "/industries/heat-treatment.webp",
        imageAlt: "Heat treatment furnace in operation",
      },
      {
        id: "precision-machining",
        title: "Precision machining",
        description:
          "On a machining floor the questions are about tool life, first-off rejection and setups, and Stamped ranks the stops by the output and time they cost so the setter and the maintenance lead know which one to fix first.",
        imageSrc: "/blog/cnc-energy-decomposition.jpg",
        imageAlt: "CNC machining centre",
      },
    ],
  },
  prescriptionExamples: {
    eyebrow: "Example actions",
    title: "What the people who own the problem receive",
    description:
      "Each action goes to the person best placed to act, with what to do, by when, and the reasoning behind it.",
    footnote: "Numbers in [brackets] are placeholders. Your pilot writes these from your own plant data.",
    items: [
      {
        id: "forging-inspector",
        title: "Forging, for the inspector",
        description:
          "Bin [14] was made after a [9]-minute stop with the die below temperature, and bins made that way were rejected more often last quarter, so it is worth checking before it moves on.",
        impactRange: "Example",
      },
      {
        id: "forging-shift-lead",
        title: "Forging, for the shift lead",
        description:
          "Keep the heater warm during stops shorter than [N] minutes, starting from A shift, because last month's restarts sent [N] parts out of window.",
        impactRange: "Example",
      },
      {
        id: "ht-basket",
        title: "Heat treatment, for the heat-treatment lead",
        description:
          "Basket [B-07] reached ageing [N] minutes after quench against a written limit of [N], and its full record is attached for the audit file.",
        impactRange: "Example",
      },
      {
        id: "ht-sequence",
        title: "Heat treatment, for the heat-treatment lead",
        description:
          "Running these [N] lots back to back by temperature would save the furnace from heating up and cooling down between them.",
        impactRange: "Example",
      },
      {
        id: "machining-setter",
        title: "Machining, for the setter",
        description:
          "The repeating micro-stop on [machine] looks like a clamping issue, and the card can be closed once the machine runs cleanly.",
        impactRange: "Example",
      },
      {
        id: "quality-head",
        title: "Quality, for the quality head",
        description:
          "Here is every process record for lot [N], gathered in one place for the 8D on the customer complaint that came in this morning.",
        impactRange: "Example",
      },
    ],
  },
  outcomes: {
    eyebrow: "Impact",
    title: "What changes in the plant.",
    disclaimer: landingContent.impact.footnote,
    items: landingContent.impact.items.map((item) => ({
      id: item.id,
      title: item.title.replace(/,$/, ""),
      description: item.detail.charAt(0).toUpperCase() + item.detail.slice(1),
    })),
  },
  faq: [
    {
      id: "which-processes",
      question: "Which plants is Stamped working with?",
      answer:
        "We are starting with forging, heat-treatment and machining plants that supply OEMs, where a single rejection can cost far more than the part itself.",
    },
    homeFaq("hardware"),
    homeFaq("who-decides"),
    homeFaq("start"),
  ],
};

export const automotiveResources = resourcesContent;
