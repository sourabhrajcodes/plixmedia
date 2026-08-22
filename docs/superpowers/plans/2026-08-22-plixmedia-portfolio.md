# PlixMedia Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page dark/cinematic portfolio site for PlixMedia / Saksham Raj with filterable video gallery, lightbox playback, about and contact sections.

**Architecture:** Pure static site — `index.html` holds all sections; `js/projects.js` is a data array the owner edits to add work; `js/main.js` renders the gallery/filters/lightbox from that data; `css/style.css` handles all styling and responsiveness. No build step.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, IntersectionObserver), vanilla ES6 JavaScript. YouTube embed URLs (Vimeo compatible).

## Global Constraints

- Colors: bg `#0a0a0b`, elevated surface `#141417`, text `#f5f5f2`, muted `#9b9ba3`, accent `#e63946`
- Fonts (Google Fonts): Bebas Neue (display/headings), Inter (body/UI)
- Breakpoints: ≤900px (tablet/nav collapse), ≤600px (mobile grid single/two-col)
- No frameworks, no build tools, no external JS libraries
- All copy in English; brand name "PLIXMEDIA", person name "Saksham Raj"
- Video embeds load ONLY when lightbox opens (iframe src set on open, cleared on close)
- Respect `prefers-reduced-motion`
- Sample data uses real-format YouTube embed URLs with placeholder video IDs the owner swaps later
- No code comments anywhere (owner gets swap instructions in chat summary)

---

### Task 1: Scaffold project + git init

**Files:**
- Create: `plixmedia/css/style.css` (empty), `plixmedia/js/projects.js` (empty), `plixmedia/js/main.js` (empty), `plixmedia/assets/thumbs/`, `plixmedia/assets/.gitkeep`

**Interfaces:**
- Produces: directory layout all later tasks write into

- [ ] **Step 1:** Create folders/files: `New-Item -ItemType Directory -Force plixmedia\css, plixmedia\js, plixmedia\assets\thumbs`
- [ ] **Step 2:** Init git and commit scaffold (`git init; git add .; git commit -m "chore: scaffold plixmedia portfolio"`)

---

### Task 2: Placeholder artwork (SVG)

**Files:**
- Create: `assets/thumbs/*.svg` (6 files, one per sample project), `assets/hero-poster.svg`

**Interfaces:**
- Produces: thumbnail paths referenced by `js/projects.js` Task 3 (`assets/thumbs/<id>.svg`); hero background referenced by CSS Task 4 (`assets/hero-poster.svg`)

Each thumb: 1280×720 viewBox, dark linear gradient (#141417→#0a0a0b), large Bebas-style initial letters centered at low opacity, thin accent-colored bottom border strip. Hero poster: 1920×1080 dark gradient with soft radial red glow bottom-right.

- [ ] **Step 1:** Write the 6 SVG thumbs named: `yt-doc.svg`, `reel-fitness.svg`, `reel-food.svg`, `ad-skincare.svg`, `mv-neon.svg`, `yt-gaming.svg`
- [ ] **Step 2:** Write `assets/hero-poster.svg`
- [ ] **Step 3:** Commit: `feat: add placeholder svg artwork`

---

### Task 3: Data file `js/projects.js`

**Files:**
- Modify: `js/projects.js`

**Interfaces:**
- Produces globals consumed by `main.js`: `CATEGORIES` (array of `{id, label}`), `PROJECTS` (array of project objects), `SHOWREEL` (object)

Exact shape:

```js
const CATEGORIES = [
  { id: "youtube-edit", label: "YouTube Edits" },
  { id: "reels", label: "Reels & Shorts" },
  { id: "ads", label: "Ads & Commercials" },
  { id: "music-video", label: "Music Videos" }
];

const PROJECTS = [
  {
    id: "yt-doc",
    title: "Mountain documentary cut",
    category: "youtube-edit",
    embedUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    thumbnail: "assets/thumbs/yt-doc.svg",
    description: "A 12-minute travel documentary edited for a creator channel — pacing, color pass, sound design.",
    client: "WanderFrame",
    year: 2026,
    duration: "12:04"
  },
  // reel-fitness (category "reels"), reel-food ("reels"),
  // ad-skincare ("ads"), mv-neon ("music-video"), yt-gaming ("youtube-edit")
];

const SHOWREEL = {
  title: "PlixMedia Showreel",
  description: "One minute of our best frames.",
  embedUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ"
};
```

Six total projects, exactly two per category id except ads/music-video get one each… **final distribution: youtube-edit ×2, reels ×2, ads ×1, music-video ×1** so filters visibly change the grid.

- [ ] **Step 1:** Write full file with all 6 objects (unique ids matching Task 2 svg filenames)
- [ ] **Step 2:** Verify syntax: `node --check js/projects.js` → no output/error
- [ ] **Step 3:** Commit: `feat: project data with six sample works`

---

### Task 4: Markup `index.html`

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: `css/style.css`, `js/projects.js`, `js/main.js`
- Produces DOM hooks used by `main.js`: `#navToggle #navLinks #showreelBtn #filterBar #galleryGrid #aboutStats #lightbox .lightbox-media .lightbox-title .lightbox-meta .lightbox-desc .lightbox-close #contactForm .form-status #year`

Structure order: `<header class="nav">` (logo PLIXMEDIA, links Work/About/Contact, hamburger button) → `<section id="home" class="hero">` (eyebrow "PLIXMEDIA · VIDEO EDITING STUDIO", h1 "Saksham Raj", tagline "I cut stories that keep people watching.", CTAs View My Work → `#work` anchor, Watch Showreel button `#showreelBtn`) → `<section id="work">` (h2 "Selected Work", div `#filterBar`, div `#galleryGrid`) → `<section id="about">` (portrait block with initials monogram, bio paragraphs, tool badges Premiere Pro / After Effects / DaVinci Resolve / Audition, `#aboutStats` filled by JS: years/projects/clients) → `<section id="contact">` (h2 "Let's build something worth watching.", form posting to `https://formspree.io/f/YOUR_FORM_ID` with name/email/message + `.form-status` div, direct link list: email, Instagram, YouTube, WhatsApp hrefs `#`) → `<footer>` (© `#year` PlixMedia, back-to-top) → lightbox overlay `<div id="lightbox" hidden>` containing `.lightbox-close`, `.lightbox-media` (16:9 iframe container), `.lightbox-title`, `.lightbox-meta`, `.lightbox-desc`. Load scripts at end of body: `projects.js` then `main.js`.

- [ ] **Step 1:** Write full HTML per structure above (Google Fonts link: Bebas Neue + Inter)
- [ ] **Step 2:** Open in browser → page renders unstyled-but-complete, no missing section
- [ ] **Step 3:** Commit: `feat: page markup for all sections`

---

### Task 5: Styling `css/style.css`

**Files:**
- Modify: `css/style.css`

**Interfaces:**
- Consumes: all Task 4 class/id hooks; `assets/hero-poster.svg`

Spec: `:root` custom properties from Global Constraints; reset; `body` Inter, bg var, `scroll-behavior:smooth`; `.nav` fixed top, blurred translucent bg, logo Bebas letter-spaced with accent dot; `.hero` min-height 100vh, layered background `linear-gradient(rgba(10,10,11,.55), rgba(10,10,11,.92)), url(../assets/hero-poster.svg) center/cover`, h1 Bebas clamp(3rem→7rem); buttons: solid accent + ghost outline variants, hover lift; `#filterBar` flex chips, `.active` chip accent-filled; `#galleryGrid` CSS grid `repeat(auto-fill,minmax(300px,1fr))`, gap 1.25rem; card: thumbnail aspect-ratio 16/9 object-cover, hover scale 1.04 + accent border, category tag pill, duration badge bottom-right; about two-column (≤900px stacks), badges outlined pills; contact form dark inputs, focus accent ring; lightbox: fixed inset-0 rgba(0,0,0,.85) backdrop-blur, media box max-width 960px 16:9; `.reveal` opacity/translate transition applied by JS observer; `@media (prefers-reduced-motion: reduce)` kills transitions/smooth-scroll; responsive: ≤900px nav collapses to hamburger panel, hero text scales, ≤600px stats stack, grid minmax 240px.

- [ ] **Step 1:** Write stylesheet (~450 lines) covering everything above
- [ ] **Step 2:** Browser check desktop 1440px + DevTools 375px → no overflow, readable contrast
- [ ] **Step 3:** Commit: `feat: dark cinematic styling and responsive layout`

---

### Task 6: Behavior `js/main.js`

**Files:**
- Modify: `js/main.js`

**Interfaces:**
- Consumes: `CATEGORIES`, `PROJECTS`, `SHOWREEL` (Task 3); DOM hooks (Task 4)
- Produces working filters/lightbox/form

Functions:

```js
function renderFilters() {}        // "All" chip + one per CATEGORIES; click → setActiveFilter(id) + renderGallery(id)
function renderGallery(filterId) {} // PROJECTS filtered; builds <article class="card" data-id> with img/thumbnail fallback (onerror hides img revealing gradient), tag, title, duration badge; click → openLightbox(project)
function openLightbox(item) {}      // unhide #lightbox, set iframe src=item.embedUrl + autoplay=1, fill title/meta(`client · year · duration`)/desc, lock body scroll, focus close btn, remember opener for focus return
function closeLightbox() {}         // hide, clear iframe src (stops audio), unlock scroll
```

Plus: ESC key closes lightbox; backdrop click (target === #lightbox) closes; hamburger toggles `.open` on `#navLinks`, closes on link click; `IntersectionObserver` adds `.visible` to `.reveal` elements (sections/cards); stats hardcoded render into `#aboutStats` (3+ Years, 40+ Projects, 25+ Clients); form submit intercepted → if action contains YOUR_FORM_ID show status "Demo form — connect Formspree ID first." else fetch POST and show success/error; `#year` ← current year.

- [ ] **Step 1:** Write `main.js` implementing all above
- [ ] **Step 2:** `node --check js/main.js` → clean
- [ ] **Step 3:** Browser verify: filter chips re-render grid; card click plays video in modal; ESC/X/backdrop stop playback; mobile menu opens/closes; reveal animations fire once
- [ ] **Step 4:** Commit: `feat: gallery rendering, filters, lightbox, nav, form states`

---

### Task 7: Final verification sweep

- [ ] **Step 1:** Full-page walkthrough desktop + 375px mobile: anchors scroll correctly, all 6 cards visible under "All", counts correct per filter
- [ ] **Step 2:** Console: zero errors/warnings
- [ ] **Step 3:** Fix anything found, final commit: `chore: final polish`
