"use client";

import { landingContent } from "@/lib/content";

const MOBILE_CARD_IDS = ["inspector", "shift-lead", "planner", "maintenance-lead", "ht-heatup"];

export function HeroMobileActions() {
  const { hero } = landingContent;
  const mobileActionCards = hero.actionCards.filter((card) => MOBILE_CARD_IDS.includes(card.id));

  return (
    <>
      <p className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.12em] text-on-surface-variant sm:text-[0.68rem] sm:text-primary">
        {hero.actionPanel.title}
      </p>
      <div className="relative mt-3">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-10 bg-gradient-to-l from-surface via-surface/80 to-transparent sm:w-12"
          aria-hidden
        />
        <div role="region" aria-label={hero.actionPanel.title}>
          <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6">
            {mobileActionCards.map((card) => (
              <li
                key={card.id}
                className="w-[78%] shrink-0 snap-start rounded-md border border-outline-variant/50 bg-surface-lowest p-4 sm:w-[46%]"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-on-surface px-2.5 py-1 font-mono text-xs font-medium uppercase tracking-[0.1em] text-surface sm:text-[0.62rem]">
                    {card.role}
                  </span>
                  <span className="rounded-full border border-outline-variant/70 px-2.5 py-1 font-mono text-xs uppercase tracking-[0.1em] text-on-surface-variant sm:text-[0.62rem]">
                    {card.area}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-on-surface">{card.copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
