"use client";

import { CaseStudiesCatalog } from "@/components/case-studies/CaseStudiesCatalog";
import { CaseStudiesFeatured } from "@/components/case-studies/CaseStudiesFeatured";
import { CaseStudiesHero } from "@/components/case-studies/CaseStudiesHero";
import type { CaseStudyListItem } from "@/lib/case-studies/studies";

type CaseStudiesPageProps = {
  studies: CaseStudyListItem[];
  databaseError?: boolean;
};

export function CaseStudiesPage({ studies, databaseError = false }: CaseStudiesPageProps) {
  return (
    <>
      <CaseStudiesHero />
      <CaseStudiesFeatured
        studies={studies.filter((s) => s.featured)}
        databaseError={databaseError}
      />
      <CaseStudiesCatalog studies={studies} />
    </>
  );
}
