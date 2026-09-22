import React, { useMemo, useState } from 'react';
import { useData, normalizePubUrl } from '../../hooks/useData';
import { formatPublicationDate } from '../../utils/dateUtils';
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

export default function Publications({ publications: propPubs }) {
  const { publications: hookPubs } = useData();
  const rawPubs = propPubs || hookPubs || [];
  const [searchQuery, setSearchQuery] = useState('');

  const activePubs = useMemo(() => {
    return (rawPubs || []).filter(p => !p.status || p.status.toLowerCase() !== 'archived');
  }, [rawPubs]);

  const q = searchQuery.trim().toLowerCase();
  const isSearching = q.length > 0;

  const filteredPubs = useMemo(() => {
    if (!q) return activePubs;
    const terms = q.split(/\s+/).filter(Boolean);
    return activePubs.filter(pub => {
      const text = getPubText(pub).toLowerCase();
      const date = (pub.date || '').toLowerCase();
      const combined = `${text} ${date}`;
      return terms.every(t => combined.includes(t));
    });
  }, [activePubs, q]);

  if (!activePubs || activePubs.length === 0) return null;

  return (
    <div id="publications-section" className="publications-section" data-aos="fade-up">
      <div style={{ width: '100%', padding: '0 clamp(20px, 5%, 80px)', boxSizing: 'border-box' }}>
        <div className="publications-header">
          <div className="pub-title-group">
            <span className="pub-eyebrow">✦ Latest Research</span>
            <h2>Research Publications</h2>
            <div className="pub-title-bar" />
          </div>

          {/* ── Inline Publications Search ── */}
          <div className="pub-search-wrap">
            <span className="pub-search-icon" aria-hidden="true">🔍</span>
            <input
              type="text"
              className="pub-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 250+ papers by author, keyword, or journal..."
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
        </div>

        {/* ── SEARCH MODE: Filtered Interactive List ── */}
        {isSearching ? (
          <div>
            <div className="pub-search-status-bar">
              <span className="pub-search-status-text">
                {filteredPubs.length === 0
                  ? `No papers found matching "${searchQuery}"`
                  : `Showing ${filteredPubs.length} ${filteredPubs.length === 1 ? 'paper' : 'papers'} matching "${searchQuery}"`}
              </span>
              <button
                type="button"
                className="search-switch-pill"
                onClick={() => setSearchQuery('')}
                style={{ fontSize: '11.5px', padding: '4px 10px' }}
              >
                Show All Papers
              </button>
            </div>

            {filteredPubs.length > 0 ? (
              <div className="pub-search-results-list">
                {filteredPubs.map((pub, realIdx) => {
                  const text = getPubText(pub);
                  const url = getPubUrl(pub);
                  const pubDateBadge = pub.displayDate || formatPublicationDate(pub.date, text);

                  const displayText = text
                    .replace(/^\d+[\.\)]\s*/, '')
                    .replace(/\[\s*Link:?\s*https?:\/\/[^\]]+\]/gi, '')
                    .replace(/\(\s*Link:?\s*https?:\/\/[^\)]+\)/gi, '')
                    .replace(/\[\s*https?:\/\/[^\]]+\]/gi, '')
                    .replace(/https?:\/\/[^\s]+$/gi, '')
                    .trim()
                    .replace(/[;,]\s*$/, '')
                    .trim();

                  return (
                    <div key={realIdx} className={`pub-item${url ? ' pub-item--linked' : ''}`}>
                      <span className="pub-num">{(realIdx + 1).toString().padStart(2, '0')}.</span>
                      <div className="pub-body">
                        {url ? (
                          <a href={url} target="_blank" rel="noopener noreferrer" className="pub-link" title="Open paper">
                            <span className="pub-text">
                              <HighlightMatch text={displayText || text} query={q} />
                              {pubDateBadge && <span className="pub-date-badge">{pubDateBadge}</span>}
                            </span>
                            <span className="pub-arrow">↗</span>
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
              <div className="search-no-results anim-fadein" style={{ padding: '32px 20px', margin: '16px 0' }}>
                <div className="search-no-results-icon">📄</div>
                <div className="search-no-results-title">No research papers found</div>
                <p className="search-no-results-desc">
                  Try searching with an author's last name (e.g. "Bhattacharya", "Majumdar"), or a broad keyword like "cosmic", "radio", or "accretion".
                </p>
              </div>
            )}
          </div>
        ) : (
          /* ── DEFAULT AMBIENT MODE: Infinite Scroller ── */
          <div className="publications-scroller">
            <div className="publications-content">
              {[...activePubs, ...activePubs].map((pub, idx) => {
                const realIdx = idx % activePubs.length;
                const text = getPubText(pub);
                const url = getPubUrl(pub);
                const pubDateBadge = pub.displayDate || formatPublicationDate(pub.date, text);

                const displayText = text
                  .replace(/^\d+[\.\)]\s*/, '')
                  .replace(/\[\s*Link:?\s*https?:\/\/[^\]]+\]/gi, '')
                  .replace(/\(\s*Link:?\s*https?:\/\/[^\)]+\)/gi, '')
                  .replace(/\[\s*https?:\/\/[^\]]+\]/gi, '')
                  .replace(/https?:\/\/[^\s]+$/gi, '')
                  .trim()
                  .replace(/[;,]\s*$/, '')
                  .trim();

                return (
                  <div key={idx} className={`pub-item${url ? ' pub-item--linked' : ''}`}>
                    <span className="pub-num">{(realIdx + 1).toString().padStart(2, '0')}.</span>
                    <div className="pub-body">
                      {url ? (
                        <a href={url} target="_blank" rel="noopener noreferrer" className="pub-link" title="Open paper">
                          <span className="pub-text">
                            {displayText || text}
                            {pubDateBadge && <span className="pub-date-badge">{pubDateBadge}</span>}
                          </span>
                          <span className="pub-arrow">↗</span>
                        </a>
                      ) : (
                        <span className="pub-text">
                          {displayText || text}
                          {pubDateBadge && <span className="pub-date-badge">{pubDateBadge}</span>}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
