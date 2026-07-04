import { useState, useEffect } from 'react';
import Footer from '../Layout/Footer';

// Mapping facility names to downloaded images (fac_1 to fac_12 available)
const FAC_IMAGE_MAP = {
  'IITI Radio Interferometer Observatory': '/images/facilities/fac_1.jpg',
  'Radio Frequency Lab (up to 60 GHz)': '/images/facilities/fac_3.jpg',
  'Optics Lab': '/images/facilities/fac_4.jpg',
  'IoT Lab': '/images/facilities/fac_5.jpg',
  'Remote Sensing Lab': '/images/facilities/fac_6.jpg',
  'Plasma Lab': '/images/facilities/fac_7.jpg',
  'VR-Based Data Observatory': 'images/facilities/fac_8.jpg',
  'Electronics Device & Circuit Lab': 'images/facilities/fac_9.jpg',
  'Drone Fleet': 'images/facilities/fac_10.jpg',
  'Hyperspectral Imaging System': 'images/facilities/fac_11.jpg',
  'Microwave Optics System': 'images/facilities/fac_12.jpg',
  'Helmholtz Cage': 'images/facilities/fac_2.jpg',
};

export default function Facilities({ facilities }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div>
      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              style={{
                position: 'absolute', top: '-40px', right: '-40px',
                background: 'transparent', border: 'none', color: '#fff',
                fontSize: '32px', cursor: 'pointer', padding: '8px',
              }}
            >
              &times;
            </button>
            <img 
              src={selectedImage} 
              alt="Facility" 
              style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', borderRadius: '4px', cursor: 'default' }}
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        </div>
      )}

      <div className="section-inner">
        <div className="section-header">
          <span className="section-eyebrow">✦ Infrastructure</span>
          <h1 className="section-title">Research <span>Facilities</span></h1>
          <p className="section-desc">State-of-the-art laboratories enabling cutting-edge research, including a facility at the Indian Arctic Research Station Himadri.</p>
          <div className="title-bar" />
        </div>
        <div className="facilities-grid">
          {facilities.map((f, i) => {
            const imgSrc = f.image || FAC_IMAGE_MAP[f.name];
            return (
              <div className="facility-card anim-fadeup" key={i} style={{ animationDelay: `${0.04 + i * 0.03}s`, padding: 0, overflow: 'hidden' }}>
                {imgSrc && (
                  <div style={{ width: '100%', height: '140px', overflow: 'hidden' }}>
                    <img
                      src={imgSrc}
                      alt={f.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease', cursor: 'pointer' }}
                      onError={e => { e.target.style.display = 'none'; e.target.parentElement.style.display = 'none'; }}
                      onMouseOver={e => { e.target.style.transform = 'scale(1.05)'; }}
                      onMouseOut={e => { e.target.style.transform = 'scale(1)'; }}
                      onClick={() => setSelectedImage(imgSrc)}
                    />
                  </div>
                )}
                <div style={{ padding: '14px 16px', textAlign: 'center' }}>
                  {!imgSrc && <div className="fac-icon">{f.icon}</div>}
                  <div className="fac-name">{f.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
