import { useState } from 'react';
import Footer from '../Layout/Footer';

const GALLERY_ITEMS = [
  { src: './images/gallery/img_4.jpg', label: 'SKA Summer Training 2025' },
  { src: './images/gallery/img_2.jpg', label: 'RETCO-VI Conference 2025' },
  { src: './images/gallery/img_3.jpg', label: 'Department Group Photo' },
  { src: './images/gallery/Academic_Event.jpg', label: 'Academic Event' },
  { src: './images/gallery/img_5.jpg', label: 'DAASE Team Outdoors' },
];

const DELAY = ['d1','d2','d3','d4','d5','d6','d7','d8'];

function GalleryItem({ item, i, onOpen }) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  return (
    <div
      className={`gallery-item anim-fadeup ${DELAY[i % DELAY.length]}`}
      onClick={() => onOpen(item.src, item.label)}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={item.src}
        alt={item.label}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        onError={() => setHidden(true)}
      />
    </div>
  );
}

export default function Gallery() {
  const [modalSrc, setModalSrc] = useState(null);
  const [modalLabel, setModalLabel] = useState('');

  return (
    <div style={{ background: 'transparent' }}>
      <div className="section-inner">
        <div className="section-header">
          <span className="section-eyebrow">✦ Life at DAASE</span>
          <h1 className="section-title">Photo <span>Gallery</span></h1>
          <p className="section-desc">Glimpses of research, events, outreach, and life at DAASE, IIT Indore.</p>
          <div className="title-bar" />
        </div>

        <div className="gallery-grid">
          {GALLERY_ITEMS.map((item, i) => (
            <GalleryItem key={i} item={item} i={i} onOpen={(src, lbl) => { setModalSrc(src); setModalLabel(lbl); }} />
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      {modalSrc && (
        <div className="student-modal-overlay" onClick={() => setModalSrc(null)}>
          <div className="student-modal-content" onClick={e => e.stopPropagation()}>
            <div className="close-hint">Click outside to close</div>
            <img src={modalSrc} alt={modalLabel} style={{ borderRadius: 'var(--r)', maxHeight: '85vh', maxWidth: '90vw', objectFit: 'contain' }} />
            {modalLabel && (
              <div style={{ color: '#fff', marginTop: '12px', fontSize: '15px', fontWeight: 600 }}>{modalLabel}</div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
