import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import type { SolutionPillarPage } from "@/lib/content/solutions";

type SolutionExamplesProps = {
  examples: SolutionPillarPage["examples"];
};

export function SolutionExamples({ examples }: SolutionExamplesProps) {
  return (
    <section className="border-b border-outline-variant/30 bg-surface-low section-y">
      <Container>
        <Reveal>
          <SectionBadge label={examples.eyebrow} />
          <h2 className="mt-5 max-w-3xl font-display text-2xl font-bold tracking-tight text-on-surface md:text-4xl">
            {examples.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-on-surface-variant md:text-base">
            {examples.intro}
          </p>
        </Reveal>

        <div className="mt-12 space-y-6 md:mt-14 md:space-y-8">
          {examples.items.map((rx, index) => (
            <Reveal key={rx.id}>
              <article className="overflow-hidden border border-outline-variant/50 bg-surface-lowest">
                <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                  <div className="border-b border-outline-variant/40 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[11px] font-semibold text-on-surface-variant">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <SectionBadge label={rx.badge} />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-on-surface md:text-2xl">
                      {rx.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-on-surface-variant md:text-[15px]">
                      {rx.talkTrack}
                    </p>
                    <p className="mt-6 font-display text-lg font-extrabold tracking-tight text-primary md:text-xl">
                      {rx.impact}
                    </p>
                  </div>

                  <div className="p-6 sm:p-8">
                    <dl className="space-y-5">
                      <div>
                        <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                          What
                        </dt>
                        <dd className="mt-1.5 text-sm leading-6 text-on-surface">{rx.what}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                          Why
                        </dt>
                        <dd className="mt-1.5 text-sm leading-6 text-on-surface-variant">{rx.why}</dd>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                            Who
                          </dt>
                          <dd className="mt-1.5 text-sm leading-6 text-on-surface">{rx.who}</dd>
                        </div>
                        <div>
                          <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                            Effort
                          </dt>
                          <dd className="mt-1.5 text-sm leading-6 text-on-surface">{rx.effort}</dd>
                        </div>
                      </div>
                      <div className="border-t border-outline-variant/40 pt-4">
                        <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                          Evidence
                        </dt>
                        <dd className="mt-1.5 text-sm leading-6 text-on-surface-variant">{rx.evidence}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
