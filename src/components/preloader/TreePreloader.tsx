"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function TreePreloader() {
  const [show, setShow] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Force animation by using a new session storage key
    const hasVisited = sessionStorage.getItem("dhara_visited_seed_to_banyan_v2");
    if (!hasVisited) {
      setShow(true);
      sessionStorage.setItem("dhara_visited_seed_to_banyan_v2", "true");
      
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
    }
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }} // Fades out completely to reveal the homepage smoothly
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            background: "#FBF6EC",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
            overflow: "hidden"
          }}
        >
          {/* Phase 6: Soft glow behind tree */}
          <motion.div
            animate={{
              opacity: [0.5, 0.9, 0.5],
              scale: [1, 1.12, 1],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              width: "250px",
              height: "250px",
              background: "radial-gradient(circle, rgba(232, 163, 61, 0.3) 0%, rgba(232, 163, 61, 0) 70%)",
              borderRadius: "50%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -60%)",
              pointerEvents: "none"
            }}
          />

          <div style={{ position: "relative", width: "200px", height: "260px" }}>
            <svg viewBox="0 0 200 260" style={{ width: "100%", height: "100%", overflow: "visible" }}>
              
              {/* Phase 1: Ground line */}
              <motion.line
                x1="20" y1="210" x2="180" y2="210"
                stroke="#cabaa0" strokeWidth="1.5" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
              />

              {/* NEW PHASE: The Seedling Sprout (Grows from 0.5s to 1.5s, then fades as the massive tree overtakes it) */}
              <motion.g
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
              >
                {/* Seedling Stem */}
                <motion.path
                  d="M 100 210 Q 95 180 100 160"
                  stroke="#179384" strokeWidth="2.5" fill="none" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                />
                {/* Seedling Leaf */}
                <motion.path
                  d="M 98 170 Q 80 170 85 155 Q 95 155 98 170"
                  fill="#179384"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{ transformOrigin: "98px 170px" }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                />
              </motion.g>

              {/* Phase 2: Roots (Delayed until trunk starts to grow) */}
              <motion.path
                d="M 98 210 Q 80 230 75 250"
                stroke="#C97A1F" strokeWidth="1.8" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 1.6, ease: "easeOut" }}
              />
              <motion.path
                d="M 100 210 Q 100 230 102 255"
                stroke="#C97A1F" strokeWidth="1.8" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 1.7, ease: "easeOut" }}
              />
              <motion.path
                d="M 102 210 Q 120 230 125 245"
                stroke="#C97A1F" strokeWidth="1.8" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 1.8, ease: "easeOut" }}
              />

              {/* Phase 3: Trunk Overtakes the Seedling (1.6s) */}
              <motion.path
                d="M 100 210 C 100 200 98 180 100 155 C 101 135 100 110 100 85"
                stroke="#3D2E1F" strokeWidth="4" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.0, delay: 1.6, ease: "easeInOut" }}
              />

              {/* Phase 4: Branches */}
              {/* Pair 1 - Lower */}
              <motion.path
                d="M 100 135 Q 70 125 60 100"
                stroke="#3D2E1F" strokeWidth="2.5" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 2.2, ease: "easeOut" }}
              />
              <motion.path
                d="M 100 135 Q 130 125 140 100"
                stroke="#3D2E1F" strokeWidth="2.5" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 2.2, ease: "easeOut" }}
              />

              {/* Pair 2 - Mid */}
              <motion.path
                d="M 100 115 Q 80 105 75 80"
                stroke="#3D2E1F" strokeWidth="2" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 2.5, ease: "easeOut" }}
              />
              <motion.path
                d="M 100 115 Q 120 105 125 80"
                stroke="#3D2E1F" strokeWidth="2" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 2.5, ease: "easeOut" }}
              />

              {/* Pair 3 - Upper */}
              <motion.path
                d="M 100 95 Q 85 90 85 70"
                stroke="#3D2E1F" strokeWidth="1.5" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 2.8, ease: "easeOut" }}
              />
              <motion.path
                d="M 100 95 Q 115 90 115 70"
                stroke="#3D2E1F" strokeWidth="1.5" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 2.8, ease: "easeOut" }}
              />

              {/* Phase 5: Leaf Clusters */}
              {/* Pair 1 - Lower Teal */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 2.8, type: "spring", bounce: 0.5 }}
                style={{ transformOrigin: "60px 100px" }}
              >
                <circle cx="60" cy="100" r="14" fill="#179384" />
                <circle cx="50" cy="95" r="10" fill="#179384" opacity="0.9" />
                <circle cx="65" cy="90" r="9" fill="#179384" opacity="0.8" />
              </motion.g>
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 2.9, type: "spring", bounce: 0.5 }}
                style={{ transformOrigin: "140px 100px" }}
              >
                <circle cx="140" cy="100" r="14" fill="#179384" />
                <circle cx="150" cy="95" r="10" fill="#179384" opacity="0.9" />
                <circle cx="135" cy="90" r="9" fill="#179384" opacity="0.8" />
              </motion.g>

              {/* Pair 2 - Mid Teal */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 3.1, type: "spring", bounce: 0.5 }}
                style={{ transformOrigin: "75px 80px" }}
              >
                <circle cx="75" cy="80" r="12" fill="#179384" />
                <circle cx="68" cy="74" r="9" fill="#179384" opacity="0.9" />
                <circle cx="82" cy="72" r="8" fill="#179384" opacity="0.8" />
              </motion.g>
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 3.2, type: "spring", bounce: 0.5 }}
                style={{ transformOrigin: "125px 80px" }}
              >
                <circle cx="125" cy="80" r="12" fill="#179384" />
                <circle cx="132" cy="74" r="9" fill="#179384" opacity="0.9" />
                <circle cx="118" cy="72" r="8" fill="#179384" opacity="0.8" />
              </motion.g>

              {/* Pair 3 - Upper Gold */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 3.4, type: "spring", bounce: 0.5 }}
                style={{ transformOrigin: "85px 70px" }}
              >
                <circle cx="85" cy="70" r="10" fill="#E8A33D" />
                <circle cx="80" cy="64" r="8" fill="#E8A33D" opacity="0.9" />
              </motion.g>
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 3.5, type: "spring", bounce: 0.5 }}
                style={{ transformOrigin: "115px 70px" }}
              >
                <circle cx="115" cy="70" r="10" fill="#E8A33D" />
                <circle cx="120" cy="64" r="8" fill="#E8A33D" opacity="0.9" />
              </motion.g>

              {/* Crown - Largest Gold Bloom */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.9, delay: 3.6, type: "spring", bounce: 0.55 }}
                style={{ transformOrigin: "100px 75px" }}
              >
                <circle cx="100" cy="75" r="18" fill="#E8A33D" />
                <circle cx="90" cy="65" r="14" fill="#C97A1F" opacity="0.9" />
                <circle cx="110" cy="65" r="14" fill="#E8A33D" opacity="0.9" />
                <circle cx="100" cy="55" r="12" fill="#C97A1F" opacity="0.8" />
              </motion.g>

              {/* Phase 5: Floating Petals */}
              {[
                { id: 1, cx: 90, cy: 50, delay: 3.6, duration: 2.2 },
                { id: 2, cx: 105, cy: 45, delay: 3.8, duration: 2.0 },
                { id: 3, cx: 95, cy: 35, delay: 4.0, duration: 2.5 },
                { id: 4, cx: 110, cy: 55, delay: 3.7, duration: 2.3 },
                { id: 5, cx: 85, cy: 60, delay: 3.9, duration: 2.4 },
              ].map((petal) => (
                <motion.g
                  key={petal.id}
                  initial={{ opacity: 0, y: 0, rotate: 0, scale: 1 }}
                  animate={{ opacity: [0, 0.8, 0], y: -65, rotate: 40, scale: 0.3 }}
                  transition={{ duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: "linear" }}
                >
                  <path
                    d={`M ${petal.cx} ${petal.cy} Q ${petal.cx + 3} ${petal.cy + 3} ${petal.cx} ${petal.cy + 6} Q ${petal.cx - 3} ${petal.cy + 3} ${petal.cx} ${petal.cy}`}
                    fill="#E8A33D"
                  />
                </motion.g>
              ))}
            </svg>
          </div>

          {/* Phase 7: Brand Wordmark and Logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 4.0, ease: "easeOut" }}
            style={{ textAlign: "center", position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <img 
              src="/logo-icon-only.png?v=4" 
              alt="Dhara Logo" 
              style={{ width: "48px", height: "48px", marginBottom: "16px", objectFit: "contain" }} 
            />
            <h1
              style={{
                fontFamily: "var(--font-heading), serif",
                fontWeight: 600,
                fontSize: "30px",
                letterSpacing: "0.15em",
                color: "#3D2E1F",
                textTransform: "uppercase",
                margin: 0,
                lineHeight: 1.2
              }}
            >
              Dhara
            </h1>
            
            <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center", marginTop: "4px" }}>
              <div style={{ width: "24px", height: "1px", backgroundColor: "#cabaa0" }} />
              <p
                style={{
                  fontFamily: "var(--font-heading), serif",
                  fontSize: "12px",
                  letterSpacing: "0.3em",
                  color: "#C97A1F",
                  textTransform: "uppercase",
                  margin: 0
                }}
              >
                Foundations
              </p>
              <div style={{ width: "24px", height: "1px", backgroundColor: "#cabaa0" }} />
            </div>
          </motion.div>

          {/* Phase 8: Progress bar */}
          <div style={{ width: "140px", height: "2px", background: "rgba(202, 186, 160, 0.3)", borderRadius: "2px", overflow: "hidden", marginTop: "8px" }}>
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
                borderRadius: "2px"
              }}
            />
          </div>

          {/* Phase 9: Exit Curtain (Slides UP from bottom to cover the tree) */}
          <motion.div
            initial={{ y: "100%" }}
            animate={exiting ? { y: "0%" } : { y: "100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              background: "#FBF6EC",
              zIndex: 10000,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
