import { DynamicIndustryResources } from "@/components/industries/shared/DynamicIndustryResources";
import { Industries } from "@/components/sections/Industries";

/** Combined industries strip + spotlight resources as one homepage proof band. */
export function HomeProofBand() {
  return (
    <div className="border-t border-outline-variant/30">
      <Industries />
      <DynamicIndustryResources />
    </div>
  );
}
