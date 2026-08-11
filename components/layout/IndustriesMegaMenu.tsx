"use client";

import {
  SimpleNavDropdown,
  SimpleNavMobileAccordion,
} from "@/components/layout/SimpleNavDropdown";
import { getLiveVerticals } from "@/lib/content";

const industryItems = getLiveVerticals().map((vertical) => ({
  label: vertical.name,
  href: vertical.href,
}));

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
