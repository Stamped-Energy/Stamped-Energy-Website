import type { VerticalPageContent } from "../types";
import { automotivePage } from "./automotive";

/** Only auto components is live. Cement, steel, pharma and chemical pages were removed (301 to /industries). */
export const VERTICAL_SLUGS = ["automotive"] as const;

export type VerticalSlug = (typeof VERTICAL_SLUGS)[number];

export const verticalPages: Record<VerticalSlug, VerticalPageContent> = {
  automotive: automotivePage,
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

export { automotivePage };
