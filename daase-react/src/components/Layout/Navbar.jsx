import { useState, useEffect } from 'react';

// People sub-menu items — each maps to a tab inside the People/Faculty page
const PEOPLE_ITEMS = [
  { id: 'people-faculty',  label: 'Faculty' },
  { id: 'people-staff',    label: 'Non-Teaching Staff' },
  { id: 'people-phd',      label: 'Ph.D. students' },
  { id: 'people-pg',       label: 'Post Graduate Students' },
  { id: 'people-ug',       label: 'Under Graduate Students' },
  { id: 'people-alumni',   label: 'Alumni' },
];

// Flat nav items (no dropdown)
const NAV_ITEMS = [
  { id: 'home',       label: 'Home' },
  { id: 'programs',   label: 'Programs' },
  { id: 'placements', label: 'Placements' },
  { id: 'events',     label: 'Events' },
  { id: 'gallery',    label: 'Gallery' },
];

const USEFUL_LINKS = [
  { href: 'https://www.iiti.ac.in', label: '🏛️ IIT Indore' },
  { href: 'https://academic.iiti.ac.in', label: '🎓 IIT Indore Academics' },
  { href: 'https://academic.iiti.ac.in/phdadvt.php', label: '📋 PhD Admissions Portal' },
  { href: 'mailto:hodaase@iiti.ac.in', label: '📧 Contact HoD' },
  { href: 'mailto:aase-office@iiti.ac.in', label: '📧 Department Office' },
];

// Whether the current view is any People sub-page
const isPeopleActive = (current) => current.startsWith('people-');

export default function Navbar({ current, onNav }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Determine scroll direction for auto-hide
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down'); // scrolling down, past top
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up'); // scrolling up
      }
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (id) => {
    onNav(id);
    setMobileOpen(false);
    setOpenDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDropdown = (name, e) => {
    e.stopPropagation();
    setOpenDropdown(prev => prev === name ? null : name);
  };

  // Close dropdowns if clicking anywhere outside
  useEffect(() => {
    const handleOutsideClick = () => setOpenDropdown(null);
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <>
      <nav className={`${isScrolled ? 'nav-scrolled' : 'nav-top'} ${scrollDirection === 'down' ? 'nav-hidden' : ''}`}>
        <div className="nav-logos" onClick={() => handleNav('home')}>
          <img src="images/IITI_Logo.svg" alt="IIT Indore" className="nav-logo-img"
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
          <div className="logo-placeholder" style={{ display: 'none' }}>IITI</div>
          <div className="nav-divider" />
          <img src="images/daase.png" alt="DAASE" className="nav-logo-img"
            style={{ filter: 'brightness(0) invert(1)' }}
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
          <div className="logo-placeholder" style={{ display: 'none' }}>DAASE</div>
        </div>

        <div className="nav-brand" onClick={() => handleNav('home')}>
          <div className="nav-brand-main">DAASE IIT Indore</div>
          <div className="nav-brand-sub">Dept. of Astronomy, Astrophysics &amp; Space Engineering</div>
        </div>

        <div className="nav-links">
          {/* People dropdown */}
          <div className={`nav-dropdown${openDropdown === 'people' ? ' open' : ''}`} onClick={(e) => toggleDropdown('people', e)}>
            <button className={`nav-dropdown-trigger${isPeopleActive(current) || openDropdown === 'people' ? ' active' : ''}`}>
              People ▾
            </button>
            <div className="nav-dropdown-menu">
              {PEOPLE_ITEMS.map(item => (
                <button
                  key={item.id}
                  className={current === item.id ? 'active' : ''}
                  onClick={(e) => { e.stopPropagation(); handleNav(item.id); }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Research dropdown */}
          <div className={`nav-dropdown${openDropdown === 'research' ? ' open' : ''}`} onClick={(e) => toggleDropdown('research', e)}>
            <button className={`nav-dropdown-trigger${current === 'research' || current === 'facilities' || openDropdown === 'research' ? ' active' : ''}`}>
              Research ▾
            </button>
            <div className="nav-dropdown-menu">
              <button
                className={current === 'research' ? 'active' : ''}
                onClick={(e) => { e.stopPropagation(); handleNav('research'); }}
              >
                Research Overview
              </button>
              <button
                className={current === 'facilities' ? 'active' : ''}
                onClick={(e) => { e.stopPropagation(); handleNav('facilities'); }}
              >
                Research Facilities
              </button>
            </div>
          </div>

          {/* Programs */}
          <button
            className={current === 'programs' ? 'active' : ''}
            onClick={() => handleNav('programs')}
          >
            Programs
          </button>

          {/* Events */}
          <button
            className={current === 'events' ? 'active' : ''}
            onClick={() => handleNav('events')}
          >
            Events
          </button>

          {/* Gallery */}
          <button
            className={current === 'gallery' ? 'active' : ''}
            onClick={() => handleNav('gallery')}
          >
            Gallery
          </button>

          {/* Opportunities CTA */}
          <button
            className={`nav-cta-btn${current === 'opportunities' ? ' active' : ''}`}
            onClick={() => handleNav('opportunities')}
          >
            Opportunities
          </button>

          <div className="nav-divider-vertical" />

          {/* Permanent Desktop Hamburger */}
          <div className="hamburger desktop-hamburger" onClick={() => setMobileOpen(o => !o)}>
            <span /><span /><span />
          </div>
        </div>
      </nav>

      {/* Backdrop overlay */}
      <div 
        className={`menu-overlay${mobileOpen ? ' open' : ''}`} 
        onClick={() => setMobileOpen(false)} 
      />

      {/* Side Drawer Menu */}
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <div className="drawer-header">
          <span className="drawer-title">Navigation</span>
          <button className="drawer-close" onClick={() => setMobileOpen(false)}>✕</button>
        </div>

        <button className={current === 'home' ? 'active' : ''} onClick={() => handleNav('home')}>Home</button>

        {/* People section header */}
        <div style={{ padding: '6px 12px 2px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-light)' }}>
          People
        </div>
        {PEOPLE_ITEMS.map(item => (
          <button
            key={item.id}
            style={{ paddingLeft: '24px' }}
            className={current === item.id ? 'active' : ''}
            onClick={() => handleNav(item.id)}
          >
            {item.label}
          </button>
        ))}

        <div style={{ padding: '6px 12px 2px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-light)', marginTop: '8px' }}>
          Research
        </div>
        <button style={{ paddingLeft: '24px' }} className={current === 'research' ? 'active' : ''} onClick={() => handleNav('research')}>Research Overview</button>
        <button style={{ paddingLeft: '24px' }} className={current === 'facilities' ? 'active' : ''} onClick={() => handleNav('facilities')}>Research Facilities</button>

        <button className={current === 'programs' ? 'active' : ''} onClick={() => handleNav('programs')}>Programs</button>
        {NAV_ITEMS.slice(2).map(item => (
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
