import type { NavLink } from "./types";
import { icp } from "./icp";

/** Click-to-chat link, e.g. https://wa.me/91XXXXXXXXXX. WhatsApp buttons render only when this is set. */
const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() ?? "";

export const siteConfig = {
  name: "Stamped",
  tagline: "AI for plant operations",
  description: icp.seo.entityDefinition,
  /** Public Case Studies & Blogs listing */
  blogUrl: "/case-studies",
  /** Legacy inbox kept until the stamped.work domain mailbox is live. */
  contactEmail: "stamped.energy@gmail.com",
  whatsappUrl,
  primaryCta: { label: "Book a site survey", href: "/contact" },
} as const;

export const navLinks: NavLink[] = [
  { label: "What we improve", href: "/solutions", megaMenu: "solutions" },
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
  solutions: [
    { label: "Process and control", href: "/solutions/process" },
    { label: "Quality and lot checks", href: "/solutions/quality" },
    { label: "Planning and scheduling", href: "/solutions/planning" },
    { label: "Maintenance", href: "/solutions/maintenance" },
    { label: "How it works", href: "/platform" },
  ],
  industries: [
    { label: "Auto components", href: "/industries/automotive" },
    { label: "Forging", href: "/industries/automotive#forging" },
    { label: "Heat treatment", href: "/industries/automotive#heat-treatment" },
    { label: "Precision machining", href: "/industries/automotive#precision-machining" },
  ],
  resources: [{ label: "Notes from the plant floor", href: siteConfig.blogUrl }],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
