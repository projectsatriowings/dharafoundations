"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxItem {
  src: string;
  alt: string;
  caption?: string;
  category?: string;
}

interface LightboxModalProps {
  item: LightboxItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  currentIndex?: number;
  totalCount?: number;
}

export function LightboxModal({
  item,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalCount,
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-[102] p-3 text-white bg-white/10 hover:bg-white/20 active:scale-95 rounded-full backdrop-blur-lg transition-all cursor-pointer border border-white/15 shadow-lg"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          {/* Previous Button */}
          {onPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-3 sm:left-6 md:left-10 z-[102] p-3 sm:p-4 text-white bg-white/15 hover:bg-white/30 active:scale-95 rounded-full backdrop-blur-lg transition-all shadow-2xl border border-white/20 cursor-pointer flex items-center justify-center group"
              aria-label="Previous image"
            >
              <span className="material-symbols-outlined text-2xl sm:text-3xl group-hover:-translate-x-0.5 transition-transform">
                chevron_left
              </span>
            </button>
          )}

          {/* Next Button */}
          {onNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-3 sm:right-6 md:right-10 z-[102] p-3 sm:p-4 text-white bg-white/15 hover:bg-white/30 active:scale-95 rounded-full backdrop-blur-lg transition-all shadow-2xl border border-white/20 cursor-pointer flex items-center justify-center group"
              aria-label="Next image"
            >
              <span className="material-symbols-outlined text-2xl sm:text-3xl group-hover:translate-x-0.5 transition-transform">
                chevron_right
              </span>
            </button>
          )}

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-3xl bg-surface shadow-2xl flex flex-col w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                className="max-w-full max-h-[75vh] object-contain select-none"
              />
            </div>
            {(item.caption || item.category || (currentIndex !== undefined && totalCount !== undefined)) && (
              <div className="p-6 bg-surface text-on-surface flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  {item.category && (
                    <span className="text-xs font-label-lg tracking-widest text-primary uppercase block mb-1 font-bold">
                      {item.category}
                    </span>
                  )}
                  <h3 className="font-headline-sm text-xl font-bold">{item.caption || item.alt}</h3>
                </div>
                {currentIndex !== undefined && totalCount !== undefined && totalCount > 0 && (
                  <div className="px-4 py-1.5 bg-surface-container dark:bg-surface-container-high rounded-full text-xs font-bold text-on-surface-variant shrink-0 border border-outline-variant/30 shadow-sm">
                    {currentIndex + 1} of {totalCount}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

