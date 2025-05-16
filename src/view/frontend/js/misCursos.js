// En misCursos.js
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:1234/alumno/cursos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            }
        });
        console.log(response.status)
        const gridContainer = document.querySelector('.cursos-grid-container');
        gridContainer.innerHTML = ''; // Limpiar contenido estático

        if (!response.ok) {
            if (response.status === 401) {
                window.location.href = '/login.html';
                return;
            }
            else if(response.status === 404){
                gridContainer.innerHTML = `
                <div class="alert alert-info">
                    No tienes cursos asignados actualmente
                </div>
            `;
            return;

            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const cursos = await response.json();
        
        
        cursos.forEach(curso => {
            const cursoCard = document.createElement('div');
            cursoCard.className = 'curso-card';
            cursoCard.onclick = () => window.location.href = `curso-detalle.html?curso=${curso.id}`;
            
            cursoCard.innerHTML = `
                <div class="curso-card-content">
                    <div class="curso-header">
                        <h3 class="curso-title">${curso.tema}</h3>
                        <span class="badge ${curso.tipo === 'T' ? 'bg-primary' : 'bg-success'} curso-badge">${curso.tipo}</span>
                    </div>
                    <p class="profesor-info">
                        <i class="fas fa-chalkboard-teacher me-2"></i>${curso.profesor}
                    </p>
                    <div class="sesion-info">
                        <p class="sesion-label">Próxima sesión</p>
                        <p class="sesion-date">${formatearFecha(curso.fecha_limite)}</p>
                    </div>
                </div>
            `;
            
            gridContainer.appendChild(cursoCard);
        });

    } catch (error) {
        console.error('Error al cargar cursos:', error);
        const gridContainer = document.querySelector('.cursos-grid-container');
        gridContainer.innerHTML = `
            <div class="alert alert-danger">
                Error al cargar los cursos: ${error.message}
            </div>
        `;
    }
});

// Función para formatear la fecha
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