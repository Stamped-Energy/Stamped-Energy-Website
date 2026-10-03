import { IndustriesHubComparison } from "@/components/industries/IndustriesHubComparison";
import { IndustriesHubFaq } from "@/components/industries/IndustriesHubFaq";
import { IndustriesHubHero } from "@/components/industries/IndustriesHubHero";
import { IndustriesHubMatrix } from "@/components/industries/IndustriesHubMatrix";
import { IndustriesHubProcesses } from "@/components/industries/IndustriesHubProcesses";
import { IndustriesHubThesis } from "@/components/industries/IndustriesHubThesis";

export function IndustriesHubPage() {
  return (
    <>
      <IndustriesHubHero />
      <IndustriesHubThesis />
      <IndustriesHubMatrix />
      <IndustriesHubComparison />
      <IndustriesHubProcesses />
      <IndustriesHubFaq />
    </>
  );
}
