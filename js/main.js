const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const filterBar = document.getElementById("filterBar");
const galleryGrid = document.getElementById("galleryGrid");
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
    chip.addEventListener("click", () => {
      activeFilter = id;
      filterBar.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      renderGallery(id);
    });
    filterBar.appendChild(chip);
  });
}

function renderGallery(filterId) {
  galleryGrid.innerHTML = "";
  const items =
    filterId === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filterId);

  items.forEach((project) => {
    const card = document.createElement("article");
    card.className = "card reveal";
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

    thumb.append(fallback, img, playBadge);

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
    card.append(thumb, body);

    const open = () => openLightbox(project);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });

    galleryGrid.appendChild(card);
    observeReveal(card);
  });
}

function buildEmbedUrl(url) {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}autoplay=1&rel=0`;
}

function fillLightbox(item) {
  const iframe = document.createElement("iframe");
  iframe.src = buildEmbedUrl(item.embedUrl);
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;
  iframe.title = item.title;
  lightboxMedia.innerHTML = "";
  lightboxMedia.appendChild(iframe);

  lightboxTitle.textContent = item.title;
  lightboxDesc.textContent = item.description || "";

  const metaParts = [item.client, item.year, item.duration].filter(Boolean);
  lightboxMeta.textContent = metaParts.join(" \u00B7 ");
  lightboxMeta.style.display = metaParts.length ? "" : "none";
}

function openLightbox(item) {
  lastFocused = document.activeElement;
  fillLightbox(item);
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxMedia.innerHTML = "";
  document.body.style.overflow = "";
  if (lastFocused) lastFocused.focus();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
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
