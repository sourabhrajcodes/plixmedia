# PlixMedia Portfolio Website — Design Spec

**Date:** 2026-08-22
**Owner:** Saksham Raj (video editor), agency name **PlixMedia**

## Goal

Single-page portfolio website that showcases Saksham's video editing work and converts visitors into clients. Dark, cinematic aesthetic. Free static hosting.

## Decisions

- **Structure:** Single-page + lightbox modal for video playback (Option A)
- **Videos:** YouTube/Vimeo embeds, loaded lazily only when the lightbox opens
- **Style:** Dark & cinematic — near-black background (#0a0a0b), red/amber accent, bold typography
- **Tech:** Plain HTML/CSS/JS. No build step. Deploys to Netlify/Vercel/GitHub Pages as-is
- **Work categories:** Multiple niches with filter chips (All / YouTube / Reels & Shorts / Ads / Music Videos — editable)
- **Contact:** Formspree-ready contact form (endpoint placeholder) + social links

## Architecture

```
plixmedia/
  index.html          # all sections
  css/style.css       # styling, responsive breakpoints
  js/projects.js      # PROJECTS data array (user edits this to add work)
  js/main.js          # rendering, filters, lightbox, nav, scroll animations
  assets/
    thumbs/           # project thumbnail images
    hero-poster.jpg   # hero background poster
```

## Sections (top to bottom)

1. **Nav** (fixed): "PLIXMEDIA" wordmark left; Work / About / Contact anchor links right; hamburger menu on mobile.
2. **Hero** (full viewport): dark background image with overlay gradient; eyebrow text "PLIXMEDIA", H1 with Saksham Raj / Video Editor identity, tagline, CTAs: "View My Work" (scrolls to gallery) and "Watch Showreel" (opens lightbox with showreel embed).
3. **Work**: heading + filter chips; responsive grid of cards (thumbnail, category tag, title). Click card → lightbox.
4. **About**: portrait placeholder, bio copy, tool badges (Premiere Pro, After Effects, DaVinci Resolve), stats row (years / projects / clients).
5. **Contact**: Formspree form (name, email, project details) + direct links (email, Instagram, YouTube, WhatsApp placeholders).
6. **Footer**: copyright, back-to-top.

## Data Model (`js/projects.js`)

```js
const PROJECTS = [{
  id: "unique-slug",
  title: "Project title",
  category: "youtube-edit" | "reels" | "ads" | "music-video",
  embedUrl: "https://www.youtube.com/embed/VIDEO_ID",
  thumbnail: "assets/thumbs/slug.jpg",
  description: "1–2 sentence summary",
  client: "Client or 'Personal'",
  year: 2026,
  duration: "3:24"
}];
const SHOWREEL = { embedUrl: "...", ... };
```

Gallery renders from this array. Adding work = adding one object; filters derive from categories present.

## Lightbox Behavior

- Opens on card/showreel click; injects `<iframe>` only then (lazy load)
- Close via X button, ESC key, backdrop click → iframe src cleared so video stops
- Body scroll locked while open; focus moved into modal for accessibility

## Error Handling & Performance

- Missing thumbnail → CSS gradient placeholder with title initial (no broken images)
- `loading="lazy"` + `decoding="async"` on all thumbnails
- Form shows success/error message inline; validation via required fields
- Smooth scrolling; `IntersectionObserver` fade-in reveals; `prefers-reduced-motion` respected

## Verification

Manual browser checks: filters work, lightbox open/close stops video, ESC/backdrop close, mobile layout at 375px/768px widths, form validation states, no console errors.

## Placeholders (user swaps later)

Name is real (Saksham Raj / PlixMedia). Placeholder items: video embed URLs (sample IDs), thumbnails (generated dark placeholders), bio copy, social links, Formspree endpoint.
