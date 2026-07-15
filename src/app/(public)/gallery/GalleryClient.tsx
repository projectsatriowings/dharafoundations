"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, Clock, MapPin, ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { PillButton } from "@/components/ui/PillButton";

const PHOTO_FILTERS = ["All Sevas", "Charity", "Sanatana Dharma"];

export interface GalleryClientProps {
  initialPhotos: any[];
  initialEvents?: any[];
}

const isDharmaCategory = (rawCat: string) => {
  const cat = (rawCat || "").toLowerCase().trim();
  if (cat === "sanatana_dharma" || cat === "sanatana dharma" || cat.includes("temple") || cat.includes("dharma") || cat.includes("girivalam") || cat.includes("pooja") || cat.includes("sanatana")) {
    return true;
  }
  if (
    cat === "charity" ||
    cat.includes("children") ||
    cat.includes("education") ||
    cat.includes("charity") ||
    cat.includes("welfare") ||
    cat.includes("livelihood") ||
    cat.includes("shg") ||
    cat.includes("anna daanam") ||
    cat.includes("women") ||
    cat.includes("empowerment")
  ) {
    return false;
  }
  return true;
};

const formatDisplayDate = (val: any): string => {
  if (!val) return "Upcoming";
  if (typeof val === "object" && val instanceof Date) {
    return val.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
  }
  const str = String(val);
  if (str.includes("T") || str.match(/^\d{4}-\d{2}-\d{2}/)) {
    const parsed = new Date(str);
    if (!isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
    }
  }
  return str;
};

function EventCard({ ev, router }: { ev: any; router: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest("a")) {
          router.push(`/sevas/${ev.id}`);
        }
      }}
      className="bg-white rounded-3xl border border-[#D9CBB0]/60 overflow-hidden shadow-md hover:shadow-2xl transition-all group cursor-pointer flex flex-col sm:flex-row h-full"
    >
      <div className="sm:w-2/5 h-56 sm:h-auto relative overflow-hidden bg-surface-container shrink-0">
        <motion.img
          variants={{ hover: { scale: 1.08 } }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          src={ev.img || "/images/event-1.png"}
          alt={ev.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-deep-forest text-saffron-glow px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow">
          {ev.category}
        </div>
      </div>

      <div className="p-6 flex flex-col justify-between flex-1 space-y-4 text-left">
        <div className="space-y-3">
          <div className="space-y-1 text-xs font-mono text-primary">
            <div className="flex items-center gap-1.5 font-bold">
              <Calendar size={14} />
              <span>{formatDisplayDate(ev.date || ev.event_date)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <Clock size={14} />
              <span>{ev.time}</span>
            </div>
          </div>

          <h3 className="font-headline-sm text-lg font-bold text-deep-forest leading-snug group-hover:text-primary transition-colors">
            <Link href={`/sevas/${ev.id}`} className="hover:underline">
              {ev.title}
            </Link>
          </h3>

          <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed line-clamp-3">
            {ev.desc}
          </p>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-gray-100 mt-2">
          <a
            href={ev.mapsUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-xs font-medium text-deep-forest hover:text-primary transition-colors z-10"
          >
            <MapPin size={13} className="text-primary shrink-0" />
            <span className="line-clamp-1 underline">{ev.location}</span>
            <ExternalLink size={11} className="shrink-0" />
          </a>

          <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
            View Details <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function GalleryClient({ initialPhotos, initialEvents = [] }: GalleryClientProps) {
  const router = useRouter();
  const [eventItems, setEventItems] = useState<any[]>(initialEvents);
  const [highlightItems, setHighlightItems] = useState<any[]>([]);
  const [activePhotoTab, setActivePhotoTab] = useState("All Sevas");

  useEffect(() => {
    // Check URL search parameters for automatic tab selection when clicking navbar dropdowns
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get("category");
      if (catParam) {
        if (catParam.toLowerCase() === "charity") {
          setActivePhotoTab("Charity");
        } else if (catParam.toLowerCase().includes("sanatana") || catParam.toLowerCase().includes("dharma")) {
          setActivePhotoTab("Sanatana Dharma");
        }
      }
    }

    // Fetch latest highlights
    fetch(`/api/public/highlights?t=${Date.now()}`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.highlights)) {
          setHighlightItems(data.highlights);
        }
      })
      .catch((err) => console.error("Error fetching highlights:", err));

    // Fetch latest events
    fetch(`/api/public/events?t=${Date.now()}`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.events) && data.events.length > 0) {
          const dbEvents = data.events.map((ev: any) => {
            let dateStr = "Upcoming";
            if (ev.event_date) {
              if (ev.event_date instanceof Date) {
                dateStr = ev.event_date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
              } else if (typeof ev.event_date === "string") {
                const str = ev.event_date;
                if (str.includes("T") || str.match(/^\d{4}-\d{2}-\d{2}/)) {
                  const parsed = new Date(str);
                  if (!isNaN(parsed.getTime())) {
                    dateStr = parsed.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
                  } else {
                    dateStr = str;
                  }
                } else {
                  dateStr = str;
                }
              } else {
                dateStr = String(ev.event_date);
              }
            }
            return {
              id: ev.id || ev.slug,
              title: ev.title,
              category: ev.category || "Charity",
              date: dateStr,
              time: ev.event_time || "10:00 AM",
              location: ev.location_name || "Tamil Nadu",
              mapsUrl: `https://www.google.com/maps?q=${encodeURIComponent(ev.location_name || "Tamil Nadu")}`,
              img: ev.cover_image_url || "/images/event-1.png",
              desc: ev.short_description || ev.desc || "Dedicated seva and welfare drive uplifting communities and preserving cultural heritage across Tamil Nadu.",
              sort_order: typeof ev.sort_order === "number" ? ev.sort_order : Number(ev.sort_order || 999),
            };
          });
          setEventItems(dbEvents);
        }
      })
      .catch((err) => console.error("Error fetching events for seva page:", err));
  }, []);

  const deduplicateEvents = (list: any[]) => {
    const seenImages = new Set<string>();
    const seenIds = new Set<string>();
    return (list || []).filter((ev) => {
      const img = (ev.img || ev.coverImage || ev.cover_image_url || "").toLowerCase().trim();
      const id = String(ev.id || ev.slug || "").toLowerCase().trim();
      if (seenImages.has(img) || (id && seenIds.has(id))) return false;
      if (img) seenImages.add(img);
      if (id) seenIds.add(id);
      return true;
    });
  };

  const sortByOrder = (list: any[]) => {
    return [...list].sort((a, b) => {
      const oA = typeof a.sort_order === "number" ? a.sort_order : 999;
      const oB = typeof b.sort_order === "number" ? b.sort_order : 999;
      return oA - oB;
    });
  };

  const charityEvents = sortByOrder(deduplicateEvents(eventItems.filter((ev) => !isDharmaCategory(ev.category))));
  const dharmaEvents = sortByOrder(deduplicateEvents(eventItems.filter((ev) => isDharmaCategory(ev.category))));

  const charityHighlights = highlightItems.filter((h) => h.pillar === "charity" || !h.pillar);
  const dharmaHighlights = highlightItems.filter((h) => h.pillar === "sanatana_dharma");

  return (
    <div className="flex flex-col relative w-full overflow-hidden bg-surface text-on-surface">
      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-32 pb-12 px-4 sm:px-8 overflow-hidden flex flex-col items-center text-center min-h-[360px] justify-center">
        <div className="absolute inset-0 z-0 opacity-10 flex items-center justify-center pointer-events-none -translate-y-1/4 scale-150">
          <svg fill="none" height="600" viewBox="0 0 200 200" width="600" xmlns="http://www.w3.org/2000/svg">
            <path className="text-primary" d="M100 20C100 20 120 70 160 100C120 130 100 180 100 180C100 180 80 130 40 100C80 70 100 20 100 20Z" fill="currentColor" />
            <path d="M100 40C100 40 115 80 145 100C115 120 100 160 100 160C100 160 85 120 55 100C85 80 100 40 100 40Z" fill="white" opacity="0.5" />
          </svg>
        </div>

        <ScrollReveal className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="font-label-lg text-tertiary uppercase tracking-widest block font-bold text-sm">
            Divine & Social Service Archives
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-deep-forest font-bold">
            Sevas — Visual & Impact Chronicles
          </h1>
          <p className="font-body text-on-surface-variant max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
            Explore our dedicated service across Tamil Nadu separated cleanly across our two foundational pillars: humanitarian <strong className="text-[#8a5000] font-bold">Charity</strong> initiatives and sacred <strong className="text-[#b34700] font-bold">Sanatana Dharma</strong> heritage preservation.
          </p>
        </ScrollReveal>
      </section>

      {/* Filter Tabs Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto pb-8 w-full sticky top-20 z-30 bg-surface/95 backdrop-blur-md pt-4 border-b border-outline-variant/30">
        <div className="flex flex-wrap justify-center gap-3">
          {PHOTO_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => {
                setActivePhotoTab(f);
              }}
              className={`px-7 py-3 rounded-full font-label transition-all duration-300 cursor-pointer select-none active:scale-95 text-sm sm:text-base ${
                activePhotoTab === f
                  ? "border-2 border-primary bg-primary text-ethereal-white shadow-lg font-extrabold scale-105"
                  : "border border-outline-variant bg-surface text-on-surface-variant hover:border-primary hover:text-primary font-bold shadow-sm"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: CHARITY & COMMUNITY WELFARE (Highlights + Photos + Events)
         ========================================================================= */}
      {(activePhotoTab === "All Sevas" || activePhotoTab === "All Seva" || activePhotoTab === "Charity") && (
        <section className="px-4 md:px-8 max-w-7xl mx-auto pt-10 pb-20 w-full space-y-16">
          <ScrollReveal className="text-center space-y-2 border-b border-gray-200 pb-8">
            <span className="font-label font-bold text-xs tracking-[0.2em] text-primary uppercase">
              Category Pillar 1
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl text-deep-forest font-extrabold">
              Charity & Community Welfare
            </h2>
            <p className="font-body text-on-surface-variant max-w-xl mx-auto text-sm sm:text-base">
              Humanitarian relief efforts, Anna Daanam food drives, student education aid, tribal outreach, and women empowerment.
            </p>
          </ScrollReveal>

          {/* 1A. Charity Moments of Seva & Celebration */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="text-primary" size={20} />
              <h3 className="font-headline-sm text-2xl font-bold text-deep-forest">
                Charity Moments of Seva & Celebration
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(charityHighlights.length > 0 ? charityHighlights : [
                { id: 1, badge: "Welfare Drives", title: "Providing meal and food carriers to Govt Home Children", description: "Providing nutritious meals and food carriers to the children of Annai Sathiya District Government Home as part of a social welfare and community support initiative.", image_url: "https://res.cloudinary.com/woo94xq2/image/upload/v1783997211/dhara_foundations/activities/meal-food-carriers-govt-home/img_1.jpg", link_url: "/sevas/meal-food-carriers-govt-home" },
                { id: 2, badge: "Welfare Drives", title: "In Tribal welfare activities at Javadhu hills", description: "Conducting tribal welfare activities in Javadhu Hills as part of a social development and community upliftment initiative aimed at improving the living conditions of tribal communities.", image_url: "https://res.cloudinary.com/woo94xq2/image/upload/v1783997186/dhara_foundations/activities/tribal-welfare-javadhu-hills/img_1.jpg", link_url: "/sevas/tribal-welfare-javadhu-hills" },
                { id: 3, badge: "Women's Empowerment", title: "In Digitisation activities for Women Self Help Group society", description: "Conducting digitisation activities for Women Self Help Group societies as part of a community empowerment initiative aimed at improving digital literacy and financial inclusion.", image_url: "https://res.cloudinary.com/woo94xq2/image/upload/v1783997177/dhara_foundations/activities/digitisation-activities-wshg/img_1.jpg", link_url: "/sevas/digitisation-activities-wshg" }
              ]).map((h, idx) => (
                <motion.div
                  key={h.id || idx}
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => { if (h.link_url) router.push(h.link_url); }}
                  className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl group cursor-pointer h-[380px] sm:h-[430px]"
                >
                  <img src={h.image_url || "/images/event-1.png"} alt={h.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/95 via-deep-forest/30 to-transparent p-6 sm:p-7 flex flex-col justify-end text-white">
                    <span className="text-xs font-mono font-bold text-saffron-glow uppercase tracking-wider">{h.badge || "Highlight"}</span>
                    <span className="font-bold text-xl sm:text-2xl mt-1.5 leading-snug">{h.title}</span>
                    <p className="text-xs sm:text-sm text-ethereal-white/90 mt-1.5 line-clamp-2 leading-relaxed">{h.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 1C. Charity Recent Events & Welfare Drives */}
          <div className="space-y-6 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-gray-200/60 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest">Impact Archive</span>
                <h3 className="font-headline-sm text-2xl font-bold text-deep-forest">
                  Recent Activity for Charity
                </h3>
              </div>
              <span className="text-xs text-on-surface-variant font-medium">
                Showing {charityEvents.length} Charity Initiatives
              </span>
            </div>

            {charityEvents.length === 0 ? (
              <div className="text-center py-12 text-sm text-gray-500 bg-white/40 rounded-2xl border border-gray-200/60">
                No recent charity events found.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {charityEvents.map((ev, idx) => (
                  <EventCard key={`charity-ev-${ev.id || idx}`} ev={ev} router={router} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Divider when viewing All Sevas */}
      {(activePhotoTab === "All Sevas" || activePhotoTab === "All Seva") && (
        <div className="max-w-6xl mx-auto w-full px-8">
          <div className="h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent my-8 rounded-full" />
        </div>
      )}

      {/* =========================================================================
          SECTION 2: SANATANA DHARMA & TEMPLE HERITAGE (Highlights + Photos + Events)
         ========================================================================= */}
      {(activePhotoTab === "All Sevas" || activePhotoTab === "All Seva" || activePhotoTab === "Sanatana Dharma") && (
        <section className="px-4 md:px-8 max-w-7xl mx-auto pt-10 pb-24 w-full space-y-16">
          <ScrollReveal className="text-center space-y-2 border-b border-gray-200 pb-8">
            <span className="font-label font-bold text-xs tracking-[0.2em] text-[#8a5000] uppercase">
              Category Pillar 2
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl text-deep-forest font-extrabold">
              Sanatana Dharma & Temple Heritage
            </h2>
            <p className="font-body text-on-surface-variant max-w-xl mx-auto text-sm sm:text-base">
              Sacred temple restorations, ancient stone mandapam conservations, Girivalam spiritual camps, and Vedic revival.
            </p>
          </ScrollReveal>

          {/* 2A. Sanatana Dharma Moments of Seva & Celebration */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="text-[#8a5000]" size={20} />
              <h3 className="font-headline-sm text-2xl font-bold text-deep-forest">
                Sanatana Dharma Moments of Seva & Celebration
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(dharmaHighlights.length > 0 ? dharmaHighlights : [
                { id: 4, badge: "Sanatana Dharma", title: "Masi Pournami Maha Girivalam", description: "A religious awareness procession organized to promote the Masi Pournami Maha Girivalam at Thirupparankundram with devotees and spiritual devotion.", image_url: "/images/events/masi-pournami-girivalam.jpg", link_url: "/sevas/masi-pournami-girivalam" },
                { id: 5, badge: "Sanatana Dharma", title: "Brindavana Kumbabhishekam ceremony", description: "The Maha Kumbabhishekam Vaibhavam of Shri Raghavendra Swamigal Dakshina Bikshalaya Brindavanam celebrated in a grand spiritual manner at Anaikuppam, Cuddalore.", image_url: "/images/events/brindavana-kumbabhishekam.jpg", link_url: "/sevas/brindavana-kumbabhishekam" },
                { id: 6, badge: "Sanatana Dharma", title: "Devotional offering presented to the temple", description: "As a mark of faith and devotion, the Kodai was respectfully presented to the temple as a devotional contribution symbolizing spiritual dedication and support.", image_url: "/images/events/devotional-offering-kodai.jpg", link_url: "/sevas/devotional-offering-kodai" }
              ]).map((h, idx) => (
                <motion.div
                  key={h.id || idx}
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => { if (h.link_url) router.push(h.link_url); }}
                  className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl group cursor-pointer h-[380px] sm:h-[430px]"
                >
                  <img src={h.image_url || "/images/event-1.png"} alt={h.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/95 via-deep-forest/30 to-transparent p-6 sm:p-7 flex flex-col justify-end text-white">
                    <span className="text-xs font-mono font-bold text-saffron-glow uppercase tracking-wider">{h.badge || "Highlight"}</span>
                    <span className="font-bold text-xl sm:text-2xl mt-1.5 leading-snug">{h.title}</span>
                    <p className="text-xs sm:text-sm text-ethereal-white/90 mt-1.5 line-clamp-2 leading-relaxed">{h.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 2C. Sanatana Dharma Recent Events & Heritage Drives */}
          <div className="space-y-6 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-gray-200/60 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#8a5000] uppercase tracking-widest">Heritage Archive</span>
                <h3 className="font-headline-sm text-2xl font-bold text-deep-forest">
                  Recent Activity for Sanatana Dharma
                </h3>
              </div>
              <span className="text-xs text-on-surface-variant font-medium">
                Showing {dharmaEvents.length} Heritage Initiatives
              </span>
            </div>

            {dharmaEvents.length === 0 ? (
              <div className="text-center py-12 text-sm text-gray-500 bg-white/40 rounded-2xl border border-gray-200/60">
                No recent Sanatana Dharma events found.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {dharmaEvents.map((ev, idx) => (
                  <EventCard key={`dharma-ev-${ev.id || 'id'}-${idx}`} ev={ev} router={router} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
