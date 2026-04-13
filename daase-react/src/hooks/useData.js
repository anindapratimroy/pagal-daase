import { useState, useEffect } from 'react';
import { SHEETS_URL, FACULTY_FB, VISITING_FB, STAFF_FB, PG_FB, UG_FB, PHD_FB, ALUMNI_FB, FACILITIES_FB, EVENTS_FB, INTERNS_FB, NEWS_FB, OUTREACH_FB, drivePhotoUrl } from '../data/fallback';

const CACHE_KEY = 'daase_v1_data';
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
  return {
    faculty:    (d?.faculty?.length   ? d.faculty.map(f => {
        const fb = FACULTY_FB.find(x => x.name === f.name) || {};
        return { ...fb, ...f, photo: drivePhotoUrl(f.photo) || f.photo };
      }) : FACULTY_FB),
    visiting:   (d?.visiting?.length  ? d.visiting.map(f => {
        const fb = VISITING_FB.find(x => x.name === f.name) || {};
        return { ...fb, ...f, photo: drivePhotoUrl(f.photo) || f.photo };
      }) : VISITING_FB),
    pg:         (d?.pg_students       ? d.pg_students  : PG_FB),
    ug:         (d?.ug_students       ? d.ug_students  : UG_FB),
    phd:        (d?.phd_students      ? d.phd_students : PHD_FB),
    alumni:     (d?.alumni?.length    ? d.alumni       : ALUMNI_FB),
    facilities: (d?.facilities?.length? d.facilities   : FACILITIES_FB),
    events:     (d?.events?.length    ? d.events       : EVENTS_FB),
    interns:    (d?.interns           ? d.interns      : INTERNS_FB),
    news:       (d?.news?.length      ? d.news         : NEWS_FB),
    outreach:   (d?.outreach?.length  ? d.outreach     : OUTREACH_FB),
    staff:      (d?.staff?.length     ? d.staff        : STAFF_FB),
  };
}
