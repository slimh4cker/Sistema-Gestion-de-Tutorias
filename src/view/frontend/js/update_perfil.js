// Actualizar perfil
async function updatePerfil(nombre, nuevaContrasenia) {
  try {
    let endpoint;
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

    const datosActualizados = {};
    if (nombre) datosActualizados.nombre = nombre;
    if (nuevaContrasenia) datosActualizados.password = nuevaContrasenia;
    if (Object.keys(datosActualizados).length === 0) {
      alert('No se han realizado cambios.');
      return;
    }

    const response = await fetch(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      },
      body: JSON.stringify(datosActualizados)
    });

    const resultado = await response.json();
    console.log(resultado);

    if (response.ok) {
      alert('Perfil actualizado correctamente.');
    } else {
      alert('Error al actualizar: ' + resultado.mensaje);
    }

  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    alert('Ocurrió un error al actualizar perfil.');
  }
}

// Manejo del formulario
const form = document.getElementById('actualizar-perfil');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombreInput = document.getElementById('nombre');
  const newPasswordInput = document.getElementById('new-password');
  const confirmPasswordInput = document.getElementById('confirm-password');

  const nombre = nombreInput.value.trim();
  const newPassword = newPasswordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Validación de contraseña nueva
  if (newPassword || confirmPassword) {
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
  }
  console.log(nombre, newPassword)
  // Llamar a la actualización
  updatePerfil(nombre, newPassword);
});
