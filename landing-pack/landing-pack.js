/* Landing Pack JavaScript - Optimized */
document.addEventListener('DOMContentLoaded', function () {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const navbar = document.querySelector('.navbar');
    let scrollTicking = false;

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
                if (progressBar) {
                    progressBar.style.width = (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
                }
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => {
        if (reducedMotion) {
            el.classList.add('visible');
        } else {
            observer.observe(el);
        }
    });

    // Form submission animation
    const form = document.querySelector('.hero-form');
    const submit = document.querySelector('.hero-submit');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('.hero-input');
            if (input.value) {
                const originalText = submit.textContent;
                submit.textContent = '✓ Subscribed!';
                submit.style.background = 'linear-gradient(135deg, #00B894, #00CEC9)';
                setTimeout(() => {
                    submit.textContent = originalText;
                    submit.style.background = '';
                    input.value = '';
                }, 2000);
            }
        });
    }

    // Counter for social proof - Optimized
    const proofNum = document.querySelector('.proof-number');
    if (proofNum) {
        // Run only when visible
        const proofObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (reducedMotion) {
                    proofNum.textContent = proofNum.dataset.target || '2,847';
                    return;
                }

                let count = 0;
                const target = parseInt(proofNum.dataset.target) || 2847;
                const duration = 2000;
                const startTime = performance.now();

                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);

                    count = Math.floor(easeOut * target);
                    proofNum.textContent = count.toLocaleString();

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        proofNum.textContent = target.toLocaleString();
                    }
                }
                requestAnimationFrame(update);
                proofObserver.disconnect();
            }
        });
        proofObserver.observe(proofNum);
    }

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: reducedMotion ? 'auto' : 'smooth',
                    block: 'start'
                });

                // Mobile menu
                const navLinks = document.querySelector('.nav-links');
                const navToggle = document.querySelector('.nav-toggle');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.toggle('active');
                }
            }
        });
    });

    // Nav Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Scroll progress
    const progressBar = document.createElement('div');
    progressBar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#667EEA,#FDCB6E);z-index:9999;transition:width 0.1s ease-out;width:0%';
    document.body.appendChild(progressBar);
});
