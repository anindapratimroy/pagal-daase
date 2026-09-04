import { useState, useEffect, useMemo } from 'react';
import Footer from '../Layout/Footer';
import { drivePhotoUrl } from '../../data/fallback';
import { imageMap } from '../../data/imageMap';
import TiltCard from '../Layout/TiltCard';
import SearchBar from '../Layout/SearchBar';

// Ensure link has protocol prefix
function normalizeLink(link) {
  if (!link) return null;
  const trimmed = link.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return 'https://' + trimmed;
}

// ─── Search helper functions ──────────────────────────────────────────────────
function matchesQuery(text, q) {
  if (!text) return false;
  return String(text).toLowerCase().includes(q);
}

function filterFacultyItem(f, q) {
  if (!f) return false;
  return (
    matchesQuery(f.name, q) ||
    matchesQuery(f.designation, q) ||
    matchesQuery(f.research, q) ||
    matchesQuery(f.email, q)
  );
}

function filterStaffItem(f, q) {
  if (!f) return false;
  return (
    matchesQuery(f.name, q) ||
    matchesQuery(f.designation, q) ||
    matchesQuery(f.email, q) ||
    matchesQuery(f.department, q) ||
    matchesQuery(f.role, q)
  );
}

function filterStudentItem(s, q, batchName = '') {
  if (!s) return false;
  return (
    matchesQuery(s.name, q) ||
    matchesQuery(s.email, q) ||
    matchesQuery(s.supervisor, q) ||
    matchesQuery(s.research, q) ||
    matchesQuery(s.research_interests, q) ||
    matchesQuery(batchName, q)
  );
}

function filterStudentObject(obj, q) {
  if (!obj) return { filtered: null, count: 0 };
  if (!q) {
    const count = Object.values(obj).reduce((acc, list) => acc + (list?.length || 0), 0);
    return { filtered: obj, count };
  }
  let count = 0;
  const filtered = {};
  for (const [batch, list] of Object.entries(obj)) {
    const matching = (list || []).filter(s => filterStudentItem(s, q, batch));
    if (matching.length > 0) {
      filtered[batch] = matching;
      count += matching.length;
    }
  }
  return { filtered, count };
}

function filterAlumniArray(alumni, q) {
  if (!alumni || !Array.isArray(alumni)) return { filtered: alumni || [], count: 0 };
  if (!q) {
    const count = alumni.reduce((acc, y) => {
      return acc + (y.phd?.length || 0) + (y.mtech?.length || 0) + (y.ms?.length || 0) + (y.msc?.length || 0);
    }, 0);
    return { filtered: alumni, count };
  }
  let count = 0;
  const filtered = [];
  for (const yearData of alumni) {
    const matchesYear = matchesQuery(String(yearData.year), q);
    const filterList = (arr) => (arr || []).filter(name => matchesYear || matchesQuery(name, q));
    const phd = filterList(yearData.phd);
    const mtech = filterList(yearData.mtech);
    const ms = filterList(yearData.ms);
    const msc = filterList(yearData.msc);
    const total = phd.length + mtech.length + ms.length + msc.length;
    if (total > 0) {
      filtered.push({
        year: yearData.year,
        phd,
        mtech,
        ms,
        msc,
      });
      count += total;
    }
  }
  return { filtered, count };
}

// ─── Faculty Card ────────────────────────────────────────────────────────────
function FacultyCard({ f }) {
  const normalizedUrl = normalizeLink(f.url);
  const hasUrl = !!normalizedUrl;
  const photoSrc = imageMap[f.name] || (f.photo ? (drivePhotoUrl(f.photo) || f.photo) : '');

  const inner = (
    <div className="glass-card">
      <div className="fc-photo">
        <img
          src={photoSrc || "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239ca3af'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E"}
          alt={f.name}
          onError={e => {
            e.target.onerror = null;
            e.target.src = "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239ca3af'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
            e.target.style.padding = '30px';
            e.target.style.background = 'transparent';
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

// ─── Student sub-sections ─────────────────────────────────────────────────────
function StudentBatch({ batch, list, onImageClick }) {
  if (!list || !list.length) return null;
  return (
    <div className="batch-section">
      <div className="batch-title">
        {batch} <span className="batch-count">{list.length}</span>
        <span className="email-id-hint">
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

// Helper for when a specific tab has 0 matches
function NoTabMatches({ tabLabel, query, totalMatches, tabCounts, onSelectTab, onClear }) {
  return (
    <div className="search-no-results">
      <div className="search-no-results-icon">🔍</div>
      <div className="search-no-results-title">No matches in {tabLabel}</div>
      <p className="search-no-results-desc">
        No people matched "{query}" under {tabLabel}.
      </p>
      {totalMatches > 0 ? (
        <div style={{ marginTop: '16px' }}>
          <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '12px' }}>
            Found matches in other categories:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
            <button
              type="button"
              className="search-switch-pill"
              onClick={() => onSelectTab('all')}
            >
              ✦ View All Results ({totalMatches})
            </button>
            {PEOPLE_TABS.filter(t => (tabCounts[t.id] ?? 0) > 0).map(t => (
              <button
                key={t.id}
                type="button"
                className="search-switch-pill"
                onClick={() => onSelectTab(t.id)}
              >
                {t.label} ({tabCounts[t.id]})
              </button>
            ))}
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="search-switch-pill"
          onClick={onClear}
        >
          Clear Search
        </button>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Faculty({ initialTab = 'faculty', onNav, faculty, visiting, staff, phd, pg, ug, alumni }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const q = searchQuery.trim().toLowerCase();
  const isSearching = q.length > 0;

  // Filtered Faculty
  const matchingFaculty = useMemo(() => {
    const sorted = sortFacultyByName(faculty);
    if (!q) return sorted;
    return sorted.filter(f => filterFacultyItem(f, q));
  }, [faculty, q]);

  const matchingVisiting = useMemo(() => {
    const sorted = sortFacultyByName(visiting);
    if (!q) return sorted;
    return sorted.filter(f => filterFacultyItem(f, q));
  }, [visiting, q]);

  const facultyTotalCount = matchingFaculty.length + matchingVisiting.length;

  // Filtered Staff
  const { filteredStaff, staffCount } = useMemo(() => {
    if (!staff) return { filteredStaff: Array.isArray(staff) ? [] : {}, staffCount: 0 };
    if (!q) {
      const count = Array.isArray(staff)
        ? staff.length
        : Object.values(staff).reduce((acc, list) => acc + (list?.length || 0), 0);
      return { filteredStaff: Array.isArray(staff) ? sortStaff(staff) : staff, staffCount: count };
    }
    if (Array.isArray(staff)) {
      const filtered = sortStaff(staff.filter(f => filterStaffItem(f, q)));
      return { filteredStaff: filtered, staffCount: filtered.length };
    } else {
      const filtered = {};
      let count = 0;
      for (const [category, list] of Object.entries(staff)) {
        const matching = (list || []).filter(f => filterStaffItem(f, q) || matchesQuery(category, q));
        if (matching.length > 0) {
          filtered[category] = sortStaff(matching);
          count += matching.length;
        }
      }
      return { filteredStaff: filtered, staffCount: count };
    }
  }, [staff, q]);

  // Filtered Ph.D., PG, UG
  const { filtered: filteredPhd, count: phdCount } = useMemo(() => filterStudentObject(phd, q), [phd, q]);
  const { filtered: filteredPg, count: pgCount } = useMemo(() => filterStudentObject(pg, q), [pg, q]);
  const { filtered: filteredUg, count: ugCount } = useMemo(() => filterStudentObject(ug, q), [ug, q]);

  // Filtered Alumni
  const { filtered: filteredAlumni, count: alumniCount } = useMemo(() => filterAlumniArray(alumni, q), [alumni, q]);

  const totalPeopleMatches = facultyTotalCount + staffCount + phdCount + pgCount + ugCount + alumniCount;

  const tabCounts = {
    all: totalPeopleMatches,
    faculty: facultyTotalCount,
    staff: staffCount,
    phd: phdCount,
    pg: pgCount,
    ug: ugCount,
    alumni: alumniCount,
  };

  const getTabLabel = (tabId) => {
    if (tabId === 'all') return 'All Results';
    const found = PEOPLE_TABS.find(t => t.id === tabId);
    return found ? found.label : tabId;
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    if (activeTab === 'all') {
      setActiveTab('faculty');
    }
  };

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

  const visibleTabs = isSearching
    ? [{ id: 'all', label: 'All Results' }, ...PEOPLE_TABS]
    : PEOPLE_TABS;

  return (
    <div>
      <div className="section-inner people-section-inner">
        <div className="section-header">
          <h1 className="section-title">People at <span>DAASE</span></h1>
          <p className="section-desc">Meet the researchers, educators, and students that form the heart of our department.</p>
          <div className="title-bar" />
        </div>

        {/* ── Search Bar ── */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={handleClearSearch}
          placeholder="Search people by name, research area, designation, email, supervisor..."
          resultCount={isSearching ? totalPeopleMatches : null}
          id="people-search-input"
        />

        {/* ── People Layout: sidebar + content ─────────────────────── */}
        <div className="people-page-layout">

          {/* LEFT: Tab sidebar */}
          <div className="people-tabs">
            {visibleTabs.map(tab => {
              const count = tabCounts[tab.id] ?? 0;
              return (
                <button
                  key={tab.id}
                  className={`people-tab${activeTab === tab.id ? ' active' : ''}`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id !== 'all' && onNav) onNav(`people-${tab.id}`);
                  }}
                >
                  <span>{tab.label}</span>
                  {isSearching && (
                    <span className={`people-tab-count ${count === 0 ? 'zero' : ''}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT: Tab content */}
          <div className="people-tab-content">

            {/* ── ALL RESULTS TAB (only during search) ────────────────────── */}
            {activeTab === 'all' && (
              <div className="anim-fadein">
                {totalPeopleMatches === 0 ? (
                  <div className="search-no-results">
                    <div className="search-no-results-icon">👥</div>
                    <div className="search-no-results-title">No people found</div>
                    <p className="search-no-results-desc">
                      No faculty, staff, students, or alumni matched "{searchQuery}". Try searching with a different name, email, or research field.
                    </p>
                    <button
                      type="button"
                      className="search-switch-pill"
                      onClick={handleClearSearch}
                    >
                      Clear Search
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Faculty matches */}
                    {facultyTotalCount > 0 && (
                      <div style={{ marginBottom: '44px' }}>
                        <div className="faculty-divider" style={{ marginTop: '0' }}>
                          Faculty ({facultyTotalCount})
                          <span className="email-id-hint">— add @iiti.ac.in to email ID</span>
                        </div>
                        <div className="faculty-grid">
                          {[...matchingFaculty, ...matchingVisiting].map((f, i) => (
                            <div key={i} className="anim-fadeup">
                              <FacultyCard f={f} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Staff matches */}
                    {staffCount > 0 && (
                      <div style={{ marginBottom: '44px' }}>
                        <div className="faculty-divider">
                          Non-Teaching Staff ({staffCount})
                          <span className="email-id-hint">— add @iiti.ac.in to email ID</span>
                        </div>
                        {Array.isArray(filteredStaff) ? (
                          <div className="faculty-grid">
                            {filteredStaff.map((f, i) => (
                              <div key={i} className="anim-fadeup">
                                <FacultyCard f={f} />
                              </div>
                            ))}
                          </div>
                        ) : (
                          Object.entries(filteredStaff).map(([cat, list]) => (
                            <div key={cat} style={{ marginBottom: '24px' }}>
                              <div style={{ fontWeight: 600, color: 'var(--gold)', marginBottom: '12px' }}>{cat}</div>
                              <div className="faculty-grid">
                                {list.map((f, i) => (
                                  <div key={i} className="anim-fadeup">
                                    <FacultyCard f={f} />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}

                    {/* Ph.D. matches */}
                    {phdCount > 0 && filteredPhd && (
                      <div style={{ marginBottom: '44px' }}>
                        <div className="faculty-divider">
                          Ph.D. Students ({phdCount})
                          <span className="email-id-hint">— add @iiti.ac.in to email ID</span>
                        </div>
                        {Object.entries(filteredPhd).sort(([a], [b]) => b.localeCompare(a)).map(([batch, list]) => (
                          <StudentBatch key={batch} batch={batch} list={list} onImageClick={handleImageClick} />
                        ))}
                      </div>
                    )}

                    {/* Post Graduate matches */}
                    {pgCount > 0 && filteredPg && (
                      <div style={{ marginBottom: '44px' }}>
                        <div className="faculty-divider">
                          Post Graduate Students ({pgCount})
                          <span className="email-id-hint">— add @iiti.ac.in to email ID</span>
                        </div>
                        {Object.entries(filteredPg).map(([batch, list]) => (
                          <StudentBatch key={batch} batch={batch} list={list} onImageClick={handleImageClick} />
                        ))}
                      </div>
                    )}

                    {/* Under Graduate matches */}
                    {ugCount > 0 && filteredUg && (
                      <div style={{ marginBottom: '44px' }}>
                        <div className="faculty-divider">
                          Under Graduate Students ({ugCount})
                          <span className="email-id-hint">— add @iiti.ac.in to email ID</span>
                        </div>
                        {Object.entries(filteredUg).sort(([a], [b]) => b.localeCompare(a)).map(([batch, list]) => (
                          <StudentBatch key={batch} batch={batch} list={list} onImageClick={handleImageClick} />
                        ))}
                      </div>
                    )}

                    {/* Alumni matches */}
                    {alumniCount > 0 && (
                      <div style={{ marginBottom: '44px' }}>
                        <div className="faculty-divider">
                          Alumni ({alumniCount})
                        </div>
                        <AlumniSection alumni={filteredAlumni} />
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* ── FACULTY TAB ─────────────────────────────────────────────── */}
            {activeTab === 'faculty' && (
              isSearching && facultyTotalCount === 0 ? (
                <NoTabMatches
                  tabLabel={getTabLabel('faculty')}
                  query={searchQuery}
                  totalMatches={totalPeopleMatches}
                  tabCounts={tabCounts}
                  onSelectTab={setActiveTab}
                  onClear={handleClearSearch}
                />
              ) : (
                <>
                  {matchingFaculty.length > 0 && (
                    <>
                      <div className="faculty-divider" style={{ marginTop: '0' }}>
                        Core Faculty {isSearching && `(${matchingFaculty.length})`}
                        <span className="email-id-hint">
                          — add @iiti.ac.in to email ID
                        </span>
                      </div>
                      <div className="faculty-grid">
                        {matchingFaculty.map((f, i) => (
                          <div key={i} data-aos="fade-up" data-aos-delay={i * 50}>
                            <FacultyCard f={f} />
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {matchingVisiting.length > 0 && (
                    <>
                      <div className="faculty-divider" style={{ marginTop: matchingFaculty.length === 0 ? '0' : '40px' }}>
                        Visiting &amp; Distinguished Faculty {isSearching && `(${matchingVisiting.length})`}
                        <span className="email-id-hint">
                          — add @iiti.ac.in to email ID
                        </span>
                      </div>
                      <div className="faculty-grid" style={{ marginBottom: '40px' }}>
                        {matchingVisiting.map((f, i) => (
                          <div key={i} data-aos="fade-up" data-aos-delay={i * 50}>
                            <FacultyCard f={f} />
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )
            )}

            {/* ── NON-TEACHING STAFF TAB ──────────────────────────────────── */}
            {activeTab === 'staff' && staff && (
              isSearching && staffCount === 0 ? (
                <NoTabMatches
                  tabLabel={getTabLabel('staff')}
                  query={searchQuery}
                  totalMatches={totalPeopleMatches}
                  tabCounts={tabCounts}
                  onSelectTab={setActiveTab}
                  onClear={handleClearSearch}
                />
              ) : (
                <>
                  {Array.isArray(filteredStaff) ? (
                    <>
                      <div className="faculty-divider" style={{ marginTop: '0' }}>
                        Technical &amp; Support Staff <span className="visiting-badge" style={{ background: 'var(--navy)', color: '#fff', borderColor: 'var(--navy)' }}>HOD Office</span>
                        <span className="email-id-hint">
                          — add @iiti.ac.in to email ID
                        </span>
                      </div>
                      <div className="faculty-grid" style={{ marginBottom: '40px' }}>
                        {filteredStaff.map((f, i) => (
                          <div key={i} className="anim-fadeup" style={{ animationDelay: `${0.06 + i * 0.06}s` }}>
                            <FacultyCard f={f} />
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    Object.entries(filteredStaff).map(([category, list], catIndex) => (
                      <div key={category} data-aos="fade-up">
                        <div className="faculty-divider" style={{ marginTop: catIndex === 0 ? '0' : '40px' }}>
                          {category} <span className="visiting-badge" style={{ background: 'var(--navy)', color: '#fff', borderColor: 'var(--navy)' }}>HOD Office</span>
                          <span className="email-id-hint">
                            — add @iiti.ac.in to email ID
                          </span>
                        </div>
                        <div className="faculty-grid" style={{ marginBottom: '40px' }}>
                          {list.map((f, i) => (
                            <div key={i} className="anim-fadeup" style={{ animationDelay: `${0.06 + i * 0.06}s` }}>
                              <FacultyCard f={f} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </>
              )
            )}

            {/* ── PH.D. TAB ────────────────────────────────────────────────── */}
            {activeTab === 'phd' && (
              isSearching && phdCount === 0 ? (
                <NoTabMatches
                  tabLabel={getTabLabel('phd')}
                  query={searchQuery}
                  totalMatches={totalPeopleMatches}
                  tabCounts={tabCounts}
                  onSelectTab={setActiveTab}
                  onClear={handleClearSearch}
                />
              ) : (
                <div className="anim-fadein">
                  {filteredPhd && Object.keys(filteredPhd).length > 0 ? (
                    Object.entries(filteredPhd).sort(([a], [b]) => b.localeCompare(a)).map(([batch, list]) => (
                      <StudentBatch key={batch} batch={batch} list={list} onImageClick={handleImageClick} />
                    ))
                  ) : (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '60px', fontSize: '15px' }}>
                      Ph.D. student data will appear here once added to the database.
                    </p>
                  )}
                </div>
              )
            )}

            {/* ── PG TAB ────────────────────────────────────────────────────── */}
            {activeTab === 'pg' && (
              isSearching && pgCount === 0 ? (
                <NoTabMatches
                  tabLabel={getTabLabel('pg')}
                  query={searchQuery}
                  totalMatches={totalPeopleMatches}
                  tabCounts={tabCounts}
                  onSelectTab={setActiveTab}
                  onClear={handleClearSearch}
                />
              ) : (
                <div className="anim-fadein">
                  {filteredPg && Object.keys(filteredPg).length > 0 ? (
                    Object.entries(filteredPg).sort(([a], [b]) => {
                      const lA = a.toLowerCase(), lB = b.toLowerCase();
                      const getPriority = s => {
                        if (s.includes('space engineering')) return 1;
                        if (s.includes('aolt')) return 3;
                        return 2;
                      };
                      const diff = getPriority(lA) - getPriority(lB);
                      return diff !== 0 ? diff : b.localeCompare(a);
                    }).map(([batch, list]) => (
                      <StudentBatch key={batch} batch={batch} list={list} onImageClick={handleImageClick} />
                    ))
                  ) : (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '60px', fontSize: '15px' }}>
                      Post Graduate student data will appear here once added to the database.
                    </p>
                  )}
                </div>
              )
            )}

            {/* ── UG TAB ────────────────────────────────────────────────────── */}
            {activeTab === 'ug' && (
              isSearching && ugCount === 0 ? (
                <NoTabMatches
                  tabLabel={getTabLabel('ug')}
                  query={searchQuery}
                  totalMatches={totalPeopleMatches}
                  tabCounts={tabCounts}
                  onSelectTab={setActiveTab}
                  onClear={handleClearSearch}
                />
              ) : (
                <div className="anim-fadein">
                  {filteredUg && Object.keys(filteredUg).length > 0 ? (
                    Object.entries(filteredUg).sort(([a], [b]) => b.localeCompare(a)).map(([batch, list]) => (
                      <StudentBatch key={batch} batch={batch} list={list} onImageClick={handleImageClick} />
                    ))
                  ) : (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '60px', fontSize: '15px' }}>
                      Under Graduate student data will appear here once added to the database.
                    </p>
                  )}
                </div>
              )
            )}

            {/* ── ALUMNI TAB ────────────────────────────────────────────────── */}
            {activeTab === 'alumni' && (
              isSearching && alumniCount === 0 ? (
                <NoTabMatches
                  tabLabel={getTabLabel('alumni')}
                  query={searchQuery}
                  totalMatches={totalPeopleMatches}
                  tabCounts={tabCounts}
                  onSelectTab={setActiveTab}
                  onClear={handleClearSearch}
                />
              ) : (
                <div className="anim-fadein">
                  <AlumniSection alumni={filteredAlumni} />
                </div>
              )
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

      <Footer onNav={onNav} />
    </div>
  );
}

