import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { SolutionPillarPage as PillarContent } from "@/lib/content/solutions";

type SolutionPillarPageProps = {
  pillar: PillarContent;
};

export function SolutionPillarPage({ pillar }: SolutionPillarPageProps) {
  const { valueProps, whatWeDo, rxExamples, platformLink } = pillar;

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

      <section className="border-b border-outline-variant/30 bg-surface section-y">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {valueProps.eyebrow}
          </p>
          <h2 className="mt-2 max-w-xl font-display text-2xl font-bold text-on-surface md:text-3xl">
            {valueProps.title}
          </h2>
          <p className="mt-3 max-w-xl text-sm text-on-surface-variant">{valueProps.disclaimer}</p>
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12">
            {valueProps.items.map((item) => (
              <div key={item.id}>
                <p className="font-display text-3xl font-extrabold text-on-surface md:text-4xl">
                  {item.value}
                </p>
                <p className="mt-3 text-sm font-semibold text-on-surface">{item.label}</p>
                {item.detail ? (
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{item.detail}</p>
                ) : null}
              </div>
            ))}
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
          <h2 className="max-w-2xl font-display text-2xl font-bold text-on-surface md:text-3xl">
            {whatWeDo.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-on-surface-variant md:text-base">
            {whatWeDo.intro}
          </p>
          <ul className="mt-10 grid gap-8 md:grid-cols-2">
            {whatWeDo.levers.map((lever) => (
              <li key={lever.id} className="border-t border-outline-variant/40 pt-5">
                <h3 className="font-display text-lg font-bold text-on-surface">{lever.title}</h3>
                <p className="mt-2 text-sm leading-7 text-on-surface-variant">{lever.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section-y bg-surface">
        <Container>
          <h2 className="font-display text-2xl font-bold text-on-surface md:text-3xl">
            Example prescriptions
          </h2>
          <div className="mt-10 space-y-8">
            {rxExamples.map((rx) => (
              <article
                key={rx.id}
                className="grid gap-6 border border-outline-variant/50 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    {rx.title}
                  </p>
                  <p className="mt-3 font-display text-lg font-bold text-on-surface md:text-xl">
                    {rx.what}
                  </p>
                </div>
                <dl className="space-y-4 text-sm md:text-base">
                  <div>
                    <dt className="font-semibold text-on-surface">Who</dt>
                    <dd className="mt-1 text-on-surface-variant">{rx.who}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-on-surface">Impact</dt>
                    <dd className="mt-1 text-on-surface-variant">{rx.impact}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-on-surface">Evidence</dt>
                    <dd className="mt-1 text-on-surface-variant">{rx.evidence}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-outline-variant/30 bg-surface section-y">
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

      <section className="border-t border-outline-variant/30 bg-surface-low section-y">
        <Container>
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold text-on-surface md:text-3xl">
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
        </Container>
      </section>

      <section className="bg-secondary section-y text-on-secondary">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">
              See it on your plant
            </h2>
            <p className="mt-3 text-sm leading-6 text-on-secondary/80 md:text-base">
              Book a discovery call, or walk the Connect to Improve loop on the Platform.
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
