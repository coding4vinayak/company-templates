/* E-commerce Template JavaScript - Optimized */
document.addEventListener('DOMContentLoaded', function () {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Navbar scroll
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

    // Scroll reveal
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in')
        .forEach(el => {
            if (reducedMotion) {
                el.classList.add('visible');
            } else {
                observer.observe(el);
            }
        });

    // Add to cart animation
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;

    document.querySelectorAll('.overlay-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            count++;
            if (cartCount) {
                cartCount.textContent = count;
                // Only animate scale if not reduced motion
                if (!reducedMotion) {
                    cartCount.style.transform = 'scale(1.3)';
                    setTimeout(() => cartCount.style.transform = 'scale(1)', 200);
                }
            }

            // Flying cart animation - Desktop Only & Not Reduced Motion
            if (!isMobile && !reducedMotion) {
                const rect = this.getBoundingClientRect();
                const fly = document.createElement('div');
                fly.textContent = '🛒';
                fly.style.cssText = `position:fixed;left:${rect.left}px;top:${rect.top}px;font-size:24px;z-index:9999;transition:all 0.5s ease-out;pointer-events:none`;
                document.body.appendChild(fly);

                requestAnimationFrame(() => {
                    setTimeout(() => {
                        const cartRect = cartIcon?.getBoundingClientRect() || { left: window.innerWidth - 100, top: 20 };
                        fly.style.left = cartRect.left + 'px';
                        fly.style.top = cartRect.top + 'px';
                        fly.style.opacity = '0';
                        fly.style.transform = 'scale(0.3)';
                    }, 10);
                });

                setTimeout(() => fly.remove(), 600);
            }
        });
    });

    // Product card hover effect - Desktop only
    if (!isMobile) {
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                if (reducedMotion) return;
                window.requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(9,132,227,0.15), transparent 50%)`;
                });
            });
            card.addEventListener('mouseleave', () => card.style.background = '');
        });
    }

    // Smooth scroll
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

                // Mobile menu close
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

    // Category card animation
    const cards = document.querySelectorAll('.category-card');
    cards.forEach((card, i) => {
        card.style.animationDelay = `${i * 0.1}s`;
    });

    // Scroll progress
    const progressBar = document.createElement('div');
    progressBar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#0984E3,#00B894);z-index:9999;transition:width 0.1s ease-out;width:0%';
    document.body.appendChild(progressBar);
});
