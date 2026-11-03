import Link from "next/link";

import type { BlogPostListItem } from "@/lib/blog/posts";
import { formatBlogDate } from "@/lib/blog/utils";
import { ContentImage } from "@/components/ui/ContentImage";
import { cn } from "@/lib/utils";

type BlogPostCardProps = {
  post: BlogPostListItem;
  className?: string;
  dataAttr?: string;
  /** When false, image loads eagerly (featured above-the-fold). Catalog cards default to lazy. */
  lazyImage?: boolean;
};

export function BlogPostCard({ post, className, dataAttr, lazyImage = true }: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      {...(dataAttr ? { [dataAttr]: true } : {})}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-lowest shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-surface-container sm:aspect-[16/10]">
        {post.coverImage ? (
          <ContentImage
            src={post.coverImage}
            alt={post.title}
            fill
            priority={!lazyImage}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-secondary/10 text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
            {post.categoryLabel}
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-secondary/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-on-secondary">
          {post.categoryLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary sm:text-[10px]">
          {formatBlogDate(post.publishedAt)} · {post.readTimeMin} min read
        </p>
        <h3 className="mt-1.5 text-[1.05rem] font-bold leading-snug text-on-surface group-hover:text-primary sm:mt-1 sm:text-base md:text-lg">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-on-surface-variant line-clamp-3">
          {post.excerpt}
        </p>
        <span className="mt-4 text-sm font-semibold text-primary">Read more →</span>
      </div>
    </Link>
  );
}
