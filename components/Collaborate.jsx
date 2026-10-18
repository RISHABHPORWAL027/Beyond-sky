"use client";

import { useState } from "react";

export default function Collaborate() {
  const [selectedTier, setSelectedTier] = useState("integrated");
  const [industry, setIndustry] = useState("aerospace");

  const tierDetails = {
    integrated: {
      reach: "250,000+",
      deliv1: "60-90s High-Retention Video Mid-Roll in New Documentary",
      deliv2: "Pinned Top Comment + First-Line Link in Video Description",
      deliv3: "Custom Visual Motion Graphic & Trackable Landing URL",
      deliv4: "Perpetual Video Lifespan (Evergreen Monthly Residual Views)"
    },
    dedicated: {
      reach: "500,000+",
      deliv1: "Full 12-18 Minute High-Production Custom Aerospace Documentary",
      deliv2: "Title Card Co-Branding ('Produced in Partnership With')",
      deliv3: "Exclusive Dedicated 3D Aircraft Visualizations & Lab Access Story",
      deliv4: "Full Commercial Rights for Brand Marketing & Trade Show Use"
    },
    podcast: {
      reach: "120,000+",
      deliv1: "Audio Host-Read Sponsorship Across 4 Spotify Podcast Episodes",
      deliv2: "Exclusive Show Notes Placement with Discount / Landing URL",
      deliv3: "Cockpit Soundscape Organic Product Testimonial by Host",
      deliv4: "Global Spotify & Apple Podcasts Cross-Distribution"
    },
    crossplatform: {
      reach: "1,000,000+",
      deliv1: "YouTube Integration + Spotify Podcast Readout Package",
      deliv2: "YouTube Community Tab Posts (39K+ Dedicated Subscribers)",
      deliv3: "Social Media Campaign Amplification & Newsletter Spotlight",
      deliv4: "Quarterly Analytics & Conversion Performance Flight Report"
    }
  };

  const currentDetails = tierDetails[selectedTier];

  return (
    <section className="collab-section section-padding" id="collaborate">
      <div className="container">
        <div className="section-badge-wrap">
          <span className="section-badge highlight-yellow-badge">
            <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              <line x1="8" y1="11" x2="8" y2="17"/>
              <line x1="5" y1="14" x2="11" y2="14"/>
            </svg>
            STRATEGIC PARTNERSHIPS
          </span>
        </div>

        <div className="section-header text-center">
          <h2 className="section-title">
            Let&apos;s Collaborate <br /><span className="highlight-yellow">With Us</span>
          </h2>
          <p className="section-lead">
            Partner with Beyond Sky to showcase your brand, aerospace innovation, travel service, or tech platform to millions of curious, highly-educated aviation enthusiasts.
          </p>
        </div>

        {/* Partnership Value Pillars */}
        <div className="collab-highlights-grid">
          <div className="collab-h-card glass-panel">
            <div className="collab-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <h4>High-Retention Viewership</h4>
            <p>Our average watch duration ranks in the top tier of YouTube documentary creators due to narrative depth and production polish.</p>
          </div>

          <div className="collab-h-card glass-panel">
            <div className="collab-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
              </svg>
            </div>
            <h4>Affluent Global Demographic</h4>
            <p>Over 70% of viewers are based in North America and Western Europe, heavily composed of engineers, frequent flyers, pilots, and tech professionals.</p>
          </div>

          <div className="collab-h-card glass-panel">
            <div className="collab-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h4>Authentic Brand Integration</h4>
            <p>No generic read-outs. We weave brand narratives seamlessly into the fabric of aviation innovation, engineering, and exploration.</p>
          </div>
        </div>

        {/* INTERACTIVE COLLABORATION PLANNER / CALCULATOR */}
        <div className="collab-calculator-card glass-card">
          <div className="calculator-header">
            <div className="calc-badge">FLIGHT CAMPAIGN ESTIMATOR</div>
            <h3 className="calc-title">Customize Your Collaboration Package</h3>
            <p className="calc-sub">Select your desired format to see deliverables and estimated audience reach.</p>
          </div>

          <div className="calculator-body-grid">
            <div className="calc-controls">
              {/* Tier Selection Buttons */}
              <div className="form-group">
                <label className="form-label">Sponsorship Tier / Format</label>
                <div className="package-options" id="tier-options">
                  <button
                    type="button"
                    className={`tier-select-btn ${selectedTier === "integrated" ? "active" : ""}`}
                    onClick={() => setSelectedTier("integrated")}
                  >
                    <span className="t-name">Integrated Video Sponsor</span>
                    <span className="t-desc">60-90s dedicated segment in our next documentary</span>
                  </button>
                  <button
                    type="button"
                    className={`tier-select-btn ${selectedTier === "dedicated" ? "active" : ""}`}
                    onClick={() => setSelectedTier("dedicated")}
                  >
                    <span className="t-name">Dedicated Custom Documentary</span>
                    <span className="t-desc">Full 12-18 minute bespoke film on your aviation story</span>
                  </button>
                  <button
                    type="button"
                    className={`tier-select-btn ${selectedTier === "podcast" ? "active" : ""}`}
                    onClick={() => setSelectedTier("podcast")}
                  >
                    <span className="t-name">Spotify Podcast Season Partner</span>
                    <span className="t-desc">Pre-roll & mid-roll sponsorship across 4 podcast episodes</span>
                  </button>
                  <button
                    type="button"
                    className={`tier-select-btn ${selectedTier === "crossplatform" ? "active" : ""}`}
                    onClick={() => setSelectedTier("crossplatform")}
                  >
                    <span className="t-name">Full Omnichannel Flight</span>
                    <span className="t-desc">YouTube, Spotify, Community Tab & Link-in-Bio integration</span>
                  </button>
                </div>
              </div>

              {/* Brand Industry Select */}
              <div className="form-group">
                <label className="form-label" htmlFor="calc-industry">Your Industry Sector</label>
                <select
                  id="calc-industry"
                  className="form-control-select"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  <option value="aerospace">Aviation &amp; Aerospace Engineering</option>
                  <option value="tech">Software, Simulators &amp; Tech</option>
                  <option value="travel">Travel, Luggage &amp; Hospitality</option>
                  <option value="consumer">Consumer Electronics &amp; Lifestyle</option>
                  <option value="fintech">Fintech, B2B &amp; Enterprise Services</option>
                </select>
              </div>
            </div>

            {/* Dynamic Projection Output Box */}
            <div className="calc-results glass-panel">
              <span className="result-tag">ESTIMATED CAMPAIGN IMPACT</span>
              
              <div className="reach-display">
                <span className="reach-number" id="calc-reach">{currentDetails.reach}</span>
                <span className="reach-label">Projected Video &amp; Audio Impressions</span>
              </div>

              <div className="campaign-deliverables-list">
                <div className="deliverable-item">
                  <span className="check-icon">✓</span>
                  <span>{currentDetails.deliv1}</span>
                </div>
                <div className="deliverable-item">
                  <span className="check-icon">✓</span>
                  <span>{currentDetails.deliv2}</span>
                </div>
                <div className="deliverable-item">
                  <span className="check-icon">✓</span>
                  <span>{currentDetails.deliv3}</span>
                </div>
                <div className="deliverable-item">
                  <span className="check-icon">✓</span>
                  <span>{currentDetails.deliv4}</span>
                </div>
              </div>

              <div className="calc-cta-box">
                <a href="#contact" className="btn btn-gold w-full" id="calc-inquire-btn">
                  Lock In Flight Slot • Inquire Now
                </a>
                <span className="instant-contact-note">
                  Direct Line: <strong className="user-select-all">beyondsky@intheblackmedia.com</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
