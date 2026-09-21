"use client";

import "@/styles/rich-article.css";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { JSONContent } from "@tiptap/react";

import {
  markdownToRichDoc,
  parseRichDoc,
  RICH_EXTENSIONS,
  serializeRichDoc,
} from "@/lib/rich-content/document";

import {
  EditorInsertDialog,
  type EditorDialogKind,
} from "@/components/rich-content/EditorInsertDialog";
import { useMotion } from "@/components/motion/MotionProvider";

type SavedSelection = { from: number; to: number };

type RichArticleEditorProps = {
  value: string | null;
  onChange: (json: string, plainText: string) => void;
  placeholder?: string;
  className?: string;
};

type ToolbarButtonProps = {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  title?: string;
};

function ToolbarDivider() {
  return <span className="mx-1 h-5 w-px shrink-0 bg-[var(--admin-border)]" aria-hidden />;
}

function ToolbarButton({ onClick, active, disabled, label, title }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title ?? label}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={`inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? "bg-[var(--admin-text)] text-[var(--admin-surface)]"
          : "text-[var(--admin-text-secondary)] hover:bg-[var(--admin-surface)] hover:text-[var(--admin-text)]"
      }`}
    >
      {label}
    </button>
  );
}

function insertAtSelection(editor: Editor, selection: SavedSelection | null, content: JSONContent | JSONContent[]) {
  const { from, to } = selection ?? editor.state.selection;
  const chain = editor.chain().focus().setTextSelection({ from, to });

  if (from !== to) {
    chain.deleteSelection();
  }

  chain.insertContent(content).run();
}

export function RichArticleEditor({
  value,
  onChange,
  placeholder,
  className = "",
}: RichArticleEditorProps) {
  const [dialogKind, setDialogKind] = useState<EditorDialogKind | null>(null);
  const [dialogInitial, setDialogInitial] = useState<Record<string, string>>({});
  const [canRemoveLink, setCanRemoveLink] = useState(false);
  const [scrollLocked, setScrollLocked] = useState(false);
  const savedSelection = useRef<SavedSelection | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { lockPageScroll, unlockPageScroll } = useMotion();

  const editor = useEditor({
    extensions: RICH_EXTENSIONS,
    content: parseRichDoc(value),
    editorProps: {
      attributes: {
        class: "rich-article rich-article-editor min-h-[320px] px-6 py-6 focus:outline-none",
        "data-placeholder": placeholder ?? "Tell your story…",
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChange(serializeRichDoc(ed.getJSON()), ed.getText());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor) return;
    const parsed = parseRichDoc(value);
    const current = JSON.stringify(editor.getJSON());
    const incoming = JSON.stringify(parsed);
    if (current !== incoming) {
      editor.commands.setContent(parsed, { emitUpdate: false });
    }
  }, [editor, value]);

  useEffect(() => {
    if (!scrollLocked) return;
    lockPageScroll();
    return () => unlockPageScroll();
  }, [scrollLocked, lockPageScroll, unlockPageScroll]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      if (!scrollLocked) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        const delta = event.deltaY;
        const canScrollUp = scrollTop > 0;
        const canScrollDown = scrollTop + clientHeight < scrollHeight - 1;

        if ((delta > 0 && canScrollDown) || (delta < 0 && canScrollUp)) {
          event.preventDefault();
          container.scrollTop += delta;
        }
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const { scrollTop, scrollHeight, clientHeight } = container;
      const delta = event.deltaY;
      const canScrollUp = scrollTop > 0;
      const canScrollDown = scrollTop + clientHeight < scrollHeight - 1;

      if ((delta > 0 && canScrollDown) || (delta < 0 && canScrollUp)) {
        container.scrollTop += delta;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [editor, scrollLocked]);

  useEffect(() => {
    if (!scrollLocked) return;

    const blockOutsideScroll = (event: Event) => {
      if (!scrollContainerRef.current?.contains(event.target as Node)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    document.addEventListener("wheel", blockOutsideScroll, { passive: false, capture: true });
    document.addEventListener("touchmove", blockOutsideScroll, { passive: false, capture: true });

    return () => {
      document.removeEventListener("wheel", blockOutsideScroll, { capture: true });
      document.removeEventListener("touchmove", blockOutsideScroll, { capture: true });
    };
  }, [scrollLocked]);

  const captureSelection = useCallback(() => {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    savedSelection.current = { from, to };
  }, [editor]);

  const openLinkDialog = useCallback(() => {
    if (!editor) return;
    captureSelection();
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
    );
    setCanRemoveLink(Boolean(previousUrl));
    setDialogInitial({
      text: selectedText,
      url: previousUrl ?? "https://",
    });
    setDialogKind("link");
  }, [captureSelection, editor]);

  const openImageDialog = useCallback(() => {
    captureSelection();
    setDialogInitial({});
    setCanRemoveLink(false);
    setDialogKind("image");
  }, [captureSelection]);

  const openVideoDialog = useCallback(() => {
    captureSelection();
    setDialogInitial({});
    setCanRemoveLink(false);
    setDialogKind("video");
  }, [captureSelection]);

  const openMermaidDialog = useCallback(() => {
    captureSelection();
    setDialogInitial({
      source: "flowchart TD\n  A[Plant data] --> B[Stamped prescriptions]",
    });
    setCanRemoveLink(false);
    setDialogKind("mermaid");
  }, [captureSelection]);

  const handleLinkSubmit = useCallback(
    (values: Record<string, string>) => {
      if (!editor) return;
      const href = values.url.trim();
      const displayText = values.text.trim();

      if (!href) {
        setDialogKind(null);
        return;
      }

      if (editor.isActive("link") && canRemoveLink) {
        editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
        setDialogKind(null);
        savedSelection.current = null;
        return;
      }

      if (!displayText) {
        return;
      }

      insertAtSelection(editor, savedSelection.current, {
        type: "text",
        text: displayText,
        marks: [{ type: "link", attrs: { href } }],
      });

      savedSelection.current = null;
      setDialogKind(null);
    },
    [canRemoveLink, editor],
  );

  const handleRemoveLink = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    savedSelection.current = null;
    setDialogKind(null);
  }, [editor]);

  const handleDialogSubmit = useCallback(
    (values: Record<string, string>) => {
      if (!editor) return;

      if (dialogKind === "link") {
        handleLinkSubmit(values);
        return;
      }

      if (dialogKind === "image") {
        const src = values.src.trim();
        const alt = values.alt.trim();
        const caption = values.caption.trim();
        if (src) {
          const nodes: JSONContent[] = [
            {
              type: "image",
              attrs: { src, alt: alt || caption || "Image" },
            },
          ];
          if (caption) {
            nodes.push({
              type: "paragraph",
              content: [{ type: "text", text: caption, marks: [{ type: "italic" }] }],
            });
          }
          insertAtSelection(editor, savedSelection.current, nodes);
        }
      }

      if (dialogKind === "video") {
        const url = values.url.trim();
        if (url) {
          insertAtSelection(editor, savedSelection.current, {
            type: "youtube",
            attrs: { src: url },
          });
        }
      }

      if (dialogKind === "mermaid") {
        const source = values.source.trim();
        if (source) {
          insertAtSelection(editor, savedSelection.current, {
            type: "codeBlock",
            attrs: { language: "mermaid" },
            content: [{ type: "text", text: source }],
          });
        }
      }

      savedSelection.current = null;
      setDialogKind(null);
    },
    [dialogKind, editor, handleLinkSubmit],
  );

  const insertTable = useCallback(() => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  if (!editor) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)] text-sm text-[var(--admin-text-muted)]">
        Loading editor…
      </div>
    );
  }

  return (
    <>
      <div
        className={`flex max-h-[min(72vh,calc(100vh-11rem))] flex-col overflow-hidden rounded-xl border bg-[var(--admin-surface)] shadow-sm ${
          scrollLocked
            ? "border-[var(--admin-accent)] ring-2 ring-[var(--admin-focus)]"
            : "border-[var(--admin-border)]"
        } ${className}`}
      >
        <div className="z-10 shrink-0 border-b border-[var(--admin-border-subtle)] bg-[var(--admin-panel)]">
          <div className="flex flex-wrap items-center gap-0.5 px-2 py-2">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-0.5">
            <ToolbarButton
              label="Undo"
              title="Undo (Ctrl+Z)"
              disabled={!editor.can().undo()}
              onClick={() => editor.chain().focus().undo().run()}
            />
            <ToolbarButton
              label="Redo"
              title="Redo (Ctrl+Y)"
              disabled={!editor.can().redo()}
              onClick={() => editor.chain().focus().redo().run()}
            />

            <ToolbarDivider />

            <ToolbarButton
              label="H1"
              title="Heading 1"
              active={editor.isActive("heading", { level: 1 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            />
            <ToolbarButton
              label="H2"
              title="Heading 2"
              active={editor.isActive("heading", { level: 2 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            />
            <ToolbarButton
              label="H3"
              title="Heading 3"
              active={editor.isActive("heading", { level: 3 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            />
            <ToolbarButton
              label="Bold"
              title="Bold (Ctrl+B)"
              active={editor.isActive("bold")}
              onClick={() => editor.chain().focus().toggleBold().run()}
            />
            <ToolbarButton
              label="Italic"
              title="Italic (Ctrl+I)"
              active={editor.isActive("italic")}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            />
            <ToolbarButton
              label="Underline"
              title="Underline (Ctrl+U)"
              active={editor.isActive("underline")}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            />
            <ToolbarButton
              label="Code"
              title="Inline code"
              active={editor.isActive("code")}
              onClick={() => editor.chain().focus().toggleCode().run()}
            />

            <ToolbarDivider />

            <ToolbarButton
              label="Quote"
              title="Blockquote"
              active={editor.isActive("blockquote")}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            />
            <ToolbarButton
              label="Bullets"
              title="Bullet list"
              active={editor.isActive("bulletList")}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            />
            <ToolbarButton
              label="Numbers"
              title="Numbered list"
              active={editor.isActive("orderedList")}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            />
            <ToolbarButton
              label="Rule"
              title="Horizontal rule"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            />

            <ToolbarDivider />

            <ToolbarButton
              label="Link"
              title="Insert linked text at cursor"
              active={editor.isActive("link")}
              onClick={openLinkDialog}
            />
            <ToolbarButton label="Image" title="Insert image at cursor" onClick={openImageDialog} />
            <ToolbarButton label="Video" title="Embed YouTube at cursor" onClick={openVideoDialog} />
            <ToolbarButton label="Diagram" title="Insert Mermaid diagram" onClick={openMermaidDialog} />
            <ToolbarButton
              label="Table"
              title="Insert 3×3 table with header row"
              active={editor.isActive("table")}
              onClick={insertTable}
            />

            {editor.isActive("table") ? (
              <>
                <ToolbarDivider />
                <ToolbarButton
                  label="+Col"
                  title="Add column after"
                  onClick={() => editor.chain().focus().addColumnAfter().run()}
                />
                <ToolbarButton
                  label="+Row"
                  title="Add row after"
                  onClick={() => editor.chain().focus().addRowAfter().run()}
                />
                <ToolbarButton
                  label="−Col"
                  title="Delete column"
                  onClick={() => editor.chain().focus().deleteColumn().run()}
                />
                <ToolbarButton
                  label="−Row"
                  title="Delete row"
                  onClick={() => editor.chain().focus().deleteRow().run()}
                />
                <ToolbarButton
                  label="Del table"
                  title="Delete table"
                  onClick={() => editor.chain().focus().deleteTable().run()}
                />
              </>
            ) : null}
            </div>

            <ToolbarDivider />
            <ToolbarButton
              label={scrollLocked ? "Unlock" : "Lock"}
              title={
                scrollLocked
                  ? "Unlock - page scroll works again"
                  : "Lock - only the editor area scrolls, not the page"
              }
              active={scrollLocked}
              onClick={() => setScrollLocked((locked) => !locked)}
            />
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain"
        >
          <EditorContent editor={editor} />
        </div>
      </div>

      <EditorInsertDialog
        kind={dialogKind}
        onClose={() => {
          savedSelection.current = null;
          setDialogKind(null);
        }}
        onSubmit={handleDialogSubmit}
        initialValues={dialogInitial}
        canRemoveLink={canRemoveLink}
        onRemoveLink={handleRemoveLink}
      />
    </>
  );
}

export function richDocFromMarkdown(markdown: string): JSONContent {
  return markdown.trim()
    ? markdownToRichDoc(markdown)
    : { type: "doc", content: [{ type: "paragraph" }] };
}
