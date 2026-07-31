"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getLiveVerticals, industriesContent } from "@/lib/content";
import { getSegmentImageFocus } from "@/lib/industries/imageFocus";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

export function IndustriesHubFeatured() {
  const sectionRef = useRef<HTMLElement>(null);
  const { featured } = industriesContent.hub;
  const verticals = getLiveVerticals();
  const [activeSlug, setActiveSlug] = useState(verticals[0]?.slug ?? "automotive");
  const vertical = verticals.find((v) => v.slug === activeSlug) ?? verticals[0];
  const [showSegments, setShowSegments] = useState(false);
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-hub-featured]", {
        autoAlpha: 0,
        y: 28,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });

      gsap.from("[data-hub-segment]", {
        autoAlpha: 0,
        y: 18,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  if (!vertical) {
    return null;
  }

  return (
    <section ref={sectionRef} className="bg-surface-low section-y" id="verticals">
      <Container>
        <Reveal className="mx-auto">
          <SectionHeading
            eyebrow={featured.eyebrow}
            title={featured.title}
            description={featured.description}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        {verticals.length > 1 ? (
          <div className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-2">
            {verticals.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  item.slug === vertical.slug
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-outline-variant/50 text-on-surface-variant hover:border-primary/30 hover:bg-primary/5",
                )}
                onMouseEnter={() => setActiveSlug(item.slug)}
                onFocus={() => setActiveSlug(item.slug)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        ) : null}

        <div
          data-hub-featured
          className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-lowest shadow-sm md:mt-12"
        >
          <div className="grid lg:grid-cols-[1.1fr_1fr]">
            <div className="relative min-h-[14rem] lg:min-h-[22rem]">
              <Image
                src={vertical.heroImageSrc}
                alt={vertical.heroImageAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="absolute inset-0 bg-secondary/70" />
              <div className="absolute bottom-0 left-0 p-5 sm:p-6 lg:hidden">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-inverse-primary">
                  {vertical.name}
                </p>
                <p className="mt-1 max-w-xs text-sm text-on-secondary/90">{vertical.tagline}</p>
              </div>
            </div>

            <div className="flex flex-col p-5 sm:p-6 md:p-8">
              <div className="hidden lg:block">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  {vertical.name}
                </p>
                <p className="mt-1 text-lg font-bold text-on-surface">{vertical.tagline}</p>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  {vertical.description}
                </p>
              </div>

              {vertical.segments.length > 0 ? (
                <div
                  className={cn(
                    "mt-0 grid gap-3 sm:grid-cols-2 lg:mt-8",
                    !showSegments && "hidden md:grid",
                  )}
                >
                  {vertical.segments.map((segment) => (
                    <Link
                      key={segment.id}
                      data-hub-segment
                      href={segment.href}
                      className="group flex gap-3 rounded-xl border border-outline-variant/40 bg-surface-low/60 p-3 transition-colors hover:border-primary/35 hover:bg-primary/5"
                    >
                      <div className="relative h-14 w-[4.5rem] shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={segment.imageSrc}
                          alt={segment.imageAlt}
                          fill
                          className={getSegmentImageFocus(segment.id)}
                          sizes="72px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-on-surface group-hover:text-primary">
                          {segment.name}
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-on-surface-variant">
                          {segment.focus}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm leading-6 text-on-surface-variant lg:mt-8">
                  {vertical.description}
                </p>
              )}

              {vertical.segments.length > 0 ? (
                <button
                  type="button"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-outline-variant/60 bg-surface-low px-4 py-3 text-sm font-semibold text-on-surface transition-colors hover:border-primary/35 hover:bg-primary/5 md:hidden"
                  aria-expanded={showSegments}
                  onClick={() => setShowSegments((open) => !open)}
                >
                  {showSegments ? featured.showLessLabel : featured.showMoreLabel}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "text-primary transition-transform duration-200",
                      showSegments && "rotate-180",
                    )}
                  >
                    ▾
                  </span>
                </button>
              ) : null}

              <div className="mt-5 lg:mt-auto lg:pt-6">
                <Button href={vertical.href} variant="primary" className="w-full sm:w-auto">
                  Open {vertical.name.toLowerCase()} page
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
