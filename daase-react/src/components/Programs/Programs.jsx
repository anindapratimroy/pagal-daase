import { useState } from 'react';
import Footer from '../Layout/Footer';

const PROGRAMS = {
  btech: {
    label: 'B.Tech.',
    badge: 'Undergraduate · 4 Years',
    title: 'B.Tech. in Space Science & Engineering',
    desc: 'A pioneering program — the first B.Tech. of its kind in the IIT system (2022). Integrates rigorous space science fundamentals with engineering applications, preparing graduates for careers in Indian and global space sectors.',
    details: [
      'Space science fundamentals: orbital mechanics, rocket propulsion, remote sensing',
      'Engineering applications: instrumentation, satellite systems, RF systems',
      'Data science, computational methods, and hands-on lab training',
      'Minor in Astronomy & Space Science available for IIT Indore students',
    ],
    highlights: [
      { num: '2022', text: 'First B.Tech. in Space Science & Engineering across all IITs' },
      { num: '3', text: 'Active batches (2023, 2024, 2025) currently enrolled' },
      { num: '6+', text: 'State-of-the-art labs for hands-on learning' },
    ],
  },
  msc: {
    label: 'M.Sc.',
    badge: 'Postgraduate · 2 Years',
    title: 'M.Sc. in Astronomy',
    desc: 'Launched May 2018 — making DAASE the first and only IIT department to offer M.Sc. Astronomy. Rigorous training from classical to modern observational and theoretical astronomy.',
    details: [
      'Classical and modern observational astronomy, stellar astrophysics',
      'Radio astronomy, optical observations, and instrumentation',
      'Cosmology, galactic dynamics, high-energy astrophysics',
      'Research project with faculty supervision in final year',
    ],
    highlights: [
      { num: '2018', text: 'First M.Sc. Astronomy program across all IITs' },
      { num: '25+', text: 'M.Sc. alumni in research & industry' },
      { num: '12+', text: 'Faculty supervisors across all astronomy domains' },
    ],
  },
  mtech: {
    label: 'M.Tech.',
    badge: 'Postgraduate · 2 Years',
    title: 'M.Tech. in Space Engineering',
    desc: 'Launched in 2021, bridging advanced space technology with practical engineering — RF systems, remote sensing, satellite instrumentation, and space mission design with research exposure.',
    details: [
      'RF engineering: system design, antenna theory, up to 60 GHz testing',
      'Satellite systems, CubeSat design, and space mission architecture',
      'Remote sensing, SAR, hyperspectral imaging, atmospheric sounding',
      'Thesis-based with strong industry & ISRO linkages',
    ],
    highlights: [
      { num: '2021', text: 'Two specializations: Space Engineering and AOLT' },
      { num: '15+', text: 'Graduates in ISRO, space startups & research institutes' },
      { num: '10+', text: 'Specialized lab facilities for hands-on space engineering' },
    ],
  },
  ms: {
    label: 'MS Research',
    badge: "Research Master's · 2 Years",
    title: 'M.S. (Research) in Space Science & Engineering',
    desc: 'Launched in 2021, designed for students who wish to pursue intensive research before a Ph.D. Students work closely with faculty on cutting-edge projects in space science and engineering.',
    details: [
      'Research-intensive: majority of time on original research',
      'Covers radio astronomy, ionospheric science, atmospheric physics',
      'Access to all DAASE research facilities and collaborations',
      'Strong pathway to Ph.D. programs nationally and internationally',
    ],
    highlights: [
      { num: '9', text: 'Current MS Research students (2024 & 2025 batches)' },
      { num: '7+', text: 'Alumni from MS Research program' },
      { num: '100%', text: 'Thesis-based; all students assigned faculty supervisors' },
    ],
  },
  phd: {
    label: 'Ph.D.',
    badge: 'Doctoral · 4–6 Years',
    title: 'Ph.D. in Astronomy & Space Science',
    desc: 'The founding program of DAASE (since 2015) — training researchers across the full spectrum of astronomy, astrophysics, space engineering, remote sensing, and atmospheric science.',
    details: [
      'Full spectrum: black holes & cosmology to atmospheric physics',
      'Access to national and international telescopes, observatories, and data',
      'ISRO, SERB, DST, Max Planck-funded positions available',
      'Active collaboration with SKA-IC, NASA, ISRO, and global universities',
    ],
    highlights: [
      { num: '2015', text: 'Ph.D. program — the founding program of DAASE' },
      { num: '30+', text: 'Ph.D. alumni across all batches' },
      { num: '12+', text: 'National & international funding agencies support research' },
    ],
  },
};

export default function Programs() {
  const [active, setActive] = useState('btech');
  const prog = PROGRAMS[active];

  return (
    <div style={{ background: 'transparent' }}>
      <div className="section-inner">
        <div className="section-header">
          <span className="section-eyebrow anim-fadeup d1">✦ Academic Pathways</span>
          <h1 className="section-title anim-fadeup d2">Degree <span>Programs</span></h1>
          <p className="section-desc anim-fadeup d3">The only IIT department with M.Sc. Astronomy and the first IIT with B.Tech. in Space Science &amp; Engineering.</p>
          <div className="title-bar" />
        </div>

        <div className="programs-tabs">
          {Object.entries(PROGRAMS).map(([key, p]) => (
            <button
              key={key}
              className={`prog-tab${active === key ? ' active' : ''}`}
              onClick={() => setActive(key)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="prog-content" key={active}>
          <div className="prog-card">
            <div>
              <div className="pc-badge anim-fadeup d1">{prog.badge}</div>
              <h3 className="pc-title anim-fadeup d2">{prog.title}</h3>
              <p className="pc-desc anim-fadeup d3">{prog.desc}</p>
              <div className="pc-detail-list anim-fadeup d4">
                {prog.details.map((d, i) => (
                  <div className="pc-detail" key={i}>
                    <div className="pc-detail-bullet" />{d}
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '32px' }} className="anim-fadeup d5">
                <a 
                  href={active === 'btech' ? 'https://academic.iiti.ac.in/app/course_curriculum_list_ug' : 'https://academic.iiti.ac.in/app/course_curriculum_list_pg'}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  {active === 'btech' ? 'UG Syllabus' : 'PG Syllabus'} <span className="arrow">↗</span>
                </a>
              </div>
            </div>
            <div className="pc-highlights anim-fadeup d3">
              {prog.highlights.map((h, i) => (
                <div className="pc-highlight" key={i}>
                  <div className="pc-highlight-num">{h.num}</div>
                  <div className="pc-highlight-text">{h.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
