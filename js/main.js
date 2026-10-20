/* ==========================================================================
   Portfolio behaviour. Content lives in js/data.js — you rarely need to edit this file.
   ========================================================================== */
(function () {
  "use strict";
  var S = window.SITE, PROJECTS = window.PROJECTS, CERTS = window.CERTS;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Small helpers ---------- */
  $("#year").textContent = new Date().getFullYear();
  $$("[data-cert-count]").forEach(function (el) { el.textContent = CERTS.length; });

  /* ---------- Navigation ---------- */
  var nav = $("#nav"), menuBtn = $("#menuBtn"), links = $("#navlinks");
  function setMenu(open) {
    links.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  menuBtn.addEventListener("click", function () { setMenu(!links.classList.contains("open")); });
  $$("a", links).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && links.classList.contains("open")) { setMenu(false); menuBtn.focus(); }
  });

  /* Scroll state: header shadow, to-top button, active link */
  var toTop = $("#toTop");
  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 8);
    toTop.hidden = window.scrollY < 600;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  if ("IntersectionObserver" in window) {
    var secs = $$("main section[id]");
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          $$("a", links).forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    secs.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Skills ---------- */
  $("#skillsGrid").innerHTML = window.SKILLS.map(function (g) {
    return '<article class="skill-card reveal"><div class="skill-icon" aria-hidden="true">' + esc(g.icon) + '</div><h3>' +
      esc(g.group) + '</h3><ul class="tags">' + g.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></article>";
  }).join("");

  /* ---------- Contact form select ---------- */
  var svcSelect = $("#cService");
  window.SERVICES.map(function (s) { return s.title; }).concat(["Something else / general enquiry"]).forEach(function (t) {
    var o = document.createElement("option"); o.value = t; o.textContent = t; svcSelect.appendChild(o);
  });

  /* ---------- Generic filter + search list ---------- */
  function makeList(cfg) {
    var state = { cat: "All", q: "" };
    var cats = ["All"].concat(cfg.items.reduce(function (acc, it) {
      if (acc.indexOf(it.category) < 0) acc.push(it.category); return acc;
    }, []));
    if (cfg.order) cats = ["All"].concat(cfg.order.filter(function (c) { return cats.indexOf(c) > -1; }));
    var fEl = $(cfg.filters);
    fEl.innerHTML = cats.map(function (c) {
      var n = c === "All" ? cfg.items.length : cfg.items.filter(function (i) { return i.category === c; }).length;
      return '<button type="button" class="chip" data-cat="' + esc(c) + '" aria-pressed="' + (c === "All") + '">' + esc(c) + '<span class="n">' + n + "</span></button>";
    }).join("");
    function render() {
      var q = state.q.trim().toLowerCase();
      var out = cfg.items.filter(function (it) {
        return (state.cat === "All" || it.category === state.cat) && (!q || cfg.haystack(it).toLowerCase().indexOf(q) > -1);
      });
      $(cfg.grid).innerHTML = out.map(cfg.card).join("");
      $(cfg.empty).hidden = out.length > 0;
      $(cfg.count).textContent = "Showing " + out.length + " of " + cfg.items.length + " " + cfg.noun;
      cfg.current = out;
    }
    fEl.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      state.cat = b.dataset.cat;
      $$(".chip", fEl).forEach(function (c) { c.setAttribute("aria-pressed", String(c === b)); });
      render();
    });
    $(cfg.search).addEventListener("input", function (e) { state.q = e.target.value; render(); });
    $(cfg.reset).addEventListener("click", function () {
      state = { cat: "All", q: "" }; $(cfg.search).value = "";
      $$(".chip", fEl).forEach(function (c) { c.setAttribute("aria-pressed", String(c.dataset.cat === "All")); });
      render();
    });
    $(cfg.grid).addEventListener("click", function (e) {
      var b = e.target.closest("[data-id]"); if (b) cfg.open(b.dataset.id, b);
    });
    render();
    return cfg;
  }

  /* ---------- Project detail modal ---------- */
  function openProject(id, trigger) {
    var p = PROJECTS.filter(function (x) { return x.id === id; })[0]; if (!p) return;
    var linkBtns = "";
    if (p.github) linkBtns += '<a class="btn small" href="' + esc(p.github) + '" target="_blank" rel="noopener noreferrer">GitHub repository ↗</a>';
    if (p.demo) linkBtns += '<a class="btn small primary" href="' + esc(p.demo) + '" target="_blank" rel="noopener noreferrer">Live demo ↗</a>';
    openModal('<div class="m-kicker">' + esc(p.category) + " · " + esc(p.period) + '</div><h2 id="modalTitle">' + esc(p.title) + '</h2><p class="m-sub">' + esc(p.kind) + "</p>" +
      '<div class="m-block"><h3>Problem it addresses</h3><p>' + esc(p.problem) + "</p></div>" +
      '<div class="m-block"><h3>Overview</h3><p>' + esc(p.summary) + "</p></div>" +
      '<div class="m-block"><h3>My contribution</h3><ul class="list">' + p.contribution.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="m-block"><h3>Technologies</h3><ul class="tags">' + p.tech.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="m-block"><h3>Links</h3><div class="m-links">' + linkBtns +
      (linkBtns ? "" : '<span class="m-note">No public repository or live demo has been added for this project yet.</span>') + "</div></div>", trigger);
  }
  window.openProject = openProject;

  /* ---------- Certificates ---------- */
  var certList = makeList({
    items: CERTS, noun: "certificates",
    filters: "#certFilters", grid: "#certGrid", empty: "#certEmpty", count: "#certCount",
    search: "#certSearch", reset: "#certReset",
    haystack: function (c) { return [c.title, c.issuer, c.category, c.date].join(" "); },
    card: function (c) {
      var sub = c.date || c.note || "";
      var thumbExt = c.thumbExt || "webp";
      return '<button type="button" class="cert" data-id="' + esc(c.id) + '" aria-haspopup="dialog">' +
        '<div class="cert-thumb"><img src="assets/certs/thumbs/' + esc(c.id) + "." + esc(thumbExt) + '" loading="lazy" decoding="async" width="560" height="390" alt="Preview of the ' + esc(c.title) + ' certificate from ' + esc(c.issuer) + '"></div>' +
        '<div class="cert-meta"><span class="cat">' + esc(c.category) + "</span><strong>" + esc(c.title) + "</strong><span>" + esc(c.issuer) + (sub ? " · " + esc(sub) : "") + "</span></div></button>";
    },
    open: function (id, trigger) { openCert(id, trigger); }
  });

  function openCert(id, trigger) {
    var list = certList.current && certList.current.length ? certList.current : CERTS;
    var idx = -1; list.forEach(function (c, i) { if (c.id === id) idx = i; });
    if (idx < 0) { list = CERTS; list.forEach(function (c, i) { if (c.id === id) idx = i; }); }
    var c = list[idx];
    var orig = "assets/certs/originals/" + c.id + "." + c.ext;
    var previewExt = c.previewExt || "webp";
    var navBtns = list.length > 1 ?
      '<div class="m-nav"><button type="button" class="btn small" data-step="-1">← Previous</button><button type="button" class="btn small" data-step="1">Next →</button></div>' : "";
    openModal('<div class="m-kicker">' + esc(c.category) + '</div><h2 id="modalTitle">' + esc(c.title) + '</h2><p class="m-sub">' + esc(c.issuer) +
      (c.date ? " · Issued " + esc(c.date) : "") + (c.note ? " · " + esc(c.note) : "") + (c.code ? " · ID " + esc(c.code) : "") + "</p>" +
      '<div class="m-img"><img src="assets/certs/previews/' + esc(c.id) + "." + esc(previewExt) + '" alt="' + esc(c.title) + " certificate issued to Shravani Ghag by " + esc(c.issuer) + '"></div>' +
      '<div class="m-links"><a class="btn small primary" href="' + esc(orig) + '" target="_blank" rel="noopener noreferrer">Open original ' + (c.ext === "pdf" ? "PDF" : "image") + ' ↗</a></div>' + navBtns,
      trigger, true);
    window.dispatchEvent(new CustomEvent("certificatechange", { detail: { id: c.id } }));
    $$("[data-step]", $("#modalBody")).forEach(function (b) {
      b.addEventListener("click", function () {
        var n = list[(idx + Number(b.dataset.step) + list.length) % list.length];
        openCert(n.id, lastTrigger);
        var again = $("[data-step='" + b.dataset.step + "']", $("#modalBody")); if (again) again.focus();
      });
    });
  }
  window.openCertificateModal = openCert;

  var otherList = $("#otherList");
  otherList.innerHTML = window.OTHER_RECOGNITION.map(function (t) {
    return '<article class="recognition-card">' + esc(t) + "</article>";
  }).join("");

  /* ---------- Modal (focus trap, Esc, backdrop click) ---------- */
  var modal = $("#modal"), panel = $(".modal-panel", modal), body = $("#modalBody"), lastTrigger = null;
  function openModal(html, trigger, wide) {
    body.innerHTML = html;
    panel.classList.toggle("wide", !!wide);
    if (trigger) lastTrigger = trigger;
    if (modal.hidden) { modal.hidden = false; document.body.style.overflow = "hidden"; }
    panel.scrollTop = 0; panel.focus();
  }
  function closeModal() {
    modal.hidden = true; document.body.style.overflow = ""; body.innerHTML = "";
    if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
  }
  modal.addEventListener("click", function (e) { if (e.target.hasAttribute("data-close")) closeModal(); });
  document.addEventListener("keydown", function (e) {
    if (modal.hidden) return;
    if (e.key === "Escape") { closeModal(); return; }
    if (e.key === "Tab") {
      var f = $$("a[href],button:not([disabled])", panel).filter(function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- Contact form ---------- */
  var form = $("#contactForm"), status = $("#formStatus");
  var rules = {
    name: function (v) { return v.trim().length >= 2 ? "" : "Please enter your name."; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address."; },
    service: function (v) { return v ? "" : "Please choose a service."; },
    message: function (v) { return v.trim().length >= 10 ? "" : "Please write at least 10 characters."; }
  };
  var ids = { name: "cName", email: "cEmail", service: "cService", message: "cMessage" };
  function check(k) {
    var el = $("#" + ids[k]), msg = rules[k](el.value), wrap = el.closest(".field");
    wrap.classList.toggle("invalid", !!msg);
    el.setAttribute("aria-invalid", String(!!msg));
    $("#" + ids[k] + "Err").textContent = msg;
    return !msg;
  }
  Object.keys(ids).forEach(function (k) {
    $("#" + ids[k]).addEventListener("blur", function () { check(k); });
    $("#" + ids[k]).addEventListener("input", function () { if ($("#" + ids[k]).closest(".field").classList.contains("invalid")) check(k); });
  });
  function show(type, text) { status.className = "form-status " + type; status.textContent = text; }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var results = Object.keys(ids).map(check);
    if (results.indexOf(false) > -1) {
      show("bad", "Please fix the highlighted fields and try again.");
      var firstBad = $(".field.invalid input, .field.invalid select, .field.invalid textarea", form); if (firstBad) firstBad.focus();
      return;
    }
    var data = {};
    Object.keys(ids).forEach(function (k) { data[k] = $("#" + ids[k]).value.trim(); });

    if (S.formEndpoint) {
      /* Optional: works only after you add a form endpoint (e.g. Formspree) in js/data.js */
      show("ok", "Sending…");
      fetch(S.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error("bad status"); show("ok", "Thank you, " + data.name + "! Your message was sent. I'll reply by email."); form.reset(); })
        .catch(function () { show("bad", "Sorry, the message could not be sent. Please email me directly at " + S.email + "."); });
      return;
    }
    /* Default: mailto — opens the visitor's own email app. */
    var subject = "Portfolio enquiry: " + data.service;
    var bodyText = "Hi Shravani,\n\n" + data.message + "\n\nService: " + data.service + "\nName: " + data.name + "\nEmail: " + data.email;
    window.location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(bodyText);
    show("ok", "Your email app should now open with the message ready to send. If nothing opened, email me directly at " + S.email + ".");
  });

  /* ---------- Entrance animations ---------- */
  var rev = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("show"); io.unobserve(en.target); } });
    }, { threshold: 0.1 });
    rev.forEach(function (el) { io.observe(el); });
  } else { rev.forEach(function (el) { el.classList.add("show"); }); }
})();
