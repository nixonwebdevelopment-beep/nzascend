// scroll reveal with auto stagger
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = e.target.dataset.delay || 0;
      e.target.style.transitionDelay = delay + 'ms';
      e.target.classList.add('visible');
    } else {
      e.target.style.transitionDelay = '0ms';
      e.target.classList.remove('visible');
    }
  });
}, { threshold: 0.15 });

// auto stagger siblings
document.querySelectorAll('.reveal').forEach(el => {
  const siblings = Array.from(el.parentElement.querySelectorAll(':scope > .reveal'));
  const index = siblings.indexOf(el);
  if (!el.dataset.delay) {
    el.dataset.delay = index * 150;
  }
  observer.observe(el);
});

// progress bar
const bar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  bar.style.height = progress + '%';
});