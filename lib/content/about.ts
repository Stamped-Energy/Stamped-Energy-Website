export const aboutContent = {
  hero: {
    eyebrow: "Who we are",
    title: "Your plant has the data. It lacks the decision layer.",
    description:
      "Every factory has meters, SCADA, and monthly bills. Stamped turns that into assigned actions with rupee impact, verified with evidence, so plant teams know what to do next.",
    heroImageSrc: "/industries/die-casting.jpeg",
    heroImageAlt: "Energy-intensive manufacturing plant floor",
  },

  team: {
    eyebrow: "Leadership",
    title: "Meet our founders",
    description:
      "IIT Roorkee engineers building software for plant heads who measure success on the electricity bill.",
    members: [
      {
        id: "vinayak",
        name: "Vinayak Raizada",
        role: "Co-Founder",
        imageSrc: "/team/vinayak.png",
        imageAlt: "Vinayak Raizada, Co-Founder of Stamped Energy, IIT Roorkee Electrical Engineering",
        linkedIn: "https://www.linkedin.com/in/vinayak-rz/",
        bio: "Leads core technical work, electrical engineering depth, strategy, and marketing. Electrical Engineering, IIT Roorkee. Focuses on prescriptive energy intelligence-turning meter, SCADA, and bill data into rupee-denominated actions plant teams can verify with evidence.",
      },
      {
        id: "utso",
        name: "Utso Sarkar",
        role: "Co-Founder",
        imageSrc: "/team/utso.jpg",
        imageAlt: "Utso Sarkar, Co-Founder of Stamped Energy",
        linkedIn: "https://www.linkedin.com/in/utso/",
        bio: "Leads sales, outreach, and software engineering. IIT Roorkee. Builds the product platform and works directly with manufacturers through discovery, pilots, and deployment-connecting what we ship to what plant teams execute on the floor.",
      },
    ],
  },

  values: {
    eyebrow: "What we value",
    title: "The principles behind how we build and serve",
    description:
      "Credibility on the plant floor comes from how we work, not from slide decks. These are the standards we hold ourselves to with every customer.",
    items: [
      {
        id: "integrity",
        title: "Integrity",
        description:
          "Honest discovery, clear scope, and proof you can check. We do not invent savings or oversell what the data cannot support.",
      },
      {
        id: "innovation",
        title: "Innovation",
        description:
          "Agentic intelligence, plant-tuned models, and a real-time decision layer on systems you already run. Built to stay ahead of generic monitoring.",
      },
      {
        id: "customers",
        title: "Customers first",
        description:
          "Quality that shows up as assigned actions, verified outcomes, and a team that stays with you through pilot and beyond.",
      },
    ],
  },

  journey: {
    eyebrow: "Our journey",
    title: "From problem to platform",
    milestones: [
      {
        id: "2025",
        period: "2025",
        title: "Research at IIT Roorkee",
        description:
          "Started in the Electrical Engineering department at IIT Roorkee-studying where plant data, utility bills, and shift operations break down, and whether prescriptive intelligence could close the loop in rupees.",
      },
      {
        id: "2026-product",
        period: "2026",
        title: "Building the product",
        description:
          "Moved from research to the actual software product: connecting incomer meters, SCADA, and bills into prescriptions supervisors can act on, with verification on the next electricity bill.",
      },
      {
        id: "2026-pilots",
        period: "2026 - today",
        title: "Pilots and first clients",
        description:
          "Reaching out to manufacturers across process-intensive segments, running discovery conversations, and onboarding early pilots-with the first clients now live on the platform.",
      },
    ],
  },

  finalCta: {
    eyebrow: "Work with us",
    title: "Tell us about your plant",
    description:
      "Share your incomer setup and production profile. We'll follow up to schedule a discovery conversation, no hardware retrofit required.",
    primaryCta: { label: "Book a Discovery Call", href: "/contact" },
  },
} as const;
