/* SaaS Template JavaScript - Optimized */
document.addEventListener('DOMContentLoaded', function () {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Navbar scroll - Throttled
    const navbar = document.querySelector('.navbar');
    let scrollTicking = false;

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
                // Update scroll progress bar
                if (progressBar) {
                    progressBar.style.width = (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
                }
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    // Scroll reveal
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after showing to save resources
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.1,
        rootMargin: '50px' // Trigger slightly before element comes into view
    });

    document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in')
        .forEach(el => {
            if (reducedMotion) {
                el.classList.add('visible'); // Skip animation if reduced motion preferred
            } else {
                observer.observe(el);
            }
        });

    // Counter animation
    function animateCounter(el, target) {
        if (reducedMotion) {
            el.textContent = target;
            return;
        }

        let current = 0;
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smoother counter
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            current = Math.floor(easeOutQuart * target);
            el.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    const counterObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target, parseFloat(entry.target.dataset.target) || 0);
                counterObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

    // Pricing toggle
    const toggle = document.querySelector('.toggle-switch');
    const monthlyLabel = document.querySelector('.toggle-label:first-of-type');
    const yearlyLabel = document.querySelector('.toggle-label:last-of-type');
    const prices = document.querySelectorAll('.pricing-amount');

    const monthlyPrices = ['4,999', '12,999', 'Custom'];
    const yearlyPrices = ['3,999', '9,999', 'Custom'];

    if (toggle) {
        toggle.addEventListener('click', function () {
            this.classList.toggle('yearly');
            const isYearly = this.classList.contains('yearly');

            monthlyLabel.classList.toggle('active', !isYearly);
            yearlyLabel.classList.toggle('active', isYearly);

            prices.forEach((price, i) => {
                price.style.opacity = '0';
                setTimeout(() => {
                    price.textContent = isYearly ? yearlyPrices[i] : monthlyPrices[i];
                    price.style.opacity = '1';
                }, 150);
            });
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

                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const navToggle = document.querySelector('.nav-toggle');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // Card hover effect - Desktop only
    if (!isMobile) {
        document.querySelectorAll('.feature-card, .pricing-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                if (reducedMotion) return;
                window.requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(0,242,96,0.1), transparent 50%)`;
                });
            });
            card.addEventListener('mouseleave', () => {
                card.style.background = '';
            });
        });
    }

    // Nav Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Animate chart bars on load
    const bars = document.querySelectorAll('.chart-bar');
    bars.forEach((bar, i) => {
        bar.style.animationDelay = `${i * 0.1}s`;
    });

    // Scroll progress - Created once
    const progressBar = document.createElement('div');
    progressBar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#00F260,#0575E6);z-index:9999;transition:width 0.1s ease-out;width:0%';
    document.body.appendChild(progressBar);
});
