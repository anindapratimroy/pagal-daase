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
      setProgress(Math.min(100, Math.round(((Date.now() - start) / DURATION) * 100)));
    }, 30);
    return () => { clearInterval(msgTimer); clearInterval(progressTimer); };
  }, [visible]);

  return (
    <div id="preloader" className={visible ? '' : 'hidden'}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
        <img src="images/IITI_Logo.svg" alt="IIT Indore" style={{ height: '70px', objectFit: 'contain' }} />
        <div style={{ width: '2px', height: '50px', background: 'var(--border)' }} />
        <img src="images/daase.png" alt="DAASE Logo" style={{ height: '70px', objectFit: 'contain', filter: 'brightness(0) saturate(100%) invert(18%) sepia(50%) saturate(1458%) hue-rotate(192deg) brightness(98%) contrast(97%)' }} />
      </div>
      
      <div className="pre-spinner" style={{ marginBottom: '16px' }} />
      <div className="pre-text" style={{ fontSize: '20px', fontWeight: 'bold' }}>Department of Astronomy, Astrophysics and Space Engineering</div>
      <div className="pre-sub" style={{ marginTop: '8px', fontSize: '14px', color: 'var(--navy)' }}>{MSGS[msgIdx]}</div>
      <div style={{ width: 220, height: 3, background: 'var(--border)', borderRadius: 2, overflow: 'hidden', marginTop: 4 }}>
        <div style={{ height: '100%', width: `${progress}%`, background: 'var(--navy)', transition: 'width 0.1s linear', borderRadius: 2 }} />
      </div>
    </div>
  );
}
