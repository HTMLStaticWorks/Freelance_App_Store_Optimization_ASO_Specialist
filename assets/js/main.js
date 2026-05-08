document.addEventListener('DOMContentLoaded', () => {
    // Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.checked = true;
        }
    }

    themeToggle?.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // RTL Toggle
    const rtlToggle = document.getElementById('rtl-toggle');
    const isRTL = localStorage.getItem('rtl') === 'true';

    if (isRTL) {
        document.body.setAttribute('dir', 'rtl');
        rtlToggle.checked = true;
    }

    rtlToggle?.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.body.setAttribute('dir', 'rtl');
            localStorage.setItem('rtl', 'true');
        } else {
            document.body.setAttribute('dir', 'ltr');
            localStorage.setItem('rtl', 'false');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    // On mobile/tablet, move nav-actions inside nav-links for the menu
    const moveActions = () => {
        if (!navLinks || !navActions) return;
        
        if (window.innerWidth <= 1024) {
            if (!navLinks.contains(navActions)) {
                navLinks.appendChild(navActions);
            }
        } else {
            const navContainer = document.querySelector('.nav-container');
            if (navContainer && navLinks.contains(navActions)) {
                navContainer.insertBefore(navActions, mobileMenuBtn);
            }
        }
    };

    window.addEventListener('resize', moveActions);
    moveActions();

    mobileMenuBtn?.addEventListener('click', () => {
        if (!navLinks) return;
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        }
    });

    // Active Nav Link Highlight
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const allLinks = document.querySelectorAll('.nav-links a');
    
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        }
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = parseInt(counter.innerText.replace(/[^0-9]/g, ''));
        const suffix = counter.innerText.replace(/[0-9]/g, '');
        let count = 0;
        
        const updateCount = () => {
            const increment = target / speed;
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count) + suffix;
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + suffix;
            }
        };
        updateCount();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // Scroll reveal placeholder
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 100) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});
