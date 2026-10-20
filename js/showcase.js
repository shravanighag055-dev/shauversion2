/* Pinned "wheel" project index: scroll advances the active project.
   The list curves like a wheel (blur/fade/shift by distance); the card swaps. */
(function () {
  "use strict";
  var P = window.PROJECTS, sec = document.getElementById("showcase");
  var list = document.getElementById("scList"), card = document.getElementById("scCard");
  if (!P || !sec || !list || !card) return;
  var N = P.length, reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var STEP = 56, pos = 0, target = 0, active = -1, raf = 0;
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  list.innerHTML = P.map(function (p, i) {
    return '<li><button type="button" data-i="' + i + '"><i></i>' + esc(p.title) + "</button></li>";
  }).join("");
  var btns = [].slice.call(list.querySelectorAll("button"));
  if (reduce) sec.classList.add("sc-static");
  else sec.style.height = "calc(100vh + " + (N - 1) * 52 + "vh)";

  function setActive(i) {
    if (i === active) return; active = i;
    var p = P[i];
    card.innerHTML = '<div class="sc-img"><img src="assets/img/projects/' + esc(p.id) + '.webp" alt="" width="483" height="504"></div>' +
      '<div class="sc-tags"><span>' + esc(p.category) + "</span><span>" + esc(p.period) + "</span></div>" +
      "<h3>" + esc(p.title) + "</h3><p>" + esc(p.summary) + "</p>" +
      '<ul class="tags">' + p.tech.slice(0, 5).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
      '<button type="button" class="btn sc-open">View details →</button>' +
      '<span class="sc-count">' + String(i + 1).padStart(2, "0") + " / " + String(N).padStart(2, "0") + "</span>";
    card.classList.remove("swap"); void card.offsetWidth; card.classList.add("swap");
    btns.forEach(function (b, k) { b.classList.toggle("on", k === i); b.setAttribute("aria-current", k === i ? "true" : "false"); });
  }

  function render() {
    for (var i = 0; i < N; i++) {
      var d = i - pos, a = Math.abs(d);
      var s = btns[i].parentNode.style;
      if (a > 4.2) { s.opacity = 0; s.visibility = "hidden"; continue; }
      s.visibility = "visible";
      s.opacity = Math.max(0, 1 - a * 0.27).toFixed(2);
      s.filter = "blur(" + Math.min(a * 1.5, 6).toFixed(1) + "px)";
      s.transform = "translate3d(" + (-a * a * 5).toFixed(1) + "px," + (d * STEP).toFixed(1) + "px,0) rotateX(" + (-d * 9).toFixed(1) + "deg) scale(" + (1 - Math.min(a * 0.05, 0.25)).toFixed(3) + ")";
    }
    setActive(clamp(Math.round(pos), 0, N - 1));
  }

  function readTarget() {
    var r = sec.getBoundingClientRect(), span = r.height - window.innerHeight;
    target = span > 0 ? clamp(-r.top / span, 0, 1) * (N - 1) : 0;
  }
  function loop() {
    raf = 0; pos += (target - pos) * 0.16;
    if (Math.abs(target - pos) < 0.002) pos = target; else raf = requestAnimationFrame(loop);
    render();
  }
  function onScroll() { if (reduce) return; readTarget(); if (!raf) raf = requestAnimationFrame(loop); }

  list.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    var i = +b.dataset.i;
    if (reduce) { pos = target = i; render(); return; }
    var span = sec.offsetHeight - window.innerHeight, top = sec.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (i / (N - 1)) * span, behavior: "smooth" });
  });
  card.addEventListener("click", function (e) {
    if (!e.target.closest(".sc-open")) return;
    window.openProject(P[active].id, e.target);
  });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  readTarget(); pos = target; render();
})();
