import { PAGE_SEO } from "../lib/seo/pages";

import { META_DESCRIPTION_MAX, META_DESCRIPTION_MIN, normalizeMetaDescription } from "../lib/seo/meta-description";

const MAX_TITLE = 60;

const failures = Object.entries(PAGE_SEO).flatMap(([key, page]) => {
  const normalized = normalizeMetaDescription(page.description);
  return [
    ...(page.absoluteTitle.length > MAX_TITLE ? [`${key}: title ${page.absoluteTitle.length} > ${MAX_TITLE}`] : []),
    ...(normalized.length < META_DESCRIPTION_MIN
      ? [`${key}: description ${normalized.length} < ${META_DESCRIPTION_MIN}`]
      : []),
    ...(normalized.length > META_DESCRIPTION_MAX
      ? [`${key}: description ${normalized.length} > ${META_DESCRIPTION_MAX}`]
      : []),
  ];
});

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`seo:check ok (${Object.keys(PAGE_SEO).length} pages)`);
