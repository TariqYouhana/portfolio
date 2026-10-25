import Link from "next/link";
import { ArrowRight, UserCheck, Terminal, Compass, BookOpen } from "lucide-react";
import { SiteSettings } from "@/lib/content";

interface AboutPreviewProps {
  settings: SiteSettings;
}

export function AboutPreview({ settings }: AboutPreviewProps) {
  return (
    <section
      aria-label="About the Engineer"
      className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Portrait Frame / Archival Plate (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-glass overflow-hidden border border-border bg-surface p-2 shadow-2xl">
            {/* Archival paper plate aesthetic */}
            <div className="relative aspect-[4/5] w-full rounded-xl bg-gradient-to-b from-[#1E1D1B] to-[#121211] border border-border/40 flex flex-col justify-between p-6 overflow-hidden">
              <div className="flex items-center justify-between z-10">
                <span className="font-mono text-xs text-signal font-semibold">
                  PLATE_NO // 01-A
                </span>
                <span className="font-mono text-xs text-muted">
                  ARCHIVAL SPECIMEN
                </span>
              </div>

              {/* Monochromatic portrait graphic / emblem representation */}
              <div className="my-auto flex flex-col items-center justify-center text-center space-y-3 z-10">
                <div className="w-20 h-20 rounded-full border border-border/60 bg-surface/80 flex items-center justify-center shadow-inner">
                  <UserCheck className="w-10 h-10 text-text/80" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg uppercase tracking-wide text-text">
                    Tariq Youhana Leon
                  </h3>
                  <p className="text-xs font-mono text-muted">
                    Systems Engineer & Archivist
                  </p>
                </div>
              </div>

              {/* Plate footer stamp */}
              <div className="pt-4 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-muted z-10">
                <span>COORD // 23.8° N · 90.4° E</span>
                <span>STATUS // ACTIVE</span>
              </div>

              {/* Subtle background paper grain and corner brackets */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(#EDE6D3 0.75px, transparent 0.75px)",
                  backgroundSize: "16px 16px",
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Bio Narrative & Quick Facts (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase text-signal tracking-widest block">
              DOSSIER // ARCHIVE_01
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-text">
              One Clear Front Door, <span className="font-accent italic font-normal text-signal">many</span> Rooms
            </h2>
          </div>

          <div className="space-y-5 text-muted leading-relaxed text-base sm:text-lg">
            <p>
              {settings.about_short}
            </p>
            <p className="text-sm sm:text-base">
              The principle of this portfolio is architectural honesty: data and software systems take centerstage, followed closely by photography, historical cartography, filmmaking, and poetry. Every discipline is given space to breathe in its own dedicated room.
            </p>
          </div>

          {/* Quick Facts Grid */}
          <div className="pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-surface/50 border border-border flex items-start gap-3">
              <Terminal className="w-4 h-4 text-signal mt-1 flex-shrink-0" />
              <div>
                <span className="font-mono text-xs uppercase text-signal block font-semibold">
                  CORE VOCATION //
                </span>
                <span className="text-xs text-text font-medium">
                  High-throughput data pipelines & distributed systems
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-surface/50 border border-border flex items-start gap-3">
              <Compass className="w-4 h-4 text-signal mt-1 flex-shrink-0" />
              <div>
                <span className="font-mono text-xs uppercase text-signal block font-semibold">
                  HISTORICAL STUDIES //
                </span>
                <span className="text-xs text-text font-medium">
                  Partition cartography & Bengal administrative history
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-surface/50 border border-border flex items-start gap-3">
              <BookOpen className="w-4 h-4 text-signal mt-1 flex-shrink-0" />
              <div>
                <span className="font-mono text-xs uppercase text-signal block font-semibold">
                  CINEMATOGRAPHY //
                </span>
                <span className="text-xs text-text font-medium">
                  35mm analog street photography & chiaroscuro study
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-surface/50 border border-border flex items-start gap-3">
              <UserCheck className="w-4 h-4 text-signal mt-1 flex-shrink-0" />
              <div>
                <span className="font-mono text-xs uppercase text-signal block font-semibold">
                  ENTERPRISE //
                </span>
                <span className="text-xs text-text font-medium">
                  Founder at Tenstral Technologies
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-text hover:text-signal transition-colors group"
            >
              <span>Examine Complete Biography & Timeline</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform text-signal" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
