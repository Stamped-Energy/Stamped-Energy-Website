import { PlantFlowDiagram } from "@/components/diagrams/PlantFlowDiagram";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { platformContent } from "@/lib/content";

/** Approved long outcomes-and-how text, then the Plant data → Models → Actions → Results loop. */
export function HiwWhatWeDo() {
  const { whatWeDo, flow } = platformContent;

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
              <div className="space-y-5">
                {whatWeDo.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="text-base leading-8 text-on-surface/80 md:text-lg">
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
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <PlantFlowDiagram className="mx-auto mt-10 max-w-4xl md:mt-12" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 max-w-3xl space-y-5">
              {flow.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-base leading-8 text-on-surface/80 md:text-lg">
                  {paragraph}
                </p>
              ))}
              <p className="font-display text-lg font-semibold text-on-surface">{flow.controlLine}</p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
