/* 3D scroll effects: no libraries. Uses individual CSS transform props
   (rotate / translate) so they stack with existing hover and reveal transforms. */
(function () {
  "use strict";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var doc = document.documentElement;
  var small = window.matchMedia("(max-width: 700px)").matches;
  var tilt = small ? 7 : 14, depth = small ? 30 : 70;
  var SEL = ".skill-card,.timeline>*,.contact-link";

  var bar = document.createElement("div");
  bar.className = "s3d-progress"; bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);

  var hero = document.getElementById("home"), heroCopy = hero && hero.querySelector(".hero-copy");
  var shapes = [];
  if (hero) {
    var box = document.createElement("div");
    box.className = "s3d-shapes"; box.setAttribute("aria-hidden", "true");
    for (var i = 0; i < 3; i++) { var s = document.createElement("span"); s.className = "s3d-shape"; box.appendChild(s); shapes.push(s); }
    hero.insertBefore(box, hero.firstChild);
  }

  var ticking = false;
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function frame() {
    ticking = false;
    var vh = window.innerHeight, y = window.scrollY;
    var max = doc.scrollHeight - vh;
    bar.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";

    // Cards: tilt back and sink when entering/leaving, flatten at screen centre
    var els = document.querySelectorAll(SEL);
    for (var i = 0; i < els.length; i++) {
      var el = els[i], r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      var d = clamp((r.top + r.height / 2 - vh / 2) / (vh / 2), -1, 1);
      var a = Math.abs(d);
      if (!el.classList.contains("s3d-card")) { el.classList.add("s3d-card"); if (el.parentElement) el.parentElement.style.perspective = "1100px"; }
      el.style.rotate = "1 0 0 " + (d * tilt).toFixed(2) + "deg";
      el.style.translate = "0 0 " + (-a * depth).toFixed(1) + "px";
    }

    // Hero: copy tips away in depth as you scroll down
    if (heroCopy) {
      var p = clamp(y / (vh * 0.9), 0, 1);
      heroCopy.parentElement.style.perspective = "1000px";
      heroCopy.style.rotate = "1 0 0 " + (-p * 18).toFixed(2) + "deg";
      heroCopy.style.translate = "0 " + (p * 40).toFixed(1) + "px " + (-p * 160).toFixed(1) + "px";
      heroCopy.style.opacity = (1 - p * 0.7).toFixed(2);
    }
    // Floating shapes: different speeds + spin = parallax depth
    for (var k = 0; k < shapes.length; k++) {
      var sp = (k + 1) * 0.25;
      shapes[k].style.translate = "0 " + (-y * sp * 0.5).toFixed(1) + "px " + (k * 40 + y * 0.05).toFixed(1) + "px";
      shapes[k].style.rotate = "1 1 0 " + (y * (0.04 + k * 0.03) + k * 25).toFixed(1) + "deg";
    }
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener("scroll", req, { passive: true });
  window.addEventListener("resize", req);
  frame();
})();
