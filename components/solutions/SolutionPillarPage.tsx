import { SolutionExamples } from "@/components/solutions/SolutionExamples";
import { SolutionHowItWorks } from "@/components/solutions/SolutionHowItWorks";
import { SolutionOutcomes } from "@/components/solutions/SolutionOutcomes";
import { SolutionsHero } from "@/components/solutions/SolutionsHero";
import { MarketingClosingCta } from "@/components/ui/MarketingClosingCta";
import type { SolutionPillarPage as PillarContent } from "@/lib/content/solutions";

type SolutionPillarPageProps = {
  pillar: PillarContent;
};

export function SolutionPillarPage({ pillar }: SolutionPillarPageProps) {
  return (
    <>
      <SolutionsHero
        eyebrow={pillar.eyebrow}
        title={pillar.title}
        description={pillar.description}
        heroImageSrc={pillar.heroImageSrc}
        heroImageAlt={pillar.heroImageAlt}
        heroObjectPosition={pillar.heroObjectPosition}
        primaryCta={pillar.primaryCta}
        secondaryCta={pillar.secondaryCta}
      />

      <SolutionOutcomes outcomes={pillar.outcomes} />
      <SolutionHowItWorks howItWorks={pillar.howItWorks} pillarSlug={pillar.slug} />
      <SolutionExamples examples={pillar.examples} />
      <MarketingClosingCta content={pillar.finalCta} />
    </>
  );
}
