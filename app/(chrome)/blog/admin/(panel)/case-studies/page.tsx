import { CaseStudyList } from "@/components/blog/admin/CaseStudyList";
import { listAdminCaseStudies } from "@/lib/case-studies/studies";

export default async function AdminCaseStudiesPage() {
  const studies = await listAdminCaseStudies();
  return <CaseStudyList studies={studies} />;
}
