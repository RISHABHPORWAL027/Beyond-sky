"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Mail, ArrowUpRight, Copy, Check, ArrowLeft } from "lucide-react";
import { ShaderBackground } from "@/components/ui/manu";

/**
 * LetsWorkTogether / Unified Contact & Footer Section
 * Merged interactive "Let's Work Together" CTA + seamless minimal footer.
 * Features:
 * - One smooth, continuous dark gradient (no white dashed lines or section breaks)
 * - Kinetic click transition to "Let's talk" panel
 * - "Mail us" direct action opening Gmail compose with subject & recipient
 * - Seamless brand info & channel badges (YouTube, Spotify) at the base
 */
export function LetsWorkTogether({
  email = "beyondsky@intheblackmedia.com",
  buttonText = "Mail us",
  statusText = "Available for Collaboration",
  subheading = "Have a project in mind? I'd love to hear about it. Let's create something exceptional together.",
  id = "contact",
  className = "",
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showTalk, setShowTalk] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentYear, setCurrentYear] = useState("2026");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent("Project Inquiry - Beyond Sky")}`;

  const handleClick = (e) => {
    e.preventDefault();
    setIsClicked(true);
    setTimeout(() => {
      setShowTalk(true);
    }, 450);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setShowTalk(false);
    setTimeout(() => {
      setIsClicked(false);
    }, 250);
  };

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <section
      id={id}
      className={`lets-work-section-wrapper unified-footer-section ${className}`}
      aria-label="Contact and site footer"
    >
      {/* 21st.dev Manu Animated WebGL Mesh Drift Gradient Backdrop */}
      <div className="lets-work-shader-backdrop" aria-hidden="true">
        <ShaderBackground className="lets-work-shader-canvas" />
        <div className="lets-work-shader-overlay" />
      </div>

      <div className="lets-work-container">
        {/* =======================================================
            REVEALED "LET'S TALK" INTERACTION (Active after click)
            ======================================================= */}
        <div
          className={`lets-talk-panel ${showTalk ? "panel-active" : "panel-hidden"}`}
          style={{
            opacity: showTalk ? 1 : 0,
            transform: showTalk ? "translateY(0) scale(1)" : "translateY(24px) scale(0.96)",
            pointerEvents: showTalk ? "auto" : "none",
          }}
          aria-hidden={!showTalk}
        >
          {/* Eyebrow & Headline */}
          <div className="lets-talk-header">
            <span
              className="lets-talk-eyebrow"
              style={{
                transform: showTalk ? "translateY(0)" : "translateY(12px)",
                opacity: showTalk ? 1 : 0,
                transitionDelay: "100ms",
              }}
            >
              Perfect
            </span>
            <h3
              className="lets-talk-title"
              style={{
                transform: showTalk ? "translateY(0)" : "translateY(12px)",
                opacity: showTalk ? 1 : 0,
                transitionDelay: "200ms",
              }}
            >
              Let&apos;s talk
            </h3>
          </div>

          {/* Interactive Action Pill: Mail Us -> Direct to Gmail */}
          <div className="booking-action-row">
            <div
              className="accent-flank-line"
              style={{
                transform: isButtonHovered ? "scaleX(0)" : "scaleX(1)",
                opacity: isButtonHovered ? 0 : 0.45,
              }}
            />

            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              className="lets-work-pill-btn"
              style={{
                transform: showTalk
                  ? isButtonHovered
                    ? "translateY(0) scale(1.025)"
                    : "translateY(0) scale(1)"
                  : "translateY(15px) scale(1)",
                opacity: showTalk ? 1 : 0,
                transitionDelay: "150ms",
                textDecoration: "none",
              }}
              aria-label="Mail us at Beyond Sky via Gmail"
            >
              <Mail
                className="pill-icon"
                size={18}
                strokeWidth={1.75}
              />
              <span className="pill-text">{buttonText}</span>
              <ArrowUpRight
                className="pill-icon arrow"
                size={18}
                strokeWidth={1.75}
                style={{
                  transform: isButtonHovered
                    ? "translate(3px, -3px) scale(1.1)"
                    : "translate(0, 0) scale(1)",
                }}
              />
            </a>

            <div
              className="accent-flank-line"
              style={{
                transform: isButtonHovered ? "scaleX(0)" : "scaleX(1)",
                opacity: isButtonHovered ? 0 : 0.45,
              }}
            />
          </div>

          {/* Subtitle notice */}
          <span
            className="lets-talk-subnote"
            style={{
              transform: showTalk ? "translateY(0)" : "translateY(10px)",
              opacity: showTalk ? 1 : 0,
              transitionDelay: "350ms",
            }}
          >
            Opens Gmail Compose
          </span>

          {/* Direct Email Transmission Fallback & Replay Controls */}
          <div
            className="lets-talk-options"
            style={{
              transform: showTalk ? "translateY(0)" : "translateY(10px)",
              opacity: showTalk ? 1 : 0,
              transitionDelay: "450ms",
            }}
          >
            <button
              type="button"
              onClick={handleCopyEmail}
              className="email-dispatch-chip"
              title="Click to copy email address"
            >
              <Mail size={14} />
              <span>{email}</span>
              {copied ? (
                <span className="copy-badge-status copied">
                  <Check size={12} /> Copied!
                </span>
              ) : (
                <span className="copy-badge-status">
                  <Copy size={12} /> Copy
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="reset-preview-btn"
              aria-label="Back to overview"
            >
              <ArrowLeft size={13} />
              <span>Back to overview</span>
            </button>
          </div>
        </div>

        {/* =======================================================
            PRIMARY HERO CTA VIEW (Interactive Trigger)
            ======================================================= */}
        {/* Availability Badge */}
        <div
          className="available-badge-wrapper"
          style={{
            opacity: isClicked ? 0 : 1,
            transform: isClicked ? "translateY(-24px)" : "translateY(0)",
            pointerEvents: isClicked ? "none" : "auto",
          }}
        >
          <span className="pulse-indicator">
            <span className="pulse-ring" />
            <span className="pulse-core" />
          </span>
          <span className="available-badge-text">
            {statusText}
          </span>
        </div>

        {/* Central Interactive Click Zone */}
        <div
          className="hero-trigger-group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleClick(e);
            }
          }}
          style={{
            pointerEvents: isClicked ? "none" : "auto",
          }}
          aria-label="Click to start a project with Beyond Sky"
        >
          {/* Left Flanking Line */}
          <div className="side-accent-wrapper left">
            <div
              className="side-accent-line"
              style={{
                transform: isClicked
                  ? "scaleX(0) translateX(-24px)"
                  : isHovered
                  ? "scaleX(1.45)"
                  : "scaleX(1)",
                opacity: isClicked ? 0 : isHovered ? 1 : 0.4,
              }}
            />
          </div>

          <div className="hero-content-stack">
            {/* Title: "Let's work together" */}
            <h2
              className="lets-work-heading"
              style={{
                opacity: isClicked ? 0 : 1,
                transform: isClicked
                  ? "translateY(-40px) scale(0.96)"
                  : "translateY(0) scale(1)",
              }}
            >
              <span className="heading-line-wrap">
                <span
                  className="heading-line line-primary"
                  style={{
                    transform: isHovered && !isClicked
                      ? "translateY(-7%)"
                      : "translateY(0)",
                  }}
                >
                  Let&apos;s work
                </span>
              </span>
              <span className="heading-line-wrap">
                <span
                  className="heading-line line-secondary"
                  style={{
                    transform: isHovered && !isClicked
                      ? "translateY(-7%)"
                      : "translateY(0)",
                  }}
                >
                  together
                </span>
              </span>
            </h2>

            {/* Circular Arrow Button */}
            <div className="circle-arrow-container">
              <div
                className="circle-arrow-bg"
                style={{
                  borderColor: isClicked || isHovered
                    ? "#ffffff"
                    : "rgba(255, 255, 255, 0.22)",
                  backgroundColor: isClicked
                    ? "transparent"
                    : isHovered
                    ? "#ffffff"
                    : "transparent",
                  transform: isClicked
                    ? "scale(3.4)"
                    : isHovered
                    ? "scale(1.1)"
                    : "scale(1)",
                  opacity: isClicked ? 0 : 1,
                  transitionDuration: isClicked ? "700ms" : "450ms",
                }}
              />
              <ArrowUpRight
                className="circle-arrow-icon"
                size={26}
                strokeWidth={1.75}
                style={{
                  transform: isClicked
                    ? "translate(110px, -110px) scale(0.4)"
                    : isHovered
                    ? "translate(2px, -2px)"
                    : "translate(0, 0)",
                  opacity: isClicked ? 0 : 1,
                  color: isHovered && !isClicked ? "#050a18" : "#ffffff",
                  transitionDuration: isClicked ? "600ms" : "450ms",
                }}
              />
            </div>
          </div>

          {/* Right Flanking Line */}
          <div className="side-accent-wrapper right">
            <div
              className="side-accent-line"
              style={{
                transform: isClicked
                  ? "scaleX(0) translateX(24px)"
                  : isHovered
                  ? "scaleX(1.45)"
                  : "scaleX(1)",
                opacity: isClicked ? 0 : isHovered ? 1 : 0.4,
              }}
            />
          </div>
        </div>

        {/* Bottom Subtitle & Contact Email */}
        <div
          className="bottom-meta-group"
          style={{
            opacity: isClicked ? 0 : 1,
            transform: isClicked ? "translateY(24px)" : "translateY(0)",
            pointerEvents: isClicked ? "none" : "auto",
          }}
        >
          <p className="bottom-subheading">
            {subheading}
          </p>
          <a
            href={gmailComposeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bottom-email-link"
            onClick={(e) => {
              e.stopPropagation();
            }}
            title="Click to compose in Gmail"
          >
            {email.toUpperCase()}
          </a>
        </div>
      </div>

      {/* =======================================================
          INTEGRATED FOOTER AREA (Merged seamlessly into single section)
          ======================================================= */}
      <footer className="integrated-footer-wrap">
        <div className="integrated-footer-top">
          {/* Brand Col */}
          <div className="integrated-brand-col">
            <Image
              src="/assets/company_logo.jpg"
              alt="Beyond Sky Logo"
              width={44}
              height={44}
              style={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "none",
              }}
            />
            <div>
              <span className="integrated-brand-title">
                BEYOND <span style={{ color: "var(--aviation-yellow)" }}>SKY</span>
              </span>
              <p className="integrated-brand-tagline">
                Stories From the Skies • In The Black Media Network
              </p>
            </div>
          </div>

          {/* Social Channels */}
          <div className="integrated-channels-col">
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
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
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
              <Mail size={16} />
              <span>Mail Us</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="integrated-footer-bottom">
          <p className="integrated-copyright-text">
            &copy; {currentYear} Beyond Sky. Produced by In The Black Media. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
}

export default LetsWorkTogether;
