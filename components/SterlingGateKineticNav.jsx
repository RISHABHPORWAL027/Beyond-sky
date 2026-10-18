"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

export default function SterlingGateKineticNav() {
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection for header backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Arrow line animation & menu shape hover reactions
  useEffect(() => {
    if (!containerRef.current) return;

    try {
      if (!gsap.parseEase("main")) {
        gsap.defaults({ ease: "power3.out", duration: 0.7 });
      }
    } catch {
      gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      // Arrow line dash animation
      const arrow = containerRef.current?.querySelector(".arrow-line");
      if (arrow) {
        const len = arrow.getTotalLength ? arrow.getTotalLength() : 36;
        gsap.set(arrow, { strokeDasharray: len, strokeDashoffset: len });
        gsap.timeline({ repeat: -1, repeatDelay: 0.9 })
          .to(arrow, { strokeDashoffset: 0, duration: 1, ease: "power2.out" })
          .to({}, { duration: 1.2 })
          .to(arrow, { strokeDashoffset: -len, duration: 0.6, ease: "power2.in" })
          .set(arrow, { strokeDashoffset: len });
      }

      // Shape hover reactions for menu items
      const menuItems = containerRef.current?.querySelectorAll(".menu-list-item[data-shape]");
      const shapeContainer = containerRef.current?.querySelector(".ambient-background-shapes");

      menuItems?.forEach((item) => {
        const shapeId = item.getAttribute("data-shape");
        const shape = shapeContainer ? shapeContainer.querySelector(`.bg-shape-${shapeId}`) : null;
        if (!shape) return;

        const elements = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
          shapeContainer
            ?.querySelectorAll(".bg-shape")
            .forEach((s) => s.classList.remove("active"));
          shape.classList.add("active");
          gsap.fromTo(
            elements,
            { scale: 0.5, opacity: 0, rotation: -10 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "back.out(1.7)",
              overwrite: "auto",
            }
          );
        };

        const onLeave = () => {
          gsap.to(elements, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => shape.classList.remove("active"),
            overwrite: "auto",
          });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        item._cleanup = () => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        };
      });
    }, containerRef);

    return () => {
      ctx.revert();
      containerRef.current
        ?.querySelectorAll(".menu-list-item[data-shape]")
        .forEach((el) => el._cleanup && el._cleanup());
    };
  }, []);

  // GSAP Menu open / close kinetic transition timeline
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const wrapper = containerRef.current?.querySelector(".nav-overlay-wrapper");
      const content = containerRef.current?.querySelector(".menu-content");
      const overlay = containerRef.current?.querySelector(".sterling-overlay");
      const backdrops = containerRef.current?.querySelectorAll(".backdrop-layer");
      const navLinks = containerRef.current?.querySelectorAll(".nav-link-text");
      const fadeElements = containerRef.current?.querySelectorAll("[data-menu-fade]");
      const closeBtn = containerRef.current?.querySelector(".nav-close-btn");
      const btnTexts = closeBtn?.querySelectorAll("p");
      const btnIcon = closeBtn?.querySelector(".menu-button-icon");

      const tl = gsap.timeline();

      if (isOpen) {
        if (wrapper) wrapper.setAttribute("data-nav", "open");
        tl.set(wrapper, { display: "block" })
          .set(content, { xPercent: 0 }, "<")
          .fromTo(btnTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.15 })
          .fromTo(btnIcon, { rotate: 0 }, { rotate: 315 }, "<")
          .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
          .fromTo(
            backdrops,
            { xPercent: 101 },
            { xPercent: 0, stagger: 0.1, duration: 0.55, ease: "power3.out" },
            "<"
          )
          .fromTo(
            navLinks,
            { yPercent: 140, rotate: 8 },
            { yPercent: 0, rotate: 0, stagger: 0.05, ease: "power3.out" },
            "<+=0.25"
          );

        if (fadeElements?.length) {
          tl.fromTo(
            fadeElements,
            { autoAlpha: 0, yPercent: 40 },
            { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" },
            "<+=0.15"
          );
        }
      } else {
        if (wrapper) wrapper.setAttribute("data-nav", "closed");
        tl.to(overlay, { autoAlpha: 0, duration: 0.3 })
          .to(content, { xPercent: 120, duration: 0.45, ease: "power3.in" }, "<")
          .to(btnTexts, { yPercent: 0, duration: 0.3 }, "<")
          .to(btnIcon, { rotate: 0, duration: 0.3 }, "<")
          .set(wrapper, { display: "none" });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <div ref={containerRef} className="sterling-gate-root">
      {/* Top Floating Header */}
      <div className={`site-header-wrapper ${isScrolled ? "header-scrolled" : ""}`}>
        <header className="header">
          <div className="container is--full">
            <nav className="nav-row" aria-label="Beyond Sky Navigation">
              {/* Brand Logo Only */}
              <Link
                href="#hero"
                className="brand-link"
                aria-label="Beyond Sky Home"
                onClick={closeMenu}
              >
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

              {/* Right: CTA & Kinetic Menu Trigger */}
              <div className="nav-row__right">
                {/* YouTube Subscribe Quick CTA */}
                <a
                  href="https://www.youtube.com/@BeyondSky-m5e?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-youtube-sm nav-yt-cta-btn"
                  id="kinetic-yt-cta"
                >
                  <svg className="icon-svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>Subscribe</span>
                </a>

                {/* Hand-drawn 'click me' label */}
                <div
                  className="nav-toggle-label"
                  onClick={toggleMenu}
                  style={{ cursor: "pointer", pointerEvents: "auto" }}
                >
                  <span className="toggle-text">explore</span>
                  <svg
                    width="28"
                    height="18"
                    viewBox="0 0 28 18"
                    fill="none"
                    className="toggle-arrow"
                  >
                    <path
                      className="arrow-line"
                      d="M2 9 C8 3, 16 15, 24 9 M18 4 L25 9 L18 14"
                      stroke="var(--aviation-yellow)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Sterling Gate Kinetic Menu Button */}
                <button
                  type="button"
                  role="button"
                  aria-label={isOpen ? "Close flight menu" : "Open flight menu"}
                  aria-expanded={isOpen}
                  className="nav-close-btn"
                  onClick={toggleMenu}
                  style={{ pointerEvents: "auto" }}
                >
                  <div className="menu-button-text">
                    <p className="p-large">Menu</p>
                    <p className="p-large">Close</p>
                  </div>
                  <div className="icon-wrap">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="menu-button-icon"
                    >
                      <path
                        d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z"
                        fill="currentColor"
                      />
                      <path
                        d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z"
                        fill="currentColor"
                      />
                      <path
                        d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z"
                        fill="currentColor"
                      />
                      <path
                        d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z"
                        fill="currentColor"
                      />
                      <path
                        d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z"
                        fill="currentColor"
                      />
                      <path
                        d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </nav>
          </div>
        </header>
      </div>

      {/* Fullscreen Kinetic Gate Container */}
      <section className="fullscreen-menu-container">
        <div data-nav="closed" className="nav-overlay-wrapper">
          {/* Dimmer backdrop */}
          <div className="sterling-overlay overlay" onClick={closeMenu} />

          {/* Sliding Menu Gate Panel */}
          <nav className="menu-content" aria-label="Expanded Navigation Gate">
            {/* Multi-layered Kinetic Gate Panels */}
            <div className="menu-bg">
              <div className="backdrop-layer first" />
              <div className="backdrop-layer second" />
              <div className="backdrop-layer" />

              {/* Ambient Aviation Shapes with Kinetic GSAP Reveal */}
              <div className="ambient-background-shapes" aria-hidden="true">
                {/* Shape 1: Radar Rings & Nav Beacons */}
                <svg className="bg-shape bg-shape-1" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="90" cy="110" r="45" fill="rgba(37, 99, 235, 0.22)" />
                  <circle className="shape-element" cx="310" cy="90" r="65" fill="rgba(56, 189, 248, 0.16)" />
                  <circle className="shape-element" cx="190" cy="300" r="85" fill="rgba(245, 158, 11, 0.14)" />
                  <circle className="shape-element" cx="340" cy="280" r="32" fill="rgba(37, 99, 235, 0.2)" />
                </svg>

                {/* Shape 2: Aerodynamic Streamlines */}
                <svg className="bg-shape bg-shape-2" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M0 190 Q100 90, 200 190 T 400 190"
                    stroke="rgba(37, 99, 235, 0.3)"
                    strokeWidth="50"
                    fill="none"
                  />
                  <path
                    className="shape-element"
                    d="M0 270 Q100 170, 200 270 T 400 270"
                    stroke="rgba(245, 158, 11, 0.25)"
                    strokeWidth="32"
                    fill="none"
                  />
                </svg>

                {/* Shape 3: Flight Matrix Waypoints */}
                <svg className="bg-shape bg-shape-3" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="60" cy="50" r="8" fill="rgba(37, 99, 235, 0.4)" />
                  <circle className="shape-element" cx="160" cy="50" r="8" fill="rgba(56, 189, 248, 0.4)" />
                  <circle className="shape-element" cx="260" cy="50" r="8" fill="rgba(245, 158, 11, 0.4)" />
                  <circle className="shape-element" cx="360" cy="50" r="8" fill="rgba(37, 99, 235, 0.4)" />
                  <circle className="shape-element" cx="110" cy="150" r="12" fill="rgba(56, 189, 248, 0.35)" />
                  <circle className="shape-element" cx="210" cy="150" r="12" fill="rgba(245, 158, 11, 0.35)" />
                  <circle className="shape-element" cx="310" cy="150" r="12" fill="rgba(37, 99, 235, 0.35)" />
                  <circle className="shape-element" cx="60" cy="250" r="10" fill="rgba(245, 158, 11, 0.4)" />
                  <circle className="shape-element" cx="160" cy="250" r="10" fill="rgba(37, 99, 235, 0.4)" />
                  <circle className="shape-element" cx="260" cy="250" r="10" fill="rgba(56, 189, 248, 0.4)" />
                  <circle className="shape-element" cx="360" cy="250" r="10" fill="rgba(245, 158, 11, 0.4)" />
                </svg>

                {/* Shape 4: Wing Tip Vortex Blobs */}
                <svg className="bg-shape bg-shape-4" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100"
                    fill="rgba(37, 99, 235, 0.2)"
                  />
                  <path
                    className="shape-element"
                    d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200"
                    fill="rgba(245, 158, 11, 0.16)"
                  />
                </svg>

                {/* Shape 5: Runway Alignment Geometry */}
                <svg className="bg-shape bg-shape-5" viewBox="0 0 400 400" fill="none">
                  <line
                    className="shape-element"
                    x1="0"
                    y1="100"
                    x2="300"
                    y2="400"
                    stroke="rgba(37, 99, 235, 0.25)"
                    strokeWidth="32"
                  />
                  <line
                    className="shape-element"
                    x1="100"
                    y1="0"
                    x2="400"
                    y2="300"
                    stroke="rgba(56, 189, 248, 0.2)"
                    strokeWidth="24"
                  />
                  <line
                    className="shape-element"
                    x1="200"
                    y1="0"
                    x2="400"
                    y2="200"
                    stroke="rgba(245, 158, 11, 0.18)"
                    strokeWidth="18"
                  />
                </svg>
              </div>
            </div>

            {/* Menu Content & Links */}
            <div className="menu-content-wrapper">
              <ul className="menu-list">
                <li className="menu-list-item" data-shape="1">
                  <a href="#hero" className="nav-link w-inline-block" onClick={closeMenu}>
                    <p className="nav-link-text">Home</p>
                    <div className="nav-link-hover-bg" />
                  </a>
                </li>
                <li className="menu-list-item" data-shape="2">
                  <a href="#portfolio" className="nav-link w-inline-block" onClick={closeMenu}>
                    <p className="nav-link-text">Our Work</p>
                    <div className="nav-link-hover-bg" />
                  </a>
                </li>
                <li className="menu-list-item" data-shape="3">
                  <a href="#about" className="nav-link w-inline-block" onClick={closeMenu}>
                    <p className="nav-link-text">About Us</p>
                    <div className="nav-link-hover-bg" />
                  </a>
                </li>
                <li className="menu-list-item" data-shape="3">
                  <a href="#channels" className="nav-link w-inline-block" onClick={closeMenu}>
                    <p className="nav-link-text">Channels</p>
                    <div className="nav-link-hover-bg" />
                  </a>
                </li>
                <li className="menu-list-item" data-shape="4">
                  <a href="#team" className="nav-link w-inline-block" onClick={closeMenu}>
                    <p className="nav-link-text">Crew</p>
                    <div className="nav-link-hover-bg" />
                  </a>
                </li>
                <li className="menu-list-item" data-shape="5">
                  <a href="#collaborate" className="nav-link w-inline-block" onClick={closeMenu}>
                    <p className="nav-link-text">Partner</p>
                    <div className="nav-link-hover-bg" />
                  </a>
                </li>
                <li className="menu-list-item" data-shape="1">
                  <a href="#contact" className="nav-link w-inline-block" onClick={closeMenu}>
                    <p className="nav-link-text" data-menu-fade>Contact</p>
                    <div className="nav-link-hover-bg" />
                  </a>
                </li>
              </ul>

              {/* Menu Footer & Telemetry Details */}
              <div className="menu-details">
                <div data-menu-fade className="flight-status-card">
                  <span className="telemetry-badge">BSK-321 • ACTIVE BROADCAST</span>
                  <p className="p-small" style={{ marginTop: "0.4rem", color: "var(--text-secondary)" }}>
                    Curious aviation history, aircraft engineering, and aerospace duopolies.
                  </p>
                </div>

                <div data-menu-fade className="menu-inquiries">
                  <span className="eyebrow">Business & Press</span>
                  <a
                    href="mailto:beyondsky@intheblackmedia.com"
                    className="text-link p-large"
                    style={{ color: "var(--aviation-yellow)", fontWeight: 700 }}
                  >
                    beyondsky@intheblackmedia.com
                  </a>
                </div>

                <div data-menu-fade className="socials-row">
                  <a
                    href="https://www.youtube.com/@BeyondSky-m5e"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                  >
                    YouTube
                  </a>
                  <a
                    href="https://open.spotify.com/show/3QZ7LND8nODC4ZtrIWoH3s"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                  >
                    Spotify
                  </a>
                  <a
                    href="#contact"
                    onClick={closeMenu}
                    className="text-link"
                  >
                    Frequency 121.5
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}

// Named alias matching shadcn convention
export { SterlingGateKineticNav as Component };
