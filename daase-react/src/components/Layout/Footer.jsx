const COLLABS = [
  { href: 'https://www.ncra.tifr.res.in/skaindia', label: 'SKA-IC' },
  { href: 'https://www.grss-ieee.org', label: 'GRSS-IEEE' },
  { href: 'https://ieeeaps.org', label: 'APS-IEEE' },
  { href: 'https://astron-soc.in', label: 'ASI' },
  { href: 'https://www.iau.org', label: 'IAU' },
  { href: 'https://www.isro.gov.in', label: 'ISRO Missions' },
  { href: 'https://www.nasa.gov', label: 'NASA Collaborations' },
  { href: 'https://www.mpg.de/en', label: 'Max Planck Group' },
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.093!2d75.923391!3d22.528688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDMxJzQzLjMiTiA3NcKwNTUnMjQuMiJF!5e0!3m2!1sen!2sin!4v1716976200000"
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
            <span style={{ color: 'var(--gold-light)' }}>✦</span>
            <span>
              Website created by: <a href="https://www.linkedin.com/in/aninda-pratim-roy" target="_blank" rel="noopener noreferrer">Aninda Pratim Roy</a> and <a href="https://www.linkedin.com/in/vidhan-thakur27" target="_blank" rel="noopener noreferrer">Vidhan Thakur</a>
              <span className="footer-divider"> | </span>
              M.Tech Space Engineering, IIT Indore &amp; BS CSDA, IIT Patna
              <span className="footer-divider"> | </span>
              <a href="mailto:mt2502121016@iiti.ac.in" className="footer-email">mt2502121016@iiti.ac.in</a>
              <span className="footer-divider">, </span>
              <a href="mailto:vidhan_2312res733@iitp.ac.in" className="footer-email">vidhan_2312res733@iitp.ac.in</a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
