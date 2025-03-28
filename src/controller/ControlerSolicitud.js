/// Controler del recurso de asesorias
// Utilizar cuando se quiere alterar algo de una asesoria
import { SolicitudModel } from "../model/SolicitudModel.js"


export class SolicitudControler {
  // Obtiene todas las solicitudes de un alumno en especifico
  static async getTodasSolicitudesDeAlumno(req, res) {
    const correo = obtenerMailDeReq(req)

    try {
      const datos = SolicitudModel.getSolicitudesDeAlumno(correo)
    } catch (s) {
      res.status(500).json({ error: "Error interno al buscar solicitudes del alumno" })
      return
    }
    

    res.status(200).json(datos)
  }

  // Obtiene las solicitudes que no han sido asignadas a ningun asesor
  static async getSolicitudesSinAsignar(req, res) {
    try {
      const datos = SolicitudModel.getSolicitudesSinAsignar()
    } catch (s) {
      res.status(500).json({ error: "Error interno al buscar solicitudes del alumno" })
      return
    }
    
    res.status(200).json(datos)
  }

  // Crea una solicitud
  static async crearSolicitudPorAlumno(req, res) {



  }
}