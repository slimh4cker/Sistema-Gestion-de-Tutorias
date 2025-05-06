document.addEventListener('DOMContentLoaded', function() {
    // Cargar la barra lateral del asesor
    fetch('side_bar_asesor.html')
        .then(response => response.text())
        .then(data => {
            // Insertar sidebar al inicio del contenedor
            document.querySelector('.alumno-container').insertAdjacentHTML('afterbegin', data);
            
            // Elementos del DOM
            const sidebar = document.querySelector('.sidebar');
            const sidebarToggle = document.querySelector('.sidebar-toggle-mobile');
            const overlay = document.querySelector('.sidebar-overlay');
            
            // Función para alternar el sidebar
            const toggleSidebar = () => {
                sidebar.classList.toggle('active');
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
            
            // Permitir clics en el sidebar sin cerrarlo
            sidebar.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            // Marcar elemento activo
            const currentPage = window.location.pathname.split('/').pop() || 'home_asesor.html';
            const menuItems = document.querySelectorAll('.sidebar-menu li');
            
            menuItems.forEach(item => {
                item.classList.remove('active');
                const link = item.querySelector('a');
                if (link && link.getAttribute('href') === currentPage) {
                    item.classList.add('active');
                }
            });
        })
        .catch(error => {
            console.error('Error loading sidebar asesor:', error);
        });
});
