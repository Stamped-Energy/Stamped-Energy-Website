"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type SimpleNavDropdownItem = {
  label: string;
  href: string;
};

type SimpleNavDropdownProps = {
  label: string;
  items: SimpleNavDropdownItem[];
  lightNav?: boolean;
};

/** Compact CVector-style hover dropdown. Trigger is not a link. */
export function SimpleNavDropdown({
  label,
  items,
  lightNav = false,
}: SimpleNavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative hidden lg:block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        className={cn(
          "inline-flex items-center rounded-md px-2.5 py-1.5 font-display text-[0.8125rem] font-semibold tracking-[-0.01em] transition-colors duration-200",
          isOpen
            ? "bg-primary text-on-primary"
            : lightNav
              ? "text-on-secondary/80 hover:bg-primary hover:text-on-primary"
              : "text-on-surface/75 hover:bg-primary hover:text-on-primary",
        )}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsOpen((open) => !open);
          }
        }}
      >
        {label}
      </button>

      {isOpen ? (
        <div
          id={menuId}
          role="menu"
          className="absolute left-0 top-full z-50 mt-2 min-w-[16rem] rounded-md border border-outline-variant/50 bg-surface py-2 shadow-sm"
        >
          <div className="border-l border-primary pl-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                className="block px-4 py-2.5 font-display text-[0.8125rem] font-medium tracking-[-0.01em] text-on-surface/80 transition-colors hover:bg-primary/8 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

type SimpleNavMobileAccordionProps = {
  label: string;
  items: SimpleNavDropdownItem[];
  onNavigate: () => void;
};

/** Mobile accordion: section header is not a link. */
export function SimpleNavMobileAccordion({
  label,
  items,
  onNavigate,
}: SimpleNavMobileAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-outline-variant/20">
      <button
        type="button"
        aria-expanded={isOpen}
        className="flex min-h-12 w-full items-center justify-between py-3.5 text-left font-display text-[0.9375rem] font-semibold tracking-[-0.01em] text-on-surface"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{label}</span>
        <span aria-hidden className="text-on-surface-variant">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen ? (
        <ul className="pb-3 pl-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block py-2.5 font-display text-[0.875rem] font-medium tracking-[-0.01em] text-on-surface/75 transition-colors hover:text-primary"
                onClick={onNavigate}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
