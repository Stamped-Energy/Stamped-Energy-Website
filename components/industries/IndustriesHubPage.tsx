import { IndustriesHubComparison } from "@/components/industries/IndustriesHubComparison";
import { IndustriesHubFaq } from "@/components/industries/IndustriesHubFaq";
import { IndustriesHubHero } from "@/components/industries/IndustriesHubHero";
import { IndustriesHubThesis } from "@/components/industries/IndustriesHubThesis";
import { IndustryPageCta } from "@/components/industries/shared/IndustryPageCta";
import { industriesContent } from "@/lib/content";

export function IndustriesHubPage() {
  return (
    <>
      <IndustriesHubHero />
      <IndustriesHubThesis />
      <IndustriesHubComparison />
      <IndustriesHubFaq />
      <IndustryPageCta content={industriesContent.hub.finalCta} />
    </>
  );
}
