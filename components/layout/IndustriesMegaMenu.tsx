"use client";

import {
  SimpleNavDropdown,
  SimpleNavMobileAccordion,
} from "@/components/layout/SimpleNavDropdown";
import { getIndustryNavItems } from "@/lib/content";

const industryItems = getIndustryNavItems();

export function IndustriesMegaMenu({ lightNav = false }: { lightNav?: boolean }) {
  return (
    <SimpleNavDropdown label="Industries" items={industryItems} lightNav={lightNav} />
  );
}

export function IndustriesMobileNav({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  return (
    <SimpleNavMobileAccordion
      label="Industries"
      items={industryItems}
      onNavigate={onNavigate}
    />
  );
}
