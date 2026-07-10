"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, Clock, MapPin, ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { LightboxModal } from "@/components/ui/LightboxModal";
import { PillButton } from "@/components/ui/PillButton";
import ImageGallery from "@/components/ui/image-gallery";

const PHOTO_FILTERS = ["All Seva", "Charity", "Sanatana Dharma"];

export interface GalleryClientProps {
  initialPhotos: any[];
  initialEvents?: any[];
}

const isDharmaCategory = (rawCat: string) => {
  const cat = (rawCat || "").toLowerCase();
  if (
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
  const [photoItems, setPhotoItems] = useState<any[]>(initialPhotos);
  const [eventItems, setEventItems] = useState<any[]>(initialEvents);
  const [loading, setLoading] = useState(false);
  const [activePhotoTab, setActivePhotoTab] = useState("All Seva");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCharityCount, setVisibleCharityCount] = useState(6);
  const [visibleDharmaCount, setVisibleDharmaCount] = useState(6);

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

    // Fetch latest gallery photos
    fetch(`/api/public/gallery?t=${Date.now()}`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.photos) && data.photos.length > 0) {
          const dbPhotos = data.photos.map((p: any) => {
            const isDharma = isDharmaCategory(p.category || "");
            return {
              id: String(p.id),
              title: p.caption || "Sacred Seva",
              category: isDharma ? "Sanatana Dharma" : "Charity",
              desc: p.caption || "",
              src: p.image_url,
              pillBg: isDharma
                ? "bg-saffron-glow/90 text-deep-forest"
                : "bg-tertiary-container text-on-tertiary-container",
              type: "photo" as const,
            };
          });
          setPhotoItems(dbPhotos);
        }
      })
      .catch((err) => console.error("Error fetching gallery:", err));

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
            };
          });
          setEventItems(dbEvents);
        }
      })
      .catch((err) => console.error("Error fetching events for seva page:", err));
  }, []);

  const charityPhotos = photoItems.filter((item) => !isDharmaCategory(item.category));
  const dharmaPhotos = photoItems.filter((item) => isDharmaCategory(item.category));

  const charityEvents = eventItems.filter((ev) => !isDharmaCategory(ev.category));
  const dharmaEvents = eventItems.filter((ev) => isDharmaCategory(ev.category));

  const displayedCharityPhotos = charityPhotos.slice(0, visibleCharityCount);
  const displayedDharmaPhotos = dharmaPhotos.slice(0, visibleDharmaCount);

  const handleSelectPhoto = (selectedItem: any) => {
    if (selectedItem) {
      const originalIdx = photoItems.findIndex((x) => x.id === selectedItem.id);
      if (originalIdx !== -1) setLightboxIndex(originalIdx);
    }
  };

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
                setVisibleCharityCount(6);
                setVisibleDharmaCount(6);
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
      {(activePhotoTab === "All Seva" || activePhotoTab === "Charity") && (
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
              {/* Highlight Card 1 */}
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl group cursor-pointer h-72"
              >
                <img src="/images/events/event-meal-food-carriers.jpg" alt="Anna Daanam Drive" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/95 via-deep-forest/30 to-transparent p-6 flex flex-col justify-end text-white">
                  <span className="text-xs font-mono font-bold text-saffron-glow uppercase">Anna Daanam</span>
                  <span className="font-bold text-lg mt-1">Anna Daanam Mega Food Drive</span>
                  <p className="text-xs text-ethereal-white/80 mt-1 line-clamp-2">Nourishing thousands of rural families and pilgrims with freshly prepared sacred meals.</p>
                </div>
              </motion.div>

              {/* Highlight Card 2 */}
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl group cursor-pointer h-72"
              >
                <img src="/images/events/event-tribal-welfare-javadhu.jpg" alt="Tribal School Support" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/95 via-deep-forest/30 to-transparent p-6 flex flex-col justify-end text-white">
                  <span className="text-xs font-mono font-bold text-saffron-glow uppercase">Rural Education</span>
                  <span className="font-bold text-lg mt-1">Tribal School Support & Supplies</span>
                  <p className="text-xs text-ethereal-white/80 mt-1 line-clamp-2">Providing essential footwear, notebooks, and learning materials to remote Javadhu Hills schools.</p>
                </div>
              </motion.div>

              {/* Highlight Card 3 */}
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl group cursor-pointer h-72"
              >
                <img src="/images/events/event-digitisation-women-shg.jpg" alt="Women Empowerment" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/95 via-deep-forest/30 to-transparent p-6 flex flex-col justify-end text-white">
                  <span className="text-xs font-mono font-bold text-saffron-glow uppercase">Livelihood Aid</span>
                  <span className="font-bold text-lg mt-1">Women Empowerment Circle</span>
                  <p className="text-xs text-ethereal-white/80 mt-1 line-clamp-2">Supporting Self-Help Groups (SHGs) and traditional artisan women with sustainable livelihood training.</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* 1B. Charity Photo Chronicles */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-2xl font-bold text-deep-forest">
                Charity Photo Chronicles
              </h3>
              <span className="text-xs font-mono text-on-surface-variant font-bold">
                {charityPhotos.length} Photos Published
              </span>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4 animate-pulse">
                <div className="h-72 bg-gray-200/60 rounded-2xl"></div>
                <div className="h-72 bg-gray-200/60 rounded-2xl"></div>
                <div className="h-72 bg-gray-200/60 rounded-2xl"></div>
              </div>
            ) : displayedCharityPhotos.length === 0 ? (
              <div className="text-center py-12 text-sm text-gray-500 bg-white/40 rounded-2xl border border-gray-200/60">
                No photos currently published in the Charity section.
              </div>
            ) : (
              <>
                <ImageGallery
                  items={displayedCharityPhotos}
                  onSelect={(idx) => handleSelectPhoto(displayedCharityPhotos[idx])}
                />
                <div className="mt-8 text-center">
                  {visibleCharityCount < charityPhotos.length ? (
                    <div onClick={() => setVisibleCharityCount((prev) => prev + 6)} className="inline-block">
                      <PillButton variant="secondary" className="!inline-flex gap-2 items-center cursor-pointer hover:scale-105 transition-transform shadow-md">
                        <span>Load More Charity Photos ({charityPhotos.length - visibleCharityCount} remaining)</span>
                        <span className="material-symbols-outlined text-lg">expand_more</span>
                      </PillButton>
                    </div>
                  ) : charityPhotos.length > 6 ? (
                    <div onClick={() => setVisibleCharityCount(6)} className="inline-block">
                      <PillButton variant="secondary" className="!inline-flex gap-2 items-center cursor-pointer hover:scale-105 transition-transform opacity-80">
                        <span>Show Less</span>
                        <span className="material-symbols-outlined text-lg">expand_less</span>
                      </PillButton>
                    </div>
                  ) : null}
                </div>
              </>
            )}
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

      {/* Divider when viewing All Seva */}
      {activePhotoTab === "All Seva" && (
        <div className="max-w-6xl mx-auto w-full px-8">
          <div className="h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent my-8 rounded-full" />
        </div>
      )}

      {/* =========================================================================
          SECTION 2: SANATANA DHARMA & TEMPLE HERITAGE (Highlights + Photos + Events)
         ========================================================================= */}
      {(activePhotoTab === "All Seva" || activePhotoTab === "Sanatana Dharma") && (
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
              {/* Highlight Card 1 */}
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl group cursor-pointer h-72"
              >
                <img src="/images/gallery-3.png" alt="Girivalam Seva Camp" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/95 via-deep-forest/30 to-transparent p-6 flex flex-col justify-end text-white">
                  <span className="text-xs font-mono font-bold text-saffron-glow uppercase">Spiritual Service</span>
                  <span className="font-bold text-lg mt-1">Tiruvannamalai Girivalam Seva Camp</span>
                  <p className="text-xs text-ethereal-white/80 mt-1 line-clamp-2">Assisting Sadhus and lakhs of pilgrims during sacred full-moon circumambulation.</p>
                </div>
              </motion.div>

              {/* Highlight Card 2 */}
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl group cursor-pointer h-72"
              >
                <img src="/images/gallery-2.png" alt="Temple Consecration" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/95 via-deep-forest/30 to-transparent p-6 flex flex-col justify-end text-white">
                  <span className="text-xs font-mono font-bold text-saffron-glow uppercase">Heritage Revival</span>
                  <span className="font-bold text-lg mt-1">Ancient Temple Consecration & Restoration</span>
                  <p className="text-xs text-ethereal-white/80 mt-1 line-clamp-2">Reviving centuries-old rural temples with traditional Kumbabhishekam and architectural care.</p>
                </div>
              </motion.div>

              {/* Highlight Card 3 */}
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl group cursor-pointer h-72"
              >
                <img src="/images/event-1.png" alt="Sacred Deity Worship" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/95 via-deep-forest/30 to-transparent p-6 flex flex-col justify-end text-white">
                  <span className="text-xs font-mono font-bold text-saffron-glow uppercase">Vedic Heritage</span>
                  <span className="font-bold text-lg mt-1">Sacred Deity Worship & Vedic Revival</span>
                  <p className="text-xs text-ethereal-white/80 mt-1 line-clamp-2">Preserving ancient spiritual traditions, deity adornments, and community pooja observances.</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* 2B. Sanatana Dharma Photo Chronicles */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-2xl font-bold text-deep-forest">
                Sanatana Dharma Photo Chronicles
              </h3>
              <span className="text-xs font-mono text-on-surface-variant font-bold">
                {dharmaPhotos.length} Photos Published
              </span>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4 animate-pulse">
                <div className="h-72 bg-gray-200/60 rounded-2xl"></div>
                <div className="h-72 bg-gray-200/60 rounded-2xl"></div>
                <div className="h-72 bg-gray-200/60 rounded-2xl"></div>
              </div>
            ) : displayedDharmaPhotos.length === 0 ? (
              <div className="text-center py-12 text-sm text-gray-500 bg-white/40 rounded-2xl border border-gray-200/60">
                No photos currently published in the Sanatana Dharma section.
              </div>
            ) : (
              <>
                <ImageGallery
                  items={displayedDharmaPhotos}
                  onSelect={(idx) => handleSelectPhoto(displayedDharmaPhotos[idx])}
                />
                <div className="mt-8 text-center">
                  {visibleDharmaCount < dharmaPhotos.length ? (
                    <div onClick={() => setVisibleDharmaCount((prev) => prev + 6)} className="inline-block">
                      <PillButton variant="secondary" className="!inline-flex gap-2 items-center cursor-pointer hover:scale-105 transition-transform shadow-md">
                        <span>Load More Sanatana Dharma Photos ({dharmaPhotos.length - visibleDharmaCount} remaining)</span>
                        <span className="material-symbols-outlined text-lg">expand_more</span>
                      </PillButton>
                    </div>
                  ) : dharmaPhotos.length > 6 ? (
                    <div onClick={() => setVisibleDharmaCount(6)} className="inline-block">
                      <PillButton variant="secondary" className="!inline-flex gap-2 items-center cursor-pointer hover:scale-105 transition-transform opacity-80">
                        <span>Show Less</span>
                        <span className="material-symbols-outlined text-lg">expand_less</span>
                      </PillButton>
                    </div>
                  ) : null}
                </div>
              </>
            )}
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
                  <EventCard key={`dharma-ev-${ev.id || idx}`} ev={ev} router={router} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Lightbox Modal for Photos */}
      <LightboxModal
        item={
          lightboxIndex !== null && photoItems[lightboxIndex]
            ? {
                src: photoItems[lightboxIndex].src,
                alt: photoItems[lightboxIndex].title,
                caption: photoItems[lightboxIndex].desc,
                category: photoItems[lightboxIndex].category,
              }
            : null
        }
        onClose={() => setLightboxIndex(null)}
        onPrev={() =>
          setLightboxIndex((prev) =>
            prev !== null ? (prev > 0 ? prev - 1 : photoItems.length - 1) : null
          )
        }
        onNext={() =>
          setLightboxIndex((prev) =>
            prev !== null ? (prev < photoItems.length - 1 ? prev + 1 : 0) : null
          )
        }
        currentIndex={lightboxIndex !== null ? lightboxIndex : undefined}
        totalCount={photoItems.length}
      />
    </div>
  );
}
