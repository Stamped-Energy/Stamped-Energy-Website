import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import type { SolutionPillarPage } from "@/lib/content/solutions";

type SolutionExamplesProps = {
  examples: SolutionPillarPage["examples"];
};

export function SolutionExamples({ examples }: SolutionExamplesProps) {
  return (
    <section className="bg-surface-low section-y">
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

        <ol className="mt-10 divide-y divide-outline-variant/40 border border-outline-variant/50 bg-surface-lowest">
          {examples.items.map((rx, index) => (
            <li key={rx.id}>
              <Reveal>
                <article className="grid gap-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                  <div className="border-b border-outline-variant/40 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                      Example {String(index + 1).padStart(2, "0")} · {rx.badge}
                    </p>
                    <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-on-surface md:text-2xl">
                      {rx.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-on-surface-variant">{rx.talkTrack}</p>
                    <p className="mt-5 font-display text-xl font-extrabold tracking-tight text-on-surface">
                      {rx.impact}
                    </p>
                  </div>

                  <div className="grid gap-0 sm:grid-cols-2">
                    <div className="border-b border-outline-variant/40 p-5 sm:border-r sm:p-6">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                        What
                      </p>
                      <p className="mt-2 text-sm leading-6 text-on-surface">{rx.what}</p>
                    </div>
                    <div className="border-b border-outline-variant/40 p-5 sm:p-6">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                        Why
                      </p>
                      <p className="mt-2 text-sm leading-6 text-on-surface-variant">{rx.why}</p>
                    </div>
                    <div className="border-b border-outline-variant/40 p-5 sm:border-b-0 sm:border-r sm:p-6">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                        Who
                      </p>
                      <p className="mt-2 text-sm leading-6 text-on-surface">{rx.who}</p>
                      <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                        Effort
                      </p>
                      <p className="mt-2 text-sm leading-6 text-on-surface">{rx.effort}</p>
                    </div>
                    <div className="p-5 sm:p-6">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                        How you check
                      </p>
                      <p className="mt-2 text-sm leading-6 text-on-surface-variant">{rx.evidence}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
