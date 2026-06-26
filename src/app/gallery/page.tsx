"use client";

import React, { useState } from "react";
import { ScrollReveal, RevealItem } from "@/components/motion/ScrollReveal";
import { LightboxModal } from "@/components/ui/LightboxModal";
import { PillButton } from "@/components/ui/PillButton";

const GALLERY_ITEMS = [
  {
    id: "kanchipuram",
    title: "Kanchipuram Heritage Project",
    category: "Temple Restoration",
    desc: "Restoring the ancient stone carvings to their former glory.",
    src: "/images/gallery-1.png",
    pillBg: "bg-saffron-glow/90 text-deep-forest",
  },
  {
    id: "anna-daanam",
    title: "Anna Daanam Drive",
    category: "Community Service",
    desc: "Providing nourishing meals to those in need during the festive season.",
    src: "/images/gallery-2.png",
    pillBg: "bg-tertiary-container text-on-tertiary-container",
  },
  {
    id: "cultural-gala",
    title: "Annual Cultural Gala",
    category: "Events",
    desc: "Celebrating divine art forms through classical dance and music.",
    src: "/images/gallery-3.png",
    pillBg: "bg-primary-container text-on-primary-container",
  },
  {
    id: "artisan-workshops",
    title: "Artisan Workshops",
    category: "Temple Restoration",
    desc: "Reviving ancient stone-carving techniques with local craftsmen.",
    src: "/images/event-1.png",
    pillBg: "bg-saffron-glow/90 text-deep-forest",
  },
  {
    id: "vriksharopan",
    title: "Vriksharopan Initiative",
    category: "Community Service",
    desc: "Planting 10,000 sacred saplings to restore local ecosystems.",
    src: "/images/event-2.png",
    pillBg: "bg-tertiary-container text-on-tertiary-container",
  },
  {
    id: "deepotsav-celebrations",
    title: "Deepotsav Celebrations",
    category: "Events",
    desc: "A festival of light bringing the community together in prayer.",
    src: "/images/event-3.png",
    pillBg: "bg-primary-container text-on-primary-container",
  },
];

const FILTERS = ["All", "Temple Restoration", "Community Service", "Events"];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeTab === "All" || item.category === activeTab
  );

  return (
    <div className="flex flex-col relative w-full overflow-hidden bg-surface">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-margin-mobile md:px-margin-desktop overflow-hidden flex flex-col items-center text-center min-h-[480px] justify-center">
        {/* Abstract Lotus Graphic Behind Title */}
        <div className="absolute inset-0 z-0 opacity-10 flex items-center justify-center pointer-events-none -translate-y-1/4 scale-150">
          <svg fill="none" height="600" viewBox="0 0 200 200" width="600" xmlns="http://www.w3.org/2000/svg">
            <path className="text-primary" d="M100 20C100 20 120 70 160 100C120 130 100 180 100 180C100 180 80 130 40 100C80 70 100 20 100 20Z" fill="currentColor" />
            <path d="M100 40C100 40 115 80 145 100C115 120 100 160 100 160C100 160 85 120 55 100C85 80 100 40 100 40Z" fill="white" opacity="0.5" />
          </svg>
        </div>

        <ScrollReveal className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="font-label-lg text-tertiary uppercase tracking-widest block font-bold text-sm">
            Visual Journey
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-deep-forest font-bold">
            Sacred Moments
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed text-lg">
            Witness the impact of our collective efforts. Through community service, temple restoration, and cultural events, we strive to bring divine vitality to everyday life.
          </p>
        </ScrollReveal>

        {/* Filter Pills */}
        <ScrollReveal className="relative z-10 mt-12 flex flex-wrap justify-center gap-3">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveTab(f)}
              className={`px-6 py-2.5 rounded-full font-label-lg transition-all duration-300 cursor-pointer select-none active:scale-95 text-sm ${
                activeTab === f
                  ? "border border-primary bg-primary text-ethereal-white shadow-md font-bold scale-105"
                  : "border border-outline-variant bg-transparent text-on-surface-variant hover:border-primary hover:text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </ScrollReveal>
      </section>

      {/* Gallery Columns Grid */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-24 w-full">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredItems.map((item) => {
            const originalIdx = GALLERY_ITEMS.findIndex((x) => x.id === item.id);
            return (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(originalIdx)}
                className="modern-card group relative rounded-[24px] overflow-hidden bg-surface-container-lowest shadow-soft hover:shadow-soft-hover hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-outline-variant/15 break-inside-avoid inline-block w-full"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-auto object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
                  alt={item.title}
                  src={item.src}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/90 via-deep-forest/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-8 z-10 space-y-2">
                  <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold w-max shadow-sm ${item.pillBg}`}>
                    {item.category}
                  </span>
                  <h3 className="font-headline-sm text-ethereal-white font-bold text-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {item.title}
                  </h3>
                  <p className="font-body-md text-ethereal-white/85 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <PillButton variant="secondary" className="!inline-flex gap-2 items-center">
            <span>Load More Moments</span>
            <span className="material-symbols-outlined text-lg">expand_more</span>
          </PillButton>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        item={
          lightboxIndex !== null
            ? {
                src: GALLERY_ITEMS[lightboxIndex].src,
                alt: GALLERY_ITEMS[lightboxIndex].title,
                caption: GALLERY_ITEMS[lightboxIndex].desc,
                category: GALLERY_ITEMS[lightboxIndex].category,
              }
            : null
        }
        onClose={() => setLightboxIndex(null)}
      />
    </div>
  );
}
