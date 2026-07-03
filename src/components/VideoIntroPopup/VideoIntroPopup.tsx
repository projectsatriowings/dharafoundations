"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./VideoIntroPopup.css";

interface VideoIntroPopupProps {
  video1Src: string;
  video2Src: string;
}

const SESSION_KEY = "dhara_intro_seen";

export default function VideoIntroPopup({ video1Src, video2Src }: VideoIntroPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<1 | 2>(1);
  const [isMuted, setIsMuted] = useState(true);
  const [v1Duration, setV1Duration] = useState(0);
  const [v2Duration, setV2Duration] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const switchedRef = useRef(false); // prevent double-switch

  // ── Show popup after 500ms delay whenever page loads or refreshes ──
  useEffect(() => {
    setIsVisible(false);
    const t = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(t);
  }, [video1Src, video2Src]);

  // ── Focus close button on open for a11y ──
  useEffect(() => {
    if (isVisible) {
      // Small delay to let animation start before focusing
      const t = setTimeout(() => closeButtonRef.current?.focus(), 500);
      return () => clearTimeout(t);
    }
  }, [isVisible]);

  // ── Start video 1 when popup becomes visible ──
  useEffect(() => {
    if (isVisible) {
      switchedRef.current = false;
      setCurrentVideo(1);
      const t = setTimeout(() => {
        if (video1Ref.current) {
          video1Ref.current.currentTime = 0;
          video1Ref.current.play().catch(() => {});
        }
      }, 100);
      return () => clearTimeout(t);
    }
  }, [isVisible]);

  // ── Sync muted state to both video elements ──
  useEffect(() => {
    if (video1Ref.current) video1Ref.current.muted = isMuted;
    if (video2Ref.current) video2Ref.current.muted = isMuted;
  }, [isMuted]);

  // ── Switch to video 2 ──
  const switchToVideo2 = useCallback(() => {
    if (switchedRef.current) return;
    switchedRef.current = true;
    setCurrentVideo(2);
    if (video1Ref.current) video1Ref.current.pause();
    video2Ref.current?.play().catch(() => {});
  }, []);

  // ── Close popup ──
  const closePopup = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, "true");
    setIsVisible(false);
    // Pause both videos
    video1Ref.current?.pause();
    video2Ref.current?.pause();
  }, []);

  // ── Video 1 time update → progress + crossfade trigger ──
  const handleV1TimeUpdate = useCallback(() => {
    const v1 = video1Ref.current;
    if (!v1 || !v1.duration) return;
    const total = v1Duration + v2Duration || v1.duration;
    setTotalProgress((v1.currentTime / total) * 100);

    // Trigger crossfade 0.4s before end
    if (v1.duration > 0 && v1.currentTime >= v1.duration - 0.4) {
      switchToVideo2();
    }
  }, [v1Duration, v2Duration, switchToVideo2]);

  // ── Video 2 time update → progress ──
  const handleV2TimeUpdate = useCallback(() => {
    const v2 = video2Ref.current;
    if (!v2 || !v2.duration) return;
    const total = v1Duration + v2Duration || v2.duration;
    setTotalProgress(((v1Duration + v2.currentTime) / total) * 100);
  }, [v1Duration, v2Duration]);

  // ── Video 2 ends → close popup ──
  const handleV2End = useCallback(() => {
    closePopup();
  }, [closePopup]);

  // ── Video 1 can play → hide spinner ──
  const handleV1CanPlay = useCallback(() => {
    setIsLoading(false);
  }, []);

  // ── Skip handler ──
  const handleSkip = useCallback(() => {
    if (currentVideo === 1) {
      switchToVideo2();
    } else {
      closePopup();
    }
  }, [currentVideo, switchToVideo2, closePopup]);

  // ── Create a dedicated portal container to avoid body hydration mismatch ──
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    let el = document.getElementById("video-intro-portal") as HTMLDivElement | null;
    if (!el) {
      el = document.createElement("div");
      el.id = "video-intro-portal";
      el.style.position = "fixed";
      el.style.zIndex = "9999";
      el.style.pointerEvents = "none";
      el.style.inset = "0";
      document.body.appendChild(el);
    }
    setPortalContainer(el);
    setMounted(true);
  }, []);

  // Don't render anything server-side or before mount
  if (!mounted || !portalContainer) return null;

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`video-intro-popup ${isMinimized ? "video-intro-popup--minimized" : ""} ${isMaximized ? "video-intro-popup--maximized" : ""}`}
          role="dialog"
          aria-modal="false"
          aria-label="Dhara Foundations video introduction"
          drag={!isMaximized}
          dragMomentum={false}
          whileDrag={{ scale: 1.03, boxShadow: "0 24px 64px rgba(0, 0, 0, 0.65)" }}
          initial={{ opacity: 0, y: 40, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 32, scale: 0.92 }}
          transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* ─── A) TOP BAR ─── */}
          <div className="vip-top-bar" title="Drag to reposition window">
            <div className="vip-brand">
              {!isMaximized && <span className="vip-drag-grip" aria-hidden="true">⋮⋮</span>}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-stacked-white.png"
                alt=""
                className="vip-brand-icon"
                onError={(e) => {
                  // Fallback: hide if logo doesn't exist
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="vip-brand-name">Dhara Foundations</span>
            </div>
            <div className="vip-window-controls">
              <button
                className="vip-ctrl-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(!isMinimized);
                  if (!isMinimized) setIsMaximized(false);
                }}
                onPointerDown={(e) => e.stopPropagation()}
                title={isMinimized ? "Restore window" : "Minimize window"}
                aria-label={isMinimized ? "Restore window" : "Minimize window"}
              >
                {isMinimized ? "□" : "−"}
              </button>
              <button
                className="vip-ctrl-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMaximized(!isMaximized);
                  if (!isMaximized) setIsMinimized(false);
                }}
                onPointerDown={(e) => e.stopPropagation()}
                title={isMaximized ? "Restore size" : "Maximize window"}
                aria-label={isMaximized ? "Restore size" : "Maximize window"}
              >
                {isMaximized ? "❐" : "⛶"}
              </button>
              <button
                ref={closeButtonRef}
                className="vip-ctrl-btn vip-ctrl-btn--close"
                onClick={(e) => {
                  e.stopPropagation();
                  closePopup();
                }}
                onPointerDown={(e) => e.stopPropagation()}
                title="Close video"
                aria-label="Close video"
              >
                ×
              </button>
            </div>
          </div>

          {/* ─── B) VIDEO AREA ─── */}
          <div className="vip-video-area">
            {/* Loading spinner */}
            {isLoading && (
              <div className="vip-spinner-wrap">
                <div className="vip-spinner" />
              </div>
            )}

            {/* Video 1 */}
            <video
              ref={video1Ref}
              className="vip-video"
              src={video1Src}
              playsInline
              muted={isMuted}
              preload="auto"
              style={{ opacity: currentVideo === 1 ? 1 : 0 }}
              onTimeUpdate={handleV1TimeUpdate}
              onLoadedMetadata={(e) => setV1Duration((e.target as HTMLVideoElement).duration)}
              onCanPlay={handleV1CanPlay}
              onEnded={switchToVideo2}
            />

            {/* Video 2 */}
            <video
              ref={video2Ref}
              className="vip-video"
              src={video2Src}
              playsInline
              muted={isMuted}
              preload="auto"
              style={{ opacity: currentVideo === 2 ? 1 : 0 }}
              onTimeUpdate={handleV2TimeUpdate}
              onLoadedMetadata={(e) => setV2Duration((e.target as HTMLVideoElement).duration)}
              onEnded={handleV2End}
            />

            {/* ─── C) CONTROL BAR ─── */}
            <div className="vip-control-bar">
              {/* Mute toggle */}
              <button
                className="vip-mute-btn"
                onClick={() => setIsMuted((m) => !m)}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? (
                  /* Speaker off icon */
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  /* Speaker on icon */
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>

              {/* Progress bar */}
              <div className="vip-progress-track">
                <div
                  className="vip-progress-fill"
                  style={{ width: `${Math.min(totalProgress, 100)}%` }}
                />
                <div
                  className="vip-progress-thumb"
                  style={{ left: `${Math.min(totalProgress, 100)}%` }}
                />
              </div>

              {/* Video counter */}
              <span className="vip-counter">{currentVideo} / 2</span>

              {/* Skip button */}
              <button className="vip-skip-btn" onClick={handleSkip}>
                {currentVideo === 1 ? "Skip →" : "Skip ×"}
              </button>
            </div>
          </div>

          {/* ─── D) BOTTOM STRIP ─── */}
          <div className="vip-bottom-strip">
            <div
              className={`vip-dot ${currentVideo === 1 ? "vip-dot--active" : "vip-dot--inactive"}`}
            />
            <div
              className={`vip-dot ${currentVideo === 2 ? "vip-dot--active" : "vip-dot--inactive"}`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalContainer
  );
}
