document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. THÈME
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    /* ==========================================================================
       2. NAVBAR SCROLL
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    /* ==========================================================================
       3. MENU BURGER
       ========================================================================== */
    const burgerBtn = document.getElementById('burger-btn');
    const navLinks = document.getElementById('nav-links');

    if (burgerBtn && navLinks) {
        burgerBtn.addEventListener('click', () => {
            const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
            burgerBtn.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burgerBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ==========================================================================
       4. INTERSECTION OBSERVER (ANIMATIONS + TRIGGERS)
       ========================================================================== */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    let countersTriggered = false;
    let skillBarsTriggered = false;

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');

            if (!countersTriggered && entry.target.querySelector('.stat-number')) {
                animateCounters();
            }
            if (!skillBarsTriggered && entry.target.querySelector('.skill-fill')) {
                animateSkillBars();
            }
            observer.unobserve(entry.target);
        });
    }, { root: null, rootMargin: '0px', threshold: 0.12 });

    animatedElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       5. COMPTEURS ANIMÉS
       ========================================================================== */
    function animateCounters() {
        countersTriggered = true;
        document.querySelectorAll('.stat-number').forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 1800;
            const stepTime = Math.max(30, Math.floor(duration / target));
            let current = 0;
            const timer = setInterval(() => {
                current++;
                counter.textContent = current;
                if (current >= target) { counter.textContent = target; clearInterval(timer); }
            }, stepTime);
        });
    }

    /* ==========================================================================
       6. BARRES DE COMPÉTENCES
       ========================================================================== */
    function animateSkillBars() {
        skillBarsTriggered = true;
        document.querySelectorAll('.skill-fill').forEach(bar => {
            bar.style.width = bar.getAttribute('data-level') + '%';
        });
    }

    /* ==========================================================================
       7. FILTRAGE DES COMPÉTENCES
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            skillCards.forEach(card => {
                const visible = filter === 'all' || card.getAttribute('data-category') === filter;
                card.classList.toggle('hidden', !visible);
            });
        });
    });

    /* ==========================================================================
       8. LIEN ACTIF NAVBAR AU SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navItems.forEach(item => {
                    item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { passive: true });

    /* ==========================================================================
       9. TÉLÉCHARGEMENT DU CV
       ========================================================================== 
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const cvContent = `CV — Manoa
Étudiant Développeur & IA · Paris-Saclay
==========================================

CONTACT
- Email : xxx@xxx.xx
- GitHub : github.com/Mano479
- Site   : mano479.github.io
- Tél.   : +33 x xx xx xx xx

PROFIL
Étudiant en L1 Double Diplôme Informatique & Mathématiques à Paris-Saclay.
Passionné par la programmation depuis 14 ans. Stagiaire IA à l'ANFSI (mai–juillet 2026)
sur l'optimisation de pipelines RAG. Je crois en un numérique libre,
respectueux de la vie privée et accessible.

EXPÉRIENCE
- Mai — Juillet 2026 : Stagiaire IA — ANFSI
  Optimisation de pipelines RAG (Retrieval-Augmented Generation).
  Évaluation de modèles LLM, amélioration de la pertinence documentaire,
  rédaction d'un rapport de stage.
  Stack : Python, RAG, LLM, IA générative.

- 2024 — 2025 : Projets académiques — Paris-Saclay
  Algorithmique, structures de données, Python et C++.

- Depuis 2019 : Développeur autodidacte
  Jeux Python, sites web, bots multi-plateformes,
  traitement d'images C++, applications React Native.

FORMATION
- Double Diplôme Informatique & Mathématiques — Université Paris-Saclay (L1)
- Baccalauréat général — Mention Très Bien — 2025
  Spécialités : Mathématiques, Physique-Chimie, SVT

COMPÉTENCES
Langages : JavaScript (Node.js / React), Python, C++, SQL, HTML/CSS
IA / Data : RAG, LLM, IA générative, NLP
Outils   : Linux (quotidien), Git, Docker, VS Code

LANGUES
- Français : langue maternelle
- Anglais  : niveau scolaire
- Allemand : niveau scolaire

INTÉRÊTS
- Escrime : 8 ans à niveau national, compétition internationale
- Musculation, Tennis de table, Lecture
`;
            const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = Object.assign(document.createElement('a'), { href: url, download: 'CV-Manoa.txt' });
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }*/
});
