import { useState, useEffect } from 'react';
import Footer from '../Layout/Footer';
import { drivePhotoUrl } from '../../data/fallback';
import { imageMap } from '../../data/imageMap';

function StudentBatch({ batch, list, onImageClick, type }) {
  return (
    <div className="batch-section">
      <div className="batch-title">
        {batch} <span className="batch-count">{list.length} </span><span>  Please add [@]iiti.ac.in</span>
      </div>
      <div className="students-grid">
        {list.map((s, i) => {
          let photoSrc = imageMap[s.name] || drivePhotoUrl(s.photo);
          if (!photoSrc) {
            if (type === 'interns') {
              photoSrc = `people_images/Intern/${s.name}.png`;
            } else {
              photoSrc = `images/students/${s.email}.jpg`;
            }
          }

          return (
            <div className="student-card anim-fadeup" key={i} style={{ animationDelay: `${0.04 + i * 0.03}s` }}>
              <div className="sc-avatar" onClick={() => onImageClick && onImageClick(photoSrc, s.name)}>
                <img src={photoSrc} alt={s.name} onError={e => {
                  if (type === 'interns' && e.target.src.endsWith('.png')) {
                    e.target.src = e.target.src.replace('.png', '.jpg');
                  } else {
                    e.target.style.display = 'none';
                  }
                }} />
              </div>
              <div className="sc-name">{s.name}</div>
              {s.supervisor && <div className="sc-supervisor">{s.supervisor}</div>}
              {(s.research || s.research_interests) && <div className="sc-research">{s.research || s.research_interests}</div>}
              {s.email && <div className="sc-email">{s.email}</div>}
              
              {type === 'interns' && (
                <div style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--text-light)', lineHeight: '1.4' }}>
                  {(() => {
                    const inst = s['home institution'] || s['Home Institution'] || s.home_institution || s.institution;
                    const iType = s['type of internship'] || s['Type of Internship'] || s.type_of_internship || s.type || s.internship_type;
                    const per = s.period || s.Period || s.duration || s.Duration;
                    const bat = s.batch || s.Batch;
                    return (
                      <>
                        {inst && <div><strong style={{color: 'var(--text)'}}>Institution:</strong> {inst}</div>}
                        {iType && <div><strong style={{color: 'var(--text)'}}>Type:</strong> {iType}</div>}
                        {per && <div><strong style={{color: 'var(--text)'}}>Period:</strong> {per}</div>}
                        {bat && <div><strong style={{color: 'var(--text)'}}>Batch:</strong> {bat}</div>}
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Students({ pg, ug, phd, interns }) {
  const [tab, setTab] = useState('phd');

  // Image Modal State
  const [modalImg, setModalImg] = useState(null);
  const [modalName, setModalName] = useState('');

  const handleImageClick = (src, name) => {
    setModalImg(src);
    setModalName(name);
  };

  const closeImageModal = () => {
    setModalImg(null);
    setModalName('');
  };

  // Close modal on Esc key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeImageModal();
    };
    if (modalImg) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [modalImg]);

  return (
    <div style={{ background: 'transparent' }}>
      <div className="section-inner">
        <div className="section-header">
          <span className="section-eyebrow">✦ Current Students</span>
          <h1 className="section-title">Our <span>Students</span></h1>
          <p className="section-desc">Meet our brilliant community of researchers and learners across all programs.</p>
          <div className="title-bar" />
        </div>

        <div className="students-tabs">
          <button className={`student-tab${tab === 'phd' ? ' active' : ''}`} onClick={() => setTab('phd')}>Ph.D.</button>
          <button className={`student-tab${tab === 'pg' ? ' active' : ''}`} onClick={() => setTab('pg')}>Post Graduate</button>
          <button className={`student-tab${tab === 'ug' ? ' active' : ''}`} onClick={() => setTab('ug')}>Under Graduate</button>
          <button className={`student-tab${tab === 'interns' ? ' active' : ''}`} onClick={() => setTab('interns')}>Interns</button>
        </div>

        {tab === 'phd' && (
          phd
            ? Object.entries(phd).sort(([a], [b]) => b.localeCompare(a)).map(([batch, list]) => (
                <StudentBatch key={batch} batch={batch} list={list} onImageClick={handleImageClick} type={tab} />
              ))
            : <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '60px' }}>Ph.D. student data will appear here once added to the database.</p>
        )}
        {tab === 'pg' && (
          pg
            ? Object.entries(pg).sort(([a], [b]) => {
                const lA = a.toLowerCase();
                const lB = b.toLowerCase();
                const getPriority = str => {
                  if (str.includes('space engineering')) return 1;
                  if (str.includes('aolt')) return 3;
                  return 2;
                };
                const diff = getPriority(lA) - getPriority(lB);
                if (diff !== 0) return diff;
                return b.localeCompare(a);
              }).map(([batch, list]) => (
                <StudentBatch key={batch} batch={batch} list={list} onImageClick={handleImageClick} type={tab} />
              ))
            : <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '60px' }}>Post Graduate student data will appear here once added to the database.</p>
        )}
        {tab === 'ug' && (
          ug
            ? Object.entries(ug).sort(([a], [b]) => b.localeCompare(a)).map(([batch, list]) => (
                <StudentBatch key={batch} batch={batch} list={list} onImageClick={handleImageClick} type={tab} />
              ))
            : <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '60px' }}>Under Graduate student data will appear here once added to the database.</p>
        )}
        {tab === 'interns' && (
          interns
            ? Object.entries(interns).sort(([a], [b]) => b.localeCompare(a)).map(([batch, list]) => (
                <StudentBatch key={batch} batch={batch} list={list} onImageClick={handleImageClick} type={tab} />
              ))
            : <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '60px' }}>Intern data will appear here once added to the database.</p>
        )}
      </div>

      {/* Global Image Modal */}
      {modalImg && (
        <div className="student-modal-overlay" onClick={closeImageModal}>
          <div className="student-modal-content" onClick={e => e.stopPropagation()}>
            <div className="close-hint">Click outside to close</div>
            <img src={modalImg} alt={modalName} onError={e => { e.target.style.display = 'none'; }} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
