import {sendMail} from './sendmail.js';
import { SolicitudModel } from '../../models/AmazonRDS/SolicitudModel.js';
import { AsesorModel } from '../../models/AmazonRDS/AsesorModel.js';
import { AlumnoModel } from '../../models/AmazonRDS/AlumnoModel.js';


/**
 * Envía un correo electrónico al asesor y al alumno recuperados de una solicitud.
 * @param {string} solicitudId - ID de la solicitud.
 * @returns {Promise<void>} - Promesa que se resuelve cuando se envían los correos.
 * @throws {Error} - Si no se encuentra la solicitud, si no cuenta con los campos correctos o si ocurre un error al enviar el correo.
 */
export async function enviarMailAsignarSolicitud(solicitudId) {
  // Obtener todas lass variables que ocupo de el modelo
  const solicitud = await SolicitudModel.buscarSolicitud(solicitudId);
  if (solicitud === null) {
    console.error("Al intentar enviar un correo no se encontró la solicitud con ID:", solicitudId);
    return null;
  }
  const alumno = await AlumnoModel.getAlumnoById(solicitud.estudiante_id);
  const asesor = await AsesorModel.getAsesorById(solicitud.asesor_id);

  // Enviar correo al asesor
  await sendMail(asesor.email, 'asesoriaAsignadaAsesor', {
    nombre_asesoria: solicitud.tema,
    nombre_alumno: alumno.nombre,
    fecha: solicitud.fecha_limite
  });
  await sendMail(alumno.email, 'asesoriaAsignadaAlumno', {
    nombre_asesoria: solicitud.tema,
    nombre_asesor: asesor.nombre,
    fecha: solicitud.fecha_limite
  });
}