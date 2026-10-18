export default function About() {
  return (
    <section className="about-section section-padding" id="about">
      <div className="container">
        <div className="section-badge-wrap">
          <span className="section-badge">
            <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            FLIGHT LOG & IDENTITY
          </span>
        </div>

        <div className="section-header text-center">
          <h2 className="section-title">
            Exploring the Fascinating <br /><span className="highlight-yellow">World of Aviation</span>
          </h2>
          <p className="section-lead">
            Engaging narratives and beautiful presentations that make complex aviation subjects accessible, entertaining, and unforgettable.
          </p>
        </div>

        {/* About Story Grid */}
        <div className="about-story-grid">
          {/* Left Column: Mission & Identity */}
          <div className="about-story-card glass-card">
            <div className="card-icon-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <h3 className="about-card-title">Our Mission</h3>
            <p className="about-card-text">
              At <strong>Beyond Sky</strong>, we believe every aircraft has a story—from the iconic rivalry between aerospace giants like <strong>Boeing and Airbus</strong> to the overlooked engineering masterstrokes and forgotten aviation legends.
            </p>
            <p className="about-card-text">
              We translate dense aerospace engineering, flight telemetry, regulatory disputes, and commercial aviation strategies into cinematic visual documentaries that captivate both seasoned commercial pilots and casual skywatchers.
            </p>
            <div className="quote-box">
              <span className="quote-mark">&ldquo;</span>
              <p>Our goal is to bring you engaging narratives and beautiful presentations that make complex aviation subjects accessible and entertaining. Subscribe to join us on this journey through the skies.</p>
              <span className="quote-author">— Beyond Sky Editorial</span>
            </div>
          </div>

          {/* Right Column: The 4 Pillars */}
          <div className="about-pillars-grid">
            <div className="pillar-box">
              <div className="pillar-number">01</div>
              <div className="pillar-content">
                <h4 className="pillar-title">Aviation History &amp; Forgotten Legends</h4>
                <p className="pillar-desc">Unearthing historical triumphs, pioneering aircraft designs, and dramatic historical milestones that defined modern flight.</p>
              </div>
            </div>

            <div className="pillar-box">
              <div className="pillar-number">02</div>
              <div className="pillar-content">
                <h4 className="pillar-title">The Commercial Battle for the Skies</h4>
                <p className="pillar-desc">Deep-dive investigative analysis into the duopolies, airline economics, delivery bottlenecks, and corporate warfare between Airbus &amp; Boeing.</p>
              </div>
            </div>

            <div className="pillar-box">
              <div className="pillar-number">03</div>
              <div className="pillar-content">
                <h4 className="pillar-title">Curious Facts &amp; Aerospace Engineering</h4>
                <p className="pillar-desc">Why do aircraft have folding wingtips? How do cargo freighters swallow locomotives? The surprising physics behind every rivet.</p>
              </div>
            </div>

            <div className="pillar-box">
              <div className="pillar-number">04</div>
              <div className="pillar-content">
                <h4 className="pillar-title">Next-Gen Industry Trends</h4>
                <p className="pillar-desc">Hydrogen flight, composite widebodies, supersonic travel resurgence, and the technological disruptions redefining the next century of skies.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Production Credentials Banner */}
        <div className="about-banner-footer glass-panel">
          <div className="partner-meta-item">
            <span className="meta-label">MEDIA NETWORK</span>
            <span className="meta-val">In The Black Media Network</span>
          </div>
          <div className="partner-divider"></div>
          <div className="partner-meta-item">
            <span className="meta-label">ESTABLISHED</span>
            <span className="meta-val">September 21, 2018</span>
          </div>
          <div className="partner-divider"></div>
          <div className="partner-meta-item">
            <span className="meta-label">GEOGRAPHIC BASE</span>
            <span className="meta-val">United States (Global Audience)</span>
          </div>
          <div className="partner-divider"></div>
          <div className="partner-meta-item">
            <span className="meta-label">CONTENT CADENCE</span>
            <span className="meta-val">Regular High-Production Drops</span>
          </div>
        </div>
      </div>
    </section>
  );
}
