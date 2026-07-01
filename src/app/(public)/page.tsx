"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PREVIEW_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-background text-on-background">
      {/* Section 1: Cinematic Full-Bleed Hero Section */}
      <section className="relative pt-28 sm:pt-32 pb-16 w-full min-h-screen flex items-stretch overflow-hidden bg-[#0f3443] text-white">
        
        {/* Main Background Photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/banner.png"
          alt="Dhara Foundations Community Gathering"
          className="absolute inset-0 w-full h-full object-cover scale-[1.12] z-0 transition-transform duration-1000"
          style={{ objectFit: "cover", objectPosition: "center 15%" }}
        />

        {/* Giant Ghost Headline (Option B: Depth & Blend Mode effect) */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[1] overflow-hidden"
          aria-hidden="true"
        >
          <span 
            className="font-headline-md font-bold text-white/25 mix-blend-overlay tracking-[0.1em] leading-none text-center"
            style={{ fontSize: "clamp(64px, 16vw, 180px)" }}
          >
            DHARMA
          </span>
        </div>

        {/* Bottom-heavy Dark Gradient Overlay using brand gradient #0f3443 */}
        <div 
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(15, 52, 67, 0.3) 0%, rgba(15, 52, 67, 0.85) 100%)"
          }}
        />

        {/* Hero Content Area */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col justify-end gap-10 sm:gap-12 px-6 sm:px-12 md:px-16 mt-auto">
          
          {/* Top Main Heading */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-saffron-glow text-xs font-label-lg uppercase tracking-widest shadow-sm">
              <span>Dhara Divine Trust Portal</span>
            </div>
            <h1 className="font-headline-md text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] drop-shadow-md">
              Transforming Lives, <br />
              <span className="text-saffron-glow font-light italic">Preserving Traditions.</span>
            </h1>
          </div>

          {/* Bottom Row Layout: Stat Row + CTA (Left) and Floating Preview Card (Right) */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 lg:gap-12 w-full pt-6 border-t border-white/15">
            
            {/* STAT ROW + CTA (bottom-left) */}
            <div className="flex flex-col gap-8 lg:max-w-xl xl:max-w-2xl">
              
              {/* Three Stat Blocks */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-1">
                <div>
                  <div className="font-headline-md text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                    25+
                  </div>
                  <div className="font-body-sm text-xs sm:text-sm text-white/75 mt-1 font-medium leading-snug">
                    Years of Seva {/* [CLIENT TO CONFIRM] */}
                  </div>
                </div>
                <div className="border-l border-white/20 pl-4 sm:pl-8">
                  <div className="font-headline-md text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                    10k+
                  </div>
                  <div className="font-body-sm text-xs sm:text-sm text-white/75 mt-1 font-medium leading-snug">
                    Beneficiaries {/* [CLIENT TO CONFIRM] */}
                  </div>
                </div>
                <div className="border-l border-white/20 pl-4 sm:pl-8">
                  <div className="font-headline-md text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                    50+
                  </div>
                  <div className="font-body-sm text-xs sm:text-sm text-white/75 mt-1 font-medium leading-snug">
                    Temples Restored {/* [CLIENT TO CONFIRM] */}
                  </div>
                </div>
              </div>

              {/* Pill CTA Button + Circular Arrow Button + Supporting Sentence */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-1">
                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href="/contact"
                    className="px-8 py-3.5 rounded-full bg-white text-[#0f3443] hover:bg-saffron-glow font-label-lg font-bold text-sm sm:text-base tracking-wide transition-all shadow-lg hover:shadow-xl active:scale-95"
                  >
                    Get Involved
                  </Link>
                  <Link
                    href="/about"
                    aria-label="Discover our mission"
                    className="w-12 h-12 rounded-full border border-white/40 hover:border-white bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-all shrink-0 group"
                  >
                    <span className="material-symbols-outlined text-xl group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                      arrow_outward
                    </span>
                  </Link>
                </div>
                <p className="text-white/80 text-xs sm:text-sm font-body-sm leading-relaxed max-w-xs sm:max-w-sm">
                  Building stronger communities through compassion and cultural preservation.
                </p>
              </div>
            </div>

            {/* FLOATING PREVIEW CARD (bottom-right) */}
            <div className="w-full sm:w-80 shrink-0 self-start lg:self-end bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl relative overflow-hidden group">
              <div className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden bg-black/40 mb-3">
                {PREVIEW_SLIDES.map((slide, idx) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={slide.src}
                    src={slide.src}
                    alt={slide.label}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      idx === currentSlide ? "opacity-100 scale-105" : "opacity-0 scale-100"
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-xs font-label-lg tracking-wider text-white">
                  <span className="drop-shadow-md font-semibold">
                    {PREVIEW_SLIDES[currentSlide].label}
                  </span>
                </div>
              </div>

              {/* Slide Counter & Progress Dots */}
              <div className="flex items-center justify-between px-1">
                <span className="font-label-lg text-xs font-bold tracking-widest text-white/90">
                  {String(currentSlide + 1).padStart(2, "0")}/{String(PREVIEW_SLIDES.length).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-1.5">
                  {PREVIEW_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 2: Welcome to Dhara Foundations (Asymmetric Signature Layout) */}
      <section className="py-20 px-4 md:px-8 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Asymmetric Image Left */}
          <ScrollReveal direction="right" className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about.png"
                alt="Devotional ritual offering with sacred ash and rudraksha beads"
                className="w-full h-[460px] sm:h-[540px] object-cover rounded-[40px] rounded-tl-[120px] rounded-br-[120px] shadow-2xl border border-outline-variant/20"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-surface/90 dark:bg-deep-forest/90 backdrop-blur-xl p-6 rounded-[32px] border border-outline-variant/30 shadow-2xl max-w-[220px] z-20">
                <div className="font-headline-md text-primary dark:text-saffron-glow font-bold text-3xl">25+</div>
                <div className="font-label-lg text-on-surface-variant dark:text-surface-variant mt-1 text-xs uppercase tracking-wider font-semibold">
                  Years of Seva &amp; Trust
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Text Content Right */}
          <ScrollReveal direction="left" delay={0.15} className="lg:col-span-6 space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary-fixed/10 text-primary dark:text-saffron-glow font-label-lg uppercase tracking-widest font-bold text-xs">
              Welcome to Dhara Foundations
            </div>
            <h2 className="font-headline-md text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface leading-tight">
              Transforming lives and preserving traditions with compassion
            </h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed text-base sm:text-lg">
              We are dedicated to uplifting marginalized communities while safeguarding our ancient spiritual heritage. By bridging the gap between traditional wisdom and modern welfare, we create sustainable pathways for dignity and growth.
            </p>
            
            <ul className="space-y-4 pt-2">
              <li className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-surface-container-high dark:bg-surface-container flex items-center justify-center shrink-0 shadow-sm text-primary dark:text-saffron-glow">
                  <span className="material-symbols-outlined text-2xl">groups</span>
                </div>
                <span className="font-body-md font-semibold text-on-surface text-base">Upliftment of tribal and rural communities</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-surface-container-high dark:bg-surface-container flex items-center justify-center shrink-0 shadow-sm text-primary dark:text-saffron-glow">
                  <span className="material-symbols-outlined text-2xl">accessible_forward</span>
                </div>
                <span className="font-body-md font-semibold text-on-surface text-base">Support for physically and mentally challenged individuals</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-surface-container-high dark:bg-surface-container flex items-center justify-center shrink-0 shadow-sm text-primary dark:text-saffron-glow">
                  <span className="material-symbols-outlined text-2xl">temple_hindu</span>
                </div>
                <span className="font-body-md font-semibold text-on-surface text-base">Restoration of ancient abandoned temples &amp; spiritual centers</span>
              </li>
            </ul>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-label-lg font-bold text-primary dark:text-saffron-glow hover:translate-x-1 transition-all group text-base cursor-pointer"
              >
                <span>Learn more about our foundation history</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 3: Foundational Areas of Work (Staggered Asymmetric Pillars) */}
      <section className="py-24 bg-surface-container-low px-4 sm:px-8 md:px-12 mt-12 rounded-[40px] max-w-[1440px] mx-auto border border-outline-variant/15">
        <ScrollReveal className="text-center mb-16 space-y-3">
          <span className="font-label-lg text-primary dark:text-saffron-glow uppercase tracking-widest font-bold block text-xs">
            Our Pillars
          </span>
          <h2 className="font-headline-md text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface">
            Foundational Areas of Work
          </h2>
        </ScrollReveal>

        <ScrollReveal staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Pillar 1: Desiyam (Glass Card with Dark Hover) */}
          <RevealItem className="bg-surface/80 dark:bg-surface-container/60 backdrop-blur-md p-8 sm:p-10 rounded-[40px] flex flex-col justify-between border border-outline-variant/30 shadow-sm hover:shadow-2xl hover:bg-deep-forest hover:text-ethereal-white hover:border-ethereal-white/10 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden cursor-pointer h-full">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-saffron-glow/20 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary-fixed/20 flex items-center justify-center mb-6 text-primary dark:text-saffron-glow group-hover:bg-ethereal-white/10 group-hover:text-saffron-glow group-hover:scale-110 transition-all duration-500 shadow-sm">
                <span className="material-symbols-outlined text-3xl">public</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold mb-3 text-on-surface group-hover:text-ethereal-white transition-colors duration-500">Desiyam</h3>
              <p className="font-body text-on-surface-variant group-hover:text-ethereal-white/80 mb-8 leading-relaxed transition-colors duration-500 text-sm sm:text-base">
                Fostering national integration, traditional heritage preservation, and civic responsibility through grassroots cultural initiatives.
              </p>
            </div>
            <Link
              href="/programs"
              className="w-12 h-12 rounded-full border border-primary dark:border-saffron-glow text-primary dark:text-saffron-glow flex items-center justify-center group-hover:bg-saffron-glow group-hover:text-deep-forest group-hover:border-saffron-glow transition-all duration-500 self-start relative z-10 shadow-sm"
              aria-label="Explore Desiyam"
            >
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </RevealItem>

          {/* Pillar 2: Spiritualism (Glass Card with Dark Hover & Offset) */}
          <RevealItem className="bg-surface/80 dark:bg-surface-container/60 backdrop-blur-md p-8 sm:p-10 rounded-[40px] flex flex-col justify-between border border-outline-variant/30 shadow-sm hover:shadow-2xl hover:bg-deep-forest hover:text-ethereal-white hover:border-ethereal-white/10 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden cursor-pointer h-full">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-saffron-glow/20 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary-fixed/20 flex items-center justify-center mb-6 text-primary dark:text-saffron-glow group-hover:bg-ethereal-white/10 group-hover:text-saffron-glow group-hover:scale-110 transition-all duration-500 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">self_improvement</span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold mb-3 text-on-surface group-hover:text-ethereal-white transition-colors duration-500">Spiritualism</h3>
                <p className="font-body text-on-surface-variant group-hover:text-ethereal-white/80 mb-8 leading-relaxed transition-colors duration-500 text-sm sm:text-base">
                  Reviving ancient Vedic wisdom, supporting religious education, and physically renovating abandoned rural sacred shrines.
                </p>
              </div>
              <Link
                href="/programs"
                className="w-12 h-12 rounded-full border border-primary dark:border-saffron-glow text-primary dark:text-saffron-glow flex items-center justify-center group-hover:bg-saffron-glow group-hover:text-deep-forest group-hover:border-saffron-glow transition-all duration-500 self-start relative z-10 shadow-sm"
                aria-label="Explore Spiritualism"
              >
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>
          </RevealItem>

          {/* Pillar 3: Community Welfare (Glass Card with Dark Hover) */}
          <RevealItem className="bg-surface/80 dark:bg-surface-container/60 backdrop-blur-md p-8 sm:p-10 rounded-[40px] flex flex-col justify-between border border-outline-variant/30 shadow-sm hover:shadow-2xl hover:bg-deep-forest hover:text-ethereal-white hover:border-ethereal-white/10 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden cursor-pointer h-full">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-saffron-glow/20 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary-fixed/20 flex items-center justify-center mb-6 text-primary dark:text-saffron-glow group-hover:bg-ethereal-white/10 group-hover:text-saffron-glow group-hover:scale-110 transition-all duration-500 shadow-sm">
                <span className="material-symbols-outlined text-3xl">diversity_1</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold mb-3 text-on-surface group-hover:text-ethereal-white transition-colors duration-500">Community Welfare</h3>
              <p className="font-body text-on-surface-variant group-hover:text-ethereal-white/80 mb-8 leading-relaxed transition-colors duration-500 text-sm sm:text-base">
                Empowering underprivileged tribal families and physically challenged individuals with healthcare, nutrition, and livelihood grants.
              </p>
            </div>
            <Link
              href="/programs"
              className="w-12 h-12 rounded-full border border-primary dark:border-saffron-glow text-primary dark:text-saffron-glow flex items-center justify-center group-hover:bg-saffron-glow group-hover:text-deep-forest group-hover:border-saffron-glow transition-all duration-500 self-start relative z-10 shadow-sm"
              aria-label="Explore Welfare"
            >
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </RevealItem>
        </ScrollReveal>
      </section>

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
              Upcoming &amp; Recent Initiatives
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-on-surface">
              View Our All Events
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
          {[
            {
              date: "01 Jan, 2026",
              time: "01:00 PM",
              location: "Cuddalore",
              title: "In Digitisation activities for Women Self Help Group society",
              img: "/images/event-1.png",
              tag: "Empowerment",
            },
            {
              date: "06 Nov, 2025",
              time: "02:00 PM",
              location: "Javadhu Hills",
              title: "In Tribal welfare activities at Javadhu hills communities",
              img: "/images/event-2.png",
              tag: "Tribal Welfare",
            },
            {
              date: "14 Jan, 2025",
              time: "06:00 PM",
              location: "Cuddalore",
              title: "Felicitation of Sports children during Pongal festival celebration",
              img: "/images/event-3.png",
              tag: "Youth Development",
            },
          ].map((ev, idx) => (
            <RevealItem
              key={idx}
              className="bg-surface-container-lowest rounded-[24px] shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between overflow-hidden cursor-pointer h-full border-0 p-0 m-0"
            >
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
                <div className="absolute top-4 left-4 z-20 bg-white/45 dark:bg-black/45 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-primary dark:text-saffron-glow shadow-sm border border-white/50 tracking-wider">
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
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-1.5 font-label-lg font-bold text-primary hover:text-primary-container text-sm transition-all group/btn"
                  >
                    Read Event Report
                    <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-1.5">arrow_forward</span>
                  </Link>
                </div>
              </div>
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
