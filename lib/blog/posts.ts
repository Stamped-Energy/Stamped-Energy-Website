import type { BlogPost, ContentFormat, PostStatus, Prisma } from "@prisma/client";

import { getCategoryLabel } from "@/lib/blog/constants";
import { prisma } from "@/lib/blog/db";
import {
  assertHomepageSpotlightAvailable,
  getNextHomepageOrder,
  HomepageSpotlightFullError,
} from "@/lib/content/homepage-spotlight";
export { HomepageSpotlightFullError };
import {
  getAuthorProfile,
  type AuthorProfile,
  type AuthorProfileId,
} from "@/lib/content/author-profiles";
import {
  estimateReadTimeFromDoc,
  parseRichDoc,
  richDocToPlainText,
} from "@/lib/rich-content/document";
import { estimateReadTimeMinutes, parseTags, serializeTags, slugify } from "@/lib/blog/utils";
import { normalizeCoverImageSrc } from "@/lib/media/image-src";

export type BlogPostDTO = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  contentFormat: ContentFormat;
  bodyJson: string | null;
  coverImage: string | null;
  category: string;
  categoryLabel: string;
  tags: string[];
  status: PostStatus;
  featured: boolean;
  homepageFeatured: boolean;
  homepageOrder: number | null;
  readTimeMin: number;
  authorName: string;
  authorProfile: AuthorProfileId;
  author: AuthorProfile;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type BlogPostListItem = Omit<BlogPostDTO, "content">;

export type CreatePostInput = {
  title: string;
  slug?: string;
  excerpt: string;
  content?: string;
  contentFormat?: ContentFormat;
  bodyJson?: string | null;
  coverImage?: string | null;
  category: string;
  tags?: string[];
  status?: PostStatus;
  featured?: boolean;
  homepageFeatured?: boolean;
  homepageOrder?: number | null;
  readTimeMin?: number;
  authorId: string;
  authorProfile?: AuthorProfileId;
  publishedAt?: Date | null;
};

export type UpdatePostInput = Partial<CreatePostInput>;

function resolveReadTime(
  bodyJson: string | null | undefined,
  content: string,
  fallback?: number,
): number {
  if (bodyJson) {
    return estimateReadTimeFromDoc(parseRichDoc(bodyJson));
  }
  if (content.trim()) {
    return estimateReadTimeMinutes(content);
  }
  return fallback ?? 5;
}

function mapPost(post: BlogPost & { author: { name: string } }): BlogPostDTO {
  const author = getAuthorProfile(post.authorProfile);
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    contentFormat: post.contentFormat,
    bodyJson: post.bodyJson,
    coverImage: normalizeCoverImageSrc(post.coverImage),
    category: post.category,
    categoryLabel: getCategoryLabel(post.category),
    tags: parseTags(post.tags),
    status: post.status,
    featured: post.featured,
    homepageFeatured: post.homepageFeatured,
    homepageOrder: post.homepageOrder,
    readTimeMin: post.readTimeMin,
    authorName: author.name,
    authorProfile: author.id,
    author,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };
}

function mapListItem(post: BlogPost & { author: { name: string } }): BlogPostListItem {
  const { content: _omit, ...rest } = mapPost(post);
  void _omit;
  return rest;
}

export async function listPublishedPosts(options?: {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
  search?: string;
}) {
  const page = Math.max(1, options?.page ?? 1);
  const limit = Math.min(24, Math.max(1, options?.limit ?? 6));
  const skip = (page - 1) * limit;

  const where: Prisma.BlogPostWhereInput = {
    status: "PUBLISHED",
    publishedAt: { lte: new Date() },
  };

  if (options?.category && options.category !== "all") {
    where.category = options.category;
  }

  if (options?.featured) {
    where.featured = true;
  }

  if (options?.search?.trim()) {
    where.OR = [
      { title: { contains: options.search.trim() } },
      { excerpt: { contains: options.search.trim() } },
      { content: { contains: options.search.trim() } },
    ];
  }

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      include: { author: { select: { name: true } } },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
      skip,
      take: limit,
    }),
    prisma.blogPost.count({ where }),
  ]);

  return {
    posts: posts.map(mapListItem),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasMore: skip + posts.length < total,
    },
  };
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPostDTO | null> {
  try {
    const post = await prisma.blogPost.findFirst({
      where: {
        slug,
        status: "PUBLISHED",
        publishedAt: { lte: new Date() },
      },
      include: { author: { select: { name: true } } },
    });

    return post ? mapPost(post) : null;
  } catch (error) {
    console.error("[getPublishedPostBySlug]", error);
    return null;
  }
}

export async function getRelatedPosts(slug: string, category: string, limit = 3) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        slug: { not: slug },
        status: "PUBLISHED",
        category,
        publishedAt: { lte: new Date() },
      },
      include: { author: { select: { name: true } } },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });

    return posts.map(mapListItem);
  } catch (error) {
    console.error("[getRelatedPosts]", error);
    return [];
  }
}

export async function listAdminPosts(options?: {
  status?: PostStatus | "all";
  search?: string;
}) {
  const where: Prisma.BlogPostWhereInput = {};

  if (options?.status && options.status !== "all") {
    where.status = options.status;
  }

  if (options?.search?.trim()) {
    where.OR = [
      { title: { contains: options.search.trim() } },
      { excerpt: { contains: options.search.trim() } },
    ];
  }

  const posts = await prisma.blogPost.findMany({
    where,
    include: { author: { select: { name: true } } },
    orderBy: { updatedAt: "desc" },
  });

  return posts.map(mapListItem);
}

export async function getAdminPostById(id: string): Promise<BlogPostDTO | null> {
  const post = await prisma.blogPost.findUnique({
    where: { id },
    include: { author: { select: { name: true } } },
  });

  return post ? mapPost(post) : null;
}

async function ensureUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.blogPost.findFirst({
      where: {
        slug,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
      select: { id: true },
    });

    if (!existing) {
      return slug;
    }

    counter += 1;
    slug = `${baseSlug}-${counter}`;
  }
}

function resolvePublishedAt(status: PostStatus, publishedAt?: Date | null): Date | null {
  if (status !== "PUBLISHED") {
    return publishedAt ?? null;
  }
  return publishedAt ?? new Date();
}

export async function createPost(input: CreatePostInput): Promise<BlogPostDTO> {
  const baseSlug = slugify(input.slug?.trim() || input.title);
  const slug = await ensureUniqueSlug(baseSlug);
  const status = input.status ?? "DRAFT";
  const bodyJson = input.bodyJson ?? null;
  const content =
    input.content ?? (bodyJson ? richDocToPlainText(parseRichDoc(bodyJson)) : "");
  const readTimeMin = input.readTimeMin ?? resolveReadTime(bodyJson, content);
  const homepageFeatured = input.homepageFeatured ?? false;

  if (homepageFeatured) {
    await assertHomepageSpotlightAvailable({ enabling: true });
  }

  const homepageOrder = homepageFeatured
    ? (input.homepageOrder ?? (await getNextHomepageOrder()))
    : null;

  const post = await prisma.blogPost.create({
    data: {
      title: input.title.trim(),
      slug,
      excerpt: input.excerpt.trim(),
      content,
      contentFormat: input.contentFormat ?? "RICH",
      bodyJson,
      coverImage: normalizeCoverImageSrc(input.coverImage),
      category: input.category,
      tags: serializeTags(input.tags ?? []),
      status,
      featured: input.featured ?? false,
      homepageFeatured,
      homepageOrder,
      readTimeMin,
      authorId: input.authorId,
      authorProfile: input.authorProfile ?? "vinayak",
      publishedAt: resolvePublishedAt(status, input.publishedAt),
    },
    include: { author: { select: { name: true } } },
  });

  return mapPost(post);
}

export async function updatePost(id: string, input: UpdatePostInput): Promise<BlogPostDTO> {
  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("NOT_FOUND");
  }

  let slug = existing.slug;
  if (input.slug !== undefined || input.title !== undefined) {
    const baseSlug = slugify(input.slug?.trim() || input.title?.trim() || existing.title);
    slug = await ensureUniqueSlug(baseSlug, id);
  }

  const status = input.status ?? existing.status;
  const bodyJson = input.bodyJson !== undefined ? input.bodyJson : existing.bodyJson;
  const content =
    input.content !== undefined
      ? input.content
      : input.bodyJson !== undefined
        ? richDocToPlainText(parseRichDoc(bodyJson))
        : existing.content;
  const readTimeMin = input.readTimeMin ?? resolveReadTime(bodyJson, content);

  const homepageFeatured =
    input.homepageFeatured !== undefined ? input.homepageFeatured : existing.homepageFeatured;

  if (input.homepageFeatured === true && !existing.homepageFeatured) {
    await assertHomepageSpotlightAvailable({ enabling: true, excludeBlogPostId: id });
  }

  let homepageOrder =
    input.homepageOrder !== undefined ? input.homepageOrder : existing.homepageOrder;

  if (input.homepageFeatured === true && homepageOrder == null) {
    homepageOrder = await getNextHomepageOrder();
  }

  if (input.homepageFeatured === false) {
    homepageOrder = null;
  }

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      ...(input.title !== undefined ? { title: input.title.trim() } : {}),
      slug,
      ...(input.excerpt !== undefined ? { excerpt: input.excerpt.trim() } : {}),
      content,
      ...(input.contentFormat !== undefined ? { contentFormat: input.contentFormat } : {}),
      ...(input.bodyJson !== undefined ? { bodyJson: input.bodyJson } : {}),
      ...(input.coverImage !== undefined
        ? { coverImage: normalizeCoverImageSrc(input.coverImage) }
        : {}),
      ...(input.category !== undefined ? { category: input.category } : {}),
      ...(input.tags !== undefined ? { tags: serializeTags(input.tags) } : {}),
      status,
      ...(input.featured !== undefined ? { featured: input.featured } : {}),
      ...(input.homepageFeatured !== undefined || input.homepageOrder !== undefined
        ? { homepageFeatured, homepageOrder }
        : {}),
      ...(input.authorProfile !== undefined ? { authorProfile: input.authorProfile } : {}),
      readTimeMin,
      publishedAt:
        input.publishedAt !== undefined
          ? input.publishedAt
          : status === "PUBLISHED" && !existing.publishedAt
            ? new Date()
            : existing.publishedAt,
    },
    include: { author: { select: { name: true } } },
  });

  return mapPost(post);
}

export async function deletePost(id: string): Promise<void> {
  await prisma.blogPost.delete({ where: { id } });
}

export async function getAdminStats() {
  const [total, published, drafts, featured] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
    prisma.blogPost.count({ where: { status: "DRAFT" } }),
    prisma.blogPost.count({ where: { featured: true, status: "PUBLISHED" } }),
  ]);

  return { total, published, drafts, featured };
}
