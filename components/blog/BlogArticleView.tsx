"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import { ArticleAuthorCard } from "@/components/blog/ArticleAuthorCard";
import { BlogRelatedArticles } from "@/components/blog/BlogRelatedArticles";
import { RichArticleBody } from "@/components/rich-content/RichArticleBody";
import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { ContentImage } from "@/components/ui/ContentImage";
import type { BlogPostDTO, BlogPostListItem } from "@/lib/blog/posts";
import { formatBlogDate } from "@/lib/blog/utils";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { DARK_HERO_BODY_ATTR } from "@/lib/layout/nav-theme";
import { cn } from "@/lib/utils";

type BlogArticleViewProps = {
  post: BlogPostDTO;
  related: BlogPostListItem[];
};

/** Main column + sidebar - matches site container width without extra centering gutters. */
const ARTICLE_LAYOUT =
  "grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(17.5rem,20rem)] lg:items-start lg:gap-12 xl:gap-14";

export function BlogArticleView({ post, related }: BlogArticleViewProps) {
  const heroRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasCover = Boolean(post.coverImage);
  const { isReady, prefersReducedMotion } = useMotion();

  useLayoutEffect(() => {
    if (!hasCover) {
      return;
    }

    document.body.setAttribute(DARK_HERO_BODY_ATTR, "");

    return () => {
      document.body.removeAttribute(DARK_HERO_BODY_ATTR);
    };
  }, [hasCover]);

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-blog-hero]", {
        autoAlpha: 0,
        y: 28,
        duration: 0.85,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: heroRef, dependencies: [isReady, prefersReducedMotion, hasCover] },
  );

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-blog-article]", {
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
      <section
        ref={heroRef}
        className={cn(
          "page-hero relative overflow-hidden border-b border-outline-variant/40",
          hasCover ? "min-h-[22rem] bg-secondary md:min-h-0" : "bg-surface",
        )}
      >
        {hasCover ? (
          <div className="absolute inset-0" aria-hidden="true">
            <ContentImage
              src={post.coverImage!}
              alt=""
              fill
              priority
              className="object-cover object-[center_35%] md:object-[center_40%]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-secondary/70" />
          </div>
        ) : null}

        <Container className="relative z-10 flex min-h-[inherit] flex-col justify-end md:block">
          <div className="max-w-3xl">
            <Link
              data-blog-hero
              href="/case-studies"
              className={cn(
                "inline-flex min-h-11 items-center py-1 text-xs font-semibold uppercase tracking-[0.12em] transition-colors",
                hasCover
                  ? "text-inverse-primary hover:text-on-secondary"
                  : "text-on-surface-variant hover:text-primary",
              )}
            >
              ← All case studies & blogs
            </Link>

            <div
              data-blog-hero
              className={cn(
                "mt-4 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2",
                hasCover ? "text-on-secondary/85" : "text-on-surface-variant",
              )}
            >
              <span
                className={cn(
                  "w-fit rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
                  hasCover
                    ? "border border-on-secondary/25 bg-on-secondary/10 text-on-secondary"
                    : "bg-secondary-container text-on-secondary-container",
                )}
              >
                {post.categoryLabel}
              </span>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
                <time dateTime={post.publishedAt ?? undefined}>
                  {formatBlogDate(post.publishedAt)}
                </time>
                <span aria-hidden="true">·</span>
                <span>{post.readTimeMin} min read</span>
                <span aria-hidden="true" className="hidden min-[380px]:inline">
                  ·
                </span>
                <span className="hidden min-[380px]:inline">{post.author.name}</span>
              </div>
              <p className="text-xs min-[380px]:hidden">{post.author.name}</p>
            </div>

            <h1
              data-blog-hero
              className={cn(
                "mt-4 font-display text-[1.75rem] font-extrabold leading-[1.14] tracking-[-0.02em] sm:mt-5 sm:text-[clamp(2rem,5vw,2.75rem)] sm:leading-[1.12]",
                hasCover ? "max-w-2xl text-on-secondary" : "max-w-4xl text-on-surface",
              )}
            >
              {post.title}
            </h1>

            <p
              data-blog-hero
              className={cn(
                "mt-4 text-base leading-7 sm:mt-5 md:text-lg md:leading-8",
                hasCover
                  ? "max-w-2xl text-on-secondary/85"
                  : "max-w-3xl text-on-surface-variant",
              )}
            >
              {post.excerpt}
            </p>

            {post.tags.length > 0 ? (
              <div data-blog-hero className="mt-5 flex flex-wrap gap-2 sm:mt-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide",
                      hasCover
                        ? "border border-on-secondary/25 bg-on-secondary/10 text-on-secondary/90"
                        : "border border-outline-variant/60 text-on-surface-variant",
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <section ref={sectionRef} className="bg-surface py-8 md:section-y md:pb-20">
        <Container>
          <div className={ARTICLE_LAYOUT}>
            <article data-blog-article className="min-w-0">
              <RichArticleBody
                contentFormat={post.contentFormat}
                bodyJson={post.bodyJson}
                content={post.content}
                className="blog-article-prose"
              />
            </article>

            <aside
              data-blog-article
              className="space-y-5 lg:sticky lg:top-28 lg:self-start lg:space-y-6"
            >
              <ArticleAuthorCard author={post.author} />

              {related.length > 0 ? (
                <div className="hidden rounded-2xl border border-outline-variant/50 bg-surface-lowest p-5 shadow-sm lg:block">
                  <p className="text-sm font-bold text-on-surface">More to read</p>
                  <ul className="mt-4 space-y-4">
                    {related.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={`/blog/${item.slug}`}
                          className="group block text-sm font-semibold leading-6 text-on-surface hover:text-primary"
                        >
                          {item.title}
                        </Link>
                        <p className="mt-1 text-xs text-on-surface-variant">
                          {formatBlogDate(item.publishedAt)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </aside>
          </div>
        </Container>
      </section>

      <BlogRelatedArticles posts={related} />
    </>
  );
}
