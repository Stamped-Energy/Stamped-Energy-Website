import Link from "next/link";

import { BadgeStrip } from "@/components/ui/BadgeStrip";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProductFrame } from "@/components/ui/ProductFrame";
import { productsContent } from "@/lib/content/products";

function DecisionCardFloat() {
  return (
    <div className="rounded-[var(--radius-card)] border border-outline-variant bg-surface-lowest p-4 shadow-[0_16px_32px_-16px_rgba(13,12,11,0.4)]">
      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-primary">Needs a decision</p>
      <p className="mt-2 text-sm font-semibold text-on-surface">Trial billet exit 1215 → 1205 °C</p>
      <p className="mt-1 text-xs text-on-surface-variant">Heater H1 · Forge line · Inside signed limits</p>
      <div className="mt-3 flex gap-2">
        <span className="rounded-md bg-secondary px-2.5 py-1 text-[11px] font-semibold text-on-secondary">
          Accept
        </span>
        <span className="rounded-md border border-outline-variant px-2.5 py-1 text-[11px] font-semibold text-on-surface">
          Adjust
        </span>
        <span className="rounded-md border border-outline-variant px-2.5 py-1 text-[11px] font-semibold text-on-surface">
          Stop
        </span>
      </div>
    </div>
  );
}

export function HeroV4() {
  const { homeHero, trustStripLabel, partners, primaryCta } = productsContent;

  return (
    <section className="relative overflow-hidden bg-[var(--brand-inverse-surface)] text-inverse-on-surface">
      <div className="container-page section-y pb-24 pt-28 md:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <div data-hero-animate>
            <Eyebrow tone="dark" className="justify-center">
              {homeHero.eyebrow}
            </Eyebrow>
          </div>
          <h1
            className="mt-5 font-display text-[length:var(--type-display-xl)] font-semibold leading-[1.02] tracking-[-0.035em]"
            data-hero-animate
          >
            {homeHero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70" data-hero-animate>
            {homeHero.subhead}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3" data-hero-animate>
            <Button href={primaryCta.href} variant="on-dark" size="lg">
              {primaryCta.label}
            </Button>
            <Button
              href={homeHero.secondaryCta.href}
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/10"
            >
              {homeHero.secondaryCta.label}
            </Button>
          </div>
          <div data-hero-animate>
            <BadgeStrip label={trustStripLabel} partners={partners} tone="dark" className="mt-10" />
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-5xl" data-hero-animate>
          <ProductFrame
            src="/images/product/v4/hero-owner.png"
            alt="Stamped owner view showing verified value on the demonstration plant"
            title="Demonstration plant · Value"
            priority
            glow
            float={<DecisionCardFloat />}
          />
        </div>

        <p className="mt-16 text-center text-sm text-white/40">
          Or{" "}
          <Link href="/products" className="text-white/70 underline-offset-4 hover:text-white hover:underline">
            explore the products
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
