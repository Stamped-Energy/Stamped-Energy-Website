"use client";

import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { cn } from "@/lib/utils";

export type MarketingClosingCtaContent = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

type MarketingClosingCtaProps = {
  content: MarketingClosingCtaContent;
  className?: string;
};

/** Shared dark closing band for inner marketing pages (DESIGN.md). */
export function MarketingClosingCta({ content, className }: MarketingClosingCtaProps) {
  return (
    <section className={cn("bg-secondary section-y text-on-secondary", className)}>
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          {content.eyebrow ? (
            <div className="flex justify-center">
              <SectionBadge label={content.eyebrow} alternate />
            </div>
          ) : null}
          <h2
            className={cn(
              "font-display font-bold tracking-tight text-balance",
              content.eyebrow ? "mt-6 text-3xl md:text-4xl" : "text-3xl md:text-5xl",
            )}
          >
            {content.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-on-secondary/75 md:mt-5">
            {content.description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-9">
            <Button href={content.primaryCta.href} variant="primary" className="uppercase tracking-[0.06em]">
              {content.primaryCta.label}
            </Button>
            {content.secondaryCta ? (
              <Link
                href={content.secondaryCta.href}
                className="inline-flex h-12 items-center justify-center rounded-md border border-on-secondary/30 px-7 text-sm font-semibold text-on-secondary transition-colors hover:border-on-secondary/55 hover:bg-on-secondary/5"
              >
                {content.secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
