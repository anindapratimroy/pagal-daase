import { useState } from 'react';
import Footer from '../Layout/Footer';
import { drivePhotoUrl } from '../../data/fallback';
import { imageMap } from '../../data/imageMap';



function FacultyCard({ f }) {
  const hasUrl = f.url && f.url.length > 0;
  const photoSrc = imageMap[f.name] || (f.photo ? (drivePhotoUrl(f.photo) || f.photo) : '');

  const inner = (
    <>
      <div className="fc-photo">
        <img src={photoSrc || "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239ca3af'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E"} alt={f.name} onError={e => { e.target.onerror = null; e.target.src = "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239ca3af'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E"; e.target.style.padding = '30px'; e.target.style.background = '#f3f4f6'; }} />
        <div className="fc-photo-overlay" />
        <div className="fc-designation-badge">{f.designation}</div>
      </div>
      <div className="fc-body">
        {f.isHOD && <div className="hod-badge">Head of Department</div>}
        {f.isDean && <div className="hod-badge">Dean, Research & Development</div>}
        <div className="fc-name">{f.name}</div>
        <div className="fc-research">{f.research}</div>
        {f.email
          ? <div className="fc-email">✉ {f.email}@iiti.ac.in</div>
          : <div className="fc-email" style={{ color: 'var(--text-light)' }}>✉ Contact via Dept. Office</div>
        }
      </div>
    </>
  );

  if (hasUrl) {
    return (
      <a href={f.url} target="_blank" rel="noopener noreferrer"
        className={`faculty-card${f.isHOD ? ' hod-card' : ''}`}>
        {inner}
      </a>
    );
  }
  return (
    <div className={`faculty-card no-link-card${f.isHOD ? ' hod-card' : ''}`}>
      {inner}
    </div>
  );
}

const cleanName = (name) => {
  if (!name) return '';
  return name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
};

const sortByName = (list) => {
  if (!list) return [];
  return [...list].sort((a, b) => cleanName(a.name).localeCompare(cleanName(b.name)));
};

export default function Faculty({ faculty, visiting, staff }) {
  const sortedFaculty = sortByName(faculty);
  const sortedVisiting = sortByName(visiting);
  const sortedStaff = staff ? sortByName(staff) : [];

  return (
    <div>
      <div className="section-inner">
        <div className="section-header">
          <span className="section-eyebrow">✦ Our Team</span>
          <h1 className="section-title">Faculty <span>Members</span></h1>
          <p className="section-desc">World-class researchers and educators leading the frontiers of astronomy, astrophysics, space science, and engineering.</p>
          <div className="title-bar" />
        </div>

        <div className="faculty-grid">
          {sortedFaculty.map((f, i) => (
            <div key={i} className="anim-fadeup" style={{ animationDelay: `${0.06 + i * 0.04}s` }}>
              <FacultyCard f={f} />
            </div>
          ))}
        </div>

        <div className="faculty-divider">
          Visiting &amp; Distinguished Faculty <span className="visiting-badge">Visiting Members</span>
        </div>

        <div className="faculty-grid" style={{ marginBottom: '80px' }}>
          {sortedVisiting.map((f, i) => (
            <div key={i} className="anim-fadeup" style={{ animationDelay: `${0.06 + i * 0.06}s` }}>
              <FacultyCard f={f} />
            </div>
          ))}
        </div>

        {sortedStaff && sortedStaff.length > 0 && (
          <>
            <div className="faculty-divider">
              Technical &amp; Support Staff <span className="visiting-badge" style={{ background: 'var(--navy)', color: '#fff' }}>HOD Office</span>
            </div>
            <div className="faculty-grid">
              {sortedStaff.map((f, i) => (
                <div key={i} className="anim-fadeup" style={{ animationDelay: `${0.06 + i * 0.06}s` }}>
                  <FacultyCard f={f} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
