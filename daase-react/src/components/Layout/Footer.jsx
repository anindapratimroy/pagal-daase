import { useState } from 'react';

const QUICK_LINKS = [
  { id: 'home',           label: 'Home' },
  { id: 'people-faculty', label: 'Faculty & Researchers' },
  { id: 'people-staff',   label: 'Technical & Office Staff' },
  { id: 'people-phd',     label: 'Ph.D. Scholars' },
  { id: 'programs',       label: 'Degree Programs' },
  { id: 'research',       label: 'Research Areas' },
  { id: 'facilities',     label: 'Labs & Facilities' },
  { id: 'events',         label: 'Events & Workshops' },
  { id: 'gallery',        label: 'Photo Gallery' },
  { id: 'opportunities',  label: 'Opportunities' },
];

const INSTITUTE_LINKS = [
  { href: 'https://www.iiti.ac.in',               label: 'IIT Indore Main Portal' },
  { href: 'https://academic.iiti.ac.in',          label: 'Academic Affairs Portal' },
  { href: 'https://academic.iiti.ac.in/phdadvt.php', label: 'PhD Admissions Portal' },
  { href: 'https://library.iiti.ac.in',           label: 'Learning Resource Center' },
  { href: 'https://placement.iiti.ac.in',         label: 'Training & Placements Portal' },
];

export default function Footer({ onNav }) {
  const [showCredits, setShowCredits] = useState(false);

  const handleInternalNav = (e, id) => {
    e.preventDefault();
    if (onNav) {
      onNav(id);
    } else {
      window.location.hash = id;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="main-site-footer">
      <div className="site-footer-inner">
        
        {/* ── Top Main Grid (4 Columns) ── */}
        <div className="site-footer-grid">
          
          {/* Column 1: Department Identity */}
          <div className="footer-section-col brand-col">
            <div className="footer-logo-row">
              <img 
                src="images/IITI_Logo.svg" 
                alt="IIT Indore Logo" 
                className="footer-iiti-logo"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div>
                <h3 className="footer-brand-heading">DAASE</h3>
                <div className="footer-brand-subheading">IIT Indore</div>
              </div>
            </div>
            
            <p className="footer-dept-full-name">
              Department of Astronomy, Astrophysics &amp; Space Engineering
            </p>
            
            <div className="footer-address-box">
              <div className="footer-address-icon">📍</div>
              <div className="footer-address-text">
                Indian Institute of Technology Indore,<br />
                Khandwa Road, Simrol, Indore 453552,<br />
                Madhya Pradesh, India
              </div>
            </div>
          </div>

          {/* Column 2: Department Navigation */}
          <div className="footer-section-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links-list">
              {QUICK_LINKS.map(link => (
                <li key={link.id}>
                  <a href={`#${link.id}`} onClick={(e) => handleInternalNav(e, link.id)}>
                    <span className="footer-link-arrow">›</span> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Institute Portals */}
          <div className="footer-section-col">
            <h4 className="footer-heading">Institute Portals</h4>
            <ul className="footer-links-list">
              {INSTITUTE_LINKS.map((portal, idx) => (
                <li key={idx}>
                  <a href={portal.href} target="_blank" rel="noopener noreferrer">
                    <span className="footer-link-arrow">›</span> {portal.label} <span className="footer-ext-icon">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="footer-section-col contact-col">
            <h4 className="footer-heading">Contact Us</h4>
            
            <div className="footer-contact-item">
              <div className="footer-contact-icon">✉️</div>
              <div>
                <span className="footer-contact-badge">Head of Department</span>
                <a href="mailto:hodaase@iiti.ac.in" className="footer-contact-link">
                  hodaase@iiti.ac.in
                </a>
              </div>
            </div>

            <div className="footer-contact-item">
              <div className="footer-contact-icon">✉️</div>
              <div>
                <span className="footer-contact-badge">Department Office</span>
                <a href="mailto:aase-office@iiti.ac.in" className="footer-contact-link">
                  aase-office@iiti.ac.in
                </a>
              </div>
            </div>

            <a 
              href="https://maps.google.com/maps?q=22.528688,75.923391" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-map-preview-card"
              title="Open IIT Indore in Google Maps"
            >
              <iframe
                src="https://maps.google.com/maps?q=22.528688,75.923391&t=k&z=15&ie=UTF8&iwloc=&output=embed"
                title="IIT Indore Satellite Map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="footer-mini-map"
              />
              <div className="footer-map-pin-pill">
                <span>📍 DAASE, IIT Indore ↗</span>
              </div>
            </a>
          </div>

        </div>

        {/* ── Footer Divider ── */}
        <div className="footer-bottom-divider" />

        {/* ── Bottom Bar (Copyright & Credits) ── */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright-text">
            © {new Date().getFullYear()} Department of Astronomy, Astrophysics and Space Engineering (AASE), IIT Indore. All rights reserved.
          </div>
          <div className="footer-credits-text">
            Webmaster: <a href="https://www.linkedin.com/in/aninda-pratim-roy" target="_blank" rel="noopener noreferrer">Aninda Pratim Roy</a>
            <span className="footer-credits-sep">|</span>
            <button className="footer-credits-trigger" onClick={() => setShowCredits(true)}>
              Credits
            </button>
          </div>
        </div>

      </div>

      {/* Credits Modal */}
      {showCredits && (
        <div className="credits-modal-overlay" onClick={() => setShowCredits(false)}>
          <div className="credits-modal-content" onClick={e => e.stopPropagation()}>
            <button className="credits-modal-close-icon" onClick={() => setShowCredits(false)} aria-label="Close">
              &times;
            </button>
            <h3 className="credits-modal-title">Additional Credits</h3>
            <div className="credits-list">
              <a href="https://www.linkedin.com/in/chitrashri-bhargava" target="_blank" rel="noopener noreferrer" className="credits-link">
                Chitrashri Bhargava
              </a>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
