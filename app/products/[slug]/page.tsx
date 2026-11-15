import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { StampedMascot } from "@/components/mascot/StampedMascot";
import { JsonLd } from "@/components/seo/JsonLd";
import { BadgeStrip } from "@/components/ui/BadgeStrip";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FaqSection } from "@/components/ui/FaqSection";
import { ProductFrame } from "@/components/ui/ProductFrame";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { StatBand } from "@/components/ui/StatBand";
import {
  isProductSlug,
  PRODUCT_SLUGS,
  productsContent,
} from "@/lib/content/products";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { getProductPageSeo, PAGE_SEO } from "@/lib/seo/pages";
import {
  buildFaqSchema,
  buildWebPageSchema,
  orrerySoftwareApplicationSchema,
  queltaSoftwareApplicationSchema,
} from "@/lib/seo/schemas";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isProductSlug(slug)) {
    return {};
  }

  const seo = getProductPageSeo(slug);
  if (!seo) {
    return {};
  }

  return buildPageMetadataFromConfig(seo);
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isProductSlug(slug)) {
    notFound();
  }

  if (slug === "process-quality") {
    return <QueltaPage />;
  }
  if (slug === "ask") {
    return <OrreryPage />;
  }
  return <SchedulingPage />;
}

function QueltaPage() {
  const { quelta, outcomes, trustStripLabel, partners } = productsContent;
  const faqSchema = buildFaqSchema(quelta.faq);
  const breadcrumbSchema = generateBreadcrumbSchema([
    breadcrumbHome(),
    { name: "Products", url: PAGE_SEO.products.path },
    { name: "Quelta", url: PAGE_SEO.productsProcessQuality.path },
  ]);

  return (
    <main>
      <JsonLd
        data={[
          buildWebPageSchema(PAGE_SEO.productsProcessQuality),
          queltaSoftwareApplicationSchema,
          breadcrumbSchema,
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />
      <section className="relative overflow-hidden bg-[var(--brand-inverse-surface)] text-inverse-on-surface">
        <div className="container-page section-y pb-20 pt-28 md:pt-32">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow tone="dark" className="justify-center">
                {quelta.eyebrow}
              </Eyebrow>
              <h1 className="mt-5 font-display text-[length:var(--type-display-l)] font-semibold tracking-[-0.03em] text-balance">
                {quelta.title}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
                {quelta.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button href={quelta.primaryCta.href} variant="on-dark" size="lg">
                  {quelta.primaryCta.label}
                </Button>
                <Button
                  href={quelta.secondaryCta.href}
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/10"
                >
                  {quelta.secondaryCta.label}
                </Button>
              </div>
              <BadgeStrip label={trustStripLabel} partners={partners} tone="dark" className="mt-10" />
            </div>
          </Reveal>

          <Reveal>
            <div className="mx-auto mt-14 max-w-5xl">
              <ProductFrame
                src="/images/product/v4/lot-at-risk.png"
                alt="Quelta lot at risk view"
                title="Quelta · Lot at risk"
                priority
                glow
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Section tone="light">
        <Reveal>
          <StatBand
            stats={outcomes.items.map((item) => ({
              prefix: item.prefix,
              value: item.value,
              label: item.label,
            }))}
            caption={outcomes.caption}
            note={outcomes.note}
          />
        </Reveal>
      </Section>

      <Section tone="muted">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em]">
              {quelta.capabilities.title}
            </h2>
          </div>
        </Reveal>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quelta.capabilities.items.map((item, index) => (
            <li key={item.id}>
              <Reveal delay={index * 0.04}>
                <div className="h-full rounded-[var(--radius-card)] border border-outline-variant bg-surface-lowest p-6">
                  <h3 className="font-display text-lg font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-on-surface-variant">{item.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal>
          <div className="mx-auto mt-12 max-w-4xl">
            <ProductFrame
              src="/images/product/v4/investigation.png"
              alt="Quelta investigation with ranked likely causes"
              title="Quelta · Investigation"
            />
          </div>
        </Reveal>
      </Section>

      <Section tone="light">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em]">
                {quelta.maintenanceSpotlight.title}
              </h2>
              <p className="mt-5 text-base leading-7 text-on-surface-variant">
                {quelta.maintenanceSpotlight.body}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ProductFrame
              src="/images/product/v4/data-health.png"
              alt="Quelta maintenance and machine health flags"
              title="Quelta · Machine health"
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="dark">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em]">
              {quelta.howChangesReachLine.title}
            </h2>
            <ul className="mt-6 space-y-2 text-sm text-white/70">
              {quelta.howChangesReachLine.trustLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </Reveal>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quelta.howChangesReachLine.ladder.map((step, index) => (
            <li key={step.id}>
              <Reveal delay={index * 0.05}>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">{step.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal>
          <div className="mx-auto mt-12 max-w-4xl">
            <ProductFrame
              src="/images/product/v4/proposal.png"
              alt="Quelta proposal awaiting approval"
              title="Quelta · Proposal"
            />
          </div>
        </Reveal>
      </Section>

      <Section tone="light">
        <Reveal>
          <h2 className="font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em]">
            {quelta.whoFor.title}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {quelta.whoFor.columns.map((column) => (
            <Reveal key={column.id}>
              <div>
                <h3 className="font-display text-lg font-semibold">{column.title}</h3>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-on-surface-variant">
                  {column.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            <ProductFrame
              src="/images/product/v4/role-process.png"
              alt="Process engineer view in Quelta"
              title="Quelta · Process"
            />
            <ProductFrame
              src="/images/product/v4/role-quality.png"
              alt="Quality head view in Quelta"
              title="Quelta · Quality"
            />
          </div>
        </Reveal>
      </Section>

      <Section tone="muted">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em]">
              {quelta.howToStart.title}
            </h2>
          </div>
        </Reveal>
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quelta.howToStart.steps.map((step, index) => (
            <li key={step.id}>
              <Reveal delay={index * 0.04}>
                <div className="h-full rounded-[var(--radius-card)] border border-outline-variant bg-surface-lowest p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-primary">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-3 font-display text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{step.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <FaqSection items={quelta.faq} title="Questions about Quelta" className="bg-surface" />

      <Section tone="dark">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <Button href={quelta.primaryCta.href} variant="on-dark" size="lg">
              {quelta.primaryCta.label}
            </Button>
            <p className="mt-6 text-sm text-white/60">
              Looking for Ask?{" "}
              <Link href="/products/ask" className="text-white underline-offset-4 hover:underline">
                Explore Orrery
              </Link>
            </p>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}

function OrreryPage() {
  const { orrery, trustStripLabel, partners } = productsContent;
  const breadcrumbSchema = generateBreadcrumbSchema([
    breadcrumbHome(),
    { name: "Products", url: PAGE_SEO.products.path },
    { name: "Orrery", url: PAGE_SEO.productsAsk.path },
  ]);

  return (
    <main>
      <JsonLd
        data={[
          buildWebPageSchema(PAGE_SEO.productsAsk),
          orrerySoftwareApplicationSchema,
          breadcrumbSchema,
        ]}
      />
      <section className="relative overflow-hidden bg-[var(--brand-inverse-surface)] text-inverse-on-surface">
        <div className="container-page section-y pb-20 pt-28 md:pt-32">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-8 flex justify-center">
                <StampedMascot mode="listening" size={160} arrive label="Orrery" />
              </div>
              <Eyebrow tone="dark" className="justify-center">
                {orrery.eyebrow}
              </Eyebrow>
              <h1 className="mt-5 font-display text-[length:var(--type-display-l)] font-semibold tracking-[-0.03em] text-balance">
                {orrery.title}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
                {orrery.description}
              </p>
              <p className="mx-auto mt-6 max-w-xl border-l-2 border-primary pl-4 text-left font-mono text-sm text-white/85">
                Example: {orrery.exampleQuestion}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button href={orrery.primaryCta.href} variant="on-dark" size="lg">
                  {orrery.primaryCta.label}
                </Button>
                <Button
                  href={orrery.secondaryCta.href}
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/10"
                >
                  {orrery.secondaryCta.label}
                </Button>
              </div>
              <BadgeStrip label={trustStripLabel} partners={partners} tone="dark" className="mt-10" />
            </div>
          </Reveal>

          <Reveal>
            <div className="mx-auto mt-14 max-w-5xl">
              <ProductFrame
                src="/images/product/v4/ask-thread.png"
                alt="Orrery answer thread grounded in plant records"
                title="Orrery · Ask"
                priority
                glow
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Section tone="muted">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em]">
              {orrery.whatYouCanAsk.title}
            </h2>
          </div>
        </Reveal>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {orrery.whatYouCanAsk.items.map((item, index) => (
            <li key={item.id}>
              <Reveal delay={index * 0.04}>
                <div className="h-full rounded-[var(--radius-card)] border border-outline-variant bg-surface-lowest p-6">
                  <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-on-surface-variant">
                    {item.examples.map((example) => (
                      <li key={example} className="flex gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                        <span>&ldquo;{example}&rdquo;</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="light">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em]">
              {orrery.grounded.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-on-surface-variant">
              {orrery.grounded.description}
            </p>
          </div>
        </Reveal>
      </Section>

      <Section tone="muted">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em]">
              {orrery.writesAndWatches.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-on-surface-variant">
              {orrery.writesAndWatches.description}
            </p>
          </div>
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {orrery.writesAndWatches.items.map((item) => (
            <li key={item.id}>
              <Reveal>
                <div className="h-full rounded-[var(--radius-card)] border border-outline-variant bg-surface-lowest p-6">
                  <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-on-surface-variant">{item.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="dark">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em]">
              {orrery.safe.title}
            </h2>
            <ul className="mt-6 space-y-3 text-base leading-7 text-white/70">
              {orrery.safe.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      <Section tone="light">
        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="font-display text-[length:var(--type-h2)] font-semibold tracking-tight">
                {orrery.whereItLives.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-on-surface-variant">
                {orrery.whereItLives.description}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div>
              <h2 className="font-display text-[length:var(--type-h2)] font-semibold tracking-tight">
                {orrery.whoFor.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-on-surface-variant">{orrery.whoFor.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-on-surface-variant">
                {orrery.whoFor.roles.map((role) => (
                  <li key={role} className="flex gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="muted">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <div className="mb-6 flex justify-center">
              <StampedMascot mode="answering" size={64} label="Orrery" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button href={orrery.primaryCta.href} variant="primary" size="lg">
                {orrery.primaryCta.label}
              </Button>
              <Button href={orrery.secondaryCta.href} variant="secondary" size="lg">
                {orrery.secondaryCta.label}
              </Button>
            </div>
            <p className="mt-6 text-sm text-on-surface-variant">
              Looking for Process and Quality?{" "}
              <Link
                href="/products/process-quality"
                className="font-semibold text-[var(--brand-link)] underline-offset-4 hover:underline"
              >
                Explore Quelta
              </Link>
            </p>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}

function SchedulingPage() {
  const { scheduling } = productsContent;
  const breadcrumbSchema = generateBreadcrumbSchema([
    breadcrumbHome(),
    { name: "Products", url: PAGE_SEO.products.path },
    { name: "Scheduling", url: PAGE_SEO.productsScheduling.path },
  ]);

  return (
    <main>
      <JsonLd
        data={[buildWebPageSchema(PAGE_SEO.productsScheduling), breadcrumbSchema]}
      />
      <Section tone="light" className="!pt-28 md:!pt-32">
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-outline-variant bg-surface-lowest px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-on-surface-variant">
              {scheduling.badge}
            </span>
            <h1 className="mt-6 font-display text-[length:var(--type-display-l)] font-semibold tracking-[-0.03em] text-balance">
              {scheduling.title}
            </h1>
            <ul className="mt-10 space-y-4 text-base leading-7 text-on-surface-variant">
              {scheduling.points.map((point) => (
                <li key={point} className="flex gap-3 border-l-2 border-primary pl-4">
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href={scheduling.cta.href} variant="primary" size="lg">
                {scheduling.cta.label}
              </Button>
            </div>
            <p className="mt-8 text-sm text-on-surface-variant">
              See live products:{" "}
              <Link href="/products/process-quality" className="font-semibold text-[var(--brand-link)] hover:underline">
                Quelta
              </Link>
              {" · "}
              <Link href="/products/ask" className="font-semibold text-[var(--brand-link)] hover:underline">
                Orrery
              </Link>
            </p>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
