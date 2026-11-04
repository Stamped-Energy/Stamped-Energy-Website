import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostEditor } from "@/components/blog/admin/PostEditor";
import { AdminPageHeader } from "@/components/blog/admin/ui/AdminPageHeader";
import { getAdminPostById } from "@/lib/blog/posts";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: EditPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getAdminPostById(id);
  return {
    title: post ? `Edit: ${post.title}` : "Edit post",
    robots: { index: false, follow: false },
  };
}

export default async function EditBlogPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const post = await getAdminPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-none space-y-6">
      <AdminPageHeader
        title="Edit post"
        description={`/blog/${post.slug}`}
        secondaryAction={{ label: "Back to posts", href: "/blog/admin/posts" }}
        action={
          post.status === "PUBLISHED"
            ? { label: "View live", href: `/blog/${post.slug}` }
            : undefined
        }
      />
      <PostEditor mode="edit" initial={post} />
    </div>
  );
}
