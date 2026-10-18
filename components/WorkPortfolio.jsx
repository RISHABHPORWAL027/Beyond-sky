"use client";

import DiagonalMarqueeCarousel from "@/components/ui/DiagonalMarqueeCarousel";
import { portfolioVideos } from "@/components/portfolioData";

export default function WorkPortfolio() {
  return (
    <section className="work-portfolio-section" id="portfolio">
      {/* Decorative Cockpit Radar Backdrop */}
      <div className="portfolio-bg-radar" aria-hidden="true" />

      {/* Header Content */}
      <div className="container">
        <div className="portfolio-header">
          {/* Heading */}
          <h2 className="portfolio-title">
            Our Work &amp; <span className="highlight-circle">Portfolio</span>
          </h2>

          {/* Subtitle */}
          <p className="portfolio-subtitle">
            Explore our complete archive of investigative aviation documentaries.
            From high-stakes Boeing vs Airbus dogfights to super-transporter logistics and supersonic engineering — click any documentary to watch directly on our YouTube channel.
          </p>
        </div>
      </div>

      {/* Diagonal Infinite Marquee Carousel with All Scraped Videos */}
      <DiagonalMarqueeCarousel
        videos={portfolioVideos}
        angle={-12}
        baseDuration={70}
      />

      {/* Bottom CTA to Channel */}
      <div className="container" style={{ textAlign: "center", marginTop: "1rem", position: "relative", zIndex: 12 }}>
        <a
          href="https://www.youtube.com/@BeyondSky-m5e/videos"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-gold"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.9rem 2.2rem",
            borderRadius: "9999px",
            fontWeight: 700,
            fontSize: "0.95rem",
            letterSpacing: "0.02em",
            textDecoration: "none",
            boxShadow: "0 10px 30px rgba(245, 158, 11, 0.3)",
          }}
        >
          <span>Subscribe &amp; Watch on YouTube Channel</span>
          <svg
            className="icon-svg-sm"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
