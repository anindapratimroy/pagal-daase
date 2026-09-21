import React, { useMemo, useState } from 'react';
import { useData, normalizePubUrl } from '../../hooks/useData';
import { sortPublications, formatPublicationDate } from '../../utils/dateUtils';
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

export default function Publications({ publications: propPubs }) {
  const { publications: hookPubs } = useData();
  const rawPubs = propPubs || hookPubs || [];
  const [stageFilter, setStageFilter] = useState('all'); // 'all' | 'active' | 'archived'

  const activeCount = useMemo(() => {
    return (rawPubs || []).filter(p => !p.status || p.status.toLowerCase() !== 'archived').length;
  }, [rawPubs]);

  const archivedCount = useMemo(() => {
    return (rawPubs || []).filter(p => p.status && p.status.toLowerCase() === 'archived').length;
  }, [rawPubs]);

  const filteredPubs = useMemo(() => {
    if (!rawPubs || rawPubs.length === 0) return [];
    if (stageFilter === 'active') {
      return rawPubs.filter(p => !p.status || p.status.toLowerCase() !== 'archived');
    }
    if (stageFilter === 'archived') {
      return rawPubs.filter(p => p.status && p.status.toLowerCase() === 'archived');
    }
    return rawPubs;
  }, [rawPubs, stageFilter]);

  const sortedPubs = useMemo(() => sortPublications(filteredPubs), [filteredPubs]);

  if (!rawPubs || rawPubs.length === 0) return null;

  return (
    <div id="publications-section" className="publications-section" data-aos="fade-up">
      <div style={{ width: '100%', padding: '0 clamp(20px, 5%, 80px)', boxSizing: 'border-box' }}>
        <div className="publications-header">
          <div>
            <span className="pub-eyebrow">✦ Latest Research</span>
            <h2>Department Publications</h2>
          </div>
          <div className="pub-title-bar" />

          {/* Stage Filter Tabs (All / Active / Archived) */}
          <div className="pub-filter-tabs">
            <button
              type="button"
              className={`pub-filter-pill${stageFilter === 'all' ? ' active' : ''}`}
              onClick={() => setStageFilter('all')}
              title="Show all publications"
            >
              All <span className="pub-pill-count">({rawPubs.length})</span>
            </button>
            <button
              type="button"
              className={`pub-filter-pill${stageFilter === 'active' ? ' active' : ''}`}
              onClick={() => setStageFilter('active')}
              title="Show active publications"
            >
              Active <span className="pub-pill-count">({activeCount})</span>
            </button>
            <button
              type="button"
              className={`pub-filter-pill${stageFilter === 'archived' ? ' active' : ''}`}
              onClick={() => setStageFilter('archived')}
              title="Show archived publications"
            >
              Archived <span className="pub-pill-count">({archivedCount})</span>
            </button>
          </div>
        </div>

        {sortedPubs.length > 0 ? (
          <div className="publications-scroller">
            <div className="publications-content">
              {/* Render list twice for seamless infinite scrolling */}
              {[...sortedPubs, ...sortedPubs].map((pub, idx) => {
                const realIdx = idx % sortedPubs.length;
                const text = getPubText(pub);
                const url = getPubUrl(pub);
                const isArchived = pub.status === 'archived';
                const pubDateBadge = pub.displayDate || formatPublicationDate(pub.date, text);

                // Split the display text to avoid showing raw URLs inline
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
                            {isArchived && <span className="pub-badge-archived">Archived</span>}
                          </span>
                          <span className="pub-arrow">↗</span>
                        </a>
                      ) : (
                        <span className="pub-text">
                          {displayText || text}
                          {pubDateBadge && <span className="pub-date-badge">{pubDateBadge}</span>}
                          {isArchived && <span className="pub-badge-archived">Archived</span>}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="pub-empty-note">
            No {stageFilter} publications to display right now.
          </div>
        )}
      </div>
    </div>
  );
}
