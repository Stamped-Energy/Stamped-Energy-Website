import { PlantFlowDiagram } from "@/components/diagrams/PlantFlowDiagram";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { landingContent } from "@/lib/content";

export function HomeHowItWorks() {
  const { homeHowItWorks } = landingContent;

  return (
    <section id="hiw" className="scroll-mt-24 bg-surface-low section-y">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <SectionBadge label={homeHowItWorks.badge} />
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
              {homeHowItWorks.title}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <PlantFlowDiagram className="mx-auto mt-10 max-w-4xl md:mt-14" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-3xl space-y-5 md:mt-14">
            {homeHowItWorks.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-base leading-8 text-on-surface/80 md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
