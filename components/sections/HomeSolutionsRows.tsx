import Link from "next/link";

import { SolutionAreaVisual } from "@/components/motion-slots/SolutionsAreaVisuals";
import { Container } from "@/components/ui/Container";
import { MotionSlot } from "@/components/ui/MotionSlot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { landingContent, solutionsContent } from "@/lib/content";

export function HomeSolutionsRows() {
  const { solutionsSection } = landingContent;
  const { areas } = solutionsContent;

  return (
    <section className="section-y bg-surface">
      <Container>
        <Reveal>
          <SectionBadge label={solutionsSection.badge} />
          <h2 className="mt-6 max-w-3xl font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
            {solutionsSection.title}
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
          {areas.map((area, index) => (
            <li key={area.slug} className="border-t border-outline-variant/40 pt-8">
              <Reveal delay={index * 0.04}>
                <MotionSlot label={`${area.title} visual`} aspectClassName="aspect-[16/7] max-h-44 sm:max-h-none" className="mb-8">
                  <SolutionAreaVisual slug={area.slug} />
                </MotionSlot>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{area.title}</h3>
                  {area.status === "coming-soon" ? (
                    <span className="rounded-full border border-outline-variant/70 px-2.5 py-1 font-mono text-[0.62rem] font-medium uppercase tracking-[0.12em] text-on-surface-variant">
                      {solutionsSection.comingSoonLabel}
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 max-w-xl text-base leading-8 text-on-surface/80">{area.homeSummary}</p>
                {area.status === "coming-soon" ? null : (
                <Link
                  href={area.href}
                  className="mt-6 inline-flex h-11 items-center gap-2 rounded-md border border-on-surface/20 px-5 text-sm font-semibold text-on-surface transition-colors hover:border-primary hover:text-primary"
                >
                  {solutionsSection.ctaLabel}
                  <span aria-hidden>»</span>
                </Link>
                )}
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <p className="mt-10 text-base font-medium text-on-surface md:mt-12">{solutionsSection.footnote}</p>
        </Reveal>
      </Container>
    </section>
  );
}
