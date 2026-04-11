import { useState } from 'react';
import Footer from '../Layout/Footer';
import { drivePhotoUrl } from '../../data/fallback';

function initials(name) {
  return name.replace(/Prof\.|Dr\./, '').trim().split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function StudentBatch({ batch, list }) {
  return (
    <div className="batch-section">
      <div className="batch-title">
        {batch} <span className="batch-count">{list.length}</span>
      </div>
      <div className="students-grid">
        {list.map((s, i) => {
          const photoSrc = drivePhotoUrl(s.photo) || `images/students/${s.email}.jpg`;
          return (
            <div className="student-card anim-fadeup" key={i} style={{ animationDelay: `${0.04 + i * 0.03}s` }}>
              <div className="sc-avatar">
                <img src={photoSrc} alt={s.name} onError={e => { e.target.style.display = 'none'; }} />
                {initials(s.name)}
              </div>
              <div className="sc-name">{s.name}</div>
              {s.supervisor && <div className="sc-supervisor">{s.supervisor}</div>}
              <a href={`mailto:${s.email}@iiti.ac.in`} className="sc-email">{s.email}@iiti.ac.in</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Students({ pg, ug, phd }) {
  const [tab, setTab] = useState('phd');

  return (
    <div style={{ background: 'var(--bg)' }}>
      <div className="section-inner">
        <div className="section-header">
          <span className="section-eyebrow">✦ Current Students</span>
          <h2 className="section-title">Our <span>Students</span></h2>
          <p className="section-desc">Meet our brilliant community of researchers and learners across all programs.</p>
          <div className="title-bar" />
        </div>

        <div className="students-tabs">
          <button className={`student-tab${tab === 'phd' ? ' active' : ''}`} onClick={() => setTab('phd')}>Ph.D.</button>
          <button className={`student-tab${tab === 'pg' ? ' active' : ''}`} onClick={() => setTab('pg')}>Post Graduate</button>
          <button className={`student-tab${tab === 'ug' ? ' active' : ''}`} onClick={() => setTab('ug')}>Under Graduate</button>
        </div>

        {tab === 'phd' && phd && Object.entries(phd).map(([batch, list]) => (
          <StudentBatch key={batch} batch={batch} list={list} />
        ))}
        {tab === 'pg' && Object.entries(pg).map(([batch, list]) => (
          <StudentBatch key={batch} batch={batch} list={list} />
        ))}
        {tab === 'ug' && Object.entries(ug).map(([batch, list]) => (
          <StudentBatch key={batch} batch={batch} list={list} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
