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
    static async getAseoriaByAlumnoEmail(email){
        const asesoria_alumno_email = await modelo_asesorias.findOne({
            include: [{ // Include es un INNER JOIN 
                model: modelo_solicitud,
                include: [{
                    model: modelo_cuenta_estudiante,
                    where: {
                        email: email
                    }
                }],
            }],
        })
        return asesoria_alumno_email.dataValues
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
    static async obtenerSolicitudesPendientes(){
        const pendientes = await modelo_asesorias.findAll({
            attributes: ['id', 'solicitud_id', 'estado', 'fecha_creacion'],
            include: [{
                model: modelo_solicitud,
                attributes: ['id', 'estudiante_id', 'asesor_id', 'tema', 'observaciones', 'fecha_limite', 'modalidad', 'nivel_urgencia', 'estado'],
                include: [{
                    model: modelo_cuenta_estudiante,
                        attributes: ['id', 'nombre', 'email'],
                        where: {
                            estado: 'activo'
                            },
                    },
                    {
                        model: modelo_cuenta_asesor,
                        attributes: ['id', 'nombre', 'email','area_especializacion','disponibilidad']
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
                id: pendiente.modelo_solicitud.id,
                tema: pendiente.modelo_solicitud.tema,
                observaciones: pendiente.modelo_solicitud.observaciones, 
                fecha_limite: pendiente.modelo_solicitud.fecha_limite,
                modalidad: pendiente.modelo_solicitud.modalidad,
                nivel_urgencia: pendiente.modelo_solicitud.nivel_urgencia,
                estado: pendiente.modelo_solicitud.estado,
                estudiante: {
                    id: pendiente.modelo_solicitud.modelo_cuenta_estudiante.id,
                    nombre: pendiente.modelo_solicitud.modelo_cuenta_estudiante.nombre,
                    email: pendiente.modelo_solicitud.modelo_cuenta_estudiante.email,

                },
                asesor: {
                    id: pendiente.modelo_solicitud.modelo_cuenta_asesor.id,
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
            solicitud_id: solicitud_id
        })
        if(!asesoria){
            console.error("Error al crear la asesoria")
            return false
        }
        return true
    }
}