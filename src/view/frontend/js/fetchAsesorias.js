document.addEventListener('DOMContentLoaded', () => {
    cargarAsesoriasAsignadas();
});
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
    console.log('Asesorías recibidas:', asesorias);
    asesorias.forEach(asesoria => {
      const card = document.createElement('div');
      card.className = 'asesoria-card';

    card.innerHTML = `
        <h3>Asesoría para: ${asesoria.modelo_solicitud?.modelo_cuenta_estudiante?.nombre ?? 'Desconocido'}</h3>
        <p><strong>Tema:</strong> ${asesoria.modelo_solicitud?.tema ?? 'No disponible'}</p>
        <p><strong>Modalidad:</strong> ${asesoria.modelo_solicitud?.modalidad ?? 'No disponible'}</p>
        <p><strong>Fecha límite:</strong> ${asesoria.modelo_solicitud?.fecha_limite ?? 'No disponible'}</p>
        <p><strong>Asesor asignado:</strong> ${asesoria.modelo_solicitud?.modelo_cuenta_asesor?.nombre ?? 'No disponible'}</p>
        <p><strong>Fecha de asignación:</strong> ${asesoria.fecha_creacion ?? 'No disponible'}</p>
    `;

      contenedor.appendChild(card);
    });

  } catch (error) {
    console.error('Error al cargar asesorías:', error.message);
  }
}