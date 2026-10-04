import { SolutionMethodVisual } from "@/components/motion-slots/SolutionMethodVisuals";
import { StepsVisualSection } from "@/components/ui/StepsVisualSection";
import type { SolutionArea } from "@/lib/content/solutions";

export function SolutionMethodSection({ area }: { area: SolutionArea }) {
  const { heading, paragraph, steps } = area.method;

  return (
    <StepsVisualSection
      badge="How it works"
      heading={heading}
      paragraph={paragraph}
      steps={steps}
      visual={<SolutionMethodVisual slug={area.slug} />}
    />
  );
}
