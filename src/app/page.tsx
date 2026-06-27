"use client";

import React, { useState } from "react";
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

export default function HomePage() {
  const [activeModalItem, setActiveModalItem] = useState<(typeof HOME_GALLERY)[0] | null>(null);

  return (
    <div className="relative w-full overflow-hidden bg-background text-on-background">
      {/* Section 1: Hero Card (Sacred Flow Rebrand) */}
      <section className="relative pt-8 pb-16 px-4 md:px-8 max-w-[1440px] mx-auto min-h-[85vh] flex items-center justify-center">
        <div className="w-full h-full min-h-[760px] rounded-[36px] overflow-hidden relative shadow-2xl flex flex-col justify-end pb-12 px-6 sm:px-12 md:px-16 text-ethereal-white border border-outline-variant/20">
          {/* Background Photo with Multiply Overlay */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/banner.png"
            alt="Dhara Foundations Hero Banner"
            className="absolute inset-0 w-full h-full object-cover object-center scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-forest via-deep-forest/60 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Giant Background Watermark */}
          <div className="absolute z-0 font-display-lg text-[18vw] font-bold text-ethereal-white/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none pointer-events-none select-none tracking-widest">
            DHARMA
          </div>

          {/* Hero Content */}
          <div className="relative z-10 w-full flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="max-w-3xl space-y-6">
              <span className="inline-block px-5 py-2 rounded-full bg-saffron-glow/20 text-saffron-glow font-label-lg uppercase tracking-widest border border-saffron-glow/40 backdrop-blur-md shadow-lg">
                Dhara Divine Trust Portal
              </span>
              <h1 className="font-display-lg-mobile md:text-6xl lg:text-7xl font-bold text-ethereal-white leading-tight drop-shadow-md">
                Transforming Lives, <br />
                <span className="text-saffron-glow italic font-light">Preserving Traditions.</span>
              </h1>
              <p className="font-body-lg text-surface-container-high max-w-2xl opacity-90 leading-relaxed text-lg">
                Empowering tribal communities through spiritual heritage, education, and sustainable welfare development across generations.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="bg-saffron-glow text-deep-forest px-8 py-4 rounded-full font-label-lg font-bold uppercase tracking-wider hover:bg-ethereal-white transition-all shadow-lg flex items-center gap-2 group cursor-pointer"
                >
                  Discover Our Mission
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
                <Link
                  href="/contact"
                  className="bg-ethereal-white/10 hover:bg-ethereal-white/20 text-ethereal-white border border-ethereal-white/30 px-8 py-4 rounded-full font-label-lg font-semibold backdrop-blur-md transition-all cursor-pointer"
                >
                  Get Involved
                </Link>
              </div>
            </div>

            {/* Stats & Latest Initiative Box */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-end gap-6 shrink-0">
              <div className="grid grid-cols-3 gap-6 sm:gap-8 bg-black/40 backdrop-blur-xl p-6 rounded-3xl border border-ethereal-white/10 text-center w-full sm:w-auto">
                <div>
                  <div className="font-headline-md text-3xl md:text-4xl font-bold text-saffron-glow">25+</div>
                  <div className="font-caption text-xs uppercase tracking-wider text-surface-container-high mt-1">Years Active</div>
                </div>
                <div className="border-x border-ethereal-white/10 px-4">
                  <div className="font-headline-md text-3xl md:text-4xl font-bold text-saffron-glow">10k</div>
                  <div className="font-caption text-xs uppercase tracking-wider text-surface-container-high mt-1">Lives Touched</div>
                </div>
                <div>
                  <div className="font-headline-md text-3xl md:text-4xl font-bold text-saffron-glow">50</div>
                  <div className="font-caption text-xs uppercase tracking-wider text-surface-container-high mt-1">Temples Saved</div>
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
                className="w-full h-[520px] sm:h-[600px] object-cover rounded-[40px] rounded-tl-[120px] rounded-br-[120px] shadow-2xl border border-outline-variant/20"
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
              <h3 className="font-headline-md text-2xl sm:text-3xl font-bold mb-4 text-on-surface group-hover:text-ethereal-white transition-colors duration-500">Desiyam</h3>
              <p className="font-body-md text-on-surface-variant group-hover:text-ethereal-white/80 mb-8 leading-relaxed transition-colors duration-500">
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
                <h3 className="font-headline-md text-2xl sm:text-3xl font-bold mb-4 text-on-surface group-hover:text-ethereal-white transition-colors duration-500">Spiritualism</h3>
                <p className="font-body-md text-on-surface-variant group-hover:text-ethereal-white/80 mb-8 leading-relaxed transition-colors duration-500">
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
              <h3 className="font-headline-md text-2xl sm:text-3xl font-bold mb-4 text-on-surface group-hover:text-ethereal-white transition-colors duration-500">Community Welfare</h3>
              <p className="font-body-md text-on-surface-variant group-hover:text-ethereal-white/80 mb-8 leading-relaxed transition-colors duration-500">
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
          className="rounded-[40px] p-12 sm:p-16 md:p-24 text-center relative overflow-hidden shadow-2xl border border-outline-variant/20 text-ethereal-white"
          overlayClassName="bg-deep-forest/85 mix-blend-multiply"
        >
          <ScrollReveal className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="font-label-lg text-saffron-glow uppercase tracking-widest font-bold block text-xs">
              Become a Volunteer
            </span>
            <h2 className="font-headline-md text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Join your hand with us for a better life and future
            </h2>
            <p className="font-body-md text-surface-container-high max-w-xl mx-auto leading-relaxed text-base sm:text-lg">
              Your contribution, whether time, expertise, or resources, creates a lasting transformation across rural India. Become a divine guardian today.
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                className="bg-saffron-glow text-deep-forest px-10 py-5 rounded-full font-label-lg font-bold uppercase tracking-wider hover:bg-ethereal-white hover:scale-105 transition-all shadow-xl inline-block cursor-pointer"
              >
                Join Our Mission
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
            <h2 className="font-headline-md text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface">
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
              <div className="relative w-full h-[280px] sm:h-[300px] overflow-hidden shrink-0 rounded-t-[24px] m-0 p-0">
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
                  <h3 className="font-headline-md text-2xl sm:text-3xl font-bold text-on-surface group-hover:text-primary transition-colors mb-3 leading-snug line-clamp-2">
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
