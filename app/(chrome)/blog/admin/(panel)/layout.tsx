import { AdminShell } from "@/components/blog/admin/AdminShell";
import { getSession } from "@/lib/blog/auth";

import "@/styles/admin.css";

export default async function BlogAdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <AdminShell userName={session?.name} userEmail={session?.email}>
      {children}
    </AdminShell>
  );
}
