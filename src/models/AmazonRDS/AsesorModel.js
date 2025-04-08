import { ParseStatus } from "zod";
import { modelo_cuenta_asesor} from "./Modelo_cuentas.js";

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
        return correo_asesor.dataValues // Retorna un JSON con los datos del alumno
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
     * area_especialización: "Redes de computadoras",
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
                const crear_asesor = await modelo_cuenta_asesor.create(datos)
                console.log("Asesor creado correctamente")
                return crear_asesor.dataValues
            }
            else if (asesor.dataValues.estado === 'inactivo'){
                return this.reactivarAsesor(datos)
            }
            else if(asesor.dataValues.estado === 'activo'){
                console.log("Este asesor ya está registrado")
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
        console.log("Correo Reactivado Correctamente")
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
        return await modelo_cuenta_asesor.update(datos, {
            where: {
                email: emailOriginal
            }
        })
    }
    /**
     * 
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
}