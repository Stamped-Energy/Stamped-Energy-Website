import type { CtaLink, HomeFaqItem, IndustryFaqItem } from "./types";

/**
 * Products SSOT for website v4 (ADR-050).
 * Copy locked in docs/copy/v4-copy-deck.md. Plan page specs: Quelta, Orrery, Scheduling, hub, vision, home bands.
 */

export type ProductSlug = "process-quality" | "ask" | "scheduling";
export type ProductStatus = "live" | "coming-soon";

export type ProductNavItem = {
  label: string;
  href: string;
  descriptor?: string;
  badge?: string;
};

export type Product = {
  slug: ProductSlug;
  name: string;
  descriptor: string;
  href: string;
  status: ProductStatus;
  /** Short mega-menu / card blurb */
  summary: string;
  comingSoonLabel?: string;
};

const PRIMARY_CTA = { label: "Book a site survey", href: "/contact" } satisfies CtaLink;

export const PRODUCT_SLUGS = ["process-quality", "ask", "scheduling"] as const satisfies readonly ProductSlug[];

const products: Product[] = [
  {
    slug: "process-quality",
    name: "Quelta",
    descriptor: "Process and Quality",
    href: "/products/process-quality",
    status: "live",
    summary:
      "Fewer rejections and less energy per good part, with maintenance flags when a machine drifts.",
  },
  {
    slug: "ask",
    name: "Orrery",
    descriptor: "Ask",
    href: "/products/ask",
    status: "live",
    summary:
      "A specialised AI agent for manufacturing that you chat with, grounded in your own plant.",
  },
  {
    slug: "scheduling",
    name: "Scheduling",
    descriptor: "Production scheduling",
    href: "/products/scheduling",
    status: "coming-soon",
    summary: "Re-sequences the shift after a stop or a late delivery.",
    comingSoonLabel: "Coming soon",
  },
];

export const productsContent = {
  mission: "Making industrial plants smarter.",
  categoryBadge: "Industrial AI",
  trustMechanism: "Stamped works inside limits set beforehand.",
  trustPromise: "Stamped recommends and your team decides.",
  trustStripLabel: "Backed by",
  partners: ["NVIDIA Inception", "AWS for Startups"] as const,
  primaryCta: PRIMARY_CTA,

  products,

  /** Mega menu + footer product links (Scheduling keeps Coming soon badge). */
  navItems: [
    {
      label: "Quelta",
      href: "/products/process-quality",
      descriptor: "Process and Quality. Fewer rejections, less energy per good part, maintenance flags.",
    },
    {
      label: "Orrery",
      href: "/products/ask",
      descriptor: "Ask. A specialised AI agent for manufacturing, grounded in your plant.",
    },
    {
      label: "Scheduling",
      href: "/products/scheduling",
      descriptor: "Re-sequences the shift after a stop or a late delivery.",
      badge: "Coming soon",
    },
    {
      label: "How it works",
      href: "/platform",
    },
  ] satisfies ProductNavItem[],

  hub: {
    eyebrow: "Products",
    title: "Two products for plant operations.",
    description:
      "Quelta improves how every line runs. Orrery answers questions about it. Each is sold on its own.",
    betterTogether: {
      title: "Better together",
      description:
        "With Quelta installed, Orrery can also draw on its models and likely causes.",
    },
    comparison: {
      title: "How they compare",
      columns: [
        { id: "what", label: "What it does" },
        { id: "who", label: "Who it is for" },
        { id: "reach", label: "How it reaches the line" },
        { id: "sold", label: "How it is sold" },
      ] as const,
      rows: [
        {
          productSlug: "process-quality" as const,
          cells: {
            what: "Joins machine records to each part, flags drift, ranks causes, proves gains, and raises maintenance flags.",
            who: "Plant heads, quality heads and process owners.",
            reach: "Tests on a model, then a named role approves. Stamped works inside limits set beforehand.",
            sold: "On its own. Annual after a paid pilot.",
          },
        },
        {
          productSlug: "ask" as const,
          cells: {
            what: "Answers questions from your plant's own records, with the evidence behind them.",
            who: "Plant heads, quality heads, process engineers and shift supervisors.",
            reach: "Reads only. Orrery changes nothing.",
            sold: "On its own. A natural place to start if your process is already tuned.",
          },
        },
      ],
    },
    cta: PRIMARY_CTA,
  },

  homeHero: {
    eyebrow: "Industrial AI",
    title: "From monitoring your plant to improving it.",
    subhead:
      "Stamped joins the records your plant already keeps, catches lots at risk while they can still be saved, and recommends better settings. It works inside limits set beforehand, and your team decides.",
    secondaryCta: { label: "See how it works", href: "#hiw" } satisfies CtaLink,
  },

  industriesHome: {
    title: "Built first for plants that forge, heat-treat and machine for OEMs.",
    cta: { label: "See all industries", href: "/industries" } satisfies CtaLink,
  },

  resourcesHome: {
    title: "Notes from the plant floor.",
    cta: { label: "View all", href: "/case-studies" } satisfies CtaLink,
  },

  /** Homepage product cards (Phase 4 mounts these). */
  homepageProducts: {
    eyebrow: "Products",
    title: "Two products. One record of your plant.",
    description: "Each works on its own and does more together.",
    quelta: {
      name: "Quelta",
      descriptor: "Process and Quality",
      description:
        "Fewer rejections and less energy per good part, with maintenance flags when a machine drifts.",
      checks: [
        "Flags drift while a lot can be saved",
        "Ranks likely causes with the records behind them",
        "Proves each gain in your own numbers",
      ],
      cta: { label: "Explore Quelta", href: "/products/process-quality" } satisfies CtaLink,
    },
    orrery: {
      name: "Orrery",
      descriptor: "Ask",
      description:
        "A specialised AI agent for manufacturing that you chat with, grounded in your own plant.",
      cta: { label: "Explore Orrery", href: "/products/ask" } satisfies CtaLink,
    },
    scheduling: {
      name: "Scheduling",
      badge: "Coming soon",
      description: "Re-sequences the shift after a stop or a late delivery.",
      href: "/products/scheduling",
    },
  },

  outcomes: {
    items: [
      {
        id: "rejections",
        prefix: "Upwards of",
        value: "30%",
        label: "fewer rejections",
      },
      {
        id: "energy",
        prefix: "Upwards of",
        value: "10%",
        label: "lower energy costs",
      },
    ],
    caption: "Seen across plants using Stamped.",
    note: "Measured against matched batches, in the plant's own numbers.",
  },

  howItWorks: {
    title: "From the records you keep to a change you can prove.",
    close: "Stamped recommends and your team decides.",
    stages: [
      {
        id: "connect",
        step: 1,
        title: "Connect",
        description: "Joins the machine, lot and lab records you already keep.",
      },
      {
        id: "watch",
        step: 2,
        title: "Watch",
        description:
          "Watches every run on every shift and flags drift while a lot can still be saved.",
      },
      {
        id: "explain",
        step: 3,
        title: "Explain",
        description: "Ranks likely causes, with the records behind each one.",
      },
      {
        id: "test-approve",
        step: 4,
        title: "Test and approve",
        description:
          "Tests a change on a model of the machine, then sends it to a named role. Stamped works inside limits set beforehand.",
      },
      {
        id: "prove",
        step: 5,
        title: "Prove",
        description:
          "Measures every gain against matched batches, with energy counted per good part.",
      },
    ],
  },

  roles: {
    title: "One plant. The view each person needs.",
    tabs: [
      {
        id: "plant-head",
        label: "Plant head",
        summary: "Value and decisions across the plant.",
        bullets: [
          "See where loss concentrates this week",
          "Approve standing changes inside limits you set",
          "Prove gains against matched batches",
        ],
      },
      {
        id: "quality-head",
        label: "Quality head",
        summary: "Lots at risk, investigations and 8D.",
        bullets: [
          "Catch lots while they can still be saved",
          "Trace rejects with the records behind them",
          "Hold and release stay with your quality team",
        ],
      },
      {
        id: "process-engineer",
        label: "Process engineer",
        summary: "Proposals, trials and model tests.",
        bullets: [
          "Test a change on a model before the line",
          "Run matched trials with Stop returning the previous setting",
          "See energy per good part next to quality and output",
        ],
      },
      {
        id: "shift-operators",
        label: "Shift and operators",
        summary: "My line now, handover, and what each action did.",
        bullets: [
          "See what needs attention on this shift",
          "Read the handover written from the last shift",
          "Act on clear next steps, not a dashboard of noise",
        ],
      },
    ],
  },

  vision: {
    eyebrow: "Where we're going",
    title: "A plant that understands itself.",
    mission: "Making industrial plants smarter.",
    coralLine: "Orrery runs across every step: ask what the plant knows.",
    rungs: [
      {
        id: "one-record",
        title: "One record for every part",
        tag: "Now" as const,
      },
      {
        id: "early-warning",
        title: "Early warning and likely cause",
        tag: "Now" as const,
      },
      {
        id: "machine-model",
        title: "A model of each machine",
        tag: "Now" as const,
      },
      {
        id: "improvement",
        title: "Improvement through approval",
        tag: "Now" as const,
      },
      {
        id: "whole-plant",
        title: "The whole plant",
        description: "Energy per good part, maintenance flags and scheduling",
        tag: "Now and next" as const,
      },
      {
        id: "upstream",
        title: "Better parts upstream",
        description: "Improvements that start before the part reaches the line",
        tag: "Later" as const,
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Questions plant leaders ask",
    items: [
      {
        id: "what-is-stamped",
        question: "What does Stamped do?",
        answer:
          "Stamped joins the records your plant already keeps, catches lots at risk while they can still be saved, and recommends better settings. Quelta improves how every line runs. Orrery answers questions about the plant. Stamped works inside limits set beforehand, and your team decides.",
      },
      {
        id: "hardware",
        question: "Do we need new sensors or hardware?",
        answer:
          "Nothing new to install to start. Stamped joins the machine, lot and lab records you already keep. Where early wear needs a sensor to see, Quelta can tell you where one would pay. The site survey says plainly whether what you already record is enough.",
      },
      {
        id: "autonomy",
        question: "Does Stamped change settings on its own?",
        answer:
          "Only after your engineer has approved that kind of change, and only inside limits your plant head sets. Stamped can narrow those limits and never widen them. Every change is checked against the limits before it reaches the line, Stop returns the line to its previous settings, and every write is logged. Orrery reads only and changes nothing.",
      },
      {
        id: "products-separate",
        question: "How are Quelta and Orrery different, and are they sold separately?",
        answer:
          "Quelta is Process and Quality: it flags drift, ranks likely causes, proves gains, and raises maintenance flags with a suggested fix. Orrery is Ask: you chat with a specialised AI agent for manufacturing, grounded in your own plant. Each is sold on its own. With Quelta installed, Orrery can also draw on its models and likely causes.",
      },
      {
        id: "data-needed",
        question: "What data do you need?",
        answer:
          "The machine, lot and lab records you already keep, plus whatever your team agrees to share for the survey and pilot. We sign an NDA before the site survey. Most plants keep some registers on paper or in Excel, and the survey tells you if that is enough to start on one line.",
      },
      {
        id: "pilot",
        question: "How does a pilot work?",
        answer:
          "We start with a site survey on your floor, then a replay of your worst lots. If it makes sense, a paid pilot runs for 8 to 12 weeks on one line. The annual subscription is priced from the loss measured in the pilot. You decide on anything longer only after you have seen the results.",
      },
    ] satisfies HomeFaqItem[],
  },

  closingCta: {
    title: "Every batch should make the next one better.",
    primaryCta: PRIMARY_CTA,
  },

  quelta: {
    eyebrow: "Quelta · Process and Quality",
    title: "More good parts from every line.",
    description:
      "Quelta joins every machine record to the result of each part, flags drift while a lot can still be saved, and proves each gain in your own numbers.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: { label: "See how it works", href: "/platform" } satisfies CtaLink,
    capabilities: {
      title: "What Quelta does",
      items: [
        {
          id: "one-record",
          title: "One record for every part",
          description: "Machine, lot and lab history joined into one part record.",
        },
        {
          id: "early-warning",
          title: "Early warning while a lot can be saved",
          description: "Drift is flagged while the batch can still be fixed.",
        },
        {
          id: "likely-causes",
          title: "Likely causes, with the records behind them",
          description: "Ranks what is driving the loss, with the evidence next to each cause.",
        },
        {
          id: "model-test",
          title: "Test on a model before the line",
          description: "A change is tried on a model of the machine before parts see it.",
        },
        {
          id: "proof",
          title: "Proof against matched batches, energy per good part included",
          description: "Every gain is measured in your plant's own numbers.",
        },
        {
          id: "maintenance",
          title: "Maintenance flags with a suggested fix",
          description:
            "When a machine drifts from healthy running, Quelta raises a flag ranked by what a stop costs.",
        },
      ],
    },
    maintenanceSpotlight: {
      title: "Maintenance flags when a machine drifts",
      body: "When a machine drifts from how it runs when healthy (more gas per kilo, a slower cycle, repeating micro-stops), Quelta raises a flag with the likely cause and the action it recommends, ranked by what a stop costs the line. Where early wear needs a sensor to see, it tells you where one would pay. Your maintenance head decides.",
    },
    howChangesReachLine: {
      title: "How changes reach the line",
      trustLines: [
        "Stamped works inside limits set beforehand.",
        "Stamped recommends and your team decides.",
      ],
      ladder: [
        {
          id: "observe",
          title: "Observe",
          description: "Watches every run and names the loss in your plant's own words.",
        },
        {
          id: "recommend",
          title: "Recommend",
          description: "Sends a change to a named role with the record behind it.",
        },
        {
          id: "case-approval",
          title: "Case approval",
          description: "Your engineer approves this change for this run or trial.",
        },
        {
          id: "standing-approval",
          title: "Standing approval",
          description:
            "Once it has proved itself, Stamped applies that kind of change inside the limits your plant head set.",
        },
      ],
    },
    whoFor: {
      title: "Who it is for",
      columns: [
        {
          id: "roles",
          title: "Roles",
          items: ["Plant heads", "Quality heads", "Process owners"],
        },
        {
          id: "plants",
          title: "Plants",
          items: [
            "Forging, heat treatment and machining suppliers to OEMs",
            "Built first for auto-component lines",
          ],
        },
        {
          id: "where",
          title: "Where we start",
          items: ["Delhi NCR first", "Then plants that match the same processes"],
        },
      ],
    },
    howToStart: {
      title: "How to start",
      steps: [
        {
          id: "survey",
          title: "Site survey",
          description: "A few days on your floor and a written read-out of where to start.",
        },
        {
          id: "replay",
          title: "Replay of your worst lots",
          description: "We replay the records behind the lots that cost you most.",
        },
        {
          id: "pilot",
          title: "Paid pilot of 8 to 12 weeks",
          description: "One line, priced on its own, with your team acting on the recommendations.",
        },
        {
          id: "annual",
          title: "Annual subscription priced from the loss measured in the pilot",
          description: "You decide after you have seen the results. No figures published here.",
        },
      ],
    },
    faq: [
      {
        id: "what-quelta",
        question: "What does Quelta do?",
        answer:
          "Quelta joins every machine record to the result of each part, flags drift while a lot can still be saved, ranks likely causes with the records behind them, and proves each gain in your own numbers. It also raises maintenance flags with a suggested fix when a machine drifts from healthy running.",
      },
      {
        id: "hardware",
        question: "Do we need new sensors?",
        answer:
          "Nothing new to install to start. Where early wear needs a sensor to see, Quelta tells you where one would pay. Your maintenance head decides.",
      },
      {
        id: "changes-line",
        question: "Does Quelta change settings on the line by itself?",
        answer:
          "Only after your engineer has approved that kind of change, and only inside limits set beforehand. Every change is logged, and Stop returns the line to its previous settings.",
      },
      {
        id: "prescriptive-maintenance",
        question: "Is this predictive or prescriptive maintenance?",
        answer:
          "It is built to go a step further than a plain prediction. When a machine drifts from how it runs when healthy, Quelta raises a flag with the likely cause and the action it recommends, ranked by what a stop costs the line. Your maintenance head decides.",
      },
      {
        id: "sold-with-orrery",
        question: "Is Quelta sold with Orrery?",
        answer:
          "Each is sold on its own. With Quelta installed, Orrery can also draw on its models and likely causes.",
      },
    ] satisfies IndustryFaqItem[],
  },

  orrery: {
    eyebrow: "Orrery · Ask",
    title: "Ask your plant anything.",
    description: "Answers come from your own plant, with the records behind them.",
    exampleQuestion: "Why are cold billets rising after stops?",
    primaryCta: PRIMARY_CTA,
    secondaryCta: {
      label: "Ask us about Orrery",
      href: "/contact?focus=orrery",
    } satisfies CtaLink,
    whatYouCanAsk: {
      title: "What you can ask",
      items: [
        {
          id: "batch",
          title: "A batch",
          examples: [
            "Why was lot 3307 held?",
            "What drifted on the last rejected heat?",
          ],
        },
        {
          id: "line",
          title: "A line",
          examples: [
            "Which line lost the most good parts this week?",
            "What changed after the last stop on Press 3?",
          ],
        },
        {
          id: "machine",
          title: "A machine",
          examples: [
            "Is Furnace 1 drawing more gas per kilo than last month?",
            "What does healthy look like on this heater?",
          ],
        },
        {
          id: "shift",
          title: "A shift",
          examples: [
            "What should the next shift know?",
            "Where is order 5119, and when will it ship?",
          ],
        },
      ],
    },
    grounded: {
      title: "Grounded, or it says so",
      description:
        "When the records don't hold the answer, Orrery says so and names what's missing.",
    },
    writesAndWatches: {
      title: "Writes and watches",
      description:
        "Shift handover and weekly notes, plus alert rules your plant defines that notify the right people.",
      items: [
        {
          id: "handover",
          title: "Writes the shift handover",
          description: "What changed this shift is written up for the next one.",
        },
        {
          id: "orders",
          title: "Answers where an order is",
          description:
            "Ask where an order is and when it will ship, and the answer comes from your plant's own records.",
        },
        {
          id: "alerts",
          title: "Watches rules you define",
          description:
            "Alert rules your plant sets notify the right people when a condition is met.",
        },
      ],
    },
    safe: {
      title: "Safe by design",
      lines: [
        "Orrery reads from your plant's systems and changes nothing.",
        "With Quelta installed, it also draws on its models and likely causes.",
      ],
    },
    whereItLives: {
      title: "Where it lives",
      description:
        "Its own app, or embedded in the tools your plant already uses.",
    },
    whoFor: {
      title: "Who it is for",
      description: "A natural place to start if your process is already tuned.",
      roles: [
        "Plant heads",
        "Quality heads",
        "Process engineers",
        "Shift supervisors",
      ],
    },
  },

  scheduling: {
    badge: "Coming soon",
    title: "Re-plan the shift after a stop.",
    points: [
      "Proposes a new order of work from the same part record and line model.",
      "A named planner accepts it. Promise dates and customer priority stay with the planner.",
      "Early win: moving load away from tariff peaks.",
    ],
    cta: {
      label: "Tell me when it's ready",
      href: "/contact?focus=scheduling",
    } satisfies CtaLink,
  },
} as const;

export type ProductsContent = typeof productsContent;

export function allProducts(): Product[] {
  return [...products];
}

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getLiveProducts(): Product[] {
  return products.filter((product) => product.status === "live");
}

export function getProductByName(name: string): Product | undefined {
  const normalised = name.trim().toLowerCase();
  return products.find((product) => product.name.toLowerCase() === normalised);
}

export function isProductSlug(value: string): value is ProductSlug {
  return (PRODUCT_SLUGS as readonly string[]).includes(value);
}
