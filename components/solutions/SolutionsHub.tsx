import Link from "next/link";

import { SolutionsHero } from "@/components/solutions/SolutionsHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { solutionsContent } from "@/lib/content/solutions";

export function SolutionsHub() {
  const { hub } = solutionsContent;

  return (
    <>
      <SolutionsHero
        eyebrow={hub.eyebrow}
        title={hub.title}
        description={hub.description}
        heroImageSrc={hub.heroImageSrc}
        heroImageAlt={hub.heroImageAlt}
        heroObjectPosition="center 40%"
        primaryCta={hub.primaryCta}
        secondaryCta={hub.secondaryCta}
      />

      <section className="border-b border-outline-variant/30 bg-surface section-y">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {hub.sectionEyebrow}
            </p>
            <h2 className="mt-2 max-w-xl font-display text-2xl font-bold text-on-surface md:text-3xl">
              {hub.sectionTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-on-surface-variant md:text-base">
              {hub.sectionIntro}
            </p>
          </Reveal>
        </Container>
      </section>

      {hub.pillars.map((pillar, index) => {
        const number = String(index + 1).padStart(2, "0");
        const isAlt = index % 2 === 1;

        return (
          <section
            key={pillar.slug}
            className={
              isAlt
                ? "border-b border-outline-variant/30 bg-surface-low section-y"
                : "border-b border-outline-variant/30 bg-surface section-y"
            }
          >
            <Container>
              <Reveal>
                <div className="grid gap-8 md:grid-cols-[5rem_1fr] md:gap-12 lg:gap-16">
                  <span
                    aria-hidden="true"
                    className="font-display text-5xl font-bold tracking-tight text-outline-variant md:text-6xl"
                  >
                    {number}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                      {pillar.shortTitle}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-on-surface md:text-3xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-on-surface-variant md:text-base">
                      {pillar.hubBrief}
                    </p>
                    <p className="mt-3 text-sm font-medium text-on-surface">{pillar.outcome}</p>
                    <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                      {pillar.highlights.map((item) => (
                        <li
                          key={item}
                          className="text-xs font-medium uppercase tracking-[0.08em] text-on-surface-variant"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Button href={pillar.href} variant="outline">
                        {pillar.ctaLabel}
                      </Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            </Container>
          </section>
        );
      })}

      <section className="border-b border-outline-variant/30 bg-surface section-y">
        <Container>
          <Reveal>
            <p className="max-w-2xl text-sm leading-7 text-on-surface-variant">{hub.sharedNote}</p>
            <p className="mt-4 text-sm text-on-surface-variant">
              Prefer the platform view first?{" "}
              <Link
                href="/platform"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                See how Connect to Improve works
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-secondary section-y text-on-secondary">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-inverse-primary">
              {hub.finalCta.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-2xl font-extrabold md:text-3xl">
              {hub.finalCta.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-on-secondary/80 md:text-base">
              {hub.finalCta.description}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href={hub.finalCta.primaryCta.href} variant="primary">
                {hub.finalCta.primaryCta.label}
              </Button>
              <Button
                href={hub.finalCta.secondaryCta.href}
                variant="outline"
                className="border-on-secondary/40 text-on-secondary hover:bg-on-secondary/10"
              >
                {hub.finalCta.secondaryCta.label}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
