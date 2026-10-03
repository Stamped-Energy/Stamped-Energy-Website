import type { VerticalPageContent } from "../types";
import { automotivePage } from "./automotive";
import { cementPage } from "./cement";
import { chemicalPage } from "./chemical";
import { pharmaPage } from "./pharma";
import { steelPage } from "./steel";

/** Auto components leads; steel, cement, pharma and chemicals are covered with the same four areas (copy v3, revision 2). */
export const VERTICAL_SLUGS = ["automotive", "steel", "cement", "pharma", "chemical"] as const;

export type VerticalSlug = (typeof VERTICAL_SLUGS)[number];

export const verticalPages: Record<VerticalSlug, VerticalPageContent> = {
  automotive: automotivePage,
  steel: steelPage,
  cement: cementPage,
  pharma: pharmaPage,
  chemical: chemicalPage,
};

export function isVerticalSlug(slug: string): slug is VerticalSlug {
  return VERTICAL_SLUGS.includes(slug as VerticalSlug);
}

export function getVerticalPage(slug: string): VerticalPageContent | undefined {
  if (!isVerticalSlug(slug)) {
    return undefined;
  }
  return verticalPages[slug];
}

export { automotivePage, cementPage, steelPage, pharmaPage, chemicalPage };
