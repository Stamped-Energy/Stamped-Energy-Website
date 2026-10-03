/**
 * How an engagement starts and how it is priced. Single source for /contact, /platform,
 * the home FAQ, solution and industry pages, JSON-LD and llms.txt.
 * Pricing model (Vinayak, 3 Oct 2026, revision 3): during the site survey we agree only the
 * price of the pilot; the pilot is paid, 8 to 12 weeks, priced on its own and not tied to an
 * annual contract value; the annual price is decided afterwards, based on the pilot's results.
 */

export type EngagementStep = {
  id: "survey" | "pilot" | "annual";
  step: string;
  label: string;
  title: string;
  description: string;
};

export const ENGAGEMENT_STEPS: EngagementStep[] = [
  {
    id: "survey",
    step: "1",
    label: "Site survey",
    title: "A few days on your floor",
    description:
      "We spend a few days on your floor with your plant head and your quality and maintenance teams, and then send you a written read-out of where efficiency is being lost and what we would change first. At this stage we agree only two things in writing: what the pilot should achieve, and the price of the pilot itself.",
  },
  {
    id: "pilot",
    step: "2",
    label: "8 to 12 weeks",
    title: "Paid pilot on one line",
    description:
      "The pilot runs on one line for 8 to 12 weeks, with your own team acting on the recommendations. It is a paid engagement, priced on its own and not tied to any annual contract value. The first finding usually comes within about two weeks.",
  },
  {
    id: "annual",
    step: "3",
    label: "After the pilot",
    title: "The annual price, set by the results",
    description:
      "When the pilot ends, we go through the results with you against what we agreed at the start. If you want to carry on, the annual contract price is decided then, based on what the pilot actually showed in your plant.",
  },
];

/** One-line summary for hero text, cards and JSON-LD. */
export const ENGAGEMENT_SUMMARY =
  "A site survey first, then a paid pilot on one line for 8 to 12 weeks that is priced on its own, and the annual price is decided after the pilot, based on its results.";

export const PRICING_ANSWER =
  "We don't publish prices, because they depend on the plant. During the site survey we agree only the price of the pilot, once we know which line and which problem it will cover. The pilot is a paid engagement of 8 to 12 weeks, priced on its own and not tied to an annual contract value, and the annual contract price is decided afterwards, based on the results of the pilot.";

export type Objection = { id: string; question: string; answer: string };

/** Short answers to the questions plant owners ask before they book. Used near CTAs. */
export const BEFORE_YOU_BOOK: { eyebrow: string; title: string; items: Objection[] } = {
  eyebrow: "Before you book",
  title: "What owners usually ask us first.",
  items: [
    {
      id: "cost",
      question: "What does it cost?",
      answer:
        "Only the pilot price is agreed at the survey. The pilot is paid and priced on its own, and the annual price comes after, based on the pilot's results.",
    },
    {
      id: "install",
      question: "What do we need to install?",
      answer:
        "Nothing new to start. Stamped connects to the machines, meters, ERP and registers you already have, and the survey tells you plainly if that is enough.",
    },
    {
      id: "team-time",
      question: "How much of my team's time?",
      answer:
        "Some hours with your plant head and your quality and maintenance leads during the survey, planned around production. In the pilot, actions reach the people who already own that work.",
    },
    {
      id: "data",
      question: "Is our data safe?",
      answer:
        "We sign an NDA before the survey and work only with the data your team agrees to share. Ask us anything about where it is kept before anything is connected.",
    },
  ],
};
