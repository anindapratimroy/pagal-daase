import { useState, useMemo } from 'react';
import Footer from '../Layout/Footer';
import SearchBar from '../Layout/SearchBar';

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

const DEGREE_TABS = [
  { key: 'all',   label: 'All Degrees' },
  { key: 'phd',   label: 'Ph.D.' },
  { key: 'msc',   label: 'M.Sc. Astronomy' },
  { key: 'mtech', label: 'M.Tech.' },
  { key: 'ms',    label: 'M.S. (Research)' },
];

export default function Alumni({ alumni = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [degreeFilter, setDegreeFilter] = useState('all');
  const [openIdx, setOpenIdx] = useState(0);
  const [collapsedBatches, setCollapsedBatches] = useState(new Set());

  const q = searchQuery.trim().toLowerCase();
  const isFiltering = q.length > 0 || degreeFilter !== 'all';

  // Process batches and filter alumni
  const { filteredBatches, totalMatches, degreeCounts } = useMemo(() => {
    let total = 0;
    const counts = { all: 0, phd: 0, msc: 0, mtech: 0, ms: 0 };

    const matchesQuery = (name, yearStr) => {
      if (!q) return true;
      if (yearStr && yearStr.toLowerCase().includes(q)) return true;
      return name.toLowerCase().includes(q);
    };

    const batches = (alumni || []).map((b) => {
      const yearStr = b.year || '';
      const filterCat = (names, degKey) => {
        if (degreeFilter !== 'all' && degreeFilter !== degKey) return [];
        return (names || []).filter(name => {
          const matched = matchesQuery(name, yearStr);
          if (matched) {
            counts.all++;
            counts[degKey]++;
          }
          return matched;
        });
      };

      const filteredMsc = filterCat(b.msc, 'msc');
      const filteredMtech = filterCat(b.mtech, 'mtech');
      const filteredMs = filterCat(b.ms, 'ms');
      const filteredPhd = filterCat(b.phd, 'phd');

      const batchTotal = filteredMsc.length + filteredMtech.length + filteredMs.length + filteredPhd.length;
      total += batchTotal;

      return {
        ...b,
        filteredMsc,
        filteredMtech,
        filteredMs,
        filteredPhd,
        batchTotal,
      };
    });

    return { filteredBatches: batches, totalMatches: total, degreeCounts: counts };
  }, [alumni, q, degreeFilter]);

  const toggle = (idx) => {
    if (isFiltering) {
      setCollapsedBatches(prev => {
        const next = new Set(prev);
        if (next.has(idx)) next.delete(idx);
        else next.add(idx);
        return next;
      });
    } else {
      setOpenIdx(o => (o === idx ? -1 : idx));
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setDegreeFilter('all');
    setCollapsedBatches(new Set());
  };

  return (
    <div>
      <div className="section-inner">
        <div className="section-header">
          <h1 className="section-title">Distinguished <span>Alumni</span></h1>
          <p className="section-desc">DAASE alumni hold positions at prestigious universities, research institutes, and industries in India and abroad.</p>
          <div className="title-bar" />
        </div>

        {/* ── Search Bar ── */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={handleClear}
          placeholder="Search alumni by name, graduation year (e.g. 2024), or degree..."
          resultCount={q.length > 0 ? totalMatches : null}
          id="alumni-search-input"
        />

        {/* ── Degree Filter Pills ── */}
        <div className="people-search-filter-pills" style={{ marginBottom: '24px', justifyContent: 'center' }}>
          {DEGREE_TABS.map(tab => (
            <button
              key={tab.key}
              type="button"
              className={`search-filter-pill${degreeFilter === tab.key ? ' active' : ''}`}
              onClick={() => setDegreeFilter(tab.key)}
            >
              {tab.label}
              {isFiltering && (
                <span className="search-filter-pill-count">
                  ({degreeCounts[tab.key] || 0})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── No Results State ── */}
        {isFiltering && totalMatches === 0 ? (
          <div className="search-no-results anim-fadein">
            <div className="search-no-results-icon">🎓</div>
            <div className="search-no-results-title">No alumni found</div>
            <p className="search-no-results-desc">
              No graduates matched "{searchQuery}"{degreeFilter !== 'all' ? ` in ${DEGREE_TABS.find(d => d.key === degreeFilter)?.label}` : ''}. Try another name, graduation year, or degree.
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
          <div className="alumni-batches">
            {filteredBatches.map((b, idx) => {
              if (isFiltering && b.batchTotal === 0) return null;

              // During filtering: open by default unless manually collapsed; during normal view: controlled by openIdx
              const isOpen = isFiltering ? !collapsedBatches.has(idx) : openIdx === idx;

              return (
                <div
                  key={idx}
                  className={`alumni-batch anim-fadeup${isOpen ? ' open-batch' : ''}`}
                  style={{ animationDelay: `${0.03 + idx * 0.04}s` }}
                >
                  <div className="alumni-batch-header" onClick={() => toggle(idx)}>
                    <div className="alumni-year">
                      <HighlightMatch text={b.year} query={q} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: isFiltering ? '#ffd97a' : 'var(--text-muted)' }}>
                        {b.batchTotal} {b.batchTotal === 1 ? 'Graduate' : 'Graduates'}
                      </span>
                      <span className={`chevron${isOpen ? ' open' : ''}`}>▾</span>
                    </div>
                  </div>
                  {isOpen && (
                    <div className="alumni-batch-body">
                      {b.filteredPhd?.length > 0 && (
                        <div className="alumni-category">
                          <div className="alumni-cat-title">Ph.D.</div>
                          <div className="alumni-names">
                            {b.filteredPhd.map((n, i) => (
                              <span className="alumni-name" key={i}>
                                <HighlightMatch text={n} query={q} />
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {b.filteredMsc?.length > 0 && (
                        <div className="alumni-category">
                          <div className="alumni-cat-title">M.Sc. Astronomy</div>
                          <div className="alumni-names">
                            {b.filteredMsc.map((n, i) => (
                              <span className="alumni-name" key={i}>
                                <HighlightMatch text={n} query={q} />
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {b.filteredMtech?.length > 0 && (
                        <div className="alumni-category">
                          <div className="alumni-cat-title">M.Tech.</div>
                          <div className="alumni-names">
                            {b.filteredMtech.map((n, i) => (
                              <span className="alumni-name" key={i}>
                                <HighlightMatch text={n} query={q} />
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {b.filteredMs?.length > 0 && (
                        <div className="alumni-category">
                          <div className="alumni-cat-title">M.S. (Research)</div>
                          <div className="alumni-names">
                            {b.filteredMs.map((n, i) => (
                              <span className="alumni-name" key={i}>
                                <HighlightMatch text={n} query={q} />
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
