import Link from "next/link";

import { SolutionExampleCards } from "@/components/solutions/SolutionExampleCards";
import { SolutionsHero } from "@/components/solutions/SolutionsHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { industriesContent } from "@/lib/content/industries";
import { solutionsContent, type SolutionArea } from "@/lib/content/solutions";

export function SolutionAreaPage({ area }: { area: SolutionArea }) {
  const { energy, examplesLabel, examplesNote, primaryCta, secondaryCta, areas } = solutionsContent;
  const otherAreas = areas.filter((item) => item.slug !== area.slug);

  return (
    <>
      <SolutionsHero
        eyebrow={area.title}
        title={area.heading}
        description={area.intro}
        heroImageSrc={area.heroImageSrc}
        heroImageAlt={area.heroImageAlt}
        heroObjectPosition={area.heroObjectPosition}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
      />

      <section className="border-b border-outline-variant/30 bg-surface section-y">
        <Container>
          <Reveal>
            <SectionBadge label={examplesLabel} />
            <h2 className="mt-5 max-w-2xl font-display text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
              What the people who own the problem receive
            </h2>
          </Reveal>
          <SolutionExampleCards label="Example" items={area.examples} className="mt-8 md:mt-10" />
          {area.note ? (
            <p className="mt-6 max-w-3xl text-sm leading-7 text-on-surface-variant md:text-base">{area.note}</p>
          ) : null}
          <p className="mt-4 max-w-3xl text-xs leading-6 text-on-surface-variant">{examplesNote}</p>
        </Container>
      </section>

      <section className="border-b border-outline-variant/30 bg-surface-low section-y">
        <Container>
          <Reveal>
            <SectionBadge label={energy.eyebrow} />
            <h2 className="mt-5 max-w-2xl font-display text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
              {energy.heading}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-on-surface-variant md:text-base md:leading-8">
              {energy.intro}
            </p>
            <p className="mt-6 max-w-3xl border-l-2 border-primary pl-4 text-sm leading-7 text-on-surface md:text-base md:leading-8">
              <span className="font-semibold">In {area.title.toLowerCase()}: </span>
              {area.energyNote}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-outline-variant/30 bg-surface section-y">
        <Container>
          <Reveal>
            <SectionBadge label="By industry" />
            <h2 className="mt-5 max-w-2xl font-display text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
              What {area.title.toLowerCase()} looks at in each industry
            </h2>
          </Reveal>
          <ul className="mt-8 divide-y divide-outline-variant/40 border-y border-outline-variant/40">
            {industriesContent.hub.matrix.rows.map((row) => (
              <li key={row.id}>
                <Link
                  href={row.href}
                  className="group grid gap-1 py-4 md:grid-cols-[14rem_1fr_auto] md:items-center md:gap-6"
                >
                  <span className="font-display text-base font-bold text-on-surface transition-colors group-hover:text-primary">
                    {row.name}
                  </span>
                  <span className="text-sm leading-6 text-on-surface-variant md:text-base">{row.cells[area.slug]}</span>
                  <span className="hidden text-sm font-semibold text-primary md:inline" aria-hidden>
                    »
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-surface section-y">
        <Container>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
              Also across the plant
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              {otherAreas.map((item) => (
                <li key={item.slug}>
                  <Link href={item.href} className="font-display text-lg font-semibold text-primary hover:underline">
                    {item.title} »
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href={primaryCta.href} variant="primary">
                {primaryCta.label}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
