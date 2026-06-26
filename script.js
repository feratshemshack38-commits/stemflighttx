const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

document.querySelectorAll(".fade-up").forEach((el) => {
  observer.observe(el);
});

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", open);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  if (Number.isNaN(target)) return;

  const suffix = el.dataset.suffix || "";
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const impactObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target.dataset.target) {
      animateCounter(entry.target);
      impactObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll(".impact-number[data-target]").forEach((el) => {
  impactObserver.observe(el);
});
