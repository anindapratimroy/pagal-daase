import Footer from '../Layout/Footer';
import TiltCard from '../Layout/TiltCard';

// Ensure link has protocol prefix
function normalizeLink(link) {
  if (!link) return null;
  const trimmed = link.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return 'https://' + trimmed;
}

// Parse date string into epoch timestamp for reliable sorting
function parseEventDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return 0;
  const str = dateStr.trim();
  if (!str) return 0;

  // 1. Direct standard parseable date (e.g. YYYY-MM-DD or standard Date strings)
  const d = new Date(str);
  if (!isNaN(d.getTime())) return d.getTime();

  // 2. Handle ranges like "December 15–17, 2025" or "July 7-18, 2025"
  const normalized = str.replace(/[–—]/g, '-');
  const rangeMatch = normalized.match(/([a-zA-Z]+)\s+(\d+)(?:\s*-\s*\d+)?(?:,\s*(\d{4}))?/);
  if (rangeMatch) {
    const month = rangeMatch[1];
    const day = rangeMatch[2];
    const year = rangeMatch[3] || new Date().getFullYear();
    const parsed = new Date(`${month} ${day}, ${year}`);
    if (!isNaN(parsed.getTime())) return parsed.getTime();
  }

  // 3. Fallback: match 4-digit year
  const yearMatch = str.match(/\b(20\d\d)\b/);
  if (yearMatch) return new Date(`${yearMatch[1]}-01-01`).getTime();

  return 0;
}

// Format ISO date (e.g. 2026-06-09) to friendly readable string
function formatEventDate(rawDate) {
  if (!rawDate) return '';
  const trimmed = rawDate.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const [y, m, d] = trimmed.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    if (!isNaN(dateObj.getTime())) {
      return dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
  }
  return trimmed;
}

function EventCard({ ev, i, badgeClass, badgeLabel }) {
  const rawLink = ev.link || ev.url || ev.Link || ev.URL || ev.href || '';
  const href = normalizeLink(rawLink);
  const displayDate = formatEventDate(ev.date);

  const cardContent = (
    <>
      <div className={`event-type ${badgeClass}`}>{badgeLabel}</div>
      <h3 className="event-title">{ev.title}</h3>
      {displayDate && <div className="event-date">📅 &nbsp;{displayDate}</div>}
      {href && (
        <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--navy)',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '6px 14px',
            borderRadius: '6px',
          }}>
            View Event ↗
          </span>
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
      >
        <TiltCard
          className={`event-card${badgeClass === 'upcoming' ? ' upcoming-card' : ' past-card'} anim-fadeup`}
          style={{
            animationDelay: `${0.06 + i * 0.07}s`,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {cardContent}
        </TiltCard>
      </a>
    );
  }

  return (
    <TiltCard
      className={`event-card past-card anim-fadeup`}
      style={{
        animationDelay: `${0.06 + i * 0.07}s`,
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {cardContent}
    </TiltCard>
  );
}

export default function Events({ events = [], outreach = [] }) {
  const allEvents = Array.isArray(events) ? events : [];

  // Filter into Upcoming and Past
  const upcomingEvents = allEvents.filter(ev => {
    const t = (ev.type || '').toString().toLowerCase().trim();
    return t === 'upcoming';
  });

  const pastEvents = allEvents.filter(ev => {
    const t = (ev.type || '').toString().toLowerCase().trim();
    return t !== 'upcoming';
  });

  // Sort upcoming chronologically ascending (soonest first)
  const sortedUpcoming = [...upcomingEvents].sort((a, b) => {
    const tsA = parseEventDate(a.date);
    const tsB = parseEventDate(b.date);
    if (tsA && tsB) return tsA - tsB;
    if (tsA) return -1;
    if (tsB) return 1;
    return 0;
  });

  // Sort past events chronologically descending (most recent first)
  const sortedPast = [...pastEvents].sort((a, b) => {
    const tsA = parseEventDate(a.date);
    const tsB = parseEventDate(b.date);
    if (tsA && tsB) return tsB - tsA;
    if (tsA) return -1;
    if (tsB) return 1;
    return 0;
  });

  return (
    <div style={{ background: 'transparent' }}>
      <div className="section-inner">
        {/* Section 1: Upcoming Events */}
        <div className="section-header">
          <span className="section-eyebrow">✦ Academic Life</span>
          <h1 className="section-title">Upcoming <span>Events</span></h1>
          <div className="title-bar" />
        </div>

        <div className="events-grid">
          {sortedUpcoming.length > 0 ? (
            sortedUpcoming.map((ev, i) => (
              <EventCard
                key={`up-${i}`}
                ev={ev}
                i={i}
                badgeClass="upcoming"
                badgeLabel="⬤ &nbsp;Upcoming"
              />
            ))
          ) : (
            <div className="event-card past-card anim-fadeup" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
              <h3 className="event-title">No Upcoming Events</h3>
              <p className="event-date" style={{ marginTop: '8px' }}>Please check back soon for announcements on upcoming workshops and conferences.</p>
            </div>
          )}
        </div>

        {/* Section 2: Past Events */}
        <div className="section-header" style={{ marginTop: '72px' }}>
          <span className="section-eyebrow">✦ Archive</span>
          <h2 className="section-title">Past <span>Events</span></h2>
          <div className="title-bar" />
        </div>

        <div className="events-grid">
          {sortedPast.length > 0 ? (
            sortedPast.map((ev, i) => (
              <EventCard
                key={`past-${i}`}
                ev={ev}
                i={i}
                badgeClass="past"
                badgeLabel="✦ &nbsp;Past Event"
              />
            ))
          ) : (
            <div className="event-card past-card anim-fadeup" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
              <h3 className="event-title">No Past Events Recorded</h3>
            </div>
          )}
        </div>

        {/* Outreach Series (if any) */}
        {outreach && outreach.length > 0 && (
          <>
            <div className="section-header" style={{ marginTop: '72px' }}>
              <span className="section-eyebrow">✦ Community &amp; Science</span>
              <h2 className="section-title">DAASE Outreach <span>Series</span></h2>
              <p className="section-desc">Public talks, stargazing sessions, and astronomy popularization events.</p>
              <div className="title-bar" />
            </div>
            <div className="events-grid">
              {outreach.map((ev, i) => (
                <EventCard
                  key={`out-${i}`}
                  ev={ev}
                  i={i}
                  badgeClass="past"
                  badgeLabel="✦ &nbsp;Outreach"
                />
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
