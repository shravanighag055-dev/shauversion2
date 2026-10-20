(function () {
  "use strict";

  var section = document.getElementById("certificates");
  var scrollWrap = document.getElementById("certRingScroll");
  var pin = scrollWrap && scrollWrap.querySelector(".cert-ring-pin");
  var stage = document.getElementById("certRing");
  var itemList = document.getElementById("certRingItems");
  var center = document.getElementById("certRingCenter");
  var grid = document.getElementById("certGrid");
  var filters = document.getElementById("certFilters");
  var search = document.getElementById("certSearch");
  var reset = document.getElementById("certReset");
  var featureButton = document.querySelector("[data-open-certificate]");
  var modalBody = document.getElementById("modalBody");
  var certs = window.CERTS;
  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!section || !scrollWrap || !pin || !stage || !itemList || !center || !grid ||
      !filters || !search || !reset || !certs || !certs.length ||
      motionQuery.matches || typeof window.openCertificateModal !== "function") return;

  // Tune these together: orbit radius, active thumbnail scale, scroll distance, and easing speed.
  var RING_RADIUS_RATIO = 0.36;
  var ACTIVE_SCALE = 2;
  var SCROLL_SVh_PER_CERTIFICATE = 45;
  var EASING_SPEED = 0.14;
  var items = [];
  var buttons = [];
  var pos = 0;
  var targetPos = 0;
  var activeIndex = -1;
  var frameId = 0;
  var fadeTimer = 0;
  var drag = null;
  var suppressClick = false;
  var interactionTarget = false;

  var copy = document.createElement("div");
  copy.className = "cert-ring-copy";
  var title = document.createElement("h3");
  var issuer = document.createElement("p");
  issuer.className = "cert-ring-issuer";
  var date = document.createElement("p");
  date.className = "cert-ring-date";
  var category = document.createElement("span");
  category.className = "cert-ring-category";
  var view = document.createElement("button");
  view.type = "button";
  view.className = "cert-ring-view";
  view.textContent = "View certificate";
  copy.appendChild(title);
  copy.appendChild(issuer);
  copy.appendChild(date);
  copy.appendChild(category);
  copy.appendChild(view);
  var counter = document.createElement("span");
  counter.className = "cert-ring-count";
  counter.setAttribute("aria-label", "Certificate number");
  center.appendChild(copy);
  center.appendChild(counter);

  function modulo(value, count) {
    return ((value % count) + count) % count;
  }

  function nearestEquivalent(value, index, count) {
    var current = modulo(Math.round(value), count);
    var delta = index - current;
    if (delta > count / 2) delta -= count;
    if (delta < -count / 2) delta += count;
    return value + delta;
  }

  function setCenter(cert, index) {
    copy.classList.add("is-changing");
    window.clearTimeout(fadeTimer);
    fadeTimer = window.setTimeout(function () {
      title.textContent = cert.title;
      issuer.textContent = cert.issuer;
      date.textContent = cert.date || cert.note || "";
      date.hidden = !date.textContent;
      category.textContent = cert.category;
      counter.textContent = String(index + 1).padStart(2, "0") + " / " + items.length;
      window.requestAnimationFrame(function () { copy.classList.remove("is-changing"); });
    }, 150);
  }

  function activeItem() {
    if (!items.length) return null;
    return items[modulo(Math.round(pos), items.length)];
  }

  function openCertificate(cert, button) {
    window.openCertificateModal(cert.id, button);
  }

  function syncActive(nextIndex) {
    if (nextIndex === activeIndex || !items.length) return;
    activeIndex = nextIndex;
    buttons.forEach(function (button, i) {
      var distance = Math.abs(i - activeIndex);
      distance = Math.min(distance, items.length - distance);
      button.setAttribute("aria-current", String(i === activeIndex));
      var image = button.querySelector("img");
      image.loading = distance <= 2 ? "eager" : "lazy";
      if (distance === 0) image.setAttribute("fetchpriority", "high");
      else image.removeAttribute("fetchpriority");
    });
    setCenter(items[activeIndex], activeIndex);
  }

  function renderFrame() {
    frameId = 0;
    if (!items.length) return;

    pos += (targetPos - pos) * EASING_SPEED;
    if (Math.abs(targetPos - pos) < 0.001) pos = targetPos;

    var count = items.length;
    var active = modulo(Math.round(pos), count);
    syncActive(active);

    buttons.forEach(function (button, i) {
      // 90deg is the bottom in screen coordinates; subtracting pos rotates each item toward it.
      var angle = (90 + (i - pos) * (360 / count)) * Math.PI / 180;
      var x = Math.cos(angle) * stage.clientWidth * RING_RADIUS_RATIO;
      var y = Math.sin(angle) * stage.clientHeight * RING_RADIUS_RATIO;
      var distance = Math.abs(i - pos) % count;
      distance = Math.min(distance, count - distance);
      var scale = ACTIVE_SCALE - 1.4 * Math.min(distance / (count / 2), 1);
      var opacity = 1 - 0.42 * Math.min(distance / (count / 2), 1);
      button.style.setProperty("--ring-x", x.toFixed(2) + "px");
      button.style.setProperty("--ring-y", y.toFixed(2) + "px");
      button.style.setProperty("--ring-scale", scale.toFixed(3));
      button.style.opacity = opacity.toFixed(3);
      button.style.zIndex = String(Math.round(scale * 10));
    });

    if (Math.abs(targetPos - pos) >= 0.001) {
      frameId = window.requestAnimationFrame(renderFrame);
      return;
    }
    if (interactionTarget) {
      interactionTarget = false;
      targetPos = pos = modulo(targetPos, count);
      scrollToPosition(targetPos);
    }
  }

  function animate() {
    if (!frameId) frameId = window.requestAnimationFrame(renderFrame);
  }

  function updateScrollHeight() {
    var extra = Math.max(0, items.length - 1) * SCROLL_SVh_PER_CERTIFICATE;
    scrollWrap.style.height = "calc(100svh + " + extra + "svh)";
  }

  function currentScrollTarget() {
    if (items.length < 2) return 0;
    var available = scrollWrap.offsetHeight - pin.offsetHeight;
    if (available <= 0) return 0;
    var start = scrollWrap.getBoundingClientRect().top + window.scrollY;
    var step = available / (items.length - 1);
    return Math.max(0, Math.min(items.length - 1, (window.scrollY - start) / step));
  }

  function scrollToPosition(index) {
    if (items.length < 2) return;
    var available = scrollWrap.offsetHeight - pin.offsetHeight;
    if (available <= 0) return;
    var start = scrollWrap.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: start + available * index / (items.length - 1), behavior: "instant" });
  }

  function createItem(cert, index) {
    var li = document.createElement("li");
    var button = document.createElement("button");
    var image = document.createElement("img");
    button.type = "button";
    button.className = "cert-ring-item";
    button.setAttribute("aria-label", "Certificate: " + cert.title + ", " + cert.issuer);
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute("aria-current", "false");
    image.src = "assets/certs/thumbs/" + cert.id + "." + (cert.thumbExt || "webp");
    image.alt = "";
    image.width = 560;
    image.height = 390;
    image.decoding = "async";
    image.loading = index < 3 || index >= items.length - 2 ? "eager" : "lazy";
    button.appendChild(image);
    button.addEventListener("click", function () {
      if (suppressClick) return;
      targetPos = nearestEquivalent(targetPos, index, items.length);
      animate();
      openCertificate(cert, button);
    });
    li.appendChild(button);
    itemList.appendChild(li);
    buttons.push(button);
  }

  function orderFilterChips() {
    var desired = ["All", "Programming", "Data & AI", "Digital Marketing", "Career & Business"];
    desired.forEach(function (name) {
      var button = filters.querySelector('.chip[data-cat="' + name.replace(/"/g, '\\"') + '"]');
      if (!button) return;
      filters.appendChild(button);
    });
  }

  function updateItems() {
    if (frameId) window.cancelAnimationFrame(frameId);
    frameId = 0;
    var ids = Array.prototype.map.call(grid.querySelectorAll(".cert[data-id]"), function (el) {
      return el.getAttribute("data-id");
    });
    items = ids.map(function (id) {
      return certs.filter(function (cert) { return cert.id === id; })[0];
    }).filter(Boolean);
    buttons = [];
    itemList.textContent = "";
    activeIndex = -1;
    targetPos = 0;
    pos = 0;

    if (!items.length) {
      scrollWrap.style.height = "0px";
      scrollWrap.hidden = true;
      animate();
      return;
    }

    scrollWrap.hidden = false;
    items.forEach(createItem);
    updateScrollHeight();
    section.classList.add("cert-ring-active");
    targetPos = currentScrollTarget();
    pos = targetPos;
    renderFrame();
  }

  function moveBy(step) {
    if (!items.length) return;
    targetPos = Math.round(targetPos) + step;
    interactionTarget = true;
    animate();
  }

  orderFilterChips();
  filters.addEventListener("click", updateItems);
  search.addEventListener("input", updateItems);
  reset.addEventListener("click", updateItems);
  document.querySelectorAll("[data-ring-step]").forEach(function (button) {
    button.addEventListener("click", function () { moveBy(Number(button.dataset.ringStep)); });
  });
  view.addEventListener("click", function () {
    var cert = activeItem();
    if (cert) openCertificate(cert, buttons[modulo(Math.round(pos), buttons.length)]);
  });
  if (featureButton) {
    featureButton.addEventListener("click", function () {
      openCertificate(certs.filter(function (cert) { return cert.id === featureButton.dataset.openCertificate; })[0], featureButton);
    });
  }
  window.addEventListener("certificatechange", function (event) {
    var index = items.map(function (cert) { return cert.id; }).indexOf(event.detail.id);
    if (index < 0) return;
    targetPos = nearestEquivalent(targetPos, index, items.length);
    interactionTarget = true;
    animate();
  });

  stage.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      moveBy(event.key === "ArrowRight" ? 1 : -1);
    }
  });

  stage.addEventListener("pointerdown", function (event) {
    if (event.target.closest("button")) return;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, start: targetPos, moved: false };
  });
  stage.addEventListener("pointermove", function (event) {
    if (!drag || drag.id !== event.pointerId) return;
    var dx = event.clientX - drag.x;
    var dy = event.clientY - drag.y;
    if (!drag.moved && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
      drag.moved = true;
      stage.setPointerCapture(event.pointerId);
      stage.classList.add("is-dragging");
    }
    if (!drag.moved) return;
    event.preventDefault();
    var distancePerItem = stage.clientWidth * 0.17;
    targetPos = drag.start + dx / distancePerItem;
    interactionTarget = true;
    animate();
  });
  function finishDrag(event) {
    if (!drag || drag.id !== event.pointerId) return;
    if (drag.moved) {
      targetPos = Math.round(targetPos);
      interactionTarget = true;
      suppressClick = true;
      window.setTimeout(function () { suppressClick = false; }, 0);
      stage.classList.remove("is-dragging");
      animate();
    }
    drag = null;
  }
  stage.addEventListener("pointerup", finishDrag);
  stage.addEventListener("pointercancel", finishDrag);

  window.addEventListener("scroll", function () {
    if (items.length) {
      interactionTarget = false;
      targetPos = currentScrollTarget();
      animate();
    }
  }, { passive: true });
  window.addEventListener("resize", function () {
    if (!items.length) return;
    updateScrollHeight();
    interactionTarget = false;
    targetPos = currentScrollTarget();
    animate();
  });

  if ("MutationObserver" in window && modalBody) {
    var modalObserver = new MutationObserver(function () {
      var heading = document.getElementById("modalTitle");
      if (!heading || !items.length) return;
      var index = -1;
      items.forEach(function (cert, i) {
        if (cert.title === heading.textContent) index = i;
      });
      if (index > -1) {
        targetPos = nearestEquivalent(targetPos, index, items.length);
        interactionTarget = true;
        animate();
      }
    });
    modalObserver.observe(modalBody, { childList: true });
  }

  if (motionQuery.addEventListener) {
    motionQuery.addEventListener("change", function (event) {
      if (!event.matches) return;
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
      section.classList.remove("cert-ring-active");
      scrollWrap.hidden = true;
      scrollWrap.style.height = "";
    });
  }

  updateItems();
})();
