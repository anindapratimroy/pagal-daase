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
      // Very sparse starfield for a minimalistic look
      const numStars = Math.floor((width * height) / 25000); 
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5,
          opacity: Math.random() * 0.15 + 0.05, // very faint
          twinkleSpeed: Math.random() * 0.005 + 0.001,
          parallaxFactor: Math.random() * 0.02 + 0.005
        });
      }

      // Exact count of formal space objects to avoid clutter
      spaceObjects = [
        {
          type: 'planet',
          x: width * 0.15,
          y: height * 0.2,
          vx: 0.05,
          vy: 0.03,
          rotation: 0,
          vRot: 0.0005,
          size: width > 768 ? 140 : 80, // Very large but faint
          parallaxFactor: 0.04,
          seed: 0.2
        },
        {
          type: 'planet-ring',
          x: width * 0.85,
          y: height * 0.75,
          vx: -0.06,
          vy: -0.04,
          rotation: Math.PI / 6,
          vRot: 0.0003,
          size: width > 768 ? 100 : 60,
          parallaxFactor: 0.06,
          seed: 0.8
        },
        {
          type: 'satellite',
          x: width * 0.5,
          y: height * 0.85,
          vx: 0.08,
          vy: -0.05,
          rotation: -Math.PI / 8,
          vRot: 0.001,
          size: width > 768 ? 24 : 16,
          parallaxFactor: 0.08,
          seed: 0.5
        }
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
      grad.addColorStop(0, 'rgba(255,255,255,0.4)');
      grad.addColorStop(1, 'rgba(15, 45, 96, 0.05)');
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

    let smoothedMouseX = window.innerWidth / 2;
    let smoothedMouseY = window.innerHeight / 2;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (mouse.targetX !== null) {
        smoothedMouseX += (mouse.targetX - smoothedMouseX) * 0.03;
        smoothedMouseY += (mouse.targetY - smoothedMouseY) * 0.03;
      }
      
      const mouseOffsetX = (smoothedMouseX - width / 2);
      const mouseOffsetY = (smoothedMouseY - height / 2);

      // Draw light-theme "Stars"
      for (let s of stars) {
        s.opacity += s.twinkleSpeed;
        if (s.opacity > 0.25 || s.opacity < 0.02) s.twinkleSpeed *= -1;
        
        const px = (s.x - mouseOffsetX * s.parallaxFactor + width) % width;
        const py = (s.y - mouseOffsetY * s.parallaxFactor + height) % height;

        ctx.beginPath();
        ctx.arc(px, py, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(15, 45, 96, ${s.opacity})`;
        ctx.fill();
      }
      
      // Draw Space Objects
      for (let obj of spaceObjects) {
        obj.x += obj.vx;
        obj.y += obj.vy;
        obj.rotation += obj.vRot;

        // Wrap around screen very smoothly with wide padding
        const padding = obj.size * 3;
        if (obj.x < -padding) obj.x = width + padding;
        if (obj.x > width + padding) obj.x = -padding;
        if (obj.y < -padding) obj.y = height + padding;
        if (obj.y > height + padding) obj.y = -padding;

        const px = obj.x - mouseOffsetX * obj.parallaxFactor;
        const py = obj.y - mouseOffsetY * obj.parallaxFactor;

        // Interactive gravity to mouse (very subtle)
        if (mouse.targetX !== null) {
          const dx = px - mouse.targetX;
          const dy = py - mouse.targetY;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 400) {
            obj.vx -= (dx / dist) * 0.0005;
            obj.vy -= (dy / dist) * 0.0005;
            
            // Limit speed to keep it elegant
            const speed = Math.sqrt(obj.vx*obj.vx + obj.vy*obj.vy);
            if(speed > 0.3) {
              obj.vx = (obj.vx / speed) * 0.3;
              obj.vy = (obj.vy / speed) * 0.3;
            }
          }
        }

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(obj.rotation);
        
        // Extremely faint so it acts as an elegant watermark background
        ctx.globalAlpha = 0.15;
        
        if (obj.type === 'planet') drawPlanet(ctx, obj);
        else if (obj.type === 'planet-ring') drawPlanetRing(ctx, obj);
        else if (obj.type === 'satellite') drawSatellite(ctx, obj);

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
