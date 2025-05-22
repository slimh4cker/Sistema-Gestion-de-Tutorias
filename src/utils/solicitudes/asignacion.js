import { SolicitudModel } from '../../models/AmazonRDS/SolicitudModel.js';
import { AsesorModel } from '../../models/AmazonRDS/AsesorModel.js';
import { enviarMailAsignarSolicitud } from '../mail/enviarMailAsignarSolicitud.js';

const diaSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

/**
 * Intenta asignar automáticamente un asesor a una solicitud específica según su ID.
 * Si no se logra asignar o hay un error al enviar el correo, retorna `null`.
 *
 * @async
 * @function asignacionAutomatica
 * @param {number|string} solicitudId - ID de la solicitud que se desea asignar.
 * @returns {Promise<null|any>} - Retorna `null` si falla o el resultado de la asignación si tiene éxito.
 */

export async function asignacionAutomatica(solicitudId){
  const resultado = await algoritmoAsignacion(solicitudId);

  // Si no se logro
  if (resultado === null) {
    return null
  }

  // Habiendo asignado, se procede a enviar los correos
  try {
    await enviarMailAsignarSolicitud(solicitudId);
  } catch (error) {
    console.error("Error enviando correos:", error);
    return null
  }

}

/**
 * Algoritmo que busca un asesor disponible y asigna la solicitud al primero que cumpla con los criterios.
 * Si no hay asesores disponibles o hay errores en el proceso, retorna `null`.
 *
 * @async
 * @function algoritmoAsignacion
 * @param {number|string} solicitudId - ID de la solicitud que se intenta asignar.
 * @returns {Promise<null|any>} - Resultado de la asignación o `null` si falla.
 */
async function algoritmoAsignacion(solicitudId) {
  // Obtener todas las variables que ocupo de el modelo
  const solicitud = await SolicitudModel.buscarSolicitud(solicitudId);
  if (solicitud === null) {
    console.error("Al intentar asignar una solicitud no se encontró la solicitud con ID:", solicitudId);
    return null;
  }
  const fechaLimite = new Date(solicitud.fecha_limite);
  console.log("La fecha limite es: ", fechaLimite)
  const diaRequerido = diaSemana[fechaLimite.getDay()];
  console.log("El dia requerido es: ", diaRequerido)
  const especializacion = solicitud.tema;
  let asesoresDisponibles = [];
  try {
    asesoresDisponibles = await AsesorModel.getAsesoresDisponibles(diaRequerido, especializacion);
  } catch (error) {
    return null
  }
  

  // Ver si hay asesores disponibles
  if (asesoresDisponibles.length === 0) {
    return null // no se le encontro asignacion valida
  }

  // Proceder con la asignacion
  const asesorAsignado = asesoresDisponibles[0]; // Asignar el primer asesor disponible
  
  // Asignar solicitud el asesor
  let resultado = null;
  try {
    resultado = await SolicitudModel.asignarAsesor(solicitudId, asesorAsignado.id);
  } catch (error) {
    return null
  }
  return resultado;
}