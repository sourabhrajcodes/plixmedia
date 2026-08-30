const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const filterBar = document.getElementById("filterBar");
const galleryGrid = document.getElementById("galleryGrid");
const phoneSection = document.getElementById("phoneSection");
const phoneGrid = document.getElementById("phoneGrid");
const aboutStats = document.getElementById("aboutStats");
const contactForm = document.getElementById("contactForm");
const formStatus = document.querySelector(".form-status");
const yearEl = document.getElementById("year");
const lightbox = document.getElementById("lightbox");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxMedia = document.querySelector(".lightbox-media");
const lightboxTitle = document.querySelector(".lightbox-title");
const lightboxMeta = document.querySelector(".lightbox-meta");
const lightboxDesc = document.querySelector(".lightbox-desc");

let activeFilter = "all";
let lastFocused = null;

function categoryLabel(id) {
  const cat = CATEGORIES.find((c) => c.id === id);
  return cat ? cat.label : id;
}

function initials(title) {
  return title
    .split(/\s+/)
    .filter((w) => /[a-zA-Z0-9]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function renderFilters() {
  const chips = [{ id: "all", label: "All" }, ...CATEGORIES];
  chips.forEach(({ id, label }) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip" + (id === activeFilter ? " active" : "");
    chip.textContent = label;
    chip.dataset.filter = id;
    chip.setAttribute("aria-pressed", String(id === activeFilter));
    chip.addEventListener("click", () => {
      activeFilter = id;
      filterBar.querySelectorAll(".chip").forEach((c) => {
        c.classList.remove("active");
        c.setAttribute("aria-pressed", "false");
      });
      chip.classList.add("active");
      chip.setAttribute("aria-pressed", "true");
      renderGallery(id);
    });
    filterBar.appendChild(chip);
  });
}

function makeCard(project, isPhone) {
  const card = document.createElement("article");
  card.className = "card reveal" + (isPhone ? " card-phone" : "");
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Play ${project.title}`);

  const thumb = document.createElement("div");
  thumb.className = "thumb";

  const fallback = document.createElement("span");
  fallback.className = "thumb-fallback";
  fallback.textContent = initials(project.title);

  const img = document.createElement("img");
  img.src = project.thumbnail;
  img.alt = project.title;
  img.loading = "lazy";
  img.decoding = "async";
  img.addEventListener("error", () => img.remove());

  const playBadge = document.createElement("span");
  playBadge.className = "play-badge";
  playBadge.textContent = "\u25B6";

  thumb.append(fallback, img);

  if (!isPhone) thumb.appendChild(playBadge);

  if (project.duration) {
    const duration = document.createElement("span");
    duration.className = "duration";
    duration.textContent = project.duration;
    thumb.appendChild(duration);
  }

  const body = document.createElement("div");
  body.className = "card-body";

  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = categoryLabel(project.category);

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = project.title;

  body.append(tag, title);

  if (project.client) {
    const client = document.createElement("p");
    client.className = "card-client";
    client.textContent = project.client;
    body.appendChild(client);
  }

  card.append(thumb, body);

  const open = () => openLightbox(project);
  card.addEventListener("click", open);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  });

  return card;
}

function renderGallery(filterId) {
  galleryGrid.innerHTML = "";
  phoneGrid.innerHTML = "";

  let landscape = [];
  let phones = [];

  if (filterId === "all") {
    phones = PROJECTS.filter((p) => p.category === "reels");
    landscape = PROJECTS.filter((p) => p.category !== "reels");
  } else if (filterId === "reels") {
    phones = PROJECTS.filter((p) => p.category === "reels");
  } else {
    landscape = PROJECTS.filter((p) => p.category === filterId);
  }

  phoneSection.hidden = phones.length === 0;

  landscape.forEach((project) => {
    const card = makeCard(project, false);
    galleryGrid.appendChild(card);
    observeReveal(card);
  });

  phones.forEach((project) => {
    const card = makeCard(project, true);
    phoneGrid.appendChild(card);
    observeReveal(card);
  });
}

function buildEmbedUrl(url) {
  if (url.includes("drive.google.com")) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}autoplay=1&rel=0`;
}

function isPortrait(item) {
  return item.category === "reels" || item.category === "music-video";
}

function fillLightbox(item) {
  const portrait = isPortrait(item);
  lightboxMedia.classList.toggle("portrait", portrait);

  const iframe = document.createElement("iframe");
  iframe.src = buildEmbedUrl(item.embedUrl);
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen";
  iframe.allowFullscreen = true;
  iframe.title = item.title;
  lightboxMedia.innerHTML = "";
  lightboxMedia.appendChild(iframe);

  const fsBtn = document.createElement("button");
  fsBtn.className = "lightbox-fs";
  fsBtn.setAttribute("aria-label", "Fullscreen");
  fsBtn.textContent = "\u26F6";
  fsBtn.addEventListener("click", () => {
    if (document.fullscreenElement === lightboxMedia) {
      document.exitFullscreen();
    } else {
      (lightboxMedia.requestFullscreen || lightboxMedia.webkitRequestFullscreen || (() => iframe.requestFullscreen())).call(lightboxMedia).catch(() => {
        if (iframe.requestFullscreen) iframe.requestFullscreen().catch(() => {});
      });
    }
  });
  lightboxMedia.appendChild(fsBtn);

  document.addEventListener("fullscreenchange", function onFs() {
    fsBtn.textContent = document.fullscreenElement === lightboxMedia ? "\u2715" : "\u26F6";
  }, { once: false });

  lightboxTitle.textContent = item.title;
  lightboxDesc.textContent = item.description || "";

  const metaParts = [item.client, item.year, item.duration].filter(Boolean);
  lightboxMeta.textContent = metaParts.join(" \u00B7 ");
  lightboxMeta.style.display = metaParts.length ? "" : "none";
}

let scrollY = 0;

function openLightbox(item) {
  lastFocused = document.activeElement;
  scrollY = window.scrollY;
  fillLightbox(item);
  lightbox.hidden = false;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxMedia.innerHTML = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  document.body.style.overflow = "";
  window.scrollTo(0, scrollY);
  if (lastFocused) lastFocused.focus();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (!lightbox.hidden) closeLightbox();
    else if (navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      document.body.classList.remove("menu-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.focus();
    }
  }
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

lightboxClose.addEventListener("click", closeLightbox);

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("click", (e) => {
  if (
    navLinks.classList.contains("open") &&
    !navLinks.contains(e.target) &&
    !navToggle.contains(e.target)
  ) {
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900 && navLinks.classList.contains("open")) {
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

let touchStartY = 0;
lightbox.addEventListener(
  "touchstart",
  (e) => {
    touchStartY = e.touches[0].clientY;
  },
  { passive: true }
);
lightbox.addEventListener(
  "touchmove",
  (e) => {
    const delta = e.touches[0].clientY - touchStartY;
    if (delta > 80 && e.target === lightbox) closeLightbox();
  },
  { passive: true }
);

const showreelBtn = document.getElementById("showreelBtn");
showreelBtn.addEventListener("click", () => openLightbox(SHOWREEL));

let observer = null;

function observeReveal(el) {
  if (!observer) return;
  observer.observe(el);
}

if ("IntersectionObserver" in window) {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
}

document.querySelectorAll(".reveal").forEach(observeReveal);

const STATS = [
  { value: "3", suffix: "+", label: "Years" },
  { value: "40", suffix: "+", label: "Projects" },
  { value: "25", suffix: "+", label: "Clients" }
];

STATS.forEach(({ value, suffix, label }) => {
  const stat = document.createElement("div");
  stat.className = "stat";
  const b = document.createElement("b");
  b.append(value);
  const em = document.createElement("em");
  em.textContent = suffix;
  b.appendChild(em);
  const small = document.createElement("small");
  small.textContent = label;
  stat.append(b, small);
  aboutStats.appendChild(stat);
});

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const action = contactForm.getAttribute("action") || "";

  if (action.includes("YOUR_FORM_ID")) {
    formStatus.className = "form-status err";
    formStatus.textContent =
      "Demo form \u2014 connect a Formspree ID first to receive messages.";
    return;
  }

  try {
    const res = await fetch(action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    formStatus.className = "form-status ok";
    formStatus.textContent = "Message sent! I'll get back to you soon.";
    contactForm.reset();
  } catch (err) {
    formStatus.className = "form-status err";
    formStatus.textContent = "Something went wrong. Please email me directly.";
  }
});

yearEl.textContent = new Date().getFullYear();

renderFilters();
renderGallery(activeFilter);
