import Link from "next/link";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";

interface PostItem {
  slug: string;
  entry: {
    title: string;
    excerpt?: string | null;
    category?: string | null;
    publish_date?: string | null;
  };
}

interface LatestBlogProps {
  posts: PostItem[];
}

export function LatestBlog({ posts }: LatestBlogProps) {
  const latestPosts = posts.slice(0, 3);

  return (
    <section
      aria-label="Latest Essays and Dispatches"
      className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 border-t border-border"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-12 border-b border-border">
        <div className="space-y-3">
          <span className="font-mono text-xs uppercase text-signal tracking-widest block">
            DISPATCHES // ARCHIVE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-text">
            Latest Notes & Essays
          </h2>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text hover:text-signal transition-colors group whitespace-nowrap"
        >
          <span>All Dispatches ({posts.length})</span>
          <ArrowRight className="w-4 h-4 text-signal transform group-hover:translate-x-1.5 transition-transform" />
        </Link>
      </div>

      {latestPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          {latestPosts.map((post) => {
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
                className="group p-6 rounded-glass glass-panel border border-border hover:border-text/50 transition-all flex flex-col justify-between"
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
        <div className="p-12 rounded-glass glass-panel border border-border text-center space-y-3 mt-8">
          <BookOpen className="w-8 h-8 text-muted mx-auto" />
          <h3 className="font-display font-bold text-lg uppercase text-text">
            No Dispatches Published Yet
          </h3>
          <p className="text-xs text-muted max-w-sm mx-auto">
            Essays on distributed data architecture, cinematography, and history are being prepared.
          </p>
        </div>
      )}
    </section>
  );
}
