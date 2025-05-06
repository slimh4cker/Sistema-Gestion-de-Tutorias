

let currentUserType = 'alumno';
let isLoginForm = false;

function switchForm(userType, login = false) {
    const formContainer = document.getElementById('form-container');
    currentUserType = userType;
    isLoginForm = login;
    
    formContainer.style.opacity = '0';
    
    setTimeout(() => {
        const formKey = login ? `login_${userType}` : userType;
        formContainer.innerHTML = formTemplates[formKey];

        formContainer.style.opacity = '1';
        
        // Actualizar estado de botones 
        document.querySelectorAll('.btn-role').forEach(btn => {
            btn.classList.remove('active');
            btn.style.backgroundColor = 'white';
            btn.style.color = '#1120ca';
        });
        
        const activeBtn = document.getElementById(`btn-${userType}`);
        if (activeBtn) {
            activeBtn.classList.add('active');
            activeBtn.style.backgroundColor = '#1120ca';
            activeBtn.style.color = 'white';
        }
    }, 10);
}

// Funciones para manejar login y registro
async function loginAlumno() {
    const email = document.getElementById('txtCorreoLogin')?.value;
    const password = document.getElementById('txtContraLogin')?.value;

    if (!email || !password) {
        alert('Por favor complete todos los campos');
        return;
    }

    try {
        const response = await fetch('http://localhost:1234/auth/alumno', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Error en la autenticación');
        }

        if (data.success) {
            window.location.href = 'home_alumno.html';
        } else {
            alert(data.message || 'Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'Error al conectar con el servidor');
    }
}

async function registrarAlumno() {
    const nombre = document.getElementById('txtNombre')?.value;
    const email = document.getElementById('txtCorreo')?.value;
    const password = document.getElementById('txtPassword')?.value;

    if (!nombre || !email || !password) {
        alert('Por favor complete todos los campos');
        return;
    }

    try {
        const response = await fetch('http://localhost:1234/alumno', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, email, password })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Error en el registro');
        }

        alert('Registro exitoso! Por favor inicie sesión');
        switchForm(currentUserType, true); // Cambiar a formulario de login
    } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'Error al registrar el usuario');
    }
}

// Event Delegation para manejar todos los clicks
document.addEventListener('click', (e) => {
    // Botón de iniciar sesión
    if (e.target && e.target.id === 'btnIniciarSesion') {
        e.preventDefault();
        loginAlumno();
    }
    
    // Botón de registrarse
    if (e.target && e.target.id === 'btnRegistrarse') {
        e.preventDefault();
        registrarAlumno();
    }
    
    // Botones de cambio de rol (alumno, asesor, admin)
    if (e.target && e.target.classList.contains('btn-role')) {
        e.preventDefault();
        const userType = e.target.id.replace('btn-', '');
        switchForm(userType, isLoginForm);
    }
    
    // Enlaces para cambiar entre login/registro
    if (e.target && e.target.classList.contains('toggle-form')) {
        e.preventDefault();
        switchForm(currentUserType, !isLoginForm);
    }
});

// Inicializar con formulario de alumno (login)
switchForm('alumno', true);

