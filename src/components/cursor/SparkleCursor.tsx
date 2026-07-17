"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function SparkleCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [visible, setVisible] = useState(true);

  // Framer motion values to track mouse accurately
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Ultra-smooth spring physics for a premium "fluid" feel
  const springConfig = { damping: 25, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const touchCheck =
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (touchCheck) {
      setIsTouchDevice(true);
      return;
    }

    // Global CSS is injected via a <style> tag below for reliability

    const onMove = (e: MouseEvent) => {
      // Offset by 16px so the exact center of the 32x32 sparkle is the click point
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, select, label, [role='button']")) {
        setIsHovering(true);
      }
    };

    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, select, label, [role='button']")) {
        setIsHovering(false);
      }
    };

    const onOut = () => setVisible(false);
    const onIn = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onEnter, { passive: true });
    window.addEventListener("mouseout", onLeave, { passive: true });
    document.documentElement.addEventListener("mouseleave", onOut);
    document.documentElement.addEventListener("mouseenter", onIn);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onEnter);
      window.removeEventListener("mouseout", onLeave);
      document.documentElement.removeEventListener("mouseleave", onOut);
      document.documentElement.removeEventListener("mouseenter", onIn);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Force hide default cursor globally with maximum specificity */}
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
      {/* 
        The Sparkle / Flare Cursor 
        - Center is exactly at mouse coordinate
        - Beautiful concave 4-point star (divine light / sparkle)
        - High contrast Saffron gold + white glow
      */}
      <motion.svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          rotate: isHovering ? 90 : 0,
          scale: isHovering ? 1.4 : 1,
          filter: isHovering 
            ? "drop-shadow(0 0 8px rgba(212, 175, 55, 0.8))"
            : "drop-shadow(0 0 4px rgba(255, 255, 255, 0.6)) drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ originX: "16px", originY: "16px" }} // Rotate around exact center
      >
        <motion.path
          d="M 12 0 C 12 8 16 12 24 12 C 16 12 12 16 12 24 C 12 16 8 12 0 12 C 8 12 12 8 12 0 Z"
          animate={{
            fill: isHovering ? "#FFF" : "#D4AF37",
          }}
          transition={{ duration: 0.3 }}
        />
        {/* Inner bright core */}
        <motion.circle
          cx="12"
          cy="12"
          r="1.5"
          animate={{
            fill: isHovering ? "#D4AF37" : "#FFF",
            scale: isHovering ? 1.5 : 1
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.svg>
    </motion.div>
    </>
  );
}
