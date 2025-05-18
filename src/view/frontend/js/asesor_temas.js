document.addEventListener('DOMContentLoaded', function() {
    // Cargar temas disponibles
    function cargarTemasDisponibles() {
        const materias = JSON.parse(localStorage.getItem('materias')) || [];
        const select = document.getElementById('topics-select');
        
        select.innerHTML = '<option value="" selected disabled>Selecciona un tema para agregar</option>';
        
        materias.forEach(materia => {
            const option = document.createElement('option');
            option.value = materia.nombre;
            option.textContent = materia.nombre;
            select.appendChild(option);
        });
    }

    // Manejar adición de temas
    function handleAddTopic() {
        const select = document.getElementById('topics-select');
        const selectedTopic = select.value;
        const selectedTopicsContainer = document.getElementById('selected-topics');
        
        if (!selectedTopic) return;
        
        const existingTopics = Array.from(selectedTopicsContainer.children)
            .map(item => item.firstChild.textContent.trim());
        
        if (existingTopics.includes(selectedTopic)) {
            alert('Este tema ya ha sido agregado');
            return;
        }
        
        const topicItem = document.createElement('div');
        topicItem.className = 'topic-item';
        topicItem.innerHTML = `
            <span>${selectedTopic}</span>
            <span class="remove-topic">
                <i class="fas fa-times"></i>
            </span>
        `;
        
        topicItem.querySelector('.remove-topic').addEventListener('click', function() {
            topicItem.remove();
        });
        
        selectedTopicsContainer.appendChild(topicItem);
        select.value = '';
    }

    // Manejar cambio de contraseña
    const passwordBtn = document.getElementById('change-password-btn');
    if (passwordBtn) {
        passwordBtn.addEventListener('click', function() {
            const passwordFields = document.getElementById('password-fields');
            passwordFields.style.display = passwordFields.style.display === 'none' ? 'block' : 'none';
        });
    }

    // Inicialización
    cargarTemasDisponibles();
    
    // Event listeners
    document.querySelector('.add-topic-btn')?.addEventListener('click', handleAddTopic);
    document.getElementById('topics-select')?.addEventListener('change', function() {
        if (this.value) handleAddTopic();
    });
});