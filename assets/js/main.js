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

    // Theme Toggle (Default Light)
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggle) themeToggle.checked = true;
    }

    themeToggle?.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
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

    // Scroll Up Button
    const scrollControls = document.createElement('div');
    scrollControls.className = 'scroll-controls';
    scrollControls.innerHTML = `
        <button id="scroll-up" class="scroll-btn" title="Scroll to Top">
            <i class="fas fa-chevron-up"></i>
        </button>
    `;
    document.body.appendChild(scrollControls);

    const scrollUpBtn = document.getElementById('scroll-up');

    const handleScrollButtons = () => {
        // Show/hide scroll up button
        if (window.scrollY > 300) {
            scrollUpBtn.classList.add('show');
        } else {
            scrollUpBtn.classList.remove('show');
        }
    };

    window.addEventListener('scroll', handleScrollButtons);
    handleScrollButtons(); // Initial check

    scrollUpBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
