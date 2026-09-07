<?php
/**
 * DAASE Photo Manifest Updater
 * ─────────────────────────────────────────────────────────
 * Visit: aase.iiti.ac.in/update_manifest.php?key=daase2025
 *
 * This scans the people_images/ folder on the server and
 * writes a fresh photos_manifest.json automatically.
 *
 * Office staff workflow:
 *  1. Upload photo to people_images/<Category>/ via CloudPanel
 *  2. Visit this URL in browser
 *  3. Done — photo appears on website immediately, no rebuild needed
 * ─────────────────────────────────────────────────────────
 */

// ── Simple password protection ─────────────────────────────────
$SECRET_KEY = 'daase2025';   // Change this to something secure
if (($_GET['key'] ?? '') !== $SECRET_KEY) {
    http_response_code(403);
    echo '<h2>403 Forbidden</h2><p>Missing or wrong key. Add ?key=daase2025 to the URL.</p>';
    exit;
}

// ── Config ────────────────────────────────────────────────────
$photosDir    = __DIR__ . '/people_images';
$outputFile   = __DIR__ . '/photos_manifest.json';
$imageExts    = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'avif'];

// ── Scan folders ──────────────────────────────────────────────
if (!is_dir($photosDir)) {
    http_response_code(500);
    echo '<p>ERROR: people_images/ folder not found on server.</p>';
    exit;
}

$manifest    = [];
$totalPhotos = 0;
$categories  = [];

foreach (scandir($photosDir) as $entry) {
    if ($entry === '.' || $entry === '..') continue;
    $fullPath = $photosDir . '/' . $entry;
    if (!is_dir($fullPath)) continue;

    $files = [];
    foreach (scandir($fullPath) as $file) {
        if ($file === '.' || $file === '..') continue;
        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        if (in_array($ext, $imageExts)) {
            $files[] = $file;
        }
    }
    sort($files);
    $manifest[$entry] = $files;
    $totalPhotos += count($files);
    $categories[] = ['name' => $entry, 'count' => count($files)];
}

// ── Write manifest ────────────────────────────────────────────
$json = json_encode($manifest, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
if (file_put_contents($outputFile, $json) === false) {
    http_response_code(500);
    echo '<p>ERROR: Could not write photos_manifest.json. Check file permissions.</p>';
    exit;
}

// ── Success response ──────────────────────────────────────────
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DAASE — Photo Manifest Updated</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #0a1432; color: #fff; padding: 40px; max-width: 600px; margin: 0 auto; }
    h1 { color: #ffd97a; font-size: 22px; }
    .ok { background: rgba(74,222,128,0.15); border: 1px solid #4ade80; border-radius: 10px; padding: 16px 20px; margin: 20px 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px; }
    th { text-align: left; color: #ffd97a; padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.1); }
    td { padding: 6px 12px; border-bottom: 1px solid rgba(255,255,255,0.06); }
    .count { color: #4ade80; font-weight: bold; }
    .note { margin-top: 24px; font-size: 13px; color: rgba(255,255,255,0.55); }
  </style>
</head>
<body>
  <h1>✅ Photo Manifest Updated!</h1>
  <div class="ok">
    <strong><?= $totalPhotos ?> photos</strong> indexed across
    <strong><?= count($categories) ?> folders</strong>.<br>
    The website will now show these photos automatically.
  </div>

  <table>
    <tr><th>Folder</th><th>Photos Found</th></tr>
    <?php foreach ($categories as $cat): ?>
    <tr>
      <td><?= htmlspecialchars($cat['name']) ?></td>
      <td class="count"><?= $cat['count'] ?></td>
    </tr>
    <?php endforeach; ?>
  </table>

  <p class="note">
    📌 Bookmark this page. Every time you upload new photos via CloudPanel,
    come back here and refresh to update the index.<br><br>
    URL: <code>aase.iiti.ac.in/update_manifest.php?key=<?= htmlspecialchars($SECRET_KEY) ?></code>
  </p>
</body>
</html>
