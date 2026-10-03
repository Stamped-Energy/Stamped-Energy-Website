import type { CtaLink, IndustryFaqItem, VerticalPageContent } from "../types";
import { landingContent } from "../landing";

/** Shared building blocks for industry pages. Copy canon: Stamped copy v3 (3 Oct 2026), revision 2. */

export const SURVEY_CTA = { label: "Book a site survey", href: "/contact" } satisfies CtaLink;
export const HOW_CTA = { label: "See how it works", href: "/platform" } satisfies CtaLink;

/** Approved one-sentence description (copy guide, section 2). Use verbatim. */
export const STANDARD_DESCRIPTION =
  "Stamped builds models of your plant from the data it already records, finds where efficiency is lost across process, quality, planning and maintenance, and improves it with actions your team can take.";

export const EXAMPLE_FOOTNOTE =
  "These are examples, and numbers in [brackets] are placeholders. Your pilot writes the real ones from your own plant data.";

/** Honest note for industries where Stamped has not yet deployed (copy guide, section 1). */
export const EARLY_INDUSTRY_NOTE =
  "Our first deployments are with auto-component makers. In this industry we start the same way, with a site survey on your floor and a written read-out of where we would begin.";

export function homeFaq(id: string): IndustryFaqItem {
  const item = landingContent.faq.items.find((faq) => faq.id === id);
  if (!item) {
    throw new Error(`Missing homepage FAQ item: ${id}`);
  }
  return { id: item.id, question: item.question, answer: item.answer };
}

export function sharedOutcomes(): VerticalPageContent["outcomes"] {
  return {
    eyebrow: "Impact",
    title: "What changes in the plant.",
    disclaimer: landingContent.impact.footnote,
    items: landingContent.impact.items.map((item) => ({
      id: item.id,
      title: item.title.replace(/,$/, ""),
      description: item.detail.charAt(0).toUpperCase() + item.detail.slice(1),
    })),
  };
}

export const AREAS_EYEBROW = "Where efficiency is lost";
