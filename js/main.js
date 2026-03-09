/**
 * Math Club - Main JavaScript
 */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof initMatrixBg === "function") {
    initMatrixBg();
  }
  if (typeof initFormulaGenerator === "function") {
    initFormulaGenerator();
  }
  initSmoothScroll();
  initScrollReveal();
});

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  document.querySelectorAll("section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition =
      "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(section);
  });

  const style = document.createElement("style");
  style.textContent = `
    section.revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}
