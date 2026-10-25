"use client";

import Link from "next/link";
import { ArrowRight, Layers, Mail } from "lucide-react";
import { SiteSettings } from "@/lib/content";

interface HeroProps {
  settings: SiteSettings;
  projectsCount: number;
}

export function Hero({ settings, projectsCount }: HeroProps) {
  // Parse name into parts so the middle accent word gets Instrument Serif Italic
  const nameParts = settings.display_name.split(" ");
  const firstName = nameParts[0] || "TARIQ";
  const accentName = nameParts.length > 2 ? nameParts[1] : "";
  const lastName =
    nameParts.length > 2
      ? nameParts.slice(2).join(" ")
      : nameParts.slice(1).join(" ") || "LEON";

  return (
    <section
      aria-label="Hero"
      className="relative w-full min-h-[88vh] md:min-h-[92vh] flex flex-col justify-end overflow-hidden pb-16 md:pb-24 pt-12 md:pt-16"
    >
      {/* CINEMATIC BACKGROUND: Optical bokeh, dark vignette, and grain depth (Ref 03) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none"
      >
        {/* Deep dark gradient ground */}
        <div className="absolute inset-0 bg-[#121211]" />

        {/* Soft atmospheric bokeh and warm skin/amber lens flare */}
        <div
          className="absolute -top-[10%] -left-[10%] w-[65vw] h-[65vw] rounded-full opacity-20 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(169, 123, 79, 0.4) 0%, rgba(27, 26, 24, 0) 70%)",
          }}
        />

        {/* Subtle cyan optical lens reflection (from spectacle lens in Ref 03) */}
        <div
          className="absolute top-[30%] left-[25%] w-[35vw] h-[35vw] rounded-full opacity-10 blur-[90px]"
          style={{
            background:
              "radial-gradient(circle, rgba(70, 160, 180, 0.35) 0%, rgba(18, 18, 17, 0) 65%)",
          }}
        />

        {/* Rich dark vignette around bottom and edges for text contrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(18, 18, 17, 0.4) 0%, rgba(18, 18, 17, 0.75) 60%, #121211 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-10 space-y-10">
        {/* Status tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/80 backdrop-blur-md border border-border text-xs font-mono text-signal">
          <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
          <span>PORTFOLIO_ARCHIVE // 2026</span>
        </div>

        {/* MAIN HEADLINE (Reference 03 typography tension) */}
        <div className="space-y-4 max-w-5xl">
          <h1 className="font-display font-black uppercase tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.92] text-text">
            <span>{firstName}</span>{" "}
            {accentName && (
              <span className="font-accent italic font-normal text-signal tracking-normal lowercase text-[1.1em] align-baseline px-1">
                {accentName}
              </span>
            )}{" "}
            <span>{lastName}</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted font-normal max-w-2xl leading-relaxed pt-2">
            {settings.tagline}
          </p>
        </div>

        {/* FILM-CREDIT STYLE METADATA BLOCK (Reference 03 direct recreation) */}
        {settings.hero_credit_lines && settings.hero_credit_lines.length > 0 && (
          <div className="pt-8 border-t border-border/60 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl">
            {settings.hero_credit_lines.map((credit) => (
              <div key={credit.label} className="space-y-1">
                <span className="block font-mono text-xs uppercase tracking-wider text-signal font-semibold">
                  {credit.label} {"//"}
                </span>
                <span className="block text-xs sm:text-sm font-medium text-text tracking-wide">
                  {credit.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* CALL TO ACTION BUTTONS (Rule 2: Cream with charcoal text, secondary outlined) */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#EDE6D3] text-[#1B1A18] font-semibold text-sm hover:opacity-95 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            <Layers className="w-4 h-4 text-[#1B1A18]" />
            <span>Explore Projects ({projectsCount})</span>
            <ArrowRight className="w-4 h-4 text-[#1B1A18] transform group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-surface/80 border border-border text-text font-medium text-sm hover:border-text/60 hover:bg-surface transition-all active:scale-[0.98]"
          >
            <Mail className="w-4 h-4 text-muted" />
            <span>Get in Touch</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
