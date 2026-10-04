import type { ReactNode } from "react";

import { SolutionMediaSlot } from "@/components/solutions/SolutionMediaSlot";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { cn } from "@/lib/utils";

type StepsVisualSectionProps = {
  id?: string;
  badge: string;
  heading: string;
  paragraph: string;
  steps: readonly { title: string; text: string }[];
  visual: ReactNode;
  className?: string;
};

/** Text with numbered steps on the left, an animation on the right (text first on phones). */
export function StepsVisualSection({ id, badge, heading, paragraph, steps, visual, className }: StepsVisualSectionProps) {
  return (
    <section id={id} className={cn("border-b border-outline-variant/30 bg-surface-low section-y", className)}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <Reveal className="min-w-0">
            <SectionBadge label={badge} />
            <h2 className="mt-5 max-w-xl font-display text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
              {heading}
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-on-surface-variant md:text-base md:leading-8">
              {paragraph}
            </p>
            <ol className="mt-8 space-y-5">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="font-mono text-sm font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <p className="font-display text-base font-bold text-on-surface">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-on-surface-variant md:text-[15px] md:leading-7">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <div className="min-w-0">
            <SolutionMediaSlot label={heading}>{visual}</SolutionMediaSlot>
          </div>
        </div>
      </Container>
    </section>
  );
}
