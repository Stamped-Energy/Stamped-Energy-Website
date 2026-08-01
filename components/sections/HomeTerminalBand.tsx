import { HomeFaq } from "@/components/sections/HomeFaq";
import { LandingClosingCta } from "@/components/sections/LandingClosingCta";

/** FAQ + closing CTA as one terminal homepage band. */
export function HomeTerminalBand() {
  return (
    <div>
      <HomeFaq />
      <LandingClosingCta />
    </div>
  );
}
