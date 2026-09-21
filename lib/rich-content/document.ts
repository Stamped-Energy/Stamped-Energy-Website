import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import StarterKit from "@tiptap/starter-kit";
import type { JSONContent } from "@tiptap/core";
import { generateHTML } from "@tiptap/html";

export type { JSONContent };

export type ContentFormat = "MARKDOWN" | "RICH";

export const RICH_EXTENSIONS = [
  StarterKit.configure({
    heading: { levels: [1, 2, 3] },
    codeBlock: {
      languageClassPrefix: "language-",
      HTMLAttributes: {
        class: "rich-code-block",
      },
    },
  }),
  Underline,
  Link.configure({
    openOnClick: false,
    autolink: true,
    linkOnPaste: true,
    HTMLAttributes: {
      class: "rich-link",
      rel: "noopener noreferrer",
    },
  }),
  Image.configure({
    HTMLAttributes: { class: "rich-image" },
  }),
  Youtube.configure({
    HTMLAttributes: { class: "rich-video" },
  }),
  Table.configure({
    resizable: true,
    HTMLAttributes: { class: "rich-table" },
  }),
  TableRow,
  TableHeader,
  TableCell,
  Placeholder.configure({
    placeholder: "Tell your story…",
  }),
];

export const EMPTY_RICH_DOC: JSONContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

export function parseRichDoc(raw: string | null | undefined): JSONContent {
  if (!raw?.trim()) {
    return EMPTY_RICH_DOC;
  }
  try {
    return JSON.parse(raw) as JSONContent;
  } catch {
    return EMPTY_RICH_DOC;
  }
}

export function serializeRichDoc(doc: JSONContent): string {
  return JSON.stringify(doc);
}

export function richDocToPlainText(doc: JSONContent): string {
  const walk = (node: JSONContent): string => {
    if (node.type === "text" && node.text) {
      return node.text;
    }
    if (!node.content?.length) {
      return "";
    }
    const inner = node.content.map(walk).join(" ");
    if (node.type === "paragraph" || node.type === "heading") {
      return `${inner}\n`;
    }
    return inner;
  };
  return walk(doc).trim();
}

export function estimateReadTimeFromDoc(doc: JSONContent): number {
  const words = richDocToPlainText(doc).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function richDocToHtml(doc: JSONContent): string {
  return generateHTML(enrichRichDoc(doc), RICH_EXTENSIONS);
}

function isTableRow(line: string): boolean {
  const trimmed = line.trim();
  return trimmed.startsWith("|") && trimmed.endsWith("|") && trimmed.includes("|");
}

function isTableSeparator(line: string): boolean {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line.trim());
}

function parseTableCells(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function tableFromMarkdownRows(rows: string[]): JSONContent | null {
  if (rows.length < 2 || !isTableSeparator(rows[1])) {
    return null;
  }

  const headerCells = parseTableCells(rows[0]);
  const bodyRows = rows.slice(2).map(parseTableCells).filter((cells) => cells.some(Boolean));

  const cellNode = (text: string, header: boolean): JSONContent => ({
    type: header ? "tableHeader" : "tableCell",
    content: text ? [{ type: "paragraph", content: parseInlineMarkdown(text) }] : [{ type: "paragraph" }],
  });

  return {
    type: "table",
    content: [
      {
        type: "tableRow",
        content: headerCells.map((cell) => cellNode(cell, true)),
      },
      ...bodyRows.map((cells) => ({
        type: "tableRow",
        content: cells.map((cell) => cellNode(cell, false)),
      })),
    ],
  };
}

const YOUTUBE_LINE =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/i;

/** Parse **bold**, *italic*, `code`, and [links](url) into TipTap text nodes. */
export function parseInlineMarkdown(text: string): JSONContent[] {
  if (!text) {
    return [];
  }

  if (
    !text.includes("**") &&
    !text.includes("*") &&
    !text.includes("`") &&
    !text.includes("[")
  ) {
    return [{ type: "text", text }];
  }

  const nodes: JSONContent[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      nodes.push({
        type: "text",
        text: linkMatch[1],
        marks: [{ type: "link", attrs: { href: linkMatch[2].trim() } }],
      });
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    const boldMatch = remaining.match(/^\*\*(.+?)\*\*/);
    if (boldMatch) {
      nodes.push({ type: "text", text: boldMatch[1], marks: [{ type: "bold" }] });
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    const italicMatch = remaining.match(/^\*(.+?)\*/);
    if (italicMatch) {
      nodes.push({ type: "text", text: italicMatch[1], marks: [{ type: "italic" }] });
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    const codeMatch = remaining.match(/^`(.+?)`/);
    if (codeMatch) {
      nodes.push({ type: "text", text: codeMatch[1], marks: [{ type: "code" }] });
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    const nextSpecial = remaining.search(/\*\*|\*|`|\[/);
    if (nextSpecial === -1) {
      nodes.push({ type: "text", text: remaining });
      break;
    }

    if (nextSpecial > 0) {
      nodes.push({ type: "text", text: remaining.slice(0, nextSpecial) });
      remaining = remaining.slice(nextSpecial);
      continue;
    }

    nodes.push({ type: "text", text: remaining[0] });
    remaining = remaining.slice(1);
  }

  return nodes;
}

function paragraphFromMarkdown(text: string): JSONContent {
  const trimmed = text.trim();
  return {
    type: "paragraph",
    content: trimmed ? parseInlineMarkdown(trimmed) : undefined,
  };
}

/** Upgrade plain-text nodes that still contain markdown markers (legacy AI imports). */
export function enrichRichDoc(doc: JSONContent): JSONContent {
  const enrichTextNode = (node: JSONContent): JSONContent => {
    if (
      node.type === "text" &&
      node.text &&
      !node.marks?.length &&
      (node.text.includes("**") || node.text.includes("*") || node.text.includes("`"))
    ) {
      return { type: "paragraph", content: parseInlineMarkdown(node.text) };
    }

    if (node.content?.length) {
      const enrichedChildren = node.content.flatMap((child) => {
        if (
          (node.type === "paragraph" || node.type === "heading") &&
          child.type === "text" &&
          child.text &&
          !child.marks?.length &&
          (child.text.includes("**") || child.text.includes("*") || child.text.includes("`"))
        ) {
          return parseInlineMarkdown(child.text);
        }
        return [enrichTextNode(child)];
      });

      return { ...node, content: enrichedChildren };
    }

    return node;
  };

  if (doc.type === "doc" && doc.content) {
    return { ...doc, content: doc.content.map(enrichTextNode) };
  }

  return enrichTextNode(doc);
}

/** Basic markdown → TipTap for AI import and legacy posts */
export function markdownToRichDoc(markdown: string): JSONContent {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const content: JSONContent[] = [];
  let paragraphBuffer: string[] = [];
  let listBuffer: { type: "bullet" | "ordered"; items: string[] } | null = null;
  let codeBlock: { language: string; lines: string[] } | null = null;
  let tableBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length) {
      content.push(paragraphFromMarkdown(paragraphBuffer.join(" ")));
      paragraphBuffer = [];
    }
  };

  const flushList = () => {
    if (!listBuffer?.items.length) {
      listBuffer = null;
      return;
    }
    content.push({
      type: listBuffer.type === "ordered" ? "orderedList" : "bulletList",
      content: listBuffer.items.map((item) => ({
        type: "listItem",
        content: [paragraphFromMarkdown(item)],
      })),
    });
    listBuffer = null;
  };

  const flushCodeBlock = () => {
    if (!codeBlock) {
      return;
    }
    const codeText = codeBlock.lines.join("\n");
    content.push({
      type: "codeBlock",
      attrs: { language: codeBlock.language || null },
      content: codeText ? [{ type: "text", text: codeText }] : undefined,
    });
    codeBlock = null;
  };

  const flushTable = () => {
    if (!tableBuffer.length) {
      return;
    }
    const table = tableFromMarkdownRows(tableBuffer);
    if (table) {
      content.push(table);
    } else {
      paragraphBuffer.push(...tableBuffer);
    }
    tableBuffer = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (codeBlock) {
      if (trimmed === "```") {
        flushCodeBlock();
      } else {
        codeBlock.lines.push(line);
      }
      continue;
    }

    if (trimmed.startsWith("```")) {
      flushParagraph();
      flushList();
      flushTable();
      codeBlock = {
        language: trimmed.slice(3).trim().toLowerCase(),
        lines: [],
      };
      continue;
    }

    if (isTableRow(trimmed)) {
      flushParagraph();
      flushList();
      tableBuffer.push(trimmed);
      continue;
    }

    if (tableBuffer.length) {
      flushTable();
    }

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (YOUTUBE_LINE.test(trimmed)) {
      flushParagraph();
      flushList();
      content.push({
        type: "youtube",
        attrs: { src: trimmed },
      });
      continue;
    }

    const heading = trimmed.match(/^#{1,3}\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = trimmed.startsWith("###") ? 3 : trimmed.startsWith("##") ? 2 : 1;
      content.push({
        type: "heading",
        attrs: { level },
        content: parseInlineMarkdown(heading[1]),
      });
      continue;
    }

    const image = trimmed.match(/^!\[(.*?)\]\((.+)\)$/);
    if (image) {
      flushParagraph();
      flushList();
      content.push({
        type: "image",
        attrs: { src: image[2], alt: image[1] || "" },
      });
      continue;
    }

    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      if (!listBuffer || listBuffer.type !== "bullet") {
        flushList();
        listBuffer = { type: "bullet", items: [] };
      }
      listBuffer.items.push(bullet[1]);
      continue;
    }

    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      flushParagraph();
      if (!listBuffer || listBuffer.type !== "ordered") {
        flushList();
        listBuffer = { type: "ordered", items: [] };
      }
      listBuffer.items.push(ordered[1]);
      continue;
    }

    flushList();
    paragraphBuffer.push(trimmed);
  }

  flushParagraph();
  flushList();
  flushTable();
  flushCodeBlock();

  return content.length ? { type: "doc", content } : EMPTY_RICH_DOC;
}

export function getRenderableBody(input: {
  contentFormat: ContentFormat;
  bodyJson: string | null;
  content: string;
}): { format: ContentFormat; doc: JSONContent; markdown: string } {
  if (input.contentFormat === "RICH" && input.bodyJson) {
    return {
      format: "RICH",
      doc: enrichRichDoc(parseRichDoc(input.bodyJson)),
      markdown: input.content,
    };
  }
  const doc = enrichRichDoc(markdownToRichDoc(input.content));
  return { format: "MARKDOWN", doc, markdown: input.content };
}
