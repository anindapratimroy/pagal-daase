# DAASE — Department of Astronomy, Astrophysics & Space Engineering
### Indian Institute of Technology Indore (IIT Indore)

Official website for the Department of Astronomy, Astrophysics and Space Engineering (DAASE) at IIT Indore.

---

## 🌌 Overview

DAASE is India's premier center for frontier space science, astronomy, astrophysics, and space engineering research. Home to India's first B.Tech. in Space Science & Engineering, founding member of the Square Kilometre Array India Consortium (SKA-IC), and an active partner in international research with ISRO, NASA, JAXA, and leading global universities.

---

## 🏗️ Repository Architecture

- **`daase-react/`** — React 19 + Vite source code containing all interactive UI components, hooks, styling, and data resolution pipelines.
- **`daase-static-website/`** — Production distribution ready for web server hosting (e.g. CloudPanel, Apache, Nginx, GitHub Pages).
  - `assets/` — Production-bundled and minified JavaScript and CSS files.
  - `images/` — Branding, banners, research graphics, and collaborator logos.
  - `people_images/` — Faculty, scholars, students, and staff directory photographs.
  - `HSPTP-main/` — Solarverse interactive 3D solar system exploration viewer (submodule).
- **`generate-manifest.js`** — Build script to index local photo assets into `photos_manifest.json`.

---

## ⚡ Dynamic Google Sheets API Integration

The website automatically queries the departmental Google Sheets endpoint in real-time to render live updates without code modifications:
- **Faculty & Visiting Profiles**: Designations, research domains, office/chamber numbers, phone extensions, email handles, and personal webpage URLs.
- **Recent Publications**: Filtered and normalized research publications linked directly to their official DOIs (`https://doi.org/...`).
- **News & Announcements**: Dynamic marquee ticker and chronological departmental updates.
- **Upcoming & Past Events**: Workshops, seminars, colloquia, and conferences.
- **Academic Programs & Opportunities**: Student internships, PhD admissions, and faculty openings.

---

## 🚀 Development & Build Workflow

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Local Development
```bash
cd daase-react
npm install
npm run dev
```

### Production Build & Deployment Sync
```bash
# 1. Build the optimized React application
cd daase-react
npm run build

# 2. Sync build artifacts to the static website directory for CloudPanel
cd ..
rm -f daase-static-website/assets/index-*.js daase-static-website/assets/index-*.css
cp daase-react/dist/assets/index-*.js daase-static-website/assets/
cp daase-react/dist/assets/index-*.css daase-static-website/assets/
cp daase-react/dist/index.html daase-static-website/index.html
```

---

## 🌐 CloudPanel Deployment
The contents of `daase-static-website/` represent the production root to be uploaded to your CloudPanel document root (`htdocs/` or `public_html/`).

---

© Department of Astronomy, Astrophysics and Space Engineering, IIT Indore.
