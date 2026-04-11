import { useState } from 'react';
import Footer from '../Layout/Footer';
import { drivePhotoUrl } from '../../data/fallback';

function initials(name) {
  return name.replace(/Prof\.|Dr\./, '').trim().split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function FacultyCard({ f }) {
  const hasUrl = f.url && f.url.length > 0;
  const ini = initials(f.name);
  const photoSrc = f.photo ? (drivePhotoUrl(f.photo) || f.photo) : '';

  const inner = (
    <>
      <div className="fc-photo">
        {photoSrc && (
          <img src={photoSrc} alt={f.name} onError={e => { e.target.style.display = 'none'; }} />
        )}
        <div className="fc-photo-placeholder">{ini}</div>
        <div className="fc-photo-overlay" />
        <div className="fc-designation-badge">{f.designation}</div>
      </div>
      <div className="fc-body">
        {f.isHOD && <div className="hod-badge">Head of Department</div>}
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

export default function Faculty({ faculty, visiting }) {
  return (
    <div>
      <div className="section-inner">
        <div className="section-header">
          <span className="section-eyebrow">✦ Our Team</span>
          <h2 className="section-title">Faculty <span>Members</span></h2>
          <p className="section-desc">World-class researchers and educators leading the frontiers of astronomy, astrophysics, space science, and engineering.</p>
          <div className="title-bar" />
        </div>

        <div className="faculty-grid">
          {faculty.map((f, i) => (
            <div key={i} className="anim-fadeup" style={{ animationDelay: `${0.06 + i * 0.04}s` }}>
              <FacultyCard f={f} />
            </div>
          ))}
        </div>

        <div className="faculty-divider">
          Visiting &amp; Distinguished Faculty <span className="visiting-badge">Visiting Members</span>
        </div>

        <div className="faculty-grid">
          {visiting.map((f, i) => (
            <div key={i} className="anim-fadeup" style={{ animationDelay: `${0.06 + i * 0.06}s` }}>
              <FacultyCard f={f} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
