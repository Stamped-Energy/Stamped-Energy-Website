import type { ResourceGuideContent } from "./types";

export const discomBillGuide: ResourceGuideContent = {
  slug: "discom-bill-guide",
  eyebrow: "Guide",
  title: "How to read a DISCOM HT bill for action",
  description:
    "HT bills bury avoidable cost in MD, ToD, power factor, and energy line items. This guide maps those lines to plant decisions and how Stamped turns them into assigned prescriptions.",
  primaryCta: { label: "Book a Discovery Call", href: "/contact" },
  secondaryCta: { label: "See the Platform", href: "/platform" },
  sections: [
    {
      id: "line-items",
      title: "Line items that matter for plant cost",
      body: [
        "Energy (kWh): consumption by tariff block. ToD windows change the rupee cost of the same kWh.",
        "Maximum demand (kVA): fixed charge set by the peak window. Often the fastest lever without capex.",
        "Power factor / reactive: penalties when PF drifts. Correction and sequence both matter.",
        "Other riders and surcharges: state-specific. Always read the tariff order behind the bill.",
      ],
    },
    {
      id: "from-bill-to-action",
      title: "From bill signal to floor action",
      body: [
        "A bill alone is lagging. By the time it arrives, the shift that set MD or burned weekend holding is gone.",
        "Stamped uses bills plus live meters (and optional SCADA) so supervisors get prescriptions before the window closes: stagger startups, cut idle HVAC, move batches into cheaper ToD blocks when feasible.",
      ],
    },
    {
      id: "verify",
      title: "How outcomes are verified",
      body: [
        "Stamped leads with verified with evidence: an ops-cleared ledger of potential versus realised impact.",
        "DISCOM bill confirmation is optional when the billing period closes. It strengthens trust with CFOs, but it is not the only proof story.",
      ],
    },
  ],
  faq: [
    {
      id: "three-bills",
      question: "Why do discovery calls ask for three DISCOM bills?",
      answer:
        "Three recent HT bills show MD, ToD, and energy patterns across seasons and production mix. They help decide whether a pilot is justified before anyone touches your stack.",
    },
    {
      id: "bill-only",
      question: "Can Stamped start from bills alone?",
      answer:
        "Path A can start from bills and incomer meters. Path B adds SCADA or PLC context when it exists. Both stay read-only.",
    },
    {
      id: "verification",
      question: "How are energy savings verified on the DISCOM bill?",
      answer:
        "Outcomes are tracked in an evidence ledger first. When the period closes, bill confirmation can corroborate the same moves. Ranges stay indicative until your pilot replaces them with plant figures.",
    },
  ],
};
