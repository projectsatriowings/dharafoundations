"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  "Reviving Sanatana Dharma & Sacred Traditions...",
  "Empowering Rural Communities Across Tamil Nadu...",
  "Preserving Heritage · Uplifting Lives · Spiritual Seva...",
  "Welcome to Dhara Foundations..."
];

export function InitialLoader() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    setMounted(true);
    // Check session storage after client hydration is complete
    const hasVisited = sessionStorage.getItem("dhara_initial_loader_v2");
    if (!hasVisited) {
      setIsLoading(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    // Cycle through inspiring quotes every 750ms
    const quoteInterval = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % quotes.length);
    }, 750);

    // Smooth progress bar simulation over ~2.4 seconds
    const startTime = Date.now();
    const duration = 2400; // 2.4 seconds total intro time

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        clearInterval(quoteInterval);
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem("dhara_initial_loader_v2", "true");
          document.body.style.overflow = "";
        }, 350); // slight pause at 100% for satisfaction before curtain exit
      }
    }, 25);

    return () => {
      clearInterval(progressInterval);
      clearInterval(quoteInterval);
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="dhara-initial-loader"
          suppressHydrationWarning={true}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-deep-forest/98 backdrop-blur-3xl overflow-hidden select-none px-4 sm:px-6"
        >
          {/* Background Spiritual Aura & Rotating Sacred Rings */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {/* Soft Saffron Glowing Center Halo */}
            <motion.div
              animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.55, 0.35] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] rounded-full bg-radial from-saffron-glow/25 via-saffron-glow/5 to-transparent blur-3xl"
            />
            
            {/* Outer Slow Rotating Gold Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] rounded-full border border-saffron-glow/15 border-dashed"
            />

            {/* Inner Counter-Rotating Emerald/Gold Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] rounded-full border border-ethereal-white/10"
            />
          </div>

          {/* Main Logo & Emblem Showcase */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full">
            {/* Pulsating Logo Emblem with Golden Drop Shadow */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative mb-6 sm:mb-8 p-3 sm:p-4 rounded-full bg-gradient-to-b from-white/10 to-white/5 border border-saffron-glow/30 shadow-[0_0_45px_rgba(244,180,26,0.35)]"
            >
              <img
                src="/logo-icon-only.png?v=10"
                alt="Dhara Foundations Emblem"
                className="w-20 h-20 sm:w-28 sm:h-28 object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] animate-pulse"
              />
            </motion.div>

            {/* Title: DHARA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-1 sm:gap-1.5 font-heading font-black text-3xl sm:text-5xl text-ethereal-white tracking-[0.2em] leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
            >
              {"DHARA".split("").map((char, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.08 }}
                  className="text-ethereal-white group-hover:text-saffron-glow"
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            {/* Title: FOUNDATIONS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-2 font-title font-extrabold text-[11px] sm:text-sm text-saffron-glow tracking-[0.38em] uppercase drop-shadow-[0_1px_6px_rgba(244,180,26,0.4)]"
            >
              FOUNDATIONS
            </motion.div>

            {/* Thin Glowing Golden Progress Bar */}
            <motion.div
              initial={{ opacity: 0, width: "60%" }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 sm:mt-10 w-64 sm:w-80 max-w-full flex flex-col items-center"
            >
              <div className="w-full h-1.5 sm:h-2 bg-black/40 rounded-full overflow-hidden border border-white/10 p-0.5 backdrop-blur-sm shadow-inner relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-600 via-saffron-glow to-amber-300 rounded-full shadow-[0_0_12px_rgba(244,180,26,0.8)] relative"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.05 }}
                >
                  {/* Shimmer light reflection inside progress bar */}
                  <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/60 blur-[1px]" />
                </motion.div>
              </div>

              {/* Progress Percentage & Rotating Dharmic Quote */}
              <div className="mt-3 flex items-center justify-between w-full font-mono text-xs sm:text-sm">
                <span className="text-saffron-glow font-bold tracking-wider">
                  LOADING...
                </span>
                <span className="text-ethereal-white font-black">
                  {progress}%
                </span>
              </div>
            </motion.div>

            {/* Inspirational Rotating Tagline */}
            <div className="mt-6 sm:mt-8 min-h-[36px] flex items-center justify-center px-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="font-body text-xs sm:text-sm text-ethereal-white/80 text-center italic tracking-wide max-w-md"
                >
                  "{quotes[quoteIdx]}"
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
