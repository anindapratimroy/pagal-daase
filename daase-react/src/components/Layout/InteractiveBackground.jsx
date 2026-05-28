import React, { useEffect, useRef } from 'react';

export default function InteractiveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let stars = [];
    let spaceObjects = [];
    const mouse = { x: null, y: null, targetX: null, targetY: null };
    let animationFrameId;

    // Colors matching the site's light theme
    const colors = {
      navy: '#0f2d60',
      navyLight: '#e8eef8',
      gold: '#b5862a',
      goldLight: '#f0c84a',
      grey: '#bbc8da'
    };

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      stars = [];
      // Higher density for network constellation effect
      const numStars = Math.floor((width * height) / 12000); 
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.25 + 0.05,
          twinkleSpeed: Math.random() * 0.005 + 0.001,
          parallaxFactor: Math.random() * 0.03 + 0.01,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1
        });
      }

      // Add more diverse, futuristic yet formal space objects
      spaceObjects = [
        { type: 'planet', x: width * 0.15, y: height * 0.2, vx: 0.05, vy: 0.03, rotation: 0, vRot: 0.0005, size: width > 768 ? 140 : 80, parallaxFactor: 0.04, seed: 0.2 },
        { type: 'planet-ring', x: width * 0.85, y: height * 0.75, vx: -0.06, vy: -0.04, rotation: Math.PI / 6, vRot: 0.0003, size: width > 768 ? 100 : 60, parallaxFactor: 0.06, seed: 0.8 },
        { type: 'satellite', x: width * 0.5, y: height * 0.85, vx: 0.08, vy: -0.05, rotation: -Math.PI / 8, vRot: 0.001, size: width > 768 ? 24 : 16, parallaxFactor: 0.08, seed: 0.5 },
        { type: 'wireframe-globe', x: width * 0.75, y: height * 0.25, vx: -0.04, vy: 0.02, rotation: 0, vRot: 0.002, size: width > 768 ? 80 : 50, parallaxFactor: 0.05, seed: 0.1 },
        { type: 'orbit-system', x: width * 0.25, y: height * 0.8, vx: 0.03, vy: -0.03, rotation: 0, vRot: -0.001, size: width > 768 ? 90 : 55, parallaxFactor: 0.07, seed: 0.9 },
        { type: 'satellite', x: width * 0.1, y: height * 0.6, vx: 0.06, vy: 0.06, rotation: Math.PI / 4, vRot: -0.002, size: width > 768 ? 18 : 12, parallaxFactor: 0.09, seed: 0.4 },
        { type: 'planet', x: width * 0.45, y: height * 0.15, vx: -0.02, vy: 0.01, rotation: 0, vRot: 0.0002, size: width > 768 ? 50 : 30, parallaxFactor: 0.02, seed: 0.7 }
      ];
    };

    const drawPlanet = (ctx, obj) => {
      ctx.beginPath();
      ctx.arc(0, 0, obj.size, 0, Math.PI * 2);
      ctx.fillStyle = obj.seed > 0.5 ? colors.navyLight : colors.grey;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, obj.size, 0, Math.PI * 2);
      const grad = ctx.createLinearGradient(-obj.size, -obj.size, obj.size, obj.size);
      grad.addColorStop(0, 'rgba(255,255,255,0.6)');
      grad.addColorStop(1, 'rgba(15, 45, 96, 0.08)');
      ctx.fillStyle = grad;
      ctx.fill();
    };

    const drawPlanetRing = (ctx, obj) => {
      drawPlanet(ctx, obj);
      ctx.beginPath();
      ctx.ellipse(0, 0, obj.size * 2.2, obj.size * 0.6, Math.PI / 6, 0, Math.PI * 2);
      ctx.strokeStyle = colors.goldLight;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const drawSatellite = (ctx, obj) => {
      ctx.fillStyle = colors.grey;
      ctx.fillRect(-obj.size/4, -obj.size/2, obj.size/2, obj.size);
      ctx.fillStyle = colors.navy;
      ctx.fillRect(-obj.size * 1.8, -obj.size/3, obj.size*1.2, obj.size/1.5);
      ctx.fillRect(obj.size/1.5, -obj.size/3, obj.size*1.2, obj.size/1.5);
      ctx.beginPath();
      ctx.moveTo(0, -obj.size/2);
      ctx.lineTo(0, -obj.size);
      ctx.arc(0, -obj.size, obj.size/3, 0, Math.PI, true);
      ctx.strokeStyle = colors.grey;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const drawWireframeGlobe = (ctx, obj) => {
      ctx.strokeStyle = colors.navy;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(0, 0, obj.size, 0, Math.PI * 2);
      ctx.stroke();
      
      // Latitudes
      ctx.beginPath();
      ctx.ellipse(0, 0, obj.size, obj.size * 0.3, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(0, 0, obj.size, obj.size * 0.7, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Longitudes
      ctx.beginPath();
      ctx.ellipse(0, 0, obj.size * 0.3, obj.size, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(0, 0, obj.size * 0.7, obj.size, 0, 0, Math.PI * 2);
      ctx.stroke();
    };

    const drawOrbitSystem = (ctx, obj) => {
      // Core
      ctx.beginPath();
      ctx.arc(0, 0, obj.size * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = colors.gold;
      ctx.fill();

      // Orbits
      ctx.strokeStyle = colors.grey;
      ctx.lineWidth = 0.5;
      
      for(let i=1; i<=3; i++) {
        const radius = obj.size * 0.3 * i;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Orbiting nodes
        const angle = (Date.now() * 0.0005 * i * (i%2===0?-1:1)) + obj.seed;
        const ex = Math.cos(angle) * radius;
        const ey = Math.sin(angle) * radius;
        ctx.beginPath();
        ctx.arc(ex, ey, 3, 0, Math.PI * 2);
        ctx.fillStyle = colors.navy;
        ctx.fill();
      }
    };

    let smoothedMouseX = window.innerWidth / 2;
    let smoothedMouseY = window.innerHeight / 2;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (mouse.targetX !== null) {
        smoothedMouseX += (mouse.targetX - smoothedMouseX) * 0.04;
        smoothedMouseY += (mouse.targetY - smoothedMouseY) * 0.04;
      }
      
      const mouseOffsetX = (smoothedMouseX - width / 2);
      const mouseOffsetY = (smoothedMouseY - height / 2);

      // Draw light-theme "Stars" and manage movement
      for (let i = 0; i < stars.length; i++) {
        let s = stars[i];
        
        // Constant slow drift for futuristic feel
        s.x += s.vx;
        s.y += s.vy;
        if(s.x < 0) s.x = width;
        if(s.x > width) s.x = 0;
        if(s.y < 0) s.y = height;
        if(s.y > height) s.y = 0;

        s.opacity += s.twinkleSpeed;
        if (s.opacity > 0.35 || s.opacity < 0.02) s.twinkleSpeed *= -1;
        
        const px = (s.x - mouseOffsetX * s.parallaxFactor + width) % width;
        const py = (s.y - mouseOffsetY * s.parallaxFactor + height) % height;
        
        s.px = px;
        s.py = py;

        ctx.beginPath();
        ctx.arc(px, py, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(15, 45, 96, ${s.opacity})`;
        ctx.fill();
      }

      // Draw Constellation Network (Futuristic nodes)
      ctx.lineWidth = 0.4;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].px - stars[j].px;
          const dy = stars[i].py - stars[j].py;
          const dist = dx*dx + dy*dy;
          
          if (dist < 12000) { // Connect dots within ~110px
            const alpha = (1 - dist / 12000) * 0.12; 
            ctx.beginPath();
            ctx.moveTo(stars[i].px, stars[i].py);
            ctx.lineTo(stars[j].px, stars[j].py);
            ctx.strokeStyle = `rgba(15, 45, 96, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Interactive Mouse Gravity Network (Gold connections)
      if (mouse.targetX !== null) {
        for (let i = 0; i < stars.length; i++) {
           const dx = stars[i].px - smoothedMouseX;
           const dy = stars[i].py - smoothedMouseY;
           const dist = dx*dx + dy*dy;
           if (dist < 30000) { // ~173px
             const alpha = (1 - dist / 30000) * 0.25; 
             ctx.beginPath();
             ctx.moveTo(stars[i].px, stars[i].py);
             ctx.lineTo(smoothedMouseX, smoothedMouseY);
             ctx.strokeStyle = `rgba(181, 134, 42, ${alpha})`; // Gold lines
             ctx.stroke();
           }
        }
      }

      // Draw Space Objects
      for (let obj of spaceObjects) {
        obj.x += obj.vx;
        obj.y += obj.vy;
        obj.rotation += obj.vRot;

        // Wrap around screen
        const padding = obj.size * 3;
        if (obj.x < -padding) obj.x = width + padding;
        if (obj.x > width + padding) obj.x = -padding;
        if (obj.y < -padding) obj.y = height + padding;
        if (obj.y > height + padding) obj.y = -padding;

        const px = obj.x - mouseOffsetX * obj.parallaxFactor;
        const py = obj.y - mouseOffsetY * obj.parallaxFactor;

        // Interactive gravity to mouse
        if (mouse.targetX !== null) {
          const dx = px - mouse.targetX;
          const dy = py - mouse.targetY;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 400) {
            obj.vx -= (dx / dist) * 0.0008;
            obj.vy -= (dy / dist) * 0.0008;
            
            const speed = Math.sqrt(obj.vx*obj.vx + obj.vy*obj.vy);
            if(speed > 0.4) {
              obj.vx = (obj.vx / speed) * 0.4;
              obj.vy = (obj.vy / speed) * 0.4;
            }
          }
        }

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(obj.rotation);
        
        ctx.globalAlpha = 0.18; // Slightly more visible but still faint
        
        if (obj.type === 'planet') drawPlanet(ctx, obj);
        else if (obj.type === 'planet-ring') drawPlanetRing(ctx, obj);
        else if (obj.type === 'satellite') drawSatellite(ctx, obj);
        else if (obj.type === 'wireframe-globe') drawWireframeGlobe(ctx, obj);
        else if (obj.type === 'orbit-system') drawOrbitSystem(ctx, obj);

        ctx.restore();
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw();

    const handleResize = () => init();
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.targetX = null;
      mouse.targetY = null;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none', background: 'transparent' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
