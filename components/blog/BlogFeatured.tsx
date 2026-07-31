"use client";

import { useRef } from "react";

import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { DatabaseFetchNotice } from "@/components/ui/DatabaseFetchNotice";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { BlogPostListItem } from "@/lib/blog/posts";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

type BlogFeaturedProps = {
  posts: BlogPostListItem[];
  databaseError?: boolean;
};

export function BlogFeatured({ posts, databaseError = false }: BlogFeaturedProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || posts.length === 0) {
        return;
      }

      gsap.from("[data-blog-featured]", {
        autoAlpha: 0,
        y: 28,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion, posts.length] },
  );

  if (posts.length === 0 && !databaseError) {
    return null;
  }

  return (
    <section ref={sectionRef} className="border-b border-outline-variant/40 bg-surface py-8 md:section-y">
      <Container>
        <SectionHeading
          eyebrow="Featured"
          title="Featured insights"
          description="Shift-start MD, furnace holding, compressor waste, practical notes for plant heads."
          align="center"
          className="mx-auto max-w-2xl"
        />

        {databaseError ? <DatabaseFetchNotice className="mx-auto mt-6 max-w-md" /> : null}

        {posts.length > 0 ? (
          <div className="mt-5 grid gap-4 sm:gap-5 md:mt-10 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} dataAttr="data-blog-featured" />
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
