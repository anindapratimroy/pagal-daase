import { useState, useEffect } from 'react';
import Footer from '../Layout/Footer';

const PROGRAMS = {
  btech: {
    label: 'B.Tech.',
    duration: '4 Years',
    type: 'Undergraduate',
    year: 'Started 2023',
    admission: 'JEE (Advanced)',
    title: 'B.Tech. in Space Science & Engineering',
    desc: "India's first and only undergraduate program of its kind across all IITs. Launched in July 2023 at IIT Indore, this program blends rigorous space science with hands-on engineering, preparing graduates for careers in ISRO, NASA, aerospace industries, and the global space sector.",
    overview: 'Delve into systems ranging from orbit control and space-based optics to ground station communications and robotics. You will learn to design solutions to complex problems using space-based assets while applying principles of systems engineering and mission planning.',
    specializations: [
      { icon: '🛰️', label: 'Space Instrumentation – Detectors & Payloads' },
      { icon: '📊', label: 'Imaging and Data Analysis' },
      { icon: '🌍', label: 'Remote Sensing and Atmospheric Engineering' },
      { icon: '🔭', label: 'Astronomy & Astrophysics' },
    ],
    curriculum: [
      'Orbital mechanics, rocket propulsion, remote sensing & telemetry',
      'Satellite systems, payload electronics, RF & communication systems',
      'Data science, machine learning & computational astrophysics',
      'Final year internship with leading space agencies & aerospace industries',
    ],
    careers: 'Space engineers, satellite system designers, mission planners, payload specialists, and remote sensing analysts across ISRO, NASA, aerospace companies, research institutions, and space startups.',
    highlights: [
      { num: 'First in IITs', text: 'Only IIT offering B.Tech. in Space Science & Engineering' },
      { num: 'JEE (Adv)', text: 'National JEE (Advanced) examination for admission' },
      { num: '4 Domains', text: 'Instrumentation · Imaging · Remote Sensing · Astronomy' },
      { num: '6+ Labs', text: 'Dedicated space engineering laboratory facilities' },
    ],
    curriculumUrl: 'https://academic.iiti.ac.in/app/course_curriculum_list_ug',
    email: 'naren@iiti.ac.in',
  },
  msc: {
    label: 'M.Sc.',
    duration: '2 Years',
    type: 'Postgraduate',
    year: 'Started 2018',
    admission: 'IIT-JAM (Physics)',
    title: 'M.Sc. in Astronomy',
    desc: 'The first and only M.Sc. Astronomy program in the entire IIT system, launched in July 2018. It combines the thrill of frontier astronomy research with cutting-edge computational, data science, and instrumentation skills.',
    overview: 'The programme exposes students to the ever-exciting world of Astronomy — from classical stellar astrophysics to modern cosmology — while simultaneously building proficiency in statistics, data science, and observational instrumentation through rigorous coursework and a final year research thesis.',
    specializations: [
      { icon: '⭐', label: 'Observational Astronomy & Stellar Astrophysics' },
      { icon: '📡', label: 'Radio Astronomy & High-Energy Astrophysics' },
      { icon: '🌌', label: 'Cosmology & Epoch of Reionization' },
      { icon: '💻', label: 'Astrostatistics, Data Science & Machine Learning' },
    ],
    curriculum: [
      '15 hours of lectures and 8 hours of dedicated laboratory sessions each week',
      'Compulsory courses in physics and astronomy, followed by advanced specialization electives',
      'Topics spanning space weather, astrostatistics, galactic dynamics, and high-energy astrophysics',
      'Final year M.Sc. thesis research with dedicated faculty supervisor mentorship',
    ],
    careers: 'Research positions at universities, observatories, and institutes worldwide; data science, analytics, finance, and software roles in industry; plus signal processing, aerospace, satellite navigation, and science communication.',
    highlights: [
      { num: '2018', text: 'First M.Sc. Astronomy program across all IITs' },
      { num: 'IIT-JAM', text: 'Joint Admission Test for Masters – Physics paper' },
      { num: '15h + 8h', text: 'Weekly contact hours: lectures and lab sessions' },
      { num: '100%', text: 'All students complete supervised thesis research' },
    ],
    curriculumUrl: 'https://academic.iiti.ac.in/app/course_curriculum_list_pg',
    email: 'coord.msc.astro@iiti.ac.in',
  },
  mtech: {
    label: 'M.Tech.',
    duration: '2 Years',
    type: 'Postgraduate & Dual Degree',
    year: 'Started 2021',
    admission: 'GATE',
    title: 'M.Tech. / M.Tech. + Ph.D. in Space Engineering',
    desc: 'Launched in 2021 to bridge advanced space technology with practical engineering. The program provides deep specialization in Space Systems Engineering, Operations, and Techniques, catering directly to India\'s growing space and defense sectors.',
    overview: 'From RF and microwave systems to remote sensing, satellite architecture, and mission design — this program builds the high-skilled engineering workforce needed to drive national and global space technology requirements. Students also have the option of an integrated M.Tech. + Ph.D. dual degree.',
    specializations: [
      { icon: '📻', label: 'RF & Microwave Systems (Testing up to 60 GHz)' },
      { icon: '🛰️', label: 'Satellite Subsystems & CubeSat Architecture' },
      { icon: '🌍', label: 'Remote Sensing, SAR & Hyperspectral Imaging' },
      { icon: '🚀', label: 'Space Mission Design & Atmospheric Sounding' },
    ],
    curriculum: [
      'Eligibility: B.E. / B.Tech. or M.Sc. in ECE, Electrical, Aerospace, Engineering Physics, Physics, or Atmospheric Science',
      'Qualifying Exam: Valid GATE score in AE, EC, EE, PH, or XE paper',
      'Admission: Teaching Assistantship (TA), Industry/DRDO/ISRO Sponsored (SW), Defence Forces (DF), Institute Staff (IS), and International students',
      'Duration: 2 years full-time; Integrated M.Tech. + Ph.D. dual degree option available',
    ],
    careers: 'High-skilled engineering careers at ISRO, DRDO, PRL, aerospace industries, geospatial companies, defence establishments, and leading space technology startups.',
    highlights: [
      { num: '2021', text: 'M.Tech. in Space Engineering established' },
      { num: '60 GHz', text: 'RF & microwave testing, Anechoic Chamber facility' },
      { num: 'GATE / SW', text: 'Assistantships and Industry/Defence sponsored seats' },
      { num: 'Dual Degree', text: 'Integrated M.Tech. + Ph.D. doctoral track option' },
    ],
    curriculumUrl: 'https://academic.iiti.ac.in/app/course_curriculum_list_pg',
    email: 'pc-se@iiti.ac.in',
  },
  ms: {
    label: 'M.S. (Research)',
    duration: '2 Years',
    type: 'Research Master\'s & Dual Degree',
    year: 'Started 2021',
    admission: 'GATE',
    title: 'M.S. (Research) / M.S. + Ph.D. in Space Sciences & Engineering',
    desc: 'A research-intensive master\'s program launched in 2021, designed to help candidates gain specialized domain knowledge and substantial research exposure in Space Sciences and Engineering — a direct launchpad to doctoral programs or high-skill R&D careers.',
    overview: 'This program bridges the gap between standard UG/PG engineering degrees and the specialized research skills demanded in the space sector. Students dedicate the vast majority of their time to original research, working directly with DAASE faculty on frontier problems.',
    specializations: [
      { icon: '🔭', label: 'Observational & Theoretical Astrophysics' },
      { icon: '🌤️', label: 'Space Weather & Atmospheric Physics' },
      { icon: '🛰️', label: 'Satellite Remote Sensing & Earth Observation' },
      { icon: '⚙️', label: 'Instrumentation & Space Payload Systems' },
    ],
    curriculum: [
      'Eligibility: Four-year B.E./B.Tech. or Master\'s degree in Physics, Astronomy, Space Science, Atmospheric Science, Remote Sensing, Aerospace, ECE, or EE',
      'Qualifying Exam: Valid GATE score in AE, EC, EE, PH, or XE paper',
      'Categories: Teaching Assistantship (TA), Sponsored (SW — DRDO, ISRO, BHEL, C-DAC), Defence Forces (DF), Institute Staff (IS), and International students',
      'Duration: 2 years full-time, thesis-based; Integrated M.S. + Ph.D. dual degree pathway available',
    ],
    careers: 'Graduates are optimally positioned for top doctoral (Ph.D.) programs worldwide, and for high-skilled research and technical positions across the space, defence, and astronomy industries.',
    highlights: [
      { num: 'Research-First', text: 'Heavy emphasis on original research and publications' },
      { num: 'Ph.D. Pathway', text: 'Direct springboard to top doctoral programs worldwide' },
      { num: 'GATE', text: 'Admissions with GATE in AE, EC, EE, PH, or XE' },
      { num: 'Dual Degree', text: 'M.S. (Research) + Ph.D. integrated degree option' },
    ],
    curriculumUrl: 'https://academic.iiti.ac.in/app/course_curriculum_list_pg',
    email: 'pc-mscse@iiti.ac.in',
  },
  phd: {
    label: 'Ph.D.',
    duration: '4–6 Years',
    type: 'Doctoral',
    year: 'Founded Dec 2015',
    admission: 'CSIR-NET / GATE',
    title: 'Ph.D. in Astronomy, Astrophysics & Space Engineering',
    desc: 'The founding program of DAASE since December 2015, training skilled researchers and innovators across the full spectrum of astronomy, astrophysics, space engineering, remote sensing, and atmospheric science.',
    overview: 'Ph.D. scholars receive rigorous training that combines theoretical foundations, experimental methods, and computational techniques. They are embedded in specialized on-campus facilities and engage in interdisciplinary collaborations with national and international research organizations, observatories, and space agencies.',
    specializations: [
      { icon: '🌌', label: 'Cosmology, Epoch of Reionization & Gravitational Waves' },
      { icon: '📡', label: 'Radio Astronomy, Compact Objects & Active Galactic Nuclei' },
      { icon: '🧊', label: 'Space Weather, Upper Atmosphere & Arctic Research (Himadri)' },
      { icon: '⚙️', label: 'RF Instrumentation, Microwave Sensors & Machine Learning' },
    ],
    curriculum: [
      'Eligibility: B.E./B.Tech. or Master\'s (M.Sc./M.Tech./M.E.) with valid CSIR-NET, UGC-NET, or GATE score in relevant disciplines',
      'Access to GMRT, ASTROSAT, ALMA, JWST data archives, and supercomputing clusters',
      'Fully funded fellowships: MoE/MHRD TA, DST-FIST, SERB, ISRO, and international project grants',
      'Active collaboration with SKA-India, NASA, ISRO, Max Planck Society, and leading global universities',
    ],
    careers: 'Faculty and research positions at top universities and institutes worldwide; high-skilled roles at ISRO, DRDO, PRL, NASA, and global space and defence organizations.',
    highlights: [
      { num: '2015', text: 'Flagship doctoral program founding the department' },
      { num: '30+ Alumni', text: 'Working at premier global institutes & space labs' },
      { num: 'Global Access', text: 'GMRT · ASTROSAT · ALMA · JWST · Himadri' },
      { num: 'Fully Funded', text: 'Institute, DST, SERB, ISRO and international fellowships' },
    ],
    curriculumUrl: 'https://academic.iiti.ac.in/app/course_curriculum_list_pg',
    email: 'pc-phd-aase@iiti.ac.in',
  },
};

export default function Programs({ initialProg = 'btech', onNav }) {
  const [active, setActive] = useState(initialProg);

  useEffect(() => {
    if (initialProg && PROGRAMS[initialProg]) {
      setActive(initialProg);
    }
  }, [initialProg]);

  const prog = PROGRAMS[active];

  return (
    <div style={{ background: 'transparent' }}>
      <div className="section-inner">
        <div className="section-header">

          <h1 className="section-title anim-fadeup d2">Degree <span>Programs</span></h1>
          <p className="section-desc anim-fadeup d3">
            The only IIT department offering M.Sc. Astronomy, and the first IIT with B.Tech. in Space Science &amp; Engineering.
          </p>
          <div className="title-bar" />
        </div>

        {/* Tab bar */}
        <div className="programs-tabs">
          {Object.entries(PROGRAMS).map(([key, p]) => (
            <button
              key={key}
              className={`prog-tab${active === key ? ' active' : ''}`}
              onClick={() => { setActive(key); if (onNav) onNav('programs', key); }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Program card */}
        <div className="prog-content" key={active}>
          <div className="prog-card-v2">

            {/* ── Left column ── */}
            <div className="prog-left">

              {/* Meta pills */}
              <div className="prog-meta-row">
                <span className="prog-meta-pill prog-meta-type">{prog.type}</span>
                <span className="prog-meta-pill prog-meta-dur">⏱ {prog.duration}</span>
                <span className="prog-meta-pill prog-meta-yr">📅 {prog.year}</span>
                <span className="prog-meta-pill prog-meta-adm">🎓 {prog.admission}</span>
              </div>

              {/* Title & description */}
              <h2 className="prog-title">{prog.title}</h2>
              <p className="prog-desc">{prog.desc}</p>

              {/* About the program */}
              <div className="prog-section">
                <h4 className="prog-section-label">About the Program</h4>
                <p className="prog-section-body">{prog.overview}</p>
              </div>

              {/* Specializations */}
              {prog.specializations && (
                <div className="prog-section">
                  <h4 className="prog-section-label">Specializations &amp; Focus Areas</h4>
                  <div className="prog-spec-grid">
                    {prog.specializations.map((spec, i) => (
                      <div key={i} className="prog-spec-item">
                        <span className="prog-spec-icon">{spec.icon}</span>
                        <span className="prog-spec-text">{spec.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Curriculum & Admission */}
              <div className="prog-section">
                <h4 className="prog-section-label">Curriculum &amp; Admission</h4>
                <ul className="prog-list">
                  {prog.curriculum.map((item, i) => (
                    <li key={i} className="prog-list-item">
                      <span className="prog-list-bullet" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Career paths */}
              <div className="prog-section prog-careers">
                <span className="prog-careers-label">Career Pathways</span>
                <p className="prog-careers-body">{prog.careers}</p>
              </div>

              {/* Action buttons */}
              <div className="prog-actions">
                {prog.curriculumUrl && (
                  <a href={prog.curriculumUrl} target="_blank" rel="noopener noreferrer" className="btn-primary prog-btn">
                    View Official Syllabus ↗
                  </a>
                )}
                {prog.email && (
                  <a href={`mailto:${prog.email}`} className="btn-outline prog-btn">
                    Contact Coordinator ✉
                  </a>
                )}
              </div>
            </div>

            {/* ── Right column — highlights ── */}
            <div className="prog-right">
              <div className="prog-highlights-header">Program Highlights</div>
              <div className="prog-highlights-list">
                {prog.highlights.map((h, i) => (
                  <div key={i} className="prog-highlight-item">
                    <div className="prog-hl-num">{h.num}</div>
                    <div className="prog-hl-text">{h.text}</div>
                  </div>
                ))}
              </div>

              {/* Contact card */}
              <div className="prog-contact-card">
                <div className="prog-contact-label">Program Coordinator</div>
                <a href={`mailto:${prog.email}`} className="prog-contact-email">{prog.email}</a>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer onNav={onNav} />
    </div>
  );
}
