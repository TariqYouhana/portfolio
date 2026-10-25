import type { Metadata } from "next";
import Link from "next/link";
import { Download, ArrowUpRight } from "lucide-react";
import { getSiteSettings } from "@/lib/content";
import { Timeline } from "@/components/about/Timeline";
import { InterestsCatalog } from "@/components/about/InterestsCatalog";
import { NowSection } from "@/components/about/NowSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Data engineer, distributed systems architect, historian, and filmmaker. Learn about Tariq Youhana Leon's trajectory, disciplines, and current work.",
  openGraph: {
    title: "About — Tariq Youhana Leon",
    description:
      "Trajectory, milestones, disciplines, and current research. The person behind the portfolio.",
    url: "https://tariqleon.com/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Tariq Youhana Leon",
    description: "Trajectory, milestones, disciplines, and current research.",
  },
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-24">
      {/* ── Header ── */}
      <section className="space-y-6">
        <span className="font-mono text-xs uppercase text-signal tracking-widest font-semibold">
          ABOUT // PERSON &amp; PERSPECTIVE
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Portrait plate */}
          <div className="relative aspect-[3/4] max-w-sm w-full rounded-glass overflow-hidden border border-border bg-surface/60 flex items-center justify-center">
            {/* Placeholder portrait — replace with real image once uploaded */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-surface via-[#1e1c18] to-surface"
              aria-hidden="true"
            />
            <span className="relative font-mono text-xs text-muted/40 uppercase tracking-widest select-none">
              PORTRAIT — TYL
            </span>

            {/* Decorative corner rule */}
            <span
              className="absolute top-4 right-4 w-8 h-8 border-t border-r border-border/60"
              aria-hidden="true"
            />
            <span
              className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-border/60"
              aria-hidden="true"
            />
          </div>

          {/* Biographical narrative */}
          <div className="space-y-6 pt-2">
            <h1 className="font-display font-black text-5xl sm:text-6xl uppercase tracking-tight text-text leading-none">
              {settings.display_name}
            </h1>

            <p className="text-base text-muted leading-relaxed">
              {settings.about_short}
            </p>

            <p className="text-sm text-muted leading-relaxed">
              Grounded in rigorous computer science fundamentals, Tariq works at
              the intersection of distributed data infrastructure and narrative
              craft — engineering high-throughput pipelines by day, tracing
              colonial cartographies and developing analog film by night. Every
              project, technical or cultural, shares the same commitment to
              structural clarity.
            </p>

            {/* Quick-stat chips */}
            <div className="flex flex-wrap gap-3 text-xs font-mono">
              {settings.hero_credit_lines.map((line) => (
                <div
                  key={line.label}
                  className="px-3 py-1.5 rounded bg-surface border border-border space-x-2"
                >
                  <span className="text-signal font-semibold">{line.label}</span>
                  <span className="text-muted">{line.value}</span>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="/brand/cv.pdf"
                download
                className="btn-primary inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Download CV
              </a>
              <Link
                href="/contact"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Get in Touch
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Now Section ── */}
      <NowSection />

      {/* ── Timeline ── */}
      <Timeline />

      {/* ── Interests ── */}
      <InterestsCatalog />
    </div>
  );
}
