import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import './index.css';

import Navbar from './components/Layout/Navbar';
import Preloader from './components/Layout/Preloader';
import InteractiveBackground from './components/Layout/InteractiveBackground';

import Home from './components/Home/Home';
import Research from './components/Research/Research';
import Programs from './components/Programs/Programs';
import Faculty from './components/Faculty/Faculty';

// Lazy-loaded secondary view components for high-speed initial paint
const ResearchAreaDetail = lazy(() => import('./components/Research/ResearchAreaDetail'));
const Students           = lazy(() => import('./components/Students/Students'));
const Facilities         = lazy(() => import('./components/Facilities/Facilities'));
const Events             = lazy(() => import('./components/Events/Events'));
const Alumni             = lazy(() => import('./components/Alumni/Alumni'));
const Gallery            = lazy(() => import('./components/Gallery/Gallery'));
const Opportunities      = lazy(() => import('./components/Opportunities/Opportunities'));
const Publications       = lazy(() => import('./components/Research/Publications'));
const GlobalSearchModal  = lazy(() => import('./components/Layout/GlobalSearchModal'));

import AOS from 'aos';
import 'aos/dist/aos.css';

import { useData } from './hooks/useData';
import { updateDynamicSEO } from './utils/dynamicSeo';
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

  // Idle prefetching of secondary routes and modal chunks after main thread settles
  useEffect(() => {
    const timer = setTimeout(() => {
      import('./components/Layout/GlobalSearchModal');
      import('./components/Research/Publications');
      import('./components/Facilities/Facilities');
      import('./components/Events/Events');
      import('./components/Alumni/Alumni');
    }, 2000);
    return () => clearTimeout(timer);
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
        const { tab } = findPersonDetails(hash, dataRef.current);
        setPeopleTab(tab);
        setView('people');
        updateDynamicSEO(dataRef.current, 'people', tab, hash);
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
        setView('publications');
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

  // Dynamic SEO, Structured Data Knowledge Graph, OpenGraph & Meta Tag Sync
  // Automatically re-hydrates whenever data updates from Google Sheets or when routes change
  useEffect(() => {
    updateDynamicSEO(data, view, peopleTab, window.location.hash);
  }, [data, view, peopleTab]);

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
      setView('publications');
      window.location.hash = 'publications';
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
      case 'research':   return <Research onNav={handleNav} />;
      case 'publications': return <Publications onNav={handleNav} publications={data.publications} />;
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

      {searchModalOpen && (
        <Suspense fallback={null}>
          <GlobalSearchModal
            isOpen={searchModalOpen}
            onClose={() => setSearchModalOpen(false)}
            onNav={handleNav}
            data={data}
          />
        </Suspense>
      )}

      <main id="main-content" ref={mainRef}
        style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', overflowX: 'hidden' }}>
        <Suspense fallback={<div style={{ minHeight: '70vh' }} />}>
          {renderView()}
        </Suspense>
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
