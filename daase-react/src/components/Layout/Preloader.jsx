import { useState, useEffect } from 'react';

const MSGS = [
  '✦  Just a moment...',
  '✦  Connecting to data source...',
  '✦  Setting up the cosmos...',
  '✦  Almost ready...',
];

export default function Preloader({ visible }) {
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const msgTimer = setInterval(() => setMsgIdx(i => (i + 1) % MSGS.length), 900);
    const start = Date.now();
    const DURATION = 2500;
    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - start;
      if (elapsed < DURATION) {
        setProgress(Math.round((elapsed / DURATION) * 85));
      } else {
        const extra = elapsed - DURATION;
        const creep = 14 * (1 - Math.exp(-extra / 3000));
        setProgress(Math.round(85 + creep));
      }
    }, 30);
    return () => { clearInterval(msgTimer); clearInterval(progressTimer); };
  }, [visible]);

  return (
    <div id="preloader" className={visible ? '' : 'hidden'}>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '36px' }}>
        <img src="./images/IITI_Logo.svg" alt="IIT Indore" style={{ height: '65px', objectFit: 'contain' }} />
        <div style={{ width: '1px', height: '55px', background: 'var(--navy)', opacity: 0.3 }} />
        <img src="./images/daase.png" alt="DAASE Logo" style={{ height: '65px', objectFit: 'contain', filter: 'brightness(0) saturate(100%) invert(18%) sepia(50%) saturate(1458%) hue-rotate(192deg) brightness(98%) contrast(97%)' }} />
      </div>
      
      <div className="pre-text" style={{ fontSize: '22px', fontWeight: '600', color: 'var(--navy)', letterSpacing: '0.5px', textAlign: 'center' }}>
        Department of Astronomy, Astrophysics and Space Engineering
      </div>
      
      <div style={{ width: '280px', height: '4px', background: 'rgba(0, 15, 35, 0.1)', borderRadius: '4px', overflow: 'hidden', marginTop: '28px' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, var(--navy), var(--gold-light))', transition: 'width 0.15s ease-out', borderRadius: '4px' }} />
      </div>

      <div className="pre-sub" style={{ marginTop: '16px', fontSize: '13.5px', color: 'var(--navy)', fontWeight: '500', opacity: 0.7, letterSpacing: '0.5px' }}>
        {MSGS[msgIdx]}
      </div>
    </div>
  );
}
