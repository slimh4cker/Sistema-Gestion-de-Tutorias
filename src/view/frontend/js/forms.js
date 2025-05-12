import  {validarCamposRegistro}  from '../../utils/validaciones/usuario.js';

const formTemplates = {
    alumno: `
        <div class="form-content">
            <h4 class="fw-bold">Registro de Alumno</h4>
            <p class="text-muted small mb-4">
                Completa tus datos para acceder al sistema de asesorías.
            </p>
            <form>
                <div class="mb-3">
                    <label class="form-label">Nombre completo:</label>
                    <input type="text" class="form-control" placeholder="Ej: Juan Pérez López" id="txtNombre">
                </div>
                <div class="mb-3">
                    <label class="form-label">Correo institucional:</label>
                    <input type="email" class="form-control" placeholder="ejemplo@ite.edu.mx" id="txtCorreo">
                </div>
                <div class="mb-3">
                    <label class="form-label">Contraseña:</label>
                    <input type="password" class="form-control" placeholder="mínimo 12 caracteres" id="txtPassword">
                </div>
                <div class="extra-space" style="height: 60px;"></div>
                <div class="form-footer text-center">
                    <button class="btn-primary-action" id="btnRegistrarse">REGISTRARSE</button>
                   <p class="text-muted small mt-3">¿Ya tienes cuenta? <a href="#" class="text-primary fw-bold toggle-form">Inicia sesión aquí</a></p>
                </div>
            </form>
        </div>
    `,
    
    asesor: `
    <div class="form-content" data-type="asesor">
        <h4 class="fw-bold">Registro de Asesor</h4>
        <p class="text-muted small mb-4">
            Completa tus datos para ofrecer asesorías.
        </p>
        <form>
            <div class="mb-3">
                <label class="form-label">Nombre completo:</label>
                <input type="text" class="form-control" placeholder="Ej: María García López" id="txtNombre">
            </div>
            <div class="mb-3">
                <label class="form-label">Correo institucional:</label>
                <input type="email" class="form-control" placeholder="asesor@ite.edu.mx" id="txtCorreo">
            </div>
            <div class="mb-3">
                <label class="form-label">Especialidad:</label>
                <select class="form-select" id="txtEspecialidad" required>
                    <option value="" disabled selected>Selecciona una especialidad</option>
                    <option value="matematicas">Matemáticas</option>
                    <option value="fisica">Física</option>
                    <option value="programacion">Programación</option>
                    <option value="quimica">Química</option>
                    <option value="ingles">Inglés</option>
                    <option value="electronica">Electrónica</option>
                </select>
            </div>
            <div class="mb-3">
                <label class="form-label">Contraseña:</label>
                <input type="password" class="form-control" placeholder="mínimo 8 caracteres" id="txtPassword">
            </div>
            <div class="extra-space" style="height: 30px;"></div>
            <div class="form-footer text-center">
                <button class="btn-primary-action" id="btnRegistrarse">REGISTRARSE</button>
                <p class="text-muted small mt-3 mb-0">¿Ya tienes cuenta? <a href="#" class="text-primary fw-bold toggle-form">Inicia sesión aquí</a></p>
            </div>
        </form>
    </div>
`,
    
    admin: `
        <div class="form-content">
            <h4 class="fw-bold">Registro de Administrador</h4>
            <p class="text-muted small mb-4">
                Completa tus datos para administrar el sistema.
            </p>
            <form>
                <div class="mb-3">
                    <label class="form-label">Nombre completo:</label>
                    <input type="text" class="form-control" placeholder="Ej: Admin Sistema" id="txtNombre">
                </div>
                <div class="mb-3">
                    <label class="form-label">Correo institucional:</label>
                    <input type="email" class="form-control" placeholder="admin@ite.edu.mx" id="txtCorreo">
                </div>
                <div class="mb-3">
                    <label class="form-label">Contraseña:</label>
                    <input type="password" class="form-control" placeholder="mínimo 12 caracteres" id="txtPassword">
                </div>
                <div class="extra-space" style="height: 60px;"></div>
                <div class="form-footer text-center">
                    <button class="btn-primary-action" id="btnRegistrarse">REGISTRARSE</button>
                    <p class="text-muted small mt-3">¿Ya tienes cuenta? <a href="#" class="text-primary fw-bold toggle-form">Inicia sesión aquí</a></p>
                </div>
            </form>
        </div>
    `,
    login_alumno: `
        <div class="form-content" >
            <h4 class="fw-bold">Inicio de sesión (Alumno)</h4>
            <p class="text-muted small mb-4">
                Ingresa tus credenciales para acceder al sistema.
            </p>
            <form>
                <div class="mb-3">
                    <label class="form-label">Correo institucional:</label>
                    <input type="email" class="form-control" placeholder="ejemplo@ite.edu.mx" id="txtCorreoLogin">
                </div>
                <div class="mb-3">
                    <label class="form-label">Contraseña:</label>
                    <input type="password" class="form-control" placeholder="Ingresa tu contraseña" id="txtContraLogin">
                </div>
                <div class="extra-space" style="height: 60px;"></div>
                <div class="form-footer">
                    <button class="btn-primary-action" id="btnIniciarSesion">INICIAR SESIÓN</button>
                    <p class="text-center mt-3 small">
                        ¿No tienes cuenta? <a href="#" class="text-primary fw-bold toggle-form">Regístrate aquí</a>
                    </p>
                </div>
            </form>
        </div>
    `,
    
    login_asesor: `
    <div class="form-content">
        <h4 class="fw-bold">Inicio de sesión (Asesor)</h4>
        <p class="text-muted small mb-4">
            Ingresa tus credenciales para acceder al sistema.
        </p>
        <form>
            <div class="mb-3">
                <label class="form-label">Correo institucional:</label>
                <input type="email" class="form-control" placeholder="asesor@ite.edu.mx" id="txtCorreoLogin">
            </div>
            <div class="mb-3">
                <label class="form-label">Contraseña:</label>
                <input type="password" class="form-control" placeholder="Ingresa tu contraseña" id="txtContraLogin">
            </div>
            <div class="extra-space" style="height: 60px;"></div>
            <div class="form-footer">
                <button class="btn-primary-action" id="btnIniciarSesion">INICIAR SESIÓN</button>
                <p class="text-center mt-3 small">
                    ¿No tienes cuenta? <a href="#" class="text-primary fw-bold toggle-form">Regístrate aquí</a>
                </p>
            </div>
        </form>
    </div>
`,
    
    login_admin: `
        <div class="form-content">
            <h4 class="fw-bold">Inicio de sesión (Admin)</h4>
            <p class="text-muted small mb-4">
                Ingresa tus credenciales para acceder al sistema.
            </p>
            <form>
                <div class="mb-3">
                    <label class="form-label">Correo institucional:</label>
                    <input type="email" class="form-control" placeholder="admin@ite.edu.mx" id="txtCorreoLogin">
                </div>
                <div class="mb-3">
                    <label class="form-label">Contraseña:</label>
                    <input type="password" class="form-control" placeholder="Ingresa tu contraseña" id="txtContraLogin">
                </div>
                <div class="extra-space" style="height: 60px;"></div>
                <div class="form-footer">
                    <button class="btn-primary-action" id="btnIniciarSesion">INICIAR SESIÓN</button>
                    <p class="text-center mt-3 small">
                        ¿No tienes cuenta? <a href="#" class="text-primary fw-bold toggle-form">Regístrate aquí</a>
                    </p>
                </div>
            </form>
        </div>
    `,
};

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
async function loginUser() {
    const email = document.getElementById('txtCorreoLogin')?.value;
    const password = document.getElementById('txtContraLogin')?.value;

    if (!email || !password) {
        alert('Por favor complete todos los campos');
        return;
    }

    try {
        let endpoint = '';
        switch(currentUserType) {
            case 'alumno':
                endpoint = 'http://localhost:1234/auth/alumno';
                break;
            case 'asesor':
                endpoint = 'http://localhost:1234/auth/asesor';
                break;
            case 'admin':
                endpoint = 'http://localhost:1234/auth/admin';
                break;
            default:
                throw new Error('Tipo de usuario no válido');
        }

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        

        if(response.status === 404) {
            throw new Error('No se encontro un usuario con estas credenciales');
        } else if (response.status === 400) {
            throw new Error('Error en la solicitud, por favor verifique los datos');
        } else if (!response.ok) {
            throw new Error(data.message || 'Error en la autenticación');
        }

        if (data.success) {
            // Store the token
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userType', currentUserType);

            // Redirection logic
            switch(currentUserType) {
                case 'alumno':
                    window.location.href = './html-alumno/home_alumno.html';
                    break;
                case 'asesor':
                    window.location.href = './html-asesor/home_asesor.html';
                    break;
                case 'admin':
                    window.location.href = 'home_admin.html';
                    break;
            }
        } else {
            alert(data.message || 'Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'Error al conectar con el servidor');
    }
}

async function registerUser() {
    let body = {};
    let endpoint = '';
    
    
    // Campos comunes a todos los usuarios
    const nombre = document.getElementById('txtNombre')?.value;
    const email = document.getElementById('txtCorreo')?.value || document.getElementById('txtCorreo')?.value;
    const password = document.getElementById('txtPassword')?.value;
    const especialidad = document.getElementById('txtEspecialidad')?.value;

    const errorMsg = validarCamposRegistro(currentUserType, { nombre, email, password, especialidad });
    if (errorMsg) {
        alert(errorMsg);
        return;
    }

    console.log('Tipo de usuario:', currentUserType);
    // Configurar según el tipo de usuario
    switch(currentUserType) {
        case 'alumno':
            endpoint = 'http://localhost:1234/alumno';
            body = { nombre, email, password };
            break;
        case 'asesor':
            
            if (!especialidad) {
                alert('Por favor seleccione una especialidad');
                return;
            }
            endpoint = 'http://localhost:1234/asesor';
            body = { nombre, email, password, especialidad };
            break;
        case 'admin':
            endpoint = 'http://localhost:1234/admin';
            body = { nombre, email, password };
            break;
        default:
            alert('Tipo de usuario no válido');
            return;
    }

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
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
        loginUser();
    }
    
    // Botón de registrarse
    if (e.target && e.target.id === 'btnRegistrarse') {
        e.preventDefault();
        registerUser();
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