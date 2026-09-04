import { useState, useEffect, useRef, useMemo } from 'react';
import { drivePhotoUrl, RESEARCH_AREAS } from '../../data/fallback';
import { imageMap } from '../../data/imageMap';

const PROGRAMS_DATA = [
  {
    id: 'btech',
    title: 'B.Tech. in Space Science & Engineering',
    category: 'Degree Program',
    sub: 'Undergraduate · 4 Years · Started 2023 · Admission via JEE (Advanced)',
    overview: 'India\'s first and only undergraduate program of its kind across all IITs, preparing graduates for ISRO, NASA, and the global space sector.',
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
    overview: 'The first and only M.Sc. Astronomy program in the IIT system, combining stellar astrophysics and cosmology with computational and instrumentation skills.',
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
    overview: 'Rigorous research-driven program focusing on satellite engineering, payload systems, and space instrumentation.',
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
    overview: 'Frontier doctoral research in radio astronomy, cosmology, compact objects, space weather, and space instrumentation.',
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
  { title: 'Post Graduate Students', category: 'Page', sub: 'M.Sc. Astronomy & M.Tech / M.S. batches', icon: '🎓', view: 'people-pg' },
  { title: 'Under Graduate Students', category: 'Page', sub: 'B.Tech. Space Science & Engineering batches', icon: '🎒', view: 'people-ug' },
  { title: 'Research Areas', category: 'Page', sub: '7 core frontier domains in space science and astrophysics', icon: '🔬', view: 'research' },
  { title: 'Research Facilities', category: 'Page', sub: 'Laboratories, testing chambers, and Arctic station Himadri', icon: '🔭', view: 'facilities' },
  { title: 'Degree Programs', category: 'Page', sub: 'B.Tech., M.Sc., M.S. Research, and Ph.D. pathways', icon: '📚', view: 'programs' },
  { title: 'Academic Events', category: 'Page', sub: 'Upcoming conferences, workshops, and past outreach series', icon: '📅', view: 'events' },
  { title: 'Opportunities', category: 'Page', sub: 'Admissions, internships, postdoc positions, and faculty hiring', icon: '🌟', view: 'opportunities' },
  { title: 'Photo Gallery', category: 'Page', sub: 'Campus life, telescope visits, and laboratories at DAASE', icon: '🖼️', view: 'gallery' },
];

function getAnchorId(name) {
  if (!name) return null;
  return `person-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

function HighlightMatch({ text, query }) {
  if (!query || !text) return text;
  const terms = query.trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return text;
  const regex = new RegExp(`(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = String(text).split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="search-highlight-gold">{part}</mark>
        ) : (
          part
        )
      )}
    </span>
  );
}

export default function GlobalSearchModal({ isOpen, onClose, onNav, data = {} }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveCategory('All');
      setSelectedIndex(0);
      setCopiedEmail(false);
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

  // Build searchable index with rich metadata
  const fullIndex = useMemo(() => {
    const items = [];

    // 1. Pages
    QUICK_PAGES.forEach(p => {
      items.push({
        id: `page-${p.view}`,
        title: p.title,
        category: 'Pages',
        badge: 'Navigation',
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
        badge: 'Academic Program',
        sub: p.sub,
        overview: p.overview,
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
        badge: 'Research Area',
        sub: area.desc,
        overview: area.full_description,
        facultyTeam: area.faculty || [],
        icon: '🔬',
        keywords: `${area.title} ${area.desc} ${area.full_description || ''} ${(area.faculty || []).join(' ')}`,
        action: () => onNav('research-detail', area.id),
      });
    });

    // 4. Faculty (Core & Visiting)
    const facultyList = [...(data.faculty || []), ...(data.visiting || [])];
    facultyList.forEach((f, idx) => {
      const isHOD = Boolean(f.isHOD);
      const isVisiting = Boolean(f.designation?.toLowerCase().includes('visiting'));
      const photoSrc = imageMap[f.name] || (f.photo ? (drivePhotoUrl(f.photo) || f.photo) : '');
      const fullEmail = f.email ? (f.email.includes('@') ? f.email : `${f.email}@iiti.ac.in`) : '';
      const anchor = getAnchorId(f.name);
      const chamberText = f.chamber ? `Room ${f.chamber}` : '';
      const extText = f.phoneExt ? `Ext. ${f.phoneExt}` : '';
      const officeInfo = [chamberText, extText].filter(Boolean).join(' · ');

      items.push({
        id: `faculty-${idx}-${f.name}`,
        title: f.name,
        category: 'Faculty',
        badge: isHOD ? 'Head of Department' : (isVisiting ? 'Visiting Faculty' : 'Core Faculty'),
        sub: `${f.designation}${isHOD ? ' (HoD)' : ''}${officeInfo ? ` · ${officeInfo}` : ''}`,
        designation: f.designation,
        isHOD,
        email: fullEmail,
        chamber: f.chamber,
        phoneExt: f.phoneExt,
        url: f.url,
        photo: photoSrc,
        research: f.research,
        icon: '👨‍🏫',
        keywords: `${f.name} ${f.designation} ${fullEmail} ${f.chamber || ''} ${f.phoneExt || ''} ${f.research || ''} faculty professor teacher hod room chamber extension ext`,
        action: () => onNav('people-faculty', null, anchor),
      });
    });

    // 5. Staff
    const staffList = Array.isArray(data.staff)
      ? data.staff
      : Object.values(data.staff || {}).flat();
    staffList.forEach((st, idx) => {
      const photoSrc = imageMap[st.name] || (st.photo ? (drivePhotoUrl(st.photo) || st.photo) : '');
      const fullEmail = st.email ? (st.email.includes('@') ? st.email : `${st.email}@iiti.ac.in`) : '';
      const anchor = getAnchorId(st.name);

      items.push({
        id: `staff-${idx}-${st.name}`,
        title: st.name,
        category: 'Staff',
        badge: 'Technical & Support Staff',
        sub: `${st.designation || 'Staff Member'}${st.department ? ` · ${st.department}` : ''}`,
        designation: st.designation,
        email: fullEmail,
        photo: photoSrc,
        icon: '💼',
        keywords: `${st.name} ${st.designation || ''} ${fullEmail} staff office technical administrative`,
        action: () => onNav('people-staff', null, anchor),
      });
    });

    // 6. Students (Ph.D., PG, UG)
    const addStudentGroup = (obj, category, badge, navTab, icon) => {
      if (!obj) return;
      Object.entries(obj).forEach(([batch, list]) => {
        (list || []).forEach((s, idx) => {
          const photoSrc = imageMap[s.name] || drivePhotoUrl(s.photo) || (s.email ? `images/students/${s.email}.jpg` : '');
          const fullEmail = s.email ? (s.email.includes('@') ? s.email : `${s.email}@iiti.ac.in`) : '';
          const anchor = getAnchorId(s.name);

          items.push({
            id: `student-${category}-${idx}-${s.name}`,
            title: s.name,
            category: 'Students',
            badge: `${category} · ${batch.split('—')[0]?.trim() || batch}`,
            sub: `${batch}${s.supervisor ? ` · Supervisor: ${s.supervisor}` : ''}`,
            batch,
            supervisor: s.supervisor,
            research: s.research || s.research_interests,
            email: fullEmail,
            photo: photoSrc,
            icon,
            keywords: `${s.name} ${fullEmail} ${s.supervisor || ''} ${s.research || ''} ${s.research_interests || ''} ${batch} ${category}`,
            action: () => onNav(navTab, null, anchor),
          });
        });
      });
    };

    addStudentGroup(data.phd, 'Ph.D. Scholar', 'Ph.D. Scholar', 'people-phd', '🧑‍🎓');
    addStudentGroup(data.pg, 'Post Graduate', 'PG Student', 'people-pg', '🎓');
    addStudentGroup(data.ug, 'Under Graduate', 'UG Student', 'people-ug', '🎒');

    // 7. Events (Upcoming, Past, Outreach)
    (data.events || []).forEach((ev, idx) => {
      const isUpcoming = (ev.type || '').toLowerCase().trim() === 'upcoming';
      items.push({
        id: `event-${idx}-${ev.title}`,
        title: ev.title,
        category: 'Events',
        badge: isUpcoming ? 'Upcoming Event' : 'Past Event',
        sub: `${ev.date || 'Event'}${isUpcoming ? ' · Announcements Open' : ''}`,
        date: ev.date,
        url: ev.link || ev.url,
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
        badge: 'DAASE Outreach Series',
        sub: `${ev.date || 'Outreach'} · Public Astronomy Program`,
        date: ev.date,
        url: ev.link || ev.url,
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
        badge: 'Research Facility',
        sub: 'DAASE Experimental & Computational Infrastructure',
        icon: '🔭',
        keywords: `${fac.name} facility lab laboratory testing chamber equipment himadri arctic`,
        action: () => onNav('facilities'),
      });
    });

    // 9. Opportunities (Students and Teachers)
    const studentOpps = Array.isArray(data.student_opportunities) && data.student_opportunities.length > 0
      ? data.student_opportunities
      : (data.opportunities || []).filter(o => {
          const t = (o.type || o.audience || '').toString().toLowerCase();
          return t === '' || t.includes('student');
        });

    const teacherOpps = Array.isArray(data.teacher_opportunities) && data.teacher_opportunities.length > 0
      ? data.teacher_opportunities
      : (data.opportunities || []).filter(o => {
          const t = (o.type || o.audience || '').toString().toLowerCase();
          return t.includes('faculty') || t.includes('teacher');
        });

    studentOpps.forEach((opp, idx) => {
      const deadline = opp.lastDate || opp.deadline;
      items.push({
        id: `opp-s-${idx}-${opp.title}`,
        title: opp.title,
        category: 'Opportunities',
        badge: opp.tag || 'Student Opportunity',
        sub: `${deadline ? `Deadline: ${deadline}` : 'Open Application'}${opp.eligibility ? ` · ${opp.eligibility}` : ''}`,
        deadline,
        overview: opp.desc || opp.description,
        url: opp.applyLink || opp.link || opp.url,
        icon: '🎓',
        keywords: `${opp.title} ${opp.tag || ''} ${opp.desc || ''} ${opp.eligibility || ''} student opportunity admission phd internship research`,
        action: () => onNav('opportunities'),
      });
    });

    teacherOpps.forEach((opp, idx) => {
      const deadline = opp.lastDate || opp.deadline;
      items.push({
        id: `opp-t-${idx}-${opp.title}`,
        title: opp.title,
        category: 'Opportunities',
        badge: opp.tag || 'Faculty Recruitment',
        sub: `${deadline ? `Deadline: ${deadline}` : 'Faculty Recruitment'}${opp.eligibility ? ` · ${opp.eligibility}` : ''}`,
        deadline,
        overview: opp.desc || opp.description,
        url: opp.applyLink || opp.link || opp.url,
        icon: '👨‍🏫',
        keywords: `${opp.title} ${opp.tag || ''} ${opp.desc || ''} ${opp.eligibility || ''} faculty teacher professor opportunity opening career recruitment`,
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
            badge: `Alumni · Class of ${year}`,
            sub: `${deg} Degree · Graduated ${year}`,
            batch: `Graduating Year ${year}`,
            icon: '🏆',
            keywords: `${name} ${year} ${deg} alumni graduate alumnus`,
            action: () => onNav('people-alumni', null, getAnchorId(name)),
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
          item.category.toLowerCase().includes(term) ||
          (item.badge && item.badge.toLowerCase().includes(term))
      );

      if (!matchesAll) continue;

      let score = 0;
      if (titleLower === q) score += 150;
      else if (titleLower.startsWith(q)) score += 100;
      else if (titleLower.includes(q)) score += 70;

      terms.forEach(term => {
        if (titleLower.includes(term)) score += 30;
        if (subLower.includes(term)) score += 15;
        if (item.category.toLowerCase().includes(term)) score += 20;
      });

      // Priority boost for core categories
      if (item.category === 'Faculty') score += 25;
      if (item.category === 'Research') score += 20;
      if (item.category === 'Programs') score += 18;
      if (item.category === 'Students') score += 15;

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

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => {
        const next = prev < filteredResults.length - 1 ? prev + 1 : 0;
        scrollRowIntoView(next);
        return next;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => {
        const next = prev > 0 ? prev - 1 : filteredResults.length - 1;
        scrollRowIntoView(next);
        return next;
      });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelectItem(filteredResults[selectedIndex]);
      }
    }
  };

  const scrollRowIntoView = (index) => {
    if (!listRef.current) return;
    const rows = listRef.current.querySelectorAll('.power-result-row');
    if (rows[index]) {
      rows[index].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  };

  const handleSelectItem = (item) => {
    onClose();
    if (item.action) {
      item.action();
    }
  };

  const handleCopyEmail = (e, email) => {
    e.stopPropagation();
    if (!email) return;
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  if (!isOpen) return null;

  const categoriesWithResults = ['All', 'Faculty', 'Students', 'Research', 'Programs', 'Events', 'Facilities', 'Opportunities', 'Alumni', 'Staff', 'Pages'].filter(
    cat => (categoryCounts[cat] || 0) > 0
  );

  const selectedItem = filteredResults[selectedIndex] || null;

  return (
    <div className="global-search-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Global Search">
      <div className="power-search-modal" onClick={e => e.stopPropagation()}>
        
        {/* Header with Search Input */}
        <div className="power-search-header">
          <span className="power-search-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>

          <input
            ref={inputRef}
            type="text"
            className="power-search-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search people, professors, scholars, research, programs, facilities, events..."
            aria-label="Global DAASE Search"
            autoComplete="off"
            spellCheck="false"
          />

          {query && (
            <button
              type="button"
              className="power-search-clear-btn"
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
            className="power-search-esc-badge"
            onClick={onClose}
            title="Close dialog (Esc)"
          >
            ESC
          </button>
        </div>

        {/* Category Filter Pills (when searching) */}
        {query.trim() && categoriesWithResults.length > 1 && (
          <div className="power-search-categories">
            {categoriesWithResults.map(cat => (
              <button
                key={cat}
                type="button"
                className={`power-cat-pill${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat} <span className="pill-count">({categoryCounts[cat]})</span>
              </button>
            ))}
          </div>
        )}

        {/* Split-View Workspace */}
        <div className="power-search-workspace">

          {/* Left Column: Results List */}
          <div className="power-search-list-col" ref={listRef}>
            {query.trim().length === 0 ? (
              /* Pre-Search Recommendations */
              <div className="power-presearch">
                <div className="power-subhead">Quick Search Recommendations</div>
                <div className="power-recs-grid">
                  {[
                    { label: 'Dr. Saurabh Das', desc: 'Associate Professor & HoD', icon: '👨‍🏫' },
                    { label: 'Prof. Abhirup Datta', desc: 'Radio Astronomy & SKA', icon: '👨‍🏫' },
                    { label: 'Cosmology', desc: 'Epoch of Reionization & 21-cm', icon: '🔬' },
                    { label: 'B.Tech. Space Science', desc: 'Undergraduate Program', icon: '🚀' },
                    { label: 'M.Sc. Astronomy', desc: 'Postgraduate Program', icon: '⭐' },
                    { label: 'Himadri Arctic Station', desc: 'DAASE Arctic Facility', icon: '🔭' },
                    { label: 'Compact Objects', desc: 'Black Holes & Neutron Stars', icon: '🌌' },
                    { label: 'Ph.D. Scholars', desc: 'Doctoral Candidates & Research', icon: '🧑‍🎓' },
                  ].map(rec => (
                    <button
                      key={rec.label}
                      type="button"
                      className="power-rec-btn"
                      onClick={() => {
                        setQuery(rec.label);
                        if (inputRef.current) inputRef.current.focus();
                      }}
                    >
                      <span className="rec-icon">{rec.icon}</span>
                      <div className="rec-text">
                        <span className="rec-label">{rec.label}</span>
                        <span className="rec-desc">{rec.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="power-subhead" style={{ marginTop: '24px' }}>Quick Department Navigation</div>
                <div className="power-nav-pills">
                  {QUICK_PAGES.map(p => (
                    <button
                      key={p.title}
                      type="button"
                      className="power-nav-pill-btn"
                      onClick={() => handleSelectItem({ action: () => onNav(p.view) })}
                    >
                      <span>{p.icon}</span> {p.title}
                    </button>
                  ))}
                </div>
              </div>
            ) : filteredResults.length > 0 ? (
              /* Search Results List */
              <div className="power-results-list" role="listbox">
                {filteredResults.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      className={`power-result-row${isSelected ? ' selected' : ''}`}
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                    >
                      {/* Avatar / Icon */}
                      <div className="row-avatar">
                        {item.photo ? (
                          <img
                            src={item.photo}
                            alt={item.title}
                            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                          />
                        ) : null}
                        <span className="row-avatar-fallback" style={{ display: item.photo ? 'none' : 'flex' }}>
                          {item.icon}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="row-body">
                        <div className="row-title-bar">
                          <span className="row-title">
                            <HighlightMatch text={item.title} query={query} />
                          </span>
                          <span className={`row-badge badge-${item.category.toLowerCase().replace(/\s+/g, '-')}`}>
                            {item.badge || item.category}
                          </span>
                        </div>
                        <div className="row-sub">
                          <HighlightMatch text={item.sub} query={query} />
                        </div>
                      </div>

                      {/* Jump hint */}
                      <div className="row-action-arrow">
                        <span>→</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty state */
              <div className="power-empty-box">
                <div className="empty-icon">🪐</div>
                <div className="empty-title">No matches found for "{query}"</div>
                <p className="empty-desc">
                  We checked faculty profiles, research fields, students, events, programs, and facilities across the entire department.
                </p>
                <div style={{ marginTop: '16px' }}>
                  <button
                    type="button"
                    className="power-clear-link"
                    onClick={() => {
                      setQuery('');
                      if (inputRef.current) inputRef.current.focus();
                    }}
                  >
                    Clear Search Query
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Interactive Detail Preview */}
          <div className="power-search-preview-col">
            {selectedItem ? (
              <div className="power-preview-card anim-fadein" key={selectedItem.id}>
                
                {/* Photo Header */}
                <div className="preview-header">
                  {selectedItem.photo ? (
                    <div className="preview-photo-wrap">
                      <img
                        src={selectedItem.photo}
                        alt={selectedItem.title}
                        onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                      />
                      <div className="preview-photo-fallback" style={{ display: 'none' }}>
                        {selectedItem.icon}
                      </div>
                    </div>
                  ) : (
                    <div className="preview-photo-fallback big">
                      {selectedItem.icon}
                    </div>
                  )}

                  <div className="preview-main-info">
                    <span className="preview-badge">{selectedItem.badge || selectedItem.category}</span>
                    <h3 className="preview-name">{selectedItem.title}</h3>
                    {selectedItem.designation && (
                      <div className="preview-designation">{selectedItem.designation}</div>
                    )}
                    {selectedItem.batch && (
                      <div className="preview-batch">{selectedItem.batch}</div>
                    )}
                  </div>
                </div>

                <div className="preview-divider" />

                {/* Information Sections */}
                <div className="preview-details-body">
                  
                  {/* Supervisor (if student) */}
                  {selectedItem.supervisor && (
                    <div className="preview-meta-group">
                      <div className="meta-label">Supervisor / Mentor</div>
                      <div className="meta-value supervisor-chip" onClick={() => setQuery(selectedItem.supervisor)}>
                        👨‍🏫 {selectedItem.supervisor}
                      </div>
                    </div>
                  )}

                  {/* Research Interests / Keywords */}
                  {selectedItem.research && (
                    <div className="preview-meta-group">
                      <div className="meta-label">Research Specialization &amp; Topics</div>
                      <div className="meta-tags-wrap">
                        {selectedItem.research.split(/[,;·]+/).map((tag, i) => (
                          <span key={i} className="meta-tag">{tag.trim()}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Program Overview */}
                  {selectedItem.overview && (
                    <div className="preview-meta-group">
                      <div className="meta-label">Overview &amp; Scope</div>
                      <div className="meta-desc-text">{selectedItem.overview}</div>
                    </div>
                  )}

                  {/* Faculty Team (if research area) */}
                  {selectedItem.facultyTeam && selectedItem.facultyTeam.length > 0 && (
                    <div className="preview-meta-group">
                      <div className="meta-label">Faculty in this Domain</div>
                      <div className="meta-tags-wrap">
                        {selectedItem.facultyTeam.map((fac, i) => (
                          <span
                            key={i}
                            className="meta-tag clickable-tag"
                            onClick={() => setQuery(fac)}
                            title="Click to view faculty details"
                          >
                            👨‍🏫 {fac}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Email Actions */}
                  {selectedItem.email && (
                    <div className="preview-meta-group">
                      <div className="meta-label">Official Email Address</div>
                      <div className="preview-email-row">
                        <span className="email-text">{selectedItem.email}</span>
                        <div className="email-actions">
                          <button
                            type="button"
                            className="preview-mini-btn"
                            onClick={(e) => handleCopyEmail(e, selectedItem.email)}
                            title="Copy email address"
                          >
                            {copiedEmail ? 'Copied! ✓' : '📋 Copy'}
                          </button>
                          <a
                            href={`mailto:${selectedItem.email}`}
                            className="preview-mini-btn primary"
                            title="Send email"
                          >
                            ✉ Send
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Chamber & Telephone Extension (if faculty) */}
                  {(selectedItem.chamber || selectedItem.phoneExt) && (
                    <div className="preview-meta-group">
                      <div className="meta-label">Chamber &amp; Phone Extension</div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {selectedItem.chamber && (
                          <span className="meta-tag" style={{ background: 'rgba(255, 217, 122, 0.12)', color: '#ffd97a', borderColor: 'rgba(255, 217, 122, 0.35)', fontWeight: 600 }}>
                            🏢 Room / Chamber: {selectedItem.chamber}
                          </span>
                        )}
                        {selectedItem.phoneExt && (
                          <span className="meta-tag" style={{ background: 'rgba(96, 165, 250, 0.12)', color: '#93c5fd', borderColor: 'rgba(96, 165, 250, 0.35)', fontWeight: 600 }}>
                            📞 Telephone Ext: {selectedItem.phoneExt}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Official Webpage */}
                  {selectedItem.url && (
                    <div className="preview-meta-group">
                      <div className="meta-label">Official Webpage</div>
                      <a
                        href={selectedItem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="preview-link-btn"
                      >
                        🔗 Open Official Webpage ↗
                      </a>
                    </div>
                  )}
                </div>

                {/* Primary CTA: Jump and Highlight */}
                <div className="preview-footer">
                  <button
                    type="button"
                    className="preview-jump-cta"
                    onClick={() => handleSelectItem(selectedItem)}
                  >
                    <span>📍 Locate &amp; Highlight on Page</span>
                    <span className="cta-arrow">→</span>
                  </button>
                </div>

              </div>
            ) : (
              /* Placeholder when no item is selected */
              <div className="power-preview-placeholder">
                <span className="placeholder-icon">🔍</span>
                <p>Select any person, research area, or program to view full profile details and quick actions.</p>
              </div>
            )}
          </div>

        </div>

        {/* Global Search Footer with Keyboard Hints */}
        <div className="power-search-footer">
          <div className="footer-keys-hints">
            <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Locate on Page</span>
            <span><kbd>ESC</kbd> Close</span>
          </div>
          <div className="footer-status-text">
            {query.trim()
              ? `Showing ${filteredResults.length} ${filteredResults.length === 1 ? 'match' : 'matches'}`
              : 'DAASE Command Palette · IIT Indore'}
          </div>
        </div>

      </div>
    </div>
  );
}
