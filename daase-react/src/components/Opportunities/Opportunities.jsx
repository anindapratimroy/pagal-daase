import Footer from '../Layout/Footer';

const FUNDERS = [
  { href: 'https://www.education.gov.in', label: 'Ministry of Education (MoE) ↗' },
  { href: 'https://www.ugc.gov.in', label: 'UGC ↗' },
  { href: 'https://anrf.gov.in', label: 'ANRF / SERB ↗' },
  { href: 'https://dst.gov.in', label: 'DST (DST-FIST) ↗' },
  { href: 'https://moes.gov.in', label: 'MoES ↗' },
  { href: 'https://www.csir.res.in', label: 'CSIR ↗' },
  { href: 'https://sparc.iitkgp.ac.in', label: 'SPARC ↗' },
  { href: 'https://dae.gov.in', label: 'DAE ↗' },
  { href: 'https://www.isro.gov.in', label: 'ISRO ↗' },
  { href: 'https://www.mpg.de', label: 'Max Planck Partner Group ↗' },
  { href: 'https://www.asemduo.org', label: 'ASEM-DUO ↗' },
];



export default function Opportunities() {
  return (
    <div>
      <div className="section-inner">
        {/* Opportunities header */}
        <div className="section-header">
          <span className="section-eyebrow">✦ Join Us</span>
          <h2 className="section-title">Open <span>Opportunities</span></h2>
          <div className="title-bar" />
        </div>

        <div className="opp-grid">
          {/* PhD card */}
          <div className="opp-card anim-fadeup d1">
            <div className="opp-badge">🎓 &nbsp;PhD Admissions Open</div>
            <h3 className="opp-title">Ph.D. Positions — Open Call</h3>
            <p className="opp-desc">
              Applications are invited from highly motivated students for the Ph.D. program at DAASE.
              We seek passionate individuals with strong backgrounds in physics, mathematics, engineering,
              or related disciplines who are ready to pursue cutting-edge research.
            </p>
            <div className="opp-deadline">
              <div>
                <div className="opp-deadline-label">Last Date to Apply</div>
                <div className="opp-deadline-date">November 1, 2025</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
              Applications through the IIT Indore Academic Portal.
            </p>
            <a
              href="https://academic.iiti.ac.in/phdadvt.php"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Apply Now <span className="arrow">→</span>
            </a>
          </div>

          {/* Funding card */}
          <div className="funding-card anim-fadeup d2">
            <div className="funding-title">Funding &amp; Support</div>
            <div className="funder-list">
              {FUNDERS.map(f => (
                <a key={f.href} href={f.href} target="_blank" rel="noopener noreferrer" className="funder-item">
                  {f.label}
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
