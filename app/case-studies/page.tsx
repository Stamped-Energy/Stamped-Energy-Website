import { permanentRedirect } from "next/navigation";

/** Public case studies listing merged into /blog (CRM CaseStudy admin unchanged). */
export default function CaseStudiesRoute() {
  permanentRedirect("/blog");
}
