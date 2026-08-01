"use client";

import { ListMegaMenu, ListMegaMobileNav } from "@/components/layout/ListMegaMenu";
import { industriesContent, navLinks } from "@/lib/content";

const industryItems = industriesContent.verticals.map((vertical) => ({
  id: vertical.id,
  href: vertical.href,
  title: vertical.name,
  description: vertical.tagline,
}));

export function IndustriesMegaMenu({ lightNav = false }: { lightNav?: boolean }) {
  const industriesLink = navLinks.find((link) => link.megaMenu === "industries");

  if (!industriesLink) {
    return null;
  }

  return (
    <ListMegaMenu
      label={industriesLink.label}
      href={industriesLink.href}
      eyebrow="Verticals"
      footerNote={`${industriesContent.verticals.length} verticals · India`}
      items={industryItems}
      lightNav={lightNav}
    />
  );
}

export function IndustriesMobileNav({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  const industriesLink = navLinks.find((link) => link.megaMenu === "industries");

  if (!industriesLink) {
    return null;
  }

  return (
    <ListMegaMobileNav
      label={industriesLink.label}
      href={industriesLink.href}
      items={industryItems}
      onNavigate={onNavigate}
      expandLabel="Show industry verticals"
      collapseLabel="Hide industry verticals"
    />
  );
}
