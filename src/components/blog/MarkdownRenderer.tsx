import React from "react";
import Markdoc from "@markdoc/markdoc";
import { cn } from "@/lib/utils";
import { getHeadingText } from "@/lib/markdoc";
import { CopyButton } from "@/components/blog/CopyButton";

function CodeBlock({ children, language, content }: { children: React.ReactNode; language?: string; content?: string }) {
  return (
    <div className="relative my-6 rounded-lg border border-border bg-[#161513] overflow-hidden group">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/40 bg-surface/40 text-xs font-mono text-muted">
        <span>{language ? language.toUpperCase() : "TERMINAL // CODE"}</span>
        <CopyButton text={content || ""} />
      </div>
      <div className="p-4 overflow-x-auto font-mono text-xs sm:text-sm text-[#EDE6D3] leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function Heading2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="scroll-mt-32 font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-text mt-12 mb-4 group flex items-baseline gap-2"
    >
      <a href={`#${id}`} className="hover:text-signal transition-colors">
        {children}
      </a>
      <span className="opacity-0 group-hover:opacity-100 text-signal font-mono text-base transition-opacity">
        #
      </span>
    </h2>
  );
}

function Heading3({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h3
      id={id}
      className="scroll-mt-32 font-display font-bold text-xl sm:text-2xl uppercase tracking-tight text-text mt-8 mb-3 group flex items-baseline gap-2"
    >
      <a href={`#${id}`} className="hover:text-signal transition-colors">
        {children}
      </a>
      <span className="opacity-0 group-hover:opacity-100 text-signal font-mono text-sm transition-opacity">
        #
      </span>
    </h3>
  );
}

function Blockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-6 pl-5 border-l-2 border-signal bg-surface/30 p-4 rounded-r-lg font-accent italic text-base sm:text-lg text-text/90 leading-relaxed">
      {children}
    </blockquote>
  );
}

interface MarkdownRendererProps {
  contentNode: any;
  isPoetry?: boolean;
}

export function MarkdownRenderer({ contentNode, isPoetry = false }: MarkdownRendererProps) {
  if (!contentNode) {
    return null;
  }

  const ast = contentNode.node || contentNode;
  const config = {
    nodes: {
      heading: {
        transform(node: any, config: any) {
          const level = node.attributes.level;
          const text = getHeadingText(node);
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          const children = node.transformChildren(config);
          if (level === 2) {
            return new Markdoc.Tag("Heading2", { id }, children);
          }
          if (level === 3) {
            return new Markdoc.Tag("Heading3", { id }, children);
          }
          return new Markdoc.Tag(`h${level}`, { id }, children);
        },
      },
      fence: {
        render: "CodeBlock",
        attributes: {
          language: { type: String },
          content: { type: String },
        },
        transform(node: any, config: any) {
          const attributes = node.transformAttributes(config);
          const children = node.transformChildren(config);
          return new Markdoc.Tag("CodeBlock", { ...attributes, content: node.attributes.content }, children);
        },
      },
      blockquote: {
        render: "Blockquote",
      },
    },
  };

  const renderable = Markdoc.transform(ast, config);

  const components = {
    Heading2,
    Heading3,
    CodeBlock,
    Blockquote,
  };

  return (
    <div
      className={cn(
        "prose prose-invert max-w-none text-muted leading-relaxed",
        isPoetry && "whitespace-pre-line font-accent text-lg sm:text-xl italic text-text/90 leading-loose"
      )}
    >
      {Markdoc.renderers.react(renderable, React, { components })}
    </div>
  );
}
