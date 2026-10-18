"use client";

import React, { useState, useEffect, useRef } from "react";

/**
 * Diagonal Marquee Carousel
 * Slanted infinite marquee showing only high-resolution video thumbnails.
 * Clicking any card redirects the user directly to the documentary on YouTube.
 * While scrolling the page, the diagonal tracks run and respond dynamically.
 */
export function VideoCard({ video }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="video-preview-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Watch on YouTube: ${video.title}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      {/* High-Resolution YouTube Thumbnail Poster */}
      <img
        src={video.thumbnail}
        alt={video.title}
        loading="lazy"
        className="card-thumb-img"
      />

      {/* Vignette Overlay for Depth */}
      <div className="card-vignette" />

      {/* Bottom Title & Action Cue */}
      <div className="card-bottom-info">
        <h4 className="card-title">
          {video.title}
        </h4>
        <div className="card-play-action">
          <svg viewBox="0 0 24 24">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <span>Watch on YouTube ➔</span>
        </div>
      </div>
    </a>
  );
}

function MarqueeRow({
  videos,
  speed,
  direction,
  scrollShift = 0,
}) {
  const animationClass =
    direction === -1 ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="diagonal-marquee-row">
      <div
        className={`diagonal-marquee-track ${animationClass}`}
        style={{
          "--speed": `${speed}s`,
          transform: `translate3d(${direction * scrollShift}px, 0, 0)`,
        }}
      >
        <div className="marquee-cards-chunk">
          {videos.map((video, idx) => (
            <div key={`${video.id}-${idx}`} className="marquee-card-item">
              <VideoCard video={video} />
            </div>
          ))}
        </div>
        <div className="marquee-cards-chunk" aria-hidden="true">
          {videos.map((video, idx) => (
            <div key={`${video.id}-${idx}-copy`} className="marquee-card-item">
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DiagonalMarqueeCarousel({
  videos = [],
  angle = -12,
  baseDuration = 70,
}) {
  const [scrollShift, setScrollShift] = useState(0);
  const containerRef = useRef(null);

  // Divide videos into 4 balanced rows
  const rowCount = 4;
  const rowChunks = [[], [], [], []];
  videos.forEach((vid, i) => {
    rowChunks[i % rowCount].push(vid);
  });

  // Dynamic Scroll Response: "while scroll it run"
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const vHeight = window.innerHeight;
            if (rect.top < vHeight && rect.bottom > 0) {
              const scrolledAmount = window.scrollY || window.pageYOffset;
              // Smooth scroll shift
              setScrollShift((scrolledAmount * 0.45) % 1200);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="diagonal-carousel-container">
      {/* Slanted Tracks Container */}
      <div
        className="diagonal-tracks-box"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <MarqueeRow
          videos={rowChunks[0]}
          speed={baseDuration}
          direction={-1}
          scrollShift={scrollShift * 0.7}
        />
        <MarqueeRow
          videos={rowChunks[1]}
          speed={Math.max(baseDuration - 12, 45)}
          direction={1}
          scrollShift={scrollShift * 0.9}
        />
        <MarqueeRow
          videos={rowChunks[2]}
          speed={baseDuration + 14}
          direction={-1}
          scrollShift={scrollShift * 0.6}
        />
        <MarqueeRow
          videos={rowChunks[3]}
          speed={Math.max(baseDuration - 6, 50)}
          direction={1}
          scrollShift={scrollShift * 0.8}
        />
      </div>

      {/* Faded Top & Bottom Gradients to blend smoothly into page */}
      <div className="carousel-fade-top" />
      <div className="carousel-fade-bottom" />
    </div>
  );
}
