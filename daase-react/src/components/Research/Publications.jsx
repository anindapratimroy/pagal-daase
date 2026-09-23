import React, { useMemo, useState } from 'react';
import { useData, normalizePubUrl } from '../../hooks/useData';
import { formatPublicationDate } from '../../utils/dateUtils';
import Footer from '../Layout/Footer';
import './Publications.css';

function getPubText(pub) {
  if (!pub) return '';
  if (typeof pub === 'string') return pub;
  return pub.text || pub.citation || pub.title || '';
}

function getPubUrl(pub) {
  if (!pub) return null;
  if (typeof pub === 'object' && pub.url) return normalizePubUrl(pub.url);
  return normalizePubUrl(pub);
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

export default function Publications({ onNav, publications: propPubs }) {
  const { publications: hookPubs } = useData();
  const activePubs = useMemo(() => {
    const raw = propPubs || hookPubs || [];
    return raw.filter(p => !p.status || p.status.toLowerCase() !== 'archived');
  }, [propPubs, hookPubs]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');

  // Extract available publication years
  const availableYears = useMemo(() => {
    const yearCounts = {};
    activePubs.forEach(pub => {
      const text = getPubText(pub);
      const date = pub.date || '';
      const m = (date + ' ' + text).match(/\b(201\d|202\d)\b/);
      if (m) {
        const yr = m[1];
        yearCounts[yr] = (yearCounts[yr] || 0) + 1;
      }
    });

    const sortedYears = Object.keys(yearCounts).sort((a, b) => b.localeCompare(a));
    return sortedYears.map(yr => ({ year: yr, count: yearCounts[yr] }));
  }, [activePubs]);

  // Histogram data: chronologically ascending (earliest year to newest year)
  const histogramData = useMemo(() => {
    if (!availableYears.length) return { list: [], max: 1 };
    const chronological = [...availableYears].sort((a, b) => a.year.localeCompare(b.year));
    const max = Math.max(...chronological.map(d => d.count), 1);
    return {
      list: chronological.map(d => ({
        ...d,
        percentage: Math.max(Math.round((d.count / max) * 100), 14)
      })),
      max
    };
  }, [availableYears]);

  const q = searchQuery.trim().toLowerCase();
  const isSearching = q.length > 0;
  const isYearFiltered = selectedYear !== 'all';

  const filteredPubs = useMemo(() => {
    let result = activePubs;

    if (selectedYear !== 'all') {
      result = result.filter(pub => {
        const text = getPubText(pub);
        const date = pub.date || '';
        return (date + ' ' + text).includes(selectedYear);
      });
    }

    if (q) {
      const terms = q.split(/\s+/).filter(Boolean);
      result = result.filter(pub => {
        const text = getPubText(pub).toLowerCase();
        const date = (pub.date || '').toLowerCase();
        const combined = `${text} ${date}`;
        return terms.every(t => combined.includes(t));
      });
    }

    return result;
  }, [activePubs, selectedYear, q]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedYear('all');
  };

  return (
    <div className="publications-page fade-in">
      <div className="publications-inner-container">
        {/* ── Page Header ── */}
        <div className="section-header center" data-aos="fade-up">
          <span className="pub-eyebrow">✦ Academic Contributions</span>
          <h1 className="section-title">Research <span>Publications</span></h1>
          <p className="section-desc">
            Peer-reviewed journal articles, conference proceedings, and groundbreaking scientific research published by DAASE faculty, researchers, and scholars.
          </p>
          <div className="title-bar" />
        </div>

        {/* ── Annual Research Output Histogram ── */}
        {histogramData.list.length > 0 && (
          <div className="pub-histogram-card" data-aos="fade-up" data-aos-delay="60">
            <div className="pub-histogram-header">
              <div className="pub-histogram-title-wrap">
                <span className="pub-histogram-icon" aria-hidden="true">📊</span>
                <div>
                  <h3 className="pub-histogram-title">Publication Output by Year</h3>
                  <p className="pub-histogram-subtitle">
                    Distribution of peer-reviewed articles across academic years · Live dataset ({activePubs.length} total papers)
                  </p>
                </div>
              </div>

              <div className="pub-histogram-actions">
                {selectedYear !== 'all' ? (
                  <button
                    type="button"
                    className="pub-hist-reset-btn"
                    onClick={() => setSelectedYear('all')}
                    title="Reset to all years"
                  >
                    Showing Year <strong>{selectedYear}</strong> · Reset ✕
                  </button>
                ) : (
                  <span className="pub-hist-hint">
                    Click any bar to filter papers
                  </span>
                )}
              </div>
            </div>

            {/* Chart Area */}
            <div className="pub-histogram-chart-area">
              {/* Reference Grid Lines */}
              <div className="pub-histogram-grid" aria-hidden="true">
                <div className="pub-grid-line" style={{ bottom: '100%' }}><span>{histogramData.max}</span></div>
                <div className="pub-grid-line" style={{ bottom: '66%' }}><span>{Math.round(histogramData.max * 0.66)}</span></div>
                <div className="pub-grid-line" style={{ bottom: '33%' }}><span>{Math.round(histogramData.max * 0.33)}</span></div>
                <div className="pub-grid-line" style={{ bottom: '0%' }}><span>0</span></div>
              </div>

              {/* Bars Row */}
              <div className="pub-histogram-bars" role="group" aria-label="Publications per year chart">
                {histogramData.list.map(({ year, count, percentage }) => {
                  const isSelected = selectedYear === year;
                  return (
                    <div
                      key={year}
                      className={`pub-hist-col${isSelected ? ' active' : ''}`}
                      onClick={() => setSelectedYear(selectedYear === year ? 'all' : year)}
                      role="button"
                      tabIndex={0}
                      title={`${year}: ${count} publication${count === 1 ? '' : 's'}. Click to filter.`}
                      aria-label={`${year}: ${count} publications`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedYear(selectedYear === year ? 'all' : year);
                        }
                      }}
                    >
                      <div className="pub-hist-bar-track">
                        <div
                          className="pub-hist-bar-fill"
                          style={{ height: `${percentage}%` }}
                        >
                          <span className="pub-hist-count-val">{count}</span>
                        </div>
                      </div>
                      <span className="pub-hist-year-label">{year}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── Search & Filter Controls ── */}
        <div className="pub-controls-card" data-aos="fade-up" data-aos-delay="100">
          <div className="pub-search-row">
            <div className="pub-search-wrap">
              <span className="pub-search-icon" aria-hidden="true">🔍</span>
              <input
                type="text"
                className="pub-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search papers by author, keyword, or journal..."
                aria-label="Search publications"
              />
              {isSearching && (
                <button
                  type="button"
                  className="pub-search-clear"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                  aria-label="Clear publication search"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="pub-total-badge">
              <span className="pub-total-count">{activePubs.length}</span>
              <span className="pub-total-label">Total Papers</span>
            </div>
          </div>

          {/* Year Filter Pills */}
          {availableYears.length > 0 && (
            <div className="pub-year-filters" role="group" aria-label="Filter publications by year">
              <button
                type="button"
                className={`pub-filter-pill${selectedYear === 'all' ? ' active' : ''}`}
                onClick={() => setSelectedYear('all')}
              >
                All Years <span className="pub-pill-count">({activePubs.length})</span>
              </button>
              {availableYears.map(({ year, count }) => (
                <button
                  key={year}
                  type="button"
                  className={`pub-filter-pill${selectedYear === year ? ' active' : ''}`}
                  onClick={() => setSelectedYear(year)}
                >
                  {year} <span className="pub-pill-count">({count})</span>
                </button>
              ))}
            </div>
          )}

          {/* Active Filter Status */}
          {(isSearching || isYearFiltered) && (
            <div className="pub-search-status-bar">
              <span className="pub-search-status-text">
                {filteredPubs.length === 0
                  ? `No papers found matching criteria`
                  : `Showing ${filteredPubs.length} ${filteredPubs.length === 1 ? 'paper' : 'papers'}${isYearFiltered ? ` from ${selectedYear}` : ''}${isSearching ? ` matching "${searchQuery}"` : ''}`}
              </span>
              <button
                type="button"
                className="search-switch-pill"
                onClick={handleResetFilters}
                style={{ fontSize: '11.5px', padding: '4px 12px' }}
              >
                Clear Filters / Show All
              </button>
            </div>
          )}
        </div>

        {/* ── Full Non-Scrolling Publication List ── */}
        <div className="pub-list-container" data-aos="fade-up" data-aos-delay="150">
          {filteredPubs.length > 0 ? (
            <div className="pub-full-list">
              {filteredPubs.map((pub, idx) => {
                const text = getPubText(pub);
                const url = getPubUrl(pub);
                const pubDateBadge = pub.displayDate || formatPublicationDate(pub.date, text);

                const displayText = text
                  .replace(/^\d+[.)]\s*/, '')
                  .replace(/\[\s*Link:?[^\]]+\]/gi, '')
                  .replace(/\(\s*Link:?[^)]+\)/gi, '')
                  .replace(/\[[^\]]+\]/gi, '')
                  .replace(/https?:\/\/\S+$/gi, '')
                  .trim()
                  .replace(/[;,]\s*$/, '')
                  .trim();

                return (
                  <div key={idx} className={`pub-item${url ? ' pub-item--linked' : ''}`}>
                    <span className="pub-num">{(idx + 1).toString().padStart(2, '0')}.</span>
                    <div className="pub-body">
                      {url ? (
                        <a href={url} target="_blank" rel="noopener noreferrer" className="pub-link" title="Open paper in new tab">
                          <span className="pub-text">
                            <HighlightMatch text={displayText || text} query={q} />
                            {pubDateBadge && <span className="pub-date-badge">{pubDateBadge}</span>}
                          </span>
                          <span className="pub-arrow" aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <span className="pub-text">
                          <HighlightMatch text={displayText || text} query={q} />
                          {pubDateBadge && <span className="pub-date-badge">{pubDateBadge}</span>}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="search-no-results anim-fadein" style={{ padding: '48px 24px', margin: '24px 0' }}>
              <div className="search-no-results-icon">📄</div>
              <div className="search-no-results-title">No research publications found</div>
              <p className="search-no-results-desc">
                No papers matched your current filter. Try searching with a different author name, a general keyword, or clearing the year filter.
              </p>
              <button
                type="button"
                className="search-switch-pill"
                onClick={handleResetFilters}
                style={{ marginTop: '16px', display: 'inline-block' }}
              >
                Reset Search &amp; Show All
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer onNav={onNav} />
    </div>
  );
}
