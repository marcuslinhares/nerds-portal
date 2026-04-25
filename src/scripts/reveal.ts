function initReveal() {
  const options = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  const targets = document.querySelectorAll('section, article, .bento-card, .metric-item');
  targets.forEach(target => {
    target.classList.add('reveal-hidden');
    observer.observe(target);
  });
}

document.addEventListener('astro:page-load', initReveal);
if (document.readyState === 'complete') {
  initReveal();
} else {
  window.addEventListener('load', initReveal);
}
