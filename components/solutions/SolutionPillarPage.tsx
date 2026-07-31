import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { SolutionPillarPage as PillarContent } from "@/lib/content/solutions";

type SolutionPillarPageProps = {
  pillar: PillarContent;
};

export function SolutionPillarPage({ pillar }: SolutionPillarPageProps) {
  const { rxExample } = pillar;

  return (
    <>
      <section className="page-hero border-b border-outline-variant/40 bg-surface">
        <Container>
          <div className="max-w-3xl pt-4 pb-2 md:pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {pillar.eyebrow}
            </p>
            <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-on-surface md:text-4xl lg:text-[2.75rem]">
              {pillar.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-on-surface-variant md:text-base">
              {pillar.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={pillar.primaryCta.href} variant="primary">
                {pillar.primaryCta.label}
              </Button>
              <Button href={pillar.secondaryCta.href} variant="outline">
                {pillar.secondaryCta.label}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-y bg-surface">
        <Container>
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold text-on-surface md:text-3xl">
              {pillar.problem.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-on-surface-variant md:text-base">
              {pillar.problem.body}
            </p>
          </div>
        </Container>
      </section>

      <section className="border-y border-outline-variant/30 bg-surface-low section-y">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                {rxExample.title}
              </p>
              <p className="mt-4 font-display text-xl font-bold text-on-surface md:text-2xl">
                {rxExample.what}
              </p>
            </div>
            <dl className="space-y-5 text-sm md:text-base">
              <div>
                <dt className="font-semibold text-on-surface">Who acts</dt>
                <dd className="mt-1 text-on-surface-variant">{rxExample.who}</dd>
              </div>
              <div>
                <dt className="font-semibold text-on-surface">Impact</dt>
                <dd className="mt-1 text-on-surface-variant">{rxExample.impact}</dd>
              </div>
              <div>
                <dt className="font-semibold text-on-surface">Evidence</dt>
                <dd className="mt-1 text-on-surface-variant">{rxExample.evidence}</dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      <section className="section-y bg-surface">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="font-display text-xl font-bold text-on-surface md:text-2xl">
                {pillar.whoActs.title}
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-on-surface-variant md:text-base">
                {pillar.whoActs.roles.map((role) => (
                  <li key={role} className="flex gap-2">
                    <span className="text-primary" aria-hidden>
                      ·
                    </span>
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-on-surface md:text-2xl">
                {pillar.evidence.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-on-surface-variant md:text-base">
                {pillar.evidence.body}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-secondary section-y text-on-secondary">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">
              See it on your plant
            </h2>
            <p className="mt-3 text-sm leading-6 text-on-secondary/80 md:text-base">
              Book a discovery call, or walk the Connect → Improve loop on the Platform.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href={pillar.primaryCta.href} variant="primary">
                {pillar.primaryCta.label}
              </Button>
              <Button
                href={pillar.secondaryCta.href}
                variant="outline"
                className="border-on-secondary/40 text-on-secondary hover:bg-on-secondary/10"
              >
                {pillar.secondaryCta.label}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
