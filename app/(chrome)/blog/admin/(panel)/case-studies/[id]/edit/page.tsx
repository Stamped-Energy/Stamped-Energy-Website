import { notFound } from "next/navigation";

import { CaseStudyEditor } from "@/components/blog/admin/CaseStudyEditor";
import { getAdminCaseStudyById } from "@/lib/case-studies/studies";

type EditCaseStudyPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCaseStudyPage({ params }: EditCaseStudyPageProps) {
  const { id } = await params;
  const study = await getAdminCaseStudyById(id);

  if (!study) {
    notFound();
  }

  return <CaseStudyEditor mode="edit" initial={study} />;
}
