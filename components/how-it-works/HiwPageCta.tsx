"use client";

import { MarketingClosingCta } from "@/components/ui/MarketingClosingCta";
import { howItWorksContent } from "@/lib/content";

export function HiwPageCta() {
  const { finalCta } = howItWorksContent;

  return <MarketingClosingCta content={finalCta} />;
}
