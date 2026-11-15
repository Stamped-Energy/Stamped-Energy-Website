import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { allProducts, productsContent } from "@/lib/content/products";

export const metadata: Metadata = {
  title: "Products | Quelta and Orrery | Stamped",
  description:
    "Quelta improves how every line runs. Orrery answers questions about it. Each is sold on its own.",
  alternates: { canonical: "/products" },
};

export default function ProductsHubPage() {
  const { hub } = productsContent;
  const products = allProducts();

  return (
    <main>
      <section className="bg-surface pt-28 pb-16 md:pt-32 md:pb-20">
        <Container>
          <SectionBadge label={hub.eyebrow} />
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold tracking-tight text-on-surface text-balance md:text-5xl">
            {hub.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-on-surface-variant md:text-lg">
            {hub.description}
          </p>
        </Container>
      </section>

      <section className="border-t border-outline-variant/30 bg-surface-low py-16 md:py-20">
        <Container>
          <ul className="grid gap-8 md:grid-cols-2">
            {products
              .filter((product) => product.status === "live")
              .map((product) => (
                <li
                  key={product.slug}
                  className="flex flex-col border border-outline-variant/40 bg-surface p-8"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
                    {product.name} · {product.descriptor}
                  </p>
                  <p className="mt-4 text-base leading-7 text-on-surface-variant">{product.summary}</p>
                  <Link
                    href={product.href}
                    className="mt-8 inline-flex text-sm font-semibold text-on-surface underline-offset-4 hover:underline"
                  >
                    Explore {product.name} →
                  </Link>
                </li>
              ))}
          </ul>

          {products
            .filter((product) => product.status === "coming-soon")
            .map((product) => (
              <div
                key={product.slug}
                className="mt-8 flex flex-col gap-3 border border-outline-variant/40 bg-surface px-8 py-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-on-surface-variant">
                    {product.name} · {product.comingSoonLabel}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{product.summary}</p>
                </div>
                <Link
                  href={product.href}
                  className="text-sm font-semibold text-on-surface underline-offset-4 hover:underline"
                >
                  Learn more →
                </Link>
              </div>
            ))}
        </Container>
      </section>

      <section className="bg-secondary py-16 text-on-secondary md:py-20">
        <Container>
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            {hub.betterTogether.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-on-secondary/80">
            {hub.betterTogether.description}
          </p>
          <div className="mt-8">
            <Button href={hub.cta.href} variant="primary">
              {hub.cta.label}
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
