import React from 'react';

// Eagerly bundle all collaborator images via Vite's asset pipeline
const logoModules = import.meta.glob('../../assets/collaborators/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default'
});

const getLogoSrc = (imgName) => {
  const matchingKey = Object.keys(logoModules).find(k => k.endsWith(`/${imgName}`));
  if (matchingKey && logoModules[matchingKey]) {
    return logoModules[matchingKey];
  }
  return `./images/collaborators/${imgName}`;
};

// Using the 29 logos, plus names and official links
const LOGOS = [
  { img: 'mcgill.png', name: 'McGill University', url: 'https://www.mcgill.ca/' },
  { img: 'unimelb.png', name: 'University of Melbourne', url: 'https://www.unimelb.edu.au/' },
  { img: 'ttu.png', name: 'Texas Tech University', url: 'https://www.ttu.edu/' },
  { img: 'curtin.png', name: 'Curtin University', url: 'https://www.curtin.edu.au/' },
  { img: 'manchester.png', name: 'University of Manchester', url: 'https://www.manchester.ac.uk/' },
  { img: 'purdue.png', name: 'Purdue University', url: 'https://www.purdue.edu/' },
  { img: 'mpg.png', name: 'Max Planck Society', url: 'https://www.mpg.de/en' },
  { img: 'uniroma2.png', name: 'Univ. of Rome Tor Vergata', url: 'https://web.uniroma2.it/en' },
  { img: 'persistent.png', name: 'Persistent Systems', url: 'https://www.persistent.com/' },
  { img: 'latmos.png', name: 'LATMOS', url: 'https://www.latmos.ipsl.fr/' },
  { img: 'uchile.png', name: 'University of Chile', url: 'https://uchile.cl/english' },
  { img: 'ukzn.png', name: 'University of KwaZulu-Natal', url: 'https://ukzn.ac.za/' },
  { img: 'sheffield.png', name: 'University of Sheffield', url: 'https://www.sheffield.ac.uk/' },
  { img: 'uni_hamburg.png', name: 'University of Hamburg', url: 'https://www.uni-hamburg.de/en.html' },
  { img: 'open.png', name: 'The Open University', url: 'https://www.open.ac.uk/' },
  { img: 'rug.png', name: 'University of Groningen', url: 'https://www.rug.nl/' },
  { img: 'stockholm.png', name: 'Stockholm University', url: 'https://www.su.se/english/' },
  { img: 'uppsala.png', name: 'Uppsala University', url: 'https://www.uu.se/en' },
  { img: 'sussex.png', name: 'University of Sussex', url: 'https://www.sussex.ac.uk/' },
  { img: 'imperial.png', name: 'Imperial College London', url: 'https://www.imperial.ac.uk/' },
  { img: 'sissa.png', name: 'SISSA', url: 'https://www.sissa.it/' },
  { img: 'sns.png', name: 'Scuola Normale Superiore', url: 'https://www.sns.it/en' },
  { img: 'ictp.png', name: 'ICTP', url: 'https://www.ictp.it/' },
  { img: 'dawn.png', name: 'Cosmic Dawn Center', url: 'https://cosmicdawn.dk/' },
  { img: 'issi.png', name: 'ISSI', url: 'https://www.issibern.ch/' },
  { img: 'dtu.png', name: 'DTU Space', url: 'https://www.space.dtu.dk/english' },
  { img: 'ifpu.png', name: 'IFPU', url: 'https://www.ifpu.it/' },
  { img: 'colorado.png', name: 'University of Colorado', url: 'https://www.colorado.edu/' },
  { img: 'torino.png', name: 'University of Turin', url: 'https://en.unito.it/' }
];

export default function Collaborators() {
  return (
    <div className="collaborators-section">
      <h3 className="collab-marquee-title">Academic &amp; Research Collaborations</h3>
      <div className="collab-marquee-container">
        <div className="collab-marquee-content">
          {/* Duplicate the array to create a seamless loop */}
          {[...LOGOS, ...LOGOS].map((logo, idx) => (
            <a href={logo.url} target="_blank" rel="noopener noreferrer" className="collab-logo-wrapper" key={idx}>
              <div className="collab-img-box">
                <img
                  src={getLogoSrc(logo.img)}
                  alt={logo.name}
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to static folder paths if bundled asset failed
                    if (!e.target.dataset.retried) {
                      e.target.dataset.retried = '1';
                      e.target.src = `images/collaborators/${logo.img}`;
                    } else if (e.target.dataset.retried === '1') {
                      e.target.dataset.retried = '2';
                      e.target.src = `./images/collaborators/${logo.img}`;
                    } else {
                      e.target.style.display = 'none';
                    }
                  }}
                />
              </div>
              <span className="collab-name">{logo.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
