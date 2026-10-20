import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArticleView } from "@/components/blog/BlogArticleView";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPublishedPostBySlug, getRelatedPosts } from "@/lib/blog/posts";
import { prisma } from "@/lib/blog/db";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo/metadata";
import { buildBlogPostingSchema, buildBlogSpeakableSchema } from "@/lib/seo/schemas";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true },
    });
    return posts.map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.error("[generateStaticParams] blog", error);
    return [];
  }
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return { title: "Article" };
  }

  const publishedTime = post.publishedAt ?? post.createdAt;

  return buildPageMetadata({
    title: post.title,
    absoluteTitle: `${post.title} | Stamped`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImage,
    type: "article",
    publishedTime,
    modifiedTime: post.updatedAt,
    authors: [post.author.name],
    tags: post.tags,
    keywords: post.tags,
  });
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = await getRelatedPosts(post.slug, post.category, 3);
  const publishedDate = post.publishedAt ?? post.createdAt;

  const articleSchema = buildBlogPostingSchema({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    image: post.coverImage,
    publishedDate,
    modifiedDate: post.updatedAt,
    tags: post.tags,
    category: post.categoryLabel,
    authorName: post.author.name,
    authorUrl: post.author.linkedIn,
    authorProfileId: "utsavsar",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    breadcrumbHome(),
    { name: "Resources", url: absoluteUrl("/case-studies") },
    { name: post.title, url: absoluteUrl(`/blog/${post.slug}`) },
  ]);

  const speakableSchema = buildBlogSpeakableSchema(post.slug, post.title);

  const jsonLd = [articleSchema, breadcrumbSchema, speakableSchema];

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlogArticleView post={post} related={related} />
    </>
  );
}
