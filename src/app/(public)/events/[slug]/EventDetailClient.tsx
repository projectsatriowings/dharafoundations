"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Share2, 
  Navigation, 
  ExternalLink, 
  ArrowLeft, 
  AlertCircle, 
  Sparkles, 
  CheckCircle2, 
  UserPlus,
  Play,
  X,
  Award,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { type Event } from "@/data/events";
import { LightboxModal } from "@/components/ui/LightboxModal";


interface EventDetailClientProps {
  event: Event;
}

export function EventDetailClient({ event }: EventDetailClientProps) {
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<{
    src: string;
    alt: string;
    caption?: string;
  } | null>(null);

  const [isRegistered, setIsRegistered] = useState(false);

  const [pageUrl, setPageUrl] = useState(`https://dharafoundations.in/events/${event.id}`);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
    }
  }, []);

  const twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(event.title)}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
  const pinterestShare = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(pageUrl)}&description=${encodeURIComponent(event.title)}`;
  const instagramShare = "https://instagram.com"; // Direct link since IG doesn't have web sharer URL

  return (
    <div className="min-h-screen bg-surface text-foreground font-body pb-24">
      {/* Decorative Top Banner Strip using Brand Gradient */}
      <div className="w-full h-3 bg-[linear-gradient(90deg,#8a5000_0%,#f49b33_50%,#FFD27F_100%)] shadow-sm" />

      {/* Hero / Header Section */}
      <section className="bg-deep-forest text-ethereal-white pt-28 sm:pt-32 pb-14 sm:pb-16 px-6 md:px-12 relative overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto relative z-10 space-y-4">
          <Link 
            href="/events" 
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-saffron-glow hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>BACK TO ALL EVENTS</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Pill Date Badge matching existing Dhara spec (#9A8678 treatment) */}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#9A8678]/25 text-[#d9c3b0] border border-[#9A8678]/40 text-xs font-label-md font-bold uppercase tracking-wider">
              <Calendar size={13} />
              <span>{event.date}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/30 text-saffron-glow border border-primary/40 text-xs font-label-md font-bold uppercase tracking-wider">
              <span>{event.category}</span>
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl pt-2">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-ethereal-white/80 font-mono">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-saffron-glow" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-saffron-glow" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>

        {/* Subtle background cover overlay */}
        <div className="absolute inset-0 z-0 opacity-15">
          <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover object-top" />
        </div>
      </section>

      {/* Main Two-Column Content Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: Main Description & Gallery (~65% width) */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Main Hero Cover Image (Uncropped, Full Visibility) */}
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/30 bg-surface-container-low dark:bg-surface-container relative p-3 sm:p-6 flex flex-col items-center justify-center">
            <img 
              src={event.coverImage} 
              alt={event.title} 
              className="max-h-[620px] w-auto object-contain rounded-2xl mx-auto shadow-md"
            />
            <div className="w-full pt-3 px-2 flex items-center justify-between text-xs font-mono text-on-surface-variant border-t border-outline-variant/20 mt-3">
              <span className="inline-flex items-center gap-1.5 text-primary font-semibold">
                <ShieldCheck size={14} /> Official Dhara Foundation Archive
              </span>
              <span>Event Date: {event.date}</span>
            </div>
          </div>

          {/* Unconfirmed Content Notice if applicable */}
          {event.isContentUnconfirmed && (
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-start gap-3.5 text-on-surface">
              <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={20} />
              <div className="space-y-1 text-xs sm:text-sm">
                <span className="font-bold text-amber-800 uppercase tracking-wide block font-mono text-[11px]">
                  [CONTENT TO BE GATHERED FROM SOURCE SITE / CLIENT]
                </span>
                <p className="text-on-surface-variant">
                  This event listing reflects confirmed scheduling data. Detailed multi-paragraph reports and original high-resolution gallery archives are currently being compiled by the field team.
                </p>
              </div>
            </div>
          )}

          {/* Description Paragraphs */}
          <div className="space-y-6 text-base sm:text-lg text-on-surface leading-relaxed font-body">
            {event.description.map((para, idx) => (
              <p key={idx} className={idx === 0 ? "font-medium text-deep-forest text-lg sm:text-xl leading-relaxed" : "text-on-surface-variant"}>
                {para}
              </p>
            ))}
          </div>

          {/* Image Gallery Grid */}
          {event.galleryImages.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-outline-variant/30">
              <div className="space-y-1">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-deep-forest">
                  Event Gallery
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant font-medium">
                  Click any photo to inspect high-resolution moment archives.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {event.galleryImages.map((imgSrc, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() =>
                      setSelectedGalleryImg({
                        src: imgSrc,
                        alt: `${event.title} - Photo ${idx + 1}`,
                        caption: `${event.title} • Photo ${idx + 1}`,
                      })
                    }
                    className="aspect-square rounded-2xl overflow-hidden bg-surface-container border border-outline-variant/30 shadow-sm hover:shadow-lg cursor-pointer relative group"
                  >
                    <img 
                      src={imgSrc} 
                      alt={`${event.title} photo ${idx + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-deep-forest/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-xs font-bold text-white uppercase tracking-wider bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-sm">
                        View
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Closing CTA Box */}
          <div className="p-8 sm:p-10 rounded-3xl bg-surface-container border border-outline-variant/40 shadow-xl space-y-6 relative overflow-hidden">
            <div className="relative z-10 space-y-3 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-primary">
                <Sparkles size={14} />
                <span>Participate & Contribute</span>
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-deep-forest">
                Join Us For This Exciting Event
              </h3>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                Be part of an unforgettable community experience dedicated to cultural revival and social empowerment. Register yourself today to receive official seating passes and volunteer updates.
              </p>
            </div>

            <div className="relative z-10 pt-2 flex flex-wrap items-center gap-4">
              <Link 
                href={`/contact?topic=Event+Registration&event=${encodeURIComponent(event.title)}`}
                className="px-8 py-4 rounded-full bg-primary hover:bg-[#633800] text-white font-label-lg font-bold transition-all duration-300 shadow-md hover:shadow-xl inline-flex items-center gap-2 cursor-pointer"
              >
                <UserPlus size={18} />
                <span>Register Yourself</span>
              </Link>
              
              <button 
                onClick={() => setIsRegistered(true)}
                className="px-6 py-4 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-label-lg font-bold transition-all text-sm cursor-pointer"
              >
                {isRegistered ? "✓ Interest Recorded!" : "Express Instant Interest"}
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Sticky Sidebar (~35% width) */}
        <div className="lg:col-span-4 space-y-8">
          <div className="sticky top-28 space-y-8">
            
            {/* Info Card with Colored Top Edge Accent */}
            <div className="bg-white rounded-3xl border border-outline-variant/50 shadow-xl p-6 sm:p-8 space-y-6 relative overflow-hidden border-t-4 border-t-primary">
              <h3 className="font-heading text-xl font-bold text-deep-forest pb-3 border-b border-outline-variant/30">
                Event Overview
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <Calendar className="text-primary shrink-0 mt-0.5" size={18} />
                  <div>
                    <span className="block text-xs font-mono text-on-surface-variant uppercase tracking-wider">Date</span>
                    <span className="font-bold text-deep-forest text-base">{event.date}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="text-primary shrink-0 mt-0.5" size={18} />
                  <div>
                    <span className="block text-xs font-mono text-on-surface-variant uppercase tracking-wider">Time</span>
                    <span className="font-bold text-deep-forest text-base">{event.time}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <MapPin className="text-primary shrink-0 mt-0.5" size={18} />
                  <div>
                    <span className="block text-xs font-mono text-on-surface-variant uppercase tracking-wider">Location</span>
                    <span className="font-bold text-deep-forest text-base">{event.location}</span>
                  </div>
                </div>
              </div>

              {/* Social Share Icons Row */}
              <div className="pt-4 border-t border-outline-variant/30 space-y-3">
                <span className="block text-xs font-mono font-bold uppercase tracking-wider text-on-surface-variant">
                  Share This Event
                </span>
                <div className="flex items-center gap-3">
                  <a 
                    href={twitterShare} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Share on Twitter / X"
                    className="w-10 h-10 rounded-full bg-surface-container hover:bg-primary hover:text-white text-deep-forest transition-colors flex items-center justify-center font-bold text-xs border border-outline-variant/30 shadow-sm"
                  >
                    X
                  </a>
                  <a 
                    href={facebookShare} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Share on Facebook"
                    className="w-10 h-10 rounded-full bg-surface-container hover:bg-[#1877F2] hover:text-white text-deep-forest transition-colors flex items-center justify-center font-bold text-xs border border-outline-variant/30 shadow-sm"
                  >
                    FB
                  </a>
                  <a 
                    href={pinterestShare} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Pin on Pinterest"
                    className="w-10 h-10 rounded-full bg-surface-container hover:bg-[#E60023] hover:text-white text-deep-forest transition-colors flex items-center justify-center font-bold text-xs border border-outline-variant/30 shadow-sm"
                  >
                    Pin
                  </a>
                  <a 
                    href={instagramShare} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Follow on Instagram"
                    className="w-10 h-10 rounded-full bg-surface-container hover:bg-gradient-to-tr hover:from-[#f09433] hover:to-[#bc1888] hover:text-white text-deep-forest transition-colors flex items-center justify-center font-bold text-xs border border-outline-variant/30 shadow-sm"
                  >
                    IG
                  </a>
                </div>
              </div>
            </div>

            {/* Map Widget with Interactive Overlay Card */}
            <div className="bg-white rounded-3xl border border-outline-variant/50 shadow-xl overflow-hidden relative">
              <div className="p-5 border-b border-outline-variant/30 bg-surface-container flex items-center justify-between">
                <span className="font-heading font-bold text-sm text-deep-forest flex items-center gap-2">
                  <Navigation size={15} className="text-primary" />
                  <span>Interactive Venue Map</span>
                </span>
                <span className="text-[11px] font-mono font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                  GPS Validated
                </span>
              </div>

              {/* Map Embed Container */}
              <div className="relative h-72 w-full bg-surface-container-high overflow-hidden">
                <iframe
                  title="Venue Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://www.google.com/maps?q=${event.coordinates.lat},${event.coordinates.lng}&hl=en&z=15&output=embed`}
                />

                {/* Floating Overlay Card simulating InfoWindow pattern */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-xl border border-outline-variant/40 space-y-2 pointer-events-auto">
                  <div className="font-bold text-xs text-deep-forest line-clamp-1">
                    {event.title}
                  </div>
                  <div className="text-[11px] text-on-surface-variant flex items-center justify-between">
                    <span>{event.location}</span>
                    <span className="font-mono text-primary font-bold">{event.time}</span>
                  </div>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${event.coordinates.lat},${event.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2 bg-primary hover:bg-[#633800] text-white rounded-lg text-center font-bold text-xs transition-colors shadow-sm"
                  >
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Open in Google / Apple Maps Links */}
              <div className="p-4 bg-surface flex items-center justify-between text-xs font-semibold">
                <a
                  href={`https://www.google.com/maps?q=${event.coordinates.lat},${event.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-deep-forest hover:text-primary inline-flex items-center gap-1 transition-colors"
                >
                  <span>Open Google Maps</span>
                  <ExternalLink size={12} />
                </a>
                <span className="text-outline-variant">•</span>
                <a
                  href={`https://maps.apple.com/?q=${event.coordinates.lat},${event.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-deep-forest hover:text-primary inline-flex items-center gap-1 transition-colors"
                >
                  <span>Open Apple Maps</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Lightbox Modal for Gallery */}
      <LightboxModal 
        item={selectedGalleryImg} 
        onClose={() => setSelectedGalleryImg(null)} 
      />
    </div>
  );
}

