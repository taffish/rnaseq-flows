(function () {
  const root = document.body;
  const saved = localStorage.getItem("rnaseq-flows-language");
  const browserPrefersZh = (navigator.language || "").toLowerCase().startsWith("zh");
  const initial = saved || (browserPrefersZh ? "zh" : "en");

  function applyLanguage(lang) {
    root.dataset.language = lang;
    localStorage.setItem("rnaseq-flows-language", lang);
    document.querySelectorAll("[data-set-lang]").forEach((button) => {
      button.setAttribute("aria-pressed", button.dataset.setLang === lang ? "true" : "false");
    });
  }

  document.querySelectorAll("[data-set-lang]").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.setLang));
  });
  applyLanguage(initial);

  const navLinks = Array.from(document.querySelectorAll(".side-nav a[href^='#']"));
  if (navLinks.length) {
    const sections = navLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);
    const active = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + visible.target.id);
        });
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0.1, 0.3, 0.6] }
    );
    sections.forEach((section) => active.observe(section));
  }

  document.querySelectorAll("a[href^='http']").forEach((link) => {
    link.target = "_blank";
    link.rel = "noopener";
  });
})();
