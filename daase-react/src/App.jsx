import { useState, useEffect, useRef } from 'react';
import './index.css';

import Navbar from './components/Layout/Navbar';
import Preloader from './components/Layout/Preloader';

import Home from './components/Home/Home';
import Research from './components/Research/Research';
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

export default function App() {
  const [view, setView] = useState('home');
  const [loading, setLoading] = useState(true);
  const [showBackTop, setShowTop] = useState(false);
  const mainRef = useRef(null);

  // Data from Sheets / fallback
  const data = useData();

  // Preloader: show until data resolves (max 2.5s)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (!data.loading) setLoading(false);
  }, [data.loading]);

  // Back-to-top visibility
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const handler = () => setShowTop(el.scrollTop > 300);
    el.addEventListener('scroll', handler);
    return () => el.removeEventListener('scroll', handler);
  }, []);

  const handleNav = (id) => {
    setView(id);
    if (mainRef.current) mainRef.current.scrollTop = 0;
  };

  const renderView = () => {
    switch (view) {
      case 'home': return <Home onNav={handleNav} news={data.news} />;
      case 'research': return <Research />;
      case 'programs': return <Programs />;
      case 'faculty': return <Faculty faculty={data.faculty} visiting={data.visiting} staff={data.staff} />;
      case 'students': return <Students pg={data.pg} ug={data.ug} phd={data.phd} interns={data.interns} />;
      case 'facilities': return <Facilities facilities={data.facilities} />;
      case 'events': return <Events events={data.events} outreach={data.outreach} />;
      case 'alumni': return <Alumni alumni={data.alumni} />;
      case 'gallery': return <Gallery />;
      case 'opportunities': return <Opportunities />;
      case 'placements': return <Placements />;
      default: return <Home onNav={handleNav} news={data.news} />;
    }
  };

  return (
    <>
      <div className="cool-bg-container">
        <div className="bg-planet"></div>
        <img className="bg-satellite" src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2364748b'%3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2V7h-2v5H6v2h2v5h2v-5h2v2h2v-2h2v-2h-2v-2h2V7h-2v5h-2v-5z'/%3E%3C/svg%3E" alt="satellite" />
        <img className="bg-rocket" src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2364748b'%3E%3Cpath d='M13.13 22.19L11.5 18.36C13.07 17.78 14.54 17 15.9 16.03L13.13 22.19zM5.64 12.5l-3.83-1.63L7.97 8.1c.97 1.36 1.75 2.83 2.33 4.4L5.64 12.5zM21.6 2.4c-1.84-.71-4.73.49-7.55 2.4-2.81 1.91-5.18 4.67-6.23 7.23l2.87 2.87c2.56-1.05 5.32-3.42 7.23-6.23 1.91-2.82 3.11-5.71 2.4-7.55z'/%3E%3C/svg%3E" alt="rocket" />
      </div>
      <Preloader visible={loading} />

      <Navbar current={view} onNav={handleNav} />

      <main id="main-content" ref={mainRef}
        style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
        {renderView()}
      </main>

      <button
        id="back-to-top"
        className={showBackTop ? 'visible' : ''}
        onClick={() => { if (mainRef.current) mainRef.current.scrollTo({ top: 0, behavior: 'smooth' }); }}
        title="Back to top"
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  );
}
