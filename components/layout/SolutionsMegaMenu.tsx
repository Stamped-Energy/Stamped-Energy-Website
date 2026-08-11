"use client";

import {
  SimpleNavDropdown,
  SimpleNavMobileAccordion,
} from "@/components/layout/SimpleNavDropdown";
import { solutionsContent } from "@/lib/content/solutions";

const solutionItems = solutionsContent.hub.pillars.map((pillar) => ({
  label: pillar.title,
  href: pillar.href,
}));

export function SolutionsMegaMenu({ lightNav = false }: { lightNav?: boolean }) {
  return (
    <SimpleNavDropdown label="Solutions" items={solutionItems} lightNav={lightNav} />
  );
}

export function SolutionsMobileNav({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  return (
    <SimpleNavMobileAccordion
      label="Solutions"
      items={solutionItems}
      onNavigate={onNavigate}
    />
  );
}
