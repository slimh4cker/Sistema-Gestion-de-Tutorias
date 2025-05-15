import { SolicitudModel } from '../../models/AmazonRDS/SolicitudModel.js';
import { AsesorModel } from '../../models/AmazonRDS/AsesorModel.js';
import { enviarMailAsignarSolicitud } from '../mail/enviarMailAsignarSolicitud.js';

const diaSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export async function asignacionAutomatica(solicitudId){
  const resultado = await algoritmoEjecucion(solicitudId);

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


async function algoritmoAsignacion(solicitudId) {
  // Obtener todas lass variables que ocupo de el modelo
  const solicitud = await SolicitudModel.getSolicitudById(solicitudId);
  const fechaLimite = new Date(solicitud.fecha_limite);
  const diaRequerido = diaSemana[fechaLimite.getDay()];
  const especializacion = solicitud.especializacion;

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

  // Prodeder con la asignacion
  const asesorAsignado = asesoresDisponibles[0]; // Asignar el primer asesor disponible
  
  // Asignar solicitud
  let resultado = null;
  try {
    resultado = await SolicitudModel.asignarAsesor(solicitudId, asesorAsignado.id);
  } catch (error) {
    return null
  }
  return resultado;
}