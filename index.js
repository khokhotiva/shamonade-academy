/* =========================================================
   SHAMONADE ACADEMY
   Interactive JavaScript + GSAP Animation System
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  "use strict";
  /* ---------- 1. SELECT ELEMENTS ---------- */
  const body = document.body;
  const header = document.querySelector(".site-header");
  const hamburger = document.querySelector("#hamburger");
  const navigation = document.querySelector("#primary-navigation");
  const progressBar = document.querySelector(".scroll-progress span");
  const currentYear = document.querySelector("#current-year");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  /* ---------- 2. CURRENT YEAR ---------- */
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
  /* ---------- 3. MOBILE NAVIGATION ---------- */
  function closeNavigation() {
    if (!hamburger || !navigation) return;
    hamburger.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
    body.classList.remove("menu-open");
  }
  function openNavigation() {
    if (!hamburger || !navigation) return;
    hamburger.setAttribute("aria-expanded", "true");
    navigation.classList.add("is-open");
    body.classList.add("menu-open");
  }
  if (hamburger && navigation) {
    hamburger.addEventListener("click", () => {
      const isExpanded =
        hamburger.getAttribute("aria-expanded") === "true";
      if (isExpanded) {
        closeNavigation();
      } else {
        openNavigation();
      }
    });
    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNavigation);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeNavigation();
        hamburger.focus();
      }
    });
    document.addEventListener("click", (event) => {
      const clickedInsideNavigation = navigation.contains(event.target);
      const clickedHamburger = hamburger.contains(event.target);
      if (
        hamburger.getAttribute("aria-expanded") === "true" &&
        !clickedInsideNavigation &&
        !clickedHamburger
      ) {
        closeNavigation();
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        closeNavigation();
      }
    });
  }
  /* ---------- 4. HEADER SCROLL EFFECT ---------- */
  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  }
  updateHeader();
  /* ---------- 5. SCROLL PROGRESS BAR ---------- */
  let scrollTicking = false;
  function updateScrollEffects() {
    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      0;
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress =
      scrollableHeight > 0
        ? Math.min(scrollTop / scrollableHeight, 1)
        : 0;
    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress})`;
    }
    updateHeader();
    scrollTicking = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(updateScrollEffects);
        scrollTicking = true;
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", updateScrollEffects);
  updateScrollEffects();
  /* ---------- 6. SMOOTH INTERNAL NAVIGATION ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      closeNavigation();
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
      if (history.replaceState) {
        history.replaceState(null, "", href);
      }
    });
  });
  /* ---------- 7. SAFE IMAGE FALLBACKS ---------- */
  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("image-unavailable");
      image.setAttribute("data-image-error", "true");
    });
  });
  /* ---------- 8. GSAP INITIALIZATION ---------- */
  const hasGSAP = typeof window.gsap !== "undefined";
  const hasScrollTrigger =
    hasGSAP && typeof window.ScrollTrigger !== "undefined";
  if (!hasGSAP || reduceMotion) {
    body.classList.remove("gsap-ready");
    return;
  }
  const gsap = window.gsap;
  if (hasScrollTrigger) {
    gsap.registerPlugin(window.ScrollTrigger);
  }
  body.classList.add("gsap-ready");
  /* ---------- 9. GLOBAL GSAP SETTINGS ---------- */
  gsap.defaults({
    ease: "power3.out",
    duration: 0.8
  });
  /* ---------- 10. HERO INTRO ANIMATION ---------- */
  const heroTimeline = gsap.timeline({
    defaults: {
      ease: "power3.out"
    }
  });
  const heroEyebrow = document.querySelector(".hero-eyebrow");
  const heroTitle = document.querySelector(".hero-title");
  const heroTagline = document.querySelector(".tagline");
  const heroDescription = document.querySelector(".hero-desc");
  const heroButtons = document.querySelector(".hero-btns");
  const heroTrust = document.querySelector(".hero-trust");
  const heroVisual = document.querySelector(".hero-visual");
  const heroTextElements = [
    heroEyebrow,
    heroTitle,
    heroTagline,
    heroDescription,
    heroButtons,
    heroTrust
  ].filter(Boolean);
  if (heroTextElements.length) {
    gsap.set(heroTextElements, {
      autoAlpha: 0,
      y: 28
    });
    heroTimeline.to(heroEyebrow, {
      autoAlpha: 1,
      y: 0,
      duration: 0.65
    });
    heroTimeline.to(
      heroTitle,
      {
        autoAlpha: 1,
        y: 0,
        duration: 1
      },
      "-=0.35"
    );
    heroTimeline.to(
      [heroTagline, heroDescription].filter(Boolean),
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12
      },
      "-=0.5"
    );
    heroTimeline.to(
      heroButtons,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.65
      },
      "-=0.35"
    );
    heroTimeline.to(
      heroTrust,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6
      },
      "-=0.35"
    );
  }
  if (heroVisual) {
    gsap.set(heroVisual, {
      autoAlpha: 0,
      x: 35,
      scale: 0.96
    });
    heroTimeline.to(
      heroVisual,
      {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        duration: 1.1
      },
      heroTextElements.length ? "-=0.9" : 0
    );
  }
  /* ---------- 11. HERO DECORATION ---------- */
  const heroBlobs = document.querySelectorAll(".hero-blob");
  const heroSparkles = document.querySelectorAll(".hero-sparkle");
  const heroStickers = document.querySelectorAll(".hero-image-sticker");
  const heroDecorations = document.querySelectorAll(
    ".hero-image-decoration"
  );
  heroBlobs.forEach((blob, index) => {
    gsap.to(blob, {
      x: index % 2 === 0 ? 24 : -20,
      y: index % 2 === 0 ? -18 : 24,
      scale: index % 2 === 0 ? 1.06 : 0.96,
      duration: 5 + index,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });
  heroSparkles.forEach((sparkle, index) => {
    gsap.to(sparkle, {
      rotation: index % 2 === 0 ? 25 : -25,
      scale: 1.25,
      duration: 1.8 + index * 0.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });
  heroStickers.forEach((sticker, index) => {
    gsap.to(sticker, {
      y: index % 2 === 0 ? -9 : 9,
      duration: 2.3 + index * 0.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });
  heroDecorations.forEach((decoration, index) => {
    gsap.to(decoration, {
      scale: index % 2 === 0 ? 1.12 : 0.9,
      duration: 3 + index,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });
  /* ---------- 12. FLOATING CLASSROOM OBJECTS ---------- */
  const floatItems = document.querySelectorAll(
    ".floating-scene .float-item"
  );
  floatItems.forEach((item, index) => {
    const direction = index % 2 === 0 ? -1 : 1;
    gsap.to(item, {
      y: direction * (8 + (index % 4) * 4),
      rotation: direction * (4 + (index % 3) * 2),
      duration: 2.5 + (index % 5) * 0.45,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.08
    });
  });
  /* ––––– 13. REUSABLE SCROLL REVEALS ––––– */

function revealOnScroll(selector, options = {}) {
const elements = gsap.utils.toArray(selector);

if (!elements.length) return;

// If ScrollTrigger is unavailable, keep elements visible
// and use a simple entrance animation.
if (!hasScrollTrigger) {
gsap.from(elements, {
y: options.y ?? 25,
duration: options.duration ?? 0.7,
stagger: 0.1,
clearProps: 'transform'
});

return;

}

elements.forEach((element) => {
gsap.fromTo(
element,
{
autoAlpha: 0,
y: options.y ?? 35,
x: options.x ?? 0
},
{
autoAlpha: 1,
y: 0,
x: 0,
duration: options.duration ?? 0.8,
delay: options.delay ?? 0,
ease: options.ease ?? 'power3.out',
clearProps: 'transform,opacity,visibility',
scrollTrigger: {
trigger: element,
start: options.start ?? "top 88%",
once: true
}
}
);
});
}

revealOnScroll(
'.section-heading > *, .about-mini-label, .about-text h3, .about-text > p, .text-link',
{ y: 26, duration: 0.75 }
);

revealOnScroll(
".about-img",
{ x: -35, y: 0, duration: 1 }
);

revealOnScroll(
'.about-values .value-item',
{ y: 24, duration: 0.65 }
);

revealOnScroll(
'.about-stats .stat',
{ y: 25, duration: 0.7 }
);

revealOnScroll(
'.services-grid .service-card',
{ y: 40, duration: 0.8 }
);

revealOnScroll(
'.services-bottom',
{ y: 25, duration: 0.7 }
);

revealOnScroll(
'.gallery-grid .gallery-item',
{ y: 30, duration: 0.75 }
);

revealOnScroll(
'.gallery-more',
{ y: 22, duration: 0.65 }
);

revealOnScroll(
'.location-info',
{ x: -30, y: 0, duration: 0.85 }
);

revealOnScroll(
'.map-container',
{ x: 30, y: 0, duration: 0.85 }
);

revealOnScroll(
'.contact-content > *',
{ y: 25, duration: 0.7 }
);
  /* ---------- 14. STAGGERED SECTION ENTRANCES ---------- */
  function staggerOnScroll(selector, options = {}) {
    const elements = gsap.utils.toArray(selector);
    if (!elements.length) return;
    gsap.from(elements, {
      autoAlpha: 0,
      y: options.y ?? 25,
      duration: options.duration ?? 0.7,
      stagger: options.stagger ?? 0.12,
      ease: "power3.out",
      scrollTrigger: hasScrollTrigger
        ? {
            trigger: options.trigger || elements[0].parentElement,
            start: options.start || "top 85%",
            once: true
          }
        : undefined
    });
  }
  
  
  /* ---------- 15. HOVER ANIMATIONS ---------- */
  function addHoverLift(selector, lift = -6) {
    document.querySelectorAll(selector).forEach((element) => {
      element.addEventListener("mouseenter", () => {
        gsap.to(element, {
          y: lift,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
      });
      element.addEventListener("mouseleave", () => {
        gsap.to(element, {
          y: 0,
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto"
        });
      });
    });
  }
  addHoverLift(".service-card", -7);
  addHoverLift(".value-item", -4);
  addHoverLift(".stat", -5);
  /* ---------- 16. BUTTON MAGNETIC-LITE EFFECT ---------- */
  const hoverButtons = document.querySelectorAll(
    ".hero-btns .btn, .contact-btns .btn, .nav-cta"
  );
  hoverButtons.forEach((button) => {
    button.addEventListener("mousemove", (event) => {
      if (window.innerWidth <= 768) return;
      const rect = button.getBoundingClientRect();
      const relativeX = event.clientX - rect.left - rect.width / 2;
      const relativeY = event.clientY - rect.top - rect.height / 2;
      gsap.to(button, {
        x: relativeX * 0.08,
        y: relativeY * 0.08 - 2,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto"
      });
    });
    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.45,
        ease: "elastic.out(1, 0.5)",
        overwrite: "auto"
      });
    });
  });
  /* ---------- 17. ABOUT IMAGE PARALLAX ---------- */
  if (hasScrollTrigger && window.innerWidth > 768) {
    const aboutImage = document.querySelector(".about-image-frame img");
    if (aboutImage) {
      gsap.to(aboutImage, {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-img",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }
  }
  /* ---------- 18. GALLERY IMAGE ENTRANCES ---------- */
  if (hasScrollTrigger) {
    document.querySelectorAll(".gallery-item img").forEach((image) => {
      gsap.from(image, {
        scale: 1.08,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: image.closest(".gallery-item"),
          start: "top 90%",
          once: true
        }
      });
    });
  }
  /* ---------- 19. CONTACT SECTION ACCENT ---------- */
  const contactDecorations = document.querySelectorAll(
    ".contact-decoration"
  );
  contactDecorations.forEach((decoration, index) => {
    gsap.to(decoration, {
      y: index % 2 === 0 ? -15 : 15,
      rotation: index % 2 === 0 ? 12 : -12,
      duration: 3 + index * 0.7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });
  /* ---------- 20. SCROLL TRIGGER REFRESH ---------- */
  if (hasScrollTrigger) {
    window.addEventListener("load", () => {
      window.ScrollTrigger.refresh();
    });
    document.querySelectorAll("img").forEach((image) => {
      if (!image.complete) {
        image.addEventListener("load", () => {
          window.ScrollTrigger.refresh();
        }, { once: true });
      }
    });
  }
  /* ---------- 21. DEBUG MESSAGE ---------- */
  console.info(
    "Shamonade Academy animations initialized.",
    hasScrollTrigger
      ? "GSAP + ScrollTrigger active."
      : "GSAP active; ScrollTrigger unavailable."
  );
});