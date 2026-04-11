import { useEffect, useRef } from 'react';

export default function CounterStat({ target, label, delay = '0.06s' }) {
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    if (animated.current) return;
    animated.current = true;
    const el = ref.current;
    if (!el) return;
    const dur = 1600;
    const start = performance.now();
    const update = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(e * target);
      if (p < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [target]);

  return (
    <div className="hero-stat" style={{ animationDelay: delay }}>
      <span className="hero-stat-num" ref={ref}>{target}</span>
      <span className="hero-stat-label">{label}</span>
    </div>
  );
}
