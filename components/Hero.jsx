"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioStatus, setAudioStatus] = useState("Preview Audio");
  const [hasAnimatedStats, setHasAnimatedStats] = useState(false);
  const [subsCount, setSubsCount] = useState("0");
  const [viewsCount, setViewsCount] = useState("0");
  const [docsCount, setDocsCount] = useState("0");
  const statsRef = useRef(null);

  // Stats counter animation
  useEffect(() => {
    const handleAnimation = () => {
      let step = 0;
      const totalSteps = 60;
      const interval = setInterval(() => {
        step++;
        const progress = Math.min(step / totalSteps, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setSubsCount((39.3 * easeOut).toFixed(1) + "K");
        setViewsCount((15.1 * easeOut).toFixed(1) + "M");
        setDocsCount(Math.floor(33 * easeOut).toString());

        if (step >= totalSteps) {
          clearInterval(interval);
          setSubsCount("39.3K");
          setViewsCount("15.1M");
          setDocsCount("33");
        }
      }, 30);
    };

    if ("IntersectionObserver" in window && statsRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasAnimatedStats) {
            setHasAnimatedStats(true);
            handleAnimation();
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(statsRef.current);
      return () => observer.disconnect();
    } else {
      handleAnimation();
    }
  }, [hasAnimatedStats]);

  // Web Audio synthesizer for flight chime & ATC sound
  const toggleAudioPreview = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      setAudioStatus("Preview Paused");
      return;
    }

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Authentic dual-tone cabin seatbelt chime (E5 -> C5)
        osc.type = "sine";
        osc.frequency.setValueAtTime(659.25, now);
        osc.frequency.setValueAtTime(523.25, now + 0.35);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.2);
      }
    } catch {
      // Audio fallback
    }

    setIsPlayingAudio(true);
    setAudioStatus("Audio Streaming...");

    setTimeout(() => {
      setIsPlayingAudio(false);
      setAudioStatus("Preview Ended");
    }, 9000);
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-backdrop-container">
        <Image
          src="/assets/cover_photo.jpg"
          alt="Beyond Sky Banner"
          fill
          priority
          className="hero-banner-image"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
        <div className="hero-overlay-gradient"></div>
        <div className="runway-perspective-lines" aria-hidden="true">
          <div className="runway-center-line"></div>
        </div>
      </div>

      <div className="container hero-content">
        {/* Floating Telemetry Pill */}
        <div className="hero-flight-badge">
          <span className="pulse-indicator"></span>
          <span className="flight-callsign">FLIGHT BSK-321</span>
          <span className="badge-separator">•</span>
          <span className="flight-status">CRUISING AT FL380</span>
          <span className="badge-separator">•</span>
          <span className="flight-origin">US ➔ GLOBAL SKIES</span>
        </div>

        <div className="hero-grid">
          <div className="hero-text-col">
            <h1 className="hero-title">
              Stories From <span className="highlight-circle">the Skies</span>
            </h1>
            <p className="hero-subtitle">
              Where curious aviation history, high-stakes aerospace rivalries, and the future of flight take center stage.
            </p>
            <p className="hero-description">
              At <strong>Beyond Sky</strong>, we craft high-production documentaries and audio narratives that unravel the engineering triumphs, unsolved aviation mysteries, and commercial dogfights shaping global flight.
            </p>

            {/* Hero Action Buttons */}
            <div className="hero-buttons">
              <a
                href="https://www.youtube.com/@BeyondSky-m5e"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-youtube btn-glow"
                id="hero-yt-btn"
              >
                <svg className="icon-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>Watch on YouTube</span>
              </a>

              <a
                href="https://open.spotify.com/show/3QZ7LND8nODC4ZtrIWoH3s"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-spotify btn-glow"
                id="hero-spotify-btn"
              >
                <svg className="icon-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.485 17.304a.75.75 0 0 1-1.03.248c-2.822-1.724-6.375-2.114-10.56-1.157a.75.75 0 0 1-.337-1.462c4.582-1.047 8.523-.6 11.68 1.341a.75.75 0 0 1 .247 1.03zm1.465-3.26a.937.937 0 0 1-1.29.31c-3.23-1.986-8.156-2.56-11.977-1.4a.938.938 0 1 1-.55-1.794c4.372-1.327 9.805-.684 13.507 1.594a.938.938 0 0 1 .31 1.29zm.126-3.413c-3.873-2.3-10.264-2.513-13.98-1.384a1.125 1.125 0 0 1-.65-2.155c4.27-1.297 11.326-1.048 15.787 1.6a1.125 1.125 0 0 1-1.157 1.939z"/>
                </svg>
                <span>Listen on Spotify</span>
              </a>

              <a href="#collaborate" className="btn btn-outline" id="hero-collab-btn">
                <span>Partner With Us</span>
                <span className="arrow-icon">→</span>
              </a>
            </div>

            {/* Authentic Channel Verification Badges */}
            <div className="hero-channel-meta">
              <span className="meta-item">
                <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Official Brand Media
              </span>
              <span className="meta-item">
                <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
                Active Since Sep 2018
              </span>
              <span className="meta-item">
                <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                United States
              </span>
            </div>
          </div>

          {/* Hero Visual / Cockpit Radar Card */}
          <div className="hero-visual-col">
            <div className="aircraft-card-cockpit glass-panel">
              <div className="cockpit-top-bar">
                <span className="instrument-dot red"></span>
                <span className="instrument-dot yellow"></span>
                <span className="instrument-dot green"></span>
                <span className="cockpit-title">TRANSPONDER: 7700 • RADAR LOCK</span>
                <span className="live-tag">LIVE</span>
              </div>

              {/* Animated Radar Screen */}
              <div className="cockpit-radar-screen">
                <div className="radar-sweep"></div>
                <div className="target-blip blip-1" title="A350-900 Enroute">
                  <span className="blip-label">AIRBUS A350</span>
                </div>
                <div className="target-blip blip-2" title="B777X Test Flight">
                  <span className="blip-label">BOEING 777X</span>
                </div>
                <div className="target-blip blip-3" title="Beyond Sky HQ">
                  <span className="blip-label">BEYOND SKY HQ</span>
                </div>

                <div className="cockpit-center-artwork">
                  <div style={{ position: "relative", width: 72, height: 72, margin: "0 auto 0.5rem" }}>
                    <Image
                      src="/assets/company_logo.jpg"
                      alt="Beyond Sky Emblem"
                      width={72}
                      height={72}
                      className="cockpit-logo-glow"
                    />
                  </div>
                  <div className="cockpit-caption">
                    <p className="tagline-handwriting">&ldquo;Join us on this journey through the skies&rdquo;</p>
                  </div>
                </div>

                {/* Live Flight Readouts */}
                <div className="flight-readouts-grid">
                  <div className="readout-box">
                    <span className="readout-label">HEADING</span>
                    <span className="readout-val">345° NW</span>
                  </div>
                  <div className="readout-box">
                    <span className="readout-label">AIRSPEED</span>
                    <span className="readout-val">540 KTS</span>
                  </div>
                  <div className="readout-box">
                    <span className="readout-label">ALTITUDE</span>
                    <span className="readout-val">38,000 FT</span>
                  </div>
                  <div className="readout-box highlight-gold">
                    <span className="readout-label">AUDIENCE</span>
                    <span className="readout-val">GLOBAL</span>
                  </div>
                </div>
              </div>

              {/* Quick Audio Teaser Pill */}
              <div className={`cockpit-audio-strip ${isPlayingAudio ? "playing" : ""}`} id="cockpit-audio-preview">
                <button
                  className="audio-mini-btn"
                  id="audio-play-toggle"
                  aria-label="Play sample podcast audio preview"
                  onClick={toggleAudioPreview}
                >
                  {!isPlayingAudio ? (
                    <svg className="play-icon" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  ) : (
                    <svg className="pause-icon" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16"/>
                      <rect x="14" y="4" width="4" height="16"/>
                    </svg>
                  )}
                </button>
                <div className="audio-info">
                  <span className="audio-title">Stories From the Skies • Episode Preview</span>
                  <div className="audio-visualizer-bars">
                    <span className="vbar"></span><span className="vbar"></span><span className="vbar"></span>
                    <span className="vbar"></span><span className="vbar"></span><span className="vbar"></span>
                    <span className="vbar"></span><span className="vbar"></span><span className="vbar"></span>
                  </div>
                </div>
                <span className="audio-status-text" id="audio-preview-status">{audioStatus}</span>
              </div>
            </div>
          </div>
        </div>

        {/* STATS COUNTER STRIP */}
        <div className="hero-stats-strip glass-card" id="stats-counter-strip" ref={statsRef}>
          <div className="stat-card">
            <div className="stat-number-wrap">
              <span className="stat-counter">{subsCount}</span><span className="stat-suffix">+</span>
            </div>
            <span className="stat-label">Subscribers</span>
            <span className="stat-sub">Dedicated Aviation Enthusiasts</span>
          </div>

          <div className="stat-divider"></div>

          <div className="stat-card">
            <div className="stat-number-wrap">
              <span className="stat-counter">{viewsCount}</span><span className="stat-suffix">+</span>
            </div>
            <span className="stat-label">Total Views</span>
            <span className="stat-sub">Across High-Retention Videos</span>
          </div>

          <div className="stat-divider"></div>

          <div className="stat-card">
            <div className="stat-number-wrap">
              <span className="stat-counter">{docsCount}</span><span className="stat-suffix">+</span>
            </div>
            <span className="stat-label">Deep-Dive Documentaries</span>
            <span className="stat-sub">Researched & Beautifully Produced</span>
          </div>

          <div className="stat-divider"></div>

          <div className="stat-card highlight">
            <div className="stat-number-wrap">
              <span className="stat-static">100</span><span className="stat-suffix">%</span>
            </div>
            <span className="stat-label">Aviation Focus</span>
            <span className="stat-sub">History, Engineering & Future</span>
          </div>
        </div>
      </div>
    </section>
  );
}
