#!/usr/bin/env node
/**
 * DAASE Photo Manifest Generator
 * ─────────────────────────────────────────────────────────
 * Scans all people_images/ subfolders and writes
 * daase-static-website/photos_manifest.json
 *
 * Run with:  node generate-manifest.js
 * Or add to package.json scripts for convenience.
 *
 * This file is safe to run any time — it never deletes photos.
 * ─────────────────────────────────────────────────────────
 */

const fs   = require('fs');
const path = require('path');

const PHOTOS_DIR  = path.join(__dirname, 'daase-static-website', 'people_images');
const OUTPUT_FILE = path.join(__dirname, 'daase-static-website', 'photos_manifest.json');
const REACT_PUBLIC_OUTPUT = path.join(__dirname, 'daase-react', 'public', 'photos_manifest.json');

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.avif']);

function scanFolder(folderPath) {
  if (!fs.existsSync(folderPath)) return [];
  return fs.readdirSync(folderPath)
    .filter(file => IMAGE_EXTS.has(path.extname(file).toLowerCase()))
    .sort();
}

function generate() {
  if (!fs.existsSync(PHOTOS_DIR)) {
    console.error('ERROR: people_images/ folder not found at:', PHOTOS_DIR);
    process.exit(1);
  }

  const categories = fs.readdirSync(PHOTOS_DIR)
    .filter(name => fs.statSync(path.join(PHOTOS_DIR, name)).isDirectory())
    .sort();

  const manifest = {};
  let totalPhotos = 0;

  for (const category of categories) {
    const files = scanFolder(path.join(PHOTOS_DIR, category));
    manifest[category] = files;
    totalPhotos += files.length;
    console.log(`  ${category}: ${files.length} photos`);
  }

  const jsonStr = JSON.stringify(manifest, null, 2);
  fs.writeFileSync(OUTPUT_FILE, jsonStr, 'utf-8');
  try {
    const pubDir = path.dirname(REACT_PUBLIC_OUTPUT);
    if (!fs.existsSync(pubDir)) fs.mkdirSync(pubDir, { recursive: true });
    fs.writeFileSync(REACT_PUBLIC_OUTPUT, jsonStr, 'utf-8');
  } catch (e) {
    // ignore
  }

  console.log('\n✅ photos_manifest.json generated successfully!');
  console.log(`   Total: ${totalPhotos} photos across ${categories.length} categories`);
  console.log(`   Saved to: ${OUTPUT_FILE}`);
  console.log(`   Saved to: ${REACT_PUBLIC_OUTPUT}`);
  console.log('\n   Upload this file to your server via CloudPanel.');
  console.log('   Or visit: aase.iiti.ac.in/update_manifest.php?key=daase2025\n');
}

generate();
