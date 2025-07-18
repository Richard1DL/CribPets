document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');

    // --- Lógica para leer el parámetro de la URL ---
    const urlParams = new URLSearchParams(window.location.search);
    const formToShow = urlParams.get('form'); // Obtiene el valor del parámetro 'form' (ej: 'register')

    // Por defecto, se asume que se muestra el login
    let defaultLoginFormActive = true;
    if (formToShow === 'register' && registerForm) { // Si el parámetro es 'register' y el form existe
        defaultLoginFormActive = false; // El formulario de registro será el activo por defecto
    }

    // Inicializa la visibilidad de los formularios basada en el parámetro URL
    if (loginForm && registerForm) {
        if (defaultLoginFormActive) {
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        } else {
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
        }
    }

    // Función para mostrar el formulario de registro y ocultar el de login
    if (showRegisterLink && loginForm && registerForm) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault(); // Previene el comportamiento por defecto del enlace
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
        });
    }

    // Función para mostrar el formulario de login y ocultar el de registro
    if (showLoginLink && loginForm && registerForm) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault(); // Previene el comportamiento por defecto del enlace
            registerForm.classList.remove('active');
            loginForm.classList.add('active');
        });
    }

    // --- Lógica para el menú hamburguesa ---
    const hamburgerBtn = document.querySelector('.hamburger-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', () => {
            mainNav.classList.toggle('open'); // Alterna la clase 'open' en el menú
            hamburgerBtn.classList.toggle('open'); // Alterna la clase 'open' en el botón para la animación
        });

        // Opcional: Cerrar el menú si se hace clic en un enlace (para mejorar la UX)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Solo cerramos si el menú está abierto
                if (mainNav.classList.contains('open')) {
                    mainNav.classList.remove('open');
                    hamburgerBtn.classList.remove('open');
                }
            });
        });
    }
});