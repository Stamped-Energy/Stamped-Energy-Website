"use client";

import {
  SimpleNavDropdown,
  SimpleNavMobileAccordion,
} from "@/components/layout/SimpleNavDropdown";
import { solutionsContent } from "@/lib/content/solutions";

const MENU_LABEL = "What we improve";

const solutionItems = solutionsContent.areas.map((area) => ({
  label: area.title,
  href: area.href,
}));

export function SolutionsMegaMenu({ lightNav = false }: { lightNav?: boolean }) {
  return (
    <SimpleNavDropdown label={MENU_LABEL} items={solutionItems} lightNav={lightNav} />
  );
}

export function SolutionsMobileNav({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  return (
    <SimpleNavMobileAccordion
      label={MENU_LABEL}
      items={solutionItems}
      onNavigate={onNavigate}
    />
  );
}
