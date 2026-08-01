"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

type IndustryItem = (typeof landingContent.industries.items)[number];

function IndustryCard({ industry }: { industry: IndustryItem }) {
  const href = `/industries/${industry.id}`;
  const image = industry.imageSrc
    ? { src: industry.imageSrc, alt: industry.imageAlt ?? industry.name }
    : null;

  return (
    <Link
      href={href}
      data-industry-card
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-outline-variant/50 bg-surface-lowest outline-none transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {image ? (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-secondary/70" />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-on-surface">{industry.name}</h3>
          <p className="mt-1 text-sm font-medium text-primary/90">{industry.focus}</p>
          <p className="mt-3 text-sm leading-6 text-on-surface-variant">{industry.description}</p>
          {"sustainability" in industry && industry.sustainability ? (
            <p className="mt-3 border-t border-outline-variant/40 pt-3 text-xs leading-6 text-on-surface-variant/90">
              <span className="font-semibold text-on-surface">Sustainability: </span>
              {industry.sustainability}
            </p>
          ) : null}
        </div>

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Explore vertical
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

export function Industries() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { industries } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>("[data-industry-card]");

      gsap.set(cards, { autoAlpha: 0, y: 28 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 82%",
          once: true,
        },
      });

      cards.forEach((card, index) => {
        timeline.to(
          card,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
          },
          index * 0.09,
        );
      });
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden section-y">
      <Container className="relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow={industries.eyebrow}
            title={industries.title}
            description={industries.description}
          />
        </Reveal>

        <div ref={gridRef} className="mt-8 grid gap-5 md:mt-12 md:grid-cols-2 xl:grid-cols-3">
          {industries.items.map((industry) => (
            <IndustryCard key={industry.id} industry={industry} />
          ))}
        </div>

        <Reveal className="mt-8 md:mt-10">
          <Button href={industries.cta.href} variant="outline" className="w-full sm:w-auto">
            {industries.cta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
