import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorksContent } from "@/lib/content";

export function HiwStaticLoop() {
  const { journey } = howItWorksContent;

  return (
    <section className="bg-surface-low section-y">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={journey.eyebrow}
            title={journey.title}
            description={journey.description}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="sr-only">
          <h2>How does Stamped Energy connect to my existing plant systems?</h2>
          <h2>How are prescriptions delivered to the plant floor team?</h2>
          <h2>How are energy savings verified with evidence?</h2>
        </div>

        <Reveal>
          <ol className="mx-auto mt-10 max-w-3xl divide-y divide-outline-variant/40 overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-lowest md:mt-12">
            {journey.steps.map((step) => (
              <li
                key={step.id}
                id={step.id}
                className="grid gap-3 px-5 py-5 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-6 sm:px-7 sm:py-6"
              >
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {String(step.step).padStart(2, "0")} {step.title}
                </span>
                <p className="text-sm leading-7 text-on-surface-variant md:text-[15px] md:leading-7">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
