"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type ListMegaMenuItem = {
  id: string;
  href: string;
  title: string;
  description: string;
  badge?: string;
  meta?: string;
};

type ListMegaMenuProps = {
  label: string;
  href: string;
  eyebrow: string;
  footerNote?: string;
  items: ListMegaMenuItem[];
  lightNav?: boolean;
};

export function ListMegaMenu({
  label,
  href,
  eyebrow,
  footerNote,
  items,
  lightNav = false,
}: ListMegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
      <Link
        href={href}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors",
          lightNav
            ? "text-on-secondary/80 hover:bg-on-secondary/10 hover:text-on-secondary"
            : "text-on-surface-variant hover:bg-primary/8 hover:text-on-surface",
          isOpen &&
            (lightNav
              ? "bg-on-secondary/15 text-on-secondary"
              : "bg-primary/10 text-primary"),
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          className={cn(
            "h-3 w-3 shrink-0 opacity-70 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 4.5L6 7.5L9 4.5" />
        </svg>
      </Link>

      <div
        className={cn(
          "absolute left-1/2 top-full z-50 w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 pt-3 transition-all duration-200",
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <div className="overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-lowest shadow-[0_24px_60px_-32px_color-mix(in_srgb,var(--brand-on-surface)_18%,transparent)]">
          <div className="px-5 pt-5 pb-2 sm:px-6 sm:pt-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant">
              {eyebrow}
            </p>
          </div>

          <ul className="px-2 pb-2 sm:px-3">
            {items.map((item, index) => {
              const number = String(index + 1).padStart(2, "0");
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="group flex gap-3 rounded-xl px-3 py-3.5 transition-colors hover:bg-surface-low sm:gap-4 sm:px-4"
                    onClick={() => setIsOpen(false)}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-outline-variant/50 font-mono text-[11px] font-semibold text-on-surface-variant"
                    >
                      {number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-display text-sm font-bold text-on-surface group-hover:text-primary sm:text-[0.95rem]">
                          {item.title}
                        </span>
                        {item.badge ? (
                          <span className="rounded bg-primary px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-on-primary">
                            {item.badge}
                          </span>
                        ) : null}
                        {item.meta ? (
                          <span className="ml-auto text-[11px] text-on-surface-variant">
                            {item.meta}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-xs leading-5 text-on-surface-variant sm:text-[13px] sm:leading-6">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          {footerNote ? (
            <div className="border-t border-outline-variant/40 bg-surface-low/80 px-5 py-3 sm:px-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                {footerNote}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

type ListMegaMobileNavProps = {
  label: string;
  href: string;
  items: ListMegaMenuItem[];
  onNavigate: () => void;
  expandLabel: string;
  collapseLabel: string;
};

export function ListMegaMobileNav({
  label,
  href,
  items,
  onNavigate,
  expandLabel,
  collapseLabel,
}: ListMegaMobileNavProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-outline-variant/20">
      <div className="flex min-h-12 items-stretch">
        <Link
          href={href}
          className="flex flex-1 items-center py-3.5 text-base font-medium text-on-surface transition-colors hover:text-primary"
          onClick={onNavigate}
        >
          {label}
        </Link>
        <button
          type="button"
          className={cn(
            "flex w-12 shrink-0 items-center justify-center rounded-md text-on-surface-variant transition-colors duration-200 ease-out",
            "hover:bg-surface-container-low hover:text-on-surface",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-lowest",
          )}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? collapseLabel : expandLabel}
          onClick={() => setIsExpanded((open) => !open)}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className={cn(
              "h-4 w-4 transition-transform duration-200 ease-out",
              isExpanded && "rotate-180",
            )}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>
      </div>

      {isExpanded ? (
        <ul className="space-y-1 pb-4 pt-1">
          {items.map((item, index) => {
            const number = String(index + 1).padStart(2, "0");
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="flex gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-surface-container-low"
                  onClick={onNavigate}
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-outline-variant/50 font-mono text-[11px] font-semibold text-on-surface-variant"
                  >
                    {number}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-on-surface">{item.title}</span>
                    <span className="mt-0.5 block text-xs leading-5 text-on-surface-variant">
                      {item.description}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
