import Link from "next/link";

import { SolutionMethodBand } from "@/components/solutions/SolutionMethodBand";
import { SolutionsHero } from "@/components/solutions/SolutionsHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MarketingClosingCta } from "@/components/ui/MarketingClosingCta";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { getLiveVerticals } from "@/lib/content/industries";
import type { SolutionPillarPage as PillarContent } from "@/lib/content/solutions";

type SolutionPillarPageProps = {
  pillar: PillarContent;
};

export function SolutionPillarPage({ pillar }: SolutionPillarPageProps) {
  const { valueProps, whatWeDo, rxExamples, platformLink, method, whoActs } = pillar;
  const verticals = getLiveVerticals();

  return (
    <>
      <SolutionsHero
        eyebrow={pillar.eyebrow}
        title={pillar.title}
        description={pillar.description}
        heroImageSrc={pillar.heroImageSrc}
        heroImageAlt={pillar.heroImageAlt}
        heroObjectPosition={pillar.heroObjectPosition}
        primaryCta={pillar.primaryCta}
        secondaryCta={pillar.secondaryCta}
      />

      {/* Benefits / outcomes */}
      <section className="border-b border-outline-variant/30 bg-surface section-y">
        <Container>
          <Reveal>
            <SectionBadge label={valueProps.eyebrow} />
            <h2 className="mt-5 max-w-xl font-display text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
              {valueProps.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-on-surface-variant">
              {valueProps.disclaimer}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
            {valueProps.items.map((item) => (
              <Reveal key={item.id} className="h-full">
                <div className="flex h-full flex-col border border-outline-variant/50 bg-surface-lowest p-6 md:p-8">
                  <p className="font-display text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">
                    {item.value}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-on-surface md:text-base">
                    {item.label}
                  </p>
                  {item.detail ? (
                    <p className="mt-2 text-sm leading-6 text-on-surface-variant">{item.detail}</p>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Problem (dark) */}
      <section className="bg-secondary section-y text-on-secondary">
        <Container>
          <Reveal>
            <div className="max-w-2xl">
              <SectionBadge label="The gap" alternate />
              <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-on-secondary md:text-3xl">
                {pillar.problem.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-on-secondary/80 md:text-base">
                {pillar.problem.body}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* How it works + custom visual */}
      <SolutionMethodBand method={method} slug={pillar.slug} />

      {/* Levers */}
      <section className="bg-secondary section-y text-on-secondary">
        <Container>
          <Reveal>
            <SectionBadge label={whatWeDo.eyebrow} alternate />
            <h2 className="mt-5 max-w-2xl font-display text-2xl font-bold tracking-tight text-on-secondary md:text-3xl">
              {whatWeDo.title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-on-secondary/80 md:text-base">
              {whatWeDo.intro}
            </p>
          </Reveal>

          <ul className="mt-10 divide-y divide-on-secondary/15 border-y border-on-secondary/15">
            {whatWeDo.levers.map((lever, index) => {
              const number = String(index + 1).padStart(2, "0");
              return (
                <li key={lever.id}>
                  <Reveal>
                    <div className="grid gap-4 py-7 md:grid-cols-[3.5rem_1fr] md:items-baseline md:gap-8">
                      <span
                        aria-hidden="true"
                        className="font-mono text-sm font-semibold text-on-secondary/45"
                      >
                        {number}
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-bold text-on-secondary">
                          {lever.title}
                        </h3>
                        <p className="mt-2 max-w-2xl text-sm leading-7 text-on-secondary/75">
                          {lever.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Who acts */}
      <section className="border-b border-outline-variant/30 bg-surface section-y">
        <Container>
          <Reveal>
            <SectionBadge label="Owners" />
            <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
              {whoActs.title}
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {whoActs.roles.map((role) => (
                <li
                  key={role}
                  className="border border-outline-variant/50 bg-surface-lowest px-5 py-4 text-sm font-medium text-on-surface"
                >
                  {role}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Example prescriptions */}
      <section className="border-b border-outline-variant/30 bg-surface-low section-y">
        <Container>
          <Reveal>
            <SectionBadge label="Prescriptions" />
            <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
              Example prescriptions
            </h2>
          </Reveal>

          <div className="mt-10 space-y-6">
            {rxExamples.map((rx) => (
              <Reveal key={rx.id}>
                <article className="border border-outline-variant/50 bg-surface-lowest p-5 sm:p-6 md:p-8">
                  <div className="mb-6 flex flex-col gap-3 border-b border-outline-variant/40 pb-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <SectionBadge label="Illustrative" />
                      <p className="mt-3 font-display text-lg font-bold text-on-surface md:text-xl">
                        {rx.title}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm leading-7 text-on-surface md:text-base">{rx.what}</p>

                  <dl className="mt-6 grid gap-5 sm:grid-cols-3">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                        Who
                      </dt>
                      <dd className="mt-1.5 text-sm text-on-surface">{rx.who}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                        Impact
                      </dt>
                      <dd className="mt-1.5 text-sm text-on-surface-variant">{rx.impact}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                        Evidence
                      </dt>
                      <dd className="mt-1.5 text-sm text-on-surface-variant">{rx.evidence}</dd>
                    </div>
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Evidence band */}
      <section className="bg-secondary section-y text-on-secondary">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl border border-on-secondary/20 bg-on-secondary/5 px-6 py-10 sm:px-10 sm:py-12 md:px-14">
              <SectionBadge label="Proof" alternate />
              <h2 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-on-secondary md:text-4xl">
                {pillar.evidence.title}
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-on-secondary/80 md:text-base md:leading-8">
                {pillar.evidence.body}
              </p>
              <div className="mt-8 flex flex-col gap-2 border-t border-on-secondary/15 pt-6 text-xs font-semibold uppercase tracking-[0.12em] text-on-secondary/55 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
                <span>Ops-cleared ledger</span>
                <span>Plant-specific baselines</span>
                <span>Bill confirmation optional</span>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Platform link */}
      <section className="border-b border-outline-variant/30 bg-surface section-y">
        <Container>
          <Reveal>
            <div className="max-w-2xl">
              <SectionBadge label="Platform" />
              <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
                {platformLink.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-on-surface-variant md:text-base">
                {platformLink.body}
              </p>
              <div className="mt-6">
                <Button href={platformLink.cta.href} variant="outline">
                  {platformLink.cta.label}
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Industries strip */}
      <section className="border-b border-outline-variant/30 bg-surface-low section-y">
        <Container>
          <Reveal>
            <SectionBadge label="Industries" />
            <h2 className="mt-5 max-w-xl font-display text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
              Built for energy-intensive plants in India
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-on-surface-variant">
              Same pillars, plant-specific context. Open a vertical for how the waste patterns show up on your floor.
            </p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {verticals.map((v) => (
                <li key={v.slug}>
                  <Link
                    href={v.href}
                    className="inline-flex h-11 items-center border border-outline-variant/60 bg-surface-lowest px-4 text-sm font-semibold text-on-surface transition-colors hover:border-primary/40 hover:bg-primary/5"
                  >
                    {v.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href="/industries"
                className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                Compare all industries →
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <MarketingClosingCta
        content={{
          eyebrow: "Start with your plant",
          title: "See if this pillar fits how you buy",
          description:
            "Discovery call: we map your meters, main loads, and bill pattern, and say honestly if a pilot makes sense.",
          primaryCta: pillar.primaryCta,
          secondaryCta: pillar.secondaryCta,
        }}
      />
    </>
  );
}
