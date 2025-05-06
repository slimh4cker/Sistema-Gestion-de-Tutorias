// js/navbar_asesor.js
document.addEventListener('DOMContentLoaded', function () {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');

    if (navbarPlaceholder) {
        fetch('../components/navbar_asesor.html')
            .then(response => response.text())
            .then(data => {
                navbarPlaceholder.innerHTML = data;
                // Inicializar cualquier funcionalidad específica del navbar de asesor
                inicializarDropdowns();
            })
            .catch(error => console.error('Error cargando el navbar:', error));
    }
});

function inicializarDropdowns() {
    // Puedes agregar aquí cualquier lógica específica para los dropdowns del asesor
    // Por ejemplo, cargar notificaciones reales si es necesario
    
    // Ejemplo de cómo podrías cargar notificaciones dinámicamente:
    /*
    const notificacionesDropdown = document.getElementById('dropdownNotificaciones');
    if (notificacionesDropdown) {
        // Lógica para cargar/actualizar notificaciones
    }
    */
}

// Función para actualizar el contador de notificaciones (opcional)
function actualizarContadorNotificaciones(count) {
    const badge = document.querySelector('.navbar-actions .badge');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'block' : 'none';
    }
}