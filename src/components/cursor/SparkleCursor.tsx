"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function SparkleCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [visible, setVisible] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Snappy physics for this sharp geometric cursor
  const springConfig = { damping: 20, stiffness: 400, mass: 0.3 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const touchCheck = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (touchCheck) {
      setIsTouchDevice(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      // Hotspot is the exact tip of the arrow at (10,0)
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, select, label, [role='button'], [role='tab'], .cursor-pointer")) {
        setIsHovering(true);
      }
    };

    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // We check if the relatedTarget is still within a clickable element to prevent flickering
      const related = e.relatedTarget as HTMLElement;
      if (related && related.closest && related.closest("a, button, input, textarea, select, label, [role='button'], [role='tab'], .cursor-pointer")) {
        return; // still hovering a button
      }
      setIsHovering(false);
    };

    const onOut = () => setVisible(false);
    const onIn = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onEnter, { passive: true });
    window.addEventListener("mouseout", onLeave, { passive: true });
    document.documentElement.addEventListener("mouseleave", onOut);
    document.documentElement.addEventListener("mouseenter", onIn);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onEnter);
      window.removeEventListener("mouseout", onLeave);
      document.documentElement.removeEventListener("mouseleave", onOut);
      document.documentElement.removeEventListener("mouseenter", onIn);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  // Paths for Framer Motion animation (7 vertices for smooth morphing)
  // Perfectly mapped to the 3D Neon geometry provided
  const outerDefault = "10,0 10,20 10,20 10,20 10,40 18,22 40,30";
  const outerHover   = "10,0 10,20 0,24 14,22 10,40 18,22 40,30";

  const middleDefault = "12,4 12,21 12,21 12,21 12,35 18,24 35,29";
  const middleHover   = "12,4 12,21 4,24 14,23 12,35 18,24 35,29";

  const innerDefault = "14,8 14,22 14,22 14,22 14,30 18,26 30,28";
  const innerHover   = "14,8 14,22 8,24 14,24 14,30 18,26 30,28";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        * { cursor: none !important; }
        input, textarea, select, [contenteditable] { cursor: text !important; }
      ` }} />
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: cursorXSpring,
          y: cursorYSpring,
          pointerEvents: "none",
          zIndex: 99999,
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.5)) drop-shadow(0px 0px 4px rgba(212,175,55,0.6))"
          }}
        >
          <defs>
            {/* Outer Glow (Saffron & Temple Gold) */}
            <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD27F" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
            {/* Inner Core (Project Emerald Green - Light to Dark) */}
            <linearGradient id="emeraldCore" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#24695c" />
              <stop offset="100%" stopColor="#acf0df" />
            </linearGradient>
          </defs>

          {/* Outer Layer */}
          <motion.polygon
            animate={{ points: isHovering ? outerHover : outerDefault }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            fill="url(#neonGlow)"
          />
          {/* Middle Bevel Layer (Deep Forest for depth) */}
          <motion.polygon
            animate={{ points: isHovering ? middleHover : middleDefault }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            fill="#00322B"
          />
          {/* Inner Core Layer */}
          <motion.polygon
            animate={{ points: isHovering ? innerHover : innerDefault }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            fill="url(#emeraldCore)"
          />
        </motion.svg>
      </motion.div>
    </>
  );
}
