import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { platformContent } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Approved outcomes-and-how text, then the Plant data → Models → Actions → Results loop. */
export function HiwWhatWeDo() {
  const { whatWeDo, flow } = platformContent;
  const lastStep = flow.steps.length - 1;

  return (
    <>
      <section id="what-we-do" className="border-b border-outline-variant/40 bg-surface section-y">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <Reveal>
              <SectionBadge label={whatWeDo.eyebrow} />
              <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-on-surface md:text-4xl">
                {whatWeDo.title}
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="space-y-4 md:space-y-5">
                {whatWeDo.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-[15px] leading-7 text-on-surface/80 md:text-lg md:leading-8"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="loop" className="border-b border-outline-variant/40 bg-surface-low section-y">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <SectionBadge label={flow.eyebrow} />
              </div>
              <h2 className="mt-5 text-balance font-display text-2xl font-bold tracking-tight text-on-surface md:text-4xl">
                {flow.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-on-surface/75 md:text-lg md:leading-8">
                {flow.description}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <figure
              className="mx-auto mt-8 max-w-6xl md:mt-14"
              aria-label="Diagram: plant data feeds models, models produce actions, actions lead to results, and what each result shows goes back into the models."
            >
              <ol className="grid gap-3 md:grid-cols-4 md:gap-5">
                {flow.steps.map((step, index) => (
                  <li
                    key={step.id}
                    className={cn(
                      "relative flex min-w-0 flex-col rounded-xl border p-4 md:p-6",
                      step.id === "actions"
                        ? "border-primary/50 bg-primary/5"
                        : "border-outline-variant/60 bg-surface-lowest",
                    )}
                  >
                    <span className="font-mono text-xs font-semibold tracking-[0.14em] text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-semibold tracking-tight text-on-surface md:text-xl">
                      {step.label}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-on-surface/75">{step.description}</p>
                    {index < lastStep ? (
                      <span
                        aria-hidden
                        className="absolute -right-[1.15rem] top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-outline-variant/60 bg-surface-low text-sm text-on-surface/60 md:flex"
                      >
                        →
                      </span>
                    ) : null}
                  </li>
                ))}
              </ol>

              <div className="mt-3 md:mt-0 md:grid md:grid-cols-8 md:gap-5">
                <div className="relative rounded-xl border-2 border-dashed border-primary/60 px-5 py-4 text-center md:col-start-4 md:col-end-8 md:rounded-t-none md:border-t-0 md:pt-8">
                  <span
                    aria-hidden
                    className="absolute -left-[0.4rem] -top-2.5 hidden text-sm leading-none text-primary md:block"
                  >
                    ▲
                  </span>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                    <span aria-hidden className="md:hidden">↑ </span>
                    Team feedback
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-on-surface/75">{flow.feedback}</p>
                </div>
              </div>
            </figure>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-10 text-center font-display text-lg font-semibold text-on-surface md:mt-12 md:text-xl">
              {flow.controlLine}
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
