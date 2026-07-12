import CounterStat from './CounterStat';
import Footer from '../Layout/Footer';
import NewsTicker from './NewsTicker';
import Collaborators from './Collaborators';

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

export default function Home({ onNav, news, events }) {
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

  return (
    <div>
      {/* Top strip */}
      <div className="hero-top-strip">
        Department of Astronomy, Astrophysics &amp; Space Engineering &nbsp;·&nbsp;{' '}
        <span><a href="https://www.iiti.ac.in" target="_blank" rel="noopener noreferrer">Indian Institute of Technology Indore</a></span>
        &nbsp;·&nbsp; Est. 2015 &nbsp;·&nbsp;{' '}
        <a href="http://www.fist-dst.org" target="_blank" rel="noopener noreferrer">DST-FIST Funded</a>
      </div>

      {/* Hero main */}
      <div className="hero-main">
        <div className="hero-left">
          <div className="hero-tag">✦ &nbsp;Est. 2015 &nbsp;·&nbsp; IIT Indore</div>
          <h1 className="hero-title">
            Department of<br />
            <span className="accent">Astronomy, Astrophysics</span><br />
            &amp; Space Engineering
          </h1>
          <p className="hero-subtitle">IIT Indore &nbsp;·&nbsp; DAASE</p>
          <p className="hero-tagline">"Exploring the Universe, Engineering the Future"</p>
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

          <div className="scroll-hint">Scroll to explore</div>
        </div>

        <div className="hero-right">
          <div className="news-feed-container anim-fadein glass-card" style={{ animationDelay: '0.2s', paddingBottom: '20px' }}>
            <h2 className="news-feed-title">News &amp; <span>Events</span></h2>

            <div className="vertical-marquee-container">
              <div className="vertical-marquee-content">
                {combinedUpdates.length > 0 ? (() => {
                  // Ensure we always have enough items to fill the container height
                  // so the marquee doesn't jump when we have less data.
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
                    style: { textDecoration: 'none', display: 'block', color: 'inherit' }
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


            <Collaborators />
          </div>
        </div>
      </div>

      {/* About navy strip */}
      <div className="about-strip">
        <div className="about-strip-inner">
          <div className="anim-right">
            <h2>About <span>DAASE</span></h2>
            <p>The Department of Astronomy, Astrophysics and Space Engineering (DAASE) at IIT Indore is the <strong>only dedicated department of its kind among all IITs</strong>, offering a comprehensive academic ecosystem spanning the cosmos to cutting-edge space engineering.</p>
            <p>A founding member of the <strong>Square Kilometre Array – India Consortium (SKA-IC)</strong> since 2015, DAASE plays a significant role in global astronomical collaboration, with faculty contributing to major ISRO and NASA missions.</p>
            <div className="about-highlights-grid" style={{ marginTop: 24 }}>
              <a href="http://www.fist-dst.org" target="_blank" rel="noopener noreferrer" className="about-hl">
                <div className="about-hl-icon">🏆</div>
                <div className="about-hl-title">DST-FIST Funded ↗</div>
                <div className="about-hl-desc">Received DST-FIST funding in 2022 for research excellence</div>
              </a>
              <a href="https://skaindia.ncra.tifr.res.in" target="_blank" rel="noopener noreferrer" className="about-hl">
                <div className="about-hl-icon">📡</div>
                <div className="about-hl-title">SKA-IC Member ↗</div>
                <div className="about-hl-desc">Founding member since 2015 — global radio telescope consortium</div>
              </a>
              <a href="https://www.ncpor.res.in/arctica/index_page-175.html" target="_blank" rel="noopener noreferrer" className="about-hl">
                <div className="about-hl-icon">🧊</div>
                <div className="about-hl-title">Arctic Research ↗</div>
                <div className="about-hl-desc">Atmospheric science at Indian Research Station Himadri since 2022</div>
              </a>
              <a href="https://www.isro.gov.in" target="_blank" rel="noopener noreferrer" className="about-hl">
                <div className="about-hl-icon">🚀</div>
                <div className="about-hl-title">ISRO &amp; NASA ↗</div>
                <div className="about-hl-desc">Active faculty contributions to major space missions</div>
              </a>
            </div>
          </div>

          <div className="timeline anim-left">
            {[
              { year: 'December 2015', text: 'Founded as Centre for Astronomy', sub: 'Ph.D. program launched · Founding SKA-IC member' },
              { year: 'May 2018', text: 'Upgraded to Full Department', sub: 'M.Sc. Astronomy launched — first & only in IITs' },
              { year: '2021', text: 'Space Engineering Programs', sub: 'M.Tech. Space Engineering · M.S. (Research) launched' },
              { year: '2022', text: 'B.Tech. in Space Science & Engineering', sub: 'First B.Tech. of its kind in IIT system · DST-FIST · Arctic research' },
              { year: 'Present', text: '100+ Alumni · World-Class Labs', sub: 'Alumni at prestigious institutes & industries globally' },
            ].map((t, i) => (
              <div className="tl-item" key={i}>
                <div className="tl-year">{t.year}</div>
                <div className="tl-text">{t.text}</div>
                <div className="tl-sub">{t.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
