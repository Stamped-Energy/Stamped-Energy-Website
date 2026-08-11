import Link from "next/link";

import { SolutionExamples } from "@/components/solutions/SolutionExamples";
import { SolutionHowItWorks } from "@/components/solutions/SolutionHowItWorks";
import { SolutionOutcomes } from "@/components/solutions/SolutionOutcomes";
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

      <SolutionOutcomes outcomes={pillar.outcomes} />
      <SolutionHowItWorks howItWorks={pillar.howItWorks} />
      <SolutionExamples examples={pillar.examples} />

      <section className="border-b border-outline-variant/30 bg-surface section-y">
        <Container>
          <Reveal>
            <SectionBadge label={pillar.industriesStrip.eyebrow} />
            <h2 className="mt-5 max-w-2xl font-display text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
              {pillar.industriesStrip.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-on-surface-variant">
              {pillar.industriesStrip.body}
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

      <section className="border-b border-outline-variant/30 bg-surface-low section-y">
        <Container>
          <Reveal>
            <div className="max-w-2xl">
              <SectionBadge label="Platform" />
              <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
                {pillar.platformLink.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-on-surface-variant md:text-base">
                {pillar.platformLink.body}
              </p>
              <div className="mt-6">
                <Button href={pillar.platformLink.cta.href} variant="outline">
                  {pillar.platformLink.cta.label}
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <MarketingClosingCta content={pillar.finalCta} />
    </>
  );
}
