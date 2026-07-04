'use client';

import { useEffect, useRef, useState } from 'react';

const TOTAL_DOTS = 20;

// Pre-defined dot configs (size, color, opacity, glow) using Theme Golden Brown (#8a5000) -> Deep Earth Brown (#2c1600)
const DOT_CONFIG = [
  { size: 14, color: '#8a5000', opacity: 1.00, glow: '0 0 10px rgba(138,80,0,0.9), 0 0 20px rgba(244,155,51,0.6)' },
  { size: 12, color: '#8a5000', opacity: 0.92, glow: '0 0 8px rgba(138,80,0,0.7)' },
  { size: 11, color: '#854d00', opacity: 0.82, glow: '0 0 6px rgba(138,80,0,0.6)' },
  { size: 10, color: '#804a00', opacity: 0.72, glow: '0 0 5px rgba(138,80,0,0.5)' },
  { size: 9, color: '#7b4700', opacity: 0.62, glow: 'none' },
  { size: 8, color: '#764400', opacity: 0.55, glow: 'none' },
  { size: 7, color: '#714100', opacity: 0.48, glow: 'none' },
  { size: 6.5, color: '#6c3e00', opacity: 0.42, glow: 'none' },
  { size: 6, color: '#673b00', opacity: 0.36, glow: 'none' },
  { size: 5.5, color: '#633800', opacity: 0.30, glow: 'none' },
  { size: 5, color: '#5d3400', opacity: 0.25, glow: 'none' },
  { size: 4.5, color: '#583100', opacity: 0.22, glow: 'none' },
  { size: 4, color: '#522d00', opacity: 0.18, glow: 'none' },
  { size: 3.5, color: '#4d2a00', opacity: 0.15, glow: 'none' },
  { size: 3, color: '#482700', opacity: 0.12, glow: 'none' },
  { size: 2.5, color: '#422300', opacity: 0.10, glow: 'none' },
  { size: 2, color: '#3d2000', opacity: 0.08, glow: 'none' },
  { size: 2, color: '#381d00', opacity: 0.06, glow: 'none' },
  { size: 1.5, color: '#321900', opacity: 0.04, glow: 'none' },
  { size: 1.5, color: '#2c1600', opacity: 0.02, glow: 'none' },
];

// Smoothed lerp factors: dot 0 uses 0.45 instead of instant jump (1) to eliminate OS mouse jitter and make motion fluid
const LERP_FACTORS = [
  0.45, // dot 0 smoothed!
  0.38, 0.33, 0.29, 0.26, 0.23, 0.21, 0.19, 0.17, 0.16,
  0.15, 0.14, 0.13, 0.12, 0.11, 0.10, 0.09, 0.08, 0.07, 0.06,
];

type CursorState = 'default' | 'link' | 'card';

export default function DotTrailCursor() {
  // Array of refs — one per dot div element
  const dotRefs = useRef<(HTMLDivElement | null)[]>(
    Array(TOTAL_DOTS).fill(null)
  );

  const positions = useRef<{ x: number; y: number }[]>(
    Array(TOTAL_DOTS).fill({ x: -100, y: -100 })
  );

  const mouse = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const stateRef = useRef<CursorState>('default');
  const visibleRef = useRef(false);

  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    // Only skip on actual small mobile screens (under 768px width)
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

    // Hide native cursor
    document.documentElement.style.cursor = 'none';

    let hasMoved = false;
    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        for (let i = 0; i < TOTAL_DOTS; i++) {
          positions.current[i] = { x: e.clientX, y: e.clientY };
        }
      }
      mouse.current = { x: e.clientX, y: e.clientY };
      visibleRef.current = true;

      // Detect hover state
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el?.closest('a, button, [role="button"]')) {
        stateRef.current = 'link';
      } else if (el?.closest('img, .video-card, [data-cursor="card"], .modern-card, .gallery-tile')) {
        stateRef.current = 'card';
      } else {
        stateRef.current = 'default';
      }
    };

    const onMouseLeave = () => {
      visibleRef.current = false;
    };
    const onMouseEnter = () => {
      visibleRef.current = true;
    };

    const onMouseDown = (e: MouseEvent) => {
      const id = Date.now();
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 500);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mousedown', onMouseDown);

    // RAF animation loop
    const animate = () => {
      const state = stateRef.current;
      const visible = visibleRef.current;

      // Lerp all dots toward the target ahead of them
      for (let i = 0; i < TOTAL_DOTS; i++) {
        const prev = i === 0 ? mouse.current : positions.current[i - 1];
        const curr = positions.current[i];
        let lf = LERP_FACTORS[i];
        // Adjust lerp for state
        if (state === 'link') lf = Math.min(lf + 0.05, 0.6);
        if (state === 'card') lf = Math.max(lf - 0.03, 0.04);

        positions.current[i] = {
          x: curr.x + (prev.x - curr.x) * lf,
          y: curr.y + (prev.y - curr.y) * lf,
        };
      }

      // Apply positions to DOM via refs using hardware accelerated translate3d
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        const cfg = DOT_CONFIG[i];
        const pos = positions.current[i];
        const size = state === 'link' && i === 0 ? 18
                   : state === 'card' && i === 0 ? 16
                   : cfg.size;
        const op = visible
          ? (state === 'link' ? Math.min(cfg.opacity + 0.1, 1) : cfg.opacity)
          : 0;

        dot.style.transform = `translate3d(${pos.x - size / 2}px, ${pos.y - size / 2}px, 0px)`;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.opacity = `${op}`;
        dot.style.boxShadow = state === 'link' && i === 0
          ? '0 0 20px rgba(138,80,0,1), 0 0 40px rgba(244,155,51,0.8)'
          : cfg.glow === 'none' ? 'none' : cfg.glow;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mousedown', onMouseDown);
      cancelAnimationFrame(rafRef.current);
      document.documentElement.style.cursor = '';
    };
  }, []);

  return (
    <>
      {/* 20 dot divs — positions updated via refs, not React state */}
      {DOT_CONFIG.map((cfg, i) => (
        <div
          key={i}
          ref={(el) => { dotRefs.current[i] = el; }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${cfg.size}px`,
            height: `${cfg.size}px`,
            borderRadius: '50%',
            background: cfg.color,
            boxShadow: cfg.glow === 'none' ? 'none' : cfg.glow,
            opacity: 0,
            pointerEvents: 'none',
            zIndex: 99999 - i,
            willChange: 'transform, opacity, width, height',
            transition: 'opacity 0.3s ease, width 0.15s ease, height 0.15s ease',
          }}
        />
      ))}

      {/* Click ripple rings */}
      {ripples.map((rp) => (
        <div
          key={rp.id}
          style={{
            position: 'fixed',
            top: rp.y - 10,
            left: rp.x - 10,
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '2px solid rgba(138,80,0,0.8)',
            pointerEvents: 'none',
            zIndex: 99998,
            animation: 'dotCursorRipple 0.4s ease-out forwards',
          }}
        />
      ))}

      <style>{`
        * { cursor: none !important; }
        @keyframes dotCursorRipple {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(4); opacity: 0; }
        }
      `}</style>
    </>
  );
}
