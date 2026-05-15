document.addEventListener('DOMContentLoaded', () => {
    const elementosAnimados = document.querySelectorAll('.pop-in');

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 
    });

    elementosAnimados.forEach(elemento => {
        observador.observe(elemento);
    });

    const formulario = document.getElementById('formulario-contacto');
    if(formulario) {
        formulario.addEventListener('submit', function(evento) {
            evento.preventDefault(); 
            const nombre = formulario.querySelector('input[type="text"]').value;
            const correo = formulario.querySelector('input[type="email"]').value;
            const mensaje = formulario.querySelector('textarea').value;
            
            const numeroCliente = "2213573007"; 
            
            const textoWhatsApp = `¡Hola! Vengo de la página web.%0A%0A*Mi nombre es:* ${nombre}%0A*Mi correo:* ${correo}%0A*Me interesa:* ${mensaje}`;
            
            const urlWhatsApp = `https://wa.me/${numeroCliente}?text=${textoWhatsApp}`;
            window.open(urlWhatsApp, '_blank');
            
            formulario.reset();
        });
    }
    // 4. MENÚ HAMBURGUESA PARA CELULARES
    const menuBtn = document.querySelector('.menu-hamburguesa');
    const navEnlaces = document.querySelector('.nav-enlaces');

    if(menuBtn && navEnlaces) {
        // Abre o cierra el menú al tocar el botón
        menuBtn.addEventListener('click', () => {
            navEnlaces.classList.toggle('activo');
        });

        // Detalle Pro: Cerrar el menú automáticamente cuando el usuario toca un enlace
        const enlacesMenu = document.querySelectorAll('.nav-enlaces li a');
        enlacesMenu.forEach(enlace => {
            enlace.addEventListener('click', () => {
                navEnlaces.classList.remove('activo');
            });
        });
    }

    const faqPreguntas = document.querySelectorAll('.faq-pregunta');
    
    faqPreguntas.forEach(pregunta => {
        pregunta.addEventListener('click', () => {
            const faqItem = pregunta.parentElement;
            
            document.querySelectorAll('.faq-item').forEach(item => {
                if(item !== faqItem) {
                    item.classList.remove('activa');
                }
            });

            faqItem.classList.toggle('activa');
        });
    });

});