const MONTH_NAMES = {
  jan: 1, january: 1,
  feb: 2, february: 2,
  mar: 3, march: 3,
  apr: 4, april: 4,
  may: 5,
  jun: 6, june: 6,
  jul: 7, july: 7,
  aug: 8, august: 8,
  sep: 9, sept: 9, september: 9,
  oct: 10, october: 10,
  nov: 11, november: 11,
  dec: 12, december: 12,
};

function expandYear(yr) {
  const y = parseInt(yr, 10);
  if (isNaN(y)) return new Date().getFullYear();
  if (y < 100) {
    // 2-digit year: 25 -> 2025, 98 -> 1998
    return y < 60 ? 2000 + y : 1900 + y;
  }
  return y;
}

/**
 * Robust date parser supporting:
 * - DD-MM-YYYY, DD/MM/YYYY, DD.MM.YYYY
 * - DD-MM-YY, DD/MM/YY
 * - YYYY-MM-DD, YYYY/MM/DD
 * - Month DD, YYYY / DD Month YYYY (e.g. "December 10, 2025", "10 Dec 2025")
 * - MM/YY, MM/YYYY, MM-YY (e.g. "09/25", "9/25", "09/2025")
 * - Month YYYY (e.g. "December 2025", "May 2025")
 * - Excel/Sheets date serial numbers (e.g. 45914)
 * - Single 4-digit year (e.g. 2025)
 * Never throws an error or crashes.
 */
export function parseDate(raw) {
  if (raw === null || raw === undefined) return 0;

  // 1. Numeric Excel / Google Sheets serial date number
  if (typeof raw === 'number' && raw > 30000 && raw < 70000) {
    return new Date(Math.round((raw - 25569) * 86400 * 1000)).getTime();
  }

  const str = String(raw).trim();
  if (!str) return 0;

  // Check if string is a numeric Excel serial
  if (/^\d{5}$/.test(str)) {
    const num = parseInt(str, 10);
    if (num > 30000 && num < 70000) {
      return new Date(Math.round((num - 25569) * 86400 * 1000)).getTime();
    }
  }

  // 2. Two-part Month/Year: e.g. "09/25", "9/25", "09-25", "09/2025", "9/2025"
  const myMatch = str.match(/^(\d{1,2})[\/\-](\d{2}|\d{4})$/);
  if (myMatch) {
    const m = parseInt(myMatch[1], 10);
    const y = expandYear(myMatch[2]);
    if (m >= 1 && m <= 12 && y >= 1970 && y <= 2100) {
      return new Date(Date.UTC(y, m - 1, 1)).getTime();
    }
  }

  // 3. Three-part ISO format (YYYY-MM-DD or YYYY/MM/DD)
  const isoMatch = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
  if (isoMatch) {
    const y = parseInt(isoMatch[1], 10);
    const m = parseInt(isoMatch[2], 10);
    const d = parseInt(isoMatch[3], 10);
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
      return new Date(Date.UTC(y, m - 1, d)).getTime();
    }
  }

  // 4. Three-part DD-MM-YYYY, DD/MM/YYYY, DD.MM.YYYY, DD-MM-YY
  const dmyMatch = str.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})$/);
  if (dmyMatch) {
    let p1 = parseInt(dmyMatch[1], 10);
    let p2 = parseInt(dmyMatch[2], 10);
    const y = expandYear(dmyMatch[3]);
    let day = p1;
    let month = p2;
    // If second number > 12 and first <= 12, input is MM/DD/YYYY
    if (p2 > 12 && p1 <= 12) {
      month = p1;
      day = p2;
    }
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      return new Date(Date.UTC(y, month - 1, day)).getTime();
    }
  }

  // 5. Date ranges like "July 7–18, 2025" or "December 15–17, 2025"
  const normalizedRange = str.replace(/[–—]/g, '-');
  const rangeMatch = normalizedRange.match(/([a-zA-Z]+)\s+(\d+)(?:\s*-\s*\d+)?(?:,\s*(\d{4}))?/);
  if (rangeMatch) {
    const monthStr = rangeMatch[1].toLowerCase();
    const day = parseInt(rangeMatch[2], 10);
    const year = parseInt(rangeMatch[3] || new Date().getFullYear(), 10);
    const m = MONTH_NAMES[monthStr];
    if (m) {
      return new Date(Date.UTC(year, m - 1, day)).getTime();
    }
  }

  // 6. Text month with day and year: e.g. "December 10, 2025", "10 December 2025", "14-Sep-2026", "Sep 14 2026"
  const textDateMatch = str.match(/(?:([a-zA-Z]+)[,\s\-]+(\d{1,2})|(\d{1,2})[,\s\-]+([a-zA-Z]+))[,\s\-]+(\d{2,4})/);
  if (textDateMatch) {
    const monthStr = (textDateMatch[1] || textDateMatch[4] || '').toLowerCase();
    const dayStr = textDateMatch[2] || textDateMatch[3] || '1';
    const yearStr = textDateMatch[5];
    const m = MONTH_NAMES[monthStr];
    if (m) {
      const day = parseInt(dayStr, 10);
      const y = expandYear(yearStr);
      return new Date(Date.UTC(y, m - 1, day)).getTime();
    }
  }

  // 7. Text month with year: e.g. "December 2025", "Dec 2025", "September 25"
  const textMonthYear = str.match(/^([a-zA-Z]+)[,\s\-]+(\d{2,4})$/);
  if (textMonthYear) {
    const m = MONTH_NAMES[textMonthYear[1].toLowerCase()];
    if (m) {
      const y = expandYear(textMonthYear[2]);
      return new Date(Date.UTC(y, m - 1, 1)).getTime();
    }
  }

  // 8. Native Date parse fallback
  const nativeParsed = new Date(str);
  if (!isNaN(nativeParsed.getTime())) {
    return nativeParsed.getTime();
  }

  // 9. Single 4-digit year fallback (e.g. "2025")
  const yMatch = str.match(/\b(19\d{2}|20\d{2})\b/);
  if (yMatch) {
    return new Date(Date.UTC(parseInt(yMatch[1], 10), 0, 1)).getTime();
  }

  return 0;
}

export function parsePublicationDate(raw) {
  return parseDate(raw);
}

export function extractPublicationYear(pub) {
  const text = typeof pub === 'string' ? pub : (pub?.text || pub?.title || pub?.citation || '');
  const matches = text.match(/\b(19[5-9]\d|20[0-9]\d)\b/g);
  if (!matches) return 0;
  const currentYear = new Date().getFullYear();
  const validYears = matches
    .map(m => parseInt(m, 10))
    .filter(y => y >= 1990 && y <= currentYear + 2);
  return validYears.length > 0 ? Math.max(...validYears) : parseInt(matches[0], 10);
}

/**
 * Formats a publication date for clean, elegant human display:
 * - "14-09-2026" -> "Sep 14, 2026"
 * - "09/25" -> "Sep 2025"
 * - "December 10, 2025" -> "Dec 10, 2025"
 * - If date missing, falls back to year from citation text (e.g. "2026")
 * Never throws an error or crashes.
 */
export function formatPublicationDate(dateRaw, citationRaw = '') {
  if (dateRaw) {
    const str = String(dateRaw).trim();
    const parsedTs = parseDate(str);
    if (parsedTs > 0) {
      const d = new Date(parsedTs);
      // If original input was MM/YY, MM/YYYY or Month Year
      if (/^(\d{1,2})[\/\-](\d{2}|\d{4})$/.test(str) || /^[a-zA-Z]+[,\s\-]+\d{2,4}$/.test(str)) {
        return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
      }
      // If only year
      if (/^\d{4}$/.test(str)) {
        return String(d.getUTCFullYear());
      }
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
    }
  }

  const year = extractPublicationYear(citationRaw || dateRaw);
  if (year > 0) {
    return String(year);
  }

  return '';
}

export function getPublicationTimestamp(pub) {
  if (!pub) return 0;
  if (typeof pub === 'object' && pub.date) {
    const ts = parseDate(pub.date);
    if (ts > 0) return ts;
  }
  if (typeof pub === 'string') {
    const ts = parseDate(pub);
    if (ts > 0) return ts;
  }
  const year = extractPublicationYear(pub);
  if (year > 0) {
    return new Date(Date.UTC(year, 0, 1)).getTime();
  }
  return 0;
}

/**
 * Sorts publications newest first.
 * Priority 1: Date column from sheet (parsed resiliently)
 * Priority 2: Year in citation text (e.g. 2026 > 2025 > 2024)
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

  return [...pinnedNews, ...upcomingEvents, ...generalUpdates].slice(0, 10);
}
