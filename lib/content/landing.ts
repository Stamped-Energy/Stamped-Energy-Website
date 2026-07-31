import type {
  CtaLink,
  HeroFeatureItem,
  HomeFaqItem,
  HowItWorksStep,
  IconBulletItem,
  IndustryItem,
  PayAsYouSaveApproach,
  PayAsYouSaveBenefit,
  ProblemItem,
  StatItem,
  WhyStampedItem,
  WorkflowStep,
} from "./types";
import { icp } from "./icp";
import { getHeroCallouts, getHeroVisual, getScenarioPrescription } from "./scenarios";

export const landingContent = {
  hero: {
    eyebrow: "AI-Powered Energy Intelligence",
    headlineLine1: "From plant data",
    headlineLine2: "to verified outcomes",
    subheadline: "",
    supportingLine:
      "AI ranks fixes from your meters, bills, and plant data. Your team executes. Outcomes are verified with evidence.",
    supportingLine2: icp.heroBillLine,
    commercialBadge: "Pay as you save · Pilot first · Scale after verified evidence",
    primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
    secondaryCta: { label: "See the Platform", href: "/platform" } satisfies CtaLink,
    features: [
      {
        id: "read-only",
        title: "Read-only integration",
        subtitle: "No control writes",
        icon: "shield",
      },
      {
        id: "systems",
        title: "Works with your systems",
        subtitle: "SCADA, PLC, EMS, Meters",
        icon: "factory",
      },
      {
        id: "prescriptions",
        title: "Prescriptions, not charts",
        subtitle: "Assigned. Tracked. Verified.",
        icon: "prescription",
      },
      {
        id: "verified",
        title: "Savings verified on",
        subtitle: "DISCOM bills",
        icon: "rupee",
      },
    ] satisfies HeroFeatureItem[],
    callouts: getHeroCallouts(),
    video: {
      webm: "/video/how-it-works-cinematic.webm",
      poster: "/video/how-it-works-poster.png",
      label:
        "How Stamped Energy works: connect plant data, get rupee-denominated AI prescriptions, verify savings on your next bill.",
    },
    visualImageSrc: getHeroVisual().src,
    visualImageAlt: getHeroVisual().alt,
  },

  trust: {
    label: `For ${icp.buyerTitlesShort} at ${icp.revenueFloor} plants`,
    items: [
      "Connects to incomer meters and existing SCADA. No hardware retrofit.",
      "Actions on WhatsApp to supervisors who can execute tomorrow morning",
      "Pilot first. Verified with evidence before annual commitment.",
    ],
  },

  valueProps: {
    eyebrow: "What changes for the plant",
    title: "Two outcomes. One Stamped Intelligence stack.",
    items: [
      {
        id: "energy-savings",
        title: "Energy savings",
        body: "Load management and energy-efficiency prescriptions — MD, TOD, idle, HVAC, tariff — with owners and monthly rupee impact.",
      },
      {
        id: "plant-efficiency",
        title: "Plant / industrial efficiency",
        body: "Prescriptive equipment intelligence from the same energy graph — early warnings before trips and waste compound.",
      },
    ],
  },

  outcomes: {
    eyebrow: "Typical recovery ranges",
    title: "Numbers that must appear on the bill, not in a slide deck",
    disclaimer:
      "Benchmark ranges from comparable plants. Your pilot replaces these with verified figures.",
    stats: [
      {
        id: "bill-reduction",
        value: "12-20%",
        label: "Off your monthly electricity bill",
        detail: "Cement, steel, pharma, chemical, automotive",
      },
      {
        id: "md-reduction",
        value: "15-25%",
        label: "Off maximum demand charges",
        detail: "Often from incomer meter + bill data alone, no capex",
      },
      {
        id: "waste-elimination",
        value: "10-20%",
        label: "Non-production energy flagged",
        detail: "Idle loads, holding, HVAC staging, batch gaps within 90 days",
      },
      {
        id: "payback",
        value: "3-6 mo",
        label: "Subscription paid back from savings",
        detail: "Target payback once prescriptions are executed",
      },
    ] satisfies StatItem[],
  },

  problem: {
    eyebrow: "Why the bill keeps winning",
    title: "You have the data. The project model is what breaks.",
    description:
      "Most plants already meter everything. Savings stall because audits, EMS, and dashboards never close the loop to the bill.",
    items: [
      {
        id: "technical",
        title: "Data never meets the invoice",
        description:
          "Meters, SCADA, and DISCOM line items live in silos. MD spikes never tie back to a rupee on the bill.",
        solutionHeading: "How Stamped closes it",
        solutionPoints: [
          "Read-only connect in 14 days: meters, bills, SCADA",
          "AI by shift, asset, and product - not plant averages",
          "Ranked fixes with ₹/month on WhatsApp",
        ],
      },
      {
        id: "financial",
        title: "You pay before savings show",
        description:
          "Audits deliver PDFs. EMS needs a capital budget. Momentum dies before the first verified billing cycle.",
        solutionHeading: "How Stamped closes it",
        solutionPoints: [
          "90-day pilot, subscribe after verified bill",
          "See ₹ on the invoice before scaling spend",
          "Exit at Day 90 - no hostage contract",
        ],
      },
      {
        id: "personnel",
        title: "Another dashboard is not the answer",
        description:
          "Supervisors need assigned work with a rupee figure, not a screen the plant head opens once a month.",
        solutionHeading: "How Stamped closes it",
        solutionPoints: [
          "WhatsApp to people who flip switches",
          "Expected vs actual tied to billing cycle",
          "CFO sees ₹; sustainability sees intensity",
        ],
      },
    ] satisfies ProblemItem[],
  },

  payAsYouSave: {
    eyebrow: "Commercial model",
    title: "Pay as you save, not pay before you know.",
    description:
      "Low pilot fee. Verified savings on your bill. Subscription only after proof.",
    approaches: [
      {
        label: "Typical vendor model",
        description:
          "Large upfront spend. Months before anyone assigns a fix. Savings stay estimated in a slide deck.",
        variant: "traditional",
      },
      {
        label: "Stamped model",
        description:
          "Low pilot fee. First fixes in 14 days. Subscribe after a verified savings month.",
        variant: "stamped",
      },
    ] satisfies PayAsYouSaveApproach[],
    legend: ["Investment", "ROI", "Scale"],
    benefits: [
      {
        id: "protect-capital",
        title: "Protect capital",
        description: "Pilot fee, not a transformation budget",
      },
      {
        id: "prove-on-bill",
        title: "Prove on the bill",
        description: "Realised savings matched to DISCOM line items",
      },
      {
        id: "scale-confidence",
        title: "Scale when ready",
        description: "Add sites and users after M&V, not before",
      },
    ] satisfies PayAsYouSaveBenefit[],
    cta: { label: "Start a 90-day pilot", href: "/contact" } satisfies CtaLink,
  },

  workflow: {
    eyebrow: "The Stamped Energy Loop",
    title: "From fragmented data to verified outcomes in six operational steps.",
    description: "",
    media: {
      title: "Six-step closed loop walkthrough",
      description:
        "Connect plant signals, build baselines, prescribe in rupees, route on WhatsApp, verify with evidence, improve from followed vs ignored Rx.",
      src: null as string | null,
      posterAlt:
        "Stamped Energy six-step workflow: Connect, Observe, Decide, Execute, Verify, Improve",
    },
    steps: [
      {
        id: "connect",
        title: "Connect",
        description: "Integrate with your systems and meters.",
      },
      {
        id: "observe",
        title: "Observe",
        description: "Normalize and analyze patterns.",
      },
      {
        id: "decide",
        title: "Decide",
        description: "Get ranked prescriptions with ₹ impact.",
      },
      {
        id: "execute",
        title: "Execute",
        description: "Assign actions to your team and track.",
      },
      {
        id: "verify",
        title: "Verify",
        description: "Outcomes verified with evidence.",
      },
      {
        id: "improve",
        title: "Improve",
        description: "Calibrate from followed vs ignored Rx.",
      },
    ] satisfies WorkflowStep[],
  },

  prescription: {
    eyebrow: "Not a dashboard",
    title: "This is what your plant team gets - not a kWh chart",
    fields: getScenarioPrescription("homepagePrescription"),
    footerText: "This is what closure looks like.",
    footerCta: { label: "Full platform walkthrough", href: "/platform" } satisfies CtaLink,
  },

  howItWorks: {
    eyebrow: "Platform loop",
    title: "The Stamped Energy Loop",
    cta: { label: "Full platform walkthrough", href: "/platform" } satisfies CtaLink,
    steps: [
      {
        id: "connect-systems",
        step: 1,
        title: "Connect what you already run",
        description: "Incomer + bills first. SCADA, PLCs, and production data as available.",
      },
      {
        id: "baseline",
        step: 2,
        title: "Baseline normal for your plant",
        description: "SEC and demand by shift, process, and product mix, not generic benchmarks.",
      },
      {
        id: "detect",
        step: 3,
        title: "Flag deviations in rupees",
        description: "MD spikes, holding loads, idle compressors, tariff misalignment, quantified monthly.",
      },
      {
        id: "prescribe",
        step: 4,
        title: "Assign fixes to your team",
        description: "What, why, who, effort, ₹ impact tracked until done.",
      },
      {
        id: "verify-savings",
        step: 5,
        title: "Verify with evidence",
        description: "Potential vs realised in an ops-cleared ledger. Bill confirmation optional.",
      },
      {
        id: "improve-loop",
        step: 6,
        title: "Improve from outcomes",
        description: "Calibrate ranks and preferences from followed vs ignored Rx — human-gated.",
      },
    ] satisfies HowItWorksStep[],
  },

  industries: {
    eyebrow: "Industries",
    title: "Industries we serve",
    description:
      "Purpose-built AI-powered energy intelligence for energy-intensive manufacturing - cement, steel, pharma, chemical, and automotive.",
    cta: { label: "View all industries", href: "/industries" } satisfies CtaLink,
    items: [
      {
        id: "automotive",
        name: "Automotive",
        focus: "AI-led energy control",
        description:
          "Shift-start overlap, furnace holding, and utility peaks drive cost stability and uptime across forging, paint, and assembly lines.",
        sustainability:
          "Support OEM supplier intensity and audit requests with verified SEC trends.",
        imageSrc: "/industries/forging.jpg",
        imageAlt: "Automotive forging press line",
      },
      {
        id: "cement",
        name: "Cement",
        focus: "AI-driven energy intelligence",
        description:
          "Kiln, raw mill, and WHR dispatch patterns drive cost across continuous processes - where a few minutes of mis-timed load shows up on the incomer.",
        sustainability:
          "kWh/ton drift and PAT-aligned SEC evidence on verified actions.",
        imageSrc: "/industries/cement.png",
        imageAlt: "Cement manufacturing plant with silos and towers at dusk",
      },
      {
        id: "steel",
        name: "Steel & metals",
        focus: "AI-driven energy management",
        description:
          "Furnace, rolling mill, and auxiliary loads compete for power - energy balance directly determines cost competitiveness and throughput stability.",
        sustainability:
          "PAT / intensity discipline for furnace and rolling utilities.",
        imageSrc: "/industries/steel.png",
        imageAlt: "Steel rolling mill with glowing hot metal billets",
      },
      {
        id: "pharma",
        name: "Pharmaceutical",
        focus: "AI-driven energy management",
        description:
          "HVAC, cleanroom, and batch utilities run around the clock - small staging errors show up as MD spikes and intensity drift on every audit.",
        sustainability:
          "Lower grid intensity for HVAC-heavy MSME and mid-market sites.",
        imageSrc: "/industries/pharma.png",
        imageAlt: "Pharmaceutical vial filling line in a sterile manufacturing plant",
      },
      {
        id: "chemical",
        name: "Chemical & paint",
        focus: "AI-powered energy intelligence",
        description:
          "Batch reactors, solvent recovery, and utility islands run on tight schedules - tariff windows and holding loads decide whether margin survives the month.",
        sustainability:
          "Batch SEC and utility intensity - decision layer for advanced batch plants.",
        imageSrc: "/industries/chemical.png",
        imageAlt: "Chemical refinery with storage tanks and distillation towers at twilight",
      },
    ] satisfies IndustryItem[],
  },

  whyStamped: {
    eyebrow: "Why Stamped",
    title: "Enterprise EMS tools were not built for your plant's decision layer",
    items: [
      {
        id: "prescriptive",
        title: "Tells your team what to do tomorrow",
        description:
          'Not "energy is high." Instead: stagger Furnace 2 by 10 minutes, assign to electrical maintenance, ₹1.2L/month.',
      },
      {
        id: "sme-priced",
        title: "Pay as you save",
        description:
          "Start with a low-fee 90-day pilot. Subscription kicks in after savings show on your DISCOM bill - not after a deck of estimated opportunities.",
      },
      {
        id: "software-only",
        title: "Uses infrastructure you already paid for",
        description:
          "Incomer meter, SCADA, PLCs, CNCs connected without a hardware retrofit program.",
      },
      {
        id: "whatsapp-native",
        title: "Reaches supervisors on WhatsApp",
        description:
          "Prescriptions go to people who can act, not a screen only the plant head opens once a month.",
      },
      {
        id: "sustainability-evidence",
        title: "Sustainability evidence, not slides",
        description:
          "Export realised vs potential savings and intensity trends for leadership reviews, customer audits, and corporate reporting - sourced from verified plant operations, not manual spreadsheets.",
      },
    ] satisfies WhyStampedItem[],
  },

  futureMedia: {
    eyebrow: "On the shop floor",
    title: "Actions reach supervisors, not another login",
    description:
      "Your electrical and maintenance teams get what to fix, why the data shows it, and how many rupees are on the line. Plant head sees what closed and what saved.",
    imageSrc: "/industries/heat-treatment.webp",
    imageAlt: "Industrial heat treatment furnace in operation",
    imageCaption:
      "Furnace holding, shift-start overlap, compressor unload: the patterns your bill already hints at",
  },

  credibility: {
    eyebrow: "Who builds this",
    title: "Electrical engineering depth. Prescriptions in rupees, not slides.",
    founderNote:
      "Founded by an IIT Roorkee electrical engineering graduate with research in energy systems. Built for plant heads who need verified outcomes on the DISCOM bill, not another monitoring layer.",
  },

  operationalSustainability: {
    eyebrow: "Operational sustainability",
    title: "Reduce grid intensity with decisions your auditors can follow",
    paragraphs: [
      "Every rupee you recover on the DISCOM bill is grid electricity you no longer draw, so the prescriptions that cut cost also lower your Scope 2 footprint - measured on real consumption, not modelled estimates.",
      "When production is tagged, Stamped tracks energy per unit, giving you verified intensity evidence for government efficiency programmes and sustainability reporting.",
    ],
    stats: [
      {
        id: "grid-recovery",
        value: "12-20%",
        label: "Typical grid electricity cost recovery",
        detail: "Comparable process plants; pilot verifies",
      },
      {
        id: "lower-intensity",
        value: "Lower intensity",
        label: "Energy per unit trend when production tagged",
        detail: "SEC / kWh per batch or ton where data exists",
      },
    ] satisfies StatItem[],
    cta: { label: "See how verification works", href: "/platform" } satisfies CtaLink,
  },

  industry40: {
    eyebrow: "Industry 4.0 - Decision layer",
    title: "Your plant already digitized visibility. Stamped digitizes closure.",
    bullets: [
      {
        id: "connect",
        title: "Connect read-only",
        description:
          "Pulls from incomer meters, SCADA, PLCs, and historians without writing back to control systems.",
      },
      {
        id: "normalize",
        title: "Normalize",
        description:
          "Cleans and aligns mixed-vendor data into one energy picture across utilities and processes.",
      },
      {
        id: "prescribe",
        title: "Prescribe",
        description:
          "Turns the data into specific, assigned actions with a rupee value - not another dashboard to interpret.",
      },
      {
        id: "verify",
        title: "Verify",
        description:
          "Confirms outcomes on the DISCOM bill and tracks intensity, closing the loop between data and result.",
      },
    ] satisfies IconBulletItem[],
    closer:
      "Compatible with the systems you already run. Adds the governance layer between data and outcomes.",
  },

  faq: {
    eyebrow: "FAQ",
    title: "Questions plant leaders ask",
    items: [
      {
        id: "what-is-stamped",
        question: "What does Stamped actually do?",
        answer:
          "Stamped Intelligence connects to your existing meters, SCADA, and plant data, finds where energy and rupees are leaking, and sends assigned prescriptions to your team. Outcomes are verified with evidence; DISCOM bill confirmation can follow.",
      },
      {
        id: "hardware",
        question: "Do we need to install new hardware?",
        answer:
          "No hardware retrofit program is required. Stamped is software-only and connects read-only to the incomer meter, SCADA, PLCs, and CNCs you already run.",
      },
      {
        id: "two-pillars",
        question: "Is this only energy savings, or equipment too?",
        answer:
          "One product, two pillars: load and energy-efficiency prescriptions, plus early equipment intelligence on the same stack. Not a separate MES or CMMS.",
      },
      {
        id: "team-action",
        question: "Who receives the prescriptions?",
        answer:
          "Actions reach the supervisors and electrical or maintenance staff who can act, delivered on WhatsApp - not a screen only the plant head opens once a month.",
      },
      {
        id: "savings-real",
        question: "How do we know outcomes are real?",
        answer:
          "We lead with verified with evidence — an ops-cleared ledger of potential vs realised impact. DISCOM bill confirmation is optional when the period closes, not the only proof story.",
      },
    ] satisfies HomeFaqItem[],
  },

  closingCta: {
    title: "See verified evidence before you commit",
    description:
      "Begin with a pilot on your existing meters and plant data. We quantify outcomes in rupees and clear them with evidence before annual subscription. DISCOM bill confirmation can follow when the period closes.",
    primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
    secondaryCta: { label: "See the Platform", href: "/platform" } satisfies CtaLink,
  },
} as const;
