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
  footerCtaLabel?: string;
  items: ListMegaMenuItem[];
  lightNav?: boolean;
  /** Wider panel for longer industry lists */
  size?: "md" | "lg";
};

export function ListMegaMenu({
  label,
  href,
  eyebrow,
  footerNote,
  footerCtaLabel = "View all",
  items,
  lightNav = false,
  size = "md",
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
          "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors duration-200",
          lightNav
            ? "text-on-secondary/80 hover:bg-on-secondary/10 hover:text-on-secondary"
            : "text-on-surface-variant hover:bg-surface-low hover:text-on-surface",
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
            "h-3 w-3 shrink-0 opacity-70 transition-transform duration-200 ease-out",
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
          "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-[opacity,transform] duration-200 ease-out",
          size === "lg"
            ? "w-[min(42rem,calc(100vw-2rem))]"
            : "w-[min(34rem,calc(100vw-2rem))]",
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1.5 opacity-0",
        )}
      >
        <div
          className={cn(
            "overflow-hidden rounded-xl border border-outline-variant/45 bg-surface-lowest",
            "shadow-[0_28px_64px_-28px_color-mix(in_srgb,var(--brand-on-surface)_28%,transparent)]",
          )}
        >
          <div className="flex items-end justify-between gap-4 border-b border-outline-variant/35 px-5 py-4 sm:px-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                {eyebrow}
              </p>
              <p className="mt-1 text-sm font-semibold text-on-surface">{label}</p>
            </div>
            {footerNote ? (
              <p className="shrink-0 pb-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-on-surface-variant">
                {footerNote}
              </p>
            ) : null}
          </div>

          <ul
            className={cn(
              "grid gap-0 p-2 sm:p-2.5",
              items.length > 3 ? "sm:grid-cols-2" : "grid-cols-1",
            )}
          >
            {items.map((item, index) => {
              const number = String(index + 1).padStart(2, "0");
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex h-full gap-3.5 rounded-lg px-3.5 py-3.5 transition-colors duration-150",
                      "hover:bg-primary/8 focus-visible:bg-primary/8 focus-visible:outline-none",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md font-mono text-[11px] font-semibold transition-colors",
                        "border border-outline-variant/55 bg-surface-low text-on-surface-variant",
                        "group-hover:border-primary/35 group-hover:bg-primary/10 group-hover:text-primary",
                      )}
                    >
                      {number}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-display text-[0.95rem] font-bold leading-snug text-on-surface group-hover:text-primary">
                          {item.title}
                        </span>
                        {item.badge ? (
                          <span className="rounded-sm bg-primary/12 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-primary">
                            {item.badge}
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-on-surface-variant sm:text-[13px] sm:leading-6">
                        {item.description}
                      </span>
                      {item.meta ? (
                        <span className="mt-1.5 block text-[11px] font-medium text-on-surface-variant/80">
                          {item.meta}
                        </span>
                      ) : null}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-sm text-on-surface-variant opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-outline-variant/35 bg-surface-low/90 px-5 py-3 sm:px-6">
            <Link
              href={href}
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
            >
              {footerCtaLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
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
        <ul className="space-y-2 pb-4 pt-1">
          {items.map((item, index) => {
            const number = String(index + 1).padStart(2, "0");
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="flex gap-3 rounded-lg border border-outline-variant/40 bg-surface-lowest px-3 py-3 transition-colors hover:border-primary/35 hover:bg-primary/6"
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
