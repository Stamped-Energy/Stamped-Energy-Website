"use client";

import Link from "next/link";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";

export function PrescriptionExample() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const { prescription } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const fields = gsap.utils.toArray<HTMLElement>("[data-rx-field]");
      const header = cardRef.current?.querySelector<HTMLElement>("[data-rx-header]");
      const badge = cardRef.current?.querySelector<HTMLElement>("[data-rx-badge]");

      gsap.set(fields, { autoAlpha: 0.18, x: 16 });
      if (header) {
        gsap.set(header, { autoAlpha: 0, y: -8 });
      }
      if (badge) {
        gsap.set(badge, { scale: 0.9, autoAlpha: 0 });
      }

      const timeline = gsap.timeline();

      if (header) {
        timeline.to(header, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" });
      }
      if (badge) {
        timeline.to(badge, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)" }, "-=0.15");
      }

      fields.forEach((field, index) => {
        timeline.to(
          field,
          { autoAlpha: 1, x: 0, duration: 0.42, ease: "power2.out" },
          index === 0 ? "-=0.05" : "-=0.2",
        );
      });

      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 78%",
        once: true,
        animation: timeline,
      });
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-secondary section-y text-on-secondary"
    >
      <Container className="relative z-10">
        <div className="grid gap-8 md:gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal from="left">
            <SectionHeading
              eyebrow={prescription.eyebrow}
              title={prescription.title}
              dark
            />
            <p className="mt-4 max-w-md text-sm leading-7 text-on-secondary/75">
              {prescription.description}
            </p>
          </Reveal>

          <Reveal from="right">
            <article
              ref={cardRef}
              className="border border-on-secondary/20 bg-on-secondary/5 p-5 sm:p-6 md:p-8"
            >
              <div
                data-rx-header
                className="mb-6 flex flex-col gap-3 border-b border-on-secondary/15 pb-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-inverse-primary">
                    Illustrative prescription
                  </p>
                  <p className="mt-1 text-sm font-bold text-on-secondary">MD co-start stagger</p>
                </div>
                <span
                  data-rx-badge
                  className="w-fit border border-primary/40 bg-primary/15 px-3 py-1.5 text-xs font-semibold text-primary"
                >
                  Priority: High
                </span>
              </div>

              <dl className="space-y-4">
                {prescription.fields.map((field) => (
                  <div
                    key={field.label}
                    data-rx-field
                    className="grid gap-1 sm:grid-cols-[88px_1fr]"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-on-secondary/55">
                      {field.label}
                    </dt>
                    <dd
                      className={
                        field.label === "Impact"
                          ? "font-display text-lg font-bold text-primary"
                          : "text-sm leading-6 text-on-secondary"
                      }
                    >
                      {field.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        </div>

        {prescription.footerText && prescription.footerCta ? (
          <Reveal className="mt-8 text-center">
            <p className="text-sm text-on-secondary/70">
              {prescription.footerText}{" "}
              <Link
                href={prescription.footerCta.href}
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                {prescription.footerCta.label} →
              </Link>
            </p>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
