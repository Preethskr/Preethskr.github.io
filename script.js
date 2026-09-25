// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => navLinks.classList.remove("open"))
);

// Dark mode toggle (initial theme is set inline in <head>)
const root = document.documentElement;
document.querySelector(".theme-toggle").addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// Fade sections in as they scroll into view
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add("visible");
        observer.unobserve(el);
        // Drop the stagger delay once shown so hover effects respond immediately
        setTimeout(() => (el.style.transitionDelay = ""), 1600);
      }
    }),
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
// Section headings and each card fade in, with siblings slightly staggered
document
  .querySelectorAll(
    ".section-label, .section h2, .lede, .pillar-intro, .pillar-card, .foundation-item, .strip-inner, .card, .nda-note, .pubs li, .timeline li, .edu, .toolkit-grid > div, .contact-card"
  )
  .forEach((el) => {
    const index = Array.prototype.indexOf.call(el.parentElement.children, el);
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min(index, 5) * 90}ms`;
    observer.observe(el);
  });

// Hero background: drifting nodes joined like a routing network
(function network() {
  const canvas = document.getElementById("network");
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let nodes = [];
  let w, h, dpr;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(70, Math.floor((w * h) / 14000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const maxDist = 140;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < maxDist) {
          ctx.strokeStyle = `rgba(160, 178, 255, ${0.22 * (1 - d / maxDist)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    ctx.fillStyle = "rgba(226, 199, 127, 0.6)";
    nodes.forEach((n) => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function step() {
    nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    });
    draw();
    requestAnimationFrame(step);
  }

  resize();
  window.addEventListener("resize", () => { resize(); if (reduceMotion) draw(); });
  reduceMotion ? draw() : step();
})();
