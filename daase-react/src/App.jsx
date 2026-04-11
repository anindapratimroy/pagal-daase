import { useState, useEffect, useRef } from 'react';
import './index.css';

import Navbar      from './components/Layout/Navbar';
import Preloader   from './components/Layout/Preloader';

import Home         from './components/Home/Home';
import Research     from './components/Research/Research';
import Programs     from './components/Programs/Programs';
import Faculty      from './components/Faculty/Faculty';
import Students     from './components/Students/Students';
import Facilities   from './components/Facilities/Facilities';
import Events       from './components/Events/Events';
import Alumni       from './components/Alumni/Alumni';
import Gallery      from './components/Gallery/Gallery';
import Opportunities from './components/Opportunities/Opportunities';

import { useData } from './hooks/useData';

export default function App() {
  const [view, setView]           = useState('home');
  const [loading, setLoading]     = useState(true);
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
      case 'home':          return <Home onNav={handleNav} />;
      case 'research':      return <Research />;
      case 'programs':      return <Programs />;
      case 'faculty':       return <Faculty faculty={data.faculty} visiting={data.visiting} />;
      case 'students':      return <Students pg={data.pg} ug={data.ug} phd={data.phd} />;
      case 'facilities':    return <Facilities facilities={data.facilities} />;
      case 'events':        return <Events events={data.events} />;
      case 'alumni':        return <Alumni alumni={data.alumni} />;
      case 'gallery':       return <Gallery />;
      case 'opportunities': return <Opportunities />;
      default:              return <Home onNav={handleNav} />;
    }
  };

  return (
    <>
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
