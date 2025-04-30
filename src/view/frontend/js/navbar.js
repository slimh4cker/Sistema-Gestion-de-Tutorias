// js/navbar.js
document.addEventListener('DOMContentLoaded', function () {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');

    if (navbarPlaceholder) {
        fetch('components/navbar.html')
            .then(response => response.text())
            .then(data => {
                navbarPlaceholder.innerHTML = data;
                // Inicializar el evento después de cargar el navbar
                inicializarSolicitarAsesoria();
            })
            .catch(error => console.error('Error cargando el navbar:', error));
    }
});

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
            asesoriaContainer.innerHTML = formHTML;
            
            // Agregar evento para el botón cancelar
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