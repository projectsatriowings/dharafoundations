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

type NavLink = {
  href: string;
  label: string;
  dropdown?: DropdownItem[];
};

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  {
    label: "About Us",
    href: "/about",
    dropdown: [
      { href: "/about", label: "Overview", desc: "Our history & foundation" },
      { href: "/vision-mission", label: "Vision & Mission", desc: "Guided by Light, Rooted in Dharma" },
      { href: "/founder-message", label: "Founder's Message", desc: "Words of leadership & wisdom" },
    ],
  },
  { href: "/programs", label: "Programs" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News & Media" },
  { href: "/gallery", label: "Gallery" },
  { href: "/partnership", label: "Partnership" },
  { href: "/contact", label: "Contact Us" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  return (
    <header
      className={`sticky top-0 left-0 right-0 w-full font-label-lg text-label-lg z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-ethereal-white/90 dark:bg-deep-forest/90 backdrop-blur-xl shadow-md py-3"
          : "bg-ethereal-white/75 dark:bg-deep-forest/75 backdrop-blur-md shadow-sm py-4"
      }`}
      id="main-nav"
    >
      <div className="flex justify-between items-center w-full px-4 sm:px-6 md:px-8 lg:px-10 max-w-[1440px] mx-auto">
        <Link
          href="/"
          className="flex items-center hover:scale-105 transition-transform duration-300 py-1 shrink-0 mr-4"
        >
          {/* Light Mode Logo */}
          <img
            src="/logo-horizontal.png"
            alt="Dhara Foundations"
            className="h-10 sm:h-11 md:h-12 w-auto object-contain block dark:hidden drop-shadow-sm transition-transform"
          />
          {/* Dark Mode Logo */}
          <img
            src="/logo-horizontal-dark.png"
            alt="Dhara Foundations"
            className="h-10 sm:h-11 md:h-12 w-auto object-contain hidden dark:block drop-shadow-sm transition-transform"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {NAV_LINKS.map((link) => {
            const isTopActive =
              pathname === link.href ||
              (link.dropdown && link.dropdown.some((d) => d.href === pathname));

            if (link.dropdown) {
              return (
                <div
                  key={link.label}
                  className="relative py-2 group/drop"
                  onMouseEnter={() => setHoveredDropdown(link.label)}
                  onMouseLeave={() => setHoveredDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`inline-flex items-center gap-1 py-1 text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-saffron-glow transition-colors text-sm xl:text-base ${
                      isTopActive ? "text-primary dark:text-saffron-glow font-bold" : ""
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover/drop:rotate-180">
                      expand_more
                    </span>
                    <span
                      className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-primary dark:bg-saffron-glow transition-all duration-300 ${
                        isTopActive ? "w-full" : "w-0 group-hover/drop:w-full"
                      }`}
                    />
                  </Link>

                  <AnimatePresence>
                    {hoveredDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 w-64 bg-surface-container-lowest/95 dark:bg-deep-forest/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-outline-variant/25 p-2 z-50"
                      >
                        {link.dropdown.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`block p-3 rounded-xl transition-all duration-200 group/sub ${
                                isSubActive
                                  ? "bg-primary/15 text-primary dark:text-saffron-glow font-bold"
                                  : "hover:bg-surface-container/60 text-on-surface dark:text-ethereal-white"
                              }`}
                            >
                              <div className="text-sm font-semibold group-hover/sub:text-primary dark:group-hover/sub:text-saffron-glow transition-colors">
                                {subItem.label}
                              </div>
                              {subItem.desc && (
                                <div className="text-[11px] text-on-surface-variant/80 dark:text-surface-variant/80 font-normal mt-0.5 leading-tight">
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
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-saffron-glow transition-colors text-sm xl:text-base ${
                  isTopActive ? "text-primary dark:text-saffron-glow font-bold" : ""
                }`}
              >
                <span>{link.label}</span>
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary dark:bg-saffron-glow transition-all duration-300 ${
                    isTopActive ? "w-full" : "w-0 hover:w-full group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Donate Now CTA */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-on-primary rounded-full hover:scale-105 active:scale-95 hover:shadow-[inset_0_0_10px_rgba(255,210,127,0.3)] transition-all duration-300 font-label-lg font-semibold tracking-wide text-sm md:text-base"
          >
            Donate Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-on-surface dark:text-ethereal-white p-2 rounded-lg hover:bg-surface-container transition-colors"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-ethereal-white dark:bg-deep-forest border-b border-outline-variant/20 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col px-margin-mobile py-6 space-y-4 max-h-[80vh] overflow-y-auto">
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
                      className={`flex items-center justify-between text-lg py-1.5 ${
                        isTopActive
                          ? "text-primary dark:text-saffron-glow font-bold pl-2 border-l-4 border-primary"
                          : "text-on-surface dark:text-ethereal-white font-medium"
                      }`}
                    >
                      <span>{link.label}</span>
                    </Link>

                    {link.dropdown && (
                      <div className="pl-4 ml-1 border-l-2 border-outline-variant/30 flex flex-col gap-2.5 pt-1">
                        {link.dropdown.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`text-sm py-1 transition-colors ${
                                isSubActive
                                  ? "text-primary dark:text-saffron-glow font-bold"
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
                  className="w-full text-center px-6 py-3 bg-primary text-on-primary rounded-full font-semibold shadow-md"
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
