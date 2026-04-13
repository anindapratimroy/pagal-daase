import Footer from '../Layout/Footer';

export default function Events({ events, outreach }) {
  return (
    <div style={{ background: 'var(--bg)' }}>
      <div className="section-inner">
        <div className="section-header">
          <span className="section-eyebrow">✦ Academic Life</span>
          <h1 className="section-title">Workshops &amp; <span>Events</span></h1>
          <div className="title-bar" />
        </div>
        <div className="events-grid">
          {events.map((ev, i) => (
            <div
              key={i}
              className={`event-card${ev.type === 'upcoming' ? ' upcoming-card' : ' past-card'} anim-fadeup`}
              style={{ animationDelay: `${0.06 + i * 0.07}s` }}
            >
              <div className={`event-type ${ev.type === 'upcoming' ? 'upcoming' : 'past'}`}>
                {ev.type === 'upcoming' ? '⬤ \u00a0Upcoming' : '✦ \u00a0Past Event'}
              </div>
              <h3 className="event-title">{ev.title}</h3>
              <div className="event-date">📅 &nbsp;{ev.date}</div>
            </div>
          ))}
        </div>

        {outreach && outreach.length > 0 && (
          <>
            <div className="section-header" style={{ marginTop: '60px' }}>
              <span className="section-eyebrow">✦ Community & Science</span>
              <h2 className="section-title">DAASE Outreach <span>Series</span></h2>
              <p className="section-desc">Public talks, stargazing sessions, and astronomy popularization events.</p>
              <div className="title-bar" />
            </div>
            <div className="events-grid">
              {outreach.map((ev, i) => (
                <div
                  key={i}
                  className="event-card past-card anim-fadeup"
                  style={{ animationDelay: `${0.06 + i * 0.07}s` }}
                >
                  <div className="event-type past">✦ &nbsp;Outreach</div>
                  <h3 className="event-title">{ev.title}</h3>
                  <div className="event-date">📅 &nbsp;{ev.date}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
