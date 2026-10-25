import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, BookOpen, Calendar, Clock, Tag } from "lucide-react";
import { reader, getPosts } from "@/lib/content";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { extractTableOfContents } from "@/lib/markdoc";
import { ShareButtons } from "@/components/blog/ShareButtons";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await reader.collections.posts.read(slug);
  if (!post) return {};
  return {
    title: `${post.title} · Tariq Youhana Leon`,
    description: post.excerpt || undefined,
    openGraph: {
      title: `${post.title} · Tariq Youhana Leon`,
      description: post.excerpt || undefined,
      type: "article",
      publishedTime: post.publish_date || undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await reader.collections.posts.read(slug);

  if (!post) {
    notFound();
  }

  // Get content node
  const contentNode = await post.content();
  const isPoetry = post.category?.toLowerCase() === "poetry";

  // Table of Contents
  const toc = extractTableOfContents(contentNode);

  // All posts for prev/next and related posts
  const allPosts = await getPosts();
  const currentIdx = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIdx > 0 ? allPosts[currentIdx - 1] : null;
  const nextPost = currentIdx < allPosts.length - 1 ? allPosts[currentIdx + 1] : null;

  // Related posts (same category, excluding current)
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.entry.category === post.category)
    .slice(0, 2);

  const formattedDate = post.publish_date
    ? new Date(post.publish_date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recent";

  return (
    <div className="w-full max-w-5xl mx-auto px-6 md:px-10 py-12 space-y-12">
      {/* Back to archive link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-text transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK TO ALL DISPATCHES</span>
      </Link>

      {/* Article Header */}
      <header className="space-y-6 pb-8 border-b border-border">
        <div className="flex items-center gap-3 text-xs font-mono flex-wrap">
          <span className="px-2.5 py-1 rounded bg-signal/10 border border-signal/30 text-signal font-semibold uppercase tracking-wider">
            {post.category || "ESSAY"}
          </span>
          <span className="text-muted/60">·</span>
          <span className="text-muted flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-signal" />
            <span>{formattedDate}</span>
          </span>
          <span className="text-muted/60">·</span>
          <span className="text-muted flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-signal" />
            <span>5 MIN READ</span>
          </span>
          <span className="text-muted/60">·</span>
          <span className="text-muted">BY TARIQ YOUHANA LEON</span>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-text leading-[0.92]">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg sm:text-xl text-muted leading-relaxed font-normal max-w-3xl">
            {post.excerpt}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2.5 py-1 rounded bg-surface border border-border text-muted"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Main Grid: Article Content + Sticky TOC */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Article Body */}
        <article className="lg:col-span-8 space-y-6">
          <MarkdownRenderer contentNode={contentNode} isPoetry={isPoetry} />

          {/* Share Block */}
          <div className="pt-10 mt-12 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <ShareButtons title={post.title} slug={slug} />
          </div>
        </article>

        {/* Sidebar: Table of Contents & Metadata */}
        <aside className="lg:col-span-4 space-y-8 sticky top-28 hidden lg:block">
          {toc.length > 0 && (
            <div className="p-6 rounded-glass glass-panel border border-border space-y-4">
              <span className="font-mono text-xs text-signal font-semibold uppercase tracking-wider block">
                INDEX // TABLE OF CONTENTS
              </span>
              <nav aria-label="Table of contents">
                <ul className="space-y-2 text-xs font-mono">
                  {toc.map((item) => (
                    <li
                      key={item.id}
                      className={item.level === 3 ? "pl-4 text-muted/70" : "text-muted"}
                    >
                      <a
                        href={`#${item.id}`}
                        className="hover:text-signal transition-colors block py-0.5 line-clamp-1"
                      >
                        {item.level === 3 ? "↳ " : ""}{item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}

          {/* Author Card */}
          <div className="p-6 rounded-glass glass-panel border border-border space-y-3">
            <span className="font-mono text-xs text-signal font-semibold uppercase tracking-wider block">
              AUTHOR // BYLINE
            </span>
            <h4 className="font-display font-bold text-base uppercase text-text">
              Tariq Youhana Leon
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Founder at Tenstral Technologies. Writing on distributed data pipelines, historical cartography, and analog film optics.
            </p>
          </div>
        </aside>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section aria-label="Related dispatches" className="pt-12 border-t border-border space-y-6">
          <span className="font-mono text-xs text-signal font-semibold uppercase tracking-wider block">
            ARCHIVE // RELATED DISPATCHES
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group p-6 rounded-glass glass-panel border border-border hover:border-text/50 transition-all block space-y-2"
              >
                <span className="text-[11px] font-mono text-signal uppercase">
                  {related.entry.category}
                </span>
                <h4 className="font-display font-bold text-lg uppercase text-text group-hover:text-signal transition-colors">
                  {related.entry.title}
                </h4>
                {related.entry.excerpt && (
                  <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                    {related.entry.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Prev / Next Navigation */}
      <nav
        aria-label="Previous and next posts"
        className="pt-8 border-t border-border grid grid-cols-2 gap-4"
      >
        <div>
          {prevPost && (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="group flex flex-col gap-1 p-4 rounded-lg border border-border hover:border-text/40 transition-colors"
            >
              <span className="font-mono text-[10px] text-muted uppercase flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" />
                <span>Previous Dispatch</span>
              </span>
              <span className="font-display font-bold text-sm uppercase text-text group-hover:text-signal transition-colors line-clamp-1">
                {prevPost.entry.title}
              </span>
            </Link>
          )}
        </div>
        <div className="flex justify-end">
          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group flex flex-col gap-1 p-4 rounded-lg border border-border hover:border-text/40 transition-colors text-right"
            >
              <span className="font-mono text-[10px] text-muted uppercase flex items-center justify-end gap-1">
                <span>Next Dispatch</span>
                <ArrowUpRight className="w-3 h-3" />
              </span>
              <span className="font-display font-bold text-sm uppercase text-text group-hover:text-signal transition-colors line-clamp-1">
                {nextPost.entry.title}
              </span>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
