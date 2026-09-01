import { useState, useRef, useCallback } from 'react';

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
  { id: 'opportunities',  label: 'Opportunities & Openings' },
];

const INSTITUTE_PORTALS = [
  { href: 'https://www.iiti.ac.in',               label: 'IIT Indore Main Website ↗' },
  { href: 'https://academic.iiti.ac.in',          label: 'Academic Affairs Portal ↗' },
  { href: 'https://academic.iiti.ac.in/phdadvt.php', label: 'Ph.D. Admissions Portal ↗' },
  { href: 'https://library.iiti.ac.in',           label: 'Learning Resource Center ↗' },
  { href: 'https://tpo.iiti.ac.in',               label: 'Training & Placement Cell ↗' },
];

const COLLABS = [
  { href: 'https://www.ncra.tifr.res.in/skaindia', label: 'SKA-India Consortium (SKA-IC)' },
  { href: 'https://www.isro.gov.in',               label: 'ISRO Missions & Science' },
  { href: 'https://www.nasa.gov',                  label: 'NASA Collaborations' },
  { href: 'https://www.mpg.de/en',                 label: 'Max Planck Society (MPG)' },
  { href: 'https://astron-soc.in',                 label: 'Astronomical Society of India' },
  { href: 'https://www.iau.org',                   label: 'International Astronomical Union' },
];

export default function Footer({ onNav }) {
  const [showCredits, setShowCredits] = useState(false);
  const mapRetryCount = useRef(0);
  const mapIframeRef = useRef(null);

  // Two reliable embed URLs — primary and fallback
  const MAP_URLS = [
    'https://maps.google.com/maps?q=22.528688,75.923391&t=k&z=16&ie=UTF8&iwloc=&output=embed',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.2!2d75.920717!3d22.528688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962ede93d5ac471%3A0xf7a8f5f2e8c2d3b0!2sIIT%20Indore!5e1!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    'https://maps.google.com/maps?q=IIT+Indore+Khandwa+Road+Simrol&t=k&z=16&ie=UTF8&iwloc=&output=embed',
  ];

  const handleMapError = useCallback(() => {
    if (mapRetryCount.current < MAP_URLS.length - 1 && mapIframeRef.current) {
      mapRetryCount.current += 1;
      mapIframeRef.current.src = MAP_URLS[mapRetryCount.current];
    }
  }, []);

  const handleMapLoad = useCallback(() => {
    // Map loaded successfully — reset retry counter
    mapRetryCount.current = 0;
  }, []);

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
      {/* ── Contact Us & Location Section ── */}
      <div className="contact-section">

        {/* Header */}
        <div className="contact-hdr">
          <span className="about-eyebrow">✦ &nbsp;Get in Touch</span>
          <h2 className="contact-main-title">Contact <span>Us</span></h2>
          <div className="title-bar" style={{ margin: '0 auto 0' }} />
        </div>

        {/* Contact info + Map grid */}
        <div className="contact-redesign-grid">

          {/* Left — unified info card */}
          <div className="contact-panel anim-fadeup d1">

            {/* Address */}
            <div className="contact-block">
              <div className="contact-block-icon">📍</div>
              <div className="contact-block-body">
                <div className="contact-block-label">Campus Address</div>
                <div className="contact-block-value">
                  Department of Astronomy, Astrophysics and Space Engineering (DAASE),<br />
                  Indian Institute of Technology Indore,<br />
                  Khandwa Road, Simrol, Indore 453552, MP, India
                </div>
              </div>
            </div>

            <div className="contact-divider" />

            {/* Email */}
            <div className="contact-block">
              <div className="contact-block-icon">📧</div>
              <div className="contact-block-body">
                <div className="contact-block-label">Email Contacts</div>
                <div className="contact-block-value">
                  <div className="contact-email-row">
                    <a href="mailto:hodaase@iiti.ac.in">hodaase@iiti.ac.in</a>
                    <span className="contact-email-tag">Head of Department</span>
                  </div>
                  <div className="contact-email-row">
                    <a href="mailto:aase-office@iiti.ac.in">aase-office@iiti.ac.in</a>
                    <span className="contact-email-tag">Department Office</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-divider" />

            {/* Quick Institute Links */}
            <div className="contact-block">
              <div className="contact-block-icon">🌐</div>
              <div className="contact-block-body">
                <div className="contact-block-label">Institute Portals</div>
                <div className="contact-links-row">
                  <a href="https://www.iiti.ac.in" target="_blank" rel="noopener noreferrer" className="contact-link-pill">
                    www.iiti.ac.in ↗
                  </a>
                  <a href="https://academic.iiti.ac.in" target="_blank" rel="noopener noreferrer" className="contact-link-pill">
                    academic.iiti.ac.in ↗
                  </a>
                  <a href="https://academic.iiti.ac.in/phdadvt.php" target="_blank" rel="noopener noreferrer" className="contact-link-pill">
                    PhD Admissions ↗
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right — Map */}
          <div className="contact-map-panel anim-fadeup d2">
            <div className="map-wrapper-new">
              <iframe
                ref={mapIframeRef}
                src={MAP_URLS[0]}
                title="IIT Indore Map"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={handleMapLoad}
                onError={handleMapError}
                style={{ border: 0 }}
              />
              <div className="map-overlay-new">
                <div className="map-pin-label">
                  <span className="map-pin-dot">📍</span>
                  <div>
                    <div className="map-pin-title">IIT Indore — DAASE</div>
                    <div className="map-pin-addr">Khandwa Road, Simrol, Indore 453552</div>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=22.528688,75.923391"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-open-btn"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>

        </div> {/* End of contact-redesign-grid */}

        {/* ── Multi-Column Quick Links & Resources ── */}
        <div className="footer-links-container anim-fadeup d3">
          <div className="footer-links-grid">
            
            {/* Column 1: Department Info */}
            <div className="footer-col">
              <div className="footer-brand-title">
                DAASE · <span>IIT Indore</span>
              </div>
              <p className="footer-brand-desc">
                Department of Astronomy, Astrophysics and Space Engineering (DAASE) is dedicated to frontier research in multi-frequency astrophysics, space payload technologies, ionospheric science, and advanced instrumentation.
              </p>
              <div className="footer-dept-tag">
                ✦ Established Dec 2015 · Full Department May 2018
              </div>
            </div>

            {/* Column 2: Department Quick Links */}
            <div className="footer-col">
              <h4 className="footer-col-heading">Quick Links</h4>
              <ul className="footer-nav-list">
                {QUICK_LINKS.map(link => (
                  <li key={link.id}>
                    <a href={`#${link.id}`} onClick={(e) => handleInternalNav(e, link.id)}>
                      <span className="footer-bullet">›</span> {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Institute Portals */}
            <div className="footer-col">
              <h4 className="footer-col-heading">Institute Portals</h4>
              <ul className="footer-nav-list">
                {INSTITUTE_PORTALS.map((portal, idx) => (
                  <li key={idx}>
                    <a href={portal.href} target="_blank" rel="noopener noreferrer">
                      <span className="footer-bullet">›</span> {portal.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Key Collaborations */}
            <div className="footer-col">
              <h4 className="footer-col-heading">Major Collaborations</h4>
              <ul className="footer-nav-list">
                {COLLABS.map((collab, idx) => (
                  <li key={idx}>
                    <a href={collab.href} target="_blank" rel="noopener noreferrer">
                      <span className="footer-bullet">›</span> {collab.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Footer Separator */}
        <div className="footer-separator" />

        {/* Integrated Premium Glass Footer */}
        <div className="section-footer">
          <div className="footer-inner">
            <div className="footer-copyright">
              <span style={{ fontSize: '1.2em', verticalAlign: 'middle', marginRight: '4px' }}>©</span> 
              {new Date().getFullYear()} DAASE, IIT Indore. All rights reserved.
            </div>
            <div className="footer-creator">
              Website created by: <a href="https://www.linkedin.com/in/aninda-pratim-roy" target="_blank" rel="noopener noreferrer">Aninda Pratim Roy</a> and <a href="https://www.linkedin.com/in/vidhan-thakur27" target="_blank" rel="noopener noreferrer">Vidhan Thakur</a>
              <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.3)' }}>|</span>
              <span className="credits-trigger" onClick={() => setShowCredits(true)}>Credits</span>
            </div>
          </div>
        </div>

      </div> {/* End of contact-section */}

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
    </>
  );
}
