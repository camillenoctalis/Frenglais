/* =============================================
   FRENGLAIS — script.js
   ============================================= */

/* ---- Header scroll ---- */
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
}

/* ---- Hamburger / mobile nav ---- */
const hamburger = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobileNav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---- Language switcher ---- */
const langBtns = document.querySelectorAll('[data-lang]');
let currentLang = localStorage.getItem('frenglais-lang') || 'fr';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('frenglais-lang', lang);
  document.documentElement.lang = lang;
  langBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  document.querySelectorAll('[data-fr]').forEach(el => {
    el.textContent = lang === 'en' ? el.dataset.en : el.dataset.fr;
  });
  document.querySelectorAll('[data-fr-html]').forEach(el => {
    el.innerHTML = lang === 'en' ? el.dataset.enHtml : el.dataset.frHtml;
  });
}

langBtns.forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});
applyLang(currentLang);

/* ---- FAQ accordion ---- */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ---- Scroll reveal ---- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  revealObserver.observe(el);
});

/* ---- Booking stepper (reserver.html) ---- */
const stepBtns = document.querySelectorAll('[data-step-next]');
stepBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const current = btn.closest('.step-panel');
    const nextId  = btn.dataset.stepNext;
    const next    = document.getElementById(nextId);
    if (!current || !next) return;
    current.style.display = 'none';
    next.style.display    = 'block';
    const stepNum = next.dataset.stepNum;
    document.querySelectorAll('.step-dot').forEach((dot, i) => {
      const n = i + 1;
      dot.classList.toggle('active', String(n) === stepNum);
      dot.classList.toggle('done',   n < Number(stepNum));
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

/* ---- Smooth active nav link ---- */
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
if (sections.length) {
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${entry.target.id}`
            ? 'var(--black)' : '';
        });
      }
    });
  }, { threshold: .4 });
  sections.forEach(s => navObserver.observe(s));
}

/* ---- Video modal placeholder ---- */
const videoBlock = document.querySelector('.video-block');
if (videoBlock) {
  videoBlock.addEventListener('click', () => {
    alert('La vidéo de présentation FRENGLAIS sera disponible prochainement. 🎬');
  });
}

/* ---- Tab switcher (credits page) ---- */
const tabBtns  = document.querySelectorAll('[data-tab]');
const tabPanels = document.querySelectorAll('[data-tab-panel]');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === target));
    tabPanels.forEach(p => p.style.display = p.dataset.tabPanel === target ? 'block' : 'none');
  });
});
