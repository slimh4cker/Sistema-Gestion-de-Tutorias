async function mensaje_chat(chatId, token) {
    try {
/*         const mensajeInput = document.getElementById('mensaje');
 */
        const response = await fetch('http://localhost:1234/mensajes/mensajes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                id_asesoria: chatId,
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


async function portadaChat(chatId, token){
    try {
        if (!token) {
            token = localStorage.getItem('authToken');
        }
        const datos_chat = await mensaje_chat(chatId, token);
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



