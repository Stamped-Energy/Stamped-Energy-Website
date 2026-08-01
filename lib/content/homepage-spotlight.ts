import { prisma } from "@/lib/blog/db";
import { resourcesContent } from "@/lib/content/resources";
import type { ResourceCard } from "@/lib/content/types";
import { normalizeCoverImageSrc } from "@/lib/media/image-src";

export const HOMEPAGE_SPOTLIGHT_LIMIT = 3;

const FALLBACK_IMAGES = {
  blog: "/industries/die-casting.jpeg",
} as const;

type SpotlightEntry = {
  id: string;
  type: "blog" | "case-study";
  title: string;
  description: string;
  href: string;
  tag?: string;
  imageSrc: string;
  imageAlt: string;
  order: number;
  updatedAt: Date;
};

export class HomepageSpotlightFullError extends Error {
  constructor() {
    super("HOMEPAGE_SPOTLIGHT_FULL");
  }
}

export async function countHomepageSpotlight(options?: {
  excludeBlogPostId?: string;
  excludeCaseStudyId?: string;
}): Promise<number> {
  const [blogs, studies] = await Promise.all([
    prisma.blogPost.count({
      where: {
        homepageFeatured: true,
        status: "PUBLISHED",
        ...(options?.excludeBlogPostId ? { id: { not: options.excludeBlogPostId } } : {}),
      },
    }),
    prisma.caseStudy.count({
      where: {
        homepageFeatured: true,
        status: "PUBLISHED",
        ...(options?.excludeCaseStudyId ? { id: { not: options.excludeCaseStudyId } } : {}),
      },
    }),
  ]);

  return blogs + studies;
}

export async function assertHomepageSpotlightAvailable(options: {
  enabling: boolean;
  excludeBlogPostId?: string;
  excludeCaseStudyId?: string;
}) {
  if (!options.enabling) {
    return;
  }

  const count = await countHomepageSpotlight(options);
  if (count >= HOMEPAGE_SPOTLIGHT_LIMIT) {
    throw new HomepageSpotlightFullError();
  }
}

export async function getNextHomepageOrder(): Promise<number> {
  const [posts, studies] = await Promise.all([
    prisma.blogPost.findMany({
      where: { homepageFeatured: true },
      select: { homepageOrder: true },
    }),
    prisma.caseStudy.findMany({
      where: { homepageFeatured: true },
      select: { homepageOrder: true },
    }),
  ]);

  const orders = [...posts, ...studies]
    .map((entry) => entry.homepageOrder)
    .filter((order): order is number => order !== null);

  if (orders.length === 0) {
    return 0;
  }

  return Math.max(...orders) + 1;
}

/** Public homepage spotlight uses CRM blog posts only (CaseStudy admin unchanged). */
async function listSpotlightEntries(): Promise<SpotlightEntry[]> {
  const now = new Date();

  const posts = await prisma.blogPost.findMany({
    where: {
      homepageFeatured: true,
      status: "PUBLISHED",
      publishedAt: { lte: now },
    },
    select: {
      id: true,
      title: true,
      excerpt: true,
      slug: true,
      coverImage: true,
      category: true,
      homepageOrder: true,
      updatedAt: true,
    },
  });

  const blogEntries: SpotlightEntry[] = posts.map((post) => ({
    id: post.id,
    type: "blog",
    title: post.title,
    description: post.excerpt,
    href: `/blog/${post.slug}`,
    tag: "Blog",
    imageSrc: normalizeCoverImageSrc(post.coverImage) ?? FALLBACK_IMAGES.blog,
    imageAlt: post.title,
    order: post.homepageOrder ?? Number.MAX_SAFE_INTEGER,
    updatedAt: post.updatedAt,
  }));

  return blogEntries
    .sort((a, b) => {
      if (a.order !== b.order) {
        return a.order - b.order;
      }
      return b.updatedAt.getTime() - a.updatedAt.getTime();
    })
    .slice(0, HOMEPAGE_SPOTLIGHT_LIMIT);
}

function toResourceCard(entry: SpotlightEntry): ResourceCard {
  return {
    id: entry.id,
    type: entry.type,
    title: entry.title,
    description: entry.description,
    href: entry.href,
    tag: entry.tag,
    imageSrc: entry.imageSrc,
    imageAlt: entry.imageAlt,
    readMoreLabel: `Read: ${entry.title} →`,
  };
}

export async function getHomepageResourceContent(): Promise<{
  content: {
    eyebrow: string;
    title: string;
    description: string;
    items: ResourceCard[];
  };
  databaseError: boolean;
}> {
  try {
    const entries = await listSpotlightEntries();

    if (entries.length === 0) {
      return { content: resourcesContent, databaseError: false };
    }

    const items = entries.map(toResourceCard);
    const fallbackItems = resourcesContent.items.filter(
      (item) => !items.some((selected) => selected.href === item.href),
    );

    return {
      content: {
        eyebrow: resourcesContent.eyebrow,
        title: resourcesContent.title,
        description: resourcesContent.description,
        items: [...items, ...fallbackItems].slice(0, HOMEPAGE_SPOTLIGHT_LIMIT),
      },
      databaseError: false,
    };
  } catch (error) {
    console.error("[getHomepageResourceContent]", error);
    return { content: resourcesContent, databaseError: true };
  }
}
