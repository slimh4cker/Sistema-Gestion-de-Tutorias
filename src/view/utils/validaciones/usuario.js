export function validarCamposRegistro(usuarioActual, datos) {
    const nombre = datos.nombre.trim();
    const email = datos.email.trim();
    const password = datos.password.trim();
    const especialidad = datos.especialidad?.trim()

    if (!nombre || !email || !password) {
        return 'Por favor complete todos los campos';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Ingrese un correo electrónico válido';
    }

    // Validar contraseña
    if (password.length < 8 || password.length > 255) {
        return 'La contraseña debe tener entre 8 y 255 caracteres';
    }

    const mayusculaRegex = /[A-Z]/;
    const numeroRegex = /[0-9]/;

    if (!mayusculaRegex.test(password)) {
        return 'La contraseña debe contener al menos una letra mayúscula';
    }

    if (!numeroRegex.test(password)) {
        return 'La contraseña debe contener al menos un número';
    }

    if (usuarioActual === 'asesor' && (!especialidad || especialidad.trim() === '')) {
        return 'Por favor seleccione una especialidad';
    }

    return null; // Todo válido
}
