import Image from "next/image";

export default function Team() {
  const teamMembers = [
    {
      name: "Alex Vance",
      role: "Creator, Lead Host & Executive Producer",
      rank: "FLIGHT DIRECTOR",
      photo: "/assets/team_alex.jpg",
      bio: "Licensed private pilot and aviation storyteller. Alex founded Beyond Sky to turn complex aircraft engineering and industry rivalry into compelling cinematic experiences.",
      favAircraft: 'Boeing 747-400 "Queen of the Skies"'
    },
    {
      name: "Dr. Elena Rostova",
      role: "Senior Aerospace Researcher & Historian",
      rank: "CHIEF NAVIGATOR",
      photo: "/assets/team_elena.jpg",
      bio: "Aerospace archivist specializing in Cold War aeronautics and commercial jet development. Elena leads fact-checking, technical deconstruction, and primary document sourcing.",
      favAircraft: "Concorde & Airbus A350-1000"
    },
    {
      name: "Marcus Chen",
      role: "3D Motion Lead & Aircraft Visualizer",
      rank: "AVIONICS VFX LEAD",
      photo: "/assets/team_marcus.jpg",
      bio: "Master 3D modeler bringing aircraft blueprints, folding wingtips, and internal engine turbine cut-aways to life with photorealistic clarity and cinematic precision.",
      favAircraft: "Airbus A380-800 & SR-71 Blackbird"
    },
    {
      name: "Sarah Jenkins",
      role: "Podcast Producer & Master Audio Designer",
      rank: "COMMUNICATIONS LEAD",
      photo: "/assets/team_sarah.jpg",
      bio: "Audio engineer crafting the atmospheric soundscapes of our Spotify show. Sarah blends real cockpit recordings, ATC chatter, and orchestral music for complete acoustic immersion.",
      favAircraft: "Boeing 777-300ER (GE90 Roar)"
    }
  ];

  return (
    <section className="team-section section-padding" id="team">
      <div className="container">
        <div className="section-badge-wrap">
          <span className="section-badge">
            <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            FLIGHT CREW
          </span>
        </div>

        <div className="section-header text-center">
          <h2 className="section-title">
            The Crew Behind <br /><span className="highlight-yellow">Beyond Sky</span>
          </h2>
          <p className="section-lead">
            Meet the aviation researchers, historians, animators, and sound designers bringing the wonder of flight to millions of viewers.
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="team-card glass-panel">
              <div className="member-photo-frame">
                <Image
                  src={member.photo}
                  alt={`${member.name} - ${member.role}`}
                  width={300}
                  height={300}
                  className="member-photo"
                />
                <div className="crew-rank-badge">{member.rank}</div>
              </div>
              <div className="member-details">
                <h3 className="member-name">{member.name}</h3>
                <span className="member-role">{member.role}</span>
                <p className="member-bio">{member.bio}</p>
                <div className="member-aircraft-pill">
                  <span className="pill-label">FAVORITE AIRCRAFT:</span>
                  <span className="pill-value">{member.favAircraft}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
