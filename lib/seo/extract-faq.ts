import type { JSONContent } from "@/lib/rich-content/document";
import { parseRichDoc, richDocToPlainText } from "@/lib/rich-content/document";

export type FaqItem = {
  question: string;
  answer: string;
};

const MAX_FAQ_ITEMS = 10;
const MIN_QUESTION_LENGTH = 12;

function isQuestionHeading(text: string): boolean {
  const trimmed = text.trim();
  return trimmed.endsWith("?") && trimmed.length >= MIN_QUESTION_LENGTH;
}

function collectAnswerAfterHeading(nodes: JSONContent[], startIndex: number): string {
  const parts: string[] = [];

  for (let i = startIndex + 1; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.type === "heading") {
      break;
    }
    if (node.type === "paragraph" || node.type === "bulletList" || node.type === "orderedList") {
      const text = richDocToPlainText(node).trim();
      if (text) {
        parts.push(text);
      }
    }
  }

  return parts.join(" ").trim();
}

export function extractFaqFromRichDoc(bodyJson: string | null | undefined): FaqItem[] {
  const doc = parseRichDoc(bodyJson);
  const nodes = doc.content ?? [];
  const faqs: FaqItem[] = [];

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.type !== "heading") {
      continue;
    }

    const level = node.attrs?.level as number | undefined;
    if (level !== 1 && level !== 2 && level !== 3) {
      continue;
    }

    const question = richDocToPlainText(node).trim();
    if (!isQuestionHeading(question)) {
      continue;
    }

    const answer = collectAnswerAfterHeading(nodes, i);
    if (answer) {
      faqs.push({ question, answer });
    }
  }

  return faqs.slice(0, MAX_FAQ_ITEMS);
}

export function extractFaqFromMarkdown(content: string): FaqItem[] {
  const lines = content.split("\n");
  const faqs: FaqItem[] = [];
  let i = 0;

  while (i < lines.length) {
    const headingMatch = lines[i].match(/^#{1,3}\s+(.+\?)\s*$/);
    if (!headingMatch) {
      i++;
      continue;
    }

    const question = headingMatch[1].trim();
    if (question.length < MIN_QUESTION_LENGTH) {
      i++;
      continue;
    }

    const answerParts: string[] = [];
    i++;

    while (i < lines.length && !/^#{1,3}\s/.test(lines[i])) {
      const line = lines[i].trim();
      if (line && !line.startsWith("```")) {
        answerParts.push(line.replace(/^[-*]\s+/, ""));
      }
      i++;
    }

    if (answerParts.length > 0) {
      faqs.push({ question, answer: answerParts.join(" ").trim() });
    }
  }

  return faqs.slice(0, MAX_FAQ_ITEMS);
}

export function extractFaqFromContent(options: {
  contentFormat: "MARKDOWN" | "RICH";
  bodyJson: string | null;
  content: string;
}): FaqItem[] {
  if (options.contentFormat === "RICH" && options.bodyJson) {
    return extractFaqFromRichDoc(options.bodyJson);
  }

  if (options.content?.trim()) {
    return extractFaqFromMarkdown(options.content);
  }

  return [];
}
