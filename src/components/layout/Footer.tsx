"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
  Mail,
  MapPin,
  ArrowUpRight,
  FileText,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";

interface FooterProps {
  displayName?: string;
}

export function Footer({ displayName = "TARIQ YOUHANA LEON" }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll-linked progress for the giant wordmark reveal
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  // Rises into view from below, progress tightly bound to scrollbar
  const yTransform = useTransform(scrollYProgress, [0, 1], ["35%", "0%"]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 1]);

  return (
    <footer
      ref={footerRef}
      className="relative z-10 w-full overflow-hidden bg-bg border-t border-border pt-16 md:pt-24 text-text transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* TOP SECTION: Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 pb-16">
          {/* Column 1: Brand & Bio note */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Logo size={48} />
              <div className="flex flex-col">
                <span className="font-display font-bold text-base tracking-wide uppercase">
                  Tariq Y. Leon
                </span>
                <span className="text-xs font-mono text-muted">
                  Data & Software Engineering
                </span>
              </div>
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              One clear front door, many rooms. Building intelligent systems,
              curating history, and capturing visual narratives.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-muted">
              Rooms //
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/projects" className="hover:text-signal transition-colors">
                  Projects & Case Studies
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-signal transition-colors">
                  Journal & Photography
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-signal transition-colors">
                  Achievements & Trophies
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-signal transition-colors">
                  Essays & Notes
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-signal transition-colors">
                  About & Milestones
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Status */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-muted">
              Contact //
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2 text-muted">
                <Mail className="w-4 h-4 text-text flex-shrink-0" />
                <a
                  href="mailto:contact@tariqleon.com"
                  className="hover:text-signal transition-colors"
                >
                  contact@tariqleon.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted">
                <MapPin className="w-4 h-4 text-text flex-shrink-0" />
                <span>Available remotely & worldwide</span>
              </li>
              <li className="pt-2">
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text hover:text-signal transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Curriculum Vitae (PDF)</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Channels */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-muted">
              Network //
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "GitHub", href: "https://github.com", icon: Github },
                { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
                { name: "Instagram", href: "https://instagram.com", icon: Instagram },
                { name: "YouTube", href: "https://youtube.com", icon: Youtube },
                { name: "Facebook", href: "https://facebook.com", icon: Facebook },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-surface border border-border text-muted hover:text-text hover:border-text transition-colors"
                    aria-label={`Visit Tariq's ${item.name} profile`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
            <p className="text-xs text-muted pt-2">
              © {new Date().getFullYear()} Tariq Youhana Leon. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Architectural Full-Width Wordmark (Adobe Reference Style) */}
      <div className="relative w-full overflow-hidden border-t border-border/40 select-none pointer-events-none">
        <motion.div
          style={{
            y: shouldReduceMotion ? "0%" : yTransform,
            opacity: shouldReduceMotion ? 1 : opacityTransform,
          }}
          className="w-full flex justify-center items-end"
        >
          <span
            className="block text-center font-display font-black tracking-tighter text-text uppercase text-[12vw] sm:text-[12.5vw] md:text-[13vw] leading-[0.78] translate-y-[6%]"
            aria-hidden="true"
          >
            {displayName}
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
