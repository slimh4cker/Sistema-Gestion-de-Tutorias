/**
 * Obtiene los datos del usuario y mostrarlos en el perfil al que corresponde.
 * Dependiendo del tipo de usuario, se hace una solicitud a un endpoint diferente.
 * @returns {JSON} usuario - Objeto que contiene los datos del usuario.
 */
async function obtenerDatos() {
    try{
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
                break;
        }
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            }
        });
        if(!response.ok){
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        const data = await response.json();
        localStorage.setItem('password', data.password)
        return data;
    }
    catch(error){
        console.error('Error al obtener los datos del usuario:', error);
        throw error;
    }
}

window.onload = () => {
    obtenerDatos().then(usuario =>{
        // Se mandan a llamar los elementos del DOM 
        const input_nombre = document.getElementById('nombre');
        const input_password = document.getElementById('password');

        // Agregar al espacio local los datos del usuario y evento
        // Evento agregado para que funciones puedan activarse cuando se cargan los datos del usuario
        localStorage.setItem('datos_usuario', usuario);
        document.dispatchEvent(new CustomEvent('datosUsuarioCargados', { detail: usuario }));
        
        // Se asignan los valores a los elementos del DOM
        document.getElementById('email').innerText = usuario.email;
        input_nombre.value = usuario.nombre;
        input_password.value = usuario.password;
    })
}