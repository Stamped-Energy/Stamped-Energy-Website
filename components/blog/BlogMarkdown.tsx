import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";

type BlogMarkdownProps = {
  content: string;
  className?: string;
};

export function BlogMarkdown({ content, className }: BlogMarkdownProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeSanitize]}
        components={{
          h1: ({ children }) => (
            <h1 className="mt-10 font-display text-3xl font-bold text-on-surface first:mt-0 md:text-4xl">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-10 font-display text-2xl font-bold text-on-surface first:mt-0 md:text-3xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 text-xl font-bold text-on-surface">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mt-4 text-base leading-7 text-on-surface-variant">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-on-surface-variant">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-on-surface-variant">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-7">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-on-surface">{children}</strong>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="font-medium text-primary underline-offset-2 hover:underline"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mt-6 border-l-4 border-primary/40 pl-4 italic text-on-surface-variant">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="mt-6 overflow-x-auto rounded-xl border border-outline-variant/50">
              <table className="min-w-full text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-outline-variant/50 bg-surface-low px-4 py-3 text-left font-semibold text-on-surface">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-outline-variant/30 px-4 py-3 text-on-surface-variant">
              {children}
            </td>
          ),
          hr: () => <hr className="my-8 border-outline-variant/40" />,
          code: ({ children }) => (
            <code className="rounded bg-surface-container px-1.5 py-0.5 text-sm text-on-surface">
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
