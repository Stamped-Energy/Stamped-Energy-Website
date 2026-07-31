/** Canonical title tags and meta descriptions per SEO spec (Sections 1-2). */

export type PageSeoConfig = {
  absoluteTitle: string;
  description: string;
  path: string;
};

export const PAGE_SEO = {
  home: {
    absoluteTitle:
      "Stamped Energy | AI-Powered Energy Intelligence for Plants in India",
    description:
      "AI-powered prescriptive intelligence for plants with ₹20 lakh+ monthly electricity bills. Ranked actions, assigned owners, bill-verified savings on your DISCOM bill. Cement, steel, pharma, chemical, automotive. Verified savings and auditable energy intensity for Indian manufacturers.",
    path: "/",
  },
  howItWorks: {
    absoluteTitle: "How It Works | Stamped Energy - 5-Step Energy Loop",
    description:
      "See how Stamped connects incomer meters, SCADA, and plant data into AI-powered prescriptions with verified rupee savings - Connect, Observe, Decide, Execute, Verify. No hardware retrofit required.",
    path: "/how-it-works",
  },
  about: {
    absoluteTitle: "About Stamped Energy | IIT Roorkee Engineers, Verified Savings",
    description:
      "Stamped Energy is AI-powered prescriptive energy intelligence built by IIT Roorkee electrical engineers for plant heads who need verified savings on the DISCOM bill, not another monitoring dashboard.",
    path: "/about",
  },
  blog: {
    absoluteTitle: "Case Studies & Industry Insights | Stamped Energy",
    description:
      "Case studies and field notes on maximum demand, shift-start overlap, furnace holding, and HVAC waste - written for plant directors and electrical HODs at energy-intensive plants in India.",
    path: "/blog",
  },
  caseStudies: {
    absoluteTitle: "Case Studies & Industry Insights | Stamped Energy",
    description:
      "Case studies and field notes on maximum demand, shift-start overlap, furnace holding, and HVAC waste - written for plant directors and electrical HODs at energy-intensive plants in India.",
    path: "/blog",
  },
  contact: {
    absoluteTitle: "Book a Discovery Call | Stamped Energy",
    description:
      "Book a discovery call with Stamped Energy. We review your last three DISCOM bills, plant meter setup, and outline a pilot - only if the numbers justify it.",
    path: "/contact",
  },
  industries: {
    absoluteTitle: "Industries | Stamped Energy - Cement, Steel, Pharma, Chemical, Auto",
    description:
      "AI-powered energy intelligence for cement, steel, pharmaceutical, chemical, and automotive plants in India. Purpose-built for plants with ₹20 lakh+ monthly electricity bills - verified on your DISCOM bill.",
    path: "/industries",
  },
  industriesAutomotive: {
    absoluteTitle: "Automotive Plant Energy Intelligence | Stamped Energy",
    description:
      "AI-powered energy intelligence for automotive and auto component plants. Die casting, forging, heat treatment, rubber moulding - prescriptions with rupee impact, verified on your DISCOM bill.",
    path: "/industries/automotive",
  },
  industriesCement: {
    absoluteTitle: "Cement Plant Energy Management India | Stamped Energy",
    description:
      "AI-driven energy intelligence for cement plants. kWh/ton, MD, WHR and grid dispatch prescriptions - verified on your DISCOM bill. For plants with ₹20 lakh+ monthly electricity bills.",
    path: "/industries/cement",
  },
  industriesSteel: {
    absoluteTitle: "Steel Plant Energy Efficiency India | Stamped Energy",
    description:
      "AI-driven energy management for steel and metals plants. Induction furnaces, rolling mills, MD control, PAT-aligned SEC - bill-verified prescriptions for plants in India.",
    path: "/industries/steel",
  },
  industriesPharma: {
    absoluteTitle: "Pharmaceutical Plant HVAC Energy Savings | Stamped Energy",
    description:
      "AI-driven energy management for pharma plants. Chiller staging, AHU schedules, MD prescriptions - GMP-safe utility levers with savings verified on your DISCOM bill.",
    path: "/industries/pharma",
  },
  industriesChemical: {
    absoluteTitle: "Chemical Plant Batch Energy Optimization | Stamped Energy",
    description:
      "AI-powered energy intelligence for chemical and paint plants. Batch SEC, reactor stagger, idle hold prescriptions - verified monthly on your DISCOM bill.",
    path: "/industries/chemical",
  },
} as const satisfies Record<string, PageSeoConfig>;

const VERTICAL_SEO_MAP: Record<string, PageSeoConfig> = {
  automotive: PAGE_SEO.industriesAutomotive,
  cement: PAGE_SEO.industriesCement,
  steel: PAGE_SEO.industriesSteel,
  pharma: PAGE_SEO.industriesPharma,
  chemical: PAGE_SEO.industriesChemical,
};

export function getVerticalPageSeo(slug: string): PageSeoConfig | undefined {
  return VERTICAL_SEO_MAP[slug];
}
