import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import {
  getProduct,
  isProductSlug,
  PRODUCT_SLUGS,
  productsContent,
} from "@/lib/content/products";

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

  const product = getProduct(slug);
  if (!product) {
    return {};
  }

  if (slug === "process-quality") {
    return {
      title: "Quelta | Process and Quality | Stamped",
      description: productsContent.quelta.description,
      alternates: { canonical: product.href },
    };
  }

  if (slug === "ask") {
    return {
      title: "Orrery | Ask | Stamped",
      description: productsContent.orrery.description,
      alternates: { canonical: product.href },
    };
  }

  return {
    title: "Scheduling | Coming soon | Stamped",
    description: productsContent.scheduling.title,
    alternates: { canonical: product.href },
    robots: { index: false, follow: true },
  };
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
  const { quelta, outcomes } = productsContent;

  return (
    <main>
      <section className="bg-secondary pt-28 pb-16 text-on-secondary md:pt-32 md:pb-20">
        <Container>
          <SectionBadge label={quelta.eyebrow} alternate />
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold tracking-tight text-balance md:text-5xl">
            {quelta.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-on-secondary/80 md:text-lg">
            {quelta.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={quelta.primaryCta.href} variant="primary">
              {quelta.primaryCta.label}
            </Button>
            <Button href={quelta.secondaryCta.href} variant="outline">
              {quelta.secondaryCta.label}
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-b border-outline-variant/30 bg-surface py-12">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2">
            {outcomes.items.map((item) => (
              <div key={item.id}>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-on-surface-variant">
                  {item.prefix}
                </p>
                <p className="mt-2 font-display text-5xl font-bold tracking-tight tabular-nums text-on-surface">
                  {item.value}
                </p>
                <p className="mt-2 text-base text-on-surface-variant">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-on-surface-variant">{outcomes.caption}</p>
          <p className="mt-1 text-xs text-on-surface-variant/80">{outcomes.note}</p>
        </Container>
      </section>

      <section className="bg-surface-low py-16 md:py-20">
        <Container>
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            {quelta.capabilities.title}
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {quelta.capabilities.items.map((item) => (
              <li key={item.id} className="border border-outline-variant/40 bg-surface p-6">
                <h3 className="font-display text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-on-surface-variant">{item.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-surface py-16 md:py-20">
        <Container>
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            {quelta.maintenanceSpotlight.title}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-on-surface-variant">
            {quelta.maintenanceSpotlight.body}
          </p>
        </Container>
      </section>

      <section className="bg-secondary py-16 text-on-secondary md:py-20">
        <Container>
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            {quelta.howChangesReachLine.title}
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {quelta.howChangesReachLine.ladder.map((step, index) => (
              <li key={step.id}>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-inverse-primary">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-on-secondary/75">{step.description}</p>
              </li>
            ))}
          </ol>
          <ul className="mt-10 space-y-2 text-sm text-on-secondary/80">
            {quelta.howChangesReachLine.trustLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-surface py-16 md:py-20">
        <Container>
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            {quelta.whoFor.title}
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {quelta.whoFor.columns.map((column) => (
              <div key={column.id}>
                <h3 className="font-display text-lg font-semibold">{column.title}</h3>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-on-surface-variant">
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface-low py-16 md:py-20">
        <Container>
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            {quelta.howToStart.title}
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {quelta.howToStart.steps.map((step, index) => (
              <li key={step.id} className="border border-outline-variant/40 bg-surface p-6">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
                  Step {index + 1}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-surface py-16 md:py-20">
        <Container>
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">FAQ</h2>
          <dl className="mt-10 max-w-3xl space-y-6">
            {quelta.faq.map((item) => (
              <div key={item.id}>
                <dt className="font-display text-lg font-semibold tracking-tight">{item.question}</dt>
                <dd className="mt-2 text-sm leading-7 text-on-surface-variant">{item.answer}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-12">
            <Button href={quelta.primaryCta.href} variant="primary">
              {quelta.primaryCta.label}
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}

function OrreryPage() {
  const { orrery } = productsContent;

  return (
    <main>
      <section className="bg-surface pt-28 pb-16 md:pt-32 md:pb-20">
        <Container>
          <SectionBadge label={orrery.eyebrow} />
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold tracking-tight text-balance md:text-5xl">
            {orrery.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-on-surface-variant md:text-lg">
            {orrery.description}
          </p>
          <p className="mt-6 max-w-xl border-l border-primary pl-4 font-mono text-sm text-on-surface">
            Example: {orrery.exampleQuestion}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={orrery.primaryCta.href} variant="primary">
              {orrery.primaryCta.label}
            </Button>
            <Button href={orrery.secondaryCta.href} variant="outline">
              {orrery.secondaryCta.label}
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-surface-low py-16 md:py-20">
        <Container>
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            {orrery.whatYouCanAsk.title}
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {orrery.whatYouCanAsk.items.map((item) => (
              <li key={item.id} className="border border-outline-variant/40 bg-surface p-6">
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-on-surface-variant">
                  {item.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-surface py-16 md:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            {orrery.grounded.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-on-surface-variant">{orrery.grounded.description}</p>
        </Container>
      </section>

      <section className="bg-surface-low py-16 md:py-20">
        <Container>
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            {orrery.writesAndWatches.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-on-surface-variant">
            {orrery.writesAndWatches.description}
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {orrery.writesAndWatches.items.map((item) => (
              <li key={item.id} className="border border-outline-variant/40 bg-surface p-6">
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-on-surface-variant">{item.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-secondary py-16 text-on-secondary md:py-20">
        <Container>
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            {orrery.safe.title}
          </h2>
          <ul className="mt-6 max-w-2xl space-y-3 text-base leading-7 text-on-secondary/80">
            {orrery.safe.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-surface py-16 md:py-20">
        <Container className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              {orrery.whereItLives.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-on-surface-variant">
              {orrery.whereItLives.description}
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">{orrery.whoFor.title}</h2>
            <p className="mt-4 text-base leading-7 text-on-surface-variant">{orrery.whoFor.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-on-surface-variant">
              {orrery.whoFor.roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-t border-outline-variant/30 bg-surface-low py-16 md:py-20">
        <Container>
          <div className="flex flex-wrap gap-3">
            <Button href={orrery.primaryCta.href} variant="primary">
              {orrery.primaryCta.label}
            </Button>
            <Button href={orrery.secondaryCta.href} variant="outline">
              {orrery.secondaryCta.label}
            </Button>
          </div>
          <p className="mt-6 text-sm text-on-surface-variant">
            Looking for Process and Quality?{" "}
            <Link href="/products/process-quality" className="font-semibold underline-offset-4 hover:underline">
              Explore Quelta
            </Link>
          </p>
        </Container>
      </section>
    </main>
  );
}

function SchedulingPage() {
  const { scheduling } = productsContent;

  return (
    <main>
      <section className="bg-surface pt-28 pb-20 md:pt-32 md:pb-28">
        <Container className="max-w-3xl">
          <p className="inline-flex rounded-sm border border-outline-variant/60 px-2.5 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em] text-on-surface-variant">
            {scheduling.badge}
          </p>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-balance md:text-5xl">
            {scheduling.title}
          </h1>
          <ul className="mt-10 space-y-4 text-base leading-7 text-on-surface-variant">
            {scheduling.points.map((point) => (
              <li key={point} className="border-l border-primary pl-4">
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button href={scheduling.cta.href} variant="primary">
              {scheduling.cta.label}
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
