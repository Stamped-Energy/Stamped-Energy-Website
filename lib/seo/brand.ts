/** Product suite and lines (brand architecture). Used in JSON-LD and llms indexes only. */

export const STAMPED_SUITE_NAME = "Stamped Industrial Intelligence Suite";

export const STAMPED_PRODUCT_LINES = [
  "Stamped Energy",
  "Stamped Process",
  "Stamped Production",
  "Stamped Maintenance",
  "Stamped Control",
  "Stamped Quality",
] as const;

const STAMPED_BRAND = {
  "@type": "Brand" as const,
  name: "Stamped",
};

/** Organization `hasOfferCatalog` — suite name plus product lines (names only). */
export function buildStampedSuiteOfferCatalog() {
  return {
    "@type": "OfferCatalog" as const,
    name: STAMPED_SUITE_NAME,
    itemListElement: STAMPED_PRODUCT_LINES.map((name) => ({
      "@type": "Offer" as const,
      itemOffered: {
        "@type": "Product" as const,
        name,
        brand: STAMPED_BRAND,
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
