import { RESEARCH_AREAS } from '../../data/fallback';
import Footer from '../Layout/Footer';

export default function Research() {
  return (
    <div>
      <div className="section-inner">
        <div className="section-header">
          <span className="section-eyebrow">✦ Science &amp; Discovery</span>
          <h2 className="section-title">Research <span>Areas</span></h2>
          <p className="section-desc">DAASE covers the full spectrum — from Heliophysics to Cosmology, from Earth observations to black holes.</p>
          <div className="title-bar" />
        </div>

        <div className="research-grid">
          {RESEARCH_AREAS.map((r, i) => (
            <div
              key={i}
              className="rc anim-fadeup"
              style={{ animationDelay: `${0.06 + i * 0.05}s` }}
            >
              <div className="rc-icon">{r.icon}</div>
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
