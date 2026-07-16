"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  "A tiny seed of Seva...",
  "Taking root in Sanatana Dharma...",
  "Branching out to communities...",
  "Sheltering the marginalized...",
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
            
            {/* THE GROWING BANYAN TREE ANIMATION */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center mb-2">
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-lg">
                
                {/* 1. The Ground */}
                <motion.line 
                  x1="10" y1="90" x2="90" y2="90" 
                  stroke="#059669" strokeWidth="2" strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                
                {/* 2. PHASE 1: Seedling Sprout (Fades out as tree grows) */}
                <motion.g
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.8, delay: 1.8 }}
                >
                  <motion.path
                    d="M 50 90 Q 45 75 50 65"
                    stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  />
                  <motion.path
                    d="M 49 75 Q 35 75 38 65 Q 45 65 49 75"
                    fill="#34d399"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ transformOrigin: "49px 75px" }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  />
                </motion.g>

                {/* 3. PHASE 2: The Banyan Trunk & Main Branches */}
                {/* Thick Trunk Base */}
                <motion.path
                  d="M 45 90 Q 48 60 50 45"
                  stroke="#064e3b" strokeWidth="4" fill="none" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1.6, ease: "easeOut" }}
                />
                <motion.path
                  d="M 55 90 Q 52 60 50 45"
                  stroke="#064e3b" strokeWidth="4" fill="none" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1.6, ease: "easeOut" }}
                />
                
                {/* Left Main Branch */}
                <motion.path
                  d="M 49 55 Q 35 48 22 45"
                  stroke="#064e3b" strokeWidth="3" fill="none" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 2.2, ease: "easeOut" }}
                />
                {/* Right Main Branch */}
                <motion.path
                  d="M 51 52 Q 65 45 78 42"
                  stroke="#064e3b" strokeWidth="3" fill="none" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 2.4, ease: "easeOut" }}
                />

                {/* 4. PHASE 3: Aerial Roots (Classic Banyan Feature) */}
                <motion.line x1="28" y1="47" x2="28" y2="90" stroke="#064e3b" strokeWidth="1.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 3.0 }} />
                <motion.line x1="36" y1="50" x2="36" y2="90" stroke="#064e3b" strokeWidth="1"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 3.3 }} />
                <motion.line x1="68" y1="45" x2="68" y2="90" stroke="#064e3b" strokeWidth="1.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 3.1 }} />
                <motion.line x1="76" y1="43" x2="76" y2="90" stroke="#064e3b" strokeWidth="1"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, delay: 3.5 }} />
                <motion.line x1="60" y1="48" x2="60" y2="90" stroke="#064e3b" strokeWidth="1"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.0, delay: 3.6 }} />

                {/* 5. PHASE 4: The Lush Canopy (Leaves scaling in) */}
                {/* Back Canopy */}
                <motion.path
                  d="M 50 35 C 20 35 10 15 30 10 C 40 0 60 0 70 10 C 90 15 80 35 50 35 Z"
                  fill="#10b981"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.95 }}
                  style={{ transformOrigin: "50px 35px" }}
                  transition={{ duration: 1.5, delay: 3.4, ease: "easeOut" }}
                />
                {/* Left Canopy */}
                <motion.path
                  d="M 35 50 C 5 50 0 25 15 15 C 25 5 45 10 45 25 C 55 45 40 50 35 50 Z"
                  fill="#34d399"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.95 }}
                  style={{ transformOrigin: "35px 50px" }}
                  transition={{ duration: 1.5, delay: 3.7, ease: "easeOut" }}
                />
                {/* Right Canopy */}
                <motion.path
                  d="M 65 48 C 95 48 100 22 85 12 C 75 2 55 8 55 22 C 45 42 60 48 65 48 Z"
                  fill="#059669"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.95 }}
                  style={{ transformOrigin: "65px 48px" }}
                  transition={{ duration: 1.5, delay: 4.0, ease: "easeOut" }}
                />
                
                {/* Magic Sparks floating upwards around the Banyan */}
                <motion.circle cx="25" cy="35" r="1.5" fill="#f59e0b" 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: [0, 1, 0], y: -20 }} 
                  transition={{ duration: 2.5, delay: 4.2, repeat: Infinity }} 
                />
                <motion.circle cx="75" cy="25" r="2" fill="#f59e0b" 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: [0, 1, 0], y: -15 }} 
                  transition={{ duration: 3, delay: 4.5, repeat: Infinity }} 
                />
                <motion.circle cx="50" cy="5" r="1.5" fill="#f59e0b" 
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: [0, 1, 0], y: -25 }} 
                  transition={{ duration: 2.8, delay: 4.8, repeat: Infinity }} 
                />
              </svg>
            </div>

            {/* DHARA LOGO TEXT */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 2.0 }}
              className="text-center"
            >
               <h1 className="font-heading font-bold text-3xl sm:text-4xl text-emerald-950 tracking-[0.2em] uppercase">
                Dhara
              </h1>
              <p className="font-title font-bold text-[10px] sm:text-xs text-emerald-600 tracking-[0.4em] uppercase mt-1">
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
