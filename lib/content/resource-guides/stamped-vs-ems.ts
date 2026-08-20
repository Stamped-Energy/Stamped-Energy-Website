import type { ResourceGuideContent } from "./types";

export const stampedVsEmsGuide: ResourceGuideContent = {
  slug: "stamped-vs-ems",
  eyebrow: "Comparison",
  title: "How Stamped differs from EMS and SCADA",
  description:
    "EMS and SCADA show what happened. Stamped is the prescription and accountability layer on data you already have: what to change, who owns it, rupee impact, and outcomes verified with evidence.",
  primaryCta: { label: "Book a Discovery Call", href: "/contact" },
  secondaryCta: { label: "See the Platform", href: "/platform" },
  sections: [
    {
      id: "same-data",
      title: "Same meters. Different job.",
      body: [
        "Most energy-intensive plants in India already run meters, SCADA, historians, or an EMS. Those systems collect signals and raise alarms. They rarely assign a next action with a rupee score and an owner.",
        "Stamped sits as a read-only intelligence layer on that stack. It does not replace EMS, SCADA, PLC, MES, or CMMS. It turns live plant and market context into ranked prescriptions operators can accept, adjust, or reject.",
      ],
    },
    {
      id: "comparison",
      title: "What each layer is for",
      body: [
        "SCADA: real-time control and process visibility on the floor. Essential. Not built to close the loop from energy waste to a verified ₹ outcome on the bill or ops ledger.",
        "EMS / EnMS dashboards: trends, KPIs, and reports. Useful for reviews. Often stop at insight without an assigned action that survives shift handover.",
        "Energy audit: one-time or annual recommendations. Strong for a snapshot. Weak for continuous windows that close before the next review.",
        "Stamped: rupee-scored prescriptions with owners, evidence, and an improve loop. Path A can start from bills and meters. Path B deepens when SCADA or PLC context is available.",
      ],
    },
    {
      id: "when-stamped",
      title: "When plant heads choose Stamped",
      body: [
        "You already have data, but no one owns the next rupee move before the tariff window or MD spike passes.",
        "You need prescriptions that reach supervisors on WhatsApp, not another screen only leadership opens monthly.",
        "You want outcomes verified with evidence, with DISCOM bill confirmation optional when the period closes, without ripping out the stack you trust.",
      ],
    },
  ],
  faq: [
    {
      id: "replace-ems",
      question: "Does Stamped replace our EMS or SCADA?",
      answer:
        "No. Stamped is not a passive EMS dashboard or SCADA replacement. It is the prescription and accountability layer on top of data you already have.",
    },
    {
      id: "hardware",
      question: "Do we need a hardware retrofit?",
      answer:
        "No hardware retrofit program is required. Stamped connects read-only to incomer meters, SCADA, PLCs, and bills you already run.",
    },
    {
      id: "audit",
      question: "How is this different from an energy audit?",
      answer:
        "An audit is a point-in-time report. Stamped continuously ranks feasible moves as plant and market conditions change, assigns owners, and tracks decisions taken versus outcomes verified.",
    },
  ],
};
