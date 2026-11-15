"use client";

import { useState } from "react";

import { ProductFrame } from "@/components/ui/ProductFrame";
import { Section } from "@/components/ui/Section";
import { productsContent } from "@/lib/content/products";
import { cn } from "@/lib/utils";

const ROLE_IMAGES: Record<string, { src: string; alt: string }> = {
  "plant-head": {
    src: "/images/product/v4/hero-owner.png",
    alt: "Plant head view of verified value across the plant",
  },
  "quality-head": {
    src: "/images/product/v4/role-quality.png",
    alt: "Quality head view of lots at risk and investigations",
  },
  "process-engineer": {
    src: "/images/product/v4/role-process.png",
    alt: "Process engineer view of proposals and model tests",
  },
  "shift-operators": {
    src: "/images/product/v4/data-health.png",
    alt: "Shift and operators view of my line now",
  },
};

export function HomeRolesV4() {
  const { roles } = productsContent;
  const [activeId, setActiveId] = useState<string>(roles.tabs[0]?.id ?? "plant-head");
  const active = roles.tabs.find((tab) => tab.id === activeId) ?? roles.tabs[0];
  const frame = ROLE_IMAGES[activeId] ?? ROLE_IMAGES["plant-head"];

  return (
    <Section tone="light" id="roles">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em] text-balance">
          {roles.title}
        </h2>
      </div>

      <div
        role="tablist"
        aria-label="Roles"
        className="mt-10 flex flex-wrap items-center justify-center gap-2"
      >
        {roles.tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              id={`role-tab-${tab.id}`}
              onClick={() => setActiveId(tab.id)}
              className={cn(
                "rounded-[var(--radius-control)] border px-4 py-2 text-sm font-semibold transition-colors",
                isActive
                  ? "border-secondary bg-secondary text-on-secondary"
                  : "border-outline-variant bg-surface-lowest text-on-surface hover:bg-surface-low",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {active ? (
        <div
          role="tabpanel"
          aria-labelledby={`role-tab-${active.id}`}
          className="mt-12 grid items-start gap-10 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-5">
            <p className="text-lg font-semibold tracking-tight text-on-surface">{active.summary}</p>
            <ul className="mt-6 space-y-3">
              {active.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm leading-6 text-on-surface-variant">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <ProductFrame
              src={frame.src}
              alt={frame.alt}
              title={`${active.label} · Stamped`}
            />
          </div>
        </div>
      ) : null}
    </Section>
  );
}
