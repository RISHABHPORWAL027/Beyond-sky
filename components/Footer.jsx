"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState("2026");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="site-footer minimal-footer" id="footer">
      {/* Runway Threshold Aesthetic Border */}
      <div className="runway-threshold-bar" aria-hidden="true">
        <div className="threshold-stripes">
          <span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span>
        </div>
      </div>

      <div className="container" style={{ padding: "3rem 1.5rem 2.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* Brand Col */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Image
              src="/assets/company_logo.jpg"
              alt="Beyond Sky Logo"
              width={48}
              height={48}
              style={{
                borderRadius: "12px",
                border: "2px solid var(--aviation-yellow)",
                boxShadow: "0 0 16px rgba(245, 158, 11, 0.25)",
              }}
            />
            <div>
              <span
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  color: "#ffffff",
                  display: "block",
                }}
              >
                BEYOND <span style={{ color: "var(--aviation-yellow)" }}>SKY</span>
              </span>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--text-muted)",
                  margin: "0.15rem 0 0",
                  letterSpacing: "0.02em",
                }}
              >
                Stories From the Skies • In The Black Media Network
              </p>
            </div>
          </div>

          {/* Social Channels & Contact Links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://www.youtube.com/@BeyondSky-m5e"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-channel-chip"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.55rem 1rem",
                borderRadius: "9999px",
                background: "rgba(239, 68, 68, 0.12)",
                border: "1px solid rgba(239, 68, 68, 0.35)",
                color: "#ff8080",
                fontSize: "0.84rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>YouTube</span>
            </a>

            <a
              href="https://open.spotify.com/show/3QZ7LND8nODC4ZtrIWoH3s"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-channel-chip"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.55rem 1rem",
                borderRadius: "9999px",
                background: "rgba(16, 185, 129, 0.12)",
                border: "1px solid rgba(16, 185, 129, 0.35)",
                color: "#6ee7b7",
                fontSize: "0.84rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              <span>Spotify</span>
            </a>

            <a
              href="mailto:beyondsky@intheblackmedia.com"
              className="footer-channel-chip"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.55rem 1rem",
                borderRadius: "9999px",
                background: "rgba(37, 99, 235, 0.12)",
                border: "1px solid rgba(59, 130, 246, 0.35)",
                color: "#93c5fd",
                fontSize: "0.84rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>Contact</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright & Radar pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            paddingTop: "1.5rem",
          }}
        >
          <p
            style={{
              fontSize: "0.82rem",
              color: "var(--text-muted)",
              margin: 0,
            }}
          >
            &copy; {currentYear} Beyond Sky. Produced by In The Black Media. All rights reserved.
          </p>

          <div className="footer-status-pill">
            <span className="radar-dot"></span>
            <span>RADAR STATUS: ACTIVE • UNITED STATES</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
