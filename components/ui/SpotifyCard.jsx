"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Spotify Card Component
 * Inspired by jatin-yadav05 on 21st.dev & tailored for Beyond Sky's official Spotify Podcast.
 * Features:
 * - Authentic Spotify Dark/Green (#1DB954) Glassmorphic Aesthetic
 * - Interactive Play/Pause with Web Audio Synthesizer (Cockpit Chime & Ambience)
 * - Animated Audio Waveform Visualizer
 * - Real-time Seeking Progress Bar & Elapsed/Remaining Timestamps
 * - Clickable Episode Chapters
 * - Toggle for Official Spotify Embedded Player
 * - Direct "Listen on Spotify" Redirection
 */
export default function SpotifyCard({
  podcast = {
    title: "Stories From the Skies: Deep Cockpit Chronicles",
    show: "Beyond Sky Official Podcast",
    image: "/assets/podcast_cover.jpg",
    spotifyUrl: "https://open.spotify.com/show/3QZ7LND8nODC4ZtrIWoH3s",
    durationSec: 2535, // 42:15
    durationText: "42:15",
    tag: "EPISODE 01 • IMMERSIVE AUDIO",
    description:
      "Beyond Sky's flagship audio experience. Join us inside the cockpit during unexpected weather diversions, emergency go-arounds, and conversations with captains who survived extreme flight situations.",
    chapters: [
      { time: "0:00", sec: 0, title: "Cockpit Ambient Audio & ATC Briefing" },
      { time: "6:30", sec: 390, title: "Captain Testimonial: North Atlantic Jetstream Crossing" },
      { time: "18:40", sec: 1120, title: "The Psychology of Automation Dependency" },
      { time: "29:10", sec: 1750, title: "Unexplained Radar Blips & High-Altitude Phenomena" },
      { time: "39:50", sec: 2390, title: "Touchdown & Flight Debrief" },
    ],
  },
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(135); // 02:15 initial
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(12480);
  const [volume, setVolume] = useState(85);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [showEmbedPlayer, setShowEmbedPlayer] = useState(false);

  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);

  // Playback timer ticker
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= podcast.durationSec) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, podcast.durationSec]);

  // Update active chapter based on current time
  useEffect(() => {
    if (!podcast.chapters) return;
    for (let i = podcast.chapters.length - 1; i >= 0; i--) {
      if (currentTime >= podcast.chapters[i].sec) {
        setActiveChapterIndex(i);
        break;
      }
    }
  }, [currentTime, podcast.chapters]);

  // Web Audio Synthesizer: Play cockpit chime & hum on user interaction
  const triggerAudioSynthesis = (start = true) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      if (start) {
        const now = ctx.currentTime;
        // Dual-tone cabin seatbelt chime (E5 -> C5)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(659.25, now);
        osc.frequency.setValueAtTime(523.25, now + 0.28);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.1);
      }
    } catch {
      // Audio fallback
    }
  };

  const handleTogglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (nextState) {
      triggerAudioSynthesis(true);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseInt(e.target.value, 10);
    setCurrentTime(newTime);
  };

  const handleSkip = (seconds) => {
    setCurrentTime((prev) =>
      Math.max(0, Math.min(podcast.durationSec, prev + seconds))
    );
  };

  const handleChapterClick = (index) => {
    setActiveChapterIndex(index);
    if (podcast.chapters && podcast.chapters[index]) {
      setCurrentTime(podcast.chapters[index].sec);
      setIsPlaying(true);
      triggerAudioSynthesis(true);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="spotify-card-container">
      {/* Background Glow */}
      <div className="spotify-ambient-glow" aria-hidden="true" />

      <div className="spotify-card-shell">
        {/* Top Header: Spotify Brand & Telemetry */}
        <div className="spotify-card-top-bar">
          <div className="spotify-brand-pill">
            <svg
              className="spotify-icon-svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.485 17.304a.75.75 0 0 1-1.03.248c-2.822-1.724-6.375-2.114-10.56-1.157a.75.75 0 0 1-.337-1.462c4.582-1.047 8.523-.6 11.68 1.341a.75.75 0 0 1 .247 1.03zm1.465-3.26a.937.937 0 0 1-1.29.31c-3.23-1.986-8.156-2.56-11.977-1.4a.938.938 0 1 1-.55-1.794c4.372-1.327 9.805-.684 13.507 1.594a.938.938 0 0 1 .31 1.29zm.126-3.413c-3.873-2.3-10.264-2.513-13.98-1.384a1.125 1.125 0 0 1-.65-2.155c4.27-1.297 11.326-1.048 15.787 1.6a1.125 1.125 0 0 1-1.157 1.939z" />
            </svg>
            <span>SPOTIFY PODCAST</span>
          </div>

          <div className="spotify-stream-status">
            <span
              className={`status-dot ${isPlaying ? "playing-dot" : ""}`}
            />
            <span className="status-label">
              {isPlaying ? "LIVE AUDIO STREAM" : "PREVIEW READY"}
            </span>
          </div>
        </div>

        {/* Main Player Grid */}
        <div className="spotify-main-grid">
          {/* Left Column: Artwork + Equalizer */}
          <div className="spotify-artwork-col">
            <div className={`spotify-cover-wrapper ${isPlaying ? "is-spinning" : ""}`}>
              <Image
                src={podcast.image}
                alt={podcast.title}
                width={280}
                height={280}
                priority
                className="spotify-cover-img"
              />
              <div className="spotify-cover-overlay" />
            </div>

            {/* Audio Waveform Equalizer */}
            <div className="spotify-visualizer-wrap">
              {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65, 90, 45, 85, 60].map((h, i) => (
                <span
                  key={i}
                  className={`visualizer-bar ${isPlaying ? "animating" : ""}`}
                  style={{
                    "--target-height": `${h}%`,
                    animationDelay: `${(i * 0.08).toFixed(2)}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Track Details, Timeline & Controls */}
          <div className="spotify-details-col">
            <span className="spotify-tag-badge">{podcast.tag}</span>
            <h3 className="spotify-track-title">{podcast.title}</h3>
            <p className="spotify-show-name">{podcast.show}</p>
            <p className="spotify-track-desc">{podcast.description}</p>

            {/* Progress Scrubber */}
            <div className="spotify-progress-section">
              <input
                type="range"
                min="0"
                max={podcast.durationSec}
                value={currentTime}
                onChange={handleSeek}
                className="spotify-slider"
                aria-label="Podcast track scrubber"
              />
              <div className="spotify-time-row">
                <span className="time-elapsed">{formatTime(currentTime)}</span>
                <span className="time-remaining">
                  -{formatTime(Math.max(0, podcast.durationSec - currentTime))}
                </span>
              </div>
            </div>

            {/* Playback Controls Row */}
            <div className="spotify-controls-bar">
              {/* Like / Heart */}
              <button
                type="button"
                className={`spotify-btn-icon ${isLiked ? "liked" : ""}`}
                onClick={() => {
                  setIsLiked(!isLiked);
                  setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
                }}
                aria-label="Save to Spotify library"
                title="Save episode"
              >
                <svg viewBox="0 0 24 24" fill={isLiked ? "#1DB954" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>

              {/* -15 Seconds */}
              <button
                type="button"
                className="spotify-btn-icon"
                onClick={() => handleSkip(-15)}
                aria-label="Rewind 15 seconds"
                title="Skip back 15s"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 4v6h6" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
                <span className="skip-number">15</span>
              </button>

              {/* Master Play / Pause */}
              <button
                type="button"
                className="spotify-play-btn"
                onClick={handleTogglePlay}
                aria-label={isPlaying ? "Pause podcast" : "Play preview"}
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: "2px" }}>
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>

              {/* +15 Seconds */}
              <button
                type="button"
                className="spotify-btn-icon"
                onClick={() => handleSkip(15)}
                aria-label="Fast forward 15 seconds"
                title="Skip forward 15s"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 4v6h-6" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                <span className="skip-number">15</span>
              </button>

              {/* Direct Open in Spotify Link */}
              <a
                href={podcast.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-spotify-pill"
                title="Open episode in Spotify"
              >
                <span>Listen on Spotify</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Chapters Section */}
        {podcast.chapters && podcast.chapters.length > 0 && (
          <div className="spotify-chapters-box">
            <div className="chapters-header">
              <span className="chapters-title">FLIGHT CHAPTERS &amp; RADAR LOGS</span>
              <span className="chapters-counter">
                {activeChapterIndex + 1} of {podcast.chapters.length}
              </span>
            </div>

            <div className="chapters-grid">
              {podcast.chapters.map((ch, idx) => {
                const isActive = activeChapterIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    className={`chapter-chip ${isActive ? "active-chip" : ""}`}
                    onClick={() => handleChapterClick(idx)}
                  >
                    <span className="chip-time">{ch.time}</span>
                    <span className="chip-label">{ch.title}</span>
                    {isActive && isPlaying && (
                      <span className="chip-live-badge">PLAYING</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Optional Embed Player Toggle */}
        <div className="spotify-footer-actions">
          <button
            type="button"
            className="toggle-embed-btn"
            onClick={() => setShowEmbedPlayer(!showEmbedPlayer)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span>{showEmbedPlayer ? "Hide Embedded Player" : "Switch to Official Spotify Web Player"}</span>
          </button>
        </div>

        {/* Official Spotify Iframe Player (Expandable) */}
        {showEmbedPlayer && (
          <div className="spotify-iframe-embed-wrapper">
            <iframe
              src="https://open.spotify.com/embed/show/3QZ7LND8nODC4ZtrIWoH3s?utm_source=generator&theme=0"
              width="100%"
              height="232"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Beyond Sky Spotify Podcast Embed"
              style={{ borderRadius: "12px", border: "none" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
