"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  "A continuous flow of Seva...",
  "Nourishing Sanatana Dharma...",
  "Cascading hope to communities...",
  "Quenching the thirst of the marginalized...",
  "Welcome to Dhara Foundations..."
];

export function InitialLoader() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    setMounted(true);
    const hasVisited = sessionStorage.getItem("dhara_initial_loader_banyan_v1");
    if (!hasVisited) {
      setIsLoading(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    const quoteInterval = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % quotes.length);
    }, 1100);

    const startTime = Date.now();
    const duration = 5500; 

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        clearInterval(quoteInterval);
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem("dhara_initial_loader_banyan_v1", "true");
          document.body.style.overflow = "";
        }, 1000); 
      }
    }, 30);

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
          key="dhara-banyan-loader"
          suppressHydrationWarning={true}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] }
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#f4fcf7] overflow-hidden select-none"
        >
          {/* Subtle nature glow background */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
             <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-[350px] h-[350px] bg-emerald-100 rounded-full blur-[90px]"
             />
          </div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-lg">
            
            {/* THE MODERN WATERFALL ANIMATION */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center mb-2">
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                
                {/* Glowing Pool Background */}
                <motion.ellipse
                  cx="50" cy="85" rx="35" ry="10"
                  fill="#064e3b"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.2 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />

                <motion.ellipse
                  cx="50" cy="85" rx="25" ry="7"
                  fill="#10b981"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.2, 1], opacity: [0, 0.5, 0.3] }}
                  transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
                />

                {/* The Cliff Edge */}
                <motion.path
                  d="M 25 20 Q 50 25 75 20"
                  stroke="#0f766e" strokeWidth="4" fill="none" strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />

                {/* Water Streams */}
                <motion.line x1="35" y1="22" x2="35" y2="85" stroke="#34d399" strokeWidth="3" strokeLinecap="round"
                  initial={{ strokeDasharray: "10 100", strokeDashoffset: 0, opacity: 0 }}
                  animate={{ strokeDasharray: ["0 100", "50 50", "0 100"], strokeDashoffset: [0, -100], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.2, delay: 0.5, repeat: Infinity, ease: "linear" }} />
                
                <motion.line x1="43" y1="23" x2="43" y2="85" stroke="#10b981" strokeWidth="5" strokeLinecap="round"
                  initial={{ strokeDasharray: "15 100", strokeDashoffset: 0, opacity: 0 }}
                  animate={{ strokeDasharray: ["0 100", "60 40", "0 100"], strokeDashoffset: [0, -100], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.0, delay: 0.2, repeat: Infinity, ease: "linear" }} />

                <motion.line x1="50" y1="24" x2="50" y2="85" stroke="#059669" strokeWidth="7" strokeLinecap="round"
                  initial={{ strokeDasharray: "20 100", strokeDashoffset: 0, opacity: 0 }}
                  animate={{ strokeDasharray: ["0 100", "70 30", "0 100"], strokeDashoffset: [0, -100], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 0.9, delay: 0.0, repeat: Infinity, ease: "linear" }} />

                <motion.line x1="57" y1="23" x2="57" y2="85" stroke="#10b981" strokeWidth="4" strokeLinecap="round"
                  initial={{ strokeDasharray: "12 100", strokeDashoffset: 0, opacity: 0 }}
                  animate={{ strokeDasharray: ["0 100", "50 50", "0 100"], strokeDashoffset: [0, -100], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.1, delay: 0.3, repeat: Infinity, ease: "linear" }} />

                <motion.line x1="65" y1="22" x2="65" y2="85" stroke="#6ee7b7" strokeWidth="2.5" strokeLinecap="round"
                  initial={{ strokeDasharray: "8 100", strokeDashoffset: 0, opacity: 0 }}
                  animate={{ strokeDasharray: ["0 100", "40 60", "0 100"], strokeDashoffset: [0, -100], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.3, delay: 0.6, repeat: Infinity, ease: "linear" }} />

                {/* Splashes / Droplets */}
                <motion.circle cx="35" cy="85" r="1.5" fill="#6ee7b7"
                  initial={{ y: 0, x: 0, opacity: 0 }}
                  animate={{ y: [0, -15, 0], x: [0, -10], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.2, ease: "easeOut" }} />
                <motion.circle cx="45" cy="85" r="2" fill="#34d399"
                  initial={{ y: 0, x: 0, opacity: 0 }}
                  animate={{ y: [0, -20, 0], x: [0, -5], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5, ease: "easeOut" }} />
                <motion.circle cx="50" cy="85" r="2.5" fill="#10b981"
                  initial={{ y: 0, x: 0, opacity: 0 }}
                  animate={{ y: [0, -25, 0], x: [0, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.3, repeat: Infinity, delay: 0, ease: "easeOut" }} />
                <motion.circle cx="55" cy="85" r="2" fill="#34d399"
                  initial={{ y: 0, x: 0, opacity: 0 }}
                  animate={{ y: [0, -18, 0], x: [0, 8], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: 0.3, ease: "easeOut" }} />
                <motion.circle cx="65" cy="85" r="1.5" fill="#6ee7b7"
                  initial={{ y: 0, x: 0, opacity: 0 }}
                  animate={{ y: [0, -12, 0], x: [0, 12], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.1, repeat: Infinity, delay: 0.6, ease: "easeOut" }} />

              </svg>
            </div>

            {/* DHARA LOGO TEXT */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 2.0 }}
              className="text-center"
            >
               <h1 className="font-heading font-bold text-4xl sm:text-5xl text-emerald-950 tracking-[0.2em] uppercase">
                Dhara
              </h1>
              <p className="font-title font-bold text-xs sm:text-sm text-emerald-600 tracking-[0.4em] uppercase mt-1">
                Foundations
              </p>
            </motion.div>

            {/* PERCENTAGE */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.0 }}
              className="mt-6 font-mono text-xs sm:text-sm text-emerald-800/50 tracking-widest"
            >
              {progress.toString().padStart(2, '0')}%
            </motion.div>

            {/* QUOTES */}
            <div className="mt-6 h-8 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={quoteIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="font-body italic font-light text-sm text-emerald-700/80 tracking-wide"
                >
                  {quotes[quoteIdx]}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
