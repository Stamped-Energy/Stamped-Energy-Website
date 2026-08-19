"use client";

import Image from "next/image";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ui/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { contactContent } from "@/lib/content/contact";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function ContactPageView() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { isReady, prefersReducedMotion } = useMotion();
  const { hero, formSection, quickContact, stats } = contactContent;

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
      <section className="page-hero relative overflow-hidden bg-secondary md:min-h-[58vh] md:flex md:items-end">
        <div className="absolute inset-0">
          <Image
            src={hero.heroImageSrc}
            alt={hero.heroImageAlt}
            fill
            priority
            className="object-cover object-center opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-secondary/70" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-2xl">
            <div data-contact-reveal>
              <SectionBadge label={hero.eyebrow} alternate />
            </div>
            <h1
              data-contact-reveal
              className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-on-secondary sm:text-4xl md:text-[2.65rem]"
            >
              {hero.title}
            </h1>
            <p
              data-contact-reveal
              className="mt-4 max-w-xl text-sm leading-7 text-on-secondary/85 md:text-base"
            >
              {hero.description}
            </p>
            <div
              data-contact-reveal
              className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center"
            >
              <Button href="#contact-form" variant="primary" className="w-full sm:w-auto">
                {contactContent.contactForm.title}
              </Button>
              <a
                href={`mailto:${quickContact.email}`}
                className="text-sm font-semibold text-inverse-primary underline-offset-4 hover:underline"
              >
                {quickContact.email}
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="contact-form"
        className="scroll-mt-20 bg-surface py-10 md:scroll-mt-28 md:section-y"
      >
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:gap-14">
            <div>
              <Reveal>
                <SectionBadge label={formSection.eyebrow} />
                <h2 className="mt-5 font-display text-xl font-extrabold tracking-tight text-on-surface sm:text-2xl md:text-3xl">
                  {formSection.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-on-surface-variant md:text-base">
                  {formSection.description}
                </p>
              </Reveal>

              <Reveal from="left" className="mt-6 sm:mt-8">
                <div className="border border-outline-variant/50 bg-surface-lowest p-4 sm:p-6 md:p-8">
                  <h3 className="text-base font-bold text-on-surface sm:text-lg">
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
                <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em] text-primary">
                  {quickContact.eyebrow}
                </p>
                <ul className="mt-5 divide-y divide-outline-variant/40 border-y border-outline-variant/40">
                  {stats.map((item) => (
                    <li key={item.id} className="py-4">
                      <p className="font-display text-lg font-bold text-on-surface">{item.value}</p>
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
        </Container>
      </section>
    </div>
  );
}
