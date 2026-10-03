import { FaqSection } from "@/components/ui/FaqSection";
import { getVerticalPage, type VerticalSlug } from "@/lib/content";

type IndustryFaqProps = {
  slug: VerticalSlug;
};

export function IndustryFaq({ slug }: IndustryFaqProps) {
  return <FaqSection items={getVerticalPage(slug)?.faq ?? []} />;
}
