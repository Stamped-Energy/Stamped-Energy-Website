"use client";

import { useRef, useState } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getVerticalPage, type VerticalSlug } from "@/lib/content";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

type IndustryWasteTableProps = {
  slug: VerticalSlug;
};

export function IndustryWasteTable({ slug }: IndustryWasteTableProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const page = getVerticalPage(slug);
  const wasteTable = page?.wasteTable;
  const [activeId, setActiveId] = useState(wasteTable?.areas[0]?.id ?? "");
  const active = wasteTable?.areas.find((area) => area.id === activeId) ?? wasteTable?.areas[0];
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-value-tab]", {
        autoAlpha: 0,
        x: -12,
        duration: 0.45,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || !panelRef.current || !active) {
        return;
      }

      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0.6, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
      );
    },
    { scope: panelRef, dependencies: [activeId, isReady, prefersReducedMotion] },
  );

  if (!wasteTable || !active) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="section-y relative overflow-hidden bg-secondary text-on-secondary"
    >
      <Container className="relative z-10">
        <Reveal className="mx-auto">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-on-secondary/65">
            {wasteTable.eyebrow}
          </p>
          <SectionHeading
            title={wasteTable.title}
            description={wasteTable.description}
            align="center"
            dark
            className="mx-auto"
          />
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-6xl gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-8">
          <div className="flex flex-col gap-2">
            {wasteTable.areas.map((area) => {
              const isActive = area.id === active.id;
              return (
                <button
                  key={area.id}
                  type="button"
                  data-value-tab
                  className={cn(
                    "rounded-xl border px-4 py-3.5 text-left transition-[border-color,background-color,box-shadow,color] duration-200 md:px-5 md:py-4",
                    isActive
                      ? "border-outline-variant/40 bg-surface-lowest text-on-surface shadow-md"
                      : "border-on-secondary/15 bg-on-secondary/[0.06] text-on-secondary/85 hover:border-on-secondary/28 hover:bg-on-secondary/10",
                  )}
                  onClick={() => setActiveId(area.id)}
                >
                  <div className="flex items-baseline gap-3">
                    <span
                      className={cn(
                        "font-display text-lg font-extrabold tabular-nums",
                        isActive ? "text-on-surface-variant" : "text-on-secondary/45",
                      )}
                    >
                      {area.step}
                    </span>
                    <span
                      className={cn(
                        "text-sm font-bold md:text-base",
                        isActive ? "text-on-surface" : "text-on-secondary/90",
                      )}
                    >
                      {area.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div
            ref={panelRef}
            className="flex flex-col justify-center rounded-2xl border border-outline-variant/40 bg-surface-lowest p-5 text-on-surface shadow-lg sm:p-6 md:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
              {active.step} · Selected area
            </p>
            <h3 className="mt-2 text-xl font-bold sm:text-2xl md:text-3xl">{active.title}</h3>
            <p className="mt-3 text-sm leading-6 text-on-surface-variant sm:leading-7 md:text-base">
              {active.description}
            </p>
            <div className="mt-5 flex w-full flex-col gap-1 rounded-xl border border-outline-variant/45 bg-surface-low px-4 py-3.5 sm:mt-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant sm:text-xs">
                {active.potentialLabel}
              </span>
              <span className="font-display text-xl font-extrabold tabular-nums text-on-surface sm:text-2xl">
                {active.potentialValue}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
