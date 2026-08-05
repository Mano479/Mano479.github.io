const navLinks = document.getElementById('navLinks');
const menuToggle = document.getElementById('menuToggle');
const yearEl = document.getElementById('year');
const languageButtons = document.querySelectorAll('[data-lang]');

function setLanguage(language) {
  const root = document.documentElement;
  const body = document.body;
  const buttons = languageButtons;

  if (!body || !root) return;

  body.classList.remove('lang-en', 'lang-fr');
  body.classList.add(`lang-${language}`);
  root.setAttribute('lang', language);
  localStorage.setItem('siteLanguage', language);

  buttons.forEach((button) => {
    const lang = button.getAttribute('data-lang');
    button.classList.toggle('active', lang === language);
  });

  // Update dynamic placeholders for language-dependent inputs
  document.querySelectorAll('[data-' + language + '-placeholder]').forEach((input) => {
    input.placeholder = input.getAttribute('data-' + language + '-placeholder');
  });
}

function initializeLanguageSwitcher() {
  const storedLanguage = localStorage.getItem('siteLanguage');
  const defaultLanguage = storedLanguage === 'en' ? 'en' : 'fr';

  setLanguage(defaultLanguage);

  languageButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const chosenLanguage = button.getAttribute('data-lang');
      if (chosenLanguage) setLanguage(chosenLanguage);
    });
  });
}

function initializeMenu() {
  // Menu toggle button is disabled on mobile — navigation links are always visible.
}

function initializeYear() {
  if (!yearEl) return;
  yearEl.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  initializeLanguageSwitcher();
  initializeMenu();
  initializeYear();
});

// Menu toggle disabled on mobile — no resize handler needed.
