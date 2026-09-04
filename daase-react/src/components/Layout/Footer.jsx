import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const QUICK_LINKS = [
  { id: 'home',           label: 'Home' },
  { id: 'people-faculty', label: 'Faculty' },
  { id: 'programs',       label: 'Programs' },
  { id: 'research',       label: 'Research Areas' },
  { id: 'facilities',     label: 'Research Facilities' },
  { id: 'events',         label: 'Events' },
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
  const [showWebmaster, setShowWebmaster] = useState(false);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowWebmaster(false);
        setShowCredits(false);
      }
    };
    if (showWebmaster || showCredits) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showWebmaster, showCredits]);

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
    <>
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

              <div className="footer-contact-item">
                <div className="footer-contact-icon">📞</div>
                <div>
                  <span className="footer-contact-badge">Extensions (+91-731-660(xxxx))</span>
                  <div className="footer-contact-ext-list">
                    <a href="tel:+917316603575" className="footer-ext-badge" title="Call +91-731-660-3575 (Ext. 3575)">3575</a>
                    <a href="tel:+917316603429" className="footer-ext-badge" title="Call +91-731-660-3429 (Ext. 3429)">3429</a>
                    <a href="tel:+917316605164" className="footer-ext-badge" title="Call +91-731-660-5164 (Ext. 5164)">5164</a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── Find Us Banner ── */}
          <div className="footer-find-us-banner">
            <div className="footer-find-us-left">
              <span className="footer-find-us-label">📍 Find Us</span>
              <span className="footer-find-us-address">
                Indian Institute of Technology Indore, Khandwa Road, Simrol, Indore 453552, Madhya Pradesh, India
              </span>
            </div>
            <a
              href="https://maps.google.com/maps?q=22.528688,75.923391"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-find-us-btn"
            >
              Open in Google Maps ↗
            </a>
          </div>

          {/* ── Footer Divider ── */}
          <div className="footer-bottom-divider" />

          {/* ── Bottom Bar (Copyright & Credits) ── */}
          <div className="footer-bottom-bar">
            <div className="footer-copyright-text">
              © {new Date().getFullYear()} Department of Astronomy, Astrophysics and Space Engineering (AASE), IIT Indore. All rights reserved.
            </div>
            <div className="footer-credits-text">
              <button 
                type="button" 
                className="footer-credits-trigger" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  e.stopPropagation(); 
                  setShowWebmaster(true); 
                }}
              >
                Webmaster
              </button>
              <span className="footer-credits-sep">|</span>
              <button 
                type="button" 
                className="footer-credits-trigger" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  e.stopPropagation(); 
                  setShowCredits(true); 
                }}
              >
                Credits
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* ── Webmaster Modal via createPortal ── */}
      {showWebmaster && typeof document !== 'undefined' && createPortal(
        <div 
          className="credits-modal-overlay" 
          onClick={() => setShowWebmaster(false)}
        >
          <div 
            className="credits-modal-content" 
            onClick={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}
          >
            <button 
              type="button" 
              className="credits-modal-close-icon" 
              onClick={() => setShowWebmaster(false)} 
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="credits-modal-title">Webmaster</h3>
            <p className="credits-modal-subtitle">Website Designed &amp; Developed by</p>
            <div className="credits-list">
              <a 
                href="https://www.linkedin.com/in/aninda-pratim-roy" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="credits-link"
              >
                <span>Aninda Pratim Roy</span>
                <span className="credits-link-arrow">↗</span>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ── Credits Modal via createPortal ── */}
      {showCredits && typeof document !== 'undefined' && createPortal(
        <div 
          className="credits-modal-overlay" 
          onClick={() => setShowCredits(false)}
        >
          <div 
            className="credits-modal-content" 
            onClick={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}
          >
            <button 
              type="button" 
              className="credits-modal-close-icon" 
              onClick={() => setShowCredits(false)} 
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="credits-modal-title">Credits</h3>
            <p className="credits-modal-subtitle">Additional Acknowledgments</p>
            <div className="credits-list">
              <a 
                href="https://www.linkedin.com/in/chitrashri-bhargava" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="credits-link"
              >
                <span>Chitrashri Bhargava</span>
                <span className="credits-link-arrow">↗</span>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

