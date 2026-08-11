import { Container } from "@/components/ui/Container";
import { MotionSlot } from "@/components/ui/MotionSlot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { landingContent } from "@/lib/content";

export function HomeWhatIs() {
  const { whatIs } = landingContent;

  return (
    <section className="section-y bg-surface">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <Reveal>
            <MotionSlot label={whatIs.motionSlotLabel} aspectClassName="aspect-square max-h-[420px]" />
          </Reveal>
          <Reveal delay={0.08}>
            <SectionBadge label={whatIs.badge} />
            <h2 className="mt-6 max-w-xl font-display text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
              {whatIs.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-on-surface/80 md:text-lg">
              {whatIs.description}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
