import { modelo_cuenta_estudiante, modelo_cuenta_asesor } from "./Modelo_cuentas.js";
import { modelo_asesorias, modelo_solicitud} from "./Modelo_datos.js";

export class AsesoriaModel{
    // Método que obtiene las asesorias relacinandas al correo de un alumno
    /**
 * Obtiene las asesorías relacionadas al correo de un alumno con las tablas de solicitud y cuenta de estudiante.
 * @static
 * @async
 * @param {string} email - Correo electrónico del alumno.
 * @returns {Promise<Object>} Objeto con los datos de la asesoría o null si no existe.
 * @throws {Error} Si ocurre un error en la consulta.
 */
    static async getAseoriaByAlumnoEmail(email) {
        try {
            const asesorias = await modelo_asesorias.findAll({
                include: [{
                    model: modelo_solicitud,
                    required: true,
                    include: [{
                        model: modelo_cuenta_estudiante,
                        where: { email: email }
                    }, {
                        model: modelo_cuenta_asesor,
                        attributes: ['nombre', 'email', 'area_especializacion']
                    }]
                }],
                where: {
                    estado: 'asignada'
                }
            });
            
            return asesorias.map(a => ({
                id: a.id,
                tema: a.modelo_solicitud.tema,
                profesor: a.modelo_solicitud.modelo_cuenta_asesor.nombre,
                fecha_limite: a.modelo_solicitud.fecha_limite,
                tipo: a.modelo_solicitud.modalidad === 'teorica' ? 'T' : 'A'
            }));
        } catch (error) {
            console.error("Error en getAseoriaByAlumnoEmail:", error);
            return [];
        }
    }

    /**
 * Obtiene todas las solicitudes de asesoría pendientes con detalles extendidos de estudiantes y asesores,
 * incluyendo solo cuentas activas de estudiantes. Devuelve los resultados en un formato estructurado.
 * @static
 * @async
 * @returns {Promise<Array|boolean>} Array de objetos formateados con la información de las solicitudes pendientes,
 * o false si no hay resultados.
 * @throws {Error} Si falla la consulta.
 */
    static async obtenerSolicitudesPendientesByAsesor(email_asesor){
        const pendientes = await modelo_asesorias.findAll({
            attributes: ['id', 'solicitud_id', 'estado', 'fecha_creacion'],
            include: [{
                model: modelo_solicitud,
                requrided: true,
                attributes: ['id', 'estudiante_id', 'asesor_id', 'tema', 'observaciones', 'fecha_limite', 'modalidad', 'nivel_urgencia', 'estado'],
                include: [{
                    model: modelo_cuenta_estudiante,
                    requrided: true,
                        attributes: ['id', 'nombre', 'email'],
                    },
                    {
                        model: modelo_cuenta_asesor,
                        requrided: true,
                        attributes: ['id', 'nombre', 'email','area_especializacion','disponibilidad'],
                        where: {
                            email: email_asesor
                        }
                }]
            }],
            where: {
                estado: 'pendiente'
            }
        })
        console.log(pendientes)
        if (!pendientes || pendientes.length === 0){
            return false
        }
        
        return pendientes.map(pendiente => ({
            id_asesoria: pendiente.id,
            estado: pendiente.estado,
            fecha_creacion: pendiente.fecha_creacion,
            solicitud: {
                id_solicitud: pendiente.modelo_solicitud.id,
                tema: pendiente.modelo_solicitud.tema,
                observaciones: pendiente.modelo_solicitud.observaciones, 
                fecha_limite: pendiente.modelo_solicitud.fecha_limite,
                modalidad: pendiente.modelo_solicitud.modalidad,
                nivel_urgencia: pendiente.modelo_solicitud.nivel_urgencia,
                estado: pendiente.modelo_solicitud.estado,
                estudiante: {
                    id_estudiante: pendiente.modelo_solicitud.modelo_cuenta_estudiante.id,
                    nombre: pendiente.modelo_solicitud.modelo_cuenta_estudiante.nombre,
                    email: pendiente.modelo_solicitud.modelo_cuenta_estudiante.email,

                },
                asesor: {
                    id_asesor: pendiente.modelo_solicitud.modelo_cuenta_asesor.id,
                    nombre: pendiente.modelo_solicitud.modelo_cuenta_asesor.nombre,
                    email: pendiente.modelo_solicitud.modelo_cuenta_asesor.email,
                    area_especializacion: pendiente.modelo_solicitud.modelo_cuenta_asesor.area_especializacion,
                    disponibilidad: pendiente.modelo_solicitud.modelo_cuenta_asesor.disponibilidad
                }
            }
        }))
    }

    /**
* NOTA IMPORTANTE - este metodo lo utiliza la clase SolicitudModel, no se recomienda utilizar
de manera aislada.
*
 * Crea una nueva asesoría en la base de datos con los datos proporcionados.
 * @static
 * @async
 * @param {Object} datos - Objeto con los campos requeridos para la creación de la asesoría.
 * @returns {Promise<Object>} Instancia de la asesoría creada.
 * @throws {Error} Si falla la creación.
 */
    static async agregarAsesoria(solicitud_id){
        if(!solicitud_id){
            console.error("No se encontro la ID de solicitud")
            return false
        }
        const asesoria = await modelo_asesorias.create({
            solicitud_id: solicitud_id,
            fecha_creacion: new Date(),
            estado: 'pendiente'
        })
        if(!asesoria){
            console.error("Error al crear la asesoria")
            return false
        }
        return true
    }

    static async actualizarAsesoria(id, nuevosDatos) {
        try {
            // 1. Actualizar la asesoría
            const [filasActualizadas] = await modelo_asesorias.update(nuevosDatos, {
                where: { id }
            });
    
            // 2. Si no se actualizó nada, retornar null
            if (filasActualizadas === 0) return null;
    
            // 3. Obtener la asesoría actualizada con sus relaciones
            const asesoriaActualizada = await modelo_asesorias.findByPk(id, {
                include: [{
                    model: modelo_solicitud,
                    include: [
                        { model: modelo_cuenta_estudiante },
                        { model: modelo_cuenta_asesor }
                    ]
                }]
            });
    
            return asesoriaActualizada;
    
        } catch (error) {
            console.error("Error en actualizarAsesoria:", error);
            throw new Error("Error al actualizar la asesoría", error);
        }
    }
}
