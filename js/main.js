(function () {
  "use strict";

  var CONFIG = {
    whatsappNumber: "5584999999999",
    whatsappMessage: "Olá, conheci o Studio de Saúde pelo site e gostaria de saber como funciona a aula experimental."
  };

  function waUrl(message) {
    var text = encodeURIComponent(message || CONFIG.whatsappMessage);
    return "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + text;
  }

  var waLinks = document.querySelectorAll("[data-wa]");
  for (var i = 0; i < waLinks.length; i++) {
    waLinks[i].setAttribute("href", waUrl(null));
    waLinks[i].setAttribute("target", "_blank");
    waLinks[i].setAttribute("rel", "noopener");
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function loadPhotos() {
    var photos = document.querySelectorAll(".photo[data-src]");
    for (var i = 0; i < photos.length; i++) {
      (function (el) {
        el.setAttribute("role", "img");
        el.setAttribute("aria-label", el.getAttribute("data-label"));
        var img = new Image();
        img.onload = function () {
          el.style.backgroundImage = 'url("' + el.getAttribute("data-src") + '")';
          el.classList.add("is-loaded");
        };
        img.src = el.getAttribute("data-src");
      })(photos[i]);
    }
  }

  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (reduceMotion) {
      for (var i = 0; i < items.length; i++) items[i].classList.add("is-visible");
      return;
    }
    if (!("IntersectionObserver" in window)) {
      for (var j = 0; j < items.length; j++) items[j].classList.add("is-visible");
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
    for (var k = 0; k < items.length; k++) {
      items[k].classList.add("is-pending");
      io.observe(items[k]);
    }
  }

  function initParallax() {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    var targets = document.querySelectorAll(".fx-photo .parallax");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", rafTick, { passive: true });
          window.addEventListener("resize", rafTick, { passive: true });
          rafTick();
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.02 });
    for (var i = 0; i < targets.length; i++) io.observe(targets[i]);

    var ticking = false;
    function rafTick() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        for (var j = 0; j < targets.length; j++) applyParallax(targets[j]);
        ticking = false;
      });
    }

    function applyParallax(el) {
      var rect = el.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      var center = rect.top + rect.height / 2;
      var offset = (vh / 2 - center) * -0.035;
      offset = Math.max(-18, Math.min(18, offset));
      el.style.transform = "translateY(" + offset.toFixed(1) + "px) scale(1.1)";
    }
  }

  function initMenu() {
    var toggle = document.getElementById("menuToggle");
    var nav = document.getElementById("siteNav");
    if (!toggle || !nav) return;
    toggle.closest(".site-header").classList.add("menu-ready");
    function setOpen(open) {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    }
    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        setOpen(false);
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });
  }

  function initMobileCta() {
    var cta = document.getElementById("mobileCta");
    if (!cta) return;
    var hero = document.getElementById("inicio");
    var shown = false;
    function onScroll() {
      var yy = window.pageYOffset || document.documentElement.scrollTop;
      if (yy > (hero ? hero.offsetHeight * 0.7 : 420)) {
        if (!shown) { cta.classList.add("show"); shown = true; }
      } else {
        if (shown) { cta.classList.remove("show"); shown = false; }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  loadPhotos();
  initReveal();
  initParallax();
  initMenu();
  initMobileCta();
  initYear();
})();
