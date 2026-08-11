import { IndustryFaq } from "@/components/industries/vertical/IndustryFaq";
import { IndustryHero } from "@/components/industries/vertical/IndustryHero";
import { IndustryOutcomes } from "@/components/industries/vertical/IndustryOutcomes";
import { IndustryPrescriptionExamples } from "@/components/industries/vertical/IndustryPrescriptionExamples";
import { IndustrySegments } from "@/components/industries/vertical/IndustrySegments";
import { IndustryPageCta } from "@/components/industries/shared/IndustryPageCta";
import { getVerticalPage, type VerticalSlug } from "@/lib/content";

type IndustryVerticalPageProps = {
  slug: VerticalSlug;
};

export function IndustryVerticalPage({ slug }: IndustryVerticalPageProps) {
  const page = getVerticalPage(slug);

  if (!page) {
    return null;
  }

  return (
    <>
      {page.hero.seoHeadings?.length ? (
        <div className="sr-only">
          {page.hero.seoHeadings.map((heading) => (
            <h2 key={heading}>{heading}</h2>
          ))}
        </div>
      ) : null}
      <IndustryHero slug={slug} />
      <IndustrySegments slug={slug} />
      <IndustryPrescriptionExamples slug={slug} />
      <IndustryOutcomes slug={slug} />
      <IndustryFaq slug={slug} />
      <IndustryPageCta content={page.finalCta} />
    </>
  );
}
