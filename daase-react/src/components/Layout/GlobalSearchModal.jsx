import { useState, useEffect, useRef, useMemo } from 'react';
import { RESEARCH_AREAS } from '../../data/fallback';

const PROGRAMS_DATA = [
  {
    id: 'btech',
    title: 'B.Tech. in Space Science & Engineering',
    category: 'Degree Program',
    sub: 'Undergraduate · 4 Years · Started 2023 · Admission via JEE (Advanced)',
    keywords: 'btech b.tech space science engineering undergraduate jee isro',
    icon: '🚀',
    view: 'programs',
    detailId: 'btech',
  },
  {
    id: 'msc',
    title: 'M.Sc. in Astronomy',
    category: 'Degree Program',
    sub: 'Postgraduate · 2 Years · Started 2018 · Admission via IIT-JAM (Physics)',
    keywords: 'msc m.sc astronomy postgraduate masters jam physics',
    icon: '⭐',
    view: 'programs',
    detailId: 'msc',
  },
  {
    id: 'ms',
    title: 'M.S. (Research) in Space Engineering',
    category: 'Degree Program',
    sub: 'Research Degree · 2 Years · Started 2021 · GATE / Self-sponsored',
    keywords: 'ms m.s. research space engineering masters thesis gate',
    icon: '🛰️',
    view: 'programs',
    detailId: 'ms',
  },
  {
    id: 'phd',
    title: 'Ph.D. in Astronomy, Astrophysics & Space Engineering',
    category: 'Degree Program',
    sub: 'Doctoral · CSIR-NET / GATE / JEST / DST-INSPIRE / Fellowship',
    keywords: 'phd ph.d doctorate doctoral research fellowship net gate jest',
    icon: '🎓',
    view: 'programs',
    detailId: 'phd',
  },
];

const QUICK_PAGES = [
  { title: 'Home', category: 'Page', sub: 'Department overview, research highlights, and recent updates', icon: '🏠', view: 'home' },
  { title: 'Faculty Directory', category: 'Page', sub: 'Core, visiting, and distinguished faculty members', icon: '👨‍🏫', view: 'people-faculty' },
  { title: 'Non-Teaching Staff', category: 'Page', sub: 'Technical and administrative staff members', icon: '💼', view: 'people-staff' },
  { title: 'Ph.D. Scholars', category: 'Page', sub: 'Doctoral research scholars and supervisors', icon: '🧑‍🎓', view: 'people-phd' },
  { title: 'Research Areas', category: 'Page', sub: '7 core frontier domains in space science and astrophysics', icon: '🔬', view: 'research' },
  { title: 'Research Facilities', category: 'Page', sub: 'Laboratories, testing chambers, and Arctic station Himadri', icon: '🔭', view: 'facilities' },
  { title: 'Degree Programs', category: 'Page', sub: 'B.Tech., M.Sc., M.S. Research, and Ph.D. pathways', icon: '📚', view: 'programs' },
  { title: 'Academic Events', category: 'Page', sub: 'Upcoming conferences, workshops, and past outreach series', icon: '📅', view: 'events' },
  { title: 'Photo Gallery', category: 'Page', sub: 'Images and life at DAASE, IIT Indore', icon: '🖼️', view: 'gallery' },
  { title: 'Opportunities', category: 'Page', sub: 'Admissions, internships, postdoc positions, and faculty hiring', icon: '🌟', view: 'opportunities' },
  { title: 'Student Placements', category: 'Page', sub: 'Career outcomes, top employers, and higher education destinations', icon: '💼', view: 'placements' },
];

export default function GlobalSearchModal({ isOpen, onClose, onNav, data = {} }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const resultsContainerRef = useRef(null);

  // Focus input on open & lock background scroll
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveCategory('All');
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Build searchable index from all site sources
  const fullIndex = useMemo(() => {
    const items = [];

    // 1. Pages
    QUICK_PAGES.forEach(p => {
      items.push({
        id: `page-${p.view}`,
        title: p.title,
        category: 'Pages',
        sub: p.sub,
        icon: p.icon,
        keywords: `${p.title} ${p.sub} page navigate link`,
        action: () => onNav(p.view),
      });
    });

    // 2. Degree Programs
    PROGRAMS_DATA.forEach(p => {
      items.push({
        id: `prog-${p.id}`,
        title: p.title,
        category: 'Programs',
        sub: p.sub,
        icon: p.icon,
        keywords: `${p.title} ${p.sub} ${p.keywords}`,
        action: () => onNav(p.view, p.detailId),
      });
    });

    // 3. Research Areas
    (RESEARCH_AREAS || []).forEach(area => {
      items.push({
        id: `research-${area.id}`,
        title: area.title,
        category: 'Research',
        sub: area.desc,
        icon: '🔬',
        keywords: `${area.title} ${area.desc} ${area.full_description || ''} ${(area.faculty || []).join(' ')}`,
        action: () => onNav('research-detail', area.id),
      });
    });

    // 4. Faculty (Core & Visiting)
    const facultyList = [...(data.faculty || []), ...(data.visiting || [])];
    facultyList.forEach((f, idx) => {
      items.push({
        id: `faculty-${idx}-${f.name}`,
        title: f.name,
        category: 'Faculty',
        sub: `${f.designation}${f.isHOD ? ' · Head of Department' : ''}${f.research ? ` · ${f.research}` : ''}`,
        icon: '👨‍🏫',
        keywords: `${f.name} ${f.designation} ${f.email || ''} ${f.research || ''} faculty professor teacher hod`,
        action: () => onNav('people-faculty'),
      });
    });

    // 5. Staff
    const staffList = Array.isArray(data.staff)
      ? data.staff
      : Object.values(data.staff || {}).flat();
    staffList.forEach((st, idx) => {
      items.push({
        id: `staff-${idx}-${st.name}`,
        title: st.name,
        category: 'Staff',
        sub: `${st.designation || 'Staff'}${st.department ? ` · ${st.department}` : ''}${st.email ? ` · ✉ ${st.email}` : ''}`,
        icon: '💼',
        keywords: `${st.name} ${st.designation || ''} ${st.email || ''} staff office technical administrative`,
        action: () => onNav('people-staff'),
      });
    });

    // 6. Students (Ph.D., PG, UG)
    const addStudentGroup = (obj, category, navId, icon) => {
      if (!obj) return;
      Object.entries(obj).forEach(([batch, list]) => {
        (list || []).forEach((s, idx) => {
          items.push({
            id: `student-${category}-${idx}-${s.name}`,
            title: s.name,
            category: 'Students',
            sub: `${batch}${s.supervisor ? ` · Supervisor: ${s.supervisor}` : ''}${s.research || s.research_interests ? ` · ${s.research || s.research_interests}` : ''}${s.email ? ` · ${s.email}` : ''}`,
            icon,
            keywords: `${s.name} ${s.email || ''} ${s.supervisor || ''} ${s.research || ''} ${s.research_interests || ''} ${batch} ${category}`,
            action: () => onNav(navId),
          });
        });
      });
    };

    addStudentGroup(data.phd, 'Ph.D.', 'people-phd', '🧑‍🎓');
    addStudentGroup(data.pg, 'Post Graduate', 'people-pg', '🎓');
    addStudentGroup(data.ug, 'Under Graduate', 'people-ug', '🎒');

    // 7. Events (Upcoming, Past, Outreach)
    (data.events || []).forEach((ev, idx) => {
      items.push({
        id: `event-${idx}-${ev.title}`,
        title: ev.title,
        category: 'Events',
        sub: `${ev.date || 'Event'}${ev.type ? ` · ${ev.type.toUpperCase()}` : ''}`,
        icon: '📅',
        keywords: `${ev.title} ${ev.date || ''} ${ev.type || ''} ${ev.desc || ''} event conference workshop seminar`,
        action: () => onNav('events'),
      });
    });

    (data.outreach || []).forEach((ev, idx) => {
      items.push({
        id: `outreach-${idx}-${ev.title}`,
        title: ev.title,
        category: 'Events',
        sub: `${ev.date || 'Outreach'} · Outreach & Astronomy Popularization`,
        icon: '🌟',
        keywords: `${ev.title} ${ev.date || ''} outreach stargazing quiz public talk`,
        action: () => onNav('events'),
      });
    });

    // 8. Facilities
    (data.facilities || []).forEach((fac, idx) => {
      items.push({
        id: `facility-${idx}-${fac.name}`,
        title: fac.name,
        category: 'Facilities',
        sub: 'DAASE Experimental & Computational Infrastructure',
        icon: '🔭',
        keywords: `${fac.name} facility lab laboratory testing chamber equipment himadri arctic`,
        action: () => onNav('facilities'),
      });
    });

    // 9. Opportunities
    (data.opportunities || []).forEach((opp, idx) => {
      items.push({
        id: `opp-${idx}-${opp.title}`,
        title: opp.title,
        category: 'Opportunities',
        sub: `${opp.category || 'Position'}${opp.deadline ? ` · Deadline: ${opp.deadline}` : ''}`,
        icon: '🚀',
        keywords: `${opp.title} ${opp.category || ''} ${opp.description || ''} opportunity job fellowship internship admission`,
        action: () => onNav('opportunities'),
      });
    });

    // 10. Alumni
    (data.alumni || []).forEach(yearData => {
      const year = yearData.year;
      const addAlumList = (list, deg) => {
        (list || []).forEach(name => {
          items.push({
            id: `alum-${year}-${deg}-${name}`,
            title: name,
            category: 'Alumni',
            sub: `Class of ${year} · ${deg}`,
            icon: '🏆',
            keywords: `${name} ${year} ${deg} alumni graduate alumnus`,
            action: () => onNav('people-alumni'),
          });
        });
      };
      addAlumList(yearData.phd, 'Ph.D.');
      addAlumList(yearData.mtech, 'M.Tech.');
      addAlumList(yearData.ms, 'M.S. (Research)');
      addAlumList(yearData.msc, 'M.Sc.');
    });

    return items;
  }, [data, onNav]);

  // Scoring and filtering
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const scored = [];
    const terms = q.split(/\s+/).filter(Boolean);

    for (const item of fullIndex) {
      const titleLower = item.title.toLowerCase();
      const keywordsLower = item.keywords.toLowerCase();
      const subLower = item.sub.toLowerCase();

      // Must match all entered terms
      const matchesAll = terms.every(
        term =>
          titleLower.includes(term) ||
          keywordsLower.includes(term) ||
          subLower.includes(term) ||
          item.category.toLowerCase().includes(term)
      );

      if (!matchesAll) continue;

      // Calculate relevance score
      let score = 0;
      if (titleLower === q) score += 120;
      else if (titleLower.startsWith(q)) score += 90;
      else if (titleLower.includes(q)) score += 60;

      terms.forEach(term => {
        if (titleLower.includes(term)) score += 25;
        if (subLower.includes(term)) score += 10;
        if (item.category.toLowerCase().includes(term)) score += 15;
      });

      // Priority boost for core sections
      if (item.category === 'Research') score += 15;
      if (item.category === 'Programs') score += 14;
      if (item.category === 'Faculty') score += 12;
      if (item.category === 'Pages') score += 10;

      scored.push({ item, score });
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.map(s => s.item);
  }, [query, fullIndex]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: searchResults.length };
    searchResults.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [searchResults]);

  // Filtered by selected category
  const filteredResults = useMemo(() => {
    if (activeCategory === 'All') return searchResults;
    return searchResults.filter(item => item.category === activeCategory);
  }, [searchResults, activeCategory]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeCategory]);

  // Keyboard navigation inside modal
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelectItem(filteredResults[selectedIndex]);
      }
    }
  };

  const handleSelectItem = (item) => {
    onClose();
    if (item.action) {
      item.action();
    }
  };

  if (!isOpen) return null;

  const categoriesWithResults = ['All', 'Faculty', 'Research', 'Programs', 'Events', 'Facilities', 'Students', 'Opportunities', 'Alumni', 'Staff', 'Pages'].filter(
    cat => (categoryCounts[cat] || 0) > 0
  );

  return (
    <div className="global-search-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Global Search">
      <div className="global-search-modal" onClick={e => e.stopPropagation()}>
        
        {/* Header with Search Input */}
        <div className="global-search-header">
          <span className="global-search-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>

          <input
            ref={inputRef}
            type="text"
            className="global-search-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search DAASE across faculty, research, programs, events, students, labs..."
            aria-label="Search DAASE"
            autoComplete="off"
            spellCheck="false"
          />

          {query && (
            <button
              type="button"
              className="global-search-clear-btn"
              onClick={() => {
                setQuery('');
                if (inputRef.current) inputRef.current.focus();
              }}
              title="Clear search"
              aria-label="Clear input"
            >
              ✕
            </button>
          )}

          <button
            type="button"
            className="global-search-close-btn"
            onClick={onClose}
            title="Close (Esc)"
            aria-label="Close dialog"
          >
            Esc
          </button>
        </div>

        {/* Category Pills (when searching) */}
        {query.trim() && categoriesWithResults.length > 1 && (
          <div className="global-search-categories">
            {categoriesWithResults.map(cat => (
              <button
                key={cat}
                type="button"
                className={`global-search-cat-btn${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat} <span className="cat-count">({categoryCounts[cat]})</span>
              </button>
            ))}
          </div>
        )}

        {/* Results Container */}
        <div className="global-search-body" ref={resultsContainerRef}>
          {query.trim().length === 0 ? (
            /* Quick Suggestions when empty */
            <div className="global-search-suggestions">
              <div className="global-search-section-title">Popular Searches</div>
              <div className="global-search-pills">
                {['Cosmology', 'B.Tech. Space Science', 'Dr. Saurabh Das', 'Prof. Abhirup Datta', 'Arctic Research Himadri', 'M.Sc. Astronomy', 'Ph.D. Admissions', 'Upcoming Events'].map(term => (
                  <button
                    key={term}
                    type="button"
                    className="global-suggestion-pill"
                    onClick={() => {
                      setQuery(term);
                      if (inputRef.current) inputRef.current.focus();
                    }}
                  >
                    🔍 {term}
                  </button>
                ))}
              </div>

              <div className="global-search-section-title" style={{ marginTop: '24px' }}>Quick Navigation</div>
              <div className="global-search-quick-grid">
                {QUICK_PAGES.slice(0, 8).map(p => (
                  <button
                    key={p.title}
                    type="button"
                    className="global-quick-nav-card"
                    onClick={() => handleSelectItem({ action: () => onNav(p.view) })}
                  >
                    <span className="quick-icon">{p.icon}</span>
                    <div className="quick-text">
                      <div className="quick-title">{p.title}</div>
                      <div className="quick-sub">{p.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : filteredResults.length > 0 ? (
            /* Result Items List */
            <div className="global-search-results-list" role="listbox">
              {filteredResults.slice(0, 50).map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={item.id}
                    role="option"
                    aria-selected={isSelected}
                    className={`global-result-row${isSelected ? ' selected' : ''}`}
                    onClick={() => handleSelectItem(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <span className="result-category-icon" aria-hidden="true">{item.icon}</span>
                    <div className="result-info">
                      <div className="result-title-row">
                        <span className="result-title">{item.title}</span>
                        <span className="result-cat-badge">{item.category}</span>
                      </div>
                      <div className="result-sub">{item.sub}</div>
                    </div>
                    <span className="result-arrow" aria-hidden="true">→</span>
                  </div>
                );
              })}
            </div>
          ) : (
            /* No Matches State */
            <div className="global-search-empty">
              <div className="empty-icon">🪐</div>
              <div className="empty-title">No results found for "{query}"</div>
              <p className="empty-desc">
                We couldn't find any faculty, programs, events, research areas, or scholars matching your keyword.
              </p>
              <div style={{ marginTop: '16px' }}>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginRight: '8px' }}>Try searching:</span>
                {['Cosmology', 'Space Engineering', 'Saurabh', 'B.Tech'].map(w => (
                  <button
                    key={w}
                    type="button"
                    className="global-suggestion-pill"
                    onClick={() => setQuery(w)}
                    style={{ margin: '4px' }}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Keyboard Shortcuts */}
        <div className="global-search-footer">
          <div className="global-search-hints">
            <span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span>
            <span><kbd>↵</kbd> to select</span>
            <span><kbd>ESC</kbd> to close</span>
          </div>
          <div className="global-search-brand">
            DAASE IIT Indore Global Search
          </div>
        </div>

      </div>
    </div>
  );
}
