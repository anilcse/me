(() => {
  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll("nav a")];

  const set = (id) => {
    links.forEach((a) => {
      a.classList.toggle("is-on", a.getAttribute("href") === `#${id}`);
    });
  };

  const mark = () => {
    const line = 120;
    let id = sections[0]?.id;

    sections.forEach((s) => {
      if (s.getBoundingClientRect().top - line <= 0) id = s.id;
    });

    const last = sections[sections.length - 1];
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (last && window.scrollY >= maxScroll - 8) id = last.id;

    if (id) set(id);
  };

  window.addEventListener("scroll", mark, { passive: true });
  window.addEventListener("hashchange", mark);
  window.addEventListener("resize", mark);
  mark();
})();
