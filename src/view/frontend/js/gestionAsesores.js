document.addEventListener('DOMContentLoaded', () => {
    const asesoresContainer = document.querySelector('.asesores-container');
    const searchInput = document.querySelector('.search-input');
    const authToken = localStorage.getItem('authToken');
    let asesoresData = [];

    if (!authToken) {
        window.location.href = '/login.html';
        return;
    }

    const cargarAsesores = async () => {
        try {
           const response = await fetch('http://localhost:1234/admin/asesores', {   
                method: 'GET',
                headers: { 'Authorization': `Bearer ${authToken}` }
            });

            if (response.status === 401) {
                alert('Sesión expirada');
                window.location.reload();
                return;
            }

            if (!response.ok) throw new Error('Error en la respuesta');
            
            asesoresData = await response.json();
            renderizarAsesores(asesoresData);
            agregarFiltroBusqueda();

        } catch (error) {
            asesoresContainer.innerHTML = `
                <div class="alert alert-danger">
                    ${error.message === 'Failed to fetch' 
                        ? 'Error de conexión' 
                        : error.message}
                </div>`;
        }
    };

    // Función única para renderizar
    const renderizarAsesores = (asesores) => {
        asesoresContainer.querySelectorAll('.asesor-card').forEach(card => card.remove());
        
        asesores.forEach((asesor, index) => {
            const cardHTML = `
                <div class="asesor-card" data-index="${index}">
                    <div class="asesor-header">
                        <h3 class="asesor-title">${asesor.nombre}</h3>
                    </div>
                    <div class="card-content">
                        <div class="temas-section">
                            <h5>Temas que domina:</h5>
                            <div class="temas-container">
                                ${asesor.temas.map(tema => `
                                    <span class="tema-badge">${tema}</span>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="acciones-container">
                            <button class="btn-accion btn-eliminar">
                                <i class="fas fa-trash"></i> Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            `;
            asesoresContainer.insertAdjacentHTML('beforeend', cardHTML);
        });
    };

    const agregarFiltroBusqueda = () => {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            document.querySelectorAll('.asesor-card').forEach(card => {
                const nombre = card.querySelector('.asesor-title').textContent.toLowerCase();
                card.style.display = nombre.includes(searchTerm) ? 'block' : 'none';
            });
        });
    };

    const eliminarAsesor = async (email) => {
        try {
            const response = await fetch(`/admin/asesores/${email}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            return response.ok;
        } catch (error) {
            return false;
        }
    };

    asesoresContainer.addEventListener('click', async (e) => {
        if (e.target.closest('.btn-eliminar')) {
            const card = e.target.closest('.asesor-card');
            const index = card.dataset.index;
            const email = asesoresData[index].email;
            
            if (confirm('¿Eliminar este asesor?')) {
                const eliminado = await eliminarAsesor(email);
                if (eliminado) {
                    card.remove();
                    asesoresData.splice(index, 1);
                }
            }
        }
    });

    cargarAsesores();
});