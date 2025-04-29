// js/navbar.js
document.addEventListener('DOMContentLoaded', function () {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');

    if (navbarPlaceholder) {
        fetch('components/navbar.html')
            .then(response => response.text())
            .then(data => {
                navbarPlaceholder.innerHTML = data;
                inicializarSolicitarAsesoria(); // ¡Después de cargarlo, inicializamos el evento!
            })
            .catch(error => console.error('Error cargando el navbar:', error));
    }
});
