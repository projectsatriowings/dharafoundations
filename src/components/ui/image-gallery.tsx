"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  src: string;
  alt?: string;
  title?: string;
  category?: string;
  desc?: string;
  pillBg?: string;
}

const DEFAULT_IMAGES: GalleryItem[] = [
  {
    src: "https://images.unsplash.com/photo-1719368472026-dc26f70a9b76?q=80&h=800&w=800&auto=format&fit=crop",
    title: "Sacred Temple Architecture",
    category: "Heritage",
    desc: "Intricate stone carvings standing the test of time.",
  },
  {
    src: "https://images.unsplash.com/photo-1649265825072-f7dd6942baed?q=80&h=800&w=800&auto=format&fit=crop",
    title: "Divine Sculptures & Carvings",
    category: "Artistry",
    desc: "Ancient artistry preserved with utmost reverence.",
  },
  {
    src: "https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&h=800&w=800&auto=format&fit=crop",
    title: "Community Prayer & Unity",
    category: "Devotion",
    desc: "Bringing hearts together in harmonious celebration.",
  },
  {
    src: "https://images.unsplash.com/photo-1729086046027-09979ade13fd?q=80&h=800&w=800&auto=format&fit=crop",
    title: "Traditional Rituals",
    category: "Tradition",
    desc: "Upholding sacred customs passed down through generations.",
  },
  {
    src: "https://images.unsplash.com/photo-1601568494843-772eb04aca5d?q=80&h=800&w=800&auto=format&fit=crop",
    title: "Festival Offerings",
    category: "Celebration",
    desc: "Vibrant colors and light adorning sacred spaces.",
  },
  {
    src: "https://images.unsplash.com/photo-1585687501004-615dfdfde7f1?q=80&h=800&w=800&auto=format&fit=crop",
    title: "Spiritual Awakening",
    category: "Peace",
    desc: "Moments of serenity and contemplation.",
  },
];

interface ImageGalleryProps {
  items?: GalleryItem[];
  onSelect?: (index: number) => void;
  className?: string;
  showHeader?: boolean;
}

export default function ImageGallery({
  items = DEFAULT_IMAGES,
  onSelect,
  className,
  showHeader = false,
}: ImageGalleryProps) {
  // Chunk items into rows of at most 4 so images are wide, visible, and never squeezed into thin slivers
  const CHUNK_SIZE = 4;
  const chunkedRows: { items: GalleryItem[]; startIndex: number }[] = [];
  for (let i = 0; i < items.length; i += CHUNK_SIZE) {
    chunkedRows.push({
      items: items.slice(i, i + CHUNK_SIZE),
      startIndex: i,
    });
  }

  return (
    <div className={cn("w-full flex flex-col items-center justify-start", className)}>
      {showHeader && (
        <div className="max-w-3xl text-center px-4 mb-8">
          <h2 className="font-headline-md text-3xl font-semibold text-on-surface">Our Latest Creations</h2>
          <p className="text-sm text-on-surface-variant mt-2">
            A visual collection of our most recent works – each piece crafted with intention, emotion, and style.
          </p>
        </div>
      )}

      {/* Multi-Row Expandable Accordion Gallery */}
      <div className="flex flex-col gap-6 w-full max-w-7xl px-4">
        {chunkedRows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="flex flex-col sm:flex-row gap-4 h-[580px] sm:h-[420px] lg:h-[460px] w-full"
          >
            {row.items.map((item, idx) => {
              const globalIdx = row.startIndex + idx;
              return (
                <div
                  key={globalIdx}
                  onClick={() => onSelect?.(globalIdx)}
                  className="relative group flex-1 hover:flex-[2.8] sm:hover:flex-[3.2] transition-all duration-500 ease-out rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl border border-outline-variant/20 min-h-[90px] sm:min-w-[160px] isolate transform-gpu [mask-image:radial-gradient(white,black)] bg-surface-container-lowest"
                >
                  <img
                    className="h-full w-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    src={item.src}
                    alt={item.alt || item.title || `image-${globalIdx}`}
                  />
                  {/* Subtle always-visible title bar at bottom when unhovered */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 transition-opacity duration-300 group-hover:opacity-0 flex items-end z-0">
                    <span className="text-ethereal-white font-semibold text-sm line-clamp-1 drop-shadow-md">
                      {item.title}
                    </span>
                  </div>

                  {/* Hover overlay with title, category & description */}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/95 via-deep-forest/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10 pointer-events-none">
                    <div className="space-y-2 min-w-[220px] sm:min-w-[280px] transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      {item.category && (
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold w-max bg-saffron-glow text-deep-forest shadow-sm tracking-wider uppercase">
                          {item.category}
                        </span>
                      )}
                      {item.title && (
                        <h3 className="font-headline-sm text-ethereal-white font-bold text-xl sm:text-2xl line-clamp-1">
                          {item.title}
                        </h3>
                      )}
                      {item.desc && (
                        <p className="font-body-sm text-ethereal-white/90 text-xs sm:text-sm line-clamp-2 hidden sm:block">
                          {item.desc}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
