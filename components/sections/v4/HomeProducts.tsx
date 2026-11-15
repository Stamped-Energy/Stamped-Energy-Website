import Image from "next/image";
import Link from "next/link";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { productsContent } from "@/lib/content/products";

export function HomeProducts() {
  const { homepageProducts } = productsContent;

  return (
    <Section tone="muted" id="products">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">{homepageProducts.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em]">
            {homepageProducts.title}
          </h2>
          <p className="mt-4 text-on-surface-variant">{homepageProducts.description}</p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-outline-variant bg-surface-lowest">
            <div className="relative aspect-[16/10] border-b border-outline-variant bg-surface-low">
              <Image
                src="/images/product/v4/lot-at-risk.png"
                alt="Quelta lot at risk view"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-on-surface-variant">
                {homepageProducts.quelta.name} · {homepageProducts.quelta.descriptor}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">
                {homepageProducts.quelta.description}
              </h3>
              <ul className="mt-5 space-y-2 text-sm text-on-surface-variant">
                {homepageProducts.quelta.checks.map((check) => (
                  <li key={check} className="flex gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={homepageProducts.quelta.cta.href}
                className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-link)] hover:underline"
              >
                {homepageProducts.quelta.cta.label} →
              </Link>
            </div>
          </article>
        </Reveal>

        <Reveal className="lg:col-span-5">
          <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-outline-variant bg-surface-lowest">
            <div className="relative flex aspect-[16/10] items-center justify-center border-b border-outline-variant bg-[var(--brand-inverse-surface)]">
              <div
                className="flex size-24 items-center justify-center rounded-[28%] bg-primary text-white shadow-lg"
                aria-hidden
              >
                <span className="text-4xl leading-none">◈</span>
              </div>
              <p className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left text-xs text-white/80">
                &ldquo;Why are cold billets rising after stops?&rdquo;
              </p>
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-on-surface-variant">
                {homepageProducts.orrery.name} · {homepageProducts.orrery.descriptor}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">
                {homepageProducts.orrery.description}
              </h3>
              <Link
                href={homepageProducts.orrery.cta.href}
                className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-link)] hover:underline"
              >
                {homepageProducts.orrery.cta.label} →
              </Link>
            </div>
          </article>
        </Reveal>
      </div>

      <Reveal>
        <Link
          href={homepageProducts.scheduling.href}
          className="mt-6 flex items-center justify-between gap-4 rounded-[var(--radius-card)] border border-dashed border-outline-variant bg-surface-lowest px-6 py-5 transition-colors hover:border-outline"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-on-surface-variant">
              {homepageProducts.scheduling.name} · {homepageProducts.scheduling.badge}
            </p>
            <p className="mt-1 text-sm text-on-surface">{homepageProducts.scheduling.description}</p>
          </div>
          <span className="shrink-0 rounded-full bg-surface-container px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">
            Soon
          </span>
        </Link>
      </Reveal>
    </Section>
  );
}
