document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Verificar que el contenedor existe
    const adminContainer = document.querySelector('.admin-container');
    if (!adminContainer) {
        console.error('Error: No se encontró .admin-container');
        return;
    }

    // 2. Cargar el sidebar
    fetch('sidebar_admin.html')
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar sidebar_admin.html');
            return response.text();
        })
        .then(data => {
            // 3. Insertar el sidebar
            adminContainer.insertAdjacentHTML('afterbegin', data);
            
            // 4. Configurar elementos del DOM
            const sidebar = document.querySelector('.sidebar');
            const sidebarToggle = document.querySelector('.sidebar-toggle-mobile');
            const overlay = document.querySelector('.sidebar-overlay');

            if (!sidebar) {
                console.error('Error: No se encontró .sidebar');
                return;
            }

            // Función para alternar el sidebar
            const toggleSidebar = () => {
                sidebar.classList.toggle('active');
                if (overlay) overlay.classList.toggle('active');
                if (sidebarToggle) sidebarToggle.classList.toggle('active');
            };

            // Evento para el botón de hamburguesa
            if (sidebarToggle) {
                sidebarToggle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    toggleSidebar();
                });
            }

            // Cerrar al hacer clic en el overlay
            if (overlay) {
                overlay.addEventListener('click', toggleSidebar);
            }

            // Resto del código...
        })
        .catch(error => {
            console.error('Error loading sidebar:', error);
        });
});