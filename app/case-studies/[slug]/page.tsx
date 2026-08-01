import { permanentRedirect } from "next/navigation";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

/** Legacy case-study detail URLs fold into the merged listing (CRM CaseStudy admin unchanged). */
export default async function CaseStudyDetailPage(_props: CaseStudyPageProps) {
  permanentRedirect("/case-studies");
}
