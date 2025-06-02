// Actualizar perfil
async function updatePerfil(nombre, nuevaContrasenia, campos = {}) {
  try {
    let endpoint;
    // Selecciona el tipo de usuario y asigna endpoint correspondiente
    switch (localStorage.getItem('userType')) {
      case 'alumno':
        endpoint = 'http://localhost:1234/alumno/alumno';
        break;
      case 'asesor':  
        endpoint = 'http://localhost:1234/asesores/asesores';
        break;
      case 'admin':
        endpoint = 'http://localhost:1234/admin/admin';
        break;
      default:
        console.error('Tipo de usuario no reconocido');
        return;
    }

    // verifica y asigna datos a un objeto
    const datosActualizados = {};
    if (nombre) datosActualizados.nombre = nombre;
    if (nuevaContrasenia) datosActualizados.password = nuevaContrasenia;
    // Incluir datos adicionales si se proporcionan en la variable campos
    if (Object.keys(campos).length > 0) {
      Object.assign(datosActualizados, campos);
    }

    console.log('Datos a actualizar:', datosActualizados);

    // Si no hay datos para actualizar, muestra un mensaje y termina la función
    if (Object.keys(datosActualizados).length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'No se han realizado cambios para actualizar.',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    // Realiza la solicitud PATCH al endpoint correspondiente
    const response = await fetch(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      },
      body: JSON.stringify(datosActualizados)
    });

    const resultado = await response.json();

    if (response.ok) {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Perfil actualizado correctamente',
      confirmButtonColor: '#3085d6'
    });
    }  else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: resultado.mensaje || 'No se pudo actualizar el perfil',
      confirmButtonColor: '#d33'
    });
    }

    } catch (error) {
    console.error('Error al actualizar perfil:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error inesperado',
      text: 'Ocurrió un error al actualizar el perfil.',
      timer: 3000,
      showConfirmButton: false
    });
  }
}

// Manejo del formulario
const form = document.getElementById('actualizar-perfil');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Obtiene los valores de los campos del formulario
  const nombreInput = document.getElementById('nombre');
  const newPasswordInput = document.getElementById('new-password');
  const confirmPasswordInput = document.getElementById('confirm-password');

  const nombre = nombreInput.value.trim(); // Elimina espacios en blanco
  const newPassword = newPasswordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Validación de contraseña nueva
  if (newPassword || confirmPassword) {
    if (newPassword !== confirmPassword) {
      Swal.fire({
      icon: 'warning',
      title: 'Contraseña inválida',
      text: 'Las contraseñas no coinciden.',
      confirmButtonColor: '#f0ad4e'
      });
      return;
    }
  }

  // ver si existen datos adicionales
  let camposAdicionales = {};

  // horario
  let getHorarioJSON = window.getHorarioJSON || null;
  if (getHorarioJSON) {
    camposAdicionales.disponibilidad = window.getHorarioJSON();
  }
  // especialidad
  let especialidad = document.getElementById('txtEspecialidad');
  if (especialidad && especialidad.value) {
    camposAdicionales.especialidad = especialidad.value.trim();
  }

  // Llamar a la actualización
  updatePerfil(nombre, newPassword, camposAdicionales);
});
