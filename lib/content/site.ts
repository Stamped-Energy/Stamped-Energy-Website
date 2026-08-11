import type { NavLink } from "./types";
import { icp } from "./icp";

export const siteConfig = {
  name: "Stamped Energy",
  tagline:
    "AI-native energy intelligence for industrial plants. ₹-scored prescriptions. Verified with evidence.",
  description: icp.seo.entityDefinition,
  /** Public Case Studies & Blogs listing */
  blogUrl: "/case-studies",
  contactEmail: "stamped.energy@gmail.com",
} as const;

export const navLinks: NavLink[] = [
  { label: "Solutions", href: "/solutions", megaMenu: "solutions" },
  { label: "Platform", href: "/platform" },
  { label: "Industries", href: "/industries", megaMenu: "industries" },
  { label: "Case Studies", href: siteConfig.blogUrl },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  solutions: [
    { label: "Industry Energy Management", href: "/solutions/load-energy" },
    { label: "Asset Health Intelligence", href: "/solutions/equipment-intelligence" },
    { label: "Platform", href: "/platform" },
  ],
  industries: [{ label: "All industries", href: "/industries" }],
  resources: [{ label: "Case Studies", href: siteConfig.blogUrl }],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  /** @deprecated Prefer columned footerLinks; kept for any legacy consumers */
  product: [
    { label: "Solutions", href: "/solutions" },
    { label: "Industry Energy Management", href: "/solutions/load-energy" },
    { label: "Asset Health Intelligence", href: "/solutions/equipment-intelligence" },
    { label: "Platform", href: "/platform" },
    { label: "Industries", href: "/industries" },
    { label: "Case Studies", href: siteConfig.blogUrl },
  ],
} as const;
