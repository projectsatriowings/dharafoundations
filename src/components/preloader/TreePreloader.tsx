"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function TreePreloader() {
  const [show, setShow] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Run unconditionally on mount
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const exitTimer = setTimeout(() => {
      setExiting(true);
      // After the curtain slides up (600ms), we unmount the whole preloader
      setTimeout(() => {
        setShow(false);
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }, 600);
    }, 5500); // 5.5s total preloader duration to show the full growth sequence

    return () => clearTimeout(exitTimer);
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }} // Fades out completely to reveal the homepage smoothly
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            background: "#000",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden"
          }}
        >
          {/* Full-Screen AI Video Background */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
            <video 
              src="/videos/ai-waterfall.mp4"
              autoPlay 
              loop 
              muted 
              playsInline 
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
            />
            {/* Deep emerald overlay for readability and branding */}
            <div style={{ position: "absolute", inset: 0, background: "rgba(0, 30, 20, 0.55)" }} />
          </div>

          {/* Phase 6: Soft glow behind logo */}
          <motion.div
            animate={{
              opacity: [0.5, 0.9, 0.5],
              scale: [1, 1.12, 1],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              width: "350px",
              height: "350px",
              background: "radial-gradient(circle, rgba(232, 163, 61, 0.3) 0%, rgba(232, 163, 61, 0) 70%)",
              borderRadius: "50%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 1
            }}
          />

          {/* Phase 7: Brand Wordmark and Logo (Overlaid on background) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            style={{ textAlign: "center", position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <img 
              src="/logo-icon-only.png?v=4" 
              alt="Dhara Logo" 
              style={{ width: "80px", height: "80px", marginBottom: "24px", objectFit: "contain", filter: "drop-shadow(0 0 15px rgba(255,255,255,0.4))" }} 
            />
            <h1
              style={{
                fontFamily: "var(--font-heading), serif",
                fontWeight: 600,
                fontSize: "48px",
                letterSpacing: "0.15em",
                color: "#FFFFFF",
                textTransform: "uppercase",
                margin: 0,
                lineHeight: 1.2,
                textShadow: "0 4px 20px rgba(0,0,0,0.5)"
              }}
            >
              Dhara
            </h1>
            
            <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", marginTop: "8px" }}>
              <div style={{ width: "30px", height: "1px", backgroundColor: "rgba(255, 255, 255, 0.4)" }} />
              <p
                style={{
                  fontFamily: "var(--font-heading), serif",
                  fontSize: "16px",
                  letterSpacing: "0.3em",
                  color: "#E8A33D",
                  textTransform: "uppercase",
                  margin: 0,
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)"
                }}
              >
                Foundations
              </p>
              <div style={{ width: "30px", height: "1px", backgroundColor: "rgba(255, 255, 255, 0.4)" }} />
            </div>

            {/* Phase 8: Progress bar */}
            <div style={{ width: "160px", height: "3px", background: "rgba(255, 255, 255, 0.2)", borderRadius: "3px", overflow: "hidden", marginTop: "40px" }}>
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 4.5,
                  delay: 0.5,
                  times: [0, 0.2, 0.55, 0.8, 1],
                  ease: "linear"
                }}
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #179384 0%, #E8A33D 100%)",
                  borderRadius: "3px"
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
