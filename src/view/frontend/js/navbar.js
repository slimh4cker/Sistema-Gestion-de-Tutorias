// js/navbar.js
document.addEventListener('DOMContentLoaded', function () {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');

    if (navbarPlaceholder) {
        fetch('../components/navbar.html')
            .then(response => response.text())
            .then(data => {
                navbarPlaceholder.innerHTML = data;
                // Inicializar notificaciones (con 0 notificaciones)
                inicializarNotificaciones();
                // Inicializar el evento de solicitud de asesoría
                inicializarSolicitarAsesoria();
            })
            .catch(error => console.error('Error cargando el navbar:', error));
    }
});

function inicializarNotificaciones() {
    const notificacionesBadge = document.querySelector('.notification-dropdown .badge');
    if (notificacionesBadge) {
        notificacionesBadge.textContent = '0';
        notificacionesBadge.style.display = 'inline-block'; // Asegura que sea visible
    }
}

function inicializarSolicitarAsesoria() {
    const btnSolicitar = document.getElementById('btn-solicitar-asesoria');
    const asesoriaContainer = document.getElementById('asesoria-container') || 
                            document.querySelector('.main-content-container');

    if (btnSolicitar && asesoriaContainer) {
        btnSolicitar.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Crear formulario de asesoría
            const formHTML = `
            <div class="white-card rounded-4 shadow-sm p-4">
                <div class="form-asesoria">
                    <h4 class="fw-bold mb-3">Solicitar asesoría</h4>
                    <p class="text-muted mb-4">
                        Por favor, completa el siguiente formulario para solicitar una asesoría.
                    </p>
                    <form id="form-solicitud-asesoria">
                        <div class="mb-3">
                            <label for="curso" class="form-label fw-semibold">Curso:</label>
                            <select id="curso" class="form-select" required>
                                <option value="" selected disabled>Selecciona un curso</option>
                                <option value="Matemáticas Avanzadas">Matemáticas Avanzadas</option>
                                <option value="Física Cuántica">Física Cuántica</option>
                                <option value="Programación Web">Programación Web</option>
                            </select>
                        </div>
                        
                        <div class="mb-3">
                            <label for="requisitos" class="form-label fw-semibold">Requisitos particulares:</label>
                            <textarea id="requisitos" class="form-control" rows="3" required></textarea>
                        </div>
                        
                        <div class="mb-3">
                            <label for="fecha" class="form-label fw-semibold">Fecha límite:</label>
                            <input type="date" id="fecha" class="form-control" required>
                        </div>
                        
                        <div class="mb-3">
                            <label for="modalidad" class="form-label fw-semibold">Modalidad:</label>
                            <select id="modalidad" class="form-select" required>
                                <option value="Presencial" selected>Presencial</option>
                                <option value="Virtual">Virtual</option>
                            </select>
                        </div>
                        
                        <div class="mb-4">
                            <label for="urgencia" class="form-label fw-semibold">Nivel de urgencia:</label>
                            <select id="urgencia" class="form-select" required>
                                <option value="Urgente" selected>Urgente</option>
                                <option value="Normal">Normal</option>
                            </select>
                        </div>
                        
                        <div class="d-flex justify-content-end gap-3">
                            <button type="button" class="btn btn-outline-secondary btn-cancelar">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Enviar solicitud</button>
                        </div>
                    </form>
                </div>
            </div>
            `;

            // Insertar el formulario
            asesoriaContainer.innerHTML = formHTML;  //ESTA LINEA LE DA VIDA AL FORMULARIO, ES DECIR LO MANDA A LLAMAR PARA QUE SE MUESTRE
            

            // Agregar evento para el botón cancelar; //ME QUEDA DUDA AQUI PORQUE NO ENCONTRE BOTON DE CANCELAR
            const btnCancelar = document.querySelector('.btn-cancelar');
            if (btnCancelar) {
                btnCancelar.addEventListener('click', function() {
                    asesoriaContainer.innerHTML = `
                    <div class="white-card rounded-4 shadow-sm">
                        <div class="empty-state-content">
                            <p class="empty-state-text fw-bold text-secondary">
                                No tienes ninguna asesoría por el momento
                            </p>
                            <i class="fas fa-calendar-times empty-state-icon text-secondary"></i>
                        </div>
                    </div>
                    `;
                });
            }
            
            // Manejar el envío del formulario
            const form = document.getElementById('form-solicitud-asesoria');
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('Solicitud enviada correctamente');
                    // Aquí puedes agregar lógica para enviar los datos al servidor
                });
            }
        });
    }
}

async function solicitarAsesoria() {
    // Obtener los valores del formulario
    const curso = document.getElementById('curso').value;
    const requisitos = document.getElementById('requisitos').value;
    const fecha = document.getElementById('fecha').value;
    const modalidad = document.getElementById('modalidad').value.toLowerCase();
    const urgencia = document.getElementById('urgencia').value.toLowerCase();

    // Construir el objeto de solicitud (solo datos que ingresa el usuario)
    const solicitudData = {
        tema: curso,
        observaciones: requisitos,
        fecha_limite: fecha,
        modalidad: modalidad,
        nivel_urgencia: urgencia
    };

    try {
        const response = await fetch('http://localhost:1234/alumno/solicitud', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') // JWT almacenado
            },
            body: JSON.stringify(solicitudData)
        });

        if (response.ok) {
            alert('Solicitud enviada correctamente');
            // Opcional: resetear el formulario o actualizar la interfaz
            document.getElementById('form-solicitud-asesoria').reset();
            const asesoriaContainer = document.getElementById('asesoria-container') ||
                                      document.querySelector('.main-content-container');
            asesoriaContainer.innerHTML = `
                <div class="white-card rounded-4 shadow-sm">
                    <div class="empty-state-content">
                        <p class="empty-state-text fw-bold text-secondary">
                            No tienes ninguna asesoría por el momento
                        </p>
                        <i class="fas fa-calendar-times empty-state-icon text-secondary"></i>
                    </div>
                </div>
            `;
        } else {
            const errorData = await response.json();
            console.error('Error al enviar solicitud:', errorData);
            alert('Error al enviar solicitud. Revisa la consola para más detalles.');
        }
    } catch (error) {
        console.error('Error de red o del servidor:', error);
        alert('Error de red o del servidor.');
    }
}

// Vincular la función al envío del formulario
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-solicitud-asesoria');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            await solicitarAsesoria();
        });
    }
});


// Función para actualizar el contador de notificaciones
function actualizarContadorNotificaciones(count) {
    const badge = document.querySelector('.navbar-actions .badge');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'block' : 'none';
    }
}

// Ejemplo de cómo cargar notificaciones reales
/*
function cargarNotificacionesReales() {
    return fetch('/api/notificaciones')
        .then(response => response.json())
        .then(data => {
            return data.count;
        });
}
*/