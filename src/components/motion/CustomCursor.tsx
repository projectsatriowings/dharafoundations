"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring configs for trailing ring
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check coarse pointer
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, [role='button'], .modern-card, .gallery-tile");
      
      if (interactiveEl) {
        setIsHovered(true);
        const label = interactiveEl.getAttribute("data-cursor-label") || 
                      (interactiveEl.classList.contains("gallery-tile") ? "VIEW" : "");
        setHoverText(label);
      } else {
        setIsHovered(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        className="custom-cursor-dot"
        style={{
          x: mouseX,
          y: mouseY,
          scale: isHovered ? 0.5 : 1,
        }}
      />
      <motion.div
        className="custom-cursor-ring"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          scale: isHovered ? (hoverText ? 2.2 : 1.6) : 1,
          borderColor: isHovered ? "#f49b33" : "rgba(138, 80, 0, 0.5)",
          backgroundColor: isHovered ? "rgba(255, 210, 127, 0.25)" : "rgba(255, 210, 127, 0.08)",
        }}
        transition={{ duration: 0.2 }}
      >
        {hoverText && <span className="text-[6px] text-primary tracking-widest">{hoverText}</span>}
      </motion.div>
    </>
  );
}
