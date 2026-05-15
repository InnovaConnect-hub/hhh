document.addEventListener('DOMContentLoaded', () => {

    // 1. EL MOTOR DE ANIMACIONES (Hace que lo invisible aparezca)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const elementosAnimados = document.querySelectorAll('.pop-in');
    elementosAnimados.forEach(el => observer.observe(el));

    // 2. MENÚ MÓVIL (Hamburguesa)
    const menuBtn = document.querySelector('.menu-hamburguesa');
    const navEnlaces = document.querySelector('.nav-enlaces');

    if(menuBtn && navEnlaces) {
        menuBtn.addEventListener('click', () => {
            navEnlaces.classList.toggle('activo');
        });

        // Cierra el menú de cristal al tocar un enlace
        document.querySelectorAll('.nav-enlaces li a').forEach(enlace => {
            enlace.addEventListener('click', () => {
                navEnlaces.classList.remove('activo');
            });
        });
    }

    // 3. PESTAÑAS DEL CATÁLOGO (Nuevo: Para el diseño que me pediste)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productos = document.querySelectorAll('.producto-card');

    if(tabBtns.length > 0 && productos.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Quita el color magenta a todos los botones y se lo pone al que tocaste
                tabBtns.forEach(b => b.classList.remove('activo'));
                btn.classList.add('activo');

                // Obtiene la categoría que quieres filtrar (ej: "dtf")
                const filtro = btn.getAttribute('data-filtro');

                // Revisa cada producto para ver si coincide
                productos.forEach(prod => {
                    // Reinicia la animación para que se vea fluido
                    prod.style.animation = 'none';
                    prod.offsetHeight; // Forzar lectura del navegador

                    // Si el filtro es "todos" o el producto tiene la categoría buscada...
                    if (filtro === 'todos' || prod.getAttribute('data-categoria').includes(filtro)) {
                        prod.style.display = 'block'; // Lo muestra
                        prod.style.animation = 'fadeInCard 0.5s ease forwards'; // Le da efecto
                    } else {
                        prod.style.display = 'none'; // Lo esconde
                    }
                });
            });
        });
    }

    // 4. FORMULARIO CONECTADO A WHATSAPP
    const formulario = document.getElementById('formulario-contacto');
    if(formulario) {
        formulario.addEventListener('submit', function(evento) {
            evento.preventDefault(); 
            
            // Recolectamos los datos del nuevo formulario de 2 columnas
            const inputs = formulario.querySelectorAll('input');
            const textarea = formulario.querySelector('textarea');
            
            const nombre = inputs[0].value;
            const telefono = inputs[1].value;
            const correo = inputs[2].value;
            const mensaje = textarea.value;
            
            // El número de Two Ink
            const numeroCliente = "522213573007"; 
            
            const textoWhatsApp = `¡Hola Two Ink! Vengo de la página web.%0A%0A*Mi nombre:* ${nombre}%0A*Mi teléfono:* ${telefono}%0A*Mi correo:* ${correo}%0A*Mi proyecto:* ${mensaje}`;
            
            const urlWhatsApp = `https://wa.me/${numeroCliente}?text=${textoWhatsApp}`;
            window.open(urlWhatsApp, '_blank');
            
            formulario.reset();
        });
    }
    // 5. PREGUNTAS FRECUENTES (Acordeón Interactivo)
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const preguntaBtn = item.querySelector('.faq-pregunta');
        preguntaBtn.addEventListener('click', () => {
            // Opción pro: Cierra las demás preguntas al abrir una nueva
            faqItems.forEach(otherItem => {
                if(otherItem !== item) {
                    otherItem.classList.remove('activa');
                    otherItem.querySelector('.icono').textContent = '+';
                }
            });
            
            // Abre o cierra la pregunta actual
            item.classList.toggle('activa');
            const icono = item.querySelector('.icono');
            
            // Cambia el icono de + a -
            if (item.classList.contains('activa')) {
                icono.textContent = '−';
            } else {
                icono.textContent = '+';
            }
        });
    });

    // 6. FORMULARIO A WHATSAPP (Conversión de ventas)
    const formContacto = document.getElementById('formulario-contacto');
    
    if(formContacto) {
        formContacto.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que la página se reinicie de golpe
            
            // Capturamos lo que escribió el cliente usando los IDs que pusimos en el HTML
            const nombre = document.getElementById('nombreCliente').value;
            const telefono = document.getElementById('telCliente').value;
            const correo = document.getElementById('correoCliente').value;
            const mensaje = document.getElementById('mensajeCliente').value;
            
            // Tu número corporativo
            const numeroEmpresa = "522213573007"; 
            
            // Armamos un mensaje estructurado y profesional
            const textoMensaje = `¡Hola, equipo de Two Ink! 👋 Vengo de su página web.%0A%0A*Mis datos de contacto:*%0A👤 Nombre: ${nombre}%0A📱 Tel: ${telefono}%0A✉️ Correo: ${correo}%0A%0A*Detalles de mi proyecto:*%0A📝 ${mensaje}`;
            
            // Generamos el enlace y abrimos WhatsApp en una pestaña nueva
            const url = `https://wa.me/${numeroEmpresa}?text=${textoMensaje}`;
            window.open(url, '_blank');
            
            // Vaciamos el formulario como confirmación visual
            formContacto.reset();
        });
    }
});
