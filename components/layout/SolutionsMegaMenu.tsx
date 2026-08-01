"use client";

import { ListMegaMenu, ListMegaMobileNav } from "@/components/layout/ListMegaMenu";
import { navLinks } from "@/lib/content";
import { solutionsContent } from "@/lib/content/solutions";

const solutionItems = solutionsContent.hub.pillars.map((pillar) => ({
  id: pillar.slug,
  href: pillar.href,
  title: pillar.title,
  description: pillar.description,
  badge: pillar.slug === "load-energy" ? "Energy" : "Equipment",
  meta: pillar.shortTitle,
}));

export function SolutionsMegaMenu({ lightNav = false }: { lightNav?: boolean }) {
  const solutionsLink = navLinks.find((link) => link.megaMenu === "solutions");

  if (!solutionsLink) {
    return null;
  }

  return (
    <ListMegaMenu
      label={solutionsLink.label}
      href={solutionsLink.href}
      eyebrow="The intelligence"
      footerNote="Two pillars · One product"
      items={solutionItems}
      lightNav={lightNav}
    />
  );
}

export function SolutionsMobileNav({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  const solutionsLink = navLinks.find((link) => link.megaMenu === "solutions");

  if (!solutionsLink) {
    return null;
  }

  return (
    <ListMegaMobileNav
      label={solutionsLink.label}
      href={solutionsLink.href}
      items={solutionItems}
      onNavigate={onNavigate}
      expandLabel="Show solution pillars"
      collapseLabel="Hide solution pillars"
    />
  );
}
