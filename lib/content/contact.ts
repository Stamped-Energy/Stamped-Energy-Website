import { siteConfig } from "./site";

export const contactContent = {
  hero: {
    eyebrow: "Get in touch",
    title: "Talk to the team behind Stamped Energy",
    description:
      "30 minutes, no slideware. Bring your incomer bill, shift schedule, and one operational headache. We will show you what a pilot would look like for your plant.",
    heroImageSrc: "/industries/die-casting.jpeg",
    heroImageAlt: "Energy-intensive manufacturing plant floor",
  },

  stats: [
    { id: "response", label: "Response time", value: "Under 24 hours" },
    { id: "pilot", label: "Pilot kickoff", value: "4-6 weeks" },
    { id: "location", label: "Location", value: "India" },
  ],

  pilotSection: {
    eyebrow: "Start with a pilot",
    title: "Find out what your plant lost last month",
    description:
      "30-minute discovery call. We review your meter setup, bill pattern, and processes, and outline a low-risk pilot if the numbers justify it.",
  },

  formSection: {
    eyebrow: "Request a working session",
    title: "Tell us what you're solving for",
    description:
      "One of our founders will get back to you within one working day.",
  },

  contactForm: {
    title: "Book a discovery call",
    description: "Tell us about your plant. We will follow up to schedule a conversation.",
    fields: {
      name: "Full name",
      company: "Company name",
      location: "Plant location",
      billSize: "Monthly electricity bill (approx.)",
      whatsapp: "WhatsApp number",
      email: "Email address",
    },
    contactMethodHint: "Provide WhatsApp or email so we can reach you (at least one).",
    optionalLabel: "Optional",
    submitLabel: "Submit request",
    successMessage: "Request received. We will contact you shortly.",
    errorMessage: "Something went wrong. Please try again.",
  },

  quickContact: {
    eyebrow: "For the people in a hurry",
    email: siteConfig.contactEmail,
    responseTitle: "Response commitment",
    responseItems: [
      { label: "Avg response", value: "Under 24 hours" },
      { label: "Pilot kickoff", value: "Within 6 weeks" },
    ],
  },

  onSite: {
    title: "Prefer a plant visit over Zoom?",
    description:
      "We work on-site with plant heads and electrical HODs. Write to us and we'll coordinate a plant-floor session at your convenience.",
  },

  office: {
    eyebrow: "Where we work",
    title: "On-site with manufacturers across India",
    description:
      "Stamped deploys with auto component and process-intensive plants. Remote discovery first, then on-site baselining when the numbers justify a pilot.",
    locationLabel: "India · Remote & on-site",
  },
} as const;
