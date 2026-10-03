"use client";

import "@/styles/rich-article.css";

import mermaid from "mermaid";
import { useEffect, useMemo, useRef } from "react";

import {
  getRenderableBody,
  richDocToHtml,
  type ContentFormat,
} from "@/lib/rich-content/document";

type RichArticleBodyProps = {
  contentFormat?: ContentFormat;
  bodyJson?: string | null;
  content?: string;
  className?: string;
  reading?: boolean;
};

const MERMAID_START =
  /^(flowchart|graph|sequenceDiagram|classDiagram|stateDiagram|erDiagram|gantt|pie|mindmap|timeline|gitGraph|C4Context|sankey-beta|xychart-beta|block-beta)/;

function isMermaidSource(source: string): boolean {
  return MERMAID_START.test(source.trim());
}

async function renderMermaidBlocks(root: HTMLElement) {
  mermaid.initialize({
    startOnLoad: false,
    theme: "neutral",
    securityLevel: "loose",
    fontFamily: "inherit",
  });

  const codes = Array.from(root.querySelectorAll("pre > code"));

  for (const code of codes) {
    const pre = code.parentElement;
    if (!pre || pre.dataset.mermaidProcessed === "true") {
      continue;
    }

    const classLang = Array.from(code.classList)
      .find((className) => className.startsWith("language-"))
      ?.slice("language-".length);

    const source = code.textContent ?? "";
    const language = classLang ?? (isMermaidSource(source) ? "mermaid" : null);

    if (language !== "mermaid" && !isMermaidSource(source)) {
      continue;
    }

    pre.dataset.mermaidProcessed = "true";
    const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`;

    try {
      const { svg } = await mermaid.render(id, source);
      const wrapper = document.createElement("div");
      wrapper.className = "mermaid-diagram";
      wrapper.innerHTML = svg;
      pre.replaceWith(wrapper);
    } catch {
      pre.classList.add("mermaid-error");
    }
  }
}

export function RichArticleBody({
  contentFormat = "RICH",
  bodyJson,
  content = "",
  className = "",
  reading = true,
}: RichArticleBodyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const html = useMemo(() => {
    const { doc } = getRenderableBody({
      contentFormat,
      bodyJson: bodyJson ?? null,
      content,
    });
    // The page title is the only h1; body headings start at h2.
    return richDocToHtml(doc).replace(/<(\/?)h1(?=[\s>])/g, "<$1h2");
  }, [contentFormat, bodyJson, content]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) {
      return;
    }

    void renderMermaidBlocks(root);
  }, [html]);

  return (
    <div
      ref={containerRef}
      className={reading ? `rich-article-reading ${className}`.trim() : className}
    >
      <div className="rich-article" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
