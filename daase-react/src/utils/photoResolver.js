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

/**
 * Resolve the best photo URL for a person.
 * @param {string} name      Full name as it appears in the data
 * @param {string} category  'faculty' | 'phd' | 'pg' | 'ug' | 'staff' | 'alumni' | 'interns'
 * @param {string} driveUrl  Raw Google Drive URL from Sheets (optional)
 * @returns {string|null}    Resolved photo URL or null
 */
export function resolvePhoto(name, category, driveUrl) {
  // Priority 1: imageMap exact match (existing, backward compat)
  if (name && imageMap[name]) return imageMap[name];

  // Priority 2: Manifest fuzzy match (new, for staff-uploaded photos)
  if (_manifest) {
    const folders = foldersToSearch(category);
    let topMatch = null;
    for (const folder of folders) {
      const fileList = _manifest[folder];
      if (!fileList?.length) continue;
      const match = bestMatch(name, fileList);
      if (match && (!topMatch || match.score > topMatch.score)) {
        topMatch = { ...match, folder };
      }
      if (topMatch?.score === 100) break;
    }
    if (topMatch) return `./people_images/${topMatch.folder}/${topMatch.file}`;
  }

  // Priority 3: Google Drive URL from Sheets
  const drive = drivePhotoUrl(driveUrl);
  if (drive) return drive;

  return null;
}

export function isManifestReady() {
  return _manifest !== null;
}
