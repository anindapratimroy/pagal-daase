import React from 'react';
import { RESEARCH_AREAS } from '../../data/fallback';
import Publications from './Publications';
import Footer from '../Layout/Footer';
import TiltCard from '../Layout/TiltCard';

export default function Research({ onNav }) {
  return (
    <div className="research-page fade-in">
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '48px 40px 32px 40px' }}>
        <div className="section-header center" data-aos="fade-up">
          <span className="section-eyebrow">✦ Science &amp; Discovery</span>
          <h1 className="section-title">Research <span>Areas</span></h1>
          <p className="section-desc">DAASE covers the full spectrum — from Heliophysics to Cosmology, from Earth observations to black holes.</p>
          <div className="title-bar" />
        </div>

        {/* Video — autoplays muted immediately, sits right below the title */}
        <div data-aos="fade-up" data-aos-delay="100" style={{
          position: 'relative',
          width: '100%',
          maxWidth: '880px',
          margin: '36px auto 0 auto',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
          background: '#000',
          aspectRatio: '16 / 9',
          minHeight: '220px',
        }}>
          <iframe
            src="https://www.youtube-nocookie.com/embed/biwLe51Rq44?autoplay=1&mute=1&playsinline=1&loop=1&playlist=biwLe51Rq44&controls=1&modestbranding=1&rel=0"
            title="DAASE Research Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', display: 'block', borderRadius: '16px' }}
          />
        </div>
      </div>

      {/* Publications Scroller — below the video */}
      <Publications />

      {/* Research Area Cards */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 40px 56px 40px' }}>
        <div className="research-grid">
          {RESEARCH_AREAS.map((r, i) => (
            <div data-aos="fade-up" data-aos-delay={i * 50} key={i}>
            <TiltCard
              className="rc"
              style={{ height: '100%', cursor: r.id ? 'pointer' : 'default' }}
              onClick={() => { if (r.id) onNav('research-detail', r.id); }}
            >
              <div style={{ height: '180px', overflow: 'hidden', borderRadius: 'var(--r-sm) var(--r-sm) 0 0', margin: '-24px -24px 20px -24px' }}>
                <img
                  src={r.image}
                  alt={r.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                />
                <div className="rc-icon" style={{ display: 'none', height: '100%', alignItems: 'center', justifyContent: 'center', fontSize: '40px', background: 'var(--navy-light)' }}>
                  {r.icon}
                </div>
              </div>
              <h3 className="rc-title">{r.title}</h3>
              <p className="rc-desc" style={{ flexGrow: 1 }}>{r.desc}</p>
              {r.id && (
                <div
                  className="rc-link btn-link"
                  style={{ background: 'transparent', border: 'none', padding: 0, marginTop: 'auto' }}
                >
                  Learn More ↗
                </div>
              )}
            </TiltCard>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
