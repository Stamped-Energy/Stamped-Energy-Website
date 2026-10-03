import { PAGE_SEO } from "../lib/seo/pages";

const MAX_TITLE = 60;
const MAX_DESCRIPTION = 160;

const failures = Object.entries(PAGE_SEO).flatMap(([key, page]) => [
  ...(page.absoluteTitle.length > MAX_TITLE ? [`${key}: title ${page.absoluteTitle.length} > ${MAX_TITLE}`] : []),
  ...(page.description.length > MAX_DESCRIPTION
    ? [`${key}: description ${page.description.length} > ${MAX_DESCRIPTION}`]
    : []),
]);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`seo:check ok (${Object.keys(PAGE_SEO).length} pages)`);
