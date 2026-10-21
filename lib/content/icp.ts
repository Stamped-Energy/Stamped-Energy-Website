/** Single source for ICP and positioning copy (SEO, AEO, llms.txt, schema). Copy canon: Stamped copy v3 (3 Oct 2026). */

export const icp = {
  buyerTitles: [
    "Owner or MD",
    "Plant head",
    "Quality head",
    "Production and process engineers",
    "Maintenance lead",
    "CFO",
  ] as const,
  buyerTitlesShort: "plant heads, quality heads and the engineers who run the lines",
  geography: "manufacturing plants in India",
  positioning:
    "Stamped takes you from monitoring your plant to improving it. It models your processes and equipment from the data you already log, and its AI agents find where output, quality and energy are lost and recommend the change that fixes it.",
  seo: {
    /** Category line: tagline, title tags, schema. */
    categoryLabel: "Industrial AI",
    /** Entity sentence for AEO / GEO (cite verbatim in llms.txt and Organization schema). */
    entityDefinition:
      "Stamped is industrial AI, from monitoring your plant to improving it. It models a manufacturing plant's processes and equipment from the data it already records, from its machines and control systems to its meters, ERP and quality registers. Its AI agents then find where output, quality and energy are being lost and recommend the change that fixes it, within limits the plant team sets. Stamped is built in India and is starting with auto-component makers in forging, heat treatment and precision machining.",
    /** Short meta description pattern. */
    metaDescription:
      "Stamped is industrial AI, from monitoring your plant to improving it. It models your plant from the data it already records and its agents improve process, quality and planning.",
    /** Audience line for llms.txt and docs. */
    audienceLine:
      "Mid-market manufacturers in India, from a few hundred crore rupees of revenue upward; automotive components first.",
    /** Industries for schema knowsAbout and keyword clusters. */
    verticals: ["auto components", "forging", "heat treatment", "precision machining", "die casting", "rubber moulding", "steel", "cement", "pharma", "chemicals"] as const,
    /** What Stamped is not (safe to say, per STAMPED_COPY_GUIDE section 7). */
    notA: "Stamped is not a replacement for MES, ERP, QMS, CMMS or SCADA, and it works alongside them. It is not a dashboard, not hardware and not an energy-only company.",
  },
} as const;
