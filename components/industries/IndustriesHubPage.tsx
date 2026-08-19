import { IndustriesHubComparison } from "@/components/industries/IndustriesHubComparison";
import { IndustriesHubFaq } from "@/components/industries/IndustriesHubFaq";
import { IndustriesHubHero } from "@/components/industries/IndustriesHubHero";
import { IndustriesHubThesis } from "@/components/industries/IndustriesHubThesis";

export function IndustriesHubPage() {
  return (
    <>
      <IndustriesHubHero />
      <IndustriesHubThesis />
      <IndustriesHubComparison />
      <IndustriesHubFaq />
    </>
  );
}
