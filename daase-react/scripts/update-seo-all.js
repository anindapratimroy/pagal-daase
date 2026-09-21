import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as fb from '../src/data/fallback.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const reactDir = path.resolve(__dirname, '..');
const staticDir = path.resolve(rootDir, 'daase-static-website');

const cleanSlug = (name) => (name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

console.log('Generating Schema.org JSON-LD Entities...');

// 1. Faculty
const facultyEntities = fb.FACULTY_FB.map(f => {
  const slug = cleanSlug(f.name);
  const email = f.email ? (f.email.includes('@') ? f.email : `${f.email}@iiti.ac.in`) : undefined;
  const sameAs = [];
  if (f.url) sameAs.push(f.url);

  return {
    "@type": "Person",
    "@id": `https://daase.iiti.ac.in/#person-${slug}`,
    "name": f.name,
    "jobTitle": f.designation || "Faculty Member",
    "worksFor": {
      "@type": "EducationalOrganization",
      "name": "Department of Astronomy, Astrophysics and Space Engineering (DAASE), IIT Indore",
      "url": "https://daase.iiti.ac.in/"
    },
    "affiliation": {
      "@type": "CollegeOrUniversity",
      "name": "Indian Institute of Technology Indore",
      "url": "https://www.iiti.ac.in/"
    },
    "email": email,
    "telephone": f.phoneExt ? `+91-731-660-${f.phoneExt}` : undefined,
    "workLocation": f.chamber ? {
      "@type": "Place",
      "name": `Chamber ${f.chamber}, POD 1D, DAASE, IIT Indore, Khandwa Road, Simrol, Indore 453552, Madhya Pradesh, India`
    } : undefined,
    "url": `https://daase.iiti.ac.in/#person-${slug}`,
    "sameAs": sameAs,
    "knowsAbout": f.research ? f.research.split(',').map(s => s.trim()) : ["Astronomy", "Astrophysics", "Space Engineering"]
  };
});

// 2. Visiting Faculty
const visitingEntities = fb.VISITING_FB.map(f => {
  const slug = cleanSlug(f.name);
  return {
    "@type": "Person",
    "@id": `https://daase.iiti.ac.in/#person-${slug}`,
    "name": f.name,
    "jobTitle": f.designation || "Visiting Professor",
    "worksFor": {
      "@type": "EducationalOrganization",
      "name": "Department of Astronomy, Astrophysics and Space Engineering (DAASE), IIT Indore",
      "url": "https://daase.iiti.ac.in/"
    },
    "url": `https://daase.iiti.ac.in/#person-${slug}`,
    "knowsAbout": f.research ? f.research.split(',').map(s => s.trim()) : ["Space Engineering", "Astrophysics"]
  };
});

// 3. Staff Members
const staffEntities = fb.STAFF_FB.map(s => {
  const slug = cleanSlug(s.name);
  const email = s.email ? (s.email.includes('@') ? s.email : `${s.email}@iiti.ac.in`) : undefined;
  return {
    "@type": "Person",
    "@id": `https://daase.iiti.ac.in/#person-${slug}`,
    "name": s.name,
    "jobTitle": s.designation || "Staff Member",
    "worksFor": {
      "@type": "EducationalOrganization",
      "name": "Department of Astronomy, Astrophysics and Space Engineering (DAASE), IIT Indore",
      "url": "https://daase.iiti.ac.in/"
    },
    "email": email,
    "url": `https://daase.iiti.ac.in/#person-${slug}`
  };
});

// 4. PhD Scholars
const phdEntities = [];
for (const [batch, list] of Object.entries(fb.PHD_FB)) {
  for (const s of list) {
    const slug = cleanSlug(s.name);
    phdEntities.push({
      "@type": "Person",
      "@id": `https://daase.iiti.ac.in/#person-${slug}`,
      "name": s.name,
      "jobTitle": `PhD Research Scholar (${batch})`,
      "worksFor": {
        "@type": "EducationalOrganization",
        "name": "Department of Astronomy, Astrophysics and Space Engineering (DAASE), IIT Indore",
        "url": "https://daase.iiti.ac.in/"
      },
      "sponsor": s.supervisor ? {
        "@type": "Person",
        "name": s.supervisor
      } : undefined,
      "knowsAbout": s.research || s.research_interests || "Astronomy, Astrophysics and Space Engineering",
      "url": `https://daase.iiti.ac.in/#person-${slug}`
    });
  }
}

// 5. Academic Programs
const academicPrograms = [
  {
    "@type": "EducationalOccupationalProgram",
    "name": "B.Tech in Space Sciences & Engineering",
    "description": "India first B.Tech program in Space Science & Engineering offering interdisciplinary training in astrophysics, spaceflight dynamics, satellite communications, CubeSat design, and payload instrumentation.",
    "educationalCredentialAwarded": "Bachelor of Technology (B.Tech)",
    "timeToComplete": "P4Y",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "DAASE, IIT Indore",
      "url": "https://daase.iiti.ac.in/"
    }
  },
  {
    "@type": "EducationalOccupationalProgram",
    "name": "M.Tech in Space Engineering",
    "description": "Postgraduate program focused on spacecraft systems, CubeSat payloads, navigation, atmospheric instrumentation, and space propulsion.",
    "educationalCredentialAwarded": "Master of Technology (M.Tech)",
    "timeToComplete": "P2Y",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "DAASE, IIT Indore",
      "url": "https://daase.iiti.ac.in/"
    }
  },
  {
    "@type": "EducationalOccupationalProgram",
    "name": "M.Sc. in Astronomy",
    "description": "Rigorous postgraduate program in observational astronomy, theoretical astrophysics, cosmology, and planetary science.",
    "educationalCredentialAwarded": "Master of Science (M.Sc.)",
    "timeToComplete": "P2Y",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "DAASE, IIT Indore",
      "url": "https://daase.iiti.ac.in/"
    }
  },
  {
    "@type": "EducationalOccupationalProgram",
    "name": "M.S. (Research) in Astronomy, Astrophysics & Space Engineering",
    "description": "Research-intensive Master of Science program focusing on advanced computational astrophysics, radio interferometry, and satellite engineering.",
    "educationalCredentialAwarded": "Master of Science (Research)",
    "timeToComplete": "P2Y",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "DAASE, IIT Indore",
      "url": "https://daase.iiti.ac.in/"
    }
  },
  {
    "@type": "EducationalOccupationalProgram",
    "name": "Ph.D. in Astronomy, Astrophysics & Space Engineering",
    "description": "Doctoral research program offering advanced research in radio astronomy, pulsar physics, heliophysics, compact objects, gravitational waves, CubeSats, and remote sensing.",
    "educationalCredentialAwarded": "Doctor of Philosophy (Ph.D.)",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "DAASE, IIT Indore",
      "url": "https://daase.iiti.ac.in/"
    }
  }
];

// 6. Job Postings / Opportunities
const jobPostings = [
  {
    "@type": "JobPosting",
    "title": "Ph.D. Admissions in Astronomy, Astrophysics & Space Engineering",
    "description": "Applications are invited for regular, sponsored, and fellowship doctoral positions at DAASE, IIT Indore. Research areas include radio astronomy, cosmology, heliophysics, remote sensing, and CubeSat engineering.",
    "hiringOrganization": {
      "@type": "EducationalOrganization",
      "name": "Department of Astronomy, Astrophysics and Space Engineering (DAASE), IIT Indore",
      "url": "https://daase.iiti.ac.in/"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Khandwa Road, Simrol",
        "addressLocality": "Indore",
        "addressRegion": "Madhya Pradesh",
        "postalCode": "453552",
        "addressCountry": "IN"
      }
    },
    "employmentType": "FULL_TIME",
    "validThrough": "2026-12-31"
  },
  {
    "@type": "JobPosting",
    "title": "Junior Research Fellowships (JRF) & Project Positions",
    "description": "Opportunities for research scholars and project associates to work on funded research grants from ISRO, DST-SERB, and international collaborations.",
    "hiringOrganization": {
      "@type": "EducationalOrganization",
      "name": "DAASE, IIT Indore",
      "url": "https://daase.iiti.ac.in/"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Indore",
        "addressRegion": "Madhya Pradesh",
        "postalCode": "453552",
        "addressCountry": "IN"
      }
    },
    "employmentType": "CONTRACTOR",
    "validThrough": "2026-12-31"
  },
  {
    "@type": "JobPosting",
    "title": "Faculty Recruitment — Assistant Professor, Associate Professor, Professor",
    "description": "DAASE, IIT Indore invites rolling faculty applications from distinguished researchers worldwide in astronomy, astrophysics, space engineering, atmospheric science, and satellite technology.",
    "hiringOrganization": {
      "@type": "EducationalOrganization",
      "name": "DAASE, IIT Indore",
      "url": "https://daase.iiti.ac.in/"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Indore",
        "addressRegion": "Madhya Pradesh",
        "postalCode": "453552",
        "addressCountry": "IN"
      }
    },
    "employmentType": "FULL_TIME",
    "validThrough": "2026-12-31"
  }
];

const comprehensiveJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    ...facultyEntities,
    ...visitingEntities,
    ...staffEntities,
    ...phdEntities,
    ...academicPrograms,
    ...jobPostings
  ]
};

// 7. Generate Semantic Crawlable Directory HTML
let htmlDirectory = `
    <!-- ═══════════════════════════════════════════════════════════
         DAASE SEARCH ENGINE OPTIMIZATION & ACCESSIBILITY DIRECTORY
         Pre-rendered semantic directory providing instant indexing for
         students, faculty, staff, facilities, research, and opportunities.
    ═══════════════════════════════════════════════════════════ -->
    <section id="daase-crawler-index" class="seo-crawler-index" aria-label="Department Directory and Academic Index">
      <header>
        <h1>Department of Astronomy, Astrophysics and Space Engineering (DAASE) — IIT Indore</h1>
        <p>Official Institutional Directory of the Indian Institute of Technology Indore, Simrol, Khandwa Road, Indore 453552, Madhya Pradesh, India.</p>
        <p>Explore faculty profiles, non-teaching administrative staff, doctoral research scholars (PhD), postgraduate and undergraduate students, state-of-the-art facilities, and admissions opportunities.</p>
      </header>

      <!-- ── FACULTY DIRECTORY ── -->
      <article id="seo-faculty-directory">
        <h2>Faculty Members — DAASE, IIT Indore</h2>
        <div class="seo-faculty-list">`;

for (const f of fb.FACULTY_FB) {
  const slug = cleanSlug(f.name);
  const email = f.email ? (f.email.includes('@') ? f.email : `${f.email}@iiti.ac.in`) : 'aase-office@iiti.ac.in';
  htmlDirectory += `
          <div class="seo-person-entry" id="seo-person-${slug}">
            <h3><a href="https://daase.iiti.ac.in/#person-${slug}">${f.name}</a></h3>
            <p><strong>Designation:</strong> ${f.designation || 'Faculty'}${f.isHOD ? ' (Head of Department)' : ''}</p>
            <p><strong>Department:</strong> Department of Astronomy, Astrophysics and Space Engineering (DAASE), IIT Indore</p>
            ${f.chamber ? `<p><strong>Office / Chamber:</strong> ${f.chamber}, POD 1D, IIT Indore</p>` : ''}
            ${f.phoneExt ? `<p><strong>Telephone Extension:</strong> +91-731-660-${f.phoneExt}</p>` : ''}
            <p><strong>Email Address:</strong> <a href="mailto:${email}">${email}</a></p>
            ${f.research ? `<p><strong>Research Interests &amp; Specialization:</strong> ${f.research}</p>` : ''}
            ${f.url ? `<p><strong>Personal Institutional Webpage:</strong> <a href="${f.url}" rel="nofollow">${f.url}</a></p>` : ''}
          </div>`;
}

for (const f of fb.VISITING_FB) {
  const slug = cleanSlug(f.name);
  htmlDirectory += `
          <div class="seo-person-entry" id="seo-person-${slug}">
            <h3><a href="https://daase.iiti.ac.in/#person-${slug}">${f.name}</a></h3>
            <p><strong>Designation:</strong> ${f.designation || 'Visiting Professor'}</p>
            <p><strong>Department:</strong> DAASE, IIT Indore</p>
            ${f.research ? `<p><strong>Specialization:</strong> ${f.research}</p>` : ''}
          </div>`;
}

htmlDirectory += `
        </div>
      </article>

      <!-- ── NON-TEACHING & ADMINISTRATIVE STAFF DIRECTORY ── -->
      <article id="seo-staff-directory">
        <h2>Non-Teaching &amp; Administrative Staff — DAASE, IIT Indore</h2>
        <div class="seo-staff-list">`;

for (const s of fb.STAFF_FB) {
  const slug = cleanSlug(s.name);
  const email = s.email ? (s.email.includes('@') ? s.email : `${s.email}@iiti.ac.in`) : 'aase-office@iiti.ac.in';
  htmlDirectory += `
          <div class="seo-person-entry" id="seo-person-${slug}">
            <h3><a href="https://daase.iiti.ac.in/#person-${slug}">${s.name}</a></h3>
            <p><strong>Role &amp; Designation:</strong> ${s.designation || 'Administrative Staff'}</p>
            <p><strong>Department:</strong> Department of Astronomy, Astrophysics and Space Engineering (DAASE), IIT Indore</p>
            <p><strong>Contact Email:</strong> <a href="mailto:${email}">${email}</a></p>
          </div>`;
}

htmlDirectory += `
        </div>
      </article>

      <!-- ── DOCTORAL RESEARCH SCHOLARS (PHD) ── -->
      <article id="seo-phd-directory">
        <h2>Doctoral Research Scholars (Ph.D.) — DAASE, IIT Indore</h2>`;

for (const [batch, list] of Object.entries(fb.PHD_FB)) {
  htmlDirectory += `
        <div class="seo-batch-group">
          <h3>${batch} (${list.length} Scholars)</h3>
          <ul>`;
  for (const s of list) {
    const slug = cleanSlug(s.name);
    htmlDirectory += `
            <li class="seo-student-entry" id="seo-person-${slug}">
              <strong><a href="https://daase.iiti.ac.in/#person-${slug}">${s.name}</a></strong>
              — Ph.D. Scholar, DAASE, IIT Indore.
              ${s.supervisor ? `<span>Supervisor: <em>${s.supervisor}</em>.</span>` : ''}
              ${(s.research || s.research_interests) ? `<span>Research: ${s.research || s.research_interests}.</span>` : ''}
            </li>`;
  }
  htmlDirectory += `
          </ul>
        </div>`;
}

htmlDirectory += `
      </article>

      <!-- ── POSTGRADUATE STUDENTS (M.TECH, M.SC, MS) ── -->
      <article id="seo-pg-directory">
        <h2>Postgraduate Students (M.Tech, M.Sc., M.S. Research) — DAASE, IIT Indore</h2>`;

for (const [batch, list] of Object.entries(fb.PG_FB)) {
  htmlDirectory += `
        <div class="seo-batch-group">
          <h3>${batch} (${list.length} Students)</h3>
          <ul>`;
  for (const s of list) {
    const slug = cleanSlug(s.name);
    htmlDirectory += `
            <li class="seo-student-entry" id="seo-person-${slug}">
              <strong><a href="https://daase.iiti.ac.in/#person-${slug}">${s.name}</a></strong>
              ${s.email ? `(${s.email}@iiti.ac.in)` : ''}
              ${s.supervisor ? `— Supervisor: ${s.supervisor}` : ''}
            </li>`;
  }
  htmlDirectory += `
          </ul>
        </div>`;
}

htmlDirectory += `
      </article>

      <!-- ── UNDERGRADUATE STUDENTS (B.TECH) ── -->
      <article id="seo-ug-directory">
        <h2>Undergraduate Students (B.Tech Space Sciences &amp; Engineering) — DAASE, IIT Indore</h2>`;

for (const [batch, list] of Object.entries(fb.UG_FB)) {
  htmlDirectory += `
        <div class="seo-batch-group">
          <h3>${batch} (${list.length} Students)</h3>
          <ul>`;
  for (const s of list) {
    const slug = cleanSlug(s.name);
    htmlDirectory += `
            <li class="seo-student-entry" id="seo-person-${slug}">
              <strong><a href="https://daase.iiti.ac.in/#person-${slug}">${s.name}</a></strong>
              ${s.email ? `(${s.email}@iiti.ac.in)` : ''}
            </li>`;
  }
  htmlDirectory += `
          </ul>
        </div>`;
}

htmlDirectory += `
      </article>

      <!-- ── RESEARCH AREAS & PUBLICATIONS ── -->
      <article id="seo-research-directory">
        <h2>Research Areas &amp; Specializations — DAASE, IIT Indore</h2>`;

for (const area of fb.RESEARCH_AREAS) {
  htmlDirectory += `
        <div class="seo-research-area">
          <h3><a href="https://daase.iiti.ac.in/#research-detail/${area.id}">${area.title}</a></h3>
          <p>${area.desc}</p>
          <p><strong>Contributing Faculty:</strong> ${area.faculty ? area.faculty.join(', ') : 'DAASE Faculty'}</p>
        </div>`;
}

htmlDirectory += `
      </article>

      <!-- ── RESEARCH FACILITIES & LABORATORIES ── -->
      <article id="seo-facilities-directory">
        <h2>Research Facilities, Observatories &amp; Laboratories — DAASE, IIT Indore</h2>
        <ul class="seo-facilities-list">`;

for (const fac of fb.FACILITIES_FB) {
  htmlDirectory += `
          <li><strong>${fac.name}</strong> — Advanced research laboratory and instrumentation facility at DAASE, IIT Indore.</li>`;
}

htmlDirectory += `
        </ul>
      </article>

      <!-- ── OPPORTUNITIES & ADMISSIONS ── -->
      <article id="seo-opportunities-directory">
        <h2>Academic Admissions &amp; Career Opportunities — DAASE, IIT Indore</h2>
        <div>
          <h3>Ph.D. Admissions in Space Sciences, Astronomy &amp; Engineering</h3>
          <p>DAASE IIT Indore invites applications for Ph.D. positions in theoretical, observational, and computational astrophysics, space engineering, CubeSat systems, and remote sensing. Apply via IIT Indore Academic Portal.</p>
        </div>
        <div>
          <h3>Junior Research Fellow (JRF) Positions &amp; Project Associates</h3>
          <p>Sponsored research positions available under funded grants from ISRO, DST-SERB, and international consortia.</p>
        </div>
        <div>
          <h3>Faculty Positions (Assistant Professor, Associate Professor, Professor)</h3>
          <p>Rolling advertisements for faculty positions in astronomy, astrophysics, spacecraft systems, and atmospheric sciences.</p>
        </div>
        <div>
          <h3>Internships &amp; Student Research</h3>
          <p>Summer and winter research internships for undergraduate and postgraduate students from institutions across India and globally.</p>
        </div>
      </article>
    </section>

    <!-- Fallback for JavaScript-disabled crawlers -->
    <noscript>
      <div style="padding:20px;background:#050c1a;color:#fff;">
        <h2>Department of Astronomy, Astrophysics and Space Engineering (DAASE), IIT Indore</h2>
        <p>Please enable JavaScript to experience the full interactive platform of DAASE, IIT Indore. Browse our faculty, research scholars, staff, academic programs, and opportunities above.</p>
      </div>
    </noscript>
`;

// Helper to inject into an HTML string
function injectIntoHtml(rawHtml) {
  let modified = rawHtml;

  // 1. Remove existing comprehensive graph script if present
  modified = modified.replace(/<script type="application\/ld\+json" id="daase-kg-graph">[\s\S]*?<\/script>\n?/g, '');
  // 2. Remove existing crawler directory if present
  modified = modified.replace(/<!-- ═════[\s\S]*?<\/section>\n?/g, '');
  modified = modified.replace(/<noscript>[\s\S]*?<\/noscript>\n?/g, '');

  // 3. Inject new JSON-LD into <head>
  const jsonLdTag = `
    <!-- 5. Comprehensive Department Knowledge Graph: Faculty, Staff, Scholars, Programs, Opportunities -->
    <script type="application/ld+json" id="daase-kg-graph">
${JSON.stringify(comprehensiveJsonLd, null, 2)}
    </script>
`;
  modified = modified.replace('</head>', `${jsonLdTag}\n  </head>`);

  // 4. Inject semantic HTML directory right after <body>
  modified = modified.replace('<body>', `<body>\n${htmlDirectory}`);

  return modified;
}

// Update daase-react/index.html
const reactIndexPath = path.resolve(reactDir, 'index.html');
const reactIndexHtml = fs.readFileSync(reactIndexPath, 'utf8');
const updatedReactIndex = injectIntoHtml(reactIndexHtml);
fs.writeFileSync(reactIndexPath, updatedReactIndex, 'utf8');
console.log('Successfully injected SEO schema and crawlable directory into daase-react/index.html');

// Generate XML Sitemap with Google Image extensions
console.log('Generating high-authority XML Sitemap with image indexes...');
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://daase.iiti.ac.in/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://daase.iiti.ac.in/images/IITI_Logo.svg</image:loc>
      <image:title>DAASE IIT Indore Official Logo</image:title>
    </image:image>
    <image:image>
      <image:loc>https://daase.iiti.ac.in/images/daase.png</image:loc>
      <image:title>Department of Astronomy, Astrophysics and Space Engineering Emblem</image:title>
    </image:image>
    <image:image>
      <image:loc>https://daase.iiti.ac.in/people_images/Staff/Swapnil_Dasharath_Sankhe,_Senior_Assistant_(HoD_Staff).jpg</image:loc>
      <image:title>Swapnil Dasharath Sankhe - Senior Assistant, HoD Office, DAASE, IIT Indore</image:title>
    </image:image>
`;

for (const f of fb.FACULTY_FB) {
  if (f.photo) {
    const photoUrl = f.photo.startsWith('./') ? `https://daase.iiti.ac.in/${f.photo.replace(/^\.\//, '')}` : f.photo;
    sitemapXml += `    <image:image>
      <image:loc>${photoUrl}</image:loc>
      <image:title>${f.name} - ${f.designation || 'Faculty'}, DAASE, IIT Indore</image:title>
    </image:image>\n`;
  }
}

sitemapXml += `  </url>
</urlset>
`;

fs.writeFileSync(path.resolve(reactDir, 'public/sitemap.xml'), sitemapXml, 'utf8');
fs.writeFileSync(path.resolve(staticDir, 'sitemap.xml'), sitemapXml, 'utf8');
console.log('Successfully generated sitemap.xml in both daase-react/public and daase-static-website.');
