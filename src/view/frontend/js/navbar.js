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
    const asesoriaContainer = document.querySelector('.main-content-container');


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
                            <label for="requisitos" class="form-label fw-semibold">Requisitos particulares:</label>
                            <textarea id="requisitos" class="form-control" rows="3" style="resize: none; height: 120px; width: 100%;"  required></textarea>
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
                            No ninguna asesoría por el momento
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
            //alert('Solicitud enviada correctamente');
            Swal.fire({
        icon: 'success',
        title: '¡Solicitud enviada!',
        text: 'Se le asignara un asesor a la brevedad',
        confirmButtonColor: '#3085d6'
        });
            document.getElementById('form-solicitud-asesoria').reset();
        } else {
            //alert('Error al enviar solicitud. Verifica los datos.');
            Swal.fire({
        icon: 'error',
        title: 'Error al enviar la solicitud !',
        text: 'Verifique los datos',
        confirmButtonColor: '#3085d6'
        });
        }
    } catch (error) {
        console.error('Error de red o del servidor:', error);
        //alert('Error de red o del servidor.');
           Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Verifique el servidor o la red',
        confirmButtonColor: '#3085d6'
        });
    }
}
