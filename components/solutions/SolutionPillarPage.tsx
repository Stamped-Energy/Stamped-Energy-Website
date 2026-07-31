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
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <h2 className="font-display text-2xl font-bold text-on-surface md:text-3xl">
                {pillar.problem.title}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-on-surface-variant md:text-base">
                {pillar.problem.body}
              </p>

              <h3 className="mt-10 font-display text-xl font-bold text-on-surface">
                {pillar.whoActs.title}
              </h3>
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

              <h3 className="mt-10 font-display text-xl font-bold text-on-surface">
                {pillar.evidence.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-on-surface-variant md:text-base">
                {pillar.evidence.body}
              </p>
            </div>

            <aside className="border border-outline-variant/50 bg-surface-low p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                {rxExample.title}
              </p>
              <p className="mt-4 text-base font-semibold text-on-surface">{rxExample.what}</p>
              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-on-surface">Who</dt>
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
            </aside>
          </div>
        </Container>
      </section>

      <section className="bg-secondary section-y text-on-secondary">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">
              Ready to see this on your plant?
            </h2>
            <p className="mt-3 text-sm leading-6 text-on-secondary/80 md:text-base">
              Book a discovery call or walk the Connect → Improve loop on the Platform page.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
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
    </>
  );
}
