import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { StampedMascot } from "@/components/mascot/StampedMascot";
import { JsonLd } from "@/components/seo/JsonLd";
import { BadgeStrip } from "@/components/ui/BadgeStrip";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { allProducts, getProduct, productsContent } from "@/lib/content/products";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";
import {
  buildWebPageSchema,
  orrerySoftwareApplicationSchema,
  queltaSoftwareApplicationSchema,
} from "@/lib/seo/schemas";

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.products);

const productsBreadcrumbSchema = generateBreadcrumbSchema([
  breadcrumbHome(),
  { name: "Products", url: PAGE_SEO.products.path },
]);

export default function ProductsHubPage() {
  const { hub, trustStripLabel, partners } = productsContent;
  const comingSoon = allProducts().filter((product) => product.status === "coming-soon");
  const quelta = getProduct("process-quality")!;
  const orrery = getProduct("ask")!;

  return (
    <main>
      <JsonLd
        data={[
          buildWebPageSchema(PAGE_SEO.products),
          queltaSoftwareApplicationSchema,
          orrerySoftwareApplicationSchema,
          productsBreadcrumbSchema,
        ]}
      />
      <Section tone="light" className="!pt-28 md:!pt-32">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">{hub.eyebrow}</Eyebrow>
            <h1 className="mt-5 font-display text-[length:var(--type-display-l)] font-semibold tracking-[-0.03em] text-balance">
              {hub.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
              {hub.description}
            </p>
          </div>
        </Reveal>
      </Section>

      <Section tone="muted">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-outline-variant bg-surface-lowest">
              <div className="relative aspect-[16/10] border-b border-outline-variant bg-surface-low">
                <Image
                  src="/images/product/v4/lot-at-risk.png"
                  alt="Quelta flagging a lot at risk while it can still be saved"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-on-surface-variant">
                  {quelta.name} · {quelta.descriptor}
                </p>
                <p className="mt-3 text-lg font-semibold tracking-tight text-on-surface">{quelta.summary}</p>
                <Link
                  href={quelta.href}
                  className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-link)] hover:underline"
                >
                  Explore {quelta.name} →
                </Link>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-outline-variant bg-surface-lowest">
              <div className="relative flex aspect-[16/10] items-center justify-center border-b border-outline-variant bg-[var(--brand-inverse-surface)]">
                <StampedMascot mode="listening" size={96} arrive label="Orrery" />
                <p className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left text-xs text-white/80">
                  &ldquo;{productsContent.orrery.exampleQuestion}&rdquo;
                </p>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-on-surface-variant">
                  {orrery.name} · {orrery.descriptor}
                </p>
                <p className="mt-3 text-lg font-semibold tracking-tight text-on-surface">{orrery.summary}</p>
                <Link
                  href={orrery.href}
                  className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-link)] hover:underline"
                >
                  Explore {orrery.name} →
                </Link>
              </div>
            </article>
          </Reveal>
        </div>

        {comingSoon.map((product) => (
          <Reveal key={product.slug}>
            <Link
              href={product.href}
              className="mt-6 flex items-center justify-between gap-4 rounded-[var(--radius-card)] border border-dashed border-outline-variant bg-surface-lowest px-6 py-5 transition-colors hover:border-outline"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-on-surface-variant">
                  {product.name} · {product.comingSoonLabel}
                </p>
                <p className="mt-1 text-sm text-on-surface">{product.summary}</p>
              </div>
              <span className="shrink-0 rounded-full bg-surface-container px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">
                Soon
              </span>
            </Link>
          </Reveal>
        ))}
      </Section>

      <Section tone="light">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em]">
              {hub.comparison.title}
            </h2>
          </div>
        </Reveal>
        <Reveal>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-outline-variant">
                  <th className="py-3 pr-4 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-on-surface-variant">
                    Product
                  </th>
                  {hub.comparison.columns.map((column) => (
                    <th
                      key={column.id}
                      className="px-3 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-on-surface-variant"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hub.comparison.rows.map((row) => {
                  const product = getProduct(row.productSlug)!;
                  return (
                    <tr key={row.productSlug} className="border-b border-outline-variant/60 align-top">
                      <td className="py-5 pr-4">
                        <Link href={product.href} className="font-semibold text-on-surface hover:underline">
                          {product.name}
                        </Link>
                        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-on-surface-variant">
                          {product.descriptor}
                        </p>
                      </td>
                      <td className="px-3 py-5 text-on-surface-variant">{row.cells.what}</td>
                      <td className="px-3 py-5 text-on-surface-variant">{row.cells.who}</td>
                      <td className="px-3 py-5 text-on-surface-variant">{row.cells.reach}</td>
                      <td className="px-3 py-5 text-on-surface-variant">{row.cells.sold}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Section>

      <Section tone="dark">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em]">
              {hub.betterTogether.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/70">{hub.betterTogether.description}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href={hub.cta.href} variant="on-dark" size="lg">
                {hub.cta.label}
              </Button>
            </div>
            <BadgeStrip label={trustStripLabel} partners={partners} tone="dark" className="mt-10" />
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
