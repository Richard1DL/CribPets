import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js"; // Asegúrate de la versión (ej. 10.4.0)
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged // Esto es útil para saber si un usuario está logueado
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// Tu configuración de Firebase (¡REEMPLAZA CON TUS VALORES REALES!)
const firebaseConfig = {
    apiKey: "AIzaSyWaK9xyW-2UgFHxGku_vavm1S0vtHDw", // <-- Tu apiKey
    authDomain: "cribpets-87481.firebaseapp.com", // <-- Tu authDomain
    projectId: "cribpets-87481", // <-- Tu projectId
    storageBucket: "cribpets-87481.appspot.com", // <-- Tu storageBucket
    messagingSenderId: "677541842378", // <-- Tu messagingSenderId
    appId: "1:677541842378:web:6915e0b418ffc0e1079333", // <-- Tu appId
    measurementId: "G-S71RFLFRHZ" // <-- Tu measurementId (si lo incluyes)
};

// Inicializar Firebase App
const app = initializeApp(firebaseConfig);
// Obtener la instancia de Auth
const auth = getAuth(app);
// **FIN: Configuración y Librerías de Firebase**


document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica del Menú Hamburguesa (MANTÉN ESTO TAL CUAL) ---
    const hamburgerBtn = document.querySelector('.hamburger-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            hamburgerBtn.classList.toggle('open');
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('open')) {
                    mainNav.classList.remove('open');
                    hamburgerBtn.classList.remove('open');
                }
            });
        });
    }

    // --- Lógica para cambiar entre formularios Login/Register (MANTÉN ESTO TAL CUAL) ---
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');

    // Asumimos que los IDs de los inputs son 'loginEmail', 'loginPassword', 'registerEmail', 'registerPassword'
    // Si no los tienes, por favor, añádelos a tus inputs <input type="email" id="loginEmail" ...> en el HTML

    // Inicializar el formulario correcto al cargar la página
    const urlParams = new URLSearchParams(window.location.search);
    const formToShow = urlParams.get('form');

    if (loginForm && registerForm) {
        if (formToShow === 'register') {
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
        } else {
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        }
    }

    // Event listeners para cambiar entre formularios
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            registerForm.classList.remove('active');
            loginForm.classList.remove('active'); // Asegura que loginForm se esconde
        });
    }

    // --- ¡NUEVA LÓGICA DE FIREBASE AUTHENTICATION! ---

    // Manejar el Registro de Usuario
    if (registerForm) { // Asegúrate de que el formulario de registro exista
        registerForm.addEventListener('submit', async (e) => { // Usar 'submit' en el formulario
            e.preventDefault(); // Previene el envío tradicional del formulario

            const emailInput = document.getElementById('registerEmail'); // Asegúrate de este ID en tu HTML
            const passwordInput = document.getElementById('registerPassword'); // Asegúrate de este ID en tu HTML
            const email = emailInput ? emailInput.value : '';
            const password = passwordInput ? passwordInput.value : '';

            if (!email || !password) {
                alert('Por favor, ingresa un email y una contraseña para registrarte.');
                return;
            }
            
            // Validaciones básicas de contraseña (Firebase tiene algunas, pero puedes añadir más)
            if (password.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres.');
                return;
            }

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                alert('¡Registro exitoso! Te has registrado con el email: ' + user.email);
                // Opcional: Redirigir al usuario o cambiar a la vista de login
                window.location.href = 'index.html'; // Redirigir a la página principal después del registro
            } catch (error) {
                let errorMessage = 'Error al registrarse. Por favor, intenta de nuevo.';
                if (error.code === 'auth/email-already-in-use') {
                    errorMessage = 'Este email ya está registrado.';
                } else if (error.code === 'auth/invalid-email') {
                    errorMessage = 'El formato del email no es válido.';
                } else if (error.code === 'auth/weak-password') {
                    errorMessage = 'La contraseña es demasiado débil. Necesita al menos 6 caracteres.';
                }
                console.error('Error de registro:', error.message, error.code);
                alert(errorMessage);
            }
        });
    }

    // Manejar el Inicio de Sesión de Usuario
    if (loginForm) { // Asegúrate de que el formulario de login exista
        loginForm.addEventListener('submit', async (e) => { // Usar 'submit' en el formulario
            e.preventDefault(); 

            const emailInput = document.getElementById('loginEmail'); // Asegúrate de este ID en tu HTML
            const passwordInput = document.getElementById('loginPassword'); // Asegúrate de este ID en tu HTML
            const email = emailInput ? emailInput.value : '';
            const password = passwordInput ? passwordInput.value : '';

            if (!email || !password) {
                alert('Por favor, ingresa un email y una contraseña para iniciar sesión.');
                return;
            }

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                alert('¡Inicio de sesión exitoso! Bienvenido, ' + user.email);
                // Redirigir al usuario a una página privada o al index
                window.location.href = 'index.html'; 
            } catch (error) {
                let errorMessage = 'Error al iniciar sesión. Verifica tu email y contraseña.';
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    errorMessage = 'Email o contraseña incorrectos.';
                } else if (error.code === 'auth/invalid-email') {
                    errorMessage = 'El formato del email no es válido.';
                }
                console.error('Error de inicio de sesión:', error.message, error.code);
                alert(errorMessage);
            }
        });
    }

    // Opcional: Manejar el estado de autenticación (para saber si el usuario ya está logueado al cargar la página)
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Usuario está logueado
            console.log('Usuario logueado:', user.email);
        } else {
            // No hay usuario logueado
            console.log('No hay usuario logueado.');
        }
    });

    // --- FIN: LÓGICA DE FIREBASE AUTHENTICATION ---
}); // Fin de DOMContentLoaded