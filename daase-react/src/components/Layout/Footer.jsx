const COLLABS = [
  { href: 'https://skaindia.ncra.tifr.res.in', label: 'SKA-IC' },
  { href: 'https://www.grss-ieee.org', label: 'GRSS-IEEE' },
  { href: 'https://ieeeaps.org', label: 'APS-IEEE' },
  { href: 'https://www.astron-soc.in', label: 'ASI' },
  { href: 'https://www.iau.org', label: 'IAU' },
  { href: 'https://www.isro.gov.in', label: 'ISRO Missions' },
  { href: 'https://www.nasa.gov', label: 'NASA Collaborations' },
  { href: 'https://www.mpg.de', label: 'Max Planck Group' },
];

export default function Footer() {
  return (
    <>
      <div className="section-inner" style={{ paddingTop: 60, paddingBottom: 20 }}>
        <div className="section-header" style={{ marginBottom: 28 }}>
          <span className="section-eyebrow">✦ Get in Touch</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(20px,2.8vw,30px)' }}>Contact <span>Us</span></h2>
          <div className="title-bar" />
        </div>

        <div className="contact-grid">
          <div className="contact-info anim-fadeup d1">
            <div className="contact-item">
              <div className="ci-icon">📍</div>
              <div>
                <div className="ci-label">Campus Address</div>
                <div className="ci-value">
                  Department of Astronomy, Astrophysics and Space Engineering (DAASE),<br />
                  Indian Institute of Technology Indore,<br />
                  Khandwa Road, Simrol, Indore 453552, MP, India
                </div>
              </div>
            </div>
            <div className="contact-item">
              <div className="ci-icon">📧</div>
              <div>
                <div className="ci-label">Email</div>
                <div className="ci-value">
                  <a href="mailto:hodaase@iiti.ac.in">hodaase@iiti.ac.in</a> &nbsp;(Head of Department)<br />
                  <a href="mailto:aase-office@iiti.ac.in">aase-office@iiti.ac.in</a> &nbsp;(Department Office)
                </div>
              </div>
            </div>
            <div className="contact-item">
              <div className="ci-icon">🌐</div>
              <div>
                <div className="ci-label">Institute</div>
                <div className="ci-value">
                  <a href="https://www.iiti.ac.in" target="_blank" rel="noopener noreferrer">www.iiti.ac.in</a>
                  &nbsp;|&nbsp;
                  <a href="https://academic.iiti.ac.in" target="_blank" rel="noopener noreferrer">academic.iiti.ac.in</a>
                </div>
              </div>
            </div>

            <div className="collab-section">
              <div className="collab-title">Professional Memberships</div>
              <div className="collab-grid">
                {COLLABS.map(c => (
                  <a key={c.href} href={c.href} target="_blank" rel="noopener noreferrer" className="collab-tag">
                    {c.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="anim-fadeup d2">
            <div className="map-wrapper">
              <iframe
                src="https://maps.google.com/maps?q=GWHF%2BF9C,+Indore,+Madhya+Pradesh+453552&t=&z=15&ie=UTF8&iwloc=&output=embed"
                title="IIT Indore Map"
                loading="lazy"
                allowFullScreen
              />
              <div className="map-overlay">
                <div className="map-overlay-content">
                  <div className="map-overlay-title">IIT Indore — DAASE</div>
                  <div className="map-overlay-addr">GWHF+F9C, Indore, Madhya Pradesh 453552</div>
                  <a
                    href="https://maps.google.com/?q=GWHF%2BF9C,+Indore,+Madhya+Pradesh+453552"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ fontSize: 11, padding: '9px 20px' }}
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-footer">
        <div className="footer-inner">
          <div className="footer-copyright">Copyright &copy; 2022–2026 DAASE, IIT Indore. All rights reserved.</div>
          <div className="footer-creator">
            ✦ &nbsp;
            <span>Website created by: <strong>Aninda Pratim Roy</strong>, M.Tech Space Engineering, IIT Indore</span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
            <a href="mailto:mt2502121016@iiti.ac.in">mt2502121016@iiti.ac.in</a>
          </div>
        </div>
      </div>
    </>
  );
}
