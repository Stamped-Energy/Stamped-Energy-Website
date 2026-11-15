import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { productsContent } from "@/lib/content/products";

const INDUSTRIES = [
  {
    id: "automotive",
    name: "Auto components",
    href: "/industries/automotive",
    focus: "Forging, heat treatment and machining for OEMs.",
    imageSrc: "/industries/forging.jpg",
    imageAlt: "Forging press line on an auto-component plant floor",
    featured: true,
  },
  {
    id: "steel",
    name: "Steel",
    href: "/industries/steel",
    focus: "Power per tonne, heat chemistry, yield and cobbles.",
    imageSrc: "/industries/steel.png",
    imageAlt: "Hot steel billets on a rolling mill line",
    featured: false,
  },
  {
    id: "cement",
    name: "Cement",
    href: "/industries/cement",
    focus: "Kiln stability, free lime, and heat and power per tonne.",
    imageSrc: "/industries/cement.png",
    imageAlt: "Cement plant with silos and kiln at twilight",
    featured: false,
  },
  {
    id: "pharma",
    name: "Pharma",
    href: "/industries/pharma",
    focus: "Batch integrity and process drift in regulated lines.",
    imageSrc: "/industries/plant/pharma/cleanroom.jpg",
    imageAlt: "Pharma cleanroom manufacturing line",
    featured: false,
  },
  {
    id: "chemical",
    name: "Chemicals",
    href: "/industries/chemical",
    focus: "Continuous and batch process stability.",
    imageSrc: "/industries/chemical.png",
    imageAlt: "Chemical plant process units",
    featured: false,
  },
] as const;

export function HomeIndustriesV4() {
  const { industriesHome } = productsContent;

  return (
    <Section tone="light" id="industries">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="max-w-2xl font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em] text-balance">
          {industriesHome.title}
        </h2>
        <Link
          href={industriesHome.cta.href}
          className="shrink-0 text-sm font-semibold text-[var(--brand-link)] hover:underline"
        >
          {industriesHome.cta.label} →
        </Link>
      </div>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRIES.map((item) => (
          <li key={item.id} className={item.featured ? "sm:col-span-2 lg:col-span-1" : undefined}>
            <Link
              href={item.href}
              className="group block overflow-hidden rounded-[var(--radius-card)] border border-outline-variant bg-surface-lowest outline-none transition-colors hover:border-outline focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <div className="relative aspect-[16/10] bg-surface-low">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {item.featured ? (
                  <span className="absolute left-3 top-3 rounded-full bg-secondary px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-on-secondary">
                    Featured
                  </span>
                ) : null}
              </div>
              <div className="p-5">
                <p className="font-semibold tracking-tight text-on-surface group-hover:text-[var(--brand-link)]">
                  {item.name}
                </p>
                <p className="mt-1 text-sm text-on-surface-variant">{item.focus}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
