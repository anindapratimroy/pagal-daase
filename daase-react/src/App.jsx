import { useState, useEffect, useRef } from 'react';
import './index.css';

import Navbar from './components/Layout/Navbar';
import Preloader from './components/Layout/Preloader';
import InteractiveBackground from './components/Layout/InteractiveBackground';

import Home from './components/Home/Home';
import Research from './components/Research/Research';
import ResearchAreaDetail from './components/Research/ResearchAreaDetail';
import Programs from './components/Programs/Programs';
import Faculty from './components/Faculty/Faculty';
import Students from './components/Students/Students';
import Facilities from './components/Facilities/Facilities';
import Events from './components/Events/Events';
import Alumni from './components/Alumni/Alumni';
import Gallery from './components/Gallery/Gallery';
import Opportunities from './components/Opportunities/Opportunities';
import GlobalSearchModal from './components/Layout/GlobalSearchModal';

import AOS from 'aos';
import 'aos/dist/aos.css';

import { useData } from './hooks/useData';
import { FACULTY_FB, VISITING_FB, STAFF_FB, PHD_FB, PG_FB, UG_FB } from './data/fallback';

// Map People dropdown IDs → Faculty component tab IDs
const PEOPLE_TAB_MAP = {
  'people-faculty': 'faculty',
  'people-staff':   'staff',
  'people-phd':     'phd',
  'people-pg':      'pg',
  'people-ug':      'ug',
  'people-alumni':  'alumni',
  'faculty':        'faculty',
  'staff':          'staff',
  'phd':            'phd',
  'pg':             'pg',
  'ug':             'ug',
  'alumni':         'alumni',
  'people':         'faculty',
  'students':       'phd',
};

// Disambiguate individual person slugs to their designated People sub-tab
function findPersonDetails(slug, data) {
  const norm = (name) => `person-${(name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

  const facultyList = data?.faculty?.length ? data.faculty : FACULTY_FB;
  const visitingList = data?.visiting?.length ? data.visiting : VISITING_FB;
  const staffList = data?.staff ? (Array.isArray(data.staff) ? data.staff : Object.values(data.staff).flat()) : STAFF_FB;
  const phdObj = (data?.phd && Object.keys(data.phd).length) ? data.phd : PHD_FB;
  const pgObj = (data?.pg && Object.keys(data.pg).length) ? data.pg : PG_FB;
  const ugObj = (data?.ug && Object.keys(data.ug).length) ? data.ug : UG_FB;

  // 1. Faculty & Visiting
  const foundFac = facultyList.find(f => norm(f.name) === slug);
  if (foundFac) return { tab: 'faculty', person: foundFac, title: `${foundFac.name} | Faculty | DAASE, IIT Indore` };

  const foundVis = visitingList.find(f => norm(f.name) === slug);
  if (foundVis) return { tab: 'faculty', person: foundVis, title: `${foundVis.name} | Visiting Faculty | DAASE, IIT Indore` };

  // 2. Staff
  const foundStaff = staffList.find(s => norm(s.name) === slug);
  if (foundStaff) return { tab: 'staff', person: foundStaff, title: `${foundStaff.name} | Staff | DAASE, IIT Indore` };

  // 3. PhD
  const foundPhd = Object.values(phdObj).flat().find(s => norm(s?.name) === slug);
  if (foundPhd) return { tab: 'phd', person: foundPhd, title: `${foundPhd.name} | PhD Research Scholar | DAASE, IIT Indore` };

  // 4. PG
  const foundPg = Object.values(pgObj).flat().find(s => norm(s?.name) === slug);
  if (foundPg) return { tab: 'pg', person: foundPg, title: `${foundPg.name} | Postgraduate Student | DAASE, IIT Indore` };

  // 5. UG
  const foundUg = Object.values(ugObj).flat().find(s => norm(s?.name) === slug);
  if (foundUg) return { tab: 'ug', person: foundUg, title: `${foundUg.name} | Undergraduate Student | DAASE, IIT Indore` };

  return { tab: 'faculty', person: null, title: 'People | DAASE, IIT Indore' };
}

const PROG_TAB_MAP = {
  'programs-btech': 'btech',
  'programs-msc':   'msc',
  'programs-mtech': 'mtech',
  'programs-ms':    'ms',
  'programs-phd':   'phd',
  'btech':          'btech',
  'msc':            'msc',
  'mtech':          'mtech',
  'ms':             'ms',
};

export default function App() {
  const [view, setView] = useState('home');
  const [peopleTab, setPeopleTab] = useState('faculty'); // active tab inside People page
  const [progTab, setProgTab] = useState('btech'); // active tab inside Programs page
  const [researchAreaId, setResearchAreaId] = useState(null); // active research area
  const [showBackTop, setShowTop] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const mainRef = useRef(null);

  const data = useData();
  const dataRef = useRef(data);
  dataRef.current = data;

  // Global search keyboard shortcuts (Cmd+K / Ctrl+K or '/')
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // ⌘K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
      // '/' when not in an input, textarea, or contentEditable
      else if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName) &&
        !document.activeElement?.isContentEditable
      ) {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Initialize AOS scroll reveals
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });
  }, []);

  const handlePreloaderComplete = () => {
    // Refresh AOS once preloader reveals content
    setTimeout(() => {
      try {
        AOS.refresh();
      } catch { /* ignore */ }
    }, 100);
  };

  // Hash Routing Listener
  useEffect(() => {
    const syncHashToState = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      
      if (hash.startsWith('person-')) {
        const { tab, title } = findPersonDetails(hash, dataRef.current);
        setPeopleTab(tab);
        setView('people');
        document.title = title;
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.remove('target-highlight-pulse');
            void el.offsetWidth;
            el.classList.add('target-highlight-pulse');
            setTimeout(() => el.classList.remove('target-highlight-pulse'), 3500);
          }
        }, 300);
        return;
      }

      if (hash.startsWith('research-detail/')) {
        setResearchAreaId(hash.split('/')[1]);
        setView('research-detail');
      } else if (hash.startsWith('programs/')) {
        setProgTab(hash.split('/')[1]);
        setView('programs');
      } else if (PROG_TAB_MAP[hash]) {
        setProgTab(PROG_TAB_MAP[hash]);
        setView('programs');
      } else if (PEOPLE_TAB_MAP[hash]) {
        setPeopleTab(PEOPLE_TAB_MAP[hash]);
        setView('people');
      } else if (hash === 'publications') {
        setView('research');
        setTimeout(() => {
          const el = document.getElementById('publications-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return;
      } else {
        setView(hash);
      }
      window.scrollTo(0, 0);
    };

    // Sync on initial load
    syncHashToState();

    window.addEventListener('hashchange', syncHashToState);
    return () => window.removeEventListener('hashchange', syncHashToState);
  }, []);

  // Dynamic Title & Meta Description Sync for route views
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') || 'home';
    if (hash.startsWith('person-')) return; // Handled dynamically in person routing

    const SEO_TITLES = {
      'home': 'DAASE — Dept. of Astronomy, Astrophysics & Space Engineering | IIT Indore',
      'research': 'Research Areas & Publications | DAASE, IIT Indore',
      'programs': 'Academic Programs (B.Tech, M.Tech, M.Sc, PhD) | DAASE, IIT Indore',
      'facilities': 'Advanced Research Facilities & Observatories | DAASE, IIT Indore',
      'opportunities': 'Opportunities & Admissions (PhD, JRF, Internships, Faculty) | DAASE, IIT Indore',
      'events': 'Events, Seminars & Outreach | DAASE, IIT Indore',
      'gallery': 'Department Gallery | DAASE, IIT Indore',
    };

    const PEOPLE_TITLES = {
      'faculty': 'Faculty Directory | DAASE, IIT Indore',
      'staff': 'Administrative & Technical Staff | Swapnil Dasharath Sankhe & Team | DAASE, IIT Indore',
      'phd': 'Doctoral Research Scholars (Ph.D.) | DAASE, IIT Indore',
      'pg': 'Postgraduate Students (M.Tech, M.Sc, MS) | DAASE, IIT Indore',
      'ug': 'Undergraduate Students (B.Tech Space Sciences) | DAASE, IIT Indore',
      'alumni': 'Alumni Directory | DAASE, IIT Indore',
    };

    let title = SEO_TITLES[view] || 'DAASE — IIT Indore';
    if (view === 'people') {
      title = PEOPLE_TITLES[peopleTab] || 'People at DAASE | IIT Indore';
    } else if (view === 'research-detail') {
      title = 'Research Area Detail | DAASE, IIT Indore';
    }

    document.title = title;
  }, [view, peopleTab]);

  // Back-to-top visibility (Optimized to prevent forced reflows / layout thrashing)
  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowTop(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNav = (id, detailId = null, targetAnchor = null) => {
    if (id === 'research-detail') {
      setResearchAreaId(detailId);
      setView('research-detail');
      window.location.hash = `research-detail/${detailId}`;
    } else if (id === 'programs') {
      if (detailId) {
        setProgTab(detailId);
        window.location.hash = `programs/${detailId}`;
      } else {
        window.location.hash = 'programs';
      }
      setView('programs');
    } else if (PEOPLE_TAB_MAP[id]) {
      const targetTab = PEOPLE_TAB_MAP[id];
      setPeopleTab(targetTab);
      setView('people');
      window.location.hash = id.startsWith('people-') ? id : `people-${id}`;
    } else if (id === 'publications') {
      setView('research');
      window.location.hash = 'publications';
      setTimeout(() => {
        const el = document.getElementById('publications-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return;
    } else {
      setView(id);
      window.location.hash = id;
    }

    if (targetAnchor) {
      setTimeout(() => {
        const tryScroll = () => {
          const el = document.getElementById(targetAnchor);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.remove('target-highlight-pulse');
            void el.offsetWidth; // trigger DOM reflow
            el.classList.add('target-highlight-pulse');
            setTimeout(() => {
              el.classList.remove('target-highlight-pulse');
            }, 3500);
            return true;
          }
          return false;
        };

        if (!tryScroll()) {
          setTimeout(tryScroll, 200);
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Compute what the "current" value is for Navbar highlighting
  // (reverse-map: if we're on 'people' page, tell Navbar which sub-item is active)
  const navCurrent = view === 'people'
    ? Object.entries(PEOPLE_TAB_MAP).find(([, tab]) => tab === peopleTab)?.[0] ?? 'people-faculty'
    : view;

  const renderView = () => {
    switch (view) {
      case 'home':       return <Home onNav={handleNav} news={data.news} events={data.events} publications={data.publications} />;
      case 'research':   return <Research onNav={handleNav} publications={data.publications} />;
      case 'research-detail': return <ResearchAreaDetail areaId={researchAreaId} onNav={handleNav} faculty={data.faculty} />;
      case 'programs':   return <Programs initialProg={progTab} onNav={handleNav} />;
      case 'people':     return (
        <Faculty
          key={peopleTab}  /* remount when tab changes from navbar */
          initialTab={peopleTab}
          onNav={handleNav}
          faculty={data.faculty}
          visiting={data.visiting}
          staff={data.staff}
          phd={data.phd}
          pg={data.pg}
          ug={data.ug}
          alumni={data.alumni}
        />
      );
      case 'facilities': return <Facilities facilities={data.facilities} onNav={handleNav} />;
      case 'events':     return <Events events={data.events} outreach={data.outreach} onNav={handleNav} />;
      case 'gallery':    return <Gallery />;
      case 'opportunities': return (
        <Opportunities
          opportunities={data.opportunities}
          studentOpportunities={data.student_opportunities}
          teacherOpportunities={data.teacher_opportunities}
          onNav={handleNav}
        />
      );
      // Legacy routes kept for safety
      case 'faculty':    return (
        <Faculty
          initialTab="faculty"
          onNav={handleNav}
          faculty={data.faculty} visiting={data.visiting} staff={data.staff}
          phd={data.phd} pg={data.pg} ug={data.ug} alumni={data.alumni}
        />
      );
      case 'students':   return <Students pg={data.pg} ug={data.ug} phd={data.phd} interns={data.interns} />;
      case 'alumni':     return <Alumni alumni={data.alumni} />;
      default:           return <Home onNav={handleNav} news={data.news} events={data.events} publications={data.publications} />;
    }
  };

  return (
    <>
      <InteractiveBackground />
      <Preloader
        loading={data.loading}
        isCached={data.isCached}
        onComplete={handlePreloaderComplete}
      />

      <Navbar current={navCurrent} onNav={handleNav} onOpenSearch={() => setSearchModalOpen(true)} />

      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNav={handleNav}
        data={data}
      />

      <main id="main-content" ref={mainRef}
        style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', overflowX: 'hidden' }}>
        {renderView()}
      </main>

      <button
        id="back-to-top"
        className={showBackTop ? 'visible' : ''}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Back to top"
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  );
}
