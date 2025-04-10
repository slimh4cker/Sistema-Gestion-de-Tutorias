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
                    <input type="text" class="form-control" placeholder="Ej: Juan Pérez López" id = "txtNombre">
                </div>
                <div class="mb-3">
                    <label class="form-label">Correo institucional:</label>
                    <input type="email" class="form-control" placeholder="ejemplo@ite.edu.mx" id= "txtCorreo">
                </div>
                <div class="mb-3">
                    <label class="form-label">Contraseña:</label>
                    <input type="password" class="form-control" placeholder="mínimo 12 caracteres" id = "txtPassword">
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
                <input type="text" class="form-control" placeholder="Ej: María García López">
            </div>
            <div class="mb-3">
                <label class="form-label">Correo institucional:</label>
                <input type="email" class="form-control" placeholder="asesor@ite.edu.mx">
            </div>
            <div class="mb-3">
                <label class="form-label">Especialidad:</label>
                <select class="form-select" required>
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
                <input type="password" class="form-control" placeholder="mínimo 8 caracteres">
            </div>
            <div class="extra-space" style="height: 30px;"></div>
            <div class="form-footer text-center">
                <button class="btn-primary-action">REGISTRARSE</button>
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
                    <input type="text" class="form-control" placeholder="Ej: Admin Sistema">
                </div>
                <div class="mb-3">
                    <label class="form-label">Correo institucional:</label>
                    <input type="email" class="form-control" placeholder="admin@ite.edu.mx">
                </div>
                <div class="mb-3">
                    <label class="form-label">Contraseña:</label>
                    <input type="password" class="form-control" placeholder="mínimo 12 caracteres">
                </div>
                <div class="extra-space" style="height: 60px;"></div>
                <div class="form-footer text-center">
                    <button class="btn-primary-action">REGISTRARSE</button>
                    <p class="text-muted small mt-3">¿Ya tienes cuenta? <a href="#" class="text-primary fw-bold toggle-form">Inicia sesión aquí</a></p>
                </div>
                </div>
            </form>
        </div>
    `,
    login_alumno: `
        <div class="form-content">
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
                    <input type="password" class="form-control" placeholder="Ingresa tu contraseña" id = "txtContraLogin">
                </div>
                <div class="extra-space" style="height: 60px;"></div>
                <div class="form-footer">
                    <button class="btn-primary-action"  id ="btnIniciarSesion">INICIAR SESIÓN</button>
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
                <input type="email" class="form-control" placeholder="asesor@ite.edu.mx">
            </div>
            <div class="mb-3">
                <label class="form-label">Contraseña:</label>
                <input type="password" class="form-control" placeholder="Ingresa tu contraseña">
            </div>
            <!-- Añade el mismo espacio extra -->
            <div class="extra-space" style="height: 60px;"></div>
            <div class="form-footer">
                <button class="btn-primary-action">INICIAR SESIÓN</button>
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
                    <input type="email" class="form-control" placeholder="admin@ite.edu.mx">
                </div>
                <div class="mb-3">
                    <label class="form-label">Contraseña:</label>
                    <input type="password" class="form-control" placeholder="Ingresa tu contraseña">
                </div>
                <div class="extra-space" style="height: 60px;"></div>
                <div class="form-footer">
                    <button class="btn-primary-action">INICIAR SESIÓN</button>
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

function switchForm(userType, login = true) {
    const formContainer = document.getElementById('form-container');
    currentUserType = userType;
    isLoginForm = login;
    
    formContainer.style.opacity = '0';
    
    setTimeout(() => {
        const formKey = login ? `login_${userType}` : userType;
        formContainer.innerHTML = formTemplates[formKey];


        const formWrapper = document.querySelector('.custom-form-position');
        if (formWrapper) {
            formWrapper.dataset.form = userType;
            formWrapper.dataset.login = login; // Añade este atributo
        }
        
        const loginCard = document.querySelector('.login-card');
        loginCard.style.minHeight = '580px';
        
        formContainer.style.opacity = '1';
        
        // Actualizar estado de botones 
        document.querySelectorAll('.btn-role').forEach(btn => {
            btn.classList.remove('active');
            btn.style.backgroundColor = 'white';
            btn.style.color = '#1120ca';
        });
        
        const activeBtn = document.getElementById(`btn-${userType}`);
        activeBtn.classList.add('active');
        activeBtn.style.backgroundColor = '#1120ca';
        activeBtn.style.color = 'white';

        document.querySelectorAll('.toggle-form').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                switchForm(currentUserType, !isLoginForm);
            });
        });
    }, 10);
}

// Configurar eventos de los botones
['alumno', 'asesor', 'admin'].forEach(type => {
    document.getElementById(`btn-${type}`).addEventListener('click', (e) => {
        e.preventDefault();
        switchForm(type, isLoginForm); // Mantiene el estado actual (login/registro)
    });
});

// Inicializar con formulario de alumno
switchForm('alumno');

/* //FUNCION QUE CAPTURA LO QUE INGRESO EL USUARIO ALUMNO 
function loginAlumno() {
    // Captura los valores de los campos de correo y contraseña
    const email = document.getElementById('txtCorreoLogin').value;
    const password = document.getElementById('txtContraLogin').value;

    // Llama a la función para iniciar sesión
    iniciarSesionAlumno(email, password);
}


//FUNCION PARA ENVIAR USUARIO Y CONTRASENIA DE LOGIN_ALUMNO
function iniciarSesionAlumno(email, password) {
    // Aquí puedes usar fetch para enviar las credenciales al servidor
    console.log("Email:", email);
    console.log("Password:", password);

    fetch('http://localhost:1234/auth/alumno', {
        method: 'POST', // Cambié a POST, ya que generalmente para enviar datos de inicio de sesión se usa este método
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).then(res => res.json())
      .then(data => {
          console.log("Respuesta de la API:", data);
          // Aquí puedes manejar la respuesta, como redirigir al usuario o mostrar un mensaje de error
      })
      .catch(err => console.error("Error al iniciar sesión:", err));
} */

      // FUNCION UNIFICADA PARA CAPTURAR LOS DATOS DE LOGIN Y ENVIARLOS AL SERVIDOR
function loginAlumno() {
    // Captura los valores de los campos de correo y contraseña
    const email = document.getElementById('txtCorreoLogin').value;
    const password = document.getElementById('txtContraLogin').value;

    // Envia los datos al servidor
    console.log("Email:", email);
    console.log("Password:", password);

    fetch('http://localhost:1234/auth/alumno', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).then(res => res.json())
      .then(data => {
          console.log("Respuesta de la API:", data);
          // Aquí puedes manejar la respuesta, como redirigir al usuario o mostrar un mensaje de error
      })
      .catch(err => console.error("Error al iniciar sesión:", err));
}

//FUNCION DEL BOTON DE INICIAR SESION//
// Configura el botón de inicio de sesión para el alumno
document.getElementById('btnIniciarSesion').addEventListener('click', (e) => {
    e.preventDefault();
    loginAlumno(); // Llama la función de login
});


//*****FUNCION PARA REGISTRAR ALUMNO*****//

     // FUNCION UNIFICADA PARA CAPTURAR LOS DATOS DE LOGIN Y ENVIARLOS AL SERVIDOR
     function registrarAlumno() {
        // Captura los valores de los campos de correo y contraseña
        const nombre = document.getElementById('txtNombre').value
        const email = document.getElementById('txtCorreo').value;
        const password = document.getElementById('txtContra').value;
    
        // Envia los datos al servidor
        console.log("Nombre:", nombre);
        console.log("Email:", email);
        console.log("Password:", password);
    
        fetch('http://localhost:1234/alumno ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                email: email,
                password: password
            })
        }).then(res => res.json())
          .then(data => {
              console.log("Respuesta de la API:", data);
              // Aquí puedes manejar la respuesta, como redirigir al usuario o mostrar un mensaje de error
          })
          .catch(err => console.error("Error al registrar usuario:", err));
    }



