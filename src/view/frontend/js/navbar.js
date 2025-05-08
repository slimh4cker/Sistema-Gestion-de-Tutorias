document.addEventListener('DOMContentLoaded', function () {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');

    if (navbarPlaceholder) {
        fetch('../components/navbar.html')
            .then(response => response.text())
            .then(data => {
                navbarPlaceholder.innerHTML = data;
                inicializarNotificaciones();
                inicializarSolicitarAsesoria();
            })
            .catch(error => console.error('Error cargando el navbar:', error));
    }
});

function inicializarNotificaciones() {
    const notificacionesBadge = document.querySelector('.notification-dropdown .badge');
    if (notificacionesBadge) {
        notificacionesBadge.textContent = '0';
        notificacionesBadge.style.display = 'inline-block';
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
                                <option value="presencial">Presencial</option>
                                <option value="en_linea">Virtual</option>
                            </select>
                        </div>
                        <div class="mb-4">
                            <label for="urgencia" class="form-label fw-semibold">Nivel de urgencia:</label>
                            <select id="urgencia" class="form-select" required>
                                <option value="baja">Baja</option>
                                <option value="media">Media</option>
                                <option value="alta">Alta</option>
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
            asesoriaContainer.innerHTML = formHTML;

            // Enlazar evento de cancelar
            document.querySelector('.btn-cancelar').addEventListener('click', function() {
                asesoriaContainer.innerHTML = `
                <div class="white-card rounded-4 shadow-sm">
                    <div class="empty-state-content">
                        <p class="empty-state-text fw-bold text-secondary">
                            No tienes ninguna asesoría por el momento
                        </p>
                        <i class="fas fa-calendar-times empty-state-icon text-secondary"></i>
                    </div>
                </div>`;
            });

            // Enlazar evento de envío del formulario
            document.getElementById('form-solicitud-asesoria').addEventListener('submit', async function(e) {
                e.preventDefault();
                await solicitarAsesoria();
            });
        });
    }
}

async function solicitarAsesoria() {
    const curso = document.getElementById('curso').value;
    const requisitos = document.getElementById('requisitos').value;
    const fecha = document.getElementById('fecha').value;
    const modalidad = document.getElementById('modalidad').value.toLowerCase();
    const urgencia = document.getElementById('urgencia').value.toLowerCase();

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
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
            body: JSON.stringify(solicitudData)
        });

        if (response.ok) {
            alert('Solicitud enviada correctamente');
            document.getElementById('form-solicitud-asesoria').reset();
        } else {
            alert('Error al enviar solicitud. Verifica los datos.');
        }
    } catch (error) {
        console.error('Error de red o del servidor:', error);
        alert('Error de red o del servidor.');
    }
}
