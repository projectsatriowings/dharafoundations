"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/programs", label: "Programs" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact Us" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 left-0 right-0 w-full font-label-lg text-label-lg z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-ethereal-white/90 dark:bg-deep-forest/90 backdrop-blur-xl shadow-md py-3"
          : "bg-ethereal-white/70 dark:bg-deep-forest/70 backdrop-blur-md shadow-sm py-4"
      }`}
      id="main-nav"
    >
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <Link
          href="/"
          className="flex items-center hover:scale-105 transition-transform duration-300 py-1"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Dhara Foundations"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-saffron-glow transition-colors ${
                  isActive ? "text-primary dark:text-saffron-glow font-bold" : ""
                }`}
              >
                <span>{link.label}</span>
                {/* Center-out expanding underline on hover / active */}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary dark:bg-saffron-glow transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 hover:w-full group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Donate Now CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-on-primary rounded-full hover:scale-105 active:scale-95 hover:shadow-[inset_0_0_10px_rgba(255,210,127,0.3)] transition-all duration-300 font-label-lg font-semibold tracking-wide"
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
            className="lg:hidden bg-ethereal-white dark:bg-deep-forest border-b border-outline-variant/20 overflow-hidden shadow-xl"
          >
            <div className="flex flex-col px-margin-mobile py-6 space-y-4">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={`block text-lg py-2 ${
                      pathname === link.href
                        ? "text-primary dark:text-saffron-glow font-bold pl-2 border-l-4 border-primary"
                        : "text-on-surface dark:text-ethereal-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 border-t border-outline-variant/20 flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="w-full text-center px-6 py-3 bg-primary text-on-primary rounded-full font-semibold"
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
