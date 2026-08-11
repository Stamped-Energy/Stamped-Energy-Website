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

const CLOSE_DELAY_MS = 1000;

/** Compact CVector-style hover dropdown. Trigger is not a link. */
export function SimpleNavDropdown({
  label,
  items,
  lightNav = false,
}: SimpleNavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openMenu = () => {
    clearCloseTimer();
    setIsOpen(true);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      closeTimerRef.current = null;
    }, CLOSE_DELAY_MS);
  };

  const closeMenuNow = () => {
    clearCloseTimer();
    setIsOpen(false);
  };

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeMenuNow();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenuNow();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
      clearCloseTimer();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative hidden lg:block"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        className={cn(
          "inline-flex items-center rounded-md px-2.5 py-1.5 font-display text-[0.8rem] font-semibold uppercase tracking-[0.04em] transition-colors duration-200",
          isOpen
            ? "bg-primary text-on-primary"
            : lightNav
              ? "text-on-secondary/80 hover:bg-primary hover:text-on-primary"
              : "text-on-surface/75 hover:bg-primary hover:text-on-primary",
        )}
        onClick={() => {
          clearCloseTimer();
          setIsOpen((open) => !open);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            clearCloseTimer();
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
                className="block px-4 py-2.5 font-display text-[0.78rem] font-semibold uppercase tracking-[0.04em] text-on-surface/80 transition-colors hover:bg-primary/8 hover:text-primary"
                onClick={closeMenuNow}
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
        className="flex min-h-12 w-full items-center justify-between py-3.5 text-left font-display text-[0.85rem] font-semibold uppercase tracking-[0.04em] text-on-surface"
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
                className="block py-2.5 font-display text-[0.78rem] font-semibold uppercase tracking-[0.04em] text-on-surface/75 transition-colors hover:text-primary"
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
