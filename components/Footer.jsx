"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState("2026");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="site-footer">
      {/* Runway Threshold Aesthetic Border */}
      <div className="runway-threshold-bar" aria-hidden="true">
        <div className="threshold-stripes">
          <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>

      <div className="container footer-container">
        <div className="footer-top-row">
          {/* Brand identity col */}
          <div className="footer-brand-col">
            <div className="footer-brand-wrap">
              <Image
                src="/assets/company_logo.jpg"
                alt="Beyond Sky Logo"
                width={54}
                height={54}
                className="footer-logo"
              />
              <div>
                <span className="f-brand-name">
                  BEYOND <span className="highlight-yellow">SKY</span>
                </span>
                <p className="f-brand-desc">
                  Exploring the fascinating world of aviation through well-researched topics, curious facts, and captivating stories from the skies.
                </p>
              </div>
            </div>
            <div className="footer-status-pill">
              <span className="radar-dot"></span>
              <span>RADAR STATUS: ACTIVE • UNITED STATES</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h5 className="f-link-title">Navigation</h5>
            <ul className="f-links-list">
              <li><Link href="#hero">Flight Deck (Home)</Link></li>
              <li><Link href="#about">About Beyond Sky</Link></li>
              <li><Link href="#channels">Our Channels</Link></li>
              <li><Link href="#team">Team Members</Link></li>
              <li><Link href="#collaborate">Let&apos;s Collaborate</Link></li>
              <li><Link href="#contact">Contact Desk</Link></li>
            </ul>
          </div>

          {/* Broadcast Links */}
          <div className="footer-links-col">
            <h5 className="f-link-title">Our Networks</h5>
            <ul className="f-links-list">
              <li>
                <a href="https://www.youtube.com/@BeyondSky-m5e" target="_blank" rel="noopener noreferrer">
                  YouTube Channel (@BeyondSky-m5e)
                </a>
              </li>
              <li>
                <a href="https://open.spotify.com/show/3QZ7LND8nODC4ZtrIWoH3s" target="_blank" rel="noopener noreferrer">
                  Spotify Podcast (Stories From the Skies)
                </a>
              </li>
              <li>
                <a href="mailto:beyondsky@intheblackmedia.com">
                  Business: beyondsky@intheblackmedia.com
                </a>
              </li>
              <li><span className="f-muted">Media Network: In The Black Media</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p className="copyright-text">
            &copy; {currentYear} Beyond Sky. Produced by In The Black Media. All rights reserved.
          </p>
          <div className="footer-badges">
            <span className="f-badge">39.3K+ Aviators</span>
            <span className="f-badge">15M+ Views</span>
            <span className="f-badge">33 Documentaries</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
