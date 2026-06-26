"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ScrollReveal, RevealItem } from "@/components/motion/ScrollReveal";
import { ParallaxBg } from "@/components/motion/ParallaxBg";
import { PillButton } from "@/components/ui/PillButton";
import { LightboxModal } from "@/components/ui/LightboxModal";

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
];

export default function HomePage() {
  const [activeModalItem, setActiveModalItem] = useState<(typeof HOME_GALLERY)[0] | null>(null);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Section 1: Hero */}
      <ParallaxBg
        bgUrl="/images/banner.png"
        className="min-h-[85vh] flex items-center justify-center text-ethereal-white"
        overlayClassName="bg-deep-forest/70 mix-blend-multiply"
      >
        <ScrollReveal className="text-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full py-20">
          <span className="inline-block px-5 py-2 rounded-full bg-saffron-glow/20 text-saffron-glow font-label-lg uppercase tracking-widest mb-6 border border-saffron-glow/40 backdrop-blur-md shadow-[0_0_15px_rgba(255,210,127,0.2)] animate-pulse">
            Dhara Divine Awards 2025
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-ethereal-white mb-8 max-w-4xl mx-auto drop-shadow-lg leading-tight">
            Transforming Lives, <br />
            <span className="text-saffron-glow italic font-light">Preserving Traditions.</span>
          </h1>
          <p className="font-body-lg text-surface-container-high max-w-2xl mx-auto mb-10 opacity-90 leading-relaxed">
            A non-profit organization dedicated to cultural revival, compassionate service, and spiritual awareness.
          </p>
          <div className="flex justify-center">
            <PillButton href="/about" showArrow variant="primary">
              Discover More
            </PillButton>
          </div>
        </ScrollReveal>
      </ParallaxBg>

      {/* Section 2: About / Welcome */}
      <section className="py-section-gap-md md:py-section-gap-lg px-margin-mobile md:px-margin-desktop bg-surface relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-fixed/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
          <ScrollReveal direction="right" className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-saffron-glow/20 organic-shape translate-x-4 translate-y-4 blur-xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Welcome Image"
              className="w-full h-auto organic-shape object-cover shadow-2xl relative z-10 hover:scale-[1.02] transition-transform duration-700"
              src="/images/about.png"
            />
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.15} className="order-1 lg:order-2 space-y-6">
            <span className="font-headline-sm text-secondary tracking-wide block font-semibold">
              Welcome to Dhara Foundations
            </span>
            <h2 className="font-headline-md md:text-5xl font-bold text-on-surface leading-tight">
              Transforming lives and preserving traditions with compassion
            </h2>
            <div className="space-y-4 font-body-lg text-on-surface-variant opacity-90 leading-relaxed">
              <p>
                Dhara Foundations is a non-profit organization dedicated to transforming lives and protecting traditions. We work for the upliftment of:
              </p>
              <ul className="list-none space-y-3 pt-2">
                {[
                  "Tribal and rural communities",
                  "Physically and mentally challenged individuals",
                  "Economically underprivileged groups",
                  "Abandoned temples and spiritual centers",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-on-surface font-medium">
                    <span className="material-symbols-outlined text-primary text-xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="pt-2">
                Our mission combines compassionate service, cultural revival, and spiritual awareness to build a society rooted in values and dignity.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-primary font-label-lg font-bold hover:text-secondary transition-colors group text-base"
              >
                <span>Learn more about our trust</span>
                <span className="material-symbols-outlined group-hover:translate-x-1.5 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 3: Services Bento */}
      <section className="py-section-gap-md md:py-section-gap-lg px-margin-mobile md:px-margin-desktop bg-surface-container-low relative">
        <div className="max-w-container-max mx-auto">
          <ScrollReveal className="text-center mb-16 space-y-2">
            <span className="font-label-lg text-secondary tracking-widest uppercase block">Our Pillars</span>
            <h2 className="font-headline-md md:text-4xl font-bold text-on-surface">Foundational Areas of Work</h2>
          </ScrollReveal>

          <ScrollReveal staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <RevealItem className="modern-card bg-surface-container-lowest p-8 rounded-[24px] shadow-[0_10px_40px_-10px_rgba(36,105,92,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(36,105,92,0.08)] hover:-translate-y-2 transition-all duration-300 group border border-outline-variant/30 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed/30 rounded-bl-full -z-10 group-hover:scale-110 transition-transform" />
              <div>
                <div className="w-16 h-16 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    account_balance
                  </span>
                </div>
                <h3 className="font-headline-sm text-on-surface mb-3 group-hover:text-primary transition-colors text-2xl font-bold">
                  Desiyam <span className="block text-base font-normal text-on-surface-variant pt-1">(National Culture)</span>
                </h3>
                <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
                  We promote and preserve India’s rich cultural identity, from temple traditions to heritage arts.
                </p>
              </div>
              <Link
                href="/programs"
                className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors self-start"
                aria-label="Explore Desiyam"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </RevealItem>

            {/* Pillar 2 (Featured Dark Green) */}
            <RevealItem className="modern-card bg-deep-forest text-ethereal-white p-8 rounded-[24px] shadow-lg hover:shadow-[0_0_35px_rgba(36,105,92,0.35)] hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(172,240,223,0.15),transparent_70%)] pointer-events-none" />
              <div>
                <div className="w-16 h-16 rounded-2xl bg-secondary-fixed/20 text-secondary-fixed flex items-center justify-center mb-6 relative z-10">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    self_improvement
                  </span>
                </div>
                <h3 className="font-headline-sm text-ethereal-white mb-3 relative z-10 text-2xl font-bold group-hover:text-saffron-glow transition-colors">
                  Spiritualism
                </h3>
                <p className="font-body-md text-surface-container-high mb-6 relative z-10 leading-relaxed opacity-90">
                  We support spiritual education, temple renovation, and rituals that connect communities with timeless wisdom.
                </p>
              </div>
              <Link
                href="/programs"
                className="w-11 h-11 rounded-full bg-ethereal-white/10 flex items-center justify-center group-hover:bg-saffron-glow group-hover:text-deep-forest transition-colors relative z-10 self-start"
                aria-label="Explore Spiritualism"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </RevealItem>

            {/* Pillar 3 */}
            <RevealItem className="modern-card bg-surface-container-lowest p-8 rounded-[24px] shadow-[0_10px_40px_-10px_rgba(36,105,92,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(36,105,92,0.08)] hover:-translate-y-2 transition-all duration-300 group border border-outline-variant/30 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary-fixed/30 rounded-tr-full -z-10 group-hover:scale-110 transition-transform" />
              <div>
                <div className="w-16 h-16 rounded-2xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    diversity_1
                  </span>
                </div>
                <h3 className="font-headline-sm text-on-surface mb-3 group-hover:text-secondary transition-colors text-2xl font-bold">
                  Community Welfare
                </h3>
                <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
                  Through rehabilitation, medical care, and social outreach, we empower vulnerable people to live with purpose and pride.
                </p>
              </div>
              <Link
                href="/programs"
                className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-secondary group-hover:text-on-secondary transition-colors self-start"
                aria-label="Explore Community Welfare"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </RevealItem>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 4: CTA Band */}
      <ParallaxBg
        bgUrl="/images/volunteer.png"
        className="py-24 px-margin-mobile md:px-margin-desktop bg-secondary text-ethereal-white"
        overlayClassName="bg-deep-forest/85 mix-blend-multiply"
      >
        <ScrollReveal className="max-w-3xl mx-auto text-center space-y-6">
          <span className="font-label-lg text-secondary-fixed tracking-widest uppercase block font-semibold">
            Become a Volunteer
          </span>
          <h2 className="font-display-lg-mobile md:font-display-lg font-bold leading-tight">
            Join your hand with us for a better life and future
          </h2>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-5 bg-saffron-glow text-deep-forest rounded-full hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,210,127,0.3)] hover:shadow-[0_0_35px_rgba(255,210,127,0.6)] transition-all duration-300 font-label-lg font-bold tracking-wide text-lg"
            >
              Discover More
            </Link>
          </div>
        </ScrollReveal>
      </ParallaxBg>

      {/* Section 5: Events */}
      <section className="py-section-gap-md md:py-section-gap-lg px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-container-max mx-auto">
          <ScrollReveal className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="font-label-lg text-secondary tracking-widest uppercase block font-semibold">
                All Events
              </span>
              <h2 className="font-headline-md md:text-4xl font-bold text-on-surface">View Our All Events</h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Stay updated with our latest initiatives, community gatherings, and spiritual events aimed at uplifting society.
              </p>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-secondary text-secondary rounded-full hover:bg-secondary hover:text-on-secondary hover:scale-105 active:scale-95 transition-all duration-300 font-label-lg font-semibold whitespace-nowrap"
            >
              View All Events
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
              },
              {
                date: "06 Nov, 2025",
                time: "02:00 PM",
                location: "Vellore",
                title: "In Tribal welfare activities at Javadhu hills",
                img: "/images/event-2.png",
              },
              {
                date: "14 Jan, 2025",
                time: "06:00 PM",
                location: "Cuddalore",
                title: "Felicitation of Sports children at Cuddalore during Pongal festival",
                img: "/images/event-3.png",
              },
            ].map((ev, idx) => (
              <RevealItem key={idx} className="h-full">
                <Link
                  href="/events"
                  className="modern-card group block rounded-[24px] overflow-hidden shadow-[0_10px_40px_-10px_rgba(36,105,92,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(36,105,92,0.08)] hover:-translate-y-2 transition-all duration-300 relative h-[420px]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    src={ev.img}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/95 via-deep-forest/40 to-transparent" />
                  <div className="absolute top-5 right-5 bg-ethereal-white text-on-surface px-4 py-1.5 rounded-full font-label-lg text-xs font-bold tracking-wider shadow-md">
                    {ev.date}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 space-y-2">
                    <div className="flex items-center gap-4 text-surface-container-high text-xs font-caption tracking-wider uppercase">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">schedule</span> {ev.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">location_on</span> {ev.location}
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-ethereal-white group-hover:text-saffron-glow transition-colors text-xl font-bold line-clamp-3">
                      {ev.title}
                    </h3>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Section 6: Photo Gallery Strip */}
      <section className="py-section-gap-md px-margin-mobile md:px-margin-desktop bg-surface-container-low overflow-hidden">
        <div className="max-w-container-max mx-auto text-center mb-16">
          <ScrollReveal>
            <span className="font-label-lg text-secondary tracking-widest uppercase block mb-2 font-semibold">
              Visual Journey
            </span>
            <h2 className="font-headline-md md:text-4xl font-bold text-on-surface">Our Photo Gallery</h2>
          </ScrollReveal>
        </div>

        <ScrollReveal staggerChildren={0.12} className="flex gap-8 justify-center flex-wrap lg:flex-nowrap max-w-container-max mx-auto">
          {HOME_GALLERY.map((img, i) => (
            <RevealItem
              key={i}
              className={`w-full sm:w-1/2 lg:w-1/3 rounded-[24px] overflow-hidden shadow-soft hover:shadow-soft-hover hover:-translate-y-2 transition-all duration-300 relative group h-72 md:h-80 cursor-pointer gallery-tile ${
                i === 1 ? "lg:-translate-y-8" : ""
              }`}
            >
              <div
                onClick={() => setActiveModalItem(img)}
                className="w-full h-full block relative"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  src={img.src}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-deep-forest/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-saffron-glow text-deep-forest flex items-center justify-center shadow-lg scale-90 group-hover:scale-100 transition-transform">
                    <span className="material-symbols-outlined text-3xl">zoom_in</span>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </ScrollReveal>
        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 font-label-lg font-bold text-primary hover:text-secondary transition-colors"
          >
            <span>Explore All Moments</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* Modal Dialogue */}
      <LightboxModal item={activeModalItem} onClose={() => setActiveModalItem(null)} />
    </div>
  );
}
