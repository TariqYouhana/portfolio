import type { Metadata } from "next";
import { getPosts } from "@/lib/content";
import { BlogCatalog } from "@/components/blog/BlogCatalog";

export const metadata: Metadata = {
  title: "Essays & Dispatches · Tariq Youhana Leon",
  description:
    "Writings on distributed data architecture, regional cartography, 35mm optical cinematography, and poetry.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-3">
        <span className="font-mono text-xs uppercase text-signal tracking-widest block">
          DISPATCHES // {String(posts.length).padStart(2, "0")} ENTRIES
        </span>
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-text leading-[0.9]">
          Notes &{" "}
          <span className="font-accent italic font-normal text-signal">
            essays
          </span>
        </h1>
        <p className="text-sm md:text-base text-muted max-w-2xl leading-relaxed">
          Technical post-mortems, cartographic research, reflections on 35mm film grain, and verse. Formatted for quiet editorial reading.
        </p>
      </div>

      {/* Main Blog Catalog */}
      <BlogCatalog posts={posts} />
    </div>
  );
}
