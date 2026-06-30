"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type DropdownItem = {
  href: string;
  label: string;
  desc?: string;
};

type PopupInfo = {
  badge: string;
  desc: string;
};

type NavLink = {
  href: string;
  label: string;
  dropdown?: DropdownItem[];
  popup?: PopupInfo;
};

const NAV_LINKS: NavLink[] = [
  { 
    href: "/", 
    label: "Home",
    popup: { badge: "Sanatana Dharma", desc: "Reviving heritage & elevating communities across Tamil Nadu." }
  },
  {
    label: "About Us",
    href: "/about",
    dropdown: [
      { href: "/about", label: "Overview", desc: "Our history & foundation" },
      { href: "/vision-mission", label: "Vision & Mission", desc: "Guided by Light, Rooted in Dharma" },
      { href: "/founder-message", label: "Founder's Message", desc: "Words of leadership & wisdom" },
    ],
  },
  { 
    href: "/programs", 
    label: "Programs",
    popup: { badge: "6 Core Pillars", desc: "Temple Restoration, Annadanam, Education & Spiritual Welfare." }
  },
  { 
    href: "/events", 
    label: "Events",
    popup: { badge: "Complete Schedule", desc: "Discover upcoming heritage discourses & community gatherings." }
  },
  { 
    href: "/news", 
    label: "News & Media",
    popup: { badge: "Press & Impact", desc: "Read recent announcements, articles, and field reports." }
  },
  { 
    href: "/gallery", 
    label: "Gallery",
    popup: { badge: "Visual Chronicles", desc: "Witness ancient architectural revival & volunteer service." }
  },
  { 
    href: "/partnership", 
    label: "Partnership",
    popup: { badge: "Collaborate", desc: "CSR alliances, temple patronage, and institutional support." }
  },
  { 
    href: "/contact", 
    label: "Contact Us",
    popup: { badge: "Get In Touch", desc: "Reach our offices in Chennai & Tiruvannamalai or inquire online." }
  },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setIsScrolledPastHero(window.scrollY > 550);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setHoveredDropdown(null);
  }, [pathname]);

  const isTransparentHero = pathname === "/" && !isScrolledPastHero;

  return (
    <header
      className={`${pathname === "/" ? "fixed" : "sticky"} top-4 left-0 right-0 w-full font-label-lg z-50 px-4 sm:px-6 pointer-events-none transition-all duration-300`}
      id="main-nav"
    >
      <div
        className={`pointer-events-auto mx-auto max-w-[1300px] rounded-full border flex justify-between items-center px-5 sm:px-6 py-2 transition-all duration-300 ${
          isTransparentHero
            ? "bg-black/25 hover:bg-black/40 backdrop-blur-md shadow-lg border-white/20 text-white"
            : isScrolled
            ? "bg-ethereal-white/95 dark:bg-deep-forest/95 backdrop-blur-2xl shadow-xl border-outline-variant/30 text-on-surface"
            : "bg-ethereal-white/85 dark:bg-deep-forest/85 backdrop-blur-md shadow-md border-outline-variant/30 text-on-surface"
        }`}
      >
        <Link
          href="/"
          className="flex items-center hover:scale-105 transition-transform duration-300 py-1 shrink-0 mr-4"
        >
          {/* Light Mode Logo */}
          <img
            src="/logo-horizontal.png"
            alt="Dhara Foundations"
            className={`h-7 sm:h-8 md:h-9 w-auto object-contain transition-transform ${
              isTransparentHero ? "hidden" : "block dark:hidden drop-shadow-sm"
            }`}
          />
          {/* Dark Mode Logo */}
          <img
            src="/logo-horizontal-dark.png"
            alt="Dhara Foundations"
            className={`h-7 sm:h-8 md:h-9 w-auto object-contain transition-transform ${
              isTransparentHero ? "block drop-shadow-md" : "hidden dark:block drop-shadow-sm"
            }`}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5">
          {NAV_LINKS.map((link) => {
            const isTopActive =
              pathname === link.href ||
              (link.dropdown && link.dropdown.some((d) => d.href === pathname));

            if (link.dropdown) {
              return (
                <div
                  key={link.label}
                  className="relative py-1 group/drop"
                  onMouseEnter={() => setHoveredDropdown(link.label)}
                  onMouseLeave={() => setHoveredDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`relative inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full transition-all text-xs lg:text-sm ${
                      isTopActive
                        ? isTransparentHero
                          ? "bg-white/20 text-saffron-glow font-bold"
                          : "bg-primary/10 dark:bg-saffron-glow/15 text-primary dark:text-saffron-glow font-bold"
                        : isTransparentHero
                        ? "text-white/90 hover:text-saffron-glow hover:bg-white/10 font-semibold"
                        : "text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-saffron-glow hover:bg-surface-container/50 font-semibold"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="material-symbols-outlined text-sm transition-transform duration-300 group-hover/drop:rotate-180">
                      expand_more
                    </span>
                    {isTopActive && (
                      <motion.div
                        layoutId="lamp-desktop"
                        className="absolute inset-0 w-full bg-primary/5 dark:bg-saffron-glow/5 rounded-full -z-10"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary dark:bg-saffron-glow rounded-t-full">
                          <div className="absolute w-12 h-6 bg-primary/30 dark:bg-saffron-glow/30 rounded-full blur-md -top-2 -left-2" />
                          <div className="absolute w-8 h-6 bg-primary/30 dark:bg-saffron-glow/30 rounded-full blur-md -top-1" />
                          <div className="absolute w-4 h-4 bg-primary/30 dark:bg-saffron-glow/30 rounded-full blur-sm top-0 left-2" />
                        </div>
                      </motion.div>
                    )}
                  </Link>

                  <AnimatePresence>
                    {hoveredDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 w-64 bg-surface-container-lowest/95 dark:bg-deep-forest/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-outline-variant/25 p-2 z-50"
                      >
                        {link.dropdown.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`block p-3 rounded-xl transition-all duration-200 group/sub ${
                                isSubActive
                                  ? "bg-primary text-ethereal-white dark:bg-saffron-glow dark:text-deep-forest font-bold shadow-sm"
                                  : "hover:bg-surface-container/60 text-on-surface dark:text-ethereal-white"
                              }`}
                            >
                              <div className={`text-sm font-semibold transition-colors ${!isSubActive && "group-hover/sub:text-primary dark:group-hover/sub:text-saffron-glow"}`}>
                                {subItem.label}
                              </div>
                              {subItem.desc && (
                                <div className={`text-[11px] font-normal mt-0.5 leading-tight ${isSubActive ? "text-ethereal-white/90 dark:text-deep-forest/90" : "text-on-surface-variant/80 dark:text-surface-variant/80"}`}>
                                  {subItem.desc}
                                </div>
                              )}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <div
                key={link.href}
                className="relative py-1 group/item"
                onMouseEnter={() => setHoveredDropdown(link.label)}
                onMouseLeave={() => setHoveredDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`relative inline-block px-3.5 py-1.5 rounded-full transition-all text-xs lg:text-sm hover:-translate-y-0.5 ${
                    isTopActive
                      ? isTransparentHero
                        ? "bg-white/20 text-saffron-glow font-bold"
                        : "bg-primary/10 dark:bg-saffron-glow/15 text-primary dark:text-saffron-glow font-bold"
                      : isTransparentHero
                      ? "text-white/90 hover:text-saffron-glow hover:bg-white/10 font-semibold"
                      : "text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-saffron-glow hover:bg-surface-container/50 font-semibold"
                  }`}
                >
                  {link.label}
                  {isTopActive && (
                    <motion.div
                      layoutId="lamp-desktop"
                      className="absolute inset-0 w-full bg-primary/5 dark:bg-saffron-glow/5 rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary dark:bg-saffron-glow rounded-t-full">
                        <div className="absolute w-12 h-6 bg-primary/30 dark:bg-saffron-glow/30 rounded-full blur-md -top-2 -left-2" />
                        <div className="absolute w-8 h-6 bg-primary/30 dark:bg-saffron-glow/30 rounded-full blur-md -top-1" />
                        <div className="absolute w-4 h-4 bg-primary/30 dark:bg-saffron-glow/30 rounded-full blur-sm top-0 left-2" />
                      </div>
                    </motion.div>
                  )}
                </Link>

                <AnimatePresence>
                  {hoveredDropdown === link.label && link.popup && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.94 }}
                      transition={{ type: "spring", stiffness: 380, damping: 25 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60 bg-surface-container-lowest/95 dark:bg-deep-forest/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-outline-variant/30 p-3.5 z-50 pointer-events-none"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary dark:bg-saffron-glow/15 dark:text-saffron-glow">
                          {link.popup.badge}
                        </span>
                        <span className="material-symbols-outlined text-sm text-primary dark:text-saffron-glow">
                          arrow_forward
                        </span>
                      </div>
                      <div className="text-xs font-bold text-on-surface dark:text-ethereal-white mb-1">
                        {link.label}
                      </div>
                      <div className="text-[11px] leading-relaxed text-on-surface-variant/90 dark:text-surface-variant/90 font-normal">
                        {link.popup.desc}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Donate Now CTA */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-primary to-amber-600 dark:from-saffron-glow dark:to-amber-500 text-ethereal-white dark:text-deep-forest rounded-full hover:scale-105 active:scale-95 shadow-md hover:shadow-lg transition-all duration-300 font-label-lg font-bold tracking-wide text-xs md:text-sm"
          >
            Donate Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 rounded-full transition-colors ${
            isTransparentHero
              ? "text-white hover:bg-white/10"
              : "text-on-surface dark:text-ethereal-white hover:bg-surface-container"
          }`}
          aria-label="Toggle Navigation Menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="pointer-events-auto lg:hidden mt-3 mx-auto max-w-[1380px] bg-ethereal-white/95 dark:bg-deep-forest/95 backdrop-blur-2xl rounded-3xl border border-outline-variant/30 overflow-hidden shadow-2xl p-6"
          >
            <div className="flex flex-col space-y-3 max-h-[75vh] overflow-y-auto">
              {NAV_LINKS.map((link, i) => {
                const isTopActive =
                  pathname === link.href ||
                  (link.dropdown && link.dropdown.some((d) => d.href === pathname));

                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="space-y-2"
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between text-base px-4 py-2.5 rounded-full transition-all ${
                        isTopActive
                          ? "bg-primary text-ethereal-white dark:bg-saffron-glow dark:text-deep-forest font-bold shadow-sm"
                          : "text-on-surface dark:text-ethereal-white font-medium hover:bg-surface-container/50"
                      }`}
                    >
                      <span>{link.label}</span>
                    </Link>

                    {link.dropdown && (
                      <div className="pl-4 ml-3 border-l-2 border-outline-variant/30 flex flex-col gap-2 pt-1">
                        {link.dropdown.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`text-sm px-4 py-2 rounded-full transition-colors ${
                                isSubActive
                                  ? "bg-primary/20 text-primary dark:text-saffron-glow font-bold"
                                  : "text-on-surface-variant dark:text-surface-variant hover:text-primary"
                              }`}
                            >
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                );
              })}

              <div className="pt-4 border-t border-outline-variant/20 flex flex-col gap-3 sm:hidden">
                <Link
                  href="/contact"
                  className="w-full text-center px-6 py-3 bg-gradient-to-r from-primary to-amber-600 dark:from-saffron-glow dark:to-amber-500 text-ethereal-white dark:text-deep-forest rounded-full font-bold shadow-md"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
