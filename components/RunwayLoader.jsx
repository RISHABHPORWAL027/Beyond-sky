"use client";

import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function Airplane({ isDark }) {
  const bodyTop = isDark ? "#ececec" : "#c8c8c8";
  const bodyMid = isDark ? "#ffffff" : "#dedede";
  const bodyBot = isDark ? "#d0d0d0" : "#b4b4b4";
  const wingLight = isDark ? "#f8f8f8" : "#d8d8d8";
  const wingDark = isDark ? "#bababa" : "#909090";
  const tail = isDark ? "#c8c8c8" : "#a8a8a8";
  const nose = isDark ? "#f4f4f4" : "#d8d8d8";

  return (
    <svg
      className="airplane-svg"
      viewBox="0 0 72 46"
      fill="none"
      style={{
        width: "72px",
        height: "auto",
        filter: isDark
          ? "drop-shadow(0 4px 12px rgba(0,0,0,0.75)) drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
          : "drop-shadow(0 2px 8px rgba(0,0,0,0.35)) drop-shadow(0 1px 3px rgba(0,0,0,0.2))",
      }}
    >
      <defs>
        <linearGradient id="rl-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={bodyTop} />
          <stop offset="40%" stopColor={bodyMid} />
          <stop offset="100%" stopColor={bodyBot} />
        </linearGradient>
        <linearGradient id="rl-wing-t" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor={wingLight} />
          <stop offset="100%" stopColor={wingDark} />
        </linearGradient>
        <linearGradient id="rl-wing-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={wingLight} />
          <stop offset="100%" stopColor={wingDark} />
        </linearGradient>
      </defs>

      {/* Wings */}
      <path d="M44,21 L28,21 L8,2 L18,0 Z" fill="url(#rl-wing-t)" />
      <path d="M44,25 L28,25 L8,44 L18,46 Z" fill="url(#rl-wing-b)" />

      {/* Tail Horizontal Stabilizers */}
      <path d="M8,21 L2,14 L6,14 L12,21 Z" fill={tail} />
      <path d="M8,25 L2,32 L6,32 L12,25 Z" fill={tail} />

      {/* Fuselage Body */}
      <ellipse cx="34" cy="23" rx="29" ry="7" fill="url(#rl-body)" />

      {/* Aircraft Nosecone */}
      <path
        d="M61,19.5 C66,21.5 67.5,23 67,23 C67.5,23 66,24.5 61,26.5 L58,23 Z"
        fill={nose}
      />

      {/* Cockpit Windshield */}
      <ellipse cx="57" cy="23" rx="4" ry="3" fill="#38bdf8" opacity="0.9" />
    </svg>
  );
}

export default function RunwayLoader({ onComplete }) {
  const containerRef = useRef(null);
  const [isDark, setIsDark] = useState(true);

  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const check = () => {
      const card = el.closest("[data-card-theme]");
      setIsDark(
        card
          ? card.classList.contains("dark")
          : document.documentElement.classList.contains("dark") || true
      );
    };
    check();
  }, []);

  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("taxiing");
  const [cycle, setCycle] = useState(0);

  const rafRef = useRef(0);
  const startRef = useRef(undefined);
  const aliveRef = useRef(true);
  const disappearedRef = useRef(false);

  // Lower to shorten the runway travel before takeoff lift
  const WALL_PCT = 91;

  useEffect(() => {
    aliveRef.current = true;
    disappearedRef.current = false;
    // 3.6s provides a cinematic flight takeoff without making visitors wait too long
    const TAXI_MS = 3400;

    function tick(ts) {
      if (!aliveRef.current) return;
      if (!startRef.current) startRef.current = ts;
      const t = Math.min((ts - startRef.current) / TAXI_MS, 1);

      const eased =
        t <= 0.75
          ? (t / 0.75) * 82
          : 82 + (1 - Math.pow(1 - (t - 0.75) / 0.25, 2)) * 18;
      const p = Math.min(eased, 100);
      setProgress(p);

      if (p >= WALL_PCT && !disappearedRef.current) {
        disappearedRef.current = true;
        setPhase("takeoff");
      }

      if (p < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Plane took off! Trigger smooth completion
        setTimeout(() => {
          if (!aliveRef.current) return;
          setPhase("resetting");
          if (onComplete) {
            onComplete();
          }
        }, 550);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      aliveRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onComplete]);

  const planePct = Math.min(progress, WALL_PCT);

  const trackBg = isDark
    ? "linear-gradient(to bottom, #172548, #0b142c)"
    : "linear-gradient(to bottom, #bab7b2, #a09d98)";
  const trackShadow = isDark
    ? "inset 0 4px 12px rgba(0,0,0,0.85), inset 0 -1px 3px rgba(37,99,235,0.15), 0 4px 16px rgba(0,0,0,0.5)"
    : "inset 0 3px 8px rgba(0,0,0,0.22), inset 0 -1px 3px rgba(255,255,255,0.28), 0 2px 5px rgba(0,0,0,0.12)";
  const dashColor = isDark
    ? "rgba(245, 158, 11, 0.45)"
    : "rgba(255,255,255,0.42)";

  return (
    <motion.div
      ref={containerRef}
      className="runway-loader-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.65, ease: "easeInOut" } }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at center, #0c1836 0%, #050a18 100%)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Background Radar Rings */}
      <div className="sky-background-grid" aria-hidden="true" style={{ opacity: 0.6 }}>
        <div className="sky-radar-ring ring-1"></div>
        <div className="sky-radar-ring ring-2"></div>
      </div>

      {/* Brand Header */}
      <div style={{ textAlign: "center", marginBottom: "2rem", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.85rem", marginBottom: "0.6rem" }}>
          <Image
            src="/assets/company_logo.jpg"
            alt="Beyond Sky"
            width={48}
            height={48}
            style={{ borderRadius: "12px" }}
          />
          <span style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "0.06em", color: "#fff" }}>
            BEYOND <span className="highlight-yellow">SKY</span>
          </span>
        </div>
      </div>

      {/* Runway Timeline Container */}
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          padding: "0 1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          zIndex: 10,
        }}
      >
        {/* Track */}
        <div
          className="runway-track-bar"
          style={{
            position: "relative",
            height: "54px",
            width: "100%",
            borderRadius: "9999px",
            background: trackBg,
            boxShadow: trackShadow,
            border: "1px solid rgba(59, 130, 246, 0.25)",
            overflow: "visible",
          }}
        >
          {/* Runway Center Dashed Stripes */}
          <div
            style={{
              pointerEvents: "none",
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              left: 20,
              right: 20,
              height: 2,
              backgroundImage: `repeating-linear-gradient(to right, ${dashColor} 0, ${dashColor} 12px, transparent 12px, transparent 24px)`,
            }}
          />

          {/* Primary Aviation Brand Progress Fill (Replacing original red with Beyond Sky Royal Cobalt/Blue) */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              borderRadius: "9999px",
              width: `${progress}%`,
              background: "linear-gradient(to right, #1d4ed8 0%, #2563eb 55%, #38bdf8 100%)",
              boxShadow: "inset 0 1px 3px rgba(255,255,255,0.35), 0 0 18px rgba(37, 99, 235, 0.6)",
              transition: "width 0.05s linear",
            }}
          />

          {/* Jet Engine Afterburner Heat Shimmer */}
          {phase === "taxiing" && progress > 20 && (
            <motion.div
              style={{
                pointerEvents: "none",
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                borderRadius: "9999px",
                right: `calc(${100 - planePct}% + 26px)`,
                width: Math.min(((progress - 20) / 80) * 56, 56),
                height: 22,
                background:
                  "radial-gradient(ellipse at right, rgba(245, 158, 11, 0.6), rgba(37, 99, 235, 0.2) 60%, transparent)",
                filter: "blur(6px)",
              }}
              animate={{ opacity: [0.4, 0.9, 0.3, 0.8, 0.4] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            />
          )}

          {/* Moving Airplane */}
          <AnimatePresence>
            {phase !== "resetting" && (
              <div
                key={`plane-${cycle}`}
                style={{
                  pointerEvents: "none",
                  position: "absolute",
                  top: "50%",
                  left: `${planePct}%`,
                  transform: "translateX(-50%) translateY(-50%)",
                  zIndex: 25,
                }}
              >
                {phase === "taxiing" ? (
                  <Airplane isDark={isDark} />
                ) : (
                  <motion.div
                    initial={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                    animate={{ opacity: 0, x: 130, scale: 1.85, rotate: -8 }}
                    transition={{ duration: 0.65, ease: "easeIn" }}
                  >
                    <Airplane isDark={isDark} />
                  </motion.div>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Status Indicators & Progress Readout */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
            <span
              style={{
                fontSize: "2rem",
                fontWeight: 800,
                fontFamily: "var(--font-tech)",
                color: "#fff",
                lineHeight: 1,
              }}
            >
              {Math.round(progress)}
            </span>
            <span
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                fontFamily: "var(--font-tech)",
                color: "var(--aviation-yellow)",
              }}
            >
              %
            </span>
          </div>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              fontFamily: "var(--font-tech)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: phase === "takeoff" ? "var(--aviation-yellow-light)" : "#94a3b8",
            }}
          >
            {phase === "takeoff"
              ? "Cleared for Takeoff! Entering Flight Deck..."
              : phase === "resetting"
              ? "Touchdown..."
              : "Spooling Engines • Preparing for Departure..."}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
