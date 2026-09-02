import { useState, useEffect } from 'react';
import Footer from '../Layout/Footer';

const PROGRAMS = {
  btech: {
    label: 'B.Tech.',
    badge: 'Undergraduate Program · 4 Years · Started July 2023',
    title: 'B.Tech. in Space Science & Engineering',
    desc: "A dedicated bachelor's program in Space Science & Engineering launched in July 2023. IIT Indore is the only IIT to offer such a unique undergraduate program. Entrance to this program is through the national JEE (Advanced) examination.",
    overview: 'Delve into systems ranging from orbit control and space-based optics to ground station communications and robotics. The Space Engineering program equips students with the technical skills required to design solutions to complex problems using space-based assets while utilizing principles of systems engineering.',
    specializations: [
      'Space Instrumentation – Detectors & Payloads',
      'Imaging and Data Analysis',
      'Remote Sensing and Atmospheric Engineering',
      'Astronomy & Astrophysics',
    ],
    careers: 'Graduates can anticipate exciting career opportunities in the rapidly expanding space industry as space engineers, satellite system designers, mission planners, payload specialists, or remote sensing analysts across ISRO, NASA, aerospace companies, research institutions, and space startups.',
    details: [
      'Space science fundamentals: orbital mechanics, rocket propulsion, remote sensing & telemetry',
      'Engineering applications: instrumentation, payload electronics, satellite systems & RF',
      'Data science, machine learning, and computational astrophysics',
      'Final year internship programs with leading space agencies and aerospace industries',
    ],
    highlights: [
      { num: 'First in IITs', text: 'Only IIT offering B.Tech. in Space Science & Engineering' },
      { num: 'JEE (Adv)', text: 'Admissions through national JEE (Advanced) examination' },
      { num: '4 Domains', text: 'Specializations in Instrumentation, Imaging, Remote Sensing & Astronomy' },
      { num: '6+ Labs', text: 'State-of-the-art facilities for hands-on space engineering' },
    ],
    curriculumUrl: 'https://academic.iiti.ac.in/app/course_curriculum_list_ug',
    email: 'hodaase@iiti.ac.in',
  },
  msc: {
    label: 'M.Sc.',
    badge: 'Postgraduate Program · 2 Years · Started July 2018',
    title: 'M.Sc. in Astronomy',
    desc: "A dedicated master's program in astronomy started in July 2018 — making DAASE the first and only IIT department to offer an M.Sc. in Astronomy. Entrance to this program is through the nationwide IIT-JAM (Physics) examination.",
    overview: 'A unique programme that exposes students to the ever-exciting world of Astronomy and simultaneously introduces them to cutting-edge techniques involving computation, statistics, data science, and instrumentation. Comprises compulsory foundations in physics and astronomy followed by focused electives.',
    specializations: [
      'Observational Astronomy & Stellar Astrophysics',
      'Radio Astronomy & High-Energy Astrophysics',
      'Cosmology & Epoch of Reionization',
      'Astrostatistics, Data Science & Machine Learning',
    ],
    careers: 'Opens up versatile careers in data science, finance, analytics, and software, as well as academic research and teaching positions in universities, observatories, and institutes globally, plus signal processing, satellite navigation, and weather prediction.',
    details: [
      '15 hours of lectures and 8 hours of dedicated laboratory sessions each week',
      'Comprehensive coursework spanning classical to modern observational & theoretical astronomy',
      'Advanced elective courses in space weather, cosmology, and computational astrophysics',
      'Master’s thesis research conducted with faculty supervision throughout the final year',
    ],
    highlights: [
      { num: '2018', text: 'First and only M.Sc. Astronomy program across all IITs' },
      { num: 'IIT-JAM', text: 'Admission via Joint Admission Test for Masters (Physics)' },
      { num: '15h + 8h', text: 'Weekly lectures and rigorous experimental lab training' },
      { num: '100%', text: 'Master thesis research with dedicated faculty mentorship' },
    ],
    curriculumUrl: 'https://academic.iiti.ac.in/app/course_curriculum_list_pg',
    email: 'coord.msc.astro@iiti.ac.in',
  },
  mtech: {
    label: 'M.Tech.',
    badge: 'Postgraduate & Dual Degree · 2 Years · Started 2021',
    title: 'M.Tech. / M.Tech. + Ph.D. in Space Engineering',
    desc: 'Launched in 2021 to provide fundamental concepts and specialization in Space Systems Engineering, Operations, and Techniques, bridging basic engineering fields with advanced space science expertise to cater to India’s emerging space and defense sectors.',
    overview: 'In today’s world, space is essential to address climate change, communication, navigation, defense, security, survey, agriculture, environment, ecology, and astronomy. The program develops high-skilled human resources and technology to meet enormous national and global requirements.',
    specializations: [
      'RF & Microwave Systems (Testing up to 60 GHz)',
      'Satellite Subsystems & CubeSat Architecture',
      'Remote Sensing, SAR & Hyperspectral Imaging',
      'Space Mission Design & Atmospheric Sounding',
    ],
    careers: 'Graduates pursue high-skilled engineering careers in space agencies (ISRO, DRDO, PRL), aerospace industries, geospatial companies, defense establishments, and cutting-edge space technology startups.',
    details: [
      'Eligibility: Four-year B.E./B.Tech. or M.Sc. in ECE, Electrical, Aerospace, Engineering Physics, Physics, Atmospheric Science',
      'Qualifying Exam: Valid GATE qualification in AE, EC, EE, PH, XE or interview',
      'Admission categories: Teaching Assistantship (TA), Sponsored (SW from ISRO/DRDO/Industry), Defense Forces (DF), Institute Staff (IS), and International Students',
      'Two years full-time with an option for integrated M.Tech. + Ph.D. dual degree',
    ],
    highlights: [
      { num: '2021', text: 'Established M.Tech. in Space Engineering program' },
      { num: '60 GHz', text: 'RF & microwave testing and Anechoic Chamber facilities' },
      { num: 'GATE / SW', text: 'TA assistantships and Industry/Defense sponsored seats' },
      { num: 'Dual Degree', text: 'Option for integrated M.Tech. + Ph.D. doctoral track' },
    ],
    curriculumUrl: 'https://academic.iiti.ac.in/app/course_curriculum_list_pg',
    email: 'pc-mtech-se@iiti.ac.in',
  },
  ms: {
    label: 'M.S. (Research)',
    badge: 'Research Master’s & Dual Degree · 2 Years · Started 2021',
    title: 'M.S. (Research) / M.S. + Ph.D. in Space Sciences & Engineering',
    desc: 'A research-intensive master’s program started in 2021, designed to help candidates gain specialized domain knowledge and significant research exposure in Space Sciences and Engineering before advancing to doctoral studies or high-skill R&D careers.',
    overview: 'Students trained in standard UG/PG degrees often fall short of specialized research skills. This program bridges that gap, allowing students to dedicate the vast majority of their curriculum to original research projects in space sciences and engineering.',
    specializations: [
      'Observational & Theoretical Astrophysics',
      'Space Weather & Atmospheric Physics',
      'Satellite Remote Sensing & Earth Observation',
      'Instrumentation & Space Payload Systems',
    ],
    careers: 'Graduates are ideally prepared to thrive in doctoral (Ph.D.) programs worldwide and secure high-skilled technical and research positions in space and defense industries.',
    details: [
      'Eligibility: Four-year BE/B.Tech. or Master’s degree in Physics, Astronomy, Space Science, Atmospheric Science, Remote Sensing, Aerospace, ECE, EE',
      'Qualifying Exam: Valid GATE qualification in AE, EC, EE, PH, XE or national exam',
      'Categories: Teaching Assistantship (TA), Sponsored (SW - DRDO, ISRO, BHEL, C-DAC), Defense Forces (DF), Institute Staff (IS), and International Students',
      'Two years full-time with thesis-based defense and faculty supervisor allotment',
    ],
    highlights: [
      { num: 'Thesis-First', text: 'Heavy emphasis on original research and publications' },
      { num: 'Global Ph.D.', text: 'Direct springboard for top doctoral programs worldwide' },
      { num: 'GATE Valid', text: 'Admissions with GATE in AE, EC, EE, PH, XE' },
      { num: 'Dual Option', text: 'M.S. (Research) + Ph.D. dual degree pathway' },
    ],
    curriculumUrl: 'https://academic.iiti.ac.in/app/course_curriculum_list_pg',
    email: 'pc-ms-sse@iiti.ac.in',
  },
  phd: {
    label: 'Ph.D.',
    badge: 'Doctoral Program · 4–6 Years · Founded Dec 2015',
    title: 'Ph.D. in Astronomy, Astrophysics & Space Engineering',
    desc: 'The founding academic program of DAASE (since 2015) — developing skilled researchers and innovators in astronomy, astrophysics, space engineering, remote sensing, and atmospheric science.',
    overview: 'PhD scholars receive training that combines theoretical foundations, experimental methods, and computational techniques. They are exposed to specialized facilities, cutting-edge campus laboratories, and interdisciplinary collaborations with national and international research organizations.',
    specializations: [
      'Cosmology, Epoch of Reionization & Gravitational Waves',
      'Radio Astronomy, Compact Objects & Active Galactic Nuclei',
      'Space Weather, Upper Atmosphere & Arctic Research (Himadri)',
      'RF Instrumentation, Microwave Sensors & Machine Learning',
    ],
    careers: 'Graduates excel in premier research institutions and universities worldwide and secure high-skilled positions in organizations like ISRO, DRDO, PRL, NASA, and global space industries.',
    details: [
      'Eligibility: Four-year BE/B.Tech. or Master’s (M.Sc./M.Tech./M.E.) in relevant science/engineering disciplines with valid CSIR-NET / UGC-NET / GATE score',
      'Access to national and international telescopes, observatories, data archives, and supercomputing clusters',
      'Fully funded fellowship positions: MoE/MHRD TA, DST-FIST, SERB, ISRO, and international project funds',
      'Active collaboration with SKA-India, NASA, ISRO, and leading global universities',
    ],
    highlights: [
      { num: '2015', text: 'Flagship doctoral program founding the department' },
      { num: '30+ Alumni', text: 'Doctoral alumni working at premier global institutes & space labs' },
      { num: 'Global Access', text: 'Observatory access: GMRT, ASTROSAT, ALMA, JWST, Himadri Arctic Facility' },
      { num: 'Full Funding', text: 'Institute assistantships and sponsored project fellowships' },
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
              onClick={() => {
                setActive(key);
                if (onNav) onNav('programs', key);
              }}
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
              
              {prog.overview && (
                <div style={{ marginBottom: '20px', fontSize: '15px', color: 'rgba(255, 255, 255, 0.88)', lineHeight: '1.7', background: 'rgba(255, 255, 255, 0.03)', padding: '16px 18px', borderRadius: '12px', borderLeft: '3px solid var(--gold)' }} className="anim-fadeup d3">
                  <div style={{ fontWeight: 700, color: 'var(--gold-light)', marginBottom: '6px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Program Scope &amp; Objectives
                  </div>
                  {prog.overview}
                </div>
              )}

              {prog.specializations && (
                <div style={{ marginBottom: '22px' }} className="anim-fadeup d4">
                  <div style={{ fontWeight: 700, color: '#93C5FD', marginBottom: '10px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    ✦ Key Specializations &amp; Focus Domains:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                    {prog.specializations.map((spec, sIdx) => (
                      <div key={sIdx} style={{ background: 'rgba(96, 165, 250, 0.08)', border: '1px solid rgba(96, 165, 250, 0.2)', padding: '8px 12px', borderRadius: '8px', fontSize: '13.5px', color: '#F0F4FF', fontWeight: 500 }}>
                        ✓ {spec}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pc-detail-list anim-fadeup d4">
                <div style={{ fontWeight: 700, color: '#ffd97a', marginBottom: '4px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  ✦ Curriculum Highlights &amp; Admission:
                </div>
                {prog.details.map((d, i) => (
                  <div className="pc-detail" key={i}>
                    <div className="pc-detail-bullet" />{d}
                  </div>
                ))}
              </div>

              {prog.careers && (
                <div style={{ marginTop: '20px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.78)', lineHeight: '1.6' }} className="anim-fadeup d4">
                  <strong style={{ color: '#fff' }}>Career Pathways:</strong> {prog.careers}
                </div>
              )}
              
              <div style={{ marginTop: '28px', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }} className="anim-fadeup d5">
                {prog.curriculumUrl && (
                  <a 
                    href={prog.curriculumUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ padding: '8px 18px', fontSize: '14px' }}
                  >
                    View Official Syllabus ↗
                  </a>
                )}
                {prog.email && (
                  <a 
                    href={`mailto:${prog.email}`}
                    className="btn-outline"
                    style={{ padding: '8px 18px', fontSize: '14px' }}
                  >
                    Contact Coordinator ✉
                  </a>
                )}
              </div>
            </div>

            <div className="pc-highlights anim-fadeup d3">
              <div style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                Program Key Highlights
              </div>
              {prog.highlights.map((h, i) => (
                <div className="pc-highlight" key={i}>
                  <div className="pc-highlight-num" style={{ fontSize: h.num.length > 5 ? '20px' : '28px' }}>{h.num}</div>
                  <div className="pc-highlight-text">{h.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer onNav={onNav} />
    </div>
  );
}

