import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SolutionPillarPage } from "@/lib/content/solutions";

type SolutionExamplesProps = {
  examples: SolutionPillarPage["examples"];
};

export function SolutionExamples({ examples }: SolutionExamplesProps) {
  return (
    <section className="bg-surface section-y">
      <Container>
        <Reveal className="mx-auto">
          <SectionHeading
            eyebrow={examples.eyebrow}
            title={examples.title}
            description={examples.intro}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:mt-12 md:grid-cols-3 md:gap-5">
          {examples.items.map((rx, index) => (
            <Reveal key={rx.id} delay={index * 0.06} className="h-full">
              <article className="flex h-full flex-col rounded-xl border border-outline-variant/50 bg-surface-lowest p-5 md:p-6">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                  {rx.badge}
                </p>
                <h3 className="mt-3 text-base font-bold text-on-surface md:text-lg">{rx.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-on-surface-variant md:leading-7">
                  {rx.description}
                </p>
                <div className="mt-4 border-t border-outline-variant/35 pt-4">
                  <p className="font-display text-lg font-extrabold text-primary">{rx.impactRange}</p>
                  <p className="mt-1 text-xs text-on-surface-variant">Assigned: {rx.assignee}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-5 text-on-surface-variant">
          {examples.footnote}
        </p>
      </Container>
    </section>
  );
}
