import { useState, useEffect } from 'react';

const MSGS = [
  '✦  Loading DAASE Website…',
  '✦  Connecting to data source…',
  '✦  Fetching faculty profiles…',
  '✦  Loading student records…',
  '✦  Preparing gallery…',
  '✦  Aligning the cosmos…',
  '✦  Almost ready…',
];

export default function Preloader({ visible }) {
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const msgTimer = setInterval(() => setMsgIdx(i => (i + 1) % MSGS.length), 900);
    const start = Date.now();
    const DURATION = 2200;
    const progressTimer = setInterval(() => {
      setProgress(Math.min(100, Math.round(((Date.now() - start) / DURATION) * 100)));
    }, 30);
    return () => { clearInterval(msgTimer); clearInterval(progressTimer); };
  }, [visible]);

  return (
    <div id="preloader" className={visible ? '' : 'hidden'}>
      <div className="pre-spinner" />
      <div className="pre-text">Loading DAASE Website</div>
      <div className="pre-sub">{MSGS[msgIdx]}</div>
      <div style={{ width: 220, height: 3, background: 'var(--border)', borderRadius: 2, overflow: 'hidden', marginTop: 4 }}>
        <div style={{ height: '100%', width: `${progress}%`, background: 'var(--navy)', transition: 'width 0.1s linear', borderRadius: 2 }} />
      </div>
    </div>
  );
}
