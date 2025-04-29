/// Controler del recurso de asesorias
// Utilizar cuando se quiere alterar algo de una asesoria
import { SolicitudModel } from "../models/AmazonRDS/SolicitudModel.js"
import { validarSolicitud } from "../schemas/solicitud.js"

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
    try {
        const correo = obtenerMailDeReq(req);
        const dataBody = req.body;

        if (!validarSolicitud(dataBody)) {
            return res.status(400).json({ error: "Solicitud no válida" });
        }

        const alumno = await AlumnoModel.getAlumnoByMail(correo);
        if (!alumno) {
            return res.status(404).json({ error: "Alumno no encontrado" });
        }

        const datosSolicitud = {
            estudiante_id: alumno.id, // <-- ID obtenido de la BD
            asesor_id: dataBody.asesor_id,
            tema: dataBody.tema,
            observaciones: dataBody.observaciones,
            fecha_limite: dataBody.fecha_limite,
            modalidad: dataBody.modalidad,
            nivel_urgencia: dataBody.nivel_urgencia,
            estado: "pendiente"
        };

        const solicitudCreada = await SolicitudModel.agregarSolicitud(datosSolicitud);
        if (!solicitudCreada) {
            return res.status(500).json({ error: "Error al crear la solicitud" });
        }

        res.status(201).json({ 
            message: "Solicitud creada correctamente",
            solicitud: solicitudCreada 
        });

    } catch (error) {
        console.error("Error en crearSolicitudDeAlumno:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}
  
  static async asignarSolicitud(req, res) {
    // TODO entender como se asigan las solicitudes
  }
}