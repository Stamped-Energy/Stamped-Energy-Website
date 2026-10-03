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
    title: "Plants have the data to run better, and we build the way to act on it.",
    heroImageSrc: "/industries/die-casting.jpeg",
    heroImageAlt: "Manufacturing plant floor",
  },

  story: {
    eyebrow: "Our story",
    title: "How Stamped started",
    paragraphs: [
      "Stamped was started by Vinayak Raizada and Utso Sarkar, engineers from IIT Roorkee. We began by working on energy in Indian plants, and the more time we spent on plant floors, the clearer it became that energy was only one symptom of a bigger problem: plants have the data they need to run better, but very little help turning it into decisions. That is what we build now. We know that being wrong in a factory has a real cost, and we try to work with that in mind.",
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
        bio: "Leads core technical work, strategy and marketing. Electrical Engineering, IIT Roorkee.",
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
        description: "Plant-tuned machine learning and AI on systems you already run.",
      },
      {
        id: "customers",
        title: "Customers first",
        description:
          "Actions sent to the right person, results we check with you, and a team that stays through the pilot and beyond.",
      },
    ],
  },
} as const;
