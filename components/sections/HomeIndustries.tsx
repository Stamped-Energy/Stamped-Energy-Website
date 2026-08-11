import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { landingContent } from "@/lib/content";

export function HomeIndustries() {
  const { industries } = landingContent;

  return (
    <section className="section-y bg-surface-low">
      <Container>
        <Reveal>
          <SectionBadge label={industries.badge} />
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
            {industries.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-on-surface/75">
            {industries.description}
          </p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:mt-12 md:grid-cols-5 md:gap-3">
          {industries.items.map((item, index) => (
            <li key={item.id}>
              <Reveal delay={index * 0.04}>
                <Link
                  href={`/industries/${item.id}`}
                  className="group block outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-low"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-on-surface/8">
                    {item.imageSrc ? (
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt ?? item.name}
                        fill
                        sizes="(max-width: 768px) 45vw, 18vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                    ) : null}
                  </div>
                  <p className="mt-2.5 font-display text-sm font-semibold tracking-tight text-on-surface transition-colors group-hover:text-primary md:text-[0.95rem]">
                    {item.name}
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link
            href={industries.cta.href}
            className="inline-flex text-sm font-semibold text-primary transition-opacity hover:opacity-80"
          >
            {industries.cta.label} »
          </Link>
        </div>
      </Container>
    </section>
  );
}
