"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""}`} id="navbar">
      <div className="header-container">
        <Link href="#hero" className="brand-link" aria-label="Beyond Sky Home" onClick={closeMobile}>
          <div className="brand-logo-wrap">
            <Image
              src="/assets/company_logo.jpg"
              alt="Beyond Sky Logo"
              width={48}
              height={48}
              className="brand-logo-img"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-menu">
            <li><a href="#about" className="nav-link">About Us</a></li>
            <li><a href="#channels" className="nav-link">Our Channels</a></li>
            <li><a href="#team" className="nav-link">Team Members</a></li>
            <li><a href="#collaborate" className="nav-link">Collaborate</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </nav>

        {/* Header CTAs */}
        <div className="header-actions">
          <a
            href="https://www.youtube.com/@BeyondSky-m5e?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-youtube-sm"
            id="nav-yt-cta"
          >
            <svg className="icon-svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span>Subscribe</span>
          </a>
          <a href="#collaborate" className="btn btn-gold-sm">Partner With Us</a>
          <button
            className="mobile-menu-toggle"
            id="mobile-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${isMobileOpen ? "open" : ""}`} id="mobile-drawer">
        <ul className="mobile-nav-list">
          <li><a href="#about" className="mobile-nav-link" onClick={closeMobile}>About Us</a></li>
          <li><a href="#channels" className="mobile-nav-link" onClick={closeMobile}>Our Channels</a></li>
          <li><a href="#team" className="mobile-nav-link" onClick={closeMobile}>Team Members</a></li>
          <li><a href="#collaborate" className="mobile-nav-link" onClick={closeMobile}>Collaborate</a></li>
          <li><a href="#contact" className="mobile-nav-link" onClick={closeMobile}>Contact</a></li>
          <li className="mobile-drawer-cta">
            <a
              href="https://www.youtube.com/@BeyondSky-m5e"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-youtube w-full"
            >
              <svg className="icon-svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Watch on YouTube
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
