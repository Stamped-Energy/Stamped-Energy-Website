import type { CtaLink, IndustryVertical } from "./types";
import { landingContent } from "./landing";
import { getVerticalPage, VERTICAL_SLUGS, type VerticalSlug } from "./vertical-pages";

/** Industries copy. Canon: Stamped copy v3 (3 Oct 2026). Auto components first; no process-industry claims. */

const INDUSTRY_IMAGES = {
  dieCasting: "/industries/die-casting.jpeg",
  forging: "/industries/forging.jpg",
  heatTreatment: "/industries/heat-treatment.webp",
  machining: "/blog/cnc-energy-decomposition.jpg",
} as const;

export type IndustryHubRow = {
  id: string;
  slug: string;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  equipment: string[];
  body: string;
  footerNote: string;
};

export const industriesContent = {
  hub: {
    eyebrow: "Industries",
    title: "Built for auto-component makers first.",
    description:
      "We are starting with forging, heat-treatment and machining plants that supply OEMs, where a single rejection can cost far more than the part itself.",
    heroImageSrc: INDUSTRY_IMAGES.forging,
    heroImageAlt: "Forging press line on an auto-component plant floor",
    primaryCta: { label: "Explore auto components", href: "/industries/automotive" } satisfies CtaLink,
    secondaryCta: { label: "Book a site survey", href: "/contact" } satisfies CtaLink,
    thesis: {
      eyebrow: "Why we start here",
      title: "Where a rejection costs more than the part.",
      body: "An auto-component plant supplying OEMs lives with rejections, customer complaints, audits and on-time delivery all at once, and most of the data that explains a bad batch is already recorded somewhere in the plant. That is where Stamped is working now, and other discrete manufacturing comes later.",
    },
    byIndustry: {
      eyebrow: "By process",
      title: "Auto components, forging, heat treatment and precision machining.",
      disclaimer:
        "Stamped looks across process, quality, planning and maintenance in each of them, with energy counted in all four.",
      rows: [
        {
          id: "automotive",
          slug: "automotive",
          name: "Auto components",
          href: "/industries/automotive",
          imageSrc: INDUSTRY_IMAGES.dieCasting,
          imageAlt: "Auto-component plant floor",
          equipment: ["Rejections", "Customer complaints", "Audits", "On-time delivery"],
          body: "Fewer rejections reach your OEM when batches at risk are flagged while they are still in the plant and each lot's record is ready when the auditor or the customer asks.",
          footerNote: "Lead industry",
        },
        {
          id: "forging",
          slug: "forging",
          name: "Forging",
          href: "/industries/automotive#forging",
          imageSrc: INDUSTRY_IMAGES.forging,
          imageAlt: "Forging press line",
          equipment: ["Billet temperature", "Restarts", "Die temperature", "Press pacing"],
          body: "Restarts, a die running cold and a heater aim that has drifted show up in the data well before they show up as rejections.",
          footerNote: "Auto components",
        },
        {
          id: "heat-treatment",
          slug: "heat-treatment",
          name: "Heat treatment",
          href: "/industries/automotive#heat-treatment",
          imageSrc: INDUSTRY_IMAGES.heatTreatment,
          imageAlt: "Heat treatment furnace in operation",
          equipment: ["Quench and ageing", "Furnace loading", "Idle hours"],
          body: "Each basket is checked against its written limits, and loading is sequenced so the furnace is not heating up and cooling down between lots.",
          footerNote: "Auto components",
        },
        {
          id: "precision-machining",
          slug: "precision-machining",
          name: "Precision machining",
          href: "/industries/automotive#precision-machining",
          imageSrc: INDUSTRY_IMAGES.machining,
          imageAlt: "CNC machining centre",
          equipment: ["Tool life", "First-off rejection", "Setups"],
          body: "Stops are ranked by the output and time they cost, so the setter and the maintenance lead know which one to fix first.",
          footerNote: "Auto components",
        },
      ] satisfies IndustryHubRow[],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions plant leaders ask about industries",
      items: [
        {
          id: "which",
          question: "Which industries does Stamped work with?",
          answer:
            "We are starting with forging, heat-treatment and machining plants that supply OEMs, where a single rejection can cost far more than the part itself.",
        },
        ...landingContent.faq.items.filter((item) => item.id === "mes-erp-scada" || item.id === "start"),
      ],
    },
    cta: { label: "Book a site survey", href: "/contact" } satisfies CtaLink,
  },

  verticals: [
    {
      id: "automotive",
      slug: "automotive",
      name: "Auto components",
      tagline: "Fewer rejections reach your OEM.",
      description:
        "We are starting with forging, heat-treatment and machining plants that supply OEMs, where a single rejection can cost far more than the part itself.",
      href: "/industries/automotive",
      heroImageSrc: INDUSTRY_IMAGES.forging,
      heroImageAlt: "Forging press line on an auto-component plant floor",
      segments: [],
      priority: 1,
      status: "live",
    },
  ] satisfies IndustryVertical[],
} as const;

export function getIndustryVertical(slug: string) {
  return industriesContent.verticals.find((vertical) => vertical.slug === slug);
}

export function getLiveVerticals() {
  return [...industriesContent.verticals]
    .filter((vertical) => vertical.status === "live")
    .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
}

/** Nav and footer entries: the lead industry page plus its process anchors. */
export function getIndustryNavItems() {
  return industriesContent.hub.byIndustry.rows.map((row) => ({ label: row.name, href: row.href }));
}

export { getVerticalPage, VERTICAL_SLUGS, type VerticalSlug };
