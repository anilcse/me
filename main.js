(() => {
  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll("nav a")];
  const visible = new Map();

  const set = (id) => {
    links.forEach((a) => {
      a.classList.toggle("is-on", a.getAttribute("href") === `#${id}`);
    });
  };

  const pick = () => {
    const nearEnd =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 24;
    if (nearEnd) {
      set(sections[sections.length - 1].id);
      return;
    }

    let id = sections[0]?.id;
    let best = 0;
    sections.forEach((s) => {
      const ratio = visible.get(s.id) || 0;
      if (ratio >= best) {
        best = ratio;
        id = s.id;
      }
    });
    if (id) set(id);
  };

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible.set(entry.target.id, entry.intersectionRatio);
        });
        pick();
      },
      { threshold: [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1] }
    );
    sections.forEach((s) => io.observe(s));
  }

  window.addEventListener("scroll", pick, { passive: true });
  pick();
})();
