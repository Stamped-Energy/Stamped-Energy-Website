import {
  ProblemDecisionsVisual,
  ProblemPrioritiesVisual,
  ProblemWindowsVisual,
} from "@/components/motion-slots/ProblemStripVisuals";
import { Container } from "@/components/ui/Container";
import { MotionSlot } from "@/components/ui/MotionSlot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { landingContent } from "@/lib/content";

const PROBLEM_VISUALS = [ProblemPrioritiesVisual, ProblemWindowsVisual, ProblemDecisionsVisual];

export function HomeProblem() {
  const { homeProblem } = landingContent;

  return (
    <section className="section-y bg-secondary text-on-secondary">
      <Container>
        <Reveal>
          <SectionBadge label={homeProblem.badge} alternate />
          <h2 className="mt-6 max-w-3xl font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
            {homeProblem.title}
          </h2>
        </Reveal>

        <div className="mt-12 border-t border-on-secondary/15 md:mt-16">
          <div className="grid gap-0 md:grid-cols-3">
            {homeProblem.items.map((item, index) => {
              const Visual = PROBLEM_VISUALS[index];
              return (
                <Reveal key={item.id} delay={index * 0.06}>
                  <article
                    className={
                      index > 0
                        ? "border-t border-on-secondary/15 py-8 md:border-l md:border-t-0 md:px-6 md:py-10 lg:px-8"
                        : "py-8 md:py-10 md:pr-6 lg:pr-8"
                    }
                  >
                    <MotionSlot
                      label={`Problem visual ${index + 1}`}
                      dark
                      aspectClassName="aspect-[4/3] max-h-40"
                      className="mb-6"
                    >
                      {Visual ? <Visual /> : null}
                    </MotionSlot>
                    <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-on-secondary/75 md:text-base">
                      {item.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
