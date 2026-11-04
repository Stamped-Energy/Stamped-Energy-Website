import type { Metadata } from "next";

import { AdminDashboard } from "@/components/blog/admin/AdminDashboard";
import { getAdminStats, listAdminPosts } from "@/lib/blog/posts";
import {
  getContactSubmissionStats,
  listContactSubmissions,
} from "@/lib/contact/submissions";

export const metadata: Metadata = {
  title: "Blog Admin",
  robots: { index: false, follow: false },
};

export default async function BlogAdminDashboardPage() {
  const [stats, posts, inquiryStats, inquiries] = await Promise.all([
    getAdminStats(),
    listAdminPosts(),
    getContactSubmissionStats(),
    listContactSubmissions(6),
  ]);

  return (
    <AdminDashboard
      stats={stats}
      posts={posts}
      inquiryStats={inquiryStats}
      recentInquiries={inquiries}
    />
  );
}
