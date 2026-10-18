"use client";

import { useState } from "react";
import SpotifyCard from "@/components/ui/SpotifyCard";
import { spotifyShowInfo, spotifyEpisodes } from "@/components/spotifyData";

export default function SpotifySection() {
  const [playingEpisodeId, setPlayingEpisodeId] = useState(null);

  // Handle play/pause toggles per card
  const handleTogglePlay = (epId, shouldPlay) => {
    if (shouldPlay) {
      setPlayingEpisodeId(epId);
    } else {
      if (playingEpisodeId === epId) {
        setPlayingEpisodeId(null);
      }
    }
  };

  const handleNext = (currentIndex) => {
    const nextIndex = (currentIndex + 1) % spotifyEpisodes.length;
    setPlayingEpisodeId(spotifyEpisodes[nextIndex].id);
  };

  const handlePrev = (currentIndex) => {
    const prevIndex = (currentIndex - 1 + spotifyEpisodes.length) % spotifyEpisodes.length;
    setPlayingEpisodeId(spotifyEpisodes[prevIndex].id);
  };

  // Duplicate episodes array for a seamless infinite loop marquee
  const loopedEpisodes = [...spotifyEpisodes, ...spotifyEpisodes];

  return (
    <section className="spotify-showcase-section" id="spotify">
      {/* Ambient background radiance */}
      <div className="spotify-section-glow" aria-hidden="true" />
      <div className="spotify-grid-lines" aria-hidden="true" />

      {/* Header */}
      <div className="container">
        <div className="portfolio-header" style={{ marginBottom: "2rem" }}>
          {/* Differentiated Platform Sub-heading: Spotify */}
          <div className="portfolio-subheading-wrap">
            <h2 className="portfolio-subheading-title">
              Beyond Sky on <span className="highlight-brand-spotify">Spotify</span>
            </h2>

            <p className="portfolio-subtitle">
              Explore our audio documentaries, pilot debriefs, and cockpit telemetry chronicles.
            </p>
          </div>

          <div className="spotify-header-actions-row">
            <a
              href={spotifyShowInfo.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-spotify btn-spotify-pill-cta"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" style={{ width: "18px", height: "18px", flexShrink: 0 }} fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.485 17.304a.75.75 0 0 1-1.03.248c-2.822-1.724-6.375-2.114-10.56-1.157a.75.75 0 0 1-.337-1.462c4.582-1.047 8.523-.6 11.68 1.341a.75.75 0 0 1 .247 1.03zm1.465-3.26a.937.937 0 0 1-1.29.31c-3.23-1.986-8.156-2.56-11.977-1.4a.938.938 0 1 1-.55-1.794c4.372-1.327 9.805-.684 13.507 1.594a.938.938 0 0 1 .31 1.29zm.126-3.413c-3.873-2.3-10.264-2.513-13.98-1.384a1.125 1.125 0 0 1-.65-2.155c4.27-1.297 11.326-1.048 15.787 1.6a1.125 1.125 0 0 1-1.157 1.939z" />
              </svg>
              <span>Follow On Spotify</span>
            </a>
          </div>
        </div>
      </div>

      {/* Infinite Auto-Scrolling Marquee Track */}
      <div className="spotify-marquee-wrapper">
        <div className="spotify-marquee-track">
          {loopedEpisodes.map((episode, idx) => {
            const uniqueKey = `${episode.id}-${idx}`;
            const isPlayingThis = playingEpisodeId === episode.id;
            const originalIndex = idx % spotifyEpisodes.length;

            return (
              <div key={uniqueKey} className="spotify-marquee-slide">
                <SpotifyCard
                  episode={episode}
                  isPlaying={isPlayingThis}
                  onTogglePlay={(shouldPlay) => handleTogglePlay(episode.id, shouldPlay)}
                  onNext={() => handleNext(originalIndex)}
                  onPrev={() => handlePrev(originalIndex)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
