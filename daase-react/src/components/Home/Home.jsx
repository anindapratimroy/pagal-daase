import CounterStat from './CounterStat';
import Footer from '../Layout/Footer';
import NewsTicker from './NewsTicker';
import Collaborators from './Collaborators';
import { PUBLICATIONS_FB } from '../../data/fallback';

// Ensure link has protocol prefix for external, but respect internal links
function normalizeLink(link) {
  if (!link) return null;
  if (typeof link !== 'string') return null;
  const trimmed = link.trim();
  if (!trimmed) return null;
  
  // Internal or relative links (e.g. /events, #section, ?query)
  if (trimmed.startsWith('/') || trimmed.startsWith('#') || trimmed.startsWith('?')) {
    return trimmed;
  }
  
  // Known URLs missing protocol
  if (trimmed.startsWith('www.') || trimmed.includes('.ac.in') || trimmed.includes('.edu') || trimmed.includes('.org') || trimmed.includes('.com') || trimmed.includes('.in/')) {
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      return 'https://' + trimmed;
    }
  }
  
  // Already has protocol or is a generic external
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  
  // Fallback for everything else, treat as relative/internal
  return trimmed;
}

function isExternal(link) {
  if (!link) return false;
  return link.startsWith('http://') || link.startsWith('https://') || link.startsWith('www.');
}

function getPubText(pub) {
  if (typeof pub === 'string') return pub;
  return pub.text || pub.title || pub.citation || '';
}

function getPubUrl(pub) {
  if (typeof pub === 'string') {
    const m = pub.match(/(https?:\/\/[^\s]+)/);
    return m ? m[1] : null;
  }
  return pub.url || pub.doi || pub.link || null;
}

export default function Home({ onNav, news, events, publications = [] }) {
  // Filter only active news, normalize 'text' field to 'title'

  console.log("EVENTS:", events);
  const activeNews = (news || [])
    .filter(n => !n.status || n.status.toString().toLowerCase().trim() === 'active')
    .map(n => ({ type: 'news', title: n.text || n.title, link: normalizeLink(n.link || n.url), date: n.date }));

  // Include events with their link field and raw type
  const activeEvents = (events || [])
    .map(e => ({ type: 'event', title: e.title, link: normalizeLink(e.link || e.url || e.Link || e.URL || e.href || ''), date: e.date, rawType: e.type }));

  // Filter events into upcoming and past
  const upcomingEvents = activeEvents.filter(e => (e.rawType || '').toLowerCase().trim() === 'upcoming');
  const pastEvents = activeEvents.filter(e => (e.rawType || '').toLowerCase().trim() !== 'upcoming');

  // Prioritize upcoming events first, then active news, and then past events
  const combinedUpdates = [...upcomingEvents, ...activeNews, ...pastEvents].slice(0, 15);

  const pubsList = (publications && publications.length > 0) ? publications : PUBLICATIONS_FB;

  return (
    <div>
      {/* Hero main */}
      <div className="hero-main">
        <div className="hero-left" data-aos="fade-right">
          <div className="hero-tag">✦ &nbsp;Est. 2015 &nbsp;·&nbsp; IIT Indore</div>
          <h1 className="hero-title">
            Department of<br />
            <span className="accent">Astronomy, Astrophysics<br />&amp; Space Engineering</span>
          </h1>
          <p className="hero-tagline">
            "<a href="https://aase.iiti.ac.in/solarverse/" className="solarverse-link" target="_blank" rel="noopener noreferrer" title="Visit the Solar System">
              <span className="solarverse-default">Exploring the Universe</span>
              <span className="solarverse-hover">Visit the Solar System</span>
            </a>, Engineering the Future"
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => onNav('research')}>
              Explore Research <span className="arrow">→</span>
            </button>
            <button className="btn-outline" onClick={() => onNav('programs')}>
              View Programs <span className="arrow">→</span>
            </button>
          </div>

          <div className="hero-stats-grid" style={{ marginTop: '48px' }}>
            <CounterStat target={7} label="Research Areas" delay="0.06s" />
            <CounterStat target={5} label="Degree Programs" delay="0.12s" />
            <CounterStat target={13} label="Faculty Members" delay="0.18s" />
            <CounterStat target={100} label="+ Alumni" delay="0.23s" />
          </div>

          <div className="scroll-hint" data-aos="fade-in" data-aos-delay="300">Scroll to explore</div>
        </div>

        <div className="hero-right" data-aos="fade-left">
          {/* 1. Recent Updates */}
          <div className="news-feed-container anim-fadein" style={{ animationDelay: '0.2s' }}>
            <h2 className="news-feed-title">Recent <span>Updates</span></h2>

            <div className="vertical-marquee-container">
              <div className="vertical-marquee-content">
                {combinedUpdates.length > 0 ? (() => {
                  const copiesNeeded = Math.max(2, Math.ceil(12 / combinedUpdates.length) * 2);
                  const displayUpdates = [];
                  for (let i = 0; i < copiesNeeded; i++) displayUpdates.push(...combinedUpdates);
                  return displayUpdates;
                })().map((item, index) => {
                  const rawLink = item.link || item.url || '';
                  const ItemWrapper = rawLink ? 'a' : 'div';
                  const isExt = isExternal(rawLink);
                  const props = rawLink ? {
                    href: rawLink,
                    target: isExt ? '_blank' : '_self',
                    rel: isExt ? 'noopener noreferrer' : undefined,
                    style: { textDecoration: 'none', color: 'inherit' }
                  } : {};

                  return (
                    <ItemWrapper key={index} className="news-feed-item" {...props}>
                      <div className="news-feed-meta">
                        {item.type === 'event' && <span className="type-badge event">Event</span>}
                        {item.type === 'news' && <span className="type-badge news">News</span>}
                        <span className="news-feed-date">{item.date}</span>
                      </div>
                      <div className="news-feed-headline">
                        {item.title || item.text} {rawLink && <span className="arrow">↗</span>}
                      </div>
                    </ItemWrapper>
                  );
                }) : (
                  <div className="news-feed-empty">No updates to show right now.</div>
                )}

              </div>
            </div>
          </div>

          {/* 2. Recent Publications */}
          <div className="home-pub-container anim-fadein" style={{ animationDelay: '0.32s' }}>
            <div className="home-pub-header">
              <h2 className="news-feed-title" style={{ margin: 0 }}>Recent <span>Publications</span></h2>
              <button
                className="home-pub-view-all"
                onClick={() => onNav('research')}
                title="View research areas"
              >
                Explore Areas ↗
              </button>
            </div>

            <div className="home-pub-marquee-container">
              <div className="home-pub-marquee-content">
                {(pubsList.length > 0 ? (() => {
                  const copiesNeeded = Math.max(2, Math.ceil(8 / pubsList.length) * 2);
                  const displayPubs = [];
                  for (let i = 0; i < copiesNeeded; i++) displayPubs.push(...pubsList);
                  return displayPubs;
                })() : []).map((pub, idx) => {
                  const text = getPubText(pub);
                  const url = getPubUrl(pub);
                  const displayText = text.replace(/(https?:\/\/[^\s]+)/g, '').trim();
                  const realNum = (idx % pubsList.length) + 1;

                  const ItemTag = url ? 'a' : 'div';
                  const props = url ? {
                    href: url,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    title: 'Open paper'
                  } : {};

                  return (
                    <ItemTag key={idx} className={`home-pub-item${url ? ' is-linked' : ''}`} {...props}>
                      <span className="home-pub-num">{realNum.toString().padStart(2, '0')}.</span>
                      <div className="home-pub-body">
                        <span className="home-pub-text">{displayText || text}</span>
                        {url && <span className="home-pub-arrow">↗</span>}
                      </div>
                    </ItemTag>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Collaborations & Placements — Full Width Across Screen */}
      <Collaborators />

      {/* About — Full redesign */}
      <div className="about-strip">

        {/* ── Header ── */}
        <div className="about-hdr" data-aos="fade-up">
          <span className="about-eyebrow">✦ &nbsp;Established 2015 &nbsp;·&nbsp; IIT Indore</span>
          <h2 className="about-main-title">About <span>DAASE</span></h2>
          <p className="about-intro-text">
            India's only dedicated department of its kind across all IITs — a comprehensive academic and research
            ecosystem spanning the cosmos to cutting-edge space engineering. Founded as a Centre for Astronomy in
            December 2015, elevated to a full Department in May 2018, and backed by DST-FIST, SKA-IC, ISRO &amp; NASA.
          </p>
        </div>

        {/* ── 3-column info cards ── */}
        <div className="about-info-grid">
          <div className="about-info-card" data-aos="fade-up" data-aos-delay="100">
            <div className="about-info-card-icon">🎓</div>
            <h3 className="about-info-card-title">Academic Programs</h3>
            <ul className="about-info-list">
              <li className="is-interactive" onClick={() => onNav('programs', 'phd')} title="View Ph.D. Program">
                Ph.D. in Astronomy, Astrophysics &amp; Space Engineering <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('programs', 'msc')} title="View M.Sc. Program">
                M.Sc. in Astronomy — first &amp; only in IITs <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('programs', 'mtech')} title="View M.Tech. Program">
                M.Tech. in Space Engineering <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('programs', 'ms')} title="View M.S. (Research) Program">
                M.S. (Research) in Space Science &amp; Engineering <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('programs', 'btech')} title="View B.Tech. Program">
                B.Tech. in Space Science &amp; Engineering <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('programs', 'btech')} title="View Minor Program">
                Minor in Astronomy &amp; Space Science (for IIT Indore UG students) <span className="arrow">↗</span>
              </li>
            </ul>
          </div>

          <div className="about-info-card" data-aos="fade-up" data-aos-delay="200">
            <div className="about-info-card-icon">🔭</div>
            <h3 className="about-info-card-title">Research Areas</h3>
            <ul className="about-info-list">
              <li className="is-interactive" onClick={() => onNav('research-detail', 'radio-astronomy')} title="View Radio Astronomy">
                Radio Astronomy &amp; Instrumentation <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('research-detail', 'heliophysics')} title="View Heliophysics">
                Heliophysics &amp; Solar Physics <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('research-detail', 'remote-sensing')} title="View Remote Sensing">
                Remote Sensing &amp; Atmospheric Physics <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('research-detail', 'space-engineering')} title="View Space Engineering">
                CubeSat, Drone &amp; Spacecraft Technologies <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('research-detail', 'cosmology')} title="View Cosmology">
                High-Energy Astrophysics &amp; Observational Cosmology <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('research-detail', 'data-science')} title="View Data Science">
                Data Science &amp; AI-Driven Techniques <span className="arrow">↗</span>
              </li>
            </ul>
          </div>

          <div className="about-info-card" data-aos="fade-up" data-aos-delay="300">
            <div className="about-info-card-icon">🔬</div>
            <h3 className="about-info-card-title">Labs &amp; Facilities</h3>
            <ul className="about-info-list">
              <li className="is-interactive" onClick={() => onNav('facilities')} title="View Labs & Facilities">
                Radio Frequency (RF) Lab — testing up to 60 GHz <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('facilities')} title="View Labs & Facilities">
                Optics Lab &amp; Precision Measurement Systems <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('facilities')} title="View Labs & Facilities">
                IoT, Drone &amp; Remote Sensing Lab <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('facilities')} title="View Labs & Facilities">
                Plasma Lab &amp; Helmholtz Cages <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('facilities')} title="View Labs & Facilities">
                IITI Radio Interferometer Observatory <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('facilities')} title="View Labs & Facilities">
                Arctic Station Himadri (active since 2022) <span className="arrow">↗</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── 4 Highlight badges ── */}
        <div className="about-badges-row" data-aos="fade-up" data-aos-offset="50">
          <a href="http://www.fist-dst.org" target="_blank" rel="noopener noreferrer" className="about-badge">
            <span className="about-badge-icon">🏆</span>
            <span className="about-badge-label">DST-FIST Funded</span>
            <span className="about-badge-desc">Research excellence grant · 2022</span>
          </a>
          <a href="https://skaindia.ncra.tifr.res.in" target="_blank" rel="noopener noreferrer" className="about-badge">
            <span className="about-badge-icon">📡</span>
            <span className="about-badge-label">SKA-IC Founding Member</span>
            <span className="about-badge-desc">Global radio telescope consortium · Since 2015</span>
          </a>
          <a href="https://www.ncpor.res.in/arctica/index_page-175.html" target="_blank" rel="noopener noreferrer" className="about-badge">
            <span className="about-badge-icon">🧊</span>
            <span className="about-badge-label">Arctic Research</span>
            <span className="about-badge-desc">Station Himadri · Atmospheric science · Since 2022</span>
          </a>
          <a href="https://www.isro.gov.in" target="_blank" rel="noopener noreferrer" className="about-badge">
            <span className="about-badge-icon">🚀</span>
            <span className="about-badge-label">ISRO &amp; NASA</span>
            <span className="about-badge-desc">Active faculty contributions to major space missions</span>
          </a>
        </div>

        {/* ── Horizontal Timeline ── */}
        <div className="about-timeline-wrap" data-aos="fade-up" data-aos-offset="50">
          <div className="about-timeline-track" />
          <div className="about-timeline-row">
            {[
              { year: 'Dec 2015', title: 'Founded as Centre for Astronomy', sub: 'Ph.D. program launched · Founding SKA-IC member' },
              { year: 'May 2018', title: 'Upgraded to Full Department', sub: 'M.Sc. Astronomy — first & only in IITs' },
              { year: '2021', title: 'Space Engineering Programs', sub: 'M.Tech. Space Engineering · M.S. (Research) launched' },
              { year: '2022', title: 'B.Tech. Space Science & Engg.', sub: "First B.Tech of it's kind in IIT System. Arctic Research Facility" },
              { year: 'Present', title: '100+ Alumni · World-Class Labs', sub: 'Alumni at prestigious institutes & industries globally' },
            ].map((t, i) => (
              <div className="about-tl-item" key={i}>
                <div className="about-tl-dot" />
                <div className="about-tl-year">{t.year}</div>
                <div className="about-tl-title">{t.title}</div>
                <div className="about-tl-sub">{t.sub}</div>
              </div>
            ))}
          </div>
        </div>

      </div>


      <Footer />
    </div>
  );
}
