"use client";

import React, { useState } from "react";
import { ScrollReveal, RevealItem } from "@/components/motion/ScrollReveal";
import { ParallaxBg } from "@/components/motion/ParallaxBg";
import { PillButton } from "@/components/ui/PillButton";

const ARTICLES = [
  {
    id: "edu-summit",
    title: "Annual Education Summit Announces New Scholarships",
    date: "Nov 02, 2024",
    tag: "Press Releases",
    badge: "Press Release",
    desc: "We are proud to announce 50 new full scholarships for underprivileged youth, expanding our commitment to accessible education for all.",
    img: "/images/news.png",
    badgeColor: "bg-secondary-container text-on-secondary-container",
  },
  {
    id: "clean-water",
    title: "Inauguration of Clean Water Project in Rural Districts",
    date: "Oct 28, 2024",
    tag: "Events",
    badge: "Project Update",
    desc: "Bringing vital vitality to parched lands, the new water purification facility is now operational, serving over 5,000 households.",
    img: "/images/gallery-1.png",
    badgeColor: "bg-tertiary-container text-on-tertiary-container",
  },
  {
    id: "global-news",
    title: "Global News Feature: Transparency in Modern NGOs",
    date: "Oct 12, 2024",
    tag: "Media",
    badge: "Media Mention",
    desc: "Dhara Foundations was highlighted by Global News for pioneering administrative transparency and adopting modern operational frameworks.",
    img: "/images/gallery-2.png",
    badgeColor: "bg-primary-container text-on-primary-container",
  },
];

const FILTERS = ["All", "Press Releases", "Media", "Events"];

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = ARTICLES.filter((art) => {
    const matchesFilter = activeTab === "All" || art.tag === activeTab;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col relative w-full overflow-hidden bg-surface">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto flex flex-col items-center text-center">
        <ScrollReveal className="max-w-4xl space-y-6 w-full flex flex-col items-center">
          <h1 className="font-display-lg-mobile md:font-display-lg text-primary font-bold">
            Voices of Compassion & News
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed text-lg">
            Stay updated with our latest initiatives, press releases, and inspiring stories of change rooted in Sanatana Dharma principles.
          </p>
          <div className="w-full max-w-md relative pt-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, press releases..."
              className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:outline-none py-3 pl-12 pr-4 font-body-md text-on-surface transition-colors placeholder:text-on-surface-variant/60 text-base"
            />
            <span className="material-symbols-outlined absolute left-2 top-[34px] text-outline-variant text-2xl">
              search
            </span>
          </div>
        </ScrollReveal>
      </section>

      {/* Featured Article Section */}
      <section className="px-margin-mobile md:px-margin-desktop py-12 max-w-container-max mx-auto w-full">
        <ScrollReveal className="flex items-center justify-between mb-8 border-b border-outline-variant/30 pb-4">
          <h2 className="font-headline-md text-3xl font-bold text-deep-forest">Featured Story</h2>
        </ScrollReveal>

        <ScrollReveal>
          <article className="modern-card grid grid-cols-1 lg:grid-cols-12 gap-0 bg-surface-container-lowest rounded-[24px] shadow-soft hover:shadow-soft-hover transition-all duration-300 group cursor-pointer border border-outline-variant/20 overflow-hidden">
            <div className="lg:col-span-7 h-[300px] lg:h-[480px] relative overflow-hidden shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                alt="Planting 10,000 Saplings"
                src="/images/volunteer.png"
              />
              <div className="absolute top-6 left-6 bg-tertiary/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-tertiary/30">
                <span className="font-label-lg font-bold text-deep-forest text-xs uppercase tracking-wider">
                  Environmental Initiative
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-6">
              <div className="flex items-center gap-4 text-xs font-medium text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">calendar_today</span>
                  Nov 10, 2024
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-tertiary">
                  <span className="material-symbols-outlined text-sm">local_offer</span>
                  Community Service
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="font-headline-sm text-2xl md:text-3xl font-bold text-deep-forest group-hover:text-primary transition-colors leading-snug">
                  Planting 10,000 Sacred Saplings Across Cauvery Basin
                </h3>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  In our biggest environmental push yet, volunteers gathered to plant indigenous trees, aiming to restore soil health and protect the sacred river banks for generations to come.
                </p>
              </div>

              <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                <span className="text-xs font-bold text-deep-forest">5 min read</span>
                <PillButton variant="ghost" showArrow className="!px-5 !py-2 !text-sm">
                  Read Article
                </PillButton>
              </div>
            </div>
          </article>
        </ScrollReveal>
      </section>

      {/* Main Articles Grid */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto space-y-12 w-full">
        <ScrollReveal className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-outline-variant/30 pb-6">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full font-label-md font-semibold text-sm transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-primary text-on-primary shadow-md scale-105"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">
              search
            </span>
            <input
              type="text"
              placeholder="Search updates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((art) => (
            <RevealItem key={art.id} className="h-full">
              <article className="modern-card bg-surface-container-lowest rounded-[28px] overflow-hidden border border-outline-variant/30 shadow-soft hover:shadow-soft-hover flex flex-col group h-full">
                <div className="relative h-56 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={art.img}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${art.badgeColor} shadow-sm`}>
                    {art.badge}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1 justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-on-surface-variant text-xs">
                      <span className="material-symbols-outlined text-xs">calendar_today</span>
                      <span>{art.date}</span>
                    </div>
                    <h3 className="font-headline-sm text-xl font-bold text-deep-forest group-hover:text-primary transition-colors leading-snug">
                      {art.title}
                    </h3>
                    <p className="font-body-md text-on-surface-variant line-clamp-3 text-sm leading-relaxed">
                      {art.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                    <span className="text-primary font-bold text-xs group-hover:underline inline-flex items-center gap-1 cursor-pointer">
                      Read Full Story
                      <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </span>
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
        className="w-full min-h-[550px] flex items-center justify-center text-center px-margin-mobile"
        overlayClassName="bg-deep-forest/80"
      >
        <ScrollReveal className="relative z-10 max-w-2xl mx-auto bg-surface-container-lowest/15 backdrop-blur-xl p-10 md:p-16 rounded-[32px] border border-ethereal-white/20 shadow-2xl space-y-6 text-ethereal-white">
          <h2 className="font-display-lg-mobile md:font-headline-md text-3xl md:text-4xl font-bold">
            Stay Connected with Our Journey
          </h2>
          <p className="font-body-lg text-surface-variant max-w-lg mx-auto leading-relaxed text-base">
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
