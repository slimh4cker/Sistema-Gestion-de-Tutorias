
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
    try {
        const chats = await obtenerChats(token);
        console.log('Chats obtenidos:', chats);
        const chatList = document.getElementsByClassName('conversation-items');
        chatList.innerHTML = ''; // Limpiar lista antes de agregar

        chats.forEach(chat => {
            portadaChat(chat.id_asesoria, token).then((portada)=>{
                const chatItem = document.createElement('div');
                chatItem.className = 'conversation-item p-3 border-bottom';
                chatItem.innerHTML = `
                    <div class="conversation-content">
                        <div class="d-flex justify-content-between align-items-center">
                            <h6 class="mb-0">${portada.nombre}</h6>
                            <span class="badge bg-primary rounded-pill">${portada.mensajesSinLeer || 0}</span>
                        </div>
                        <div class="text-muted small">${portada.ultimoMensaje || 'Sin mensajes aún'}</div>
                    </div>
                `;
                chatItem.addEventListener('click', () => {
                    window.location.href = `chat.html?chatId=${chat.id_asesoria}`;
                });
                chatList[0].appendChild(chatItem);
            })

        });

    } catch (error) {
        console.error('Error al cargar los chats:', error);
    }
});
