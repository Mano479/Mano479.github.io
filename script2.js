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

const waitlistForm = document.querySelector('.waitlist-form');

if (waitlistForm) {
  waitlistForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailInput = waitlistForm.querySelector('input[type="email"]');
    if (emailInput && emailInput.value.trim()) {
      alert('Merci ! Nous vous informerons dès que Constand sera disponible.');
      emailInput.value = '';
    }
  });
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 720 && navLinks.classList.contains('show')) {
    navLinks.classList.remove('show');
  }
});
