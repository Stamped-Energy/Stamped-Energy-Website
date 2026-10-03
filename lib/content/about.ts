import { platformContent } from "./platform";

/** /about copy. Canon: Stamped copy v3 (3 Oct 2026), sections 3 (long version) and 7. */

/** Reuse on later pages and pitches. Plant decisions named in the guide's voice section. */
export const plantDecisionMoves = [
  "Run harder or hold back",
  "Adjust a process",
  "Delay maintenance",
  "Change the sequence",
] as const;

export const aboutContent = {
  hero: {
    eyebrow: "About Stamped",
    title: "Plants have the data to run better, and we build the way to act on it.",
    description:
      "Stamped is built by engineers from IIT Roorkee for the people who run Indian plants: plant heads, process and quality engineers, and maintenance teams.",
    facts: ["Engineers from IIT Roorkee", "Started on Indian plant floors", "Your team decides every change"],
    heroImageSrc: "/industries/die-casting.jpeg",
    heroImageAlt: "Molten metal pour on a casting line",
  },

  story: {
    eyebrow: "Our story",
    title: "How Stamped started",
    paragraphs: [
      "Stamped started with two engineers from IIT Roorkee, Vinayak Raizada and Utso Sarkar, looking at energy in Indian plants: furnace gas, compressor hours and the monthly power bill.",
      "The more time we spent on plant floors, the less the energy numbers looked like the real problem. Extra gas usually traced back to something else, such as a lot that arrived late and left a furnace sitting hot and empty, a restart that went differently on night shift, or a basket that waited too long before quench. The plant had already recorded all of it. Nobody had the time to join it up and tell the right person while it still mattered.",
      "That is what we build now. We also know that a wrong call in a factory gets paid for in scrap, lost hours and sometimes safety, so the rule is simple: Stamped recommends and your team decides.",
    ],
    whatWeDo: {
      title: "What we do",
      /** Approved long outcomes-and-how text. Word for word, shared with /platform. */
      paragraphs: platformContent.whatWeDo.paragraphs,
    },
  },

  team: {
    eyebrow: "Leadership",
    title: "Meet our founders",
    description: "IIT Roorkee engineers building for plant teams who have to get it right every shift.",
    members: [
      {
        id: "vinayak",
        name: "Vinayak Raizada",
        role: "Co-Founder",
        imageSrc: "/team/vinayak.png",
        imageAlt: "Vinayak Raizada, Co-Founder of Stamped, IIT Roorkee Electrical Engineering",
        linkedIn: "https://www.linkedin.com/in/vinayak-rz/",
        bio: "Leads core technical work, strategy and marketing. Electrical Engineering, IIT Roorkee. Shapes the models behind Stamped, from digital twins of plant lines to the control improvements they recommend, and works with plant engineers to make sure each recommendation holds up on the floor.",
      },
      {
        id: "utso",
        name: "Utso Sarkar",
        role: "Co-Founder",
        imageSrc: "/team/utso.jpg",
        imageAlt: "Utso Sarkar, Co-Founder of Stamped",
        linkedIn: "https://www.linkedin.com/in/utso/",
        bio: "Leads sales, outreach and software engineering. IIT Roorkee. Builds the product and works directly with manufacturers through site surveys, pilots and deployment, connecting what we ship to what plant teams do on the floor.",
      },
    ],
  },

  values: {
    eyebrow: "What we value",
    title: "How we build and serve",
    description: "What you can hold us to in every plant we work with.",
    items: [
      {
        id: "integrity",
        title: "Honest numbers",
        description:
          "We say what we found and how sure we are. Results are measured against your own baseline, and we don't publish savings that no plant has produced.",
      },
      {
        id: "floor",
        title: "On your floor",
        description:
          "We learn your plant by spending time on it with your plant head, quality and maintenance teams, and we build on the systems you already run.",
      },
      {
        id: "customers",
        title: "Here after the pilot",
        description:
          "Actions go to the right person, we check the results with you, and the same team stays with you through the pilot and after it.",
      },
    ],
  },
} as const;
