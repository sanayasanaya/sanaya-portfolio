// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ===== MOBILE NAV =====
const hamburger = document.getElementById('hamburger');

// Create mobile nav & overlay dynamically
const mobileNav = document.createElement('div');
mobileNav.classList.add('mobile-nav');
const links = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];
links.forEach(link => {
  const a = document.createElement('a');
  a.href = '#' + link.toLowerCase();
  a.textContent = link;
  a.addEventListener('click', closeMenu);
  mobileNav.appendChild(a);
});

const overlay = document.createElement('div');
overlay.classList.add('overlay');
overlay.addEventListener('click', closeMenu);

document.body.appendChild(mobileNav);
document.body.appendChild(overlay);

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  overlay.classList.toggle('open');
});

function closeMenu() {
  mobileNav.classList.remove('open');
  overlay.classList.remove('open');
}

// ===== REVEAL ON SCROLL =====
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach((el, idx) => {
        if (el === entry.target) delay = idx * 80;
      });
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => observer.observe(el));

// ===== SMOOTH ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navAs.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = '#9f65f5';
    }
  });
});

// ===== TYPING EFFECT IN HERO =====
const roles = ['Backend Developer', 'Django Enthusiast', 'API Builder', 'Python Developer'];
let roleIdx = 0, charIdx = 0, isDeleting = false;
const roleEl = document.querySelector('.hero-role');

if (roleEl) {
  const prefix = '';
  const accent = ' <span class="accent">·</span> Python Enthusiast';

  function typeRole() {
    const currentRole = roles[roleIdx];
    if (!isDeleting) {
      charIdx++;
    } else {
      charIdx--;
    }
    roleEl.innerHTML = currentRole.slice(0, charIdx) + accent;

    let speed = isDeleting ? 40 : 80;
    if (!isDeleting && charIdx === currentRole.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 400;
    }
    setTimeout(typeRole, speed);
  }
  setTimeout(typeRole, 1500);
}

// ===== CURSOR GLOW (subtle) =====
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: left 0.3s ease, top 0.3s ease;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});