/** Reuse on later pages, pitches, and (when updated) external canon. */
export const plantDecisionMoves = [
  "Run harder or hold back",
  "Adjust a process",
  "Delay maintenance",
  "Switch production priorities",
] as const;

export const aboutContent = {
  hero: {
    title: "We're building the intelligence layer for the industrial world.",
    heroImageSrc: "/industries/die-casting.jpeg",
    heroImageAlt: "Energy-intensive manufacturing plant floor",
  },

  story: {
    eyebrow: "Our Story",
    title: "Close the gap between the floor and the bill.",
    paragraphs: [
      "Stamped Energy started with a simple conviction: industrial sites should make real-time decisions connected to their economic impact.",
      "Plant teams, operations, engineers, managers, and maintainers, make just-in-time decisions every shift, every day. Run harder or hold back. Adjust a process. Delay maintenance. Switch production priorities. Each of these has an impact on costs, revenue, and margins. Making those calls from data, and keeping track of what actually followed, is hard. With so much happening in the plant at once, real-time decision-making is rarely efficient. A lot gets missed.",
      "This gap showed up from both sides. Meters and SCADA already record what the plant is doing, but that signal rarely becomes a decision with economic impact. SCADA, ERPs, and the people on the ground stay in separate places. Real-time decisions from all of those sources were, in practice, not possible. What was missing was a system that could bring these perspectives together, with live data in real time, for the people making decisions.",
      "For years, such a system was impossible to build. The data was messy, the models stayed with experts, and the context lived in people's heads. Now with AI, decision intelligence informed by economics can be part of daily operations, connecting what happens in the plant with business outcomes.",
      "That is what Stamped Energy is building: an intelligence layer for the industrial world.",
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
} as const;
