"use client";

import Link from "next/link";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { ContentImage } from "@/components/ui/ContentImage";
import { DatabaseFetchNotice } from "@/components/ui/DatabaseFetchNotice";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { resourcesContent } from "@/lib/content";
import type { ResourceCard } from "@/lib/content/types";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

type ResourcesContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: ResourceCard[];
};

type IndustryResourcesProps = {
  content?: ResourcesContent;
  databaseError?: boolean;
};

export function IndustryResources({ content, databaseError = false }: IndustryResourcesProps) {
  const resources = content ?? resourcesContent;
  const sectionRef = useRef<HTMLElement>(null);
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-resource-card]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.55,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <section ref={sectionRef} className="border-t border-outline-variant/40 bg-surface-low section-y">
      <Container>
        <Reveal className="mx-auto">
          <SectionHeading
            eyebrow={resources.eyebrow}
            title={resources.title}
            description={resources.description}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        {databaseError ? (
          <DatabaseFetchNotice className="mx-auto mt-6 max-w-md" />
        ) : null}

        <div className="mx-auto mt-8 grid md:mt-12 max-w-6xl gap-5 md:grid-cols-3">
          {resources.items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              data-resource-card
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-lowest shadow-sm transition-shadow hover:shadow-md"
              {...(item.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <ContentImage
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {item.tag ? (
                  <span className="absolute left-3 top-3 rounded-full bg-secondary/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-on-secondary">
                    {item.tag}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                  Insight
                </p>
                <h3 className="mt-1 text-base font-bold text-on-surface group-hover:text-primary md:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-on-surface-variant">
                  {item.description}
                </p>
                <span className="mt-4 text-sm font-semibold text-primary">
                  {item.readMoreLabel ?? "Read more →"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
