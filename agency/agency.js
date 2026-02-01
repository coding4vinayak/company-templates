/* Agency Template JavaScript - Optimized */
document.addEventListener('DOMContentLoaded', function () {
  const isMobile = window.matchMedia('(max-width: 1024px)').matches; // Agency has complex effects, treat tablet as mobile for perf
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Navbar scroll effect - Throttled
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

  // Scroll reveal animations
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in')
    .forEach(el => {
      if (reducedMotion) {
        el.style.transition = 'none';
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.classList.add('visible');
      } else {
        observer.observe(el);
      }
    });

  // Counter animation - Optimized
  function animateCounter(el, target) {
    if (reducedMotion) {
      el.textContent = target;
      return;
    }

    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease out

      const current = Math.floor(easeOut * target);
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
        animateCounter(entry.target, parseInt(entry.target.dataset.target) || 0);
        counterObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

  // Smooth scroll & Mobile Menu
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

        // Close mobile menu
        const navLinks = document.querySelector('.nav-links');
        const navToggle = document.querySelector('.nav-toggle');
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          navToggle.classList.toggle('active'); // Assumption: navToggle has active state logic elsewhere or simple toggle
        }
      }
    });
  });

  // Nav Toggle Logic (Explicit)
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Parallax on floating cards - Desktop Only & Not Reduced Motion
  const cards = document.querySelectorAll('.floating-card');
  if (!isMobile && !reducedMotion && cards.length > 0) {
    document.addEventListener('mousemove', (e) => {
      window.requestAnimationFrame(() => {
        const x = (e.clientX - window.innerWidth / 2) / 50;
        const y = (e.clientY - window.innerHeight / 2) / 50;
        cards.forEach((c, i) => c.style.transform = `translate(${x * (i + 1) * 0.5}px, ${y * (i + 1) * 0.5}px)`);
      });
    }, { passive: true });
  }

  // Card tilt effect - Desktop Only & Not Reduced Motion
  if (!isMobile && !reducedMotion) {
    document.querySelectorAll('.service-card, .pricing-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        window.requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          // Calculate relative to center of card
          const x = (e.clientX - rect.left - rect.width / 2) / 20;
          const y = (e.clientY - rect.top - rect.height / 2) / 20;
          card.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-10px)`;
        });
      });
      card.addEventListener('mouseleave', () => card.style.transform = '');
    });
  }

  // Scroll progress bar
  const progressBar = document.createElement('div');
  progressBar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#6C5CE7,#FF7675);z-index:9999;transition:width 0.1s ease-out;width:0%';
  document.body.appendChild(progressBar);

  // Cursor glow - Desktop Only
  if (!isMobile && !reducedMotion) {
    const glow = document.createElement('div');
    glow.style.cssText = 'position:fixed;width:400px;height:400px;background:radial-gradient(circle,rgba(108,92,231,0.15),transparent 70%);pointer-events:none;transform:translate(-50%,-50%);z-index:0;will-change:left,top';
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      window.requestAnimationFrame(() => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
      });
    }, { passive: true });
  }
});
