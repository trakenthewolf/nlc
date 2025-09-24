// NLC Store - script.js
(function () {
  // Top al cargar/entrar
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Asegurar que la página se cargue desde arriba al recargar
  window.onbeforeunload = function() {
    window.scrollTo(0, 0);
  };

  // Reveal on scroll usando IntersectionObserver con delay secuencial
  const reveals = document.querySelectorAll('.reveal');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Funcionalidad del menú móvil
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navLinkElements = document.querySelectorAll('.nav-link');
    navLinkElements.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  if (!prefersReduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Añadir delay secuencial para elementos dentro del mismo contenedor
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, index * 150); // Delay escalonado
          
          io.unobserve(entry.target);
        }
      });
    }, { 
      root: null, 
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px' // Trigger un poco antes
    });

    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }
  
  // Animaciones al hacer scroll y mejoras para móviles
  const fadeElements = document.querySelectorAll('.fade-in');
  const navLinkItems = document.querySelectorAll('.nav-link');
  
  // Función para animaciones de fade-in
  function checkFade() {
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }
  
  // Mejorar experiencia táctil para elementos interactivos
  const touchElements = document.querySelectorAll('.cta-button, .nav-link, .collection-item, .product-card, .filter-group select');
  
  touchElements.forEach(element => {
    // Agregar clase activa al tocar para feedback visual
    element.addEventListener('touchstart', function() {
      this.classList.add('touch-active');
    }, { passive: true });
    
    element.addEventListener('touchend', function() {
      this.classList.remove('touch-active');
    }, { passive: true });
  });
  
  // Agregar delay para evitar doble tap en dispositivos móviles
  navLinkItems.forEach(link => {
    link.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const href = this.getAttribute('href');
        setTimeout(() => {
          window.location.href = href;
        }, 100);
      }
    });
  });
  
  window.addEventListener('scroll', checkFade);
  checkFade(); // Verificar elementos visibles al cargar la página

  // Efecto 3D mejorado dependiente del scroll
  const sections = document.querySelectorAll('.section');
  let ticking = false;

  function onScroll3D() {
    const vh = window.innerHeight;
    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const distFromCenter = center - vh / 2;
      const norm = Math.max(-1, Math.min(1, distFromCenter / (vh / 2))); // -1..1
      const rotateX = -norm * 3; // grados (aumentado ligeramente)
      const translateZ = (1 - Math.abs(norm)) * 20; // px (aumentado)
      const scale = 0.98 + ((1 - Math.abs(norm)) * 0.04); // Escala sutil
      
      sec.style.transform = `translateY(0) rotateX(${rotateX}deg) translateZ(${translateZ}px) scale(${scale})`;
      
      // Ajustar opacidad para efecto de profundidad
      const opacity = 0.85 + ((1 - Math.abs(norm)) * 0.15);
      sec.style.opacity = opacity;
    });
  }

  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        onScroll3D();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);
  requestTick();
  
  // Smooth scroll para navegación interna
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
})();