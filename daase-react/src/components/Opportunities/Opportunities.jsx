import { useState } from 'react';
import Footer from '../Layout/Footer';
import TiltCard from '../Layout/TiltCard';

const TABS = [
  { id: 'students', label: 'For Students', icon: '🎓' },
  { id: 'faculty',  label: 'For Faculty',  icon: '👨‍🏫' },
];

export default function Opportunities({ opportunities = [], onNav }) {
  const [activeTab, setActiveTab] = useState('students');

  // Only active opportunities for students
  const activeOpps = opportunities.filter(o => {
    const s = (o.status || '').toString().toLowerCase().trim();
    return s === 'active';
  });

  const studentOpps = activeOpps.filter(o => {
    const t = (o.type || o.audience || '').toString().toLowerCase().trim();
    return t === '' || t === 'student' || t === 'students';
  });

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

        {/* ── Opportunity Content ── */}
        <div className="opp-grid">
          <div className="opp-list-container">
            {activeTab === 'faculty' ? (
              <div className="opp-empty-state" style={{ padding: '48px 32px', textAlign: 'center' }}>
                <div className="opp-empty-icon" style={{ fontSize: '48px', marginBottom: '16px' }}>
                  👨‍🏫
                </div>
                <h3 className="opp-empty-title" style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
                  Faculty Positions
                </h3>
                <p className="opp-empty-desc" style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.85)', maxWidth: '580px', margin: '0 auto 24px', lineHeight: '1.7' }}>
                  No open positions and connect with the AASE office for more information.
                </p>
                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="mailto:aase-office@iiti.ac.in" className="btn-primary" style={{ padding: '10px 22px', fontSize: '14.5px' }}>
                    Connect with AASE Office ✉
                  </a>
                  <a href="https://www.iiti.ac.in/careers" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '10px 22px', fontSize: '14.5px' }}>
                    IIT Indore Careers Portal ↗
                  </a>
                </div>
              </div>
            ) : studentOpps.length > 0 ? (
              studentOpps.map((opp, idx) => (
                <TiltCard key={idx} className="opp-card anim-fadeup" style={{ animationDelay: `${0.1 * idx}s` }}>
                  {opp.tag && (
                    <div className="opp-badge">
                      🎓&nbsp;&nbsp;{opp.tag}
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
              ))
            ) : (
              <div className="opp-empty-state">
                <div className="opp-empty-icon">🎓</div>
                <h3 className="opp-empty-title">
                  No Open Opportunities for Students Right Now
                </h3>
                <p className="opp-empty-desc">
                  Please check back soon. New student research, project, and internship openings are posted when available.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
      <Footer onNav={onNav} />
    </div>
  );
}



