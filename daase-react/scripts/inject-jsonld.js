import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as fb from '../src/data/fallback.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const reactDir = path.resolve(__dirname, '..');

const cleanSlug = (name) => (name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

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

const indexPath = path.resolve(reactDir, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Safely remove any existing daase-kg-graph
html = html.replace(/\s*<!-- 5\. Comprehensive Department Knowledge Graph[\s\S]*?<\/script>/, '');

// Insert right before </head>
const snippet = `
    <!-- 5. Comprehensive Department Knowledge Graph: Faculty, Staff, Scholars, Programs, Opportunities -->
    <script type="application/ld+json" id="daase-kg-graph">
${JSON.stringify(comprehensiveJsonLd, null, 2)}
    </script>
  </head>`;

html = html.replace('</head>', snippet);
fs.writeFileSync(indexPath, html, 'utf8');
console.log('Cleanly injected JSON-LD schema into daase-react/index.html');
