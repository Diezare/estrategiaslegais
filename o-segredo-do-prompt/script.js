document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light-mode" || savedTheme === "dark-mode") {
    body.classList.remove("light-mode", "dark-mode");
    body.classList.add(savedTheme);
  } else {
    body.classList.add("dark-mode");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = body.classList.contains("dark-mode");

      body.classList.remove("light-mode", "dark-mode");
      body.classList.add(isDark ? "light-mode" : "dark-mode");

      localStorage.setItem("theme", isDark ? "light-mode" : "dark-mode");
      lucide.createIcons();
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  const revealElements = document.querySelectorAll(
    ".card, .info-card, .features-list li, .cta-box, .hero-text > *, .hero-image"
  );

  revealElements.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
});