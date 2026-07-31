import { listPublishedPosts } from "@/lib/blog/posts";
import { icp } from "@/lib/content/icp";
import { safeDbQuery } from "@/lib/db/safe-query";
import { SITE_URL } from "@/lib/seo/constants";

export const revalidate = 3600;

export async function GET() {
  const emptyPosts = {
    posts: [],
    pagination: { page: 1, limit: 500, total: 0, totalPages: 0, hasMore: false },
  };

  const postsResult = await safeDbQuery(() => listPublishedPosts({ limit: 500 }), emptyPosts);

  const lines: string[] = [
    "# Stamped Energy - Full Content Index",
    "",
    "> Auto-generated index of published case studies and blogs for AI crawlers and answer engines.",
    "",
    icp.seo.entityDefinition,
    "",
    `Site: ${SITE_URL}`,
    `Category: ${icp.seo.categoryLabel}`,
    `Audience: ${icp.seo.audienceLine}`,
    `For overview see ${SITE_URL}/llms.txt`,
    "",
    "## Case studies & blogs",
    "",
  ];

  if (postsResult.data.posts.length === 0) {
    lines.push("- (No published posts yet)");
  } else {
    for (const post of postsResult.data.posts) {
      lines.push(`- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.excerpt}`);
    }
  }

  lines.push(
    "",
    "## Static pages",
    "",
    `- [Home](${SITE_URL}/)`,
    `- [How It Works](${SITE_URL}/how-it-works)`,
    `- [Industries hub](${SITE_URL}/industries)`,
    `- [Industries - Automotive](${SITE_URL}/industries/automotive)`,
    `- [Industries - Cement](${SITE_URL}/industries/cement)`,
    `- [Industries - Steel](${SITE_URL}/industries/steel)`,
    `- [Industries - Pharmaceutical](${SITE_URL}/industries/pharma)`,
    `- [Industries - Chemical](${SITE_URL}/industries/chemical)`,
    `- [Case Studies & Blogs](${SITE_URL}/case-studies)`,
    `- [About](${SITE_URL}/about)`,
    `- [Contact](${SITE_URL}/contact)`,
    "",
  );

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
