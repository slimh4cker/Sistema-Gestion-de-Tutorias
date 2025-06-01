// variables de Estado
let chatActual = null;
const mensajesPorCarga = 10;
let fetchingMenssages = false;
let allMessagesLoaded = false;

//  funciones Utilitarias
function truncarCadena(cadena, maxCaracteres) {
    return cadena.length > maxCaracteres ? cadena.slice(0, maxCaracteres) + '...' : cadena;
}

function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);
    const ahora = new Date();

    const fechaSinHora = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
    const ahoraSinHora = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());

    const diferenciaDias = Math.floor((ahoraSinHora - fechaSinHora) / (1000 * 60 * 60 * 24));

    if (diferenciaDias === 0) {
        return fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diferenciaDias === 1) {
        return `Ayer ${fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
        return `${fecha.toLocaleDateString([], { day: '2-digit', month: 'short' })} ${fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
}

// Función para agregar un mensaje al chat (manteniendo la posición del scroll)
function agregarMensajeAlChat(mensaje, tipoUsuario, prepend = false) {
    const messageThread = document.getElementById("messageThread");
    const isEmisor = mensaje.emisor_tipo === tipoUsuario;

    const container = document.createElement("div");
    container.className = `message-container ${isEmisor ? 'sent' : 'received'}`;
    // Guarda el ID del mensaje en un data-attribute para la paginación basada en ID
    container.dataset.messageId = mensaje.id_mensaje;

    const bubble = document.createElement("div");
    bubble.className = `message-bubble ${isEmisor ? 'sent' : 'received'}`;
    bubble.textContent = mensaje.contenido;

    const time = document.createElement("div");
    time.className = 'message-time';
    time.textContent = formatearFecha(mensaje.fecha_envio);

    container.appendChild(bubble);
    container.appendChild(time);

    if (prepend) {
        messageThread.prepend(container);
    } else {
        messageThread.appendChild(container);
        messageThread.scrollTop = messageThread.scrollHeight; // Scroll al final solo en mensajes nuevos
    }
}

// Función para actualizar el estado de los mensaje
function actualizarEstadoMensajes(mensajesIds) {
    mensajesIds.forEach(id => {
        const mensajeElement = document.querySelector(`[data-id="${id}"]`);
        if (mensajeElement) {
            mensajeElement.querySelector('.message-status').textContent = 'Leído';
        }
    });
}


async function obtenerChats(token) {
    if (!token) {
        window.location.href = 'login.html';
        throw new Error('Token no encontrado');
    }
    try {
        const response = await fetch('http://localhost:1234/mensajes/chats', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Error al obtener los chats');
        const data = await response.json();
        if (data.success) return data.chats;
        throw new Error(data.error || 'Error desconocido');
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron obtener los chats.',
            confirmButtonColor: '#d33'
        });
        throw error;
    }
}

async function mensaje_chat(id_asesoria, token, limit, lastId) {
    let url = `http://localhost:1234/mensajes/mensajes?id_asesoria=${id_asesoria}&limit=${limit}`;
    if (lastId) {
        url += `&lastMessageId=${lastId}`; // Se añade el ID del mensaje más antiguo ya cargado
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) throw new Error('Error al obtener mensajes');
        const data = await response.json();
        if (data.success) return data;
        throw new Error(data.error || 'Error desconocido');
    } catch (error) {
        console.error(error);
        // Puedes agregar un manejo de error visual aquí si es necesario
    }
}

async function enviarMensaje() {
    const token = localStorage.getItem('authToken');
    const id_asesoria = localStorage.getItem('id_asesoria'); // Usar el id_asesoria del localStorage
    const mensajeInput = document.getElementById('contenido-mensaje');
    const mensaje = mensajeInput.value.trim();
    const tipoUsuario = localStorage.getItem('userType'); // Obtener el tipo de usuario actual

    if (!mensaje) return;

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
        if (!response.ok) throw new Error('Error al enviar mensaje');
        const data = await response.json();
        if (data.success) {
            mensajeInput.value = '';
            agregarMensajeAlChat(data.nuevoMensaje, tipoUsuario);
            // After sending a message, refresh the unread count for the current chat
            const chatItem = document.querySelector(`.conversation-item[data-id="${id_asesoria}"]`);
            if (chatItem) {
                // Update the badge or remove it if there are no unread messages for the current chat
                // This assumes your server returns the correct unread count after sending a message.
                // If not, you might need to re-fetch portadaChat for the current chat.
                // For simplicity, we'll just re-fetch for the current chat's unread status.
                portadaChat(id_asesoria, token).then(portada => {
                    const badgeElement = chatItem.querySelector('.badge');
                    if (badgeElement) {
                        if (portada.mensajesSinLeer > 0) {
                            badgeElement.textContent = portada.mensajesSinLeer;
                        } else {
                            badgeElement.remove();
                        }
                    } else if (portada.mensajesSinLeer > 0) {
                        const badgeHTML = `<span class="badge bg-primary rounded-pill">${portada.mensajesSinLeer}</span>`;
                        chatItem.querySelector('.d-flex').insertAdjacentHTML('beforeend', badgeHTML);
                    }
                });
            }

        } else {
            throw new Error(data.error || 'Error desconocido');
        }
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo enviar el mensaje.',
            confirmButtonColor: '#d33'
        });
    }
}

async function portadaChat(id_asesoria, token) {
    try {
        const datos_chat_portada = await mensaje_chat(id_asesoria, token, 1, 0); // Solo para la portada
        const ultimo = datos_chat_portada.mensajes.length > 0 ? datos_chat_portada.mensajes[0] : null;
        let mensajesSinLeer = 0; // Initialize to 0

        const userType = localStorage.getItem('userType'); // Get the current user's type

        // Fetch unread messages from the server
        const response = await fetch('http://localhost:1234/mensajes/leidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                id_asesoria: id_asesoria
            })
        });
        const data = await response.json();
        if (data.success) {
            // Only count messages that are not sent by the current user
            mensajesSinLeer = data.sinLeer;
        }

        return {
            nombre: datos_chat_portada.otro_usuario.nombre || 'Usuario desconocido',
            ultimoMensaje: ultimo ? truncarCadena(ultimo.contenido, 40) : 'Sin mensajes aún',
            fechaUltimoMensaje: ultimo ? ultimo.fecha_envio : null,
            mensajesSinLeer: mensajesSinLeer
        };
    } catch (error) {
        console.error('Error al obtener la portada:', error);
        return null;
    }
}

async function marcarLeido(id_mensaje, token) {
    try {
        const response = await fetch('http://localhost:1234/mensajes/estado', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                id_mensaje: id_mensaje,
                estado: 2 // 1: enviado, 2: leído
            })
        });
        if (!response.ok) throw new Error('Error al actualizar estado');
    } catch (error) {
        console.error('Error al actualizar estado:', error);
    }
}


async function cargarMensajesChat() {
    const messageThread = document.getElementById("messageThread");

    if (fetchingMenssages || allMessagesLoaded || !chatActual) {
        return;
    }

    fetchingMenssages = true;

    const token = localStorage.getItem('authToken');
    const tipoUsuario = localStorage.getItem('userType');

    // Se obtiene el id del mensaje más antiguo como pivote para cargar a los restantes
    const oldestMessageElement = messageThread.querySelector('.message-container');
    const currentOldestMessageId = oldestMessageElement ? oldestMessageElement.dataset.messageId : null;

    try {
        const datosChat = await mensaje_chat(chatActual, token, mensajesPorCarga, currentOldestMessageId);
        const newMessages = datosChat.mensajes;

        if (newMessages && newMessages.length > 0) {
            const oldScrollHeight = messageThread.scrollHeight;
            newMessages.forEach(mensaje => {
                agregarMensajeAlChat(mensaje, tipoUsuario, true);
            });

            // Ajusta el scroll para mantener la posición relativa después de añadir los nuevos mensajes
            messageThread.scrollTop = messageThread.scrollHeight - oldScrollHeight;

            // Si se recibieron menos mensajes de los solicitados, es que no hay más
            if (newMessages.length < mensajesPorCarga) {
                allMessagesLoaded = true;

            }

            const messagesToMarkAsRead = newMessages.filter(msg => msg.emisor_tipo !== tipoUsuario && msg.estado === 'enviado');
            for (const message of messagesToMarkAsRead) {
                await marcarLeido(message.id_mensaje, token);
            }

        } else {
            allMessagesLoaded = true;
        }

    } catch (error) {
        console.error('Error al cargar mensajes del chat:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error de Carga',
            text: 'No se pudieron cargar más mensajes.',
            confirmButtonColor: '#d33'
        });
    } finally {
        fetchingMenssages = false;
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken');
    const messageThread = document.getElementById("messageThread"); // Obtener referencia aquí para el scroll listener

    try {
        const chats = await obtenerChats(token);
        const chatList = document.getElementById('conversationList');
        if (!chatList) return;

        chatList.innerHTML = '';
        chats.forEach(chat => {
            portadaChat(chat.id_asesoria, token).then(portada => {
                if (!portada) return;
                const chatItem = document.createElement('div');
                chatItem.className = 'conversation-item p-3 border-bottom';
                chatItem.dataset.id = chat.id_asesoria; // Add data-id for easy lookup
                const badgeHTML = portada.mensajesSinLeer > 0 ? `<i class="bi bi-check2"></i>` : '<i class="bi bi-check2-all"></i>';

                chatItem.innerHTML = `
                    <div class="conversation-content">
                        <div class="d-flex justify-content-between ">
                            <h6>${portada.nombre}</h6>
                            ${badgeHTML}
                        </div>
                        <div class="text-muted small">${portada.ultimoMensaje}</div>
                    </div>
                `;

                chatItem.addEventListener('click', async () => {
                    document.getElementById("conversationList").classList.remove("active");
                    document.getElementById("messageArea").classList.add("active");
                    document.getElementById("chatName").textContent = portada.nombre;

                    messageThread.innerHTML = '';
                    chatActual = chat.id_asesoria;
                    fetchingMenssages = false;
                    allMessagesLoaded = false;
                    await cargarMensajesChat();
                    messageThread.scrollTop = messageThread.scrollHeight;
                    if (chatActual) {
                        const tempDatosChat = await mensaje_chat(chatActual, token, 1, null);
                        if (tempDatosChat && tempDatosChat.otro_usuario) {
                            localStorage.setItem('id_asesoria', tempDatosChat.asesoria_id);
                            localStorage.setItem('id_receptor', tempDatosChat.otro_usuario.id);
                            localStorage.setItem('receptor_tipo', tempDatosChat.otro_usuario.tipo);
                        }
                    }

                });
                chatList.appendChild(chatItem);
            });
        });

    } catch (error) {
        console.error('Error al cargar los chats:', error);
    }

    if (messageThread) {
        messageThread.addEventListener('scroll', () => {
            // carga mensajes al llegar al tope del scroll
            if (messageThread.scrollTop < 20) {
                cargarMensajesChat();
            }
        });
    }
});


document.querySelector("#enviar-mensaje-btn").addEventListener("click", (e) => {
    e.preventDefault();
    enviarMensaje()
    
});

document.getElementById('contenido-mensaje').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        enviarMensaje();
    }
});

document.querySelector('#backButton').addEventListener('click', () => {
    document.querySelector('.conversation-list').classList.add('active');
    document.querySelector('.message-area').classList.remove('active');
    // Reiniciar variables al volver a la lista de chats si es necesario
    chatActual = null;
    fetchingMenssages = false;
    allMessagesLoaded = false;
    location.reload()
});