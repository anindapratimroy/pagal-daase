import { useState } from 'react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'research', label: 'Research' },
  { id: 'programs', label: 'Programs' },
  { id: 'faculty', label: 'Faculty' },
  { id: 'students', label: 'Students' },
  { id: 'facilities', label: 'Facilities' },
  { id: 'events', label: 'Events' },
  { id: 'alumni', label: 'Alumni' },
  { id: 'gallery', label: 'Gallery' },
];

const USEFUL_LINKS = [
  { href: 'https://www.iiti.ac.in', label: '🏛️ IIT Indore' },
  { href: 'https://academic.iiti.ac.in', label: '🎓 IIT Indore Academics' },
  { href: 'https://academic.iiti.ac.in/phdadvt.php', label: '📋 PhD Admissions Portal' },
  { href: 'mailto:hodaase@iiti.ac.in', label: '📧 Contact HoD' },
  { href: 'mailto:aase-office@iiti.ac.in', label: '📧 Department Office' },
];

export default function Navbar({ current, onNav }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (id) => {
    onNav(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav>
        <div className="nav-logos">
          <img src="images/IITI_Logo.svg" alt="IIT Indore" className="nav-logo-img"
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
          <div className="logo-placeholder" style={{ display: 'none' }}>IITI</div>
          <div className="nav-divider" />
          <img src="images/daase.png" alt="DAASE" className="nav-logo-img"
            style={{ filter: 'brightness(0)' }}
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
          <div className="logo-placeholder" style={{ display: 'none' }}>DAASE</div>
        </div>

        <div className="nav-brand">
          <div className="nav-brand-main">DAASE — IIT Indore</div>
          <div className="nav-brand-sub">Dept. of Astronomy, Astrophysics &amp; Space Engineering</div>
        </div>

        <div className="nav-links">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={current === item.id ? 'active' : ''}
              onClick={() => handleNav(item.id)}
            >
              {item.label}
            </button>
          ))}

          <div className="nav-dropdown">
            <button className="nav-dropdown-trigger">Useful Links ▾</button>
            <div className="nav-dropdown-menu">
              {USEFUL_LINKS.map(l => (
                <a key={l.href} href={l.href} target={l.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <button
            className={`nav-cta-btn${current === 'opportunities' ? ' active' : ''}`}
            onClick={() => handleNav('opportunities')}
          >
            Opportunities
          </button>
        </div>

        <div className="hamburger" onClick={() => setMobileOpen(o => !o)}>
          <span /><span /><span />
        </div>
      </nav>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        {NAV_ITEMS.map(item => (
          <button key={item.id} className={current === item.id ? 'active' : ''} onClick={() => handleNav(item.id)}>
            {item.label}
          </button>
        ))}
        <button onClick={() => handleNav('opportunities')}>Opportunities</button>
        <a href="https://www.iiti.ac.in" target="_blank" rel="noopener noreferrer">IIT Indore ↗</a>
        <a href="https://academic.iiti.ac.in" target="_blank" rel="noopener noreferrer">IIT Indore Academics ↗</a>
      </div>
    </>
  );
}
