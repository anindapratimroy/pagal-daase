import Footer from '../Layout/Footer';

export default function Facilities({ facilities }) {
  return (
    <div>
      <div className="section-inner">
        <div className="section-header">
          <span className="section-eyebrow">✦ Infrastructure</span>
          <h2 className="section-title">Research <span>Facilities</span></h2>
          <p className="section-desc">State-of-the-art laboratories enabling cutting-edge research, including a facility at the Indian Arctic Research Station Himadri.</p>
          <div className="title-bar" />
        </div>
        <div className="facilities-grid">
          {facilities.map((f, i) => (
            <div className="facility-card anim-fadeup" key={i} style={{ animationDelay: `${0.04 + i * 0.03}s` }}>
              <div className="fac-icon">{f.icon}</div>
              <div className="fac-name">{f.name}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
