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
}

export function LightboxModal({ item, onClose }: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-[101] p-3 text-white bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-3xl bg-surface shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                className="max-w-full max-h-[75vh] object-contain"
              />
            </div>
            {(item.caption || item.category) && (
              <div className="p-6 bg-surface text-on-surface flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  {item.category && (
                    <span className="text-xs font-label-lg tracking-widest text-primary uppercase block mb-1">
                      {item.category}
                    </span>
                  )}
                  <h3 className="font-headline-sm text-xl font-bold">{item.caption || item.alt}</h3>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
