/* ============================================================
   main.js — Site Engine
   Everything on the page is rendered from data.js. No hardcoded content.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- helpers ---------- */
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  /* photo with automatic fallback to the placeholder */
  const PHOTO_ATTRS = `src="${esc(PROFILE.photo)}" onerror="this.onerror=null;this.src='${esc(PROFILE.photoFallback)}'" alt="${esc(PROFILE.name)}"`;

  /* ============================================================
     1. THEME
     ============================================================ */
  function initTheme() {
    const saved = localStorage.getItem("awa-theme");
    const theme = saved || "dark";
    document.documentElement.setAttribute("data-theme", theme);
  }

  function bindThemeToggle() {
    const btn = $("#themeBtn");
    if (!btn) return;
    const paint = () => {
      const t = document.documentElement.getAttribute("data-theme");
      btn.textContent = t === "dark" ? "☀" : "☾";
      btn.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
    };
    paint();
    btn.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("awa-theme", next);
      paint();
      toast(next === "dark" ? "🌙 Dark mode" : "☀️ Light mode");
    });
  }

  /* ============================================================
     2. TOAST
     ============================================================ */
  let toastTimer;
  function toast(msg) {
    let el = $("#toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    requestAnimationFrame(() => el.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }

  /* ============================================================
     3. NAVBAR + FOOTER  (injected on every page)
     ============================================================ */
  function buildNavbar() {
    const page = document.body.dataset.page || "home";
    const links = NAV_LINKS.map((l) => {
      const active = l.page === page ? " class=\"active\"" : "";
      return `<li><a href="${esc(l.href)}"${active}>${esc(l.label)}</a></li>`;
    }).join("");

    return `
      <nav class="navbar" id="navbar">
        <div class="nav-inner">
          <a href="index.html" class="brand" aria-label="${esc(PROFILE.name)} — Home">
            <img class="brand-avatar" ${PHOTO_ATTRS}>
            <span class="brand-text">
              <span class="brand-name">${esc(PROFILE.name)}</span>
              <span class="brand-role">${esc(PROFILE.role)}</span>
            </span>
          </a>

          <ul class="nav-links" id="navLinks">${links}</ul>

          <div class="nav-actions">
            <button class="icon-btn" id="themeBtn" type="button" aria-label="Toggle theme">☀</button>
            <a class="btn btn-primary btn-sm" href="contact.html">Hire Me</a>
            <button class="icon-btn nav-toggle" id="navToggle" type="button" aria-label="Toggle menu">☰</button>
          </div>
        </div>
      </nav>`;
  }

  function buildFooter() {
    const year = new Date().getFullYear();
    const nav = NAV_LINKS.map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`).join("");
    const socials = [
      { label: "GitHub", href: PROFILE.github },
      { label: "Email",  href: "mailto:" + PROFILE.email },
      { label: "WhatsApp", href: PROFILE.whatsapp },
      { label: "Call " + PROFILE.phone, href: "tel:" + PROFILE.phoneIntl }
    ].filter((s) => s.href)
     .map((s) => `<li><a href="${esc(s.href)}"${s.href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${esc(s.label)}</a></li>`)
     .join("");

    return `
      <footer>
        <div class="wrap">
          <div class="foot-grid">
            <div>
              <div class="foot-brand">
                <img ${PHOTO_ATTRS}>
                <div>
                  <b>${esc(PROFILE.name)}</b>
                  <span>${esc(PROFILE.role)}</span>
                </div>
              </div>
              <p>${esc(PROFILE.tagline)}</p>
              <p style="font-size:.85rem;color:var(--text-3)">
                <span class="dot" style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#22c55e;margin-right:7px"></span>
                ${esc(PROFILE.availability)}
              </p>
            </div>
            <div>
              <h4>Navigate</h4>
              <ul class="foot-links">${nav}</ul>
            </div>
            <div>
              <h4>Get In Touch</h4>
              <ul class="foot-links">${socials}</ul>
            </div>
          </div>
          <div class="foot-bottom">
            <span>© ${year} ${esc(PROFILE.name)}. All rights reserved.</span>
            <span>Handcrafted with HTML · CSS · JavaScript</span>
          </div>
        </div>
      </footer>`;
  }

  function mountChrome() {
    const navHost = $("#navHost");
    const footHost = $("#footHost");
    if (navHost) navHost.outerHTML = buildNavbar();
    if (footHost) footHost.outerHTML = buildFooter();
  }

  function bindNav() {
    const nav = $("#navbar");
    const toggle = $("#navToggle");
    const links = $("#navLinks");

    if (toggle && links) {
      toggle.addEventListener("click", () => {
        links.classList.toggle("open");
        toggle.textContent = links.classList.contains("open") ? "✕" : "☰";
      });
      links.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
          links.classList.remove("open");
          toggle.textContent = "☰";
        }
      });
    }

    if (nav) {
      const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
  }

  /* ============================================================
     4. REVEAL ON SCROLL + BARS + COUNTERS
     ============================================================ */
  function initReveal() {
    const items = $$(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((i) => i.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        io.unobserve(en.target);

        /* animate any progress bars inside */
        $$(".bar i", en.target).forEach((bar) => {
          bar.style.width = (bar.dataset.level || 0) + "%";
        });
        /* animate counters inside */
        $$("[data-count]", en.target).forEach(runCounter);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });

    items.forEach((i) => io.observe(i));
  }

  function runCounter(el) {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    const target = parseFloat(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || "";
    const dur = 1400;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
  }

  /* ============================================================
     5. TYPING EFFECT
     ============================================================ */
  function initTyping() {
    const el = $("#typer");
    if (!el) return;
    const words = PROFILE.roles.slice();
    let w = 0, c = 0, deleting = false;

    (function tick() {
      const word = words[w];
      c += deleting ? -1 : 1;
      el.textContent = word.slice(0, c);
      let delay = deleting ? 42 : 88;

      if (!deleting && c === word.length) { deleting = true; delay = 1700; }
      else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 320; }

      setTimeout(tick, delay);
    })();
  }

  /* ============================================================
     6. RENDERERS  (data.js -> DOM)
     ============================================================ */

  /* ---- hero identity ---- */
  function renderHero() {
    const host = $("#heroIdentity");
    if (!host) return;
    host.innerHTML = `
      <span class="eyebrow">${esc(PROFILE.availability)}</span>
      <h1>Hi, I'm <span class="gradient-text">${esc(PROFILE.name)}</span></h1>
      <div class="type-line"><span id="typer"></span><span class="cursor"></span></div>
      <p class="hero-sub">${esc(PROFILE.tagline)}</p>
      <div class="hero-cta">
        <a class="btn btn-primary" href="projects.html">View My Projects →</a>
        <a class="btn btn-ghost" href="contact.html">Get In Touch</a>
      </div>
      <div class="hero-meta">
        <div><strong data-count="${ABOUT.stats[0].value}" data-suffix="${ABOUT.stats[0].suffix}">0</strong><span>Projects</span></div>
        <div><strong data-count="${ABOUT.stats[1].value}" data-suffix="${ABOUT.stats[1].suffix}">0</strong><span>DB Tables</span></div>
        <div><strong data-count="${ABOUT.stats[2].value}" data-suffix="${ABOUT.stats[2].suffix}">0</strong><span>User Roles</span></div>
        <div><strong data-count="${ABOUT.stats[3].value}" data-suffix="${ABOUT.stats[3].suffix}">0</strong><span>Pages</span></div>
      </div>`;
    initTyping();
    $$("[data-count]", host).forEach(runCounter);
  }

  /* ---- marquee ---- */
  function renderMarquee() {
    const host = $("#marquee");
    if (!host) return;
    const items = ["HTML5", "CSS3", "JavaScript", "PHP 8", "MySQL", "Bootstrap 5", "Git & GitHub", "Responsive Design", "REST APIs", "UI Engineering"];
    const row = items.map((i) => `<span>${esc(i)}</span>`).join("");
    host.innerHTML = `<div class="marquee-track">${row}${row}</div>`;
  }

  /* ---- stats strip ---- */
  function renderStats() {
    const host = $("#statsGrid");
    if (!host) return;
    host.innerHTML = ABOUT.stats.map((s) => `
      <div class="card stat-card reveal">
        <div class="num" data-count="${s.value}" data-suffix="${esc(s.suffix)}">0</div>
        <div class="lbl">${esc(s.label)}</div>
      </div>`).join("");
  }

  /* ---- skills ---- */
  function renderSkills() {
    const host = $("#skillsGrid");
    if (!host) return;
    host.innerHTML = SKILL_GROUPS.map((g) => `
      <div class="card skill-group reveal">
        <h3><span>${esc(g.icon)}</span> ${esc(g.title)}</h3>
        ${g.skills.map((s) => `
          <div class="skill-row">
            <div class="skill-top"><span>${esc(s.name)}</span><em>${s.level}%</em></div>
            <div class="bar"><i data-level="${s.level}"></i></div>
          </div>`).join("")}
      </div>`).join("");
  }

  /* ---- services ---- */
  function renderServices() {
    const host = $("#servicesGrid");
    if (!host) return;
    host.innerHTML = SERVICES.map((s) => `
      <div class="card mini-card reveal">
        <span class="ic">${esc(s.icon)}</span>
        <h4>${esc(s.title)}</h4>
        <p>${esc(s.text)}</p>
      </div>`).join("");
  }

  /* ---- principles ---- */
  function renderPrinciples() {
    const host = $("#principlesGrid");
    if (!host) return;
    host.innerHTML = ABOUT.principles.map((p) => `
      <div class="card mini-card reveal">
        <span class="ic gradient-text">${esc(p.icon)}</span>
        <h4>${esc(p.title)}</h4>
        <p>${esc(p.text)}</p>
      </div>`).join("");
  }

  /* ---- about teaser on the home page ---- */
  function renderHomeAbout() {
    const host = $("#homeAbout");
    if (!host) return;
    const first = ABOUT.paragraphs[0];
    const second = ABOUT.paragraphs[2];
    host.innerHTML = `
      <span class="eyebrow">About Me</span>
      <h2 style="font-size:clamp(1.7rem,3.6vw,2.4rem)">I build systems, <span class="gradient-text">not just pages</span></h2>
      <p>${first}</p>
      <p>${second}</p>
      <ul class="tech-list" style="margin:22px 0 26px">
        ${["PHP 8", "MySQL", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Git"].map((t) => `<li>${esc(t)}</li>`).join("")}
      </ul>
      <div class="hero-cta" style="margin-bottom:0">
        <a class="btn btn-primary" href="about.html">Read The Full Story →</a>
        <a class="btn btn-ghost" href="projects.html">Projects</a>
      </div>`;
  }

  /* ---- about page body ---- */
  function renderAboutPage() {
    const body = $("#aboutBody");
    if (body) {
      body.innerHTML =
        `<div class="quote reveal">${esc(ABOUT.headline)}</div>` +
        ABOUT.paragraphs.map((p) => `<p class="reveal">${p}</p>`).join("");
    }

    const tl = $("#timeline");
    if (tl) {
      tl.innerHTML = ABOUT.timeline.map((t) => `
        <div class="tl-item reveal">
          <div class="tl-year">${esc(t.year)}</div>
          <h4>${esc(t.title)}</h4>
          <p>${esc(t.text)}</p>
        </div>`).join("");
    }
  }

  /* ---- project card ---- */
  function projectCard(p) {
    const flags = [
      p.featured ? `<span class="flag live">Featured</span>` : "",
      `<span class="flag">${esc(p.category)}</span>`
    ].join("");

    return `
      <article class="card project-card reveal" data-cat="${esc(p.category)}" data-id="${esc(p.id)}">
        <div class="project-top">
          <div class="project-icon" style="background:${esc(p.accent)}22;border-color:${esc(p.accent)}55">${esc(p.icon)}</div>
          <div class="project-flags">${flags}</div>
        </div>
        <div class="project-body">
          <h3>${esc(p.title)}</h3>
          <div class="sub">${esc(p.subtitle)}</div>
          <p>${esc(p.short)}</p>
          <ul class="tech-list">${p.tech.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        </div>
        <div class="gh-stats" data-repo="${esc(p.repo)}">
          <span class="loading">⟳ Loading GitHub stats…</span>
        </div>
        <div class="project-foot">
          <button class="btn btn-primary btn-sm" data-open="${esc(p.id)}" type="button">View Details</button>
          <a class="btn btn-ghost btn-sm" href="${esc(p.url)}" target="_blank" rel="noopener">GitHub ↗</a>
        </div>
      </article>`;
  }

  function renderProjects(opts) {
    opts = opts || {};
    const host = $("#projectsGrid");
    if (!host) return;
    const list = opts.featuredOnly ? PROJECTS.filter((p) => p.featured) : PROJECTS;
    host.innerHTML = list.map(projectCard).join("");
    loadGitHubStats();
    bindProjectModal();
  }

  /* ---- project modal ---- */
  function openProject(id) {
    const p = PROJECTS.find((x) => x.id === id);
    if (!p) return;

    const modal = $("#projectModal");
    const box = $("#modalContent");
    if (!modal || !box) return;

    box.innerHTML = `
      <button class="modal-close" id="modalClose" type="button" aria-label="Close">✕</button>
      <div class="project-icon" style="background:${esc(p.accent)}22;border-color:${esc(p.accent)}55;margin-bottom:16px">${esc(p.icon)}</div>
      <h2>${esc(p.title)}</h2>
      <div class="sub">${esc(p.subtitle)}</div>
      <p>${esc(p.long)}</p>

      <h4>Key Highlights</h4>
      <ul class="hl-list">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>

      <h4>At A Glance</h4>
      <div class="mini-stats">
        ${p.stats.map((s) => `<div class="mini-stat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join("")}
      </div>

      <h4>Tech Stack</h4>
      <ul class="tech-list">${p.tech.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>

      <div class="project-foot" style="padding:26px 0 0">
        <a class="btn btn-primary btn-sm" href="${esc(p.url)}" target="_blank" rel="noopener">View Source Code ↗</a>
        <button class="btn btn-ghost btn-sm" data-close type="button">Close</button>
      </div>`;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    box.scrollTop = 0;

    $("#modalClose").addEventListener("click", closeProject);
    $$("[data-close]", box).forEach((b) => b.addEventListener("click", closeProject));
  }

  function closeProject() {
    const modal = $("#projectModal");
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  function bindProjectModal() {
    $$("[data-open]").forEach((btn) => {
      btn.addEventListener("click", () => openProject(btn.dataset.open));
    });
  }

  /* ---- live GitHub stats (truly dynamic) ---- */
  const ghCache = {};
  function loadGitHubStats() {
    $$(".gh-stats[data-repo]").forEach(async (host) => {
      const repo = host.dataset.repo;
      const url = `https://api.github.com/repos/${PROFILE.githubUser}/${repo}`;
      try {
        let data = ghCache[repo];
        if (!data) {
          const res = await fetch(url);
          if (!res.ok) throw new Error("HTTP " + res.status);
          data = await res.json();
          ghCache[repo] = data;
        }
        const updated = data.pushed_at ? new Date(data.pushed_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";
        host.innerHTML = `
          <span>★ ${data.stargazers_count} Stars</span>
          <span>⑂ ${data.forks_count} Forks</span>
          <span>● ${esc(data.language || "Code")}</span>
          <span>⟳ Updated ${esc(updated)}</span>`;
      } catch (err) {
        host.innerHTML = `
          <span>★ —</span><span>⑂ —</span><span>● ${esc("Code")}</span>
          <span style="opacity:.7">Live stats unavailable (offline / rate limit)</span>`;
      }
    });
  }

  /* ---- filters ---- */
  function bindFilters() {
    const bar = $("#filterBar");
    if (!bar) return;
    bar.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      $$(".chip", bar).forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const f = chip.dataset.filter;
      $$("#projectsGrid .project-card").forEach((card) => {
        const show = f === "all" || card.dataset.cat === f;
        card.style.display = show ? "" : "none";
        if (show) {
          card.classList.remove("in");
          requestAnimationFrame(() => card.classList.add("in"));
        }
      });
    });
  }

  /* ---- contact page ---- */
  function renderContact() {
    const host = $("#contactCards");
    if (host) {
      const rows = [
        { ic: "✉", label: "Email",     value: PROFILE.email, href: "mailto:" + PROFILE.email },
        { ic: "☎", label: "Phone",     value: PROFILE.phone, href: "tel:" + PROFILE.phoneIntl },
        { ic: "💬", label: "WhatsApp",  value: PROFILE.phone, href: PROFILE.whatsapp },
        { ic: "⌘", label: "GitHub",    value: "@" + PROFILE.githubUser, href: PROFILE.github },
        { ic: "⌖", label: "Location",  value: PROFILE.location, href: "" }
      ];
      host.innerHTML = rows.map((r) => `
        <a class="contact-card reveal" ${r.href ? `href="${esc(r.href)}"${r.href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}` : ""}>
          <span class="ic">${esc(r.ic)}</span>
          <span>
            <small>${esc(r.label)}</small>
            <b>${esc(r.value)}</b>
          </span>
        </a>`).join("");
    }

    const sub = $("#cfSubject") || $("#subject");
    if (sub) {
      sub.innerHTML = `<option value="">-- Select an option --</option>` +
        CONTACT_SUBJECTS.map((s) => `<option value="${esc(s)}">${esc(s)}</option>`).join("");
    }
  }

  function bindContactForm() {
    const form = $("#contactForm");
    if (!form) return;

    const fields = {
      name:    { el: $("#cfName"),    test: (v) => v.trim().length >= 2 || "Please enter at least 2 characters" },
      email:   { el: $("#cfEmail"),   test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Please enter a valid email address" },
      subject: { el: $("#cfSubject"), test: (v) => v.trim() !== "" || "Please select a subject" },
      message: { el: $("#cfMessage"), test: (v) => v.trim().length >= 10 || "Please write at least 10 characters" }
    };

    Object.values(fields).forEach((f) => {
      if (!f.el) return;
      f.el.addEventListener("input", () => {
        f.el.classList.remove("err");
        const box = f.el.parentElement.querySelector(".msg");
        if (box) box.textContent = "";
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;

      Object.values(fields).forEach((f) => {
        if (!f.el) return;
        const res = f.test(f.el.value);
        const box = f.el.parentElement.querySelector(".msg");
        if (res === true) {
          f.el.classList.remove("err");
          if (box) box.textContent = "";
        } else {
          ok = false;
          f.el.classList.add("err");
          if (box) box.textContent = res;
        }
      });

      if (!ok) { toast("⚠️ Please fix the highlighted fields"); return; }

      const name = $("#cfName").value.trim();
      const email = $("#cfEmail").value.trim();
      const subject = $("#cfSubject").value.trim();
      const message = $("#cfMessage").value.trim();

      const body = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`;
      const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;

      const note = $("#formNote");
      if (note) {
        note.textContent = `✅ Thank you ${name}! Your email client is opening — just press send. You can also write to ${PROFILE.email} directly.`;
        note.classList.add("show");
      }
      toast("✅ Opening your email client…");
      form.reset();
    });
  }

  /* ---- copy email ---- */
  function bindCopy() {
    $$("[data-copy]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const text = btn.dataset.copy;
        try {
          await navigator.clipboard.writeText(text);
          toast("📋 Copied: " + text);
        } catch {
          toast("Could not copy — please copy it manually");
        }
      });
    });
  }

  /* ---- back to top ---- */
  function bindToTop() {
    const btn = $("#toTop");
    if (!btn) return;
    window.addEventListener("scroll", () => {
      btn.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---- page-specific bits ---- */
  function renderPageBits() {
    const ctaHost = $("#ctaBand");
    if (ctaHost) {
      ctaHost.innerHTML = `
        <div class="cta-band reveal">
          <h2>Have a project in mind?</h2>
          <p>If you have an idea — small or large — tell me about it. I can turn it into a working web application.</p>
          <a class="btn btn-ghost" href="contact.html">Start a Conversation →</a>
        </div>`;
    }
  }

  /* ---- preloader ---- */
  function hidePreloader() {
    const pre = $("#preloader");
    if (!pre) return;
    setTimeout(() => pre.classList.add("done"), 260);
  }

  /* ============================================================
     BOOT
     ============================================================ */
  function boot() {
    initTheme();
    mountChrome();
    bindNav();
    bindThemeToggle();

    renderHero();
    renderMarquee();
    renderStats();
    renderSkills();
    renderServices();
    renderPrinciples();
    renderHomeAbout();
    renderAboutPage();
    renderProjects({ featuredOnly: document.body.dataset.page === "home" });
    bindFilters();
    renderContact();
    bindContactForm();
    bindCopy();
    bindToTop();
    renderPageBits();

    /* modal close on backdrop / Esc */
    const modal = $("#projectModal");
    if (modal) {
      modal.addEventListener("click", (e) => { if (e.target === modal) closeProject(); });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeProject(); });
    }

    initReveal();
    hidePreloader();

    /* keep counters alive for late-rendered nodes */
    $$("[data-count]").forEach((el) => {
      if (el.closest(".reveal")) return;
      runCounter(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  /* expose for debugging */
  window.AWA = { PROFILE, PROJECTS, openProject, toast };
})();
