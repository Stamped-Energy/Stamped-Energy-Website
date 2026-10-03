import { siteConfig } from "./site";

/** /contact copy. Canon: Stamped copy v3 (3 Oct 2026) and the website update plan, section 4 (/contact). */

export const contactContent = {
  hero: {
    eyebrow: "Get in touch",
    title: "Book a site survey.",
    description:
      "We spend a few days on your floor with your plant head and your quality and maintenance teams, and then send you a written read-out of where efficiency is being lost and what we would change first. If it makes sense, the next step is a paid pilot on one line, and you decide on anything longer only after you have seen its results.",
    heroImageSrc: "/industries/die-casting.jpeg",
    heroImageAlt: "Manufacturing plant floor",
  },

  stats: [
    { id: "response", label: "Response time", value: "Under 24 hours" },
    { id: "pilot", label: "Paid pilot on one line, priced on its own", value: "8 to 12 weeks" },
    { id: "location", label: "Where the survey happens", value: "On your plant floor" },
  ],

  steps: {
    eyebrow: "What happens after you write to us",
    title: "Three steps, and you decide at each one.",
    description:
      "During the site survey we agree only the price of the pilot. The annual price comes later, once you have seen what the pilot did in your plant.",
  },

  formSection: {
    eyebrow: "Request a site survey",
    title: "Tell us about your plant",
    description: "One of our founders will reply within 24 hours to plan the survey days around your production.",
  },

  contactForm: {
    title: "Book a site survey",
    description: "Tell us about your plant and we will follow up to plan the survey.",
    fields: {
      name: "Full name",
      company: "Company name",
      location: "Plant location",
      /** Stored in the existing `billSize` column (no schema change); see DECISIONS ADR-033. */
      processes: "Main processes (e.g. forging, heat treatment, machining)",
      focus: "What's on your mind",
      reachVia: "Best way to reach you",
      whatsapp: "WhatsApp number",
      email: "Email address",
    },
    focusOptions: ["Rejection", "Output", "Breakdowns", "Planning", "Energy", "Other"],
    reachViaOptions: ["WhatsApp", "Call", "Email"],
    selectPlaceholder: "Choose one",
    contactMethodHint: "Provide WhatsApp or email so we can reach you (at least one).",
    optionalLabel: "Optional",
    submitLabel: "Book a site survey",
    successMessage: "Request received. We will contact you shortly.",
    errorMessage: "Something went wrong. Please try again.",
  },

  quickContact: {
    eyebrow: "Reach us directly",
    email: siteConfig.contactEmail,
    whatsappUrl: siteConfig.whatsappUrl,
    whatsappLabel: "WhatsApp us",
  },

  onSite: {
    description:
      "The survey happens on your floor, with your plant head and your quality and maintenance teams. Write to us and we will plan the days around your production.",
  },
} as const;
