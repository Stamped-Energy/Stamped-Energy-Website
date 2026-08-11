import { SolutionMediaSlot } from "@/components/solutions/SolutionMediaSlot";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import type { SolutionPillarPage } from "@/lib/content/solutions";
import { cn } from "@/lib/utils";

type SolutionHowItWorksProps = {
  howItWorks: SolutionPillarPage["howItWorks"];
};

export function SolutionHowItWorks({ howItWorks }: SolutionHowItWorksProps) {
  return (
    <section className="border-b border-outline-variant/30 bg-surface section-y">
      <Container>
        <Reveal>
          <SectionBadge label={howItWorks.eyebrow} />
          <h2 className="mt-5 max-w-3xl font-display text-2xl font-bold tracking-tight text-on-surface md:text-4xl">
            {howItWorks.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-on-surface-variant md:text-base">
            {howItWorks.intro}
          </p>
        </Reveal>

        <ul className="mt-14 space-y-16 md:mt-20 md:space-y-24">
          {howItWorks.steps.map((step, index) => {
            const mediaFirst = index % 2 === 0;
            return (
              <li key={step.id}>
                <Reveal>
                  <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                    <div className={cn(!mediaFirst && "lg:order-2")}>
                      <SolutionMediaSlot label={step.mediaLabel} />
                    </div>
                    <div className={cn(!mediaFirst && "lg:order-1")}>
                      <p className="font-mono text-[11px] font-semibold text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-on-surface md:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-4 max-w-xl text-sm leading-7 text-on-surface-variant md:text-base">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
