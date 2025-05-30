
async function obtenerChats(token) {
    if (!token) {
        window.location.href = 'login.html';
        throw new Error('Token no encontrado en localStorage');
    }

    try {
        const response = await fetch('http://localhost:1234/mensajes/chats', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los chats');
        }

        const data = await response.json();
        if (data.success) {
            return data.chats;
        } else {
            throw new Error(data.error || 'Error desconocido al obtener los chats');
        }
    } catch (error) {
        console.error('Error al obtener los chats:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron obtener los chats. Por favor, inténtalo de nuevo más tarde.',
            confirmButtonColor: '#d33'
        });
        throw error;
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken');
    const tipoUsuario = localStorage.getItem('userType');
    try {
        const chats = await obtenerChats(token);
        console.log('Chats obtenidos:', chats);
        const chatList = document.getElementById('conversationList');
        if (!chatList) {
            console.error('No se encontró el elemento de lista de chats');
            return;
        }
        chatList.innerHTML = ''; // Limpiar lista antes de agregar

        chats.forEach(chat => {
            portadaChat(chat.id_asesoria, token).then((portada) => {
                console.log('2. Portada del chat obtenida:');
                const chatItem = document.createElement('div');
                chatItem.className = 'conversation-item p-3 border-bottom';
                let badgeHTML = '';
                let actualizar = true;
                if (portada.mensajesSinLeer !== 0) {
                    console.log("mensajes sin leer: ", portada.mensajesSinLeer)
                badgeHTML = `<span class="badge bg-primary rounded-pill">${portada.mensajesSinLeer}</span>`;
                } else {
                actualizar = false;
                }

                chatItem.innerHTML = `
                <div class="conversation-content">
                    <div class="d-flex justify-content-between align-items-center">
                        <h6 class="mb-0">${portada.nombre}</h6>
                        ${badgeHTML}
                    </div>
                    <div class="text-muted small">${portada.ultimoMensaje || 'Sin mensajes aún'}</div>
                </div>
                `;


                chatItem.addEventListener('click', async () => {
                    console.log('3. Chat seleccionado:');
                    document.getElementById("conversationList").classList.remove("active");
                    document.getElementById("messageArea").classList.add("active");
                   
                    // Actualizar el título del chat

                    document.getElementById("chatName").textContent = portada.nombre;

                    // Trae todos los mensajes de este chat
                    const datosChat = await mensaje_chat(chat.id_asesoria, token);
                    const mensajes = datosChat.mensajes;
                    console.log(actualizar)
                     if(actualizar){
                        marcarLeido(mensajes, token)
                    }
                    localStorage.setItem('id_asesoria', datosChat.asesoria_id);
                    localStorage.setItem('id_receptor', datosChat.otro_usuario.id)
                    localStorage.setItem('receptor_tipo', datosChat.otro_usuario.tipo);
                    
                    // Limpiar mensajes previos
                    const messageThread = document.getElementById("messageThread");
                    messageThread.innerHTML = '';
                    // Recorrer y mostrar mensajes
                    mensajes.forEach(mensaje => {
                        const mensajeDiv = document.createElement("div");
                        mensajeDiv.className = `message ${mensaje.estado === 'enviado' ? 'enviado' : 'leído'}`;
                        mensajeDiv.innerHTML = `
                        <strong>${mensaje.emisor_tipo === tipoUsuario ? 'Tú' : datosChat.otro_usuario.nombre}</strong>
                        <p>${mensaje.contenido}</p>
                        <small class="text-muted">${formatearFecha(mensaje.fecha_envio)}</small>
                        `;
                        messageThread.appendChild(mensajeDiv);
                    });
 
                    });


                chatList.appendChild(chatItem);
            });
        });

    } catch (error) {
        console.error('Error al cargar los chats:', error);
    }
});

