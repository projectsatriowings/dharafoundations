"use client";

import React, { useState } from "react";
import { ScrollReveal, RevealItem } from "@/components/motion/ScrollReveal";
import { ParallaxBg } from "@/components/motion/ParallaxBg";

const SIX_MODERN_CARDS = [
  {
    id: "reg-cert",
    title: "Dhara Foundation – Registrations & Certifications",
    date: "20 Feb, 2025",
    img: "/images/news/card-1.jpg",
    isDoc: true,
  },
  {
    id: "gov-maharashtra",
    title: "Governor of Maharashtra Appreciates DHARA Divine Awards",
    date: "31 Aug, 2025",
    img: "/images/news/card-2.png",
    isDoc: true,
  },
  {
    id: "sendoff-ceremony",
    title: "Send-Off Ceremony in Honour of His Excellency, Hon. Governor",
    date: "30 May, 2026",
    img: "/images/news/card-3.jpg",
  },
  {
    id: "mupperum-vizha",
    title: "Mupperum Vizha",
    date: "28 Jan, 2024",
    img: "/images/news/card-4.jpg",
  },
  {
    id: "ambedkar-award",
    title: "Dr. Ambedkar Seva Rathna Award",
    date: "25 Oct, 2024",
    img: "/images/news/card-5.jpg",
  },
  {
    id: "dhara-divine-awards",
    title: "DHARA Divine Awards",
    date: "24 Jan, 2026",
    img: "/images/news/card-6.jpg",
  },
];

export default function NewsPage() {
  const [articlesList] = useState<typeof SIX_MODERN_CARDS>(SIX_MODERN_CARDS);

  return (
    <div className="flex flex-col relative w-full overflow-hidden bg-background">
      {/* Hero Header Section */}
      <section className="relative pt-28 sm:pt-36 pb-12 px-6 sm:px-8 w-full max-w-[1440px] mx-auto flex flex-col items-center text-center">
        <ScrollReveal className="max-w-4xl space-y-4 w-full flex flex-col items-center">
          <span className="font-label font-bold text-xs tracking-[0.2em] text-primary uppercase">
            News & Press Releases
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-deep-forest dark:text-ethereal-white font-bold tracking-tight">
            News & Media
          </h1>
          <p className="font-body text-on-surface-variant max-w-xl mx-auto leading-relaxed text-base sm:text-lg">
            Explore recent announcements, official certifications, and field reports chronicling our service to society.
          </p>
        </ScrollReveal>
      </section>

      {/* Main 6 Cards Grid Section */}
      <section className="pb-20 pt-4 px-6 sm:px-8 md:px-12 max-w-[1300px] mx-auto w-full">
        <ScrollReveal staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {articlesList.map((art, idx) => (
            <RevealItem key={`${art.id}-${idx}`} className="h-full">
              <article className="bg-surface-container-lowest dark:bg-surface-container rounded-[22px] overflow-hidden border border-outline-variant/30 shadow-soft hover:shadow-soft-hover transition-all duration-300 hover:-translate-y-1.5 flex flex-col group h-full cursor-pointer">
                {/* Image Area */}
                <div className={`relative h-[290px] sm:h-[310px] w-full overflow-hidden ${art.isDoc ? "bg-white p-4 pb-8 flex items-center justify-center border-b border-outline-variant/20" : "bg-surface-container-low"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={art.img}
                    alt={art.title}
                    className={`w-full h-full transition-transform duration-500 ease-out group-hover:scale-105 ${
                      art.isDoc ? "object-contain" : "object-cover object-top"
                    }`}
                  />
                </div>

                {/* Overlapping Pill Date Badge */}
                <div className="relative -mt-4 ml-5 z-10 bg-white dark:bg-deep-forest shadow-sm border border-outline-variant/30 px-3.5 py-1 rounded-full w-fit font-serif italic font-semibold text-[13px] text-primary">
                  {art.date}
                </div>

                {/* Content Area */}
                <div className="p-5 sm:p-6 pt-3.5 flex flex-col flex-1 justify-between">
                  <h3 className="font-heading font-bold text-[17px] sm:text-[18px] text-deep-forest dark:text-ethereal-white group-hover:text-primary transition-colors leading-snug mb-5 line-clamp-2">
                    {art.title}
                  </h3>

                  <div className="pt-3.5 border-t border-outline-variant/20 flex items-center gap-1.5 font-label font-bold text-[13px] text-on-surface-variant group-hover:text-primary transition-colors">
                    <span>&rarr; Read More</span>
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
        </ScrollReveal>
      </section>

      {/* Newsletter CTA (Parallax Background) */}
      <ParallaxBg
        bgUrl="/images/banner.png"
        className="w-full min-h-[440px] flex items-center justify-center text-center px-6"
        overlayClassName="bg-deep-forest/85"
      >
        <ScrollReveal className="relative z-10 max-w-2xl mx-auto bg-surface-container-lowest/15 backdrop-blur-xl p-10 md:p-14 rounded-[32px] border border-ethereal-white/20 shadow-2xl space-y-6 text-ethereal-white">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">
            Stay Connected with Our Journey
          </h2>
          <p className="font-body text-surface-variant max-w-lg mx-auto leading-relaxed text-base">
            Subscribe to receive a monthly digest of stories, impact reports, and upcoming events delivered directly to your inbox.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto pt-2">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="grow rounded-full px-6 py-4 bg-ethereal-white/10 border border-ethereal-white/30 text-ethereal-white placeholder:text-surface-variant/70 focus:outline-none focus:border-saffron-glow transition-all text-base backdrop-blur-md"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-full bg-saffron-glow text-deep-forest font-bold hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shrink-0 cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </ScrollReveal>
      </ParallaxBg>
    </div>
  );
}
