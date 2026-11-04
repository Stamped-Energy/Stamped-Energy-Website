import type { Metadata } from "next";

import { PostList } from "@/components/blog/admin/PostList";
import { AdminPageHeader } from "@/components/blog/admin/ui/AdminPageHeader";
import { listAdminPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog Posts",
  robots: { index: false, follow: false },
};

type PostsPageProps = {
  searchParams: Promise<{ status?: string }>;
};

function parseStatusFilter(
  status?: string,
): "all" | "DRAFT" | "PUBLISHED" | "ARCHIVED" {
  if (status === "draft") return "DRAFT";
  if (status === "published") return "PUBLISHED";
  if (status === "archived") return "ARCHIVED";
  return "all";
}

export default async function BlogAdminPostsPage({ searchParams }: PostsPageProps) {
  const { status } = await searchParams;
  const initialFilter = parseStatusFilter(status);
  const posts = await listAdminPosts();

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <AdminPageHeader
        title="All posts"
        description="Search, filter, edit, publish, and delete blog articles."
        action={{ label: "New post", href: "/blog/admin/posts/new" }}
      />
      <PostList initialPosts={posts} initialFilter={initialFilter} />
    </div>
  );
}
