/* script.js - Coffee Heaven
   Place in same folder as index.html and style.css
*/

/* DOM helpers */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

/* NAV TOGGLE */
const menuToggle = $('#menuToggle') || document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    // toggle icon if using <i>
    const icon = menuToggle.querySelector('i');
    if (icon) icon.classList.toggle('fa-times');
  });
}

/* CLOSE NAV ON LINK CLICK (mobile) */
navLinks && navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && window.innerWidth < 980) {
    navLinks.classList.remove('show');
    const icon = menuToggle && menuToggle.querySelector('i');
    if (icon) icon.classList.remove('fa-times');
  }
});

/* BACK TO TOP */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (!backToTop) return;
  if (window.scrollY > 350) backToTop.classList.add('show');
  else backToTop.classList.remove('show');

  /* sticky navbar color on scroll (subtle) */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 50) navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
    else navbar.style.boxShadow = '0 6px 24px rgba(20,20,20,0.04)';
  }
});
backToTop && backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* SMOOTH SCROLL FOR INTERNAL LINKS */
document.addEventListener('click', (e) => {
  const el = e.target;
  if (el.tagName === 'A' && el.getAttribute('href') && el.getAttribute('href').startsWith('#')) {
    e.preventDefault();
    const id = el.getAttribute('href');
    const target = document.querySelector(id);
    if (target) {
      const offset = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset - 10;
      window.scrollTo({ top, behavior: 'smooth' });
      // update active link
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      el.classList.add('active');
    }
  }
});

/* REVEAL ON SCROLL */
const reveals = Array.from(document.querySelectorAll('.reveal'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach(r => revealObserver.observe(r));

/* CONTACT FORM - basic client side handling */
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // lightweight UX: clear fields and show a small message
    const name = contactForm.querySelector('input[type="text"]')?.value || '';
    contactForm.reset();
    // tiny toast using DOM
    const toast = document.createElement('div');
    toast.textContent = `Thanks ${name || ''}! We'll get back to you soon.`;
    toast.style.position = 'fixed';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.bottom = '2.6rem';
    toast.style.background = '#5c3d2e';
    toast.style.color = '#fff';
    toast.style.padding = '0.7rem 1.1rem';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)';
    toast.style.zIndex = 2000;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
  });
}

/* Accessibility: close nav when Escape pressed */
document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape' && navLinks.classList.contains('show')) {
    navLinks.classList.remove('show');
  }
});
