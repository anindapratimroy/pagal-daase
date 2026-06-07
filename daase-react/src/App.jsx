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
import Placements from './components/Placements/Placements';

import { useData } from './hooks/useData';

// Map People dropdown IDs → Faculty component tab IDs
const PEOPLE_TAB_MAP = {
  'people-faculty': 'faculty',
  'people-staff':   'staff',
  'people-phd':     'phd',
  'people-pg':      'pg',
  'people-ug':      'ug',
  'people-alumni':  'alumni',
};

export default function App() {
  const [view, setView] = useState('home');
  const [peopleTab, setPeopleTab] = useState('faculty'); // active tab inside People page
  const [researchAreaId, setResearchAreaId] = useState(null); // active research area
  const [loading, setLoading] = useState(true);
  const [showBackTop, setShowTop] = useState(false);
  const mainRef = useRef(null);

  const data = useData();

  // Preloader: show until data resolves (fallback 15s in case of total failure)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (!data.loading) setLoading(false);
  }, [data.loading]);

  // Back-to-top visibility
  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNav = (id, detailId = null) => {
    if (PEOPLE_TAB_MAP[id]) {
      // It's a People sub-item — map to the People page with the right tab
      setPeopleTab(PEOPLE_TAB_MAP[id]);
      setView('people');
    } else if (id === 'research-detail') {
      setResearchAreaId(detailId);
      setView('research-detail');
    } else {
      setView(id);
    }
    window.scrollTo(0, 0);
  };

  // Compute what the "current" value is for Navbar highlighting
  // (reverse-map: if we're on 'people' page, tell Navbar which sub-item is active)
  const navCurrent = view === 'people'
    ? Object.entries(PEOPLE_TAB_MAP).find(([, tab]) => tab === peopleTab)?.[0] ?? 'people-faculty'
    : view;

  const renderView = () => {
    switch (view) {
      case 'home':       return <Home onNav={handleNav} news={data.news} events={data.events} />;
      case 'research':   return <Research onNav={handleNav} />;
      case 'research-detail': return <ResearchAreaDetail areaId={researchAreaId} onNav={handleNav} />;
      case 'programs':   return <Programs />;
      case 'people':     return (
        <Faculty
          key={peopleTab}  /* remount when tab changes from navbar */
          initialTab={peopleTab}
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
      case 'placements': return <Placements />;
      // Legacy routes kept for safety
      case 'faculty':    return (
        <Faculty
          initialTab="faculty"
          faculty={data.faculty} visiting={data.visiting} staff={data.staff}
          phd={data.phd} pg={data.pg} ug={data.ug} alumni={data.alumni}
        />
      );
      case 'students':   return <Students pg={data.pg} ug={data.ug} phd={data.phd} interns={data.interns} />;
      case 'alumni':     return <Alumni alumni={data.alumni} />;
      default:           return <Home onNav={handleNav} news={data.news} events={data.events} />;
    }
  };

  return (
    <>
      <InteractiveBackground />
      <Preloader visible={loading} />

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
