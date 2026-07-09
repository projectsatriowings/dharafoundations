'use client';

import { useEffect, useRef, useState } from 'react';

export default function RingCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef  = useRef<number>(0);

  const mouse   = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });

  // ─── LERP FACTOR ─────────────────────────────────────────
  // 0.01 = very slow (old broken behavior)
  // 0.15 = smooth and slightly behind (default)
  // 0.25 = fast, barely any lag         ← USE THIS
  // 0.40 = very fast, almost instant
  // 1.00 = instant, same as dot (no trail feel)
  const LERP = 0.25;

  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] =
    useState<'default' | 'hover' | 'click'>('default');

  useEffect(() => {
    // Skip on touch/mobile — no cursor needed
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Keep native cursor as default
    document.documentElement.style.cursor = 'auto';
    return;

    // ── Mouse move ──────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Detect hover state
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el?.closest('a, button, [role="button"], input, textarea, select')) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    const onMouseDown  = () => setCursorState('click');
    const onMouseUp    = () => setCursorState('default');
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    document.addEventListener('mousemove',        onMouseMove);
    document.addEventListener('mousedown',        onMouseDown);
    document.addEventListener('mouseup',          onMouseUp);
    document.addEventListener('mouseleave',       onMouseLeave);
    document.addEventListener('mouseenter',       onMouseEnter);

    // ── RAF loop — ring lerps toward mouse ──────────────────
    const animate = () => {
      // Dot: snaps directly, zero lag
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`;
      }

      // Ring: lerps toward mouse at LERP speed
      ring.current.x += (mouse.current.x - ring.current.x) * LERP;
      ring.current.y += (mouse.current.y - ring.current.y) * LERP;

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove',  onMouseMove);
      document.removeEventListener('mousedown',  onMouseDown);
      document.removeEventListener('mouseup',    onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.documentElement.style.cursor = '';
    };
  }, []);

  // ── Dynamic styles based on state ────────────────────────
  const ringSize  = cursorState === 'hover' ? 44
                  : cursorState === 'click' ? 28
                  : 40;

  const ringColor = cursorState === 'hover'
    ? 'rgba(243, 167, 18, 0.9)'   // saffron on hover
    : cursorState === 'click'
    ? 'rgba(243, 167, 18, 1.0)'   // bright saffron on click
    : 'rgba(138, 80, 0, 0.75)';   // theme brown default

  const dotSize   = cursorState === 'click' ? 10
                  : cursorState === 'hover'  ?  8
                  : 8;

  const dotColor  = cursorState === 'hover' || cursorState === 'click'
    ? '#F3A712'   // saffron on hover/click
    : '#8a5000';  // theme brown default

  return (
    <>
      {/* DOT — snaps instantly to cursor */}
      <div
        ref={dotRef}
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          width:         `${dotSize}px`,
          height:        `${dotSize}px`,
          borderRadius:  '50%',
          background:    dotColor,
          opacity:       isVisible ? 1 : 0,
          pointerEvents: 'none',
          zIndex:        999999,
          willChange:    'transform',
          transition:
            'width 0.15s ease, height 0.15s ease,' +
            'background 0.15s ease, opacity 0.3s ease',
          boxShadow:
            cursorState === 'hover'
              ? '0 0 8px rgba(243,167,18,0.8)'
              : cursorState === 'click'
              ? '0 0 12px rgba(243,167,18,1)'
              : 'none',
        }}
      />

      {/* RING — follows with fast smooth lag */}
      <div
        ref={ringRef}
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          width:         `${ringSize}px`,
          height:        `${ringSize}px`,
          borderRadius:  '50%',
          border:        `1.5px solid ${ringColor}`,
          background:    'transparent',
          opacity:       isVisible ? 1 : 0,
          pointerEvents: 'none',
          zIndex:        999998,
          willChange:    'transform',
          transition:
            'width 0.2s ease, height 0.2s ease,' +
            'border-color 0.2s ease, opacity 0.3s ease,' +
            'box-shadow 0.2s ease',
          boxShadow:
            cursorState === 'hover'
              ? '0 0 12px rgba(243,167,18,0.25), inset 0 0 8px rgba(243,167,18,0.08)'
              : cursorState === 'click'
              ? '0 0 16px rgba(243,167,18,0.5)'
              : 'none',
        }}
      />

      <style>{`
        * { cursor: none !important; }
      `}</style>
    </>
  );
}
