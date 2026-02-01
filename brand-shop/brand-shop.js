/* Brand Shop JavaScript - Optimized */
document.addEventListener('DOMContentLoaded', function () {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
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

    // 3D Tilt Effect - Desktop Only
    if (!isMobile && !reducedMotion) {
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                window.requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = (e.clientX - rect.left - rect.width / 2) / 15;
                    const y = (e.clientY - rect.top - rect.height / 2) / 15;
                    card.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-10px)`;
                });
            });
            card.addEventListener('mouseleave', () => card.style.transform = '');
        });
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

    const progressBar = document.createElement('div');
    progressBar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,#B76E79,#D4AF37);z-index:9999;transition:width 0.1s ease-out;width:0%';
    document.body.appendChild(progressBar);
});
