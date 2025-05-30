function truncarCadena(cadena, maxCaracteres) {
  if (cadena.length > maxCaracteres) {
    console.log("cadena a truncar: ", cadena.slice(0, maxCaracteres));
    return cadena.slice(0, maxCaracteres) + '...';
  } else {
    
    return cadena;
  }
}

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
        console.log("1. Obteniendo portada del chat con id_asesoria")
        const datos_chat = await mensaje_chat(id_asesoria, token);
        const mensajesEnviados = datos_chat.mensajes.filter(mensaje => mensaje.estado === 'enviado').length;
        const otro_usuario = datos_chat.otro_usuario.nombre || 'Usuario desconocido';
        const ultimoMensaje = datos_chat.mensajes.length > 0 ? datos_chat.mensajes[datos_chat.mensajes.length - 1].contenido : 'Sin mensajes aún';
        const fechaUltimoMensaje = datos_chat.mensajes.length > 0 ? datos_chat.mensajes[datos_chat.mensajes.length - 1].fecha_envio : 'Sin mensajes aún';
        return portada = {
            nombre: otro_usuario,
            ultimoMensaje: truncarCadena(ultimoMensaje, 80), // Trunca el mensaje a 30 caracteres
            fechaUltimoMensaje: fechaUltimoMensaje,
            mensajesSinLeer: mensajesEnviados

        }
    } catch (error) {
        console.error('Error al obtener la portada del chat:', error);
        return null; // Retorna null en caso de error
    }

}

async function enviarMensaje(){
    console.log("Enviando mensaje...");
    const token = localStorage.getItem('authToken');
    const id_asesoria = localStorage.getItem('id_asesoria');
    const mensajeInput = document.getElementById('contenido-mensaje');
    const mensaje = mensajeInput.value.trim();
    console.log("datos a enviar: ",{
        id_asesoria: id_asesoria,
        id_receptor: localStorage.getItem('id_receptor'),
        receptor_tipo: localStorage.getItem('receptor_tipo'),
        contenido: mensaje
    })


    try {
        const response = await fetch('http://localhost:1234/mensajes/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                id_asesoria: id_asesoria,
                id_receptor: localStorage.getItem('id_receptor'),
                receptor_tipo: localStorage.getItem('receptor_tipo'),
                contenido: mensaje
            })
        });

        if (!response.ok) {
            throw new Error('Error al enviar el mensaje');
        }

        const data = await response.json();
        if (data.success) {
            mensajeInput.value = ''; // Limpiar el campo de entrada
        } else {
            throw new Error(data.error || 'Error desconocido al enviar el mensaje');
        }
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
    }
}


async function marcarLeido(mensajes, token){
     for (const mensaje of mensajes){
        try {
        const response = await fetch('http://localhost:1234/mensajes/estado',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                id_mensaje: mensaje.id_mensaje,
                "estado": 2
            })
        })

        if(!response.ok){
            throw new Error("error al actualizar estado")
        }
        const data = response.json()
        console.log(data)
        }
        catch(error){
            console.error("Error al actualizar los estados: ", error)
        }
    };
}

const btnEnviar = document.querySelector("#enviar-mensaje-btn");
btnEnviar.addEventListener("click", (e) => {
    e.preventDefault();
    enviarMensaje();
});





