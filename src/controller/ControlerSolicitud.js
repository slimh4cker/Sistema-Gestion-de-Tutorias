/// Controler del recurso de asesorias
// Utilizar cuando se quiere alterar algo de una asesoria
import { SolicitudModel } from "../model/SolicitudModel.js"
import { validarSolicitud } from "../schemas/solicitud.js"} 

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
    } catch (error) {
      res.status(500).json({ error: "Error interno al buscar solicitudes sin asignar" })
      return
    }
    
    res.status(200).json(datos)
  }

  // Crea una solicitud
  static async crearSolicitudDeAlumno(req, res) {
    const correo = obtenerMailDeReq(req)

    datos = req.body

    // validar solicitud
    if (!validarSolicitud(datos)) {
      res.status(400).json({ error: "Solicitud no valida" })
      return
    }

    // crear solicitud
    try {
      const datos = SolicitudModel.crearSolicitudDeAlumno(correo, datos)
    } catch (error) {
      res.status(500).json({ error: "Error interno al crear solicitud" })
      return
    }

    // enviar mensaje de que funciono correctamente
    res.status(201).json({ message: "Solicitud creada correctamente" })

  }
}