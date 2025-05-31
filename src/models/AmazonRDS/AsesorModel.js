import { ParseStatus } from "zod";
import { Sequelize } from 'sequelize';
import { modelo_cuenta_asesor} from "./Modelo_cuentas.js";
import { hashPassword } from '../../utils/security.js';

// Clase del alumno encargada de interactuar con la base de datos

export class AsesorModel{
    // Metodo para obtener un alumno por su correo
    /**
     * 
     * @param {String} email 
     * @returns {JSON}
     * @example
     * AsesorModelo.getAsesorByMail("email@example.com")
     */
    static async getAsesorByMail(email) {
        const correo_asesor = await modelo_cuenta_asesor.findOne({
            where: {
                email: email,// unicamente se necesita buscar por correo
                estado: 'activo' // y estado se igual a activo
            }
        })

        if (correo_asesor == null) {
            return null // Si no existe el correo retorna null
        }
        
        return correo_asesor.dataValues // Retorna un JSON con los datos del alumno
    }

    static async getAsesorById(id) {
        const asesor = await modelo_cuenta_asesor.findOne({
            where: {
                id,
                estado: 'activo' // y estado se igual a activo
            }
        })

        if (asesor == null) {
            return null // Si no existe el correo retorna null
        }
        
        return asesor.dataValues // Retorna un JSON con los datos del alumno
    }

    /**
     * 
     * @param {JSON} datosAsesor
     * @returns  {JSON} para confirmar los datos enviados
     * @description Crea el registro de un asesor
     * @example
     * AsesorModelo.createAsesor({
     * nombre: "John Doe",
     * email: "email@example.com",
     * password: "contraseña1234",
     * area_especializacion: "Redes de computadoras",
     * disponibilidad: "Lunes, Martes y Viernes"
     * })
     */
    static async createAsesor(datos) {
        try{
            const asesor = await modelo_cuenta_asesor.findOne({
                where: {
                    email: datos.email
                }
            })
            if(!asesor){
                const hashedPassword = await hashPassword(datos.password, 10);
                const crear_asesor = await modelo_cuenta_asesor.create({
                    ...datos,
                    password: hashedPassword,
                });
                return crear_asesor.dataValues
            }
            else if (asesor.dataValues.estado === 'inactivo'){
                return this.reactivarAsesor(datos)
            }
            else if(asesor.dataValues.estado === 'activo'){
                return null
            }
        }
        catch(error){
            console.error(`Error al agregar al asesor ${error}`)
            throw error
        }
        return await crear_asesor.dataValues
    }

    static async reactivarAsesor(datos){
        return await modelo_cuenta_asesor.update({
            nombre: datos.nombre,
            password: datos.password,
            estado: 1
        },
        {
            where: {
                email: datos.email
            }
        })
    }

    /**
     * 
     * @param {*} datos datos que desean ser modificados
     * @param {*} emailOriginal email de la cuenta a modificar
     * @returns {Array} cantidad de filas modificadas
     */
    static async updateAsesor(datos, emailOriginal) {
        try {
            // Buscar asesor por email
            const asesor = await modelo_cuenta_asesor.findOne({
            where: { email: emailOriginal }
            });

            if (!asesor) {
            return null;
            }

            // Extraer password y el resto de datos
            const { password, ...otrosDatos } = datos;

            // Si se envió un nuevo password, se hashea
    if (password) {
      otrosDatos.password = await hashPassword(password, 10);
    }

    // Actualizar asesor con los datos restantes (incluyendo password si se actualizó)
    await asesor.update(otrosDatos);

    // Eliminar password antes de retornar los datos actualizados
    const { password: _, ...datosSeguros } = asesor.dataValues;

    return datosSeguros;
  } catch (error) {
    console.error("Error en updateAsesor:", error);
    return null;
  }
}

    /**
     * Desactiva la cuenta del asesor
     * @param {String} email 
     * @returns {boolean}
     */
    static async deleteAsesor(email){
        const deleteAsesor = await modelo_cuenta_asesor.update({estado: 2},{
            where: {
                email: email
            }
        });
        return deleteAsesor.length > 0; // Si se elimino retorna true, si no retorna false
    }

    static async getAllAsesores() {
        try {
            const asesores = await modelo_cuenta_asesor.findAll({
                where: { estado: 'activo' },
                attributes: ['nombre', 'email', 'area_especializacion', 'disponibilidad'],
            });
            return asesores.map(asesor => {
                // Convertir el string de áreas en un array
                const areas = asesor.dataValues.area_especializacion?.split(', ') || [];
                return {
                    ...asesor.dataValues,
                    area_especializacion: areas
                };
            });
        } catch (error) {
            console.error("Error al obtener asesores:", error);
            throw error;
        }
    }

    // Método para obtener asesores disponibles según el día y especialización
    /**
     * Obtiene los asesores disponibles que cumplan con el mismo dia y el mismo 
     * @param {string} diaRequerido - Día de la semana requerido (ejemplo: "lunes").
     * @param {string} especializacion - Especialización requerida (ejemplo: "Matemáticas").
     * @param {number|null} horaRequerida - Hora específica requerida (opcional).
     * @returns {Promise<Array>} Lista de asesores disponibles.
     */
    static async getAsesoresDisponibles(diaRequerido, especializacion , horaRequerida = null) {
        try {
            // Obtenemos filtrando primero por especializacion
            const asesores = await modelo_cuenta_asesor.findAll({
                where: {
                    estado: 'activo',
                    area_especializacion: especializacion,
                },
                order: [
                    [Sequelize.literal(`CASE 
                        WHEN disponibilidad LIKE '%${diaRequerido}%' 
                        AND area_especializacion LIKE '%${especializacion}%' THEN 1 
                        ELSE 2 
                    END`), 'ASC'],
                    
                    [Sequelize.literal(`LENGTH(area_especializacion)`), 'ASC']
                ],
            });
            
            // Filtrar asesores según la disponibilidad del día y hora
            const asesoresDisponibles = asesores.filter(asesor => {
                try {
                    const disponibilidad = JSON.parse(asesor.disponibilidad || '{}');
                    const horasDisponibles = disponibilidad[diaRequerido.toLowerCase()];
                    console.log("horasDisponibles", horasDisponibles);
                    
                    // Verificar si si es un array
                    if (!Array.isArray(horasDisponibles)) return false;

                    // Si se especifica hora, validar que esté disponible
                    if (horaRequerida !== null) {
                        return horasDisponibles.includes(horaRequerida);
                    }

                    // Si no se especifica hora, basta con que haya al menos una hora
                    return horasDisponibles.length > 0;

                } catch (err) {
                    console.error(`Error al parsear disponibilidad del asesor ID ${asesor.id}:`, err);
                    return false;
                }
            });

            return asesoresDisponibles
        } catch (error) {
            console.error("Error al obtener asesores activos:", error);
            throw error;
        }
    }
}
