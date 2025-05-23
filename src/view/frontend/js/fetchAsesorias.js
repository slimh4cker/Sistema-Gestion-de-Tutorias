// public/js/fetchAsesorias.js

async function cargarAsesoriasAsignadas() {
  try {
    const response = await fetch('http://localhost:1234/admin/asesorias-asignadas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            }
        });

    if (!response.ok) {
      throw new Error('No se pudieron obtener las asesorías');
    }

    const asesorias = await response.json();
    const contenedor = document.getElementById('contenedor-asesorias');
    contenedor.innerHTML = '';

    asesorias.forEach(asesoria => {
      const solicitud = asesoria.modelo_solicitud;
      const card = document.createElement('div');
      card.className = 'asesoria-card';

      card.innerHTML = `
        <h3>Asesoría para: ${solicitud.estudiante?.nombre ?? 'Desconocido'}</h3>
        <p><strong>Tema:</strong> ${solicitud.tema}</p>
        <p><strong>Modalidad:</strong> ${solicitud.modalidad}</p>
        <p><strong>Fecha límite:</strong> ${solicitud.fecha_limite}</p>
        <p><strong>Asesor asignado:</strong> ${solicitud.asesor_asignado}</p>
        <p><strong>Fecha de asignación:</strong> ${asesoria.fecha_creacion}</p>
      `;

      contenedor.appendChild(card);
    });

  } catch (error) {
    console.error('Error al cargar asesorías:', error.message);
  }
}

// Ejecutar al cargar la vista
document.addEventListener('DOMContentLoaded', cargarAsesoriasAsignadas);
