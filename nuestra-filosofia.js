// JavaScript para la página Nuestra Filosofía

// Actualizar año del footer
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar año del copyright
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Inicializar animaciones de scroll
    initScrollReveal();
    
    // Asegurar que la página cargue desde arriba
    window.onbeforeunload = function() {
        window.scrollTo(0, 0);
    };
    
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Función para inicializar las animaciones de scroll
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach((element, index) => {
            const revealTop = element.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                // Añadir delay secuencial para elementos
                setTimeout(() => {
                    element.classList.add('active');
                }, index * 100); // 100ms de retraso entre cada elemento
            }
        });
    }
    
    // Comprobar al cargar la página
    checkReveal();
    
    // Comprobar al hacer scroll
    window.addEventListener('scroll', checkReveal);
}