"use client";

import React from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ParallaxBg } from "@/components/motion/ParallaxBg";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { type NewsArticle } from "@/data/news";

interface NewsListClientProps {
  initialArticles: NewsArticle[];
}

export function NewsListClient({ initialArticles }: NewsListClientProps) {
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

      {/* Main Cards Grid Section */}
      <section className="pb-20 pt-4 px-6 sm:px-8 md:px-12 max-w-[1300px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {initialArticles.map((art, idx) => (
            <motion.div
              key={`${art.id}-${idx}`}
              className="h-full"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <Link
                href={art.is_external && art.external_url ? art.external_url : `/news/${art.id}`}
                target={art.is_external && art.external_url ? "_blank" : undefined}
                className="block h-full group"
              >
                <article className="bg-surface-container-lowest dark:bg-surface-container rounded-[22px] overflow-hidden border border-outline-variant/30 shadow-soft group-hover:shadow-soft-hover transition-all duration-300 group-hover:-translate-y-1.5 flex flex-col h-full cursor-pointer">
                  {/* Image Area */}
                  <div
                    className={`relative h-[290px] sm:h-[310px] w-full overflow-hidden ${
                      art.isDoc
                        ? "bg-white p-4 pb-8 flex items-center justify-center border-b border-outline-variant/20"
                        : "bg-surface-container-low"
                    }`}
                  >
                    {art.img && (art.img.match(/\.(mp4|webm|mov|mkv)$/i) || art.img.includes('/video/upload/')) ? (
                      <video
                        src={art.img}
                        muted
                        loop
                        playsInline
                        autoPlay
                        className={`w-full h-full transition-transform duration-500 ease-out group-hover:scale-105 ${
                          art.isDoc ? "object-contain" : (art.id === "dhara-divine-awards" ? "object-cover object-center" : "object-cover object-top")
                        }`}
                      />
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={art.img}
                        alt={art.title}
                        className={`w-full h-full transition-transform duration-500 ease-out group-hover:scale-105 ${
                          art.isDoc ? "object-contain" : (art.id === "dhara-divine-awards" ? "object-cover object-center" : "object-cover object-top")
                        }`}
                      />
                    )}
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

                    <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-start mt-auto">
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container/80 dark:bg-surface-container-high/80 group-hover:bg-primary text-deep-forest dark:text-ethereal-white group-hover:text-white font-label font-bold text-xs sm:text-[13px] transition-all duration-300 shadow-sm group-hover:shadow-md">
                        <span>{art.is_external && art.external_url ? "Visit External News" : "Read More"}</span>
                        {art.is_external && art.external_url ? (
                          <ExternalLink size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
                        ) : (
                          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
                        )}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
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
