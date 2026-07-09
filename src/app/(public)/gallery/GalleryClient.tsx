"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { LightboxModal } from "@/components/ui/LightboxModal";
import { PillButton } from "@/components/ui/PillButton";
import ImageGallery from "@/components/ui/image-gallery";

const PHOTO_FILTERS = ["All Seva", "Charity", "Sanatana Dharma"];

export interface GalleryClientProps {
  initialPhotos: any[];
}

export default function GalleryClient({ initialPhotos }: GalleryClientProps) {
  const [photoItems, setPhotoItems] = useState<any[]>(initialPhotos);
  const [loading, setLoading] = useState(false);
  const [activePhotoTab, setActivePhotoTab] = useState("All Seva");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCharityCount, setVisibleCharityCount] = useState(6);
  const [visibleDharmaCount, setVisibleDharmaCount] = useState(6);

  useEffect(() => {
    fetch(`/api/public/gallery?t=${Date.now()}`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.photos) && data.photos.length > 0) {
          const dbPhotos = data.photos.map((p: any) => {
            const rawCat = (p.category || "").toLowerCase();
            const isDharma =
              rawCat === "sanatana dharma" ||
              rawCat === "sanatana_dharma" ||
              rawCat === "temple_heritage" ||
              rawCat.includes("temple") ||
              rawCat.includes("dharma") ||
              rawCat.includes("heritage") ||
              rawCat.includes("vedic") ||
              rawCat.includes("restoration");
            return {
              id: String(p.id),
              title: p.caption || "Sacred Seva",
              category: isDharma ? "Sanatana Dharma" : "Charity",
              desc: p.caption || "",
              src: p.image_url,
              pillBg: isDharma
                ? "bg-saffron-glow/90 text-deep-forest"
                : "bg-tertiary-container text-on-tertiary-container",
              type: "photo" as const,
            };
          });
          setPhotoItems(dbPhotos);
        }
      })
      .catch((err) => console.error("Error fetching gallery:", err));
  }, []);

  const charityPhotos = photoItems.filter((item) => item.category === "Charity");
  const dharmaPhotos = photoItems.filter((item) => item.category === "Sanatana Dharma");

  const displayedCharityPhotos = charityPhotos.slice(0, visibleCharityCount);
  const displayedDharmaPhotos = dharmaPhotos.slice(0, visibleDharmaCount);

  const handleSelectPhoto = (selectedItem: any) => {
    if (selectedItem) {
      const originalIdx = photoItems.findIndex((x) => x.id === selectedItem.id);
      if (originalIdx !== -1) setLightboxIndex(originalIdx);
    }
  };

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
            Divine & Social Service
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-deep-forest font-bold">
            Seva — Visual Chronicles
          </h1>
          <p className="font-body text-on-surface-variant max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
            Witness our dedication across Tamil Nadu through our two core pillars: humanitarian <strong className="text-[#8a5000] font-bold">Charity</strong> initiatives and sacred <strong className="text-[#b34700] font-bold">Sanatana Dharma</strong> heritage preservation.
          </p>
        </ScrollReveal>
      </section>

      {/* Filter Tabs Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto pb-6 w-full">
        <div className="flex flex-wrap justify-center gap-3">
          {PHOTO_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => {
                setActivePhotoTab(f);
                setVisibleCharityCount(6);
                setVisibleDharmaCount(6);
              }}
              className={`px-6 py-2.5 rounded-full font-label transition-all duration-300 cursor-pointer select-none active:scale-95 text-sm ${
                activePhotoTab === f
                  ? "border border-primary bg-primary text-ethereal-white shadow-md font-bold scale-105"
                  : "border border-outline-variant bg-transparent text-on-surface-variant hover:border-primary hover:text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 1: CHARITY */}
      {(activePhotoTab === "All Seva" || activePhotoTab === "Charity") && (
        <section className="px-4 md:px-8 max-w-7xl mx-auto pt-8 pb-16 w-full">
          <ScrollReveal className="text-center mb-8 space-y-2">
            <span className="font-label font-bold text-xs tracking-[0.2em] text-primary uppercase">
              Section 1
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-deep-forest dark:text-ethereal-white font-bold">
              Charity & Community Welfare
            </h2>
            <p className="font-body text-on-surface-variant max-w-xl mx-auto text-sm sm:text-base">
              Moments from our humanitarian relief efforts, Anna Daanam food drives, women empowerment programs, and educational aid.
            </p>
          </ScrollReveal>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4 animate-pulse">
              <div className="h-72 bg-gray-200/60 dark:bg-gray-800/60 rounded-2xl"></div>
              <div className="h-72 bg-gray-200/60 dark:bg-gray-800/60 rounded-2xl"></div>
              <div className="h-72 bg-gray-200/60 dark:bg-gray-800/60 rounded-2xl"></div>
            </div>
          ) : displayedCharityPhotos.length === 0 ? (
            <div className="text-center py-12 text-sm text-gray-500 bg-white/40 rounded-2xl border border-gray-200/60">
              No photos currently published in this section.
            </div>
          ) : (
            <>
              <ImageGallery
                items={displayedCharityPhotos}
                onSelect={(idx) => handleSelectPhoto(displayedCharityPhotos[idx])}
              />
              <div className="mt-10 text-center">
                {visibleCharityCount < charityPhotos.length ? (
                  <div onClick={() => setVisibleCharityCount((prev) => prev + 6)} className="inline-block">
                    <PillButton variant="secondary" className="!inline-flex gap-2 items-center cursor-pointer hover:scale-105 transition-transform shadow-md">
                      <span>Load More Charity Photos ({charityPhotos.length - visibleCharityCount} remaining)</span>
                      <span className="material-symbols-outlined text-lg">expand_more</span>
                    </PillButton>
                  </div>
                ) : charityPhotos.length > 6 ? (
                  <div onClick={() => setVisibleCharityCount(6)} className="inline-block">
                    <PillButton variant="secondary" className="!inline-flex gap-2 items-center cursor-pointer hover:scale-105 transition-transform opacity-80">
                      <span>Show Less</span>
                      <span className="material-symbols-outlined text-lg">expand_less</span>
                    </PillButton>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </section>
      )}

      {/* Divider between sections when viewing All Seva */}
      {activePhotoTab === "All Seva" && (
        <div className="max-w-4xl mx-auto w-full px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent my-4" />
        </div>
      )}

      {/* SECTION 2: SANATANA DHARMA */}
      {(activePhotoTab === "All Seva" || activePhotoTab === "Sanatana Dharma") && (
        <section className="px-4 md:px-8 max-w-7xl mx-auto pt-10 pb-24 w-full">
          <ScrollReveal className="text-center mb-8 space-y-2">
            <span className="font-label font-bold text-xs tracking-[0.2em] text-[#8a5000] uppercase">
              Section 2
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-deep-forest dark:text-ethereal-white font-bold">
              Sanatana Dharma & Temple Heritage
            </h2>
            <p className="font-body text-on-surface-variant max-w-xl mx-auto text-sm sm:text-base">
              Chronicles of sacred temple restoration, ancient stone mandapam conservation, Goshala protection, and Vedic preservation.
            </p>
          </ScrollReveal>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4 animate-pulse">
              <div className="h-72 bg-gray-200/60 dark:bg-gray-800/60 rounded-2xl"></div>
              <div className="h-72 bg-gray-200/60 dark:bg-gray-800/60 rounded-2xl"></div>
              <div className="h-72 bg-gray-200/60 dark:bg-gray-800/60 rounded-2xl"></div>
            </div>
          ) : displayedDharmaPhotos.length === 0 ? (
            <div className="text-center py-12 text-sm text-gray-500 bg-white/40 rounded-2xl border border-gray-200/60">
              No photos currently published in this section.
            </div>
          ) : (
            <>
              <ImageGallery
                items={displayedDharmaPhotos}
                onSelect={(idx) => handleSelectPhoto(displayedDharmaPhotos[idx])}
              />
              <div className="mt-10 text-center">
                {visibleDharmaCount < dharmaPhotos.length ? (
                  <div onClick={() => setVisibleDharmaCount((prev) => prev + 6)} className="inline-block">
                    <PillButton variant="secondary" className="!inline-flex gap-2 items-center cursor-pointer hover:scale-105 transition-transform shadow-md">
                      <span>Load More Sanatana Dharma Photos ({dharmaPhotos.length - visibleDharmaCount} remaining)</span>
                      <span className="material-symbols-outlined text-lg">expand_more</span>
                    </PillButton>
                  </div>
                ) : dharmaPhotos.length > 6 ? (
                  <div onClick={() => setVisibleDharmaCount(6)} className="inline-block">
                    <PillButton variant="secondary" className="!inline-flex gap-2 items-center cursor-pointer hover:scale-105 transition-transform opacity-80">
                      <span>Show Less</span>
                      <span className="material-symbols-outlined text-lg">expand_less</span>
                    </PillButton>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </section>
      )}

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
        onPrev={() =>
          setLightboxIndex((prev) =>
            prev !== null ? (prev > 0 ? prev - 1 : photoItems.length - 1) : null
          )
        }
        onNext={() =>
          setLightboxIndex((prev) =>
            prev !== null ? (prev < photoItems.length - 1 ? prev + 1 : 0) : null
          )
        }
        currentIndex={lightboxIndex !== null ? lightboxIndex : undefined}
        totalCount={photoItems.length}
      />
    </div>
  );
}
