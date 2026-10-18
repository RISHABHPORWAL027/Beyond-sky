"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function EpisodeModal({ episode, onClose }) {
  useEffect(() => {
    if (!episode) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [episode, onClose]);

  if (!episode) return null;

  return (
    <div
      className="modal-backdrop open"
      id="episode-modal"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-box glass-card">
        <button
          className="modal-close-btn"
          id="modal-close"
          aria-label="Close Preview Modal"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="modal-body" id="modal-content">
          <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", marginBottom: "1.25rem", borderRadius: "12px", overflow: "hidden" }}>
            <Image
              src={episode.image}
              alt={episode.title}
              fill
              style={{ objectFit: "cover" }}
              className="modal-hero-img"
            />
          </div>
          <span className="modal-tag">{episode.tag}</span>
          <h3 className="modal-title">{episode.title}</h3>
          <p className="modal-text">{episode.description}</p>
          
          {episode.chapters && episode.chapters.length > 0 && (
            <div className="modal-chapters-list">
              <h5>FLIGHT LOG CHAPTERS</h5>
              {episode.chapters.map((ch, idx) => (
                <div key={idx} className="chapter-item">
                  <span className="chapter-time">{ch.time}</span>
                  <span className="chapter-title">{ch.title}</span>
                </div>
              ))}
            </div>
          )}

          <a
            href={episode.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold w-full"
          >
            <span>{episode.linkText}</span>
            <svg className="icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
