"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavLink } from "@/lib/content/types";
import { cn } from "@/lib/utils";

type NavLinkItemProps = {
  link: NavLink;
  onNavigate?: () => void;
  mobile?: boolean;
  lightNav?: boolean;
};

export function NavLinkItem({
  link,
  onNavigate,
  mobile = false,
  lightNav = false,
}: NavLinkItemProps) {
  const pathname = usePathname();
  const isActive =
    !link.external &&
    (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href));

  const className = cn(
    "relative font-display text-[0.8125rem] font-semibold tracking-[-0.01em] transition-colors duration-200 ease-out",
    mobile
      ? cn(
          "block min-h-12 border-b border-outline-variant/20 py-3.5 text-[0.9375rem] text-on-surface",
          isActive ? "text-primary" : "hover:text-primary",
        )
      : cn(
          lightNav
            ? "text-on-secondary/80 hover:text-primary"
            : "text-on-surface/75 hover:text-primary",
          isActive && (lightNav ? "text-on-secondary" : "text-primary"),
        ),
  );

  if (link.external) {
    return (
      <a
        href={link.href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className} onClick={onNavigate}>
      {link.label}
    </Link>
  );
}
