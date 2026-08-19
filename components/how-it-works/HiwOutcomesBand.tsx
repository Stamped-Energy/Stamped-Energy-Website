import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { howItWorksContent } from "@/lib/content";

/** Outcomes-style before/after band for /platform (DESIGN.md selective restructure). */
export function HiwOutcomesBand() {
  const { beforeAfter } = howItWorksContent;

  return (
    <section className="border-y border-outline-variant/30 bg-surface section-y">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center">
              <SectionBadge label={beforeAfter.eyebrow} />
            </div>
            <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
              {beforeAfter.title}
            </h2>
            {beforeAfter.description ? (
              <p className="mt-3 text-sm leading-7 text-on-surface-variant md:text-base">
                {beforeAfter.description}
              </p>
            ) : null}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          <Reveal>
            <div className="h-full border border-outline-variant/50 bg-surface-lowest p-6 md:p-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                {beforeAfter.before.title}
              </p>
              <ul className="mt-5 space-y-3">
                {beforeAfter.before.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-on-surface-variant">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-outline" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal>
            <div className="h-full border border-primary/35 bg-primary/5 p-6 md:p-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                {beforeAfter.after.title}
              </p>
              <ul className="mt-5 space-y-3">
                {beforeAfter.after.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-on-surface">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
