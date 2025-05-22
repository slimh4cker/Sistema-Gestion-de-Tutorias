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

    static async buscarSolicitud(id) {
    const buscar_solicitud = await modelo_solicitud.findOne({
        attributes: [
            'id',
            'estudiante_id',
            'asesor_id',
            'tema',
            'observaciones', 
            'fecha_limite', 
            'modalidad', 
            'nivel_urgencia', 
            'estado'
        ],
        include: [
            {
                model: modelo_cuenta_estudiante,
                attributes: []
            },
            {
                model: modelo_cuenta_asesor,
                attributes: []
            }
        ],
        where: {
            id: id
        },
        raw: true
    });

    if (!buscar_solicitud) {
        return null;
    }

    return buscar_solicitud;
}
    static async asignarAsesorAutomatico(solicitudId) {
        const transaction = await sequelize.transaction();
        try {
            const solicitud = await modelo_solicitud.findByPk(solicitudId, {
                include: [modelo_cuenta_estudiante],
                transaction
            });

            if (!solicitud || solicitud.estado !== 'pendiente') {
                throw new Error('Solicitud no válida para asignación');
            }

            const fechaLimite = new Date(solicitud.fecha_limite);
            const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            const diaRequerido = diasSemana[fechaLimite.getDay()];

            const asesoresCompatibles = await AsesorModel.getAsesoresDisponibles(diaRequerido, )

            if (asesoresCompatibles.length === 0) {
                await transaction.rollback();
                return null;
            }

            let asesorAsignado = asesoresCompatibles[0];
            
            // Fallback: Buscar cualquier asesor activo
            if (!asesorAsignado) {
                asesorAsignado = await modelo_cuenta_asesor.findOne({
                    where: { estado: 'activo' },
                    order: [
                        [sequelize.literal(`LENGTH(area_especializacion)`), 'ASC'],
                        ['area_especializacion', 'ASC']
                    ],
                    transaction
                });
            }

            if (!asesorAsignado) {
                await transaction.rollback();
                return { error: 'No hay asesores disponibles' };
            }

            await modelo_solicitud.update({
                asesor_id: asesorAsignado.id,
                estado: 'asignada'
            }, {
                where: { id: solicitudId },
                transaction
            });

            const asignacionesActivas = await modelo_solicitud.count({
                where: {
                    asesor_id: asesorAsignado.id,
                    estado: 'asignada'
                },
                transaction
            });

            if (asignacionesActivas >= 5) {
                await modelo_cuenta_asesor.update({
                    disponibilidad: null,
                    estado: 'inactivo'
                }, {
                    where: { id: asesorAsignado.id },
                    transaction
                });
            }

            await transaction.commit();
            
            return {
                solicitud: solicitud,
                asesor: asesorAsignado,
                nuevoEstado: 'asignada',
            };

        } catch (error) {
            await transaction.rollback();
            console.error('Error en asignación automática:', error);
            throw error;
        }
    }
    /**
     * Obtiene una lista de solicitudes filtradas por estado y, opcionalmente, por el email del estudiante.
     *
     * @param {string} estado - El estado de las solicitudes que se desean obtener (por ejemplo: "pendiente", "aprobado", etc.).
     * @param {string|null} [email=null] - (Opcional) El email del estudiante para filtrar las solicitudes. 
     *                                     Si no se proporciona, se incluyen solicitudes de todos los estudiantes.
     * @returns {Promise<Array<Object>|null>} Una promesa que resuelve a un arreglo de objetos con la información de cada solicitud,
     *                                        o `null` si ocurre un error.
     *
     * Cada objeto de solicitud tiene la siguiente estructura:
     * {
     *   id: number,
     *   tema: string,
     *   estado: string,
     *   estudiante: {
     *     nombre: string,
     *     email: string
     *   } | null,
     *   asesor: {
     *     nombre: string,
     *     especializacion: string
     *   } | null
     * }
     */
    static async getSolicitudesPorEstado(estado, email = null) {
    try {
        const includeOptions = [
            {
                model: modelo_cuenta_estudiante,
                attributes: ['nombre', 'email'],
                ...(email && { where: { email: email } })  // Agrega la condición solo si se proporciona email
            },
            {
                model: modelo_cuenta_asesor,
                attributes: ['nombre', 'email', 'area_especializacion']
            }
        ];

        const solicitudes = await modelo_solicitud.findAll({
            attributes: ['id', 'tema', 'observaciones', 'fecha_limite', 'modalidad', 'nivel_urgencia', 'estado'],
            include: includeOptions,
            where: { estado: estado }
        });

        return solicitudes.map(s => ({
            id: s.id,
            tema: s.tema,
            estado: s.estado,
            estudiante: s.modelo_cuenta_estudiante ? {
                nombre: s.modelo_cuenta_estudiante.nombre,
                email: s.modelo_cuenta_estudiante.email
            } : null,
            asesor: s.modelo_cuenta_asesor ? {
                nombre: s.modelo_cuenta_asesor.nombre,
                especializacion: s.modelo_cuenta_asesor.area_especializacion
            } : null
        }));
    } catch (error) {
        throw new Error("Error en getSolicitudesPorEstado:", error);
    }
}


    static async getTodasSolicitudes() {
        try {
            const solicitudes = await modelo_solicitud.findAll({
                attributes: ['id', 'tema', 'observaciones', 'fecha_limite', 'modalidad', 'nivel_urgencia', 'estado'],
                include: [
                    {
                        model: modelo_cuenta_estudiante,
                        attributes: ['id', 'nombre', 'email']
                    },
                    {
                        model: modelo_cuenta_asesor,
                        attributes: ['id', 'nombre', 'email', 'area_especializacion']
                    }
                ]
            });
    
            return solicitudes.map(s => ({
                id: s.id,
                tema: s.tema,
                observaciones: s.observaciones,
                fecha_limite: s.fecha_limite,
                modalidad: s.modalidad,
                nivel_urgencia: s.nivel_urgencia,
                estado: s.estado,
                estudiante: s.modelo_cuenta_estudiante ? {
                    id: s.modelo_cuenta_estudiante.id,
                    nombre: s.modelo_cuenta_estudiante.nombre,
                    email: s.modelo_cuenta_estudiante.email
                } : null,
                asesor: s.modelo_cuenta_asesor ? {
                    id: s.modelo_cuenta_asesor.id,
                    nombre: s.modelo_cuenta_asesor.nombre,
                    email: s.modelo_cuenta_asesor.email,
                    area_especializacion: s.modelo_cuenta_asesor.area_especializacion
                } : null
            }));
        } catch (error) {
            console.error("Error en getTodasSolicitudes:", error);
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
    static async agregarSolicitud(datos) {
        try {
            // 1. Eliminar el campo 'id' si existe (para evitar inserción manual)
            const { id, ...data } = datos;
            if (!data.estado) {
                data.estado = 'pendiente';
            }
    
            // 2. Crear la solicitud en la base de datos
            const solicitudCreada = await modelo_solicitud.create(data);
    
            if (!solicitudCreada) {
                console.error("Error: No se pudo crear la solicitud");
                return false;
            }
    
            // 3. Crear la asesoría asociada (con await para manejar errores)
            const asesoriaCreada = await AsesoriaModel.agregarAsesoria(solicitudCreada.id);
    
            if (!asesoriaCreada) {
                console.error("Error: No se pudo crear la asesoría asociada");
                // Opcional: Revertir la creación de la solicitud si falla la asesoría
                await solicitudCreada.destroy();
                return false;
            }
    
            console.log("Solicitud y asesoría creadas correctamente");
            return solicitudCreada;
    
        } catch (error) {
            console.error("Error crítico en agregarSolicitud:", error.message);
            return false;
        }
    }

    static async asignarAsesor(solicitudId, asesorId) {
        try {
            const solicitud = await modelo_solicitud.findByPk(solicitudId);
            if (!solicitud) {
                throw new Error('Solicitud no encontrado', solicitudId);
            }
            const asesor = await modelo_cuenta_asesor.findByPk(asesorId);
            if (!asesor) {
                throw new Error('Asesor no encontrado', asesorId);
            }
            solicitud.asesor_id = asesorId;
            solicitud.estado = 'activo';
            await solicitud.save();
            return solicitud;
        } catch (error) {  
            console.error("Error en asignarAsesor:", error);
            throw new Error("Error al asignar asesor", error);
        }

    }
    
    static async actualizarEstadoSolicitud(id, nuevoEstado) {
        try {
            const solicitud = await modelo_solicitud.findByPk(id);
    
            if (!solicitud) {
                return null;
            }
    
            solicitud.estado = nuevoEstado;
            await solicitud.save();
    
            return solicitud;
        } catch (error) {
            console.error("Error en actualizarEstadoSolicitud:", error);
            return false;
        }
    }
    static async actualizarSolicitud(id, nuevosDatos){
        try {
            const [filasActualizadas] = await modelo_solicitud.update(nuevosDatos, {
                where: { id }
            });
    
            if (filasActualizadas === 0) return null;
            return filasActualizadas;
    
        } catch (error) {
            console.error("Error en actualizarSolicitud:", error);
            return null;
        }
    }
}