/**
 * DAASE Smart Photo Resolver
 * Priority: Exact path -> imageMap -> manifest fuzzy match -> Candidate patterns -> Google Drive URL -> DEFAULT_AVATAR
 *
 * Staff workflow (zero code changes needed):
 *  1. Upload photo to people_images/<Category>/ via CloudPanel file manager
 *  2. Visit aase.iiti.ac.in/update_manifest.php?key=daase2025 to refresh index
 *  3. Photo appears automatically on the website
 */

import { imageMap } from '../data/imageMap';
import { drivePhotoUrl } from '../data/fallback';
import initialManifest from '../data/photos_manifest.json';

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
  intern:             'Intern',
};

// Folders to search for a category. Strictly isolates categories except staff/non_teaching_staff which share images.
export function foldersToSearch(category) {
  if (!category) return ['Faculty'];
  const cat = category.toLowerCase();
  if (cat === 'staff' || cat === 'non_teaching_staff') {
    return ['Non_Teaching_Staff', 'Staff'];
  }
  const primary = CATEGORY_FOLDER[cat];
  return primary ? [primary] : ['Faculty'];
}

// Initialized synchronously from bundled manifest so all known images resolve on mount
let _manifest = initialManifest || {};
let _manifestLoading = false;
let _manifestCallbacks = [];

export async function loadPhotoManifest() {
  if (_manifestLoading) return new Promise(resolve => _manifestCallbacks.push(resolve));
  _manifestLoading = true;
  try {
    const res = await fetch('./photos_manifest.json?t=' + Date.now(), { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    _manifest = await res.json();
    console.log('[PhotoResolver] Manifest updated dynamically:', Object.keys(_manifest).map(k => k + ':' + (_manifest[k]?.length || 0)).join(', '));
  } catch (e) {
    console.warn('[PhotoResolver] Using static manifest (dynamic fetch failed):', e.message);
  }
  _manifestLoading = false;
  _manifestCallbacks.forEach(cb => cb(_manifest));
  _manifestCallbacks = [];
  return _manifest;
}

export const TITLES = ['dr', 'prof', 'professor', 'mr', 'mrs', 'ms', 'miss', 'sri', 'shri', 'smt', 'col', 'lt'];

export const TITLES_REGEX = /^(dr|prof|professor|mr|mrs|ms|miss|sri|shri|smt|col|lt)[\.\s_]+/i;

export function tokenise(raw) {
  if (!raw) return [];
  return raw
    .replace(/\.(jpe?g|png|webp|gif|bmp|avif)$/i, '')
    .replace(/[\._\-,\(\)]+/g, ' ')
    .toLowerCase()
    .split(/\s+/)
    .filter(t => t.length >= 1 && !TITLES.includes(t));
}

export function cleanPersonName(rawName) {
  if (!rawName) return { fullName: '', nameWithoutTitle: '', title: '', tokens: [] };
  const fullName = rawName.trim();
  const match = fullName.match(TITLES_REGEX);
  const title = match ? match[1].replace(/[\._\s]+$/, '') : '';
  const nameWithoutTitle = fullName.replace(TITLES_REGEX, '').trim();
  const tokens = (nameWithoutTitle || fullName)
    .replace(/[\._\-,\(\)]+/g, ' ')
    .split(/\s+/)
    .filter(t => t.length >= 1 && !TITLES.includes(t.toLowerCase()));
  return { fullName, nameWithoutTitle, title, tokens };
}

/**
 * Sanity check to prevent false overrides from imageMap.
 * Guarantees that a mapped image file actually shares name tokens with the person,
 * and prevents cross-person collisions even if imageMap contains human typos.
 */
export function isImageMapValid(personName, mappedPath) {
  if (!personName || !mappedPath) return false;
  const nameTokens = tokenise(personName);
  const file = mappedPath.split('/').pop();
  const fileTokens = tokenise(file);
  if (!nameTokens.length || !fileTokens.length) return false;

  // 1. Must share at least one token or initial
  const exactMatches = nameTokens.filter(nt => fileTokens.includes(nt));
  const initialMatches = nameTokens.filter(nt => 
    fileTokens.some(ft => ft === nt || (nt.length === 1 && ft.startsWith(nt)))
  );
  if (exactMatches.length === 0 && initialMatches.length === 0) {
    return false;
  }

  // 2. Cross-person collision check:
  // If person has 2+ tokens and file has 2+ tokens, file cannot have completely contradictory first AND last names
  if (nameTokens.length >= 2 && fileTokens.length >= 2) {
    const firstName = nameTokens[0];
    const lastName = nameTokens[nameTokens.length - 1];
    const fileFirst = fileTokens[0];
    const fileLast = fileTokens[fileTokens.length - 1];

    const matchesEndpoints = 
      fileTokens.includes(lastName) ||
      (fileFirst === firstName || fileLast === firstName) ||
      (firstName.length === 1 && fileFirst.startsWith(firstName)) ||
      (lastName.length === 1 && fileLast.startsWith(lastName));

    if (!matchesEndpoints) {
      return false;
    }
  }

  return true;
}

/**
 * Robust imageMap lookup that handles:
 *  1. Exact name match
 *  2. Name with/without title prefixes
 *  3. Token-based matching (First + Last match, ignoring middle names or extra initials)
 *  Guarded by isImageMapValid to reject faulty/contradictory mappings automatically.
 */
export function findInImageMap(name) {
  if (!name) return null;
  const trimmed = name.trim();

  const validate = (url) => (url && isImageMapValid(trimmed, url) ? url : null);

  if (imageMap[trimmed]) {
    const valid = validate(imageMap[trimmed]);
    if (valid) return valid;
  }

  const { fullName, nameWithoutTitle, tokens } = cleanPersonName(trimmed);

  if (nameWithoutTitle && imageMap[nameWithoutTitle]) {
    const valid = validate(imageMap[nameWithoutTitle]);
    if (valid) return valid;
  }

  // Check with common honorifics
  for (const prefix of ['Dr. ', 'Prof. ', 'Dr._', 'Prof._', 'Dr ', 'Prof ']) {
    if (imageMap[prefix + nameWithoutTitle]) {
      const valid = validate(imageMap[prefix + nameWithoutTitle]);
      if (valid) return valid;
    }
  }

  // Token-based match across imageMap keys
  if (tokens.length >= 2) {
    const personFirst = tokens[0].toLowerCase();
    const personLast = tokens[tokens.length - 1].toLowerCase();

    for (const [key, val] of Object.entries(imageMap)) {
      const keyClean = cleanPersonName(key);
      if (keyClean.tokens.length >= 2) {
        const kFirst = keyClean.tokens[0].toLowerCase();
        const kLast = keyClean.tokens[keyClean.tokens.length - 1].toLowerCase();
        if (kFirst === personFirst && kLast === personLast) {
          const valid = validate(val);
          if (valid) return valid;
        }
      }
    }
  }

  return null;
}

/**
 * Score how well a file matches a person's name tokens.
 * Returns 0 if there are contradictory tokens (e.g. different person).
 */
export function scoreMatch(nameTokens, filename) {
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

  // Full exact name match (all person's name tokens match the file tokens)
  if (matchedTokens.length === nameTokens.length && extraTokensInFile.length === 0) {
    return 100;
  }

  // All person's tokens matched, file has extra suffix
  if (matchedTokens.length === nameTokens.length) {
    return 85;
  }

  // First and Last match without contradiction (e.g. 'Unmesh Govind Khati' vs 'Dr._Unmesh_Khati.png')
  if (nameTokens.length >= 2 && fileTokens.includes(nameTokens[0]) && fileTokens.includes(nameTokens[nameTokens.length - 1]) && extraTokensInFile.length === 0) {
    return 80;
  }

  // At least 2 tokens matched with zero extra conflicting tokens (e.g. Popat Jeel Hitendrabhai matching Popat_Jeel.jpg)
  if (matchedTokens.length >= 2 && extraTokensInFile.length === 0) {
    return 75;
  }

  // First name only match without contradiction (e.g. 'Dr. Unmesh Govind Khati' vs 'Dr._Unmesh.png', 'Dr. Golu' vs 'Golu.jpeg')
  if (nameTokens.length >= 1 && fileTokens.length === 1 && fileTokens[0] === nameTokens[0]) {
    return 60;
  }

  return 0;
}

export function bestMatch(personName, fileList, threshold = 35) {
  const nameTokens = tokenise(personName);
  if (!nameTokens.length || !fileList?.length) return null;
  let best = null, bestScore = 0;
  for (const file of fileList) {
    const score = scoreMatch(nameTokens, file);
    if (score > bestScore) { bestScore = score; best = file; }
  }
  return bestScore >= threshold ? { file: best, score: bestScore } : null;
}

export const DEFAULT_AVATAR = './images/default-avatar.png';

/**
 * Generate a smart list of candidate URLs for a person's photo.
 * Prioritized:
 *  1. Exact verified path from data or imageMap
 *  2. Fuzzy manifest match within the person's category folder
 *  3. Generated candidate patterns (Title variations, initials, inverted names, etc.)
 *  4. Roll Number / Email in category folder & images/students/
 *  5. Google Drive URL
 *  6. Guaranteed Default Avatar
 */
export function getPhotoCandidates(name, category, driveUrl, email) {
  const candidates = [];
  const seen = new Set();

  const add = (url) => {
    if (!url || seen.has(url)) return;
    seen.add(url);
    candidates.push(url);
  };

  const folders = foldersToSearch(category);
  const exts = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'webp'];

  // 1. Exact verified path from data or imageMap (Highest Priority)
  if (driveUrl && typeof driveUrl === 'string' && (driveUrl.startsWith('./') || driveUrl.startsWith('/') || driveUrl.startsWith('people_images/'))) {
    add(driveUrl);
  }

  const mappedUrl = findInImageMap(name);
  if (mappedUrl) {
    add(mappedUrl);
    const base = mappedUrl.replace(/\.(jpe?g|png|webp|avif)$/i, '');
    for (const ext of exts) {
      add(`${base}.${ext}`);
    }
  }

  // 2. Dynamic / static manifest match within the person's category folder(s)
  if (_manifest) {
    for (const folder of folders) {
      const fileList = _manifest[folder];
      if (fileList && fileList.length) {
        const match = bestMatch(name, fileList);
        if (match && match.file) {
          add(`./people_images/${folder}/${match.file}`);
        }
      }
    }
  }

  // 3. Smart candidate patterns inside category folder(s)
  if (name) {
    const { fullName, nameWithoutTitle, tokens } = cleanPersonName(name);
    const titles = ['Dr.', 'Dr', 'Prof.', 'Prof'];

    for (const folder of folders) {
      // a. Title + First Name (e.g. Dr._Unmesh.png, Dr_Unmesh.png, Prof._Abhirup.jpg)
      if (tokens.length > 0) {
        const first = tokens[0];
        for (const t of titles) {
          for (const ext of exts) {
            add(`./people_images/${folder}/${t}_${first}.${ext}`);
            add(`./people_images/${folder}/${t}_${first.toLowerCase()}.${ext}`);
            add(`./people_images/${folder}/${t.toLowerCase()}_${first}.${ext}`);
            add(`./people_images/${folder}/${t.toLowerCase()}_${first.toLowerCase()}.${ext}`);
          }
        }
      }

      // b. Full name WITH title (e.g. Dr._Saurabh_Das.jpg, Dr._Unmesh_Govind_Khati.png)
      if (fullName) {
        const fUnder = fullName.replace(/\s+/g, '_');
        const fSpace = fullName.replace(/\s+/g, ' ');
        const fCleanDots = fullName.replace(/\.\s*/g, '_').replace(/_+/g, '_');
        for (const ext of exts) {
          add(`./people_images/${folder}/${fUnder}.${ext}`);
          add(`./people_images/${folder}/${fSpace}.${ext}`);
          add(`./people_images/${folder}/${fCleanDots}.${ext}`);
          add(`./people_images/${folder}/${fUnder.toLowerCase()}.${ext}`);
        }
      }

      // c. Title + First + Last (e.g. Dr._Unmesh_Khati.png)
      if (tokens.length >= 2) {
        const firstLast = `${tokens[0]}_${tokens[tokens.length - 1]}`;
        for (const t of titles) {
          for (const ext of exts) {
            add(`./people_images/${folder}/${t}_${firstLast}.${ext}`);
            add(`./people_images/${folder}/${t}_${firstLast.toLowerCase()}.${ext}`);
          }
        }
      }

      // d. Full name WITHOUT title (e.g. Saurabh_Das.jpg, Unmesh_Govind_Khati.png)
      if (nameWithoutTitle && nameWithoutTitle !== fullName) {
        const nUnder = nameWithoutTitle.replace(/\s+/g, '_');
        const nSpace = nameWithoutTitle.replace(/\s+/g, ' ');
        const nCleanDots = nameWithoutTitle.replace(/\.\s*/g, '_').replace(/_+/g, '_');
        for (const ext of exts) {
          add(`./people_images/${folder}/${nUnder}.${ext}`);
          add(`./people_images/${folder}/${nSpace}.${ext}`);
          add(`./people_images/${folder}/${nCleanDots}.${ext}`);
          add(`./people_images/${folder}/${nUnder.toLowerCase()}.${ext}`);
        }
      }

      // e. First + Last (without title)
      if (tokens.length >= 2) {
        const firstLast = `${tokens[0]}_${tokens[tokens.length - 1]}`;
        for (const ext of exts) {
          add(`./people_images/${folder}/${firstLast}.${ext}`);
          add(`./people_images/${folder}/${firstLast.toLowerCase()}.${ext}`);
        }

        // Inverted: Last + First (e.g. Popat_Jeel.jpg, Waghmare_Pranjal.jpg)
        const lastFirst = `${tokens[tokens.length - 1]}_${tokens[0]}`;
        for (const ext of exts) {
          add(`./people_images/${folder}/${lastFirst}.${ext}`);
          add(`./people_images/${folder}/${lastFirst.toLowerCase()}.${ext}`);
        }
      }

      // f. Single compressed string (e.g. soumavo_ghosh.png, pallavisingh.jpg)
      if (tokens.length >= 2) {
        const joined = tokens.join('').toLowerCase();
        for (const ext of exts) {
          add(`./people_images/${folder}/${joined}.${ext}`);
        }
      }

      // g. First name only (without title e.g. Golu.jpeg, Shubhangi.jpeg)
      if (tokens.length > 0) {
        const first = tokens[0];
        for (const ext of exts) {
          add(`./people_images/${folder}/${first}.${ext}`);
          add(`./people_images/${folder}/${first.toLowerCase()}.${ext}`);
        }
      }
    }
  }

  // 4. Roll number / Email if applicable
  if (email && typeof email === 'string') {
    const roll = email.split('@')[0].trim();
    if (roll) {
      for (const folder of folders) {
        for (const ext of exts) {
          add(`./people_images/${folder}/${roll}.${ext}`);
          add(`./people_images/${folder}/${roll.toUpperCase()}.${ext}`);
        }
      }
      for (const ext of exts) {
        add(`./images/students/${roll}.${ext}`);
        add(`./images/students/${roll.toUpperCase()}.${ext}`);
      }
    }
  }

  // 5. Google Drive URL from Sheets
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


