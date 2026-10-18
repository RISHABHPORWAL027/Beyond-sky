"use client";

import { useState } from "react";
import Image from "next/image";

export const episodesData = {
  boeing_airbus: {
    title: "Every Boeing vs Airbus Battle Explained In 11 Minutes",
    tag: "YOUTUBE DOCUMENTARY • 11:24",
    image: "/assets/thumbnail_boeing_airbus.jpg",
    description: "An exhaustive chronicle covering fifty years of aeronautical engineering competition. We examine how the European consortium challenged American aerospace dominance, the widebody revolution, the 737 MAX tragedy, and why the next frontier will be decided by hydrogen and ultra-efficient composite aerodynamics.",
    chapters: [
      { time: "0:00", title: "Flight Briefing & The Pre-1970 Monolith" },
      { time: "2:15", title: "Airbus A300: The Twin-Engine Gamble" },
      { time: "5:30", title: "Fly-By-Wire vs Control Columns: The Tech Schism" },
      { time: "8:45", title: "The MAX Crisis and A321neo Dominance" },
      { time: "10:15", title: "Conclusion: 2030 and The Clean Sky Horizon" }
    ],
    linkText: "Watch Full Documentary on YouTube",
    url: "https://www.youtube.com/@BeyondSky-m5e"
  },
  boeing_777x: {
    title: "777X: The 'Simple Upgrade' That Became Boeing's Nightmare",
    tag: "YOUTUBE DOCUMENTARY • 14:48",
    image: "/assets/thumbnail_boeing_777x.jpg",
    description: "Boeing set out to modernize its legendary 777 widebody with composite wings, folding tips, and massive GE9X powerplants. Instead, it became one of the most troubled engineering cycles in commercial aviation history. Delve into the FAA certification tightening, stress fractures, and global airline delays.",
    chapters: [
      { time: "0:00", title: "Introduction: The 777-300ER Successor" },
      { time: "3:10", title: "The Folding Wingtip Architecture Explained" },
      { time: "6:20", title: "GE9X: The Largest Jet Engine Ever Built" },
      { time: "9:50", title: "Certification Stalls & Looming Airline Penalties" },
      { time: "13:20", title: "Can the 777X Still Save Boeing's Flagship Fleet?" }
    ],
    linkText: "Watch Full Analysis on YouTube",
    url: "https://www.youtube.com/@BeyondSky-m5e"
  },
  cargo_titans: {
    title: "Giants of the Cargo Sky: A Tale of Two Cabins",
    tag: "YOUTUBE DOCUMENTARY • 24:18",
    image: "/assets/thumbnail_airbus_cargo.jpg",
    description: "While passenger travel takes headlines, the unseen battle happens at 35,000 feet carrying high-priority cargo. Discover how Airbus built the iconic BelugaXL whale-shaped lifter, Boeing's Dreamlifter fleet, and the logistics engineering required to airlift entire airliner fuselages across oceans.",
    chapters: [
      { time: "0:00", title: "The Anatomy of Super Transporters" },
      { time: "5:00", title: "BelugaXL: Engineering the Smiling Giant" },
      { time: "11:30", title: "Boeing 747 Dreamlifter & Global Fuselage Supply Chains" },
      { time: "18:20", title: "Dangerous Cargo, Live Animals & Rocket Sections" },
      { time: "22:40", title: "The Future of Heavy Aerospace Freight" }
    ],
    linkText: "Watch Freight Documentary on YouTube",
    url: "https://www.youtube.com/@BeyondSky-m5e"
  },
  podcast_show: {
    title: "Stories From the Skies: Deep Cockpit Chronicles",
    tag: "SPOTIFY PODCAST • 42:15 EPISODE",
    image: "/assets/podcast_cover.jpg",
    description: "Beyond Sky's flagship audio experience. Put on your headphones and join us inside the cockpit during unexpected weather diversions, emergency go-arounds, and conversations with captains who survived extreme flight situations. Produced with binaural audio recordings and high-fidelity aerospace ambience.",
    chapters: [
      { time: "0:00", title: "Cockpit Ambient Audio & ATC Cleared for Takeoff" },
      { time: "6:30", title: "Captain Testimonial: North Atlantic Jetstream Crossing" },
      { time: "18:40", title: "The Psychology of Automation Dependency" },
      { time: "29:10", title: "Unexplained Radar Blips & High-Altitude Phenomena" },
      { time: "39:50", title: "Touchdown & Listener Q&A" }
    ],
    linkText: "Listen to Show on Spotify",
    url: "https://open.spotify.com/show/3QZ7LND8nODC4ZtrIWoH3s"
  }
};

export default function Channels({ onSelectEpisode }) {
  const [filter, setFilter] = useState("all");

  const episodes = [
    {
      id: "boeing_airbus",
      category: "youtube",
      title: "Every Boeing vs Airbus Battle Explained In 11 Minutes",
      duration: "11:24",
      image: "/assets/thumbnail_boeing_airbus.jpg",
      tags: ["#AviationHistory", "#Duopoly"],
      excerpt: "A breakdown of the half-century rivalry: from the A300 launch to the 737 MAX vs A320neo, widebody battles, and market disruption.",
      stat: "★ 1.8M+ Views",
      link: "https://www.youtube.com/@BeyondSky-m5e",
      btnText: "Watch on YT →"
    },
    {
      id: "boeing_777x",
      category: "youtube",
      title: '777X: The "Simple Upgrade" That Became Boeing\'s Nightmare',
      duration: "14:48",
      image: "/assets/thumbnail_boeing_777x.jpg",
      tags: ["#AerospaceEngineering", "#Widebody"],
      excerpt: "Folding wingtips, gigantic GE9X powerplants, and certification delays that shook airline fleet planning around the world.",
      stat: "★ 2.4M+ Views",
      link: "https://www.youtube.com/@BeyondSky-m5e",
      btnText: "Watch on YT →"
    },
    {
      id: "cargo_titans",
      category: "youtube",
      title: "Giants of the Cargo Sky: A Tale of Two Cabins",
      duration: "24:18",
      image: "/assets/thumbnail_airbus_cargo.jpg",
      tags: ["#AirCargo", "#AirbusBeluga"],
      excerpt: "How oversized air freighters like the BelugaXL and Dreamlifter transport wings, satellites, and massive industrial hardware across continents.",
      stat: "★ 1.1M+ Views",
      link: "https://www.youtube.com/@BeyondSky-m5e",
      btnText: "Watch on YT →"
    },
    {
      id: "podcast_show",
      category: "podcast",
      title: "Stories From the Skies: Deep Cockpit Chronicles",
      duration: "42:15",
      image: "/assets/podcast_cover.jpg",
      tags: ["#SpotifyPodcast", "#AudioExperience"],
      excerpt: "An immersive audio journey into emergency procedures, high-altitude diversions, and intimate interviews with veteran transatlantic captains.",
      stat: "★ Full Series on Spotify",
      link: "https://open.spotify.com/show/3QZ7LND8nODC4ZtrIWoH3s",
      btnText: "Stream Show →"
    }
  ];

  const filteredEpisodes = episodes.filter(
    (ep) => filter === "all" || ep.category === filter
  );

  return (
    <section className="channels-section section-padding" id="channels">
      <div className="container">
        <div className="section-badge-wrap">
          <span className="section-badge">
            <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            BROADCAST HUBS
          </span>
        </div>

        <div className="section-header text-center">
          <h2 className="section-title">
            Where to Experience <br /><span className="highlight-yellow">Beyond Sky</span>
          </h2>
          <p className="section-lead">
            Tune in across video and audio streaming networks for comprehensive aviation intelligence.
          </p>
        </div>

        {/* Channel Dual Hubs: YouTube + Spotify */}
        <div className="channel-hubs-grid">
          {/* HUB 1: YOUTUBE */}
          <div className="channel-hub-card hub-youtube glass-card">
            <div className="hub-header">
              <div className="hub-badge-icon yt-color">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div>
                <span className="hub-platform">YOUTUBE CHANNEL</span>
                <h3 className="hub-channel-name">
                  Beyond Sky <span className="verified-check" title="Official Channel">✓</span>
                </h3>
                <span className="hub-handle">@BeyondSky-m5e</span>
              </div>
            </div>

            <p className="hub-desc">
              Cinematic aviation documentaries featuring bespoke 3D motion graphics, cockpit schematics, and rigorous historical fact-checking.
            </p>

            <div className="hub-stats-row">
              <div className="hub-stat">
                <span className="h-val">39.3K</span>
                <span className="h-lbl">Subscribers</span>
              </div>
              <div className="hub-stat">
                <span className="h-val">15.1M+</span>
                <span className="h-lbl">Views</span>
              </div>
              <div className="hub-stat">
                <span className="h-val">33</span>
                <span className="h-lbl">Videos</span>
              </div>
            </div>

            <div className="hub-cta-wrap">
              <a
                href="https://www.youtube.com/@BeyondSky-m5e"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-youtube w-full"
              >
                <span>Visit YouTube Channel</span>
                <svg className="icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>
          </div>

          {/* HUB 2: SPOTIFY PODCAST */}
          <div className="channel-hub-card hub-spotify glass-card">
            <div className="hub-header">
              <div className="hub-badge-icon spotify-color">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.485 17.304a.75.75 0 0 1-1.03.248c-2.822-1.724-6.375-2.114-10.56-1.157a.75.75 0 0 1-.337-1.462c4.582-1.047 8.523-.6 11.68 1.341a.75.75 0 0 1 .247 1.03zm1.465-3.26a.937.937 0 0 1-1.29.31c-3.23-1.986-8.156-2.56-11.977-1.4a.938.938 0 1 1-.55-1.794c4.372-1.327 9.805-.684 13.507 1.594a.938.938 0 0 1 .31 1.29zm.126-3.413c-3.873-2.3-10.264-2.513-13.98-1.384a1.125 1.125 0 0 1-.65-2.155c4.27-1.297 11.326-1.048 15.787 1.6a1.125 1.125 0 0 1-1.157 1.939z"/>
                </svg>
              </div>
              <div>
                <span className="hub-platform">SPOTIFY PODCAST</span>
                <h3 className="hub-channel-name">Stories From the Skies</h3>
                <span className="hub-handle">Beyond Sky Original Podcast</span>
              </div>
            </div>

            <p className="hub-desc">
              Immersive audio journeys exploring unclassified flight logs, pilot testimonials, cockpit dilemmas, and aerospace soundscapes.
            </p>

            <div className="hub-stats-row">
              <div className="hub-stat">
                <span className="h-val">Global</span>
                <span className="h-lbl">Distribution</span>
              </div>
              <div className="hub-stat">
                <span className="h-val">Hi-Res</span>
                <span className="h-lbl">Audio Master</span>
              </div>
              <div className="hub-stat">
                <span className="h-val">Free</span>
                <span className="h-lbl">Streaming</span>
              </div>
            </div>

            <div className="hub-cta-wrap">
              <a
                href="https://open.spotify.com/show/3QZ7LND8nODC4ZtrIWoH3s"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-spotify w-full"
              >
                <span>Listen on Spotify</span>
                <svg className="icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* FEATURED VIDEOS & PODCAST SHOWCASE */}
        <div className="featured-content-wrap">
          <div className="featured-header-row">
            <div>
              <h3 className="featured-title">Signature Documentaries &amp; Episodes</h3>
              <p className="featured-sub">Click any episode below to preview storyline, chapters, and flight data.</p>
            </div>
            {/* Category Filter Tabs */}
            <div className="channel-tabs" id="content-tabs">
              <button
                className={`tab-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All Content
              </button>
              <button
                className={`tab-btn ${filter === "youtube" ? "active" : ""}`}
                onClick={() => setFilter("youtube")}
              >
                Documentaries
              </button>
              <button
                className={`tab-btn ${filter === "podcast" ? "active" : ""}`}
                onClick={() => setFilter("podcast")}
              >
                Podcast
              </button>
            </div>
          </div>

          <div className="episodes-grid" id="episodes-container">
            {filteredEpisodes.map((ep) => (
              <article key={ep.id} className="episode-card glass-panel" data-category={ep.category}>
                <div className="card-thumb-wrap">
                  <Image
                    src={ep.image}
                    alt={ep.title}
                    width={400}
                    height={225}
                    className="card-thumb-img"
                  />
                  <div className={`thumb-badge ${ep.category === "youtube" ? "yt-badge" : "spotify-badge"}`}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      {ep.category === "youtube" ? (
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      ) : (
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.485 17.304a.75.75 0 0 1-1.03.248c-2.822-1.724-6.375-2.114-10.56-1.157a.75.75 0 0 1-.337-1.462c4.582-1.047 8.523-.6 11.68 1.341a.75.75 0 0 1 .247 1.03zm1.465-3.26a.937.937 0 0 1-1.29.31c-3.23-1.986-8.156-2.56-11.977-1.4a.938.938 0 1 1-.55-1.794c4.372-1.327 9.805-.684 13.507 1.594a.938.938 0 0 1 .31 1.29zm.126-3.413c-3.873-2.3-10.264-2.513-13.98-1.384a1.125 1.125 0 0 1-.65-2.155c4.27-1.297 11.326-1.048 15.787 1.6a1.125 1.125 0 0 1-1.157 1.939z"/>
                      )}
                    </svg>
                    <span>{ep.duration}</span>
                  </div>
                  <button
                    className="play-overlay-trigger"
                    onClick={() => onSelectEpisode(ep.id)}
                    aria-label={`Preview ${ep.title}`}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </button>
                </div>
                <div className="card-body">
                  <div className="card-tags">
                    {ep.tags.map((tag, idx) => (
                      <span key={idx} className="tag">{tag}</span>
                    ))}
                  </div>
                  <h4 className="card-title">{ep.title}</h4>
                  <p className="card-excerpt">{ep.excerpt}</p>
                  <div className="card-footer-meta">
                    <span>{ep.stat}</span>
                    <a href={ep.link} target="_blank" rel="noopener noreferrer" className="link-arrow">
                      {ep.btnText}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
