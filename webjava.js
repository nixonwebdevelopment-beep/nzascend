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

// search
function handleSearch() {
  const query = document.querySelector('.searchbar').value.trim();
  if (query) {
    window.location.href = 'shop.html?search=' + encodeURIComponent(query);
  }
}

const searchbar = document.querySelector('.searchbar');
const searchbtn = document.querySelector('.searchbtn');

if (searchbar) {
  searchbar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
}

if (searchbtn) {
  searchbtn.addEventListener('click', handleSearch);
}

// on shop page - read search param and highlight match
const params = new URLSearchParams(window.location.search);
const searchQuery = params.get('search');

if (searchQuery) {
  const items = document.querySelectorAll('.shop-item');
  let matched = null;

  items.forEach(item => {
    const text = (item.innerText + ' ' + (item.dataset.keywords || '')).toLowerCase();
    if (text.includes(searchQuery.toLowerCase())) {
      item.classList.add('search-highlight');
      if (!matched) matched = item;
    }
  });

  if (matched) {
    setTimeout(() => {
      matched.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  } else {
    const msg = document.createElement('div');
    msg.className = 'search-no-result';
    msg.textContent = 'No products found for "' + searchQuery + '"';
    const grid = document.querySelector('.shop-grid');
    if (grid) grid.before(msg);
  }
}
