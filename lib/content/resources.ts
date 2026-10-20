import type { ResourceCard } from "./types";

const RESOURCE_IMAGES = {
  dieCasting: "/industries/die-casting.jpeg",
  heatTreatment: "/industries/heat-treatment.webp",
} as const;

/** Homepage resources fallback (used when the CMS is unavailable). Copy v3: "Notes from the plant floor." */
export const resourcesContent = {
  eyebrow: "Resources",
  title: "Notes from the plant floor.",
  description:
    "Field notes and write-ups from Indian plant floors, on process, quality, planning, maintenance and energy.",
  items: [
    {
      id: "die-cast-blog",
      type: "blog",
      title: "Why shift-start kills die casting margins",
      description:
        "Furnace pre-heat overlap, holding loads, and the demand peak your incomer meter sees every morning.",
      href: "/blog/shift-start-die-casting-margins",
      tag: "Blog",
      imageSrc: RESOURCE_IMAGES.dieCasting,
      imageAlt: "Die casting cell at shift start",
      readMoreLabel: "Read the note →",
    },
    {
      id: "ht-blog",
      type: "blog",
      title: "Weekend furnace holding: the silent cost",
      description:
        "How batch heat treatment furnaces stay hot through the weekend with no parts scheduled, and what to do about it.",
      href: "/blog/weekend-furnace-holding-heat-treatment-cost",
      tag: "Blog",
      imageSrc: RESOURCE_IMAGES.heatTreatment,
      imageAlt: "Batch heat treatment furnace",
      readMoreLabel: "Read the note →",
    },
  ] satisfies ResourceCard[],
} as const;
