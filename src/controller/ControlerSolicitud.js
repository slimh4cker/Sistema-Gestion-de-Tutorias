/// Controler del recurso de asesorias
// Utilizar cuando se quiere alterar algo de una asesoria
import { SolicitudModel } from "../models/AmazonRDS/SolicitudModel.js"
import { AlumnoModel } from "../models/AmazonRDS/AlumnoModel.js"
import { validarSolicitud } from "../schemas/solicitud.js"
import { obtenerMailDeReq } from "../utils/request.js"
import { asignacionAutomatica } from "../utils/solicitudes/asignacion.js"

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
      const datos = await SolicitudModel.getSolicitudesPorEstado('inactivo')
      res.status(200).json(datos)

    } catch (error) {
      res.status(500).json({ error: "Error interno al buscar solicitudes sin asignar" })
      return
    }
  }

  static async getSolicitudesAsignadas(req, res) {
    try {
      const correo = obtenerMailDeReq(req)
      const datos = await SolicitudModel.getSolicitudesPorEstado(correo)
      res.status(200).json(datos)

    } catch (error) {
      res.status(500).json({ error: "Error interno al buscar solicitudes asignadas" })
      return
    }
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
            let resultadoAsignacion = null
            // Llamar a la asignación automática
            try {
                resultadoAsignacion = await asignacionAutomatica(solicitudCreada.id);
            } catch (error) {
                console.error("Error en la asignación automática:", error);
            }
            

            // Si todo sale bien
            res.status(201).json({ 
                message: "Solicitud creada y asignada correctamente",
                solicitud: solicitudCreada,
                asignacion: resultadoAsignacion
            });

        } catch (error) {
            console.error("Error en crearSolicitudDeAlumno:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async asignarAsesor(req, res){
        try{
            const {id_solicitud, id_asesor} = req.body
            const solicitudParse = parseInt(id_solicitud,10)
            const asesorParse = parseInt(id_asesor, 10)
            console.log(id_solicitud, id_asesor)

            if(!solicitudParse || !asesorParse){
                return res.status(400).json({error: "Datos invalidos"})
            }
            try {
                const asignarAsesoria = SolicitudModel.asignarAsesor(solicitudParse, asesorParse)
                if(!asignarAsesoria){
                    res.status(404).json("no se encontró la asesoria solicitada")
                }
                res.status(200).json({success: true, message: "Asesoria asignada corectamente"})
            }
            catch(error){
                return res.status(500).json({sucess: false, message: "Error al asignar la asesoria"})
            }
        }
        catch(error){
            return res.status(500).json({error: "Error al asignar el asesor", message:error})
            
        }
    }

    // Modificamos el método de asignación para hacerlo reutilizable
    static async asignarSolicitudAutomatica(req, res) {
        try {
            const { solicitudId } = req.params;
            
            if (!solicitudId || isNaN(solicitudId)) {
                if (res) return res.status(400).json({ error: "ID inválido" });
                throw new Error("ID inválido");
            }

            const resultado = await SolicitudModel.asignarAsesorAutomatico(solicitudId);

            if (resultado.error) {
                if (res) return res.status(404).json({ error: resultado.error });
                throw new Error(resultado.error);
            }

            // Enviar emails solo si es una llamada directa
            if (res) {
                try {
                    const alumno = await AlumnoModel.getAlumnoByMail(resultado.solicitud.estudiante_id);
                    const mail_asesor = resultado.asesor.email;
                    const mail_alumno = alumno.email;

                    await sendMail(mail_alumno, 'asesoriaAsignadaAlumno', {
                        nombre_asesoria: resultado.solicitud.tema,
                        nombre_asesor: resultado.asesor.nombre,
                        fecha: resultado.solicitud.fecha_limite
                    });

                    await sendMail(mail_asesor, 'asesoriaAsignadaAsesor', {
                        nombre_asesoria: resultado.solicitud.tema,
                        nombre_alumno: alumno.nombre,
                        fecha: resultado.solicitud.fecha_limite
                    });
                } catch (emailError) {
                    console.error("Error enviando emails:", emailError);
                }
            }

            const respuesta = {
                id_solicitud: resultado.solicitud.id,
                id_asesor: resultado.asesor.id,
                estado: resultado.nuevoEstado,
                fecha_asignacion: new Date().toISOString()
            };

            if (res) {
                res.status(200).json(respuesta);
            } else {
                return respuesta;
            }

        } catch (error) {
            console.error("Error en asignación automática:", error);
            if (res) {
                res.status(500).json({ error: error.message });
            } else {
                throw error;
            }
        }
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
        const solicitudes = await SolicitudModel.getSolicitudesPorEstado(estado, correo);
        
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