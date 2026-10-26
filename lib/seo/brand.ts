/** Product suite and lines (brand architecture). Used in JSON-LD and llms indexes only. */

import { icp } from "@/lib/content/icp";
import { ORGANIZATION_ID } from "@/lib/seo/constants";

export const STAMPED_SUITE_NAME = "Stamped Industrial Intelligence Suite";

/** Product-line labels for solution-area `<title>` tags (metadata only). */
export const SOLUTION_AREA_PRODUCT_LINE_TITLE: Record<
  "process" | "quality" | "planning" | "maintenance",
  string
> = {
  process: "Stamped Process & Control",
  quality: "Stamped Quality",
  planning: "Stamped Production",
  maintenance: "Stamped Maintenance",
};

/** Short Organization disambiguatingDescription for search and AI engines (metadata only). */
export function stampedEntityDisambiguatingDescription(): string {
  const category = icp.seo.categoryLabel.toLowerCase();
  return `Stamped is ${category} for ${icp.geography}. Stamped Energy is one product line of the ${STAMPED_SUITE_NAME}.`;
}

export const STAMPED_PRODUCT_LINES = [
  "Stamped Energy",
  "Stamped Process",
  "Stamped Production",
  "Stamped Maintenance",
  "Stamped Control",
  "Stamped Quality",
] as const;

/** Organization `hasOfferCatalog` — suite name plus product lines (names only). */
export function buildStampedSuiteOfferCatalog() {
  return {
    "@type": "OfferCatalog" as const,
    name: STAMPED_SUITE_NAME,
    itemListElement: STAMPED_PRODUCT_LINES.map((name) => ({
      "@type": "Offer" as const,
      itemOffered: {
        "@type": "Service" as const,
        name,
        provider: { "@id": ORGANIZATION_ID },
      },
    })),
  };
}

export function formatLlmsProductsSection(): string[] {
  const lines: string[] = [];
  lines.push("## Products");
  lines.push("");
  lines.push(`Suite: ${STAMPED_SUITE_NAME}`);
  lines.push("Product lines:");
  for (const name of STAMPED_PRODUCT_LINES) {
    lines.push(`- ${name}`);
  }
  return lines;
}
