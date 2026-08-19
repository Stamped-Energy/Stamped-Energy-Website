export const aboutContent = {
  hero: {
    title: "We're building the decision layer for energy-intensive plants.",
    heroImageSrc: "/industries/die-casting.jpeg",
    heroImageAlt: "Energy-intensive manufacturing plant floor",
  },

  story: {
    eyebrow: "Our Story",
    title: "Close the gap between the floor and the bill.",
    paragraphs: [
      "Plant teams already decide what to run, hold, and stagger. Those calls land on the DISCOM bill as maximum demand, TOD, and idle kWh. The floor and the bill stay disconnected.",
      "Hold a furnace or keep it hot. Stagger a feeder start. Delay a compressor. Each one is an operations choice with a rupee consequence. In most plants that consequence is guesswork until month-end.",
      "Vinayak came at this as an electrical engineer: meters and SCADA already record the load, but nothing turns that signal into an assigned action with a rupee number. Utso came at it from the floor and the product: supervisors do not need another dashboard. They need prescriptions they can execute and check against evidence.",
      "Stamped is a read-only decision layer on the systems plants already run. Assigned actions with ₹ impact, verified with evidence.",
    ],
  },

  team: {
    eyebrow: "Leadership",
    title: "Meet our founders",
    description: "IIT Roorkee engineers building for plant heads who measure success on the bill.",
    members: [
      {
        id: "vinayak",
        name: "Vinayak Raizada",
        role: "Co-Founder",
        imageSrc: "/team/vinayak.png",
        imageAlt: "Vinayak Raizada, Co-Founder of Stamped Energy, IIT Roorkee Electrical Engineering",
        linkedIn: "https://www.linkedin.com/in/vinayak-rz/",
        bio: "Leads core technical work, electrical engineering depth, strategy, and marketing. Electrical Engineering, IIT Roorkee. Focuses on prescriptive energy intelligence, turning meter, SCADA, and bill data into rupee-denominated actions plant teams can verify with evidence.",
      },
      {
        id: "utso",
        name: "Utso Sarkar",
        role: "Co-Founder",
        imageSrc: "/team/utso.jpg",
        imageAlt: "Utso Sarkar, Co-Founder of Stamped Energy",
        linkedIn: "https://www.linkedin.com/in/utso/",
        bio: "Leads sales, outreach, and software engineering. IIT Roorkee. Builds the product platform and works directly with manufacturers through discovery, pilots, and deployment, connecting what we ship to what plant teams execute on the floor.",
      },
    ],
  },

  values: {
    eyebrow: "What we value",
    title: "How we build and serve",
    description: "Standards we hold on every plant engagement.",
    items: [
      {
        id: "integrity",
        title: "Integrity",
        description:
          "Honest discovery, clear scope, and proof you can check. No invented savings.",
      },
      {
        id: "innovation",
        title: "Innovation",
        description:
          "Plant-tuned models and a real-time decision layer on systems you already run.",
      },
      {
        id: "customers",
        title: "Customers first",
        description:
          "Assigned actions, verified outcomes, and a team that stays through pilot and beyond.",
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
