"use client";

import { useEffect, useRef } from "react";

/**
 * DivineHaloCursor
 * A warm glowing core (bigger + more visible than the previous version)
 * with a slow-rotating halo of soft light points orbiting it, like a
 * temple lamp corona, plus a few slow-rising embers. Medium intensity —
 * present and felt, but not flashy or oversized.
 *
 * Usage: render <DivineHaloCursor /> once near the root of your app,
 * outside normal document flow (layout.tsx / App.tsx).
 */

const AURA_COLOR = "#FFD27F"; // saffron-glow
const AURA_CORE = "#D4AF37"; // temple-gold
const HALO_COLOR = "#D4AF37";
const SPARK_COLORS = ["#D4AF37", "#FFD27F", "#FFFFFF", "#f49b33"];

const FOLLOW_EASE = 0.14; // aura lag — lower = floatier
const HALO_FOLLOW_EASE = 0.08; // halo lags slightly more than core, for depth
const SPARK_SPAWN_RATE = 0.2; // fewer, calmer sparks than before
const MAX_SPARKS = 30;
const HALO_POINTS = 10;
const HALO_RADIUS = 42;
const HALO_ROTATE_SPEED = 0.006;

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  color: string;
  flicker: number;
};

export default function DivineHaloCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  const mouse = useRef({ x: -9999, y: -9999 });
  const core = useRef({ x: -9999, y: -9999 });
  const halo = useRef({ x: -9999, y: -9999 });
  const sparks = useRef<Spark[]>([]);
  const time = useRef(0);
  const haloAngle = useRef(0);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches ||
      !window.matchMedia("(pointer: fine)").matches ||
      window.innerWidth < 1024;
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("pointermove", handleMove);

    const spawnSpark = () => {
      if (sparks.current.length >= MAX_SPARKS) return;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.25 + Math.random() * 0.5;
      sparks.current.push({
        x: core.current.x + (Math.random() - 0.5) * 14,
        y: core.current.y + (Math.random() - 0.5) * 14,
        vx: Math.cos(angle) * speed * 0.25,
        vy: Math.sin(angle) * speed * 0.25 - 0.35,
        size: 1.5 + Math.random() * 2.5,
        life: 1,
        color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
        flicker: Math.random() * Math.PI * 2,
      });
    };

    const draw = () => {
      time.current += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Two-tier easing gives the halo a touch of depth/parallax vs the core
      core.current.x += (mouse.current.x - core.current.x) * FOLLOW_EASE;
      core.current.y += (mouse.current.y - core.current.y) * FOLLOW_EASE;
      halo.current.x += (mouse.current.x - halo.current.x) * HALO_FOLLOW_EASE;
      halo.current.y += (mouse.current.y - halo.current.y) * HALO_FOLLOW_EASE;

      haloAngle.current += HALO_ROTATE_SPEED;

      if (Math.random() < SPARK_SPAWN_RATE) spawnSpark();

      ctx.globalCompositeOperation = "lighter";

      // --- Outer soft bloom (bigger + a touch stronger than before) ---
      const pulse = 1 + Math.sin(time.current * 0.035) * 0.1;
      const outerRadius = 58 * pulse;
      const outerGrad = ctx.createRadialGradient(
        core.current.x,
        core.current.y,
        0,
        core.current.x,
        core.current.y,
        outerRadius
      );
      outerGrad.addColorStop(0, hexToRgba(AURA_COLOR, 0.42));
      outerGrad.addColorStop(0.5, hexToRgba(AURA_COLOR, 0.16));
      outerGrad.addColorStop(1, hexToRgba(AURA_COLOR, 0));
      ctx.fillStyle = outerGrad;
      ctx.beginPath();
      ctx.arc(core.current.x, core.current.y, outerRadius, 0, Math.PI * 2);
      ctx.fill();

      // --- Halo ring: soft points slowly orbiting ---
      for (let i = 0; i < HALO_POINTS; i++) {
        const a = haloAngle.current + (i / HALO_POINTS) * Math.PI * 2;
        // slight radius wobble so it breathes rather than spins mechanically
        const wobble = Math.sin(time.current * 0.02 + i) * 4;
        const r = HALO_RADIUS + wobble;
        const hx = halo.current.x + Math.cos(a) * r;
        const hy = halo.current.y + Math.sin(a) * r * 0.55; // slight ellipse, feels dimensional

        const dotAlpha = 0.35 + Math.sin(time.current * 0.05 + i * 1.3) * 0.15;
        const dotGrad = ctx.createRadialGradient(hx, hy, 0, hx, hy, 5);
        dotGrad.addColorStop(0, hexToRgba(HALO_COLOR, dotAlpha));
        dotGrad.addColorStop(1, hexToRgba(HALO_COLOR, 0));
        ctx.fillStyle = dotGrad;
        ctx.beginPath();
        ctx.arc(hx, hy, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Warm inner core (bigger + brighter) ---
      const coreRadius = 12 * pulse;
      const coreGrad = ctx.createRadialGradient(
        core.current.x,
        core.current.y,
        0,
        core.current.x,
        core.current.y,
        coreRadius
      );
      coreGrad.addColorStop(0, hexToRgba("#FFFFFF", 0.95));
      coreGrad.addColorStop(0.4, hexToRgba(AURA_CORE, 0.8));
      coreGrad.addColorStop(1, hexToRgba(AURA_CORE, 0));
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(core.current.x, core.current.y, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      // --- Sparks ---
      sparks.current.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.vy -= 0.0015;
        s.life -= 0.01;
        s.flicker += 0.22;

        const twinkle = 0.5 + Math.sin(s.flicker) * 0.5;
        const alpha = Math.max(s.life, 0) * twinkle;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * Math.max(s.life, 0), 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(s.color, alpha);
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 7;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      sparks.current = sparks.current.filter((s) => s.life > 0);

      ctx.globalCompositeOperation = "source-over";
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block"
      aria-hidden="true"
    />
  );
}

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
