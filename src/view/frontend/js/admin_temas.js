document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const modal = document.getElementById('modalTema');
    const btnAgregar = document.getElementById('btnAgregarTema');
    const btnCancelar = document.getElementById('btnCancelar');
    const formTema = document.getElementById('formTema');
    const temasContainer = document.querySelector('.temas-card');

    // Lista de materias (almacenada en localStorage)
    let materias = JSON.parse(localStorage.getItem('materias')) || [
        { id: 1, nombre: 'Administración de Bases de Datos' },
        { id: 2, nombre: 'Álgebra' },
        { id: 3, nombre: 'Álgebra lineal' },
        { id: 4, nombre: 'Álgebra/Precálculo' },
        { id: 5, nombre: 'Cálculo Diferencial' },
        { id: 6, nombre: 'Cálculo Integral' },
        { id: 7, nombre: 'Cálculo Vectorial' },
        { id: 8, nombre: 'Contabilidad' },
        { id: 9, nombre: 'Dibujo Asistido' },
        { id: 10, nombre: 'Dibujo en SolidWorks' },
        { id: 11, nombre: 'Dinámica' },
        { id: 12, nombre: 'Electromagnetismo' },
        { id: 13, nombre: 'Electrónica Básica' },
        { id: 14, nombre: 'Estadística' },
        { id: 15, nombre: 'Estática' },
        { id: 16, nombre: 'Física' },
        { id: 17, nombre: 'Fundamentos de Bases de Datos' },
        { id: 18, nombre: 'Fundamentos de Investigación' },
        { id: 19, nombre: 'Programación Básica' },
        { id: 20, nombre: 'Química' },
        { id: 21, nombre: 'Taller de Bases de Datos' },
        { id: 22, nombre: 'Taller de Investigación 1' },
        { id: 23, nombre: 'Taller de Investigación 2' },
        { id: 24, nombre: 'Vibraciones mecánicas' }
    ];


    // Función para renderizar materias
    function renderMaterias() {
        temasContainer.innerHTML = '';
        materias.forEach(materia => {
            const temaItem = document.createElement('div');
            temaItem.className = 'tema-item';
            temaItem.innerHTML = `
                <span class="tema-nombre">${materia.nombre}</span>
                <button class="btn-eliminar-tema" data-id="${materia.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            temasContainer.appendChild(temaItem);
        });

        // Guardar materias en localStorage
        localStorage.setItem('materias', JSON.stringify(materias));

        // Agregar event listeners a los botones de eliminar
        document.querySelectorAll('.btn-eliminar-tema').forEach(btn => {
            btn.addEventListener('click', eliminarMateria);
        });
    }

    // Función para agregar nueva materia
    function agregarMateria(nombre) {
        const nuevaMateria = { id: Date.now(), nombre: nombre };
        materias.push(nuevaMateria);
        renderMaterias();
    }

    // Función para eliminar materia
    function eliminarMateria(e) {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        if (confirm('¿Estás seguro de eliminar esta materia?')) {
            materias = materias.filter(materia => materia.id !== id);
            renderMaterias();
        }
    }

    // Evento para abrir modal
    btnAgregar.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
        document.getElementById('nombreTema').focus();
    });

    // Evento para cerrar modal
    btnCancelar.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Evento para enviar formulario
    formTema.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombreTema = document.getElementById('nombreTema').value.trim();

        if (nombreTema) {
            agregarMateria(nombreTema);
            formTema.reset();
            modal.style.display = 'none';
        }
    });

    // Renderizar materias al cargar la página
    renderMaterias();
});
