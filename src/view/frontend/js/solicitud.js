// solicitud.js
document.addEventListener('DOMContentLoaded', function() {
    // 1. Obtener elementos del DOM
    const btnSolicitar = document.getElementById('btn-solicitar-asesoria');
    const asesoriaContainer = document.getElementById('asesoria-container');

    // 2. Template del formulario 
    const formularioAsesoria = `
    <div class="white-card rounded-4 shadow-sm p-4 h-100 w-100">
        <h4 class="fw-bold mb-4 text-start">Solicitar asesoría</h4>
        <form class="d-flex flex-column h-100">
            <!-- Campos alineados a la izquierda -->
            <div class="mb-3 text-start"> <!-- text-start fuerza alineación izquierda -->
                <label class="form-label fw-bold">Curso:</label>
                <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" id="materia-tema">
                    <label class="form-check-label" for="materia-tema">Materia y/o tema</label>
                </div>
                <input type="text" class="form-control mb-3" placeholder="Escribe aquí">
            </div>
            
            <div class="mb-3 text-start">
                <label class="form-label fw-bold text-start">Fecha límite:</label>
                <input type="date" class="form-control" value="2025-09-03">
            </div>
            
            <div class="mb-3 text-start">
                <label class="form-label fw-bold">Modalidad:</label>
                <select class="form-select">
                    <option selected>Presencial</option>
                    <option>Virtual</option>
                </select>
            </div>
            
            <div class="mb-4 text-start">
                <label class="form-label fw-bold">Nivel de urgencia:</label>
                <select class="form-select">
                    <option selected>Urgente</option>
                    <option>Normal</option>
                </select>
            </div>
            
            <!-- Botón abajo a la derecha -->
            <div class="mt-auto text-end"> <!-- text-end alinea el botón a la derecha -->
                <button type="submit" class="btn btn-primary py-2 px-4">Enviar solicitud</button>
            </div>
        </form>
    </div>
`;

    // 3. Manejador del evento click
    if (btnSolicitar && asesoriaContainer) {
        btnSolicitar.addEventListener('click', function(e) {
            e.preventDefault();
            asesoriaContainer.innerHTML = formularioAsesoria;
        });
    } else {
        console.error("¡Elementos del DOM no encontrados!");
    }
});