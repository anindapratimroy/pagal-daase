import { useState, useEffect } from 'react';
import Footer from '../Layout/Footer';

const PROGRAMS = {
  btech: {
    label: 'B.Tech.',
    duration: '4 Years',
    type: 'Undergraduate',
    year: 'Started July 2023',
    admission: 'JEE (Advanced)',
    title: 'B.Tech. in Space Science & Engineering',
    desc: "A dedicated bachelor's program in astronomy has started in July 2023. IIT Indore is the only IIT to offer such a unique program. The entrance to this program is through the JEE (Advance) examination.",
    sections: [
      {
        label: 'Why a B.Tech in Space Science & Engineering?',
        body: [
          'Delve into systems ranging from orbit control and space-based optics to ground station communications and robotics. Our Space Engineering program will equip you with the technical skills required to design solutions to complex problems using space-based assets while utilizing the principles of systems engineering.',
          'You will learn and practice the design and management of multidisciplinary projects that enable missions to the far reaches of the solar system. Our internship programs in the final year allow you to build experience with space agencies and industries that require the design of complex systems.',
        ],
      },
      {
        label: 'Specialization',
        intro: 'The students of this programme can specialize in any of the following four domains:',
        grid: [
          { icon: '🛰️', label: 'Space Instrumentation – Detectors & Payloads' },
          { icon: '📊', label: 'Imaging and Data Analysis' },
          { icon: '🌍', label: 'Remote Sensing and Atmospheric Engineering' },
          { icon: '🔭', label: 'Astronomy & Astrophysics' },
        ],
      },
      {
        label: 'Career Path',
        body: [
          'Upon graduating from this program, students can anticipate a plethora of exciting career opportunities in the rapidly expanding space industry. With a strong foundation in electronics, communication, orbits and payloads, remote sensing, data analysis, and machine learning, graduates can pursue positions as space engineers, satellite system designers, mission planners, payload specialists, or remote sensing analysts.',
          'They may find themselves working in renowned space agencies, aerospace companies, research institutions, or even entrepreneurial ventures in the space sector. The multidisciplinary nature of the program equips students with a diverse skill set, opening doors to diverse and impactful roles in the ever-evolving world of space exploration and technology.',
        ],
      },
    ],
    highlights: [
      { num: 'July 2023', text: "Dedicated bachelor's program started" },
      { num: 'Only IIT', text: 'Only IIT to offer this unique program' },
      { num: 'JEE (Adv)', text: 'Entrance through JEE (Advance) examination' },
      { num: '4 Domains', text: 'Specializations in Instrumentation, Imaging, Remote Sensing & Astrophysics' },
    ],
    curriculumUrl: 'https://academic.iiti.ac.in/app/storage/app/coursecurriculum/ogfpapmREdLJjZF4rFgqJbw8KS9CMo6wFolOCXTn.pdf',
    email: 'naren@iiti.ac.in',
  },
  msc: {
    label: 'M.Sc.',
    duration: '2 Years',
    type: 'Postgraduate',
    year: 'Started July 2018',
    admission: 'JAM (Physics)',
    title: 'M.Sc. in Astronomy',
    desc: "A dedicated master's program in astronomy started in July 2018. IIT Indore is the only IIT to offer such a unique program. The entrance to this program is through the JAM (physics) examination.",
    sections: [
      {
        label: 'Why an M.Sc. in Astronomy?',
        body: [
          'A master’s in Astronomy opens up unique possibilities for students. Chief among these are careers in Data Science (which requires a combination of skills in Statistics, Analysis, and data handling) and instrumentation.',
          'Job opportunities for Master’s students in Astronomy are present both in academia and industry, depending on their interests and skill sets on which they concentrate. The academic opportunities can be research positions in universities, observatories, and research institutes.',
          'Furthermore, teaching positions at various colleges and universities in India can be a promising prospect for master\'s students. The sectors in the industry that necessitates data handling and mining, statistics, computational, and analytical skills will have a demand for Master\'s in Astronomy graduates. Such industries entail market research, finance, banking, and R&D in diverse areas.',
          'The instrumentation skills developed throughout the course can also be valuable in the fields of signal processing, aerospace, satellite navigation, and weather prediction. Journalism, science writing, and science popularization through public outreach may also be promising career options for MSc in Astronomy graduates.',
        ],
      },
      {
        label: 'What does it entail?',
        body: [
          'The MSc in Astronomy at IIT Indore is a unique programme that exposes students to the ever-exciting world of Astronomy and simultaneously introduces them to cutting-edge techniques involving computation, statistics, data science, and instrumentation.',
          'During this programme, you will be experiencing the thrill of conducting research in the front-end areas of Astronomy, Cosmology, and Space Sciences. After acquiring this degree, you will be proficient in advanced research techniques and problem-solving.',
          'The programme comprises a number of compulsory courses from both physics and astronomy, followed by more focused elective courses in the advanced semesters. The compulsory courses provide basic preliminary knowledge, whereas the elective courses introduce the students to more advanced topics spanning areas like space weather, and astrostatistics.',
          'Each week the student activities will include 15 hours of lectures and 8 hours in the laboratory. However, the students are expected to carry out their own study to supplement the lectures with reference reading and complete all the assignments and projects associated with the courses.',
        ],
      },
    ],
    highlights: [
      { num: 'July 2018', text: "Dedicated master's program started" },
      { num: 'Only IIT', text: 'Only IIT to offer this unique program' },
      { num: 'JAM (Physics)', text: 'Entrance through JAM (physics) examination' },
      { num: '15h + 8h', text: 'Weekly contact: 15h lectures and 8h laboratory' },
    ],
    curriculumUrl: 'https://academic.iiti.ac.in/app/storage/app/coursecurriculum/nNtSYVKA46yp2B1AeqiovacZ6xEjUWdcndKMWxsO.pdf',
    email: 'pc-mscse@iiti.ac.in',
  },
  mtech: {
    label: 'M.Tech.',
    duration: '2 Years',
    type: 'Postgraduate',
    year: 'Full-Time',
    admission: 'GATE / Interview',
    title: 'M.Tech. in Space Engineering',
    desc: "In today’s world, Space is not just about human curiosity in knowing what’s beyond. Space has turned out to be a frontier essential to address a plethora of current issues as well as future prosperity.",
    sections: [
      {
        label: 'About the Program',
        body: [
          'In today’s world, Space is not just about human curiosity in knowing what’s beyond. Space has turned out to be a frontier essential to address a plethora of current issues as well as future prosperity.',
          'It includes study and prediction of climate change, communication, navigation, defense, security, survey, agriculture, environment, ecology, and astronomy. It is essential to develop technology and trained human resources to meet the enormous requirements in this sector both in government and private sectors.',
          'The students trained in UG/PG degrees in other disciplines have the basic foundation but fall short of the specialized skills required to carry out research in the domain of Space Sciences and Engineering.',
          'This program is designed to provide fundamental concepts and specialization in Space Systems Engineering, Operations, and Techniques. Applicants from basic engineering fields will gain expertise in the domain of space sciences and engineering.',
          'This program is designed to cater to job aspirants in India’s emerging space industry, geospatial, and defense sectors.',
        ],
      },
      {
        label: 'Minimum Educational Qualification (MEQ)',
        body: [
          'Four-year Bachelor’s degree or five-year integrated degree (with first division as defined by the awarding Institute/ University for Indian applicants and equivalent to International applicants, as assessed by the Institute) in Electronics and Communication/ Electronics/ Engineering Physics / Aerospace, or M.Sc. in Physics/ Electronics/ Atmospheric science.',
          'Relaxation as per GoI norms in qualifying degrees is applicable for SC and ST category applicants.',
        ],
      },
      {
        label: 'Qualifying Examination',
        list: [
          '(a) International students: Valid score of TOEFL or IELTS',
          '(b) Indian students: Valid GATE qualification in Aerospace Engineering / Electronics and Communication Engineering / Physics / Engineering Sciences (Engineering Mathematics + Fluid Mechanics / Material Science / Thermodynamics / Atmospheric and Oceanic Sciences)',
        ],
      },
      {
        label: 'Categories of Admission',
        body: [
          '(a) International Students:\n• International self-financed (ISF) students\n• International students sponsored by non-government organizations or by a reputed industry (ISW)\n• International students sponsored by foreign governments or its organizations or through mutual collaborative programs of India with other countries (GSW)',
          '(b) Indian Students:\n• TA: Teaching Assistantship (TA) under this category on Full Time basis.\n• SW: Excellent eligible applicants sponsored by a reputed Industry or R & D Organization with a minimum work experience of two years, under the Sponsored category (SW) as Full-Time.\n• DF: Applicants from the Defense Forces under this category.\n• IS: Institute staff members of IIT Indore on a part-time basis.\n\nCandidates of SW, DF, and IS categories will not be provided any scholarship.',
        ],
      },
      {
        label: 'Selection Criteria & Duration',
        list: [
          'Selection criteria: GATE Score and/or Interview. (Valid GATE score compulsory for TA category)',
          'Duration of the Program: Two years full-time.',
        ],
      },
    ],
    highlights: [
      { num: '2 Years', text: 'Duration of the Program (Full-time)' },
      { num: 'GATE / Interview', text: 'Selection criteria for eligible applicants' },
      { num: 'TA / SW / DF', text: 'Multiple admission categories including Defence & Industry' },
      { num: 'Specialized', text: 'Space Systems Engineering, Operations & Techniques' },
    ],
    curriculumUrl: 'https://academic.iiti.ac.in/app/storage/app/coursecurriculum/nNtSYVKA46yp2B1AeqiovacZ6xEjUWdcndKMWxsO.pdf',
    email: 'pc-se@iiti.ac.in',
  },
  ms: {
    label: 'MS Research',
    duration: '2 Years',
    type: "Master's & Dual Degree",
    year: 'Full-Time',
    admission: 'GATE / Interview',
    title: 'MS (Research), MS (Research) + Ph.D. dual degree in Space Sciences and Engineering',
    desc: "In today’s world, Space is not just about human curiosity in knowing what’s beyond. Space has turned out to be a frontier essential to address a plethora of current issues as well as future prosperity.",
    sections: [
      {
        label: 'About the Program',
        body: [
          'In today’s world, Space is not just about human curiosity in knowing what’s beyond. Space has turned out to be a frontier essential to address a plethora of current issues as well as future prosperity.',
          'It includes the study and prediction of climate change, communication, navigation, defense, security, survey, agriculture, environment, ecology, and astronomy. It is essential to develop technology and trained human resources to meet the enormous requirements in this sector both in government and private sectors.',
          'The students trained in UG/PG degrees in other disciplines have the basic foundation but fall short of the specialized skills required to carry out research in the domain of Space Sciences and Engineering. This program is designed to help candidates get into specialized fields related to Space Sciences and Engineering, learn some basic domain knowledge, and get exposed to research in the areas related to Space Sciences and Engineering.',
          'Students graduating from this program are expected to thrive in higher studies in the domain as well as apply for high-skilled jobs in space and related industries.',
        ],
      },
      {
        label: 'Minimum Educational Qualification',
        body: [
          'A four-year bachelor’s degree (BE or B Tech), or a two-year or five-year integrated master’s degree (MSc or MTech or ME) with first class or first division (as decided by the awarding institute/university), in Physics, Applied Physics, Astronomy, Astrophysics, Space Science and Engineering, Earth and Atmospheric Science and Engineering, Remote Sensing, Engineering Physics, Aerospace Engineering, Aeronautics, Electronics and Communications Engineering, Electrical Engineering.',
        ],
      },
      {
        label: 'Qualifying Examination',
        list: [
          '(a) International Students: Valid score of TOEFL or IELTS.',
          '(b) Indian Students: Valid GATE qualification in the relevant disciplines.',
          'Relevant GATE papers: AE, EC, EE, PH, XE and interview.',
        ],
      },
      {
        label: 'Categories of Admission',
        body: [
          '(a) International Students:\n(i) International self-financed (ISF) students;\n(ii) International students sponsored by non-government organizations or by a reputed industry (ISW);\n(iii) International students sponsored by foreign governments or its organizations or through mutual collaborative programs of India with other countries (GSW)',
          '(b) Indian Students:\n(i) Teaching Assistantship (TA);\n(ii) Highly motivated sponsored candidate (SW) on a full-time basis from highly reputed R & D organizations such as DRDO, ISRO, BHEL, C-DAC, ADE, ADA, etc., and highly reputed Industries;\n(iii) Defense Forces (DF): Candidates sponsored by the Defense Forces;\n(iv) Regular institute staff (IS) of IIT Indore on a part-time basis only.\n\nCandidates of SW, DF, and IS categories will not be provided any scholarship.',
        ],
      },
      {
        label: 'Duration of Program',
        body: [
          '2 years on a full-time basis with a maximum extension of one semester.',
        ],
      },
    ],
    highlights: [
      { num: '2 Years', text: 'Full-time with max extension of one semester' },
      { num: 'AE/EC/EE/PH/XE', text: 'Relevant GATE papers for Indian students' },
      { num: 'Dual Degree', text: 'MS (Research) + Ph.D. dual degree option' },
      { num: 'Research-First', text: 'Specialized field exposure & foundational domain knowledge' },
    ],
    curriculumUrl: 'https://academic.iiti.ac.in/app/course_curriculum_list_pg',
    email: 'pc-ms-sse@iiti.ac.in',
  },
  phd: {
    label: 'Ph.D.',
    duration: 'Doctoral',
    type: 'Doctoral',
    year: 'Est. 2015',
    admission: 'CSIR-NET / GATE',
    title: 'Ph.D. in Astronomy, Astrophysics & Space Engineering',
    desc: "The PhD program at DAASE, IIT Indore, is aimed at developing skilled researchers and innovators in the rapidly evolving fields of astronomy, astrophysics, and space engineering.",
    sections: [
      {
        label: 'About the Program',
        body: [
          'The PhD program at DAASE, IIT Indore, is aimed at developing skilled researchers and innovators in the rapidly evolving fields of astronomy, astrophysics, and space engineering. In today’s world, space is not only a matter of human curiosity but also a critical frontier that addresses global challenges such as climate change, communication, navigation, defense, environment, and sustainable development. The program provides an excellent platform for students to pursue high-quality research that contributes to both scientific advancement and societal needs.',
          'PhD scholars at DAASE receive training that combines theoretical foundations, experimental methods, and computational techniques. They are exposed to specialized facilities, cutting-edge laboratories, and interdisciplinary collaborations with national and international research organizations. The program emphasizes independent research, critical thinking, and innovation, preparing scholars to make impactful contributions in academia, government research establishments, and the private space sector.',
          'Graduates of this program are expected to excel in research institutions and universities worldwide and secure high-skilled positions in organizations like ISRO, DRDO, PRL, and global space industries. With its strong academic environment, experienced faculty, and a focus on frontier research, the PhD program at DAASE offers a unique opportunity to contribute to India’s growing role in space exploration and technology development.',
        ],
      },
      {
        label: 'Minimum Educational Qualification',
        body: [
          'A four-year bachelor’s degree (BE or B Tech), or a two-year or five-year integrated master’s degree (MSc or MTech or ME) with first class or first division (as decided by the awarding institute/university), in Physics, Applied Physics, Astronomy, Astrophysics, Space Science and Engineering, Earth and Atmospheric Science and Engineering, Remote Sensing, Engineering Physics, Aerospace Engineering, Aeronautics, Electronics and Communications Engineering, Electrical Engineering.',
        ],
      },
      {
        label: 'Qualifying Examination',
        list: [
          '(a) International Students: Valid score of TOEFL or IELTS or Valid GATE qualification in the relevant disciplines.',
          '(b) Indian Students: Valid CSIR-NET/UGC NET or Valid GATE qualification in the relevant disciplines.',
        ],
      },
      {
        label: 'Categories of Admission',
        body: [
          '(a) International Students:\n(i) International self-financed (ISF) students;\n(ii) International students sponsored by non-government organizations or by a reputed industry (ISW);\n(iii) International students sponsored by foreign governments or its organizations or through mutual collaborative programs of India with other countries (GSW)',
          '(b) Indian Students:\n(i) Teaching Assistantship (TA);\n(ii) Highly motivated sponsored candidate (SW) on a full-time basis from highly reputed R & D organizations such as DRDO, ISRO, BHEL, C-DAC, ADE, ADA, etc., and highly reputed Industries;\n(iii) Defense Forces (DF): Candidates sponsored by the Defense Forces;\n(iv) Regular institute staff (IS) of IIT Indore on a part-time basis only.\n\nCandidates of SW, DF, and IS categories will not be provided any scholarship.',
        ],
      },
    ],
    highlights: [
      { num: 'Doctoral', text: 'Skilled researchers & innovators in astronomy & space' },
      { num: 'NET / GATE', text: 'Qualifying exam: CSIR-NET / UGC-NET / GATE' },
      { num: 'TA / SW / DF', text: 'TA, Sponsored (ISRO/DRDO/BHEL), DF, and IS' },
      { num: 'Frontier Labs', text: 'Specialized facilities & cutting-edge research collaborations' },
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

              {/* Dynamic sections from official site links */}
              {prog.sections && prog.sections.map((sec, idx) => (
                <div key={idx} className="prog-section">
                  <h4 className="prog-section-label">{sec.label}</h4>
                  {sec.intro && (
                    <p className="prog-section-body" style={{ marginBottom: '14px' }}>
                      {sec.intro}
                    </p>
                  )}
                  {Array.isArray(sec.body) ? (
                    sec.body.map((para, pIdx) => (
                      <p
                        key={pIdx}
                        className="prog-section-body"
                        style={{
                          marginBottom: pIdx < sec.body.length - 1 ? '14px' : 0,
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {para}
                      </p>
                    ))
                  ) : sec.body ? (
                    <p className="prog-section-body" style={{ whiteSpace: 'pre-line' }}>{sec.body}</p>
                  ) : null}

                  {sec.grid && (
                    <div className="prog-spec-grid" style={{ marginTop: sec.intro || sec.body ? '14px' : 0 }}>
                      {sec.grid.map((item, i) => (
                        <div key={i} className="prog-spec-item">
                          <span className="prog-spec-icon">{item.icon}</span>
                          <span className="prog-spec-text">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {sec.list && (
                    <ul className="prog-list" style={{ marginTop: sec.intro || sec.body ? '14px' : 0 }}>
                      {sec.list.map((item, i) => (
                        <li key={i} className="prog-list-item">
                          <span className="prog-list-bullet" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Action buttons */}
              <div className="prog-actions">
                {prog.curriculumUrl && (
                  <a href={prog.curriculumUrl} target="_blank" rel="noopener noreferrer" className="btn-primary prog-btn">
                    Course Structure ↗
                  </a>
                )}
                {prog.placementUrl && (
                  <a href={prog.placementUrl} target="_blank" rel="noopener noreferrer" className="btn-outline prog-btn">
                    Past Placements ↗
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
