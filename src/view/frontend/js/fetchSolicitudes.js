// fetchSolicitudes.js
document.addEventListener('DOMContentLoaded', function() {
    cargarSolicitudes();
});

async function cargarSolicitudes() {
    try {
        const response = await fetch('http://localhost:1234/admin/solicitud', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            }
        });

        if (!response.ok) throw new Error('Error al obtener solicitudes');
        const data = await response.json();

        const solicitudesContainer = document.querySelector('.solicitudes-container');
        const secciones = solicitudesContainer.querySelectorAll('.section-title');

        // Limpiar contenido estático
        const tarjetasExistentes = solicitudesContainer.querySelectorAll('.solicitud-card');
        tarjetasExistentes.forEach(card => card.remove());

        // Filtrar solicitudes
        const pendientes = data.filter(s => s.estado !== 'Aceptada');
        const aceptadas = data.filter(s => s.estado === 'Aceptada');

        // Insertar pendientes después del primer título
        const fragmentPendientes = document.createDocumentFragment();
        pendientes.forEach(s => fragmentPendientes.appendChild(crearTarjeta(s)));
        secciones[0].after(fragmentPendientes);

        // Insertar aceptadas después del segundo título
        const fragmentAceptadas = document.createDocumentFragment();
        aceptadas.forEach(s => fragmentAceptadas.appendChild(crearTarjeta(s)));
        secciones[1].after(fragmentAceptadas);

    } catch (error) {
        console.error('Error:', error);
    }
}


function crearTarjeta(solicitud) {
    const card = document.createElement('div');
    card.className = `solicitud-card${solicitud.estado === 'Aceptada' ? ' aceptada' : ''}`;

    const header = document.createElement('div');
    header.className = 'solicitud-header';
    
    const titulo = document.createElement('h3');
    titulo.className = 'solicitud-title';
    titulo.textContent = `Solicitud de: ${solicitud.estudiante?.nombre ?? 'Desconocido'}`;

    const badge = document.createElement('span');
    badge.className = `badge ${
        solicitud.estado === 'Aceptada' ? 'badge-aceptada' :
        `badge-${solicitud.nivel_urgencia.toLowerCase()}`
    }`;
    badge.textContent = solicitud.estado === 'Aceptada' ? 'Aceptada' : solicitud.nivel_urgencia;

    header.append(titulo, badge);

    const contenido = document.createElement('div');
    contenido.className = 'solicitud-content';
    
    const detalles = document.createElement('div');
    detalles.className = 'solicitud-details';

    // Función para agregar detalles
    const agregarDetalle = (etiqueta, valor) => {
        const detalle = document.createElement('div');
        detalle.className = 'detail-item';
        detalle.innerHTML = `<span class="detail-label">${etiqueta}</span> ${valor}`;
        detalles.appendChild(detalle);
    };

    agregarDetalle('Curso:', solicitud.tema);
    agregarDetalle('Fecha límite:', solicitud.fecha_limite);
    agregarDetalle('Modalidad:', solicitud.modalidad);
    agregarDetalle('Requisitos:', solicitud.observaciones);

    // Detalle específico para aceptadas
    if (solicitud.estado === 'Aceptada') {
        agregarDetalle('Asesor asignado:', solicitud.asesor_asignado);
    } else {
        const boton = document.createElement('button');
        boton.className = 'btn-asignar';
        boton.textContent = 'Asignar';
        detalles.appendChild(boton);
    }

    contenido.appendChild(detalles);
    card.append(header, contenido);
    
    return card;
}