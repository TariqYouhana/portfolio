"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface StatItemProps {
  label: string;
  value: number;
  suffix?: string;
  monoCode: string;
}

function AnimatedCounter({ label, value, suffix = "", monoCode }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(shouldReduceMotion ? value : 0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    if (!isInView) return;

    let start = 0;
    const duration = 1000;
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(easedProgress * (value - start) + start);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, value, shouldReduceMotion]);

  return (
    <div
      ref={ref}
      className="flex flex-col p-6 sm:p-8 rounded-glass glass-panel border border-border relative overflow-hidden group hover:border-text/40 transition-colors"
    >
      <span className="font-mono text-xs text-signal font-semibold tracking-wider">
        {monoCode}
      </span>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="font-display font-extrabold text-4xl sm:text-5xl text-text tracking-tight">
          {displayValue}
        </span>
        {suffix && (
          <span className="font-display text-2xl text-signal font-bold">
            {suffix}
          </span>
        )}
      </div>
      <span className="mt-2 text-xs font-mono uppercase text-muted tracking-wide">
        {label}
      </span>
    </div>
  );
}

interface StatsStripProps {
  projectsCount: number;
  postsCount: number;
  photosCount: number;
  achievementsCount: number;
}

export function StatsStrip({
  projectsCount,
  postsCount,
  photosCount,
  achievementsCount,
}: StatsStripProps) {
  const stats = [
    {
      label: "Engineered Projects",
      value: projectsCount,
      monoCode: "METRIC_01 //",
      suffix: "",
    },
    {
      label: "Technical Dispatches",
      value: postsCount,
      monoCode: "METRIC_02 //",
      suffix: "",
    },
    {
      label: "Photographic Spreads",
      value: photosCount,
      monoCode: "METRIC_03 //",
      suffix: "",
    },
    {
      label: "Verified Honors & CTFs",
      value: achievementsCount,
      monoCode: "METRIC_04 //",
      suffix: "",
    },
  ];

  return (
    <section
      aria-label="Key Statistics"
      className="w-full max-w-7xl mx-auto px-6 md:px-10 py-12"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <AnimatedCounter
            key={stat.label}
            label={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            monoCode={stat.monoCode}
          />
        ))}
      </div>
    </section>
  );
}
