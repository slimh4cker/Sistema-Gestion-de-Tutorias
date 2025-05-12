document.addEventListener("DOMContentLoaded", () => {
  const cursosContainer = document.getElementById("cursos-container");
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    window.location.href = "/login.html";
    return;
  }

  // Función para cargar las asesorías del asesor
  const cargarAsesorias = async () => {
    try {
      const response = await fetch("http://localhost:1234/asesores/asesorias", {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.status === 401) {
        alert("Sesión expirada");
        window.location.reload();
        return;
      }

      if (!response.ok) throw new Error("Error en la respuesta");

      const asesorias = await response.json();
      renderizarAsesorias(asesorias);

    } catch (error) {
      cursosContainer.innerHTML = `
        <div class="alert alert-danger">
          ${error.message === "Failed to fetch"
            ? "Error de conexión con el servidor"
            : error.message}
        </div>`;
    }
  };

  // Función para renderizar las asesorías
  const renderizarAsesorias = (asesorias) => {
    cursosContainer.innerHTML = ""; // Limpiar antes de renderizar
    asesorias.forEach((asesoria) => {
      cursosContainer.innerHTML += crearAsesoriaCard(asesoria);
    });
  };

  // Función para crear una tarjeta de asesoría
  const crearAsesoriaCard = (asesoria) => {
    return `
      <div class="curso-card" onclick="window.location.href='asesoria-detalle.html?asesoria=${asesoria.id_asesoria}'">
        <div class="curso-card-content">
          <div class="curso-header">
            <h3 class="curso-title">${asesoria.solicitud.tema}</h3>
            <span class="badge bg-primary curso-badge">${asesoria.solicitud.modalidad}</span>
          </div>
          <p class="profesor-info">
            <i class="fas fa-user-graduate me-2"></i> ${asesoria.solicitud.estudiante.nombre}
          </p>
          <div class="sesion-info">
            <p class="sesion-label">Fecha límite</p>
            <p class="sesion-date">${asesoria.solicitud.fecha_limite}</p>
          </div>
        </div>
      </div>
    `;
  };

  // Ejecutar carga de asesorías al cargar el DOM
  cargarAsesorias();
});
