import type { ResourceCard } from "./types";

const RESOURCE_IMAGES = {
  dieCasting: "/industries/die-casting.jpeg",
  forging: "/industries/forging.jpg",
  heatTreatment: "/industries/heat-treatment.webp",
} as const;

export const resourcesContent = {
  eyebrow: "Proof & insights",
  title: "Case studies & blogs",
  description:
    "Published outcomes and field notes from energy-intensive manufacturing, starting with automotive-adjacent process plants.",
  items: [
    {
      id: "auto-sec-insight",
      type: "blog",
      title: "Automotive & pump manufacturing: 18% SEC reduction",
      description:
        "16 verified measures across compressors, furnaces, and shift-start sequencing, IPMVP-style M&V with ₹12-34L monthly energy savings (reference benchmark).",
      href: "/case-studies",
      tag: "Blog",
      imageSrc: RESOURCE_IMAGES.forging,
      imageAlt: "Forging press line energy cost reduction - maximum demand control",
      readMoreLabel: "Browse case studies & blogs →",
    },
    {
      id: "die-cast-blog",
      type: "blog",
      title: "Why shift-start kills die casting margins",
      description:
        "Furnace pre-heat overlap, holding loads, and the MD spike your incomer meter sees every morning.",
      href: "/blog/why-shift-start-kills-die-casting-margins",
      tag: "Blog",
      imageSrc: RESOURCE_IMAGES.dieCasting,
      imageAlt: "Die casting plant energy management - shift-start MD spike reduction",
      readMoreLabel: "Read: How shift-start kills die casting margins →",
    },
    {
      id: "ht-blog",
      type: "blog",
      title: "Weekend furnace holding: the silent cost",
      description:
        "How batch heat treatment plants lose 15-25% of furnace energy with no parts scheduled.",
      href: "/blog/weekend-furnace-holding-silent-cost",
      tag: "Blog",
      imageSrc: RESOURCE_IMAGES.heatTreatment,
      imageAlt: "Heat treatment furnace energy optimization - weekend holding waste reduction",
      readMoreLabel: "Read: Weekend furnace holding - the silent cost →",
    },
  ] satisfies ResourceCard[],
} as const;
