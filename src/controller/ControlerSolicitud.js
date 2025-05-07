/// Controler del recurso de asesorias
// Utilizar cuando se quiere alterar algo de una asesoria
import { SolicitudModel } from "../models/AmazonRDS/SolicitudModel.js"
import { validarSolicitud } from "../schemas/solicitud.js"
import { obtenerIdDeReq } from "../utils/request.js"

export class SolicitudControler {
  // Obtiene todas las solicitudes de un alumno en especifico
  static async getTodasSolicitudesDeAlumno(req, res) {
    try {
      const correo = obtenerMailDeReq(req)
      const datos = await SolicitudModel.getSolicitudesDeAlumno(correo)
      res.status(200).json(datos)   
        
    } catch (e) {
      res.status(500).json({ error: "Error interno al buscar solicitudes del alumno" })
      return
    }
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

  /*
   Crea una solicitud
   Los datos que envia son lo siguiente:
   {
     "modalidad": "en_linea",
     "tema": "calculo integral",
     "fecha_limite": "13-4-2025",
     "observaciones": "ninguna",
     "estudiante_id": 5
   }
   y el id es el obtenido en el token
  */

  static async crearSolicitudDeAlumno(req, res) {
    const id = obtenerIdDeReq(req)
    const datos = req.body
    const datos_completos = (datos.estudiante_id = id)

    // validar solicitud
    if (!validarSolicitud(datos_completos)) {
      res.status(400).json({ error: "Solicitud no valida" })
      return
    }

    // crear solicitud
    try {
      await SolicitudModel.agregarSolicitud(datos)
    } catch (error) {
      res.status(500).json({ error: "Error interno al crear solicitud" })
      return
    }

    // enviar mensaje de que funciono correctamente
    res.status(201).json({ message: "Solicitud creada correctamente" })
  }
  
  static async asignarSolicitud(req, res) {
    // TODO entender como se asigan las solicitudes
  }
}