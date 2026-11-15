/** Product suite and lines (brand architecture). Used in JSON-LD and llms indexes only. */

import { icp } from "@/lib/content/icp";
import { ORGANIZATION_ID } from "@/lib/seo/constants";

export const STAMPED_SUITE_NAME = "Stamped Industrial Intelligence Suite";

/** Product-line labels for deprecated solution-area `<title>` tags (metadata only). */
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
  return `Stamped is industrial AI for ${icp.geography}. Stamped Energy is one product line of the ${STAMPED_SUITE_NAME}.`;
}

/** Live v4 products (Quelta, Orrery) plus energy counted in every action — not a fourth product. */
export const STAMPED_PRODUCT_LINES = ["Quelta", "Orrery", "Stamped Energy"] as const;

/** Organization `hasOfferCatalog` — suite name plus product lines (names only). */
export function buildStampedSuiteOfferCatalog() {
  return {
    "@type": "OfferCatalog" as const,
    name: STAMPED_SUITE_NAME,
    itemListElement: STAMPED_PRODUCT_LINES.map((name) => ({
      "@type": "Offer" as const,
      itemOffered: {
        "@type": "SoftwareApplication" as const,
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
  lines.push("Two products (each sold on its own):");
  lines.push("- Quelta — Process and Quality (maintenance flags when a machine drifts)");
  lines.push("- Orrery — Ask (AI agent for manufacturing, grounded in your plant)");
  lines.push(
    "- Energy is counted in every action Quelta recommends; Stamped Energy is honesty about that, not a separate product you buy beside Quelta and Orrery.",
  );
  lines.push("- Scheduling — coming soon (noindex); re-sequences the shift after a stop.");
  return lines;
}
