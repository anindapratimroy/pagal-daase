import Footer from '../Layout/Footer';

export default function Placements() {
  const images = Array.from({ length: 6 }, (_, i) => `images/placements/img_${i + 1}.jpg`);

  return (
    <div style={{ background: 'transparent' }}>
      <div className="section-inner">
        <div className="section-header">
          <span className="section-eyebrow">✦ Career & Outcomes</span>
          <h1 className="section-title">Student <span>Placements</span></h1>
          <p className="section-desc">Our graduates go on to work at top research institutions, tech companies, and space agencies worldwide.</p>
          <div className="title-bar" />
        </div>

        {/* <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '40px' }}>
          {images.map((src, i) => (
            <div key={i} className={`anim-fadeup d${(i % 8) + 1}`} style={{ borderRadius: 'var(--r)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <img 
                src={src} 
                alt={`Placement Profile ${i + 1}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.style.display='none'; e.target.parentElement.style.display='none'; }}
              />
            </div>
          ))}
        </div> */}
        <h1 style={{ color: "white" }}>Placements will be coming soon , we don't know when this happens 🙃</h1>
      </div>
      <Footer />
    </div>
  );
}
