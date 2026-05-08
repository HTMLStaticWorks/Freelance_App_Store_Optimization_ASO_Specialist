document.addEventListener('DOMContentLoaded', () => {
    // Floating Animation
    const floatElements = document.querySelectorAll('.floating');
    floatElements.forEach(el => {
        el.style.animation = `floating ${3 + Math.random() * 2}s ease-in-out infinite`;
    });

    // Counter Animation
    const counters = document.querySelectorAll('.metric-item h2, .counter');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.innerText.replace(/[^\d]/g, '');
                const count = +counter.getAttribute('data-count') || 0;
                const inc = target / speed;

                if (count < target) {
                    const nextCount = Math.ceil(count + inc);
                    counter.setAttribute('data-count', nextCount);
                    counter.innerText = (counter.innerText.includes('%') ? nextCount + '%' : 
                                       counter.innerText.includes('+') ? nextCount + '+' : 
                                       counter.innerText.includes('#') ? '#' + nextCount : 
                                       counter.innerText.includes('$') ? '$' + nextCount : nextCount);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = counter.innerText.replace(/\d+/, target);
                }
            };
            
            const observer = new IntersectionObserver((entries) => {
                if(entries[0].isIntersecting) {
                    updateCount();
                    observer.unobserve(counter);
                }
            }, { threshold: 1 });
            
            observer.observe(counter);
        });
    };

    animateCounters();

    // Typing Effect for Hero
    const typeTarget = document.querySelector('.typing-text');
    if (typeTarget) {
        const text = typeTarget.getAttribute('data-text');
        let i = 0;
        const type = () => {
            if (i < text.length) {
                typeTarget.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        };
        type();
    }
});

// CSS Keyframes for floating
const style = document.createElement('style');
style.textContent = `
@keyframes floating {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
}

.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
}

.reveal.active {
    opacity: 1;
    transform: translateY(0);
}
`;
document.head.appendChild(style);
