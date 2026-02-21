/* ============================================================
   SUNRISE CAFE & BAKERY — Demo Website Scripts
   Artisan Bakery & Brunch Cafe | Austin, TX
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ==================== NAVBAR ====================
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // Scroll behavior — add "scrolled" class past 50px
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile toggle — toggle nav-open on body and navbar
  navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
    navLinks.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      navLinks.classList.remove('open');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // ==================== SMOOTH SCROLL ====================
  // Offset for fixed navbar height
  const SCROLL_OFFSET = 80;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const top = targetEl.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ==================== ACTIVE NAV LINK ON SCROLL ====================
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navAnchors.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === `#${current}`) {
        a.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  // ==================== SCROLL ANIMATIONS ====================
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger siblings for a cascading reveal
        const parent = entry.target.parentElement;
        const siblings = Array.from(parent.querySelectorAll('.animate-on-scroll'));
        const siblingIndex = siblings.indexOf(entry.target);
        const delay = siblingIndex * 100;

        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));

  // ==================== MENU CATEGORY FILTER ====================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active filter button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;

      menuItems.forEach((item, i) => {
        const show = category === 'all' || item.dataset.category === category;
        item.classList.toggle('hidden', !show);

        // Re-animate visible items with stagger
        if (show) {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, i * 50);
        }
      });
    });
  });

  // ==================== NEWSLETTER FORM ====================
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      const btn = newsletterForm.querySelector('button');
      const email = input.value.trim();

      if (email) {
        // Formspree placeholder — swap the action URL to connect:
        // newsletterForm.action = 'https://formspree.io/f/YOUR_FORM_ID';
        // newsletterForm.submit();

        btn.textContent = 'Subscribed!';
        btn.style.background = 'linear-gradient(135deg, #6aab73, #3d8b4f)';
        input.value = '';
        input.placeholder = 'Thanks! Check your inbox.';

        setTimeout(() => {
          btn.textContent = 'Subscribe';
          btn.style.background = '';
          input.placeholder = 'Your email address';
        }, 3000);
      }
    });
  }

  // ==================== GALLERY LIGHTBOX PLACEHOLDER ====================
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-caption');
      const src = img ? img.getAttribute('src') : null;
      const alt = img ? img.getAttribute('alt') : '';
      const text = caption ? caption.textContent : alt;

      // Placeholder — log click for future lightbox implementation
      console.log('[Gallery] Item clicked:', { src, caption: text });

      // TODO: Implement full lightbox overlay, e.g.:
      // showLightbox(src, text);
    });
  });

  // ==================== HERO PARALLAX EFFECT ====================
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        const offset = window.scrollY * 0.3;
        heroContent.style.transform = `translateY(${offset}px)`;
        heroContent.style.opacity = 1 - (window.scrollY / (window.innerHeight * 0.8));
      }
    }, { passive: true });
  }

  // ==================== COUNTER / BADGE ANIMATION ====================
  const counters = document.querySelectorAll('.stat-number, .badge strong');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  // ==================== MENU CARD HOVER TILT ====================
  document.querySelectorAll('.menu-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ==================== TESTIMONIAL SLIDER ====================
  const track = document.getElementById('testimonialTrack');
  if (track) {
    const cards = track.querySelectorAll('.testimonial-card');
    const dotsContainer = document.getElementById('testimonialDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let slidesPerView = window.innerWidth >= 768 ? 2 : 1;
    let totalSlides = Math.ceil(cards.length / slidesPerView);

    // Create dots
    function createDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === currentSlide ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    function goToSlide(index) {
      currentSlide = index;
      const offset = -(currentSlide * (100 / slidesPerView)) * slidesPerView;
      track.style.transform = `translateX(${offset}%)`;

      if (dotsContainer) {
        dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === currentSlide);
        });
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide > 0 ? currentSlide - 1 : totalSlides - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide < totalSlides - 1 ? currentSlide + 1 : 0);
      });
    }

    // Auto-advance every 5s
    let autoPlay = setInterval(() => {
      goToSlide(currentSlide < totalSlides - 1 ? currentSlide + 1 : 0);
    }, 5000);

    // Pause on hover
    const slider = document.getElementById('testimonialSlider');
    if (slider) {
      slider.addEventListener('mouseenter', () => clearInterval(autoPlay));
      slider.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => {
          goToSlide(currentSlide < totalSlides - 1 ? currentSlide + 1 : 0);
        }, 5000);
      });
    }

    // Handle resize
    window.addEventListener('resize', () => {
      const newPerView = window.innerWidth >= 768 ? 2 : 1;
      if (newPerView !== slidesPerView) {
        slidesPerView = newPerView;
        totalSlides = Math.ceil(cards.length / slidesPerView);
        currentSlide = 0;
        createDots();
        goToSlide(0);
      }
    });

    createDots();
  }
});
