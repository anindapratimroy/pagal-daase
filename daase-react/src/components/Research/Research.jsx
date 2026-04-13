import { RESEARCH_AREAS } from '../../data/fallback';
import Footer from '../Layout/Footer';

export default function Research() {
  return (
    <div>
      <div className="section-inner">
        <div className="section-header">
          <span className="section-eyebrow">✦ Science &amp; Discovery</span>
          <h1 className="section-title">Research <span>Areas</span></h1>
          <p className="section-desc">DAASE covers the full spectrum — from Heliophysics to Cosmology, from Earth observations to black holes.</p>
          <div className="title-bar" />
        </div>

        <div style={{ marginBottom: '60px', borderRadius: 'var(--r)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', width: '100%', aspectRatio: '16/9' }}>
          <iframe 
            src="https://www.youtube.com/embed/biwLe51Rq44?autoplay=1&mute=1&loop=1&playlist=biwLe51Rq44&controls=1&showinfo=0&modestbranding=1" 
            title="DAASE Research Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 'none' }}
          ></iframe>
        </div>

        <div className="research-grid">
          {RESEARCH_AREAS.map((r, i) => (
            <div
              key={i}
              className="rc anim-fadeup"
              style={{ animationDelay: `${0.06 + i * 0.05}s` }}
            >
              <div style={{ height: '180px', overflow: 'hidden', borderRadius: 'var(--r-sm) var(--r-sm) 0 0', margin: '-24px -24px 20px -24px' }}>
                <img 
                  src={`images/research/img_${(i % 17) + 1}.jpg`} 
                  alt={r.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}
                />
                <div className="rc-icon" style={{ display: 'none', height: '100%', alignItems: 'center', justifyContent: 'center', fontSize: '40px', background: 'var(--navy-light)' }}>
                  {r.icon}
                </div>
              </div>
              <h3 className="rc-title">{r.title}</h3>
              <p className="rc-desc">{r.desc}</p>
              {r.url && (
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="rc-link">
                  Learn More ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
