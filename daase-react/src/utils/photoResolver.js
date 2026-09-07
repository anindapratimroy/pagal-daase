/**
 * DAASE Smart Photo Resolver
 * Priority: imageMap -> manifest fuzzy match -> Google Drive URL -> null
 *
 * Staff workflow (zero code changes needed):
 *  1. Upload photo to people_images/<Category>/ via CloudPanel file manager
 *  2. Visit aase.iiti.ac.in/update_manifest.php?key=daase2025 to refresh index
 *  3. Photo appears automatically on the website
 */

import { imageMap } from '../data/imageMap';
import { drivePhotoUrl } from '../data/fallback';

// Maps person category -> folder name inside people_images/
export const CATEGORY_FOLDER = {
  faculty:            'Faculty',
  visiting:           'Faculty',
  staff:              'Staff',
  non_teaching_staff: 'Non_Teaching_Staff',
  phd:                'Ph_D_Students',
  pg:                 'Post_Graduate_Students',
  ug:                 'Under_Graduate_Students',
  alumni:             'Alumni',
  interns:            'Intern',
};

let _manifest = null;
let _manifestLoading = false;
let _manifestCallbacks = [];

export async function loadPhotoManifest() {
  if (_manifest) return _manifest;
  if (_manifestLoading) return new Promise(resolve => _manifestCallbacks.push(resolve));
  _manifestLoading = true;
  try {
    const res = await fetch('./photos_manifest.json?t=' + Date.now(), { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    _manifest = await res.json();
    console.log('[PhotoResolver] Manifest loaded:', Object.keys(_manifest).map(k => k + ':' + (_manifest[k]?.length || 0)).join(', '));
  } catch (e) {
    console.warn('[PhotoResolver] Could not load photos_manifest.json:', e.message);
    _manifest = {};
  }
  _manifestLoading = false;
  _manifestCallbacks.forEach(cb => cb(_manifest));
  _manifestCallbacks = [];
  return _manifest;
}

const TITLES = ['dr', 'prof', 'professor', 'mr', 'mrs', 'ms', 'miss', 'sri', 'shri', 'smt', 'col', 'lt'];

function tokenise(raw) {
  if (!raw) return [];
  return raw
    .replace(/\.(jpe?g|png|webp|gif|bmp|avif)$/i, '')
    .replace(/[_\-\.]+/g, ' ')
    .toLowerCase()
    .split(/\s+/)
    .filter(t => t.length >= 2 && !TITLES.includes(t));
}

function scoreMatch(nameTokens, filename) {
  if (!nameTokens.length) return 0;
  const fileTokens = tokenise(filename);
  if (!fileTokens.length) return 0;

  const matchedTokens = nameTokens.filter(nt => fileTokens.includes(nt));
  const extraTokensInFile = fileTokens.filter(ft => !nameTokens.includes(ft));
  const missingTokens = nameTokens.filter(nt => !fileTokens.includes(nt));

  // Contradiction Check:
  // If the file has name tokens that conflict with the person's name (e.g. file has 'sinha' or 'ananya',
  // but person is 'shubhangi uikey'), this is a DIFFERENT person -> DISQUALIFIED (0)
  if (extraTokensInFile.length > 0 && missingTokens.length > 0) {
    return 0;
  }

  // Full name match (all person's name tokens match the file)
  if (matchedTokens.length === nameTokens.length) {
    if (extraTokensInFile.length === 0) return 100; // Perfect exact match
    return 85; // Extra non-conflicting suffix
  }

  // Only if person has first and last name, but file has only first name (e.g. Shubhangi.jpeg)
  // ONLY valid if file has NO extra contradictory tokens
  if (nameTokens.length > 1 && fileTokens.length === 1 && fileTokens[0] === nameTokens[0]) {
    return 40; // Secondary fallback
  }

  return 0;
}

function bestMatch(personName, fileList, threshold = 35) {
  const nameTokens = tokenise(personName);
  if (!nameTokens.length || !fileList?.length) return null;
  let best = null, bestScore = 0;
  for (const file of fileList) {
    const score = scoreMatch(nameTokens, file);
    if (score > bestScore) { bestScore = score; best = file; }
  }
  return bestScore >= threshold ? { file: best, score: bestScore } : null;
}

// Strictly isolate folders by category. Never search across other categories!
function foldersToSearch(category) {
  const primary = CATEGORY_FOLDER[category];
  return primary ? [primary] : [];
}

export const DEFAULT_AVATAR = './images/default-avatar.png';

/**
 * Generate a smart list of candidate URLs for a person's photo.
 * Prioritized:
 *  1. Exact Full Name (First_Last) in the person's category folder with all extensions
 *  2. Roll Number / Email in category folder & images/students/
 *  3. Exact match from imageMap (if explicitly registered)
 *  4. Dynamic manifest strict match (within person's category folder only)
 *  5. Partial / First-name only (e.g. Shubhangi.jpeg) inside own category folder
 *  6. Google Drive URL
 *  7. Guaranteed Default Avatar
 */
export function getPhotoCandidates(name, category, driveUrl, email) {
  const candidates = [];
  const seen = new Set();

  const add = (url) => {
    if (!url || seen.has(url)) return;
    seen.add(url);
    candidates.push(url);
  };

  const folder = CATEGORY_FOLDER[category] || 'Post_Graduate_Students';
  const exts = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'webp'];

  // 1. Exact verified path from data or imageMap (Highest Priority - 100% accurate for existing people)
  if (driveUrl && typeof driveUrl === 'string' && (driveUrl.startsWith('./') || driveUrl.startsWith('/') || driveUrl.startsWith('people_images/'))) {
    add(driveUrl);
  }
  if (name && imageMap[name]) {
    add(imageMap[name]);
    const base = imageMap[name].replace(/\.(jpe?g|png|webp|avif)$/i, '');
    for (const ext of exts) {
      add(`${base}.${ext}`);
    }
  }

  // 2. Exact Full Name (First_Last) variations inside category folder
  if (name) {
    const cleanName = name.trim();
    const tokens = cleanName.split(/\s+/).filter(t => !TITLES.includes(t.toLowerCase()));
    
    const fullNameUnderscore = cleanName.replace(/\s+/g, '_');
    const fullNameSpace = cleanName.replace(/\s+/g, ' ');
    const fullNameLower = fullNameUnderscore.toLowerCase();

    for (const ext of exts) {
      add(`./people_images/${folder}/${fullNameUnderscore}.${ext}`);
      add(`./people_images/${folder}/${fullNameSpace}.${ext}`);
      add(`./people_images/${folder}/${fullNameLower}.${ext}`);
    }

    if (tokens.length > 1) {
      const firstLast = `${tokens[0]}_${tokens[tokens.length - 1]}`;
      const firstLastLower = firstLast.toLowerCase();
      for (const ext of exts) {
        add(`./people_images/${folder}/${firstLast}.${ext}`);
        add(`./people_images/${folder}/${firstLastLower}.${ext}`);
      }
    }
  }

  // 3. Roll number / Email variations (Unique to the individual)
  if (email) {
    const cleanEmail = email.split('@')[0].trim();
    for (const ext of exts) {
      add(`./people_images/${folder}/${cleanEmail}.${ext}`);
      add(`images/students/${cleanEmail}.${ext}`);
    }
  }

  // 4. Manifest fuzzy match (Strictly within person's own category folder only!)
  if (_manifest && name) {
    const folders = foldersToSearch(category);
    for (const f of folders) {
      const fileList = _manifest[f];
      if (!fileList?.length) continue;
      const match = bestMatch(name, fileList);
      if (match) {
        add(`./people_images/${f}/${match.file}`);
      }
    }
  }

  // 5. Partial / First Name Only (Secondary fallback, strictly within person's own folder)
  if (name) {
    const cleanName = name.trim();
    const tokens = cleanName.split(/\s+/).filter(t => !TITLES.includes(t.toLowerCase()));
    if (tokens.length > 0) {
      const firstName = tokens[0];
      const firstNameLower = firstName.toLowerCase();
      for (const ext of exts) {
        add(`./people_images/${folder}/${firstName}.${ext}`);
        add(`./people_images/${folder}/${firstNameLower}.${ext}`);
      }
    }
  }

  // 6. Google Drive URL from Sheets
  const drive = drivePhotoUrl(driveUrl);
  if (drive) add(drive);

  // 7. Universal Terminal Fallback
  add(DEFAULT_AVATAR);

  return candidates;
}

/**
 * Handle image error by cycling through candidates until one succeeds,
 * ultimately settling on DEFAULT_AVATAR.
 */
export function handlePhotoError(e, candidates = [], fallback = DEFAULT_AVATAR) {
  const currentIdx = parseInt(e.target.dataset.candidateIndex || '0', 10);
  const nextIdx = currentIdx + 1;

  if (candidates && nextIdx < candidates.length) {
    e.target.dataset.candidateIndex = nextIdx;
    e.target.src = candidates[nextIdx];
  } else if (!e.target.src.endsWith('default-avatar.png')) {
    e.target.dataset.candidateIndex = '999';
    e.target.src = fallback;
  } else {
    // Already tried default avatar and failed; stop to avoid loop
    e.target.onerror = null;
  }
}

/**
 * Resolve the best photo URL for a person.
 * @param {string} name      Full name as it appears in the data
 * @param {string} category  'faculty' | 'phd' | 'pg' | 'ug' | 'staff' | 'alumni' | 'interns'
 * @param {string} driveUrl  Raw Google Drive URL from Sheets (optional)
 * @param {string} email     Email / Roll number (optional)
 * @returns {string}         Resolved photo URL or DEFAULT_AVATAR
 */
export function resolvePhoto(name, category, driveUrl, email) {
  const candidates = getPhotoCandidates(name, category, driveUrl, email);
  return candidates[0] || DEFAULT_AVATAR;
}

export function isManifestReady() {
  return _manifest !== null;
}

