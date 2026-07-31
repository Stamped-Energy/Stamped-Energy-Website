/** Single source for ICP copy - revenue floor, bill band, buyer titles, SEO/AEO positioning. */

export const icp = {
  revenueFloor: "₹200 Cr+",
  revenueFloorShort: "₹200 Cr",
  monthlyBillBand: "₹20-30 lakh+",
  monthlyBillFloor: "₹20 lakh",
  monthlyBillFloorShort: "₹20L",
  buyerTitles: [
    "Plant Director",
    "VP Operations",
    "Head of Electrical",
    "CFO",
  ] as const,
  buyerTitlesShort: "plant directors, VP Ops, and electrical heads",
  geography: "plants in India",
  heroBillLine: "Built for plants with ₹20 lakh+ monthly electricity bills.",
  positioning:
    "Prescriptive energy intelligence - specific prescriptions, rupee impact, verified with evidence.",
  seo: {
    /** Primary category label - use in titles, schema, llms.txt */
    categoryLabel: "AI-powered energy intelligence",
    /** Alternate phrasing for variety without diluting category */
    categoryLabelAlt: "AI-powered prescriptive energy intelligence",
    /** Entity clarity sentence for AEO / GEO (one paragraph, cite verbatim in llms.txt) */
    entityDefinition:
      "Stamped Energy is AI-powered prescriptive energy intelligence software for energy-intensive plants in India. It connects existing incomer meters, SCADA, PLCs, and DISCOM bills into ranked prescriptions - what to change, who owns it, rupee impact, and outcomes verified with evidence (DISCOM bill confirmation optional).",
    /** Short meta description pattern */
    metaDescription:
      "AI-powered prescriptive intelligence that identifies cost-saving opportunities and delivers actions to improve efficiency. Verified with evidence.",
    /** Audience line for llms.txt, SEO doc, sales */
    audienceLine:
      "Plant directors, VP Operations, electrical heads, and CFOs at energy-intensive plants in India (₹200 Cr+ revenue, ₹20 lakh+ monthly electricity bills).",
    /** Verticals for schema knowsAbout and keyword clusters */
    verticals: [
      "cement",
      "steel",
      "pharmaceutical",
      "chemical",
      "automotive",
    ] as const,
    /** Typical verified outcome ranges - always label as benchmark in copy */
    outcomes: {
      billReduction: "12-20%",
      mdReduction: "15-25%",
    },
    /** What we are NOT - AEO disambiguation */
    notA: "Not a passive EMS dashboard or SCADA replacement. Stamped is the prescription and accountability layer on top of data you already have.",
  },
} as const;

export function icpBillLine() {
  return `For ${icp.geography} with ${icp.monthlyBillFloor}+ monthly electricity bills`;
}

export function icpAudienceShort() {
  return icp.seo.audienceLine;
}
