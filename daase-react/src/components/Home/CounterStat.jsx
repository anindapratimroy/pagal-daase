import { useEffect, useRef } from 'react';

export default function CounterStat({ target, label, prefix = '', suffix = '', delay = '0.06s' }) {
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    if (animated.current) return;
    animated.current = true;
    const el = ref.current;
    if (!el) return;

    const numericVal = typeof target === 'number' ? target : parseFloat(String(target).replace(/[^0-9.]/g, ''));

    if (isNaN(numericVal)) {
      el.textContent = `${prefix}${target}${suffix}`;
      return;
    }

    const dur = 1600;
    const start = performance.now();
    const update = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      const current = Math.round(e * numericVal);
      el.textContent = `${prefix}${current}${suffix}`;
      if (p < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [target, prefix, suffix]);

  return (
    <div className="hero-stat" style={{ animationDelay: delay }}>
      <span className="hero-stat-num" ref={ref}>
        {prefix}{target}{suffix}
      </span>
      <span className="hero-stat-label">{label}</span>
    </div>
  );
}
