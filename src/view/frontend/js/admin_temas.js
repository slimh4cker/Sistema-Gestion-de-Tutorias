document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const modal = document.getElementById('modalTema');
    const btnAgregar = document.getElementById('btnAgregarTema');
    const btnCancelar = document.getElementById('btnCancelar');
    const formTema = document.getElementById('formTema');
    const temasContainer = document.querySelector('.temas-card');
    
    // Lista de materias (simulada - en producción vendría de una base de datos)
    let materias = [
        { id: 1, nombre: 'Matemáticas' },
        { id: 2, nombre: 'Física' },
        { id: 3, nombre: 'Química' },
        { id: 4, nombre: 'Programación' }
    ];
    
    // Función para renderizar las materias
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
        
        // Agregar event listeners a los botones de eliminar
        document.querySelectorAll('.btn-eliminar-tema').forEach(btn => {
            btn.addEventListener('click', eliminarMateria);
        });
    }
    
    // Función para agregar nueva materia
    function agregarMateria(nombre) {
        const nuevaMateria = {
            id: Date.now(), // ID temporal
            nombre: nombre
        };
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
    btnAgregar.addEventListener('click', function() {
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