"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  Quote,
  Award,
  Play,
  Video,
  Clock,
  CheckCircle2
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

// ==========================================
// DATA DEFINITIONS
// ==========================================

// ==========================================
// DATA DEFINITIONS & HELPERS
// ==========================================


// Custom Hook / Helper for Animated Count Up
function CounterItem({ target, staticText, shouldReduceMotion }: { target: number | null; staticText?: string; shouldReduceMotion: boolean | null }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted || target === null) return;
    if (shouldReduceMotion) {
      setCount(target);
      return;
    }

    let startTimestamp: number | null = null;
    const duration = 1800; // 1.8 seconds

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Deceleration easeOut cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    window.requestAnimationFrame(step);
  }, [hasStarted, target, shouldReduceMotion]);

  if (target === null) {
    return <span>{staticText}</span>;
  }

  return (
    <motion.span
      onViewportEnter={() => setHasStarted(true)}
      viewport={{ once: true }}
    >
      {count}
    </motion.span>
  );
}



export default function EventsPage() {
  const rawReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const shouldReduceMotion = isMounted ? rawReducedMotion : false;

  const scrollToAwardsSection = () => {
    const el = document.getElementById("dhara-divine-awards-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Animation Helper Variants reflecting prefers-reduced-motion
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const cardFadeUpVariant: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="flex flex-col w-full bg-[#F9F7F2] text-on-surface font-body-md overflow-x-hidden">
      
      {/* ==========================================
          SECTION 1 — HERO (Photo + Stat Badge)
         ========================================== */}
      <section className="relative pt-16 sm:pt-20 pb-20 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/15 text-primary font-label-lg font-bold text-xs uppercase tracking-widest"
            >
              <Award size={14} className="text-primary shrink-0" />
              <span>Annual Flagship Ceremony</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="font-headline-md text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-deep-forest leading-[1.15]"
            >
              Dhara Divine Awards
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
              className="font-body-lg text-on-surface-variant text-base sm:text-lg leading-relaxed pt-2"
            >
              Our flagship national celebration honoring grassroots Sanatana Dharma champions, unheralded traditional artists, temple caretakers, and selflessly dedicated volunteers.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
              className="pt-4 flex flex-wrap items-center gap-4"
            >
              <button 
                onClick={scrollToAwardsSection}
                className="px-8 py-3.5 rounded-full bg-primary hover:bg-[#633800] text-white font-label-lg font-bold transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer flex items-center gap-2"
              >
                <span>Explore Awards Spotlight</span>
                <ArrowRight size={18} />
              </button>
            </motion.div>
          </div>

          {/* Right Column: Large Framed Photo + Badges */}
          <div className="lg:col-span-7 relative">
            <motion.div 
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-surface-container aspect-[4/3] sm:aspect-[16/10] cursor-pointer"
            >
              <motion.img 
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                src="/images/hero-devi.png" 
                alt="Dhara Divine Awards Hero Devi" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/60 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* (a) Circular Rotating Badge (Top Right) */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              onClick={scrollToAwardsSection}
              className="absolute -top-6 -right-4 sm:-top-8 sm:-right-6 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-deep-forest border-4 border-[#F9F7F2] shadow-xl flex items-center justify-center cursor-pointer group z-20"
            >
              {/* Rotating Text Ring Wheel */}
              <div className="absolute inset-2 pointer-events-none flex items-center justify-center group-hover:[animation:spin_8s_linear_infinite]">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                  <text className="text-[9px] font-mono font-bold uppercase fill-saffron-glow tracking-[1.45px]">
                    <textPath href="#circlePath" textLength="226" lengthAdjust="spacing">EXPLORE AWARDS SPOTLIGHT • DHARA • </textPath>
                  </text>
                </svg>
              </div>
              {/* Center Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-inner group-hover:bg-saffron-glow group-hover:text-deep-forest group-hover:scale-110 transition-all duration-300">
                <ArrowRight size={20} />
              </div>
            </motion.div>

            {/* (b) Floating Stat Card (Bottom Right) */}
            <motion.div 
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 }}
              animate={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -8, 0] }}
              transition={shouldReduceMotion ? { duration: 0.5, delay: 0.6 } : { opacity: { duration: 0.5, delay: 0.6 }, scale: { type: "spring", stiffness: 200, damping: 15, delay: 0.6 }, y: { repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 } }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.06 }}
              className="absolute -bottom-6 sm:-bottom-8 left-4 sm:left-auto sm:right-8 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-outline-variant/20 flex items-center gap-4 z-20 max-w-xs sm:max-w-sm cursor-pointer"
            >
              <div className="flex -space-x-3 shrink-0 overflow-hidden">
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="/images/event-1.png" alt="Volunteer" />
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="/images/gallery-1.png" alt="Volunteer" />
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="/images/gallery-2.png" alt="Volunteer" />
              </div>
              <div>
                <div className="font-headline-md font-bold text-xl sm:text-2xl text-deep-forest leading-none">
                  25+ <span className="text-xs text-primary font-normal">Events</span>
                </div>
                {/* [CLIENT TO CONFIRM EXACT STAT] */}
                <div className="font-body-sm text-xs text-on-surface-variant pt-1 font-medium">
                  Conducted across Tamil Nadu communities
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 1.5 — DHARA DIVINE AWARDS SPOTLIGHT
         ========================================== */}
      <section id="dhara-divine-awards-section" className="py-16 px-6 md:px-12 max-w-7xl mx-auto w-full scroll-mt-28">
        <div className="bg-gradient-to-br from-deep-forest via-[#183623] to-[#112619] rounded-3xl p-8 sm:p-12 lg:p-16 text-ethereal-white shadow-2xl relative overflow-hidden border border-saffron-glow/30">
          
          {/* Background Decorative Elements */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-saffron-glow/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto space-y-10">
            {/* Header Badge & Title */}
            <div className="text-center space-y-4">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariant}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron-glow/20 text-saffron-glow font-mono font-bold text-xs uppercase tracking-widest border border-saffron-glow/40 shadow-inner"
              >
                <Award size={15} className="text-saffron-glow shrink-0" />
                <span>Annual Flagship Celebration • Sanatana Dharma Revival</span>
              </motion.div>

              <motion.h2 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariant}
                className="font-headline-md text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
              >
                Dhara Divine Awards
              </motion.h2>

              <motion.p 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariant}
                className="font-body-lg text-ethereal-white/90 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto pt-2"
              >
                Our flagship initiative to recognize and celebrate individuals, social organizations, philanthropists, spiritual leaders, and grassroots change-makers who dedicate their lives to selfless service and humanitarian work inspired by spiritual values.
              </motion.p>
            </div>

            {/* Unified Dhara Divine Awards Spotlight Card */}
            <div className="pt-6 max-w-4xl mx-auto">
              <motion.div 
                whileHover={shouldReduceMotion ? {} : { scale: 1.015, y: -4 }}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-10 lg:p-12 border border-white/25 flex flex-col md:flex-row items-center justify-between gap-8 hover:bg-white/15 transition-all group shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-72 h-72 bg-saffron-glow/10 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-4 flex-1 relative z-10 text-left">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3.5 py-1 rounded-full bg-saffron-glow/20 text-saffron-glow font-bold text-xs uppercase tracking-wider border border-saffron-glow/40 shadow-sm">
                      Annual Flagship Ceremony
                    </span>
                    <span className="text-xs font-mono text-ethereal-white/80">Chetpet, Chennai</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white group-hover:text-saffron-glow transition-colors">
                    Dhara Divine Awards
                  </h3>
                  <p className="text-sm sm:text-base text-ethereal-white/80 leading-relaxed max-w-2xl">
                    Over 500 distinguished guests, CSR leaders, retired high court judges, spiritual leaders, and grassroots service champions assemble for an extraordinary celebration of honor, cultural tribute, and community upliftment.
                  </p>
                </div>

                <div className="shrink-0 w-full md:w-auto relative z-10">
                  <Link 
                    href="https://dhara-devineawards.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full md:w-auto py-4 px-8 rounded-2xl bg-saffron-glow hover:bg-amber-400 text-deep-forest font-bold text-base transition-all shadow-xl gap-3 group-hover:scale-105"
                  >
                    <span>Explore Divine Awards Portal</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 1.8 — DHARA DIVINE AWARDS CEREMONY PORTAL CTA
         ========================================== */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="bg-gradient-to-br from-[#12241A] via-deep-forest to-[#183623] rounded-3xl p-8 sm:p-12 lg:p-14 text-ethereal-white shadow-2xl relative overflow-hidden border border-saffron-glow/30">
          
          {/* Background Ambient Glows */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-saffron-glow/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-10">
            {/* Header Badge & Title */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariant}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron-glow/20 text-saffron-glow font-mono font-bold text-xs uppercase tracking-widest border border-saffron-glow/40 shadow-inner"
              >
                <Award size={15} className="text-saffron-glow shrink-0" />
                <span>COMPLETE CEREMONY • EXCLUSIVE COVERAGE</span>
              </motion.div>

              <motion.h2 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariant}
                className="font-headline-md text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
              >
                Experience the Dhara Divine Awards Ceremony
              </motion.h2>

              <motion.p 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariant}
                className="font-body-lg text-ethereal-white/85 text-sm sm:text-base leading-relaxed"
              >
                Relive the full 4-hour live national ceremony from Chetpet, Chennai — featuring keynote addresses, soul-stirring cultural tributes, and the historic honoring of grassroots Sanatana Dharma champions.
              </motion.p>
            </div>

            {/* CTA Card + Highlights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
              
              {/* Left Column: Premium CTA Card (8 cols) */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariant}
                className="lg:col-span-8 space-y-5"
              >
                <Link
                  href="https://dhara-devineawards.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-2 border-saffron-glow/40 bg-deep-forest"
                >
                  {/* Background Image */}
                  <img
                    src="/images/hero-devi.png"
                    alt="Dhara Divine Awards Ceremony"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center">
                    {/* Play Button Circle */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-saffron-glow/90 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-saffron-glow transition-all duration-300">
                      <ArrowRight size={36} className="text-deep-forest ml-1" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
                        Visit the Divine Awards Portal
                      </h3>
                      <p className="text-sm sm:text-base text-ethereal-white/80 max-w-md mx-auto">
                        Explore awardees, ceremony highlights, photo galleries, and the complete 4-hour broadcast
                      </p>
                    </div>
                  </div>

                  {/* Hover Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </Link>

                {/* Meta Bar */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-ethereal-white/80">
                  <div className="flex items-center gap-2">
                    <Video className="text-saffron-glow shrink-0" size={18} />
                    <span className="font-bold text-white font-mono">Official Ceremony Archive</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="flex items-center gap-1.5">
                      <Clock className="text-amber-400 shrink-0" size={16} />
                      <span>Duration: <strong>4 Hours</strong></span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>Chetpet, Chennai</span>
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Ceremony Highlights & Timeline (4 cols) */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariant}
                className="lg:col-span-4 space-y-6"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-white/20 space-y-6 shadow-xl">
                  <div className="flex items-center gap-3 border-b border-white/15 pb-4">
                    <div className="p-2.5 rounded-xl bg-saffron-glow/20 text-saffron-glow">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white font-headline-sm">Ceremony Highlights</h3>
                      <p className="text-xs text-ethereal-white/70 font-mono">Key ceremony milestones</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-3.5 items-start">
                      <div className="p-1.5 rounded-lg bg-saffron-glow/15 text-saffron-glow mt-0.5 shrink-0">
                        <CheckCircle2 size={16} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-white">Vedic Invocation &amp; Deepa Pragatya</h4>
                        <p className="text-xs text-ethereal-white/75 leading-relaxed">
                          Sacred Vedic mantras, traditional lamp lighting ceremony, and divine blessings from spiritual dignitaries.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3.5 items-start">
                      <div className="p-1.5 rounded-lg bg-saffron-glow/15 text-saffron-glow mt-0.5 shrink-0">
                        <CheckCircle2 size={16} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-white">
                          Founder&apos;s Keynote &amp; Vision
                        </h4>
                        <p className="text-xs text-ethereal-white/75 leading-relaxed">
                          Inspiring address highlighting our mission to protect temple heritage and uplift rural welfare across Tamil Nadu.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3.5 items-start">
                      <div className="p-1.5 rounded-lg bg-saffron-glow/15 text-saffron-glow mt-0.5 shrink-0">
                        <CheckCircle2 size={16} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-white">Traditional Cultural Tributes</h4>
                        <p className="text-xs text-ethereal-white/75 leading-relaxed">
                          Classical dance, devotional music, and authentic folk art performances by renowned traditional artists.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3.5 items-start">
                      <div className="p-1.5 rounded-lg bg-saffron-glow/15 text-saffron-glow mt-0.5 shrink-0">
                        <CheckCircle2 size={16} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-amber-300">Seva Ratna Awards Conferral</h4>
                        <p className="text-xs text-ethereal-white/80 leading-relaxed">
                          The defining moment honoring 25+ unheralded grassroots champions before 500+ distinguished guests.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 space-y-4">
                    <p className="text-[11px] font-mono text-saffron-glow/90 italic text-center">
                      &quot;Recognizing those who serve the divine by serving humanity without seeking fame or reward.&quot;
                    </p>
                    <Link
                      href="https://dhara-devineawards.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-saffron-glow hover:bg-amber-400 text-deep-forest font-bold text-sm transition-all shadow-lg hover:scale-[1.02]"
                    >
                      <span>Explore Awards Portal</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>



      {/* ==========================================
          SECTION 3 — STATS BAR
         ========================================== */}
      <section className="bg-[#EFECE6] border-y border-[#D9CBB0]/40 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUpVariant}
            className="text-center max-w-2xl mx-auto space-y-2"
          >
            <h2 className="font-headline-md text-2xl sm:text-3xl font-bold text-deep-forest">
              Creating Real Impact Across Communities
            </h2>
            <p className="font-body-sm text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              /* Verifiable milestones in service & cultural revival */
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-[#D9CBB0]/60 text-center"
          >
            {/* Stat 1 */}
            <motion.div variants={fadeUpVariant} whileHover={shouldReduceMotion ? {} : { scale: 1.08, y: -4 }} transition={{ type: "spring", stiffness: 300 }} className="p-4 space-y-2 cursor-pointer rounded-2xl hover:bg-white/50 transition-colors">
              <div className="font-headline-md text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                <CounterItem target={2024} shouldReduceMotion={shouldReduceMotion} />
              </div>
              <div className="font-body-md text-xs sm:text-sm text-on-surface-variant font-medium">
                Year Founded & Trust Registered
              </div>
            </motion.div>

            {/* Stat 2 */}
            <motion.div variants={fadeUpVariant} whileHover={shouldReduceMotion ? {} : { scale: 1.08, y: -4 }} transition={{ type: "spring", stiffness: 300 }} className="p-4 space-y-2 cursor-pointer rounded-2xl hover:bg-white/50 transition-colors">
              <div className="font-headline-md text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                <CounterItem target={4} shouldReduceMotion={shouldReduceMotion} />
              </div>
              <div className="font-body-md text-xs sm:text-sm text-on-surface-variant font-medium">
                Core Sectors Served
              </div>
            </motion.div>

            {/* Stat 3 - [CLIENT TO CONFIRM] -> static render per instruction */}
            <motion.div variants={fadeUpVariant} whileHover={shouldReduceMotion ? {} : { scale: 1.08, y: -4 }} transition={{ type: "spring", stiffness: 300 }} className="p-4 space-y-2 cursor-pointer rounded-2xl hover:bg-white/50 transition-colors">
              <div className="font-headline-md text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                <CounterItem target={null} staticText="25+" shouldReduceMotion={shouldReduceMotion} />
              </div>
              <div className="font-body-md text-xs sm:text-sm text-on-surface-variant font-medium">
                Events & Welfare Drives
              </div>
            </motion.div>

            {/* Stat 4 - [CLIENT TO CONFIRM] -> static render per instruction */}
            <motion.div variants={fadeUpVariant} whileHover={shouldReduceMotion ? {} : { scale: 1.08, y: -4 }} transition={{ type: "spring", stiffness: 300 }} className="p-4 space-y-2 cursor-pointer rounded-2xl hover:bg-white/50 transition-colors">
              <div className="font-headline-md text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                <CounterItem target={null} staticText="10,000+" shouldReduceMotion={shouldReduceMotion} />
              </div>
              <div className="font-body-md text-xs sm:text-sm text-on-surface-variant font-medium">
                Beneficiaries Reached
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* ==========================================
          SECTION 5 — TESTIMONIALS / IMPACT STORIES
         ========================================== */}
      <section className="bg-deep-forest text-ethereal-white py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Heading */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUpVariant}
            className="lg:col-span-4 space-y-6 text-center lg:text-left"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-saffron-glow/15 text-saffron-glow font-label-md text-xs font-bold uppercase tracking-widest">
              Community Feedback
            </div>
            <h2 className="font-headline-md text-3xl sm:text-4xl font-bold leading-tight">
              Voices From the Community
            </h2>
            <p className="font-body-md text-ethereal-white/80 text-sm leading-relaxed">
              /* [CLIENT TO SUPPLY TESTIMONIAL CONTENT] */ <br/>
              Listen to the heartfelt experiences of village elders, volunteer coordinators, and temple trustees whose lives have been impacted by Dhara initiatives.
            </p>
            <div className="pt-2">
              <Link 
                href="/partnership"
                className="inline-block px-8 py-3.5 rounded-full bg-primary hover:bg-[#633800] text-white font-label-lg font-bold transition-all shadow-lg active:scale-95"
              >
                Partner With Us
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Staggered Overlapping Cards (Side -> Side -> Center) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Card 1 (Side 1) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1, ease: "easeOut" } }
              }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm space-y-4 relative group cursor-pointer hover:bg-white/10 transition-colors"
            >
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.4 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                <Quote className="text-primary absolute top-4 right-4 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" size={32} />
              </motion.div>
              <p className="font-body-sm text-xs sm:text-sm leading-relaxed text-ethereal-white/90 italic">
                &ldquo;The footwear and school supplies distributed to our Javadhu Hills students brought immense joy. Dhara Foundations serves with genuine devotion.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center font-bold text-xs text-white group-hover:scale-110 transition-transform">
                  KR
                </div>
                <div>
                  <div className="font-bold text-xs">K. Ramachandran</div>
                  <div className="text-[10px] text-saffron-glow font-mono">Headmaster, Tribal School</div>
                </div>
              </div>
            </motion.div>

            {/* Card 2 (Center Raised - Delayed to settle on top last) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.35, ease: "easeOut" } }
              }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/10 border-2 border-saffron-glow/50 p-6 sm:p-8 rounded-3xl backdrop-blur-md shadow-2xl space-y-4 relative md:-translate-y-4 z-10 group cursor-pointer hover:border-saffron-glow transition-colors"
            >
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.4 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                <Quote className="text-saffron-glow absolute top-6 right-6 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300" size={40} />
              </motion.div>
              <p className="font-body-md text-sm leading-relaxed text-ethereal-white font-medium italic">
                &ldquo;During our ancient temple Kumbabhishekam, Dhara volunteers stood by us with flawless organization and Anna Daanam support. Truly blessed work!&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/15">
                <div className="w-10 h-10 rounded-full bg-saffron-glow text-deep-forest flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                  SS
                </div>
                <div>
                  <div className="font-bold text-sm text-saffron-glow">Sivakumar Sastry</div>
                  <div className="text-xs text-ethereal-white/80 font-mono">Temple Trustee, Kanchipuram</div>
                </div>
              </div>
            </motion.div>

            {/* Card 3 (Side 2) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: "easeOut" } }
              }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm space-y-4 relative group cursor-pointer hover:bg-white/10 transition-colors"
            >
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.4 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                <Quote className="text-primary absolute top-4 right-4 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" size={32} />
              </motion.div>
              <p className="font-body-sm text-xs sm:text-sm leading-relaxed text-ethereal-white/90 italic">
                &ldquo;Volunteering at the Dhara Divine Awards showed me how deeply they care for unheralded traditional artists. It is an honor to be part of this mission.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center font-bold text-xs text-white group-hover:scale-110 transition-transform">
                  AL
                </div>
                <div>
                  <div className="font-bold text-xs">Anitha Lakshmi</div>
                  <div className="text-[10px] text-saffron-glow font-mono">Youth Volunteer Coordinator</div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ==========================================
          SECTION 6 — FEATURE LIST WITH CONNECTOR PATH ("Why Dhara Divine Awards Matter")
         ========================================== */}
      <section className="bg-[#EFECE6] py-24 px-6 md:px-12 border-t border-[#D9CBB0]/40 relative overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUpVariant}
            className="text-center max-w-2xl mx-auto space-y-3"
          >
            <h2 className="font-headline-md text-3xl sm:text-4xl font-bold text-deep-forest">
              Why Dhara Divine Awards Matter
            </h2>
            <p className="font-body-md text-on-surface-variant text-sm sm:text-base">
              We approach the prestigious Dhara Divine Awards not as a momentary ceremony, but as a national movement recognizing our unsung grassroots custodians and spiritual protectors.
            </p>
          </motion.div>

          {/* Vertical Alternating Features with SVG Connectors */}
          <div className="relative space-y-12 md:space-y-24 py-6">
            
            {/* Decorative Central Spine on Mobile */}
            <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-primary/30 md:hidden pointer-events-none" />

            {/* Feature 1 (Left) */}
            <div className="relative flex flex-col md:flex-row items-center justify-start gap-6 md:w-2/3 ml-0 group cursor-pointer">
              <motion.div 
                initial={{ scale: shouldReduceMotion ? 1 : 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.15, rotate: 12 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shrink-0 z-10 group-hover:bg-saffron-glow group-hover:text-deep-forest transition-colors"
              >
                <Sparkles size={28} />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border border-[#D9CBB0]/60 flex-1 transition-shadow"
              >
                <h3 className="font-headline-sm text-lg font-bold text-deep-forest mb-1 group-hover:text-primary transition-colors">1. Honoring Unsung Custodians</h3>
                <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Recognizing grassroots protectors, traditional temple priests, and Vedic scholars whose lifelong devotion preserves our sacred heritage in remote corners of Bharat.
                </p>
              </motion.div>
              {/* Connector Path 1 -> 2 */}
              <svg className="hidden md:block absolute -bottom-20 left-1/2 w-64 h-24 pointer-events-none text-deep-forest/40" viewBox="0 0 250 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5">
                <motion.path 
                  d="M 50 10 Q 180 10 200 80" 
                  initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
                <motion.polygon 
                  points="196,75 200,85 204,75" 
                  fill="currentColor"
                  initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 0.8 }}
                />
              </svg>
            </div>

            {/* Feature 2 (Right) */}
            <div className="relative flex flex-col md:flex-row-reverse items-center justify-start gap-6 md:w-2/3 md:ml-auto group cursor-pointer">
              <motion.div 
                initial={{ scale: shouldReduceMotion ? 1 : 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.15, rotate: -12 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shrink-0 z-10 group-hover:bg-saffron-glow group-hover:text-deep-forest transition-colors"
              >
                <Users size={28} />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border border-[#D9CBB0]/60 flex-1 md:text-right transition-shadow"
              >
                <h3 className="font-headline-sm text-lg font-bold text-deep-forest mb-1 group-hover:text-primary transition-colors">2. Empowering Artisan Communities</h3>
                <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Celebrating traditional craftsmen, sculptors, and heritage revivalists by bringing national visibility and tangible support to their sacred livelihoods.
                </p>
              </motion.div>
              {/* Connector Path 2 -> 3 */}
              <svg className="hidden md:block absolute -bottom-20 right-1/2 w-64 h-24 pointer-events-none text-deep-forest/40" viewBox="0 0 250 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5">
                <motion.path 
                  d="M 200 10 Q 70 10 50 80" 
                  initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
                <motion.polygon 
                  points="46,75 50,85 54,75" 
                  fill="currentColor"
                  initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 0.8 }}
                />
              </svg>
            </div>

            {/* Feature 3 (Left) */}
            <div className="relative flex flex-col md:flex-row items-center justify-start gap-6 md:w-2/3 ml-0 group cursor-pointer">
              <motion.div 
                initial={{ scale: shouldReduceMotion ? 1 : 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.15, rotate: 12 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shrink-0 z-10 group-hover:bg-saffron-glow group-hover:text-deep-forest transition-colors"
              >
                <ShieldCheck size={28} />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border border-[#D9CBB0]/60 flex-1 transition-shadow"
              >
                <h3 className="font-headline-sm text-lg font-bold text-deep-forest mb-1 group-hover:text-primary transition-colors">3. Rigorous & Transparent Selection</h3>
                <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  An uncompromised, merit-based selection process honoring genuine cultural elevation across rural hamlets and historic temple ecosystems.
                </p>
              </motion.div>
              {/* Connector Path 3 -> 4 */}
              <svg className="hidden md:block absolute -bottom-20 left-1/2 w-64 h-24 pointer-events-none text-deep-forest/40" viewBox="0 0 250 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5">
                <motion.path 
                  d="M 50 10 Q 180 10 200 80" 
                  initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
                <motion.polygon 
                  points="196,75 200,85 204,75" 
                  fill="currentColor"
                  initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 0.8 }}
                />
              </svg>
            </div>

            {/* Feature 4 (Right) */}
            <div className="relative flex flex-col md:flex-row-reverse items-center justify-start gap-6 md:w-2/3 md:ml-auto group cursor-pointer">
              <motion.div 
                initial={{ scale: shouldReduceMotion ? 1 : 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.15, rotate: -12 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shrink-0 z-10 group-hover:bg-saffron-glow group-hover:text-deep-forest transition-colors"
              >
                <Award size={28} />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border border-[#D9CBB0]/60 flex-1 md:text-right transition-shadow"
              >
                <h3 className="font-headline-sm text-lg font-bold text-deep-forest mb-1 group-hover:text-primary transition-colors">4. National Inspiration & Legacy</h3>
                <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Inspiring future generations to take pride in Sanatana Dharma by celebrating extraordinary lives of selflessness, Dharma preservation, and community leadership.
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

