"use client";

import Image from "next/image";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { BeforeYouBook } from "@/components/engagement/BeforeYouBook";
import { EngagementSteps } from "@/components/engagement/EngagementSteps";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/ui/ContactForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { contactContent } from "@/lib/content/contact";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function ContactPageView() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { isReady, prefersReducedMotion } = useMotion();
  const { hero, formSection, quickContact, stats, steps } = contactContent;

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-contact-reveal]", {
        autoAlpha: 0,
        y: 22,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      });
    },
    { scope: pageRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <div ref={pageRef}>
      <section className="relative overflow-hidden bg-[var(--brand-inverse-surface)] text-inverse-on-surface md:min-h-[58vh] md:flex md:items-end">
        <div className="absolute inset-0">
          <Image
            src={hero.heroImageSrc}
            alt={hero.heroImageAlt}
            fill
            priority
            className="object-cover object-center opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[var(--brand-inverse-surface)]/70" />
        </div>

        <div className="container-page relative z-10 section-y !pt-28 md:!pt-32">
          <div className="max-w-2xl">
            <div data-contact-reveal>
              <Eyebrow tone="dark">{hero.eyebrow}</Eyebrow>
            </div>
            <h1
              data-contact-reveal
              className="mt-5 font-display text-[length:var(--type-display-l)] font-semibold leading-[1.08] tracking-[-0.03em] text-balance"
            >
              {hero.title}
            </h1>
            <p
              data-contact-reveal
              className="mt-4 max-w-xl text-base leading-7 text-white/70 md:text-lg md:leading-8"
            >
              {hero.description}
            </p>
            <div
              data-contact-reveal
              className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center"
            >
              <Button href="#contact-form" variant="on-dark" size="lg" className="w-full sm:w-auto">
                {contactContent.contactForm.title}
              </Button>
              {quickContact.whatsappUrl ? (
                <Button
                  href={quickContact.whatsappUrl}
                  variant="ghost"
                  size="lg"
                  className="w-full text-white hover:bg-white/10 sm:w-auto"
                  external
                >
                  {quickContact.whatsappLabel}
                </Button>
              ) : null}
              <a
                href={`mailto:${quickContact.email}`}
                className="text-sm font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline"
              >
                {quickContact.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Section tone="light">
        <Reveal>
          <Eyebrow>{steps.eyebrow}</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em] text-balance">
            {steps.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-on-surface-variant">
            {steps.description}
          </p>
        </Reveal>
        <EngagementSteps className="mt-8 md:mt-10" />
      </Section>

      <Section id="contact-form" tone="muted" className="scroll-mt-20 md:scroll-mt-28">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:gap-14">
          <div>
            <Reveal>
              <Eyebrow>{formSection.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em]">
                {formSection.title}
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-on-surface-variant">
                {formSection.description}
              </p>
            </Reveal>

            <Reveal from="left" className="mt-6 sm:mt-8">
              <div className="rounded-[var(--radius-card)] border border-outline-variant bg-surface-lowest p-4 sm:p-6 md:p-8">
                <h3 className="text-base font-semibold text-on-surface sm:text-lg">
                  {contactContent.contactForm.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  {contactContent.contactForm.description}
                </p>
                <div className="mt-5 sm:mt-6">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28">
            <Reveal>
              <Eyebrow>{quickContact.eyebrow}</Eyebrow>
              <ul className="mt-5 divide-y divide-outline-variant/40 border-y border-outline-variant/40">
                {stats.map((item) => (
                  <li key={item.id} className="py-4">
                    <p className="font-display text-lg font-semibold text-on-surface">{item.value}</p>
                    <p className="mt-1 text-sm text-on-surface-variant">{item.label}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-6 text-on-surface-variant">
                {contactContent.onSite.description}
              </p>
            </Reveal>
          </aside>
        </div>
      </Section>
      <BeforeYouBook showCta={false} />
    </div>
  );
}
