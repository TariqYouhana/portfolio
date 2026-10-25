"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS_LEFT: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
];

const NAV_ITEMS_RIGHT: NavItem[] = [
  { label: "Achievements", href: "/achievements" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const ALL_NAV_ITEMS = [...NAV_ITEMS_LEFT, ...NAV_ITEMS_RIGHT];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Two-threshold hysteresis to prevent boundary flicker
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y > 80) {
            setIsScrolled(true);
          } else if (y < 40) {
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const transitionConfig = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 350, damping: 30 };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-40 w-full transition-all duration-300 pointer-events-none flex justify-center",
          isScrolled ? "pt-3 px-4" : "pt-4 px-6 md:px-10"
        )}
      >
        <motion.nav
          aria-label="Main Navigation"
          layout={!shouldReduceMotion}
          transition={transitionConfig}
          className={cn(
            "pointer-events-auto relative flex items-center transition-colors duration-300",
            "glass-panel rounded-glass",
            isScrolled
              ? "w-full max-w-4xl py-2 px-3 sm:px-5 justify-between shadow-2xl"
              : "w-full max-w-7xl py-3 px-4 sm:px-6 justify-between"
          )}
        >
          {/* DESKTOP: STATE 1 (Unscrolled - Full Width, Logo Left, Links Right) */}
          {!isScrolled ? (
            <div className="hidden md:flex items-center justify-between w-full">
              {/* Large Logo on Left (~76px) */}
              <motion.div
                layoutId="navbar-logo-container"
                transition={transitionConfig}
                className="flex items-center"
              >
                <Logo size={76} />
              </motion.div>

              {/* Navigation Links + CV Button on Right */}
              <div className="flex items-center gap-1 lg:gap-2">
                <ul className="flex items-center gap-1">
                  {ALL_NAV_ITEMS.map((item) => {
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);
                    return (
                      <li key={item.href} className="relative">
                        <Link
                          href={item.href}
                          className={cn(
                            "relative block px-3 py-1.5 text-sm font-medium tracking-wide transition-colors duration-200 rounded-md",
                            isActive
                              ? "text-text"
                              : "text-muted hover:text-text"
                          )}
                        >
                          {item.label}
                          {isActive && (
                            <motion.span
                              layoutId="active-nav-indicator"
                              transition={transitionConfig}
                              className="absolute bottom-0 left-2 right-2 h-0.5 bg-signal rounded-full"
                            />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* CV Button */}
                <div className="ml-3 pl-3 border-l border-border">
                  <a
                    href="/cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium rounded-md bg-text text-bg hover:opacity-90 transition-opacity"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>CV</span>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            /* DESKTOP: STATE 2 (Scrolled - Compact Segmented Bar with Centered Logo) */
            <div className="hidden md:flex items-center justify-between w-full">
              {/* Left group of tabs */}
              <ul className="flex items-center gap-1">
                {NAV_ITEMS_LEFT.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <li key={item.href} className="relative">
                      <Link
                        href={item.href}
                        className={cn(
                          "relative block px-3 py-1 text-xs lg:text-sm font-medium tracking-wide transition-colors duration-200 rounded-md",
                          isActive
                            ? "text-text font-semibold"
                            : "text-muted hover:text-text"
                        )}
                      >
                        {item.label}
                        {isActive && (
                          <motion.span
                            layoutId="active-nav-indicator"
                            transition={transitionConfig}
                            className="absolute inset-0 bg-white/10 rounded-md -z-10"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Compact Logo Glided to Center (~44px) */}
              <motion.div
                layoutId="navbar-logo-container"
                transition={transitionConfig}
                className="flex items-center justify-center px-4"
              >
                <Logo size={44} />
              </motion.div>

              {/* Right group of tabs + CV */}
              <div className="flex items-center gap-1">
                <ul className="flex items-center gap-1">
                  {NAV_ITEMS_RIGHT.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                      <li key={item.href} className="relative">
                        <Link
                          href={item.href}
                          className={cn(
                            "relative block px-3 py-1 text-xs lg:text-sm font-medium tracking-wide transition-colors duration-200 rounded-md",
                            isActive
                              ? "text-text font-semibold"
                              : "text-muted hover:text-text"
                          )}
                        >
                          {item.label}
                          {isActive && (
                            <motion.span
                              layoutId="active-nav-indicator"
                              transition={transitionConfig}
                              className="absolute inset-0 bg-white/10 rounded-md -z-10"
                            />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* Compact CV */}
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download CV"
                  className="ml-2 inline-flex items-center justify-center p-1.5 rounded-md bg-text text-bg hover:opacity-90 transition-opacity"
                  title="Download Curriculum Vitae"
                >
                  <FileText className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* MOBILE VIEWPORT (< 768px) */}
          <div className="flex md:hidden items-center justify-between w-full">
            <motion.div
              layoutId="mobile-navbar-logo"
              transition={transitionConfig}
              className={cn("flex items-center", isScrolled ? "mx-auto pl-8" : "")}
            >
              <Logo size={isScrolled ? 42 : 56} />
            </motion.div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-text hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-text transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* MOBILE DRAWER / GLASS PANEL */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-24 z-30 md:hidden glass-panel rounded-glass p-6 shadow-2xl"
          >
            <nav aria-label="Mobile Navigation">
              <ul className="flex flex-col gap-3">
                {ALL_NAV_ITEMS.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center justify-between py-2 text-base font-medium transition-colors border-b border-border/50",
                          isActive ? "text-signal font-semibold" : "text-text"
                        )}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-signal" />
                        )}
                      </Link>
                    </li>
                  );
                })}
                <li className="pt-2">
                  <a
                    href="/cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md bg-text text-bg font-medium text-sm"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Download CV (PDF)</span>
                  </a>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
