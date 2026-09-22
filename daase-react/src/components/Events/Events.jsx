import { useState, useMemo } from 'react';
import Footer from '../Layout/Footer';
import TiltCard from '../Layout/TiltCard';
import SearchBar from '../Layout/SearchBar';

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

function HighlightMatch({ text, query }) {
  if (!query || !text) return text;
  const terms = query.trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return text;

  const escapedTerms = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escapedTerms.join('|')})`, 'gi');
  const parts = String(text).split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        terms.some((term) => term.toLowerCase() === part.toLowerCase()) ? (
          <mark key={i} className="search-highlight">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}

function matchesEvent(ev, q) {
  if (!ev) return false;
  const terms = q.split(/\s+/).filter(Boolean);
  const searchableText = `${ev.title || ''} ${ev.date || ''} ${ev.type || ''} ${ev.desc || ''} ${ev.description || ''} ${ev.venue || ''} ${ev.speaker || ''}`.toLowerCase();
  return terms.every(term => searchableText.includes(term));
}

function EventCard({ ev, i, badgeClass, badgeLabel, query }) {
  const rawLink = ev.link || ev.url || ev.Link || ev.URL || ev.href || '';
  const href = normalizeLink(rawLink);
  const displayDate = formatEventDate(ev.date);

  const cardContent = (
    <>
      <div className={`event-type ${badgeClass}`}>{badgeLabel}</div>
      <h3 className="event-title">
        <HighlightMatch text={ev.title} query={query} />
      </h3>
      {displayDate && (
        <div className="event-date">
          📅 &nbsp;<HighlightMatch text={displayDate} query={query} />
        </div>
      )}
      {ev.speaker && (
        <div className="event-speaker" style={{ fontSize: '13px', color: 'var(--gold)', marginTop: '4px' }}>
          🎤 <HighlightMatch text={ev.speaker} query={query} />
        </div>
      )}
      {ev.venue && (
        <div className="event-venue" style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
          📍 <HighlightMatch text={ev.venue} query={query} />
        </div>
      )}
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
      className={`event-card${badgeClass === 'upcoming' ? ' upcoming-card' : ' past-card'} anim-fadeup`}
      style={{
        animationDelay: `${0.06 + i * 0.07}s`,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {cardContent}
    </TiltCard>
  );
}

export default function Events({ events = [], outreach = [], onNav }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all' | 'upcoming' | 'past' | 'outreach'
  const [selectedYear, setSelectedYear] = useState('all');

  const allEvents = Array.isArray(events) ? events : [];

  // Extract available years across all events
  const availableYears = useMemo(() => {
    const years = new Set();
    [...allEvents, ...(outreach || [])].forEach(ev => {
      if (ev.date) {
        const m = String(ev.date).match(/\b(20\d{2})\b/);
        if (m) years.add(m[1]);
      }
    });
    return Array.from(years).sort().reverse();
  }, [allEvents, outreach]);

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
  const sortedUpcoming = useMemo(() => {
    return [...upcomingEvents].sort((a, b) => {
      const tsA = parseEventDate(a.date);
      const tsB = parseEventDate(b.date);
      if (tsA && tsB) return tsA - tsB;
      if (tsA) return -1;
      if (tsB) return 1;
      return 0;
    });
  }, [upcomingEvents]);

  // Sort past events chronologically descending (most recent first)
  const sortedPast = useMemo(() => {
    return [...pastEvents].sort((a, b) => {
      const tsA = parseEventDate(a.date);
      const tsB = parseEventDate(b.date);
      if (tsA && tsB) return tsB - tsA;
      if (tsA) return -1;
      if (tsB) return 1;
      return 0;
    });
  }, [pastEvents]);

  const q = searchQuery.trim().toLowerCase();
  const isSearching = q.length > 0;
  const isFiltering = isSearching || categoryFilter !== 'all' || selectedYear !== 'all';

  const matchesYear = (ev) => {
    if (selectedYear === 'all') return true;
    return ev.date && String(ev.date).includes(selectedYear);
  };

  // Filtered lists
  const filteredUpcoming = useMemo(() => {
    if (categoryFilter === 'past' || categoryFilter === 'outreach') return [];
    return sortedUpcoming.filter(ev => {
      if (!matchesYear(ev)) return false;
      if (!q) return true;
      return matchesEvent(ev, q);
    });
  }, [sortedUpcoming, q, categoryFilter, selectedYear]);

  const filteredPast = useMemo(() => {
    if (categoryFilter === 'upcoming' || categoryFilter === 'outreach') return [];
    return sortedPast.filter(ev => {
      if (!matchesYear(ev)) return false;
      if (!q) return true;
      return matchesEvent(ev, q);
    });
  }, [sortedPast, q, categoryFilter, selectedYear]);

  const filteredOutreach = useMemo(() => {
    if (!outreach || !Array.isArray(outreach)) return [];
    if (categoryFilter === 'upcoming' || categoryFilter === 'past') return [];
    return outreach.filter(ev => {
      if (!matchesYear(ev)) return false;
      if (!q) return true;
      return matchesEvent(ev, q);
    });
  }, [outreach, q, categoryFilter, selectedYear]);

  const totalEventMatches = filteredUpcoming.length + filteredPast.length + filteredOutreach.length;

  const handleClear = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setSelectedYear('all');
  };

  return (
    <div style={{ background: 'transparent' }}>
      <div className="section-inner">
        {/* Main Section Header */}
        <div className="section-header" style={{ marginBottom: '28px' }}>
          <h1 className="section-title">Events at <span>DAASE</span></h1>
          <p className="section-desc">Conferences, workshops, academic seminars, and outreach initiatives.</p>
          <div className="title-bar" />
        </div>

        {/* ── Search Bar ── */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={handleClear}
          placeholder="Search events by title, keyword, speaker, year, or venue..."
          resultCount={isSearching ? totalEventMatches : null}
          id="events-search-input"
        />

        {/* ── Event Category Filter Pills ── */}
        <div className="people-search-filter-pills" style={{ marginBottom: '16px', justifyContent: 'center' }}>
          {[
            { key: 'all',      label: 'All Events' },
            { key: 'upcoming', label: 'Upcoming' },
            { key: 'past',     label: 'Past Events' },
            { key: 'outreach', label: 'Outreach Initiatives' },
          ].map(tab => (
            <button
              key={tab.key}
              type="button"
              className={`search-filter-pill${categoryFilter === tab.key ? ' active' : ''}`}
              onClick={() => setCategoryFilter(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Year Filter Chips ── */}
        {availableYears.length > 0 && (
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
            <button
              type="button"
              className={`opp-tier-pill${selectedYear === 'all' ? ' active' : ''}`}
              onClick={() => setSelectedYear('all')}
              style={{ fontSize: '12px', padding: '4px 12px' }}
            >
              All Years
            </button>
            {availableYears.map(yr => (
              <button
                key={yr}
                type="button"
                className={`opp-tier-pill${selectedYear === yr ? ' active' : ''}`}
                onClick={() => setSelectedYear(yr)}
                style={{ fontSize: '12px', padding: '4px 12px' }}
              >
                {yr}
              </button>
            ))}
          </div>
        )}

        {/* If searching and zero results anywhere */}
        {isFiltering && totalEventMatches === 0 ? (
          <div className="search-no-results">
            <div className="search-no-results-icon">📅</div>
            <div className="search-no-results-title">No events found</div>
            <p className="search-no-results-desc">
              No events matched "{searchQuery}" with the current filters. Try selecting "All Events" or "All Years".
            </p>
            <button
              type="button"
              className="search-switch-pill"
              onClick={handleClear}
            >
              Reset Search &amp; Filters
            </button>
          </div>
        ) : (
          <>
            {/* Section 1: Upcoming Events */}
            {(!isSearching || filteredUpcoming.length > 0) && (
              <div style={{ marginBottom: '56px' }}>
                <div className="section-header" style={{ marginBottom: '28px' }}>
                  <h2 className="section-title">
                    Upcoming <span>Events</span> {isSearching && `(${filteredUpcoming.length})`}
                  </h2>
                  <div className="title-bar" />
                </div>

                <div className={`events-grid count-${filteredUpcoming.length}`}>
                  {filteredUpcoming.length > 0 ? (
                    filteredUpcoming.map((ev, i) => (
                      <EventCard
                        key={`up-${i}`}
                        ev={ev}
                        i={i}
                        badgeClass="upcoming"
                        badgeLabel="⬤ &nbsp;Upcoming"
                        query={q}
                      />
                    ))
                  ) : (
                    <div className="event-card past-card anim-fadeup" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                      <h3 className="event-title">No Upcoming Events</h3>
                      <p className="event-date" style={{ marginTop: '8px' }}>Please check back soon for announcements on upcoming workshops and conferences.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Section 2: Past Events */}
            {(!isSearching || filteredPast.length > 0) && (
              <div style={{ marginBottom: '56px', marginTop: (!isSearching || filteredUpcoming.length > 0) ? '20px' : '0' }}>
                <div className="section-header" style={{ marginBottom: '28px' }}>
                  <h2 className="section-title">
                    Past <span>Events</span> {isSearching && `(${filteredPast.length})`}
                  </h2>
                  <div className="title-bar" />
                </div>

                <div className={`events-grid count-${filteredPast.length}`}>
                  {filteredPast.length > 0 ? (
                    filteredPast.map((ev, i) => (
                      <EventCard
                        key={`past-${i}`}
                        ev={ev}
                        i={i}
                        badgeClass="past"
                        badgeLabel="✦ &nbsp;Past Event"
                        query={q}
                      />
                    ))
                  ) : (
                    <div className="event-card past-card anim-fadeup" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                      <h3 className="event-title">No Past Events Recorded</h3>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Section 3: Outreach Series */}
            {(!isSearching && outreach && outreach.length > 0) || (isSearching && filteredOutreach.length > 0) ? (
              <div style={{ marginBottom: '56px' }}>
                <div className="section-header" style={{ marginBottom: '28px' }}>
                  <h2 className="section-title">
                    DAASE Outreach <span>Series</span> {isSearching && `(${filteredOutreach.length})`}
                  </h2>
                  <p className="section-desc">Public talks, stargazing sessions, and astronomy popularization events.</p>
                  <div className="title-bar" />
                </div>

                <div className={`events-grid count-${filteredOutreach.length}`}>
                  {filteredOutreach.map((ev, i) => (
                    <EventCard
                      key={`out-${i}`}
                      ev={ev}
                      i={i}
                      badgeClass="past"
                      badgeLabel="✦ &nbsp;Outreach"
                      query={q}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>

      <Footer onNav={onNav} />
    </div>
  );
}

