"use client";

import React, { useState, useEffect, useRef } from "react";
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
    href: "/gallery", 
    label: "Sevas",
    dropdown: [
      { href: "/gallery?category=Charity", label: "Charity", desc: "Humanitarian & Community Welfare" },
      { href: "/gallery?category=Sanatana+Dharma", label: "Sanatana Dharma", desc: "Temple & Heritage Preservation" },
    ],
    popup: { badge: "Divine & Social Seva", desc: "Witness ancient architectural revival & volunteer charity service." }
  },
  { 
    href: "/events", 
    label: "Events",
    dropdown: [
      { href: "https://dhara-divine-awards-2025.vercel.app/", label: "Dhara Divine Awards", desc: "Awardees, highlights & video archives" },
    ],
    popup: { badge: "Complete Schedule", desc: "Discover upcoming heritage discourses & community gatherings." }
  },
  { 
    href: "/news", 
    label: "News & Media",
    popup: { badge: "Press & Impact", desc: "Read recent announcements, articles, and field reports." }
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
  const navRef = useRef<HTMLElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; height: number; opacity: number }>({
    left: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [dynamicLinks, setDynamicLinks] = useState<NavLink[]>(NAV_LINKS);

  useEffect(() => {
    fetch(`/api/public/flagship-page?t=${Date.now()}`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        const portalUrl = data?.config?.spotlight?.portal_url || data?.config?.ceremony?.portal_url;
        if (portalUrl) {
          setDynamicLinks((prev) =>
            prev.map((item) => {
              if (item.label === "Events" && item.dropdown) {
                return {
                  ...item,
                  dropdown: item.dropdown.map((d) =>
                    d.label === "Dhara Divine Awards" ? { ...d, href: portalUrl } : d
                  )
                };
              }
              return item;
            })
          );
        }
      })
      .catch((err) => console.warn("Header dynamic links fetch error:", err));
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      if (!navRef.current) return;
      const activeElement = navRef.current.querySelector(`[data-nav-active="true"]`) as HTMLElement;
      if (activeElement) {
        setIndicatorStyle({
          left: activeElement.offsetLeft,
          width: activeElement.offsetWidth,
          height: activeElement.offsetHeight,
          opacity: 1,
        });
      } else {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    const timer = setTimeout(updateIndicator, 50);
    return () => {
      window.removeEventListener("resize", updateIndicator);
      clearTimeout(timer);
    };
  }, [pathname]);

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

  const isTransparentHero = false;

  return (
    <header
      className="sticky top-4 left-0 right-0 w-full font-label-lg z-50 px-4 sm:px-6 pointer-events-none transition-all duration-300"
      id="main-nav"
    >
      <div
        className={`pointer-events-auto mx-auto max-w-[1340px] rounded-full border flex justify-between items-center px-5 sm:px-7 py-2.5 sm:py-3 transition-all duration-300 ${
          isScrolled
            ? "bg-deep-forest/95 backdrop-blur-2xl shadow-2xl border-ethereal-white/20 text-ethereal-white"
            : "bg-deep-forest/90 backdrop-blur-md shadow-xl border-ethereal-white/20 text-ethereal-white"
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 hover:opacity-95 transition-all hover:scale-[1.03] shrink-0 ml-2 sm:ml-4 mr-4 group/logo"
        >
          <img
            src="/logo-icon-only.png?v=10"
            alt="Dhara Foundations Emblem"
            className="h-11 w-11 sm:h-13 sm:w-13 object-contain block shrink-0"
          />
          <div className="flex flex-col justify-center py-0.5 w-[102px] sm:w-[116px]">
            <div className="flex justify-between items-center w-full font-heading font-black text-[15.5px] sm:text-[17.5px] text-ethereal-white group-hover/logo:text-saffron-glow transition-colors leading-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
              {"DHARA".split("").map((char, idx) => (
                <span key={idx}>{char}</span>
              ))}
            </div>
            <div className="flex justify-between items-center w-full font-title font-extrabold text-[7.2px] sm:text-[8.2px] text-saffron-glow uppercase leading-tight mt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              {"FOUNDATIONS".split("").map((char, idx) => (
                <span key={idx}>{char}</span>
              ))}
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav ref={navRef} className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 relative">
          {dynamicLinks.map((link) => {
            const isTopActive =
              pathname === link.href ||
              (link.dropdown && link.dropdown.some((d) => d.href === pathname));

            if (link.dropdown) {
              return (
                <div
                  key={link.label}
                  data-nav-active={isTopActive ? "true" : "false"}
                  className="relative py-1 group/drop"
                  onMouseEnter={() => setHoveredDropdown(link.label)}
                  onMouseLeave={() => setHoveredDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`relative inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full transition-all text-[15px] lg:text-[17px] ${
                      isTopActive
                        ? "bg-saffron-glow/20 text-saffron-glow font-extrabold tracking-wide"
                        : "text-ethereal-white/90 hover:text-saffron-glow hover:bg-white/10 font-extrabold tracking-wide"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="material-symbols-outlined text-sm transition-transform duration-300 group-hover/drop:rotate-180">
                      expand_more
                    </span>
                  </Link>

                  <AnimatePresence>
                    {hoveredDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 w-64 bg-deep-forest/98 backdrop-blur-2xl rounded-2xl shadow-2xl border border-ethereal-white/20 p-2 z-50"
                      >
                        {link.dropdown.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          const isExternal = subItem.href.startsWith("http");
                          return (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              target={isExternal ? "_blank" : undefined}
                              rel={isExternal ? "noopener noreferrer" : undefined}
                              className={`block p-3 rounded-xl transition-all duration-200 group/sub ${
                                isSubActive
                                  ? "bg-saffron-glow text-deep-forest font-extrabold shadow-sm"
                                  : "hover:bg-white/10 text-ethereal-white"
                              }`}
                            >
                              <div className={`text-sm font-extrabold transition-colors ${!isSubActive && "group-hover/sub:text-saffron-glow"}`}>
                                {subItem.label}
                              </div>
                              {subItem.desc && (
                                <div className={`text-[11px] font-normal mt-0.5 leading-tight ${isSubActive ? "text-deep-forest/90" : "text-ethereal-white/80"}`}>
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
                data-nav-active={isTopActive ? "true" : "false"}
                className="relative py-1 group/item"
                onMouseEnter={() => setHoveredDropdown(link.label)}
                onMouseLeave={() => setHoveredDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`relative inline-block px-3.5 py-1.5 rounded-full transition-all text-[15px] lg:text-[17px] hover:-translate-y-0.5 ${
                    isTopActive
                      ? "bg-saffron-glow/20 text-saffron-glow font-extrabold tracking-wide"
                      : "text-ethereal-white/90 hover:text-saffron-glow hover:bg-white/10 font-extrabold tracking-wide"
                  }`}
                >
                  {link.label}
                </Link>

                <AnimatePresence>
                  {hoveredDropdown === link.label && link.popup && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.94 }}
                      transition={{ type: "spring", stiffness: 380, damping: 25 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60 bg-deep-forest/98 backdrop-blur-2xl rounded-2xl shadow-2xl border border-ethereal-white/20 p-3.5 z-50 pointer-events-none"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-saffron-glow/20 text-saffron-glow">
                          {link.popup.badge}
                        </span>
                        <span className="material-symbols-outlined text-sm text-saffron-glow">
                          arrow_forward
                        </span>
                      </div>
                      <div className="text-xs font-bold text-ethereal-white mb-1">
                        {link.label}
                      </div>
                      <div className="text-[11px] leading-relaxed text-ethereal-white/80 font-normal">
                        {link.popup.desc}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Single Sliding Horizontal Active Indicator */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 rounded-full pointer-events-none -z-10"
            initial={false}
            animate={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              height: indicatorStyle.height || 32,
              opacity: indicatorStyle.opacity,
            }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 32,
            }}
          >
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-saffron-glow rounded-t-full">
              <div className="absolute w-12 h-6 bg-saffron-glow/30 rounded-full blur-md -top-2 -left-2" />
              <div className="absolute w-8 h-6 bg-saffron-glow/30 rounded-full blur-md -top-1" />
              <div className="absolute w-4 h-4 bg-saffron-glow/30 rounded-full blur-sm top-0 left-2" />
            </div>
          </motion.div>
        </nav>

        {/* Donate Now CTA with Corner Brackets Hover Effect */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <div className="relative group/btn inline-flex items-center justify-center p-1.5 sm:p-2">
            {/* Top-Left Corner Bracket (Appears on Hover) */}
            <span className="absolute top-0 left-0 w-3.5 h-3.5 sm:w-4 sm:h-4 border-t-2 border-l-2 border-saffron-glow rounded-tl-[4px] opacity-0 scale-75 transition-all duration-300 ease-out group-hover/btn:opacity-100 group-hover/btn:scale-100" />
            {/* Top-Right Corner Bracket (Appears on Hover) */}
            <span className="absolute top-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 border-t-2 border-r-2 border-saffron-glow rounded-tr-[4px] opacity-0 scale-75 transition-all duration-300 ease-out group-hover/btn:opacity-100 group-hover/btn:scale-100" />
            {/* Bottom-Left Corner Bracket (Appears on Hover) */}
            <span className="absolute bottom-0 left-0 w-3.5 h-3.5 sm:w-4 sm:h-4 border-b-2 border-l-2 border-saffron-glow rounded-bl-[4px] opacity-0 scale-75 transition-all duration-300 ease-out group-hover/btn:opacity-100 group-hover/btn:scale-100" />
            {/* Bottom-Right Corner Bracket (Appears on Hover) */}
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 border-b-2 border-r-2 border-saffron-glow rounded-br-[4px] opacity-0 scale-75 transition-all duration-300 ease-out group-hover/btn:opacity-100 group-hover/btn:scale-100" />

            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 lg:px-7 lg:py-3 bg-saffron-glow text-deep-forest rounded-full shadow-md hover:bg-white hover:text-deep-forest transition-all duration-300 font-extrabold tracking-wide text-sm lg:text-base hover:scale-[1.02] active:scale-95"
            >
              Donate Now
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-full transition-colors text-ethereal-white hover:bg-white/10"
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
            className="pointer-events-auto lg:hidden mt-3 mx-auto max-w-[1380px] bg-deep-forest/95 backdrop-blur-2xl rounded-3xl border border-ethereal-white/20 overflow-hidden shadow-2xl p-6 text-ethereal-white"
          >
            <div className="flex flex-col space-y-1.5 py-4">
              {dynamicLinks.map((link, i) => {
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
                      className={`flex items-center justify-between text-lg px-4 py-2.5 rounded-full transition-all ${
                        isTopActive
                          ? "bg-saffron-glow text-deep-forest font-extrabold shadow-sm"
                          : "text-ethereal-white font-bold hover:bg-white/10"
                      }`}
                    >
                      <span>{link.label}</span>
                    </Link>

                    {link.dropdown && (
                      <div className="pl-4 ml-3 border-l-2 border-ethereal-white/20 flex flex-col gap-2 pt-1">
                        {link.dropdown.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          const isExternal = sub.href.startsWith("http");
                          return (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              target={isExternal ? "_blank" : undefined}
                              rel={isExternal ? "noopener noreferrer" : undefined}
                              className={`text-sm px-4 py-2 rounded-full transition-colors ${
                                isSubActive
                                  ? "bg-saffron-glow/20 text-saffron-glow font-bold"
                                  : "text-ethereal-white/80 hover:text-saffron-glow font-bold"
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

              <div className="pt-4 border-t border-ethereal-white/20 flex flex-col gap-3 sm:hidden">
                <div className="relative group/btn inline-flex items-center justify-center p-1.5 w-full">
                  <span className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-saffron-glow rounded-tl-[4px] opacity-0 scale-75 transition-all duration-300 ease-out group-hover/btn:opacity-100 group-hover/btn:scale-100" />
                  <span className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-saffron-glow rounded-tr-[4px] opacity-0 scale-75 transition-all duration-300 ease-out group-hover/btn:opacity-100 group-hover/btn:scale-100" />
                  <span className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-saffron-glow rounded-bl-[4px] opacity-0 scale-75 transition-all duration-300 ease-out group-hover/btn:opacity-100 group-hover/btn:scale-100" />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-saffron-glow rounded-br-[4px] opacity-0 scale-75 transition-all duration-300 ease-out group-hover/btn:opacity-100 group-hover/btn:scale-100" />
                  <Link
                    href="/contact"
                    className="w-full text-center px-6 py-3 bg-saffron-glow text-deep-forest hover:bg-white rounded-full font-extrabold tracking-wide text-base shadow-md transition-all"
                  >
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
