const navLinks = document.getElementById('navLinks');
const menuToggle = document.getElementById('menuToggle');
const yearEl = document.getElementById('year');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 720 && navLinks.classList.contains('show')) {
    navLinks.classList.remove('show');
  }
});
