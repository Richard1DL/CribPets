document.addEventListener('DOMContentLoaded', () => {
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

    // --- Tu lógica existente para los formularios de login/register (si este script también se usa en login-register.html) ---
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');

    if (loginForm && registerForm) { // Solo si estamos en la página con los formularios
        const urlParams = new URLSearchParams(window.location.search);
        const formToShow = urlParams.get('form');

        let defaultLoginFormActive = true;
        if (formToShow === 'register') {
            defaultLoginFormActive = false;
        }

        if (defaultLoginFormActive) {
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        } else {
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
        }
    }

    if (showRegisterLink && loginForm && registerForm) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
        });
    }

    if (showLoginLink && loginForm && registerForm) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            registerForm.classList.remove('active');
            loginForm.classList.add('active');
        });
    }
});