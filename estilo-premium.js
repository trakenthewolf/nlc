// JavaScript para la página de Estilo Premium

// Actualizar año en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Animaciones de revelado al hacer scroll
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  
  revealElements.forEach((element, index) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    // Añadir un pequeño retraso secuencial para elementos con el mismo padre
    const delay = element.dataset.delay || index * 0.1;
    
    if (elementTop < windowHeight - elementVisible) {
      setTimeout(() => {
        element.classList.add('active');
      }, delay * 1000);
    }
  });
};

// Asegurar que la página se cargue desde arriba al recargar
window.onbeforeunload = function() {
  window.scrollTo(0, 0);
};

// Inicializar animaciones al cargar la página
window.addEventListener('load', () => {
  // Pequeño retraso para asegurar que los elementos estén renderizados
  setTimeout(() => {
    revealOnScroll();
  }, 300);
});

// Continuar animaciones al hacer scroll
window.addEventListener('scroll', revealOnScroll);

// Navegación suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});