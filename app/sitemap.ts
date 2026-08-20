import type { MetadataRoute } from "next";

import { listPublishedPostsForSitemap } from "@/lib/blog/posts";
import { listPublishedCaseStudiesForSitemap } from "@/lib/case-studies/studies";
import { safeDbQuery } from "@/lib/db/safe-query";
import { absoluteUrl } from "@/lib/seo/metadata";

export const revalidate = 3600;

const STATIC_PATHS = [
  "/",
  "/platform",
  "/solutions",
  "/solutions/load-energy",
  "/solutions/equipment-intelligence",
  "/about",
  "/case-studies",
  "/contact",
  "/industries",
  "/industries/automotive",
  "/industries/cement",
  "/industries/steel",
  "/industries/pharma",
  "/industries/chemical",
  "/resources",
  "/resources/stamped-vs-ems",
  "/resources/maximum-demand-india",
  "/resources/discom-bill-guide",
] as const;

const STATIC_PRIORITIES: Record<string, number> = {
  "/": 1.0,
  "/platform": 0.9,
  "/solutions": 0.95,
  "/solutions/load-energy": 0.9,
  "/solutions/equipment-intelligence": 0.9,
  "/industries/automotive": 0.9,
  "/industries/cement": 0.9,
  "/industries/steel": 0.85,
  "/industries/pharma": 0.85,
  "/industries/chemical": 0.85,
  "/about": 0.8,
  "/case-studies": 0.85,
  "/industries": 0.8,
  "/contact": 0.75,
  "/resources": 0.85,
  "/resources/stamped-vs-ems": 0.85,
  "/resources/maximum-demand-india": 0.85,
  "/resources/discom-bill-guide": 0.85,
};

function safeLastModified(value: string | null | undefined): Date {
  if (!value) {
    return new Date();
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postsResult = await safeDbQuery(() => listPublishedPostsForSitemap(), []);
  const studiesResult = await safeDbQuery(() => listPublishedCaseStudiesForSitemap(), []);

  if (postsResult.databaseError) {
    console.error("[sitemap] database error loading blog posts; returning static + empty posts");
  }
  if (studiesResult.databaseError) {
    console.error("[sitemap] database error loading case studies; returning static + empty studies");
  }

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "weekly",
    priority: STATIC_PRIORITIES[path] ?? 0.7,
    lastModified: new Date(),
  }));

  const blogEntries: MetadataRoute.Sitemap = postsResult.data.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: safeLastModified(post.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = studiesResult.data.map((study) => ({
    url: absoluteUrl(`/case-studies/${study.slug}`),
    lastModified: safeLastModified(study.updatedAt),
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticEntries, ...blogEntries, ...caseStudyEntries];
}
