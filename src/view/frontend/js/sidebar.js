// view/frontend/js/sidebar.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('side_bar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP! estado: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Insertar la barra lateral al inicio del contenedor
            const container = document.querySelector('.alumno-container');
            if (container) {
                container.insertAdjacentHTML('afterbegin', data);
                
                // Marcar como activo el elemento correspondiente a la página actual
                const currentPage = location.pathname.split('/').pop() || 'home_alumno.html';
                const menuItems = document.querySelectorAll('.sidebar-menu li');
                
                menuItems.forEach(item => {
                    item.classList.remove('active');
                    const link = item.querySelector('a');
                    if (link) {
                        const linkPage = link.getAttribute('href');
                        if (currentPage.includes(linkPage)) {
                            item.classList.add('active');
                        }
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error cargando la barra lateral:', error);
        });
});