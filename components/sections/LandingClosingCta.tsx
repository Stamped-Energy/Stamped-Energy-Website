import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { landingContent, siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";

export function LandingClosingCta() {
  const { closingCta } = landingContent;

  return (
    <section className="bg-secondary py-16 text-on-secondary md:py-20">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
              {closingCta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-on-secondary/75">
              {closingCta.description}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={closingCta.primaryCta.href}
                className={cn(
                  "inline-flex h-12 items-center justify-center gap-2 rounded-md border border-primary bg-primary px-7 text-sm font-semibold uppercase tracking-[0.06em] text-on-primary",
                  "transition-[transform,opacity] duration-200 hover:-translate-y-0.5 hover:opacity-95",
                )}
              >
                {closingCta.primaryCta.label}
                <span aria-hidden>»</span>
              </Link>
              {siteConfig.whatsappUrl ? (
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-on-secondary/30 px-7 text-sm font-semibold text-on-secondary transition-colors hover:border-on-secondary/55 hover:bg-on-secondary/5"
                >
                  {closingCta.whatsappLabel}
                </a>
              ) : (
                <Link
                  href={closingCta.secondaryCta.href}
                  className="inline-flex h-12 items-center justify-center rounded-md border border-on-secondary/30 px-7 text-sm font-semibold text-on-secondary transition-colors hover:border-on-secondary/55 hover:bg-on-secondary/5"
                >
                  {closingCta.secondaryCta.label}
                </Link>
              )}
            </div>
            <p className="mt-6 text-sm text-on-secondary/60">{closingCta.smallLine}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
