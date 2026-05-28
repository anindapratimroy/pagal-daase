import React from 'react';
import { useData } from '../../hooks/useData';
import './Publications.css';

/**
 * Each publication can be:
 *   - a string (fallback)  → shown as text, no link
 *   - an object { text, url, title, doi, ... } (from Google Sheets) → shown as clickable link
 */
function getPubText(pub) {
  if (typeof pub === 'string') return pub;
  return pub.text || pub.title || pub.citation || '';
}

function getPubUrl(pub) {
  if (typeof pub === 'string') {
    // Extract any embedded URL from the string
    const m = pub.match(/(https?:\/\/[^\s]+)/);
    return m ? m[1] : null;
  }
  return pub.url || pub.doi || pub.link || null;
}

export default function Publications() {
  const { publications } = useData();

  if (!publications || publications.length === 0) return null;

  return (
    <div className="publications-section">
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 40px' }}>
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
            {[...publications, ...publications].map((pub, idx) => {
              const realIdx = idx % publications.length;
              const text = getPubText(pub);
              const url = getPubUrl(pub);

              // Split the display text to avoid showing raw URLs inline
              const displayText = text.replace(/(https?:\/\/[^\s]+)/g, '').trim();

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
                      <span className="pub-text">{text}</span>
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
