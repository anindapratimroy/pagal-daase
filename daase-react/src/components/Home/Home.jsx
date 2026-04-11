import CounterStat from './CounterStat';
import Footer from '../Layout/Footer';

export default function Home({ onNav }) {
  return (
    <div>
      {/* Top strip */}
      <div className="hero-top-strip">
        Department of Astronomy, Astrophysics &amp; Space Engineering &nbsp;·&nbsp;{' '}
        <span><a href="https://www.iiti.ac.in" target="_blank" rel="noopener noreferrer">Indian Institute of Technology Indore</a></span>
        &nbsp;·&nbsp; Est. 2015 &nbsp;·&nbsp;{' '}
        <a href="https://dst.gov.in/scientific-programmes/scientific-engineering-research/fist" target="_blank" rel="noopener noreferrer">DST-FIST Funded</a>
      </div>

      {/* Hero main */}
      <div className="hero-main">
        <div className="hero-left">
          <div className="hero-tag">✦ &nbsp;Est. 2015 &nbsp;·&nbsp; IIT Indore</div>
          <h1 className="hero-title">
            Department of<br />
            <span className="accent">Astronomy, Astrophysics</span><br />
            &amp; Space Engineering
          </h1>
          <p className="hero-subtitle">IIT Indore &nbsp;·&nbsp; DAASE</p>
          <p className="hero-tagline">"Exploring the Universe, Engineering the Future"</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => onNav('research')}>
              Explore Research <span className="arrow">→</span>
            </button>
            <button className="btn-outline" onClick={() => onNav('programs')}>
              View Programs <span className="arrow">→</span>
            </button>
          </div>
          <div className="scroll-hint">Scroll to explore</div>
        </div>

        <div className="hero-right">
          <div className="hero-stats-grid">
            <CounterStat target={7}   label="Research Areas"    delay="0.06s" />
            <CounterStat target={5}   label="Degree Programs"   delay="0.12s" />
            <CounterStat target={13}  label="Faculty Members"   delay="0.18s" />
            <CounterStat target={100} label="+ Alumni"          delay="0.23s" />
          </div>
          <div className="hero-quick-links">
            <div className="hero-quick-link" onClick={() => onNav('faculty')}>Faculty Directory <span className="arrow">→</span></div>
            <div className="hero-quick-link" onClick={() => onNav('students')}>Current Students <span className="arrow">→</span></div>
            <a href="https://academic.iiti.ac.in/phdadvt.php" target="_blank" rel="noopener noreferrer" className="hero-quick-link">
              PhD Admissions <span className="arrow">↗</span>
            </a>
            <div className="hero-quick-link" onClick={() => onNav('events')}>Events &amp; Workshops <span className="arrow">→</span></div>
          </div>
        </div>
      </div>

      {/* About navy strip */}
      <div className="about-strip">
        <div className="about-strip-inner">
          <div className="anim-right">
            <h2>About <span>DAASE</span></h2>
            <p>The Department of Astronomy, Astrophysics and Space Engineering (DAASE) at IIT Indore is the <strong>only dedicated department of its kind among all IITs</strong>, offering a comprehensive academic ecosystem spanning the cosmos to cutting-edge space engineering.</p>
            <p>A founding member of the <strong>Square Kilometre Array – India Consortium (SKA-IC)</strong> since 2015, DAASE plays a significant role in global astronomical collaboration, with faculty contributing to major ISRO and NASA missions.</p>
            <div className="about-highlights-grid" style={{ marginTop: 24 }}>
              <a href="https://dst.gov.in/scientific-programmes/scientific-engineering-research/fist" target="_blank" rel="noopener noreferrer" className="about-hl">
                <div className="about-hl-icon">🏆</div>
                <div className="about-hl-title">DST-FIST Funded ↗</div>
                <div className="about-hl-desc">Received DST-FIST funding in 2022 for research excellence</div>
              </a>
              <a href="https://skaindia.ncra.tifr.res.in" target="_blank" rel="noopener noreferrer" className="about-hl">
                <div className="about-hl-icon">📡</div>
                <div className="about-hl-title">SKA-IC Member ↗</div>
                <div className="about-hl-desc">Founding member since 2015 — global radio telescope consortium</div>
              </a>
              <a href="https://www.ncpor.res.in/arctica/index_page-175.html" target="_blank" rel="noopener noreferrer" className="about-hl">
                <div className="about-hl-icon">🧊</div>
                <div className="about-hl-title">Arctic Research ↗</div>
                <div className="about-hl-desc">Atmospheric science at Indian Research Station Himadri since 2022</div>
              </a>
              <a href="https://www.isro.gov.in" target="_blank" rel="noopener noreferrer" className="about-hl">
                <div className="about-hl-icon">🚀</div>
                <div className="about-hl-title">ISRO &amp; NASA ↗</div>
                <div className="about-hl-desc">Active faculty contributions to major space missions</div>
              </a>
            </div>
          </div>

          <div className="timeline anim-left">
            {[
              { year: 'December 2015', text: 'Founded as Centre for Astronomy', sub: 'Ph.D. program launched · Founding SKA-IC member' },
              { year: 'May 2018', text: 'Upgraded to Full Department', sub: 'M.Sc. Astronomy launched — first & only in IITs' },
              { year: '2021', text: 'Space Engineering Programs', sub: 'M.Tech. Space Engineering · M.S. (Research) launched' },
              { year: '2022', text: 'B.Tech. in Space Science & Engineering', sub: 'First B.Tech. of its kind in IIT system · DST-FIST · Arctic research' },
              { year: 'Present', text: '100+ Alumni · World-Class Labs', sub: 'Alumni at prestigious institutes & industries globally' },
            ].map((t, i) => (
              <div className="tl-item" key={i}>
                <div className="tl-year">{t.year}</div>
                <div className="tl-text">{t.text}</div>
                <div className="tl-sub">{t.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
