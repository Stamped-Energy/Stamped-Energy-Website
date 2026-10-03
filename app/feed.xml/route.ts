import { listPublishedPostsForSitemap } from "@/lib/blog/posts";
import { listPublishedCaseStudiesForSitemap } from "@/lib/case-studies/studies";
import { siteConfig } from "@/lib/content/site";
import { safeDbQuery } from "@/lib/db/safe-query";
import { absoluteUrl } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";

export const revalidate = 3600;

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (char) => `&${{ "<": "lt", ">": "gt", "&": "amp", "'": "apos", '"': "quot" }[char]};`);

export async function GET() {
  const [posts, studies] = await Promise.all([
    safeDbQuery(() => listPublishedPostsForSitemap(), []),
    safeDbQuery(() => listPublishedCaseStudiesForSitemap(), []),
  ]);

  const items = [
    ...posts.data.map((post) => ({ ...post, url: absoluteUrl(`/blog/${post.slug}`) })),
    ...studies.data.map((study) => ({ ...study, url: absoluteUrl(`/case-studies/${study.slug}`) })),
  ]
    .map((item) => ({ ...item, date: new Date(item.publishedAt ?? item.createdAt) }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${escapeXml(PAGE_SEO.caseStudies.absoluteTitle)}</title>
<link>${absoluteUrl(PAGE_SEO.caseStudies.path)}</link>
<atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml"/>
<description>${escapeXml(PAGE_SEO.caseStudies.description)}</description>
<language>en-IN</language>
<copyright>${escapeXml(siteConfig.name)}</copyright>
${items
  .map(
    (item) => `<item>
<title>${escapeXml(item.title)}</title>
<link>${item.url}</link>
<guid isPermaLink="true">${item.url}</guid>
<pubDate>${item.date.toUTCString()}</pubDate>
<category>${escapeXml(item.categoryLabel)}</category>
<description>${escapeXml(item.excerpt)}</description>
</item>`,
  )
  .join("\n")}
</channel>
</rss>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
