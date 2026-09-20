import { useState, useEffect } from 'react';
import { 
  SHEETS_URL, drivePhotoUrl, FACILITIES_FB,
  PUBLICATIONS_FB, FACULTY_FB, VISITING_FB, PG_FB, UG_FB, 
  ALUMNI_FB, EVENTS_FB, PHD_FB, INTERNS_FB, NEWS_FB, OUTREACH_FB, STAFF_FB
} from '../data/fallback';
import { loadPhotoManifest } from '../utils/photoResolver';

const CACHE_KEY = 'daase_v12_data';
const CACHE_TTL = 30 * 60 * 1000; // 30 min

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

  return {
    citation: text,
    text,
    url: url || '',
    date: p.date || '',
    status: p.status || 'active'
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
  return { ...resolved, loading };
}

async function fetchFresh() {
  try {
    // Added refresh=true to explicitly force the Apps Script to bypass its 5-minute CacheService
    const url = SHEETS_URL + (SHEETS_URL.includes('?') ? '&' : '?') + 'refresh=true&t=' + Date.now();
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    if (json.error) throw new Error(json.error);
    setCached(json);
    
    // DEBUG LOGS ADDED TO INSPECT RAW API RESPONSE
    console.log('[DEBUG] RAW API RESPONSE RECEIVED:');
    console.log('[DEBUG] RAW EVENTS from API:', JSON.parse(JSON.stringify(json.events || [])));
    console.log('[DEBUG] RAW NEWS from API:', JSON.parse(JSON.stringify(json.news || [])));
    
    return json;
  } catch (e) {
    console.warn('[DAASE] Sheets fetch failed, using fallback:', e.message);
    return null;
  }
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
            let research = f.research;
            if (f.name && f.name.includes('Mukul')) {
              research = 'Multi-messenger astrophysics, transient phenomena, compact objects (BH, NS), particle acceleration & relativistic outflows';
            }
            return {
              ...f,
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
          photo: drivePhotoUrl(f.photo) || f.photo,
          chamber: (f.chamber || f.chamber_no || f.room || f.office || '').toString().trim(),
          phoneExt: (f.phoneExt || f.phone_ext || f.extension || f.ext || f.phone || '').toString().trim(),
        }))
      : VISITING_FB,
    pg: (() => {
      if (!has('pg_students')) return PG_FB;
      const filtered = {};
      let hasPg = false;
      for (const [key, val] of Object.entries(d.pg_students)) {
        if (!/ph\.?\s*d\.?/i.test(key)) {
          filtered[key] = val;
          hasPg = true;
        }
      }
      return hasPg ? filtered : PG_FB;
    })(),
    ug:         has('ug_students') ? d.ug_students : UG_FB,
    phd: (() => {
      if (has('phd_students')) return d.phd_students;
      if (!has('pg_students')) return PHD_FB;
      const filtered = {};
      let hasPhd = false;
      for (const [key, val] of Object.entries(d.pg_students)) {
        if (/ph\.?\s*d\.?/i.test(key)) {
          filtered[key] = val;
          hasPhd = true;
        }
      }
      return hasPhd ? filtered : PHD_FB;
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
        .filter(p => !p.status || p.status.toString().toLowerCase().trim() === 'active')
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
