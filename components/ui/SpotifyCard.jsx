"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Spotify Card Component
 * Exactly styled after 21st.dev (jatin-yadav05/spotify-card) with dark forest green
 * glassmorphic shell, top Spotify branding, centered album artwork, and bottom dock player.
 */
export default function SpotifyCard({
  episode,
  isPlaying = false,
  onTogglePlay,
  onNext,
  onPrev,
  className = "",
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(85);
  const [isMuted, setIsMuted] = useState(false);
  const [localPlaying, setLocalPlaying] = useState(false);

  const audioRef = useRef(null);
  const timerRef = useRef(null);

  // Sync external playing state
  const activePlaying = onTogglePlay ? isPlaying : localPlaying;

  useEffect(() => {
    if (audioRef.current) {
      if (activePlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [activePlaying]);

  // Volume sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // Fallback timer if no preview audio
  useEffect(() => {
    if (activePlaying && !episode?.previewAudio) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => (prev >= 207 ? 0 : prev + 1));
      }, 1000);
    } else if (!activePlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activePlaying, episode?.previewAudio]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(Math.floor(audioRef.current.currentTime));
    }
  };

  const handleEnded = () => {
    if (onTogglePlay) {
      onTogglePlay(false);
    } else {
      setLocalPlaying(false);
    }
    setCurrentTime(0);
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (onTogglePlay) {
      onTogglePlay(!isPlaying);
    } else {
      setLocalPlaying(!localPlaying);
    }
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const formatSeconds = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Preview total or real duration
  const totalDuration = audioRef.current?.duration
    ? Math.floor(audioRef.current.duration)
    : 30; // Spotify preview is 30s
  const displayTotal = episode?.durationText || "3:27";

  return (
    <div className={`spotify-card-exact ${activePlaying ? "is-active-playing" : ""} ${className}`}>
      {/* Hidden Audio Element for Official Preview */}
      {episode?.previewAudio && (
        <audio
          ref={audioRef}
          src={episode.previewAudio}
          preload="none"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />
      )}

      {/* Top Header */}
      <div className="spotify-exact-header">
        <div className="spotify-exact-brand">
          <div className="spotify-exact-logo-box">
            <svg viewBox="0 0 24 24" className="spotify-exact-svg" fill="#1DB954">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.485 17.304a.75.75 0 0 1-1.03.248c-2.822-1.724-6.375-2.114-10.56-1.157a.75.75 0 0 1-.337-1.462c4.582-1.047 8.523-.6 11.68 1.341a.75.75 0 0 1 .247 1.03zm1.465-3.26a.937.937 0 0 1-1.29.31c-3.23-1.986-8.156-2.56-11.977-1.4a.938.938 0 1 1-.55-1.794c4.372-1.327 9.805-.684 13.507 1.594a.938.938 0 0 1 .31 1.29zm.126-3.413c-3.873-2.3-10.264-2.513-13.98-1.384a1.125 1.125 0 0 1-.65-2.155c4.27-1.297 11.326-1.048 15.787 1.6a1.125 1.125 0 0 1-1.157 1.939z" />
            </svg>
          </div>
          <span className="spotify-exact-title">Spotify</span>
        </div>

        <a
          href={episode?.spotifyUrl || "https://open.spotify.com/show/3QZ7LND8nODC4ZtrIWoH3s"}
          target="_blank"
          rel="noopener noreferrer"
          className="spotify-exact-arrow-btn"
          aria-label="Open on Spotify"
          title="Open episode on Spotify"
          onClick={(e) => e.stopPropagation()}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
      </div>

      {/* Subtitle / Description */}
      <p className="spotify-exact-desc">
        Search for music and podcasts, browse your library, and control playback.
      </p>

      {/* Divider */}
      <div className="spotify-exact-divider" />

      {/* Middle Artwork */}
      <div className="spotify-exact-artwork-wrap">
        <Image
          src={episode?.image || "/assets/spotify_official_cover.jpg"}
          alt={episode?.title || "Beyond Sky Spotify Podcast"}
          width={240}
          height={240}
          className="spotify-exact-art"
          priority={false}
        />
        {activePlaying && <div className="spotify-artwork-pulse" />}
      </div>

      {/* Bottom Player Dock */}
      <div className="spotify-exact-dock">
        {/* Scrubber bar */}
        <div className="spotify-exact-scrubber-track">
          <input
            type="range"
            min="0"
            max={totalDuration}
            value={currentTime}
            onChange={handleSeek}
            className="spotify-exact-range"
            aria-label="Seek track"
          />
          <div
            className="spotify-exact-progress-fill"
            style={{ width: `${(currentTime / (totalDuration || 1)) * 100}%` }}
          />
        </div>

        {/* Track Title, Artist & Time Row */}
        <div className="spotify-exact-meta-row">
          <div className="spotify-exact-meta-left">
            <h4 className="spotify-exact-track-name" title={episode?.title}>
              {episode?.title || "Beyond Sky Aviation"}
            </h4>
            <p className="spotify-exact-artist-name">
              {episode?.show || "Beyond Sky"} • Stories From the Skies
            </p>
          </div>
          <div className="spotify-exact-meta-right">
            <span className="spotify-exact-time">
              {formatSeconds(currentTime)} / {displayTotal}
            </span>
          </div>
        </div>

        {/* Playback Controls Row */}
        <div className="spotify-exact-controls-row">
          {/* Left Controls: Prev, Play, Next */}
          <div className="spotify-exact-playback-btns">
            <button
              type="button"
              className="spotify-exact-btn-subtle"
              onClick={(e) => {
                e.stopPropagation();
                if (onPrev) onPrev();
              }}
              aria-label="Previous track"
              title="Previous episode"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>

            <button
              type="button"
              className="spotify-exact-play-btn"
              onClick={handlePlayClick}
              aria-label={activePlaying ? "Pause preview" : "Play preview"}
              title={activePlaying ? "Pause preview" : "Play 30s official Spotify preview"}
            >
              {activePlaying ? (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ marginLeft: "2px" }}>
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>

            <button
              type="button"
              className="spotify-exact-btn-subtle"
              onClick={(e) => {
                e.stopPropagation();
                if (onNext) onNext();
              }}
              aria-label="Next track"
              title="Next episode"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>

          {/* Right Controls: Volume */}
          <div className="spotify-exact-volume-box">
            <button
              type="button"
              className="spotify-exact-volume-icon"
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>

            <div className="spotify-exact-volume-bar-wrap">
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  e.stopPropagation();
                  setVolume(parseInt(e.target.value, 10));
                  if (isMuted) setIsMuted(false);
                }}
                className="spotify-exact-volume-range"
                aria-label="Volume slider"
              />
              <div
                className="spotify-exact-volume-fill"
                style={{ width: `${isMuted ? 0 : volume}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
