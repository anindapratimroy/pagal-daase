/**
 * DAASE Dynamic SEO & Structured Data Knowledge Graph Engine
 * 
 * Automatically synchronizes Schema.org JSON-LD, OpenGraph, Twitter Cards,
 * and semantic crawlable DOM indexes directly with live data from Google Sheets.
 * 
 * When new faculty, PhD scholars, staff, events, or publications are added
 * to the Google Sheet, this engine automatically hydrates the metadata,
 * ensuring seamless search engine ranking (#1 on Google) without code changes.
 */

import {
  FACULTY_FB, VISITING_FB, STAFF_FB, PHD_FB, PG_FB, UG_FB,
  RESEARCH_AREAS, FACILITIES_FB
} from '../data/fallback';
import { getPhotoCandidates, DEFAULT_AVATAR } from './photoResolver';

const BASE_URL = 'https://daase.iiti.ac.in';
const ORG_NAME = 'Department of Astronomy, Astrophysics and Space Engineering (DAASE), IIT Indore';
const INST_NAME = 'Indian Institute of Technology Indore';

export const cleanSlug = (name) =>
  (name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Flatten array or grouped object into a single array
function flattenPeople(source) {
  if (!source) return [];
  if (Array.isArray(source)) return source;
  if (typeof source === 'object') {
    return Object.values(source).flat().filter(Boolean);
  }
  return [];
}

/**
 * Normalizes photo URL to an absolute URL for Schema.org and OpenGraph
 */
function toAbsoluteImageUrl(relativeOrAbsolute) {
  if (!relativeOrAbsolute || relativeOrAbsolute === DEFAULT_AVATAR) {
    return `${BASE_URL}/images/og-cover.png`;
  }
  if (relativeOrAbsolute.startsWith('http://') || relativeOrAbsolute.startsWith('https://')) {
    return relativeOrAbsolute;
  }
  const clean = relativeOrAbsolute.replace(/^\.?\//, '');
  return `${BASE_URL}/${clean}`;
}

/**
 * Extract all active people from current live data (or fallbacks)
 */
export function extractAllPeople(data) {
  const faculty = (data?.faculty?.length ? data.faculty : FACULTY_FB) || [];
  const visiting = (data?.visiting?.length ? data.visiting : VISITING_FB) || [];
  const staff = (data?.staff ? (Array.isArray(data.staff) ? data.staff : Object.values(data.staff).flat()) : STAFF_FB) || [];
  const phd = (data?.phd ? flattenPeople(data.phd) : flattenPeople(PHD_FB)) || [];
  const pg = (data?.pg ? flattenPeople(data.pg) : flattenPeople(PG_FB)) || [];
  const ug = (data?.ug ? flattenPeople(data.ug) : flattenPeople(UG_FB)) || [];

  const mapPerson = (p, role, category) => {
    const slug = cleanSlug(p.name);
    const candidates = getPhotoCandidates(p.name, category, p.photo, p.email);
    const photoUrl = candidates?.[0] ? toAbsoluteImageUrl(candidates[0]) : `${BASE_URL}/images/og-cover.png`;
    const email = p.email ? (p.email.includes('@') ? p.email : `${p.email}@iiti.ac.in`) : undefined;

    return {
      raw: p,
      slug,
      name: p.name,
      jobTitle: p.designation || role,
      category,
      email,
      phone: p.phoneExt ? `+91-731-660-${p.phoneExt}` : undefined,
      chamber: p.chamber,
      research: p.research || p.research_interests,
      supervisor: p.supervisor,
      photoUrl,
      url: `${BASE_URL}/#person-${slug}`,
      externalUrl: p.url,
      batch: p.batch
    };
  };

  return [
    ...faculty.map(f => mapPerson(f, f.designation || 'Faculty Member', 'faculty')),
    ...visiting.map(v => mapPerson(v, v.designation || 'Visiting Professor', 'visiting')),
    ...staff.map(s => mapPerson(s, s.designation || 'Staff Member', 'staff')),
    ...phd.map(s => mapPerson(s, 'PhD Research Scholar', 'phd')),
    ...pg.map(s => mapPerson(s, 'Postgraduate Student', 'pg')),
    ...ug.map(s => mapPerson(s, 'Undergraduate Student', 'ug')),
  ];
}

/**
 * Builds the comprehensive Schema.org JSON-LD Graph dynamically
 */
export function buildSchemaGraph(data, currentPerson = null) {
  const people = extractAllPeople(data);

  // 1. Institution Entity
  const institutionEntity = {
    "@type": "CollegeOrUniversity",
    "@id": "https://www.iiti.ac.in/#organization",
    "name": INST_NAME,
    "alternateName": "IIT Indore",
    "url": "https://www.iiti.ac.in/",
    "logo": "https://www.iiti.ac.in/style/images/logo.png"
  };

  // 2. Department Entity
  const departmentEntity = {
    "@type": "EducationalOrganization",
    "@id": `${BASE_URL}/#department`,
    "name": ORG_NAME,
    "alternateName": "DAASE IIT Indore",
    "parentOrganization": { "@id": "https://www.iiti.ac.in/#organization" },
    "url": `${BASE_URL}/`,
    "logo": `${BASE_URL}/images/daase.png`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Khandwa Road, Simrol",
      "addressLocality": "Indore",
      "addressRegion": "Madhya Pradesh",
      "postalCode": "453552",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-731-660-3571",
      "contactType": "academic affairs office",
      "email": "aase-office@iiti.ac.in"
    }
  };

  // 3. People Entities
  const personEntities = people.map(p => {
    const sameAs = [];
    if (p.externalUrl) sameAs.push(p.externalUrl);

    const entity = {
      "@type": "Person",
      "@id": p.url,
      "name": p.name,
      "jobTitle": p.jobTitle,
      "worksFor": { "@id": `${BASE_URL}/#department` },
      "affiliation": { "@id": "https://www.iiti.ac.in/#organization" },
      "url": p.url,
      "image": p.photoUrl
    };

    if (p.email) entity.email = p.email;
    if (p.phone) entity.telephone = p.phone;
    if (p.chamber) {
      entity.workLocation = {
        "@type": "Place",
        "name": `Chamber ${p.chamber}, POD 1D, DAASE, IIT Indore, Simrol, Indore 453552, India`
      };
    }
    if (p.supervisor) {
      entity.sponsor = {
        "@type": "Person",
        "name": p.supervisor
      };
    }
    if (p.research) {
      entity.knowsAbout = typeof p.research === 'string'
        ? p.research.split(',').map(s => s.trim())
        : p.research;
    }
    if (sameAs.length > 0) {
      entity.sameAs = sameAs;
    }

    return entity;
  });

  // 4. Academic Programs
  const programEntities = [
    {
      "@type": "EducationalOccupationalProgram",
      "name": "B.Tech in Space Sciences & Engineering",
      "description": "India's first B.Tech program in Space Science & Engineering offering training in astrophysics, spaceflight dynamics, satellite communications, and CubeSat payloads.",
      "educationalCredentialAwarded": "Bachelor of Technology (B.Tech)",
      "timeToComplete": "P4Y",
      "provider": { "@id": `${BASE_URL}/#department` }
    },
    {
      "@type": "EducationalOccupationalProgram",
      "name": "M.Tech in Space Engineering",
      "description": "Postgraduate program focused on spacecraft systems, CubeSat payloads, navigation, atmospheric instrumentation, and space propulsion.",
      "educationalCredentialAwarded": "Master of Technology (M.Tech)",
      "timeToComplete": "P2Y",
      "provider": { "@id": `${BASE_URL}/#department` }
    },
    {
      "@type": "EducationalOccupationalProgram",
      "name": "M.Sc. in Astronomy",
      "description": "Postgraduate degree in observational astronomy, theoretical astrophysics, cosmology, and instrumentation.",
      "educationalCredentialAwarded": "Master of Science (M.Sc.)",
      "timeToComplete": "P2Y",
      "provider": { "@id": `${BASE_URL}/#department` }
    },
    {
      "@type": "EducationalOccupationalProgram",
      "name": "Ph.D. in Astronomy, Astrophysics & Space Engineering",
      "description": "Doctoral research program offering advanced research across radio astronomy, high-energy astrophysics, heliophysics, CubeSats, and remote sensing.",
      "educationalCredentialAwarded": "Doctor of Philosophy (Ph.D.)",
      "provider": { "@id": `${BASE_URL}/#department` }
    }
  ];

  // 5. Active Publications
  const rawPubs = data?.publications || [];
  const activePubs = Array.isArray(rawPubs)
    ? rawPubs.filter(p => (p.status === 'active' || p.stage === 'active' || !p.status))
    : [];
  const pubEntities = activePubs.slice(0, 15).map(p => ({
    "@type": "ScholarlyArticle",
    "headline": p.citation || p.text || 'DAASE Research Publication',
    "url": p.url || undefined,
    "datePublished": p.date || undefined,
    "publisher": { "@id": `${BASE_URL}/#department` }
  }));

  // 6. Dynamic Events
  const rawEvents = data?.events || [];
  const eventEntities = (Array.isArray(rawEvents) ? rawEvents : []).slice(0, 10).map(ev => ({
    "@type": "Event",
    "name": ev.title || ev.name || 'DAASE Event',
    "startDate": ev.date || undefined,
    "location": {
      "@type": "Place",
      "name": ev.venue || 'DAASE, IIT Indore, Simrol, Indore 453552'
    },
    "description": ev.desc || ev.description || 'Department event at DAASE, IIT Indore.',
    "organizer": { "@id": `${BASE_URL}/#department` }
  }));

  const graph = [
    institutionEntity,
    departmentEntity,
    ...programEntities,
    ...personEntities,
    ...pubEntities,
    ...eventEntities
  ];

  // If a specific person is actively targeted in the URL, add a ProfilePage mainEntity
  if (currentPerson) {
    graph.push({
      "@type": "ProfilePage",
      "@id": currentPerson.url,
      "url": currentPerson.url,
      "name": `${currentPerson.name} — ${currentPerson.jobTitle} | DAASE, IIT Indore`,
      "description": `Academic and research profile of ${currentPerson.name} at DAASE, IIT Indore.`,
      "mainEntity": { "@id": currentPerson.url }
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}

/**
 * Updates or creates a tag in <head>
 */
function setMetaTag(attrName, attrVal, content) {
  let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrVal);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonicalUrl(url) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

/**
 * Dynamically updates the hidden semantic crawlable directory in DOM
 * so non-JS & JS crawlers alike see newly added people without rebuild.
 */
function syncDomCrawlerDirectory(data, people) {
  const crawlerSection = document.getElementById('daase-crawler-index');
  if (!crawlerSection) return;

  // Sync Faculty
  const facListEl = crawlerSection.querySelector('.seo-faculty-list');
  if (facListEl) {
    const facultyPeople = people.filter(p => p.category === 'faculty' || p.category === 'visiting');
    for (const f of facultyPeople) {
      if (!document.getElementById(`seo-person-${f.slug}`)) {
        const div = document.createElement('div');
        div.className = 'seo-person-entry';
        div.id = `seo-person-${f.slug}`;
        div.innerHTML = `
          <h3><a href="${f.url}">${f.name}</a></h3>
          <p><strong>Designation:</strong> ${f.jobTitle}</p>
          <p><strong>Department:</strong> Department of Astronomy, Astrophysics and Space Engineering (DAASE), IIT Indore</p>
          ${f.chamber ? `<p><strong>Office / Chamber:</strong> ${f.chamber}, POD 1D, IIT Indore</p>` : ''}
          ${f.phone ? `<p><strong>Telephone:</strong> ${f.phone}</p>` : ''}
          ${f.email ? `<p><strong>Email Address:</strong> <a href="mailto:${f.email}">${f.email}</a></p>` : ''}
          ${f.research ? `<p><strong>Research:</strong> ${f.research}</p>` : ''}
        `;
        facListEl.appendChild(div);
      }
    }
  }

  // Sync PhD Scholars
  const phdArticle = crawlerSection.querySelector('#seo-phd-directory');
  if (phdArticle) {
    const phdPeople = people.filter(p => p.category === 'phd');
    let dynamicBatch = phdArticle.querySelector('.seo-dynamic-batch');
    if (!dynamicBatch) {
      dynamicBatch = document.createElement('div');
      dynamicBatch.className = 'seo-batch-group seo-dynamic-batch';
      dynamicBatch.innerHTML = `<h3>Updated Research Scholars</h3><ul class="seo-dynamic-phd-list"></ul>`;
      phdArticle.appendChild(dynamicBatch);
    }
    const ul = dynamicBatch.querySelector('.seo-dynamic-phd-list');
    for (const s of phdPeople) {
      if (!document.getElementById(`seo-person-${s.slug}`)) {
        const li = document.createElement('li');
        li.className = 'seo-student-entry';
        li.id = `seo-person-${s.slug}`;
        li.innerHTML = `
          <strong><a href="${s.url}">${s.name}</a></strong>
          — Ph.D. Scholar, DAASE, IIT Indore.
          ${s.supervisor ? `<span>Supervisor: <em>${s.supervisor}</em>.</span>` : ''}
          ${s.research ? `<span>Research: ${s.research}.</span>` : ''}
        `;
        ul.appendChild(li);
      }
    }
  }
}

/**
 * Main Dynamic SEO Hydration Function
 * Called whenever data changes from Sheets or route/hash changes.
 */
export function updateDynamicSEO(data, view = 'home', peopleTab = 'faculty', hash = '') {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const people = extractAllPeople(data);
  const cleanHash = (hash || window.location.hash || '').replace('#', '');

  let pageTitle = 'DAASE — Dept. of Astronomy, Astrophysics & Space Engineering | IIT Indore';
  let pageDesc = "The Department of Astronomy, Astrophysics and Space Engineering (DAASE) at IIT Indore is India's premier center for space science research. Explore B.Tech, M.Tech, M.Sc, PhD programs, faculty, and research.";
  let pageUrl = `${BASE_URL}/`;
  let pageImage = `${BASE_URL}/images/og-cover.png`;
  let activePerson = null;

  // 1. Direct Person Deep-Link Route (e.g. #person-aninda-pratim-roy)
  if (cleanHash.startsWith('person-')) {
    const slug = cleanHash.replace(/^person-/, '');
    activePerson = people.find(p => p.slug === slug);

    if (activePerson) {
      const roleStr = activePerson.jobTitle || 'Researcher';
      pageTitle = `${activePerson.name} | ${roleStr} | DAASE, IIT Indore`;
      const researchNote = activePerson.research ? ` Specializing in ${activePerson.research}.` : '';
      const supNote = activePerson.supervisor ? ` Under supervision of ${activePerson.supervisor}.` : '';
      pageDesc = `Official profile of ${activePerson.name}, ${roleStr} in the Department of Astronomy, Astrophysics and Space Engineering (DAASE) at the Indian Institute of Technology Indore (IIT Indore).${researchNote}${supNote}`;
      pageUrl = activePerson.url;
      if (activePerson.photoUrl && !activePerson.photoUrl.includes('default-avatar')) {
        pageImage = activePerson.photoUrl;
      }
    }
  }
  // 2. Section Views
  else if (view === 'people') {
    const PEOPLE_TITLES = {
      'faculty': 'Faculty Directory | DAASE, IIT Indore',
      'staff': 'Administrative & Technical Staff | DAASE, IIT Indore',
      'phd': 'Doctoral Research Scholars (Ph.D.) | DAASE, IIT Indore',
      'pg': 'Postgraduate Students (M.Tech, M.Sc, MS) | DAASE, IIT Indore',
      'ug': 'Undergraduate Students (B.Tech Space Sciences) | DAASE, IIT Indore',
      'alumni': 'Alumni Directory | DAASE, IIT Indore',
    };
    pageTitle = PEOPLE_TITLES[peopleTab] || 'People Directory | DAASE, IIT Indore';
    pageDesc = `Explore faculty, research scholars, students, and staff of the Department of Astronomy, Astrophysics and Space Engineering (DAASE) at IIT Indore.`;
    pageUrl = `${BASE_URL}/#people-${peopleTab}`;
  } else if (view === 'research' || cleanHash === 'publications') {
    pageTitle = 'Research Areas & Publications | DAASE, IIT Indore';
    pageDesc = 'Discover cutting-edge research in radio astronomy, planetary science, space weather, space engineering, CubeSats, and recent peer-reviewed publications from DAASE, IIT Indore.';
    pageUrl = `${BASE_URL}/#research`;
  } else if (view === 'programs') {
    pageTitle = 'Academic Programs (B.Tech, M.Tech, M.Sc, PhD) | DAASE, IIT Indore';
    pageDesc = "India's premier academic degrees in space engineering and astrophysics: B.Tech Space Sciences & Engineering, M.Tech Space Engineering, M.Sc Astronomy, and PhD research at IIT Indore.";
    pageUrl = `${BASE_URL}/#programs`;
  } else if (view === 'facilities') {
    pageTitle = 'Research Facilities & Observatories | DAASE, IIT Indore';
    pageDesc = 'Advanced radio telescopes, optical observatories, satellite tracking ground stations, and cleanroom payload labs at DAASE, IIT Indore.';
    pageUrl = `${BASE_URL}/#facilities`;
  } else if (view === 'opportunities') {
    pageTitle = 'Admissions & Career Opportunities (PhD, JRF, Faculty) | DAASE, IIT Indore';
    pageDesc = 'Ph.D. admissions, Junior Research Fellowships (JRF), postdoctoral fellowships, student internships, and faculty recruitment at DAASE, IIT Indore.';
    pageUrl = `${BASE_URL}/#opportunities`;
  } else if (view === 'events') {
    pageTitle = 'Events, Seminars & Workshops | DAASE, IIT Indore';
    pageDesc = 'Upcoming seminars, national conferences, international symposiums, and public astronomy outreach organized by DAASE IIT Indore.';
    pageUrl = `${BASE_URL}/#events`;
  } else if (view === 'research-detail') {
    pageTitle = 'Research Area Detail | DAASE, IIT Indore';
    pageDesc = 'Detailed overview of specialized research domains at DAASE, IIT Indore.';
    pageUrl = `${BASE_URL}/#${cleanHash}`;
  }

  // Update Page Title
  document.title = pageTitle;

  // Update Meta Description & Keywords
  setMetaTag('name', 'description', pageDesc);
  setMetaTag('name', 'title', pageTitle);

  // Update OpenGraph
  setMetaTag('property', 'og:title', pageTitle);
  setMetaTag('property', 'og:description', pageDesc);
  setMetaTag('property', 'og:url', pageUrl);
  setMetaTag('property', 'og:image', pageImage);
  setMetaTag('property', 'og:image:secure_url', pageImage);

  // Update Twitter Cards
  setMetaTag('name', 'twitter:title', pageTitle);
  setMetaTag('name', 'twitter:description', pageDesc);
  setMetaTag('name', 'twitter:image', pageImage);

  // Update Canonical URL
  setCanonicalUrl(pageUrl);

  // Update Dynamic Schema.org JSON-LD Knowledge Graph
  try {
    const dynamicGraph = buildSchemaGraph(data, activePerson);
    let scriptTag = document.getElementById('daase-kg-graph');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'daase-kg-graph';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(dynamicGraph, null, 2);
  } catch (err) {
    console.warn('[DAASE SEO] Dynamic schema update error:', err);
  }

  // Synchronize DOM crawler directory
  try {
    syncDomCrawlerDirectory(data, people);
  } catch (err) {
    console.warn('[DAASE SEO] DOM crawler sync error:', err);
  }
}
