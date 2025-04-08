// solicitud.js
document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const btnSolicitar = document.getElementById('btn-solicitar-asesoria');
    const asesoriaContainer = document.getElementById('asesoria-container');

    // Template del formulario 
    const formularioAsesoria = `
    <div class="white-card">
        <div class="form-asesoria">
            <h4 class="fw-bold">Solicitar asesoría</h4>
            <p class="form-description mb-4">
                Por favor, completa el siguiente formulario para solicitar una asesoría. 
                Asegúrate de proporcionar toda la información necesaria para que podamos 
                asignarte al mejor asesor.
            </p>
            <form>
                <!-- Campo de Curso (ahora como select) -->
                <div class="form-group">
                    <label class="form-label">Curso:</label>
                    <select class="form-select mb-3">
                        <option selected disabled>Selecciona un curso</option>
                        <option>Matemáticas Avanzadas</option>
                        <option>Física Cuántica</option>
                        <option>Programación Web</option>
                        <option>Literatura Contemporánea</option>
                        <option>Historia del Arte</option>
                        <option>Biología Molecular</option>
                    </select>
                </div>
                
                <!-- Nuevo campo de Requisitos particulares -->
                <div class="form-group">
                    <label class="form-label">Requisitos particulares:</label>
                    <textarea class="form-control" rows="3" placeholder="Escribe aquí cualquier requisito especial o detalle adicional que debamos conocer"></textarea>
                </div>
                
                <!-- Campo de Fecha límite -->
                <div class="form-group">
                    <label class="form-label">Fecha límite:</label>
                    <input type="date" class="form-control" value="2025-09-03">
                </div>
                
                <!-- Campo de Modalidad -->
                <div class="form-group">
                    <label class="form-label">Modalidad:</label>
                    <select class="form-select">
                        <option selected>Presencial</option>
                        <option>Virtual</option>
                    </select>
                </div>
                
                <!-- Campo de Nivel de urgencia -->
                <div class="form-group">
                    <label class="form-label">Nivel de urgencia:</label>
                    <select class="form-select">
                        <option selected>Urgente</option>
                        <option>Normal</option>
                    </select>
                </div>
                
                <!-- Botón de enviar -->
                <div class="d-flex justify-content-end mt-4">
                    <button type="submit" class="btn btn-primary btn-submit">Enviar solicitud</button>
                </div>
            </form>
        </div>
    </div>
    `;

    // Manejador del evento click
    if (btnSolicitar && asesoriaContainer) {
        btnSolicitar.addEventListener('click', function(e) {
            e.preventDefault();
            asesoriaContainer.innerHTML = formularioAsesoria;
        });
    } else {
        console.error("¡Elementos del DOM no encontrados!");
    }
});
