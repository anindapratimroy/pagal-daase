import { useState, useEffect, useRef } from 'react';

const MSGS = [
  '✦  Connecting to data source...',
  '✦  Setting up the cosmos...',
  '✦  Almost ready...',
];

const PREWARM_ASSETS = [
  './images/IITI_Logo.svg',
  './images/daase.png',
  './images/research/Cosmology.png',
  './images/research/Compact_Objects_Transients.png',
  './images/research/Sun_and_Heliosphere.png',
  './images/research/Space_Weather_and_Atmospheric_Science.png',
  './images/research/Communication_Navigation_and_Remote_Sensing.png',
  './images/research/Data_Science_ML_in_Astrophysics.png',
];

export default function Preloader({
  loading = false,
  isCached = false,
  onComplete,
  visible: legacyVisible
}) {
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(15);
  const [isFinishing, setIsFinishing] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [exited, setExited] = useState(false);
  const finishedRef = useRef(false);

  // Check if visitor has already loaded the site in this browser session
  const isSessionVisited = typeof window !== 'undefined' && Boolean(sessionStorage.getItem('daase_session_visited'));

  // Adaptive display timings:
  // - In-session reload/navigation: 350ms (ultra-fast, non-intrusive)
  // - Returning visitor with fresh local cache: 550ms (quick polished brand intro)
  // - First-time cold start: 750ms minimum brand floor, up to 2100ms max safety cap
  const minDisplayMs = isSessionVisited ? 350 : (isCached ? 550 : 750);
  const maxTimeoutMs = isSessionVisited ? 850 : (isCached ? 1300 : 2100);

  // 1. Background image pre-warming (silent, concurrent cache preparation)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    PREWARM_ASSETS.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // 2. Message cycler
  useEffect(() => {
    if (isFinishing || fadeOut) return;
    const msgTimer = setInterval(() => {
      setMsgIdx(i => (i + 1) % MSGS.length);
    }, 750);
    return () => clearInterval(msgTimer);
  }, [isFinishing, fadeOut]);

  // 3. Intelligent adaptive progress and dismissal controller
  useEffect(() => {
    if (legacyVisible === false) {
      triggerFinish();
      return;
    }

    const startTime = Date.now();
    let minTimePassed = false;
    let timedOut = false;

    // Smooth progress progression toward 85% while waiting for live fetch
    const progressTimer = setInterval(() => {
      if (finishedRef.current) return;
      const elapsed = Date.now() - startTime;
      const progressTarget = Math.min(85, Math.round(15 + (elapsed / Math.max(minDisplayMs, 900)) * 70));
      setProgress(prev => (progressTarget > prev ? progressTarget : prev));
    }, 35);

    function triggerFinish() {
      if (finishedRef.current) return;
      finishedRef.current = true;
      clearInterval(progressTimer);
      clearTimeout(minTimer);
      clearTimeout(safetyTimer);

      setIsFinishing(true);
      // Smooth sweep to 100%
      setProgress(100);

      // Brief hold at 100% so the user perceives a completed, verified state
      setTimeout(() => {
        setFadeOut(true);
        try {
          sessionStorage.setItem('daase_session_visited', 'true');
        } catch { /* ignore */ }

        if (onComplete) onComplete();

        // After CSS opacity transition (400ms), unmount cleanly
        setTimeout(() => {
          setExited(true);
        }, 420);
      }, 180);
    }

    // Floor timer (guarantees logo & department name display cleanly)
    const minTimer = setTimeout(() => {
      minTimePassed = true;
      if (!loading || timedOut) {
        triggerFinish();
      }
    }, minDisplayMs);

    // Ceiling timer (safety timeout prevents trapping the user if network is slow/offline)
    const safetyTimer = setTimeout(() => {
      timedOut = true;
      if (minTimePassed) {
        triggerFinish();
      }
    }, maxTimeoutMs);

    // If data ready and floor has passed, finish immediately
    if (!loading && minTimePassed) {
      triggerFinish();
    }

    return () => {
      clearInterval(progressTimer);
      clearTimeout(minTimer);
      clearTimeout(safetyTimer);
    };
  }, [loading, legacyVisible, minDisplayMs, maxTimeoutMs]);

  if (exited) return null;

  return (
    <div id="preloader" className={fadeOut ? 'hidden' : ''}>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '36px' }}>
        <img src="./images/IITI_Logo.svg" alt="IIT Indore" style={{ height: '65px', objectFit: 'contain' }} />
        <div style={{ width: '1px', height: '55px', background: 'var(--navy)', opacity: 0.3 }} />
        <img
          src="./images/daase.png"
          alt="DAASE Logo"
          style={{
            height: '65px',
            objectFit: 'contain',
            filter: 'brightness(0) saturate(100%) invert(18%) sepia(50%) saturate(1458%) hue-rotate(192deg) brightness(98%) contrast(97%)'
          }}
        />
      </div>
      
      <div className="pre-text" style={{ fontSize: '22px', fontWeight: '600', color: 'var(--navy)', letterSpacing: '0.5px', textAlign: 'center' }}>
        Department of Astronomy, Astrophysics and Space Engineering
      </div>
      
      <div style={{ width: '280px', height: '4px', background: 'rgba(0, 15, 35, 0.1)', borderRadius: '4px', overflow: 'hidden', marginTop: '28px' }}>
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--navy), var(--gold-light))',
            transition: progress === 100 ? 'width 0.22s cubic-bezier(0.4, 0, 0.2, 1)' : 'width 0.12s ease-out',
            borderRadius: '4px'
          }}
        />
      </div>

      <div className="pre-sub" style={{ marginTop: '16px', fontSize: '13.5px', color: 'var(--navy)', fontWeight: '500', opacity: 0.7, letterSpacing: '0.5px' }}>
        {isFinishing ? '✦  Welcome to DAASE' : MSGS[msgIdx]}
      </div>
    </div>
  );
}
