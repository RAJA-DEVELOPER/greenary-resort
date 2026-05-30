/* ============================================================
   TERRAVANA WILDS - script.js
   Ultra-Premium Cinematic Eco-Adventure Resort
   ============================================================ */

'use strict';

/* -- DOM Ready Helper -- */
const ready = fn => {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
};

/* ============================================================
   1. PAGE LOADER
   ============================================================ */
const initLoader = () => {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  let isHidden = false;
  const hideLoader = () => {
    if (isHidden) return;
    isHidden = true;
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  };

  // Hide loader after animation completes, with a fallback for slow image/CDN loads.
  window.addEventListener('load', () => setTimeout(hideLoader, 900));
  setTimeout(hideLoader, 2800);

  // Prevent scroll during load
  document.body.style.overflow = 'hidden';
};

/* ============================================================
   2. CUSTOM CURSOR
   ============================================================ */
const initCursor = () => {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (dot) dot.style.display = 'none'; // Hide the dot design
  if (ring) ring.style.display = 'none'; // Hide the ring design
};

/* ============================================================
   3. NAVBAR
   ============================================================ */
const initNavbar = () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const hamburger  = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile');
  const path  = window.location.pathname.split('/').pop() || 'index.html';

  // Scroll state
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active link
  const links = document.querySelectorAll('#navbar .nav-link, #nav-mobile .nav-link');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  if (mobileMenu) {
    const cta = mobileMenu.querySelector('.nav-cta');
    mobileMenu.innerHTML = '';

    const items = navbar.querySelectorAll('.nav-links > a, .nav-links > .nav-dropdown');

    if (items.length) {
      items.forEach(item => {
        if (item.tagName === 'A') {
          const clone = item.cloneNode(true);
          clone.removeAttribute('role');
          mobileMenu.appendChild(clone);
        } else if (item.classList.contains('nav-dropdown')) {
          const acc = document.createElement('div');
          acc.className = 'mobile-accordion';

          const toggle = item.querySelector('.nav-dropdown-toggle').cloneNode(true);
          toggle.removeAttribute('role');
          toggle.className = 'mobile-accordion-toggle nav-link';
          toggle.setAttribute('aria-expanded', 'false');
          
          toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            acc.classList.toggle('open');
            toggle.setAttribute('aria-expanded', acc.classList.contains('open') ? 'true' : 'false');
          });

          const content = document.createElement('div');
          content.className = 'mobile-accordion-content';

          const subLinks = item.querySelectorAll('.nav-dropdown-menu .nav-link');
          subLinks.forEach(sub => {
            const subClone = sub.cloneNode(true);
            subClone.removeAttribute('role');
            subClone.className = 'mobile-accordion-item nav-link';
            content.appendChild(subClone);
          });

          acc.appendChild(toggle);
          acc.appendChild(content);
          mobileMenu.appendChild(acc);
        }
      });
      if (cta) mobileMenu.appendChild(cta.cloneNode(true));
    }

    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === path || (path === '' && href === 'index.html'));
    });
  }

  // Mobile hamburger
  if (!hamburger || !mobileMenu) return;

  const setMenuOpen = isOpen => {
    hamburger.classList.toggle('open', isOpen);
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('nav-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  hamburger.addEventListener('click', e => {
    e.stopPropagation();
    setMenuOpen(!mobileMenu.classList.contains('open'));
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (a.classList.contains('mobile-accordion-toggle')) return;
      setMenuOpen(false);
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') setMenuOpen(false);
  });
};

/* ============================================================
   3b. PROFILE DROPDOWN
   ============================================================ */
const initProfileDropdown = () => {
  const dropdown = document.getElementById('nav-profile-dropdown');
  const btn      = document.getElementById('nav-profile-btn');
  const menu     = document.getElementById('nav-profile-menu');
  if (!dropdown || !btn || !menu) return;

  const renderDropdown = () => {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.role === 'admin') {
          menu.innerHTML = `
            <div class="profile-menu-hdr">
              <div class="profile-menu-welcome">Welcome, Admin</div>
              <div class="profile-menu-user">${user.email}</div>
            </div>
            <a href="admin-dashboard.html" class="profile-menu-item">
              <i class="fa-solid fa-gauge-high"></i> Admin Dashboard
            </a>
            <div class="profile-menu-item logout" id="profile-logout-btn">
              <i class="fa-solid fa-right-from-bracket"></i> Log Out
            </div>
          `;
        } else {
          menu.innerHTML = `
            <div class="profile-menu-hdr">
              <div class="profile-menu-welcome">Welcome, Explorer</div>
              <div class="profile-menu-user">${user.email || 'Explorer'}</div>
            </div>
            <a href="user-dashboard.html" class="profile-menu-item">
              <i class="fa-solid fa-compass"></i> User Dashboard
            </a>
            <div class="profile-menu-item logout" id="profile-logout-btn">
              <i class="fa-solid fa-right-from-bracket"></i> Log Out
            </div>
          `;
        }
        
        // Wire up logout button in realtime
        const logoutBtn = document.getElementById('profile-logout-btn');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            localStorage.removeItem('currentUser');
            renderDropdown();
            menu.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
            
            // If we are on a private dashboard page, redirect to index
            const path = window.location.pathname;
            if (path.includes('dashboard.html')) {
              window.location.href = 'index.html';
            }
          });
        }
      } catch (err) {
        console.error("Error parsing currentUser", err);
        renderGuestMenu();
      }
    } else {
      renderGuestMenu();
    }
  };

  const renderGuestMenu = () => {
    menu.innerHTML = `
      <a href="login.html" class="profile-menu-item">
        <i class="fa-solid fa-right-to-bracket"></i> Sign In
      </a>
      <a href="signup.html" class="profile-menu-item">
        <i class="fa-solid fa-user-plus"></i> Join Terravana
      </a>
    `;
  };

  // Initial Render
  renderDropdown();

  // Toggle open
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close dropdown on click outside
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  // Listen for local storage updates
  window.addEventListener('storage', (e) => {
    if (e.key === 'currentUser') {
      renderDropdown();
    }
  });

  // Expose globally
  window.TerraVana = window.TerraVana || {};
  window.TerraVana.updateProfileDropdown = renderDropdown;
};

/* ============================================================
   4. SCROLL REVEAL (Enhanced)
   ============================================================ */
const initReveal = () => {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    let staggerIndex = 0;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        // Add stagger delay for items appearing together
        if (!el.style.transitionDelay && !el.className.match(/reveal-delay-/)) {
          el.style.transitionDelay = `${staggerIndex * 0.15}s`;
          staggerIndex++;
        }
        el.classList.add('visible');
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  els.forEach(el => observer.observe(el));
};

/* ============================================================
   5. PARALLAX
   ============================================================ */
const initParallax = () => {
  const parallaxSections = document.querySelectorAll('[data-parallax]');
  if (!parallaxSections.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const onScroll = () => {
    parallaxSections.forEach(section => {
      const rect   = section.getBoundingClientRect();
      const bg     = section.querySelector('[data-parallax-bg]');
      if (!bg) return;
      const speed  = parseFloat(section.dataset.parallax) || 0.3;
      const offset = rect.top * speed;
      bg.style.transform = `translateY(${offset}px)`;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
};

/* ============================================================
   6. HERO LOAD ANIMATION
   ============================================================ */
const initHero = () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Trigger Ken Burns on load
  setTimeout(() => hero.classList.add('loaded'), 100);
};

/* ============================================================
   7. MARQUEE / TICKER
   ============================================================ */
const initMarquee = () => {
  document.querySelectorAll('.marquee-track').forEach(track => {
    // Duplicate items for seamless loop
    const clone = track.cloneNode(true);
    track.parentNode.appendChild(clone);
  });
};

/* ============================================================
   8. COUNTER ANIMATION
   ============================================================ */
const animateCounter = (el, target, duration = 1800) => {
  const start = performance.now();
  const startVal = 0;

  const step = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startVal + (target - startVal) * ease);
    el.textContent = current.toLocaleString() + (el.dataset.suffix || '');
    
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.classList.add('text-glow');
    }
  };

  requestAnimationFrame(step);
};

const initCounters = () => {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.counter);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
};

/* ============================================================
   9. TABS
   ============================================================ */
const initTabs = () => {
  document.querySelectorAll('.tabs').forEach(tabBar => {
    const buttons = tabBar.querySelectorAll('.tab-btn');
    const panes   = document.querySelectorAll('.tab-pane');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        buttons.forEach(b => b.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const pane = document.getElementById(target);
        if (pane) pane.classList.add('active');
      });
    });
  });
};

/* ============================================================
   10. ACCORDION
   ============================================================ */
const initAccordion = () => {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const body = item.querySelector('.accordion-body');
      const inner = body.querySelector('.accordion-body-inner');
      const isOpen = item.classList.contains('open');

      // Close all siblings
      const siblings = item.parentElement.querySelectorAll('.accordion-item');
      siblings.forEach(sib => {
        sib.classList.remove('open');
        const b = sib.querySelector('.accordion-body');
        if (b) b.style.maxHeight = '0';
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = inner.scrollHeight + 'px';
      }
    });
  });
};

/* ============================================================
   11. GALLERY LIGHTBOX
   ============================================================ */
const initLightbox = () => {
  const items = document.querySelectorAll('.gallery-item[data-lightbox]');
  if (!items.length) return;

  // Create lightbox
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.innerHTML = `
    <div id="lightbox-backdrop" style="
      position:fixed;inset:0;background:rgba(17,19,21,0.95);z-index:9000;
      display:none;align-items:center;justify-content:center;
      backdrop-filter:blur(12px);
    ">
      <button id="lb-close" style="
        position:absolute;top:2rem;right:2rem;background:none;border:none;
        color:#C6A972;font-size:2rem;cursor:pointer;opacity:0.7;
        transition:opacity 0.2s;
      " aria-label="Close">&times;</button>
      <img id="lb-img" style="
        max-width:90vw;max-height:85vh;object-fit:contain;border-radius:3px;
        box-shadow:0 20px 80px rgba(0,0,0,0.6);
      " alt="">
    </div>
  `;
  document.body.appendChild(lb);

  const backdrop = lb.querySelector('#lightbox-backdrop');
  const img      = lb.querySelector('#lb-img');
  const closeBtn = lb.querySelector('#lb-close');

  items.forEach(item => {
    item.addEventListener('click', () => {
      img.src = item.dataset.lightbox;
      backdrop.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  const close = () => {
    backdrop.style.display = 'none';
    document.body.style.overflow = '';
    img.src = '';
  };

  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) close();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
};

/* ============================================================
   12. SMOOTH SCROLL LINKS
   ============================================================ */
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 90;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
};

/* ============================================================
   13. BOOKING FORM
   ============================================================ */
const initBookingForm = () => {
  const form = document.getElementById('booking-form');
  if (!form) return;

  // Set min date to today
  const dateInputs = form.querySelectorAll('input[type="date"]');
  const today = new Date().toISOString().split('T')[0];
  dateInputs.forEach(input => { input.min = today; });

  form.addEventListener('submit', e => {
    e.preventDefault();

    const btn = form.querySelector('[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Simulate async
    setTimeout(() => {
      btn.textContent = '&#10003; Request Received';
      btn.style.background = '#5E9E6B';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.color = '';
        form.reset();
      }, 3000);
    }, 1200);
  });
};

/* ============================================================
   14. CONTACT FORM
   ============================================================ */
const initContactForm = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '&#10003; Message Sent!';
      btn.style.background = '#5E9E6B';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.disabled = false;
        btn.style.background = '';
        form.reset();
      }, 3000);
    }, 1000);
  });
};

/* ============================================================
   15. HERO VIDEO / BACKGROUND CYCLE
   ============================================================ */
const initHeroCycle = () => {
  const heroMedia = document.querySelector('[data-hero-cycle]');
  if (!heroMedia) return;

  const images = JSON.parse(heroMedia.dataset.heroCycle || '[]');
  if (!images.length) return;

  let current = 0;
  setInterval(() => {
    current = (current + 1) % images.length;
    heroMedia.style.transition = 'opacity 1s ease';
    heroMedia.style.opacity = 0;
    setTimeout(() => {
      heroMedia.style.backgroundImage = `url(${images[current]})`;
      heroMedia.style.opacity = 1;
    }, 1000);
  }, 6000);
};

/* ============================================================
   16. STICKY SECTION LABELS
   ============================================================ */
const initStickyLabels = () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const label = entry.target.querySelector('.section-label');
      if (!label) return;
      if (entry.isIntersecting) label.classList.add('visible');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.section').forEach(s => observer.observe(s));
};

/* ============================================================
   17. BACK-TO-TOP BUTTON
   ============================================================ */
const initBackToTop = () => {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.style.opacity = window.scrollY > 600 ? '1' : '0';
    btn.style.pointerEvents = window.scrollY > 600 ? 'auto' : 'none';
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

/* ============================================================
   18. NATURE SOUND TOGGLE (placeholder)
   ============================================================ */
const initSoundToggle = () => {
  const btn = document.getElementById('sound-toggle');
  if (!btn) return;

  let muted = true;
  btn.addEventListener('click', () => {
    muted = !muted;
    btn.classList.toggle('active', !muted);
    btn.title = muted ? 'Play ambient sounds' : 'Mute sounds';
    btn.querySelector('span').textContent = muted ? 'Muted' : 'Sound';
  });
};

/* ============================================================
   19. CARD TILT EFFECT (subtle 3D)
   ============================================================ */
const initCardTilt = () => {
  const cards = document.querySelectorAll('[data-tilt]');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
};

/* ============================================================
   20. PAGE TRANSITION OVERLAY
   ============================================================ */
const initPageTransition = () => {
  const overlay = document.getElementById('page-transition');
  if (!overlay) return;

  // Animate in on page load
  overlay.style.opacity = '0';
  setTimeout(() => overlay.style.display = 'none', 500);

  // Animate out on link click
  document.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel')) return;
    if (a.target === '_blank') return;

    a.addEventListener('click', e => {
      e.preventDefault();
      overlay.style.display = 'flex';
      overlay.style.opacity = '1';
      setTimeout(() => {
        window.location.href = href;
      }, 400);
    });
  });
};

/* ============================================================
   21. HERO PARTICLES
   ============================================================ */
const initParticles = () => {
  const heroes = document.querySelectorAll('.hero');
  if (!heroes.length) return;

  heroes.forEach(hero => {
    const container = document.createElement('div');
    container.className = 'particles';
    
    const count = window.innerWidth > 768 ? 30 : 15;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      
      const size = Math.random() * 3 + 1;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      
      p.style.animationDelay = `${Math.random() * 8}s`;
      p.style.animationDuration = `${Math.random() * 6 + 4}s`;
      
      container.appendChild(p);
    }
    
    hero.appendChild(container);
  });
};

/* ============================================================
   22. BROKEN IMAGE FALLBACK
   ============================================================ */
const initImageFallbacks = () => {
  const fallbackFor = img => {
    const text = `${img.alt || ''} ${img.src || ''}`.toLowerCase();
    if (text.includes('campfire') || text.includes('fire')) return 'assets/campfire-night.jpg';
    if (text.includes('resort') || text.includes('lodge') || text.includes('stay')) return 'assets/home-resort-hero-full.jpg';
    return 'assets/home-resort-hero-full.jpg';
  };

  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      if (img.dataset.fallbackApplied === 'true') return;
      img.dataset.fallbackApplied = 'true';
      img.src = fallbackFor(img);
    });
  });
};

/* ============================================================
   23. SITE-WIDE MOTION POLISH
   ============================================================ */
const initGlobalMotion = () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.classList.add('motion-ready');
  if (reduceMotion) return;

  const sectionTargets = document.querySelectorAll('main > section, main > div > section');
  const imageTargets = document.querySelectorAll('main img:not(.hero-bg)');
  const magneticTargets = document.querySelectorAll('.btn, .nav-cta, #back-to-top, .footer-social-link');

  sectionTargets.forEach(section => section.classList.add('motion-section'));
  imageTargets.forEach(img => img.classList.add('motion-image'));
  magneticTargets.forEach(el => el.classList.add('magnetic-ready'));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('motion-visible');
      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -70px 0px'
  });

  document.querySelectorAll('.motion-section, .motion-image').forEach(el => {
    revealObserver.observe(el);
  });

  magneticTargets.forEach(el => {
    el.addEventListener('mousemove', event => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
};

/* ============================================================
   INIT ALL
   ============================================================ */
ready(() => {
  initLoader();
  initCursor();
  initNavbar();
  initProfileDropdown();
  initGlobalMotion();
  initReveal();
  initParallax();
  initHero();
  initMarquee();
  initCounters();
  initTabs();
  initAccordion();
  initLightbox();
  initSmoothScroll();
  initBookingForm();
  initContactForm();
  initHeroCycle();
  initStickyLabels();
  initBackToTop();
  initSoundToggle();
  initCardTilt();
  initPageTransition();
  initParticles();
  initImageFallbacks();
});

/* -- Expose globally for inline handlers -- */
window.TerraVana = {
  revealAll: () => {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      el.classList.add('visible');
    });
  }
};
