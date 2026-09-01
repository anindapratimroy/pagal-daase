import React, { useRef, useEffect } from 'react';

export default function TiltCard({ children, className = '', style = {}, ...props }) {
  const cardRef = useRef(null);
  const innerRef = useRef(null);
  const glareRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMouseMove = (e) => {
    // Only run tilt on devices with hover/pointer support
    if (window.matchMedia && !window.matchMedia('(hover: hover)').matches) return;
    if (!cardRef.current || !innerRef.current) return;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    frameRef.current = requestAnimationFrame(() => {
      if (!cardRef.current || !innerRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle, buttery 3D tilt (max ±2.5deg)
      const rotateX = -((y - centerY) / centerY) * 2.5;
      const rotateY = ((x - centerX) / centerX) * 2.5;

      innerRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -4px, 0)`;

      if (glareRef.current) {
        const glareX = ((x / rect.width) * 100).toFixed(1);
        const glareY = ((y / rect.height) * 100).toFixed(1);
        glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0) 65%)`;
        glareRef.current.style.opacity = '1';
      }
    });
  };

  const handleMouseEnter = () => {
    if (!innerRef.current) return;
    innerRef.current.style.transition = 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
  };

  const handleMouseLeave = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (innerRef.current) {
      innerRef.current.style.transition = 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
      innerRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      className="tilt-card-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        position: 'relative',
      }}
      {...props}
    >
      <div
        ref={innerRef}
        className={`tilt-card-inner ${className}`}
        style={{
          height: '100%',
          width: '100%',
          willChange: 'transform',
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transition: 'transform 0.5s cubic-bezier(0.2, 0.9, 0.2, 1), box-shadow 0.5s cubic-bezier(0.2, 0.9, 0.2, 1)',
          position: 'relative',
        }}
      >
        {children}
        {/* Soft specular sheen */}
        <div
          ref={glareRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            borderRadius: 'inherit',
            zIndex: 3,
          }}
        />
      </div>
    </div>
  );
}
