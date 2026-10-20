/* Photo-to-particles scroll effect: the hero portrait dissolves into round dots
   as you scroll down and re-forms as you scroll back up. No libraries. */
(function () {
  "use strict";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var box = document.querySelector(".hero .portrait");
  var img = box && box.querySelector("img");
  if (!img) return;

  var cv = document.createElement("canvas");
  cv.setAttribute("aria-hidden", "true");
  cv.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2";
  box.appendChild(cv);
  var ctx = cv.getContext("2d"), parts = [], W = 0, H = 0, dpr = 1, ready = false, lastP = -1;

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function rnd(a, b) { return a + Math.random() * (b - a); }

  function build() {
    var r = box.getBoundingClientRect();
    W = Math.round(r.width); H = Math.round(r.height);
    if (!W || !H || !img.naturalWidth) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = W * dpr; cv.height = H * dpr;
    var off = document.createElement("canvas"); off.width = W; off.height = H;
    var o = off.getContext("2d");
    // same crop as object-fit:cover + object-position:50% 20%
    var iw = img.naturalWidth, ih = img.naturalHeight, sc = Math.max(W / iw, H / ih);
    var sw = W / sc, sh = H / sc;
    o.drawImage(img, (iw - sw) * 0.5, (ih - sh) * 0.2, sw, sh, 0, 0, W, H);
    var data;
    try { data = o.getImageData(0, 0, W, H).data; } catch (e) { return; } // blocked on file://
    var cell = W < 260 ? 5 : 6;
    parts = [];
    for (var y = cell / 2; y < H; y += cell) {
      for (var x = cell / 2; x < W; x += cell) {
        var i = ((y | 0) * W + (x | 0)) * 4, R = data[i], G = data[i + 1], B = data[i + 2];
        var lum = 0.299 * R + 0.587 * G + 0.114 * B;
        if (lum > 185) continue; // bright background stays out, like the video's cut-out
        parts.push({
          x: x, y: y, r: cell * 0.5, c: "rgb(" + R + "," + G + "," + B + ")",
          d: (1 - x / W) * 0.35 + Math.random() * 0.2,  // sweep starts on the right
          vx: rnd(0.2, 1.6) * W * 0.5, vy: rnd(-0.5, 0.6) * H * 0.4, g: rnd(0.1, 0.5) * H * 0.6, s: rnd(0.4, 1)
        });
      }
    }
    ready = true; lastP = -1; draw();
  }

  function draw() {
    if (!ready) return;
    var p = clamp(window.scrollY / (window.innerHeight * 0.85), 0, 1);
    if (p === lastP) return; lastP = p;
    img.style.opacity = String(clamp(1 - p * 6, 0, 1));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    if (p <= 0) return;
    for (var i = 0; i < parts.length; i++) {
      var q = parts[i], t = clamp((p - q.d * 0.5) / 0.55, 0, 1);
      var e = t * t * (3 - 2 * t);
      var a = 1 - Math.pow(t, 1.6); if (a <= 0.01) continue;
      ctx.globalAlpha = a; ctx.fillStyle = q.c; ctx.beginPath();
      ctx.arc(q.x + q.vx * e, q.y + q.vy * e + q.g * e * e, Math.max(q.r * (1 - 0.65 * e) * q.s + q.r * (1 - q.s) * (1 - e), 0.3), 0, 6.2832);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  var tick = false;
  function req() { if (!tick) { tick = true; requestAnimationFrame(function () { tick = false; draw(); }); } }
  window.addEventListener("scroll", req, { passive: true });
  var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(build, 200); });
  if (img.complete) build(); else img.addEventListener("load", build);
})();
