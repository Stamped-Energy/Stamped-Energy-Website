"use client";

import { ContentImage } from "@/components/ui/ContentImage";
import Link from "next/link";
import { useRef } from "react";

import { ArticleAuthorCard } from "@/components/blog/ArticleAuthorCard";
import { RichArticleBody } from "@/components/rich-content/RichArticleBody";
import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IndustryPageCta } from "@/components/industries/shared/IndustryPageCta";
import { caseStudiesContent } from "@/lib/content/caseStudies";
import type { CaseStudyDTO } from "@/lib/case-studies/studies";
import { formatBlogDate } from "@/lib/blog/utils";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

type CaseStudyDetailViewProps = {
  study: CaseStudyDTO;
};

export function CaseStudyDetailView({ study }: CaseStudyDetailViewProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { isReady, prefersReducedMotion } = useMotion();
  const coverImage = study.coverImage ?? "/industries/forging.jpg";

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-cs-detail]", {
        autoAlpha: 0,
        y: 22,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <>
      <section className="page-hero relative overflow-hidden border-b border-outline-variant/40 bg-secondary">
        <div className="absolute inset-0">
          <ContentImage
            src={coverImage}
            alt={study.coverImageAlt || study.title}
            fill
            priority
            className="object-cover object-center opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-secondary/70" />
        </div>

        <Container className="relative z-10">
          <Link
            href="/case-studies"
            className="text-xs font-semibold uppercase tracking-[0.12em] text-inverse-primary hover:text-inverse-primary/80"
          >
            ← All case studies
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-on-secondary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-inverse-primary">
              {study.categoryLabel}
            </span>
            {study.tag ? (
              <span className="rounded-full border border-on-secondary/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-on-secondary/90">
                {study.tag}
              </span>
            ) : null}
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-extrabold leading-tight text-on-secondary md:text-4xl lg:text-[2.5rem]">
            {study.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-on-secondary/85 md:text-base">
            {study.excerpt}
          </p>
          {study.metrics.length > 0 ? (
            <div className="mt-6 grid max-w-xl grid-cols-3 gap-3">
              {study.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-on-secondary/15 bg-on-secondary/5 px-3 py-3 text-center"
                >
                  <p className="font-display text-lg font-extrabold text-inverse-primary md:text-xl">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-[10px] leading-tight text-on-secondary/75">{metric.label}</p>
                </div>
              ))}
            </div>
          ) : null}
        </Container>
      </section>

      <section ref={sectionRef} className="section-y bg-surface pb-20">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,42rem)_240px] lg:justify-center lg:gap-16">
            <div className="min-w-0 space-y-8">
              {study.clientContext ? (
                <article data-cs-detail className="rounded-2xl border border-outline-variant/40 bg-surface-low p-5 md:p-6">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    Client & context
                  </h2>
                  <p className="mt-3 text-base leading-7 text-on-surface md:text-lg">
                    {study.clientContext}
                  </p>
                </article>
              ) : null}

              <article data-cs-detail>
                <RichArticleBody
                  contentFormat={study.contentFormat}
                  bodyJson={study.bodyJson}
                  content={study.content}
                />
              </article>

              {study.outcomes.length > 0 && study.contentFormat !== "RICH" ? (
                <article data-cs-detail>
                  <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    Key outcomes
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {study.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="rounded-xl border border-outline-variant/50 bg-surface-lowest px-4 py-3 text-sm leading-6 text-on-surface md:text-base"
                      >
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </article>
              ) : null}

              {study.disclaimer ? (
                <p
                  data-cs-detail
                  className="text-xs leading-5 text-on-surface-variant/80 md:text-sm"
                >
                  {study.disclaimer}
                </p>
              ) : null}
            </div>

            <aside data-cs-detail className="space-y-5 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-outline-variant/50 bg-surface-low p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                  Industry
                </p>
                <p className="mt-1 font-bold text-on-surface">{study.industry}</p>
                <p className="mt-3 text-xs text-on-surface-variant">
                  {study.publishedAt ? `${formatBlogDate(study.publishedAt)} · ` : ""}
                  {study.readTimeMin} min read · {study.author.name}
                </p>
              </div>
              <ArticleAuthorCard author={study.author} />
              <div className="rounded-2xl border border-outline-variant/50 bg-surface-lowest p-5 shadow-sm">
                <p className="text-sm font-bold text-on-surface">
                  Want similar outcomes on your plant?
                </p>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  Start with a pilot. Verify savings on your next bill before annual commitment.
                </p>
                <Button href="/contact" variant="primary" className="mt-4 w-full">
                  Book a Discovery Call
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <IndustryPageCta content={caseStudiesContent.finalCta} />
    </>
  );
}
