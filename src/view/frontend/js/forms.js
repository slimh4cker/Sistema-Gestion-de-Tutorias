import  {validarCamposRegistro}  from '../../utils/validaciones/usuario.js';

const formTemplates = {
    alumno: `
            <div class="alumno"> 

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

        </div>
    `, 
    
    asesor: `
        <div class="asesor"> 

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
                        <option value="" disabled selected>Selecciona una materia</option>
                        <option value="Administración de Bases de Datos">Administración de Bases de Datos</option>
                        <option value="Álgebra">Álgebra</option>
                        <option value="Álgebra lineal">Álgebra lineal</option>
                        <option value="Álgebra/Precálculo">Álgebra/Precálculo</option>
                        <option value="Cálculo Diferencial">Cálculo Diferencial</option>
                        <option value="Cálculo Integral">Cálculo Integral</option>
                        <option value="Cálculo Vectorial">Cálculo Vectorial</option>
                        <option value="Contabilidad">Contabilidad</option>
                        <option value="Dibujo Asistido">Dibujo Asistido</option>
                        <option value="Dibujo en SolidWorks">Dibujo en SolidWorks</option>
                        <option value="Dinámica">Dinámica</option>
                        <option value="Electromagnetismo">Electromagnetismo</option>
                        <option value="Electrónica Básica">Electrónica Básica</option>
                        <option value="Estadística">Estadística</option>
                        <option value="Estática">Estática</option>
                        <option value="Física">Física</option>
                        <option value="Fundamentos de Bases de Datos">Fundamentos de Bases de Datos</option>
                        <option value="Fundamentos de Investigación">Fundamentos de Investigación</option>
                        <option value="Programación Básica">Programación Básica</option>
                        <option value="Química">Química</option>
                        <option value="Taller de Bases de Datos">Taller de Bases de Datos</option>
                        <option value="Taller de Investigación 1">Taller de Investigación 1</option>
                        <option value="Taller de Investigación 2">Taller de Investigación 2</option>
                        <option value="Vibraciones mecánicas">Vibraciones mecánicas</option>
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
    </div>
`,
    

    /*
    admin: `
            <div class="administrador"> 

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
        </div>*/

    admin: `
        <div class="form-content" >
            <h4 class="fw-bold">Ups...</h4> 
            <br>
            <h5> Solo un administrador puede agregar a otro administrador</h5>
        </div>    


    `,
    
    login_alumno: `
        <div class="alumno"> 
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
        </div>
    `,
    
    login_asesor: `
    <div class="asesor"> 

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
        </div>
`,
    
    login_admin: `
        <div class="administrador"> 

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
                    <!--<p class="text-center mt-3 small">
                        ¿No tienes cuenta? <a href="#" class="text-primary fw-bold toggle-form">Regístrate aquí</a>
                    </p> -->
                </div>
            </form>
        </div>
        </div>
    `,
};

let currentUserType = 'alumno';
let isLoginForm = false;



function switchForm(userType, login = false) {
    // Scroll suave al formulario en móviles
    if (window.innerWidth < 768) {
        const formWrapper = document.getElementById('form-wrapper');
        formWrapper.scrollIntoView({ behavior: 'smooth' });
    }

    const formContainer = document.getElementById('form-container');
    currentUserType = userType;
    isLoginForm = login;
    
    formContainer.style.opacity = '0';
    
    setTimeout(() => {
        const formKey = login ? `login_${userType}` : userType;
        formContainer.innerHTML = formTemplates[formKey];

        formContainer.style.opacity = '1';

        /*LO COMENTE SOLO PORQUE  VOY A DARLE COLORES ESTATICOS A LOS BOTONES
        NO LO BORRE PORQUE ES POSIBLE QUE SE PUEDA RESUSAR*/
      /*   // Actualizar estado de botones 
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
        } */
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
        showAlertModal(error.message || 'Error al conectar con el servidor');
    }
}

function showAlertModal(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert-message';
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
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
            body = { nombre, email, password, area_especializacion: especialidad };
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
            throw new Error(`${data.message}, ${data.error}` || 'Error en el registro');
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