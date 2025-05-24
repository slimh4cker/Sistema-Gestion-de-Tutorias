document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Realizar petición a la API para obtener cursos activos
        const response = await fetch('http://localhost:1234/alumno/solicitud?estado=activo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            }
        });

        const gridContainer = document.querySelector('#cursos-grid-container');
        gridContainer.innerHTML = ''; // Limpiar contenido inicial

        if (!response.ok) {
            if (response.status === 401) {
                window.location.href = '/login.html';
                return;
            } else if (response.status === 404) {
                gridContainer.innerHTML = `
                    <div class="alert alert-info">
                        No tienes cursos asignados actualmente.
                    </div>
                `;
                return;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const cursos = await response.json();
        console.log(cursos);

        cursos.forEach(curso => {
            const cursoCard = document.createElement('div');
            cursoCard.className = 'curso-card';
            cursoCard.onclick = () => window.location.href = `curso-detalle.html?curso=${curso.id}`;

            cursoCard.innerHTML = `
            <div col-12 col-md-6 col-lg-4 mb-4>
                <div class="curso-card-content">
                    <div class="curso-header">
                        <h3 class="curso-title">${curso.tema}</h3>
                        <span class="badge ${curso.modalidad === 'presencial' ? 'bg-primary' : 'bg-success'} curso-badge">
                            ${curso.modalidad.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <p class="profesor-info">
                        <i class="fas fa-chalkboard-teacher me-2"></i>${curso.asesor.nombre}
                    </p>
                    <div class="sesion-info">
                        <p class="sesion-label">Próxima sesión</p>
                        <p class="sesion-date">${formatearFecha(curso.fecha_limite)}</p>
                    </div>
                </div>
            </div>
            `;

            gridContainer.appendChild(cursoCard);
        });

    } catch (error) {
        console.error('Error al cargar cursos:', error);
        const gridContainer = document.querySelector('#cursos-grid-container');
        gridContainer.innerHTML = `
            <div class="alert alert-danger">
                Error al cargar los cursos: ${error.message}
            </div>
        `;
    }
});

// Función para formatear fecha al estilo dd/mm/yyyy hh:mm
function formatearFecha(fechaISO) {
    const opciones = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    return new Date(fechaISO).toLocaleString('es-MX', opciones);
}
