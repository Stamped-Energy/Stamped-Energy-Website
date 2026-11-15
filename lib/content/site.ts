import type { NavLink } from "./types";
import { icp } from "./icp";

/** Click-to-chat link, e.g. https://wa.me/91XXXXXXXXXX. WhatsApp buttons render only when this is set. */
const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() ?? "";

export const siteConfig = {
  name: "Stamped",
  tagline: "Industrial AI",
  description: icp.seo.entityDefinition,
  /** Public Case Studies & Blogs listing */
  blogUrl: "/case-studies",
  /** Legacy inbox kept until the stamped.work domain mailbox is live. */
  contactEmail: "contact@stamped.work",
  whatsappUrl,
  primaryCta: { label: "Book a site survey", href: "/contact" },
} as const;

export const navLinks: NavLink[] = [
  { label: "Products", href: "/products", megaMenu: "products" },
  { label: "How it works", href: "/platform" },
  { label: "Industries", href: "/industries", megaMenu: "industries" },
  {
    label: "Resources",
    href: "/case-studies",
    activePrefixes: ["/blog/"],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  products: [
    { label: "Quelta", href: "/products/process-quality" },
    { label: "Orrery", href: "/products/ask" },
    { label: "Scheduling", href: "/products/scheduling" },
    { label: "How it works", href: "/platform" },
  ],
  industries: [
    { label: "Auto components", href: "/industries/automotive" },
    { label: "Steel", href: "/industries/steel" },
    { label: "Cement", href: "/industries/cement" },
    { label: "Pharma", href: "/industries/pharma" },
    { label: "Chemicals", href: "/industries/chemical" },
    { label: "All industries", href: "/industries" },
  ],
  resources: [{ label: "Notes from the plant floor", href: siteConfig.blogUrl }],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
