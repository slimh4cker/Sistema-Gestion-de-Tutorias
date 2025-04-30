import { sequelize } from "../../utils/database_connection.js";
import { AsesoriaModel } from "./AsesoriaModel.js"
import { modelo_cuenta_asesor, modelo_cuenta_estudiante } from "./Modelo_cuentas.js";
import { modelo_solicitud } from "./Modelo_datos.js";

export class SolicitudModel{

    /**
     * 
     * Método que obtiene todos los datos necesarios de la solicitud del alumno
     * que require asesoria
     * @param {string} email 
     * @returns {JSON}
     */
    static async getSolicitudesDeAlumno(email){
        if(!email){
            console.error(`El parametro ${email} es requerido`)
            return false
        }
        try {
        const solicitudes = await modelo_solicitud.findAll({
            attributes: ['estudiante_id', 'asesor_id','tema', 'observaciones', 'fecha_limite', 'modalidad', 'nivel_urgencia', 'estado'],
            include:[{
                        model: modelo_cuenta_estudiante,
                        attributes: ['id', 'nombre', 'email'],
                        where: {
                            email: email,
                            estado: 'activo'
                            },
                            
                    },
                    {
                        model: modelo_cuenta_asesor,
                        attributes: ['id', 'nombre', 'email','area_especializacion','disponibilidad']
                    }]
        })
        if( !solicitudes || solicitudes.length === 0){
            return false
        }
        return solicitudes.map(s => {
            const solicitud = s.dataValues;
            return {
                tema: solicitud.tema,
                observaciones: solicitud.observaciones,
                fecha_limite: solicitud.fecha_limite,
                modalidad: solicitud.modalidad,
                nivel_urgencia: solicitud.nivel_urgencia,
                estado: solicitud.estado,
                estudiante: {
                        id: solicitud.modelo_cuenta_estudiante.id,
                        nombre: solicitud.modelo_cuenta_estudiante.nombre,
                        email: solicitud.modelo_cuenta_estudiante.email
                    },
                asesor: {
                        id: solicitud.modelo_cuenta_asesor.id,
                        nombre: solicitud.modelo_cuenta_asesor.nombre,
                        email: solicitud.modelo_cuenta_asesor.email,
                        area_especializacion: solicitud.modelo_cuenta_asesor.area_especializacion,
                        disponibilidad: solicitud.modelo_cuenta_asesor.disponibilidad
                    }
            };
        });
    }
        catch(error){
            console.error(`Error en getSolicitudesDeAlumno: ${error}`)
        }
    }

    static async buscarSolicitud(id){
        const buscar_solicitud = await modelo_solicitud.findOne({
            attributes: ['id',
            [sequelize.col("modelo_cuenta_estudiante.nombre"),'estudiante_id'],
            [sequelize.col("modelo_cuenta_asesor.nombre"),'asesor_id'],
            'tema',
            'observaciones', 
            'fecha_limite', 
            'modalidad', 
            'nivel_urgencia', 
            'estado'],
            include:{
                model: modelo_cuenta_estudiante,
                attributes: []
            },
            include: {
                model: modelo_cuenta_asesor,
                attributes: []
            },
            where: {
                id: id
            },
        })
        return JSON.stringify(buscar_solicitud, null, 1)
    }

    static async getSolicitudesPorEstado(email, estado) {
        try {
            const solicitudes = await modelo_solicitud.findAll({
                attributes: ['id', 'tema', 'observaciones', 'fecha_limite', 'modalidad', 'nivel_urgencia', 'estado'],
                include: [
                    {
                        model: modelo_cuenta_estudiante,
                        attributes: ['nombre', 'email'],
                        where: { email: email }
                    },
                    {
                        model: modelo_cuenta_asesor,
                        attributes: ['nombre', 'email', 'area_especializacion']
                    }
                ],
                where: { estado: estado }
            });

            return solicitudes.map(s => ({
                id: s.id,
                tema: s.tema,
                estado: s.estado,
                estudiante: {
                    nombre: s.modelo_cuenta_estudiante.nombre,
                    email: s.modelo_cuenta_estudiante.email
                },
                asesor: s.modelo_cuenta_asesor ? {
                    nombre: s.modelo_cuenta_asesor.nombre,
                    especializacion: s.modelo_cuenta_asesor.area_especializacion
                } : null
            }));
        } catch (error) {
            console.error("Error en getSolicitudesPorEstado:", error);
            return null;
        }
    }

    /**
 * Agrega una nueva solicitud y, en caso de éxito, también registra una asesoría asociada.
 *
 * Este método es asíncrono. Primero intenta crear un registro en la tabla de solicitudes 
 * usando los datos proporcionados. Si la solicitud se guarda correctamente, luego intenta 
 * registrar una asesoría asociada utilizando el ID de la solicitud recién creada.
 *
 * @param {Object} datos - Objeto que contiene la información necesaria para crear la solicitud.
 * @returns {Promise<Object|boolean>} Devuelve el objeto de la solicitud creada si todo fue exitoso,
 * o `false` si ocurre un error en alguna de las operaciones.
 *
 * @example
 * const nuevaSolicitud = await SolicitudesModel.agregarSolicitud({
 *  estudiante_id: "2",
    asesor_id: "2",
    tema: "Calculo vectorial",
    observaciones: "ninguna",
    fecha_limite: Date.now(),
    modalidad: "presencial",
    nivel_urgencia: "media"
 * });
 */
    static async agregarSolicitud(datos){
            const agregar_solicitud = await modelo_solicitud.create(datos)
            if(!agregar_solicitud){
                console.error("error al agregar solicitud")
                return false
            }
            const agregar_asesoria = AsesoriaModel.agregarAsesoria(agregar_solicitud.dataValues.id)
            
            if(agregar_asesoria === false){
                console.error("Error al agregar la solicitud")
                return false
            }
            console.log("Solicitud agregada correctamente")
            return agregar_solicitud
        }
            
}