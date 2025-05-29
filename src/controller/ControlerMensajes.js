import { AsesoriaModel } from "../models/AmazonRDS/AsesoriaModel.js";
import { AsesorModel } from "../models/AmazonRDS/AsesorModel.js";
import { modelo_cuenta_asesor, modelo_cuenta_estudiante } from "../models/AmazonRDS/Modelo_cuentas.js";
import { MensajesModel } from "../models/AmazonRDS/MensajesModel.js";
import { obtenerIdDeReq, obtenerRolDeReq } from "../utils/request.js";


export class MensajeControler{

    static async crearMensaje(req, res) {
        const { id_asesoria, id_receptor, receptor_tipo, contenido } = req.body; 
        const id_emisor = obtenerIdDeReq(req)
        const emisor_tipo = obtenerRolDeReq(req)


        if (!id_asesoria || !id_receptor || !receptor_tipo || !contenido) {
            return res.status(400).json({ error: 'Faltan datos requeridos para crear el mensaje' });
        }

        try {
            const nuevoMensaje = await MensajesModel.crearMensaje({
                id_asesoria: id_asesoria,
                id_emisor: id_emisor,
                emisor_tipo: emisor_tipo,
                id_receptor: id_receptor,
                receptor_tipo: receptor_tipo,
                contenido: contenido,
                fecha_envio: new Date()
            });
            res.status(200).json({success: true, nuevoMensaje});
        } catch (error) {
            res.status(500).json({ error: 'Error al crear mensaje' });
        }
    }

    static async obtenerMensajes(req, res) {
        const id_asesoria = req.body.id_asesoria;
        const usuarioId = obtenerIdDeReq(req);
        const usuarioTipo = obtenerRolDeReq(req);

        console.log("ID de asesoria:", id_asesoria);

        if (!id_asesoria) {
            return res.status(400).json({ error: 'ID de asesoria no proporcionado' });
        }

        try {
            // Buscar la asesoría
            const asesoria = await AsesoriaModel.getAsesoriaById(id_asesoria);

            if (!asesoria) {
            return res.status(404).json({ error: 'Asesoría no encontrada' });
            }

            // Determinar el otro usuario
            let otroUsuarioId, otroUsuarioTipo, otroUsuarioNombre;

            if (usuarioTipo === 'alumno') {
            otroUsuarioId = asesoria.asesor.id;
            otroUsuarioTipo = 'asesor';
            const asesor = await modelo_cuenta_asesor.findByPk(otroUsuarioId);
            otroUsuarioNombre = asesor ? asesor.nombre : 'Asesor no encontrado';
            } else if (usuarioTipo === 'asesor') {
            otroUsuarioId = asesoria.estudiante.id;
            otroUsuarioTipo = 'alumno';
            const estudiante = await modelo_cuenta_estudiante.findByPk(otroUsuarioId);
            otroUsuarioNombre = estudiante ? estudiante.nombre : 'Estudiante no encontrado';
            } else {
            return res.status(403).json({ error: 'Rol no permitido para ver mensajes de esta asesoría' });
            }

            // Obtener los mensajes
            const mensajes = await MensajesModel.obtenerMensajesPorAsesoria(id_asesoria);

            res.status(200).json({
            success: true,
            asesoria_id: id_asesoria,
            otro_usuario: {
                id: otroUsuarioId,
                nombre: otroUsuarioNombre,
                tipo: otroUsuarioTipo
            },
            mensajes
            });

        } catch (error) {
            console.error('Error al obtener mensajes:', error);
            res.status(500).json({ error: 'Error al obtener mensajes' });
        }
}


    // Esta función obtiene los chats de un usuario, filtrando por su ID y tipo de usuario.
    static async obtenerChats(req, res) {
        const id_usuario = obtenerIdDeReq(req);
        const tipo_usuario = obtenerRolDeReq(req);

        try {
            const chats = await MensajesModel.obtenerChatsDeUsuario(id_usuario, tipo_usuario);
            res.status(200).json({success: true, chats});
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener chats' });
        }
    }

    static async actualizarEstadoMensaje(req, res) {
        const { id_mensaje, estado } = req.body;

        if (!id_mensaje || !estado) {
            return res.status(400).json({ error: 'Faltan datos requeridos para actualizar el estado del mensaje' });
        }

        try {
            const mensajeActualizado = await MensajesModel.actualizarEstadoMensaje(id_mensaje, estado);
            res.status(200).json({success: true, mensajeActualizado});
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el estado del mensaje' });
        }
    }

}