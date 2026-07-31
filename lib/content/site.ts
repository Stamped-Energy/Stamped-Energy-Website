import type { NavLink } from "./types";
import { icp } from "./icp";

export const siteConfig = {
  name: "Stamped Energy",
  tagline: "AI-powered energy intelligence. Verified savings. Built for plants.",
  description: icp.seo.entityDefinition,
  /** Public Case Studies & Blogs listing */
  blogUrl: "/case-studies",
  contactEmail: "contact@stamped.work",
} as const;

export const navLinks: NavLink[] = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Industries", href: "/industries", megaMenu: "industries" },
  { label: "Case Studies", href: siteConfig.blogUrl },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  product: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Industries", href: "/industries" },
    { label: "Case Studies", href: siteConfig.blogUrl },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
