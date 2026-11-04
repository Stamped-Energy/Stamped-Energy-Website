import type { Metadata } from "next";

import { PostEditor } from "@/components/blog/admin/PostEditor";
import { AdminPageHeader } from "@/components/blog/admin/ui/AdminPageHeader";

export const metadata: Metadata = {
  title: "New Blog Post",
  robots: { index: false, follow: false },
};

export default function NewBlogPostPage() {
  return (
    <div className="mx-auto max-w-none space-y-6">
      <AdminPageHeader
        title="New post"
        description="Write and format your story in the editor below. Use Post settings for slug, excerpt, and metadata."
        secondaryAction={{ label: "Back to posts", href: "/blog/admin/posts" }}
      />
      <PostEditor mode="create" />
    </div>
  );
}
