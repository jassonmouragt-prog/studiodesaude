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
    var loaded = 0;
    for (var i = 0; i < photos.length; i++) {
      (function (el) {
        var img = new Image();
        el.setAttribute("role", "img");
        el.setAttribute("aria-label", el.getAttribute("data-label"));
        img.onload = function () {
          el.style.backgroundImage = 'url("' + el.getAttribute("data-src") + '")';
          el.classList.add("is-loaded");
          loaded += 1;
          if (loaded === photos.length && window.ScrollTrigger) ScrollTrigger.refresh();
        };
        img.src = el.getAttribute("data-src");
      })(photos[i]);
    }
  }

  function reveal(selector) {
    gsap.utils.toArray(selector).forEach(function (el) {
      gsap.fromTo(el, { y: 34, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true }
      });
    });
  }

  function initMotion() {
    if (reduceMotion || !window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    var heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl
      .from(".hero-copy > *", { y: 36, opacity: 0, duration: 1.05, stagger: 0.13 }, 0.15)
      .from(".hero-media", { y: 48, opacity: 0, duration: 1.15 }, 0.4)
      .from(".hero-badge", { opacity: 0, duration: 0.8 }, 1);

    reveal(".section-head");
    reveal(".feature-grid .card");
    reveal(".audience-grid .card");
    reveal(".audience-feature");
    reveal(".testimonial-featured");
    reveal(".tgrid .tcard");
    reveal(".emotion-copy > *");
    reveal(".prof-card");
    reveal(".steps .step");
    reveal(".cta-inner > *");
    reveal(".footer-grid");
    reveal(".footer-bottom");

    gsap.utils.toArray(".mosaic figure").forEach(function (fig) {
      gsap.fromTo(fig, { clipPath: "inset(10% 5% 10% 5% round 20px)", opacity: 0 }, {
        clipPath: "inset(0% 0% 0% 0% round 20px)",
        opacity: 1,
        duration: 1.15,
        ease: "power3.inOut",
        scrollTrigger: { trigger: fig, start: "top 86%", once: true }
      });
    });

    gsap.utils.toArray(".parallax").forEach(function (el) {
      var trigger = el.closest(".fx-photo") || el.parentElement;
      gsap.fromTo(el, { yPercent: -6 }, {
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: trigger, start: "top bottom", end: "bottom top", scrub: 0.6 }
      });
    });

    var header = document.querySelector(".site-header");
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: function (self) {
        var y = self.scroll();
        header.classList.toggle("is-hidden", y > 420 && self.direction === 1);
        header.classList.toggle("is-scrolled", y > 32);
      }
    });

    window.addEventListener("load", function () {
      ScrollTrigger.refresh();
    });
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
      if (e.target.tagName === "A") setOpen(false);
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
  initMotion();
  initMenu();
  initMobileCta();
  initYear();
})();
