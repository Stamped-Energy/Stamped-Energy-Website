"use client";

import {
  SimpleNavDropdown,
  SimpleNavMobileAccordion,
} from "@/components/layout/SimpleNavDropdown";
import { productsContent } from "@/lib/content/products";

const MENU_LABEL = "Products";

const productItems = productsContent.navItems.map((item) => ({
  label: item.label,
  href: item.href,
  badge: item.badge,
}));

export function ProductsMegaMenu({ lightNav = false }: { lightNav?: boolean }) {
  return (
    <SimpleNavDropdown label={MENU_LABEL} items={productItems} lightNav={lightNav} />
  );
}

export function ProductsMobileNav({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  return (
    <SimpleNavMobileAccordion
      label={MENU_LABEL}
      items={productItems}
      onNavigate={onNavigate}
    />
  );
}
