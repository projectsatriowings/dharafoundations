"use client";

import React from "react";
import { motion } from "framer-motion";

export function FlowingWaveDivider({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div className={`w-full overflow-hidden leading-none pointer-events-none ${flip ? "rotate-180" : ""} ${className}`}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-[60px] md:h-[100px] text-surface-container-low fill-current"
      >
        <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,40 L1200,120 L0,120 Z" />
      </svg>
    </div>
  );
}

export function LotusDiamondMotif({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`absolute pointer-events-none select-none opacity-10 flex items-center justify-center ${className}`}
      animate={{
        rotate: [0, 360],
        scale: [1, 1.05, 1],
      }}
      transition={{
        rotate: { duration: 80, repeat: Infinity, ease: "linear" },
        scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <svg width="300" height="300" viewBox="0 0 100 100" className="fill-temple-gold stroke-primary stroke-[0.5]">
        <polygon points="50,0 100,50 50,100 0,50" />
        <path d="M50,10 C70,30 70,70 50,90 C30,70 30,30 50,10 Z" fill="none" className="stroke-primary stroke-1 opacity-50" />
      </svg>
    </motion.div>
  );
}
