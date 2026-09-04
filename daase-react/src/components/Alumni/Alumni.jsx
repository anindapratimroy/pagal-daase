import { useState } from 'react';
import Footer from '../Layout/Footer';

export default function Alumni({ alumni }) {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => setOpenIdx(o => o === idx ? -1 : idx);

  return (
    <div>
      <div className="section-inner">
        <div className="section-header">

          <h1 className="section-title">Distinguished <span>Alumni</span></h1>
          <p className="section-desc">DAASE alumni hold positions at prestigious universities, research institutes, and industries in India and abroad.</p>
          <div className="title-bar" />
        </div>

        <div className="alumni-batches">
          {alumni.map((b, idx) => {
            const total = (b.msc||[]).length + (b.mtech||[]).length + (b.ms||[]).length + (b.phd||[]).length;
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className={`alumni-batch anim-fadeup${isOpen ? ' open-batch' : ''}`}
                style={{ animationDelay: `${0.05 + idx * 0.06}s` }}>
                <div className={`alumni-batch-header`} onClick={() => toggle(idx)}>
                  <div className="alumni-year">{b.year}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{total} Graduates</span>
                    <span className={`chevron${isOpen ? ' open' : ''}`}>▾</span>
                  </div>
                </div>
                {isOpen && (
                  <div className="alumni-batch-body">
                    {b.msc?.length > 0 && (
                      <div className="alumni-category">
                        <div className="alumni-cat-title">M.Sc. Astronomy</div>
                        <div className="alumni-names">
                          {b.msc.map((n, i) => <span className="alumni-name" key={i}>{n}</span>)}
                        </div>
                      </div>
                    )}
                    {b.mtech?.length > 0 && (
                      <div className="alumni-category">
                        <div className="alumni-cat-title">M.Tech.</div>
                        <div className="alumni-names">
                          {b.mtech.map((n, i) => <span className="alumni-name" key={i}>{n}</span>)}
                        </div>
                      </div>
                    )}
                    {b.ms?.length > 0 && (
                      <div className="alumni-category">
                        <div className="alumni-cat-title">M.S. (Research)</div>
                        <div className="alumni-names">
                          {b.ms.map((n, i) => <span className="alumni-name" key={i}>{n}</span>)}
                        </div>
                      </div>
                    )}
                    {b.phd?.length > 0 && (
                      <div className="alumni-category">
                        <div className="alumni-cat-title">Ph.D.</div>
                        <div className="alumni-names">
                          {b.phd.map((n, i) => <span className="alumni-name" key={i}>{n}</span>)}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
