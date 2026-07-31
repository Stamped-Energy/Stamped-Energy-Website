import { permanentRedirect } from "next/navigation";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

/** Public case study detail merged into /blog (CRM CaseStudy admin unchanged). */
export default async function CaseStudyDetailPage(_props: CaseStudyPageProps) {
  permanentRedirect("/blog");
}
