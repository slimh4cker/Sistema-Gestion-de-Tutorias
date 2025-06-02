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

