import type { MetadataRoute } from "next";

import { listPublishedPosts } from "@/lib/blog/posts";
import { safeDbQuery } from "@/lib/db/safe-query";
import { absoluteUrl } from "@/lib/seo/metadata";

const STATIC_PATHS = [
  "/",
  "/how-it-works",
  "/about",
  "/blog",
  "/contact",
  "/industries",
  "/industries/automotive",
  "/industries/cement",
  "/industries/steel",
  "/industries/pharma",
  "/industries/chemical",
] as const;

const STATIC_PRIORITIES: Record<string, number> = {
  "/": 1.0,
  "/how-it-works": 0.9,
  "/industries/automotive": 0.9,
  "/industries/cement": 0.9,
  "/industries/steel": 0.85,
  "/industries/pharma": 0.85,
  "/industries/chemical": 0.85,
  "/about": 0.8,
  "/blog": 0.85,
  "/industries": 0.8,
  "/contact": 0.75,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const emptyPosts = {
    posts: [],
    pagination: { page: 1, limit: 500, total: 0, totalPages: 0, hasMore: false },
  };

  const postsResult = await safeDbQuery(() => listPublishedPosts({ limit: 500 }), emptyPosts);

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "weekly",
    priority: STATIC_PRIORITIES[path] ?? 0.7,
    lastModified: new Date(),
  }));

  const blogEntries: MetadataRoute.Sitemap = postsResult.data.posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
