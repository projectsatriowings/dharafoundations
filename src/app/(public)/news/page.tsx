"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal, RevealItem } from "@/components/motion/ScrollReveal";
import { ParallaxBg } from "@/components/motion/ParallaxBg";
import { ArrowRight, X, Clock, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SIX_MODERN_CARDS = [
  {
    id: "reg-cert",
    title: "Dhara Foundation – Registrations & Certifications",
    date: "20 Feb, 2025",
    img: "/images/news/card-1.jpg",
    isDoc: true,
    excerpt: "Official documentation, NGO registrations, 80G/12A compliance, and recognition certificates.",
    body_content: "<p>Dhara Foundation is officially registered under the Indian Trusts Act and holds valid 80G and 12A certifications, ensuring full transparency and tax benefits for all contributors and donors.</p>",
    read_time_minutes: 3,
  },
  {
    id: "gov-maharashtra",
    title: "Governor of Maharashtra Appreciates DHARA Divine Awards",
    date: "31 Aug, 2025",
    img: "/images/news/card-2.png",
    isDoc: true,
    excerpt: "Honourable Governor of Maharashtra extends formal appreciation and commendation for the Dhara Divine Awards.",
    body_content: "<p>In a prestigious recognition of cultural and social service, the Hon'ble Governor of Maharashtra expressed heartfelt appreciation for Dhara Foundation's efforts in honoring grassroots artisans and community leaders.</p>",
    read_time_minutes: 4,
  },
  {
    id: "sendoff-ceremony",
    title: "Send-Off Ceremony in Honour of His Excellency, Hon. Governor",
    date: "30 May, 2026",
    img: "/images/news/card-3.jpg",
    excerpt: "A grand farewell and send-off ceremony organized in honour of His Excellency, the Hon'ble Governor.",
    body_content: "<p>Dhara Foundation participated in and organized a dignified send-off ceremony celebrating the tenure and social contributions of His Excellency, the Hon'ble Governor.</p>",
    read_time_minutes: 3,
  },
  {
    id: "mupperum-vizha",
    title: "Mupperum Vizha",
    date: "28 Jan, 2024",
    img: "/images/news/card-4.jpg",
    excerpt: "Celebrating a historic threefold cultural and community welfare festival with thousands of beneficiaries.",
    body_content: "<p>The Mupperum Vizha brought together community leaders, social workers, and cultural performers for a massive celebration of heritage, unity, and welfare distribution.</p>",
    read_time_minutes: 5,
  },
  {
    id: "ambedkar-award",
    title: "Dr. Ambedkar Seva Rathna Award",
    date: "25 Oct, 2024",
    img: "/images/news/card-5.jpg",
    excerpt: "Dhara Foundation honored with the prestigious Dr. Ambedkar Seva Rathna Award for exemplary social service.",
    body_content: "<p>In recognition of our relentless work in tribal welfare, women empowerment, and child education, Dhara Foundation was conferred the Dr. Ambedkar Seva Rathna Award.</p>",
    read_time_minutes: 3,
  },
  {
    id: "dhara-divine-awards",
    title: "DHARA Divine Awards",
    date: "24 Jan, 2026",
    img: "/images/news/card-6.jpg",
    excerpt: "Annual flagship ceremony felicitating unsung heroes, traditional artisans, and grassroots changemakers.",
    body_content: "<p>The Dhara Divine Awards is our flagship national ceremony dedicated to honoring spiritual leaders, traditional sports coaches, folk artists, and community changemakers.</p>",
    read_time_minutes: 4,
  },
];

export default function NewsPage() {
  const [articlesList, setArticlesList] = useState<any[]>(SIX_MODERN_CARDS);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  useEffect(() => {
    fetch(`/api/public/news?t=${Date.now()}`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.articles) && data.articles.length > 0) {
          const mapped = data.articles.map((art: any) => {
            const dateStr = art.publish_date
              ? new Date(art.publish_date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "2025";
            return {
              id: art.slug || art.id,
              title: art.headline || art.title,
              date: dateStr,
              img: art.featured_image_url || "/images/news/card-1.jpg",
              isDoc: art.slug?.includes("reg-cert") || art.slug?.includes("gov-"),
              excerpt: art.excerpt || "",
              body_content: art.body_content || "",
              read_time_minutes: art.read_time_minutes || 3,
              is_external: art.is_external || false,
              external_url: art.external_url || "",
            };
          });
          setArticlesList(mapped);
        }
      })
      .catch((err) => console.error("Failed to fetch dynamic news:", err));
  }, []);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {articlesList.map((art, idx) => (
            <motion.div
              key={`${art.id}-${idx}`}
              className="h-full"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <article
                onClick={() => setSelectedArticle(art)}
                className="bg-surface-container-lowest dark:bg-surface-container rounded-[22px] overflow-hidden border border-outline-variant/30 shadow-soft hover:shadow-soft-hover transition-all duration-300 hover:-translate-y-1.5 flex flex-col group h-full cursor-pointer"
              >
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

                  <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-start mt-auto">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedArticle(art);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container/80 dark:bg-surface-container-high/80 group-hover:bg-primary text-deep-forest dark:text-ethereal-white group-hover:text-white font-label font-bold text-xs sm:text-[13px] transition-all duration-300 shadow-sm group-hover:shadow-md cursor-pointer"
                    >
                      <span>Read More</span>
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </article>
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

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-surface-container-lowest dark:bg-surface-container rounded-[28px] border border-outline-variant/30 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto"
            >
              {/* Top Bar / Close Button */}
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-outline-variant/20 bg-surface-container-low/50 dark:bg-surface-container-high/50 sticky top-0 z-20 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs">
                    {selectedArticle.date}
                  </span>
                  {selectedArticle.read_time_minutes && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant">
                      <Clock size={13} /> {selectedArticle.read_time_minutes} min read
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="w-10 h-10 rounded-full bg-surface-container/80 dark:bg-surface-container-high hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center text-on-surface-variant cursor-pointer"
                  title="Close Modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                {/* Title */}
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-deep-forest dark:text-ethereal-white leading-tight">
                  {selectedArticle.title}
                </h2>

                {/* Featured Image */}
                <div className={`relative w-full rounded-2xl overflow-hidden border border-outline-variant/20 max-h-[400px] flex items-center justify-center ${selectedArticle.isDoc ? "bg-white p-6" : "bg-surface-container-low"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedArticle.img}
                    alt={selectedArticle.title}
                    className={`max-h-[360px] w-auto ${selectedArticle.isDoc ? "object-contain" : "object-cover w-full h-full"}`}
                  />
                </div>

                {/* Excerpt */}
                {selectedArticle.excerpt && (
                  <p className="font-serif italic text-lg text-primary font-medium leading-relaxed border-l-4 border-primary pl-4 py-1">
                    {selectedArticle.excerpt}
                  </p>
                )}

                {/* Body Content */}
                <div className="prose dark:prose-invert max-w-none text-on-surface-variant leading-relaxed text-base sm:text-lg space-y-4">
                  {selectedArticle.body_content ? (
                    <div dangerouslySetInnerHTML={{ __html: selectedArticle.body_content }} />
                  ) : (
                    <p>
                      Dhara Foundation is dedicated to serving grassroots communities through continuous welfare programs, cultural preservation, and social recognition. This milestone highlights our commitment to transparent and impactful service to society.
                    </p>
                  )}
                </div>

                {/* External Link Button if applicable */}
                {selectedArticle.is_external && selectedArticle.external_url && (
                  <div className="pt-4">
                    <a
                      href={selectedArticle.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-bold text-sm hover:scale-105 transition-all shadow-md"
                    >
                      <span>Read Full Article on External Site</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-5 sm:p-6 border-t border-outline-variant/20 bg-surface-container-low/30 dark:bg-surface-container-high/30 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 rounded-full bg-surface-container dark:bg-surface-container-high hover:bg-primary hover:text-white font-bold text-sm transition-all cursor-pointer shadow-sm"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

