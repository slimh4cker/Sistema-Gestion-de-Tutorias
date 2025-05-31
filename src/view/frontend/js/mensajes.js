// funciones utils
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


function agregarMensajeAlChat(mensaje, tipoUsuario, otroUsuarioNombre) {
    const messageThread = document.getElementById("messageThread");
    const isEmisor = mensaje.emisor_tipo === tipoUsuario;
    
    const container = document.createElement("div");
    container.className = `message-container ${isEmisor ? 'sent' : 'received'}`;
    
    const bubble = document.createElement("div");
    bubble.className = `message-bubble ${isEmisor ? 'sent' : 'received'}`;
    bubble.textContent = mensaje.contenido;
    
    const time = document.createElement("div");
    time.className = 'message-time';
    time.textContent = formatearFecha(mensaje.fecha_envio);
    
    container.appendChild(bubble);
    container.appendChild(time);
    messageThread.appendChild(container);
    
    messageThread.scrollTop = messageThread.scrollHeight;
}

function actualizarEstadoMensajes(mensajesIds) {
    mensajesIds.forEach(id => {
        const mensajeElement = document.querySelector(`[data-id="${id}"]`);
        if (mensajeElement) {
            mensajeElement.querySelector('.message-status').textContent = 'Leído';
        }
    });
}

// Funciones API
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

async function mensaje_chat(id_asesoria, token) {
    try {
        const response = await fetch('http://localhost:1234/mensajes/mensajes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id_asesoria })
        });
        if (!response.ok) throw new Error('Error al obtener mensajes');
        const data = await response.json();
        if (data.success) return data;
        throw new Error(data.error || 'Error desconocido');
    } catch (error) {
        console.error(error);
    }
}

async function enviarMensaje() {
    const token = localStorage.getItem('authToken');
    const id_asesoria = localStorage.getItem('id_asesoria');
    const mensajeInput = document.getElementById('contenido-mensaje');
    const mensaje = mensajeInput.value.trim();

    if (!mensaje) return;

    try {
        const response = await fetch('http://localhost:1234/mensajes/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                id_asesoria,
                id_receptor: localStorage.getItem('id_receptor'),
                receptor_tipo: localStorage.getItem('receptor_tipo'),
                contenido: mensaje
            })
        });
        if (!response.ok) throw new Error('Error al enviar mensaje');
        const data = await response.json();
        if (data.success) mensajeInput.value = '';
        else throw new Error(data.error || 'Error desconocido');
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
    }
}

async function portadaChat(id_asesoria, token) {
    try {
        const datos_chat = await mensaje_chat(id_asesoria, token);
        const mensajesEnviados = datos_chat.mensajes.filter(m => m.estado === 'enviado').length;
        const ultimo = datos_chat.mensajes.at(-1);
        return {
            nombre: datos_chat.otro_usuario.nombre || 'Usuario desconocido',
            ultimoMensaje: ultimo ? truncarCadena(ultimo.contenido, 40) : 'Sin mensajes aún',
            fechaUltimoMensaje: ultimo ? ultimo.fecha_envio : 'Sin mensajes aún',
            mensajesSinLeer: mensajesEnviados
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
                estado: 2
              })
        });
        if (!response.ok) throw new Error('Error al actualizar estado');
    } catch (error) {
        console.error('Error al actualizar estado:', error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {

    const token = localStorage.getItem('authToken');
    const tipoUsuario = localStorage.getItem('userType');

    try {
        const chats = await obtenerChats(token);
        console.log('Chats obtenidos:', chats);
        const chatList = document.getElementById('conversationList');
        if (!chatList) return;

        chatList.innerHTML = '';
        chats.forEach(chat => {
            portadaChat(chat.id_asesoria, token).then(portada => {
                if (!portada) return;
                const chatItem = document.createElement('div');
                chatItem.className = 'conversation-item p-3 border-bottom';
                const badgeHTML = portada.mensajesSinLeer ? `<span class="badge bg-primary rounded-pill">${portada.mensajesSinLeer}</span>` : '';

                chatItem.innerHTML = `
                    <div class="conversation-content">
                        <div class="d-flex justify-content-between align-items-center">
                            <h6 class="mb-0">${portada.nombre}</h6>
                            ${badgeHTML}
                        </div>
                        <div class="text-muted small">${portada.ultimoMensaje}</div>
                    </div>
                `;

                chatItem.addEventListener('click', async () => {
                    document.getElementById("conversationList").classList.remove("active");
                    document.getElementById("messageArea").classList.add("active");
                    document.getElementById("chatName").textContent = portada.nombre;

                    const datosChat = await mensaje_chat(chat.id_asesoria, token);
                    const mensajes = datosChat.mensajes;
                    console.log("mensaje sin leer: ", portada.mensajesSinLeer)
                    console.log("mensajes: ", mensajes)

                    if (portada.mensajesSinLeer) {
                        for(let mensaje of mensajes){
                            mensaje.estado === 'enviado' ? await marcarLeido(mensaje.id_mensaje, token) : {}
                        }
                    }

                    localStorage.setItem('id_asesoria', datosChat.asesoria_id);
                    localStorage.setItem('id_receptor', datosChat.otro_usuario.id);
                    localStorage.setItem('receptor_tipo', datosChat.otro_usuario.tipo);

                    const messageThread = document.getElementById("messageThread");
                    messageThread.innerHTML = '';

                    mensajes.forEach(mensaje => {
                        const isEmisor = mensaje.emisor_tipo === tipoUsuario;
                        
                        const container = document.createElement("div");
                        container.className = `message-container ${isEmisor ? 'sent' : 'received'}`;
                        
                        const bubble = document.createElement("div");
                        bubble.className = `message-bubble ${isEmisor ? 'sent' : 'received'}`;
                        bubble.textContent = mensaje.contenido;
                        
                        const time = document.createElement("div");
                        time.className = 'message-time';
                        time.textContent = formatearFecha(mensaje.fecha_envio);
                        
                        container.appendChild(bubble);
                        container.appendChild(time);
                        messageThread.appendChild(container);
                        
                        messageThread.scrollTop = messageThread.scrollHeight;
                    });
                    });
                chatList.appendChild(chatItem);
            });
        });

    } catch (error) {
        console.error('Error al cargar los chats:', error);
    }
});

// Enviar mensaje desde botón
document.querySelector("#enviar-mensaje-btn").addEventListener("click", (e) => {
    e.preventDefault();
    enviarMensaje();
});

document.getElementById('contenido-mensaje').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        enviarMensaje();
    }
});

// Navegación móvil
document.querySelector('#backButton').addEventListener('click', () => {
    document.querySelector('.conversation-list').classList.add('active');
    document.querySelector('.message-area').classList.remove('active');
});