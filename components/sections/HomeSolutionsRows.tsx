import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { MotionSlot } from "@/components/ui/MotionSlot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { landingContent, solutionsContent } from "@/lib/content";

export function HomeSolutionsRows() {
  const { solutionsSection } = landingContent;
  const pillars = solutionsContent.hub.pillars;

  return (
    <section className="section-y bg-surface">
      <Container>
        <Reveal>
          <SectionBadge label={solutionsSection.badge} />
          <h2 className="mt-6 max-w-3xl font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
            {solutionsSection.title}
          </h2>
        </Reveal>

        <div className="mt-12 space-y-10 md:mt-16 md:space-y-14">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.slug} delay={index * 0.05}>
              <article className="grid items-center gap-8 border-t border-outline-variant/40 pt-10 lg:grid-cols-2 lg:gap-14">
                <MotionSlot
                  label={`${pillar.title} visual`}
                  aspectClassName="aspect-[16/10]"
                  className={index % 2 === 1 ? "lg:order-2" : undefined}
                />
                <div className={index % 2 === 1 ? "lg:order-1" : undefined}>
                  <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-8 text-on-surface/80">
                    {pillar.description}
                  </p>
                  <Link
                    href={pillar.href}
                    className="mt-7 inline-flex h-11 items-center gap-2 rounded-md border border-on-surface/20 px-5 text-sm font-semibold text-on-surface transition-colors hover:border-primary hover:text-primary"
                  >
                    {pillar.ctaLabel}
                    <span aria-hidden>»</span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
