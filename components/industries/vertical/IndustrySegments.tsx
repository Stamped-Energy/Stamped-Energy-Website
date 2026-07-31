"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getVerticalPage, getVerticalSegments, type VerticalSlug } from "@/lib/content";
import { getSegmentImageFocus } from "@/lib/industries/imageFocus";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

type IndustrySegmentsProps = {
  slug: VerticalSlug;
};

export function IndustrySegments({ slug }: IndustrySegmentsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const page = getVerticalPage(slug);
  const segments = getVerticalSegments(slug);
  const segmentsCopy = page?.segments;
  const [openId, setOpenId] = useState<string | null>(segments[0]?.id ?? null);
  const { isReady, prefersReducedMotion } = useMotion();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash || !segments.some((segment) => segment.id === hash)) {
      return;
    }

    setOpenId(hash);
    window.requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [segments]);

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-segment-card]", {
        autoAlpha: 0,
        y: 28,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  if (!segmentsCopy || segments.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="bg-surface section-y" id="process-segments">
      <Container>
        <Reveal className="mx-auto">
          <SectionHeading
            eyebrow={segmentsCopy.eyebrow}
            title={segmentsCopy.title}
            description={segmentsCopy.description}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-5 md:mt-14 md:gap-6">
          {segments.map((segment) => {
            const isOpen = openId === segment.id;
            return (
              <article
                key={segment.id}
                id={segment.id}
                data-segment-card
                className="scroll-mt-24 overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-lowest shadow-sm transition-shadow duration-300 hover:shadow-md md:scroll-mt-28"
              >
                <button
                  type="button"
                  className="flex w-full items-center gap-4 text-left sm:gap-5"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : segment.id)}
                >
                  <div className="relative hidden h-[5.5rem] w-44 shrink-0 overflow-hidden sm:block md:h-28 md:w-52">
                    <Image
                      src={segment.imageSrc}
                      alt={segment.imageAlt}
                      fill
                      className={getSegmentImageFocus(segment.id)}
                      sizes="208px"
                    />
                  </div>

                  <div className="min-w-0 flex-1 px-5 py-5 md:px-6 md:py-6">
                    <h3 className="text-xl font-bold text-on-surface md:text-2xl">{segment.name}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-on-surface-variant md:text-[15px]">
                      {segment.focus}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center pr-5 md:pr-6">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full border text-lg font-light leading-none transition-colors duration-200",
                        isOpen
                          ? "border-primary/35 bg-primary/8 text-primary"
                          : "border-outline-variant/60 bg-surface-low text-on-surface-variant",
                      )}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>
                </button>

                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-6 border-t border-outline-variant/35 px-5 pb-6 pt-6 md:px-8 md:pb-8 md:pt-7">
                      <div className="relative h-44 overflow-hidden rounded-xl sm:hidden">
                        <Image
                          src={segment.imageSrc}
                          alt={segment.imageAlt}
                          fill
                          className={getSegmentImageFocus(segment.id)}
                          sizes="100vw"
                        />
                      </div>

                      <p className="max-w-3xl text-sm leading-7 text-on-surface-variant md:text-[15px]">
                        {segment.description}
                      </p>

                      {segment.relatedArticle ? (
                        <p className="text-sm leading-7">
                          <Link
                            href={segment.relatedArticle.href}
                            className="font-semibold text-primary hover:underline"
                          >
                            {segment.relatedArticle.label}
                          </Link>
                        </p>
                      ) : null}

                      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                        <div className="rounded-xl bg-surface-low/70 p-5 md:p-6">
                          <p className="text-sm font-semibold text-on-surface">Typical challenges</p>
                          <ul className="mt-4 space-y-3">
                            {segment.challenges.map((item) => (
                              <li
                                key={item}
                                className="flex gap-3 text-sm leading-6 text-on-surface-variant"
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-outline-variant" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-xl border border-primary/15 bg-primary/5 p-5 md:p-6">
                          <p className="text-sm font-semibold text-on-surface">How Stamped helps</p>
                          <ul className="mt-4 space-y-3">
                            {segment.stampProvides.map((item) => (
                              <li key={item} className="flex gap-3 text-sm leading-6 text-on-surface">
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
                                  ✓
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="grid gap-3 border-t border-outline-variant/30 pt-5 sm:grid-cols-2">
                        {segment.metrics.map((metric) => (
                          <div
                            key={metric.id}
                            className="flex flex-col items-center justify-center rounded-lg border border-primary/20 bg-primary/10 px-4 py-3.5 text-center"
                          >
                            <p className="font-display text-lg font-extrabold tracking-tight text-primary">
                              {metric.value}
                            </p>
                            <p className="mt-1 max-w-[13rem] text-[11px] leading-4 text-on-surface-variant">
                              {metric.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
