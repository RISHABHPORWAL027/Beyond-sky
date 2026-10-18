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
          {/* Master Section Heading */}
          <h2 className="portfolio-master-title">
            Our Work &amp; <span className="highlight-circle">Portfolio</span>
          </h2>

          {/* Differentiated Platform Sub-heading: YouTube */}
          <div className="portfolio-subheading-wrap">
            <h3 className="portfolio-subheading-title">
              Beyond Sky on <span className="highlight-brand-youtube">YouTube</span>
            </h3>

            {/* Subtitle */}
            <p className="portfolio-subtitle">
              Explore our video documentaries, pilot debriefs, and cockpit telemetry chronicles.
            </p>
          </div>
        </div>
      </div>

      {/* Diagonal Infinite Marquee Carousel with All Scraped Videos */}
      <DiagonalMarqueeCarousel
        videos={portfolioVideos}
        angle={-12}
        baseDuration={70}
      />

      {/* Bottom CTA to Channel */}
      <div className="portfolio-cta-wrapper">
        <a
          href="https://www.youtube.com/@BeyondSky-m5e/videos"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-gold portfolio-youtube-cta"
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
