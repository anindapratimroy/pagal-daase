import React from 'react';

export default function TiltCard({ children, className = '', style = {}, ...props }) {
  return (
    <div
      className={`tilt-card-wrapper ${className}`}
      style={{
        height: '100%',
        width: '100%',
        position: 'relative',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
