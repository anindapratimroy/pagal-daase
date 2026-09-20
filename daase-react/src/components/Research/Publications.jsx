import React, { useMemo } from 'react';
import { useData, normalizePubUrl } from '../../hooks/useData';
import { sortPublications } from '../../utils/dateUtils';
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
  const rawPubs = propPubs || hookPubs;
  const sortedPubs = useMemo(() => sortPublications(rawPubs), [rawPubs]);

  if (!sortedPubs || sortedPubs.length === 0) return null;

  return (
    <div id="publications-section" className="publications-section" data-aos="fade-up">
      <div style={{ width: '100%', padding: '0 clamp(20px, 5%, 80px)', boxSizing: 'border-box' }}>
        <div className="publications-header">
          <div>
            <span className="pub-eyebrow">✦ Latest Research</span>
            <h2>Recent Publications</h2>
          </div>
          <div className="pub-title-bar" />
        </div>

        <div className="publications-scroller">
          <div className="publications-content">
            {/* Render list twice for seamless infinite scrolling */}
            {[...sortedPubs, ...sortedPubs].map((pub, idx) => {
              const realIdx = idx % sortedPubs.length;
              const text = getPubText(pub);
              const url = getPubUrl(pub);

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
                        <span className="pub-text">{displayText || text}</span>
                        <span className="pub-arrow">↗</span>
                      </a>
                    ) : (
                      <span className="pub-text">{displayText || text}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
