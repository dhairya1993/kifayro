import React from 'react';
import Link from 'next/link';

interface ArticleContentRendererProps {
  content: string;
}

/**
 * Parses inline markdown:
 * - Links: [text](url)
 * - Bold: **text**
 * - Italic: *text*
 * - Code: `code`
 */
function parseInlineMarkdown(text: string): React.ReactNode[] {
  // Regex to match markdown links, bold, italic, and code tokens
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, i) => {
    if (!part) return null;

    // Link: [text](url)
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (match) {
        const [, label, href] = match;
        const isInternal = href.startsWith('/') || href.startsWith('#');
        if (isInternal) {
          return (
            <Link
              key={i}
              href={href}
              className="text-teal-700 hover:text-teal-900 font-semibold underline decoration-teal-400 hover:decoration-teal-700 transition-colors"
            >
              {label}
            </Link>
          );
        }
        return (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-teal-700 hover:text-teal-900 font-semibold underline decoration-teal-400 hover:decoration-teal-700 transition-colors"
          >
            {label}
          </a>
        );
      }
    }

    // Bold: **text**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={i} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Italic: *text*
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      return (
        <em key={i} className="italic text-slate-800">
          {part.slice(1, -1)}
        </em>
      );
    }

    // Inline code: `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={i}
          className="bg-slate-100 text-teal-900 font-mono text-xs px-1.5 py-0.5 rounded border border-slate-200"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}

export function ArticleContentRenderer({ content }: ArticleContentRendererProps) {
  // Normalize line endings and split into double-newline separated chunks
  const blocks = content
    .replace(/\r\n/g, '\n')
    .trim()
    .split(/\n\n+/);

  return (
    <div className="space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Heading 2: ## ...
        if (trimmed.startsWith('## ')) {
          const text = trimmed.replace(/^##\s+/, '');
          return (
            <h2
              key={idx}
              className="text-xl sm:text-2xl font-black text-slate-900 pt-6 pb-2 border-b border-slate-100 tracking-tight"
            >
              {parseInlineMarkdown(text)}
            </h2>
          );
        }

        // Heading 3: ### ...
        if (trimmed.startsWith('### ')) {
          const text = trimmed.replace(/^###\s+/, '');
          return (
            <h3
              key={idx}
              className="text-lg sm:text-xl font-bold text-slate-900 pt-4 pb-1 tracking-tight"
            >
              {parseInlineMarkdown(text)}
            </h3>
          );
        }

        // Heading 4: #### ...
        if (trimmed.startsWith('#### ')) {
          const text = trimmed.replace(/^####\s+/, '');
          return (
            <h4
              key={idx}
              className="text-base font-semibold text-slate-900 pt-2 pb-0.5 tracking-tight"
            >
              {parseInlineMarkdown(text)}
            </h4>
          );
        }

        // Blockquote: > ...
        if (trimmed.startsWith('> ')) {
          const lines = trimmed
            .split('\n')
            .map((line) => line.replace(/^>\s*/, ''))
            .join(' ');
          return (
            <blockquote
              key={idx}
              className="border-l-4 border-teal-600 bg-teal-50/60 p-4 sm:p-5 rounded-r-2xl my-4 text-xs sm:text-sm text-teal-950 font-medium leading-relaxed"
            >
              {parseInlineMarkdown(lines)}
            </blockquote>
          );
        }

        // Unordered list: starts with - or *
        if (trimmed.split('\n').every((line) => line.trim().startsWith('- ') || line.trim().startsWith('* '))) {
          const items = trimmed
            .split('\n')
            .map((line) => line.trim().replace(/^[-*]\s+/, ''))
            .filter(Boolean);
          return (
            <ul key={idx} className="list-disc pl-5 sm:pl-6 space-y-2 my-4 text-slate-700">
              {items.map((item, i) => (
                <li key={i} className="leading-relaxed">
                  {parseInlineMarkdown(item)}
                </li>
              ))}
            </ul>
          );
        }

        // Ordered list: starts with 1. 2. 3.
        if (trimmed.split('\n').every((line) => /^\d+\.\s+/.test(line.trim()))) {
          const items = trimmed
            .split('\n')
            .map((line) => line.trim().replace(/^\d+\.\s+/, ''))
            .filter(Boolean);
          return (
            <ol key={idx} className="list-decimal pl-5 sm:pl-6 space-y-2 my-4 text-slate-700">
              {items.map((item, i) => (
                <li key={i} className="leading-relaxed">
                  {parseInlineMarkdown(item)}
                </li>
              ))}
            </ol>
          );
        }

        // Regular paragraph with potential single newlines inside
        return (
          <p key={idx} className="leading-relaxed">
            {parseInlineMarkdown(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
