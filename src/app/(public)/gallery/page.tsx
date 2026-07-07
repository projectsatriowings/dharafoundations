"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { LightboxModal } from "@/components/ui/LightboxModal";
import { PillButton } from "@/components/ui/PillButton";
import ImageGallery from "@/components/ui/image-gallery";

const GALLERY_ITEMS = [
  {
    id: "kanchipuram",
    title: "Kanchipuram Heritage Project",
    category: "Temple Restoration",
    desc: "Restoring the ancient stone carvings to their former glory.",
    src: "/images/gallery-1.png",
    pillBg: "bg-saffron-glow/90 text-deep-forest",
    type: "photo" as const,
  },
  {
    id: "anna-daanam",
    title: "Anna Daanam Drive",
    category: "Community Service",
    desc: "Providing nourishing meals to those in need during the festive season.",
    src: "/images/gallery-2.png",
    pillBg: "bg-tertiary-container text-on-tertiary-container",
    type: "photo" as const,
  },
  {
    id: "cultural-gala",
    title: "Annual Cultural Gala",
    category: "Events",
    desc: "Celebrating divine art forms through classical dance and music.",
    src: "/images/gallery-3.png",
    pillBg: "bg-primary-container text-on-primary-container",
    type: "photo" as const,
  },
  {
    id: "artisan-workshops",
    title: "Artisan Workshops",
    category: "Temple Restoration",
    desc: "Reviving ancient stone-carving techniques with local craftsmen.",
    src: "/images/event-1.png",
    pillBg: "bg-saffron-glow/90 text-deep-forest",
    type: "photo" as const,
  },
  {
    id: "vriksharopan",
    title: "Vriksharopan Initiative",
    category: "Community Service",
    desc: "Planting 10,000 sacred saplings to restore local ecosystems.",
    src: "/images/event-2.png",
    pillBg: "bg-tertiary-container text-on-tertiary-container",
    type: "photo" as const,
  },
  {
    id: "deepotsav-celebrations",
    title: "Deepotsav Celebrations",
    category: "Events",
    desc: "A festival of light bringing the community together in prayer.",
    src: "/images/event-3.png",
    pillBg: "bg-primary-container text-on-primary-container",
    type: "photo" as const,
  },
  {
    id: "temple-mandapam",
    title: "Chola Mandapam Conservation",
    category: "Temple Restoration",
    desc: "Carefully cleaning and reinforcing structural stone pillars in rural sanctuaries.",
    src: "/Event images/05.jpg",
    pillBg: "bg-saffron-glow/90 text-deep-forest",
    type: "photo" as const,
  },
  {
    id: "goshala-seva",
    title: "Goshala Seva & Care",
    category: "Community Service",
    desc: "Supporting traditional cattle sanctuaries with medical care and pure nutrition.",
    src: "/Event images/18.jpg",
    pillBg: "bg-tertiary-container text-on-tertiary-container",
    type: "photo" as const,
  },
  {
    id: "vedic-chanting",
    title: "Vedic Chanting Mahotsav",
    category: "Events",
    desc: "Young scholars leading traditional Vedic recitals for global peace.",
    src: "/Event images/22.jpg",
    pillBg: "bg-primary-container text-on-primary-container",
    type: "photo" as const,
  },
  {
    id: "rural-women-empowerment",
    title: "Women Craftsmanship Drive",
    category: "Community Service",
    desc: "Skill training in traditional palm-leaf and textile handicrafts for rural self-help groups.",
    src: "/Event images/52.jpg",
    pillBg: "bg-tertiary-container text-on-tertiary-container",
    type: "photo" as const,
  },
  {
    id: "youth-heritage",
    title: "Youth Heritage Walk",
    category: "Events",
    desc: "Guiding the next generation through sacred historical sites across Tamil Nadu.",
    src: "/images/volunteer.png",
    pillBg: "bg-primary-container text-on-primary-container",
    type: "photo" as const,
  },
  {
    id: "scripture-digitization",
    title: "Palm-Leaf Scripture Preservation",
    category: "Temple Restoration",
    desc: "Digitizing ancient manuscripts to preserve centuries of spiritual wisdom.",
    src: "/images/about.png",
    pillBg: "bg-saffron-glow/90 text-deep-forest",
    type: "photo" as const,
  },
];

const PHOTO_FILTERS = ["All", "Temple Restoration", "Community Service", "Events"];

export default function GalleryPage() {
  const [photoItems, setPhotoItems] = useState<any[]>(GALLERY_ITEMS);
  const [activePhotoTab, setActivePhotoTab] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visiblePhotoCount, setVisiblePhotoCount] = useState(6);

  useEffect(() => {
    fetch(`/api/public/gallery?t=${Date.now()}`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.photos)) {
          const dbPhotos = data.photos.map((p: any) => ({
            id: String(p.id),
            title: p.caption || "Sacred Moment",
            category: p.category || "Events",
            desc: p.caption || "",
            src: p.image_url,
            pillBg: "bg-saffron-glow/90 text-deep-forest",
            type: "photo" as const,
          }));
          setPhotoItems(dbPhotos);
        }
      })
      .catch((err) => console.error("Error fetching gallery:", err));
  }, []);

  const filteredPhotos = photoItems.filter(
    (item) =>
      activePhotoTab === "All" ||
      item.category === activePhotoTab ||
      (activePhotoTab === "Events" && item.category?.toLowerCase() === "events") ||
      (activePhotoTab === "Temple Restoration" && item.category?.toLowerCase().includes("temple")) ||
      (activePhotoTab === "Community Service" && item.category?.toLowerCase().includes("welfare"))
  );
  const displayedPhotos = filteredPhotos.slice(0, visiblePhotoCount);

  return (
    <div className="flex flex-col relative w-full overflow-hidden bg-surface">
      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-32 pb-12 px-4 sm:px-8 overflow-hidden flex flex-col items-center text-center min-h-[360px] justify-center">
        {/* Abstract Lotus Graphic Behind Title */}
        <div className="absolute inset-0 z-0 opacity-10 flex items-center justify-center pointer-events-none -translate-y-1/4 scale-150">
          <svg fill="none" height="600" viewBox="0 0 200 200" width="600" xmlns="http://www.w3.org/2000/svg">
            <path className="text-primary" d="M100 20C100 20 120 70 160 100C120 130 100 180 100 180C100 180 80 130 40 100C80 70 100 20 100 20Z" fill="currentColor" />
            <path d="M100 40C100 40 115 80 145 100C115 120 100 160 100 160C100 160 85 120 55 100C85 80 100 40 100 40Z" fill="white" opacity="0.5" />
          </svg>
        </div>

        <ScrollReveal className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="font-label-lg text-tertiary uppercase tracking-widest block font-bold text-sm">
            Visual & Media Journey
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-deep-forest font-bold">
            Sacred Moments & Visual Archive
          </h1>
          <p className="font-body text-on-surface-variant max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
            Witness the impact of our collective efforts. Browse our dedicated photo gallery capturing our service to society across Tamil Nadu.
          </p>
        </ScrollReveal>
      </section>

      {/* SECTION 1: PHOTO GALLERY */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto pb-24 w-full">
        <ScrollReveal className="text-center mb-10 space-y-3">
          <span className="font-label font-bold text-xs tracking-[0.2em] text-primary uppercase">
            High-Definition Photography
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-deep-forest dark:text-ethereal-white font-bold">
            Photo Gallery
          </h2>
          <p className="font-body text-on-surface-variant max-w-xl mx-auto text-sm sm:text-base">
            Explore moments of devotion, community welfare drives, and temple conservation across Tamil Nadu.
          </p>
        </ScrollReveal>

        {/* Photo Filter Pills */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {PHOTO_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => {
                setActivePhotoTab(f);
                setVisiblePhotoCount(6);
              }}
              className={`px-6 py-2 rounded-full font-label transition-all duration-300 cursor-pointer select-none active:scale-95 text-sm ${
                activePhotoTab === f
                  ? "border border-primary bg-primary text-ethereal-white shadow-md font-bold scale-105"
                  : "border border-outline-variant bg-transparent text-on-surface-variant hover:border-primary hover:text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <ImageGallery
          items={displayedPhotos}
          onSelect={(idx) => {
            const selectedItem = displayedPhotos[idx];
            if (selectedItem) {
              const originalIdx = photoItems.findIndex((x) => x.id === selectedItem.id);
              if (originalIdx !== -1) setLightboxIndex(originalIdx);
            }
          }}
        />

        <div className="mt-12 text-center">
          {visiblePhotoCount < filteredPhotos.length ? (
            <div onClick={() => setVisiblePhotoCount((prev) => prev + 6)} className="inline-block">
              <PillButton variant="secondary" className="!inline-flex gap-2 items-center cursor-pointer hover:scale-105 transition-transform shadow-md">
                <span>Load More Photos ({filteredPhotos.length - visiblePhotoCount} remaining)</span>
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </PillButton>
            </div>
          ) : filteredPhotos.length > 6 ? (
            <div onClick={() => setVisiblePhotoCount(6)} className="inline-block">
              <PillButton variant="secondary" className="!inline-flex gap-2 items-center cursor-pointer hover:scale-105 transition-transform opacity-80">
                <span>Show Less Photos</span>
                <span className="material-symbols-outlined text-lg">expand_less</span>
              </PillButton>
            </div>
          ) : null}
        </div>
      </section>

      {/* Lightbox Modal for Photos */}
      <LightboxModal
        item={
          lightboxIndex !== null && photoItems[lightboxIndex]
            ? {
                src: photoItems[lightboxIndex].src,
                alt: photoItems[lightboxIndex].title,
                caption: photoItems[lightboxIndex].desc,
                category: photoItems[lightboxIndex].category,
              }
            : null
        }
        onClose={() => setLightboxIndex(null)}
      />
    </div>
  );
}
