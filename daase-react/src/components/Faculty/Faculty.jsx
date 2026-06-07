import { useState } from 'react';
import Footer from '../Layout/Footer';
import { drivePhotoUrl } from '../../data/fallback';
import { imageMap } from '../../data/imageMap';
import TiltCard from '../Layout/TiltCard';

// Ensure link has protocol prefix
function normalizeLink(link) {
  if (!link) return null;
  const trimmed = link.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return 'https://' + trimmed;
}

// ─── Faculty Card ────────────────────────────────────────────────────────────
function FacultyCard({ f }) {
  const normalizedUrl = normalizeLink(f.url);
  const hasUrl = !!normalizedUrl;
  const photoSrc = imageMap[f.name] || (f.photo ? (drivePhotoUrl(f.photo) || f.photo) : '');

  const inner = (
    <div className='glass-card'>
      <div className="fc-photo">
        <img
          src={photoSrc || "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239ca3af'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E"}
          alt={f.name}
          onError={e => {
            e.target.onerror = null;
            e.target.src = "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239ca3af'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
            e.target.style.padding = '30px';
            e.target.style.background = 'transparent'; /* ← change this */
          }}
        />
        <div className="fc-photo-overlay" />
        <div className="fc-designation-badge">{f.designation}</div>
      </div>
      <div className="fc-body">
        {f.isHOD && <div className="hod-badge">Head of Department</div>}
        <div className="fc-name">{f.name}</div>
        {f.research && <div className="fc-research">{f.research}</div>}
        {f.email
          ? <div className="fc-email">✉ {f.email.split('@')[0]}</div>
          : <div className="fc-email" style={{ color: 'var(--text-light)' }}>✉ Contact via Dept. Office</div>
        }
      </div>
    </div>
  );

  if (hasUrl) {
    return (
      <a href={normalizedUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', height: '100%', textDecoration: 'none' }}>
        <TiltCard className={`faculty-card${f.isHOD ? ' hod-card' : ''}`} style={{ height: '100%' }}>
          {inner}
        </TiltCard>
      </a>
    );
  }
  return (
    <TiltCard className={`faculty-card no-link-card${f.isHOD ? ' hod-card' : ''}`} style={{ height: '100%' }}>
      {inner}
    </TiltCard>
  );
}

// ─── Sorting helpers ──────────────────────────────────────────────────────────
const cleanName = (name) => {
  if (!name) return '';
  return name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s+/i, '').trim();
};

const sortFacultyByName = (list) => {
  if (!list) return [];
  return [...list].sort((a, b) => {
    if (a.isHOD && !b.isHOD) return -1;
    if (!a.isHOD && b.isHOD) return 1;
    return cleanName(a.name).localeCompare(cleanName(b.name));
  });
};

// Staff: sort by sortOrder field (set explicitly in data)
const sortStaff = (list) => {
  if (!list || !Array.isArray(list)) return [];
  return [...list].sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
};

// ─── People Tabs ──────────────────────────────────────────────────────────────
const PEOPLE_TABS = [
  { id: 'faculty', label: 'Faculty' },
  { id: 'staff', label: 'Non-Teaching Staff' },
  { id: 'phd', label: 'Ph.D. students' },
  { id: 'pg', label: 'Post Graduate Students' },
  { id: 'ug', label: 'Under Graduate Students' },
  { id: 'alumni', label: 'Alumni' },
];

// ─── Student sub-sections (reused from Students page pattern) ─────────────────
function StudentBatch({ batch, list, type, onImageClick }) {
  return (
    <div className="batch-section">
      <div className="batch-title">
        {batch} <span className="batch-count">{list.length}</span>
        <span style={{ fontWeight: 600, fontSize: '13px', color: '#ffd97a', opacity: 0.9, marginLeft: '8px' }}>
          — add @iiti.ac.in to email ID
        </span>
      </div>
      <div className="students-grid">
        {list.map((s, i) => {
          const photoSrc = imageMap[s.name] || drivePhotoUrl(s.photo) || `images/students/${s.email}.jpg`;
          return (
            <TiltCard className="student-card anim-fadeup glass-card" key={i} style={{ animationDelay: `${0.04 + i * 0.03}s`, height: '100%' }}>
              <div className="sc-avatar" onClick={() => onImageClick && onImageClick(photoSrc, s.name)}>
                <img src={photoSrc} alt={s.name}
                  onError={e => { e.target.style.display = 'none'; }} />
              </div>
              <div className="sc-name">{s.name}</div>
              {s.supervisor && <div className="sc-supervisor">{s.supervisor}</div>}
              {(s.research || s.research_interests) && <div className="sc-research">{s.research || s.research_interests}</div>}
              {s.email && <div className="sc-email">{s.email}</div>}
            </TiltCard>
          );
        })}
      </div>
    </div>
  );
}

// Alumni section
function AlumniSection({ alumni }) {
  if (!alumni || !alumni.length) return <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '40px' }}>No alumni data available.</p>;
  return (
    <>
      {[...alumni].sort((a, b) => String(b.year).localeCompare(String(a.year))).map((yearData, i) => (
        <div key={i} className="batch-section">
          <div className="batch-title">{yearData.year}</div>
          {yearData.phd?.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontWeight: 700, color: '#60a5fa', marginBottom: '8px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ph.D.</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {yearData.phd.map((n, j) => <span key={j} className="alumni-name-pill">{n}</span>)}
              </div>
            </div>
          )}
          {yearData.mtech?.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontWeight: 700, color: '#60a5fa', marginBottom: '8px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>M.Tech.</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {yearData.mtech.map((n, j) => <span key={j} className="alumni-name-pill">{n}</span>)}
              </div>
            </div>
          )}
          {yearData.ms?.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontWeight: 700, color: '#60a5fa', marginBottom: '8px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>M.S. (Research)</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {yearData.ms.map((n, j) => <span key={j} className="alumni-name-pill">{n}</span>)}
              </div>
            </div>
          )}
          {yearData.msc?.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontWeight: 700, color: '#60a5fa', marginBottom: '8px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>M.Sc.</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {yearData.msc.map((n, j) => <span key={j} className="alumni-name-pill">{n}</span>)}
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Faculty({ initialTab = 'faculty', faculty, visiting, staff, phd, pg, ug, alumni }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const sortedFaculty = sortFacultyByName(faculty);
  const sortedVisiting = sortFacultyByName(visiting);
  const sortedStaff = Array.isArray(staff) ? sortStaff(staff) : [];

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

  return (
    <div>
      <div className="section-inner">
        <div className="section-header">
          <span className="section-eyebrow">✦ Our People</span>
          <h1 className="section-title">People at <span>DAASE</span></h1>
          <p className="section-desc">Meet the researchers, educators, and students that form the heart of our department.</p>
          <div className="title-bar" />
        </div>

        {/* ── People Layout: sidebar + content ─────────────────────── */}
        <div className="people-page-layout">

          {/* LEFT: Tab sidebar */}
          <div className="people-tabs">
            {PEOPLE_TABS.map(tab => (
              <button
                key={tab.id}
                className={`people-tab${activeTab === tab.id ? ' active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* RIGHT: Tab content */}
          <div className="people-tab-content">

            {/* ── FACULTY TAB ─────────────────────────────────────────────── */}
            {activeTab === 'faculty' && (
              <>
                <div className="faculty-divider" style={{ marginTop: '0' }}>
                  Core Faculty
                  <span style={{ color: 'white', fontWeight: 400, fontSize: '13px', marginLeft: '12px', textTransform: 'none', letterSpacing: 'normal' }}>
                    — add @iiti.ac.in to email ID
                  </span>
                </div>
                <div className="faculty-grid">
                  {sortedFaculty.map((f, i) => (
                    <div key={i} className="anim-fadeup" style={{ animationDelay: `${0.06 + i * 0.04}s` }}>
                      <FacultyCard f={f} />
                    </div>
                  ))}
                </div>

                <div className="faculty-divider">
                  Visiting &amp; Distinguished Faculty <span className="visiting-badge">Visiting Members</span>
                  <span style={{ fontWeight: 400, fontSize: '13px', color: 'var(--text-muted)', marginLeft: '12px', textTransform: 'none', letterSpacing: 'normal' }}>
                    — add @iiti.ac.in to email ID
                  </span>
                </div>

                <div className="faculty-grid" style={{ marginBottom: '40px' }}>
                  {sortedVisiting.map((f, i) => (
                    <div key={i} className="anim-fadeup" style={{ animationDelay: `${0.06 + i * 0.06}s` }}>
                      <FacultyCard f={f} />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ── NON-TEACHING STAFF TAB ──────────────────────────────────── */}
            {activeTab === 'staff' && staff && (
              <>
                {Array.isArray(staff) ? (
                  <>
                    <div className="faculty-divider" style={{ marginTop: '0' }}>
                      Technical &amp; Support Staff <span className="visiting-badge" style={{ background: 'var(--navy)', color: '#fff', borderColor: 'var(--navy)' }}>HOD Office</span>
                      <span style={{ fontWeight: 600, fontSize: '13px', color: '#ffd97a', opacity: 0.9, marginLeft: '8px' }}>
                        — add @iiti.ac.in to email ID
                      </span>
                    </div>
                    <div className="faculty-grid" style={{ marginBottom: '40px' }}>
                      {sortedStaff.map((f, i) => (
                        <div key={i} className="anim-fadeup" style={{ animationDelay: `${0.06 + i * 0.06}s` }}>
                          <FacultyCard f={f} />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  Object.entries(staff).map(([category, list], catIndex) => (
                    <div key={category} className="anim-fadein">
                      <div className="faculty-divider" style={{ marginTop: catIndex === 0 ? '0' : '40px' }}>
                        {category} <span className="visiting-badge" style={{ background: 'var(--navy)', color: '#fff', borderColor: 'var(--navy)' }}>HOD Office</span>
                        <span style={{ fontWeight: 600, fontSize: '13px', color: '#ffd97a', opacity: 0.9, marginLeft: '8px' }}>
                          — add @iiti.ac.in to email ID
                        </span>
                      </div>
                      <div className="faculty-grid" style={{ marginBottom: '40px' }}>
                        {sortStaff(list).map((f, i) => (
                          <div key={i} className="anim-fadeup" style={{ animationDelay: `${0.06 + i * 0.06}s` }}>
                            <FacultyCard f={f} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {/* ── PH.D. TAB ────────────────────────────────────────────────── */}
            {activeTab === 'phd' && (
              <div className="anim-fadein">
                {phd ? Object.entries(phd).sort(([a], [b]) => b.localeCompare(a)).map(([batch, list]) => (
                  <StudentBatch key={batch} batch={batch} list={list} type="phd" onImageClick={handleImageClick} />
                )) : (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '60px', fontSize: '15px' }}>
                    Ph.D. student data will appear here once added to the database.
                  </p>
                )}
              </div>
            )}

            {/* ── PG TAB ────────────────────────────────────────────────────── */}
            {activeTab === 'pg' && (
              <div className="anim-fadein">
                {pg ? Object.entries(pg).sort(([a], [b]) => {
                  const lA = a.toLowerCase(), lB = b.toLowerCase();
                  const getPriority = s => {
                    if (s.includes('space engineering')) return 1;
                    if (s.includes('aolt')) return 3;
                    return 2;
                  };
                  const diff = getPriority(lA) - getPriority(lB);
                  return diff !== 0 ? diff : b.localeCompare(a);
                }).map(([batch, list]) => (
                  <StudentBatch key={batch} batch={batch} list={list} type="pg" onImageClick={handleImageClick} />
                )) : (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '60px', fontSize: '15px' }}>
                    Post Graduate student data will appear here once added to the database.
                  </p>
                )}
              </div>
            )}

            {/* ── UG TAB ────────────────────────────────────────────────────── */}
            {activeTab === 'ug' && (
              <div className="anim-fadein">
                {ug ? Object.entries(ug).sort(([a], [b]) => b.localeCompare(a)).map(([batch, list]) => (
                  <StudentBatch key={batch} batch={batch} list={list} type="ug" onImageClick={handleImageClick} />
                )) : (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '60px', fontSize: '15px' }}>
                    Under Graduate student data will appear here once added to the database.
                  </p>
                )}
              </div>
            )}

            {/* ── ALUMNI TAB ────────────────────────────────────────────────── */}
            {activeTab === 'alumni' && (
              <div className="anim-fadein">
                <AlumniSection alumni={alumni} />
              </div>
            )}

          </div>{/* end people-tab-content */}
        </div>{/* end people-page-layout */}

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
