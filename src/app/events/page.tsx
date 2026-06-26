"use client";

import React, { useState } from "react";
import { ScrollReveal, RevealItem } from "@/components/motion/ScrollReveal";
import { ParallaxBg } from "@/components/motion/ParallaxBg";
import { PillButton } from "@/components/ui/PillButton";

const UPCOMING_EVENTS = [
  {
    id: "anna-daan",
    title: "Anna Daan Mahotsav: Mega Food Drive",
    date: "October 24, 2024",
    time: "12:00 PM",
    location: "City Central Square",
    category: "Community Service",
    desc: "Join us for our largest food distribution drive of the year. We aim to serve over 5,000 freshly prepared, nutritious meals to those in need across the city, embodying the spirit of selfless service.",
    img: "/images/event-1.png",
    featured: true,
  },
  {
    id: "deepotsav",
    title: "Deepotsav & Evening Aarti",
    date: "Nov 12, 2024",
    time: "6:00 PM",
    location: "Temple Sanctorum",
    category: "Spiritual",
    desc: "A serene evening of chanting, meditation, and lighting of thousand diyas to welcome the festive season.",
    img: "/images/event-2.png",
    featured: false,
  },
  {
    id: "arts-workshop",
    title: "Youth Heritage Arts Workshop",
    date: "Nov 20, 2024",
    time: "10:00 AM",
    location: "Foundation Hall",
    category: "Cultural",
    desc: "Engaging the next generation through hands-on sessions in traditional painting and craft.",
    img: "/images/event-3.png",
    featured: false,
  },
  {
    id: "dhyana-retreat",
    title: "Morning Dhyana Retreat",
    date: "Dec 05, 2024",
    time: "5:30 AM",
    location: "Botanical Garden",
    category: "Spiritual",
    desc: "A guided morning meditation session focused on inner peace and aligning with natural rhythms.",
    img: "/images/gallery-1.png",
    featured: false,
  },
];

const CATEGORIES = ["All", "Spiritual", "Community Service", "Cultural"];

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredEvents = UPCOMING_EVENTS.filter(
    (ev) => activeFilter === "All" || ev.category === activeFilter
  );

  return (
    <div className="flex flex-col relative w-full overflow-hidden bg-surface">
      {/* Hero Section */}
      <ParallaxBg
        bgUrl="/images/banner.png"
        className="w-full h-[614px] min-h-[500px] flex items-center justify-center text-ethereal-white"
        overlayClassName="bg-deep-forest/55 mix-blend-multiply"
      >
        <ScrollReveal className="text-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-20 space-y-4">
          <h1 className="font-display-lg font-bold text-ethereal-white drop-shadow-lg text-4xl md:text-6xl">
            Gatherings of Light
          </h1>
          <p className="font-body-lg text-surface-container-low max-w-2xl mx-auto drop-shadow-md text-lg leading-relaxed">
            Join our community in moments of spiritual reflection, cultural celebration, and compassionate service.
          </p>
        </ScrollReveal>
      </ParallaxBg>

      {/* Main Content Area */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 space-y-24 w-full">
        {/* Filter Tabs */}
        <ScrollReveal className="flex flex-wrap justify-center gap-4 border-b border-outline-variant/30 pb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-8 py-3 rounded-full font-label-lg font-semibold transition-all duration-300 text-base ${
                activeFilter === cat
                  ? "bg-secondary text-on-secondary shadow-md scale-105"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {cat}
            </button>
          ))}
        </ScrollReveal>

        {/* Featured Event Banner */}
        {activeFilter === "All" && (
          <ScrollReveal className="w-full">
            <div className="modern-card rounded-[32px] overflow-hidden bg-gradient-to-r from-deep-forest to-secondary text-ethereal-white shadow-xl relative grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 p-8 md:p-14 space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron-glow text-deep-forest font-label-md font-bold uppercase tracking-wider text-xs">
                  <span className="w-2 h-2 rounded-full bg-deep-forest animate-ping" />
                  Featured Event
                </div>
                <h2 className="font-headline-md md:text-5xl font-bold leading-tight">
                  {UPCOMING_EVENTS[0].title}
                </h2>
                <p className="font-body-lg text-surface-container-highest opacity-90 max-w-xl">
                  {UPCOMING_EVENTS[0].desc}
                </p>
                <div className="flex flex-wrap gap-6 pt-2 font-label-lg text-saffron-glow">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined">calendar_today</span>
                    <span>{UPCOMING_EVENTS[0].date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined">schedule</span>
                    <span>{UPCOMING_EVENTS[0].time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined">location_on</span>
                    <span>{UPCOMING_EVENTS[0].location}</span>
                  </div>
                </div>
                <div className="pt-4">
                  <PillButton variant="secondary" showArrow>
                    Register Now
                  </PillButton>
                </div>
              </div>
              <div className="lg:col-span-5 h-[300px] lg:h-full relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={UPCOMING_EVENTS[0].img}
                  alt={UPCOMING_EVENTS[0].title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-deep-forest lg:from-transparent via-transparent to-transparent opacity-80" />
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Upcoming Events Grid */}
        <div className="space-y-8">
          <ScrollReveal>
            <h2 className="font-headline-md text-3xl md:text-4xl font-bold text-on-surface border-l-4 border-saffron-glow pl-4 py-1">
              Upcoming Gatherings
            </h2>
          </ScrollReveal>

          <ScrollReveal staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((ev) => (
              <RevealItem key={ev.id} className="h-full">
                <div className="modern-card flex flex-col rounded-[28px] overflow-hidden bg-surface-container-lowest border border-outline-variant/30 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full">
                  <div className="relative h-60 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ev.img}
                      alt={ev.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-md text-on-surface px-4 py-1 rounded-full font-label-md font-semibold text-xs shadow">
                      {ev.category}
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-1 justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-secondary font-label-md font-semibold text-sm">
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-base">calendar_month</span>
                          {ev.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-base">schedule</span>
                          {ev.time}
                        </span>
                      </div>

                      <h3 className="font-headline-sm text-2xl font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                        {ev.title}
                      </h3>

                      <p className="font-body-md text-on-surface-variant line-clamp-3 leading-relaxed">
                        {ev.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-on-surface-variant font-label-md text-sm">
                        <span className="material-symbols-outlined text-secondary text-base">location_on</span>
                        {ev.location}
                      </span>
                      <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface group-hover:bg-primary group-hover:text-on-primary transition-colors">
                        <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                      </button>
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </ScrollReveal>
        </div>

        {/* Past Events Gallery Grid */}
        <div className="space-y-8 pt-12">
          <ScrollReveal>
            <h2 className="font-headline-md text-3xl md:text-4xl font-bold text-on-surface border-l-4 border-secondary pl-4 py-1">
              Glimpses of Past Gatherings
            </h2>
          </ScrollReveal>

          <ScrollReveal staggerChildren={0.1} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <RevealItem className="sm:col-span-2 md:row-span-2 modern-card rounded-[24px] overflow-hidden relative group h-[380px] md:h-full min-h-[320px] shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                alt="Maha Shivratri Celebration"
                src="/images/event-1.png"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/90 via-transparent to-transparent flex items-end p-8 z-10">
                <h3 className="text-ethereal-white text-2xl font-bold">Maha Shivratri Celebration 2023</h3>
              </div>
            </RevealItem>

            <RevealItem className="modern-card rounded-[24px] overflow-hidden relative group h-64 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                alt="Notebook distribution child"
                src="/images/event-2.png"
              />
            </RevealItem>

            <RevealItem className="modern-card rounded-[24px] overflow-hidden relative group h-64 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                alt="Marigold garland temple offering"
                src="/images/event-3.png"
              />
            </RevealItem>

            <RevealItem className="sm:col-span-2 modern-card rounded-[24px] overflow-hidden relative group h-64 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                alt="Tree planting drive hill"
                src="/images/gallery-2.png"
              />
            </RevealItem>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
