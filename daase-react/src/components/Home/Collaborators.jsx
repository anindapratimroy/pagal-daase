import React from 'react';

// Using the 16 successfully downloaded logos
const LOGOS = [
  'mcgill.png',
  'unimelb.png',
  'ttu.png',
  'curtin.png',
  'manchester.png',
  'purdue.png',
  'mpg.png',
  'uniroma2.png',
  'persistent.png',
  'latmos.png',
  'uchile.png',
  'ukzn.png',
  'sheffield.png',
  'uni-hamburg.png',
  'open.png',
  'rug.png',
  'stockholm.png',
  'uppsala.png',
  'sussex.png',
  'imperial.png',
  'sissa.png',
  'sns.png',
  'ictp.png',
  'dawn.png',
  'issi.png',
  'dtu.png',
  'ifpu.png',
  'colorado.png',
  'torino.png'
];

export default function Collaborators() {
  return (
    <div className="collaborators-section">
      <h3 className="collab-marquee-title">Collaborations &amp; Placements</h3>
      <div className="collab-marquee-container">
        <div className="collab-marquee-content">
          {/* Duplicate the array to create a seamless loop */}
          {[...LOGOS, ...LOGOS].map((logo, idx) => (
            <div className="collab-logo-wrapper" key={idx}>
              <img src={`images/collaborators/${logo}`} alt="Collaborator Logo" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
