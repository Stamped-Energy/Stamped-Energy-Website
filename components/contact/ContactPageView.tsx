"use client";

import Image from "next/image";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ui/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { contactContent } from "@/lib/content/contact";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function ContactPageView() {
  const formRef = useRef<HTMLElement>(null);
  const { isReady, prefersReducedMotion } = useMotion();
  const { hero, formSection, quickContact } = contactContent;

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
    { scope: formRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <>
      <section className="page-hero relative overflow-hidden border-b border-outline-variant/40 bg-secondary">
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
          <div data-contact-reveal>
            <SectionBadge label={hero.eyebrow} alternate />
          </div>
          <h1
            data-contact-reveal
            className="mt-5 max-w-3xl font-display text-2xl font-extrabold leading-tight tracking-tight text-on-secondary sm:text-3xl md:text-4xl lg:text-[2.75rem]"
          >
            {hero.title}
          </h1>
          <p
            data-contact-reveal
            className="mt-4 max-w-2xl text-sm leading-7 text-on-secondary/85 md:text-base"
          >
            {hero.description}
          </p>
          <a
            data-contact-reveal
            href={`mailto:${quickContact.email}`}
            className="mt-6 inline-block text-sm font-semibold text-inverse-primary underline-offset-4 hover:underline"
          >
            {quickContact.email}
          </a>
        </Container>
      </section>

      <section
        ref={formRef}
        id="contact-form"
        className="scroll-mt-20 bg-surface py-10 md:scroll-mt-28 md:section-y"
      >
        <Container>
          <div className="mx-auto max-w-2xl">
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
        </Container>
      </section>
    </>
  );
}
