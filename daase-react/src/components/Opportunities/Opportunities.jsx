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

export default function Opportunities({ opportunities = [] }) {
  // Only show active opportunities
  const activeOpps = opportunities.filter(o => {
    const s = (o.status || '').toString().toLowerCase().trim();
    return s === 'active';
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

        <div className="opp-grid">
          {/* Dynamic Opportunities */}
          <div className="opp-list-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {activeOpps.length > 0 ? activeOpps.map((opp, idx) => (
              <TiltCard key={idx} className="opp-card anim-fadeup" style={{ animationDelay: `${0.1 * idx}s` }}>
                {opp.tag && (
                  <div className="opp-badge">🎓 &nbsp;{opp.tag}</div>
                )}
                <h3 className="opp-title">{opp.title}</h3>
                <p className="opp-desc">{opp.desc}</p>
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
              <div className="opp-card anim-fadeup" style={{ textAlign: 'center', padding: '40px' }}>
                <h3 className="opp-title">No Open Opportunities</h3>
                <p className="opp-desc" style={{ marginBottom: 0 }}>Please check back later for new openings.</p>
              </div>
            )}
          </div>
        </div>

        {/* Full-width Funding & Research Support Scroller (Left to Right) */}
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
