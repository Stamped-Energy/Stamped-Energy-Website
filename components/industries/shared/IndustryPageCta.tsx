"use client";

import { MarketingClosingCta } from "@/components/ui/MarketingClosingCta";
import { getVerticalPage, industriesContent } from "@/lib/content";

type IndustryPageCtaProps = {
  content?: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
  };
};

export function IndustryPageCta({ content }: IndustryPageCtaProps) {
  const cta = content ?? getVerticalPage("automotive")?.finalCta ?? industriesContent.hub.finalCta;

  return <MarketingClosingCta content={cta} />;
}
