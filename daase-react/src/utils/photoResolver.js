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
  const matched = nameTokens.filter(nt => fileTokens.some(ft => ft === nt || ft.includes(nt) || nt.includes(ft)));
  if (matched.length === nameTokens.length) return 100;
  const hasFirst = fileTokens.some(ft => ft === nameTokens[0] || ft.includes(nameTokens[0]));
  const hasLast  = nameTokens.length > 1 && fileTokens.some(ft => ft === nameTokens[nameTokens.length - 1] || ft.includes(nameTokens[nameTokens.length - 1]));
  if (hasFirst && hasLast) return 90;
  if (hasLast)  return 60;
  if (hasFirst) return 35;
  if (matched.length > 0) return 15;
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

function foldersToSearch(category) {
  const primary = CATEGORY_FOLDER[category];
  const all = [...new Set(Object.values(CATEGORY_FOLDER))];
  if (!primary) return all;
  return [primary, ...all.filter(f => f !== primary)];
}

export const DEFAULT_AVATAR = './images/default-avatar.png';

/**
 * Generate a smart list of candidate URLs for a person's photo.
 * This guarantees that:
 *  - Format/casing differences (.jpg, .jpeg, .png, .webp, .JPG) are automatically tried
 *  - Name variations (Full_Name, FirstName, roll/email) are automatically tried
 *  - Manifest fuzzy match & Google Drive URL are checked
 *  - If nothing is found, DEFAULT_AVATAR is returned as the final fallback
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

  // 1. Exact match from imageMap (highest priority)
  if (name && imageMap[name]) {
    add(imageMap[name]);
    const base = imageMap[name].replace(/\.(jpe?g|png|webp|avif)$/i, '');
    ['jpeg', 'png', 'JPG', 'JPEG', 'webp'].forEach(ext => {
      add(`${base}.${ext}`);
    });
  }

  // 2. Manifest fuzzy match (if manifest loaded)
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

  // 3. Name variations inside category folder
  if (name) {
    const cleanName = name.trim();
    const tokens = cleanName.split(/\s+/).filter(t => !TITLES.includes(t.toLowerCase()));
    
    // Core naming patterns used by staff/users
    const nameVariations = new Set();
    nameVariations.add(cleanName.replace(/\s+/g, '_'));
    nameVariations.add(cleanName.replace(/\s+/g, ' '));
    nameVariations.add(cleanName.replace(/\s+/g, '_').toLowerCase());

    if (tokens.length > 0) {
      nameVariations.add(tokens[0]); // First name e.g. Shubhangi
      nameVariations.add(tokens[0].toLowerCase());
      if (tokens.length > 1) {
        nameVariations.add(`${tokens[0]}_${tokens[tokens.length - 1]}`);
      }
    }

    const exts = ['jpg', 'jpeg', 'png', 'JPG', 'webp'];
    for (const v of nameVariations) {
      for (const ext of exts) {
        add(`./people_images/${folder}/${v}.${ext}`);
      }
    }
  }

  // 4. Email / Roll number variations
  if (email) {
    const cleanEmail = email.split('@')[0].trim();
    ['jpg', 'jpeg', 'png', 'JPG'].forEach(ext => {
      add(`./people_images/${folder}/${cleanEmail}.${ext}`);
      add(`images/students/${cleanEmail}.${ext}`);
    });
  }

  // 5. Google Drive URL
  const drive = drivePhotoUrl(driveUrl);
  if (drive) add(drive);

  // 6. Universal Terminal Fallback
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

