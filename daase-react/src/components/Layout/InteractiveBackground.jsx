import React, { useRef, useEffect, useCallback } from 'react';

/**
 * CosmosBackground — Professional Deep-Space Starfield
 *
 * Features:
 *  ✦ 320 twinkling stars with varied sizes, colours & opacity pulsation
 *  ✦ Gentle cosmic drift movement simulating stellar flow
 *  ✦ Mouse gravity — stars lean toward cursor with a soft gravitational pull
 *  ✦ Glowing cursor aura that illuminates nearby stars
 *  ✦ Shooting stars with long tapered tails
 *  ✦ Faint constellation lines between proximate stars
 *  ✦ Colour-cycling nebula blobs (blue → violet → teal → pink)
 *  ✦ Soft aurora ribbons drifting across the canvas
 *  ✦ Click → professional gravitational ripple wave (no explosions)
 *  ✦ Pulsing deep-space beacons — larger stars that throb gently
 *  ✦ Zero external dependencies
 */
const InteractiveBackground = () => {
  const canvasRef    = useRef(null);
  const animRef      = useRef(null);
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const starsRef     = useRef([]);
  const shootingRef  = useRef([]);
  const nebulasRef   = useRef([]);
  const aurorasRef   = useRef([]);
  const ripplesRef   = useRef([]);   // click ripple rings
  const timeRef      = useRef(0);

  const STAR_COLORS = [
    'rgba(255,255,255,',
    'rgba(200,220,255,',
    'rgba(170,200,255,',
    'rgba(96,165,250,',
    'rgba(139,92,246,',
    'rgba(255,220,180,',
    'rgba(120,180,255,',
  ];

  const NEBULA_PALETTE = [
    [29,  78,  216],   // blue
    [139, 92,  246],   // violet
    [16,  185, 129],   // teal
    [236, 72,  153],   // rose
  ];

  const createStar = useCallback((w, h) => {
    const col      = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
    const isBeacon = Math.random() < 0.04;
    return {
      x:            Math.random() * w,
      y:            Math.random() * h,
      size:         isBeacon ? (Math.random() * 2 + 2.5) : (Math.random() * 2.2 + 0.3),
      colorBase:    col,
      opacity:      isBeacon ? (Math.random() * 0.3 + 0.5) : (Math.random() * 0.6 + 0.2),
      twinkleSpeed: isBeacon ? (Math.random() * 0.007 + 0.003) : (Math.random() * 0.02 + 0.005),
      twinkleOff:   Math.random() * Math.PI * 2,
      driftX:       (Math.random() - 0.5) * 0.08,
      driftY:       (Math.random() - 0.5) * 0.04 + 0.012,
      isBeacon,
      vx: 0, vy: 0,
    };
  }, []);

  const createShooting = useCallback((w, h) => {
    const angle = Math.PI / 6 + Math.random() * Math.PI / 5;
    const speed = 6 + Math.random() * 9;
    return {
      x:     Math.random() * w * 1.2 - w * 0.1,
      y:     Math.random() * h * 0.35,
      vx:    Math.cos(angle) * speed,
      vy:    Math.sin(angle) * speed,
      life:  1.0,
      decay: 0.005 + Math.random() * 0.009,
      len:   55 + Math.random() * 85,
      width: 1 + Math.random() * 1.8,
    };
  }, []);

  const createNebula = useCallback((w, h, ci) => ({
    x:          Math.random() * w,
    y:          Math.random() * h,
    radius:     130 + Math.random() * 260,
    ci:         ci % NEBULA_PALETTE.length,
    colorPhase: Math.random() * Math.PI * 2,
    colorSpeed: 0.0008 + Math.random() * 0.0015,
    driftX:     (Math.random() - 0.5) * 0.022,
    driftY:     (Math.random() - 0.5) * 0.016,
    pulseSpeed: 0.0018 + Math.random() * 0.0035,
    pulseOff:   Math.random() * Math.PI * 2,
    baseAlpha:  0.010 + Math.random() * 0.018,
  }), []);

  const createAurora = useCallback((w, h) => ({
    y:          Math.random() * h * 0.65,
    amp:        45 + Math.random() * 80,
    wavelength: 320 + Math.random() * 420,
    phase:      Math.random() * Math.PI * 2,
    phaseSpeed: 0.0025 + Math.random() * 0.004,
    ci:         Math.floor(Math.random() * NEBULA_PALETTE.length),
    alpha:      0.012 + Math.random() * 0.018,
    thickness:  55 + Math.random() * 90,
    driftY:     (Math.random() - 0.5) * 0.012,
  }), []);

  // Professional ripple ring created on click
  const createRipple = useCallback((x, y) => ({
    x, y,
    radius:  0,
    maxR:    200 + Math.random() * 120,
    speed:   2.2 + Math.random() * 1.2,
    life:    1.0,
    decay:   0.012,
  }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const STAR_COUNT    = 320;
    const NEBULA_COUNT  = 7;
    const AURORA_COUNT  = 3;
    const ATTRACT_R     = 300;
    const ATTRACT_STR   = 0.45;
    const GLOW_R        = 280;
    const LINE_DIST     = 95;
    const LINE_ALPHA    = 0.06;
    const FRICTION      = 0.962;

    let resizeTimer;
    const resize = (isInit) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = window.innerWidth  + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      if (isInit !== true) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          const W = window.innerWidth;
          const H = window.innerHeight;
          starsRef.current   = Array.from({ length: STAR_COUNT },  (_, i) => createStar(W, H));
          nebulasRef.current = Array.from({ length: NEBULA_COUNT }, (_, i) => createNebula(W, H, i));
          aurorasRef.current = Array.from({ length: AURORA_COUNT }, ()    => createAurora(W, H));
        }, 250);
      }
    };
    resize(true);
    window.addEventListener('resize', resize);

    const W = window.innerWidth;
    const H = window.innerHeight;

    starsRef.current   = Array.from({ length: STAR_COUNT },  (_, i) => createStar(W, H));
    nebulasRef.current = Array.from({ length: NEBULA_COUNT }, (_, i) => createNebula(W, H, i));
    aurorasRef.current = Array.from({ length: AURORA_COUNT }, ()    => createAurora(W, H));

    const onMove  = e => { mouseRef.current.x = e.clientX; mouseRef.current.y = e.clientY; };
    const onLeave = () => { mouseRef.current.x = -9999; mouseRef.current.y = -9999; };

    // Click = gravitational ripple wave (professional, scientific)
    const onClick = e => {
      ripplesRef.current.push(createRipple(e.clientX, e.clientY));

      // Give nearby stars a gentle radial push outward
      const stars = starsRef.current;
      for (const s of stars) {
        const dx   = s.x - e.clientX;
        const dy   = s.y - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 1) {
          const force = (1 - dist / 180) * 0.7;
          s.vx += (dx / dist) * force;
          s.vy += (dy / dist) * force;
        }
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('click', onClick);

    const animate = () => {
      const W2 = window.innerWidth;
      const H2 = window.innerHeight;
      timeRef.current++;
      const t = timeRef.current;

      ctx.clearRect(0, 0, W2, H2);

      // ── Aurora ribbons ──────────────────────────────────
      for (const a of aurorasRef.current) {
        a.phase += a.phaseSpeed;
        a.y     += a.driftY;
        if (a.y < -a.thickness * 2) a.y = H2 + a.thickness * 2;
        if (a.y >  H2 + a.thickness * 2) a.y = -a.thickness * 2;

        const [r, g, b] = NEBULA_PALETTE[a.ci];
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, a.y);
        for (let x = 0; x <= W2; x += 6) {
          const yy = a.y + Math.sin((x / a.wavelength) * Math.PI * 2 + a.phase) * a.amp;
          ctx.lineTo(x, yy);
        }
        ctx.strokeStyle = `rgba(${r},${g},${b},${a.alpha * 0.55})`;
        ctx.lineWidth   = a.thickness;
        ctx.lineCap     = 'round';
        ctx.stroke();
        ctx.restore();
      }

      // ── Colour-cycling nebulas ──────────────────────────
      for (const nb of nebulasRef.current) {
        nb.x          += nb.driftX;
        nb.y          += nb.driftY;
        nb.colorPhase += nb.colorSpeed;

        if (nb.x < -nb.radius)       nb.x = W2 + nb.radius;
        if (nb.x >  W2 + nb.radius)  nb.x = -nb.radius;
        if (nb.y < -nb.radius)       nb.y = H2 + nb.radius;
        if (nb.y >  H2 + nb.radius)  nb.y = -nb.radius;

        const ci2  = (nb.ci + 1) % NEBULA_PALETTE.length;
        const mix  = (Math.sin(nb.colorPhase) + 1) / 2;
        const c1   = NEBULA_PALETTE[nb.ci];
        const c2   = NEBULA_PALETTE[ci2];
        const rr   = Math.round(c1[0] * (1 - mix) + c2[0] * mix);
        const gg   = Math.round(c1[1] * (1 - mix) + c2[1] * mix);
        const bb   = Math.round(c1[2] * (1 - mix) + c2[2] * mix);
        const pulse = 0.75 + 0.25 * Math.sin(t * nb.pulseSpeed + nb.pulseOff);

        const grad = ctx.createRadialGradient(nb.x, nb.y, 0, nb.x, nb.y, nb.radius * pulse);
        grad.addColorStop(0, `rgba(${rr},${gg},${bb},${nb.baseAlpha})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(nb.x - nb.radius, nb.y - nb.radius, nb.radius * 2, nb.radius * 2);
      }

      const mouse = mouseRef.current;

      // ── Cursor aura ────────────────────────────────────
      if (mouse.x > 0 && mouse.y > 0) {
        const ag = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, GLOW_R);
        ag.addColorStop(0,   'rgba(255, 217, 122, 0.08)');
        ag.addColorStop(0.4, 'rgba(255, 217, 122, 0.025)');
        ag.addColorStop(1,   'transparent');
        ctx.fillStyle = ag;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, GLOW_R, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Stars ───────────────────────────────────────────
      const stars = starsRef.current;
      for (const s of stars) {
        const dx   = mouse.x - s.x;
        const dy   = mouse.y - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < ATTRACT_R && dist > 1) {
          const force = (1 - dist / ATTRACT_R) * ATTRACT_STR;
          // REPEL strongly away from mouse instead of attract
          s.vx -= (dx / dist) * force * 6;
          s.vy -= (dy / dist) * force * 6;
        }
        s.vx *= FRICTION;
        s.vy *= FRICTION;
        s.x  += s.driftX + s.vx;
        s.y  += s.driftY + s.vy;

        if (s.x < -10)      s.x = W2 + 10;
        if (s.x > W2 + 10)  s.x = -10;
        if (s.y < -10)      s.y = H2 + 10;
        if (s.y > H2 + 10)  s.y = -10;

        const tw     = Math.sin(t * s.twinkleSpeed + s.twinkleOff);
        const base   = s.opacity + tw * (s.isBeacon ? 0.35 : 0.25);
        const clamp  = Math.max(0.05, Math.min(1, base));
        const prox   = dist < GLOW_R ? (1 - dist / GLOW_R) * 0.45 : 0;
        const alpha  = Math.min(1, clamp + prox);

        if (s.isBeacon) {
          const bg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 9);
          bg.addColorStop(0,   s.colorBase + (alpha * 0.22).toFixed(3) + ')');
          bg.addColorStop(0.5, s.colorBase + (alpha * 0.07).toFixed(3) + ')');
          bg.addColorStop(1,   s.colorBase + '0)');
          ctx.fillStyle = bg;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 9, 0, Math.PI * 2);
          ctx.fill();
        } else if (s.size > 1.0) {
          const gg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 4);
          gg.addColorStop(0, s.colorBase + (alpha * 0.28).toFixed(3) + ')');
          gg.addColorStop(1, s.colorBase + '0)');
          ctx.fillStyle = gg;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = s.colorBase + alpha.toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        s._rx = s.x; s._ry = s.y; s._a = alpha;
      }

      // ── Constellation lines ─────────────────────────────
      ctx.lineWidth = 0.5;
      const chk = Math.min(stars.length, 100);
      for (let i = 0; i < chk; i++) {
        let c = 0;
        for (let j = i + 1; j < chk && c < 3; j++) {
          const dx2 = stars[i]._rx - stars[j]._rx;
          const dy2 = stars[i]._ry - stars[j]._ry;
          const ds  = dx2 * dx2 + dy2 * dy2;
          if (ds < LINE_DIST * LINE_DIST) {
            const d = Math.sqrt(ds);
            const la = (1 - d / LINE_DIST) * LINE_ALPHA * Math.min(stars[i]._a, stars[j]._a);
            ctx.strokeStyle = `rgba(96,165,250,${la.toFixed(4)})`;
            ctx.beginPath();
            ctx.moveTo(stars[i]._rx, stars[i]._ry);
            ctx.lineTo(stars[j]._rx, stars[j]._ry);
            ctx.stroke();
            c++;
          }
        }
      }

      // ── Shooting stars ──────────────────────────────────
      if (Math.random() < 0.005) shootingRef.current.push(createShooting(W2, H2));
      for (let i = shootingRef.current.length - 1; i >= 0; i--) {
        const ss = shootingRef.current[i];
        ss.x += ss.vx; ss.y += ss.vy; ss.life -= ss.decay;
        if (ss.life <= 0) { shootingRef.current.splice(i, 1); continue; }

        const mag  = Math.sqrt(ss.vx * ss.vx + ss.vy * ss.vy);
        const tx   = ss.x - ss.vx * (ss.len / mag);
        const ty   = ss.y - ss.vy * (ss.len / mag);
        const sg   = ctx.createLinearGradient(tx, ty, ss.x, ss.y);
        sg.addColorStop(0,   'rgba(255,255,255,0)');
        sg.addColorStop(0.5, `rgba(200,220,255,${(ss.life * 0.35).toFixed(3)})`);
        sg.addColorStop(1,   `rgba(255,255,255,${(ss.life * 0.95).toFixed(3)})`);
        ctx.strokeStyle = sg;
        ctx.lineWidth   = ss.width * ss.life;
        ctx.lineCap     = 'round';
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();
        ctx.fillStyle = `rgba(255,255,255,${(ss.life * 0.8).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.width * ss.life * 0.85, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Gravitational ripple rings (click effect) ───────
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const rp = ripplesRef.current[i];
        rp.radius += rp.speed * (1 + rp.radius / rp.maxR * 0.6); // accelerates outward
        rp.life   -= rp.decay;
        if (rp.life <= 0 || rp.radius > rp.maxR) { ripplesRef.current.splice(i, 1); continue; }

        const progress = rp.radius / rp.maxR;      // 0 → 1
        const ringAlpha = rp.life * (1 - progress) * 0.55;

        // Outer ring — bright leading edge
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(96,165,250,${ringAlpha.toFixed(3)})`;
        ctx.lineWidth   = 1.2;
        ctx.stroke();

        // Inner soft glow halo
        const haloGrad = ctx.createRadialGradient(rp.x, rp.y, Math.max(0, rp.radius - 12), rp.x, rp.y, rp.radius + 4);
        haloGrad.addColorStop(0, `rgba(96,165,250,0)`);
        haloGrad.addColorStop(0.5, `rgba(96,165,250,${(ringAlpha * 0.18).toFixed(3)})`);
        haloGrad.addColorStop(1, `rgba(96,165,250,0)`);
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius + 4, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize',     resize);
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('click',      onClick);
    };
  }, [createStar, createShooting, createNebula, createAurora, createRipple]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:       'fixed',
        top:            0,
        left:           0,
        width:          '100%',
        height:         '100%',
        zIndex:         -1,
        backgroundColor:'#020617',
        pointerEvents:  'none',
      }}
    />
  );
};

export default InteractiveBackground;
