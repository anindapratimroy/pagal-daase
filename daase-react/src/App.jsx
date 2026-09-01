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

import AOS from 'aos';
import 'aos/dist/aos.css';

import { useData } from './hooks/useData';

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
};

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
  const [minTimePassed, setMinTimePassed] = useState(false);
  const [showBackTop, setShowTop] = useState(false);
  const mainRef = useRef(null);

  const data = useData();

  // Preloader: strictly wait 1.8s minimum for animation to finish.
  // We no longer wait for data fetch to complete so the page loads blazing fast.
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });

    const t = setTimeout(() => setMinTimePassed(true), 1800);
    return () => clearTimeout(t);
  }, []);
  
  const isLoading = !minTimePassed;

  // Hash Routing Listener
  useEffect(() => {
    const syncHashToState = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      
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

  const handleNav = (id, detailId = null) => {
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
    } else {
      setView(id);
      window.location.hash = id;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      case 'research-detail': return <ResearchAreaDetail areaId={researchAreaId} onNav={handleNav} />;
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
      case 'facilities': return <Facilities facilities={data.facilities} />;
      case 'events':     return <Events events={data.events} outreach={data.outreach} />;
      case 'gallery':    return <Gallery />;
      case 'opportunities': return <Opportunities opportunities={data.opportunities} />;
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
      <Preloader visible={isLoading} />

      <Navbar current={navCurrent} onNav={handleNav} />

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
