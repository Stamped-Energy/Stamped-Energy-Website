"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent } from "@/lib/content/about";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function AboutTeam() {
  const sectionRef = useRef<HTMLElement>(null);
  const { team } = aboutContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-about-team]", {
        autoAlpha: 0,
        y: 28,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <section ref={sectionRef} className="border-b border-outline-variant/40 bg-surface py-10 md:section-y">
      <Container>
        <Reveal className="mx-auto max-w-2xl">
          <SectionHeading
            eyebrow={team.eyebrow}
            title={team.title}
            description={team.description}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mx-auto mt-6 grid max-w-4xl gap-4 md:mt-10 md:grid-cols-2 md:gap-8">
          {team.members.map((member) => (
            <article
              key={member.id}
              data-about-team
              className="flex overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-lowest shadow-sm sm:block"
            >
              <div className="relative min-h-[7.5rem] w-28 shrink-0 self-stretch overflow-hidden bg-surface-container sm:min-h-0 sm:w-auto sm:aspect-[4/3]">
                <Image
                  src={member.imageSrc}
                  alt={member.imageAlt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 112px, (max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 hidden bg-secondary/70 sm:block" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-6">
                <div className="flex items-start justify-between gap-2 sm:gap-3">
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-on-surface sm:text-lg">{member.name}</h3>
                    <p className="mt-0.5 text-xs font-semibold text-primary sm:text-sm">{member.role}</p>
                  </div>
                  <Link
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-outline-variant/60 bg-surface-low text-on-surface-variant transition-colors hover:border-primary hover:text-primary sm:h-9 sm:w-9"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </Link>
                </div>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant sm:mt-3 sm:line-clamp-none">
                  {member.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
