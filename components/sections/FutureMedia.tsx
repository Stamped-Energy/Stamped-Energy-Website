"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

function ChartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M4 19V5M4 19h16M8 17V11M12 17V7M16 17v-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LoopIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M17 7l3 3-3 3M7 17l-3-3 3-3M20 10H9a4 4 0 0 0-4 4v0M4 14h11a4 4 0 0 0 4-4v0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FactoryIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M3 21V9l6-3v6l6-3v12M3 21h18M9 9v3M15 9v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CRED_LINKS = [
  {
    href: "/blog",
    title: "Case studies",
    description: "Verified SEC and MD outcomes from pilot plants",
    icon: ChartIcon,
  },
  {
    href: "/how-it-works",
    title: "How it works",
    description: "Connect → Observe → Decide → Execute → Verify",
    icon: LoopIcon,
  },
  {
    href: "/industries",
    title: "Industries",
    description: "Automotive process segments, die casting to rubber moulding",
    icon: FactoryIcon,
  },
] as const;

export function FutureMedia() {
  const sectionRef = useRef<HTMLElement>(null);
  const { futureMedia, credibility } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-cred-link]", {
        autoAlpha: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section ref={sectionRef} className="border-t border-outline-variant/30 section-y">
      <Container>
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div className="flex flex-col">
            <Reveal from="left">
              <SectionHeading
                eyebrow={futureMedia.eyebrow}
                title={futureMedia.title}
                description={futureMedia.description}
              />
            </Reveal>
            <Reveal from="left" className="mt-8">
              <div className="overflow-hidden rounded-xl border border-outline-variant/50 bg-surface-lowest shadow-sm">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={futureMedia.imageSrc}
                    alt={futureMedia.imageAlt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-inverse-primary">
                      {futureMedia.imageCaption}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col">
            <Reveal from="right">
              <SectionHeading
                eyebrow={credibility.eyebrow}
                title={credibility.title}
                description={credibility.founderNote}
              />
            </Reveal>
            <div className="mt-8 space-y-3">
              {CRED_LINKS.map(({ href, title, description, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  data-cred-link
                  className="group flex items-center gap-4 rounded-xl border border-outline-variant/50 bg-surface-lowest p-4 transition-colors hover:border-primary/35 hover:bg-primary/5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                    <Icon />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-on-surface group-hover:text-primary">
                      {title}
                    </p>
                    <p className="mt-0.5 text-xs leading-5 text-on-surface-variant">{description}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-primary opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
