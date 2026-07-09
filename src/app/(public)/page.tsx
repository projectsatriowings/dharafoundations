"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal, RevealItem } from "@/components/motion/ScrollReveal";
import { ParallaxBg } from "@/components/motion/ParallaxBg";
import { LightboxModal } from "@/components/ui/LightboxModal";
import InteractiveSelector from "@/components/ui/interactive-selector";
import BorderGlow from "@/components/ui/BorderGlow";

const HOME_GALLERY = [
  {
    src: "/images/gallery-1.png",
    alt: "Spiritual leader ceremony",
    caption: "Ceremony with respected spiritual leader in traditional saffron robes",
    category: "SPIRITUALISM",
  },
  {
    src: "/images/gallery-2.png",
    alt: "South Indian temple ritual",
    caption: "Traditional South Indian temple prayers and intricate architecture at Cuddalore",
    category: "TEMPLE RESTORATION",
  },
  {
    src: "/images/gallery-3.png",
    alt: "Temple procession kodai",
    caption: "Festive temple procession featuring decorated deities and devotees",
    category: "COMMUNITY WELFARE",
  },
  {
    src: "/images/about.png",
    alt: "Devotional offering",
    caption: "Sacred ash and rudraksha beads offering during temple worship",
    category: "HERITAGE",
  },
];

const PREVIEW_SLIDES = [
  { src: "/images/gallery-1.png", label: "Spiritual Ceremony" },
  { src: "/images/gallery-2.png", label: "Temple Restoration" },
  { src: "/images/gallery-3.png", label: "Community Welfare" },
  { src: "/images/about.png", label: "Devotional Offering" },
];

export default function HomePage() {
  const [activeModalItem, setActiveModalItem] = useState<(typeof HOME_GALLERY)[0] | null>(null);
  const [stats, setStats] = useState<any[]>([
    { stat_value: "3", stat_label: "FOUNDING TRUSTEES" },
    { stat_value: "8+", stat_label: "EVENTS CONDUCTED" },
    { stat_value: "80G", stat_label: "TAX EXEMPTION" },
  ]);
  const [config, setConfig] = useState({
    hero_image_url: "https://res.cloudinary.com/woo94xq2/video/upload/v1783059459/dhara_foundations/videos/viqfipyzkvrkvumsuksg.mp4",
    intro_video_1_url: process.env.NEXT_PUBLIC_INTRO_VIDEO_1 || "https://res.cloudinary.com/woo94xq2/video/upload/v1783059459/dhara_foundations/videos/viqfipyzkvrkvumsuksg.mp4",
    intro_video_2_url: process.env.NEXT_PUBLIC_INTRO_VIDEO_2 || "https://res.cloudinary.com/woo94xq2/video/upload/v1783059473/dhara_foundations/videos/osokgojzgb0sdg1vlywr.mp4",
  });
  const [gallery, setGallery] = useState<any[] | undefined>(undefined);
  const [events, setEvents] = useState<any[]>([
    {
      id: "digitisation-activities-wshg",
      date: "01 Jan, 2026",
      time: "01:00 PM",
      location: "Cuddalore",
      title: "In Digitisation activities for Women Self Help Group society",
      img: "/images/events/event-digitisation-women-shg.jpg",
      tag: "Women's Empowerment",
    },
    {
      id: "tribal-welfare-javadhu-hills",
      date: "06 Nov, 2025",
      time: "02:00 PM",
      location: "Vellore",
      title: "In Tribal welfare activities at Javadhu hills",
      img: "/images/events/event-tribal-welfare-javadhu.jpg",
      tag: "Welfare Drives",
    },
    {
      id: "felicitation-sports-children-pongal",
      date: "14 Jan, 2025",
      time: "06:00 PM",
      location: "Cuddalore",
      title: "Felicitation of Sports children during Pongal festival celebration",
      img: "/images/events/event-sports-pongal.jpg",
      tag: "Children & Education",
    },
  ]);

  useEffect(() => {
    fetch(`/api/public/homepage?t=${Date.now()}`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    })
      .then((res) => res.json())
      .then((d) => {
        if (d.stats && d.stats.length > 0) setStats(d.stats);
        if (d.gallery && d.gallery.length > 0) setGallery(d.gallery);
        if (d.config) {
          let updatedHero = d.config.hero_image_url;
          if (!updatedHero || updatedHero === "https://res.cloudinary.com/woo94xq2/video/upload/v1783348864/dhara_foundations/videos/injjcsbcbzokjavsswoc.mp4") {
            updatedHero = "https://res.cloudinary.com/woo94xq2/video/upload/v1783059459/dhara_foundations/videos/viqfipyzkvrkvumsuksg.mp4";
          }
          setConfig((prev) => ({ ...prev, ...d.config, hero_image_url: updatedHero }));
        }
      })
      .catch(console.error);

    fetch(`/api/public/events?t=${Date.now()}`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    })
      .then((res) => res.json())
      .then((d) => {
        if (d && Array.isArray(d.events) && d.events.length > 0) {
          const dbEvents = d.events.slice(0, 3).map((ev: any) => ({
            id: ev.slug || String(ev.id),
            date: ev.event_date
              ? new Date(ev.event_date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
              : "Recent",
            time: ev.event_time || "10:00 AM",
            location: ev.location_name || "Tamil Nadu",
            title: ev.title,
            img: ev.cover_image_url || "/images/event-1.png",
            tag: ev.category || "Events",
          }));
          setEvents(dbEvents);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-background text-on-background">
      {/* ==========================================
          SCOPED HOME PAGE TOP SECTION (Global surface background)
         ========================================== */}
      <div className="w-full bg-surface text-on-surface pb-20 pt-4 sm:pt-8 selection:bg-primary/20 selection:text-deep-forest">
        
        {/* 3. HERO SECTION — TWO COLUMN LAYOUT */}
        <section className="min-h-[80vh] max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 py-6 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN (~52% -> col-span-6 on lg) */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-center">
            
            {/* A) EYEBROW LABEL */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="inline-flex items-center gap-2 bg-saffron-glow/30 text-primary font-bold px-4 py-1.5 rounded-full text-xs tracking-wider uppercase self-start"
            >
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12 2C8.5 7 5.5 10.5 5.5 14.5c0 3.6 2.9 6.5 6.5 6.5s6.5-2.9 6.5-6.5C18.5 10.5 15.5 7 12 2zm0 17c-2.5 0-4.5-2-4.5-4.5 0-2.8 2.2-5.5 4.5-8.9 2.3 3.4 4.5 6.1 4.5 8.9 0 2.5-2 4.5-4.5 4.5z"/>
              </svg>
              <span>REGISTERED PUBLIC TRUST · EST. 2024</span>
            </motion.div>

            {/* B) MAIN HEADING */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="font-heading font-bold text-deep-forest leading-[1.15] text-[clamp(36px,4vw,58px)]"
            >
              Transforming Lives,<br />
              <em className="text-primary italic font-bold not-italic">Preserving</em> Traditions.
            </motion.h1>

            {/* C) BODY PARAGRAPH */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="font-body text-on-surface-variant text-[16px] sm:text-[17px] leading-[1.7] max-w-[480px]"
            >
              Dhara Foundations stands beside the poor, the forgotten, and the faithful — feeding the hungry, restoring sacred spaces, and giving dignity to those society often overlooks.
            </motion.p>

            {/* D) TWO BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <Link
                href="/contact"
                className="bg-primary hover:opacity-90 text-on-primary rounded-full px-8 py-4 font-label-lg font-bold text-[15px] text-center transition-all hover:-translate-y-0.5 hover:scale-105 shadow-md hover:shadow-lg"
              >
                Get Involved
              </Link>
              <Link
                href="/events"
                className="bg-transparent hover:bg-primary text-primary hover:text-on-primary border-2 border-primary rounded-full px-8 py-4 font-label-lg font-semibold text-[15px] text-center transition-all hover:scale-105"
              >
                Explore Our Events →
              </Link>
            </motion.div>

            {/* E) STATS ROW */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
              className={`grid gap-3 sm:gap-6 pt-10 border-t border-outline-variant/40 mt-8 ${
                stats.length === 1
                  ? "grid-cols-1"
                  : stats.length === 2
                  ? "grid-cols-2"
                  : stats.length >= 4
                  ? "grid-cols-2 sm:grid-cols-4"
                  : "grid-cols-3"
              }`}
            >
              {stats.map((st, idx) => (
                <div key={idx} className={idx > 0 ? "border-l border-outline-variant/40 pl-3 sm:pl-6" : ""}>
                  <div className="font-heading font-bold text-primary text-[28px] sm:text-[32px] leading-tight">
                    {st.stat_value}
                  </div>
                  <div className="font-title text-deep-forest font-semibold text-[10px] tracking-[0.12em] uppercase mt-1">
                    {st.stat_label}
                  </div>
                </div>
              ))}
            </motion.div>

          </div>

          {/* RIGHT COLUMN (~48% -> col-span-6 on lg) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-6 relative mt-6 lg:mt-0"
          >
            {/* A) AMBER OFFSET FRAME */}
            <div className="relative z-10 p-2 sm:p-0">
              {/* Media: Video or Image */}
              {(config.hero_image_url || "").match(/\.(mp4|webm|mov)$/i) || (config.hero_image_url || "").includes("/video/") ? (
                <video
                  ref={(el) => {
                    if (el) {
                      el.defaultMuted = true;
                      el.muted = true;
                      el.play().catch(() => {});
                    }
                  }}
                  src={config.hero_image_url || "https://res.cloudinary.com/woo94xq2/video/upload/v1783059459/dhara_foundations/videos/viqfipyzkvrkvumsuksg.mp4"}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-[360px] sm:h-[480px] lg:h-[540px] object-cover rounded-[20px] shadow-2xl relative z-10 block bg-black/5"
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={config.hero_image_url || "/images/hero-devi.png"}
                  alt="Devotional ritual offering and spiritual restoration"
                  className="w-full h-[360px] sm:h-[480px] lg:h-[540px] object-cover rounded-[20px] shadow-2xl relative z-10 block"
                />
              )}

              {/* Double-border effect: Frame offset -8px behind image showing background gap */}
              <div
                className="absolute -inset-2 rounded-[26px] border-2 border-primary z-0 pointer-events-none bg-surface"
              />

              {/* C) FLOATING CSR BADGE */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.9 }}
                className="absolute -top-4 -left-3 sm:-top-5 sm:-left-5 z-20 bg-surface-container-lowest rounded-[14px] p-3.5 sm:px-4 sm:py-3.5 shadow-xl border border-outline-variant/30 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-saffron-glow/20 flex items-center justify-center text-primary shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-title font-bold text-deep-forest text-[14px] leading-tight">
                    CSR Registered
                  </div>
                  <div className="font-title text-on-surface-variant text-[12px] leading-tight mt-0.5">
                    Reg. No. CSR00086947
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </section>

        {/* ==========================================
            4. CREDENTIALS STRIP
           ========================================== */}
        <ScrollReveal className="max-w-[1300px] w-[90%] mx-auto my-8 bg-surface-container-lowest rounded-[16px] py-5 px-6 sm:px-10 shadow-soft border border-outline-variant/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 items-center justify-between text-center lg:text-left">
            
            {/* Item 1 */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5">
              <svg className="w-4 h-4 fill-primary shrink-0" viewBox="0 0 24 24">
                <path d="M12 2C8.5 7 5.5 10.5 5.5 14.5c0 3.6 2.9 6.5 6.5 6.5s6.5-2.9 6.5-6.5C18.5 10.5 15.5 7 12 2z"/>
              </svg>
              <span className="font-title font-semibold text-deep-forest text-[11px] sm:text-[12px] tracking-[0.1em] uppercase">
                INDIAN TRUST ACT, 1882 – REGISTERED
              </span>
            </div>

            {/* Item 2 */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 lg:border-l lg:border-outline-variant/30 lg:pl-6">
              <svg className="w-4 h-4 fill-primary shrink-0" viewBox="0 0 24 24">
                <path d="M12 2C8.5 7 5.5 10.5 5.5 14.5c0 3.6 2.9 6.5 6.5 6.5s6.5-2.9 6.5-6.5C18.5 10.5 15.5 7 12 2z"/>
              </svg>
              <span className="font-title font-semibold text-deep-forest text-[11px] sm:text-[12px] tracking-[0.1em] uppercase">
                80G &amp; 12A – TAX EXEMPT
              </span>
            </div>

            {/* Item 3 */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 lg:border-l lg:border-outline-variant/30 lg:pl-6">
              <svg className="w-4 h-4 fill-primary shrink-0" viewBox="0 0 24 24">
                <path d="M12 2C8.5 7 5.5 10.5 5.5 14.5c0 3.6 2.9 6.5 6.5 6.5s6.5-2.9 6.5-6.5C18.5 10.5 15.5 7 12 2z"/>
              </svg>
              <span className="font-title font-semibold text-deep-forest text-[11px] sm:text-[12px] tracking-[0.1em] uppercase">
                MCA – CSR APPROVED (Reg. No. CSR00086947)
              </span>
            </div>

            {/* Item 4 */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 lg:border-l lg:border-outline-variant/30 lg:pl-6">
              <svg className="w-4 h-4 fill-primary shrink-0" viewBox="0 0 24 24">
                <path d="M12 2C8.5 7 5.5 10.5 5.5 14.5c0 3.6 2.9 6.5 6.5 6.5s6.5-2.9 6.5-6.5C18.5 10.5 15.5 7 12 2z"/>
              </svg>
              <span className="font-title font-semibold text-deep-forest text-[11px] sm:text-[12px] tracking-[0.1em] uppercase">
                NGO DARPAN – TN/2024/0473120
              </span>
            </div>

          </div>
        </ScrollReveal>

        {/* ==========================================
            4B. WELCOME / ABOUT FOUNDATION SECTION
           ========================================== */}
        <section className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <ScrollReveal direction="right" className="lg:col-span-7 space-y-5">
              <span className="font-label-lg text-primary uppercase tracking-widest text-xs font-bold block">
                Welcome to Dhara Foundations
              </span>
              <h2 className="font-heading font-bold text-deep-forest text-[clamp(28px,3.5vw,46px)] leading-[1.2]">
                Transforming lives and preserving traditions with compassion
              </h2>
              <p className="font-body text-on-surface-variant text-[16px] leading-[1.7]">
                Dhara Foundations is a non-profit organization dedicated to transforming lives and protecting traditions. We work for the upliftment of:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-body text-on-surface-variant text-[16px]">
                <li>Tribal and rural communities,</li>
                <li>Physically and mentally challenged individuals,</li>
                <li>Economically underprivileged groups,</li>
                <li>Abandoned temples and spiritual centers,</li>
              </ul>
              <p className="font-body text-on-surface-variant text-[16px] leading-[1.7]">
                Our mission combines compassionate service, cultural revival, and spiritual awareness to build a society rooted in values and dignity.
              </p>
              <p className="font-body text-on-surface-variant text-[14px] sm:text-[15px] leading-[1.7] bg-surface-container-low/60 p-5 rounded-2xl border border-outline-variant/30 space-y-1.5">
                <span className="block">It is a Non-Profit Organization registered under Indian Trust Act 1882 and The Indian Income Tax Act 1961 on 20.11.2024.</span>
                <span className="block">The Trust is registered with QUALIFY DEDUCTION U/S 80G OF I.T Act 1961 Vide AAETD8857AE20241 and AAETD8857AF20241 dated 11.12.2024 respectively.</span>
                <span className="block">The Trust is also registered with The Ministry of Corporate Affairs for undertaking CSR Activities Vide the Registration number CSR00086947 dated 20.02.2025.</span>
                <span className="block">The Trust is also registered with NGO–DARPAN vide Regn No. TN/2024/0473120 dated 06.12.2024.</span>
              </p>
            </ScrollReveal>

            <ScrollReveal direction="left" className="lg:col-span-5 relative mt-6 lg:mt-0 sticky top-28">
              <div className="relative z-10 p-2 sm:p-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/about/about-section.jpg"
                  alt="Welcome to Dhara Foundations"
                  className="w-full h-[380px] sm:h-[480px] object-cover rounded-[24px] shadow-2xl relative z-10 block"
                />
                <div className="absolute -inset-2 rounded-[28px] border-2 border-primary/40 z-0 pointer-events-none" />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ==========================================
            4C. THREE PILLAR CARDS SECTION
           ========================================== */}
        <section className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 py-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Pillar 1 */}
            <ScrollReveal className="relative bg-surface-container-lowest dark:bg-surface-container p-8 sm:p-9 rounded-[28px] shadow-soft hover:shadow-soft-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group min-h-[260px] border border-outline-variant/30 hover:border-primary/50">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/15 to-transparent rounded-bl-full pointer-events-none" />
              <div className="relative z-10 flex justify-between items-start mb-6">
                <h3 className="font-heading font-bold text-[22px] sm:text-[24px] leading-tight text-deep-forest max-w-[75%]">
                  Desiyam (National Culture)
                </h3>
                <div className="w-12 h-12 rounded-[14px] bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">menu_book</span>
                </div>
              </div>
              <p className="relative z-10 font-body italic text-on-surface-variant text-[15px] sm:text-[16px] leading-relaxed mb-8">
                We promote and preserve India&apos;s rich cultural identity, from temple traditions to heritage arts.
              </p>
              <div className="relative z-10 self-end mt-auto">
                <Link
                  href="/about"
                  aria-label="Learn about Desiyam"
                  className="w-11 h-11 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-all group-hover:scale-110 shadow-sm"
                >
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            </ScrollReveal>

            {/* Pillar 2 */}
            <ScrollReveal className="relative bg-surface-container-lowest dark:bg-surface-container p-8 sm:p-9 rounded-[28px] shadow-soft hover:shadow-soft-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group min-h-[260px] border border-outline-variant/30 hover:border-primary/50">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/15 to-transparent rounded-bl-full pointer-events-none" />
              <div className="relative z-10 flex justify-between items-start mb-6">
                <h3 className="font-heading font-bold text-[22px] sm:text-[24px] leading-tight text-deep-forest max-w-[75%]">
                  Spiritualism
                </h3>
                <div className="w-12 h-12 rounded-[14px] bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">self_improvement</span>
                </div>
              </div>
              <p className="relative z-10 font-body italic text-on-surface-variant text-[15px] sm:text-[16px] leading-relaxed mb-8">
                We support spiritual education, temple renovation, and rituals that connect communities with timeless wisdom.
              </p>
              <div className="relative z-10 self-end mt-auto">
                <Link
                  href="/about"
                  aria-label="Learn about Spiritualism"
                  className="w-11 h-11 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-all group-hover:scale-110 shadow-sm"
                >
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            </ScrollReveal>

            {/* Pillar 3 */}
            <ScrollReveal className="relative bg-surface-container-lowest dark:bg-surface-container p-8 sm:p-9 rounded-[28px] shadow-soft hover:shadow-soft-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group min-h-[260px] border border-outline-variant/30 hover:border-primary/50">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/15 to-transparent rounded-bl-full pointer-events-none" />
              <div className="relative z-10 flex justify-between items-start mb-6">
                <h3 className="font-heading font-bold text-[22px] sm:text-[24px] leading-tight text-deep-forest max-w-[75%]">
                  Community Welfare
                </h3>
                <div className="w-12 h-12 rounded-[14px] bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">volunteer_activism</span>
                </div>
              </div>
              <p className="relative z-10 font-body italic text-on-surface-variant text-[15px] sm:text-[16px] leading-relaxed mb-8">
                Through rehabilitation, medical care, and social outreach, we empower vulnerable people to live with purpose and pride.
              </p>
              <div className="relative z-10 self-end mt-auto">
                <Link
                  href="/about"
                  aria-label="Learn about Community Welfare"
                  className="w-11 h-11 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-all group-hover:scale-110 shadow-sm"
                >
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            </ScrollReveal>

          </div>
        </section>

      </div>
      {/* END SCOPED HOME PAGE TOP SECTION */}

      {/* Section 4: Become a Volunteer CTA Band */}
      <section className="py-16 px-4 md:px-8 max-w-[1440px] mx-auto">
        <ParallaxBg
          bgUrl="/images/volunteer.png"
          className="rounded-[40px] overflow-hidden relative shadow-2xl border border-outline-variant/30 min-h-[430px] flex items-center justify-center"
        >
          <ScrollReveal className="relative z-10 max-w-2xl text-center px-4 py-12 space-y-6">
            <span className="font-label-lg text-saffron-glow uppercase tracking-widest text-xs font-bold block">
              Join Our Divine Mission
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ethereal-white leading-tight">
              Become a Volunteer for Sacred Seva &amp; Community Transformation
            </h2>
            <p className="font-body text-ethereal-white/90 text-base leading-relaxed max-w-xl mx-auto">
              Your time, skills, and devotion can transform entire communities. Stand with us in reviving temples, educating rural children, and protecting our heritage.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/partnership"
                className="bg-primary text-ethereal-white px-8 py-3.5 rounded-full font-label-lg font-bold hover:bg-saffron-glow hover:text-deep-forest transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              >
                Apply as Volunteer
              </Link>
              <Link
                href="/contact"
                className="bg-white/10 backdrop-blur-md text-ethereal-white border border-white/30 px-8 py-3.5 rounded-full font-label-lg font-bold hover:bg-white/20 transition-all cursor-pointer"
              >
                Inquire About Seva
              </Link>
            </div>
          </ScrollReveal>
        </ParallaxBg>
      </section>

      {/* Section 5: Events Strip */}
      <section className="py-20 px-4 md:px-8 max-w-[1440px] mx-auto">
        <ScrollReveal className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl space-y-2">
            <span className="font-label-lg text-primary dark:text-saffron-glow uppercase tracking-widest font-bold block text-xs">
              Impact Archive
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-on-surface">
              Recent Events
            </h2>
          </div>
          <Link
            href="/events"
            className="bg-surface-container-high dark:bg-surface-container text-on-surface px-6 py-3 rounded-full font-label-lg font-semibold hover:bg-primary hover:text-ethereal-white dark:hover:bg-saffron-glow dark:hover:text-deep-forest transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            View All Events <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </ScrollReveal>

        <ScrollReveal staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((ev, idx) => (
            <RevealItem
              key={idx}
              className="bg-surface-container-lowest rounded-[24px] shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between overflow-hidden cursor-pointer h-full border-0 p-0 m-0"
            >
              <Link href={`/events/${ev.id}`} className="flex flex-col justify-between h-full block">
                <div className="relative w-full h-[240px] sm:h-[260px] overflow-hidden shrink-0 rounded-t-[24px] m-0 p-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ev.img}
                    alt={ev.title}
                    className="w-full h-full object-cover rounded-t-[24px] group-hover:scale-105 transition-transform duration-700 ease-out block m-0 p-0"
                    loading="lazy"
                  />
                  {/* Tight 15-20% bottom gradient dissolve ending at exact card background color */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/90 to-transparent pointer-events-none z-10" />

                  {/* True frosted glass date badge with transparency and blur */}
                  <div className="absolute top-4 left-4 z-20 bg-white/60 dark:bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-primary dark:text-saffron-glow shadow-sm border border-white/50 tracking-wider">
                    {ev.date}
                  </div>
                </div>

                <div className="p-6 pt-0 flex flex-col justify-between flex-grow relative z-20 bg-surface-container-lowest">
                  <div>
                    <span className="font-label-lg text-secondary text-xs font-bold uppercase tracking-widest mb-2 block">
                      {ev.tag}
                    </span>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface group-hover:text-primary transition-colors mb-3 leading-snug line-clamp-2">
                      {ev.title}
                    </h3>
                    <div className="flex items-center gap-5 text-on-surface-variant/80 text-xs mb-6 font-medium">
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">location_on</span> {ev.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">schedule</span> {ev.time}
                      </span>
                    </div>
                  </div>
                  <div className="mt-auto pt-2">
                    <span className="inline-flex items-center gap-1.5 font-label-lg font-bold text-primary group-hover:text-primary-container text-sm transition-all">
                      Read Event Report
                      <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-1.5">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </ScrollReveal>
      </section>

      {/* Section 6: Interactive Photo Gallery with Saffron Border Glow */}
      <section className="py-20 px-4 md:px-8 max-w-[1440px] mx-auto">
        <BorderGlow
          className="w-full"
          edgeSensitivity={35}
          glowColor="36 90 55"
          backgroundColor="transparent"
          borderRadius={36}
          glowRadius={40}
          glowIntensity={1.3}
          coneSpread={30}
          animated={true}
          colors={["#FFD27F", "#f49b33", "#8a5000"]}
        >
          <InteractiveSelector
            options={gallery}
            onOptionClick={(opt) =>
              setActiveModalItem({
                src: opt.image,
                alt: opt.title,
                caption: opt.description,
                category: opt.title,
              })
            }
          />
        </BorderGlow>
      </section>

      {/* Lightbox Modal */}
      {activeModalItem && (
        <LightboxModal
          item={activeModalItem}
          onClose={() => setActiveModalItem(null)}
        />
      )}
    </div>
  );
}
