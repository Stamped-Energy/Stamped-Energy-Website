import type { CaseStudy, ContentFormat, PostStatus, Prisma } from "@prisma/client";

import {
  getCaseStudyCategoryLabel,
  parseMetrics,
  parseOutcomes,
  serializeMetrics,
  serializeOutcomes,
  type CaseStudyMetric,
} from "@/lib/case-studies/constants";
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
import { normalizeCoverImageSrc } from "@/lib/media/image-src";
import {
  estimateReadTimeFromDoc,
  markdownToRichDoc,
  parseRichDoc,
  richDocToPlainText,
  serializeRichDoc,
  type JSONContent,
} from "@/lib/rich-content/document";
import { slugify } from "@/lib/blog/utils";

export type CaseStudyDTO = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  contentFormat: ContentFormat;
  bodyJson: string | null;
  coverImage: string | null;
  coverImageAlt: string;
  category: string;
  categoryLabel: string;
  industry: string;
  clientContext: string;
  tag: string | null;
  metrics: CaseStudyMetric[];
  outcomes: string[];
  disclaimer: string | null;
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

export type CaseStudyListItem = Omit<
  CaseStudyDTO,
  "content" | "bodyJson" | "contentFormat" | "clientContext" | "outcomes" | "disclaimer"
> & {
  imageSrc: string;
  imageAlt: string;
};

export type CreateCaseStudyInput = {
  title: string;
  slug?: string;
  excerpt: string;
  content?: string;
  contentFormat?: ContentFormat;
  bodyJson?: string | null;
  coverImage?: string | null;
  coverImageAlt?: string;
  category: string;
  industry: string;
  clientContext?: string;
  tag?: string | null;
  metrics?: CaseStudyMetric[];
  outcomes?: string[];
  disclaimer?: string | null;
  status?: PostStatus;
  featured?: boolean;
  homepageFeatured?: boolean;
  homepageOrder?: number | null;
  readTimeMin?: number;
  authorId: string;
  authorProfile?: AuthorProfileId;
  publishedAt?: Date | null;
};

export type UpdateCaseStudyInput = Partial<CreateCaseStudyInput>;

function mapStudy(study: CaseStudy & { author: { name: string } }): CaseStudyDTO {
  const author = getAuthorProfile(study.authorProfile);
  return {
    id: study.id,
    title: study.title,
    slug: study.slug,
    excerpt: study.excerpt,
    content: study.content,
    contentFormat: study.contentFormat,
    bodyJson: study.bodyJson,
    coverImage: normalizeCoverImageSrc(study.coverImage),
    coverImageAlt: study.coverImageAlt,
    category: study.category,
    categoryLabel: getCaseStudyCategoryLabel(study.category),
    industry: study.industry,
    clientContext: study.clientContext,
    tag: study.tag,
    metrics: parseMetrics(study.metrics),
    outcomes: parseOutcomes(study.outcomes),
    disclaimer: study.disclaimer,
    status: study.status,
    featured: study.featured,
    homepageFeatured: study.homepageFeatured,
    homepageOrder: study.homepageOrder,
    readTimeMin: study.readTimeMin,
    authorName: author.name,
    authorProfile: author.id,
    author,
    publishedAt: study.publishedAt?.toISOString() ?? null,
    createdAt: study.createdAt.toISOString(),
    updatedAt: study.updatedAt.toISOString(),
  };
}

function mapListItem(study: CaseStudy & { author: { name: string } }): CaseStudyListItem {
  const dto = mapStudy(study);
  const { content: _c, bodyJson: _b, contentFormat: _f, clientContext: _cc, outcomes: _o, disclaimer: _d, ...rest } = dto;
  void _c;
  void _b;
  void _f;
  void _cc;
  void _o;
  void _d;
  return {
    ...rest,
    imageSrc: dto.coverImage ?? "/industries/forging.jpg",
    imageAlt: dto.coverImageAlt || dto.title,
  };
}

function resolveReadTime(bodyJson: string | null | undefined, content: string): number {
  if (bodyJson) {
    return estimateReadTimeFromDoc(parseRichDoc(bodyJson));
  }
  if (content.trim()) {
    return Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 200));
  }
  return 5;
}

function resolvePublishedAt(status: PostStatus, publishedAt?: Date | null): Date | null {
  if (status !== "PUBLISHED") {
    return publishedAt ?? null;
  }
  return publishedAt ?? new Date();
}

async function ensureUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.caseStudy.findFirst({
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

export async function listPublishedCaseStudies(options?: {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
}) {
  const page = Math.max(1, options?.page ?? 1);
  const limit = Math.min(24, Math.max(1, options?.limit ?? 12));
  const skip = (page - 1) * limit;

  const where: Prisma.CaseStudyWhereInput = {
    status: "PUBLISHED",
    publishedAt: { lte: new Date() },
  };

  if (options?.category && options.category !== "all") {
    where.category = options.category;
  }

  if (options?.featured) {
    where.featured = true;
  }

  const [studies, total] = await Promise.all([
    prisma.caseStudy.findMany({
      where,
      include: { author: { select: { name: true } } },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
      skip,
      take: limit,
    }),
    prisma.caseStudy.count({ where }),
  ]);

  return {
    studies: studies.map(mapListItem),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasMore: skip + studies.length < total,
    },
  };
}

/** Uncapped published case studies for sitemap / llms-full (bypasses the public list limit of 24). */
export async function listPublishedCaseStudiesForSitemap(): Promise<CaseStudyListItem[]> {
  const studies = await prisma.caseStudy.findMany({
    where: {
      status: "PUBLISHED",
      publishedAt: { lte: new Date() },
    },
    include: { author: { select: { name: true } } },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
  });

  return studies.map(mapListItem);
}

export async function getPublishedCaseStudyBySlug(slug: string): Promise<CaseStudyDTO | null> {
  try {
    const study = await prisma.caseStudy.findFirst({
      where: {
        slug,
        status: "PUBLISHED",
        publishedAt: { lte: new Date() },
      },
      include: { author: { select: { name: true } } },
    });

    return study ? mapStudy(study) : null;
  } catch (error) {
    console.error("[getPublishedCaseStudyBySlug]", error);
    return null;
  }
}

export async function listAdminCaseStudies(options?: {
  status?: PostStatus | "all";
  search?: string;
}) {
  const where: Prisma.CaseStudyWhereInput = {};

  if (options?.status && options.status !== "all") {
    where.status = options.status;
  }

  if (options?.search?.trim()) {
    where.OR = [
      { title: { contains: options.search.trim() } },
      { excerpt: { contains: options.search.trim() } },
    ];
  }

  const studies = await prisma.caseStudy.findMany({
    where,
    include: { author: { select: { name: true } } },
    orderBy: { updatedAt: "desc" },
  });

  return studies.map(mapListItem);
}

export async function getAdminCaseStudyById(id: string): Promise<CaseStudyDTO | null> {
  const study = await prisma.caseStudy.findUnique({
    where: { id },
    include: { author: { select: { name: true } } },
  });

  return study ? mapStudy(study) : null;
}

export async function createCaseStudy(input: CreateCaseStudyInput): Promise<CaseStudyDTO> {
  const baseSlug = slugify(input.slug?.trim() || input.title);
  const slug = await ensureUniqueSlug(baseSlug);
  const status = input.status ?? "DRAFT";
  const bodyJson = input.bodyJson ?? null;
  const content = input.content ?? richDocToPlainText(parseRichDoc(bodyJson));
  const homepageFeatured = input.homepageFeatured ?? false;

  if (homepageFeatured) {
    await assertHomepageSpotlightAvailable({ enabling: true });
  }

  const homepageOrder = homepageFeatured
    ? (input.homepageOrder ?? (await getNextHomepageOrder()))
    : null;

  const study = await prisma.caseStudy.create({
    data: {
      title: input.title.trim(),
      slug,
      excerpt: input.excerpt.trim(),
      content,
      contentFormat: input.contentFormat ?? "RICH",
      bodyJson,
      coverImage: normalizeCoverImageSrc(input.coverImage),
      coverImageAlt: input.coverImageAlt?.trim() || "",
      category: input.category,
      industry: input.industry.trim(),
      clientContext: input.clientContext?.trim() || "",
      tag: input.tag?.trim() || null,
      metrics: serializeMetrics(input.metrics ?? []),
      outcomes: serializeOutcomes(input.outcomes ?? []),
      disclaimer: input.disclaimer?.trim() || null,
      status,
      featured: input.featured ?? false,
      homepageFeatured,
      homepageOrder,
      readTimeMin: input.readTimeMin ?? resolveReadTime(bodyJson, content),
      authorId: input.authorId,
      authorProfile: input.authorProfile ?? "vinayak",
      publishedAt: resolvePublishedAt(status, input.publishedAt),
    },
    include: { author: { select: { name: true } } },
  });

  return mapStudy(study);
}

export async function updateCaseStudy(id: string, input: UpdateCaseStudyInput): Promise<CaseStudyDTO> {
  const existing = await prisma.caseStudy.findUnique({ where: { id } });
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

  const homepageFeatured =
    input.homepageFeatured !== undefined ? input.homepageFeatured : existing.homepageFeatured;

  if (input.homepageFeatured === true && !existing.homepageFeatured) {
    await assertHomepageSpotlightAvailable({ enabling: true, excludeCaseStudyId: id });
  }

  let homepageOrder =
    input.homepageOrder !== undefined ? input.homepageOrder : existing.homepageOrder;

  if (input.homepageFeatured === true && homepageOrder == null) {
    homepageOrder = await getNextHomepageOrder();
  }

  if (input.homepageFeatured === false) {
    homepageOrder = null;
  }

  const study = await prisma.caseStudy.update({
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
      ...(input.coverImageAlt !== undefined ? { coverImageAlt: input.coverImageAlt.trim() } : {}),
      ...(input.category !== undefined ? { category: input.category } : {}),
      ...(input.industry !== undefined ? { industry: input.industry.trim() } : {}),
      ...(input.clientContext !== undefined ? { clientContext: input.clientContext.trim() } : {}),
      ...(input.tag !== undefined ? { tag: input.tag?.trim() || null } : {}),
      ...(input.metrics !== undefined ? { metrics: serializeMetrics(input.metrics) } : {}),
      ...(input.outcomes !== undefined ? { outcomes: serializeOutcomes(input.outcomes) } : {}),
      ...(input.disclaimer !== undefined ? { disclaimer: input.disclaimer?.trim() || null } : {}),
      status,
      ...(input.featured !== undefined ? { featured: input.featured } : {}),
      ...(input.homepageFeatured !== undefined || input.homepageOrder !== undefined
        ? { homepageFeatured, homepageOrder }
        : {}),
      ...(input.authorProfile !== undefined ? { authorProfile: input.authorProfile } : {}),
      readTimeMin: input.readTimeMin ?? resolveReadTime(bodyJson, content),
      publishedAt:
        input.publishedAt !== undefined
          ? input.publishedAt
          : status === "PUBLISHED" && !existing.publishedAt
            ? new Date()
            : existing.publishedAt,
    },
    include: { author: { select: { name: true } } },
  });

  return mapStudy(study);
}

export async function deleteCaseStudy(id: string): Promise<void> {
  await prisma.caseStudy.delete({ where: { id } });
}

/** Build rich doc from legacy static case study sections (excludes clientContext - shown in hero card) */
export function staticSectionsToRichDoc(input: {
  challenge: string;
  approach: string[];
  outcomes: string[];
  coverImage?: string;
}): string {
  const content: JSONContent[] = [
    { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "The challenge" }] },
    { type: "paragraph", content: [{ type: "text", text: input.challenge }] },
  ];

  if (input.coverImage) {
    content.push({
      type: "image",
      attrs: { src: input.coverImage, alt: "" },
    });
  }

  content.push(
    { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Our approach" }] },
    {
      type: "bulletList",
      content: input.approach.map((step) => ({
        type: "listItem",
        content: [{ type: "paragraph", content: [{ type: "text", text: step }] }],
      })),
    },
    { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Outcomes" }] },
    {
      type: "bulletList",
      content: input.outcomes.map((outcome) => ({
        type: "listItem",
        content: [{ type: "paragraph", content: [{ type: "text", text: outcome }] }],
      })),
    },
  );

  return serializeRichDoc({ type: "doc", content });
}

export function markdownToBodyJson(markdown: string): string {
  return serializeRichDoc(markdownToRichDoc(markdown));
}
