/// Controler del recurso de asesorias
// Utilizar cuando se quiere alterar algo de una asesoria
import { SolicitudModel } from "../models/AmazonRDSs/AmazonRDS/SolicitudModel.js"
import { AlumnoModel } from "../models/AmazonRDS/AlumnoModel.js"
import { validarSolicitud } from "../schemas/solicitud.js"
import { obtenerMailDeReq } from "../utils/request.js"

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
    

    res.status(200).json(datos)
  }

  static async getTodasLasSolicitudes(req, res) {
    try {
        const solicitudes = await SolicitudModel.getTodasSolicitudes();

        if (!solicitudes || solicitudes.length === 0) {
            return res.status(404).json({ error: "No hay solicitudes registradas" });
        }

        res.status(200).json(solicitudes);
    } catch (error) {
        console.error("Error en getTodasLasSolicitudes:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

  static async cambiarEstadoSolicitud(req, res) {
    const id = req.query.id;
    const { estado } = req.body;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "ID de solicitud inválido o no proporcionado" });
    }

    if (!estado || !['pendiente', 'asignada', 'activo', 'inactivo', 'finalizada'].includes(estado)) {
        return res.status(400).json({ error: "Estado inválido o no proporcionado" });
    }

    try {
        const solicitudActualizada = await SolicitudModel.actualizarEstadoSolicitud(id, estado);

        if (!solicitudActualizada) {
            return res.status(404).json({ error: "Solicitud no encontrada" });
        }

        res.status(200).json({
            message: "Estado actualizado correctamente",
            solicitud: solicitudActualizada
        });
    } catch (error) {
        console.error("Error en cambiarEstadoSolicitud:", error);
        res.status(500).json({ error: "Error interno del servidor" });
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
            estudiante_id: alumno.id,
            asesor_id: dataBody.asesor_id,
            tema: dataBody.tema,
            observaciones: dataBody.observaciones,
            fecha_limite: dataBody.fecha_limite,
            modalidad: dataBody.modalidad,
            nivel_urgencia: dataBody.nivel_urgencia,
            estado: "inactivo"
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

  static async getSolicitudesFiltradas(req, res) {
    try {
        const correo = obtenerMailDeReq(req);
        const estado = req.query.estado; // Obtiene el parámetro de query
        
        // Validar estado
        if (!estado || !['asignada', 'pendiente', 'activo'].includes(estado)) {
            return res.status(400).json({ error: "Parámetro 'estado' inválido. Valores permitidos: asignada, pendiente" });
        }

        // Obtener solicitudes
        const solicitudes = await SolicitudModel.getSolicitudesPorEstado(correo, estado);
        
        if (!solicitudes || solicitudes.length === 0) {
            return res.status(404).json({ error: "No se encontraron solicitudes" });
        }

        res.status(200).json(solicitudes);
    } catch (error) {
        console.error("Error en getSolicitudesFiltradas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}
}