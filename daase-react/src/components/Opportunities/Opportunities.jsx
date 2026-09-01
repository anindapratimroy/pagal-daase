import { useState } from 'react';
import Footer from '../Layout/Footer';
import TiltCard from '../Layout/TiltCard';

const FUNDERS = [
  { icon: '🏛️', label: 'Ministry of Education (MoE)', href: 'https://www.education.gov.in' },
  { icon: '🔬', label: 'SERB — Science & Engineering Research Board', href: 'https://serb.gov.in' },
  { icon: '🏆', label: 'DST-FIST Research Grants', href: 'https://dst.gov.in' },
  { icon: '🚀', label: 'ISRO — RESPOND & Space Science', href: 'https://www.isro.gov.in' },
  { icon: '📡', label: 'SKA-India Consortium (SKA-IC)', href: 'https://www.ncra.tifr.res.in/skaindia' },
  { icon: '🌌', label: 'Max Planck Society (MPG)', href: 'https://www.mpg.de/en' },
  { icon: '🪐', label: 'NASA Planetary Science Division', href: 'https://www.nasa.gov' },
  { icon: '📡', label: 'IEEE Geoscience & Remote Sensing (GRSS)', href: 'https://www.grss-ieee.org' },
  { icon: '🔭', label: 'Astronomical Society of India (ASI)', href: 'https://astron-soc.in' },
];

const TABS = [
  { id: 'students', label: 'For Students', icon: '🎓' },
  { id: 'faculty',  label: 'For Faculty',  icon: '👨‍🏫' },
];

export default function Opportunities({ opportunities = [] }) {
  const [activeTab, setActiveTab] = useState('students');

  // Only active opportunities
  const activeOpps = opportunities.filter(o => {
    const s = (o.status || '').toString().toLowerCase().trim();
    return s === 'active';
  });

  // Split by type field ('student'/'faculty'). Default to 'students' if unspecified.
  const studentOpps = activeOpps.filter(o => {
    const t = (o.type || o.audience || '').toString().toLowerCase().trim();
    return t === '' || t === 'student' || t === 'students';
  });

  const facultyOpps = activeOpps.filter(o => {
    const t = (o.type || o.audience || '').toString().toLowerCase().trim();
    return t === 'faculty';
  });

  const displayOpps = activeTab === 'students' ? studentOpps : facultyOpps;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    if (dateStr.includes('T')) {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
      });
    }
    return dateStr;
  };

  return (
    <div>
      <div className="section-inner">
        {/* Opportunities header */}
        <div className="section-header">
          <span className="section-eyebrow">✦ Join Us</span>
          <h1 className="section-title">Open <span>Opportunities</span></h1>
          <div className="title-bar" />
        </div>

        {/* ── Tab Switcher ── */}
        <div className="opp-tabs-row">
          {TABS.map(tab => (
            <button
              key={tab.id}
              type="button"
              className={`opp-tab-btn${activeTab === tab.id ? ' opp-tab-btn--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="opp-tab-icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ── Opportunity Cards ── */}
        <div className="opp-grid">
          <div className="opp-list-container">
            {displayOpps.length > 0 ? displayOpps.map((opp, idx) => (
              <TiltCard key={idx} className="opp-card anim-fadeup" style={{ animationDelay: `${0.1 * idx}s` }}>
                {opp.tag && (
                  <div className="opp-badge">
                    {activeTab === 'faculty' ? '👨‍🏫' : '🎓'}&nbsp;&nbsp;{opp.tag}
                  </div>
                )}
                <h3 className="opp-title">{opp.title}</h3>
                <p className="opp-desc">{opp.desc}</p>
                {opp.eligibility && (
                  <div className="opp-eligibility">
                    <span className="opp-eligibility-label">Eligibility</span>
                    <span className="opp-eligibility-val">{opp.eligibility}</span>
                  </div>
                )}
                {opp.lastDate && (
                  <div className="opp-deadline">
                    <div>
                      <div className="opp-deadline-label">Last Date to Apply</div>
                      <div className="opp-deadline-date">{formatDate(opp.lastDate)}</div>
                    </div>
                  </div>
                )}
                {opp.applyLink && (
                  <>
                    <p style={{ fontSize: 13.5, color: '#F0F4FF', fontWeight: 600, letterSpacing: '0.02em', marginBottom: 20 }}>
                      Applications through the IIT Indore Academic Portal.
                    </p>
                    <a
                      href={opp.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Apply Now <span className="arrow">→</span>
                    </a>
                  </>
                )}
              </TiltCard>
            )) : (
              <div className="opp-empty-state">
                <div className="opp-empty-icon">
                  {activeTab === 'faculty' ? '👨‍🏫' : '🎓'}
                </div>
                <h3 className="opp-empty-title">
                  No Open Opportunities {activeTab === 'faculty' ? 'for Faculty' : 'for Students'} Right Now
                </h3>
                <p className="opp-empty-desc">
                  Please check back soon. New openings are posted when available and will appear here automatically.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Full-width Funding & Research Support Scroller */}
        <div className="funders-scroller-section">
          <div className="funders-header">
            <span className="section-eyebrow">✦ Support &amp; Grants</span>
            <h3 className="funders-scroller-title">Funding &amp; <span>Research Support</span></h3>
          </div>
          <div className="funders-marquee-container">
            <div className="funders-marquee-content">
              {[...FUNDERS, ...FUNDERS].map((f, idx) => (
                <a
                  key={idx}
                  href={f.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="funder-pill"
                >
                  <span className="funder-pill-icon">{f.icon}</span>
                  <span className="funder-pill-name">{f.label}</span>
                  <span className="funder-pill-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}


