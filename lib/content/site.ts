import type { NavLink } from "./types";
import { icp } from "./icp";

export const siteConfig = {
  name: "Stamped Energy",
  tagline:
    "Real-time energy intelligence for plants. Assigned prescriptions. Verified with evidence.",
  description: icp.seo.entityDefinition,
  /** Public Case Studies & Blogs listing */
  blogUrl: "/case-studies",
  contactEmail: "contact@stamped.work",
} as const;

export const navLinks: NavLink[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "Platform", href: "/platform" },
  { label: "Industries", href: "/industries", megaMenu: "industries" },
  { label: "Case Studies", href: siteConfig.blogUrl },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  product: [
    { label: "Solutions", href: "/solutions" },
    { label: "Load and energy", href: "/solutions/load-energy" },
    { label: "Equipment intelligence", href: "/solutions/equipment-intelligence" },
    { label: "Platform", href: "/platform" },
    { label: "Industries", href: "/industries" },
    { label: "Case Studies", href: siteConfig.blogUrl },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
