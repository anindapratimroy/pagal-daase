import { useState, useEffect } from 'react';
import { 
  SHEETS_URL, drivePhotoUrl, FACILITIES_FB,
  PUBLICATIONS_FB, FACULTY_FB, VISITING_FB, PG_FB, UG_FB, 
  ALUMNI_FB, EVENTS_FB, PHD_FB, INTERNS_FB, NEWS_FB, OUTREACH_FB, STAFF_FB
} from '../data/fallback';

const CACHE_KEY = 'daase_v7_data';
const CACHE_TTL = 30 * 60 * 1000; // 30 min

function getCached() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) { localStorage.removeItem(CACHE_KEY); return null; }
    return data;
  } catch { return null; }
}
function setCached(data) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() })); } catch { /* ignore */ }
}

export function useData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      // 1. Try cache first for instant display
      const cached = getCached();
      if (cached) {
        if (mounted) { setData(cached); setLoading(false); }
        // Background refresh
        fetchFresh().then(fresh => { if (mounted && fresh) setData(fresh); }).catch(() => {});
        return;
      }
      // 2. Fetch from Sheets
      setLoading(true);
      const fresh = await fetchFresh();
      if (mounted) { setData(fresh); setLoading(false); }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const resolved = resolveData(data);
  return { ...resolved, loading };
}

async function fetchFresh() {
  try {
    const res = await fetch(SHEETS_URL);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    if (json.error) throw new Error(json.error);
    setCached(json);
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
    faculty:    has('faculty')   ? d.faculty.map(f => ({ ...f, photo: drivePhotoUrl(f.photo) || f.photo })) : FACULTY_FB,
    visiting:   has('visiting')  ? d.visiting.map(f => ({ ...f, photo: drivePhotoUrl(f.photo) || f.photo })) : VISITING_FB,
    pg: (() => {
      if (!has('pg_students')) return PG_FB;
      const filtered = {};
      let hasPg = false;
      for (const [key, val] of Object.entries(d.pg_students)) {
        if (!key.toLowerCase().startsWith('ph.d.')) {
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
        if (key.toLowerCase().startsWith('ph.d.')) {
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
    publications: has('publications') ? d.publications : PUBLICATIONS_FB,
    opportunities: has('opportunities') ? d.opportunities : [],
    staff: (() => {
      if (has('non_teaching_staff')) return d.non_teaching_staff;
      if (has('staff')) return [...d.staff].sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
      return STAFF_FB;
    })(),
  };
}
