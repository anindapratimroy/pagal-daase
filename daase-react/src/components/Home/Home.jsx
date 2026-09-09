import { useMemo, useState, useEffect } from 'react';
import CounterStat from './CounterStat';
import Footer from '../Layout/Footer';
import NewsTicker from './NewsTicker';
import Collaborators from './Collaborators';
import { PUBLICATIONS_FB } from '../../data/fallback';
import { sortHomeUpdates, sortPublications } from '../../utils/dateUtils';

// Ensure link has protocol prefix for external, but respect internal links
function normalizeLink(link) {
  if (!link) return null;
  if (typeof link !== 'string') return null;
  const trimmed = link.trim();
  if (!trimmed) return null;
  
  // Internal or relative links (e.g. /events, #section, ?query)
  if (trimmed.startsWith('/') || trimmed.startsWith('#') || trimmed.startsWith('?')) {
    return trimmed;
  }
  
  // Known URLs missing protocol
  if (trimmed.startsWith('www.') || trimmed.includes('.ac.in') || trimmed.includes('.edu') || trimmed.includes('.org') || trimmed.includes('.com') || trimmed.includes('.in/')) {
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      return 'https://' + trimmed;
    }
  }
  
  // Already has protocol or is a generic external
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  
  // Fallback for everything else, treat as relative/internal
  return trimmed;
}

function isExternal(link) {
  if (!link) return false;
  return link.startsWith('http://') || link.startsWith('https://') || link.startsWith('www.');
}

function getPubText(pub) {
  if (typeof pub === 'string') return pub;
  return pub.text || pub.title || pub.citation || '';
}

function getPubUrl(pub) {
  if (typeof pub === 'string') {
    const m = pub.match(/(https?:\/\/[^\s]+)/);
    return m ? m[1] : null;
  }
  return pub.url || pub.doi || pub.link || null;
}

export default function Home({ onNav, news, events, publications = [] }) {
  const combinedUpdates = useMemo(() => {
    return sortHomeUpdates(news, events).slice(0, 10);
  }, [news, events]);

  const rawPubs = (publications && publications.length > 0) ? publications : PUBLICATIONS_FB;
  const pubsList = useMemo(() => {
    return sortPublications(rawPubs).slice(0, 10);
  }, [rawPubs]);

  return (
    <div>
      {/* Hero main */}
      <div className="hero-main">
        <div className="hero-left" data-aos="fade-right">
          <div className="hero-tag">✦ &nbsp;Est. 2015 &nbsp;·&nbsp; IIT Indore</div>
          <h1 className="hero-title">
            Department of<br />
            <span className="accent">Astronomy, Astrophysics<br />&amp; Space Engineering</span>
          </h1>
          <p className="hero-tagline">
            "<a href="https://aase.iiti.ac.in/solarverse/" className="solarverse-link" target="_blank" rel="noopener noreferrer" title="Visit the Solar System">
              <span className="solarverse-default">Exploring the Universe</span>
              <span className="solarverse-hover">Visit the Solar System</span>
            </a>, Engineering the Future"
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => onNav('research')}>
              Explore Research <span className="arrow">→</span>
            </button>
            <button className="btn-outline" onClick={() => onNav('programs')}>
              View Programs <span className="arrow">→</span>
            </button>
          </div>

          <div className="hero-stats-grid" style={{ marginTop: '32px' }}>
            <CounterStat target={45} suffix="+" label="No of Projects" delay="0.04s" />
            <CounterStat target={100} suffix="%" label="Placement Percentage" delay="0.08s" />
            <CounterStat target={15} prefix="₹" suffix=" Cr+" label="Project Grants" delay="0.12s" />
            <CounterStat target={250} suffix="+" label="Publications" delay="0.16s" />
            <CounterStat target={13} label="Faculty Members" delay="0.20s" />
            <CounterStat target={100} suffix="+" label="+ Alumni" delay="0.24s" />
          </div>


        </div>

        <div className="hero-right" data-aos="fade-left">
          {/* 1. Recent Updates */}
          <div className="news-feed-container anim-fadein" style={{ animationDelay: '0.2s' }}>
            <h2 className="news-feed-title">Recent <span>Updates</span></h2>

            <div className="vertical-marquee-container">
              <div className="vertical-marquee-content">
                {combinedUpdates.length > 0 ? (() => {
                  const copiesNeeded = Math.max(2, Math.ceil(12 / combinedUpdates.length) * 2);
                  const displayUpdates = [];
                  for (let i = 0; i < copiesNeeded; i++) displayUpdates.push(...combinedUpdates);
                  return displayUpdates;
                })().map((item, index) => {
                  const rawLink = item.link || item.url || '';
                  const ItemWrapper = rawLink ? 'a' : 'div';
                  const isExt = isExternal(rawLink);
                  const props = rawLink ? {
                    href: rawLink,
                    target: isExt ? '_blank' : '_self',
                    rel: isExt ? 'noopener noreferrer' : undefined,
                    style: { textDecoration: 'none', color: 'inherit' }
                  } : {};

                  return (
                    <ItemWrapper key={index} className="news-feed-item" {...props}>
                      <div className="news-feed-meta">
                        {item.type === 'event' && <span className="type-badge event">Event</span>}
                        {item.type === 'news' && <span className="type-badge news">News</span>}
                        <span className="news-feed-date">{item.date}</span>
                      </div>
                      <div className="news-feed-headline">
                        {item.title || item.text} {rawLink && <span className="arrow">↗</span>}
                      </div>
                    </ItemWrapper>
                  );
                }) : (
                  <div className="news-feed-empty">No updates to show right now.</div>
                )}

              </div>
            </div>
          </div>

          {/* 2. Recent Publications */}
          <div className="home-pub-container anim-fadein" style={{ animationDelay: '0.32s' }}>
            <div className="home-pub-header">
              <h2 className="news-feed-title" style={{ margin: 0 }}>Recent <span>Publications</span></h2>
              <button
                className="home-pub-view-all"
                onClick={() => onNav('research')}
                title="View research areas"
              >
                Explore Areas ↗
              </button>
            </div>

            <div className="home-pub-marquee-container">
              <div className="home-pub-marquee-content">
                {(pubsList.length > 0 ? (() => {
                  const copiesNeeded = Math.max(2, Math.ceil(8 / pubsList.length) * 2);
                  const displayPubs = [];
                  for (let i = 0; i < copiesNeeded; i++) displayPubs.push(...pubsList);
                  return displayPubs;
                })() : []).map((pub, idx) => {
                  const text = getPubText(pub);
                  const url = getPubUrl(pub);
                  const displayText = text.replace(/(https?:\/\/[^\s]+)/g, '').trim();
                  const realNum = (idx % pubsList.length) + 1;

                  const ItemTag = url ? 'a' : 'div';
                  const props = url ? {
                    href: url,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    title: 'Open paper'
                  } : {};

                  return (
                    <ItemTag key={idx} className={`home-pub-item${url ? ' is-linked' : ''}`} {...props}>
                      <span className="home-pub-num">{realNum.toString().padStart(2, '0')}.</span>
                      <div className="home-pub-body">
                        <span className="home-pub-text">{displayText || text}</span>
                        {url && <span className="home-pub-arrow">↗</span>}
                      </div>
                    </ItemTag>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Collaborations & Placements — Full Width Across Screen */}
      <Collaborators />

      {/* ── About DAASE + Message from the Head ── */}
      <div className="hod-about-section" data-aos="fade-up">
        <div className="hod-about-left">
          <div>
            <span className="about-eyebrow">✦ &nbsp;Established 2015 &nbsp;·&nbsp; IIT Indore</span>
            <h2 className="hod-about-heading">
              About <span>DAASE</span>
            </h2>
            <div style={{ marginTop: '20px' }}>
              <p className="hod-about-body" style={{ marginBottom: '16px' }}>
                The Department of Astronomy, Astrophysics and Space Engineering (DAASE) at IIT Indore commenced its journey in December 2015 as the Centre for Astronomy with the initiation of a Ph.D. program in Astronomy. In May 2018, the Centre transitioned into a full-fledged department by introducing its flagship M.Sc. program in Astronomy, making DAASE the first and only IIT department to offer an M.Sc. in this field. In 2021, DAASE expanded its academic offerings with the M.Tech. in Space Engineering and the M.S. (Research) in Space Science and Engineering. In 2022, the department further broadened its educational scope by launching the flagship B.Tech. program in Space Science and Engineering, a pioneering initiative within the IIT system. DAASE also offers a Minor in Astronomy and Space Science for undergraduate students at IIT Indore and received DST-FIST funding in 2022 in recognition of its research excellence.
              </p>
              <p className="hod-about-body" style={{ marginBottom: '16px' }}>
                DAASE’s teaching and research activities concentrate on four core domains: Astronomy &amp; Astrophysics, Space Science and Instrumentation, Remote Sensing and Atmospheric Physics, and Data Science and Data-Driven Techniques. Our bachelor’s and master’s curricula integrate these domains, providing students with rigorous theoretical knowledge and hands-on experience to promote both academic achievement and innovation.
              </p>
              <p className="hod-about-body" style={{ marginBottom: '16px' }}>
                Faculty members pursue research across a broad spectrum —from Earth observations to black holes and neutron stars; from galaxies and interstellar medium to solar physics; from drone and cubesat technologies to radio astronomical instrumentation; from early universe and observational cosmology to atmospheric and ionospheric modeling; and from computational and high-energy astrophysics to climate modelling. Advanced numerical modelling and statistical inference unite these diverse research areas and drive scientific innovation.
              </p>
              <p className="hod-about-body" style={{ marginBottom: '0' }}>
                DAASE supports research and learning with state-of-the-art cutting-edge facilities for experimental and applied research. Since 2022, the department has participated in the Indian research contingent to the Arctic, maintaining advanced facilities at the Indian Research Station Himadri for atmospheric and space science investigations. National and international agencies, including MoE, UGC, ANRF/SERB, DST, MoES, CSIR, SPARC, DAE, ISRO, Max Planck Partner Group, and ASEM-DUO, provide critical support for our pursuit of research excellence that advances both science and society. DAASE faculty and students also represent the department as core members of various professional organizations, including GRSS-IEEE, APS-IEEE, ASI, and IAU as well as involved in outreach activities targeting the school and college students.
              </p>
            </div>
          </div>
        </div>

        <div className="hod-about-right">
          <div className="hod-message-card">
            <div className="hod-message-header">
              <div className="hod-message-profile">
                <div className="hod-message-avatar">
                  <img
                    src="people_images/Faculty/Dr._Saurabh_Das.jpg"
                    alt="Dr. Saurabh Das"
                    className="hod-message-avatar-img"
                    onError={e => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = 'inline'; }}
                  />
                  <span style={{ display: 'none' }}>👨‍🔬</span>
                </div>
                <div className="hod-message-meta">
                  <div className="hod-message-name">Dr. Saurabh Das</div>
                  <div className="hod-message-role">Head of Department</div>
                </div>
              </div>
              <div className="hod-message-badge">Welcome Address</div>
            </div>
            <div className="hod-message-divider" style={{ margin: '14px 0' }} />

            <div className="hod-message-scroll-area">
              <div className="hod-message-body">
                <p>
                  Welcome to the Department of Astronomy, Astrophysics and Space Engineering (DAASE) at IIT Indore.
                </p>
                <p>
                  We are a young and dynamic department, uniquely positioned within the IIT system, with a distinctive vision to advance our understanding of the universe while contributing to the technologies that will shape the future of space exploration. Our faculty, students, researchers, and collaborators share a deep curiosity about the cosmos and a collective commitment to scientific excellence, innovation, and interdisciplinary research.
                </p>
                <p>
                  Since 2015, DAASE has been a founding member of the Square Kilometre Array – India Consortium (SKA-IC), contributing to one of the world’s most ambitious international astronomical initiatives. Our faculty and researchers are actively involved in major ISRO and NASA missions and collaborate with leading universities and research institutions across the globe. These engagements provide our students and researchers with opportunities to participate in cutting-edge science and technology at both national and international levels.
                </p>
                <p>
                  As the only dedicated department of its kind among the IITs, DAASE offers a specialized academic and research ecosystem spanning astronomy, astrophysics, remote sensing, space sciences, and space engineering. Through our undergraduate and postgraduate programs, we strive to nurture the next generation of scientists, engineers, and innovators equipped to address some of the most challenging questions facing humanity.
                </p>
                <p>
                  Our commitment extends beyond research and education. Through outreach and engagement initiatives, we seek to communicate the excitement of science and inspire young minds to explore careers in astronomy, astrophysics, and space science and technology.
                </p>
                <p>
                  At DAASE, we are committed to fostering an environment where <strong>curiosity drives discovery</strong>, <strong>collaboration enables innovation</strong>, and <strong>excellence creates impact</strong>. As India advances toward becoming a leading global space economy, we aspire to contribute meaningfully to this national vision through world-class research, education, and technological innovation.
                </p>
                <p>
                  We warmly invite you to explore our department, engage with our academic community, and join us in our journey of discovering the universe and engineering the future of space exploration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4 Highlight badges (Moved just after About DAASE) ── */}
      <div className="about-badges-row" data-aos="fade-up" data-aos-offset="50">
        <a href="http://www.fist-dst.org" target="_blank" rel="noopener noreferrer" className="about-badge">
          <span className="about-badge-icon">🏆</span>
          <span className="about-badge-label">DST-FIST Funded</span>
          <span className="about-badge-desc">Research excellence grant · 2022</span>
        </a>
        <a href="https://skaindia.ncra.tifr.res.in" target="_blank" rel="noopener noreferrer" className="about-badge">
          <span className="about-badge-icon">📡</span>
          <span className="about-badge-label">SKA-IC Founding Member</span>
          <span className="about-badge-desc">Global radio telescope consortium · Since 2015</span>
        </a>
        <a href="https://www.ncpor.res.in/arctica/index_page-175.html" target="_blank" rel="noopener noreferrer" className="about-badge">
          <span className="about-badge-icon">🧊</span>
          <span className="about-badge-label">Arctic Research</span>
          <span className="about-badge-desc">Station Himadri · Atmospheric science · Since 2022</span>
        </a>
        <a href="https://www.isro.gov.in" target="_blank" rel="noopener noreferrer" className="about-badge">
          <span className="about-badge-icon">🚀</span>
          <span className="about-badge-label">Space Research</span>
          <span className="about-badge-desc">Active Collaboration with NASA, ISRO and JAXA</span>
        </a>
      </div>

      {/* About — Full redesign */}
      <div className="about-strip">

        {/* ── 3-column info cards ── */}
        <div className="about-info-grid">
          <div className="about-info-card" data-aos="fade-up" data-aos-delay="100">
            <h3 className="about-info-card-title">
              <span className="about-info-card-icon">🎓</span> Academic Programs
            </h3>
            <ul className="about-info-list">
              <li className="is-interactive" onClick={() => onNav('programs', 'phd')} title="View Ph.D. Program">
                Ph.D. in Astronomy, Astrophysics &amp; Space Engineering <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('programs', 'msc')} title="View M.Sc. Program">
                M.Sc. in Astronomy <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('programs', 'mtech')} title="View M.Tech. Program">
                M.Tech. in Space Engineering <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('programs', 'ms')} title="View M.S. (Research) Program">
                M.S. (Research) in Space Engineering (SSE) <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('programs', 'btech')} title="View B.Tech. Program">
                B.Tech. in Space Science &amp; Engineering <span className="arrow">↗</span>
              </li>
            </ul>
          </div>

          <div className="about-info-card" data-aos="fade-up" data-aos-delay="200">
            <h3 className="about-info-card-title">
              <span className="about-info-card-icon">🔭</span> Research Areas
            </h3>
            <ul className="about-info-list">
              <li className="is-interactive" onClick={() => onNav('research-detail', 'compact-objects')} title="View Compact Objects & Transients">
                Compact Objects &amp; Transients <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('research-detail', 'cosmology')} title="View Cosmology">
                Cosmology <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('research-detail', 'galaxies-agn')} title="View Galaxies & Active Galactic Nuclei">
                Galaxies &amp; Active Galactic Nuclei <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('research-detail', 'sun-heliosphere')} title="View Sun & Heliosphere">
                Sun &amp; Heliosphere <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('research-detail', 'space-weather')} title="View Space Weather & Atmospheric Science">
                Space Weather &amp; Atmospheric Science <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('research-detail', 'instrumentation')} title="View Communication, Navigation & Remote Sensing">
                Communication, Navigation &amp; Remote Sensing <span className="arrow">↗</span>
              </li>
              <li className="is-interactive" onClick={() => onNav('research-detail', 'data-science')} title="View Data Science & ML in Space Science">
                Data Science &amp; ML in Space Science <span className="arrow">↗</span>
              </li>
            </ul>
          </div>

          <div className="about-info-card" data-aos="fade-up" data-aos-delay="300">
            <h3 className="about-info-card-title">
              <span className="about-info-card-icon">🔬</span> Significant Labs and Facilities
            </h3>
            <ul className="about-info-list">
              <li>Radio Frequency (RF) Lab — testing up to 60 GHz</li>
              <li>Optics Lab &amp; Precision Measurement Systems</li>
              <li>IoT, Drone &amp; Remote Sensing Lab</li>
              <li>Plasma Lab &amp; Helmholtz Cages</li>
              <li>IITI Radio Interferometer Observatory</li>
              <li>IITI arctic research facility at Himadri</li>
            </ul>
          </div>
        </div>

        {/* ── Horizontal Timeline ── */}
        <div className="about-timeline-wrap" data-aos="fade-up" data-aos-offset="50">
          <div className="about-timeline-track" />
          <div className="about-timeline-row">
            {[
              { year: 'Dec 2015', title: 'Founded as Centre for Astronomy', sub: 'Ph.D. program launched · Founding SKA-IC member' },
              { year: 'May 2018', title: 'Upgraded to Full Department', sub: 'M.Sc. Astronomy — first & only in IITs' },
              { year: '2021', title: 'Space Engineering Programs', sub: 'M.Tech. Space Engineering · M.S. (Research) launched' },
              { year: '2023', title: 'B.Tech. Space Science & Engg.', sub: "First B.Tech of it's kind in IIT System. Arctic Research Facility" },
              { year: 'Present', title: '100+ Alumni · World-Class Labs', sub: 'Alumni at prestigious institutes & industries globally' },
            ].map((t, i) => (
              <div className="about-tl-item" key={i}>
                <div className="about-tl-dot" />
                <div className="about-tl-year">{t.year}</div>
                <div className="about-tl-title">{t.title}</div>
                <div className="about-tl-sub">{t.sub}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer onNav={onNav} />
    </div>
  );
}
