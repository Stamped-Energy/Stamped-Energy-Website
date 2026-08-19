import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SolutionPillarPage, SolutionRxExample } from "@/lib/content/solutions";
import { cn } from "@/lib/utils";

type SolutionExamplesProps = {
  examples: SolutionPillarPage["examples"];
};

function DetailCell({
  label,
  body,
  className,
}: {
  label: string;
  body: string;
  className?: string;
}) {
  return (
    <div className={cn("p-5 md:p-6", className)}>
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-on-surface">{body}</p>
    </div>
  );
}

function CompactCard({ rx }: { rx: SolutionRxExample }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-outline-variant/50 bg-surface-lowest p-5">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
        {rx.badge}
      </p>
      <h3 className="mt-3 text-base font-bold text-on-surface">{rx.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-on-surface-variant">{rx.description}</p>
      <div className="mt-4 border-t border-outline-variant/35 pt-4">
        <p className="font-display text-lg font-extrabold text-primary">{rx.impactRange}</p>
        <p className="mt-1 text-xs text-on-surface-variant">Assigned: {rx.assignee}</p>
      </div>
    </article>
  );
}

function DetailedCard({ rx }: { rx: SolutionRxExample }) {
  return (
    <article className="overflow-hidden rounded-xl border border-outline-variant/50 bg-surface-lowest">
      <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="flex flex-col border-b border-outline-variant/40 p-6 md:p-8 lg:border-b-0 lg:border-r">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
            {rx.badge}
          </p>
          <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-on-surface md:text-2xl">
            {rx.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-7 text-on-surface-variant">{rx.description}</p>
          <div className="mt-6 border-t border-outline-variant/35 pt-4">
            <p className="font-display text-xl font-extrabold text-primary">{rx.impactRange}</p>
            <p className="mt-1 text-sm text-on-surface-variant">Assigned: {rx.assignee}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2">
          <DetailCell
            label="What"
            body={rx.what}
            className="border-b border-outline-variant/40 sm:border-r"
          />
          <DetailCell label="Why" body={rx.why} className="border-b border-outline-variant/40" />
          <DetailCell
            label="Effort"
            body={rx.effort}
            className="border-b border-outline-variant/40 sm:border-b-0 sm:border-r"
          />
          <DetailCell label="How you check" body={rx.evidence} />
        </div>
      </div>
    </article>
  );
}

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

        <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:hidden">
          {examples.items.map((rx, index) => (
            <Reveal key={rx.id} delay={index * 0.06} className="h-full">
              <CompactCard rx={rx} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 hidden space-y-5 md:block">
          {examples.items.map((rx, index) => (
            <Reveal key={rx.id} delay={index * 0.06}>
              <DetailedCard rx={rx} />
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
