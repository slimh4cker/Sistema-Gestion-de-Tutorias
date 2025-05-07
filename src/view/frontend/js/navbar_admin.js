// js/navbar_admin.js
document.addEventListener('DOMContentLoaded', function () {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');

    if (navbarPlaceholder) {
        fetch('components/navbar_admin.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar navbar_admin.html');
                }
                return response.text();
            })
            .then(data => {
                navbarPlaceholder.innerHTML = data;
                // Inicializar dropdowns y funcionalidades específicas de admin
                inicializarDropdownsAdmin();
                // Cargar notificaciones iniciales
                cargarNotificacionesAdmin();
            })
            .catch(error => {
                console.error('Error cargando el navbar de admin:', error);
                // Fallback en caso de error
                navbarPlaceholder.innerHTML = '<p class="text-danger">Error cargando la barra de navegación</p>';
            });
    }
});

function inicializarDropdownsAdmin() {
    // Configuración específica para dropdowns de admin
    const dropdownPerfil = document.getElementById('dropdownPerfilAdmin');
    if (dropdownPerfil) {
        dropdownPerfil.addEventListener('shown.bs.dropdown', function () {
            // Lógica adicional cuando se abre el dropdown de perfil
        });
    }
}

function cargarNotificacionesAdmin() {
    // Ejemplo: Cargar notificaciones desde API
    /*
    fetch('/api/admin/notificaciones')
        .then(response => response.json())
        .then(data => {
            actualizarContadorNotificaciones(data.total);
            actualizarListaNotificaciones(data.items);
        })
        .catch(error => {
            console.error('Error cargando notificaciones:', error);
        });
    */
    
    // Por defecto mostrar 0 notificaciones
    actualizarContadorNotificaciones(0);
}

function actualizarContadorNotificaciones(count) {
    const badge = document.querySelector('.navbar-actions .badge');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'block' : 'block';
        
        // Actualizar también el título del botón
        const botonNotificaciones = document.getElementById('dropdownNotificaciones');
        if (botonNotificaciones) {
            botonNotificaciones.title = count > 0 ? 
                `Tienes ${count} notificaciones` : 
                'No tienes notificaciones nuevas';
        }
    }
}

function actualizarListaNotificaciones(notificaciones) {
    const dropdownMenu = document.querySelector('.dropdown-menu[aria-labelledby="dropdownNotificaciones"]');
    if (dropdownMenu) {
        if (notificaciones.length === 0) {
            dropdownMenu.innerHTML = `
                <li><h6 class="dropdown-header">Notificaciones</h6></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">No tienes notificaciones nuevas</a></li>
            `;
        } else {
            let itemsHTML = `
                <li><h6 class="dropdown-header">Notificaciones (${notificaciones.length})</h6></li>
                <li><hr class="dropdown-divider"></li>
            `;
            
            notificaciones.forEach(notif => {
                itemsHTML += `
                <li>
                    <a class="dropdown-item" href="${notif.url || '#'}">
                        <i class="fas ${notif.icono || 'fa-bell'} me-2"></i>
                        ${notif.mensaje}
                        <small class="text-muted d-block">${notif.fecha}</small>
                    </a>
                </li>
                `;
            });
            
            itemsHTML += `
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-center small" href="notificaciones_admin.html">Ver todas</a></li>
            `;
            
            dropdownMenu.innerHTML = itemsHTML;
        }
    }
}

// Función para marcar notificaciones como leídas
function marcarNotificacionesLeidas() {
    // Lógica para marcar notificaciones como leídas
    /*
    fetch('/api/admin/notificaciones/marcar-leidas', { method: 'POST' })
        .then(response => {
            if (response.ok) {
                actualizarContadorNotificaciones(0);
            }
        });
    */
}

// Ejemplo: Actualizar notificaciones cada 60 segundos
// setInterval(cargarNotificacionesAdmin, 60000);