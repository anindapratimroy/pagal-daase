import Footer from '../Layout/Footer';

// Ensure link has protocol prefix
function normalizeLink(link) {
  if (!link) return null;
  const trimmed = link.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return 'https://' + trimmed;
}

function EventCard({ ev, i, badgeClass, badgeLabel }) {
  const href = normalizeLink(ev.link);
  const CardTag = href ? 'a' : 'div';
  const linkProps = href
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <CardTag
      key={i}
      className={`event-card${ev.type === 'upcoming' ? ' upcoming-card' : ' past-card'} anim-fadeup`}
      style={{
        animationDelay: `${0.06 + i * 0.07}s`,
        cursor: href ? 'pointer' : 'default',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      {...linkProps}
    >
      <div className={`event-type ${badgeClass}`}>{badgeLabel}</div>
      <h3 className="event-title">{ev.title}</h3>
      {ev.date && <div className="event-date">📅 &nbsp;{ev.date}</div>}
      {href && (
        <div style={{ marginTop: 'auto', paddingTop: '12px', fontSize: '13px', color: 'var(--gold)', fontWeight: 600 }}>
          Visit ↗
        </div>
      )}
    </CardTag>
  );
}

export default function Events({ events, outreach }) {
  return (
    <div style={{ background: 'transparent' }}>
      <div className="section-inner">
        <div className="section-header">
          <span className="section-eyebrow">✦ Academic Life</span>
          <h1 className="section-title">Workshops &amp; <span>Events</span></h1>
          <div className="title-bar" />
        </div>
        <div className="events-grid">
          {events.map((ev, i) => (
            <EventCard
              key={i}
              ev={ev}
              i={i}
              badgeClass={ev.type === 'upcoming' ? 'upcoming' : 'past'}
              badgeLabel={ev.type === 'upcoming' ? '⬤ \u00a0Upcoming' : '✦ \u00a0Past Event'}
            />
          ))}
        </div>

        {outreach && outreach.length > 0 && (
          <>
            <div className="section-header" style={{ marginTop: '60px' }}>
              <span className="section-eyebrow">✦ Community &amp; Science</span>
              <h2 className="section-title">DAASE Outreach <span>Series</span></h2>
              <p className="section-desc">Public talks, stargazing sessions, and astronomy popularization events.</p>
              <div className="title-bar" />
            </div>
            <div className="events-grid">
              {outreach.map((ev, i) => (
                <EventCard
                  key={i}
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
