import { SolutionMethodVisual } from "@/components/motion-slots/SolutionMethodVisuals";
import { SolutionMediaSlot } from "@/components/solutions/SolutionMediaSlot";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import type { SolutionArea } from "@/lib/content/solutions";

export function SolutionMethodSection({ area }: { area: SolutionArea }) {
  const { heading, paragraph, steps } = area.method;

  return (
    <section className="border-b border-outline-variant/30 bg-surface-low section-y">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <Reveal className="min-w-0">
            <SectionBadge label="How it works" />
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
            <SolutionMediaSlot label={heading}>
              <SolutionMethodVisual slug={area.slug} />
            </SolutionMediaSlot>
          </div>
        </div>
      </Container>
    </section>
  );
}
