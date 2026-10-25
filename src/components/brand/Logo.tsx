"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className, size = 72 }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group relative inline-flex items-center justify-center transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] focus-visible:rounded-full",
        className
      )}
      aria-label="Tariq Youhana Leon - Return to homepage"
    >
      <span
        className="block transition-colors duration-300"
        style={{
          width: size,
          height: size,
          backgroundColor: "var(--logo, var(--signal))",
          maskImage: "url(/brand/logo-full.svg)",
          WebkitMaskImage: "url(/brand/logo-full.svg)",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
        role="img"
        aria-label="Tariq Youhana Leon emblem badge"
      />
    </Link>
  );
}
