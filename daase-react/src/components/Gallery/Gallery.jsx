import Footer from '../Layout/Footer';

const GALLERY_ITEMS = [
  { cls: 'tall', icon: '🔭', label: 'Observatory & Instruments' },
  { cls: '',     icon: '🎓', label: 'Convocation 2024' },
  { cls: '',     icon: '📡', label: 'IITI Radio Interferometer' },
  { cls: 'wide', icon: '🌌', label: 'RETCO-VI Conference 2025' },
  { cls: '',     icon: '🚁', label: 'Drone Lab' },
  { cls: '',     icon: '🧊', label: 'Arctic Research — Himadri' },
  { cls: '',     icon: '🎉', label: 'SKA Summer Training 2025' },
  { cls: 'tall', icon: '💫', label: 'Stargazing Outreach' },
];

const DELAY = ['d1','d2','d3','d4','d5','d6','d7','d8'];

export default function Gallery() {
  return (
    <div style={{ background: 'var(--bg)' }}>
      <div className="section-inner">
        <div className="section-header">
          <span className="section-eyebrow">✦ Life at DAASE</span>
          <h2 className="section-title">Photo <span>Gallery</span></h2>
          <p className="section-desc">Glimpses of research, events, outreach, and life at DAASE, IIT Indore.</p>
          <div className="title-bar" />
        </div>

        <div className="gallery-grid">
          {GALLERY_ITEMS.map((item, i) => (
            <div key={i} className={`gallery-item${item.cls ? ' ' + item.cls : ''} anim-fadeup ${DELAY[i]}`}>
              <div className="gallery-placeholder">
                <span>{item.icon}</span>
                <p>{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
