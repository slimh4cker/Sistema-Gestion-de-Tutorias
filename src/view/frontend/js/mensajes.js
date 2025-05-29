async function mensaje_chat(id_asesoria, token) {
    try {
/*         const mensajeInput = document.getElementById('mensaje');
 */     
        // Llama a todos los mensajes del chat especificado
        const response = await fetch('http://localhost:1234/mensajes/mensajes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                id_asesoria: id_asesoria,
            })
        });

        if (!response.ok) {
            throw new Error('Error al enviar el mensaje');
        }
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        if(data.success) {
            "Mensaje enviado correctamente";
            return data;
        }
        else {
            throw new Error(data.error || 'Error desconocido al enviar el mensaje');
        }
    }
    catch (error) {
        console.error('Error al enviar el mensaje:', error);
    }
}

/**
 * Metodo para obtener toda la información referente a la portada de un chat
 * @param {string} id_asesoria 
 * @param {string} JWT 
 * @returns 
 */
async function portadaChat(id_asesoria, token){
    try {
        if (!token) {
            token = localStorage.getItem('authToken');
        }
        const datos_chat = await mensaje_chat(id_asesoria, token);
        const mensajesEnviados = datos_chat.mensajes.filter(mensaje => mensaje.estado === 'enviado').length;
        const otro_usuario = datos_chat.otro_usuario.nombre || 'Usuario desconocido';
        const ultimoMensaje = datos_chat.mensajes.length > 0 ? datos_chat.mensajes[datos_chat.mensajes.length - 1].contenido : 'Sin mensajes aún';
        const fechaUltimoMensaje = datos_chat.mensajes.length > 0 ? datos_chat.mensajes[datos_chat.mensajes.length - 1].fecha_envio : 'Sin mensajes aún';
        return portada = {
            nombre: otro_usuario,
            ultimoMensaje: ultimoMensaje,
            fechaUltimoMensaje: fechaUltimoMensaje,
            mensajesSinLeer: mensajesEnviados

        }
    } catch (error) {
        console.error('Error al obtener la portada del chat:', error);
        return null; // Retorna null en caso de error
    }

}



