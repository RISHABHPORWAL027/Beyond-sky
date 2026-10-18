"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  AIRLOCK — a scroll-locked, scrub-driven video hero                        */
/*                                                                            */
/*  While the hero owns the screen the page cannot move: the body is pinned   */
/*  with position:fixed. Wheel, touch and key input is captured and spent on  */
/*  video.currentTime instead, forward and backward. When the video reaches   */
/*  its end and the reader keeps pushing forward the page is handed back and  */
/*  scrolls normally; scrolling back up to the top takes the lock again at    */
/*  full progress.                                                            */
/* -------------------------------------------------------------------------- */

const PALETTES = {
  aviation: {
    backdrop: "#050a18",
    text: "#ffffff",
    muted: "rgba(240,244,248,0.78)",
    bar: "linear-gradient(90deg, rgba(37,99,235,0.6), rgba(56,189,248,0.95))",
  },
  vacuum: {
    backdrop: "#05070d",
    text: "#f2f4f8",
    muted: "rgba(240,244,248,0.72)",
    bar: "linear-gradient(90deg, rgba(255,255,255,0.45), rgba(255,255,255,0.95))",
  },
  ember: {
    backdrop: "#0d0705",
    text: "#fdf1e7",
    muted: "rgba(253,241,231,0.72)",
    bar: "linear-gradient(90deg, rgba(255,176,102,0.45), rgba(255,214,168,0.95))",
  },
  ice: {
    backdrop: "#04090f",
    text: "#eaf4ff",
    muted: "rgba(234,244,255,0.72)",
    bar: "linear-gradient(90deg, rgba(120,190,255,0.45), rgba(214,236,255,0.95))",
  },
};

const CDN = "https://cdn.jsdelivr.net/gh/yuraoak/airlock-hero-assets@main";
const DEFAULT_VIDEO = `${CDN}/iss-hero-1080p.mp4`;
const DEFAULT_POSTER = `${CDN}/iss-hero-poster.jpg`;
const SANS = "var(--font-main), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/** Keyboard fallback, so a reader without a wheel is never stuck. */
const KEY_STEPS = {
  ArrowDown: 140,
  ArrowUp: -140,
  PageDown: 700,
  PageUp: -700,
  " ": 700,
  End: Number.MAX_SAFE_INTEGER,
  Home: Number.MIN_SAFE_INTEGER,
};

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

export default function AirlockHero({
  id = "hero",
  videoSrc = DEFAULT_VIDEO,
  posterSrc = DEFAULT_POSTER,
  title = "Beyond Sky",
  scrollHint = "SCROLL TO EXPLORE",
  tagline = "Stories From the Skies",
  signature = false,
  scrubDistance = 3200,
  holdDistance = 1100,
  theme = "aviation",
  skipLabel = "Skip intro ↓",
  className,
  style,
}) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const hintRef = useRef(null);
  const taglineRef = useRef(null);
  const barRef = useRef(null);
  const scrimRef = useRef(null);
  const releaseRef = useRef(() => {});
  const [ready, setReady] = useState(false);

  const palette = PALETTES[theme] || PALETTES.aviation;

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);

    let duration = 0;
    let rafId = 0;
    let target = 0;
    let shown = 0;
    let moved = false;
    let seeking = false;
    let queued = null;
    let locked = false;
    let lockedY = 0;
    let touchY = 0;
    let released = false;
    let lastY = 0;

    const totalDistance = scrubDistance + holdDistance;
    const scrubShare = scrubDistance / totalDistance;

    /* --- Seeking --- */
    function seekTo(t) {
      if (seeking) {
        queued = t;
        return;
      }
      seeking = true;
      video.currentTime = t;
    }

    const onSeeked = () => {
      seeking = false;
      if (queued !== null) {
        const t = queued;
        queued = null;
        seeking = true;
        video.currentTime = t;
      }
    };

    /* --- Painting --- */
    function paint(p) {
      const videoP = clamp(p / scrubShare, 0, 1);

      if (duration > 0) seekTo(Math.min(videoP * duration, duration - 0.04));

      const titleAlpha = 1 - clamp(videoP / 0.35, 0, 1);
      const taglineAlpha = clamp((videoP - 0.82) / 0.18, 0, 1);

      if (videoRef.current) {
        videoRef.current.style.transform = `scale(${1 + videoP * 0.06})`;
      }
      if (scrimRef.current) {
        scrimRef.current.style.opacity = String(Math.max(titleAlpha, taglineAlpha));
      }
      if (titleRef.current) {
        const t = titleAlpha;
        titleRef.current.style.opacity = String(t);
        titleRef.current.style.transform = `translateY(${(1 - t) * -24}px) scale(${0.96 + t * 0.04})`;
        titleRef.current.style.filter = `blur(${(1 - t) * 10}px)`;
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = moved ? "0" : "1";
      }
      if (taglineRef.current) {
        const t = taglineAlpha;
        taglineRef.current.style.opacity = String(t);
        taglineRef.current.style.transform = `translateY(${(1 - t) * 20}px) scale(${0.97 + t * 0.03})`;
        taglineRef.current.style.filter = `blur(${(1 - t) * 8}px)`;
      }
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p})`;
      }
    }

    /* --- The Lock --- */
    function engageLock() {
      if (locked) return;
      locked = true;
      released = false;
      lockedY = window.scrollY;
      const b = document.body.style;
      b.position = "fixed";
      b.top = `-${lockedY}px`;
      b.left = "0";
      b.right = "0";
      b.width = "100%";
    }

    function releaseLock() {
      if (!locked) return;
      locked = false;
      const y = lockedY;
      const b = document.body.style;
      b.position = "";
      b.top = "";
      b.left = "";
      b.right = "";
      b.width = "";
      window.scrollTo(0, y);
      released = true;
      lastY = y;
    }

    releaseRef.current = () => {
      target = shown = 1;
      moved = true;
      paint(1);
      releaseLock();
    };

    function consume(deltaY) {
      if (!locked) return false;
      if (target >= 1 && shown > 0.98 && deltaY > 0) {
        releaseLock();
        return false;
      }
      target = clamp(target + deltaY / totalDistance, 0, 1);
      if (target > 0.001) moved = true;
      return true;
    }

    /* --- Input --- */
    const onWheel = (e) => {
      if (consume(e.deltaY)) e.preventDefault();
    };

    const onTouchStart = (e) => {
      touchY = e.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (e) => {
      const y = e.touches[0]?.clientY ?? touchY;
      const deltaY = touchY - y;
      touchY = y;
      if (consume(deltaY)) e.preventDefault();
    };

    const onKeyDown = (e) => {
      const step = KEY_STEPS[e.key];
      if (step === undefined) return;
      if (consume(step)) e.preventDefault();
    };

    const onScroll = () => {
      if (locked || !released) return;
      const y = window.scrollY;
      const climbing = y < lastY;
      lastY = y;
      if (climbing && y <= section.offsetTop) {
        target = shown = 1;
        paint(1);
        engageLock();
      }
    };

    const onLoadedData = () => {
      duration = video.duration || 0;
      setReady(true);
      if (reduceMotion) {
        target = shown = 1;
        moved = true;
        paint(1);
      }
    };

    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("seeked", onSeeked);

    if (!reduceMotion) {
      if (window.scrollY <= section.offsetTop + 1) engageLock();

      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("scroll", onScroll, { passive: true });

      const frame = () => {
        shown += (target - shown) * 0.18;
        paint(shown);
        rafId = requestAnimationFrame(frame);
      };
      rafId = requestAnimationFrame(frame);
    }

    return () => {
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
      releaseLock();
    };
  }, [scrubDistance, holdDistance]);

  return (
    <div
      id={id}
      ref={sectionRef}
      className={cn("airlock-hero-section relative h-[100dvh] w-full overflow-hidden", className)}
      style={{
        position: "relative",
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        background: palette.backdrop,
        ...style,
      }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: ready ? 1 : 0,
          transformOrigin: "center center",
          willChange: "transform",
          transition: "opacity 0.6s ease",
        }}
      />

      {/* Top and bottom atmospheric falloff */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(5,10,24,0.65) 0%, rgba(5,10,24,0) 30%, rgba(5,10,24,0.2) 70%, rgba(5,10,24,0.85) 100%)",
        }}
      />

      {/* Centre scrim */}
      <div
        ref={scrimRef}
        className="pointer-events-none absolute inset-0"
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 65% 48% at 50% 50%, rgba(5,10,24,0.78), rgba(5,10,24,0) 75%)",
        }}
      />

      {/* Title Over Opening Frames: "Beyond Sky" */}
      <div
        ref={titleRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center px-[6%] text-center"
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 6%",
          textAlign: "center",
        }}
      >
        <h1
          className="inline-block font-extrabold leading-none tracking-[-0.02em]"
          style={{
            fontFamily: SANS,
            fontSize: "clamp(36px, 8.5vw, 108px)",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: palette.text,
            textShadow: "0 4px 35px rgba(0,0,0,0.7), 0 0 30px rgba(37,99,235,0.4)",
            willChange: "transform, filter, opacity",
          }}
        >
          {title}
        </h1>
        <p style={{ marginTop: "1rem", fontFamily: "var(--font-cursive)", fontSize: "clamp(1.2rem, 2.5vw, 2rem)", color: "var(--aviation-yellow-light)" }}>
          &ldquo;Join us on this journey through the skies&rdquo;
        </p>
      </div>

      {/* Tagline Reveal Over Last Section: "Stories From the Skies" */}
      {tagline ? (
        <div
          ref={taglineRef}
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-[8%] text-center opacity-0"
          style={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 8%",
            textAlign: "center",
            opacity: 0,
          }}
        >
          <div style={{ display: "inline-block", marginBottom: "0.85rem" }}>
            <span style={{ fontFamily: "var(--font-tech)", fontSize: "0.82rem", letterSpacing: "0.15em", color: "var(--aviation-yellow)", fontWeight: 700 }}>
              BEYOND SKY PRESENTS
            </span>
          </div>
          <p
            className="font-bold tracking-[-0.01em]"
            style={{
              fontFamily: SANS,
              fontSize: "clamp(26px, 5.2vw, 68px)",
              fontWeight: 800,
              lineHeight: 1.15,
              color: palette.text,
              textShadow: "0 4px 30px rgba(0,0,0,0.8), 0 0 40px rgba(245,158,11,0.35)",
            }}
          >
            {typeof tagline === "string" && tagline.includes("the Skies") ? (
              <>
                {tagline.replace("the Skies", "")}
                <span className="highlight-circle" style={{ marginLeft: "0.15em", padding: "0 0.1em" }}>
                  the Skies
                </span>
              </>
            ) : (
              tagline
            )}
          </p>
          <span style={{ marginTop: "1.2rem", fontSize: "0.95rem", color: "var(--text-secondary)", maxWidth: "560px" }}>
            Curious aviation history, aerospace duopolies, and aircraft engineering documentaries.
          </span>
        </div>
      ) : null}

      {/* Scroll Hint */}
      <div
        ref={hintRef}
        className="pointer-events-none absolute bottom-[clamp(20px,6vh,48px)] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-[400ms]"
        style={{
          pointerEvents: "none",
          position: "absolute",
          bottom: "clamp(20px, 6vh, 48px)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: palette.muted,
          fontFamily: SANS,
          fontSize: "clamp(10px, 1.4vw, 12px)",
          fontWeight: 700,
          letterSpacing: "0.3em",
          transition: "opacity 400ms ease",
        }}
      >
        <span>{scrollHint}</span>
        <svg
          width="14"
          height="18"
          viewBox="0 0 14 18"
          aria-hidden="true"
          style={{ animation: "airlock-bounce 1.6s ease-in-out infinite" }}
        >
          <style>{`
            @keyframes airlock-bounce {
              0%, 100% { transform: translateY(0); opacity: 0.5; }
              50% { transform: translateY(5px); opacity: 1; }
            }
            @media (prefers-reduced-motion: reduce) {
              [style*="airlock-bounce"] { animation: none !important; }
            }
          `}</style>
          <path
            d="M7 1 L7 17 M2 12 L7 17 L12 12"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Skip Intro button */}
      <button
        type="button"
        onClick={() => releaseRef.current()}
        className="absolute left-1/2 top-20 z-20 -translate-x-1/2 rounded-full px-4 py-2 text-xs font-semibold opacity-70 hover:opacity-100 transition-opacity"
        style={{
          position: "absolute",
          left: "50%",
          top: "5rem",
          transform: "translateX(-50%)",
          zIndex: 20,
          borderRadius: "50px",
          padding: "0.5rem 1.15rem",
          fontSize: "0.75rem",
          fontWeight: 700,
          fontFamily: SANS,
          color: palette.text,
          background: "rgba(5, 10, 24, 0.75)",
          border: "1px solid rgba(59, 130, 246, 0.3)",
          letterSpacing: "0.08em",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
        }}
      >
        {skipLabel}
      </button>

      {/* Scrub Progress Line */}
      <div
        className="absolute inset-x-0 bottom-0 h-1"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "3px",
          background: "rgba(255,255,255,0.12)",
        }}
      >
        <div
          ref={barRef}
          className="h-full w-full origin-left"
          style={{
            height: "100%",
            width: "100%",
            transformOrigin: "left",
            background: palette.bar,
            transform: "scaleX(0)",
            boxShadow: "0 0 10px rgba(56, 189, 248, 0.6)",
          }}
        />
      </div>

      {signature ? (
        <span
          className="absolute bottom-[clamp(10px,2vw,18px)] right-[clamp(12px,2.5vw,24px)] z-[2] font-medium"
          style={{
            position: "absolute",
            bottom: "clamp(10px, 2vw, 18px)",
            right: "clamp(12px, 2.5vw, 24px)",
            zIndex: 2,
            fontFamily: SANS,
            fontSize: "clamp(11px, 1.4vw, 13px)",
            color: palette.muted,
          }}
        >
          by{" "}
          <a
            href={signature.url}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline transition-colors hover:opacity-100"
            style={{ color: "inherit" }}
          >
            {signature.name}
          </a>
        </span>
      ) : null}
    </div>
  );
}
