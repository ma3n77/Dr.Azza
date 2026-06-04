/* ======================================================
   Dr. Azza Baraka — Portfolio JavaScript
   Navigation, Animations, Interactions
   ====================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==================== NAVIGATION ====================
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');
  const allNavLinks = document.querySelectorAll('.nav-links a');

  // Scroll-based navbar background
  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id], .hero');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const highlightActiveNav = () => {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navAnchors.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === `#${sectionId}`) {
            a.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightActiveNav, { passive: true });

  // ==================== SCROLL REVEAL ANIMATIONS ====================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==================== RESEARCH FILTERS ====================
  const filterButtons = document.querySelectorAll('.research-filter');
  const researchItems = document.querySelectorAll('.research-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      researchItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'grid';
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';

          // Trigger reflow for animation
          requestAnimationFrame(() => {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(-10px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ==================== CONTACT FORM ====================
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;

    // Visual feedback
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      Message Sent!
    `;
    submitBtn.style.background = 'linear-gradient(135deg, #2EC4B6, #24A89C)';

    setTimeout(() => {
      submitBtn.innerHTML = originalHTML;
      contactForm.reset();
    }, 3000);
  });

  // ==================== SMOOTH SCROLL FOR ALL ANCHOR LINKS ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==================== HERO PARALLAX EFFECT ====================
  const heroImg = document.querySelector('.hero-bg img');

  if (heroImg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroImg.style.transform = `scale(1.05) translateY(${scrollY * 0.15}px)`;
      }
    }, { passive: true });
  }

  // ==================== TYPING EFFECT ON HERO (subtle) ====================
  // Not implemented to keep things clean — hero loads immediately

  // ==================== COUNTER ANIMATION FOR STATS ====================
  const statNumbers = document.querySelectorAll('.about-stat-number');

  const animateCounter = (el) => {
    const target = parseInt(el.textContent.replace(/\D/g, ''));
    const suffix = el.textContent.replace(/[\d]/g, '');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stats = entry.target.querySelectorAll('.about-stat-number');
        stats.forEach(stat => animateCounter(stat));
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.about-stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // ==================== EXPERTISE ACCORDION ====================
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        // Close other items
        accordionItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('expanded');
          }
        });
        // Toggle the clicked item
        item.classList.toggle('expanded');
      });
    }
  });

  // ==================== AWARDS CAROUSEL ====================
  const track = document.getElementById('awardsTrack');
  const prevBtn = document.getElementById('awardPrevBtn');
  const nextBtn = document.getElementById('awardNextBtn');
  const indicatorsContainer = document.getElementById('awardIndicators');

  if (track && prevBtn && nextBtn && indicatorsContainer) {
    const slides = Array.from(track.children);
    let currentIndex = 0;

    // Create indicators
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('indicator-dot');
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
      indicatorsContainer.appendChild(dot);
    });

    const updateCarousel = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      Array.from(indicatorsContainer.children).forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    };

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    // Auto-advance every 5 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    }, 5000);
  }

});
