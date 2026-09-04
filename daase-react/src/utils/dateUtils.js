/**
 * Universal Date Parser & Sorting Utilities for DAASE
 * Handles all Google Sheets date formats resiliently:
 *  - Standard ISO (YYYY-MM-DD)
 *  - DD/MM/YYYY, DD-MM-YYYY
 *  - Text format ("15 March 2025", "May 2025")
 *  - Ranges ("July 7–18, 2025", "December 15-17, 2025")
 *  - Year extraction from citation text ("... (2025). ...")
 */

export function parseDate(raw) {
  if (!raw) return 0;
  const str = String(raw).trim();
  if (!str) return 0;

  // 1. Direct standard parseable (e.g. YYYY-MM-DD or standard Date strings)
  const d = new Date(str);
  if (!isNaN(d.getTime())) return d.getTime();

  // 2. DD/MM/YYYY or DD-MM-YYYY
  const dmy = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (dmy) {
    const [, day, month, year] = dmy;
    const parsed = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
    if (!isNaN(parsed.getTime())) return parsed.getTime();
  }

  // 3. Date ranges like "July 7–18, 2025" or "December 15–17, 2025"
  const normalized = str.replace(/[–—]/g, '-');
  const rangeMatch = normalized.match(/([a-zA-Z]+)\s+(\d+)(?:\s*-\s*\d+)?(?:,\s*(\d{4}))?/);
  if (rangeMatch) {
    const month = rangeMatch[1];
    const day = rangeMatch[2];
    const year = rangeMatch[3] || new Date().getFullYear();
    const parsed = new Date(`${month} ${day}, ${year}`);
    if (!isNaN(parsed.getTime())) return parsed.getTime();
  }

  // 4. "Month Year" e.g. "May 2025"
  const myMatch = str.match(/([a-zA-Z]+)\s+(\d{4})/);
  if (myMatch) {
    const parsed = new Date(`${myMatch[1]} 1, ${myMatch[2]}`);
    if (!isNaN(parsed.getTime())) return parsed.getTime();
  }

  // 5. 4-digit Year fallback (e.g. 2025)
  const yMatch = str.match(/\b(20\d\d)\b/);
  if (yMatch) {
    return new Date(`${yMatch[1]}-01-01`).getTime();
  }

  return 0;
}

export function extractPublicationYear(pub) {
  const text = typeof pub === 'string' ? pub : (pub.text || pub.title || pub.citation || '');
  const match = text.match(/\b(19\d\d|20\d\d)\b/);
  return match ? parseInt(match[1], 10) : 0;
}

export function getPublicationTimestamp(pub) {
  if (pub && typeof pub === 'object' && pub.date) {
    const ts = parseDate(pub.date);
    if (ts > 0) return ts;
  }
  const year = extractPublicationYear(pub);
  if (year > 0) {
    return new Date(`${year}-01-01`).getTime();
  }
  return 0;
}

/**
 * Sorts publications newest first.
 * Priority 1: Date column from sheet
 * Priority 2: Year in citation text (e.g. 2025 > 2024 > 2023)
 * Priority 3: Stable relative tie-breaker
 */
export function sortPublications(pubs) {
  if (!Array.isArray(pubs) || pubs.length === 0) return [];
  return [...pubs].sort((a, b) => {
    const tsA = getPublicationTimestamp(a);
    const tsB = getPublicationTimestamp(b);
    if (tsA !== tsB) return tsB - tsA;
    return 0;
  });
}

/**
 * Normalizes and sorts news & events for the Home page feed.
 * 1. Pinned news at the very top.
 * 2. Truly upcoming events (date is today or in future) sorted soonest first.
 * 3. Chronological timeline of recent news + past events (newest first).
 */
export function sortHomeUpdates(news = [], events = []) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTs = today.getTime();

  // Normalize active news
  const activeNews = (news || [])
    .filter(n => !n.status || n.status.toString().toLowerCase().trim() === 'active')
    .map(n => ({
      type: 'news',
      title: n.text || n.title,
      link: n.link || n.url,
      date: n.date,
      isPinned: Boolean(
        n.status?.toString().toLowerCase().trim() === 'pinned' ||
        (n.text || n.title || '').trim().startsWith('✦') ||
        (n.text || n.title || '').trim().startsWith('[PINNED]')
      ),
      timestamp: parseDate(n.date),
    }));

  // Normalize events
  const activeEvents = (events || []).map(e => {
    const ts = parseDate(e.date);
    const rawType = (e.type || '').toString().toLowerCase().trim();
    // Truly upcoming: type is upcoming AND (no date, OR date is today or in future)
    const isUpcoming = rawType === 'upcoming' && (ts === 0 || ts >= todayTs);
    return {
      type: 'event',
      title: e.title,
      link: e.link || e.url || e.Link || e.URL || e.href || '',
      date: e.date,
      rawType: e.type,
      isUpcoming,
      timestamp: ts,
    };
  });

  // 1. Pinned news
  const pinnedNews = activeNews.filter(n => n.isPinned);
  const unpinnedNews = activeNews.filter(n => !n.isPinned);

  // 2. Upcoming events (soonest first)
  const upcomingEvents = activeEvents
    .filter(e => e.isUpcoming)
    .sort((a, b) => {
      if (a.timestamp && b.timestamp) return a.timestamp - b.timestamp;
      if (a.timestamp) return -1;
      if (b.timestamp) return 1;
      return 0;
    });

  // 3. Chronological timeline of recent news + past events (newest first)
  const generalUpdates = [...unpinnedNews, ...activeEvents.filter(e => !e.isUpcoming)].sort((a, b) => {
    if (a.timestamp && b.timestamp) return b.timestamp - a.timestamp;
    if (a.timestamp) return -1;
    if (b.timestamp) return 1;
    return 0;
  });

  return [...pinnedNews, ...upcomingEvents, ...generalUpdates].slice(0, 15);
}
