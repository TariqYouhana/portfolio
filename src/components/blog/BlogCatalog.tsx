"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Search, Tag, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostItem {
  slug: string;
  entry: {
    title: string;
    excerpt?: string | null;
    category?: string | null;
    tags?: readonly string[] | null;
    publish_date?: string | null;
  };
}

interface BlogCatalogProps {
  posts: PostItem[];
}

const CATEGORIES = [
  { label: "All Dispatches", value: "all" },
  { label: "Data", value: "data" },
  { label: "Software", value: "software" },
  { label: "History", value: "history" },
  { label: "Film", value: "film" },
  { label: "Poetry", value: "poetry" },
  { label: "Life", value: "life" },
];

export function BlogCatalog({ posts }: BlogCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCat =
        selectedCategory === "all" ||
        (post.entry.category &&
          post.entry.category.toLowerCase() === selectedCategory.toLowerCase());

      const query = searchQuery.trim().toLowerCase();
      const matchQuery =
        !query ||
        post.entry.title.toLowerCase().includes(query) ||
        (post.entry.excerpt && post.entry.excerpt.toLowerCase().includes(query)) ||
        (post.entry.tags &&
          post.entry.tags.some((t) => t.toLowerCase().includes(query)));

      return matchCat && matchQuery;
    });
  }, [posts, selectedCategory, searchQuery]);

  // The very first post acts as the featured post when viewing "all" with no active search
  const isDefaultView = selectedCategory === "all" && !searchQuery.trim();
  const featuredPost = isDefaultView ? posts[0] : null;
  const gridPosts = isDefaultView ? filteredPosts.slice(1) : filteredPosts;

  return (
    <div className="space-y-12">
      {/* FEATURED POST HERO (when on unfiltered all-posts view) */}
      {featuredPost && (
        <article className="relative p-8 md:p-12 rounded-glass glass-panel border border-border overflow-hidden group hover:border-text/50 transition-all duration-300 shadow-xl">
          <div className="max-w-3xl space-y-5">
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-signal/10 border border-signal/30 text-signal font-semibold uppercase tracking-wider">
                FEATURED DISPATCH
              </span>
              <span className="text-muted">
                {featuredPost.entry.category?.toUpperCase() || "ESSAY"}
              </span>
              <span className="text-muted/60">·</span>
              <span className="text-muted flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {featuredPost.entry.publish_date
                    ? new Date(featuredPost.entry.publish_date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Recent"}
                </span>
              </span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-text group-hover:text-signal transition-colors leading-[0.95]">
              <Link href={`/blog/${featuredPost.slug}`}>
                {featuredPost.entry.title}
              </Link>
            </h2>

            {featuredPost.entry.excerpt && (
              <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl">
                {featuredPost.entry.excerpt}
              </p>
            )}

            {featuredPost.entry.tags && featuredPost.entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {featuredPost.entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-surface border border-border text-muted"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-4">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-text text-bg font-semibold text-xs font-mono uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                <span>Read Full Essay</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </article>
      )}

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-4 border-t border-border">
        {/* Category Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all border",
                  isActive
                    ? "bg-text text-bg border-text font-semibold shadow-md"
                    : "bg-surface border-border text-muted hover:border-text/40 hover:text-text"
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search titles, tags, or topics..."
            className="w-full pl-9 pr-8 py-2 rounded-lg bg-surface border border-border text-xs font-mono text-text placeholder:text-muted/60 focus:outline-none focus:border-text transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-text"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* RESULTS COUNT */}
      <div className="flex items-center justify-between text-xs font-mono text-muted">
        <span>
          {filteredPosts.length} {filteredPosts.length === 1 ? "DISPATCH" : "DISPATCHES"} FOUND
        </span>
        {(selectedCategory !== "all" || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="text-signal hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* ARTICLE GRID */}
      {gridPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridPosts.map((post) => {
            const formattedDate = post.entry.publish_date
              ? new Date(post.entry.publish_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Recent";

            return (
              <article
                key={post.slug}
                className="group p-6 rounded-glass glass-panel border border-border hover:border-text/50 transition-all flex flex-col justify-between shadow-sm hover:shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-signal uppercase font-semibold">
                      {post.entry.category || "General"}
                    </span>
                    <span className="text-muted flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      <span>{formattedDate}</span>
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl uppercase tracking-tight text-text group-hover:text-signal transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.entry.title}
                    </Link>
                  </h3>

                  {post.entry.excerpt && (
                    <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-3">
                      {post.entry.excerpt}
                    </p>
                  )}

                  {post.entry.tags && post.entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.entry.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface border border-border/70 text-muted"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-mono text-muted group-hover:text-text">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>5 MIN READ</span>
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-signal hover:underline"
                  >
                    <span>Read Essay</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="p-16 rounded-glass glass-panel border border-border text-center space-y-4">
          <BookOpen className="w-10 h-10 text-muted mx-auto" />
          <h3 className="font-display font-bold text-xl uppercase text-text">
            No Dispatches Match Criteria
          </h3>
          <p className="text-xs font-mono text-muted max-w-sm mx-auto">
            Try adjusting your search query or selecting a different category tab.
          </p>
        </div>
      )}
    </div>
  );
}
