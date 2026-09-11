import React, { useEffect } from 'react';
import { RESEARCH_AREAS, FACULTY_FB } from '../../data/fallback';
import Footer from '../Layout/Footer';
import './ResearchAreaDetail.css';

/** Normalize name: strip "Dr." / "Prof." prefix for fuzzy matching */
function findFaculty(memberName) {
  if (!memberName) return null;
  // Try exact match first
  let fac = FACULTY_FB.find(f => f.name === memberName);
  if (fac) return fac;
  // Try matching by stripping prefix on both sides
  const normalize = s => s.replace(/^(Dr\.|Prof\.|Professor)\s+/i, '').trim().toLowerCase();
  const target = normalize(memberName);
  return FACULTY_FB.find(f => {
    const fn = normalize(f.name);
    return fn === target || fn.startsWith(target + ' ') || fn.endsWith(' ' + target);
  }) || null;
}

/** Render text that has \n\n as proper paragraphs */
function RichText({ text }) {
  if (!text) return null;
  const blocks = text.split(/\n\n+/);
  return (
    <>
      {blocks.map((block, i) => {
        // Lines within a block separated by single \n → render as list or sub-paragraphs
        const lines = block.split(/\n/).filter(l => l.trim());
        if (lines.length === 0) return null;

        // If all lines are bullets
        if (lines.every(l => l.startsWith('• ') || l.startsWith('- '))) {
          return (
            <div key={i} className="rd-bullet-group" style={{ marginBottom: '16px' }}>
              {lines.map((line, j) => (
                <div key={j} className="rd-bullet-item">
                  <span className="rd-bullet-dot">✦</span>
                  <span className="rd-desc" style={{ marginBottom: 0 }}>{line.replace(/^[•\-]\s*/, '')}</span>
                </div>
              ))}
            </div>
          );
        }

        if (lines.length === 1) {
          const l = lines[0];
          if (l.startsWith('• ') || l.startsWith('- ')) {
            return (
              <div key={i} className="rd-bullet-item" style={{ marginBottom: '16px' }}>
                <span className="rd-bullet-dot">✦</span>
                <span className="rd-desc" style={{ marginBottom: 0 }}>{l.replace(/^[•\-]\s*/, '')}</span>
              </div>
            );
          }
          return <p key={i} className="rd-desc">{l}</p>;
        }

        // First line check
        const [heading, ...rest] = lines;
        if (heading.startsWith('• ') || heading.startsWith('- ')) {
          return (
            <div key={i} className="rd-bullet-group" style={{ marginBottom: '16px' }}>
              {lines.map((line, j) => (
                <div key={j} className="rd-bullet-item">
                  <span className="rd-bullet-dot">✦</span>
                  <span className="rd-desc" style={{ marginBottom: 0 }}>{line.replace(/^[•\-]\s*/, '')}</span>
                </div>
              ))}
            </div>
          );
        }

        return (
          <div key={i} className="rd-text-block">
            <h3 className="rd-sub-heading">{heading}</h3>
            {rest.map((line, j) => {
              if (line.startsWith('• ') || line.startsWith('- ')) {
                return (
                  <div key={j} className="rd-bullet-item">
                    <span className="rd-bullet-dot">✦</span>
                    <span className="rd-desc" style={{ marginBottom: 0 }}>{line.replace(/^[•\-]\s*/, '')}</span>
                  </div>
                );
              }
              return <p key={j} className="rd-desc rd-sub-desc">{line}</p>;
            })}
          </div>
        );
      })}
    </>
  );
}

const ALIAS_MAP = {
  'radio-astronomy': 'cosmology',
  'heliophysics': 'sun-heliosphere',
  'remote-sensing': 'space-weather',
  'space-engineering': 'instrumentation',
  'cosmology': 'cosmology',
  'data-science': 'data-science',
  'compact-objects': 'compact-objects',
  'compact-objects-and-transients': 'compact-objects',
  'compact-objects-transients': 'compact-objects',
  'galaxies-agn': 'galaxies-agn',
  'galaxies-active-galactic-nuclei': 'galaxies-agn',
  'galaxies-and-active-galactic-nuclei': 'galaxies-agn',
  'sun-heliosphere': 'sun-heliosphere',
  'solar-physics-and-space-weather': 'sun-heliosphere',
  'solar-physics-space-weather': 'sun-heliosphere',
  'space-weather': 'space-weather',
  'space-weather-atmospheric-science': 'space-weather',
  'instrumentation': 'instrumentation',
  'communication-navigation-remote-sensing': 'instrumentation',
};

export default function ResearchAreaDetail({ areaId, onNav }) {
  const resolvedId = ALIAS_MAP[areaId] || areaId;
  const area = RESEARCH_AREAS.find(r => r.id === resolvedId || r.id === areaId);

  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [areaId]);

  if (!area) {
    return (
      <div className="research-detail-page not-found">
        <div className="container">
          <h2>Research Area Not Found</h2>
          <button onClick={() => onNav('research')} className="btn btn-outline">← Back to Research Areas</button>
        </div>
      </div>
    );
  }

  return (
    <div className="research-detail-page fade-in">
      {/* Hero Section */}
      <div style={{ background: '#000f23', width: '100%', overflow: 'hidden' }}>
        <div className="rd-hero">
          <div className="rd-hero-bg" style={{ backgroundImage: `url("./${area.image}")` }}></div>
          <div className="rd-hero-overlay"></div>
          <div className="container rd-hero-content">
            <button onClick={() => onNav('research')} className="rd-back-link">
              <span className="rd-back-arrow">←</span> Back to Research Areas
            </button>
            <h1 className="rd-title">{area.title}</h1>
          </div>
        </div>
      </div>

      <div className="container rd-content-container">
        <div className="rd-main-content anim-fadeup" style={{ animationDelay: '0.1s' }}>
          <img 
            src={`./${area.image}`} 
            alt={area.title} 
            style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover', borderRadius: 'var(--r)', marginBottom: area.image_caption ? '12px' : '32px', boxShadow: 'var(--shadow-md)' }} 
          />
          {area.image_caption && (
            <p className="rd-image-caption" style={{ 
              color: 'var(--text-muted, #94a3b8)', 
              fontSize: '0.85rem', 
              marginTop: '0', 
              marginBottom: '32px', 
              textAlign: 'center',
              fontStyle: 'italic'
            }}>
              {area.image_caption}
            </p>
          )}
          <h2 className="rd-section-title">{area.section_title || 'AREA OF INTEREST'}</h2>
          <RichText text={area.full_description || area.desc} />
        </div>

        <div className="rd-sidebar">
          {area.faculty && area.faculty.length > 0 && (
            <div className="rd-card anim-fadeup" style={{ animationDelay: '0.2s' }}>
              <h3 className="rd-sidebar-title">FACULTY</h3>
              <ul className="rd-faculty-list">
                {area.faculty.map((member, i) => {
                  const fac = findFaculty(member);
                  const hasLink = fac && fac.url;
                  return (
                    <li key={i}>
                      {hasLink ? (
                        <a href={fac.url} target="_blank" rel="noopener noreferrer" className="faculty-member-link" title={`Open ${member}'s profile`}>
                          <div className="faculty-avatar">👤</div>
                          <div className="faculty-info">
                            <span className="faculty-name">{member}</span>
                            <span className="faculty-link-hint">View profile ↗</span>
                          </div>
                        </a>
                      ) : (
                        <div className="faculty-member-link faculty-no-link">
                          <div className="faculty-avatar">👤</div>
                          <span className="faculty-name">{member}</span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      <Footer onNav={onNav} />
    </div>
  );
}
