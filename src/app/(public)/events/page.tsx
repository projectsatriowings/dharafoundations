"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Heart, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  ExternalLink,
  Quote
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { EVENTS_DATA } from "@/data/events";

// ==========================================
// DATA DEFINITIONS
// ==========================================

const FULL_EVENTS_LIST = EVENTS_DATA.map((ev) => ({
  id: ev.id,
  title: ev.title,
  category: ev.category,
  date: ev.date,
  time: ev.time,
  location: ev.location,
  mapsUrl: `https://www.google.com/maps?q=${ev.coordinates.lat},${ev.coordinates.lng}`,
  img: ev.coverImage,
  desc: ev.description[0],
}));

const NEWS_ARTICLES = [
  {
    title: "Registrations & Certifications",
    date: "October 15, 2024",
    desc: "Dhara Foundations achieves updated compliance milestones under the Indian Trust Act, 80G tax exemption status, CSR certification, and NGO-Darpan registry.",
    img: "/images/about.png"
  },
  {
    title: "Governor of Maharashtra Appreciates DHARA Divine Awards 2025",
    date: "November 18, 2024",
    desc: "Honorable Governor commends Dhara Foundations for recognizing grassroot cultural protectors and empowering traditional artisans across India.",
    img: "/images/banner.png"
  },
  {
    title: "Send-Off Ceremony for Governor R.N. Ravi",
    date: "December 10, 2024",
    desc: "Dhara volunteers participate in the prestigious gathering honoring leadership, spiritual renaissance, and relentless support for Sanatana Dharma revival.",
    img: "/images/news.png"
  }
];

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

function EventCard({ 
  ev, 
  idx, 
  shouldReduceMotion, 
  router 
}: { 
  ev: typeof FULL_EVENTS_LIST[0]; 
  idx: number; 
  shouldReduceMotion: boolean | null; 
  router: any;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -6 }}
      transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest("a")) {
          router.push(`/events/${ev.id}`);
        }
      }}
      className="bg-white rounded-3xl border border-[#D9CBB0]/60 overflow-hidden shadow-md hover:shadow-2xl transition-shadow group cursor-pointer flex flex-col sm:flex-row h-full"
    >
      <div className="sm:w-2/5 h-56 sm:h-auto relative overflow-hidden bg-surface-container shrink-0">
        <motion.img 
          variants={{ hover: { scale: shouldReduceMotion ? 1 : 1.08 } }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          src={ev.img} 
          alt={ev.title} 
          className="w-full h-full object-cover" 
        />
        <motion.div 
          whileHover={{ scale: 1.08 }}
          className="absolute top-3 left-3 bg-deep-forest text-saffron-glow px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow"
        >
          {ev.category}
        </motion.div>
      </div>

      <div className="p-6 flex flex-col justify-between flex-1 space-y-6">
        <div className="space-y-3">
          <div className="space-y-1 text-xs font-mono text-primary">
            <div className="flex items-center gap-1.5 font-bold">
              <Calendar size={14} />
              <span>{ev.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <Clock size={14} />
              <span>{ev.time}</span>
            </div>
          </div>

          <h3 className="font-headline-sm text-lg font-bold text-deep-forest leading-snug group-hover:text-primary transition-colors">
            <Link href={`/events/${ev.id}`} className="hover:underline">
              {ev.title}
            </Link>
          </h3>

          <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed line-clamp-3">
            {ev.desc}
          </p>

          <div className="pt-2 flex items-center justify-between">
            <a 
              href={ev.mapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs font-medium text-deep-forest hover:text-primary transition-colors z-10"
            >
              <MapPin size={13} className="text-primary" />
              <span className="line-clamp-1 underline">{ev.location}</span>
              <ExternalLink size={11} />
            </a>

            <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              View Details <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventsPage() {
  const router = useRouter();
  const rawReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const shouldReduceMotion = isMounted ? rawReducedMotion : false;
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("All");

  const scrollToSectionAndFilter = (filterTag?: string) => {
    if (filterTag) {
      // Map category title to filter tag or exact category
      setActiveCategoryFilter(filterTag);
    }
    const el = document.getElementById("full-events-list");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const upcomingEvents = FULL_EVENTS_LIST.filter(ev => ev.date.includes("2026"));
  const recentEvents = FULL_EVENTS_LIST.filter(ev => !ev.date.includes("2026"));

  const filteredRecentEvents = activeCategoryFilter === "All" 
    ? recentEvents 
    : recentEvents.filter(ev => ev.category === activeCategoryFilter || ev.category.includes(activeCategoryFilter));

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
      <section className="relative pt-28 sm:pt-32 pb-20 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/15 text-primary font-label-lg font-bold text-xs uppercase tracking-widest"
            >
              <Sparkles size={14} />
              <span>Dhara Gatherings</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="font-headline-md text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-deep-forest leading-[1.15]"
            >
              Building Community Through Every Gathering
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
              className="font-body-lg text-on-surface-variant text-base sm:text-lg leading-relaxed pt-2"
            >
              Join us in sacred spaces of cultural preservation, spiritual elevation, and active community welfare. Every gathering transforms empathy into enduring action.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
              className="pt-4 flex flex-wrap items-center gap-4"
            >
              <button 
                onClick={() => scrollToSectionAndFilter("All")}
                className="px-8 py-3.5 rounded-full bg-primary hover:bg-[#633800] text-white font-label-lg font-bold transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer flex items-center gap-2"
              >
                <span>Browse Upcoming Events</span>
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
                src="/images/event-2.png" 
                alt="Dhara Gatherings" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/60 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* (a) Circular Rotating Badge (Top Right) */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              onClick={() => scrollToSectionAndFilter("All")}
              className="absolute -top-6 -right-4 sm:-top-8 sm:-right-6 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-deep-forest border-4 border-[#F9F7F2] shadow-xl flex items-center justify-center cursor-pointer group z-20"
            >
              {/* Rotating Text Ring Wheel */}
              <div className="absolute inset-2 pointer-events-none flex items-center justify-center group-hover:[animation:spin_8s_linear_infinite]">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                  <text className="text-[10.5px] font-mono font-bold uppercase fill-saffron-glow tracking-[2.2px]">
                    <textPath href="#circlePath">VIEW ALL EVENTS • SEE OUR WORK • </textPath>
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
          SECTION 2 — PHOTO COLLAGE GRID
         ========================================== */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariant}
          className="text-center max-w-2xl mx-auto mb-12 space-y-3"
        >
          <h2 className="font-headline-md text-3xl sm:text-4xl font-bold text-deep-forest">
            Moments of Seva & Celebration
          </h2>
          <p className="font-body-md text-on-surface-variant text-sm sm:text-base">
            Glimpses from our recent cultural gatherings, temple consecrations, and rural welfare drives.
          </p>
        </motion.div>

        {/* Asymmetric 8-Photo Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 auto-rows-[220px]"
        >
          
          {/* Item 1: Wide Rectangular (Spans 2 cols) */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.92 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
            whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -4 }}
            transition={{ duration: 0.3 }}
            className="sm:col-span-2 relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl group cursor-pointer"
          >
            <img src="/images/gallery-1.png" alt="Dhara Gatherings" className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/90 via-deep-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex items-end">
              <span className="text-white font-bold text-lg translate-y-3 group-hover:translate-y-0 transition-transform duration-300">Girivalam Seva Camp</span>
            </div>
          </motion.div>

          {/* Item 2 */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.92 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
            whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -4 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl group cursor-pointer"
          >
            <img src="/images/event-1.png" alt="Anna Daanam" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/90 via-deep-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex items-end">
              <span className="text-white font-bold text-base translate-y-3 group-hover:translate-y-0 transition-transform duration-300">Anna Daanam Drive</span>
            </div>
          </motion.div>

          {/* Item 3 */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.92 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
            whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -4 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl group cursor-pointer"
          >
            <img src="/images/event-3.png" alt="Temple Restoration" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/90 via-deep-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex items-end">
              <span className="text-white font-bold text-base translate-y-3 group-hover:translate-y-0 transition-transform duration-300">Temple Consecration</span>
            </div>
          </motion.div>

          {/* Item 4 */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.92 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
            whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -4 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl group cursor-pointer"
          >
            <img src="/images/gallery-2.png" alt="Tribal School Outreach" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/90 via-deep-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex items-end">
              <span className="text-white font-bold text-base translate-y-3 group-hover:translate-y-0 transition-transform duration-300">Tribal School Support</span>
            </div>
          </motion.div>

          {/* Item 5: Interactive Overlay Card with Pill Button */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.92 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
            whileHover="hover"
            className="sm:col-span-2 relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl bg-deep-forest border border-white/10 group flex flex-col justify-center items-center p-8 text-center text-white transition-shadow duration-300"
          >
            <motion.img 
              variants={{ hover: { scale: shouldReduceMotion ? 1 : 1.06 } }}
              transition={{ duration: 0.5 }}
              src="/images/banner.png" 
              alt="Gallery Background" 
              className="absolute inset-0 w-full h-full object-cover opacity-25" 
            />
            <motion.div 
              variants={{ hover: { y: shouldReduceMotion ? 0 : -6 } }}
              transition={{ duration: 0.3 }}
              className="relative z-10 space-y-4 max-w-sm"
            >
              <h3 className="font-headline-sm text-2xl font-bold">Witness Our Continuing Journey</h3>
              <p className="text-xs text-ethereal-white/80 font-body-sm">
                Explore hundreds of high-resolution memories across all our Dharma revival sectors.
              </p>
              <Link 
                href="/gallery"
                className="inline-block px-6 py-2.5 rounded-full bg-primary hover:bg-[#633800] text-white font-label-md font-bold transition-all shadow-md active:scale-95"
              >
                See How We Work
              </Link>
            </motion.div>
          </motion.div>

          {/* Item 6 */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.92 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
            whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -4 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl group cursor-pointer"
          >
            <img src="/images/gallery-3.png" alt="Women Empowerment" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/90 via-deep-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex items-end">
              <span className="text-white font-bold text-base translate-y-3 group-hover:translate-y-0 transition-transform duration-300">Women Empowerment Circle</span>
            </div>
          </motion.div>

        </motion.div>
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
          SECTION 4 — UPCOMING & RECENT EVENTS
         ========================================== */}
      <section id="full-events-list" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full space-y-20 scroll-mt-24">
        {/* Upcoming Events Block */}
        <div className="space-y-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUpVariant}
            className="border-b border-[#D9CBB0]/60 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-mono text-xs font-bold uppercase tracking-widest mb-2">
                <Sparkles size={13} />
                <span>Mark Your Calendar</span>
              </div>
              <h2 className="font-headline-md text-3xl sm:text-4xl font-bold text-deep-forest">
                Upcoming Gatherings
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-md">
              Join us in our upcoming ceremonies and welfare drives across Tamil Nadu. Click any event to view the complete schedule, GPS venue map, and registration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((ev, idx) => (
              <EventCard key={ev.id} ev={ev} idx={idx} shouldReduceMotion={shouldReduceMotion} router={router} />
            ))}
          </div>
        </div>

        {/* Recent Events Block with Filter */}
        <div className="space-y-8 pt-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUpVariant}
            className="border-b border-[#D9CBB0]/60 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div>
              <div className="text-xs font-mono font-bold text-primary uppercase tracking-widest mb-1">Impact Archive</div>
              <h2 className="font-headline-md text-3xl sm:text-4xl font-bold text-deep-forest">
                Recent Events & Welfare Drives
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-md">
              Explore our completed milestones in cultural restoration, tribal outreach, and student support across rural districts.
            </p>
          </motion.div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 pb-2">
            {["All", "Temple & Heritage", "Cultural & Spiritual", "Welfare Drives", "Awards & Recognition", "Children & Education", "Women's Empowerment"].map((tag) => (
              <motion.button
                key={tag}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
                onClick={() => setActiveCategoryFilter(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-label-md font-semibold transition-colors cursor-pointer ${
                  activeCategoryFilter === tag 
                    ? "bg-primary text-white shadow-md" 
                    : "bg-white border border-[#D9CBB0]/80 text-on-surface-variant hover:border-primary hover:text-primary hover:shadow-sm"
                }`}
              >
                {tag === "All" ? "All Categories" : tag}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div 
              key={activeCategoryFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredRecentEvents.map((ev, idx) => (
                <EventCard key={ev.id} ev={ev} idx={idx} shouldReduceMotion={shouldReduceMotion} router={router} />
              ))}
            </motion.div>
          </AnimatePresence>
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
          SECTION 6 — NEWS / INSIGHTS CARDS (3-up)
         ========================================== */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full space-y-12">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariant}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div className="space-y-2">
            <h2 className="font-headline-md text-3xl sm:text-4xl font-bold text-deep-forest">
              Latest Updates & Media Mentions
            </h2>
            <p className="font-body-md text-on-surface-variant text-sm">
              Official press highlights and state recognition of Dhara Foundations.
            </p>
          </div>
          <Link 
            href="/news"
            className="px-6 py-2.5 rounded-full bg-primary hover:bg-[#633800] text-white font-label-md font-bold transition-all shadow shrink-0 w-fit"
          >
            Read All News
          </Link>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {NEWS_ARTICLES.map((art, idx) => (
            <motion.div 
              key={idx} 
              variants={cardFadeUpVariant}
              whileHover={shouldReduceMotion ? {} : "hover"}
              className="bg-white rounded-2xl border border-[#D9CBB0]/50 overflow-hidden shadow-sm hover:shadow-2xl transition-shadow flex flex-col justify-between group cursor-pointer"
            >
              <motion.div variants={{ hover: { y: shouldReduceMotion ? 0 : -8 } }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="flex flex-col justify-between h-full">
                <div>
                  <div className="h-48 overflow-hidden bg-surface-container relative">
                    <motion.img 
                      variants={{ hover: { scale: shouldReduceMotion ? 1 : 1.08 } }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      src={art.img} 
                      alt={art.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="text-xs font-mono text-primary font-bold">
                      {art.date}
                    </div>
                    <h3 className="font-headline-sm text-lg font-bold text-deep-forest group-hover:text-primary transition-colors leading-snug">
                      {art.title}
                    </h3>
                    <p className="font-body-sm text-on-surface-variant text-xs leading-relaxed line-clamp-3">
                      {art.desc}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2 border-t border-[#D9CBB0]/30 mt-4">
                  <Link href="/news" className="text-xs font-bold text-deep-forest group-hover:text-primary inline-flex items-center gap-1.5 transition-colors">
                    <span className="underline">Read Article</span>
                    <motion.span variants={{ hover: { x: shouldReduceMotion ? 0 : 4 } }} transition={{ type: "spring", stiffness: 400 }}>
                      <ArrowRight size={14} />
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ==========================================
          SECTION 7 — FEATURE LIST WITH CONNECTOR PATH ("Why Our Events Matter")
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
              Why Our Events Matter
            </h2>
            <p className="font-body-md text-on-surface-variant text-sm sm:text-base">
              We approach every event not as a momentary spectacle, but as a sustainable seed for cultural renaissance and grassroot empowerment.
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
                <h3 className="font-headline-sm text-lg font-bold text-deep-forest mb-1 group-hover:text-primary transition-colors">1. Cultural Authenticity</h3>
                <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Every ritual and celebration strictly follows authentic Sanatana Dharma scriptures and temple traditions, avoiding commercial dilution.
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
                <h3 className="font-headline-sm text-lg font-bold text-deep-forest mb-1 group-hover:text-primary transition-colors">2. Community-Centered</h3>
                <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Our drives are tailored directly around real beneficiary needs—from remote mountain tribal hamlets to underserved urban neighborhoods.
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
                <h3 className="font-headline-sm text-lg font-bold text-deep-forest mb-1 group-hover:text-primary transition-colors">3. Transparent & Registered</h3>
                <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Fully compliant under the Indian Trust Act with verified 80G tax benefits, CSR eligibility, and NITI Aayog NGO-Darpan registry.
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
                <Heart size={28} />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border border-[#D9CBB0]/60 flex-1 md:text-right transition-shadow"
              >
                <h3 className="font-headline-sm text-lg font-bold text-deep-forest mb-1 group-hover:text-primary transition-colors">4. Consistent Impact</h3>
                <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  We maintain long-term relationships with communities rather than one-off photo opportunities, ensuring lasting socio-cultural elevation.
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
