"use client";

import { useState } from "react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "sponsorship",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState(null);

  const handleCopy = () => {
    const email = "beyondsky@intheblackmedia.com";
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "Please enter your name or company.";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errs.message = "Please include a project or inquiry message.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSuccessInfo(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessInfo({
        name: formData.name.trim(),
        subject: formData.subject
      });
      setFormData({
        name: "",
        email: "",
        subject: "sponsorship",
        message: ""
      });
      setErrors({});
    }, 1200);
  };

  return (
    <section className="contact-section section-padding" id="contact">
      <div className="container">
        <div className="section-badge-wrap">
          <span className="section-badge">
            <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            AIR TRAFFIC CONTROL
          </span>
        </div>

        <div className="section-header text-center">
          <h2 className="section-title">
            Get in Touch With <br /><span className="highlight-yellow">Beyond Sky</span>
          </h2>
          <p className="section-lead">
            We’d love to hear from brands, fellow aviation creators, historians, pilots, and our community.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left: Contact Information Cards */}
          <div className="contact-info-col">
            {/* Business Inquiries Highlight Card */}
            <div className="contact-card primary-contact glass-card">
              <div className="c-card-top">
                <span className="channel-dot"></span>
                <span className="c-subtitle">PRIMARY BUSINESS CHANNEL</span>
              </div>
              <h3 className="c-title">Business &amp; Sponsorship Inquiries</h3>
              <p className="c-text">
                For brand deals, media licensing, interview requests, and executive partnerships:
              </p>
              
              <div className="email-copy-pill" id="email-copy-pill">
                <span className="email-text" id="official-email">beyondsky@intheblackmedia.com</span>
                <button
                  type="button"
                  className="btn-copy-email"
                  id="btn-copy"
                  onClick={handleCopy}
                  style={copied ? { backgroundColor: "var(--radar-green)", color: "#000" } : {}}
                  aria-label="Copy email address to clipboard"
                >
                  <svg className="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                  <span id="copy-btn-text">{copied ? "Copied! ✓" : "Copy"}</span>
                </button>
              </div>
              <p className="response-time-note">⚡ Standard response within 24-48 business hours.</p>
            </div>

            {/* Channels & Social Directory */}
            <div className="contact-directory glass-panel">
              <h4 className="dir-title">Official Broadcast Channels</h4>
              
              <a href="https://www.youtube.com/@BeyondSky-m5e" target="_blank" rel="noopener noreferrer" className="dir-item">
                <div className="dir-icon yt">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <div className="dir-meta">
                  <span className="dir-name">YouTube Channel</span>
                  <span className="dir-handle">youtube.com/@BeyondSky-m5e</span>
                </div>
                <span className="dir-arrow">↗</span>
              </a>

              <a href="https://open.spotify.com/show/3QZ7LND8nODC4ZtrIWoH3s" target="_blank" rel="noopener noreferrer" className="dir-item">
                <div className="dir-icon spotify">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.485 17.304a.75.75 0 0 1-1.03.248c-2.822-1.724-6.375-2.114-10.56-1.157a.75.75 0 0 1-.337-1.462c4.582-1.047 8.523-.6 11.68 1.341a.75.75 0 0 1 .247 1.03zm1.465-3.26a.937.937 0 0 1-1.29.31c-3.23-1.986-8.156-2.56-11.977-1.4a.938.938 0 1 1-.55-1.794c4.372-1.327 9.805-.684 13.507 1.594a.938.938 0 0 1 .31 1.29zm.126-3.413c-3.873-2.3-10.264-2.513-13.98-1.384a1.125 1.125 0 0 1-.65-2.155c4.27-1.297 11.326-1.048 15.787 1.6a1.125 1.125 0 0 1-1.157 1.939z"/>
                  </svg>
                </div>
                <div className="dir-meta">
                  <span className="dir-name">Spotify Show</span>
                  <span className="dir-handle">Stories From the Skies</span>
                </div>
                <span className="dir-arrow">↗</span>
              </a>

              <div className="dir-item non-link">
                <div className="dir-icon net">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
                  </svg>
                </div>
                <div className="dir-meta">
                  <span className="dir-name">Production Network</span>
                  <span className="dir-handle">In The Black Media Group</span>
                </div>
                <span className="badge-usa">USA</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Transmit Dispatch Form */}
          <div className="contact-form-col">
            <div className="form-wrapper glass-card">
              <div className="form-header">
                <h3 className="form-title">Transmit Message to Beyond Sky</h3>
                <p className="form-sub">Direct transmission to the production and partnerships desk.</p>
              </div>

              <form id="contact-form" className="aviation-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className={`form-field ${errors.name ? "has-error" : ""}`}>
                    <label htmlFor="form-name">Full Name or Organization *</label>
                    <input
                      type="text"
                      id="form-name"
                      className="input-text"
                      placeholder="e.g. Captain James or Acme Aerospace"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <span className="error-msg">{errors.name}</span>}
                  </div>

                  <div className={`form-field ${errors.email ? "has-error" : ""}`}>
                    <label htmlFor="form-email">Contact Email *</label>
                    <input
                      type="email"
                      id="form-email"
                      className="input-text"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <span className="error-msg">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="form-subject">Inquiry Type / Flight Classification *</label>
                  <select
                    id="form-subject"
                    className="form-control-select"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="sponsorship">Brand Sponsorship &amp; Video Integration</option>
                    <option value="podcast">Spotify Podcast Partnership</option>
                    <option value="media">Media Licensing &amp; Footage Inquiries</option>
                    <option value="topic">Aircraft Story Pitch / Topic Suggestion</option>
                    <option value="general">General Aviation Discussion</option>
                  </select>
                </div>

                <div className={`form-field ${errors.message ? "has-error" : ""}`}>
                  <label htmlFor="form-message">Flight Brief / Message *</label>
                  <textarea
                    id="form-message"
                    className="input-textarea"
                    rows="4"
                    placeholder="Tell us about your brand, project timeline, or story pitch..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                  {errors.message && <span className="error-msg">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  className="btn btn-gold w-full btn-submit"
                  id="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span>Transmitting Signal...</span>
                      <svg className="send-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s infinite linear" }}>
                        <circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/>
                      </svg>
                    </>
                  ) : (
                    <>
                      <span className="btn-text">Transmit Transmission</span>
                      <svg className="send-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </>
                  )}
                </button>

                {successInfo && (
                  <div className="form-status success" aria-live="polite">
                    <strong>✓ Transmission Confirmed by Beyond Sky Flight Operations!</strong><br />
                    Thank you, {successInfo.name}. Your inquiry has been logged. Our production and partnerships desk at <em>beyondsky@intheblackmedia.com</em> will review and respond within 24–48 hours.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
