document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. GESTION DU THÈME (SOMBRE PAR DÉFAUT + SWITCH LIGHT/DARK)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Vérification du thème enregistré ou sélection de Sombre par défaut
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    /* ==========================================================================
       2. GESTION DE LA NAVBAR (EFFET DE SCROLL)
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    /* ==========================================================================
       3. MENU BURGER MOBILE
       ========================================================================== */
    const burgerBtn = document.getElementById('burger-btn');
    const navLinks = document.getElementById('nav-links');

    if (burgerBtn && navLinks) {
        burgerBtn.addEventListener('click', () => {
            const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
            burgerBtn.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
        });

        // Fermeture au clic sur un lien
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burgerBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ==========================================================================
       4. INTERSECTION OBSERVER (ANIMATIONS & ACTIVATION DES LIENS)
       ========================================================================== */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Déclencher le compteur si présent
                if (entry.target.classList.contains('stats-grid') || entry.target.querySelector('.stat-number')) {
                    animateCounters();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => revealObserver.observe(element));

    /* ==========================================================================
       5. ANIMATION DES CHIFFRES (COMPTEUR STATISTIQUES)
       ========================================================================== */
    let countersTriggered = false;

    const animateCounters = () => {
        if (countersTriggered) return;
        countersTriggered = true;

        const counters = document.querySelectorAll('.stat-number');
        const duration = 2000; // ms

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const stepTime = Math.abs(Math.floor(duration / target));
            let current = 0;

            const timer = setInterval(() => {
                current += 1;
                counter.textContent = current;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, stepTime);
        });
    };

    /* ==========================================================================
       6. LIEN ACTIF DANS LA NAVBAR AU SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    const highlightNavOnScroll = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

    /* ==========================================================================
       7. TRAITEMENT DU FORMULAIRE DE CONTACT
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Envoi en cours...</span>';

            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message envoyé avec succès !</span>';
                submitBtn.style.backgroundColor = '#10B981';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                }, 4000);
            }, 1200);
        });
    }
});