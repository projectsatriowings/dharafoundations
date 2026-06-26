"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxBgProps {
  bgUrl?: string;
  children?: React.ReactNode;
  className?: string;
  speed?: number; // e.g. 0.3
  overlayClassName?: string;
  bottomGradientClassName?: string;
}

export function ParallaxBg({
  bgUrl,
  children,
  className = "",
  speed = 0.3,
  overlayClassName = "bg-deep-forest/40",
  bottomGradientClassName,
}: ParallaxBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || reducedMotion || !containerRef.current || !bgRef.current) return;

    const container = containerRef.current;
    const bg = bgRef.current;

    const anim = gsap.fromTo(
      bg,
      { y: "-15%" },
      {
        y: "15%",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === container) t.kill();
      });
    };
  }, [speed]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {bgUrl && (
        <div
          ref={bgRef}
          className="absolute -top-[20%] left-0 w-full h-[140%] bg-cover bg-center transition-transform duration-300"
          style={{ backgroundImage: `url('${bgUrl}')` }}
        />
      )}
      {overlayClassName && <div className={`absolute inset-0 ${overlayClassName}`} />}
      {bottomGradientClassName && (
        <div
          className={`absolute bottom-0 left-0 right-0 pointer-events-none z-[1] ${bottomGradientClassName}`}
        />
      )}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
