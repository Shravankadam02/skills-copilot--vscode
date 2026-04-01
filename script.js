/* ===========================
   script.js — Portfolio interactions
=========================== */

// ----- Navbar scroll effect -----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ----- Mobile hamburger menu -----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu on nav link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ----- Scroll-reveal animation -----
const revealElements = document.querySelectorAll(
  '.section-title, .about-text, .about-stats, .stat-card, ' +
  '.skill-category, .project-card, .contact-info, .contact-form'
);
revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach(el => revealObserver.observe(el));

// ----- Animated stat counters -----
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach(el => counterObserver.observe(el));

function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1500; // ms
  const step     = Math.ceil(target / (duration / 16));
  let   current  = 0;

  const tick = () => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// ----- Contact form -----
const form       = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  // Basic validation
  if (!name || !email || !message) {
    showStatus('Please fill in all fields.', 'error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showStatus('Please enter a valid email address.', 'error');
    return;
  }

  // Simulate sending (replace with your backend / EmailJS call)
  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  setTimeout(() => {
    showStatus('Message sent! I\'ll get back to you soon 🎉', 'success');
    form.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
  }, 1200);
});

function showStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className   = 'form-status ' + type;
  setTimeout(() => {
    formStatus.textContent = '';
    formStatus.className   = 'form-status';
  }, 5000);
}

// ----- Footer year -----
document.getElementById('year').textContent = new Date().getFullYear();
