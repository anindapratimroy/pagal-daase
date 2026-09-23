import { useState, useEffect } from 'react';
import { 
  SHEETS_URL, drivePhotoUrl, FACILITIES_FB,
  PUBLICATIONS_FB, FACULTY_FB, VISITING_FB, PG_FB, UG_FB, 
  ALUMNI_FB, EVENTS_FB, PHD_FB, INTERNS_FB, NEWS_FB, OUTREACH_FB, STAFF_FB
} from '../data/fallback';
import { loadPhotoManifest } from '../utils/photoResolver';
import { formatPublicationDate } from '../utils/dateUtils';

const CACHE_KEY = 'daase_v17_data';
const CACHE_TTL = 5 * 60 * 1000; // 5 min

export function normalizePubUrl(raw) {
  if (!raw) return null;
  let trimmed = String(raw).trim();
  trimmed = trimmed.replace(/^doi:\s*/i, '').trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^10\.\d{4,9}\//i.test(trimmed)) return `https://doi.org/${trimmed}`;
  if (trimmed.startsWith('doi.org/')) return `https://${trimmed}`;
  if (trimmed.startsWith('www.')) return `https://${trimmed}`;
  return null;
}

export function normalizePublication(p) {
  if (!p) return null;
  let rawText = typeof p === 'string' ? p : (p.citation || p.text || p.title || '');
  let rawUrl = typeof p === 'string' ? '' : (p.link || p.url || p.doi || p.Link || p.URL || '');
  if (!rawUrl) {
    const m = rawText.match(/(https?:\/\/[^\s\]\)\,\;]+)/);
    if (m) rawUrl = m[1];
  }
  const url = normalizePubUrl(rawUrl);
  let text = rawText
    .replace(/^\d+[\.\)]\s*/, '')
    .replace(/\[\s*Link:?\s*https?:\/\/[^\]]+\]/gi, '')
    .replace(/\(\s*Link:?\s*https?:\/\/[^\)]+\)/gi, '')
    .replace(/\[\s*https?:\/\/[^\]]+\]/gi, '')
    .replace(/https?:\/\/[^\s]+$/gi, '')
    .trim()
    .replace(/[;,]\s*$/, '')
    .trim();

  const rawStage = (
    (typeof p === 'object' && p !== null)
      ? (p.status || p.stage || p.state || p.Stage || p.Status || p.State || '')
      : ''
  ).toString().toLowerCase().trim();

  const isArchived = rawStage.includes('archive') || Boolean(p && (p.isArchived || p.archived));
  const status = isArchived ? 'archived' : 'active';
  const rawDate = typeof p === 'object' && p !== null ? (p.date || p.Date || '') : '';
  const displayDate = formatPublicationDate(rawDate, text);

  return {
    citation: text,
    text,
    url: url || '',
    date: rawDate,
    displayDate,
    status,
    stage: status
  };
}

function getCached(ignoreTTL = false) {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (!ignoreTTL && (Date.now() - ts > CACHE_TTL)) { localStorage.removeItem(CACHE_KEY); return null; }
    return data;
  } catch { return null; }
}
function setCached(data) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() })); } catch { /* ignore */ }
}

export function useData() {
  // Initialize with cached data immediately so the UI doesn't use hardcoded fallbacks
  // if a cache exists, preventing a visual jump when live data finishes fetching.
  const [data, setData] = useState(() => getCached(false) || null);
  const [loading, setLoading] = useState(true);
  const [, setManifestReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    loadPhotoManifest().then(() => {
      if (mounted) setManifestReady(true);
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      // Fetch fresh data from Sheets directly on load to reflect updates without fail
      const fresh = await fetchFresh();
      if (mounted) {
        if (fresh) {
          // Only update state if data actually changed! This completely prevents
          // the CSS animations (like the News scroller) from resetting abruptly.
          setData(prev => {
            if (JSON.stringify(prev) === JSON.stringify(fresh)) return prev;
            return fresh;
          });
        } else {
          // If network is offline or fetch fails, fall back to cached data
          const cached = getCached(true);
          if (cached) setData(cached);
        }
        setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const resolved = resolveData(data);
  const isCached = Boolean(getCached(false));
  return { ...resolved, loading, isCached };
}

async function fetchFresh() {
  const controller = new AbortController();
  // 20s timeout ensures Google Apps Script cold-start & full Sheet re-reads never get aborted prematurely
  const timeoutId = setTimeout(() => controller.abort(), 20000);
  try {
    // refresh=true forces the Apps Script to bypass any internal CacheService
    const url = SHEETS_URL + (SHEETS_URL.includes('?') ? '&' : '?') + 'refresh=true&t=' + Date.now();
    const res = await fetch(url, { cache: 'no-store', signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    if (json.error) throw new Error(json.error);
    setCached(json);
    return json;
  } catch (e) {
    clearTimeout(timeoutId);
    console.warn('[DAASE] Sheets fetch completed or timed out, using fallback/cache:', e.message);
    return null;
  }
}

export function normalizeStudent(s) {
  if (!s || typeof s !== 'object') return null;
  const name = (s.name || s.Name || s['Student Name'] || s.student_name || '').toString().trim();
  if (!name) return null;
  const email = (s.email || s.Email || s['Email ID'] || s.email_id || s.emailId || s['Roll No'] || s.roll_no || '').toString().trim();
  const supervisor = (s.supervisor || s.Supervisor || s['Supervisor(s)'] || s.guide || s.Guide || s.advisor || s.Advisor || '').toString().trim();
  const research = (s.research || s.research_interests || s.Research || s['Research Interests'] || s['Area of Research'] || s.research_interest || '').toString().trim();
  const photo = s.photo || s.Photo || s.image || s.Image || '';
  return {
    ...s,
    name,
    email,
    supervisor,
    research,
    research_interests: research,
    photo: drivePhotoUrl(photo) || photo,
  };
}

export function normalizeStudentBatch(batchList) {
  if (!Array.isArray(batchList)) return [];
  const normalized = batchList.map(normalizeStudent).filter(Boolean);

  // Deduplicate identical students in the same batch while preserving non-empty details
  const map = new Map();
  for (const s of normalized) {
    const key = s.name.toLowerCase();
    if (!map.has(key)) {
      map.set(key, s);
    } else {
      const existing = map.get(key);
      map.set(key, {
        ...existing,
        ...s,
        email: s.email || existing.email,
        supervisor: s.supervisor || existing.supervisor,
        research: s.research || existing.research,
        research_interests: s.research_interests || existing.research_interests,
        photo: s.photo || existing.photo,
      });
    }
  }
  return Array.from(map.values());
}

export function normalizeStudentBatches(batchesObj) {
  if (!batchesObj || typeof batchesObj !== 'object') return {};
  const res = {};
  for (const [batch, list] of Object.entries(batchesObj)) {
    const cleaned = normalizeStudentBatch(list);
    if (cleaned.length > 0) {
      res[batch] = cleaned;
    }
  }
  return res;
}

function resolveData(d) {
  const has = (key) => {
    if (!d || !d[key]) return false;
    if (Array.isArray(d[key])) return d[key].length > 0;
    if (typeof d[key] === 'object') return Object.keys(d[key]).length > 0;
    return true;
  };

  return {
    faculty: has('faculty')
      ? (() => {
          let list = d.faculty.map(f => {
            const rawResearch = f.research || f.research_interests || f.research_areas || '';
            const research = rawResearch.replace(/\s+/g, ' ').trim();
            return {
              ...f,
              name: (f.name || '').replace(/\s+/g, ' ').trim(),
              research,
              photo: drivePhotoUrl(f.photo) || f.photo,
              chamber: (f.chamber || f.chamber_no || f.chamber_number || f.room || f.room_no || f.office || '').toString().trim(),
              phoneExt: (f.phoneExt || f.phone_ext || f.extension || f.extension_no || f.ext || f.phone || '').toString().trim(),
            };
          });
          // Ensure Dr. Mukul Bhattacharya is always included even if missing from live sheet
          if (!list.some(f => f.name && f.name.includes('Mukul'))) {
            const mb = FACULTY_FB.find(f => f.name.includes('Mukul'));
            if (mb) list.push(mb);
          }
          return list;
        })()
      : FACULTY_FB,
    visiting: has('visiting')
      ? d.visiting.map(f => ({
          ...f,
          name: (f.name || '').replace(/\s+/g, ' ').trim(),
          research: (f.research || '').replace(/\s+/g, ' ').trim(),
          photo: drivePhotoUrl(f.photo) || f.photo,
          chamber: (f.chamber || f.chamber_no || f.room || f.office || '').toString().trim(),
          phoneExt: (f.phoneExt || f.phone_ext || f.extension || f.ext || f.phone || '').toString().trim(),
        }))
      : VISITING_FB,
    pg: (() => {
      let rawObj = null;
      if (has('pg_students')) {
        const filtered = {};
        for (const [key, val] of Object.entries(d.pg_students)) {
          if (!/ph\.?\s*d\.?/i.test(key)) {
            filtered[key] = val;
          }
        }
        if (Object.keys(filtered).length > 0) rawObj = filtered;
      } else if (has('pg')) {
        rawObj = d.pg;
      }
      return rawObj ? normalizeStudentBatches(rawObj) : normalizeStudentBatches(PG_FB);
    })(),
    ug: (() => {
      const rawObj = has('ug_students') ? d.ug_students : (has('ug') ? d.ug : UG_FB);
      return normalizeStudentBatches(rawObj);
    })(),
    phd: (() => {
      let rawObj = null;
      if (has('phd_students')) {
        rawObj = d.phd_students;
      } else if (has('phd')) {
        rawObj = d.phd;
      } else if (has('pg_students')) {
        const filtered = {};
        for (const [key, val] of Object.entries(d.pg_students)) {
          if (/ph\.?\s*d\.?/i.test(key)) {
            filtered[key] = val;
          }
        }
        if (Object.keys(filtered).length > 0) rawObj = filtered;
      }
      return rawObj ? normalizeStudentBatches(rawObj) : normalizeStudentBatches(PHD_FB);
    })(),
    alumni:     has('alumni')    ? d.alumni       : ALUMNI_FB,
    facilities: FACILITIES_FB,
    events:     has('events')    ? d.events       : EVENTS_FB,
    interns:    has('interns')   ? d.interns      : INTERNS_FB,
    news:       has('news')      ? d.news         : NEWS_FB,
    outreach:   has('outreach')  ? d.outreach     : OUTREACH_FB,
    publications: (() => {
      const raw = has('publications') ? d.publications : PUBLICATIONS_FB;
      return (raw || [])
        .map(normalizePublication)
        .filter(Boolean);
    })(),
    student_opportunities: has('student_opportunities')
      ? d.student_opportunities
      : (has('opportunities') ? d.opportunities : []),
    teacher_opportunities: has('teacher_opportunities') ? d.teacher_opportunities : [],
    opportunities: has('opportunities')
      ? d.opportunities
      : (has('student_opportunities') ? d.student_opportunities : []),
    staff: (() => {
      if (has('non_teaching_staff')) return d.non_teaching_staff;
      if (has('staff')) return [...d.staff].sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
      return STAFF_FB;
    })(),
  };
}
