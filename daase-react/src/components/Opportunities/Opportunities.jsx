import { useState } from 'react';
import Footer from '../Layout/Footer';
import TiltCard from '../Layout/TiltCard';
import { classifyOpportunity, sortOpportunitiesByTier, OPP_TIER_CONFIG } from '../../utils/opportunityClassifier';

const TABS = [
  { id: 'students', label: 'Prospective Students', icon: '🎓' },
  { id: 'faculty',  label: 'Prospective Faculty',  icon: '👨‍🏫' },
];

export default function Opportunities({ studentOpportunities, teacherOpportunities, opportunities = [], onNav }) {
  const [activeTab, setActiveTab] = useState('students');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const isActive = (o) => {
    if (!o) return false;
    if (!o.status) return true;
    const s = o.status.toString().toLowerCase().trim();
    return s === 'active' || s === 'open';
  };

  // Derive Student Opportunities
  const rawStudentList = Array.isArray(studentOpportunities) && studentOpportunities.length > 0
    ? studentOpportunities
    : (opportunities || []).filter(o => {
        const t = (o.type || o.audience || '').toString().toLowerCase().trim();
        return t === '' || t === 'student' || t === 'students';
      });
  
  // Sort strictly by academic hierarchy: PhD -> JRF -> PG -> UG -> Other
  const allSortedStudentOpps = sortOpportunitiesByTier(rawStudentList.filter(isActive));

  // Available distinct tiers present with active openings
  const availableTiers = [
    { id: 'phd', label: 'Ph.D.', icon: '🎓', count: allSortedStudentOpps.filter(o => classifyOpportunity(o).id === 'phd').length },
    { id: 'jrf', label: 'JRF',  icon: '🔬', count: allSortedStudentOpps.filter(o => classifyOpportunity(o).id === 'jrf').length },
    { id: 'pg',  label: 'PG',   icon: '📚', count: allSortedStudentOpps.filter(o => classifyOpportunity(o).id === 'pg').length },
    { id: 'ug',  label: 'UG',   icon: '💻', count: allSortedStudentOpps.filter(o => classifyOpportunity(o).id === 'ug').length },
  ].filter(t => t.count > 0);

  // Filter based on selected academic level
  const studentOpps = selectedLevel === 'all'
    ? allSortedStudentOpps
    : allSortedStudentOpps.filter(o => classifyOpportunity(o).id === selectedLevel);

  // Derive Teacher / Faculty Opportunities
  const rawTeacherList = Array.isArray(teacherOpportunities) && teacherOpportunities.length > 0
    ? teacherOpportunities
    : (opportunities || []).filter(o => {
        const t = (o.type || o.audience || '').toString().toLowerCase().trim();
        return t === 'faculty' || t === 'teacher' || t === 'teachers';
      });
  const teacherOpps = rawTeacherList.filter(isActive);

  const tabs = [
    { id: 'students', label: 'Prospective Students', icon: '🎓', count: allSortedStudentOpps.length },
    { id: 'faculty',  label: 'Prospective Faculty',  icon: '👨‍🏫', count: teacherOpps.length },
  ];

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    if (dateStr.includes('T')) {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
      });
    }
    return dateStr;
  };

  const renderOppCards = (list, defaultTag, isFaculty = false) => {
    let lastTierId = null;

    return list.map((opp, idx) => {
      const tierInfo = isFaculty ? null : classifyOpportunity(opp);
      const isNewTier = !isFaculty && availableTiers.length > 1 && selectedLevel === 'all' && tierInfo && tierInfo.id !== lastTierId;
      if (!isFaculty && tierInfo) {
        lastTierId = tierInfo.id;
      }

      const tagText = opp.tag || opp.category || (tierInfo ? tierInfo.shortLabel : defaultTag);
      const applyUrl = opp.applyLink || opp.link || opp.url;
      const deadline = opp.lastDate || opp.deadline;
      const descText = opp.desc || opp.description;
      const eligibility = opp.eligibility || opp.qualifications;

      return (
        <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {isNewTier && (
            <div className="opp-tier-section-header">
              <span className="opp-tier-section-icon">{tierInfo.icon}</span>
              <span className="opp-tier-section-title">{tierInfo.label}</span>
              <span className="opp-tier-section-badge">
                {list.filter(o => classifyOpportunity(o).id === tierInfo.id).length} Open
              </span>
            </div>
          )}
          <TiltCard className="opp-card anim-fadeup" style={{ animationDelay: `${0.08 * (idx % 8)}s` }}>
            {tierInfo ? (
              <div
                className="opp-badge"
                style={{
                  background: tierInfo.bgColor,
                  borderColor: tierInfo.borderColor,
                  color: tierInfo.color,
                }}
              >
                <span>{tierInfo.icon}</span>&nbsp;&nbsp;{tierInfo.label}
                {opp.tag && opp.tag.toLowerCase() !== tierInfo.shortLabel.toLowerCase() && (
                  <span style={{ opacity: 0.85, fontWeight: 500, marginLeft: '6px' }}>• {opp.tag}</span>
                )}
              </div>
            ) : tagText ? (
              <div className="opp-badge">
                👨‍🏫&nbsp;&nbsp;{tagText}
              </div>
            ) : null}
            <h3 className="opp-title">{opp.title}</h3>
            {descText && <p className="opp-desc">{descText}</p>}
          
          {eligibility && (
            <div className="opp-eligibility">
              <span className="opp-eligibility-label">Eligibility &amp; Criteria</span>
              <span className="opp-eligibility-val">{eligibility}</span>
            </div>
          )}

          {deadline && (
            <div className="opp-deadline">
              <div>
                <div className="opp-deadline-label">Last Date to Apply</div>
                <div className="opp-deadline-date">{formatDate(deadline)}</div>
              </div>
            </div>
          )}

          {applyUrl ? (
            <>
              <p style={{ fontSize: 13.5, color: '#F0F4FF', fontWeight: 600, letterSpacing: '0.02em', marginBottom: 20 }}>
                {isFaculty
                  ? 'Applications through the IIT Indore Faculty Recruitment Portal.'
                  : 'Applications through the IIT Indore Academic Portal.'}
              </p>
              <a
                href={applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Apply Now <span className="arrow">→</span>
              </a>
            </>
          ) : (
            <div style={{ marginTop: '16px' }}>
              <a
                href="mailto:aase-office@iiti.ac.in"
                className="btn-outline"
                style={{ fontSize: '13.5px', padding: '8px 18px' }}
              >
                Contact Dept. Office for Inquiries ✉
              </a>
            </div>
          )}
        </TiltCard>
      </div>
      );
    });
  };

  return (
    <div>
      <div className="section-inner">
        {/* Opportunities header */}
        <div className="section-header">
          <h1 className="section-title">Open <span>Opportunities</span></h1>
          <div className="title-bar" />
        </div>

        {/* ── Tab Switcher ── */}
        <div className="opp-tabs-row">
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              className={`opp-tab-btn${activeTab === tab.id ? ' opp-tab-btn--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="opp-tab-icon">{tab.icon}</span>
              <span>{tab.label}</span>
              <span className="opp-tab-count" style={{
                marginLeft: '6px',
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '10px',
                background: activeTab === tab.id ? '#0b1528' : 'rgba(255,255,255,0.12)',
                color: activeTab === tab.id ? '#ffd97a' : 'rgba(255,255,255,0.85)',
                fontWeight: 700
              }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── Filter Pills (only when multiple active categories exist) ── */}
        {activeTab === 'students' && availableTiers.length > 1 && (
          <div className="opp-tier-filter-wrap anim-fadeup">
            <div className="opp-tier-pill-group">
              <button
                type="button"
                className={`opp-tier-pill${selectedLevel === 'all' ? ' opp-tier-pill--active' : ''}`}
                onClick={() => setSelectedLevel('all')}
              >
                <span>All</span>
                <span className="opp-tier-count">{allSortedStudentOpps.length}</span>
              </button>
              {availableTiers.map(tier => (
                <button
                  key={tier.id}
                  type="button"
                  className={`opp-tier-pill${selectedLevel === tier.id ? ' opp-tier-pill--active' : ''}`}
                  onClick={() => setSelectedLevel(tier.id)}
                >
                  <span>{tier.icon}&nbsp;&nbsp;{tier.label}</span>
                  <span className="opp-tier-count">{tier.count}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Opportunity Content ── */}
        <div className="opp-grid">
          <div className="opp-list-container">
            {activeTab === 'faculty' ? (
              teacherOpps.length > 0 ? (
                <>
                  {renderOppCards(teacherOpps, 'FACULTY RECRUITMENT', true)}
                  <div style={{ marginTop: '32px', textAlign: 'center' }}>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '12px' }}>
                      Interested in special joint faculty or visiting appointments?
                    </p>
                    <a
                      href="https://www.iiti.ac.in/careers"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                      style={{ fontSize: '13.5px', padding: '8px 20px' }}
                    >
                      IIT Indore Careers Portal ↗
                    </a>
                  </div>
                </>
              ) : (
                <div className="opp-empty-state" style={{ padding: '60px 32px', textAlign: 'center' }}>
                  <div className="opp-empty-icon" style={{ fontSize: '48px', marginBottom: '24px' }}>
                    👨‍🏫
                  </div>
                  <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="mailto:aase-office@iiti.ac.in" className="btn-primary" style={{ padding: '10px 22px', fontSize: '14.5px' }}>
                      Connect with AASE Office ✉
                    </a>
                    <a href="https://www.iiti.ac.in/careers" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '10px 22px', fontSize: '14.5px' }}>
                      IIT Indore Careers Portal ↗
                    </a>
                  </div>
                </div>
              )
            ) : studentOpps.length > 0 ? (
              renderOppCards(studentOpps, 'STUDENT OPPORTUNITY', false)
            ) : (
              <div className="opp-empty-state" style={{ padding: '48px 32px', textAlign: 'center' }}>
                <div className="opp-empty-icon" style={{ fontSize: '48px', marginBottom: '16px' }}>
                  🎓
                </div>
                <h3 className="opp-empty-title" style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
                  Prospective Students
                </h3>
                <p className="opp-empty-desc" style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.85)', maxWidth: '580px', margin: '0 auto 24px', lineHeight: '1.7' }}>
                  No open positions and connect with the AASE office for more information.
                </p>
                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="mailto:aase-office@iiti.ac.in" className="btn-primary" style={{ padding: '10px 22px', fontSize: '14.5px' }}>
                    Connect with AASE Office ✉
                  </a>
                  <a href="https://academic.iiti.ac.in" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '10px 22px', fontSize: '14.5px' }}>
                    IIT Indore Academic Portal ↗
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
      <Footer onNav={onNav} />
    </div>
  );
}



