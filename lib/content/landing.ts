import type {
  CtaLink,
  HeroFeatureItem,
  HomeFaqItem,
  HomeHiwStep,
  HomeProblemPoint,
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
    badge: "For industrial plants",
    headline: "Act on energy opportunities in real time.",
    supportingLine:
      "Stamped analyzes plant, application, and live market data to create ₹-scored prescriptions so operators can act before opportunities are missed.",
    primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
    secondaryCta: { label: "See how it works", href: "#hiw" } satisfies CtaLink,
    microcopy: "See how quickly Stamped can deliver the first prescriptions in your plant.",
    motionSlotLabel: "Hero visual",
    /** Legacy fields kept for unused hero subcomponents until cleanup */
    eyebrow: "For industrial plants",
    headlineLine1: "Act on energy opportunities",
    headlineLine2: "in real time.",
    subheadline: "",
    commercialBadge: "Pay as you save · Pilot first · Scale after verified evidence",
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

  homeProblem: {
    badge: "Problem",
    title: "Energy cost follows every operating decision. Action rarely keeps pace.",
    items: [
      {
        id: "priorities",
        title: "Data is abundant. Clear priorities are not.",
        description:
          "Meters, systems, and bills already hold the signals. Turning them into a ranked next action still takes more time than teams have.",
      },
      {
        id: "speed",
        title: "Windows to act close before teams can respond.",
        description:
          "Tariffs, demand peaks, and load patterns shift with production. By the time insights are reviewed, the highest-value opportunity has often passed.",
      },
      {
        id: "invisible",
        title: "Floor decisions and energy outcomes stay disconnected.",
        description:
          "Each choice affects energy cost and downtime risk, but the link between what happens on the floor and what appears on the bill remains hard to see in time to act.",
      },
    ] satisfies HomeProblemPoint[],
  },

  whatIs: {
    badge: "What is Stamped",
    title: "AI-powered energy intelligence for industrial plants",
    description:
      "Stamped continuously analyzes real-time asset, plant, and market data to deliver ₹-scored prescriptions with a full audit trail for front-line operators.",
    motionSlotLabel: "Product visual",
  },

  homeHowItWorks: {
    badge: "How it works",
    title: "From plant data to operator decisions.",
    steps: [
      {
        id: "data",
        step: 1,
        label: "Data",
        title: "Plant and market signals are stored and modeled in real time.",
        description:
          "Stamped continuously ingests plant data and external signals for real-time analysis, including energy tariffs, demand, and production context.",
        bullets: [
          "Internal plant data from equipment, assets, and control systems",
          "Internal application data such as bills, inventory, and work orders",
          "External signals including energy prices, weather, and market conditions",
        ],
      },
      {
        id: "analysis",
        step: 2,
        label: "Analysis",
        title: "Operational scenarios and economic impact are analyzed 24/7.",
        description:
          "Stamped continuously runs scenario, impact, and risk analysis against your plant's operating constraints to calculate how different actions affect performance, risk, and rupee outcomes.",
        bullets: [
          "Continuous evaluation of operational scenarios across the plant",
          "Analysis of economic impact, performance, and operational risk",
          "Proactive analysis as plant and market conditions change",
        ],
      },
      {
        id: "recommendations",
        step: 3,
        label: "Prescriptions",
        title: "₹-scored prescriptions are generated in real time.",
        description:
          "Stamped's models generate prescriptions ranked by expected economic impact, so operators can see which actions are projected to have the greatest effect on cost and performance.",
        bullets: [
          "₹-scored prescriptions focus attention on top priorities",
          "Continuous updates as plant and market conditions change",
          "A full audit trail with data sources, scoring model, and recommendation logic",
        ],
      },
      {
        id: "decisions",
        step: 4,
        label: "Decisions",
        title: "Operators review prescriptions and remain in control.",
        description:
          "Plant teams review prescriptions through an easy-to-use interface, decide which actions to take, and remain in control of operating decisions.",
        bullets: [
          "Every accepted, rejected, or adjusted prescription captures operator expertise and improves the next decision",
          "Faster onboarding and expertise building for new employees",
          "Expertise is captured before it retires or walks out the door",
        ],
      },
    ] satisfies HomeHiwStep[],
  },

  impact: {
    badge: "Impact",
    title: "Measurable impact on plant performance and energy cost.",
    description:
      "Stamped identifies and ₹-scores high-impact prescriptions as plant and market conditions change.",
    disclaimer:
      "Indicative ranges from comparable plants. Your pilot replaces these with figures verified with evidence.",
    items: [
      {
        id: "bill-reduction",
        value: "15-20%",
        label: "Reduction in monthly energy cost",
        detail: "Across energy-intensive manufacturing plants in India",
      },
      {
        id: "sec-efficiency",
        value: "8-15%",
        label: "Gain in operating efficiency",
        detail: "Energy use aligned to production by shift, batch, or line",
      },
      {
        id: "md-reduction",
        value: "15-25%",
        label: "Reduction in maximum demand charges",
        detail: "Often from incomer meter and bill data alone, no capex",
      },
      {
        id: "idle-waste",
        value: "10-20%",
        label: "Non-production energy flagged",
        detail: "Idle loads, holding, HVAC staging, and batch gaps",
      },
      {
        id: "downtime",
        value: "10-20%",
        label: "Unplanned downtime prevented",
        detail: "Early equipment warnings from the same energy stack",
      },
      {
        id: "energy-waste",
        value: "8-12%",
        label: "Energy waste identified",
        detail: "Across assets within the first weeks via per-equipment baselines",
      },
    ] satisfies StatItem[],
  },

  /** Alias used by legacy HomeOutcomesBand until homepage rebuild */
  outcomes: {
    eyebrow: "Impact",
    title: "Measurable impact on plant performance and energy cost.",
    disclaimer:
      "Indicative ranges from comparable plants. Your pilot replaces these with figures verified with evidence.",
    homeStats: [
      {
        id: "bill-reduction",
        value: "15-20%",
        label: "Reduction in monthly energy cost",
        detail: "Energy-intensive manufacturing plants in India",
      },
      {
        id: "sec-efficiency",
        value: "8-15%",
        label: "Gain in operating efficiency",
        detail: "Energy use aligned to production by shift, batch, or line",
      },
      {
        id: "plant-efficiency",
        value: "10-20%",
        label: "Unplanned downtime prevented",
        detail: "Early equipment warnings from the same energy stack",
      },
    ] satisfies StatItem[],
    stats: [
      {
        id: "bill-reduction",
        value: "15-20%",
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

  solutionsSection: {
    badge: "Solutions",
    title: "Solutions that connect plant decisions to measurable cost and reliability outcomes.",
  },

  resourcesSection: {
    badge: "Resources",
    title: "Research, publications, and case studies",
    viewAllLabel: "View all",
    viewAllHref: "/case-studies",
  },

  problem: {
    eyebrow: "Problem",
    title: "Energy cost follows every operating decision. Action rarely keeps pace.",
    description:
      "Most plants already meter everything. Cost stalls because data never becomes a ranked next action.",
    items: [
      {
        id: "priorities",
        title: "Data is abundant. Clear priorities are not.",
        description:
          "Meters, systems, and bills already hold the signals. Turning them into a ranked next action still takes more time than teams have.",
        solutionHeading: "How Stamped closes it",
        solutionPoints: [
          "Read-only connect in 14 days: meters, bills, SCADA",
          "AI by shift, asset, and product - not plant averages",
          "Ranked fixes with ₹/month on WhatsApp",
        ],
      },
      {
        id: "speed",
        title: "Windows to act close before teams can respond.",
        description:
          "Tariffs, demand peaks, and load patterns shift with production. By the time insights are reviewed, the highest-value opportunity has often passed.",
        solutionHeading: "How Stamped closes it",
        solutionPoints: [
          "90-day pilot, subscribe after verified evidence",
          "See ₹ impact before scaling spend",
          "Exit at Day 90 - no hostage contract",
        ],
      },
      {
        id: "invisible",
        title: "Floor decisions and energy outcomes stay disconnected.",
        description:
          "Each choice affects energy cost and downtime risk, but the link between what happens on the floor and what appears on the bill remains hard to see in time to act.",
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
        "Connect plant signals, build baselines, prescribe in rupees, route on WhatsApp, verify with evidence, improve based on decisions taken.",
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
        description: "Improve based on decisions taken.",
      },
    ] satisfies WorkflowStep[],
  },

  prescription: {
    eyebrow: "Prescription example",
    title: "What your team receives to act on",
    description:
      "Each prescription states the action, the evidence, the owner, the effort, and the monthly rupee impact. Delivered to supervisors on WhatsApp. Figures below are sample data for illustration.",
    fields: getScenarioPrescription("homepagePrescription"),
    footerText: "Walk through the full operating loop on the Platform.",
    footerCta: { label: "See the Platform", href: "/platform" } satisfies CtaLink,
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
        description: "Improve based on decisions taken and verified outcomes.",
      },
    ] satisfies HowItWorksStep[],
  },

  industries: {
    badge: "Industries",
    eyebrow: "Industries",
    title: "Stamped for cement, steel, pharma, chemical, and automotive.",
    description:
      "Turn energy volatility, process constraints, and equipment risk into ₹-scored prescriptions, so every operating hour protects cost.",
    cta: { label: "View all industries", href: "/industries" } satisfies CtaLink,
    items: [
      {
        id: "automotive",
        name: "Automotive",
        focus: "Shift-start peaks, holding loads, utilities",
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
        focus: "Kiln, raw mill, and WHR timing",
        description:
          "Kiln, raw mill, and WHR dispatch patterns drive cost across continuous processes, where a few minutes of mis-timed load shows up on the incomer.",
        sustainability:
          "kWh/ton drift and PAT-aligned SEC evidence on verified actions.",
        imageSrc: "/industries/cement.png",
        imageAlt: "Cement manufacturing plant with silos and towers at dusk",
      },
      {
        id: "steel",
        name: "Steel & metals",
        focus: "Furnace and rolling power balance",
        description:
          "Furnace, rolling mill, and auxiliary loads compete for power. Energy balance directly determines cost competitiveness and throughput stability.",
        sustainability:
          "PAT / intensity discipline for furnace and rolling utilities.",
        imageSrc: "/industries/steel.png",
        imageAlt: "Steel rolling mill with glowing hot metal billets",
      },
      {
        id: "pharma",
        name: "Pharmaceutical",
        focus: "HVAC, cleanroom, and batch utilities",
        description:
          "HVAC, cleanroom, and batch utilities run around the clock. Small staging errors show up as MD spikes and intensity drift on every audit.",
        sustainability:
          "Lower grid intensity for HVAC-heavy MSME and mid-market sites.",
        imageSrc: "/industries/pharma.png",
        imageAlt: "Pharmaceutical vial filling line in a sterile manufacturing plant",
      },
      {
        id: "chemical",
        name: "Chemical & paint",
        focus: "Batch schedules and utility islands",
        description:
          "Batch reactors, solvent recovery, and utility islands run on tight schedules. Tariff windows and holding loads decide whether margin survives the month.",
        sustainability:
          "Batch SEC and utility intensity: decision layer for advanced batch plants.",
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
          "One product, two pillars: Industry Energy Management and Asset Health Intelligence on the same stack. Not a separate MES or CMMS.",
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
          "We lead with verified with evidence: an ops-cleared ledger of potential vs realised impact. DISCOM bill confirmation is optional when the period closes, not the only proof story.",
      },
    ] satisfies HomeFaqItem[],
  },

  closingCta: {
    title: "See how quickly Stamped can deliver prescriptions for your plant",
    description: "No rip-and-replace. Full audit trail from day one.",
    primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
    secondaryCta: { label: "See the Platform", href: "/platform" } satisfies CtaLink,
  },
} as const;
