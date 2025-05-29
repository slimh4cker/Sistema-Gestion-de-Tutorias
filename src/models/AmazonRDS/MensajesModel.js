import { modelo_mensajes } from "./Modelo_datos.js";
import { Op } from "sequelize";


export class MensajesModel {
    static async obtenerChatsDeUsuario(id_usuario, tipo_usuario) {
    try {
        const chats = await modelo_mensajes.findAll({
        where: {
            [Op.or]: [
            { id_emisor: id_usuario, emisor_tipo: tipo_usuario },
            { id_receptor: id_usuario, receptor_tipo: tipo_usuario }
            ]
        },
        attributes: ['id_asesoria'],
        group: ['id_asesoria'],
        order: [['fecha_envio', 'DESC']]
        });
        return chats.map(chat =>({
            id_asesoria: chat.id_asesoria
        })) ;
    } catch (error) {
        console.error('Error al obtener chats del usuario:', error);
        throw error;
    }
}


  // Obtener mensajes por id_asesoria ordenados por fecha
  static async obtenerMensajesPorAsesoria(id_asesoria) {
    try {
      const mensajes = await modelo_mensajes.findAll({
        where: {
          id_asesoria: id_asesoria
        },
        order: [['fecha_envio', 'ASC']]
      });
      return mensajes.map(mensaje=>({
        id_mensaje: mensaje.id,
        id_asesoria: mensaje.id_asesoria,
        id_emisor: mensaje.id_emisor,
        emisor_tipo: mensaje.emisor_tipo,
        id_receptor: mensaje.id_receptor,
        receptor_tipo: mensaje.receptor_tipo,
        contenido: mensaje.contenido,
        fecha_envio: mensaje.fecha_envio,
        estado: mensaje.estado
      }));
    } catch (error) {
      console.error('Error al obtener mensajes:', error);
      throw error;
    }
  }


  /**
 * Crea un nuevo mensaje en la base de datos.
 * 
 * @static
 * @async
 * @param {Object} datosMensaje - Datos del mensaje a crear.
 * @param {number} datosMensaje.id_asesoria - ID de la asesoría a la que pertenece el mensaje.
 * @param {number} datosMensaje.emisor_id - ID del usuario que envía el mensaje.
 * @param {'alumno' | 'asesor'} datosMensaje.emisor_tipo - Tipo de usuario que envía el mensaje.
 * @param {number} datosMensaje.receptor_id - ID del usuario que recibe el mensaje.
 * @param {'alumno' | 'asesor'} datosMensaje.receptor_tipo - Tipo de usuario que recibe el mensaje.
 * @param {string} datosMensaje.contenido - Contenido del mensaje.
 * 
 * @returns {Promise<Object>} Retorna el objeto del nuevo mensaje creado.
 * 
 * @throws {Error} Si ocurre un error al crear el mensaje.
 * 
 * @example
 * await MensajesModel.crearMensaje({
 *   id_asesoria: 5,
 *   emisor_id: 3,
 *   emisor_tipo: 'alumno',
 *   receptor_id: 2,
 *   receptor_tipo: 'asesor',
 *   contenido: 'Hola, ¿cómo estás?'
 * });
 */
  static async crearMensaje(datosMensaje) {
    try {
      const nuevoMensaje = await modelo_mensajes.create({
        id_asesoria: datosMensaje.id_asesoria,
        id_emisor: datosMensaje.id_emisor,
        emisor_tipo: datosMensaje.emisor_tipo,
        id_receptor: datosMensaje.id_receptor,
        receptor_tipo: datosMensaje.receptor_tipo,
        contenido: datosMensaje.contenido,
        estado: 'enviado',
        fecha_envio: datosMensaje.fecha_envio
      });
      return nuevoMensaje;
    } catch (error) {
      console.error('Error al crear mensaje:', error);
      throw error;
    }
  }

  // Obtener mensajes de un usuario (opcional)
  static async obtenerMensajesDeUsuario(usuarioId, usuarioTipo) {
    try {
      const mensajes = await modelo_mensajes.findAll({
        where: {
          [Op.or]: [
            { emisor_id: usuarioId, emisor_tipo: usuarioTipo },
            { receptor_id: usuarioId, receptor_tipo: usuarioTipo }
          ]
        },
        order: [['fecha_envio', 'DESC']]
      });
      return mensajes;
    } catch (error) {
      console.error('Error al obtener mensajes del usuario:', error);
      throw error;
    }
  }

 static async actualizarEstadoMensaje(id_mensaje, nuevoEstado) {
  try {
    const mensaje = await modelo_mensajes.findByPk(id_mensaje);
    if (!mensaje) {
      throw new Error(`Mensaje con ID ${id_mensaje} no encontrado.`);
    }

    mensaje.estado = nuevoEstado;
    await mensaje.save();

    return mensaje;
  } catch (error) {
    console.error('Error al actualizar estado del mensaje:', error);
    throw error;
  }
}

}
